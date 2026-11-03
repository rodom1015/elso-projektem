/*
  BILLENTYŰ-GYAKORLÓ – nyomd le a valódi billentyűkombinációt!
  Excel, Word és Outlook parancsok a súgó adataiból. Csak olyan kombinációkat kér,
  amelyeket a böngésző nem foglal le (pl. Ctrl+W bezárná a lapot – ezek kimaradnak).
*/

Object.assign(SZOVEGEK.hu, {
  gy_sub: "Gyakorold a billentyűparancsokat: megjelenik egy feladat, és a valódi billentyűkombinációt kell lenyomnod.",
  gy_program: "Program", gy_count: "Feladatok", gy_start: "Indítás", gy_again: "Újra", gy_press: "Nyomd le a billentyűkombinációt…", gy_pressed: "Lenyomva:",
  gy_hint: "Mutasd", gy_skip: "Kihagyás", gy_correct: "✅ Helyes!", gy_wrong: "Nem ez – próbáld újra!", gy_answer: "A megoldás: {k}",
  gy_result: "{k} / {n} helyes · {s} mp", gy_best: "Legjobb: {k} / {n}", gy_note: "Tipp: kattints a gyakorló mezőbe, mielőtt nyomod a billentyűket. A Mac Cmd billentyűje Ctrl-nak számít.",
  gy_review: "Ezeket érdemes gyakorolni:", gy_focus: "Kattints ide, és nyomd le a billentyűket",
});
Object.assign(SZOVEGEK.sk, {
  gy_sub: "Precvič si klávesové skratky: zobrazí sa úloha a ty stlačíš skutočnú kombináciu kláves.",
  gy_program: "Program", gy_count: "Úlohy", gy_start: "Spustiť", gy_again: "Znova", gy_press: "Stlač kombináciu kláves…", gy_pressed: "Stlačené:",
  gy_hint: "Ukázať", gy_skip: "Preskočiť", gy_correct: "✅ Správne!", gy_wrong: "To nie je ono – skús znova!", gy_answer: "Riešenie: {k}",
  gy_result: "{k} / {n} správne · {s} s", gy_best: "Najlepšie: {k} / {n}", gy_note: "Tip: pred stláčaním kláves klikni do cvičného poľa. Kláves Cmd na Macu sa počíta ako Ctrl.",
  gy_review: "Toto si oplatí precvičiť:", gy_focus: "Klikni sem a stlač klávesy",
});
Object.assign(SZOVEGEK.en, {
  gy_sub: "Practise keyboard shortcuts: a task appears and you press the real key combination.",
  gy_program: "Program", gy_count: "Tasks", gy_start: "Start", gy_again: "Again", gy_press: "Press the key combination…", gy_pressed: "Pressed:",
  gy_hint: "Show", gy_skip: "Skip", gy_correct: "✅ Correct!", gy_wrong: "Not that one – try again!", gy_answer: "The answer: {k}",
  gy_result: "{k} / {n} correct · {s} s", gy_best: "Best: {k} / {n}", gy_note: "Tip: click into the practice box before pressing keys. On a Mac, Cmd counts as Ctrl.",
  gy_review: "Worth practising:", gy_focus: "Click here and press the keys",
});

const GY_TILTOTT = new Set(["Ctrl+N", "Ctrl+T", "Ctrl+W", "Ctrl+Shift+N", "Ctrl+Shift+T", "Ctrl+Shift+W", "Ctrl+Tab", "Ctrl+Shift+Tab", "Ctrl+PgUp", "Ctrl+PgDn",
  "Alt+F4", "F11", "Ctrl+Shift+Q", "Alt+Tab", "Alt", "Ctrl+Shift+I", "Ctrl+Shift+J", "Ctrl+Shift+C", "Ctrl+Shift+Delete", "Ctrl+Shift+B", "Ctrl+Shift+O", "Alt+Home", "Alt+←", "Alt+→", "Ctrl+L", "Ctrl+Shift+Esc"]);
const GY_BILL = new Set(["Ctrl", "Shift", "Alt", "Enter", "Esc", "Tab", "Delete", "Backspace", "Home", "End", "PgUp", "PgDn", "Space", "←", "↑", "→", "↓", ",", ".",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", ...Array.from({ length: 12 }, (_, i) => "F" + (i + 1))]);
const GY_SORREND = ["Ctrl", "Shift", "Alt"];
const gyKulcs = (kombo) => [...kombo].sort((a, b) => (GY_SORREND.indexOf(a) + 1 || 9) - (GY_SORREND.indexOf(b) + 1 || 9) || a.localeCompare(b)).join("+");

function gyFeladatok(prog) {
  const forras = { excel: BILLENTYUK, word: WORD_BILLENTYUK, outlook: typeof OUTLOOK_BILLENTYUK !== "undefined" ? OUTLOOK_BILLENTYUK : [] }[prog];
  const ki = [];
  for (const cs of forras) for (const [leiras, ...kombok] of cs.sorok) {
    const jok = kombok.filter((k) => k.every((b) => GY_BILL.has(b)) && k.some((b) => !GY_SORREND.includes(b)) && !GY_TILTOTT.has(gyKulcs(k)));
    if (jok.length) ki.push({ leiras, kombok: jok, osszes: kombok });
  }
  return ki;
}

// A lenyomott billentyű neve a súgó jelöléseivel
function gyBillNev(e) {
  const c = e.code || "";
  if (/^Key[A-Z]$/.test(c)) return c.slice(3);
  if (/^Digit\d$/.test(c)) return c.slice(5);
  if (/^F\d{1,2}$/.test(c)) return c;
  return { Enter: "Enter", NumpadEnter: "Enter", Escape: "Esc", Tab: "Tab", Delete: "Delete", Backspace: "Backspace", Home: "Home", End: "End", PageUp: "PgUp", PageDown: "PgDn",
    Space: "Space", ArrowLeft: "←", ArrowUp: "↑", ArrowRight: "→", ArrowDown: "↓", Comma: ",", Period: "." }[c] || null;
}

let gyProg = "excel", gyDb = 10, gy = null; // gy: { lista, i, jo, rossz:[], kezd, probalt, mutatva }
try { gyProg = localStorage.getItem("gyProg") || gyProg; } catch {}

function gyBeallitas() {
  const valto = (id, ertek, opciok, fn) => {
    const d = $(id);
    d.innerHTML = "";
    for (const [v, k] of opciok) {
      const g = document.createElement("button");
      g.type = "button";
      g.textContent = k;
      g.classList.toggle("aktiv", v === ertek);
      g.addEventListener("click", () => { fn(v); gy = null; gyBeallitas(); gyRajzol(); });
      d.appendChild(g);
    }
  };
  valto("gy-prog", gyProg, [["excel", "Excel"], ["word", "Word"], ["outlook", "Outlook"]], (v) => { gyProg = v; try { localStorage.setItem("gyProg", v); } catch {} });
  valto("gy-db", gyDb, [[10, "10"], [20, "20"], [9999, "∞"]], (v) => (gyDb = v));
  let lj = null;
  try { lj = localStorage.getItem(`gyLegjobb:${gyProg}:${gyDb}`); } catch {}
  $("gy-legjobb").textContent = lj ? t("gy_best", { k: lj, n: gyDb === 9999 ? "∞" : gyDb }) : "";
}

function gyIndit() {
  const lista = kvizKever(gyFeladatok(gyProg));
  gy = { lista: gyDb === 9999 ? lista : lista.slice(0, gyDb), i: 0, jo: 0, rossz: [], kezd: Date.now(), probalt: false, mutatva: false };
  gyRajzol();
  $("gy-mezo").focus();
}

function gyRajzol() {
  const d = $("gy-jatek");
  $("gy-mezo").hidden = !gy || gy.i >= gy.lista.length;
  if (!gy) {
    d.innerHTML = "";
    const g = document.createElement("button");
    g.type = "button";
    g.className = "gomb fo nagy";
    g.textContent = "▶ " + t("gy_start");
    g.addEventListener("click", gyIndit);
    d.appendChild(g);
    return;
  }
  if (gy.i >= gy.lista.length) return gyEredmeny(d);
  const f = gy.lista[gy.i];
  d.innerHTML = `<div class="kv2-fej"><span class="kv2-szam"></span><div class="kv2-sav"><div></div></div><span class="kv2-pont tabular"></span></div><h2 class="gy-feladat"></h2><div class="gy-gombok"><button type="button" class="gomb masodlagos kicsi gy-mutat"></button><button type="button" class="gomb masodlagos kicsi gy-kihagy"></button></div>`;
  d.querySelector(".kv2-szam").textContent = t("kv2_q", { i: gy.i + 1, n: gy.lista.length });
  d.querySelector(".kv2-sav div").style.width = (gy.i / gy.lista.length) * 100 + "%";
  d.querySelector(".kv2-pont").textContent = `✅ ${gy.jo}`;
  d.querySelector(".gy-feladat").textContent = f.leiras[nyelv];
  d.querySelector(".gy-mutat").textContent = "👀 " + t("gy_hint");
  d.querySelector(".gy-kihagy").textContent = t("gy_skip") + " →";
  d.querySelector(".gy-mutat").addEventListener("click", () => { gy.mutatva = true; gyAllapot(t("gy_answer", { k: kvizKomb(f.kombok) }), "info"); $("gy-mezo").focus(); });
  d.querySelector(".gy-kihagy").addEventListener("click", () => { gy.rossz.push(f); gyKovetkezo(); });
  gyAllapot(t("gy_press"), "");
  $("gy-lenyomva").innerHTML = "";
}

function gyAllapot(szoveg, osztaly) {
  $("gy-allapot").textContent = szoveg;
  $("gy-allapot").className = "gy-allapot " + osztaly;
}
function gyKovetkezo() { gy.i++; gy.probalt = false; gy.mutatva = false; gyRajzol(); if (gy.i < gy.lista.length) $("gy-mezo").focus(); }

function gyLenyomvaMutat(kombo) {
  const d = $("gy-lenyomva");
  d.innerHTML = "";
  kombo.forEach((b, i) => {
    if (i) d.append(" + ");
    const k = document.createElement("kbd");
    k.textContent = billentyuNev(b);
    d.appendChild(k);
  });
}

$("gy-mezo").addEventListener("keydown", (e) => {
  if (!gy || gy.i >= gy.lista.length) return;
  e.preventDefault();
  e.stopPropagation();
  const mods = [];
  if (e.ctrlKey || e.metaKey) mods.push("Ctrl");
  if (e.shiftKey) mods.push("Shift");
  if (e.altKey) mods.push("Alt");
  const nev = gyBillNev(e);
  if (!nev) { gyLenyomvaMutat(mods); return; } // csak módosító (Ctrl, Shift…) – várunk a többire
  const kombo = [...mods, nev];
  gyLenyomvaMutat(kombo);
  const f = gy.lista[gy.i];
  if (f.kombok.some((k) => gyKulcs(k) === gyKulcs(kombo))) {
    if (!gy.probalt && !gy.mutatva) gy.jo++; else gy.rossz.push(f);
    gyAllapot(t("gy_correct"), "jo");
    $("gy-mezo").classList.add("jo");
    setTimeout(() => { $("gy-mezo").classList.remove("jo"); gyKovetkezo(); }, 550);
  } else {
    gy.probalt = true;
    gyAllapot(t("gy_wrong"), "rossz");
    const m = $("gy-mezo");
    m.classList.remove("razkodas"); void m.offsetWidth; m.classList.add("razkodas");
  }
}, true);
$("gy-mezo").addEventListener("keyup", (e) => { if (gy) { e.preventDefault(); e.stopPropagation(); } }, true);

function gyEredmeny(d) {
  const mp = Math.round((Date.now() - gy.kezd) / 1000);
  const n = gy.lista.length;
  try { const k = `gyLegjobb:${gyProg}:${gyDb}`; if (gy.jo > +(localStorage.getItem(k) || 0)) localStorage.setItem(k, String(gy.jo)); } catch {}
  d.innerHTML = `<div class="kv2-eredmeny"><div class="kv2-kor"><strong></strong><span></span></div></div>`;
  d.querySelector(".kv2-kor strong").textContent = `${Math.round((gy.jo / n) * 100)}%`;
  d.querySelector(".kv2-kor span").textContent = t("gy_result", { k: gy.jo, n, s: mp });
  d.querySelector(".kv2-kor").style.setProperty("--p", (gy.jo / n) * 100);
  if (gy.rossz.length) {
    const h = document.createElement("h3");
    h.textContent = t("gy_review");
    d.appendChild(h);
    const ul = document.createElement("ul");
    ul.className = "kv2-rosszak";
    for (const f of gy.rossz) { const li = document.createElement("li"); li.textContent = `${f.leiras[nyelv]} = ${kvizKomb(f.kombok)}`; ul.appendChild(li); }
    d.appendChild(ul);
  }
  const g = document.createElement("button");
  g.type = "button";
  g.className = "gomb fo";
  g.textContent = "↻ " + t("gy_again");
  g.addEventListener("click", gyIndit);
  d.appendChild(g);
  gyAllapot("", "");
  $("gy-lenyomva").innerHTML = "";
  gyBeallitas();
  esemenyKuld("masol", "Gyakorlo " + gyProg);
}

forditasHookok.push(() => { gyBeallitas(); if (gy && gy.i < gy.lista.length) gyRajzol(); else if (!gy) gyRajzol(); });
oldalHookok.gyakorlo = () => { gyBeallitas(); gyRajzol(); };
gyBeallitas();
gyRajzol();
