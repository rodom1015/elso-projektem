/*
  TÁBLÁZATSZERKESZTŐ (a böngészőben, a keplet-motor.js-sel)
  - Új munkafüzet, megnyitás gépről vagy a Fájljaimból (xlsx, xls, ods, csv)
  - Cellák szerkesztése, képletek, több munkalap, másolás-beillesztés Excelből (Ctrl+C / Ctrl+V)
  - Visszavonás (Ctrl+Z), állapotsor: összeg, átlag, darab a kijelölésre
  - Mentés: letöltés .xlsx / .csv, vagy titkosítva vissza a Fájljaimba
  Formázást (szín, betűtípus) nem kezel – csak értékeket és képleteket.
*/

Object.assign(SZOVEGEK.hu, {
  tb_sub: "Excel fájl szerkesztése a böngészőben – képletekkel, több munkalappal. A mentés titkosítva kerül vissza a Fájljaidba.",
  tb_new: "Új", tb_open: "Megnyitás gépről", tb_stored: "…vagy a Fájljaimból:", tb_save_store: "Mentés a Fájljaimba", tb_overwrite: "Mentés (felülírás)",
  tb_download: "Letöltés .xlsx", tb_csv: "CSV", tb_add_rows: "+ 50 sor", tb_add_cols: "+ 5 oszlop", tb_undo: "Visszavonás", tb_redo: "Mégis",
  tb_sheet: "Munka", tb_add_sheet: "Új munkalap", tb_rename: "Munkalap új neve:", tb_delete_sheet: "Törlöd a(z) „{n}” munkalapot?", tb_delete_sheet_btn: "Lap törlése",
  tb_unsaved: "Vannak nem mentett változások. Biztosan folytatod?", tb_saved: "Elmentve: {n}", tb_trunc: "A fájl nagy, csak az első {r} sort és {c} oszlopot mutatom.",
  tb_sum: "Összeg", tb_avg: "Átlag", tb_count: "Darab", tb_functions: "Támogatott függvények", tb_help: "Tipp: kattints egy cellára és kezdj gépelni. Enter = lefelé, Tab = jobbra, F2 = szerkesztés, Delete = törlés, Ctrl+Z = visszavonás. Excelből másolt cellák beilleszthetők (Ctrl+V).",
  tb_login_save: "A Fájljaimba mentéshez lépj be.", tb_name_prompt: "Fájlnév:", tb_untitled: "Munkafüzet", tb_cached: "A fájlban tárolt érték (ezt a függvényt a szerkesztő nem ismeri)",
});
Object.assign(SZOVEGEK.sk, {
  tb_sub: "Úprava súboru Excel v prehliadači – so vzorcami a viacerými hárkami. Uloženie ide šifrovane späť do Mojich súborov.",
  tb_new: "Nový", tb_open: "Otvoriť z počítača", tb_stored: "…alebo z Mojich súborov:", tb_save_store: "Uložiť do Mojich súborov", tb_overwrite: "Uložiť (prepísať)",
  tb_download: "Stiahnuť .xlsx", tb_csv: "CSV", tb_add_rows: "+ 50 riadkov", tb_add_cols: "+ 5 stĺpcov", tb_undo: "Späť", tb_redo: "Znova",
  tb_sheet: "Hárok", tb_add_sheet: "Nový hárok", tb_rename: "Nový názov hárka:", tb_delete_sheet: "Odstrániť hárok „{n}“?", tb_delete_sheet_btn: "Odstrániť hárok",
  tb_unsaved: "Máš neuložené zmeny. Naozaj pokračovať?", tb_saved: "Uložené: {n}", tb_trunc: "Súbor je veľký, zobrazujem iba prvých {r} riadkov a {c} stĺpcov.",
  tb_sum: "Súčet", tb_avg: "Priemer", tb_count: "Počet", tb_functions: "Podporované funkcie", tb_help: "Tip: klikni na bunku a začni písať. Enter = nadol, Tab = doprava, F2 = úprava, Delete = vymazať, Ctrl+Z = späť. Bunky skopírované z Excelu môžeš vložiť (Ctrl+V).",
  tb_login_save: "Na uloženie do Mojich súborov sa prihlás.", tb_name_prompt: "Názov súboru:", tb_untitled: "Zošit", tb_cached: "Hodnota uložená v súbore (túto funkciu editor nepozná)",
});
Object.assign(SZOVEGEK.en, {
  tb_sub: "Edit an Excel file in your browser – with formulas and several sheets. Saving puts it back into My files, encrypted.",
  tb_new: "New", tb_open: "Open from PC", tb_stored: "…or from My files:", tb_save_store: "Save to My files", tb_overwrite: "Save (overwrite)",
  tb_download: "Download .xlsx", tb_csv: "CSV", tb_add_rows: "+ 50 rows", tb_add_cols: "+ 5 columns", tb_undo: "Undo", tb_redo: "Redo",
  tb_sheet: "Sheet", tb_add_sheet: "New sheet", tb_rename: "New sheet name:", tb_delete_sheet: "Delete sheet \"{n}\"?", tb_delete_sheet_btn: "Delete sheet",
  tb_unsaved: "You have unsaved changes. Continue anyway?", tb_saved: "Saved: {n}", tb_trunc: "The file is large; showing only the first {r} rows and {c} columns.",
  tb_sum: "Sum", tb_avg: "Average", tb_count: "Count", tb_functions: "Supported functions", tb_help: "Tip: click a cell and start typing. Enter = down, Tab = right, F2 = edit, Delete = clear, Ctrl+Z = undo. You can paste cells copied from Excel (Ctrl+V).",
  tb_login_save: "Sign in to save to My files.", tb_name_prompt: "File name:", tb_untitled: "Workbook", tb_cached: "Value stored in the file (the editor doesn't know this function)",
});

const TB_MAX_SOR = 1000, TB_MAX_OSZLOP = 52;

let tb = null;            // { nev, lapok: [{nev, cellak: Map, sorok, oszlopok}], aktiv, taroltId }
let tbSel = { r: 0, c: 0, r2: 0, c2: 0 };
let tbSzerk = null;       // { r, c, input }
let tbValtozott = false;
let tbVissza = [], tbElore = [];
let tbTdk = [];
let tbNyelv = nyelv;
let tbMemo = new Map(), tbFolyamatban = new Set(), tbTarolt = new Set();

const tbVesszo = () => nyelv !== "en";
const tbLap = () => tb.lapok[tb.aktiv];
const tbKulcs = (r, c) => r + "," + c;

/* ---------- Munkafüzet létrehozása ---------- */
function tbUjLap(nev, sorok = 100, oszlopok = 26) { return { nev, cellak: new Map(), sorok, oszlopok }; }
function tbUj() {
  tb = { nev: t("tb_untitled") + ".xlsx", lapok: [tbUjLap(t("tb_sheet") + "1")], aktiv: 0, taroltId: null };
  tbAlaphelyzet();
}
function tbAlaphelyzet() {
  tbSel = { r: 0, c: 0, r2: 0, c2: 0 };
  tbVissza = []; tbElore = [];
  tbValtozott = false;
  tbNyelv = nyelv;
  tbRajzol();
}

/* ---------- Beírt szöveg értelmezése ---------- */
function tbErtelmez(nyers) {
  const s = String(nyers);
  if (s === "") return null;
  if (s.startsWith("=") && s.length > 1) return { k: s };
  if (s.startsWith("'")) return { k: s, v: s.slice(1) };
  const tiszta = s.trim();
  const fel = tiszta.toUpperCase();
  if (fel === "IGAZ" || fel === "TRUE") return { k: s, v: true };
  if (fel === "HAMIS" || fel === "FALSE") return { k: s, v: false };
  // dátum: 2026.11.02 / 2026-11-02 / 02.11.2026
  let m = tiszta.match(/^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})\.?$/);
  if (m) return { k: s, v: KM.datumbol(+m[1], +m[2], +m[3]), d: "datum" };
  m = tiszta.match(/^(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4})$/);
  if (m) return { k: s, v: KM.datumbol(+m[3], +m[2], +m[1]), d: "datum" };
  // szám (ezres elválasztóval, százalékkal)
  const pct = tiszta.endsWith("%");
  let szam = pct ? tiszta.slice(0, -1).trim() : tiszta;
  szam = tbVesszo() ? szam.replace(/[\s ]/g, "").replace(",", ".") : szam.replace(/,/g, "");
  if (/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?$/i.test(szam)) return { k: s, v: pct ? Number(szam) / 100 : Number(szam), d: pct ? "szazalek" : undefined };
  return { k: s, v: s };
}

/* ---------- Kiértékelés ---------- */
function tbLapIndex(nev) {
  const kis = String(nev).toLowerCase();
  return tb.lapok.findIndex((l) => l.nev.toLowerCase() === kis);
}
function tbCellaErtek(lapNev, r, c) {
  const li = typeof lapNev === "number" ? lapNev : tbLapIndex(lapNev);
  const lap = tb.lapok[li];
  if (!lap) return KM.HIBA("#REF!");
  const cella = lap.cellak.get(tbKulcs(r, c));
  if (!cella) return null;
  if (!cella.k || !cella.k.startsWith("=")) return cella.v ?? null;
  const kulcs = li + ":" + r + "," + c;
  if (tbMemo.has(kulcs)) return tbMemo.get(kulcs);
  if (tbFolyamatban.has(kulcs)) return KM.HIBA("#REF!"); // körkörös hivatkozás
  tbFolyamatban.add(kulcs);
  const ctx = {
    lap: li,
    cella: (l, rr, cc) => tbCellaErtek(l, rr, cc),
    hatar: (l) => { const x = tb.lapok[typeof l === "number" ? l : tbLapIndex(l)]; return x ? { sorok: x.sorok, oszlopok: x.oszlopok } : { sorok: 0, oszlopok: 0 }; },
    lapLetezik: (n) => tbLapIndex(n) >= 0,
  };
  let v = KM.kiertekel(KM.keplet(cella.k.slice(1), tbVesszo()), ctx);
  if (KM.tartomanyE(v)) v = tbCellaErtek(v.lap, v.r1, v.c1);
  // Ismeretlen függvény egy megnyitott fájlban: a fájlban tárolt értéket mutatjuk
  if (KM.hibaE(v) && v.hiba === "#NAME?" && cella.fv !== undefined) { v = cella.fv; tbTarolt.add(kulcs); }
  tbFolyamatban.delete(kulcs);
  tbMemo.set(kulcs, v);
  return v;
}

/* ---------- Megjelenítés ---------- */
function tbSzamSzoveg(n) {
  if (!isFinite(n)) return "#NUM!";
  return n.toLocaleString(locale(), { maximumFractionDigits: Math.abs(n) >= 1e15 ? 0 : 10, useGrouping: Math.abs(n) >= 10000 });
}
function tbMegjelenit(v, cella) {
  if (v === null || v === undefined) return { s: "" };
  if (KM.hibaE(v)) return { s: nyelv === "hu" && typeof HIBAERTEKEK !== "undefined" ? HIBAERTEKEK[v.hiba] || v.hiba : v.hiba, o: "hiba" };
  if (typeof v === "boolean") return { s: nyelv === "hu" ? (v ? "IGAZ" : "HAMIS") : v ? "TRUE" : "FALSE", o: "logikai" };
  if (typeof v === "number") {
    const tipus = cella && (cella.d || (cella.k && /^=\s*(MA|TODAY|DÁTUM|DATE|KALK\.MUNKANAP|WORKDAY|EDATE|EOMONTH|HÓNAP\.UTOLSÓ\.NAP)\s*\(/i.test(cella.k) ? "datum" : null));
    if (tipus === "datum" && v > 0 && v < 2958466) {
      const d = KM.datumra(v);
      return { s: new Date(Date.UTC(d.y, d.m - 1, d.d)).toLocaleDateString(locale(), { timeZone: "UTC" }), o: "szam" };
    }
    if (tipus === "szazalek") return { s: tbSzamSzoveg(+(v * 100).toPrecision(12)) + "%", o: "szam" };
    return { s: tbSzamSzoveg(+v.toPrecision(15)), o: "szam" };
  }
  return { s: String(v) };
}

function tbRajzol() {
  if (!tb) return tbUj();
  const lap = tbLap();
  const racs = $("tb-racs");
  const fej = ["<thead><tr><th class='tb-sarok'></th>"];
  for (let c = 0; c < lap.oszlopok; c++) fej.push(`<th>${KM.oszlopBetuje(c)}</th>`);
  fej.push("</tr></thead>");
  const test = ["<tbody>"];
  for (let r = 0; r < lap.sorok; r++) {
    test.push(`<tr><th>${r + 1}</th>`);
    for (let c = 0; c < lap.oszlopok; c++) test.push("<td></td>");
    test.push("</tr>");
  }
  test.push("</tbody>");
  racs.innerHTML = fej.join("") + test.join("");
  tbTdk = [...racs.tBodies[0].rows].map((tr) => [...tr.cells].slice(1));
  tbErtekekFrissit();
  tbLapfulek();
  $("tb-fajlnev").textContent = tb.nev + (tbValtozott ? " •" : "");
  $("tb-felulir").hidden = !tb.taroltId || !titkositoKulcs;
  $("tb-ment").hidden = !titkositoKulcs;
}

function tbErtekekFrissit() {
  tbMemo = new Map();
  tbFolyamatban = new Set();
  tbTarolt = new Set();
  const lap = tbLap();
  for (const sor of tbTdk) for (const td of sor) if (td.textContent) { td.textContent = ""; td.className = ""; td.title = ""; }
  for (const [kulcs, cella] of lap.cellak) {
    const [r, c] = kulcs.split(",").map(Number);
    const td = tbTdk[r] && tbTdk[r][c];
    if (!td) continue;
    const v = tbCellaErtek(tb.aktiv, r, c);
    const m = tbMegjelenit(v, cella);
    td.textContent = m.s;
    td.className = m.o || "";
    if (tbTarolt.has(tb.aktiv + ":" + kulcs)) {
      td.classList.add("tarolt");
      td.title = t("tb_cached");
    }
  }
  tbKijelolesRajzol();
  $("tb-fajlnev").textContent = tb.nev + (tbValtozott ? " •" : "");
}

function tbKijelolesRajzol() {
  $("tb-racs").querySelectorAll(".kijelolt, .aktiv-cella").forEach((td) => td.classList.remove("kijelolt", "aktiv-cella"));
  const [r1, r2] = [Math.min(tbSel.r, tbSel.r2), Math.max(tbSel.r, tbSel.r2)];
  const [c1, c2] = [Math.min(tbSel.c, tbSel.c2), Math.max(tbSel.c, tbSel.c2)];
  for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) tbTdk[r]?.[c]?.classList.add("kijelolt");
  const td = tbTdk[tbSel.r]?.[tbSel.c];
  if (td) td.classList.add("aktiv-cella");
  $("tb-cim").textContent = KM.oszlopBetuje(tbSel.c) + (tbSel.r + 1) + (r1 !== r2 || c1 !== c2 ? ":" + KM.oszlopBetuje(c2) + (r2 + 1) : "");
  const cella = tbLap().cellak.get(tbKulcs(tbSel.r, tbSel.c));
  if (document.activeElement !== $("tb-keplet")) $("tb-keplet").value = cella ? cella.k : "";
  // Állapotsor: összeg, átlag, darab
  let osszeg = 0, db = 0, szamDb = 0;
  if (r1 !== r2 || c1 !== c2) {
    for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) {
      const v = tbCellaErtek(tb.aktiv, r, c);
      if (v !== null && v !== "") db++;
      if (typeof v === "number") { osszeg += v; szamDb++; }
    }
  }
  $("tb-allapot").textContent = db
    ? `${t("tb_count")}: ${db}` + (szamDb ? ` · ${t("tb_sum")}: ${tbSzamSzoveg(+osszeg.toPrecision(15))} · ${t("tb_avg")}: ${tbSzamSzoveg(+(osszeg / szamDb).toPrecision(12))}` : "")
    : "";
}

function tbLapfulek() {
  const doboz = $("tb-lapok");
  doboz.innerHTML = "";
  tb.lapok.forEach((l, i) => {
    const g = document.createElement("button");
    g.type = "button";
    g.textContent = l.nev;
    g.classList.toggle("aktiv", i === tb.aktiv);
    g.addEventListener("click", () => { tbSzerkesztesVege(true); tb.aktiv = i; tbSel = { r: 0, c: 0, r2: 0, c2: 0 }; tbRajzol(); });
    g.addEventListener("dblclick", () => {
      const uj = prompt(t("tb_rename"), l.nev);
      const tiszta = uj && uj.replace(/[\\/?*[\]:]/g, "").trim().slice(0, 31);
      if (tiszta && tbLapIndex(tiszta) < 0) { l.nev = tiszta; tbValtozas(); tbLapfulek(); }
    });
    doboz.appendChild(g);
  });
  const plusz = document.createElement("button");
  plusz.type = "button";
  plusz.className = "tb-lap-plusz";
  plusz.textContent = "+";
  plusz.title = t("tb_add_sheet");
  plusz.addEventListener("click", () => {
    let n = tb.lapok.length + 1;
    while (tbLapIndex(t("tb_sheet") + n) >= 0) n++;
    tb.lapok.push(tbUjLap(t("tb_sheet") + n));
    tb.aktiv = tb.lapok.length - 1;
    tbValtozas();
    tbRajzol();
  });
  doboz.appendChild(plusz);
  if (tb.lapok.length > 1) {
    const torol = document.createElement("button");
    torol.type = "button";
    torol.className = "tb-lap-torol";
    torol.textContent = "🗑 " + t("tb_delete_sheet_btn");
    torol.addEventListener("click", () => {
      if (!confirm(t("tb_delete_sheet", { n: tbLap().nev }))) return;
      tb.lapok.splice(tb.aktiv, 1);
      tb.aktiv = Math.max(0, tb.aktiv - 1);
      tbValtozas();
      tbRajzol();
    });
    doboz.appendChild(torol);
  }
}

/* ---------- Módosítás, visszavonás ---------- */
function tbValtozas() {
  tbValtozott = true;
  $("tb-fajlnev").textContent = tb.nev + " •";
}
function tbBeallit(valtozasok, rogzit = true) {
  // valtozasok: [{lap, r, c, uj}] – uj: nyers szöveg ("" = törlés)
  const naplo = [];
  for (const v of valtozasok) {
    const lap = tb.lapok[v.lap];
    const kulcs = tbKulcs(v.r, v.c);
    const regi = lap.cellak.get(kulcs);
    naplo.push({ lap: v.lap, r: v.r, c: v.c, elotte: regi ? { ...regi } : null });
    const uj = typeof v.uj === "object" ? v.uj : tbErtelmez(v.uj);
    if (uj) lap.cellak.set(kulcs, uj); else lap.cellak.delete(kulcs);
    if (v.r >= lap.sorok) lap.sorok = Math.min(TB_MAX_SOR * 5, v.r + 20);
    if (v.c >= lap.oszlopok) lap.oszlopok = v.c + 3;
  }
  if (rogzit) { tbVissza.push(naplo); tbElore = []; if (tbVissza.length > 100) tbVissza.shift(); }
  tbValtozas();
  return naplo;
}
function tbVisszavon(elore = false) {
  const honnan = elore ? tbElore : tbVissza, hova = elore ? tbVissza : tbElore;
  const lepes = honnan.pop();
  if (!lepes) return;
  const ellen = [];
  for (const v of lepes) {
    const lap = tb.lapok[v.lap];
    if (!lap) continue;
    const kulcs = tbKulcs(v.r, v.c);
    const most = lap.cellak.get(kulcs);
    ellen.push({ lap: v.lap, r: v.r, c: v.c, elotte: most ? { ...most } : null });
    if (v.elotte) lap.cellak.set(kulcs, v.elotte); else lap.cellak.delete(kulcs);
  }
  hova.push(ellen);
  tbValtozas();
  tbErtekekFrissit();
}

/* ---------- Cella szerkesztése ---------- */
function tbSzerkesztesKezd(kezdo) {
  const td = tbTdk[tbSel.r]?.[tbSel.c];
  if (!td) return;
  tbSzerkesztesVege(true);
  const cella = tbLap().cellak.get(tbKulcs(tbSel.r, tbSel.c));
  const input = document.createElement("input");
  input.className = "tb-szerk";
  input.value = kezdo !== undefined ? kezdo : cella ? cella.k : "";
  const doboz = $("tb-racs-doboz");
  const dr = doboz.getBoundingClientRect(), cr = td.getBoundingClientRect();
  Object.assign(input.style, { left: cr.left - dr.left + doboz.scrollLeft + "px", top: cr.top - dr.top + doboz.scrollTop + "px", minWidth: cr.width + "px", height: cr.height + "px" });
  doboz.appendChild(input);
  tbSzerk = { r: tbSel.r, c: tbSel.c, input };
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
  input.addEventListener("input", () => ($("tb-keplet").value = input.value));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); tbSzerkesztesVege(true); tbLep(e.shiftKey ? -1 : 1, 0); }
    else if (e.key === "Tab") { e.preventDefault(); tbSzerkesztesVege(true); tbLep(0, e.shiftKey ? -1 : 1); }
    else if (e.key === "Escape") { e.preventDefault(); tbSzerkesztesVege(false); }
  });
  input.addEventListener("blur", () => setTimeout(() => tbSzerk && tbSzerk.input === input && tbSzerkesztesVege(true), 0));
}
function tbSzerkesztesVege(ment) {
  if (!tbSzerk) return;
  const { r, c, input } = tbSzerk;
  tbSzerk = null;
  const ertek = input.value;
  input.remove();
  if (ment) {
    const regi = tbLap().cellak.get(tbKulcs(r, c));
    if ((regi ? regi.k : "") !== ertek) { tbBeallit([{ lap: tb.aktiv, r, c, uj: ertek }]); tbErtekekFrissit(); }
  }
  $("tb-racs-doboz").focus({ preventScroll: true });
}
function tbLep(dr, dc, kiterjeszt = false) {
  const lap = tbLap();
  const r = Math.max(0, Math.min(lap.sorok - 1, tbSel.r + dr));
  const c = Math.max(0, Math.min(lap.oszlopok - 1, tbSel.c + dc));
  if (kiterjeszt) { tbSel.r2 = Math.max(0, Math.min(lap.sorok - 1, tbSel.r2 + dr)); tbSel.c2 = Math.max(0, Math.min(lap.oszlopok - 1, tbSel.c2 + dc)); }
  else tbSel = { r, c, r2: r, c2: c };
  tbKijelolesRajzol();
  const td = tbTdk[kiterjeszt ? tbSel.r2 : r]?.[kiterjeszt ? tbSel.c2 : c];
  if (td) td.scrollIntoView({ block: "nearest", inline: "nearest" });
}
const tbTartomany = () => ({ r1: Math.min(tbSel.r, tbSel.r2), r2: Math.max(tbSel.r, tbSel.r2), c1: Math.min(tbSel.c, tbSel.c2), c2: Math.max(tbSel.c, tbSel.c2) });

/* ---------- Egér ---------- */
let tbHuz = false;
$("tb-racs").addEventListener("mousedown", (e) => {
  const td = e.target.closest("td");
  const th = e.target.closest("th");
  if (td) {
    const r = td.parentElement.sectionRowIndex, c = td.cellIndex - 1;
    tbSzerkesztesVege(true);
    if (e.shiftKey) { tbSel.r2 = r; tbSel.c2 = c; } else tbSel = { r, c, r2: r, c2: c };
    tbHuz = true;
    tbKijelolesRajzol();
    e.preventDefault();
    $("tb-racs-doboz").focus({ preventScroll: true });
  } else if (th) {
    // sor- vagy oszlopfejléc: egész sor / oszlop kijelölése
    const lap = tbLap();
    tbSzerkesztesVege(true);
    if (th.parentElement.parentElement.tagName === "THEAD" && th.cellIndex > 0) { const c = th.cellIndex - 1; tbSel = { r: 0, c, r2: lap.sorok - 1, c2: c }; }
    else if (th.parentElement.parentElement.tagName === "TBODY") { const r = th.parentElement.sectionRowIndex; tbSel = { r, c: 0, r2: r, c2: lap.oszlopok - 1 }; }
    tbKijelolesRajzol();
    e.preventDefault();
    $("tb-racs-doboz").focus({ preventScroll: true });
  }
});
$("tb-racs").addEventListener("mouseover", (e) => {
  if (!tbHuz) return;
  const td = e.target.closest("td");
  if (!td) return;
  tbSel.r2 = td.parentElement.sectionRowIndex; tbSel.c2 = td.cellIndex - 1;
  tbKijelolesRajzol();
});
document.addEventListener("mouseup", () => (tbHuz = false));
$("tb-racs").addEventListener("dblclick", (e) => { if (e.target.closest("td")) tbSzerkesztesKezd(); });

/* ---------- Billentyűzet ---------- */
$("tb-racs-doboz").addEventListener("keydown", (e) => {
  if (tbSzerk || e.target !== $("tb-racs-doboz")) return;
  const ctrl = e.ctrlKey || e.metaKey;
  const nyilak = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
  if (nyilak[e.key]) { e.preventDefault(); const [dr, dc] = nyilak[e.key]; tbLep(ctrl ? dr * 1000 : dr, ctrl ? dc * 1000 : dc, e.shiftKey); return; }
  if (e.key === "Enter") { e.preventDefault(); tbLep(e.shiftKey ? -1 : 1, 0); return; }
  if (e.key === "Tab") { e.preventDefault(); tbLep(0, e.shiftKey ? -1 : 1); return; }
  if (e.key === "F2") { e.preventDefault(); tbSzerkesztesKezd(); return; }
  if (e.key === "Delete" || e.key === "Backspace") {
    e.preventDefault();
    const { r1, r2, c1, c2 } = tbTartomany();
    const v = [];
    for (let r = r1; r <= r2; r++) for (let c = c1; c <= c2; c++) if (tbLap().cellak.has(tbKulcs(r, c))) v.push({ lap: tb.aktiv, r, c, uj: "" });
    if (v.length) { tbBeallit(v); tbErtekekFrissit(); }
    return;
  }
  if (ctrl && e.key.toLowerCase() === "z") { e.preventDefault(); tbVisszavon(e.shiftKey); return; }
  if (ctrl && e.key.toLowerCase() === "y") { e.preventDefault(); tbVisszavon(true); return; }
  if (ctrl && e.key.toLowerCase() === "a") { e.preventDefault(); tbSel = { r: 0, c: 0, r2: tbLap().sorok - 1, c2: tbLap().oszlopok - 1 }; tbKijelolesRajzol(); return; }
  if (e.key.length === 1 && !ctrl && !e.altKey) { e.preventDefault(); tbSzerkesztesKezd(e.key); }
});

// Másolás: tabulátorral elválasztott szöveg (Excel így érti); beillesztés Excelből is
$("tb-racs-doboz").addEventListener("copy", (e) => {
  if (tbSzerk) return;
  const { r1, r2, c1, c2 } = tbTartomany();
  const sorok = [];
  for (let r = r1; r <= r2; r++) {
    const sor = [];
    for (let c = c1; c <= c2; c++) sor.push(tbMegjelenit(tbCellaErtek(tb.aktiv, r, c), tbLap().cellak.get(tbKulcs(r, c))).s);
    sorok.push(sor.join("\t"));
  }
  e.clipboardData.setData("text/plain", sorok.join("\r\n"));
  e.preventDefault();
});
$("tb-racs-doboz").addEventListener("paste", (e) => {
  if (tbSzerk) return;
  const szoveg = e.clipboardData.getData("text/plain");
  if (!szoveg) return;
  e.preventDefault();
  const sorok = szoveg.replace(/\r\n?/g, "\n").replace(/\n$/, "").split("\n").map((s) => s.split("\t"));
  const v = [];
  sorok.forEach((sor, i) => sor.forEach((ertek, j) => v.push({ lap: tb.aktiv, r: tbSel.r + i, c: tbSel.c + j, uj: ertek })));
  const lap = tbLap();
  const regiSor = lap.sorok, regiOszlop = lap.oszlopok;
  tbBeallit(v);
  tbSel.r2 = tbSel.r + sorok.length - 1;
  tbSel.c2 = tbSel.c + Math.max(...sorok.map((s) => s.length)) - 1;
  if (lap.sorok !== regiSor || lap.oszlopok !== regiOszlop) tbRajzol(); else tbErtekekFrissit();
});

/* ---------- Képletsor ---------- */
$("tb-keplet").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    tbBeallit([{ lap: tb.aktiv, r: tbSel.r, c: tbSel.c, uj: $("tb-keplet").value }]);
    tbErtekekFrissit();
    $("tb-racs-doboz").focus({ preventScroll: true });
    tbLep(1, 0);
  } else if (e.key === "Escape") {
    $("tb-racs-doboz").focus({ preventScroll: true });
    tbKijelolesRajzol();
  }
});

/* ---------- Megnyitás (SheetJS) ---------- */
async function tbMegnyit(adat, nev, taroltId = null) {
  if (tbValtozott && !confirm(t("tb_unsaved"))) return;
  await sheetjsBetolt();
  const wb = XLSX.read(adat, { type: "array", cellFormula: true, cellNF: true, cellDates: false });
  let csonkolt = false;
  const lapok = wb.SheetNames.map((ln) => {
    const ws = wb.Sheets[ln];
    const lap = tbUjLap(ln);
    const ref = ws["!ref"];
    if (!ref) return lap;
    const tart = XLSX.utils.decode_range(ref);
    if (tart.e.r >= TB_MAX_SOR || tart.e.c >= TB_MAX_OSZLOP) csonkolt = true;
    const maxR = Math.min(tart.e.r, TB_MAX_SOR - 1), maxC = Math.min(tart.e.c, TB_MAX_OSZLOP - 1);
    for (let r = tart.s.r; r <= maxR; r++) for (let c = tart.s.c; c <= maxC; c++) {
      const x = ws[XLSX.utils.encode_cell({ r, c })];
      if (!x || (x.v === undefined && !x.f)) continue;
      const cella = {};
      if (x.f) {
        cella.k = "=" + (nyelv === "en" ? x.f : kepletForditas(x.f, "en", nyelv).ki);
        if (x.v !== undefined && x.t !== "e") cella.fv = x.v;
      } else if (x.t === "n") {
        cella.v = x.v;
        if (x.z && XLSX.SSF.is_date(x.z)) cella.d = "datum";
        else if (x.z && String(x.z).includes("%")) cella.d = "szazalek";
        cella.k = cella.d === "datum" ? tbDatumSzoveg(x.v) : cella.d === "szazalek" ? tbSzamBe(x.v * 100) + "%" : tbSzamBe(x.v);
      } else if (x.t === "b") { cella.v = x.v; cella.k = tbMegjelenit(x.v).s; }
      else if (x.t === "e") { cella.v = KM.HIBA(x.w || "#N/A"); cella.k = x.w || "#N/A"; }
      else { cella.v = String(x.v); cella.k = String(x.v); }
      if (x.f && /^(TODAY|DATE|NOW|EDATE|EOMONTH|WORKDAY)\(/i.test(x.f)) cella.d = "datum";
      else if (x.f && x.z && XLSX.SSF.is_date(x.z)) cella.d = "datum";
      lap.cellak.set(tbKulcs(r, c), cella);
    }
    lap.sorok = Math.min(TB_MAX_SOR, Math.max(100, maxR + 21));
    lap.oszlopok = Math.min(TB_MAX_OSZLOP, Math.max(26, maxC + 4));
    return lap;
  });
  tb = { nev: nev.replace(/\.(xls|ods|csv|xlsm)$/i, ".xlsx"), lapok: lapok.length ? lapok : [tbUjLap(t("tb_sheet") + "1")], aktiv: 0, taroltId };
  if (/\.xlsx$/i.test(nev) === false) tb.taroltId = null; // más formátumot nem írunk felül
  tbAlaphelyzet();
  if (csonkolt) ertesit(t("tb_trunc", { r: TB_MAX_SOR, c: TB_MAX_OSZLOP }), true);
}
const tbSzamBe = (n) => (tbVesszo() ? String(n).replace(".", ",") : String(n));
function tbDatumSzoveg(n) {
  const d = KM.datumra(n), k = (v) => String(v).padStart(2, "0");
  return nyelv === "hu" ? `${d.y}.${k(d.m)}.${k(d.d)}.` : nyelv === "sk" ? `${d.d}.${d.m}.${d.y}` : `${d.y}-${k(d.m)}-${k(d.d)}`;
}

/* ---------- Mentés ---------- */
async function tbMunkafuzetBajtok(tipus = "xlsx") {
  await sheetjsBetolt();
  const wb = XLSX.utils.book_new();
  tbMemo = new Map();
  tb.lapok.forEach((lap, li) => {
    const ws = {};
    let maxR = 0, maxC = 0;
    for (const [kulcs, cella] of lap.cellak) {
      const [r, c] = kulcs.split(",").map(Number);
      maxR = Math.max(maxR, r); maxC = Math.max(maxC, c);
      const v = tbCellaErtek(li, r, c);
      const x = {};
      if (cella.k && cella.k.startsWith("=")) x.f = nyelv === "en" ? cella.k.slice(1) : kepletForditas(cella.k.slice(1), nyelv, "en").ki;
      if (KM.hibaE(v)) { x.t = "e"; x.v = { "#NULL!": 0, "#DIV/0!": 7, "#VALUE!": 15, "#REF!": 23, "#NAME?": 29, "#NUM!": 36, "#N/A": 42 }[v.hiba] ?? 42; }
      else if (typeof v === "number") { x.t = "n"; x.v = v; }
      else if (typeof v === "boolean") { x.t = "b"; x.v = v; }
      else { x.t = "s"; x.v = v ?? ""; }
      if (cella.d === "datum" || (x.f && /^(TODAY|DATE|EDATE|EOMONTH|WORKDAY)\(/i.test(x.f))) x.z = nyelv === "en" ? "yyyy-mm-dd" : nyelv === "sk" ? "d.m.yyyy" : "yyyy.mm.dd.";
      else if (cella.d === "szazalek") x.z = "0%";
      ws[XLSX.utils.encode_cell({ r, c })] = x;
    }
    ws["!ref"] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: maxR, c: maxC } });
    XLSX.utils.book_append_sheet(wb, ws, lap.nev.slice(0, 31));
  });
  if (tipus === "csv") return new TextEncoder().encode("﻿" + XLSX.utils.sheet_to_csv(wb.Sheets[wb.SheetNames[tb.aktiv]], { FS: nyelv === "en" ? "," : ";" }));
  return new Uint8Array(XLSX.write(wb, { type: "array", bookType: "xlsx" }));
}

$("tb-letolt").addEventListener("click", async () => { tbSzerkesztesVege(true); mentes(await tbMunkafuzetBajtok(), tb.nev); });
$("tb-csv").addEventListener("click", async () => { tbSzerkesztesVege(true); mentes(await tbMunkafuzetBajtok("csv"), tb.nev.replace(/\.xlsx$/i, "") + "_" + tbLap().nev + ".csv"); });

async function tbTarolba(felulir) {
  tbSzerkesztesVege(true);
  if (!titkositoKulcs) return ertesit(t("tb_login_save"), true);
  let nev = tb.nev;
  if (!felulir) {
    const uj = prompt(t("tb_name_prompt"), nev);
    if (!uj) return;
    nev = /\.xlsx$/i.test(uj) ? uj : uj + ".xlsx";
  }
  const bajtok = await tbMunkafuzetBajtok();
  const regiId = felulir ? tb.taroltId : null;
  await feltolt(new File([bajtok], nev, { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
  if (regiId) { try { await api("files/" + regiId, { method: "DELETE" }); } catch {} }
  await listaFrissit();
  const uj = fajlok.find((f) => f.nev === nev);
  tb.nev = nev;
  tb.taroltId = uj ? uj.id : null;
  tbValtozott = false;
  tbRajzol();
  tbTaroltLista();
}
$("tb-ment").addEventListener("click", () => tbTarolba(false));
$("tb-felulir").addEventListener("click", () => tbTarolba(true));

/* ---------- Eszköztár ---------- */
$("tb-uj").addEventListener("click", () => { if (!tbValtozott || confirm(t("tb_unsaved"))) tbUj(); });
$("tb-fajl").addEventListener("change", async (e) => {
  const f = e.target.files[0];
  e.target.value = "";
  if (!f) return;
  try { await tbMegnyit(new Uint8Array(await f.arrayBuffer()), f.name); } catch (hiba) { ertesit(hiba.message || t("preview_lib_failed"), true); }
});
function tbTaroltLista() {
  const sel = $("tb-tarolt");
  const lista = titkositoKulcs ? fajlok.filter((f) => tablazatE(f.nev)) : [];
  sel.hidden = $("tb-tarolt-cim").hidden = !lista.length;
  sel.innerHTML = "";
  sel.add(new Option("—", ""));
  lista.forEach((f) => sel.add(new Option(f.nev, f.id)));
}
$("tb-tarolt").addEventListener("change", async () => {
  const f = fajlok.find((x) => x.id === $("tb-tarolt").value);
  $("tb-tarolt").value = "";
  if (!f) return;
  try { await tbMegnyit(await fajlTartalom(f), f.nev, f.id); } catch (hiba) { hibaKezeles(hiba); }
});
$("tb-sorok").addEventListener("click", () => { tbLap().sorok = Math.min(TB_MAX_SOR * 5, tbLap().sorok + 50); tbRajzol(); });
$("tb-oszlopok").addEventListener("click", () => { tbLap().oszlopok = Math.min(200, tbLap().oszlopok + 5); tbRajzol(); });
$("tb-vissza").addEventListener("click", () => tbVisszavon(false));
$("tb-elore").addEventListener("click", () => tbVisszavon(true));

// A támogatott függvények listája az aktuális nyelven
function tbFuggvenyLista() {
  const nevek = KM.fuggvenyek().map((en) => (nyelv === "hu" && typeof EN_HU !== "undefined" && EN_HU[en] ? EN_HU[en] : en));
  $("tb-fv-lista").textContent = nevek.sort((a, b) => a.localeCompare(b, "hu")).join(" · ");
}

// Nyelvváltáskor a képletek is átíródnak (pl. SZUM ↔ SUM, ; ↔ ,)
forditasHookok.push(() => {
  if (tb && tbNyelv !== nyelv) {
    for (const lap of tb.lapok) for (const cella of lap.cellak.values())
      if (cella.k && cella.k.startsWith("=")) cella.k = "=" + kepletForditas(cella.k.slice(1), tbNyelv, nyelv).ki;
    tbNyelv = nyelv;
  }
  if (tb) tbErtekekFrissit();
  tbFuggvenyLista();
});

window.addEventListener("beforeunload", (e) => { if (tbValtozott) { e.preventDefault(); e.returnValue = ""; } });

oldalHookok.tabla = () => {
  if (!tb) tbUj(); else tbRajzol();
  tbTaroltLista();
  tbFuggvenyLista();
  setTimeout(() => $("tb-racs-doboz").focus({ preventScroll: true }), 50);
};
if (aktivOldal === "tabla") oldalHookok.tabla();
