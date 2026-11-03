/*
  KÉPLETMAGYARÁZÓ ÉS -ELLENŐRZŐ (Eszközök → 🔍 fül)
  - A képletet részekre bontja: minden függvénynél mit csinál és melyik argumentum mi
  - Ellenőrzi a tipikus hibákat: hiányzó pontos egyezés az FKERES-nél, elírt függvénynév,
    zárójelek, rögzítés nélküli keresőtábla, túl sok egymásba ágyazott HA, nullával osztás…
  - Megmutatja a képletet magyar, szlovák és angol Excelhez is
  Mindez helyben, AI nélkül – nem fogyaszt keretet.
*/

Object.assign(SZOVEGEK.hu, {
  km_tab: "🔍 Képletmagyarázó", km_title: "🔍 Képletmagyarázó és -ellenőrző", km_sub: "Másold be a képletet: részekre bontva elmagyarázza, és figyelmeztet a tipikus hibákra. Magyar, szlovák és angol képletet is ért.",
  km_ph: "Pl. =HAHIBA(FKERES(A2;Árak!A:C;3;HAMIS);0)", km_example: "Példa", km_structure: "Felépítés", km_checks: "Ellenőrzés", km_versions: "Más nyelvű Excelben",
  km_ok: "✅ Nem találtam tipikus hibát.", km_arg: "{n}. argumentum", km_range: "tartomány", km_cell: "cella", km_col: "teljes oszlop", km_sheet: "„{s}” munkalap", km_text: "szöveg", km_number: "szám", km_bool: "logikai érték",
  km_op: { "+": "összeadás", "-": "kivonás", "*": "szorzás", "/": "osztás", "^": "hatványozás", "&": "szövegek összefűzése", "=": "egyenlő?", "<>": "nem egyenlő?", "<": "kisebb?", ">": "nagyobb?", "<=": "kisebb vagy egyenlő?", ">=": "nagyobb vagy egyenlő?" },
  km_unknown_fn: "Ismeretlen függvény: {f}", km_did_you_mean: "Erre gondoltál: {g}?",
  km_parse: "A képlet nem értelmezhető – ellenőrizd a zárójeleket, az idézőjeleket és az elválasztót ({s}).", km_parens: "A zárójelek száma nem egyezik: {o} nyitó és {c} záró.", km_quotes: "Páratlan számú idézőjel – valahol lemaradt a záró \".",
  km_vlookup_exact: "A(z) {f} 4. argumentuma hiányzik → közelítő keresés lesz, ami rendezetlen adatnál ROSSZ eredményt ad. Írd a végére: {h}.", km_vlookup_approx: "A(z) {f} közelítő keresést végez – csak akkor jó, ha az első oszlop növekvő sorrendben van.",
  km_vlookup_index: "Tipp: ha a táblázatba új oszlopot szúrnak be, a(z) {f} oszlopszáma elcsúszik. Biztosabb az {x} vagy az {i}+{m}.",
  km_abs: "A(z) {f} keresőtáblája ({r}) nincs rögzítve. Ha lefelé másolod a képletet, a tábla elcsúszik – használd: {a} (F4 billentyű).",
  km_nested_if: "{n} egymásba ágyazott {f} – nehezen olvasható. Egyszerűbb lehet: {ifs}, vagy egy keresőtábla + {x}.",
  km_div: "Osztás: ha az osztó 0 vagy üres, #ZÉRÓOSZTÓ! lesz. Tedd köré: {e}(…; 0).", km_volatile: "A(z) {f} minden változáskor újraszámol – sok ilyen képlet lassíthatja a munkafüzetet.",
  km_whole: "Teljes oszlop ({r}) a(z) {f} függvényben – nagy fájlban lassú lehet. Ha lehet, adj meg pontos tartományt vagy használj táblázatot (Ctrl+T).",
  km_hard: "Beírt szám ({n}) a képletben – ha változhat (pl. ÁFA, árfolyam), tedd egy cellába, és arra hivatkozz.", km_sep: "Magyar és szlovák Excelben az elválasztó pontosvessző (;), angolban vessző (,).",
  km_copy: "Másolás", km_lang: { hu: "🇭🇺 Magyar Excel", sk: "🇸🇰 Szlovák Excel", en: "🇬🇧 Angol Excel" }, km_detected: "Felismert nyelv: {l}",
});
Object.assign(SZOVEGEK.sk, {
  km_tab: "🔍 Vysvetlenie vzorca", km_title: "🔍 Vysvetlenie a kontrola vzorca", km_sub: "Vlož vzorec: rozloží ho na časti, vysvetlí ich a upozorní na typické chyby. Rozumie slovenským, maďarským aj anglickým vzorcom.",
  km_ph: "Napr. =IFERROR(VLOOKUP(A2;Ceny!A:C;3;FALSE);0)", km_example: "Príklad", km_structure: "Štruktúra", km_checks: "Kontrola", km_versions: "V Exceli v inom jazyku",
  km_ok: "✅ Nenašiel som typickú chybu.", km_arg: "{n}. argument", km_range: "rozsah", km_cell: "bunka", km_col: "celý stĺpec", km_sheet: "hárok „{s}“", km_text: "text", km_number: "číslo", km_bool: "logická hodnota",
  km_op: { "+": "sčítanie", "-": "odčítanie", "*": "násobenie", "/": "delenie", "^": "umocnenie", "&": "spojenie textov", "=": "rovná sa?", "<>": "nerovná sa?", "<": "menšie?", ">": "väčšie?", "<=": "menšie alebo rovné?", ">=": "väčšie alebo rovné?" },
  km_unknown_fn: "Neznáma funkcia: {f}", km_did_you_mean: "Mysleli ste {g}?",
  km_parse: "Vzorcu sa nedá porozumieť – skontroluj zátvorky, úvodzovky a oddeľovač ({s}).", km_parens: "Počet zátvoriek nesedí: {o} otváracích a {c} zatváracích.", km_quotes: "Nepárny počet úvodzoviek – niekde chýba zatváracia \".",
  km_vlookup_exact: "Funkcii {f} chýba 4. argument → použije sa približné vyhľadávanie, ktoré pri nezoradených údajoch dá ZLÝ výsledok. Pridaj na koniec: {h}.", km_vlookup_approx: "{f} vyhľadáva približne – funguje správne len vtedy, ak je prvý stĺpec zoradený vzostupne.",
  km_vlookup_index: "Tip: ak niekto do tabuľky vloží stĺpec, číslo stĺpca vo {f} sa posunie. Spoľahlivejšie je {x} alebo {i}+{m}.",
  km_abs: "Vyhľadávacia tabuľka funkcie {f} ({r}) nie je ukotvená. Pri kopírovaní nadol sa posunie – použi {a} (kláves F4).",
  km_nested_if: "{n} vnorených {f} – ťažko sa to číta. Jednoduchšie môže byť {ifs} alebo vyhľadávacia tabuľka + {x}.",
  km_div: "Delenie: ak je deliteľ 0 alebo prázdny, vznikne #DIV/0!. Obaľ ho: {e}(…; 0).", km_volatile: "{f} sa prepočíta pri každej zmene – veľa takých vzorcov môže zošit spomaliť.",
  km_whole: "Celý stĺpec ({r}) vo funkcii {f} – vo veľkom súbore môže byť pomalý. Ak sa dá, zadaj presný rozsah alebo použi tabuľku (Ctrl+T).",
  km_hard: "Napísané číslo ({n}) vo vzorci – ak sa môže zmeniť (napr. DPH, kurz), daj ho do bunky a odkazuj naň.", km_sep: "V slovenskom a maďarskom Exceli je oddeľovač bodkočiarka (;), v anglickom čiarka (,).",
  km_copy: "Kopírovať", km_lang: { hu: "🇭🇺 Maďarský Excel", sk: "🇸🇰 Slovenský Excel", en: "🇬🇧 Anglický Excel" }, km_detected: "Rozpoznaný jazyk: {l}",
});
Object.assign(SZOVEGEK.en, {
  km_tab: "🔍 Formula explainer", km_title: "🔍 Formula explainer and checker", km_sub: "Paste a formula: it's broken into parts and explained, and typical mistakes are flagged. Understands Slovak, Hungarian and English formulas.",
  km_ph: "E.g. =IFERROR(VLOOKUP(A2,Prices!A:C,3,FALSE),0)", km_example: "Example", km_structure: "Structure", km_checks: "Checks", km_versions: "In other Excel languages",
  km_ok: "✅ No typical mistakes found.", km_arg: "argument {n}", km_range: "range", km_cell: "cell", km_col: "whole column", km_sheet: "sheet \"{s}\"", km_text: "text", km_number: "number", km_bool: "logical value",
  km_op: { "+": "add", "-": "subtract", "*": "multiply", "/": "divide", "^": "power", "&": "join text", "=": "equal?", "<>": "not equal?", "<": "less than?", ">": "greater than?", "<=": "less or equal?", ">=": "greater or equal?" },
  km_unknown_fn: "Unknown function: {f}", km_did_you_mean: "Did you mean {g}?",
  km_parse: "The formula can't be read – check the brackets, quotes and separator ({s}).", km_parens: "Brackets don't match: {o} opening and {c} closing.", km_quotes: "Odd number of quotes – a closing \" is missing somewhere.",
  km_vlookup_exact: "{f} is missing its 4th argument → it does an approximate match, which gives WRONG results on unsorted data. Add at the end: {h}.", km_vlookup_approx: "{f} does an approximate match – only correct if the first column is sorted ascending.",
  km_vlookup_index: "Tip: if someone inserts a column into the table, the column number in {f} shifts. {x} or {i}+{m} is safer.",
  km_abs: "The lookup table of {f} ({r}) isn't locked. When you copy the formula down it shifts – use {a} (F4 key).",
  km_nested_if: "{n} nested {f}s – hard to read. Simpler: {ifs}, or a lookup table + {x}.",
  km_div: "Division: if the divisor is 0 or empty you get #DIV/0!. Wrap it: {e}(…, 0).", km_volatile: "{f} recalculates on every change – many such formulas can slow the workbook down.",
  km_whole: "Whole column ({r}) in {f} – can be slow in a large file. Use an exact range or a table (Ctrl+T) if you can.",
  km_hard: "Typed-in number ({n}) in the formula – if it can change (e.g. VAT, rate), put it in a cell and refer to that.", km_sep: "Slovak and Hungarian Excel use a semicolon (;) as separator, English uses a comma (,).",
  km_copy: "Copy", km_lang: { hu: "🇭🇺 Hungarian Excel", sk: "🇸🇰 Slovak Excel", en: "🇬🇧 English Excel" }, km_detected: "Detected language: {l}",
});

const kmT = (k, v) => t(k, v);
const kmFvNev = (en) => (nyelv === "hu" && EN_HU[en] ? EN_HU[en] : en);
const kmFv = (nev) => FUGGVENYEK.find((f) => f.en === nev || f.hu === nev) || null;
const kmEn = (nev) => (HU_EN[nev] || nev);

function kmRefSzoveg(n) {
  const lap = n.lap ? (/[^A-Za-z0-9_.]/.test(n.lap) ? `'${n.lap}'!` : n.lap + "!") : "";
  if (n.r2 === Infinity) return lap + KM.oszlopBetuje(n.c1) + ":" + KM.oszlopBetuje(n.c2);
  const a = KM.oszlopBetuje(n.c1) + (n.r1 + 1);
  return lap + (n.egy ? a : a + ":" + KM.oszlopBetuje(n.c2) + (n.r2 + 1));
}

// Levenshtein-távolság az elírt függvénynevekhez
function kmTav(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function kmJavaslat(nev) {
  let legjobb = null, tav = 3;
  for (const f of FUGGVENYEK) for (const n of [f.hu, f.en]) { const d = kmTav(nev, n); if (d < tav) { tav = d; legjobb = n === f.hu ? f.hu : f.en; } }
  return legjobb;
}

/* ---------- Faszerkezet megjelenítése ---------- */
function kmParameterek(f) {
  const s = nyelv === "hu" ? f.parHu : f.parEn;
  return s.split(nyelv === "hu" ? /;\s*/ : /,\s*/).map((p) => p.trim()).filter(Boolean);
}
function kmCsomopont(n) {
  const li = document.createElement("li");
  if (n.t === "fn") {
    const f = kmFv(n.nev);
    const nev = f ? kmFvNev(f.en) : n.nev;
    li.className = "km-fn" + (f ? "" : " ismeretlen");
    li.innerHTML = `<div class="km-sor"><code class="km-nev"></code><span class="km-leiras"></span></div>`;
    li.querySelector(".km-nev").textContent = nev + "( )";
    li.querySelector(".km-leiras").textContent = f ? f.leiras[nyelv] : kmT("km_unknown_fn", { f: n.nev });
    if (n.args.length) {
      const ul = document.createElement("ul");
      const par = f ? kmParameterek(f) : [];
      n.args.forEach((a, i) => {
        const al = kmCsomopont(a);
        const cimke = document.createElement("span");
        cimke.className = "km-arg";
        const p = par[i] ?? (par.length && /\.\.\.|…/.test(par[par.length - 1]) ? par[par.length - 2] : par[par.length - 1]);
        cimke.textContent = (p ? p.replace(/[[\]]/g, "") : kmT("km_arg", { n: i + 1 })) + ":";
        al.prepend(cimke);
        ul.appendChild(al);
      });
      li.appendChild(ul);
    }
    return li;
  }
  if (n.t === "ref") {
    li.className = "km-ref";
    const tipus = n.r2 === Infinity ? kmT("km_col") : n.egy ? kmT("km_cell") : kmT("km_range");
    li.innerHTML = `<code></code> <span class="km-leiras"></span>`;
    li.querySelector("code").textContent = kmRefSzoveg(n);
    li.querySelector(".km-leiras").textContent = tipus + (n.lap ? " · " + kmT("km_sheet", { s: n.lap }) : "");
    return li;
  }
  if (n.t === "const") {
    li.className = "km-const";
    const v = n.v;
    const tipus = KM.hibaE(v) ? "" : typeof v === "string" ? kmT("km_text") : typeof v === "boolean" ? kmT("km_bool") : kmT("km_number");
    li.innerHTML = `<code></code> <span class="km-leiras"></span>`;
    li.querySelector("code").textContent = KM.hibaE(v) ? v.hiba : typeof v === "string" ? `"${v}"` : typeof v === "boolean" ? (nyelv === "hu" ? (v ? "IGAZ" : "HAMIS") : v ? "TRUE" : "FALSE") : String(v).replace(".", nyelv === "en" ? "." : ",");
    li.querySelector(".km-leiras").textContent = tipus;
    return li;
  }
  if (n.t === "bin") {
    li.className = "km-op";
    li.innerHTML = `<div class="km-sor"><code class="km-nev"></code><span class="km-leiras"></span></div><ul></ul>`;
    li.querySelector(".km-nev").textContent = n.o;
    li.querySelector(".km-leiras").textContent = (SZOVEGEK[nyelv].km_op || SZOVEGEK.hu.km_op)[n.o] || "";
    li.querySelector("ul").append(kmCsomopont(n.b), kmCsomopont(n.j));
    return li;
  }
  if (n.t === "neg" || n.t === "pct") {
    li.className = "km-op";
    li.innerHTML = `<div class="km-sor"><code class="km-nev"></code></div><ul></ul>`;
    li.querySelector(".km-nev").textContent = n.t === "neg" ? "−" : "%";
    li.querySelector("ul").appendChild(kmCsomopont(n.x));
    return li;
  }
  if (n.t === "ures") { li.className = "km-const"; li.textContent = "∅"; return li; }
  return li;
}

/* ---------- Ellenőrzések ---------- */
function kmEllenoriz(src, fa, nyelvKeplet) {
  const ki = [];
  const add = (szint, szoveg) => ki.push({ szint, szoveg });
  const el = nyelvKeplet === "en" ? "," : ";";
  // zárójelek, idézőjelek (szövegen kívül)
  let nyit = 0, zar = 0, idezo = 0;
  for (const ch of src) { if (ch === '"') idezo++; else if (idezo % 2 === 0) { if (ch === "(") nyit++; if (ch === ")") zar++; } }
  if (idezo % 2) add("hiba", kmT("km_quotes"));
  if (nyit !== zar) add("hiba", kmT("km_parens", { o: nyit, c: zar }));
  if (fa.t === "const" && KM.hibaE(fa.v) && !src.trim().replace(/^=/, "").startsWith("#")) { add("hiba", kmT("km_parse", { s: el })); return ki; }
  if (nyelvKeplet === "en" && /;/.test(src.replace(/"[^"]*"/g, ""))) add("info", kmT("km_sep"));
  let haMely = 0;
  const bejar = (n, szulo, haSzint) => {
    if (!n || typeof n !== "object") return;
    if (n.t === "fn") {
      const en = kmEn(n.nev);
      const ismert = kmFv(n.nev);
      if (!ismert) {
        const j = kmJavaslat(n.nev);
        add("hiba", kmT("km_unknown_fn", { f: n.nev }) + (j ? " " + kmT("km_did_you_mean", { g: j }) : ""));
      }
      if (en === "VLOOKUP" || en === "HLOOKUP") {
        const negyedik = n.args[3];
        if (!negyedik || negyedik.t === "ures") add("hiba", kmT("km_vlookup_exact", { f: kmFvNev(en), h: nyelvKeplet === "hu" ? "HAMIS" : "FALSE" }));
        else if (negyedik.t === "const" && (negyedik.v === true || negyedik.v === 1)) add("figy", kmT("km_vlookup_approx", { f: kmFvNev(en) }));
        const tabla = n.args[1];
        if (tabla && tabla.t === "ref" && !tabla.egy && tabla.r2 !== Infinity) {
          // a beírt szövegben megkeressük a tartományt, és megnézzük, van-e benne $
          const [a, b] = kmRefSzoveg({ ...tabla, lap: null }).split(":");
          const minta = (x) => x.replace(/^([A-Z]+)(\d+)$/, "\\$?$1\\$?$2");
          const talalat = src.toUpperCase().match(new RegExp(minta(a) + ":" + minta(b)));
          if (talalat && !talalat[0].includes("$")) {
            add("figy", kmT("km_abs", { f: kmFvNev(en), r: a + ":" + b, a: "$" + a.replace(/(\d+)/, "$$$1") + ":$" + b.replace(/(\d+)/, "$$$1") }));
          }
        }
        if (n.args[2] && n.args[2].t === "const" && typeof n.args[2].v === "number" && n.args[2].v > 1) add("info", kmT("km_vlookup_index", { f: kmFvNev(en), x: kmFvNev("XLOOKUP"), i: kmFvNev("INDEX"), m: kmFvNev("MATCH") }));
      }
      if (["TODAY", "NOW", "INDIRECT", "OFFSET", "RAND", "RANDBETWEEN"].includes(en)) add("info", kmT("km_volatile", { f: kmFvNev(en) }));
      if (["SUMPRODUCT", "COUNTIFS", "SUMIFS", "VLOOKUP", "MATCH", "XLOOKUP", "INDEX", "COUNTIF", "SUMIF"].includes(en)) {
        const egesz = n.args.find((a) => a && a.t === "ref" && a.r2 === Infinity);
        if (egesz && en === "SUMPRODUCT") add("figy", kmT("km_whole", { r: kmRefSzoveg(egesz), f: kmFvNev(en) }));
      }
      const ujHa = en === "IF" ? haSzint + 1 : haSzint;
      if (ujHa > haMely) haMely = ujHa;
      n.args.forEach((a) => bejar(a, n, ujHa));
      return;
    }
    if (n.t === "bin") {
      if (n.o === "/" && !(n.j.t === "const" && typeof n.j.v === "number" && n.j.v !== 0)) {
        const vedve = (szulo && szulo.t === "fn" && ["IFERROR", "IFNA"].includes(kmEn(szulo.nev)));
        if (!vedve && !ki.some((x) => x.kulcs === "div")) { add("info", kmT("km_div", { e: kmFvNev("IFERROR") })); ki[ki.length - 1].kulcs = "div"; }
      }
      if ((n.o === "*" || n.o === "/") && [n.b, n.j].some((x) => x.t === "const" && typeof x.v === "number" && x.v !== 0 && x.v !== 1 && x.v !== 100 && x.v !== 2 && x.v !== 12 && x.v !== 24 && x.v !== 60 && x.v !== 1000)) {
        const sz = [n.b, n.j].find((x) => x.t === "const" && typeof x.v === "number").v;
        if (!ki.some((x) => x.kulcs === "hard")) { add("info", kmT("km_hard", { n: String(sz).replace(".", nyelv === "en" ? "." : ",") })); ki[ki.length - 1].kulcs = "hard"; }
      }
      bejar(n.b, n, haSzint); bejar(n.j, n, haSzint);
      return;
    }
    if (n.t === "neg" || n.t === "pct") bejar(n.x, n, haSzint);
  };
  bejar(fa, null, 0);
  if (haMely >= 3) add("figy", kmT("km_nested_if", { n: haMely, f: kmFvNev("IF"), ifs: kmFvNev("IFS"), x: kmFvNev("XLOOKUP") }));
  return ki;
}

/* ---------- Felület ---------- */
function kmRajzol() {
  const be = $("km-be").value.trim();
  const ki = $("km-ki");
  ki.innerHTML = "";
  if (!be) return;
  const src = be.replace(/^=/, "");
  const nyelvKeplet = kepletNyelve("=" + src);
  const fa = KM.keplet(src, nyelvKeplet !== "en");
  // Felismert nyelv
  const nyl = document.createElement("p");
  nyl.className = "halvany-szoveg kicsi-szoveg";
  nyl.textContent = kmT("km_detected", { l: SZOVEGEK[nyelv].km_lang[nyelvKeplet] });
  ki.appendChild(nyl);
  // Ellenőrzés
  const ell = kmEllenoriz(be, fa, nyelvKeplet);
  const ellDoboz = document.createElement("section");
  ellDoboz.className = "km-blokk";
  ellDoboz.innerHTML = `<h3></h3><ul class="km-ellenor"></ul>`;
  ellDoboz.querySelector("h3").textContent = kmT("km_checks");
  const ul = ellDoboz.querySelector("ul");
  if (!ell.length) { const li = document.createElement("li"); li.className = "jo"; li.textContent = kmT("km_ok"); ul.appendChild(li); }
  const sorrend = { hiba: 0, figy: 1, info: 2 };
  ell.sort((a, b) => sorrend[a.szint] - sorrend[b.szint]).forEach((x) => {
    const li = document.createElement("li");
    li.className = x.szint;
    li.textContent = (x.szint === "hiba" ? "⛔ " : x.szint === "figy" ? "⚠️ " : "💡 ") + x.szoveg;
    ul.appendChild(li);
  });
  ki.appendChild(ellDoboz);
  // Felépítés
  if (!(fa.t === "const" && KM.hibaE(fa.v) && !src.startsWith("#"))) {
    const fel = document.createElement("section");
    fel.className = "km-blokk";
    fel.innerHTML = `<h3></h3><ul class="km-fa"></ul>`;
    fel.querySelector("h3").textContent = kmT("km_structure");
    fel.querySelector("ul").appendChild(kmCsomopont(fa));
    ki.appendChild(fel);
  }
  // Más nyelvű Excelben
  const nyv = document.createElement("section");
  nyv.className = "km-blokk";
  nyv.innerHTML = `<h3></h3><div class="km-nyelvek"></div>`;
  nyv.querySelector("h3").textContent = kmT("km_versions");
  for (const l of ["sk", "hu", "en"]) {
    const keplet = "=" + kepletForditas(src, nyelvKeplet, l).ki;
    const sor = document.createElement("div");
    sor.className = "km-nyelv-sor";
    sor.innerHTML = `<span></span><code></code><button type="button" class="gomb masodlagos kicsi"></button>`;
    sor.querySelector("span").textContent = SZOVEGEK[nyelv].km_lang[l];
    sor.querySelector("code").textContent = keplet;
    sor.querySelector("button").textContent = kmT("km_copy");
    sor.querySelector("button").addEventListener("click", () => masol(keplet));
    nyv.querySelector(".km-nyelvek").appendChild(sor);
  }
  ki.appendChild(nyv);
}

const KM_PELDAK = {
  hu: ["=FKERES(A2;Árak!A2:C100;3)", "=HAHIBA(FKERES(A2;$E$2:$G$100;3;HAMIS);\"nincs\")", "=HA(B2>90;\"A\";HA(B2>75;\"B\";HA(B2>60;\"C\";\"D\")))", "=SZUMHATÖBB(C:C;A:A;\"Bratislava\";B:B;\">=\"&E1)*0,23"],
  sk: ["=VLOOKUP(A2;Ceny!A2:C100;3)", "=IFERROR(VLOOKUP(A2;$E$2:$G$100;3;FALSE);\"nie je\")", "=IF(B2>90;\"A\";IF(B2>75;\"B\";IF(B2>60;\"C\";\"D\")))", "=SUMIFS(C:C;A:A;\"Bratislava\";B:B;\">=\"&E1)*0,23"],
  en: ["=VLOOKUP(A2,Prices!A2:C100,3)", "=IFERROR(VLOOKUP(A2,$E$2:$G$100,3,FALSE),\"none\")", "=IF(B2>90,\"A\",IF(B2>75,\"B\",IF(B2>60,\"C\",\"D\")))", "=SUMIFS(C:C,A:A,\"Bratislava\",B:B,\">=\"&E1)*0.23"],
};
function kmPeldak() {
  const d = $("km-peldak");
  d.innerHTML = "";
  const s = document.createElement("span");
  s.textContent = kmT("km_example") + ":";
  d.appendChild(s);
  KM_PELDAK[nyelv].forEach((p) => {
    const g = document.createElement("button");
    g.type = "button";
    g.className = "ai-pelda kod";
    g.textContent = p;
    g.addEventListener("click", () => { $("km-be").value = p; kmRajzol(); });
    d.appendChild(g);
  });
}

let kmIdozito;
$("km-be").addEventListener("input", () => { clearTimeout(kmIdozito); kmIdozito = setTimeout(kmRajzol, 250); });
forditasHookok.push(() => { kmPeldak(); kmRajzol(); });
kmPeldak();
