/*
  EXCEL-ELEMZŐ ÉS GRAFIKONKÉSZÍTŐ (teljesen a böngészőben)
  - Fájl gépről vagy a Fájljaimból → munkalap → automatikus áttekintés (oszloponként típus, kitöltöttség, összeg, átlag…)
  - Grafikon: oszlop, sáv, vonal, kör/fánk – csoportosítás összeggel, darabbal, átlaggal; dátumnál napra/hónapra/évre
  - Automatikus megállapítások (legnagyobb, első 3 aránya, trend)
  - Letöltés: grafikon PNG / SVG képként, eredmény Excelben
  A diagramSvg() függvényt az Admin oldal is használja.
*/

Object.assign(SZOVEGEK.hu, {
  ez_xl_chart: "Grafikon", ez_xl_all: "Összes adat", ez_xl_file: "kimutatas", ez_close: "Fájl bezárása",
  ez_sub: "Tölts be egy Excel fájlt, és azonnal kapsz áttekintést, összesítést és grafikonokat. Az adat nem hagyja el a gépedet.",
  ez_pick: "Fájl megnyitása", ez_stored: "…vagy a Fájljaimból:", ez_sheet: "Munkalap", ez_header: "Az első sor fejléc", ez_empty: "Válassz egy Excel vagy CSV fájlt a kezdéshez.",
  ez_rows: "sor", ez_cols: "oszlop", ez_filled: "kitöltöttség", ez_numcols: "számoszlop", ez_overview: "📋 Oszlopok áttekintése",
  ez_col: "Oszlop", ez_type: "Típus", ez_unique: "Egyedi", ez_sum: "Összeg", ez_avg: "Átlag", ez_min: "Min", ez_max: "Max",
  ez_t_num: "szám", ez_t_date: "dátum", ez_t_text: "szöveg", ez_t_empty: "üres", ez_t_bool: "logikai",
  ez_chart: "📊 Grafikon", ez_ctype: "Típus", ez_bar: "Oszlop", ez_hbar: "Sáv", ez_line: "Vonal", ez_pie: "Kör", ez_donut: "Fánk",
  ez_cat: "Csoportosítás (vízszintes tengely)", ez_val: "Érték", ez_agg: "Összesítés", ez_count_rows: "(sorok száma)",
  ez_dategroup: "Dátum szerint", ez_g_day: "nap", ez_g_month: "hónap", ez_g_year: "év", ez_sort: "Rendezés", ez_sort_val: "érték szerint", ez_sort_name: "név / idő szerint",
  ez_top: "Megjelenítés", ez_top_n: "első {n}", ez_all: "mind", ez_png: "Kép (PNG)", ez_svg: "SVG", ez_xlsx: "Eredmény Excelben", ez_insights: "💡 Megállapítások",
  ez_i_max: "A legnagyobb: {k} ({v}).", ez_i_min: "A legkisebb: {k} ({v}).", ez_i_top3: "Az első 3 adja az összes {p}%-át.", ez_i_share: "{k} egymaga az összes {p}%-a.",
  ez_i_trend_up: "Az utolsó időszak {p}%-kal több, mint az előző.", ez_i_trend_down: "Az utolsó időszak {p}%-kal kevesebb, mint az előző.", ez_i_groups: "{n} csoport, összesen {v}.",
  ez_other: "Egyéb", ez_too_big: "A fájl nagy: az első {n} sort elemzem.",
});
Object.assign(SZOVEGEK.sk, {
  ez_xl_chart: "Graf", ez_xl_all: "Všetky údaje", ez_xl_file: "suhrn", ez_close: "Zavrieť súbor",
  ez_sub: "Načítaj súbor Excel a hneď dostaneš prehľad, súhrny a grafy. Údaje neopustia tvoj počítač.",
  ez_pick: "Otvoriť súbor", ez_stored: "…alebo z Mojich súborov:", ez_sheet: "Hárok", ez_header: "Prvý riadok je hlavička", ez_empty: "Na začiatok vyber súbor Excel alebo CSV.",
  ez_rows: "riadkov", ez_cols: "stĺpcov", ez_filled: "vyplnenosť", ez_numcols: "číselné stĺpce", ez_overview: "📋 Prehľad stĺpcov",
  ez_col: "Stĺpec", ez_type: "Typ", ez_unique: "Jedinečné", ez_sum: "Súčet", ez_avg: "Priemer", ez_min: "Min", ez_max: "Max",
  ez_t_num: "číslo", ez_t_date: "dátum", ez_t_text: "text", ez_t_empty: "prázdny", ez_t_bool: "logická",
  ez_chart: "📊 Graf", ez_ctype: "Typ", ez_bar: "Stĺpcový", ez_hbar: "Pruhový", ez_line: "Čiarový", ez_pie: "Koláčový", ez_donut: "Prstencový",
  ez_cat: "Zoskupenie (vodorovná os)", ez_val: "Hodnota", ez_agg: "Súhrn", ez_count_rows: "(počet riadkov)",
  ez_dategroup: "Podľa dátumu", ez_g_day: "deň", ez_g_month: "mesiac", ez_g_year: "rok", ez_sort: "Zoradenie", ez_sort_val: "podľa hodnoty", ez_sort_name: "podľa názvu / času",
  ez_top: "Zobraziť", ez_top_n: "prvých {n}", ez_all: "všetko", ez_png: "Obrázok (PNG)", ez_svg: "SVG", ez_xlsx: "Výsledok v Exceli", ez_insights: "💡 Zistenia",
  ez_i_max: "Najväčšie: {k} ({v}).", ez_i_min: "Najmenšie: {k} ({v}).", ez_i_top3: "Prvé 3 tvoria {p}% celku.", ez_i_share: "{k} sám tvorí {p}% celku.",
  ez_i_trend_up: "Posledné obdobie je o {p}% viac ako predchádzajúce.", ez_i_trend_down: "Posledné obdobie je o {p}% menej ako predchádzajúce.", ez_i_groups: "{n} skupín, spolu {v}.",
  ez_other: "Ostatné", ez_too_big: "Súbor je veľký: analyzujem prvých {n} riadkov.",
});
Object.assign(SZOVEGEK.en, {
  ez_xl_chart: "Chart", ez_xl_all: "All data", ez_xl_file: "summary", ez_close: "Close file",
  ez_sub: "Load an Excel file and instantly get an overview, summaries and charts. Your data never leaves your computer.",
  ez_pick: "Open a file", ez_stored: "…or from My files:", ez_sheet: "Sheet", ez_header: "First row is a header", ez_empty: "Pick an Excel or CSV file to start.",
  ez_rows: "rows", ez_cols: "columns", ez_filled: "filled", ez_numcols: "numeric columns", ez_overview: "📋 Column overview",
  ez_col: "Column", ez_type: "Type", ez_unique: "Unique", ez_sum: "Sum", ez_avg: "Average", ez_min: "Min", ez_max: "Max",
  ez_t_num: "number", ez_t_date: "date", ez_t_text: "text", ez_t_empty: "empty", ez_t_bool: "boolean",
  ez_chart: "📊 Chart", ez_ctype: "Type", ez_bar: "Column", ez_hbar: "Bar", ez_line: "Line", ez_pie: "Pie", ez_donut: "Donut",
  ez_cat: "Group by (horizontal axis)", ez_val: "Value", ez_agg: "Aggregate", ez_count_rows: "(row count)",
  ez_dategroup: "By date", ez_g_day: "day", ez_g_month: "month", ez_g_year: "year", ez_sort: "Sort", ez_sort_val: "by value", ez_sort_name: "by name / time",
  ez_top: "Show", ez_top_n: "top {n}", ez_all: "all", ez_png: "Image (PNG)", ez_svg: "SVG", ez_xlsx: "Result in Excel", ez_insights: "💡 Insights",
  ez_i_max: "Largest: {k} ({v}).", ez_i_min: "Smallest: {k} ({v}).", ez_i_top3: "The top 3 make up {p}% of the total.", ez_i_share: "{k} alone is {p}% of the total.",
  ez_i_trend_up: "The last period is {p}% higher than the one before.", ez_i_trend_down: "The last period is {p}% lower than the one before.", ez_i_groups: "{n} groups, {v} in total.",
  ez_other: "Other", ez_too_big: "Large file: analysing the first {n} rows.",
});

/* ======================================================
   SVG DIAGRAMOK (közös: Elemző és Admin)
   ====================================================== */
function diagramSzinek() {
  const st = getComputedStyle(document.documentElement);
  const fo = st.getPropertyValue("--fo").trim() || "#107c41";
  const szoveg = st.getPropertyValue("--szoveg").trim() || "#1f2937";
  const halvany = st.getPropertyValue("--halvany").trim() || "#6b7280";
  const vonal = st.getPropertyValue("--mezo-keret").trim() || "#e5e7eb";
  const paletta = [fo, "#2563eb", "#f59e0b", "#db2777", "#7c3aed", "#0891b2", "#dc2626", "#65a30d", "#ea580c", "#475569"];
  return { fo, szoveg, halvany, vonal, paletta };
}
const dEsc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const dRovid = (s, n = 14) => (String(s).length > n ? String(s).slice(0, n - 1) + "…" : String(s));
function dSzam(v) {
  const a = Math.abs(v);
  if (a >= 1e9) return (v / 1e9).toLocaleString(locale(), { maximumFractionDigits: 2 }) + " Mrd";
  if (a >= 1e6) return (v / 1e6).toLocaleString(locale(), { maximumFractionDigits: 2 }) + " M";
  if (a >= 1e4) return (v / 1e3).toLocaleString(locale(), { maximumFractionDigits: 1 }) + " e";
  return v.toLocaleString(locale(), { maximumFractionDigits: a < 10 ? 2 : 0 });
}
function dSkala(max, min = 0) {
  const tart = max - min || 1;
  const lepes0 = Math.pow(10, Math.floor(Math.log10(tart / 5)));
  const lepes = [1, 2, 2.5, 5, 10].map((m) => m * lepes0).find((l) => tart / l <= 6) || lepes0 * 10;
  const also = Math.floor(min / lepes) * lepes, felso = Math.ceil(max / lepes) * lepes || lepes;
  const jelek = [];
  for (let v = also; v <= felso + lepes / 2; v += lepes) jelek.push(+v.toPrecision(12));
  return { also, felso, jelek };
}

// tipus: oszlop | sav | vonal | kor | fank;  cimkek: [], ertekek: []
function diagramSvg(tipus, cimkek, ertekek, { szelesseg = 760, magassag = 380, cim = "" } = {}) {
  const sz = diagramSzinek();
  const W = szelesseg, H = magassag;
  const ki = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" style="max-width:${W}px" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="12">`];
  if (cim) ki.push(`<text x="${W / 2}" y="22" text-anchor="middle" font-size="15" font-weight="700" fill="${sz.szoveg}">${dEsc(cim)}</text>`);
  const fent = cim ? 40 : 16;
  if (!ertekek.length) { ki.push("</svg>"); return ki.join(""); }

  if (tipus === "kor" || tipus === "fank") {
    const osszes = ertekek.reduce((s, v) => s + Math.max(0, v), 0) || 1;
    const R = Math.min(H - fent - 20, W * 0.5) / 2, cx = R + 30, cy = fent + (H - fent) / 2;
    let szog = -Math.PI / 2;
    ertekek.forEach((v, i) => {
      const resz = Math.max(0, v) / osszes;
      if (resz <= 0) return;
      const veg = szog + resz * Math.PI * 2;
      const nagy = veg - szog > Math.PI ? 1 : 0;
      const p = (a, r) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
      const szin = sz.paletta[i % sz.paletta.length];
      if (resz >= 0.9999) ki.push(`<circle cx="${cx}" cy="${cy}" r="${R}" fill="${szin}"/>`);
      else ki.push(`<path d="M${cx} ${cy} L${p(szog, R)} A${R} ${R} 0 ${nagy} 1 ${p(veg, R)} Z" fill="${szin}" stroke="#fff" stroke-width="1.5"><title>${dEsc(cimkek[i])}: ${dEsc(dSzam(v))}</title></path>`);
      if (resz > 0.05) {
        const k = (szog + veg) / 2, rr = tipus === "fank" ? R * 0.78 : R * 0.62;
        ki.push(`<text x="${(cx + rr * Math.cos(k)).toFixed(1)}" y="${(cy + rr * Math.sin(k) + 4).toFixed(1)}" text-anchor="middle" fill="#fff" font-weight="700">${Math.round(resz * 100)}%</text>`);
      }
      szog = veg;
    });
    if (tipus === "fank") {
      ki.push(`<circle cx="${cx}" cy="${cy}" r="${R * 0.55}" fill="${getComputedStyle(document.documentElement).getPropertyValue("--kartya").trim() || "#fff"}"/>`);
      ki.push(`<text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="18" font-weight="800" fill="${sz.szoveg}">${dEsc(dSzam(osszes))}</text>`);
    }
    // jelmagyarázat
    const lx = cx + R + 40;
    ertekek.slice(0, 12).forEach((v, i) => {
      const y = fent + 14 + i * 22;
      ki.push(`<rect x="${lx}" y="${y - 10}" width="12" height="12" rx="3" fill="${sz.paletta[i % sz.paletta.length]}"/>`);
      ki.push(`<text x="${lx + 20}" y="${y}" fill="${sz.szoveg}">${dEsc(dRovid(cimkek[i], 28))} <tspan fill="${sz.halvany}">${dEsc(dSzam(v))} · ${Math.round(Math.max(0, v) / osszes * 100)}%</tspan></text>`);
    });
    ki.push("</svg>");
    return ki.join("");
  }

  const min = Math.min(0, ...ertekek), max = Math.max(0, ...ertekek);
  const sk = dSkala(max, min);
  if (tipus === "sav") {
    const bal = Math.min(180, 20 + Math.max(...cimkek.map((c) => dRovid(c, 24).length)) * 7), jobb = 60, lent = 24;
    const sor = (H - fent - lent) / cimkek.length;
    const x = (v) => bal + ((v - sk.also) / (sk.felso - sk.also)) * (W - bal - jobb);
    sk.jelek.forEach((j) => ki.push(`<line x1="${x(j)}" x2="${x(j)}" y1="${fent}" y2="${H - lent}" stroke="${sz.vonal}"/><text x="${x(j)}" y="${H - 6}" text-anchor="middle" fill="${sz.halvany}">${dEsc(dSzam(j))}</text>`));
    ertekek.forEach((v, i) => {
      const y = fent + i * sor + sor * 0.15, h = sor * 0.7;
      ki.push(`<text x="${bal - 8}" y="${y + h / 2 + 4}" text-anchor="end" fill="${sz.szoveg}">${dEsc(dRovid(cimkek[i], 24))}</text>`);
      ki.push(`<rect x="${Math.min(x(0), x(v))}" y="${y}" width="${Math.max(1, Math.abs(x(v) - x(0)))}" height="${h}" rx="4" fill="${sz.fo}"><title>${dEsc(cimkek[i])}: ${dEsc(dSzam(v))}</title></rect>`);
      if (h >= 12) ki.push(`<text x="${x(v) + 6}" y="${y + h / 2 + 4}" fill="${sz.halvany}" font-size="11">${dEsc(dSzam(v))}</text>`);
    });
    ki.push("</svg>");
    return ki.join("");
  }

  // oszlop és vonal
  const bal = 56, jobb = 16, lent = 56;
  const ny = (v) => H - lent - ((v - sk.also) / (sk.felso - sk.also)) * (H - lent - fent);
  sk.jelek.forEach((j) => ki.push(`<line x1="${bal}" x2="${W - jobb}" y1="${ny(j)}" y2="${ny(j)}" stroke="${sz.vonal}"/><text x="${bal - 8}" y="${ny(j) + 4}" text-anchor="end" fill="${sz.halvany}">${dEsc(dSzam(j))}</text>`));
  const n = ertekek.length, oszl = (W - bal - jobb) / n;
  const cimkeLepes = Math.ceil(n / Math.floor((W - bal - jobb) / 46));
  const ferde = n > 8;
  cimkek.forEach((c, i) => {
    if (i % cimkeLepes) return;
    const x = bal + oszl * (i + 0.5);
    ki.push(ferde
      ? `<text x="${x}" y="${H - lent + 14}" text-anchor="end" transform="rotate(-35 ${x} ${H - lent + 14})" fill="${sz.szoveg}">${dEsc(dRovid(c))}</text>`
      : `<text x="${x}" y="${H - lent + 18}" text-anchor="middle" fill="${sz.szoveg}">${dEsc(dRovid(c))}</text>`);
  });
  if (tipus === "vonal") {
    const pontok = ertekek.map((v, i) => `${(bal + oszl * (i + 0.5)).toFixed(1)},${ny(v).toFixed(1)}`);
    ki.push(`<polygon points="${bal + oszl * 0.5},${ny(Math.max(sk.also, 0))} ${pontok.join(" ")} ${bal + oszl * (n - 0.5)},${ny(Math.max(sk.also, 0))}" fill="${sz.fo}" fill-opacity=".12"/>`);
    ki.push(`<polyline points="${pontok.join(" ")}" fill="none" stroke="${sz.fo}" stroke-width="2.5" stroke-linejoin="round"/>`);
    if (n <= 60) ertekek.forEach((v, i) => ki.push(`<circle cx="${bal + oszl * (i + 0.5)}" cy="${ny(v)}" r="3.5" fill="${sz.fo}"><title>${dEsc(cimkek[i])}: ${dEsc(dSzam(v))}</title></circle>`));
  } else {
    ertekek.forEach((v, i) => {
      const w = Math.max(2, oszl * 0.68), x = bal + oszl * i + (oszl - w) / 2;
      ki.push(`<rect x="${x.toFixed(1)}" y="${Math.min(ny(v), ny(0)).toFixed(1)}" width="${w.toFixed(1)}" height="${Math.max(1, Math.abs(ny(v) - ny(0))).toFixed(1)}" rx="${Math.min(5, w / 4)}" fill="${sz.fo}"><title>${dEsc(cimkek[i])}: ${dEsc(dSzam(v))}</title></rect>`);
      if (n <= 16) ki.push(`<text x="${x + w / 2}" y="${Math.min(ny(v), ny(0)) - 5}" text-anchor="middle" fill="${sz.halvany}" font-size="11">${dEsc(dSzam(v))}</text>`);
    });
  }
  ki.push(`<line x1="${bal}" x2="${W - jobb}" y1="${ny(0)}" y2="${ny(0)}" stroke="${sz.halvany}"/>`);
  ki.push("</svg>");
  return ki.join("");
}

// SVG → PNG letöltés (fehér háttérrel, 2x felbontás)
function svgPngMentes(svg, nev) {
  const img = new Image();
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  img.onload = () => {
    const c = document.createElement("canvas");
    c.width = img.width * 2; c.height = img.height * 2;
    const g = c.getContext("2d");
    g.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--kartya").trim() || "#fff";
    g.fillRect(0, 0, c.width, c.height);
    g.scale(2, 2);
    g.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    c.toBlob((b) => mentes(b, nev), "image/png");
  };
  img.src = url;
}

/* ======================================================
   ELEMZŐ
   ====================================================== */
const EZ_MAX_SOR = 50000;
let ezWb = null, ezNev = "", ezAdat = null; // ezAdat: { fej: [], sorok: [[]], tipusok: [] }

async function ezMegnyit(bajtok, nev) {
  await sheetjsBetolt();
  ezWb = XLSX.read(bajtok, { type: "array", cellDates: true });
  ezNev = nev.replace(/\.[^.]+$/, "");
  const sel = $("ez-lap");
  sel.innerHTML = "";
  ezWb.SheetNames.forEach((n) => sel.add(new Option(n, n)));
  $("ez-lap-sor").hidden = false;
  $("ez-bezar").hidden = false;
  ezLapBetolt();
}

function ezTipus(v) {
  if (v === "" || v === null || v === undefined) return "ures";
  if (v instanceof Date) return "datum";
  if (typeof v === "number") return "szam";
  if (typeof v === "boolean") return "logikai";
  return "szoveg";
}

function ezLapBetolt() {
  const ws = ezWb.Sheets[$("ez-lap").value];
  let sorok = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true, defval: "" });
  sorok = sorok.filter((s) => s.some((v) => v !== ""));
  if (sorok.length > EZ_MAX_SOR + 1) { ertesit(t("ez_too_big", { n: EZ_MAX_SOR }), true); sorok = sorok.slice(0, EZ_MAX_SOR + 1); }
  const oszlopDb = Math.max(0, ...sorok.map((s) => s.length));
  const fejlec = $("ez-fejlec").checked;
  const fej = [];
  for (let c = 0; c < oszlopDb; c++) {
    const nev = fejlec && sorok[0] && sorok[0][c] !== "" ? String(sorok[0][c] instanceof Date ? sorok[0][c].toLocaleDateString(locale()) : sorok[0][c]) : "";
    fej.push(nev ? `${nev}` : `${KM.oszlopBetuje(c)}`);
  }
  const adat = fejlec ? sorok.slice(1) : sorok;
  // Szövegként tárolt számok felismerése ("1 234,5")
  const tipusok = fej.map((_, c) => {
    const db = { szam: 0, datum: 0, szoveg: 0, logikai: 0, ures: 0 };
    for (const s of adat) {
      let v = s[c];
      if (typeof v === "string" && /^-?[\d\s ]+([.,]\d+)?$/.test(v.trim())) { s[c] = v = Number(v.replace(/[\s ]/g, "").replace(",", ".")); }
      db[ezTipus(v)]++;
    }
    const kitoltott = adat.length - db.ures;
    if (!kitoltott) return "ures";
    return ["szam", "datum", "logikai", "szoveg"].find((k) => db[k] / kitoltott >= 0.8) || "szoveg";
  });
  ezAdat = { fej, sorok: adat, tipusok };
  ezAttekintes();
  ezBeallitasok();
  ezDiagram();
}

function ezAttekintes() {
  const { fej, sorok, tipusok } = ezAdat;
  $("ez-ures").hidden = true;
  $("ez-eredmeny").hidden = false;
  const cellak = sorok.length * fej.length;
  const kitoltott = sorok.reduce((s, sor) => s + fej.filter((_, c) => sor[c] !== "" && sor[c] !== undefined).length, 0);
  const kartyak = [
    [sorok.length.toLocaleString(locale()), t("ez_rows")],
    [fej.length, t("ez_cols")],
    [cellak ? Math.round((kitoltott / cellak) * 100) + "%" : "–", t("ez_filled")],
    [tipusok.filter((x) => x === "szam").length, t("ez_numcols")],
  ];
  $("ez-kartyak").innerHTML = "";
  for (const [ertek, cimke] of kartyak) {
    const d = document.createElement("div");
    d.className = "ez-kartya";
    d.innerHTML = "<strong></strong><span></span>";
    d.firstChild.textContent = ertek;
    d.lastChild.textContent = cimke;
    $("ez-kartyak").appendChild(d);
  }
  // oszloptábla
  const tabla = $("ez-oszlopok");
  const fejsor = ["ez_col", "ez_type", "ez_filled", "ez_unique", "ez_sum", "ez_avg", "ez_min", "ez_max"].map((k) => `<th>${dEsc(t(k))}</th>`).join("");
  const sorokHtml = fej.map((nev, c) => {
    const ertekek = sorok.map((s) => s[c]).filter((v) => v !== "" && v !== undefined);
    const tip = tipusok[c];
    const egyedi = new Set(ertekek.map((v) => (v instanceof Date ? v.getTime() : v))).size;
    let osszeg = "", atlag = "", min = "", max = "";
    if (tip === "szam") {
      const sz = ertekek.filter((v) => typeof v === "number");
      const o = sz.reduce((a, b) => a + b, 0);
      osszeg = dSzam(o); atlag = sz.length ? dSzam(o / sz.length) : ""; min = sz.length ? dSzam(Math.min(...sz)) : ""; max = sz.length ? dSzam(Math.max(...sz)) : "";
    } else if (tip === "datum") {
      const d = ertekek.filter((v) => v instanceof Date).map((v) => v.getTime());
      if (d.length) { min = new Date(Math.min(...d)).toLocaleDateString(locale()); max = new Date(Math.max(...d)).toLocaleDateString(locale()); }
    }
    const kit = sorok.length ? Math.round((ertekek.length / sorok.length) * 100) : 0;
    const tipNev = { szam: "ez_t_num", datum: "ez_t_date", szoveg: "ez_t_text", ures: "ez_t_empty", logikai: "ez_t_bool" }[tip];
    return `<tr><td><strong>${dEsc(nev)}</strong></td><td><span class="ez-tipus ${tip}">${dEsc(t(tipNev))}</span></td><td><div class="ez-kitolt"><div style="width:${kit}%"></div></div><small>${kit}%</small></td><td class="szam">${egyedi.toLocaleString(locale())}</td><td class="szam">${osszeg}</td><td class="szam">${atlag}</td><td class="szam">${dEsc(min)}</td><td class="szam">${dEsc(max)}</td></tr>`;
  }).join("");
  tabla.innerHTML = `<thead><tr>${fejsor}</tr></thead><tbody>${sorokHtml}</tbody>`;
}

function ezBeallitasok() {
  const { fej, tipusok } = ezAdat;
  const kat = $("ez-kat"), ert = $("ez-ert");
  const regiKat = kat.value, regiErt = ert.value;
  kat.innerHTML = ""; ert.innerHTML = "";
  ert.add(new Option(t("ez_count_rows"), "-1"));
  fej.forEach((n, c) => {
    kat.add(new Option(n, c));
    if (tipusok[c] === "szam") ert.add(new Option(n, c));
  });
  // okos alapértelmezés: dátum vagy első szöveges oszlop; első számoszlop
  const datumOszl = tipusok.indexOf("datum"), szovegOszl = tipusok.indexOf("szoveg"), szamOszl = tipusok.indexOf("szam");
  kat.value = [...kat.options].some((o) => o.value === regiKat) ? regiKat : String(szovegOszl >= 0 ? szovegOszl : datumOszl >= 0 ? datumOszl : 0);
  ert.value = [...ert.options].some((o) => o.value === regiErt) ? regiErt : String(szamOszl >= 0 ? szamOszl : -1);
  ezDatumSor();
}
function ezDatumSor() {
  const datum = ezAdat && ezAdat.tipusok[+$("ez-kat").value] === "datum";
  $("ez-datum-mezo").hidden = !datum;
  if (datum && $("ez-rend").value === "ertek") $("ez-rend").value = "nev";
}

function ezCsoportosit() {
  const ci = +$("ez-kat").value, vi = +$("ez-ert").value, muv = vi < 0 ? "count" : $("ez-muv").value;
  const datum = ezAdat.tipusok[ci] === "datum", szint = $("ez-datum").value;
  const csop = new Map();
  for (const s of ezAdat.sorok) {
    let k = s[ci], rend;
    if (k instanceof Date) {
      const y = k.getFullYear(), m = k.getMonth() + 1, d = k.getDate(), p = (x) => String(x).padStart(2, "0");
      rend = szint === "ev" ? `${y}` : szint === "honap" ? `${y}-${p(m)}` : `${y}-${p(m)}-${p(d)}`;
      k = szint === "ev" ? `${y}` : szint === "honap" ? new Date(y, m - 1, 1).toLocaleDateString(locale(), { year: "numeric", month: "short" }) : k.toLocaleDateString(locale());
    } else {
      k = k === "" || k === undefined ? "(–)" : String(k);
      rend = k;
    }
    if (!csop.has(k)) csop.set(k, { rend, db: 0, osszeg: 0, szamok: 0, min: Infinity, max: -Infinity });
    const g = csop.get(k);
    g.db++;
    const v = vi >= 0 ? s[vi] : null;
    if (typeof v === "number") { g.osszeg += v; g.szamok++; g.min = Math.min(g.min, v); g.max = Math.max(g.max, v); }
  }
  const ertekOf = (g) => (muv === "count" ? g.db : muv === "sum" ? g.osszeg : !g.szamok ? 0 : muv === "avg" ? g.osszeg / g.szamok : muv === "min" ? g.min : g.max);
  let lista = [...csop].map(([k, g]) => ({ k, v: ertekOf(g), rend: g.rend }));
  if ($("ez-rend").value === "ertek") lista.sort((a, b) => b.v - a.v);
  else lista.sort((a, b) => (datum ? (a.rend < b.rend ? -1 : 1) : a.rend.localeCompare(b.rend, locale(), { numeric: true })));
  return { lista, datum, muv };
}

let ezUtolsoSvg = "", ezUtolsoLista = [], ezUtolsoMutat = [], ezUtolsoCim = "";
function ezDiagram() {
  if (!ezAdat) return;
  const { lista, datum, muv } = ezCsoportosit();
  const top = +$("ez-top").value;
  let mutat = lista;
  const tipus = $("ez-tipus").value;
  if (top && lista.length > top) {
    mutat = lista.slice(0, top);
    // kör/fánk és összeg/darab: a maradék „Egyéb”-ként
    if ((tipus === "kor" || tipus === "fank") && (muv === "sum" || muv === "count")) mutat.push({ k: t("ez_other"), v: lista.slice(top).reduce((s, x) => s + x.v, 0) });
  }
  ezUtolsoLista = lista;
  const kat = $("ez-kat").selectedOptions[0]?.textContent || "";
  const ert = $("ez-ert").value === "-1" ? t("ez_count_rows") : `${$("ez-muv").selectedOptions[0].textContent}: ${$("ez-ert").selectedOptions[0]?.textContent || ""}`;
  const szel = Math.max(320, Math.min(900, $("ez-diagram").clientWidth || 760));
  const mag = tipus === "sav" ? Math.max(260, Math.min(900, 40 + mutat.length * 28)) : szel < 500 ? 300 : 380;
  ezUtolsoSvg = diagramSvg(tipus, mutat.map((x) => x.k), mutat.map((x) => x.v), { szelesseg: szel, magassag: mag, cim: `${ert} – ${kat}` });
  ezUtolsoMutat = mutat;
  ezUtolsoCim = `${ert} – ${kat}`;
  $("ez-diagram").innerHTML = ezUtolsoSvg;
  ezMegallapitasok(lista, datum, muv);
}

function ezMegallapitasok(lista, datum, muv) {
  const ul = $("ez-megall");
  ul.innerHTML = "";
  const add = (s) => { const li = document.createElement("li"); li.textContent = s; ul.appendChild(li); };
  if (!lista.length) return;
  const osszes = lista.reduce((s, x) => s + x.v, 0);
  const rendezett = [...lista].sort((a, b) => b.v - a.v);
  add(t("ez_i_groups", { n: lista.length.toLocaleString(locale()), v: dSzam(osszes) }));
  add(t("ez_i_max", { k: rendezett[0].k, v: dSzam(rendezett[0].v) }));
  if (lista.length > 1) add(t("ez_i_min", { k: rendezett.at(-1).k, v: dSzam(rendezett.at(-1).v) }));
  if ((muv === "sum" || muv === "count") && osszes > 0 && lista.length > 3) {
    const elso = rendezett[0].v / osszes;
    if (elso >= 0.3) add(t("ez_i_share", { k: rendezett[0].k, p: Math.round(elso * 100) }));
    else add(t("ez_i_top3", { p: Math.round((rendezett.slice(0, 3).reduce((s, x) => s + x.v, 0) / osszes) * 100) }));
  }
  if (datum && lista.length >= 2) {
    const idoben = [...lista].sort((a, b) => (a.rend < b.rend ? -1 : 1));
    const [elozo, utolso] = idoben.slice(-2);
    if (elozo.v) {
      const p = Math.round(((utolso.v - elozo.v) / Math.abs(elozo.v)) * 100);
      if (p) add(t(p > 0 ? "ez_i_trend_up" : "ez_i_trend_down", { p: Math.abs(p) }));
    }
  }
}

/* ---------- Események ---------- */
$("ez-fajl").addEventListener("change", async (e) => {
  const f = e.target.files[0];
  e.target.value = "";
  if (!f) return;
  try { await ezMegnyit(new Uint8Array(await f.arrayBuffer()), f.name); } catch (hiba) { ertesit(hiba.message || t("preview_lib_failed"), true); }
});
$("ez-tarolt").addEventListener("change", async () => {
  const f = fajlok.find((x) => x.id === $("ez-tarolt").value);
  $("ez-tarolt").value = "";
  if (!f) return;
  try { await ezMegnyit(await fajlTartalom(f), f.nev); } catch (hiba) { hibaKezeles(hiba); }
});
$("ez-lap").addEventListener("change", ezLapBetolt);
// Bezárás: a betöltött fájl eltűnik az oldalról (a fájl csak a böngészőben volt, a szerverre nem került fel)
$("ez-bezar").addEventListener("click", () => {
  ezWb = null; ezAdat = null; ezNev = "";
  ezUtolsoSvg = ""; ezUtolsoLista = []; ezUtolsoMutat = [];
  $("ez-eredmeny").hidden = true;
  $("ez-lap-sor").hidden = true;
  $("ez-bezar").hidden = true;
  $("ez-ures").hidden = false;
  $("ez-diagram").innerHTML = "";
  $("ez-oszlopok").innerHTML = "";
});
$("ez-fejlec").addEventListener("change", () => ezWb && ezLapBetolt());
$("ez-kat").addEventListener("change", () => { ezDatumSor(); ezDiagram(); });
["ez-ert", "ez-muv", "ez-tipus", "ez-datum", "ez-rend", "ez-top"].forEach((id) => $(id).addEventListener("change", ezDiagram));
$("ez-png").addEventListener("click", () => ezUtolsoSvg && svgPngMentes(ezUtolsoSvg, (ezNev || "grafikon") + ".png"));
$("ez-svg-gomb").addEventListener("click", () => ezUtolsoSvg && mentes(new TextEncoder().encode(ezUtolsoSvg), (ezNev || "grafikon") + ".svg"));
/* ---------- Excel letöltés IGAZI Excel-grafikonnal ----------
   A SheetJS nem tud grafikont írni, ezért a kész xlsx fájlba (ami egy zip) mi tesszük bele
   a grafikon részeit: drawing1.xml + chart1.xml + a hivatkozások. Így Excelben ugyanaz látszik, mint itt. */
const xmlVed = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]));

function grafikonXml(tipus, lapNev, n, cim, sorozatNev, cimkek, ertekek, szin, fejSor = 1) {
  const lap = "'" + lapNev.replace(/'/g, "''") + "'";
  const r1 = fejSor + 1, r2 = fejSor + n;
  const kat = `<c:cat><c:strRef><c:f>${xmlVed(lap)}!$A$${r1}:$A$${r2}</c:f><c:strCache><c:ptCount val="${n}"/>${cimkek.map((k, i) => `<c:pt idx="${i}"><c:v>${xmlVed(k)}</c:v></c:pt>`).join("")}</c:strCache></c:strRef></c:cat>`;
  const ert = `<c:val><c:numRef><c:f>${xmlVed(lap)}!$B$${r1}:$B$${r2}</c:f><c:numCache><c:formatCode>General</c:formatCode><c:ptCount val="${n}"/>${ertekek.map((v, i) => `<c:pt idx="${i}"><c:v>${+v}</c:v></c:pt>`).join("")}</c:numCache></c:numRef></c:val>`;
  const tx = `<c:tx><c:strRef><c:f>${xmlVed(lap)}!$B$${fejSor}</c:f><c:strCache><c:ptCount val="1"/><c:pt idx="0"><c:v>${xmlVed(sorozatNev)}</c:v></c:pt></c:strCache></c:strRef></c:tx>`;
  const kitoltes = `<c:spPr><a:solidFill><a:srgbClr val="${szin}"/></a:solidFill></c:spPr>`;
  const cimkezes = (ertek, szazalek) => `<c:dLbls><c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr><c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="900"/></a:pPr><a:endParaRPr lang="sk-SK"/></a:p></c:txPr><c:showLegendKey val="0"/><c:showVal val="${ertek ? 1 : 0}"/><c:showCatName val="0"/><c:showSerName val="0"/><c:showPercent val="${szazalek ? 1 : 0}"/><c:showBubbleSize val="0"/></c:dLbls>`;
  const tengelyek = (forditott) => `
    <c:catAx><c:axId val="5001"/><c:scaling><c:orientation val="${forditott ? "maxMin" : "minMax"}"/></c:scaling><c:delete val="0"/><c:axPos val="${tipus === "sav" ? "l" : "b"}"/><c:numFmt formatCode="General" sourceLinked="0"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="nextTo"/><c:crossAx val="5002"/><c:crosses val="autoZero"/><c:auto val="1"/><c:lblAlgn val="ctr"/><c:lblOffset val="100"/><c:noMultiLvlLbl val="0"/></c:catAx>
    <c:valAx><c:axId val="5002"/><c:scaling><c:orientation val="minMax"/>${Math.min(...ertekek) >= 0 ? '<c:min val="0"/>' : ""}</c:scaling><c:delete val="0"/><c:axPos val="${tipus === "sav" ? "b" : "l"}"/><c:majorGridlines><c:spPr><a:ln w="6350"><a:solidFill><a:srgbClr val="E5E7EB"/></a:solidFill></a:ln></c:spPr></c:majorGridlines><c:numFmt formatCode="#,##0" sourceLinked="0"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="nextTo"/><c:crossAx val="5001"/><c:crosses val="${forditott ? "max" : "autoZero"}"/><c:crossBetween val="between"/></c:valAx>`;
  let rajz, jelmagyarazat = "";
  if (tipus === "kor" || tipus === "fank") {
    rajz = `<c:${tipus === "kor" ? "pieChart" : "doughnutChart"}><c:varyColors val="1"/><c:ser><c:idx val="0"/><c:order val="0"/>${tx}${cimkezes(false, true)}${kat}${ert}</c:ser><c:firstSliceAng val="0"/>${tipus === "fank" ? '<c:holeSize val="55"/>' : ""}</c:${tipus === "kor" ? "pieChart" : "doughnutChart"}>`;
    jelmagyarazat = `<c:legend><c:legendPos val="r"/><c:overlay val="0"/></c:legend>`;
  } else if (tipus === "vonal") {
    rajz = `<c:lineChart><c:grouping val="standard"/><c:varyColors val="0"/><c:ser><c:idx val="0"/><c:order val="0"/>${tx}<c:spPr><a:ln w="28575" cap="rnd"><a:solidFill><a:srgbClr val="${szin}"/></a:solidFill><a:round/></a:ln></c:spPr><c:marker><c:symbol val="circle"/><c:size val="5"/><c:spPr><a:solidFill><a:srgbClr val="${szin}"/></a:solidFill></c:spPr></c:marker>${n <= 20 ? cimkezes(true, false) : ""}${kat}${ert}<c:smooth val="0"/></c:ser><c:marker val="1"/><c:axId val="5001"/><c:axId val="5002"/></c:lineChart>${tengelyek(false)}`;
  } else {
    const sav = tipus === "sav";
    rajz = `<c:barChart><c:barDir val="${sav ? "bar" : "col"}"/><c:grouping val="clustered"/><c:varyColors val="0"/><c:ser><c:idx val="0"/><c:order val="0"/>${tx}${kitoltes}<c:invertIfNegative val="0"/>${n <= 30 ? cimkezes(true, false) : ""}${kat}${ert}</c:ser><c:gapWidth val="50"/><c:axId val="5001"/><c:axId val="5002"/></c:barChart>${tengelyek(sav)}`;
  }
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><c:roundedCorners val="0"/><c:chart><c:title><c:tx><c:rich><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="1400" b="1"/></a:pPr><a:r><a:rPr lang="sk-SK" sz="1400" b="1"/><a:t>${xmlVed(cim)}</a:t></a:r></a:p></c:rich></c:tx><c:overlay val="0"/></c:title><c:autoTitleDeleted val="0"/><c:plotArea><c:layout/>${rajz}</c:plotArea>${jelmagyarazat}<c:plotVisOnly val="1"/><c:dispBlanksAs val="gap"/></c:chart></c:chartSpace>`;
}

// A kész xlsx (bájtok) első lapjára grafikont tesz; a grafikon a D2 cellától indul
function xlsxGrafikonnal(bajtok, grafikonXmlSzoveg, sorokSzama, { tolSor = 1, igSor = null, stilusok = {} } = {}) {
  const C = XLSX.CFB;
  const cfb = C.read(bajtok, { type: "array" });
  const olvas = (ut) => new TextDecoder().decode(C.find(cfb, "/" + ut).content);
  const ir = (ut, szoveg) => {
    const regi = C.find(cfb, "/" + ut);
    const adat = new TextEncoder().encode(szoveg);
    if (regi) regi.content = adat; else C.utils.cfb_add(cfb, "/" + ut, adat);
  };
  const vegsor = igSor ?? tolSor + Math.max(21, Math.min(59, Math.round(sorokSzama * 1.15) + 5));
  ir("xl/charts/chart1.xml", grafikonXmlSzoveg);
  ir("xl/drawings/drawing1.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><xdr:twoCellAnchor editAs="oneCell"><xdr:from><xdr:col>3</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>${tolSor}</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:from><xdr:to><xdr:col>14</xdr:col><xdr:colOff>0</xdr:colOff><xdr:row>${vegsor}</xdr:row><xdr:rowOff>0</xdr:rowOff></xdr:to><xdr:graphicFrame macro=""><xdr:nvGraphicFramePr><xdr:cNvPr id="2" name="Graf 1"/><xdr:cNvGraphicFramePr/></xdr:nvGraphicFramePr><xdr:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/></xdr:xfrm><a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart"><c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="rId1"/></a:graphicData></a:graphic></xdr:graphicFrame><xdr:clientData/></xdr:twoCellAnchor></xdr:wsDr>`);
  ir("xl/drawings/_rels/drawing1.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart" Target="../charts/chart1.xml"/></Relationships>`);
  // a munkalap hivatkozása a rajzra
  const relsUt = "xl/worksheets/_rels/sheet1.xml.rels";
  const rel = `<Relationship Id="rIdGraf1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing1.xml"/>`;
  ir(relsUt, C.find(cfb, "/" + relsUt)
    ? olvas(relsUt).replace("</Relationships>", rel + "</Relationships>")
    : `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${rel}</Relationships>`);
  let lap = olvas("xl/worksheets/sheet1.xml");
  if (!/xmlns:r=/.test(lap.slice(0, 600))) lap = lap.replace("<worksheet ", '<worksheet xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ');
  ir("xl/worksheets/sheet1.xml", lap.replace("</worksheet>", '<drawing r:id="rIdGraf1"/></worksheet>'));
  ir("[Content_Types].xml", olvas("[Content_Types].xml").replace("</Types>",
    '<Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>' +
    '<Override PartName="/xl/charts/chart1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/></Types>'));
  // Formázás (a SheetJS ingyenes változata nem ír stílust): cím, félkövér, szürke fejléc, százalék
  if (Object.keys(stilusok).length) {
    let st = olvas("xl/styles.xml");
    const szam = (tag) => +(st.match(new RegExp(`<${tag} count="(\\d+)"`)) || [, 0])[1];
    const fontId = szam("fonts"), fillId = szam("fills"), xf0 = szam("cellXfs");
    st = st.replace(/<fonts count="\d+">([\s\S]*?)<\/fonts>/, (m, belso) => `<fonts count="${fontId + 2}">${belso}<font><b/><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font><font><b/><sz val="16"/><color rgb="FF1F2937"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>`);
    st = st.replace(/<fills count="\d+">([\s\S]*?)<\/fills>/, (m, belso) => `<fills count="${fillId + 1}">${belso}<fill><patternFill patternType="solid"><fgColor rgb="FFE5E7EB"/><bgColor indexed="64"/></patternFill></fill></fills>`);
    const ujXf = [
      `<xf numFmtId="0" fontId="${fontId + 1}" fillId="0" borderId="0" xfId="0" applyFont="1"/>`,
      `<xf numFmtId="0" fontId="${fontId}" fillId="0" borderId="0" xfId="0" applyFont="1"/>`,
      `<xf numFmtId="0" fontId="${fontId}" fillId="${fillId}" borderId="0" xfId="0" applyFont="1" applyFill="1"/>`,
      `<xf numFmtId="9" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/>`,
      `<xf numFmtId="9" fontId="${fontId}" fillId="0" borderId="0" xfId="0" applyNumberFormat="1" applyFont="1"/>`,
    ];
    st = st.replace(/<cellXfs count="\d+">([\s\S]*?)<\/cellXfs>/, (m, belso) => `<cellXfs count="${xf0 + ujXf.length}">${belso}${ujXf.join("")}</cellXfs>`);
    ir("xl/styles.xml", st);
    const index = { cim: xf0, felkover: xf0 + 1, fejlec: xf0 + 2, szazalek: xf0 + 3, nagyszazalek: xf0 + 4 };
    let lx = olvas("xl/worksheets/sheet1.xml");
    for (const [ref, nev] of Object.entries(stilusok)) {
      lx = lx.replace(new RegExp(`<c r="${ref}"( s="\\d+")?`), `<c r="${ref}" s="${index[nev]}"`);
    }
    ir("xl/worksheets/sheet1.xml", lx);
  }
  // a SheetJS saját jelölő bejegyzése nem kell a zip-be
  const jelolo = cfb.FullPaths.findIndex((p) => /Sh33tJ5$/.test(p));
  if (jelolo >= 0) { cfb.FullPaths.splice(jelolo, 1); cfb.FileIndex.splice(jelolo, 1); }
  return new Uint8Array(C.write(cfb, { fileType: "zip", type: "array" }));
}

// Oszloponkénti statisztika nyers számokkal (az Excel exporthoz)
function ezOszlopStat() {
  const { fej, sorok, tipusok } = ezAdat;
  return fej.map((nev, c) => {
    const ertekek = sorok.map((s) => s[c]).filter((v) => v !== "" && v !== undefined);
    const tip = tipusok[c];
    const sor = {
      nev, tip: t({ szam: "ez_t_num", datum: "ez_t_date", szoveg: "ez_t_text", ures: "ez_t_empty", logikai: "ez_t_bool" }[tip]),
      kit: sorok.length ? ertekek.length / sorok.length : 0,
      egyedi: new Set(ertekek.map((v) => (v instanceof Date ? v.getTime() : v))).size,
      osszeg: "", atlag: "", min: "", max: "",
    };
    if (tip === "szam") {
      const sz = ertekek.filter((v) => typeof v === "number");
      if (sz.length) {
        const o = sz.reduce((a, b) => a + b, 0);
        Object.assign(sor, { osszeg: +o.toFixed(4), atlag: +(o / sz.length).toFixed(4), min: Math.min(...sz), max: Math.max(...sz) });
      }
    } else if (tip === "datum") {
      const d = ertekek.filter((v) => v instanceof Date);
      if (d.length) { sor.min = new Date(Math.min(...d)); sor.max = new Date(Math.max(...d)); }
    }
    return sor;
  });
}

// Excel letöltés: ugyanaz, ami az oldalon látszik – összesítő, megállapítások, grafikon, oszlopok áttekintése
$("ez-xlsx").addEventListener("click", async () => {
  if (!ezUtolsoLista.length || !ezAdat) return;
  await sheetjsBetolt();
  const { fej: adatFej, sorok, tipusok } = ezAdat;
  const fejlec = [$("ez-kat").selectedOptions[0]?.textContent || "", $("ez-ert").value === "-1" ? t("ez_count_rows") : $("ez-ert").selectedOptions[0]?.textContent || ""];
  const szam = (v) => (Number.isInteger(v) ? v : +v.toFixed(4));
  const mutat = ezUtolsoMutat.length ? ezUtolsoMutat : ezUtolsoLista;
  const grafLap = t("ez_xl_chart"), osszesLap = t("ez_xl_all");
  const enc = (r, c) => XLSX.utils.encode_cell({ r, c });
  const ikonNelkul = (s) => s.replace(/^\S+\s/, "");
  const stilus = {};

  // ---- 1. lap ----
  const aoa = [];
  const sor = (...cellak) => { aoa.push(cellak); return aoa.length - 1; };
  stilus[enc(sor(`${t("nav_analyze")}: ${ezNev}${$("ez-lap").value ? " – " + $("ez-lap").value : ""}`), 0)] = "cim";
  sor();
  // összesítő kártyák
  const cellaDb = sorok.length * adatFej.length;
  const kitoltott = sorok.reduce((s, x) => s + adatFej.filter((_, c) => x[c] !== "" && x[c] !== undefined).length, 0);
  const kartyaFej = sor(t("ez_rows"), t("ez_cols"), t("ez_filled"), t("ez_numcols"));
  const kartyaErt = sor(sorok.length, adatFej.length, cellaDb ? kitoltott / cellaDb : 0, tipusok.filter((x) => x === "szam").length);
  for (let c = 0; c < 4; c++) { stilus[enc(kartyaFej, c)] = "fejlec"; stilus[enc(kartyaErt, c)] = c === 2 ? "nagyszazalek" : "felkover"; }
  sor();
  // megállapítások
  stilus[enc(sor(ikonNelkul(t("ez_insights"))), 0)] = "felkover";
  [...document.querySelectorAll("#ez-megall li")].forEach((li) => sor("• " + li.textContent));
  sor();
  // a grafikon adatai, mellettük a grafikon
  stilus[enc(sor(ikonNelkul(t("ez_chart")) + ": " + ezUtolsoCim), 0)] = "felkover";
  const grafFej = sor(...fejlec);
  stilus[enc(grafFej, 0)] = stilus[enc(grafFej, 1)] = "fejlec";
  mutat.forEach((x) => sor(x.k, szam(x.v)));
  const grafVege = grafFej + Math.max(18, Math.min(45, Math.round(mutat.length * 1.15) + 4));
  while (aoa.length < grafVege + 2) sor();
  // oszlopok áttekintése
  stilus[enc(sor(ikonNelkul(t("ez_overview"))), 0)] = "felkover";
  const statFej = sor(...["ez_col", "ez_type", "ez_filled", "ez_unique", "ez_sum", "ez_avg", "ez_min", "ez_max"].map((k) => t(k)));
  for (let c = 0; c < 8; c++) stilus[enc(statFej, c)] = "fejlec";
  for (const o of ezOszlopStat()) stilus[enc(sor(o.nev, o.tip, o.kit, o.egyedi, o.osszeg, o.atlag, o.min, o.max), 2)] = "szazalek";

  const ws1 = XLSX.utils.aoa_to_sheet(aoa, { cellDates: true });
  ws1["!cols"] = [{ wch: 26 }, { wch: 14 }, { wch: 13 }, { wch: 14 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];
  // ---- 2. lap: minden csoport ----
  const ws2 = XLSX.utils.aoa_to_sheet([fejlec, ...ezUtolsoLista.map((x) => [x.k, szam(x.v)])]);
  ws2["!cols"] = [{ wch: 26 }, { wch: 14 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws1, grafLap);
  XLSX.utils.book_append_sheet(wb, ws2, osszesLap);
  let bajtok = new Uint8Array(XLSX.write(wb, { type: "array", bookType: "xlsx", cellDates: true }));
  try {
    const szin = (diagramSzinek().fo.match(/^#([0-9a-f]{6})$/i) || [, "107C41"])[1].toUpperCase();
    const xml = grafikonXml($("ez-tipus").value, grafLap, mutat.length, ezUtolsoCim, fejlec[1], mutat.map((x) => x.k), mutat.map((x) => szam(x.v)), szin, grafFej + 1);
    bajtok = xlsxGrafikonnal(bajtok, xml, mutat.length, { tolSor: grafFej, igSor: grafVege, stilusok: stilus });
  } catch (e) { console.error(e); } // ha nem sikerül, grafikon nélkül töltjük le
  mentes(bajtok, (ezNev || "analyza") + "_" + t("ez_xl_file") + ".xlsx");
});
let ezAtmeretezes;
window.addEventListener("resize", () => { clearTimeout(ezAtmeretezes); ezAtmeretezes = setTimeout(() => aktivOldal === "elemzo" && ezDiagram(), 200); });

function ezSelectek() {
  const opciok = (id, lista) => {
    const sel = $(id), regi = sel.value;
    sel.innerHTML = "";
    lista.forEach(([v, k]) => sel.add(new Option(k, v)));
    if ([...sel.options].some((o) => o.value === regi)) sel.value = regi;
  };
  opciok("ez-tipus", [["oszlop", t("ez_bar")], ["sav", t("ez_hbar")], ["vonal", t("ez_line")], ["kor", t("ez_pie")], ["fank", t("ez_donut")]]);
  opciok("ez-muv", ["sum", "count", "avg", "min", "max"].map((m) => [m, t("agg_" + m)]));
  opciok("ez-datum", [["nap", t("ez_g_day")], ["honap", t("ez_g_month")], ["ev", t("ez_g_year")]]);
  opciok("ez-rend", [["ertek", t("ez_sort_val")], ["nev", t("ez_sort_name")]]);
  opciok("ez-top", [["10", t("ez_top_n", { n: 10 })], ["20", t("ez_top_n", { n: 20 })], ["50", t("ez_top_n", { n: 50 })], ["0", t("ez_all")]]);
  if (!$("ez-datum").dataset.kesz) { $("ez-datum").value = "honap"; $("ez-datum").dataset.kesz = "1"; }
  const tarolt = $("ez-tarolt");
  const lista = titkositoKulcs ? fajlok.filter((f) => tablazatE(f.nev)) : [];
  tarolt.hidden = $("ez-tarolt-cim").hidden = !lista.length;
  tarolt.innerHTML = "";
  tarolt.add(new Option("—", ""));
  lista.forEach((f) => tarolt.add(new Option(f.nev, f.id)));
}
forditasHookok.push(() => { ezSelectek(); if (ezAdat) { ezAttekintes(); ezDiagram(); } });
oldalHookok.elemzo = () => { ezSelectek(); if (ezAdat) ezDiagram(); };
ezSelectek();
if (aktivOldal === "elemzo") oldalHookok.elemzo();
