/*
  A SZERVER (Cloudflare Worker)
  =============================
  Ez a kód a Cloudflare gépein fut, nem a böngészőben.
  Feladata: titkosított fájlokat eltenni a KV tárhelybe, és visszaadni őket.

  A szerver SOHA nem látja a fájlok tartalmát vagy nevét: azokat a böngésző
  már titkosítva küldi. A szerver csak azt ellenőrzi, hogy jó-e a belépési kulcs.

  Végpontok:
    GET    /api/files        -> fájlok listája (+ a titkosítás "sója")
    POST   /api/files        -> új fájl feltöltése
    GET    /api/files/:id    -> egy fájl letöltése
    DELETE /api/files/:id    -> egy fájl törlése
*/

const MAX_MERET = 20 * 1024 * 1024; // 20 MB (a KV max 25 MB-ot enged)
const MAX_HIBAS_PROBA = 10;         // ennyi rossz jelszó után...
const TILTAS_PERC = 15;             // ...ennyi percre letiltjuk az IP-címet

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Minden, ami nem /api/..., az a weboldal (public mappa) - azt a Cloudflare magától kiszolgálja
    if (!url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    try {
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

function valasz(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
