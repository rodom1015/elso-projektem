/*
  EXCEL-ELEMZŐ ÉS GRAFIKONKÉSZÍTŐ (teljesen a böngészőben)
  - Fájl gépről vagy a Fájljaimból → munkalap → automatikus áttekintés (oszloponként típus, kitöltöttség, összeg, átlag…)
  - Grafikon: oszlop, sáv, vonal, kör/fánk – csoportosítás összeggel, darabbal, átlaggal; dátumnál napra/hónapra/évre
  - Automatikus megállapítások (legnagyobb, első 3 aránya, trend)
  - Letöltés: grafikon PNG / SVG képként, eredmény Excelben
  A diagramSvg() függvényt az Admin oldal is használja.
*/

Object.assign(SZOVEGEK.hu, {
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

let ezUtolsoSvg = "", ezUtolsoLista = [];
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
$("ez-fejlec").addEventListener("change", () => ezWb && ezLapBetolt());
$("ez-kat").addEventListener("change", () => { ezDatumSor(); ezDiagram(); });
["ez-ert", "ez-muv", "ez-tipus", "ez-datum", "ez-rend", "ez-top"].forEach((id) => $(id).addEventListener("change", ezDiagram));
$("ez-png").addEventListener("click", () => ezUtolsoSvg && svgPngMentes(ezUtolsoSvg, (ezNev || "grafikon") + ".png"));
$("ez-svg-gomb").addEventListener("click", () => ezUtolsoSvg && mentes(new TextEncoder().encode(ezUtolsoSvg), (ezNev || "grafikon") + ".svg"));
$("ez-xlsx").addEventListener("click", async () => {
  if (!ezUtolsoLista.length) return;
  await sheetjsBetolt();
  const fejlec = [$("ez-kat").selectedOptions[0]?.textContent || "", $("ez-ert").value === "-1" ? t("ez_count_rows") : $("ez-ert").selectedOptions[0]?.textContent || ""];
  const ws = XLSX.utils.aoa_to_sheet([fejlec, ...ezUtolsoLista.map((x) => [x.k, x.v])]);
  ws["!cols"] = [{ wch: 28 }, { wch: 16 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Kimutatás");
  mentes(new Uint8Array(XLSX.write(wb, { type: "array", bookType: "xlsx" })), (ezNev || "elemzes") + "_kimutatas.xlsx");
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
