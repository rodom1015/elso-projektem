/*
  A BÖNGÉSZŐ RÉSZ (JavaScript)
  ============================
  - Nyelv: magyar (alap), szlovák, angol – a szövegek az i18n.js-ben vannak
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
   NYELV
   ====================================================== */

let nyelv = "hu";
try {
  const mentett = localStorage.getItem("nyelv");
  if (NYELVEK[mentett]) nyelv = mentett;
} catch {}

// Szöveg lekérése az aktuális nyelven, {valtozo} helyettesítéssel
function t(kulcs, valtozok = {}) {
  let s = SZOVEGEK[nyelv][kulcs] ?? SZOVEGEK.hu[kulcs] ?? kulcs;
  for (const [k, v] of Object.entries(valtozok)) s = s.replaceAll("{" + k + "}", v);
  return s;
}
const locale = () => NYELVEK[nyelv].locale;

function nyelvValtoRajzol() {
  document.querySelectorAll(".nyelvvalto").forEach((doboz) => {
    doboz.innerHTML = "";
    for (const [kod, adat] of Object.entries(NYELVEK)) {
      const gomb = document.createElement("button");
      gomb.type = "button";
      gomb.className = "nyelv-gomb" + (kod === nyelv ? " aktiv" : "");
      gomb.title = adat.nev;
      gomb.setAttribute("aria-pressed", kod === nyelv);
      gomb.innerHTML = `<span class="zaszlo"></span><span></span>`;
      gomb.firstChild.textContent = adat.zaszlo;
      gomb.lastChild.textContent = adat.rovid;
      gomb.addEventListener("click", () => nyelvBeallit(kod));
      doboz.appendChild(gomb);
    }
  });
}

function nyelvBeallit(kod) {
  nyelv = kod;
  utolsoPerc = -1;
  try { localStorage.setItem("nyelv", kod); } catch {}
  forditasAlkalmaz();
}

// Minden szöveg frissítése az új nyelvre
function forditasAlkalmaz() {
  document.documentElement.lang = nyelv;
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    el.title = t(el.dataset.i18nTitle);
    el.setAttribute("aria-label", t(el.dataset.i18nTitle));
  });
  $("fv-alcim").textContent = t("fn_sub", { n: FUGGVENYEK.length });
  $("sc-alcim").textContent = t("sc_sub", { n: billentyuDarab() });
  $("gyors-excel-sub").textContent = t("quick_excel_sub", { f: FUGGVENYEK.length, b: billentyuDarab() });
  $("gyors-mac-sub").textContent = t("quick_mac_sub", { n: MAKROK.length });
  $("mac-alcim").textContent = t("mac_sub", { n: MAKROK.length });

  nyelvValtoRajzol();
  koszontes();
  belepesAllapot(!!titkositoKulcs);
  listaRajzol();
  tippRajzol();
  kategoriakRajzol();
  fuggvenyekRajzol();
  billentyukRajzol();
  makrokRajzol();
  excelRajzol();
  wordRajzol();
  naptarRajzol();
  arfolyamRajzol();
  $("morzsa-oldal").textContent = t(OLDAL_NEVEK[aktivOldal]);
  oraFrissit();
  if (typeof kalkulatorFrissit === "function") kalkulatorFrissit();
  forditasHookok.forEach((f) => f());
  if (elonezetFajl) $("elonezet-info").textContent = meret(elonezetFajl.meret) + " · " + datum(elonezetFajl.ido);
}

/* ======================================================
   MENÜ ÉS OLDALAK
   ====================================================== */

const OLDALAK = ["kezdolap", "fajlok", "eszkozok", "szamolas", "excel", "powerquery", "word"];
// A régi címek (pl. a gyorskeresőből) az Excel oldal megfelelő fülére visznek
const OLDAL_ALIASOK = { fuggvenyek: ["excel", "fuggvenyek"], billentyuk: ["excel", "billentyuk"], makrok: ["excel", "makrok"] };
const OLDAL_NEVEK = { kezdolap: "nav_home", fajlok: "nav_files", szamolas: "calc_title", fuggvenyek: "nav_functions", billentyuk: "nav_shortcuts", makrok: "nav_macros", excel: "excel_title", powerquery: "pq_title", word: "word_title", eszkozok: "tools_title", megosztas: "sh_page_title" };

// A többi modul (időjárás, eszközök…) ide teszi a függvényét, ami nyelvváltáskor lefut
const forditasHookok = [];
let aktivOldal = "kezdolap";

function oldalValtas() {
  // Megosztott fájl linkje: #/s/<azonosító>.<kulcs>
  const qrOldal = location.hash.startsWith("#/qr/");
  const megosztott = location.hash.startsWith("#/s/");
  document.body.classList.toggle("megosztas-mod", megosztott || qrOldal);
  $("oldal-qr").hidden = !qrOldal;
  if (qrOldal) {
    OLDALAK.forEach((o) => ($("oldal-" + o).hidden = true));
    $("oldal-megosztas").hidden = true;
    aktivOldal = "kezdolap";
    if (typeof qrJovahagyoMegnyit === "function") qrJovahagyoMegnyit(location.hash.slice(5));
    return;
  }
  if (megosztott) {
    OLDALAK.forEach((o) => ($("oldal-" + o).hidden = true));
    $("oldal-megosztas").hidden = false;
    aktivOldal = "megosztas";
    $("morzsa-oldal").textContent = t("sh_page_title");
    if (typeof megosztottMegnyit === "function") megosztottMegnyit(location.hash.slice(4));
    return;
  }
  $("oldal-megosztas").hidden = true;
  let [oldal, al] = location.hash.replace("#/", "").split("/");
  if (OLDAL_ALIASOK[oldal]) [oldal, al] = OLDAL_ALIASOK[oldal];
  if (!OLDALAK.includes(oldal)) oldal = "kezdolap";
  if (oldal === "excel") {
    if (["fuggvenyek", "billentyuk", "makrok", "tippek"].includes(al)) excelFul = al;
    excelRajzol();
  }
  aktivOldal = oldal;
  $("morzsa-oldal").textContent = t(OLDAL_NEVEK[oldal]);
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

// A titkosító kulcs nyers bájtjai csak a memóriában vannak – a QR kódos belépés ezt adja át
// (titkosítva) a másik eszköznek. Sehova nem mentjük.
let nyersKulcs = null;

async function szamolNyersKulcs(jelszo, so) {
  const alap = await crypto.subtle.importKey("raw", szovegbol(jelszo), "PBKDF2", false, ["deriveBits"]);
  return new Uint8Array(await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: b64bol(so), iterations: KIFEJTES_KOR, hash: "SHA-256" }, alap, 256));
}
const kulcsNyersbol = (nyers) => crypto.subtle.importKey("raw", nyers, "AES-GCM", false, ["encrypt", "decrypt"]);

// Közös belépés: jelszóból vagy QR kódból kapott kulcsokkal
async function belepesKulcsokkal(bk, nyersVagyJelszo) {
  belepesiKulcs = bk;
  const adat = await (await api("files")).json();
  nyersKulcs = typeof nyersVagyJelszo === "string" ? await szamolNyersKulcs(nyersVagyJelszo, adat.so) : nyersVagyJelszo;
  titkositoKulcs = await kulcsNyersbol(nyersKulcs);
  await listaFeldolgoz(adat.fajlok);
  belepesAllapot(true);
  tetlensegFigyelo();
  if (typeof megosztasokBetolt === "function") megosztasokBetolt();
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
  catch { return null; }
}

/* ======================================================
   SZERVER HÍVÁSOK
   ====================================================== */

// A szerver üzenetei magyarok, ezért az állapotkód alapján fordítunk
function szerverHiba(status, uzenet = "") {
  if (status === 401) return t("wrong_password");
  if (status === 429) return t("too_many");
  if (status === 413) return t("upload_failed");
  if (status === 500 && uzenet.includes("JELSZO")) return t("no_secret");
  return t("server_error", { status });
}

async function api(utvonal, opciok = {}) {
  const valasz = await fetch("/api/" + utvonal, {
    ...opciok,
    headers: { ...(opciok.headers || {}), "X-Kulcs": belepesiKulcs },
  });
  if (!valasz.ok) {
    let uzenet = "";
    try { uzenet = (await valasz.json()).hiba || ""; } catch {}
    const hiba = new Error(szerverHiba(valasz.status, uzenet));
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
  if (location.protocol === "file:") return belepesHiba(t("file_protocol"));

  tolt(true);
  $("belepes-hiba").textContent = "";
  try {
    await belepesKulcsokkal(await szamolBelepesiKulcs(jelszo), jelszo);
    $("jelszo").value = "";
    if (typeof qrBelepesUtan === "function") qrBelepesUtan();
  } catch (hiba) {
    belepesiKulcs = null;
    belepesHiba(hiba.status ? hiba.message : t("no_server"));
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
  $("belepes-gomb").querySelector(".gomb-szoveg").textContent = be ? t("login_busy") : t("login");
  $("belepes-gomb").querySelector(".porgo").hidden = !be;
}

function belepesAllapot(bent) {
  $("belepes-urlap").hidden = bent;
  $("fajlkezelo").hidden = !bent;
  $("kilepes").hidden = !bent;
  $("kilepes-mobil").hidden = !bent;
  $("statok-zar").hidden = bent;
  if (!bent) $("megosztasok-kartya").hidden = true;
  $("allapot").classList.toggle("belepve", bent);
  $("allapot-szoveg").textContent = bent ? t("status_in") : t("status_locked");
}

function kilepes(uzenetKulcs) {
  belepesiKulcs = null;
  titkositoKulcs = null;
  nyersKulcs = null;
  fajlok = [];
  if ($("elonezet").open) $("elonezet").close();
  belepesAllapot(false);
  listaRajzol();
  $("belepes-hiba").textContent = uzenetKulcs ? t(uzenetKulcs) : "";
  location.hash = "#/fajlok";
}
$("kilepes").addEventListener("click", () => kilepes());
$("kilepes-mobil").addEventListener("click", () => kilepes());

let tetlensegIdozito;
function tetlensegFigyelo() {
  clearTimeout(tetlensegIdozito);
  tetlensegIdozito = setTimeout(() => titkositoKulcs && kilepes("idle_logout"), TETLENSEG_PERC * 60 * 1000);
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
    if (hiba.status === 401) return kilepes("session_expired");
    ertesit(hiba.message, true);
  }
}

async function listaFeldolgoz(lista) {
  fajlok = await Promise.all(lista.map(async (f) => ({ ...f, nev: (await nevVisszafejt(f.nev)) ?? t("unreadable_name") })));
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
    if (mezo === "nev") return szorzo * a.nev.localeCompare(b.nev, locale(), { numeric: true });
    return szorzo * ((a[mezo] || 0) - (b[mezo] || 0));
  });
}

const TABLAZAT = ["xlsx", "xlsm", "xls", "csv", "ods"];
const kiterjesztesOf = (nev) => (nev.split(".").pop() || "").toLowerCase();
const tablazatE = (nev) => TABLAZAT.includes(kiterjesztesOf(nev));
function ikonOsztaly(k) {
  if (k === "csv") return "csv";
  if (["doc", "docx"].includes(k)) return "word";
  if (k === "pdf") return "pdf";
  if (["ppt", "pptx"].includes(k)) return "ppt";
  if (k === "txt") return "txt";
  return "";
}

function fajlSor(f, { egyszeru = false } = {}) {
  const kiterjesztes = kiterjesztesOf(f.nev);
  const li = document.createElement("li");
  li.className = "fajl";
  li.innerHTML = `
    <div class="fajl-ikon ${ikonOsztaly(kiterjesztes)}"></div>
    <div class="fajl-adatok"><div class="fajl-nev"></div><div class="fajl-info"></div></div>
    ${egyszeru ? "" : `
    <div class="fajl-gombok">
      <button class="kis-gomb nez">
        <svg viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      </button>
      <button class="kis-gomb letolt">
        <svg viewBox="0 0 24 24"><path d="M12 4v12M7 11l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="kis-gomb megoszt">
        <svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <button class="kis-gomb torles">
        <svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>`}`;
  // textContent-tel írjuk be a nevet, így egy furcsa fájlnév sem tud kódot futtatni
  li.querySelector(".fajl-ikon").textContent = (kiterjesztes || "?").slice(0, 4).toUpperCase();
  li.querySelector(".fajl-nev").textContent = f.nev;
  li.querySelector(".fajl-nev").title = f.nev;
  li.querySelector(".fajl-info").textContent = meret(f.meret) + " · " + datum(f.ido);
  if (egyszeru) {
    li.addEventListener("click", () => (tablazatE(f.nev) ? elonezet(f) : letolt(f)));
  } else {
    if (!tablazatE(f.nev)) li.querySelector(".nez").style.visibility = "hidden"; // előnézet csak táblázatokhoz
    for (const [osztaly, kulcs] of [["nez", "preview"], ["letolt", "download"], ["megoszt", "sh_title"], ["torles", "delete"]]) {
      const gomb = li.querySelector("." + osztaly);
      gomb.title = t(kulcs);
      gomb.setAttribute("aria-label", t(kulcs));
    }
    li.querySelector(".nez").addEventListener("click", () => elonezet(f));
    li.querySelector(".letolt").addEventListener("click", (e) => letolt(f, e.currentTarget));
    li.querySelector(".torles").addEventListener("click", () => torol(f));
    li.querySelector(".megoszt").addEventListener("click", () => megosztasAblak(f));
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
  $("ures-szoveg").textContent = fajlok.length ? t("no_results") : t("no_files");

  const ossz = fajlok.reduce((s, f) => s + (f.meret || 0), 0);
  $("osszesito").textContent = titkositoKulcs
    ? (fajlok.length ? t("files_summary", { n: fajlok.length, size: meret(ossz) }) : t("files_empty"))
    : t("files_sub");

  $("menu-szam").hidden = !titkositoKulcs || !fajlok.length;
  $("menu-szam").textContent = fajlok.length;

  statisztikaRajzol(ossz);
}

function statisztikaRajzol(ossz) {
  const bent = !!titkositoKulcs;
  const legujabb = fajlok.reduce((m, f) => (!m || f.ido > m.ido ? f : m), null);
  $("stat-db").textContent = bent ? fajlok.length : "–";
  $("stat-meret").textContent = bent ? meret(ossz) : "–";
  $("stat-utolso").textContent = bent ? (legujabb ? relativIdo(legujabb.ido) : t("never")) : "–";
  const szazalek = bent ? Math.max(ossz / TARHELY * 100, ossz ? 0.5 : 0) : 0;
  $("stat-tarhely").textContent = bent ? szam(szazalek, 1) + " %" : "–";
  $("stat-sav").style.width = szazalek + "%";

  const ul = $("legutobbi");
  ul.innerHTML = "";
  if (bent) {
    [...fajlok].sort((a, b) => b.ido - a.ido).slice(0, 4).forEach((f) => ul.appendChild(fajlSor(f, { egyszeru: true })));
  }
  $("legutobbi-ures").hidden = bent && fajlok.length > 0;
  $("legutobbi-ures").textContent = bent ? t("no_files") : t("recent_locked");
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
  if (fajl.size > MAX_MERET) return ertesit(t("too_big", { name: fajl.name }), true);
  if (fajl.size === 0) return ertesit(t("empty_file", { name: fajl.name }), true);

  const sor = document.createElement("div");
  sor.className = "kartya feltoltes";
  sor.innerHTML = `<div class="feltoltes-sor"><span></span><span></span></div><div class="savsor"><div></div></div>`;
  const [nevEl, allapot] = sor.querySelectorAll("span");
  nevEl.textContent = fajl.name;
  allapot.textContent = t("encrypting");
  $("feltoltesek").appendChild(sor);
  const sav = sor.querySelector(".savsor div");

  try {
    const titkos = await titkosit(new Uint8Array(await fajl.arrayBuffer()));
    const titkosNev = await nevTitkosit(fajl.name);
    allapot.textContent = t("uploading");

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
        let uzenet = "";
        try { uzenet = JSON.parse(xhr.responseText).hiba || ""; } catch {}
        hiba(new Error(xhr.status === 413 ? t("too_big", { name: fajl.name }) : xhr.status === 401 ? t("session_expired") : (uzenet && szerverHiba(xhr.status, uzenet)) || t("upload_failed")));
      };
      xhr.onerror = () => hiba(new Error(t("connection_lost")));
      xhr.send(titkos);
    });

    sav.style.width = "100%";
    ertesit(t("uploaded", { name: fajl.name }));
  } catch (hiba) {
    ertesit(`${fajl.name}: ${hiba.message}`, true);
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
  if (!confirm(t("confirm_delete", { name: f.nev }))) return;
  try {
    await api("files/" + f.id, { method: "DELETE" });
    fajlok = fajlok.filter((x) => x.id !== f.id);
    listaRajzol();
    ertesit(t("deleted"));
  } catch (hiba) {
    hibaKezeles(hiba);
  }
}

function hibaKezeles(hiba) {
  if (hiba.status === 401) return kilepes("session_expired");
  ertesit(hiba.name === "OperationError" ? t("decrypt_failed") : hiba.message, true);
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
      s.onerror = () => { sheetjsBetoltes = null; hiba(new Error(t("preview_lib_failed"))); };
      document.head.appendChild(s);
    });
  }
  return sheetjsBetoltes;
}

function tablaUzenet(ikon, szoveg, porgo = false) {
  $("tabla-doboz").innerHTML = `<div class="kozep-tolto">${porgo ? '<span class="porgo sotet"></span>' : '<div style="font-size:36px"></div>'}<span></span></div>`;
  if (!porgo) $("tabla-doboz").querySelector("div div").textContent = ikon;
  $("tabla-doboz").querySelector(".kozep-tolto > span:last-child").textContent = szoveg;
}

async function elonezet(f) {
  elonezetFajl = f;
  elonezetMunkafuzet = null;
  const ablak = $("elonezet");
  const kiterjesztes = (f.nev.split(".").pop() || "").toUpperCase();
  ablak.querySelector(".fajl-ikon").textContent = kiterjesztes.slice(0, 4);
  ablak.querySelector(".fajl-ikon").className = "fajl-ikon " + ikonOsztaly(kiterjesztes.toLowerCase());
  $("elonezet-nev").textContent = f.nev;
  $("elonezet-info").textContent = meret(f.meret) + " · " + datum(f.ido);
  $("lapfulek").innerHTML = "";
  tablaUzenet("", t("loading_preview"), true);
  megjegyzesTorol();
  if (!ablak.open) ablak.showModal();

  try {
    const [adat] = await Promise.all([fajlTartalom(f), sheetjsBetolt()]);
    if (elonezetFajl !== f) return; // közben másikat nyitottak meg
    elonezetMunkafuzet = XLSX.read(adat, { type: "array", cellDates: true });
    elonezetMunkafuzet.SheetNames.forEach((nev, i) => {
      const gomb = document.createElement("button");
      gomb.className = "lapful";
      gomb.textContent = nev;
      gomb.addEventListener("click", () => lapMutat(i));
      $("lapfulek").appendChild(gomb);
    });
    lapMutat(0);
  } catch (hiba) {
    if (hiba.status === 401) { ablak.close(); return kilepes("session_expired"); }
    tablaUzenet("😕", hiba.status || hiba.message === t("preview_lib_failed") ? hiba.message : t("preview_failed"));
  }
}

function oszlopBetu(i) {
  let s = "";
  for (i++; i > 0; i = Math.floor((i - 1) / 26)) s = String.fromCharCode(65 + ((i - 1) % 26)) + s;
  return s;
}

function megjegyzesTorol() {
  const regi = document.querySelector(".tabla-megjegyzes");
  if (regi) regi.remove();
}

function lapMutat(index) {
  const wb = elonezetMunkafuzet;
  const lap = wb.Sheets[wb.SheetNames[index]];
  document.querySelectorAll(".lapful").forEach((g, i) => g.classList.toggle("aktiv", i === index));
  megjegyzesTorol();

  const cellak = lap ? Object.keys(lap).filter((k) => k[0] !== "!") : [];
  if (!lap || !lap["!ref"] || cellak.length === 0) return tablaUzenet("📄", t("sheet_empty"));

  const doboz = $("tabla-doboz");
  doboz.innerHTML = "";
  doboz.scrollTo(0, 0);

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
        if (cella.v instanceof Date) ertek = cella.v.toLocaleDateString(locale());
        else if (cella.t === "n" && cella.w == null) ertek = cella.v.toLocaleString(locale());
        td.textContent = ertek ?? "";
        td.title = cella.f ? "=" + cella.f : td.textContent;
        if (cella.t === "n") td.className = "szam";
      }
    }
  }
  doboz.appendChild(tabla);

  const osszesSor = ter.e.r - ter.s.r + 1;
  const osszesOszlop = ter.e.c - ter.s.c + 1;
  if (osszesSor > MAX_SOR || osszesOszlop > MAX_OSZLOP) {
    const p = document.createElement("div");
    p.className = "tabla-megjegyzes";
    p.textContent = t("preview_limit", { r: Math.min(osszesSor, MAX_SOR), c: Math.min(osszesOszlop, MAX_OSZLOP), tr: osszesSor, tc: osszesOszlop });
    $("elonezet").appendChild(p);
  }
}

$("elonezet-bezar").addEventListener("click", () => $("elonezet").close());
$("elonezet").addEventListener("click", (e) => { if (e.target === $("elonezet")) $("elonezet").close(); });
$("elonezet").addEventListener("close", () => {
  elonezetFajl = null;
  elonezetMunkafuzet = null;
  $("tabla-doboz").innerHTML = "";
  megjegyzesTorol();
});
$("elonezet-letolt").addEventListener("click", (e) => elonezetFajl && letolt(elonezetFajl, e.currentTarget));

/* ======================================================
   EXCEL SÚGÓ: FÜGGVÉNYEK
   ====================================================== */

// Angol -> magyar függvénynév szótár a képletek átírásához
const MAGYAR_NEV = {};
for (const fv of FUGGVENYEK) {
  const hu = fv.hu.split(" / ")[0], en = fv.en.split(" / ")[0];
  if (!hu.includes(" ") && !en.includes(" ")) MAGYAR_NEV[en] = hu;
}

MAGYAR_NEV.PMT = "RÉSZLET";
MAGYAR_NEV.ADDRESS = "CÍM";

// A szlovák alakú képletből (angol nevek + ;) elkészíti a kért nyelvű változatot
function kepletNyelven(keplet) {
  if (nyelv === "sk") return keplet;
  let ki = "", idezet = false;
  for (let i = 0; i < keplet.length; i++) {
    const ch = keplet[i];
    if (ch === '"') { idezet = !idezet; ki += ch; continue; }
    if (!idezet && nyelv === "en" && ch === ";") { ki += ","; continue; }
    if (!idezet && nyelv === "hu" && /[A-Z]/.test(ch) && (i === 0 || !/[A-Za-z0-9.$!]/.test(keplet[i - 1]))) {
      const m = keplet.slice(i).match(/^([A-Z][A-Z0-9.]*)\(/);
      if (m && MAGYAR_NEV[m[1]]) { ki += MAGYAR_NEV[m[1]]; i += m[1].length - 1; continue; }
    }
    ki += ch;
  }
  return ki;
}

function fvNev(fv) { return nyelv === "hu" ? fv.hu : fv.en; }
function fvParameterek(fv) {
  if (nyelv === "hu") return fv.parHu;
  return nyelv === "sk" ? fv.parEn.replaceAll(",", ";") : fv.parEn;
}
function fvSzintaxis(fv) {
  const nevek = fvNev(fv).split(" / ");
  return nevek.length > 1 ? nevek.map((n) => n + "(…)").join("   ") : `${nevek[0]}(${fvParameterek(fv)})`;
}

let aktivKategoria = "mind";

function kategoriakRajzol() {
  const doboz = $("fv-kategoriak");
  const lista = [["mind", t("fn_all")], ...Object.entries(KATEGORIAK).map(([k, v]) => [k, v.nev[nyelv]])];
  doboz.innerHTML = "";
  for (const [kulcs, nev] of lista) {
    const darab = kulcs === "mind" ? FUGGVENYEK.length : FUGGVENYEK.filter((f) => f.kat === kulcs).length;
    const gomb = document.createElement("button");
    gomb.className = "cimke" + (kulcs === aktivKategoria ? " aktiv" : "");
    gomb.textContent = `${nev} · ${darab}`;
    gomb.addEventListener("click", () => { aktivKategoria = kulcs; kategoriakRajzol(); fuggvenyekRajzol(); });
    doboz.appendChild(gomb);
  }
}

const MASOL_IKON = `<svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;

function kepletsor(keplet) {
  const div = document.createElement("div");
  div.className = "kepletsor";
  div.innerHTML = `<span class="fx">fx</span><code></code><button class="kis-gomb masol">${MASOL_IKON}</button>`;
  div.querySelector("code").textContent = keplet;
  const gomb = div.querySelector(".masol");
  gomb.title = t("copy_formula");
  gomb.setAttribute("aria-label", t("copy_formula"));
  gomb.addEventListener("click", () => masol(keplet));
  return div;
}

function fvKartya(fv) {
  const kat = KATEGORIAK[fv.kat];
  const div = document.createElement("article");
  div.className = "kartya fv";
  div.innerHTML = `
    <div class="fv-fej"><span class="fv-nev"></span><span class="fv-angol"></span><span class="fv-kat ${kat.szin}"></span></div>
    <p class="fv-leiras"></p>
    <div class="fv-szintaxis kod"></div>`;
  div.querySelector(".fv-nev").textContent = fvNev(fv);
  // Magyar nézetben az angol nevet, egyébként a magyart mutatjuk kis címkén
  const masik = nyelv === "hu" ? fv.en : fv.hu;
  if (masik !== fvNev(fv)) div.querySelector(".fv-angol").textContent = masik;
  else div.querySelector(".fv-angol").remove();
  div.querySelector(".fv-kat").textContent = kat.nev[nyelv];
  div.querySelector(".fv-leiras").textContent = fv.leiras[nyelv];
  div.querySelector(".fv-szintaxis").textContent = fvSzintaxis(fv);
  div.appendChild(kepletsor(kepletNyelven(fv.keplet)));
  if (fv.uj) {
    const cimke = document.createElement("span");
    cimke.className = "uj-cimke";
    cimke.textContent = "2024";
    div.querySelector(".fv-fej").insertBefore(cimke, div.querySelector(".fv-kat"));
  }
  if (fv.ellenorzetlen && nyelv === "hu") {
    const p = document.createElement("p");
    p.className = "fv-figyelmeztetes";
    p.textContent = t("fn_unverified");
    div.appendChild(p);
  }
  return div;
}

function fuggvenyekRajzol() {
  const szuro = $("excel-kereses").value.trim().toLowerCase();
  const lista = FUGGVENYEK.filter((fv) =>
    (aktivKategoria === "mind" || fv.kat === aktivKategoria) &&
    [fv.hu, fv.en, fv.leiras[nyelv]].join(" ").toLowerCase().includes(szuro)
  );
  const doboz = $("fv-lista");
  doboz.innerHTML = "";
  lista.forEach((fv) => doboz.appendChild(fvKartya(fv)));
  $("fv-ures").hidden = lista.length > 0;
}


async function masol(szoveg, uzenetKulcs = "copied") {
  try {
    await navigator.clipboard.writeText(szoveg);
    ertesit(t(uzenetKulcs));
  } catch {
    ertesit(t("copy_failed"), true);
  }
}

/* ---------- Napi tipp a kezdőlapon ---------- */
let tippIndex = Math.floor(Date.now() / 864e5) % FUGGVENYEK.length; // minden nap másik

function tippRajzol() {
  const fv = FUGGVENYEK[tippIndex];
  const doboz = $("tipp");
  doboz.innerHTML = `<div class="tipp-nev"><strong></strong><span class="fv-angol"></span></div><p class="tipp-leiras"></p>`;
  doboz.querySelector("strong").textContent = fvNev(fv);
  const masik = nyelv === "hu" ? fv.en : fv.hu;
  doboz.querySelector(".fv-angol").textContent = masik;
  if (masik === fvNev(fv)) doboz.querySelector(".fv-angol").remove();
  doboz.querySelector(".tipp-leiras").textContent = fv.leiras[nyelv];
  doboz.appendChild(kepletsor(kepletNyelven(fv.keplet)));
}
$("uj-tipp").addEventListener("click", () => {
  tippIndex = (tippIndex + 1 + Math.floor(Math.random() * (FUGGVENYEK.length - 1))) % FUGGVENYEK.length;
  tippRajzol();
});

/* ======================================================
   EXCEL SÚGÓ: BILLENTYŰPARANCSOK
   ====================================================== */

const billentyuDarab = () => BILLENTYUK.reduce((s, cs) => s + cs.sorok.length, 0);
const billentyuNev = (b) => (BILLENTYU_NEVEK[b] ? BILLENTYU_NEVEK[b][nyelv] : b);

// Billentyűparancs-csoportok kirajzolása (Excel és Word oldal is ezt használja)
function billentyuCsoportokRajzol(adat, doboz, szuro) {
  doboz.innerHTML = "";
  let osszes = 0;
  for (const csoport of adat) {
    const sorok = csoport.sorok.filter(([leiras, ...kombok]) =>
      !szuro ||
      leiras[nyelv].toLowerCase().includes(szuro) ||
      kombok.flat().map(billentyuNev).join(" ").toLowerCase().includes(szuro) ||
      csoport.cim[nyelv].toLowerCase().includes(szuro)
    );
    if (!sorok.length) continue;
    osszes += sorok.length;

    const kartya = document.createElement("section");
    kartya.className = "kartya billentyu-csoport";
    const h2 = document.createElement("h2");
    h2.innerHTML = `<span class="${csoport.szin}"></span><b></b><em class="darab"></em>`;
    h2.querySelector("span").textContent = csoport.ikon;
    h2.querySelector("b").textContent = csoport.cim[nyelv];
    h2.querySelector("em").textContent = sorok.length;
    kartya.appendChild(h2);

    for (const [leiras, ...kombok] of sorok) {
      const sor = document.createElement("div");
      sor.className = "billentyu-sor";
      const szoveg = document.createElement("span");
      szoveg.textContent = leiras[nyelv];
      const billentyuk = document.createElement("span");
      billentyuk.className = "billentyuk";
      kombok.forEach((komb, i) => {
        if (i > 0) billentyuk.append(" / ");
        komb.forEach((b, j) => {
          if (j > 0) billentyuk.append("+");
          const kbd = document.createElement("kbd");
          kbd.textContent = billentyuNev(b);
          billentyuk.appendChild(kbd);
        });
      });
      sor.append(szoveg, billentyuk);
      kartya.appendChild(sor);
    }
    doboz.appendChild(kartya);
  }
  return osszes;
}

function billentyukRajzol() {
  const db = billentyuCsoportokRajzol(BILLENTYUK, $("billentyu-lista"), $("excel-kereses").value.trim().toLowerCase());
  $("sc-ures").hidden = db > 0;
}

/* ======================================================
   EXCEL OLDAL: fülek (függvények, billentyűk, makrók, tippek) és közös kereső
   ====================================================== */
let excelFul = "fuggvenyek";
try { excelFul = localStorage.getItem("excelFul") || excelFul; } catch {}

function excelRajzol() {
  $("excel-alcim").textContent = t("excel_sub", { f: FUGGVENYEK.length, b: billentyuDarab(), m: MAKROK.length, t: EXCEL_TIPPEK.length });
  document.querySelectorAll("#excel-fulek button").forEach((g) => g.classList.toggle("aktiv", g.dataset.ful === excelFul));
  for (const f of ["fuggvenyek", "billentyuk", "makrok", "tippek"]) $(`excel-${f}-doboz`).hidden = f !== excelFul;
  if (excelFul === "tippek") excelTippekRajzol();
}

function excelTippekRajzol() {
  const szuro = $("excel-kereses").value.trim().toLowerCase();
  const lista = EXCEL_TIPPEK.filter((tp) => !szuro || (tp.cim[nyelv] + " " + tp.szoveg[nyelv]).toLowerCase().includes(szuro));
  const doboz = $("excel-tippek");
  doboz.innerHTML = "";
  for (const tp of lista) {
    const k = document.createElement("article");
    k.className = "kartya word-tipp excel-tipp";
    k.innerHTML = `<div class="word-tipp-ikon"></div><div><h2></h2><p></p></div>`;
    k.querySelector(".word-tipp-ikon").textContent = tp.ikon;
    k.querySelector("h2").textContent = tp.cim[nyelv];
    k.querySelector("p").textContent = tp.szoveg[nyelv];
    doboz.appendChild(k);
  }
  $("tip-ures").hidden = lista.length > 0;
}

document.querySelectorAll("#excel-fulek button").forEach((g) =>
  g.addEventListener("click", () => {
    excelFul = g.dataset.ful;
    try { localStorage.setItem("excelFul", excelFul); } catch {}
    excelRajzol();
  })
);
// A kereső mindig az aktív fület szűri (a többit is frissítjük, hogy fülváltáskor is stimmeljen)
$("excel-kereses").addEventListener("input", () => {
  fuggvenyekRajzol();
  billentyukRajzol();
  makrokRajzol();
  if (excelFul === "tippek") excelTippekRajzol();
});

/* ======================================================
   WORD SÚGÓ
   ====================================================== */

let wordFul = "billentyuk";
const wordBillentyuDarab = () => WORD_BILLENTYUK.reduce((s, cs) => s + cs.sorok.length, 0);

function wordRajzol() {
  $("word-alcim").textContent = t("word_sub2", { n: wordBillentyuDarab(), t: WORD_TIPPEK.length, m: WORD_MAKROK.length });
  const szuro = $("word-kereses").value.trim().toLowerCase();
  document.querySelectorAll("#word-fulek button").forEach((g) => g.classList.toggle("aktiv", g.dataset.ful === wordFul));
  $("word-billentyuk").hidden = wordFul !== "billentyuk";
  $("word-tippek").hidden = wordFul !== "tippek";
  $("word-makrok-doboz").hidden = wordFul !== "makrok";

  let db;
  if (wordFul === "billentyuk") {
    db = billentyuCsoportokRajzol(WORD_BILLENTYUK, $("word-billentyuk"), szuro);
  } else if (wordFul === "makrok") {
    $("word-mac-lepesek").innerHTML = "";
    for (const lepes of WORD_MAKRO_UTMUTATO[nyelv]) {
      const li = document.createElement("li");
      li.textContent = lepes;
      $("word-mac-lepesek").appendChild(li);
    }
    $("word-mac-figyelmeztetes").textContent = WORD_MAKRO_FIGYELMEZTETES[nyelv];
    const lista = WORD_MAKROK.filter((m) => !szuro || (m.cim[nyelv] + " " + m.leiras[nyelv] + " " + m.kod).toLowerCase().includes(szuro));
    $("word-makro-lista").innerHTML = "";
    lista.forEach((m) => $("word-makro-lista").appendChild(makroKartya(m)));
    db = lista.length;
  } else {
    const doboz = $("word-tippek");
    doboz.innerHTML = "";
    const lista = WORD_TIPPEK.filter((tp) => !szuro || (tp.cim[nyelv] + " " + tp.szoveg[nyelv]).toLowerCase().includes(szuro));
    for (const tp of lista) {
      const k = document.createElement("article");
      k.className = "kartya word-tipp";
      k.innerHTML = `<div class="word-tipp-ikon"></div><div><h2></h2><p></p></div>`;
      k.querySelector(".word-tipp-ikon").textContent = tp.ikon;
      k.querySelector("h2").textContent = tp.cim[nyelv];
      k.querySelector("p").textContent = tp.szoveg[nyelv];
      doboz.appendChild(k);
    }
    db = lista.length;
  }
  $("word-ures").hidden = db > 0;
}
document.querySelectorAll("#word-fulek button").forEach((g) =>
  g.addEventListener("click", () => { wordFul = g.dataset.ful; wordRajzol(); })
);
$("word-kereses").addEventListener("input", wordRajzol);

/* ======================================================
   NAPTÁR (magyar / szlovák ünnepnapokkal)
   ====================================================== */

let naptarHonap = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let naptarOrszag = null;
try { naptarOrszag = localStorage.getItem("naptarOrszag"); } catch {}

function naptarRajzol() {
  const orszag = naptarOrszag || (nyelv === "sk" ? "sk" : "hu");
  document.querySelectorAll("#naptar-orszag button").forEach((g) => g.classList.toggle("aktiv", g.dataset.orszag === orszag));

  const ev = naptarHonap.getFullYear(), ho = naptarHonap.getMonth();
  $("naptar-honap").textContent = naptarHonap.toLocaleDateString(locale(), { year: "numeric", month: "long" });

  const racs = $("naptar");
  racs.innerHTML = "";
  // Hét napjainak rövid neve (hétfővel kezdve)
  for (let i = 0; i < 7; i++) {
    const fej = document.createElement("div");
    fej.className = "naptar-fej" + (i >= 5 ? " hetvege" : "");
    fej.textContent = new Date(2024, 0, 1 + i).toLocaleDateString(locale(), { weekday: "short" }).replace(".", "");
    racs.appendChild(fej);
  }
  const elsoNap = (new Date(ev, ho, 1).getDay() + 6) % 7; // 0 = hétfő
  const napokSzama = new Date(ev, ho + 1, 0).getDate();
  const ma = new Date();
  const unnepek = [];

  for (let i = 0; i < elsoNap; i++) racs.appendChild(document.createElement("div"));
  for (let n = 1; n <= napokSzama; n++) {
    const d = new Date(ev, ho, n);
    const cella = document.createElement("div");
    const unnep = unnepE(d, orszag);
    cella.className = "naptar-nap";
    if (d.getDay() === 0 || d.getDay() === 6) cella.classList.add("hetvege");
    if (unnep) { cella.classList.add("unnep"); cella.title = unnep[nyelv]; unnepek.push([d, unnep]); }
    if (d.toDateString() === ma.toDateString()) cella.classList.add("ma");
    cella.textContent = n;
    racs.appendChild(cella);
  }

  const lista = $("naptar-lista");
  lista.innerHTML = "";
  if (!unnepek.length) {
    const li = document.createElement("li");
    li.className = "halvany-szoveg";
    li.textContent = t("cal_none");
    lista.appendChild(li);
  }
  for (const [d, unnep] of unnepek) {
    const li = document.createElement("li");
    li.innerHTML = `<span class="unnep-datum"></span><span></span>`;
    li.firstChild.textContent = d.toLocaleDateString(locale(), { month: "short", day: "numeric", weekday: "short" });
    li.lastChild.textContent = unnep[nyelv];
    lista.appendChild(li);
  }
}

$("naptar-elozo").addEventListener("click", () => { naptarHonap = new Date(naptarHonap.getFullYear(), naptarHonap.getMonth() - 1, 1); naptarRajzol(); });
$("naptar-kovetkezo").addEventListener("click", () => { naptarHonap = new Date(naptarHonap.getFullYear(), naptarHonap.getMonth() + 1, 1); naptarRajzol(); });
$("naptar-honap").addEventListener("click", () => { naptarHonap = new Date(new Date().getFullYear(), new Date().getMonth(), 1); naptarRajzol(); });
document.querySelectorAll("#naptar-orszag button").forEach((g) =>
  g.addEventListener("click", () => {
    naptarOrszag = g.dataset.orszag;
    try { localStorage.setItem("naptarOrszag", naptarOrszag); } catch {}
    naptarRajzol();
  })
);

/* ======================================================
   ÁRFOLYAMOK (Európai Központi Bank, a szerveren keresztül)
   ====================================================== */

window.ARFOLYAM = null;
window.ARFOLYAM_HIBA = false;
const FX_PAROK = [["EUR", "HUF"], ["EUR", "USD"], ["USD", "HUF"], ["EUR", "CZK"], ["EUR", "GBP"]];

async function arfolyamBetolt() {
  try {
    const v = await fetch("/api/arfolyam");
    if (!v.ok) throw new Error(v.status);
    window.ARFOLYAM = await v.json();
  } catch {
    window.ARFOLYAM_HIBA = true;
  }
  arfolyamRajzol();
  if (typeof valtoFrissit === "function") valtoFrissit();
}

function parErtek(r, a, b) { return r && r[a] && r[b] ? r[b] / r[a] : null; }

function arfolyamRajzol() {
  const doboz = $("fx-tartalom");
  if (!window.ARFOLYAM) {
    doboz.innerHTML = `<p class="halvany-szoveg"></p>`;
    doboz.firstChild.textContent = window.ARFOLYAM_HIBA ? t("fx_error") : t("fx_loading");
    $("fx-forras").textContent = "";
    return;
  }
  const A = window.ARFOLYAM;
  $("fx-forras").textContent = t("fx_source", { date: new Date(A.datum).toLocaleDateString(locale()) });
  const elozo = A.tortenet.length > 1 ? A.tortenet[A.tortenet.length - 2] : null;
  const elozoR = elozo ? { EUR: 1, HUF: elozo.HUF, USD: elozo.USD, CZK: elozo.CZK, GBP: elozo.GBP } : null;

  doboz.innerHTML = "";
  const lista = document.createElement("div");
  lista.className = "fx-lista";
  for (const [a, b] of FX_PAROK) {
    const most = parErtek(A.arfolyamok, a, b);
    if (!most) continue;
    const regi = parErtek(elozoR, a, b);
    const valt = regi ? (most - regi) / regi * 100 : 0;
    const sor = document.createElement("div");
    sor.className = "fx-sor";
    sor.innerHTML = `<span class="fx-par"></span><strong class="tabular"></strong><span class="fx-valt"></span>`;
    sor.children[0].textContent = `${a}/${b}`;
    sor.children[1].textContent = szam(most, most >= 100 ? 2 : 4);
    sor.children[2].textContent = (valt > 0 ? "▲ " : valt < 0 ? "▼ " : "• ") + szam(Math.abs(valt), 2) + " %";
    sor.children[2].className = "fx-valt " + (valt > 0 ? "fel" : valt < 0 ? "le" : "");
    lista.appendChild(sor);
  }
  doboz.appendChild(lista);

  // Kis grafikon: EUR/HUF az utolsó 90 napban
  const pontok = A.tortenet.filter((n) => n.HUF).map((n) => n.HUF);
  if (pontok.length > 1) {
    const min = Math.min(...pontok), max = Math.max(...pontok), W = 300, H = 70;
    const xy = pontok.map((v, i) => [i / (pontok.length - 1) * W, H - 6 - (max === min ? 0.5 : (v - min) / (max - min)) * (H - 12)]);
    const vonal = xy.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const graf = document.createElement("div");
    graf.className = "fx-grafikon";
    graf.innerHTML = `
      <div class="fx-graf-fej"><span></span><span class="tabular"></span></div>
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="fxszin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--fo)" stop-opacity=".28"/><stop offset="1" stop-color="var(--fo)" stop-opacity="0"/></linearGradient></defs>
        <polygon points="0,${H} ${vonal} ${W},${H}" fill="url(#fxszin)"/>
        <polyline points="${vonal}" fill="none" stroke="var(--fo)" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
        <circle cx="${xy[xy.length - 1][0]}" cy="${xy[xy.length - 1][1]}" r="3.5" fill="var(--fo)"/>
      </svg>`;
    graf.querySelector(".fx-graf-fej span").textContent = t("fx_90d");
    graf.querySelector(".fx-graf-fej .tabular").textContent = `${szam(min, 2)} – ${szam(max, 2)}`;
    doboz.appendChild(graf);
  }
}

/* ======================================================
   MAKRÓK
   ====================================================== */

// A makró kódja az aktuális nyelv szövegeivel ({1}, {2} … helyére)
const makroKod = (m) => m.kod.replace(/\{([1-9]\d*)\}/g, (_, n) => m.s[nyelv][n - 1] ?? "");

function makrokRajzol() {
  $("mac-lepesek").innerHTML = "";
  for (const lepes of MAKRO_UTMUTATO[nyelv]) {
    const li = document.createElement("li");
    li.textContent = lepes;
    $("mac-lepesek").appendChild(li);
  }
  $("mac-figyelmeztetes").textContent = MAKRO_FIGYELMEZTETES[nyelv];

  const doboz = $("makro-lista");
  doboz.innerHTML = "";
  const szuro = $("excel-kereses").value.trim().toLowerCase();
  const lista = MAKROK.filter((m) => !szuro || (m.cim[nyelv] + " " + m.leiras[nyelv] + " " + m.kod).toLowerCase().includes(szuro));
  lista.forEach((m) => doboz.appendChild(makroKartya(m)));
  $("mac-ures").hidden = lista.length > 0;
}

// Egy makró kártyája (az Excel és a Word makróknál is ezt használjuk)
function makroKartya(m) {
  const kod = makroKod(m);
  const kartya = document.createElement("article");
  kartya.className = "kartya makro";
  kartya.innerHTML = `
    <div class="makro-fej">
      <span class="makro-ikon ${m.szin}"></span>
      <div class="makro-cim"><h2></h2><code class="makro-nev"></code></div>
    </div>
    <p class="makro-leiras"></p>
    <div class="makro-gombok">
      <button class="gomb fo kicsi masol-makro">${MASOL_IKON}<span></span></button>
      <button class="gomb masodlagos kicsi kod-gomb"><span></span></button>
    </div>
    <pre class="makro-kod" hidden><code></code></pre>`;
  kartya.querySelector(".makro-ikon").textContent = m.ikon;
  kartya.querySelector("h2").textContent = m.cim[nyelv];
  kartya.querySelector(".makro-nev").textContent = [...m.kod.matchAll(/^(?:Sub|Function) (\w+)/gm)].map((x) => x[1]).join(" · ");
  kartya.querySelector(".makro-leiras").textContent = m.leiras[nyelv];
  kartya.querySelector("pre code").textContent = kod;
  kartya.querySelector(".masol-makro span").textContent = t("copy_macro");
  const kodGomb = kartya.querySelector(".kod-gomb");
  const pre = kartya.querySelector("pre");
  kodGomb.querySelector("span").textContent = t("show_code");
  kodGomb.addEventListener("click", () => {
    pre.hidden = !pre.hidden;
    kodGomb.querySelector("span").textContent = pre.hidden ? t("show_code") : t("hide_code");
  });
  kartya.querySelector(".masol-makro").addEventListener("click", () => masol(kod, "macro_copied"));
  return kartya;
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
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    doc: "application/msword",
    pdf: "application/pdf",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ppt: "application/vnd.ms-powerpoint",
    txt: "text/plain",
  }[k] || "application/octet-stream";
}

const szam = (x, tizedes) => x.toLocaleString(locale(), { minimumFractionDigits: tizedes, maximumFractionDigits: tizedes });

function meret(b) {
  if (!b) return "0 B";
  if (b < 1024) return b + " B";
  if (b < 1024 * 1024) return szam(b / 1024, 0) + " KB";
  if (b < 1024 * 1024 * 1024) return szam(b / 1024 / 1024, 1) + " MB";
  return szam(b / 1024 / 1024 / 1024, 2) + " GB";
}

function datum(ms) {
  const d = new Date(ms);
  const ido = d.toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" });
  if (d.toDateString() === new Date().toDateString()) return t("today") + " " + ido;
  if (d.toDateString() === new Date(Date.now() - 864e5).toDateString()) return t("yesterday") + " " + ido;
  return d.toLocaleDateString(locale(), { year: "numeric", month: "short", day: "numeric" }) + " " + ido;
}

function relativIdo(ms) {
  const perc = Math.round((Date.now() - ms) / 60000);
  if (perc < 1) return t("just_now");
  if (perc < 60) return t("min_ago", { n: perc });
  const ora = Math.round(perc / 60);
  if (ora < 24) return t("hour_ago", { n: ora });
  const nap = Math.round(ora / 24);
  if (nap < 30) return t("day_ago", { n: nap });
  return new Date(ms).toLocaleDateString(locale(), { month: "short", day: "numeric" });
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
  const kulcs = ora < 5 ? "greet_night" : ora < 9 ? "greet_morning" : ora < 18 ? "greet_day" : "greet_evening";
  $("koszontes").textContent = t(kulcs) + "! 👋";
  const ma = new Date().toLocaleDateString(locale(), { year: "numeric", month: "long", day: "numeric", weekday: "long" });
  $("mai-datum").textContent = ma;
}

/* ======================================================
   ÓRA, DÁTUM, HÉT
   ====================================================== */

// ISO hét száma (Európában ez a szokásos)
function hetSzama(d) {
  const x = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const nap = x.getUTCDay() || 7;
  x.setUTCDate(x.getUTCDate() + 4 - nap);
  const evEleje = new Date(Date.UTC(x.getUTCFullYear(), 0, 1));
  return Math.ceil(((x - evEleje) / 864e5 + 1) / 7);
}

let utolsoPerc = -1;
function oraFrissit() {
  const most = new Date();
  const ket = (n) => String(n).padStart(2, "0");
  const hhmm = ket(most.getHours()) + ":" + ket(most.getMinutes());
  $("sav-ora").textContent = hhmm + ":" + ket(most.getSeconds());
  $("hos-ora").textContent = hhmm;
  $("hos-mp").textContent = ket(most.getSeconds());
  if (most.getMinutes() !== utolsoPerc) {   // percenként elég frissíteni
    utolsoPerc = most.getMinutes();
    $("sav-datum").textContent = most.toLocaleDateString(locale(), { weekday: "short", year: "numeric", month: "short", day: "numeric" });
    $("sav-het").textContent = t("week_no", { n: hetSzama(most) });
    koszontes();
  }
}
setInterval(oraFrissit, 1000);

/* ======================================================
   INDULÁS
   ====================================================== */

forditasAlkalmaz();
oldalValtas();
arfolyamBetolt();

/* ======================================================
   TELEPÍTHETŐ ALKALMAZÁS (PWA)
   ====================================================== */
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  navigator.serviceWorker.register("/sw.js").catch(() => {});
}
let telepitoEsemeny = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();          // a saját gombunkkal ajánljuk fel
  telepitoEsemeny = e;
  $("telepites").hidden = false;
});
$("telepites").addEventListener("click", async () => {
  if (!telepitoEsemeny) return;
  telepitoEsemeny.prompt();
  await telepitoEsemeny.userChoice;
  telepitoEsemeny = null;
  $("telepites").hidden = true;
});
window.addEventListener("appinstalled", () => {
  $("telepites").hidden = true;
  ertesit(t("pwa_installed"));
});
