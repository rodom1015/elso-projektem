/*
  KEDVENCEK ÉS LEGUTÓBB HASZNÁLT
  - ☆ csillag minden oldal fejlécében, a makró-, M kód- és függvénykártyákon
  - A kezdőlapon: Kedvencek + Legutóbb megnyitott oldalak
  - Ebben a böngészőben tárolódik (localStorage)
*/

Object.assign(SZOVEGEK.hu, {
  kv_title: "⭐ Kedvencek", kv_recent: "🕘 Legutóbb megnyitott", kv_device: "ebben a böngészőben",
  kv_empty: "Még nincs kedvenced. Jelöld meg a ☆ csillaggal a gyakran használt oldalakat, makrókat, M kódokat és függvényeket – itt fognak megjelenni.",
  kv_add: "Hozzáadás a kedvencekhez", kv_remove: "Eltávolítás a kedvencek közül", kv_added: "⭐ Hozzáadva a kedvencekhez", kv_removed: "Eltávolítva a kedvencek közül",
  kv_t_makro: "Excel makró", kv_t_wmakro: "Word makró", kv_t_omakro: "Outlook makró", kv_t_pq: "Power Query", kv_t_fv: "Függvény", kv_t_oldal: "Oldal",
});
Object.assign(SZOVEGEK.sk, {
  kv_title: "⭐ Obľúbené", kv_recent: "🕘 Naposledy otvorené", kv_device: "v tomto prehliadači",
  kv_empty: "Zatiaľ nemáš obľúbené. Označ hviezdičkou ☆ často používané stránky, makrá, kódy M a funkcie – zobrazia sa tu.",
  kv_add: "Pridať do obľúbených", kv_remove: "Odstrániť z obľúbených", kv_added: "⭐ Pridané do obľúbených", kv_removed: "Odstránené z obľúbených",
  kv_t_makro: "Makro Excel", kv_t_wmakro: "Makro Word", kv_t_omakro: "Makro Outlook", kv_t_pq: "Power Query", kv_t_fv: "Funkcia", kv_t_oldal: "Stránka",
});
Object.assign(SZOVEGEK.en, {
  kv_title: "⭐ Favourites", kv_recent: "🕘 Recently opened", kv_device: "in this browser",
  kv_empty: "No favourites yet. Mark frequently used pages, macros, M scripts and functions with the ☆ star – they'll appear here.",
  kv_add: "Add to favourites", kv_remove: "Remove from favourites", kv_added: "⭐ Added to favourites", kv_removed: "Removed from favourites",
  kv_t_makro: "Excel macro", kv_t_wmakro: "Word macro", kv_t_omakro: "Outlook macro", kv_t_pq: "Power Query", kv_t_fv: "Function", kv_t_oldal: "Page",
});

const KV_MAX_LEGUTOBB = 8;
let kedvencek = [], legutobb = [];
try { kedvencek = JSON.parse(localStorage.getItem("kedvencek") || "[]"); } catch {}
try { legutobb = JSON.parse(localStorage.getItem("legutobb") || "[]"); } catch {}
const kvMent = () => { try { localStorage.setItem("kedvencek", JSON.stringify(kedvencek)); localStorage.setItem("legutobb", JSON.stringify(legutobb)); } catch {} };
const kvKulcs = (t, id) => t + ":" + id;
const kvVan = (tipus, id) => kedvencek.some((k) => k.t === tipus && k.id === id);

function kedvencMakroTipus(m) {
  if (typeof WORD_MAKROK !== "undefined" && WORD_MAKROK.includes(m)) return "wmakro";
  if (typeof OUTLOOK_MAKROK !== "undefined" && OUTLOOK_MAKROK.includes(m)) return "omakro";
  return "makro";
}

// Az elem adatai a megjelenítéshez (név, ikon, hová visz)
function kvElem(k) {
  const keres = (lista) => lista.find((x) => x.cim.hu === k.id);
  if (k.t === "oldal") {
    if (!OLDAL_NEVEK[k.id]) return null;
    const ikon = { kezdolap: "🏠", fajlok: "📁", eszkozok: "🧰", szamolas: "🧮", excel: "X", powerquery: "PQ", word: "W", outlook: "O", ai: "✨", tabla: "📝", elemzo: "📊", pdf: "📄", admin: "🛡️" }[k.id] || "•";
    return { ikon, cim: t(OLDAL_NEVEK[k.id]), al: t("kv_t_oldal"), nyit: () => (location.hash = "#/" + k.id) };
  }
  if (k.t === "makro" || k.t === "wmakro" || k.t === "omakro") {
    const lista = k.t === "makro" ? MAKROK : k.t === "wmakro" ? WORD_MAKROK : OUTLOOK_MAKROK;
    const m = keres(lista);
    if (!m) return null;
    return { ikon: m.ikon, cim: m.cim[nyelv], al: t("kv_t_" + k.t), nyit: () => kvUgrik(k.t, m.cim[nyelv]) };
  }
  if (k.t === "pq") {
    const p = keres(PQ_PELDAK);
    if (!p) return null;
    return { ikon: p.ikon, cim: p.cim[nyelv], al: t("kv_t_pq"), nyit: () => kvUgrik("pq", p.cim[nyelv]) };
  }
  if (k.t === "fv") {
    const fv = FUGGVENYEK.find((f) => f.en === k.id);
    if (!fv) return null;
    return { ikon: "ƒx", cim: fvNev(fv), al: t("kv_t_fv") + " · " + fv.leiras[nyelv], nyit: () => kvUgrik("fv", fvNev(fv)) };
  }
  return null;
}

// Odaugrik a kártyához, és felvillantja
function kvUgrik(tipus, cim) {
  let valaszto = ".makro";
  if (tipus === "makro") { $("excel-kereses").value = ""; location.hash = "#/excel/makrok"; makrokRajzol(); }
  else if (tipus === "wmakro") { $("word-kereses").value = ""; wordFul = "makrok"; location.hash = "#/word"; wordRajzol(); valaszto = "#word-makro-lista .makro"; }
  else if (tipus === "omakro") { $("ol-kereses").value = ""; location.hash = "#/outlook/makrok"; valaszto = "#ol-makro-lista .makro"; }
  else if (tipus === "pq") { $("pq-kereses").value = ""; pqFul = "peldak"; location.hash = "#/powerquery"; pqRajzol(); valaszto = ".pq-pelda"; }
  else if (tipus === "fv") {
    location.hash = "#/excel/fuggvenyek";
    setTimeout(() => { $("excel-kereses").value = cim; $("excel-kereses").dispatchEvent(new Event("input")); }, 30);
    return;
  }
  setTimeout(() => {
    const k = [...document.querySelectorAll(valaszto)].find((x) => x.querySelector("h2")?.textContent === cim);
    if (k) { k.scrollIntoView({ behavior: "smooth", block: "center" }); k.classList.add("villan"); setTimeout(() => k.classList.remove("villan"), 1600); }
  }, 80);
}

/* ---------- Csillag gomb ---------- */
function kvCsillagAllit(g, tipus, id) {
  const van = kvVan(tipus, id);
  g.classList.toggle("aktiv", van);
  g.textContent = van ? "★" : "☆";
  g.title = t(van ? "kv_remove" : "kv_add");
  g.setAttribute("aria-label", g.title);
  g.setAttribute("aria-pressed", van);
}
function kedvencCsillag(hova, tipus, id) {
  if (!hova) return;
  const g = document.createElement("button");
  g.type = "button";
  g.className = "kedv-csillag";
  g.dataset.kvTipus = tipus;
  g.dataset.kvId = id;
  kvCsillagAllit(g, tipus, id);
  g.addEventListener("click", (e) => {
    e.stopPropagation();
    if (kvVan(tipus, id)) { kedvencek = kedvencek.filter((k) => !(k.t === tipus && k.id === id)); ertesit(t("kv_removed")); }
    else { kedvencek.push({ t: tipus, id }); ertesit(t("kv_added")); }
    kvMent();
    // minden azonos csillag frissítése (pl. ugyanaz a makró a keresőben is)
    document.querySelectorAll(".kedv-csillag").forEach((x) => x.dataset.kvTipus === tipus && x.dataset.kvId === id && kvCsillagAllit(x, tipus, id));
    kvRajzol();
  });
  hova.appendChild(g);
}

// Az oldalak fejlécébe (a kezdőlap kivételével)
function kvOldalCsillagok() {
  for (const o of OLDALAK) {
    if (o === "kezdolap") continue;
    const h1 = document.querySelector(`#oldal-${o} .oldal-fej h1`);
    if (!h1 || h1.parentElement.querySelector(".kedv-csillag")) continue;
    // a h1 mellé tesszük (nem bele), mert a nyelvváltás a h1 szövegét felülírja
    const sor = document.createElement("div");
    sor.className = "oldal-cim-sor";
    h1.before(sor);
    sor.appendChild(h1);
    kedvencCsillag(sor, "oldal", o);
  }
}

/* ---------- Kezdőlap blokk ---------- */
function kvChip(k, torolheto) {
  const e = kvElem(k);
  if (!e) return null;
  const d = document.createElement("div");
  d.className = "kedv-chip";
  d.innerHTML = `<button type="button" class="kedv-nyit"><span class="kedv-ikon"></span><span class="kedv-szoveg"><strong></strong><small></small></span></button>`;
  d.querySelector(".kedv-ikon").textContent = e.ikon;
  d.querySelector("strong").textContent = e.cim;
  d.querySelector("small").textContent = e.al;
  d.querySelector(".kedv-nyit").addEventListener("click", e.nyit);
  if (torolheto) {
    const x = document.createElement("button");
    x.type = "button";
    x.className = "kedv-torol";
    x.textContent = "×";
    x.title = t("kv_remove");
    x.addEventListener("click", () => {
      kedvencek = kedvencek.filter((y) => !(y.t === k.t && y.id === k.id));
      kvMent();
      kvRajzol();
      document.querySelectorAll(".kedv-csillag").forEach((c) => c.dataset.kvTipus === k.t && c.dataset.kvId === k.id && kvCsillagAllit(c, k.t, k.id));
    });
    d.appendChild(x);
  }
  return d;
}

function kvRajzol() {
  const lista = $("kedv-lista");
  lista.innerHTML = "";
  kedvencek.forEach((k) => { const c = kvChip(k, true); if (c) lista.appendChild(c); });
  $("kedv-ures").hidden = lista.children.length > 0;
  const lu = $("kedv-legutobb");
  lu.innerHTML = "";
  legutobb.filter((o) => !kvVan("oldal", o)).slice(0, 6).forEach((o) => { const c = kvChip({ t: "oldal", id: o }, false); if (c) lu.appendChild(c); });
  $("kedv-legutobb-doboz").hidden = lu.children.length === 0;
}

// Legutóbb megnyitott oldalak
function kvLatogatas() {
  const o = aktivOldal;
  if (!o || o === "kezdolap" || o === "megosztas" || !OLDALAK.includes(o)) return;
  legutobb = [o, ...legutobb.filter((x) => x !== o)].slice(0, KV_MAX_LEGUTOBB);
  kvMent();
  kvRajzol();
}
window.addEventListener("hashchange", () => setTimeout(kvLatogatas, 0));

forditasHookok.push(() => {
  document.querySelectorAll(".kedv-csillag").forEach((g) => kvCsillagAllit(g, g.dataset.kvTipus, g.dataset.kvId));
  kvRajzol();
});

// Indulás: csillagok az oldalakra, a már kirajzolt kártyák újrarajzolása csillaggal
kvOldalCsillagok();
fuggvenyekRajzol();
makrokRajzol();
wordRajzol();
if (typeof outlookRajzol === "function") outlookRajzol();
if (typeof pqRajzol === "function") pqRajzol();
kvRajzol();
kvLatogatas();

// A késői modulok (eszközök, kedvencek) szövegei
document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
