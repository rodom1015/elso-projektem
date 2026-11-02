/*
  A SZERVER (Cloudflare Worker)
  =============================
  Ez a kód a Cloudflare gépein fut, nem a böngészőben.
  Feladata: titkosított fájlokat eltenni a KV tárhelybe, és visszaadni őket.

  A szerver SOHA nem látja a fájlok tartalmát vagy nevét: azokat a böngésző
  már titkosítva küldi. A szerver csak azt ellenőrzi, hogy jó-e a belépési kulcs.

  Végpontok:
    GET    /api/arfolyam     -> EKB árfolyamok (nyilvános, nem kell hozzá jelszó)
    GET    /api/files        -> fájlok listája (+ a titkosítás "sója")
    POST   /api/files        -> új fájl feltöltése
    GET    /api/files/:id    -> egy fájl letöltése
    DELETE /api/files/:id    -> egy fájl törlése
    POST   /api/shares       -> megosztó link készítése (lejárattal)
    GET    /api/shares       -> aktív megosztások
    DELETE /api/shares/:id   -> megosztás visszavonása
    GET    /api/s/:id/info   -> megosztott fájl adatai (NYILVÁNOS – a linkkel bárki)
    GET    /api/s/:id        -> megosztott fájl letöltése (NYILVÁNOS)
    POST   /api/qr/:id       -> QR belépés jóváhagyása a telefonról (bejelentkezve)
    GET    /api/qr/:id       -> a QR-t mutató gép ezzel kérdezi le a jóváhagyást (NYILVÁNOS, egyszer olvasható)
    POST   /api/ai           -> AI asszisztens (belépve; ha bekapcsolod, látogatóknak is napi korláttal)
    GET    /api/ai/info      -> elérhető-e az AI (NYILVÁNOS)
    POST   /api/esemeny      -> névtelen statisztika: oldalmegtekintés, másolás (NYILVÁNOS, csak D1-gyel tárol)
    GET    /api/admin        -> statisztika és belépési napló (belépve)
    PUT    /api/admin/ai     -> AI beállítások (belépve)

  Megosztásnál a böngésző egy ÚJ, véletlen kulccsal titkosítja újra a fájlt.
  Ez a kulcs csak a linkben van (a # után), azt a böngésző sosem küldi el a szervernek.
*/

const ERVENYESSEGEK = [3600, 86400, 7 * 86400]; // 1 óra, 1 nap, 1 hét

const MAX_MERET = 20 * 1024 * 1024; // 20 MB (a KV max 25 MB-ot enged)
const MAX_HIBAS_PROBA = 10;         // ennyi rossz jelszó után...
const TILTAS_PERC = 15;             // ...ennyi percre letiltjuk az IP-címet

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Minden, ami nem /api/..., az a weboldal (public mappa) - azt a Cloudflare magától kiszolgálja
    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    try {
      if (url.pathname === "/api/arfolyam" && request.method === "GET") return await arfolyam(env, ctx);
      if (url.pathname.startsWith("/api/s/") && request.method === "GET") return await megosztottFajl(env, url);
      if (url.pathname.startsWith("/api/qr/") && request.method === "GET") return await qrLekeres(env, url);
      if (url.pathname === "/api/latogatas") return await latogatas(request, env);
      if (url.pathname === "/api/esemeny" && request.method === "POST") return await esemeny(request, env);
      if (url.pathname === "/api/ai/info" && request.method === "GET") return await aiInfo(request, env);
      if (url.pathname === "/api/ai" && request.method === "POST") return await ai(request, env, ctx);
      return await api(request, env, url, ctx);
    } catch (e) {
      console.error(e);
      return valasz({ hiba: "Szerverhiba történt." }, 500);
    }
  },
};

// Belépési kulcs ellenőrzése, brute force védelemmel.
// Eredmény: "ok" | "nincs" (nem küldött kulcsot) | Response (hiba: tiltás vagy rossz kulcs)
async function kulcsEllenoriz(request, env, ctx, { kotelezo = true } = {}) {
  if (!env.JELSZO) return valasz({ hiba: "Nincs beállítva a JELSZO titok a Cloudflare-en." }, 500);
  const kapott = request.headers.get("X-Kulcs") || "";
  if (!kapott && !kotelezo) return "nincs";

  // --- Brute force védelem: túl sok rossz próbálkozás után tiltás ---
  const ip = request.headers.get("CF-Connecting-IP") || "ismeretlen";
  const tiltasKulcs = "hiba:" + ip;
  const hibak = parseInt((await env.FILES.get(tiltasKulcs)) || "0", 10);
  if (hibak >= MAX_HIBAS_PROBA) {
    return valasz({ hiba: `Túl sok hibás próbálkozás. Próbáld újra ${TILTAS_PERC} perc múlva.` }, 429);
  }

  // --- Jelszó ellenőrzés ---
  // A böngésző nem a jelszót küldi, hanem egy belőle számolt "belépési kulcsot".
  const vart = await belepesiKulcs(env.JELSZO);
  if (!egyenlo(kapott, vart)) {
    await env.FILES.put(tiltasKulcs, String(hibak + 1), { expirationTtl: TILTAS_PERC * 60 });
    const mod = request.headers.get("X-Belepes");
    if (mod) ctx.waitUntil(naploIr(request, env, false, mod));
    return valasz({ hiba: "Hibás jelszó." }, 401);
  }
  return "ok";
}

async function api(request, env, url, ctx) {
  const ell = await kulcsEllenoriz(request, env, ctx);
  if (ell !== "ok") return ell;
  const mod = request.headers.get("X-Belepes");
  if (mod) ctx.waitUntil(naploIr(request, env, true, mod));

  const resz = url.pathname.split("/").filter(Boolean); // pl. ["api", "files", "abc123"]
  if (resz[1] === "shares") return megosztasok(request, env, resz[2]);
  if (resz[1] === "qr") return qrJovahagyas(request, env, resz[2]);
  if (resz[1] === "admin") return admin(request, env, resz[2]);
  if (resz[1] !== "files") return valasz({ hiba: "Nincs ilyen oldal." }, 404);
  const id = resz[2];

  // --- Lista ---
  if (request.method === "GET" && !id) {
    const lista = [];
    let cursor;
    do {
      const r = await env.FILES.list({ prefix: "f:", cursor });
      for (const k of r.keys) lista.push({ id: k.name.slice(2), ...k.metadata });
      cursor = r.list_complete ? null : r.cursor;
    } while (cursor);
    lista.sort((a, b) => b.ido - a.ido); // legújabb elöl
    return valasz({ so: await so(env), fajlok: lista });
  }

  // --- Feltöltés ---
  if (request.method === "POST" && !id) {
    const nev = request.headers.get("X-Nev") || "";
    if (!nev || nev.length > 700) return valasz({ hiba: "Hibás fájlnév." }, 400);
    const adat = await request.arrayBuffer();
    if (adat.byteLength === 0) return valasz({ hiba: "Üres fájl." }, 400);
    if (adat.byteLength > MAX_MERET + 1024) return valasz({ hiba: "A fájl túl nagy (max. 20 MB)." }, 413);

    const ujId = crypto.randomUUID();
    await env.FILES.put("f:" + ujId, adat, {
      metadata: { nev, meret: parseInt(request.headers.get("X-Meret") || "0", 10), ido: Date.now() },
    });
    return valasz({ id: ujId }, 201);
  }

  if (!id || !/^[0-9a-f-]{36}$/.test(id)) return valasz({ hiba: "Hibás azonosító." }, 400);

  // --- Letöltés ---
  if (request.method === "GET") {
    const adat = await env.FILES.get("f:" + id, "arrayBuffer");
    if (!adat) return valasz({ hiba: "Nincs ilyen fájl." }, 404);
    return new Response(adat, {
      headers: { "Content-Type": "application/octet-stream", "Cache-Control": "no-store" },
    });
  }

  // --- Törlés ---
  if (request.method === "DELETE") {
    await env.FILES.delete("f:" + id);
    return valasz({ ok: true });
  }

  return valasz({ hiba: "Nem támogatott művelet." }, 405);
}

/* ---------------- Árfolyamok (Európai Központi Bank) ----------------
   Az EKB naponta egyszer (kb. 16:00-kor) frissít. Az adatot a KV-ban tároljuk,
   és legfeljebb 3 óránként kérjük le újra – így kevés írás kell (ingyenes keret: 1000/nap).  */
const EKB_URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml";
const AROLYAM_KULCS = "beallitas:arfolyam";
const AROLYAM_FRISSITES = 3 * 60 * 60 * 1000;

function ekbFeldolgoz(xml) {
  const napok = [];
  const napMinta = /<Cube\s+time=['"](\d{4}-\d{2}-\d{2})['"]\s*>([\s\S]*?)<\/Cube>/g;
  for (const [, datum, belso] of xml.matchAll(napMinta)) {
    const r = { EUR: 1 };
    for (const [, penznem, ertek] of belso.matchAll(/currency=['"]([A-Z]{3})['"]\s+rate=['"]([\d.]+)['"]/g)) r[penznem] = parseFloat(ertek);
    napok.push({ d: datum, r });
  }
  if (!napok.length) throw new Error("Üres EKB válasz");
  napok.sort((a, b) => (a.d < b.d ? 1 : -1)); // legújabb elöl
  return {
    datum: napok[0].d,
    arfolyamok: napok[0].r,
    tortenet: napok.slice().reverse().map((n) => ({ d: n.d, HUF: n.r.HUF, USD: n.r.USD, CZK: n.r.CZK, GBP: n.r.GBP })),
  };
}

async function arfolyam(env, ctx) {
  const tarolt = await env.FILES.getWithMetadata(AROLYAM_KULCS, "json");
  const friss = tarolt.value && tarolt.metadata && Date.now() - tarolt.metadata.ido < AROLYAM_FRISSITES;
  if (friss) return valasz(tarolt.value, 200, 600);
  try {
    const r = await fetch(EKB_URL, { headers: { "User-Agent": "rodom-excel-kozpont" } });
    if (!r.ok) throw new Error("EKB " + r.status);
    const adat = ekbFeldolgoz(await r.text());
    ctx.waitUntil(env.FILES.put(AROLYAM_KULCS, JSON.stringify(adat), { metadata: { ido: Date.now() } }));
    return valasz(adat, 200, 600);
  } catch (e) {
    console.error(e);
    if (tarolt.value) return valasz(tarolt.value, 200, 300); // ha az EKB nem elérhető, a régebbi adat is jó
    return valasz({ hiba: "Az árfolyamok most nem érhetők el." }, 502);
  }
}

/* ---------------- Megosztó linkek ---------------- */
async function megosztasok(request, env, id) {
  // Új megosztás
  if (request.method === "POST" && !id) {
    const nev = request.headers.get("X-Nev") || "";
    const nevTulaj = request.headers.get("X-Nev-Tulaj") || "";
    const ervenyes = parseInt(request.headers.get("X-Ervenyes") || "0", 10);
    if (!nev || !nevTulaj || nev.length + nevTulaj.length > 850) return valasz({ hiba: "Hibás vagy túl hosszú fájlnév." }, 400);
    if (!ERVENYESSEGEK.includes(ervenyes)) return valasz({ hiba: "Hibás lejárati idő." }, 400);
    const adat = await request.arrayBuffer();
    if (adat.byteLength === 0 || adat.byteLength > MAX_MERET + 1024) return valasz({ hiba: "Hibás fájlméret." }, 413);
    const ujId = crypto.randomUUID();
    await env.FILES.put("s:" + ujId, adat, {
      expirationTtl: ervenyes,
      metadata: {
        nev, nevTulaj,
        meret: parseInt(request.headers.get("X-Meret") || "0", 10),
        lejar: Date.now() + ervenyes * 1000,
        egyszeri: request.headers.get("X-Egyszeri") === "1",
      },
    });
    return valasz({ id: ujId }, 201);
  }
  // Lista
  if (request.method === "GET" && !id) {
    const r = await env.FILES.list({ prefix: "s:" });
    const lista = r.keys
      .map((k) => ({ id: k.name.slice(2), nevTulaj: k.metadata?.nevTulaj, meret: k.metadata?.meret, lejar: k.metadata?.lejar, egyszeri: k.metadata?.egyszeri }))
      .filter((m) => m.lejar > Date.now())
      .sort((a, b) => a.lejar - b.lejar);
    return valasz({ megosztasok: lista });
  }
  // Visszavonás
  if (request.method === "DELETE" && id && /^[0-9a-f-]{36}$/.test(id)) {
    await env.FILES.delete("s:" + id);
    return valasz({ ok: true });
  }
  return valasz({ hiba: "Nem támogatott művelet." }, 405);
}

async function megosztottFajl(env, url) {
  const [, , , id, info] = url.pathname.split("/"); // /api/s/:id[/info]
  if (!/^[0-9a-f-]{36}$/.test(id || "")) return valasz({ hiba: "Hibás link." }, 400);
  const lejart = () => valasz({ hiba: "A link lejárt vagy nem létezik." }, 404);
  if (info === "info") {
    // Csak az adatok kellenek, a fájl nem – ezt a listából olvassuk ki
    const k = (await env.FILES.list({ prefix: "s:" + id })).keys[0];
    const m = k && k.metadata;
    if (!m || m.lejar < Date.now()) return lejart();
    return valasz({ nev: m.nev, meret: m.meret, lejar: m.lejar, egyszeri: m.egyszeri });
  }
  const { value, metadata } = await env.FILES.getWithMetadata("s:" + id, "arrayBuffer");
  if (!value || !metadata || metadata.lejar < Date.now()) return lejart();
  if (metadata.egyszeri) await env.FILES.delete("s:" + id); // egyszeri link: letöltés után törlődik
  return new Response(value, { headers: { "Content-Type": "application/octet-stream", "Cache-Control": "no-store" } });
}

/* ---------------- Belépés QR kóddal ----------------
   1. A gép (pl. munkahelyi) készít egy egyszeri ECDH kulcspárt, és QR kódot mutat:
      /#/qr/<azonosító>.<a gép nyilvános kulcsa>
   2. A telefon (ahol jelszóval be vagy lépve) beolvassa, és jóváhagyáskor a belépési adatokat
      a gép nyilvános kulcsával titkosítva ide küldi (ehhez a telefonnak be kell lennie lépve).
   3. A gép lekérdezi, kibontja a saját titkos kulcsával – a szerver a tartalmat nem látja.
   A jóváhagyás 2 percig él, és csak egyszer olvasható ki. */
async function qrJovahagyas(request, env, id) {
  if (request.method !== "POST" || !/^[0-9a-f-]{36}$/.test(id || "")) return valasz({ hiba: "Hibás kérés." }, 400);
  const adat = await request.text();
  if (adat.length > 2000) return valasz({ hiba: "Túl nagy." }, 413);
  await env.FILES.put("q:" + id, adat, { expirationTtl: 120 });
  return valasz({ ok: true });
}

async function qrLekeres(env, url) {
  const id = url.pathname.split("/")[3];
  if (!/^[0-9a-f-]{36}$/.test(id || "")) return valasz({ hiba: "Hibás kérés." }, 400);
  const adat = await env.FILES.get("q:" + id);
  if (!adat) return valasz({ varakozas: true }, 404);
  await env.FILES.delete("q:" + id); // egyszer olvasható
  return new Response(adat, { headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}

/* ---------------- Látogatószámláló ----------------
   A böngésző naponta egyszer jelez (POST), így egy látogató egy nap csak egyszer számít.
   Ha be van kapcsolva a D1 adatbázis (env.DB), azt használjuk (pontos, sok írást bír),
   különben a KV tárhelyben egyetlen kulcsban tároljuk (kis forgalomra tökéletes). */
const STAT_KULCS = "beallitas:latogatok";
const maiNap = () => new Date().toISOString().slice(0, 10);

async function latogatas(request, env) {
  const szamol = request.method === "POST";
  if (!szamol && request.method !== "GET") return valasz({ hiba: "Nem támogatott." }, 405);
  if (env.DB) {
    await env.DB.prepare("CREATE TABLE IF NOT EXISTS latogatas (nap TEXT PRIMARY KEY, db INTEGER NOT NULL DEFAULT 0)").run();
    await latogatasAtköltoztet(env);
    if (szamol) {
      await env.DB.prepare("INSERT INTO latogatas (nap, db) VALUES (?, 1) ON CONFLICT(nap) DO UPDATE SET db = db + 1").bind(maiNap()).run();
      const ua = request.headers.get("User-Agent") || "";
      await statNovel(env, "orszag", (request.cf && request.cf.country) || "?");
      await statNovel(env, "eszkoz", (mobilE(ua) ? "📱 " : "💻 ") + eszkozNev(ua));
    }
    const ossz = await env.DB.prepare("SELECT COALESCE(SUM(db), 0) AS n FROM latogatas").first();
    const napok = await env.DB.prepare("SELECT nap AS d, db AS n FROM latogatas ORDER BY nap DESC LIMIT 30").all();
    return statValasz(ossz.n, napok.results);
  }
  const stat = (await env.FILES.get(STAT_KULCS, "json")) || { osszes: 0, napok: {} };
  if (szamol) {
    const ma = maiNap();
    stat.osszes++;
    stat.napok[ma] = (stat.napok[ma] || 0) + 1;
    for (const d of Object.keys(stat.napok).sort().slice(0, -60)) delete stat.napok[d]; // csak az utolsó 60 nap
    await env.FILES.put(STAT_KULCS, JSON.stringify(stat));
  }
  const napok = Object.entries(stat.napok).sort(([a], [b]) => (a < b ? 1 : -1)).slice(0, 30).map(([d, n]) => ({ d, n }));
  return statValasz(stat.osszes, napok);
}
// Egyszeri átköltöztetés: ha a D1 tábla még üres, a KV-ban eddig gyűjtött napi számokat áthozzuk.
// (Az utolsó 60 napnál régebbi napok összegét egy "régi" sorba tesszük, hogy az összesen ne vesszen el.)
let latogatasAtkoltozve = false;
async function latogatasAtköltoztet(env) {
  if (latogatasAtkoltozve) return;
  const van = await env.DB.prepare("SELECT COUNT(*) AS n FROM latogatas").first();
  if (van.n === 0) {
    const regi = await env.FILES.get(STAT_KULCS, "json");
    if (regi && regi.osszes) {
      const napok = Object.entries(regi.napok || {});
      const napiOssz = napok.reduce((s, [, n]) => s + n, 0);
      const parancsok = napok.map(([d, n]) => env.DB.prepare("INSERT OR IGNORE INTO latogatas (nap, db) VALUES (?, ?)").bind(d, n));
      if (regi.osszes > napiOssz) parancsok.push(env.DB.prepare("INSERT OR IGNORE INTO latogatas (nap, db) VALUES ('0000-regi', ?)").bind(regi.osszes - napiOssz));
      if (parancsok.length) await env.DB.batch(parancsok);
    }
  }
  latogatasAtkoltozve = true;
}

function statValasz(osszes, napok) {
  const ma = napok.find((x) => x.d === maiNap());
  return valasz({ osszes, ma: ma ? ma.n : 0, napok });
}

/* ======================================================
   AI ASSZISZTENS (Cloudflare Workers AI)
   - Belépve korlátlanul használható (a napi ingyenes keretig).
   - Az Admin oldalon bekapcsolható, hogy a látogatók is használhassák, napi korláttal.
   ====================================================== */
const AI_BEALLITAS = "beallitas:ai";
const AI_MODELLEK = {
  okos: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",   // jobb minőség, kevesebb kérdés fér a napi keretbe
  gyors: "@cf/meta/llama-3.1-8b-instruct-fast",        // gyorsabb, sokkal több kérdés, de gyengébb
};
const AI_ALAP = { nyilvanos: false, napi: 3, modell: "okos" };
const aiBeallitas = async (env) => ({ ...AI_ALAP, ...((await env.FILES.get(AI_BEALLITAS, "json")) || {}) });

const NYELV_NEV = { hu: "Hungarian", sk: "Slovak", en: "English" };
const KEPLET_SZABALY = {
  hu: "Excel formulas MUST use the Hungarian Excel function names (e.g. HA, FKERES, XKERES, SZUM, SZUMHA, DARABTELI, ÁTLAG, KEREKÍTÉS, HAHIBA, SZÖVEG, MA, ÉS, VAGY, INDEX, HOL.VAN, SZŰRŐ, EGYEDI) and the semicolon ; as the argument separator, and comma as decimal separator.",
  sk: "Excel formulas MUST use the English Excel function names (Slovak Excel uses them, e.g. IF, VLOOKUP, XLOOKUP, SUM, SUMIF, COUNTIF) but the semicolon ; as the argument separator and comma as decimal separator.",
  en: "Excel formulas use English function names and the comma , as the argument separator.",
};
const AI_MODOK = {
  keplet: "The user wants an Excel formula. Give the formula in a code block first, then explain briefly how it works and which cells to adjust.",
  "excel-makro": "The user wants an Excel VBA macro. Give one complete, working VBA module in a ```vba code block (Option Explicit is welcome, use clear English variable names), then short steps: where to paste it (Alt+F11 → Insert → Module), how to run it, and a warning to test on a copy. Comments and MsgBox texts in the user's language, but avoid characters outside Windows-1250 (no emoji, no arrows).",
  "word-makro": "The user wants a Microsoft Word VBA macro. Give one complete VBA module in a ```vba code block, then short steps for using it in Word (Alt+F11 → Normal → Insert → Module). Comments and messages in the user's language, no emoji.",
  "outlook-makro": "The user wants a classic Outlook (Windows desktop) VBA macro. Give a complete VBA module in a ```vba code block, then short steps (Alt+F11, ThisOutlookSession or Module, macro security). Mention it does not work in the new Outlook / web. No emoji in code.",
  pq: "The user wants Power Query. Give the full M code in a ```powerquery code block (a complete let ... in expression that can be pasted into the Advanced Editor), then explain the steps briefly.",
  magyaraz: "The user pasted a formula, macro or M code, or an error message. Explain step by step in plain language what it does, point out mistakes and give a corrected version in a code block if needed.",
  altalanos: "Answer questions about Excel, Power Query, Word, Outlook and office work.",
};

function aiRendszer(mod, nyelv) {
  return [
    "You are the assistant of the rodom website, an expert in Microsoft Excel, VBA macros, Power Query (M), Word and Outlook.",
    `Always answer in ${NYELV_NEV[nyelv] || "Hungarian"}, friendly and concise, for a beginner-to-intermediate office user.`,
    KEPLET_SZABALY[nyelv] || KEPLET_SZABALY.hu,
    AI_MODOK[mod] || AI_MODOK.altalanos,
    "Use Markdown: short paragraphs, numbered steps, and fenced code blocks with a language tag (excel, vba, powerquery). Never invent functions that do not exist. If the request is unclear, make a sensible assumption and say it.",
    "Politely refuse anything unrelated to office work, or anything harmful (e.g. malware, password cracking, hiding macros).",
  ].join("\n");
}

async function aiInfo(request, env) {
  const b = await aiBeallitas(env);
  return valasz({ elerheto: !!env.AI, nyilvanos: b.nyilvanos, napi: b.napi });
}

async function ai(request, env, ctx) {
  if (!env.AI) return valasz({ hiba: "Az AI nincs bekapcsolva a Cloudflare-en (AI binding)." }, 503);
  const ell = await kulcsEllenoriz(request, env, ctx, { kotelezo: false });
  if (ell instanceof Response) return ell;
  const tulaj = ell === "ok";
  const b = await aiBeallitas(env);

  if (!tulaj && !b.nyilvanos) return valasz({ hiba: "Az AI asszisztens csak belépve használható." }, 403);

  const szoveg = await request.text();
  if (szoveg.length > 20000) return valasz({ hiba: "Túl hosszú kérdés." }, 413);
  let adat;
  try { adat = JSON.parse(szoveg); } catch { return valasz({ hiba: "Hibás kérés." }, 400); }
  const nyelv = ["hu", "sk", "en"].includes(adat.nyelv) ? adat.nyelv : "hu";
  const mod = AI_MODOK[adat.mod] ? adat.mod : "altalanos";
  // Az előzmény (legfeljebb az utolsó 6 üzenet) – hogy lehessen visszakérdezni
  const elozmeny = (Array.isArray(adat.elozmeny) ? adat.elozmeny : [])
    .filter((u) => u && ["user", "assistant"].includes(u.szerep) && typeof u.szoveg === "string")
    .slice(-6).map((u) => ({ role: u.szerep, content: u.szoveg.slice(0, 6000) }));
  const kerdes = String(adat.kerdes || "").trim().slice(0, 6000);
  if (!kerdes) return valasz({ hiba: "Üres kérdés." }, 400);

  // Látogatói napi korlát (csak érvényes kérdés számít)
  if (!tulaj) {
    const ip = request.headers.get("CF-Connecting-IP") || "ismeretlen";
    const kulcs = `aiip:${ip}:${maiNap()}`;
    const eddig = parseInt((await env.FILES.get(kulcs)) || "0", 10);
    if (eddig >= b.napi) return valasz({ hiba: "Mára elfogyott a kérdéskereted.", limit: true }, 429);
    await env.FILES.put(kulcs, String(eddig + 1), { expirationTtl: 86400 });
  }

  const messages = [{ role: "system", content: aiRendszer(mod, nyelv) }, ...elozmeny, { role: "user", content: kerdes }];
  const modell = AI_MODELLEK[b.modell] || AI_MODELLEK.okos;
  ctx.waitUntil(statNovel(env, "ai", tulaj ? "tulaj" : "latogato"));
  try {
    const folyam = await env.AI.run(modell, { messages, stream: true, max_tokens: 2048, temperature: 0.3 });
    return new Response(folyam, { headers: { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-store" } });
  } catch (e) {
    console.error(e);
    const uzenet = String(e && e.message || e);
    if (/neuron|quota|limit|4006/i.test(uzenet)) return valasz({ hiba: "Mára elfogyott az ingyenes AI keret. Holnap újra működik.", keret: true }, 429);
    return valasz({ hiba: "Az AI most nem érhető el. Próbáld újra kicsit később." }, 502);
  }
}

/* ======================================================
   STATISZTIKA ÉS BELÉPÉSI NAPLÓ
   - Részletes statisztika csak D1 adatbázissal van (a KV-ba naponta csak 1000 írás fér).
   - A belépési napló D1 nélkül is működik (a KV-ban az utolsó 100 bejegyzés).
   ====================================================== */
const NAPLO_KULCS = "beallitas:naplo";
const ESEMENY_TIPUSOK = ["oldal", "masol"];

let tablakKesz = false;
async function tablak(env) {
  if (tablakKesz || !env.DB) return;
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS stat (nap TEXT NOT NULL, tipus TEXT NOT NULL, nev TEXT NOT NULL, db INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (nap, tipus, nev))"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS naplo (id INTEGER PRIMARY KEY AUTOINCREMENT, ido INTEGER NOT NULL, siker INTEGER NOT NULL, mod TEXT, ip TEXT, orszag TEXT, varos TEXT, eszkoz TEXT)"),
  ]);
  tablakKesz = true;
}

async function statNovel(env, tipus, nev) {
  if (!env.DB) return;
  await tablak(env);
  await env.DB.prepare("INSERT INTO stat (nap, tipus, nev, db) VALUES (?, ?, ?, 1) ON CONFLICT(nap, tipus, nev) DO UPDATE SET db = db + 1")
    .bind(maiNap(), tipus, nev).run();
}

// Böngésző és rendszer egyszerű felismerése (pl. "Chrome · Windows")
function eszkozNev(ua = "") {
  const bongeszo = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "?";
  const rendszer = /Windows/.test(ua) ? "Windows" : /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : /Mac OS/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : "?";
  return `${bongeszo} · ${rendszer}`;
}
const mobilE = (ua = "") => /Mobi|Android|iPhone|iPad/.test(ua);

async function esemeny(request, env) {
  if (!env.DB) return new Response(null, { status: 204 });
  const adat = await request.json().catch(() => null);
  if (!adat || !ESEMENY_TIPUSOK.includes(adat.t) || typeof adat.n !== "string" || !/^[\p{L}\p{N} .,:()/+&–-]{1,80}$/u.test(adat.n)) {
    return valasz({ hiba: "Hibás kérés." }, 400);
  }
  await statNovel(env, adat.t, adat.n);
  return new Response(null, { status: 204 });
}

async function naploIr(request, env, siker, mod) {
  const cf = request.cf || {};
  const bejegyzes = {
    ido: Date.now(), siker, mod: String(mod).slice(0, 10),
    ip: request.headers.get("CF-Connecting-IP") || "", orszag: cf.country || "", varos: cf.city || "",
    eszkoz: eszkozNev(request.headers.get("User-Agent") || ""),
  };
  if (env.DB) {
    await tablak(env);
    await env.DB.prepare("INSERT INTO naplo (ido, siker, mod, ip, orszag, varos, eszkoz) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(bejegyzes.ido, siker ? 1 : 0, bejegyzes.mod, bejegyzes.ip, bejegyzes.orszag, bejegyzes.varos, bejegyzes.eszkoz).run();
    return;
  }
  const lista = (await env.FILES.get(NAPLO_KULCS, "json")) || [];
  lista.unshift(bejegyzes);
  await env.FILES.put(NAPLO_KULCS, JSON.stringify(lista.slice(0, 100)));
}

async function admin(request, env, al) {
  if (al === "ai" && request.method === "PUT") {
    const adat = await request.json().catch(() => null);
    if (!adat) return valasz({ hiba: "Hibás kérés." }, 400);
    const uj = {
      nyilvanos: !!adat.nyilvanos,
      napi: Math.min(50, Math.max(1, parseInt(adat.napi, 10) || 3)),
      modell: AI_MODELLEK[adat.modell] ? adat.modell : "okos",
    };
    await env.FILES.put(AI_BEALLITAS, JSON.stringify(uj));
    return valasz(uj);
  }
  if (al || request.method !== "GET") return valasz({ hiba: "Nem támogatott művelet." }, 405);

  const eredmeny = { db: !!env.DB, ai: { ...(await aiBeallitas(env)), elerheto: !!env.AI } };
  if (env.DB) {
    await tablak(env);
    const tol = new Date(Date.now() - 29 * 864e5).toISOString().slice(0, 10);
    const top = (tipus, n = 12) => env.DB.prepare("SELECT nev, SUM(db) AS db FROM stat WHERE tipus = ? AND nap >= ? GROUP BY nev ORDER BY db DESC LIMIT ?").bind(tipus, tol, n).all();
    const [oldalak, masolasok, orszagok, eszkozok, aiNapok, naplo] = await Promise.all([
      top("oldal"), top("masol", 15), top("orszag"), top("eszkoz"),
      env.DB.prepare("SELECT nap, SUM(db) AS db FROM stat WHERE tipus = 'ai' AND nap >= ? GROUP BY nap ORDER BY nap").bind(tol).all(),
      env.DB.prepare("SELECT ido, siker, mod, ip, orszag, varos, eszkoz FROM naplo ORDER BY ido DESC LIMIT 100").all(),
    ]);
    Object.assign(eredmeny, {
      oldalak: oldalak.results, masolasok: masolasok.results, orszagok: orszagok.results, eszkozok: eszkozok.results,
      aiNapok: aiNapok.results, naplo: naplo.results.map((n) => ({ ...n, siker: !!n.siker })),
    });
  } else {
    eredmeny.naplo = (await env.FILES.get(NAPLO_KULCS, "json")) || [];
  }
  return valasz(eredmeny);
}

// A titkosítás "sója": egy véletlen szám, egyszer jön létre, utána mindig ugyanaz.
async function so(env) {
  let s = await env.FILES.get("beallitas:so");
  if (!s) {
    s = b64(crypto.getRandomValues(new Uint8Array(16)));
    await env.FILES.put("beallitas:so", s);
  }
  return s;
}

// Ugyanazt számolja, mint a böngésző (public/app.js -> belepesiKulcs)
async function belepesiKulcs(jelszo) {
  const adat = new TextEncoder().encode("fajltarolo-belepes:" + jelszo);
  return b64(new Uint8Array(await crypto.subtle.digest("SHA-256", adat)));
}

// Időzítés-biztos összehasonlítás (ne lehessen a válaszidőből kitalálni a kulcsot)
function egyenlo(a, b) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

function b64(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

function valasz(obj, status = 200, gyorsitotar = 0) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": gyorsitotar ? `public, max-age=${gyorsitotar}` : "no-store",
    },
  });
}
