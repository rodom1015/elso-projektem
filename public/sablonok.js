/*
  EXCEL SABLONOK – kész, képletes munkafüzetek letöltésre (SK / HU / EN)
  1. Dochádzka / Munkaidő-nyilvántartás (havi, ünnepnapokkal, hétvégék jelölve)
  2. Dovolenka / Szabadság-nyilvántartás (munkanapok számítása ünnepnapokkal)
  3. Rozpočet / Költségvetés (12 hónap, összesítők, megtakarítási arány)
  4. Cenová ponuka / Árajánlat (tételek, kedvezmény, ÁFA, végösszeg)
  5. Sklad / Raktár (bevét, kiadás, készlet, figyelmeztetés minimum alatt)
  A sárga cellákba kell írni, a többit a képletek számolják.

  xlsxFormaz(): közös segéd – a SheetJS ingyenes változata nem ír stílust, ezért a kész xlsx-be
  utólag tesszük bele: félkövér, kitöltés, fagyasztott fejléc, legördülő lista.
*/

Object.assign(SZOVEGEK.hu, {
  sb_sub: "Kész, képletes Excel fájlok – csak a sárga cellákat kell kitölteni, a többit a képletek számolják.",
  sb_download: "Letöltés (.xlsx)", sb_month: "Hónap", sb_year: "Év", sb_country: "Ünnepnapok", sb_country_sk: "Szlovákia", sb_country_hu: "Magyarország", sb_name: "Név", sb_hours: "Napi munkaidő (óra)",
  sb_vat: "ÁFA (%)", sb_currency: "Pénznem", sb_how: "Hogyan használd?", sb_note_yellow: "A sárga cellák a kitöltendők. A képleteket ne írd felül.",
  sb_t1: "Munkaidő-nyilvántartás", sb_t1_d: "Havi jelenléti ív: érkezés, távozás, szünet → ledolgozott órák és túlóra. A hétvégék és ünnepnapok jelölve, a havi munkaidőkeret kiszámolva.",
  sb_t2: "Szabadság-nyilvántartás", sb_t2_d: "Dolgozónként: járó, áthozott, kivett és megmaradt szabadság. A kivett napokat munkanapban számolja, az ünnepnapokat kihagyja.",
  sb_t3: "Havi költségvetés", sb_t3_d: "Bevételek és kiadások 12 hónapra kategóriánként, havi egyenleg és megtakarítási arány.",
  sb_t4: "Árajánlat", sb_t4_d: "Tételek mennyiséggel, egységárral, kedvezménnyel – nettó, ÁFA és végösszeg automatikusan, érvényességi dátummal.",
  sb_t5: "Raktárnyilvántartás", sb_t5_d: "Bevételezés és kiadás naplóból automatikus készlet; figyelmeztet, ha egy termék a minimum alá csökken.",
  // munkalap- és oszlopnevek
  x_att: "Jelenléti ív", x_date: "Dátum", x_day: "Nap", x_in: "Érkezés", x_out: "Távozás", x_break: "Szünet (perc)", x_worked: "Ledolgozott (óra)", x_ot: "Túlóra (óra)", x_note: "Megjegyzés",
  x_weekend: "Hétvége", x_holiday: "Ünnep", x_total: "Összesen", x_workdays: "Munkanapok a hónapban", x_fund: "Havi munkaidőkeret (óra)", x_diff: "Eltérés a kerettől (óra)", x_name: "Név:", x_daily: "Napi munkaidő (óra):",
  x_leave: "Szabadság", x_overview: "Áttekintés", x_taken_log: "Kivett szabadság", x_holidays: "Ünnepnapok", x_employee: "Dolgozó", x_entitled: "Jár (nap)", x_carried: "Áthozott (nap)", x_taken: "Kivett (nap)", x_left: "Megmaradt (nap)",
  x_from: "Ettől", x_to: "Eddig", x_workdays_short: "Munkanap", x_holiday_name: "Ünnep neve", x_emp: "Dolgozó",
  x_budget: "Költségvetés", x_item: "Tétel", x_income: "BEVÉTELEK", x_expenses: "KIADÁSOK", x_salary: "Fizetés", x_other_income: "Egyéb bevétel", x_housing: "Lakhatás", x_energy: "Rezsi", x_food: "Élelmiszer", x_transport: "Közlekedés",
  x_phone: "Telefon, internet", x_health: "Egészség", x_fun: "Szórakozás", x_savings: "Megtakarítás", x_other: "Egyéb", x_income_total: "Bevétel összesen", x_expense_total: "Kiadás összesen", x_balance: "Egyenleg", x_save_rate: "Megtakarítási arány", x_year_total: "Év összesen", x_avg: "Havi átlag",
  x_quote: "ÁRAJÁNLAT", x_supplier: "Ajánlattevő:", x_customer: "Megrendelő:", x_number: "Szám:", x_issued: "Kelt:", x_valid: "Érvényes:", x_desc: "Megnevezés", x_qty: "Mennyiség", x_unit: "Egység", x_price: "Egységár", x_disc: "Kedvezmény", x_net: "Nettó",
  x_net_total: "Nettó összesen", x_vat: "ÁFA", x_gross: "Fizetendő összesen", x_sample_item: "Tanácsadás", x_hour: "óra", x_pc: "db",
  x_stock: "Raktár", x_moves: "Mozgások", x_code: "Kód", x_product: "Termék", x_min: "Minimum készlet", x_in_qty: "Bevételezés", x_out_qty: "Kiadás", x_on_hand: "Készlet", x_status: "Állapot", x_order: "⚠ Rendelni kell", x_type: "Típus",
  x_typ_in: "Bevét", x_typ_out: "Kiadás",
});
Object.assign(SZOVEGEK.sk, {
  sb_sub: "Hotové súbory Excel so vzorcami – stačí vyplniť žlté bunky, zvyšok vypočítajú vzorce.",
  sb_download: "Stiahnuť (.xlsx)", sb_month: "Mesiac", sb_year: "Rok", sb_country: "Sviatky", sb_country_sk: "Slovensko", sb_country_hu: "Maďarsko", sb_name: "Meno", sb_hours: "Denný úväzok (hod.)",
  sb_vat: "DPH (%)", sb_currency: "Mena", sb_how: "Ako to používať?", sb_note_yellow: "Žlté bunky sú na vyplnenie. Vzorce neprepisuj.",
  sb_t1: "Dochádzka", sb_t1_d: "Mesačný dochádzkový list: príchod, odchod, prestávka → odpracované hodiny a nadčasy. Víkendy a sviatky sú označené, mesačný fond pracovného času je vypočítaný.",
  sb_t2: "Evidencia dovoleniek", sb_t2_d: "Pre každého zamestnanca: nárok, prenesená, čerpaná a zostávajúca dovolenka. Čerpanie sa počíta v pracovných dňoch bez sviatkov.",
  sb_t3: "Mesačný rozpočet", sb_t3_d: "Príjmy a výdavky na 12 mesiacov podľa kategórií, mesačný zostatok a miera úspor.",
  sb_t4: "Cenová ponuka", sb_t4_d: "Položky s množstvom, jednotkovou cenou a zľavou – základ, DPH a suma spolu automaticky, s dátumom platnosti.",
  sb_t5: "Skladová evidencia", sb_t5_d: "Automatický stav zásob z denníka príjmov a výdajov; upozorní, keď tovar klesne pod minimum.",
  x_att: "Dochádzka", x_date: "Dátum", x_day: "Deň", x_in: "Príchod", x_out: "Odchod", x_break: "Prestávka (min)", x_worked: "Odpracované (h)", x_ot: "Nadčas (h)", x_note: "Poznámka",
  x_weekend: "Víkend", x_holiday: "Sviatok", x_total: "Spolu", x_workdays: "Pracovné dni v mesiaci", x_fund: "Mesačný fond pracovného času (h)", x_diff: "Rozdiel oproti fondu (h)", x_name: "Meno:", x_daily: "Denný úväzok (h):",
  x_leave: "Dovolenka", x_overview: "Prehľad", x_taken_log: "Čerpanie", x_holidays: "Sviatky", x_employee: "Zamestnanec", x_entitled: "Nárok (dni)", x_carried: "Prenesená (dni)", x_taken: "Čerpaná (dni)", x_left: "Zostatok (dni)",
  x_from: "Od", x_to: "Do", x_workdays_short: "Pracovné dni", x_holiday_name: "Názov sviatku", x_emp: "Zamestnanec",
  x_budget: "Rozpočet", x_item: "Položka", x_income: "PRÍJMY", x_expenses: "VÝDAVKY", x_salary: "Mzda", x_other_income: "Iné príjmy", x_housing: "Bývanie", x_energy: "Energie", x_food: "Potraviny", x_transport: "Doprava",
  x_phone: "Telefón, internet", x_health: "Zdravie", x_fun: "Zábava", x_savings: "Sporenie", x_other: "Iné", x_income_total: "Príjmy spolu", x_expense_total: "Výdavky spolu", x_balance: "Zostatok", x_save_rate: "Miera úspor", x_year_total: "Rok spolu", x_avg: "Priemer/mesiac",
  x_quote: "CENOVÁ PONUKA", x_supplier: "Dodávateľ:", x_customer: "Odberateľ:", x_number: "Číslo:", x_issued: "Dátum:", x_valid: "Platnosť do:", x_desc: "Popis", x_qty: "Množstvo", x_unit: "Jednotka", x_price: "Cena/jedn.", x_disc: "Zľava", x_net: "Bez DPH",
  x_net_total: "Základ dane", x_vat: "DPH", x_gross: "Spolu na úhradu", x_sample_item: "Konzultácia", x_hour: "hod.", x_pc: "ks",
  x_stock: "Sklad", x_moves: "Pohyby", x_code: "Kód", x_product: "Tovar", x_min: "Minimálny stav", x_in_qty: "Príjem", x_out_qty: "Výdaj", x_on_hand: "Stav", x_status: "Stav zásoby", x_order: "⚠ Objednať", x_type: "Typ",
  x_typ_in: "Príjem", x_typ_out: "Výdaj",
});
Object.assign(SZOVEGEK.en, {
  sb_sub: "Ready-made Excel files with formulas – just fill in the yellow cells, the formulas do the rest.",
  sb_download: "Download (.xlsx)", sb_month: "Month", sb_year: "Year", sb_country: "Holidays", sb_country_sk: "Slovakia", sb_country_hu: "Hungary", sb_name: "Name", sb_hours: "Daily hours",
  sb_vat: "VAT (%)", sb_currency: "Currency", sb_how: "How to use it?", sb_note_yellow: "Yellow cells are for input. Don't overwrite the formulas.",
  sb_t1: "Timesheet", sb_t1_d: "Monthly attendance sheet: arrival, departure, break → hours worked and overtime. Weekends and holidays are marked, the monthly working-time fund is calculated.",
  sb_t2: "Leave tracker", sb_t2_d: "Per employee: entitlement, carried over, taken and remaining leave. Leave taken is counted in working days, skipping holidays.",
  sb_t3: "Monthly budget", sb_t3_d: "Income and expenses for 12 months by category, monthly balance and savings rate.",
  sb_t4: "Price quote", sb_t4_d: "Items with quantity, unit price and discount – net, VAT and total calculated automatically, with a validity date.",
  sb_t5: "Stock tracker", sb_t5_d: "Automatic stock levels from a log of receipts and issues; warns when an item drops below its minimum.",
  x_att: "Timesheet", x_date: "Date", x_day: "Day", x_in: "In", x_out: "Out", x_break: "Break (min)", x_worked: "Worked (h)", x_ot: "Overtime (h)", x_note: "Note",
  x_weekend: "Weekend", x_holiday: "Holiday", x_total: "Total", x_workdays: "Working days in month", x_fund: "Monthly working-time fund (h)", x_diff: "Difference from fund (h)", x_name: "Name:", x_daily: "Daily hours:",
  x_leave: "Leave", x_overview: "Overview", x_taken_log: "Leave taken", x_holidays: "Holidays", x_employee: "Employee", x_entitled: "Entitled (days)", x_carried: "Carried over (days)", x_taken: "Taken (days)", x_left: "Remaining (days)",
  x_from: "From", x_to: "To", x_workdays_short: "Working days", x_holiday_name: "Holiday", x_emp: "Employee",
  x_budget: "Budget", x_item: "Item", x_income: "INCOME", x_expenses: "EXPENSES", x_salary: "Salary", x_other_income: "Other income", x_housing: "Housing", x_energy: "Utilities", x_food: "Groceries", x_transport: "Transport",
  x_phone: "Phone, internet", x_health: "Health", x_fun: "Leisure", x_savings: "Savings", x_other: "Other", x_income_total: "Total income", x_expense_total: "Total expenses", x_balance: "Balance", x_save_rate: "Savings rate", x_year_total: "Year total", x_avg: "Monthly average",
  x_quote: "PRICE QUOTE", x_supplier: "Supplier:", x_customer: "Customer:", x_number: "Number:", x_issued: "Date:", x_valid: "Valid until:", x_desc: "Description", x_qty: "Quantity", x_unit: "Unit", x_price: "Unit price", x_disc: "Discount", x_net: "Net",
  x_net_total: "Net total", x_vat: "VAT", x_gross: "Total due", x_sample_item: "Consulting", x_hour: "h", x_pc: "pcs",
  x_stock: "Stock", x_moves: "Movements", x_code: "Code", x_product: "Item", x_min: "Minimum stock", x_in_qty: "Received", x_out_qty: "Issued", x_on_hand: "On hand", x_status: "Status", x_order: "⚠ Reorder", x_type: "Type",
  x_typ_in: "In", x_typ_out: "Out",
});

/* ======================================================
   KÖZÖS: xlsx utólagos formázása
   lapok: [{ stilusok: { "A1": "cim", ... }, lista: [{ sqref: "C2:C200", ertekek: ["a","b"] }], fagyaszt: 4 }]
   stílusok: cim, fejlec, felkover, osszeg, hetvege, bevitel
   ====================================================== */
const XF_STILUSOK = {
  cim: { font: 1 },
  felkover: { font: 0 },
  fejlec: { font: 0, fill: 0 },
  osszeg: { font: 0, fill: 1 },
  hetvege: { fill: 2 },
  bevitel: { fill: 3 },
};
function xlsxFormaz(bajtok, lapok) {
  const C = XLSX.CFB;
  const cfb = C.read(bajtok, { type: "array" });
  const olvas = (ut) => new TextDecoder().decode(C.find(cfb, "/" + ut).content);
  const ir = (ut, szoveg) => { C.find(cfb, "/" + ut).content = new TextEncoder().encode(szoveg); };
  let st = olvas("xl/styles.xml");
  const db = (tag) => +(st.match(new RegExp(`<${tag} count="(\\d+)"`)) || [, 0])[1];
  const font0 = db("fonts"), fill0 = db("fills");
  // új betűk: félkövér, nagy cím
  st = st.replace(/<fonts count="\d+">([\s\S]*?)<\/fonts>/, (m, b) => `<fonts count="${font0 + 2}">${b}<font><b/><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><b/><sz val="16"/><color rgb="FF1F2937"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>`);
  // új kitöltések: fejléc (szürke), összeg (halványzöld), hétvége (világosszürke), bevitel (halványsárga)
  const szinek = ["FFE5E7EB", "FFE8F5EC", "FFF1F2F4", "FFFFF8DB"];
  st = st.replace(/<fills count="\d+">([\s\S]*?)<\/fills>/, (m, b) => `<fills count="${fill0 + szinek.length}">${b}${szinek.map((c) => `<fill><patternFill patternType="solid"><fgColor rgb="${c}"/><bgColor indexed="64"/></patternFill></fill>`).join("")}</fills>`);
  // meglévő cellastílusok (a számformátum megtartásához)
  const xfBelso = st.match(/<cellXfs count="\d+">([\s\S]*?)<\/cellXfs>/)[1];
  const xfLista = xfBelso.match(/<xf [^>]*?(\/>|>[\s\S]*?<\/xf>)/g) || [];
  const ujXf = [], kesz = new Map();
  const xfKell = (nev, regiS) => {
    const kulcs = nev + ":" + regiS;
    if (kesz.has(kulcs)) return kesz.get(kulcs);
    const regi = xfLista[regiS] || xfLista[0];
    const numFmt = +(regi.match(/numFmtId="(\d+)"/) || [, 0])[1];
    const s = XF_STILUSOK[nev] || {};
    const font = s.font !== undefined ? font0 + s.font : 0, fill = s.fill !== undefined ? fill0 + s.fill : 0;
    const index = xfLista.length + ujXf.length;
    ujXf.push(`<xf numFmtId="${numFmt}" fontId="${font}" fillId="${fill}" borderId="0" xfId="0" applyNumberFormat="1"${s.font !== undefined ? ' applyFont="1"' : ""}${s.fill !== undefined ? ' applyFill="1"' : ""}/>`);
    kesz.set(kulcs, index);
    return index;
  };
  lapok.forEach((lap, i) => {
    if (!lap) return;
    const ut = `xl/worksheets/sheet${i + 1}.xml`;
    let x = olvas(ut);
    for (const [ref, nev] of Object.entries(lap.stilusok || {})) {
      const re = new RegExp(`<c r="${ref}"(?: s="(\\d+)")?`);
      const m = x.match(re);
      if (m) x = x.replace(re, `<c r="${ref}" s="${xfKell(nev, +(m[1] || 0))}"`);
      else {
        // üres cella: hozzáadjuk a sorhoz (csak a stílus kedvéért)
        const r = +ref.match(/\d+$/)[0];
        const cella = `<c r="${ref}" s="${xfKell(nev, 0)}"/>`;
        if (x.includes(`<row r="${r}"`)) {
          x = x.replace(new RegExp(`(<row r="${r}"[^>]*>)([\\s\\S]*?)(</row>)`), (mm, nyit, belso, zar) => {
            // a cellák oszlopsorrendben kellenek
            const cellak = belso.match(/<c [\s\S]*?(\/>|<\/c>)/g) || [];
            cellak.push(cella);
            const oszlop = (c) => KM.oszlopSzam(c.match(/r="([A-Z]+)/)[1]);
            cellak.sort((a, b) => oszlop(a) - oszlop(b));
            return nyit + cellak.join("") + zar;
          });
        } else {
          // új sor a megfelelő helyre
          const sorok = [...x.matchAll(/<row r="(\d+)"/g)].map((mm) => +mm[1]);
          const kov = sorok.find((n) => n > r);
          const uj = `<row r="${r}">${cella}</row>`;
          x = kov ? x.replace(`<row r="${kov}"`, uj + `<row r="${kov}"`) : x.replace("</sheetData>", uj + "</sheetData>");
        }
      }
    }
    // fagyasztott fejléc
    if (lap.fagyaszt) {
      const sor = lap.fagyaszt;
      x = x.replace(/<sheetView workbookViewId="0"\/>/, `<sheetView workbookViewId="0"><pane ySplit="${sor}" topLeftCell="A${sor + 1}" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A${sor + 1}" sqref="A${sor + 1}"/></sheetView>`);
    }
    // legördülő lista (adatérvényesítés)
    if (lap.lista && lap.lista.length) {
      const dv = `<dataValidations count="${lap.lista.length}">${lap.lista.map((l) => `<dataValidation type="list" allowBlank="1" showErrorMessage="1" sqref="${l.sqref}"><formula1>"${l.ertekek.map((e) => xmlVed(e)).join(",")}"</formula1></dataValidation>`).join("")}</dataValidations>`;
      x = /<\/mergeCells>/.test(x) ? x.replace("</mergeCells>", "</mergeCells>" + dv) : x.replace("</sheetData>", "</sheetData>" + dv);
    }
    ir(ut, x);
  });
  st = st.replace(/<cellXfs count="\d+">([\s\S]*?)<\/cellXfs>/, () => `<cellXfs count="${xfLista.length + ujXf.length}">${xfBelso}${ujXf.join("")}</cellXfs>`);
  ir("xl/styles.xml", st);
  const jelolo = cfb.FullPaths.findIndex((p) => /Sh33tJ5$/.test(p));
  if (jelolo >= 0) { cfb.FullPaths.splice(jelolo, 1); cfb.FileIndex.splice(jelolo, 1); }
  return new Uint8Array(C.write(cfb, { fileType: "zip", type: "array" }));
}

/* ---------- Képletek előre kiszámolása (hogy telefonon / előnézetben is látszódjon az érték) ---------- */
function sablonSzamol(lapok) {
  // lapok: [{ nev, aoa }] – az aoa cellái: érték vagy { f, z, ... }
  const index = (nev) => lapok.findIndex((l) => l.nev.toLowerCase() === String(nev).toLowerCase());
  const memo = new Map(), folyamatban = new Set();
  const cella = (li, r, c) => {
    const lap = lapok[typeof li === "number" ? li : index(li)];
    if (!lap) return KM.HIBA("#REF!");
    const x = (lap.aoa[r] || [])[c];
    if (x === undefined || x === null || x === "") return null;
    if (typeof x !== "object" || x instanceof Date) return x;
    if (!x.f) return x.v ?? null;
    const k = `${li}:${r},${c}`;
    if (memo.has(k)) return memo.get(k);
    if (folyamatban.has(k)) return KM.HIBA("#REF!");
    folyamatban.add(k);
    let v = KM.kiertekel(KM.keplet(x.f, false), ctx(typeof li === "number" ? li : index(li)));
    if (KM.tartomanyE(v)) v = cella(v.lap, v.r1, v.c1);
    folyamatban.delete(k);
    memo.set(k, v);
    return v;
  };
  const ctx = (li) => ({
    lap: li, cella,
    hatar: (l) => { const x = lapok[typeof l === "number" ? l : index(l)]; return { sorok: x ? x.aoa.length : 0, oszlopok: 30 }; },
    lapLetezik: (n) => index(n) >= 0,
  });
  lapok.forEach((lap, li) => lap.aoa.forEach((sor, r) => sor.forEach((x, c) => {
    if (x && typeof x === "object" && !(x instanceof Date) && x.f) {
      const v = cella(li, r, c);
      if (KM.hibaE(v)) { x.t = "e"; x.v = { "#DIV/0!": 7, "#VALUE!": 15, "#REF!": 23, "#NAME?": 29, "#NUM!": 36, "#N/A": 42 }[v.hiba] ?? 42; }
      else if (typeof v === "number") { x.t = "n"; x.v = v; }
      else if (typeof v === "boolean") { x.t = "b"; x.v = v; }
      else { x.t = "s"; x.v = v ?? ""; }
    }
  })));
}

/* ---------- Segédek ---------- */
const sbRef = (r, c) => KM.oszlopBetuje(c) + (r + 1);
const sbLapRef = (nev) => "'" + nev.replace(/'/g, "''") + "'";
const sbDatum = (y, m, d) => KM.datumbol(y, m, d);
const SB_DATUM_FORMA = { hu: "yyyy.mm.dd.", sk: "d.m.yyyy", en: "dd/mm/yyyy" };
const sbHonapNevek = () => Array.from({ length: 12 }, (_, i) => new Date(2026, i, 1).toLocaleDateString(locale(), { month: "long" }));
const sbNapNev = (y, m, d) => new Date(y, m - 1, d).toLocaleDateString(locale(), { weekday: "long" });
const sbPenz = () => ($("sb-penznem") ? $("sb-penznem").value : "EUR");
const SB_PENZ_FORMA = { EUR: '#,##0.00 "€"', HUF: '#,##0 "Ft"', CZK: '#,##0.00 "Kč"', USD: '"$"#,##0.00' };

async function sbLetolt(fajlNev, lapok, formazas) {
  await sheetjsBetolt();
  sablonSzamol(lapok);
  const wb = XLSX.utils.book_new();
  for (const lap of lapok) {
    const ws = XLSX.utils.aoa_to_sheet(lap.aoa.map((sor) => sor.map((x) => (x === undefined ? null : x))));
    if (lap.cols) ws["!cols"] = lap.cols.map((w) => ({ wch: w }));
    if (lap.merges) ws["!merges"] = lap.merges.map((m) => XLSX.utils.decode_range(m));
    XLSX.utils.book_append_sheet(wb, ws, lap.nev.slice(0, 31));
  }
  let bajtok = new Uint8Array(XLSX.write(wb, { type: "array", bookType: "xlsx" }));
  try { bajtok = xlsxFormaz(bajtok, formazas); } catch (e) { console.error(e); }
  // ékezet nélküli fájlnév – minden böngészőben és rendszerben biztosan jó
  mentes(bajtok, ekezetTelen(fajlNev).replace(/[^A-Za-z0-9._-]+/g, "_") + ".xlsx");
  esemenyKuld("masol", "Sablon " + fajlNev);
}

/* ======================================================
   1. DOCHÁDZKA / MUNKAIDŐ-NYILVÁNTARTÁS
   ====================================================== */
function sbJelenlet({ ev, honap, orszag, nev, ora }) {
  const aoa = [], st = {};
  const ns = t("x_att");
  const unnep = orszag ? unnepnapok(orszag, ev) : {};
  const napok = new Date(ev, honap, 0).getDate();
  aoa.push([`${t("sb_t1")} – ${sbHonapNevek()[honap - 1]} ${ev}`]); st.A1 = "cim";
  aoa.push([t("x_name"), nev || "", null, t("x_daily"), ora]);
  st.A2 = st.D2 = "felkover"; st.B2 = st.E2 = "bevitel";
  aoa.push([]);
  const fej = [t("x_date"), t("x_day"), t("x_in"), t("x_out"), t("x_break"), t("x_worked"), t("x_ot"), t("x_note")];
  aoa.push(fej); fej.forEach((_, c) => (st[sbRef(3, c)] = "fejlec"));
  const elso = aoa.length;
  let munkanap = 0;
  for (let d = 1; d <= napok; d++) {
    const r = aoa.length, sor = r + 1;
    const datum = new Date(ev, honap - 1, d);
    const hetvege = datum.getDay() === 0 || datum.getDay() === 6;
    const u = unnep[datumKulcs(datum)];
    const szabad = hetvege || !!u;
    if (!szabad) munkanap++;
    aoa.push([
      { t: "n", v: sbDatum(ev, honap, d), z: SB_DATUM_FORMA[nyelv] },
      sbNapNev(ev, honap, d),
      { t: "z", z: "hh:mm" }, { t: "z", z: "hh:mm" },
      szabad ? null : 30,
      { f: `IF(AND(C${sor}<>"",D${sor}<>""),ROUND((D${sor}-C${sor})*24-E${sor}/60,2),0)`, z: "0.00" },
      { f: `IF(F${sor}>0,MAX(0,ROUND(F${sor}-$E$2,2)),0)`, z: "0.00" },
      u ? `${t("x_holiday")}: ${typeof u === "object" ? u[nyelv] || u.hu : u}` : hetvege ? t("x_weekend") : "",
    ]);
    for (let c = 0; c < 8; c++) st[sbRef(r, c)] = szabad ? "hetvege" : c >= 2 && c <= 4 ? "bevitel" : st[sbRef(r, c)];
    if (!szabad) { delete st[sbRef(r, 0)]; delete st[sbRef(r, 1)]; delete st[sbRef(r, 5)]; delete st[sbRef(r, 6)]; delete st[sbRef(r, 7)]; }
  }
  const utolso = aoa.length; // 1-től számozott utolsó adatsor = utolso
  const osszR = aoa.length;
  aoa.push([t("x_total"), null, null, null, { f: `SUM(E${elso + 1}:E${utolso})` }, { f: `SUM(F${elso + 1}:F${utolso})`, z: "0.00" }, { f: `SUM(G${elso + 1}:G${utolso})`, z: "0.00" }]);
  for (let c = 0; c < 8; c++) st[sbRef(osszR, c)] = "osszeg";
  aoa.push([]);
  const r1 = aoa.length;
  aoa.push([t("x_workdays"), null, null, null, null, munkanap]);
  aoa.push([t("x_fund"), null, null, null, null, { f: `F${r1 + 1}*$E$2`, z: "0.00" }]);
  aoa.push([t("x_diff"), null, null, null, null, { f: `F${osszR + 1}-F${r1 + 2}`, z: "+0.00;-0.00;0" }]);
  for (let i = 0; i < 3; i++) { st[sbRef(r1 + i, 0)] = "felkover"; st[sbRef(r1 + i, 5)] = "felkover"; }
  return { lapok: [{ nev: ns, aoa, cols: [13, 13, 10, 18, 15, 16, 13, 28] }], formazas: [{ stilusok: st, fagyaszt: 4 }] };
}

/* ======================================================
   2. DOVOLENKA / SZABADSÁG
   ====================================================== */
function sbSzabadsag({ ev, orszag }) {
  const lapA = t("x_overview"), lapB = t("x_taken_log"), lapC = t("x_holidays");
  const stA = {}, stB = {}, stC = {};
  // Ünnepnapok
  const unnep = orszag ? unnepnapok(orszag, ev) : {};
  const c = [[t("x_date"), t("x_holiday_name")]];
  Object.entries(unnep).sort().forEach(([k, n]) => { const [y, m, d] = k.split("-").map(Number); c.push([{ t: "n", v: sbDatum(y, m, d), z: SB_DATUM_FORMA[nyelv] }, typeof n === "object" ? n[nyelv] || n.hu : n]); });
  stC.A1 = stC.B1 = "fejlec";
  const unnepVeg = Math.max(2, c.length);
  // Kivett szabadság napló
  const b = [[t("x_emp"), t("x_from"), t("x_to"), t("x_workdays_short"), t("x_note")]];
  for (let i = 0; i < 5; i++) stB[sbRef(0, i)] = "fejlec";
  const nevek = [1, 2, 3, 4, 5].map((n) => `${t("x_employee")} ${n}`);
  for (let r = 1; r <= 60; r++) {
    const s = r + 1;
    const minta = r === 1 ? [nevek[0], sbDatum(ev, 7, 6), sbDatum(ev, 7, 17)] : [null, null, null];
    b.push([minta[0], minta[1] ? { t: "n", v: minta[1], z: SB_DATUM_FORMA[nyelv] } : { t: "z", z: SB_DATUM_FORMA[nyelv] }, minta[2] ? { t: "n", v: minta[2], z: SB_DATUM_FORMA[nyelv] } : { t: "z", z: SB_DATUM_FORMA[nyelv] },
      { f: `IF(AND(B${s}<>"",C${s}<>""),NETWORKDAYS(B${s},C${s},${sbLapRef(lapC)}!$A$2:$A$${unnepVeg}),"")` }, null]);
    stB[sbRef(r, 0)] = stB[sbRef(r, 1)] = stB[sbRef(r, 2)] = stB[sbRef(r, 4)] = "bevitel";
  }
  // Áttekintés
  const a = [[`${t("sb_t2")} ${ev}`], [], [t("x_employee"), t("x_entitled"), t("x_carried"), t("x_taken"), t("x_left")]];
  stA.A1 = "cim";
  for (let i = 0; i < 5; i++) stA[sbRef(2, i)] = "fejlec";
  nevek.forEach((n, i) => {
    const s = i + 4;
    a.push([n, 20, 0, { f: `SUMIF(${sbLapRef(lapB)}!$A$2:$A$61,A${s},${sbLapRef(lapB)}!$D$2:$D$61)` }, { f: `B${s}+C${s}-D${s}` }]);
    stA[sbRef(i + 3, 0)] = stA[sbRef(i + 3, 1)] = stA[sbRef(i + 3, 2)] = "bevitel";
    stA[sbRef(i + 3, 4)] = "felkover";
  });
  a.push([t("x_total"), { f: "SUM(B4:B8)" }, { f: "SUM(C4:C8)" }, { f: "SUM(D4:D8)" }, { f: "SUM(E4:E8)" }]);
  for (let i = 0; i < 5; i++) stA[sbRef(8, i)] = "osszeg";
  a.push([], [t("sb_note_yellow")]);
  return {
    lapok: [{ nev: lapA, aoa: a, cols: [24, 14, 16, 14, 16] }, { nev: lapB, aoa: b, cols: [22, 13, 13, 14, 30] }, { nev: lapC, aoa: c, cols: [13, 34] }],
    formazas: [{ stilusok: stA, fagyaszt: 3 }, { stilusok: stB, fagyaszt: 1, lista: [{ sqref: "A2:A61", ertekek: nevek }] }, { stilusok: stC, fagyaszt: 1 }],
  };
}

/* ======================================================
   3. ROZPOČET / KÖLTSÉGVETÉS
   ====================================================== */
function sbKoltsegvetes({ ev }) {
  const aoa = [], st = {};
  const forma = SB_PENZ_FORMA[sbPenz()] || SB_PENZ_FORMA.EUR;
  const honapok = sbHonapNevek();
  aoa.push([`${t("sb_t3")} ${ev}`]); st.A1 = "cim";
  aoa.push([]);
  const fej = [t("x_item"), ...honapok, t("x_year_total"), t("x_avg")];
  aoa.push(fej); fej.forEach((_, c) => (st[sbRef(2, c)] = "fejlec"));
  const sorKeszit = (cim, bevitel) => {
    const r = aoa.length, s = r + 1;
    const sor = [cim];
    for (let m = 1; m <= 12; m++) sor.push({ t: "n", v: 0, z: forma });
    sor.push({ f: `SUM(B${s}:M${s})`, z: forma }, { f: `AVERAGE(B${s}:M${s})`, z: forma });
    aoa.push(sor);
    if (bevitel) for (let c = 1; c <= 12; c++) st[sbRef(r, c)] = "bevitel";
    return s;
  };
  const csoport = (cim) => { st[sbRef(aoa.length, 0)] = "felkover"; aoa.push([cim]); };
  csoport(t("x_income"));
  const b1 = sbKoltsegSor(sorKeszit, ["x_salary", "x_other_income"]);
  const osszegSor = (cim, tol, ig) => {
    const r = aoa.length, s = r + 1;
    const sor = [cim];
    for (let c = 1; c <= 14; c++) { const o = KM.oszlopBetuje(c); sor.push({ f: c <= 12 ? `SUM(${o}${tol}:${o}${ig})` : c === 13 ? `SUM(B${s}:M${s})` : `AVERAGE(B${s}:M${s})`, z: forma }); }
    aoa.push(sor);
    for (let c = 0; c <= 14; c++) st[sbRef(r, c)] = "osszeg";
    return s;
  };
  const bevOssz = osszegSor(t("x_income_total"), b1[0], b1[1]);
  aoa.push([]);
  csoport(t("x_expenses"));
  const k1 = sbKoltsegSor(sorKeszit, ["x_housing", "x_energy", "x_food", "x_transport", "x_phone", "x_health", "x_fun", "x_savings", "x_other"]);
  const kiOssz = osszegSor(t("x_expense_total"), k1[0], k1[1]);
  aoa.push([]);
  const r = aoa.length, s = r + 1;
  const egyenleg = [t("x_balance")], arany = [t("x_save_rate")];
  for (let c = 1; c <= 14; c++) {
    const o = KM.oszlopBetuje(c);
    egyenleg.push({ f: `${o}${bevOssz}-${o}${kiOssz}`, z: forma });
    arany.push({ f: `IF(${o}${bevOssz}>0,(${o}${bevOssz}-${o}${kiOssz}+${o}${k1[0] + 7})/${o}${bevOssz},0)`, z: "0%" });
  }
  aoa.push(egyenleg, arany);
  for (let c = 0; c <= 14; c++) { st[sbRef(r, c)] = "osszeg"; st[sbRef(r + 1, c)] = "felkover"; }
  aoa.push([], [t("sb_note_yellow")]);
  return { lapok: [{ nev: t("x_budget"), aoa, cols: [22, ...Array(12).fill(11), 14, 14] }], formazas: [{ stilusok: st, fagyaszt: 3 }] };
}
function sbKoltsegSor(sorKeszit, kulcsok) {
  const sorok = kulcsok.map((k) => sorKeszit(t(k), true));
  return [sorok[0], sorok[sorok.length - 1]];
}

/* ======================================================
   4. CENOVÁ PONUKA / ÁRAJÁNLAT
   ====================================================== */
function sbArajanlat({ afa }) {
  const aoa = [], st = {};
  const forma = SB_PENZ_FORMA[sbPenz()] || SB_PENZ_FORMA.EUR;
  const df = SB_DATUM_FORMA[nyelv];
  const ma = new Date();
  aoa.push([t("x_quote")]); st.A1 = "cim";
  aoa.push([]);
  aoa.push([t("x_supplier"), ""], [t("x_customer"), ""], [t("x_number"), `${new Date().getFullYear()}-001`],
    [t("x_issued"), { t: "n", v: sbDatum(ma.getFullYear(), ma.getMonth() + 1, ma.getDate()), z: df }],
    [t("x_valid"), { f: "B6+14", z: df }]);
  for (let r = 2; r <= 6; r++) { st[sbRef(r, 0)] = "felkover"; if (r !== 6) st[sbRef(r, 1)] = "bevitel"; }
  aoa.push([]);
  const fej = ["#", t("x_desc"), t("x_qty"), t("x_unit"), t("x_price"), t("x_disc"), t("x_net")];
  aoa.push(fej); fej.forEach((_, c) => (st[sbRef(8, c)] = "fejlec"));
  for (let i = 1; i <= 10; i++) {
    const r = aoa.length, s = r + 1;
    const minta = i === 1;
    aoa.push([i, minta ? t("x_sample_item") : null, minta ? 2 : null, minta ? t("x_hour") : null, minta ? { t: "n", v: 50, z: forma } : { t: "z", z: forma },
      { t: "n", v: 0, z: "0%" }, { f: `ROUND(C${s}*E${s}*(1-F${s}),2)`, z: forma }]);
    for (let c = 1; c <= 5; c++) st[sbRef(r, c)] = "bevitel";
  }
  const vegso = aoa.length; // utolsó tételsor (1-től)
  aoa.push([]);
  const r = aoa.length, s = r + 1;
  aoa.push([null, null, null, null, null, t("x_net_total"), { f: `SUM(G10:G${vegso})`, z: forma }]);
  aoa.push([null, null, null, null, t("x_vat"), { t: "n", v: afa / 100, z: "0%" }, { f: `ROUND(G${s}*F${s + 1},2)`, z: forma }]);
  aoa.push([null, null, null, null, null, t("x_gross"), { f: `G${s}+G${s + 1}`, z: forma }]);
  st[sbRef(r, 5)] = st[sbRef(r, 6)] = "felkover";
  st[sbRef(r + 1, 4)] = st[sbRef(r + 1, 6)] = "felkover"; st[sbRef(r + 1, 5)] = "bevitel";
  st[sbRef(r + 2, 5)] = st[sbRef(r + 2, 6)] = "osszeg";
  aoa.push([], [t("sb_note_yellow")]);
  return { lapok: [{ nev: t("x_quote").charAt(0) + t("x_quote").slice(1).toLowerCase(), aoa, cols: [15, 34, 11, 10, 13, 18, 16] }], formazas: [{ stilusok: st }] };
}

/* ======================================================
   5. SKLAD / RAKTÁR
   ====================================================== */
function sbRaktar() {
  const lapA = t("x_stock"), lapB = t("x_moves");
  const stA = {}, stB = {};
  const be = t("x_typ_in"), ki = t("x_typ_out");
  const df = SB_DATUM_FORMA[nyelv];
  const termekek = [["P-001", { hu: "Papír A4", sk: "Papier A4", en: "A4 paper" }[nyelv], t("x_pc"), 20], ["P-002", "Toner", t("x_pc"), 3], ["P-003", "USB 64 GB", t("x_pc"), 5], ["P-004", "", "", 0], ["P-005", "", "", 0]];
  const a = [[t("x_code"), t("x_product"), t("x_unit"), t("x_min"), t("x_in_qty"), t("x_out_qty"), t("x_on_hand"), t("x_status")]];
  for (let c = 0; c < 8; c++) stA[sbRef(0, c)] = "fejlec";
  const L = sbLapRef(lapB);
  termekek.forEach(([kod, nev, egys, min], i) => {
    const s = i + 2;
    a.push([kod, nev, egys, min,
      { f: `SUMIFS(${L}!$D$2:$D$500,${L}!$B$2:$B$500,A${s},${L}!$C$2:$C$500,"${be}")` },
      { f: `SUMIFS(${L}!$D$2:$D$500,${L}!$B$2:$B$500,A${s},${L}!$C$2:$C$500,"${ki}")` },
      { f: `E${s}-F${s}` },
      { f: `IF(A${s}="","",IF(G${s}<D${s},"${t("x_order")}","OK"))` }]);
    for (let c = 0; c <= 3; c++) stA[sbRef(i + 1, c)] = "bevitel";
    stA[sbRef(i + 1, 6)] = "felkover";
  });
  const ma = new Date();
  const d0 = sbDatum(ma.getFullYear(), ma.getMonth() + 1, 1);
  const minta = [[d0, "P-001", be, 50], [d0 + 2, "P-002", be, 5], [d0 + 3, "P-001", ki, 35], [d0 + 5, "P-002", ki, 3], [d0 + 6, "P-003", be, 4]];
  const b = [[t("x_date"), t("x_code"), t("x_type"), t("x_qty"), t("x_note")]];
  for (let c = 0; c < 5; c++) stB[sbRef(0, c)] = "fejlec";
  for (let r = 1; r <= 499; r++) {
    const m = minta[r - 1];
    b.push(m ? [{ t: "n", v: m[0], z: df }, m[1], m[2], m[3]] : [{ t: "z", z: df }]);
    if (r <= 60) for (let c = 0; c < 5; c++) stB[sbRef(r, c)] = "bevitel";
  }
  return {
    lapok: [{ nev: lapA, aoa: a, cols: [10, 26, 9, 15, 13, 11, 10, 18] }, { nev: lapB, aoa: b, cols: [13, 10, 11, 11, 30] }],
    formazas: [{ stilusok: stA, fagyaszt: 1 }, { stilusok: stB, fagyaszt: 1, lista: [{ sqref: "C2:C500", ertekek: [be, ki] }, { sqref: "B2:B500", ertekek: termekek.map((x) => x[0]) }] }],
  };
}

/* ======================================================
   OLDAL
   ====================================================== */
const SABLONOK = [
  { id: "jelenlet", ikon: "🕘", cim: "sb_t1", leiras: "sb_t1_d", mezok: ["honap", "ev", "orszag", "nev", "ora"], keszit: sbJelenlet, fajl: () => `${t("x_att")}_${$("sb-ev-jelenlet").value}-${String($("sb-honap-jelenlet").value).padStart(2, "0")}` },
  { id: "szabadsag", ikon: "🏖️", cim: "sb_t2", leiras: "sb_t2_d", mezok: ["ev", "orszag"], keszit: sbSzabadsag, fajl: () => `${t("x_leave")}_${$("sb-ev-szabadsag").value}` },
  { id: "koltseg", ikon: "💰", cim: "sb_t3", leiras: "sb_t3_d", mezok: ["ev", "penz"], keszit: sbKoltsegvetes, fajl: () => `${t("x_budget")}_${$("sb-ev-koltseg").value}` },
  { id: "ajanlat", ikon: "🧾", cim: "sb_t4", leiras: "sb_t4_d", mezok: ["afa", "penz"], keszit: sbArajanlat, fajl: () => t("sb_t4") },
  { id: "raktar", ikon: "📦", cim: "sb_t5", leiras: "sb_t5_d", mezok: [], keszit: sbRaktar, fajl: () => t("sb_t5") },
];

function sbRajzol() {
  const doboz = $("sb-lista");
  doboz.innerHTML = "";
  const ev = new Date().getFullYear(), honap = new Date().getMonth() + 1;
  for (const s of SABLONOK) {
    const k = document.createElement("article");
    k.className = "kartya sablon";
    k.innerHTML = `<div class="sablon-fej"><span class="sablon-ikon"></span><div><h2></h2><p class="halvany-szoveg"></p></div></div><div class="sablon-mezok"></div><button type="button" class="gomb fo"></button>`;
    k.querySelector(".sablon-ikon").textContent = s.ikon;
    k.querySelector("h2").textContent = t(s.cim);
    k.querySelector("p").textContent = t(s.leiras);
    const mezok = k.querySelector(".sablon-mezok");
    const mezo = (cimke, el) => { const l = document.createElement("label"); l.className = "mezo"; l.innerHTML = "<span></span>"; l.firstChild.textContent = cimke; l.appendChild(el); mezok.appendChild(l); return el; };
    const sel = (id, opciok, ertek) => { const x = document.createElement("select"); x.id = id; opciok.forEach(([v, n]) => x.add(new Option(n, v))); x.value = String(ertek); return x; };
    for (const m of s.mezok) {
      if (m === "honap") mezo(t("sb_month"), sel("sb-honap-" + s.id, sbHonapNevek().map((n, i) => [i + 1, n]), honap));
      if (m === "ev") mezo(t("sb_year"), sel("sb-ev-" + s.id, [ev - 1, ev, ev + 1].map((y) => [y, y]), ev));
      if (m === "orszag") mezo(t("sb_country"), sel("sb-orszag-" + s.id, [["sk", t("sb_country_sk")], ["hu", t("sb_country_hu")], ["", "—"]], nyelv === "hu" ? "hu" : "sk"));
      if (m === "nev") mezo(t("sb_name"), Object.assign(document.createElement("input"), { id: "sb-nev-" + s.id, type: "text" }));
      if (m === "ora") mezo(t("sb_hours"), Object.assign(document.createElement("input"), { id: "sb-ora-" + s.id, type: "number", value: 8, min: 1, max: 24, step: 0.5 }));
      if (m === "afa") mezo(t("sb_vat"), Object.assign(document.createElement("input"), { id: "sb-afa-" + s.id, type: "number", value: nyelv === "hu" ? 27 : 23, min: 0, max: 50 }));
      if (m === "penz") { const x = mezo(t("sb_currency"), sel("sb-penz-" + s.id, [["EUR", "€ EUR"], ["HUF", "Ft HUF"], ["CZK", "Kč CZK"], ["USD", "$ USD"]], nyelv === "hu" ? "HUF" : "EUR")); x.classList.add("sb-penz"); }
    }
    const gomb = k.querySelector("button");
    gomb.textContent = "⬇ " + t("sb_download");
    gomb.addEventListener("click", async () => {
      const v = (m) => $(`sb-${m}-${s.id}`)?.value;
      // a pénznem-választót a közös sbPenz() olvassa
      document.querySelectorAll(".sb-penz").forEach((x) => x.removeAttribute("id"));
      const penz = k.querySelector(".sb-penz");
      if (penz) penz.id = "sb-penznem";
      const { lapok, formazas } = s.keszit({ ev: +(v("ev") || ev), honap: +(v("honap") || honap), orszag: v("orszag") ?? "sk", nev: v("nev") || "", ora: +(v("ora") || 8), afa: +(v("afa") || 23) });
      try { await sbLetolt(s.fajl(), lapok, formazas); } catch (e) { console.error(e); ertesit(t("preview_failed"), true); }
      if (penz) { penz.removeAttribute("id"); penz.id = "sb-penz-" + s.id; }
    });
    doboz.appendChild(k);
  }
}
forditasHookok.push(sbRajzol);
oldalHookok.sablonok = sbRajzol;
sbRajzol();
