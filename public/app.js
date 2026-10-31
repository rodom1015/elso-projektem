/*
  A BÖNGÉSZŐ RÉSZ (JavaScript)
  ============================
  1. Belépés: a jelszóból kiszámol egy "belépési kulcsot" (ezt látja a szerver)
     és egy "titkosító kulcsot" (ezt SOHA nem küldi el sehova).
  2. Feltöltés: a fájlt és a nevét titkosítja, majd elküldi a szervernek.
  3. Letöltés: letölti a titkosított adatot, visszafejti, és elmenti.
*/

const KIFEJTES_KOR = 250000;                 // PBKDF2 ismétlések: lassítja a jelszótörést
const MAX_MERET = 20 * 1024 * 1024;          // 20 MB
const TETLENSEG_PERC = 15;                   // ennyi idő után automatikus kilépés

let belepesiKulcs = null;   // a szervernek
let titkositoKulcs = null;  // csak itt, a böngészőben
let fajlok = [];

const $ = (id) => document.getElementById(id);

/* ==================== Titkosítás ==================== */

const szovegbol = (s) => new TextEncoder().encode(s);
const b64 = (bytes) => {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
};
const b64bol = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

async function szamolBelepesiKulcs(jelszo) {
  const hash = await crypto.subtle.digest("SHA-256", szovegbol("fajltarolo-belepes:" + jelszo));
  return b64(new Uint8Array(hash));
}

async function szamolTitkositoKulcs(jelszo, so) {
  const alap = await crypto.subtle.importKey("raw", szovegbol(jelszo), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: b64bol(so), iterations: KIFEJTES_KOR, hash: "SHA-256" },
    alap,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// Eredmény: [12 bájt véletlen IV][titkosított adat]
async function titkosit(bytes) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const titkos = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, titkositoKulcs, bytes));
  const ki = new Uint8Array(12 + titkos.length);
  ki.set(iv);
  ki.set(titkos, 12);
  return ki;
}

async function visszafejt(bytes) {
  const iv = bytes.subarray(0, 12);
  return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv }, titkositoKulcs, bytes.subarray(12)));
}

async function nevTitkosit(nev) {
  return b64(await titkosit(szovegbol(nev)));
}

async function nevVisszafejt(titkosNev) {
  try {
    return new TextDecoder().decode(await visszafejt(b64bol(titkosNev)));
  } catch {
    return "(nem olvasható név)";
  }
}

/* ==================== Szerver hívások ==================== */

async function api(utvonal, opciok = {}) {
  const valasz = await fetch("/api/" + utvonal, {
    ...opciok,
    headers: { ...(opciok.headers || {}), "X-Kulcs": belepesiKulcs },
  });
  if (!valasz.ok) {
    let uzenet = "Hiba történt (" + valasz.status + ").";
    try { uzenet = (await valasz.json()).hiba || uzenet; } catch {}
    const hiba = new Error(uzenet);
    hiba.status = valasz.status;
    throw hiba;
  }
  return valasz;
}

/* ==================== Belépés / kilépés ==================== */

$("mutat").addEventListener("click", () => {
  const mezo = $("jelszo");
  mezo.type = mezo.type === "password" ? "text" : "password";
  mezo.focus();
});

$("belepes-urlap").addEventListener("submit", async (e) => {
  e.preventDefault();
  const jelszo = $("jelszo").value;
  if (!jelszo) return;

  if (location.protocol === "file:") {
    belepesHiba("Az oldal csak a Cloudflare-re feltéve működik (lásd TELEPITES.md).");
    return;
  }

  tolt(true);
  $("belepes-hiba").textContent = "";
  try {
    belepesiKulcs = await szamolBelepesiKulcs(jelszo);
    const adat = await (await api("files")).json();
    titkositoKulcs = await szamolTitkositoKulcs(jelszo, adat.so);
    $("jelszo").value = "";
    await listaFeldolgoz(adat.fajlok);
    $("belepes").hidden = true;
    $("tarolo").hidden = false;
    tetlensegFigyelo();
  } catch (hiba) {
    belepesiKulcs = null;
    belepesHiba(hiba.status ? hiba.message : "Nem érem el a szervert. Van internet?");
  } finally {
    tolt(false);
  }
});

function belepesHiba(uzenet) {
  $("belepes-hiba").textContent = uzenet;
  const kartya = $("belepes-urlap");
  kartya.classList.remove("razkodas");
  void kartya.offsetWidth; // újraindítja az animációt
  kartya.classList.add("razkodas");
  $("jelszo").select();
}

function tolt(be) {
  $("belepes-gomb").disabled = be;
  $("belepes-gomb").querySelector(".gomb-szoveg").textContent = be ? "Belépés…" : "Belépés";
  $("belepes-gomb").querySelector(".porgo").hidden = !be;
}

function kilepes(uzenet) {
  belepesiKulcs = null;
  titkositoKulcs = null;
  fajlok = [];
  $("fajl-lista").innerHTML = "";
  $("tarolo").hidden = true;
  $("belepes").hidden = false;
  $("jelszo").focus();
  if (uzenet) $("belepes-hiba").textContent = uzenet;
}

$("kilepes").addEventListener("click", () => kilepes());

let tetlensegIdozito;
function tetlensegFigyelo() {
  clearTimeout(tetlensegIdozito);
  tetlensegIdozito = setTimeout(() => {
    if (titkositoKulcs) kilepes("Tétlenség miatt kiléptél.");
  }, TETLENSEG_PERC * 60 * 1000);
}
["click", "keydown", "mousemove", "touchstart"].forEach((e) =>
  document.addEventListener(e, () => titkositoKulcs && tetlensegFigyelo(), { passive: true })
);

/* ==================== Fájllista ==================== */

async function listaFrissit() {
  try {
    const adat = await (await api("files")).json();
    await listaFeldolgoz(adat.fajlok);
  } catch (hiba) {
    if (hiba.status === 401) return kilepes("Lejárt a belépés, lépj be újra.");
    ertesit(hiba.message, true);
  }
}

async function listaFeldolgoz(lista) {
  fajlok = await Promise.all(lista.map(async (f) => ({ ...f, nev: await nevVisszafejt(f.nev) })));
  listaRajzol();
}

function listaRajzol() {
  const szuro = $("kereses").value.trim().toLowerCase();
  const lathato = fajlok.filter((f) => f.nev.toLowerCase().includes(szuro));
  const ul = $("fajl-lista");
  ul.innerHTML = "";

  for (const f of lathato) {
    const kiterjesztes = (f.nev.split(".").pop() || "").toLowerCase();
    const li = document.createElement("li");
    li.className = "fajl";
    li.innerHTML = `
      <div class="fajl-ikon ${kiterjesztes === "csv" ? "csv" : ""}"></div>
      <div class="fajl-adatok">
        <div class="fajl-nev"></div>
        <div class="fajl-info"></div>
      </div>
      <div class="fajl-gombok">
        <button class="kis-gomb letolt" title="Letöltés" aria-label="Letöltés">
          <svg viewBox="0 0 24 24"><path d="M12 4v12M7 11l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="kis-gomb torles" title="Törlés" aria-label="Törlés">
          <svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>`;
    // textContent-tel írjuk be a nevet, így egy furcsa fájlnév sem tud kódot futtatni
    li.querySelector(".fajl-ikon").textContent = (kiterjesztes || "?").slice(0, 4).toUpperCase();
    li.querySelector(".fajl-nev").textContent = f.nev;
    li.querySelector(".fajl-nev").title = f.nev;
    li.querySelector(".fajl-info").textContent = meret(f.meret) + " · " + datum(f.ido);
    li.querySelector(".letolt").addEventListener("click", (e) => letolt(f, e.currentTarget));
    li.querySelector(".torles").addEventListener("click", () => torol(f));
    ul.appendChild(li);
  }

  $("ures").hidden = fajlok.length > 0;
  const ossz = fajlok.reduce((s, f) => s + (f.meret || 0), 0);
  $("osszesito").textContent = fajlok.length
    ? `${fajlok.length} fájl · ${meret(ossz)}`
    : "Még üres";
}

$("kereses").addEventListener("input", listaRajzol);

/* ==================== Feltöltés ==================== */

const zona = $("ejto-zona");
$("fajl-valaszto").addEventListener("change", (e) => {
  feltoltMind(e.target.files);
  e.target.value = "";
});
zona.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); $("fajl-valaszto").click(); }
});
["dragenter", "dragover"].forEach((n) => zona.addEventListener(n, (e) => { e.preventDefault(); zona.classList.add("felette"); }));
["dragleave", "drop"].forEach((n) => zona.addEventListener(n, (e) => { e.preventDefault(); zona.classList.remove("felette"); }));
zona.addEventListener("drop", (e) => feltoltMind(e.dataTransfer.files));

async function feltoltMind(lista) {
  // Lemásoljuk a listát, mert a fájlválasztó kiürítésekor az eredeti lista is kiürül
  for (const fajl of [...lista]) await feltolt(fajl);
  await listaFrissit();
}

async function feltolt(fajl) {
  if (fajl.size > MAX_MERET) return ertesit(`„${fajl.name}” túl nagy (max. 20 MB).`, true);
  if (fajl.size === 0) return ertesit(`„${fajl.name}” üres fájl.`, true);

  const sor = document.createElement("div");
  sor.className = "kartya feltoltes";
  sor.innerHTML = `<div class="feltoltes-sor"><span></span><span>Titkosítás…</span></div><div class="savsor"><div></div></div>`;
  sor.querySelector("span").textContent = fajl.name;
  $("feltoltesek").appendChild(sor);
  const allapot = sor.querySelectorAll("span")[1];
  const sav = sor.querySelector(".savsor div");

  try {
    const titkos = await titkosit(new Uint8Array(await fajl.arrayBuffer()));
    const titkosNev = await nevTitkosit(fajl.name);
    allapot.textContent = "Feltöltés…";

    // XMLHttpRequest-et használunk, mert az mutatja a feltöltés haladását
    await new Promise((kesz, hiba) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/files");
      xhr.setRequestHeader("X-Kulcs", belepesiKulcs);
      xhr.setRequestHeader("X-Nev", titkosNev);
      xhr.setRequestHeader("X-Meret", String(fajl.size));
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const szazalek = Math.round((e.loaded / e.total) * 100);
          sav.style.width = szazalek + "%";
          allapot.textContent = szazalek + "%";
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) return kesz();
        let uzenet = "Sikertelen feltöltés.";
        try { uzenet = JSON.parse(xhr.responseText).hiba || uzenet; } catch {}
        hiba(new Error(uzenet));
      };
      xhr.onerror = () => hiba(new Error("Megszakadt a kapcsolat."));
      xhr.send(titkos);
    });

    sav.style.width = "100%";
    ertesit(`✓ „${fajl.name}” feltöltve`);
  } catch (hiba) {
    ertesit(`„${fajl.name}”: ${hiba.message}`, true);
  } finally {
    setTimeout(() => sor.remove(), 600);
  }
}

/* ==================== Letöltés és törlés ==================== */

async function letolt(f, gomb) {
  gomb.disabled = true;
  try {
    const titkos = new Uint8Array(await (await api("files/" + f.id)).arrayBuffer());
    const adat = await visszafejt(titkos);
    const url = URL.createObjectURL(new Blob([adat], { type: tipus(f.nev) }));
    const a = document.createElement("a");
    a.href = url;
    a.download = f.nev;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  } catch (hiba) {
    if (hiba.status === 401) return kilepes("Lejárt a belépés, lépj be újra.");
    ertesit(hiba.name === "OperationError" ? "A fájlt nem sikerült visszafejteni." : hiba.message, true);
  } finally {
    gomb.disabled = false;
  }
}

async function torol(f) {
  if (!confirm(`Biztosan törlöd?\n\n${f.nev}`)) return;
  try {
    await api("files/" + f.id, { method: "DELETE" });
    fajlok = fajlok.filter((x) => x.id !== f.id);
    listaRajzol();
    ertesit("Törölve");
  } catch (hiba) {
    ertesit(hiba.message, true);
  }
}

/* ==================== Segédfüggvények ==================== */

function tipus(nev) {
  const k = nev.split(".").pop().toLowerCase();
  return {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
    xls: "application/vnd.ms-excel",
    csv: "text/csv",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
  }[k] || "application/octet-stream";
}

function meret(b) {
  if (!b) return "0 B";
  if (b < 1024) return b + " B";
  if (b < 1024 * 1024) return (b / 1024).toFixed(0) + " KB";
  return (b / 1024 / 1024).toFixed(1).replace(".", ",") + " MB";
}

function datum(ms) {
  const d = new Date(ms);
  const ma = new Date();
  const tegnap = new Date(Date.now() - 864e5);
  const ido = d.toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" });
  if (d.toDateString() === ma.toDateString()) return "ma " + ido;
  if (d.toDateString() === tegnap.toDateString()) return "tegnap " + ido;
  return d.toLocaleDateString("hu-HU", { year: "numeric", month: "short", day: "numeric" }) + " " + ido;
}

function ertesit(szoveg, hibas = false) {
  const el = document.createElement("div");
  el.className = "ertesites" + (hibas ? " hiba-tipus" : "");
  el.textContent = szoveg;
  $("ertesitesek").appendChild(el);
  setTimeout(() => { el.classList.add("eltunik"); setTimeout(() => el.remove(), 300); }, hibas ? 5000 : 2800);
}
