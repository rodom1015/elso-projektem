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
      if (url.pathname === "/api/uzenet/kulcs" && request.method === "GET") return await uzenetKulcsLekeres(env);
      if (url.pathname === "/api/uzenet" && request.method === "POST") return await uzenetKuldes(request, env);
      return await api(request, env, url);
    } catch (e) {
      console.error(e);
      return valasz({ hiba: "Szerverhiba történt." }, 500);
    }
  },
};

async function api(request, env, url) {
  if (!env.JELSZO) {
    return valasz({ hiba: "Nincs beállítva a JELSZO titok a Cloudflare-en." }, 500);
  }

  // --- Brute force védelem: túl sok rossz próbálkozás után tiltás ---
  const ip = request.headers.get("CF-Connecting-IP") || "ismeretlen";
  const tiltasKulcs = "hiba:" + ip;
  const hibak = parseInt((await env.FILES.get(tiltasKulcs)) || "0", 10);
  if (hibak >= MAX_HIBAS_PROBA) {
    return valasz({ hiba: `Túl sok hibás próbálkozás. Próbáld újra ${TILTAS_PERC} perc múlva.` }, 429);
  }

  // --- Jelszó ellenőrzés ---
  // A böngésző nem a jelszót küldi, hanem egy belőle számolt "belépési kulcsot".
  const kapott = request.headers.get("X-Kulcs") || "";
  const vart = await belepesiKulcs(env.JELSZO);
  if (!egyenlo(kapott, vart)) {
    await env.FILES.put(tiltasKulcs, String(hibak + 1), { expirationTtl: TILTAS_PERC * 60 });
    return valasz({ hiba: "Hibás jelszó." }, 401);
  }

  const resz = url.pathname.split("/").filter(Boolean); // pl. ["api", "files", "abc123"]
  if (resz[1] === "shares") return megosztasok(request, env, resz[2]);
  if (resz[1] === "qr") return qrJovahagyas(request, env, resz[2]);
  if (resz[1] === "uzenet" && resz[2] === "kulcs" && request.method === "PUT") return uzenetKulcsBeallitas(request, env);
  if (resz[1] === "uzenetek") return uzenetekKezelese(request, env, resz[2]);
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
    if (szamol) await env.DB.prepare("INSERT INTO latogatas (nap, db) VALUES (?, 1) ON CONFLICT(nap) DO UPDATE SET db = db + 1").bind(maiNap()).run();
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
function statValasz(osszes, napok) {
  const ma = napok.find((x) => x.d === maiNap());
  return valasz({ osszes, ma: ma ? ma.n : 0, napok });
}

/* ---------------- Üzenőfal (privát, titkosított postaláda) ----------------
   - A tulajdonos első belépéskor készít egy ECDH kulcspárt: a nyilvános kulcs itt bárki számára
     elérhető, a titkos kulcsot a saját jelszavas kulcsával titkosítva tároljuk.
   - A látogató böngészője a nyilvános kulccsal titkosítja az üzenetet – a szerver nem tudja elolvasni.
   - Spamvédelem: méretkorlát, rejtett mező (robotcsapda), és naponta max. 5 üzenet egy IP-címről. */
const UZENET_KULCS = "beallitas:uzenetkulcs";
const UZENET_NAPI_MAX = 5;

async function uzenetKulcsLekeres(env) {
  const k = await env.FILES.get(UZENET_KULCS, "json");
  if (!k) return valasz({ hiba: "Az üzenőfal még nincs beállítva." }, 404);
  return valasz({ pub: k.pub }, 200, 300);
}

async function uzenetKulcsBeallitas(request, env) {
  const adat = await request.json().catch(() => null);
  if (!adat || typeof adat.pub !== "string" || typeof adat.privTitkos !== "string" || adat.pub.length > 200 || adat.privTitkos.length > 1000) {
    return valasz({ hiba: "Hibás kulcs." }, 400);
  }
  await env.FILES.put(UZENET_KULCS, JSON.stringify({ pub: adat.pub, privTitkos: adat.privTitkos }));
  return valasz({ ok: true });
}

async function uzenetKuldes(request, env) {
  const szoveg = await request.text();
  if (szoveg.length > 12000) return valasz({ hiba: "Túl hosszú üzenet." }, 413);
  let adat;
  try { adat = JSON.parse(szoveg); } catch { return valasz({ hiba: "Hibás kérés." }, 400); }
  if (adat.web) return valasz({ ok: true }); // robotcsapda: a rejtett mezőt csak a robotok töltik ki
  if (![adat.epub, adat.iv, adat.ct].every((x) => typeof x === "string" && x.length > 0)) return valasz({ hiba: "Hibás kérés." }, 400);
  const ip = request.headers.get("CF-Connecting-IP") || "ismeretlen";
  const limitKulcs = `uzip:${ip}:${maiNap()}`;
  const eddig = parseInt((await env.FILES.get(limitKulcs)) || "0", 10);
  if (eddig >= UZENET_NAPI_MAX) return valasz({ hiba: "Ma már túl sok üzenetet küldtél." }, 429);
  await env.FILES.put(limitKulcs, String(eddig + 1), { expirationTtl: 86400 });
  const ido = Date.now();
  // A kulcs időrendben rendezhető: u:<fordított idő> → a legújabb van elöl a listában
  await env.FILES.put(`u:${String(9e15 - ido).padStart(16, "0")}:${crypto.randomUUID().slice(0, 8)}`,
    JSON.stringify({ epub: adat.epub, iv: adat.iv, ct: adat.ct, ido }), { metadata: { ido } });
  return valasz({ ok: true }, 201);
}

async function uzenetekKezelese(request, env, id) {
  if (request.method === "GET" && !id) {
    const kulcs = await env.FILES.get(UZENET_KULCS, "json");
    const r = await env.FILES.list({ prefix: "u:", limit: 200 });
    const uzenetek = await Promise.all(r.keys.map(async (k) => ({ id: k.name.slice(2), ...(await env.FILES.get(k.name, "json")) })));
    return valasz({ kulcs, uzenetek: uzenetek.filter((u) => u.ct) });
  }
  if (request.method === "DELETE" && id && /^[0-9a-f:-]{20,40}$/.test(id)) {
    await env.FILES.delete("u:" + id);
    return valasz({ ok: true });
  }
  return valasz({ hiba: "Nem támogatott művelet." }, 405);
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
