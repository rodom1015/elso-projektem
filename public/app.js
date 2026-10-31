/*
  A BÖNGÉSZŐ RÉSZ (JavaScript)
  ============================
  - Menü: a cím végén lévő #/... rész dönti el, melyik oldal látszik
  - Belépés: a jelszóból egy "belépési kulcs" (ezt látja a szerver)
    és egy "titkosító kulcs" (ez SOHA nem hagyja el a böngészőt) készül
  - Fájlok: titkosított feltöltés, letöltés, előnézet, rendezés
  - Excel súgó: függvények és billentyűparancsok (adatok: excel-adatok.js)
*/

const KIFEJTES_KOR = 250000;                 // PBKDF2 ismétlések: lassítja a jelszótörést
const MAX_MERET = 20 * 1024 * 1024;          // 20 MB
const TARHELY = 1024 * 1024 * 1024;          // 1 GB ingyenes KV keret
const TETLENSEG_PERC = 15;
const SHEETJS = "/vendor/xlsx-0.18.5.full.min.js"; // SheetJS: Excel fájlok olvasása

let belepesiKulcs = null;
let titkositoKulcs = null;
let fajlok = [];

const $ = (id) => document.getElementById(id);

/* ======================================================
   MENÜ ÉS OLDALAK
   ====================================================== */

const OLDALAK = ["kezdolap", "fajlok", "fuggvenyek", "billentyuk"];

function oldalValtas() {
  let oldal = location.hash.replace("#/", "");
  if (!OLDALAK.includes(oldal)) oldal = "kezdolap";
  OLDALAK.forEach((o) => ($("oldal-" + o).hidden = o !== oldal));
  document.querySelectorAll(".menu-pont").forEach((a) => a.classList.toggle("aktiv", a.dataset.oldal === oldal));
  if (oldal === "fajlok" && !titkositoKulcs) setTimeout(() => $("jelszo").focus(), 50);
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", oldalValtas);

/* ======================================================
   TITKOSÍTÁS
   ====================================================== */

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
    alap, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
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

const nevTitkosit = async (nev) => b64(await titkosit(szovegbol(nev)));
async function nevVisszafejt(titkosNev) {
  try { return new TextDecoder().decode(await visszafejt(b64bol(titkosNev))); }
  catch { return "(nem olvasható név)"; }
}

/* ======================================================
   SZERVER HÍVÁSOK
   ====================================================== */

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

/* ======================================================
   BELÉPÉS / KILÉPÉS
   ====================================================== */

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
    return belepesHiba("Az oldal csak a Cloudflare-re feltéve működik (lásd TELEPITES.md).");
  }

  tolt(true);
  $("belepes-hiba").textContent = "";
  try {
    belepesiKulcs = await szamolBelepesiKulcs(jelszo);
    const adat = await (await api("files")).json();
    titkositoKulcs = await szamolTitkositoKulcs(jelszo, adat.so);
    $("jelszo").value = "";
    await listaFeldolgoz(adat.fajlok);
    belepesAllapot(true);
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

function belepesAllapot(bent) {
  $("belepes-urlap").hidden = bent;
  $("fajlkezelo").hidden = !bent;
  $("kilepes").hidden = !bent;
  $("kilepes-mobil").hidden = !bent;
  $("statok-zar").hidden = bent;
  $("allapot").classList.toggle("belepve", bent);
  $("allapot-szoveg").textContent = bent ? "Belépve · titkosítva" : "Zárolva";
}

function kilepes(uzenet) {
  belepesiKulcs = null;
  titkositoKulcs = null;
  fajlok = [];
  if ($("elonezet").open) $("elonezet").close();
  belepesAllapot(false);
  listaRajzol();
  if (uzenet) $("belepes-hiba").textContent = uzenet;
  location.hash = "#/fajlok";
}
$("kilepes").addEventListener("click", () => kilepes());
$("kilepes-mobil").addEventListener("click", () => kilepes());

let tetlensegIdozito;
function tetlensegFigyelo() {
  clearTimeout(tetlensegIdozito);
  tetlensegIdozito = setTimeout(() => titkositoKulcs && kilepes("Tétlenség miatt kiléptél."), TETLENSEG_PERC * 60 * 1000);
}
["click", "keydown", "mousemove", "touchstart"].forEach((e) =>
  document.addEventListener(e, () => titkositoKulcs && tetlensegFigyelo(), { passive: true })
);

/* ======================================================
   FÁJLLISTA, RENDEZÉS, STATISZTIKA
   ====================================================== */

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

// Rendezés: a választás megmarad a böngészőben (ha engedi)
try { $("rendezes").value = localStorage.getItem("rendezes") || "ido-le"; } catch {}
$("rendezes").addEventListener("change", () => {
  try { localStorage.setItem("rendezes", $("rendezes").value); } catch {}
  listaRajzol();
});
$("kereses").addEventListener("input", listaRajzol);

function rendezett(lista) {
  const [mezo, irany] = $("rendezes").value.split("-");
  const szorzo = irany === "fel" ? 1 : -1;
  return [...lista].sort((a, b) => {
    if (mezo === "nev") return szorzo * a.nev.localeCompare(b.nev, "hu", { numeric: true });
    return szorzo * ((a[mezo] || 0) - (b[mezo] || 0));
  });
}

function fajlSor(f, { egyszeru = false } = {}) {
  const kiterjesztes = (f.nev.split(".").pop() || "").toLowerCase();
  const li = document.createElement("li");
  li.className = "fajl";
  li.innerHTML = `
    <div class="fajl-ikon ${kiterjesztes === "csv" ? "csv" : ""}"></div>
    <div class="fajl-adatok"><div class="fajl-nev"></div><div class="fajl-info"></div></div>
    ${egyszeru ? "" : `
    <div class="fajl-gombok">
      <button class="kis-gomb nez" title="Előnézet" aria-label="Előnézet">
        <svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      </button>
      <button class="kis-gomb letolt" title="Letöltés" aria-label="Letöltés">
        <svg viewBox="0 0 24 24"><path d="M12 4v12M7 11l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="kis-gomb torles" title="Törlés" aria-label="Törlés">
        <svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>`}`;
  // textContent-tel írjuk be a nevet, így egy furcsa fájlnév sem tud kódot futtatni
  li.querySelector(".fajl-ikon").textContent = (kiterjesztes || "?").slice(0, 4).toUpperCase();
  li.querySelector(".fajl-nev").textContent = f.nev;
  li.querySelector(".fajl-nev").title = f.nev;
  li.querySelector(".fajl-info").textContent = meret(f.meret) + " · " + datum(f.ido);
  if (egyszeru) {
    li.addEventListener("click", () => elonezet(f));
  } else {
    li.querySelector(".nez").addEventListener("click", () => elonezet(f));
    li.querySelector(".letolt").addEventListener("click", (e) => letolt(f, e.currentTarget));
    li.querySelector(".torles").addEventListener("click", () => torol(f));
  }
  return li;
}

function listaRajzol() {
  const szuro = $("kereses").value.trim().toLowerCase();
  const lathato = rendezett(fajlok.filter((f) => f.nev.toLowerCase().includes(szuro)));

  const ul = $("fajl-lista");
  ul.innerHTML = "";
  lathato.forEach((f) => ul.appendChild(fajlSor(f)));

  $("ures").hidden = lathato.length > 0;
  $("ures-szoveg").textContent = fajlok.length ? "Nincs találat a keresésre." : "Még nincs feltöltött fájl.";

  const ossz = fajlok.reduce((s, f) => s + (f.meret || 0), 0);
  $("osszesito").textContent = titkositoKulcs
    ? (fajlok.length ? `${fajlok.length} fájl · ${meret(ossz)} · titkosítva` : "Még üres")
    : "Titkosított Excel tárhely";

  $("menu-szam").hidden = !titkositoKulcs || !fajlok.length;
  $("menu-szam").textContent = fajlok.length;

  statisztikaRajzol(ossz);
}

function statisztikaRajzol(ossz) {
  const bent = !!titkositoKulcs;
  const legujabb = fajlok.reduce((m, f) => (!m || f.ido > m.ido ? f : m), null);
  $("stat-db").textContent = bent ? fajlok.length : "–";
  $("stat-meret").textContent = bent ? meret(ossz) : "–";
  $("stat-utolso").textContent = bent ? (legujabb ? relativIdo(legujabb.ido) : "még nincs") : "–";
  const szazalek = bent ? Math.max(ossz / TARHELY * 100, ossz ? 0.5 : 0) : 0;
  $("stat-tarhely").textContent = bent ? szazalek.toFixed(1).replace(".", ",") + " %" : "–";
  $("stat-sav").style.width = szazalek + "%";

  const ul = $("legutobbi");
  ul.innerHTML = "";
  if (bent) {
    [...fajlok].sort((a, b) => b.ido - a.ido).slice(0, 4).forEach((f) => ul.appendChild(fajlSor(f, { egyszeru: true })));
  }
  $("legutobbi-ures").hidden = bent && fajlok.length > 0;
  $("legutobbi-ures").textContent = bent ? "Még nincs feltöltött fájl." : "Lépj be, hogy lásd a fájljaidat.";
}

/* ======================================================
   FELTÖLTÉS
   ====================================================== */

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

/* ======================================================
   LETÖLTÉS, TÖRLÉS
   ====================================================== */

// Letölti és visszafejti a fájlt (a letöltéshez és az előnézethez is ez kell)
async function fajlTartalom(f) {
  const titkos = new Uint8Array(await (await api("files/" + f.id)).arrayBuffer());
  return visszafejt(titkos);
}

function mentes(adat, nev) {
  const url = URL.createObjectURL(new Blob([adat], { type: tipus(nev) }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nev;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

async function letolt(f, gomb) {
  if (gomb) gomb.disabled = true;
  try {
    mentes(await fajlTartalom(f), f.nev);
  } catch (hiba) {
    hibaKezeles(hiba);
  } finally {
    if (gomb) gomb.disabled = false;
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
    hibaKezeles(hiba);
  }
}

function hibaKezeles(hiba) {
  if (hiba.status === 401) return kilepes("Lejárt a belépés, lépj be újra.");
  ertesit(hiba.name === "OperationError" ? "A fájlt nem sikerült visszafejteni." : hiba.message, true);
}

/* ======================================================
   ELŐNÉZET (Excel fájl megnyitása a böngészőben)
   ====================================================== */

const MAX_SOR = 500;
const MAX_OSZLOP = 50;
let elonezetFajl = null;
let elonezetMunkafuzet = null;
let sheetjsBetoltes = null;

function sheetjsBetolt() {
  if (window.XLSX) return Promise.resolve();
  if (!sheetjsBetoltes) {
    sheetjsBetoltes = new Promise((kesz, hiba) => {
      const s = document.createElement("script");
      s.src = SHEETJS;
      s.onload = kesz;
      s.onerror = () => { sheetjsBetoltes = null; hiba(new Error("Az előnézet nem töltődött be. Van internet?")); };
      document.head.appendChild(s);
    });
  }
  return sheetjsBetoltes;
}

async function elonezet(f) {
  elonezetFajl = f;
  elonezetMunkafuzet = null;
  const ablak = $("elonezet");
  const kiterjesztes = (f.nev.split(".").pop() || "").toUpperCase();
  ablak.querySelector(".fajl-ikon").textContent = kiterjesztes.slice(0, 4);
  ablak.querySelector(".fajl-ikon").classList.toggle("csv", kiterjesztes === "CSV");
  $("elonezet-nev").textContent = f.nev;
  $("elonezet-info").textContent = meret(f.meret) + " · " + datum(f.ido);
  $("lapfulek").innerHTML = "";
  $("tabla-doboz").innerHTML = `<div class="kozep-tolto"><span class="porgo sotet"></span><span>Visszafejtés és megnyitás…</span></div>`;
  if (!ablak.open) ablak.showModal();

  try {
    const [adat] = await Promise.all([fajlTartalom(f), sheetjsBetolt()]);
    if (elonezetFajl !== f) return; // közben másikat nyitottak meg
    elonezetMunkafuzet = XLSX.read(adat, { type: "array", cellDates: true, dense: false });
    const lapok = elonezetMunkafuzet.SheetNames;
    lapok.forEach((nev, i) => {
      const gomb = document.createElement("button");
      gomb.className = "lapful";
      gomb.textContent = nev;
      gomb.addEventListener("click", () => lapMutat(i));
      $("lapfulek").appendChild(gomb);
    });
    lapMutat(0);
  } catch (hiba) {
    if (hiba.status === 401) { ablak.close(); return kilepes("Lejárt a belépés, lépj be újra."); }
    $("tabla-doboz").innerHTML = `<div class="kozep-tolto"><div style="font-size:36px">😕</div><span></span></div>`;
    $("tabla-doboz").querySelector("span").textContent =
      hiba.status ? hiba.message : "Ezt a fájlt nem sikerült megnyitni előnézetben. Töltsd le, és nyisd meg Excelben.";
  }
}

function oszlopBetu(i) {
  let s = "";
  for (i++; i > 0; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + ((i - 1) % 26)) + s;
  return s;
}

function lapMutat(index) {
  const wb = elonezetMunkafuzet;
  const lapNev = wb.SheetNames[index];
  document.querySelectorAll(".lapful").forEach((g, i) => g.classList.toggle("aktiv", i === index));

  const lap = wb.Sheets[lapNev];
  const doboz = $("tabla-doboz");
  doboz.innerHTML = "";
  doboz.scrollTo(0, 0);

  const cellak = lap ? Object.keys(lap).filter((k) => k[0] !== "!") : [];
  if (!lap || !lap["!ref"] || cellak.length === 0) {
    doboz.innerHTML = `<div class="kozep-tolto"><div style="font-size:36px">📄</div><span>Ez a munkalap üres.</span></div>`;
    return;
  }

  const ter = XLSX.utils.decode_range(lap["!ref"]);
  const sorVege = Math.min(ter.e.r, ter.s.r + MAX_SOR - 1);
  const oszlopVege = Math.min(ter.e.c, ter.s.c + MAX_OSZLOP - 1);

  const tabla = document.createElement("table");
  tabla.className = "excel-tabla";
  const fej = tabla.createTHead().insertRow();
  fej.appendChild(document.createElement("th"));
  for (let c = ter.s.c; c <= oszlopVege; c++) {
    const th = document.createElement("th");
    th.textContent = oszlopBetu(c);
    fej.appendChild(th);
  }
  const test = tabla.createTBody();
  for (let r = ter.s.r; r <= sorVege; r++) {
    const tr = test.insertRow();
    const th = document.createElement("th");
    th.textContent = r + 1;
    tr.appendChild(th);
    for (let c = ter.s.c; c <= oszlopVege; c++) {
      const cella = lap[XLSX.utils.encode_cell({ r, c })];
      const td = tr.insertCell();
      if (cella) {
        let ertek = cella.w ?? cella.v;
        if (cella.v instanceof Date) ertek = cella.v.toLocaleDateString("hu-HU");
        else if (cella.t === "n" && cella.w == null) ertek = cella.v.toLocaleString("hu-HU");
        td.textContent = ertek ?? "";
        td.title = cella.f ? "=" + cella.f : td.textContent;
        if (cella.t === "n") td.className = "szam";
      }
    }
  }
  doboz.appendChild(tabla);

  const osszesSor = ter.e.r - ter.s.r + 1;
  const osszesOszlop = ter.e.c - ter.s.c + 1;
  const regi = document.querySelector(".tabla-megjegyzes");
  if (regi) regi.remove();
  if (osszesSor > MAX_SOR || osszesOszlop > MAX_OSZLOP) {
    const p = document.createElement("div");
    p.className = "tabla-megjegyzes";
    p.textContent = `Az előnézet az első ${Math.min(osszesSor, MAX_SOR)} sort és ${Math.min(osszesOszlop, MAX_OSZLOP)} oszlopot mutatja (összesen ${osszesSor} × ${osszesOszlop}). A teljes fájlhoz töltsd le.`;
    $("elonezet").appendChild(p);
  }
}

$("elonezet-bezar").addEventListener("click", () => $("elonezet").close());
$("elonezet").addEventListener("click", (e) => { if (e.target === $("elonezet")) $("elonezet").close(); });
$("elonezet").addEventListener("close", () => {
  elonezetFajl = null;
  elonezetMunkafuzet = null;
  $("tabla-doboz").innerHTML = "";
  const regi = document.querySelector(".tabla-megjegyzes");
  if (regi) regi.remove();
});
$("elonezet-letolt").addEventListener("click", (e) => elonezetFajl && letolt(elonezetFajl, e.currentTarget));

/* ======================================================
   EXCEL SÚGÓ: FÜGGVÉNYEK
   ====================================================== */

let aktivKategoria = "mind";

function kategoriakRajzol() {
  const doboz = $("fv-kategoriak");
  const lista = [["mind", "Mind"], ...Object.entries(KATEGORIAK).map(([k, v]) => [k, v.nev])];
  doboz.innerHTML = "";
  for (const [kulcs, nev] of lista) {
    const gomb = document.createElement("button");
    gomb.className = "cimke" + (kulcs === aktivKategoria ? " aktiv" : "");
    gomb.textContent = nev;
    gomb.addEventListener("click", () => { aktivKategoria = kulcs; kategoriakRajzol(); fuggvenyekRajzol(); });
    doboz.appendChild(gomb);
  }
}

function fvKartya(fv) {
  const kat = KATEGORIAK[fv.kat];
  const div = document.createElement("article");
  div.className = "kartya fv";
  div.innerHTML = `
    <div class="fv-fej">
      <span class="fv-nev"></span><span class="fv-angol"></span>
      <span class="fv-kat ${kat.szin}"></span>
    </div>
    <p class="fv-leiras"></p>
    <div class="fv-szintaxis kod"></div>
    <div class="kepletsor">
      <span class="fx">fx</span><code></code>
      <button class="kis-gomb masol" title="Képlet másolása" aria-label="Képlet másolása">
        <svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      </button>
    </div>
    <p class="fv-pelda"></p>`;
  div.querySelector(".fv-nev").textContent = fv.nev;
  div.querySelector(".fv-angol").textContent = fv.angol;
  div.querySelector(".fv-kat").textContent = kat.nev;
  div.querySelector(".fv-leiras").textContent = fv.leiras;
  div.querySelector(".fv-szintaxis").textContent = fv.szintaxis;
  div.querySelector("code").textContent = fv.keplet;
  div.querySelector(".fv-pelda").textContent = "💡 " + fv.pelda;
  div.querySelector(".masol").addEventListener("click", () => masol(fv.keplet));
  return div;
}

function fuggvenyekRajzol() {
  const szuro = $("fv-kereses").value.trim().toLowerCase();
  const lista = FUGGVENYEK.filter((fv) =>
    (aktivKategoria === "mind" || fv.kat === aktivKategoria) &&
    [fv.nev, fv.angol, fv.leiras, fv.pelda].join(" ").toLowerCase().includes(szuro)
  );
  const doboz = $("fv-lista");
  doboz.innerHTML = "";
  lista.forEach((fv) => doboz.appendChild(fvKartya(fv)));
  $("fv-ures").hidden = lista.length > 0;
}
$("fv-kereses").addEventListener("input", fuggvenyekRajzol);

async function masol(szoveg) {
  try {
    await navigator.clipboard.writeText(szoveg);
    ertesit("📋 Képlet kimásolva – illeszd be Excelbe (Ctrl+V)");
  } catch {
    ertesit("Nem sikerült a másolás. Jelöld ki és másold kézzel.", true);
  }
}

/* ---------- Napi tipp a kezdőlapon ---------- */
let tippIndex = Math.floor(Date.now() / 864e5) % FUGGVENYEK.length; // minden nap másik

function tippRajzol() {
  const fv = FUGGVENYEK[tippIndex];
  const doboz = $("tipp");
  doboz.innerHTML = `
    <div class="tipp-nev"><strong></strong><span class="fv-angol"></span></div>
    <p class="tipp-leiras"></p>
    <div class="kepletsor"><span class="fx">fx</span><code></code>
      <button class="kis-gomb masol" title="Képlet másolása" aria-label="Képlet másolása">
        <svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      </button>
    </div>
    <p class="fv-pelda" style="margin-top:10px"></p>`;
  doboz.querySelector("strong").textContent = fv.nev;
  doboz.querySelector(".fv-angol").textContent = fv.angol;
  doboz.querySelector(".tipp-leiras").textContent = fv.leiras;
  doboz.querySelector("code").textContent = fv.keplet;
  doboz.querySelector(".fv-pelda").textContent = "💡 " + fv.pelda;
  doboz.querySelector(".masol").addEventListener("click", () => masol(fv.keplet));
}
$("uj-tipp").addEventListener("click", () => {
  tippIndex = (tippIndex + 1 + Math.floor(Math.random() * (FUGGVENYEK.length - 1))) % FUGGVENYEK.length;
  tippRajzol();
});

/* ======================================================
   EXCEL SÚGÓ: BILLENTYŰPARANCSOK
   ====================================================== */

function billentyukRajzol() {
  const doboz = $("billentyu-lista");
  for (const csoport of BILLENTYUK) {
    const kartya = document.createElement("section");
    kartya.className = "kartya billentyu-csoport";
    const h2 = document.createElement("h2");
    h2.innerHTML = `<span class="${csoport.szin}"></span>`;
    h2.querySelector("span").textContent = csoport.ikon;
    h2.append(csoport.cim);
    kartya.appendChild(h2);

    for (const [leiras, ...kombok] of csoport.sorok) {
      const sor = document.createElement("div");
      sor.className = "billentyu-sor";
      const szoveg = document.createElement("span");
      szoveg.textContent = leiras;
      const billentyuk = document.createElement("span");
      billentyuk.className = "billentyuk";
      kombok.forEach((komb, i) => {
        if (i > 0) billentyuk.append(" / ");
        komb.forEach((b, j) => {
          if (j > 0) billentyuk.append("+");
          const kbd = document.createElement("kbd");
          kbd.textContent = b;
          billentyuk.appendChild(kbd);
        });
      });
      sor.append(szoveg, billentyuk);
      kartya.appendChild(sor);
    }
    doboz.appendChild(kartya);
  }
}

/* ======================================================
   SEGÉDFÜGGVÉNYEK
   ====================================================== */

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
  if (b < 1024 * 1024 * 1024) return (b / 1024 / 1024).toFixed(1).replace(".", ",") + " MB";
  return (b / 1024 / 1024 / 1024).toFixed(2).replace(".", ",") + " GB";
}

function datum(ms) {
  const d = new Date(ms);
  const ido = d.toLocaleTimeString("hu-HU", { hour: "2-digit", minute: "2-digit" });
  if (d.toDateString() === new Date().toDateString()) return "ma " + ido;
  if (d.toDateString() === new Date(Date.now() - 864e5).toDateString()) return "tegnap " + ido;
  return d.toLocaleDateString("hu-HU", { year: "numeric", month: "short", day: "numeric" }) + " " + ido;
}

function relativIdo(ms) {
  const perc = Math.round((Date.now() - ms) / 60000);
  if (perc < 1) return "most";
  if (perc < 60) return perc + " perce";
  const ora = Math.round(perc / 60);
  if (ora < 24) return ora + " órája";
  const nap = Math.round(ora / 24);
  if (nap < 30) return nap + " napja";
  return new Date(ms).toLocaleDateString("hu-HU", { month: "short", day: "numeric" });
}

function ertesit(szoveg, hibas = false) {
  const el = document.createElement("div");
  el.className = "ertesites" + (hibas ? " hiba-tipus" : "");
  el.textContent = szoveg;
  $("ertesitesek").appendChild(el);
  setTimeout(() => { el.classList.add("eltunik"); setTimeout(() => el.remove(), 300); }, hibas ? 5000 : 2800);
}

function koszontes() {
  const ora = new Date().getHours();
  const szoveg = ora < 5 ? "Jó éjszakát" : ora < 9 ? "Jó reggelt" : ora < 18 ? "Szép napot" : "Jó estét";
  $("koszontes").textContent = szoveg + "! 👋";
  const ma = new Date().toLocaleDateString("hu-HU", { year: "numeric", month: "long", day: "numeric", weekday: "long" });
  $("mai-datum").textContent = ma;
}

/* ======================================================
   INDULÁS
   ====================================================== */

koszontes();
tippRajzol();
kategoriakRajzol();
fuggvenyekRajzol();
billentyukRajzol();
belepesAllapot(false);
listaRajzol();
oldalValtas();
