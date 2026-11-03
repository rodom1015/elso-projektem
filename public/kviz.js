/*
  KVÍZ – véletlen kérdések a súgó adataiból (sosem fogy ki, mindhárom nyelven)
  Témák: függvények (mit csinál / melyik az / szintaxis), billentyűparancsok (Excel, Word, Outlook), hibaértékek
  Szintek: kezdő (gyakori függvények és billentyűk) / haladó (minden)
  A legjobb eredményt ez a böngésző megjegyzi.
*/

Object.assign(SZOVEGEK.hu, {
  kv2_which_err: "Melyik hibaérték jelenik meg, ha: „{d}”",
  kv2_sub: "Teszteld a tudásod! 10 kérdés, azonnali magyarázattal – minden körben új kérdések.",
  kv2_level: "Szint", kv2_topic: "Téma", kv2_mix: "Vegyes", kv2_fn: "Függvények", kv2_sc: "Billentyűparancsok", kv2_err: "Hibaértékek", kv2_start: "Kvíz indítása", kv2_again: "Új kvíz",
  kv2_q: "{i}. kérdés / {n}", kv2_best: "Legjobb eredményed: {p}", kv2_none: "még nincs", kv2_next: "Tovább →", kv2_result: "Eredmény: {k} / {n}",
  kv2_r_great: "🏆 Kiváló! Igazi Excel-profi vagy.", kv2_r_good: "👍 Szép munka! Még egy kis gyakorlás, és tökéletes.", kv2_r_ok: "📚 Jó kezdés! Nézd át a súgót, és próbáld újra.",
  kv2_mistakes: "Ezeket érdemes átnézni:", kv2_open: "Megnyitás a súgóban",
  kv2_what_fn: "Mit csinál a(z) {f} függvény?", kv2_which_fn: "Melyik függvény ez: „{d}”", kv2_args: "Mi a(z) {f} helyes szintaxisa?", kv2_which_sc: "Melyik billentyűparancs ez ({p}): „{d}”", kv2_what_sc: "Mit csinál ez ({p}): {k}", kv2_what_err: "Mit jelent ez a hiba: {e}",
  kv2_correct: "✅ Helyes!", kv2_wrong: "❌ Nem. A helyes válasz: {v}",
});
Object.assign(SZOVEGEK.sk, {
  kv2_which_err: "Ktorá chyba sa zobrazí, keď: „{d}“",
  kv2_sub: "Otestuj si vedomosti! 10 otázok s okamžitým vysvetlením – v každom kole nové otázky.",
  kv2_level: "Úroveň", kv2_topic: "Téma", kv2_mix: "Mix", kv2_fn: "Funkcie", kv2_sc: "Klávesové skratky", kv2_err: "Chybové hodnoty", kv2_start: "Spustiť kvíz", kv2_again: "Nový kvíz",
  kv2_q: "Otázka {i} / {n}", kv2_best: "Tvoj najlepší výsledok: {p}", kv2_none: "zatiaľ žiadny", kv2_next: "Ďalej →", kv2_result: "Výsledok: {k} / {n}",
  kv2_r_great: "🏆 Výborne! Si skutočný profík v Exceli.", kv2_r_good: "👍 Pekná práca! Ešte trochu cviku a bude to dokonalé.", kv2_r_ok: "📚 Dobrý začiatok! Pozri si pomocníka a skús to znova.",
  kv2_mistakes: "Toto si oplatí zopakovať:", kv2_open: "Otvoriť v pomocníkovi",
  kv2_what_fn: "Čo robí funkcia {f}?", kv2_which_fn: "Ktorá funkcia to je: „{d}“", kv2_args: "Aká je správna syntax funkcie {f}?", kv2_which_sc: "Ktorá skratka to je ({p}): „{d}“", kv2_what_sc: "Čo robí táto skratka ({p}): {k}", kv2_what_err: "Čo znamená táto chyba: {e}",
  kv2_correct: "✅ Správne!", kv2_wrong: "❌ Nie. Správna odpoveď: {v}",
});
Object.assign(SZOVEGEK.en, {
  kv2_which_err: "Which error appears when: \"{d}\"",
  kv2_sub: "Test your knowledge! 10 questions with instant explanations – new questions every round.",
  kv2_level: "Level", kv2_topic: "Topic", kv2_mix: "Mixed", kv2_fn: "Functions", kv2_sc: "Keyboard shortcuts", kv2_err: "Error values", kv2_start: "Start quiz", kv2_again: "New quiz",
  kv2_q: "Question {i} / {n}", kv2_best: "Your best score: {p}", kv2_none: "none yet", kv2_next: "Next →", kv2_result: "Score: {k} / {n}",
  kv2_r_great: "🏆 Excellent! You're a real Excel pro.", kv2_r_good: "👍 Nice work! A little more practice and it's perfect.", kv2_r_ok: "📚 Good start! Have a look at the help and try again.",
  kv2_mistakes: "Worth reviewing:", kv2_open: "Open in help",
  kv2_what_fn: "What does the {f} function do?", kv2_which_fn: "Which function is this: \"{d}\"", kv2_args: "What is the correct syntax of {f}?", kv2_which_sc: "Which shortcut is this ({p}): \"{d}\"", kv2_what_sc: "What does this do ({p}): {k}", kv2_what_err: "What does this error mean: {e}",
  kv2_correct: "✅ Correct!", kv2_wrong: "❌ No. The right answer: {v}",
});

const KVIZ_HIBAK = [
  { en: "#DIV/0!", m: { hu: "Nullával (vagy üres cellával) osztasz.", sk: "Delíš nulou (alebo prázdnou bunkou).", en: "You're dividing by zero (or an empty cell)." } },
  { en: "#N/A", m: { hu: "A keresett érték nem található (pl. FKERES, XKERES, HOL.VAN).", sk: "Hľadaná hodnota sa nenašla (napr. VLOOKUP, XLOOKUP, MATCH).", en: "The value you're looking for wasn't found (e.g. VLOOKUP, XLOOKUP, MATCH)." } },
  { en: "#NAME?", m: { hu: "Az Excel nem ismeri a nevet – elírt függvénynév vagy idézőjel nélküli szöveg.", sk: "Excel nepozná názov – preklep vo funkcii alebo text bez úvodzoviek.", en: "Excel doesn't recognise a name – a misspelled function or text without quotes." } },
  { en: "#VALUE!", m: { hu: "Rossz típusú adat – pl. szöveggel próbálsz számolni.", sk: "Nesprávny typ údajov – napr. počítaš s textom.", en: "Wrong type of data – e.g. you're doing maths with text." } },
  { en: "#REF!", m: { hu: "Érvénytelen hivatkozás – a hivatkozott cellát törölték.", sk: "Neplatný odkaz – bunka, na ktorú vzorec odkazoval, bola odstránená.", en: "Invalid reference – a cell the formula referred to was deleted." } },
  { en: "#NUM!", m: { hu: "Érvénytelen szám – pl. negatív szám gyöke vagy túl nagy eredmény.", sk: "Neplatné číslo – napr. odmocnina zo záporného čísla alebo príliš veľký výsledok.", en: "Invalid number – e.g. square root of a negative or a result that's too large." } },
  { en: "#SPILL!", m: { hu: "A dinamikus tömb eredménye nem fér ki, mert útban van egy nem üres cella.", sk: "Výsledok dynamického poľa sa nezmestí, lebo mu prekáža neprázdna bunka.", en: "A dynamic array result can't spill because a non-empty cell is in the way." } },
  { en: "#####", m: { hu: "Nem hiba: az oszlop túl keskeny a szám vagy dátum megjelenítéséhez.", sk: "Nie je to chyba: stĺpec je príliš úzky na zobrazenie čísla alebo dátumu.", en: "Not an error: the column is too narrow to show the number or date." } },
];
const KVIZ_KEZDO_FV = ["SUM", "AVERAGE", "MIN", "MAX", "COUNT", "COUNTA", "COUNTIF", "SUMIF", "IF", "ROUND", "VLOOKUP", "XLOOKUP", "CONCAT", "LEFT", "RIGHT", "LEN", "TRIM", "UPPER", "LOWER", "TODAY", "NOW", "YEAR", "MONTH", "DAY", "IFERROR", "AND", "OR", "TEXT", "UNIQUE", "SORT"];

let kvizSzint = "kezdo", kvizTema = "mix";
let kviz = null; // { kerdesek, i, jo, rosszak }
const kvizKever = (l) => { const k = [...l]; for (let i = k.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [k[i], k[j]] = [k[j], k[i]]; } return k; };
const kvizValaszt = (l, n) => kvizKever(l).slice(0, n);
const kvizHibaNev = (en) => (nyelv === "hu" && typeof HIBAERTEKEK !== "undefined" && HIBAERTEKEK[en] ? HIBAERTEKEK[en] : en);
const kvizKomb = (kombok) => kombok.map((k) => k.map(billentyuNev).join(" + ")).join(" / ");

function kvizFvLista() {
  const lista = kvizSzint === "kezdo" ? FUGGVENYEK.filter((f) => KVIZ_KEZDO_FV.includes(f.en)) : FUGGVENYEK;
  return lista.filter((f) => !f.ellenorzetlen || nyelv !== "hu");
}
function kvizBillentyuk() {
  const programok = [["Excel", BILLENTYUK], ["Word", WORD_BILLENTYUK], ["Outlook", typeof OUTLOOK_BILLENTYUK !== "undefined" ? OUTLOOK_BILLENTYUK : []]];
  const ki = [];
  for (const [prog, csoportok] of programok) for (const cs of csoportok) for (const [leiras, ...kombok] of cs.sorok) {
    if (kvizSzint === "kezdo" && (prog !== "Excel" || kombok[0].length > 2 || cs !== csoportok[0] && cs !== csoportok[1])) continue;
    ki.push({ prog, leiras, kombok });
  }
  return ki;
}

// Egy kérdés: { szoveg, opciok: [{ szoveg, jo }], magyarazat, link }
function kvizFvKerdes() {
  const lista = kvizFvLista();
  const [f, ...mas] = kvizValaszt(lista, 4);
  const tipus = kvizSzint === "kezdo" ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3);
  const link = () => { location.hash = "#/excel/fuggvenyek"; setTimeout(() => { $("excel-kereses").value = fvNev(f); $("excel-kereses").dispatchEvent(new Event("input")); }, 40); };
  const magyarazat = `${fvSzintaxis(f)} – ${f.leiras[nyelv]}`;
  if (tipus === 0) return { szoveg: t("kv2_what_fn", { f: fvNev(f) }), opciok: kvizKever([{ szoveg: f.leiras[nyelv], jo: true }, ...mas.map((x) => ({ szoveg: x.leiras[nyelv] }))]), magyarazat, link, cim: fvNev(f) };
  if (tipus === 1) return { szoveg: t("kv2_which_fn", { d: f.leiras[nyelv] }), opciok: kvizKever([{ szoveg: fvNev(f), jo: true }, ...mas.map((x) => ({ szoveg: fvNev(x) }))]), magyarazat, link, cim: fvNev(f), kod: true };
  // szintaxis: a helyes paraméterlista vs. más függvények paraméterei ugyanazzal a névvel
  const par = (x) => `${fvNev(f)}(${fvParameterek(x)})`;
  const opciok = [{ szoveg: par(f), jo: true }, ...mas.filter((x) => fvParameterek(x) !== fvParameterek(f)).slice(0, 3).map((x) => ({ szoveg: par(x) }))];
  return { szoveg: t("kv2_args", { f: fvNev(f) }), opciok: kvizKever(opciok), magyarazat, link, cim: fvNev(f), kod: true };
}
function kvizScKerdes() {
  const lista = kvizBillentyuk();
  const b = lista[Math.floor(Math.random() * lista.length)];
  const helyes = kvizKomb(b.kombok);
  const mas = kvizKever(lista.filter((x) => kvizKomb(x.kombok) !== helyes && x.leiras[nyelv] !== b.leiras[nyelv]));
  const egyedi = (fn) => { const lat = new Set(); return mas.filter((x) => { const k = fn(x); if (lat.has(k)) return false; lat.add(k); return true; }).slice(0, 3); };
  const link = () => { location.hash = b.prog === "Excel" ? "#/excel/billentyuk" : b.prog === "Word" ? "#/word" : "#/outlook/billentyuk"; };
  if (Math.random() < 0.6) {
    return { szoveg: t("kv2_which_sc", { p: b.prog, d: b.leiras[nyelv] }), opciok: kvizKever([{ szoveg: helyes, jo: true }, ...egyedi((x) => kvizKomb(x.kombok)).map((x) => ({ szoveg: kvizKomb(x.kombok) }))]), magyarazat: `${b.prog}: ${b.leiras[nyelv]} = ${helyes}`, link, cim: b.leiras[nyelv], kod: true };
  }
  return { szoveg: t("kv2_what_sc", { p: b.prog, k: helyes }), opciok: kvizKever([{ szoveg: b.leiras[nyelv], jo: true }, ...egyedi((x) => x.leiras[nyelv]).map((x) => ({ szoveg: x.leiras[nyelv] }))]), magyarazat: `${b.prog}: ${helyes} = ${b.leiras[nyelv]}`, link, cim: helyes };
}
function kvizHibaKerdes() {
  const [h, ...mas] = kvizValaszt(KVIZ_HIBAK, 4);
  if (Math.random() < 0.5) {
    // fordítva: a leírásból kell kitalálni a hibaértéket
    return { szoveg: t("kv2_which_err", { d: h.m[nyelv] }), opciok: kvizKever([{ szoveg: kvizHibaNev(h.en), jo: true }, ...mas.map((x) => ({ szoveg: kvizHibaNev(x.en) }))]), magyarazat: `${kvizHibaNev(h.en)} – ${h.m[nyelv]}`, link: () => (location.hash = "#/excel/tippek"), cim: kvizHibaNev(h.en), kod: true };
  }
  return { szoveg: t("kv2_what_err", { e: kvizHibaNev(h.en) }), opciok: kvizKever([{ szoveg: h.m[nyelv], jo: true }, ...mas.map((x) => ({ szoveg: x.m[nyelv] }))]), magyarazat: `${kvizHibaNev(h.en)} – ${h.m[nyelv]}`, link: () => (location.hash = "#/excel/tippek"), cim: kvizHibaNev(h.en) };
}

function kvizUj() {
  const generatorok = kvizTema === "fn" ? [kvizFvKerdes] : kvizTema === "sc" ? [kvizScKerdes] : kvizTema === "err" ? [kvizHibaKerdes] : [kvizFvKerdes, kvizFvKerdes, kvizScKerdes, kvizScKerdes, kvizHibaKerdes];
  const kerdesek = [], lat = new Set();
  let probak = 0;
  while (kerdesek.length < 10 && probak++ < 200) {
    const k = generatorok[Math.floor(Math.random() * generatorok.length)]();
    if (k.opciok.length < 3 || lat.has(k.szoveg) || lat.has(k.cim)) continue;
    lat.add(k.szoveg); lat.add(k.cim);
    kerdesek.push(k);
  }
  kviz = { kerdesek, i: 0, jo: 0, rosszak: [], valaszolt: false };
  kvizRajzol();
}

const kvizKulcs = () => `kvizLegjobb:${kvizSzint}:${kvizTema}`;
function kvizLegjobb() { try { return localStorage.getItem(kvizKulcs()); } catch { return null; } }

function kvizBeallitasRajzol() {
  const valto = (id, ertek, opciok, fn) => {
    const d = $(id);
    d.innerHTML = "";
    for (const [v, k] of opciok) {
      const g = document.createElement("button");
      g.type = "button";
      g.textContent = t(k);
      g.classList.toggle("aktiv", v === ertek);
      g.addEventListener("click", () => { fn(v); kviz = null; kvizBeallitasRajzol(); kvizRajzol(); });
      d.appendChild(g);
    }
  };
  valto("kv2-szint", kvizSzint, [["kezdo", "ak_beginner"], ["halado", "ak_advanced"]], (v) => (kvizSzint = v));
  valto("kv2-tema", kvizTema, [["mix", "kv2_mix"], ["fn", "kv2_fn"], ["sc", "kv2_sc"], ["err", "kv2_err"]], (v) => (kvizTema = v));
  const lj = kvizLegjobb();
  $("kv2-legjobb").textContent = t("kv2_best", { p: lj ? lj + " / 10" : t("kv2_none") });
}

function kvizRajzol() {
  const d = $("kv2-jatek");
  d.innerHTML = "";
  if (!kviz) {
    const g = document.createElement("button");
    g.type = "button";
    g.className = "gomb fo nagy";
    g.textContent = "▶ " + t("kv2_start");
    g.addEventListener("click", kvizUj);
    d.appendChild(g);
    return;
  }
  if (kviz.i >= kviz.kerdesek.length) return kvizEredmeny(d);
  const k = kviz.kerdesek[kviz.i];
  d.innerHTML = `<div class="kv2-fej"><span class="kv2-szam"></span><div class="kv2-sav"><div></div></div><span class="kv2-pont tabular"></span></div><h2 class="kv2-kerdes"></h2><div class="kv2-opciok"></div><p class="kv2-valasz" hidden></p><button type="button" class="gomb fo kv2-tovabb" hidden></button>`;
  d.querySelector(".kv2-szam").textContent = t("kv2_q", { i: kviz.i + 1, n: kviz.kerdesek.length });
  d.querySelector(".kv2-sav div").style.width = (kviz.i / kviz.kerdesek.length) * 100 + "%";
  d.querySelector(".kv2-pont").textContent = `✅ ${kviz.jo}`;
  d.querySelector(".kv2-kerdes").textContent = k.szoveg;
  const opciok = d.querySelector(".kv2-opciok");
  k.opciok.forEach((o, n) => {
    const g = document.createElement("button");
    g.type = "button";
    g.className = "kv2-opcio" + (k.kod ? " kod" : "");
    g.innerHTML = `<span class="kv2-betu"></span><span></span>`;
    g.firstChild.textContent = "ABCD"[n];
    g.lastChild.textContent = o.szoveg;
    g.addEventListener("click", () => kvizValasz(o, g));
    opciok.appendChild(g);
  });
  const tovabb = d.querySelector(".kv2-tovabb");
  tovabb.textContent = t("kv2_next");
  tovabb.addEventListener("click", () => { kviz.i++; kviz.valaszolt = false; kvizRajzol(); });
}

function kvizValasz(o, gomb) {
  if (kviz.valaszolt) return;
  kviz.valaszolt = true;
  const k = kviz.kerdesek[kviz.i];
  const d = $("kv2-jatek");
  d.querySelectorAll(".kv2-opcio").forEach((g, n) => {
    g.disabled = true;
    if (k.opciok[n].jo) g.classList.add("jo");
  });
  if (o.jo) kviz.jo++; else { gomb.classList.add("rossz"); kviz.rosszak.push(k); }
  const v = d.querySelector(".kv2-valasz");
  v.hidden = false;
  v.className = "kv2-valasz " + (o.jo ? "jo" : "rossz");
  v.textContent = (o.jo ? t("kv2_correct") : t("kv2_wrong", { v: k.opciok.find((x) => x.jo).szoveg })) + "\n" + k.magyarazat;
  d.querySelector(".kv2-pont").textContent = `✅ ${kviz.jo}`;
  const tovabb = d.querySelector(".kv2-tovabb");
  tovabb.hidden = false;
  tovabb.focus();
}

function kvizEredmeny(d) {
  const n = kviz.kerdesek.length, k = kviz.jo;
  const regi = +(kvizLegjobb() || 0);
  if (k > regi) { try { localStorage.setItem(kvizKulcs(), String(k)); } catch {} }
  d.innerHTML = `<div class="kv2-eredmeny"><div class="kv2-kor"><strong></strong><span></span></div><p class="kv2-ertekeles"></p></div>`;
  d.querySelector(".kv2-kor strong").textContent = `${Math.round((k / n) * 100)}%`;
  d.querySelector(".kv2-kor span").textContent = t("kv2_result", { k, n });
  d.querySelector(".kv2-kor").style.setProperty("--p", (k / n) * 100);
  d.querySelector(".kv2-ertekeles").textContent = t(k >= 9 ? "kv2_r_great" : k >= 6 ? "kv2_r_good" : "kv2_r_ok");
  if (kviz.rosszak.length) {
    const h = document.createElement("h3");
    h.textContent = t("kv2_mistakes");
    d.appendChild(h);
    const ul = document.createElement("ul");
    ul.className = "kv2-rosszak";
    for (const r of kviz.rosszak) {
      const li = document.createElement("li");
      li.innerHTML = `<span></span> <button type="button" class="link-gomb"></button>`;
      li.firstChild.textContent = r.magyarazat;
      li.lastChild.textContent = t("kv2_open") + " →";
      li.lastChild.addEventListener("click", r.link);
      ul.appendChild(li);
    }
    d.appendChild(ul);
  }
  const g = document.createElement("button");
  g.type = "button";
  g.className = "gomb fo";
  g.textContent = "↻ " + t("kv2_again");
  g.addEventListener("click", kvizUj);
  d.appendChild(g);
  kvizBeallitasRajzol();
  esemenyKuld("masol", `Kviz ${kvizSzint} ${kvizTema}`);
}

// billentyűvel is lehet válaszolni: A–D vagy 1–4, Enter = tovább
document.addEventListener("keydown", (e) => {
  if (aktivOldal !== "kviz" || !kviz || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
  if (e.key === "Enter" && document.activeElement && document.activeElement.classList.contains("kv2-tovabb")) return; // a gomb magától kattint
  const n = "abcd".indexOf(e.key.toLowerCase()) >= 0 ? "abcd".indexOf(e.key.toLowerCase()) : "1234".indexOf(e.key);
  const gombok = [...document.querySelectorAll("#kv2-jatek .kv2-opcio")];
  if (n >= 0 && gombok[n] && !kviz.valaszolt) { e.preventDefault(); gombok[n].click(); }
  else if (e.key === "Enter" && kviz.valaszolt) { const tv = document.querySelector("#kv2-jatek .kv2-tovabb"); if (tv && !tv.hidden) { e.preventDefault(); tv.click(); } }
});

forditasHookok.push(() => { kvizBeallitasRajzol(); if (kviz && kviz.i < kviz.kerdesek.length) { kviz = null; } kvizRajzol(); });
oldalHookok.kviz = () => { kvizBeallitasRajzol(); kvizRajzol(); };
kvizBeallitasRajzol();
kvizRajzol();
