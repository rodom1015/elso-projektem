/*
  KÉPLETMOTOR a táblázatszerkesztőhöz
  - Magyar és angol függvénynevek (a súgó szótárából), ; vagy , elválasztó
  - Hivatkozások: A1, $A$1, A1:B5, A:A, Lap1!A1, 'Lap neve'!A1:B2
  - Műveletek: + - * / ^ & % = <> < > <= >=
  - Kb. 70 gyakori függvény (SZUM, HA, FKERES, XKERES, SZUMHA, DARABTELI, INDEX, HOL.VAN, SZÖVEG…)
  A motor nem ismeri a megjelenítést: a táblázatszerkesztő adja meg, hogyan olvassa a cellákat.
*/

const KM = (() => {
  const HIBA = (kod) => ({ hiba: kod });
  const hibaE = (v) => v !== null && typeof v === "object" && "hiba" in v;
  const tartomanyE = (v) => v !== null && typeof v === "object" && "r1" in v;

  /* ---------- Dátumok: Excel sorszám (1900-as rendszer) ---------- */
  const NAP = 864e5, ALAP = Date.UTC(1899, 11, 30);
  const datumbol = (y, m, d) => (Date.UTC(y, m - 1, d) - ALAP) / NAP;
  const datumra = (n) => { const d = new Date(ALAP + Math.floor(n) * NAP); return { y: d.getUTCFullYear(), m: d.getUTCMonth() + 1, d: d.getUTCDate(), het: d.getUTCDay() }; };
  const ma = () => { const d = new Date(); return datumbol(d.getFullYear(), d.getMonth() + 1, d.getDate()); };

  /* ---------- Oszlopbetűk ---------- */
  const oszlopSzam = (betu) => [...betu.toUpperCase()].reduce((s, ch) => s * 26 + ch.charCodeAt(0) - 64, 0) - 1;
  const oszlopBetuje = (c) => { let s = ""; c++; while (c > 0) { const m = (c - 1) % 26; s = String.fromCharCode(65 + m) + s; c = Math.floor((c - 1) / 26); } return s; };

  /* ======================================================
     TOKENIZÁLÓ
     ====================================================== */
  const BETU = "A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüűÄäÔôČčĎďĽľĹĺŇňŔŕŠšŤťŽžÝý_";
  const NEV_RE = new RegExp(`^[${BETU}][${BETU}0-9.]*`);
  const LAP_RE = new RegExp(`^(?:'((?:[^']|'')+)'|([${BETU}0-9.]+))!`);

  function tokenek(src, tizedesVesszo) {
    const ki = [];
    let i = 0;
    while (i < src.length) {
      const ch = src[i];
      if (/\s/.test(ch)) { i++; continue; }
      const maradek = src.slice(i);
      // szöveg
      if (ch === '"') {
        let j = i + 1, s = "";
        for (;;) {
          if (j >= src.length) throw HIBA("#VALUE!");
          if (src[j] === '"') { if (src[j + 1] === '"') { s += '"'; j += 2; continue; } break; }
          s += src[j++];
        }
        ki.push({ t: "str", v: s }); i = j + 1; continue;
      }
      // hibaérték
      if (ch === "#") {
        const m = maradek.match(/^#[A-ZÁÉÍÓÖŐÚÜŰ\/0-9]+[!?]?/i);
        if (m) { ki.push({ t: "err", v: m[0].toUpperCase() }); i += m[0].length; continue; }
      }
      // hivatkozás (opcionális munkalapnévvel)
      let lap = null, eltolas = 0;
      const lm = maradek.match(LAP_RE);
      if (lm) { lap = (lm[1] ?? lm[2]).replace(/''/g, "'"); eltolas = lm[0].length; }
      const ref = maradek.slice(eltolas);
      const tm = ref.match(/^\$?([A-Za-z]{1,3})\$?(\d+)(?::\$?([A-Za-z]{1,3})\$?(\d+))?/);
      if (tm && !/^[(A-Za-z0-9_.]/.test(ref.slice(tm[0].length)) ) {
        const r1 = +tm[2] - 1, c1 = oszlopSzam(tm[1]);
        const r2 = tm[3] ? +tm[4] - 1 : r1, c2 = tm[3] ? oszlopSzam(tm[3]) : c1;
        ki.push({ t: "ref", lap, r1: Math.min(r1, r2), c1: Math.min(c1, c2), r2: Math.max(r1, r2), c2: Math.max(c1, c2), egy: !tm[3] });
        i += eltolas + tm[0].length; continue;
      }
      const om = ref.match(/^\$?([A-Za-z]{1,3}):\$?([A-Za-z]{1,3})(?![A-Za-z0-9(])/);
      if (om) {
        const c1 = oszlopSzam(om[1]), c2 = oszlopSzam(om[2]);
        ki.push({ t: "ref", lap, r1: 0, c1: Math.min(c1, c2), r2: Infinity, c2: Math.max(c1, c2), egy: false });
        i += eltolas + om[0].length; continue;
      }
      if (lap) throw HIBA("#REF!");
      // szám
      const szm = tizedesVesszo ? maradek.match(/^\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?/) : maradek.match(/^\d*\.?\d+(?:[eE][+-]?\d+)?/);
      if (szm && /[\d.]/.test(ch)) { ki.push({ t: "num", v: parseFloat(szm[0].replace(",", ".")) }); i += szm[0].length; continue; }
      // név (függvény vagy IGAZ/HAMIS)
      const nm = maradek.match(NEV_RE);
      if (nm) { ki.push({ t: "name", v: nm[0].toUpperCase() }); i += nm[0].length; continue; }
      // műveleti jelek
      const op = maradek.match(/^(<>|<=|>=|[-+*/^&%=<>(),;:])/);
      if (op) {
        const v = op[0];
        if (v === "(" || v === ")") ki.push({ t: v });
        else if (v === ";" || (v === "," && !tizedesVesszo)) ki.push({ t: "sep" });
        else if (v === ",") ki.push({ t: "sep" }); // tizedesvesszős módban a vessző is elválasztó, ha nem számban áll
        else ki.push({ t: "op", v });
        i += v.length; continue;
      }
      throw HIBA("#NAME?");
    }
    return ki;
  }

  /* ======================================================
     ELEMZŐ (precedencia szerint)
     ====================================================== */
  function elemez(src, tizedesVesszo) {
    const tk = tokenek(src, tizedesVesszo);
    let p = 0;
    const nez = () => tk[p], lep = () => tk[p++];
    const opE = (...v) => nez() && nez().t === "op" && v.includes(nez().v);

    function osszehasonlitas() {
      let b = osszefuz();
      while (opE("=", "<>", "<", ">", "<=", ">=")) { const o = lep().v; b = { t: "bin", o, b, j: osszefuz() }; }
      return b;
    }
    function osszefuz() {
      let b = osszead();
      while (opE("&")) { lep(); b = { t: "bin", o: "&", b, j: osszead() }; }
      return b;
    }
    function osszead() {
      let b = szoroz();
      while (opE("+", "-")) { const o = lep().v; b = { t: "bin", o, b, j: szoroz() }; }
      return b;
    }
    function szoroz() {
      let b = hatvany();
      while (opE("*", "/")) { const o = lep().v; b = { t: "bin", o, b, j: hatvany() }; }
      return b;
    }
    function hatvany() {
      let b = elojel();
      while (opE("^")) { lep(); b = { t: "bin", o: "^", b, j: elojel() }; }
      return b;
    }
    function elojel() {
      if (opE("-")) { lep(); return { t: "neg", x: elojel() }; }
      if (opE("+")) { lep(); return elojel(); }
      return szazalek();
    }
    function szazalek() {
      let x = alap();
      while (opE("%")) { lep(); x = { t: "pct", x }; }
      return x;
    }
    function alap() {
      const k = lep();
      if (!k) throw HIBA("#VALUE!");
      if (k.t === "num" || k.t === "str") return { t: "const", v: k.v };
      if (k.t === "err") return { t: "const", v: HIBA(HIBA_KANON[k.v] || k.v) };
      if (k.t === "ref") return { t: "ref", ...k };
      if (k.t === "(") { const x = osszehasonlitas(); if (!nez() || nez().t !== ")") throw HIBA("#VALUE!"); lep(); return x; }
      if (k.t === "name") {
        if (nez() && nez().t === "(") {
          lep();
          const args = [];
          if (nez() && nez().t === ")") { lep(); return { t: "fn", nev: k.v, args }; }
          for (;;) {
            if (nez() && (nez().t === "sep" || nez().t === ")")) args.push({ t: "ures" });
            else args.push(osszehasonlitas());
            const s = lep();
            if (!s) throw HIBA("#VALUE!");
            if (s.t === ")") break;
            if (s.t !== "sep") throw HIBA("#VALUE!");
          }
          return { t: "fn", nev: k.v, args };
        }
        if (BOOL[k.v] !== undefined) return { t: "const", v: BOOL[k.v] };
        return { t: "const", v: HIBA("#NAME?") };
      }
      throw HIBA("#VALUE!");
    }
    const fa = osszehasonlitas();
    if (p < tk.length) throw HIBA("#VALUE!");
    return fa;
  }

  const BOOL = { TRUE: true, FALSE: false, IGAZ: true, HAMIS: false };
  // magyar hibaértékek → angol (belül angolul számolunk)
  const HIBA_KANON = {};
  if (typeof HIBAERTEKEK !== "undefined") for (const [en, hu] of Object.entries(HIBAERTEKEK)) { HIBA_KANON[hu] = en; HIBA_KANON[en] = en; }

  /* ======================================================
     ÁTALAKÍTÁSOK
     ====================================================== */
  function szamma(v) {
    if (hibaE(v)) throw v;
    if (v === null || v === undefined || v === "") return 0;
    if (typeof v === "number") return v;
    if (typeof v === "boolean") return v ? 1 : 0;
    const s = String(v).trim().replace(/\s/g, "");
    const n = Number(s.replace(",", "."));
    if (s !== "" && isFinite(n)) return n;
    throw HIBA("#VALUE!");
  }
  function szovegge(v) {
    if (hibaE(v)) throw v;
    if (v === null || v === undefined) return "";
    if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
    if (typeof v === "number") return String(+v.toPrecision(15));
    return String(v);
  }
  function logikai(v) {
    if (hibaE(v)) throw v;
    if (typeof v === "boolean") return v;
    if (typeof v === "number") return v !== 0;
    if (v === null || v === "") return false;
    const f = String(v).toUpperCase();
    if (f === "TRUE" || f === "IGAZ") return true;
    if (f === "FALSE" || f === "HAMIS") return false;
    throw HIBA("#VALUE!");
  }
  // Excel-szerű összehasonlítás: szám < szöveg < logikai; szövegnél kis-nagybetű nem számít
  function hasonlit(a, b) {
    const rang = (x) => (typeof x === "number" ? 0 : typeof x === "string" ? 1 : typeof x === "boolean" ? 2 : 0);
    if (a === null || a === "") a = typeof b === "string" ? "" : typeof b === "boolean" ? false : 0;
    if (b === null || b === "") b = typeof a === "string" ? "" : typeof a === "boolean" ? false : 0;
    if (rang(a) !== rang(b)) return rang(a) - rang(b);
    if (typeof a === "string") return a.localeCompare(b, undefined, { sensitivity: "accent" });
    return a < b ? -1 : a > b ? 1 : 0;
  }

  /* ======================================================
     KIÉRTÉKELÉS
     ====================================================== */
  // ctx: { lap, cella(lap, r, c) → érték, hatar(lap) → {sorok, oszlopok}, lapLetezik(nev) }
  function kiertekel(fa, ctx) {
    try { return ertek(fa, ctx); }
    catch (e) { if (hibaE(e)) return e; throw e; }
  }

  function ertek(n, ctx) {
    switch (n.t) {
      case "const": return n.v;
      case "ures": return null;
      case "ref": {
        const tart = tartomany(n, ctx);
        if (n.egy) return ctx.cella(tart.lap, tart.r1, tart.c1);
        return tart;
      }
      case "neg": return -szamma(egyErtek(ertek(n.x, ctx), ctx));
      case "pct": return szamma(egyErtek(ertek(n.x, ctx), ctx)) / 100;
      case "bin": {
        const a = egyErtek(ertek(n.b, ctx), ctx), b = egyErtek(ertek(n.j, ctx), ctx);
        if (hibaE(a)) return a;
        if (hibaE(b)) return b;
        switch (n.o) {
          case "+": return szamma(a) + szamma(b);
          case "-": return szamma(a) - szamma(b);
          case "*": return szamma(a) * szamma(b);
          case "/": { const o = szamma(b); if (o === 0) return HIBA("#DIV/0!"); return szamma(a) / o; }
          case "^": { const r = Math.pow(szamma(a), szamma(b)); return isFinite(r) ? r : HIBA("#NUM!"); }
          case "&": return szovegge(a) + szovegge(b);
          case "=": return hasonlit(a, b) === 0;
          case "<>": return hasonlit(a, b) !== 0;
          case "<": return hasonlit(a, b) < 0;
          case ">": return hasonlit(a, b) > 0;
          case "<=": return hasonlit(a, b) <= 0;
          case ">=": return hasonlit(a, b) >= 0;
        }
        return HIBA("#VALUE!");
      }
      case "fn": {
        const nev = FV_ALIAS[n.nev] || n.nev;
        const f = FV[nev];
        if (!f) return HIBA("#NAME?");
        const args = n.args.map((a) => ertek(a, ctx));
        return f(args, ctx);
      }
    }
    return HIBA("#VALUE!");
  }

  function tartomany(n, ctx) {
    const lap = n.lap ?? ctx.lap;
    if (n.lap && !ctx.lapLetezik(n.lap)) throw HIBA("#REF!");
    const h = ctx.hatar(lap);
    return { lap, r1: n.r1, c1: n.c1, r2: Math.min(n.r2, h.sorok - 1), c2: n.c2 };
  }

  // Tartományból egyetlen érték (pl. =A1:A3+1 → az első cella), mint a régi Excel
  function egyErtek(v, ctx) {
    if (tartomanyE(v)) return ctx.cella(v.lap, v.r1, v.c1);
    return v;
  }

  // Minden érték egy listába (tartományokból is); tartományban az üres cellákat kihagyja
  function lapit(args, ctx, { uresIs = false } = {}) {
    const ki = [];
    for (const a of args) {
      if (tartomanyE(a)) {
        for (let r = a.r1; r <= a.r2; r++) for (let c = a.c1; c <= a.c2; c++) {
          const v = ctx.cella(a.lap, r, c);
          if (v !== null && v !== "" || uresIs) ki.push({ v, tart: true });
        }
      } else ki.push({ v: a, tart: false });
    }
    return ki;
  }
  // Számok a SZUM-szerű függvényekhez: tartományban csak a számok számítanak
  function szamok(args, ctx) {
    const ki = [];
    for (const { v, tart } of lapit(args, ctx)) {
      if (hibaE(v)) throw v;
      if (tart) { if (typeof v === "number") ki.push(v); }
      else if (v !== null) ki.push(szamma(v));
    }
    return ki;
  }
  // Tartomány 2D tömbként
  function tomb(a, ctx) {
    if (!tartomanyE(a)) return [[a]];
    const ki = [];
    for (let r = a.r1; r <= a.r2; r++) {
      const sor = [];
      for (let c = a.c1; c <= a.c2; c++) sor.push(ctx.cella(a.lap, r, c));
      ki.push(sor);
    }
    return ki;
  }
  const cellak = (a, ctx) => tomb(a, ctx).flat();

  // Feltétel a SZUMHA / DARABTELI függvényekhez: ">5", "<>x", "alma*", 10
  function feltetel(krit) {
    if (hibaE(krit)) throw krit;
    if (typeof krit === "number" || typeof krit === "boolean") return (v) => hasonlit(v, krit) === 0 && v !== null;
    const s = String(krit ?? "");
    const m = s.match(/^(<=|>=|<>|=|<|>)?(.*)$/s);
    const op = m[1] || "=", jobb = m[2];
    const szam = jobb.trim() !== "" && isFinite(Number(jobb.replace(",", "."))) ? Number(jobb.replace(",", ".")) : null;
    if (szam !== null) {
      return (v) => {
        if (typeof v !== "number") return op === "<>" ? true : false;
        return { "=": v === szam, "<>": v !== szam, "<": v < szam, ">": v > szam, "<=": v <= szam, ">=": v >= szam }[op];
      };
    }
    if ((op === "=" || op === "<>") && /[*?]/.test(jobb)) {
      const re = new RegExp("^" + jobb.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$", "is");
      return (v) => (op === "=") === re.test(szovegge(v ?? ""));
    }
    if (op === "=" && jobb === "") return (v) => v === null || v === "";
    if (op === "<>" && jobb === "") return (v) => v !== null && v !== "";
    return (v) => {
      if (typeof v !== "string") return op === "<>";
      const c = v.localeCompare(jobb, undefined, { sensitivity: "accent" });
      return { "=": c === 0, "<>": c !== 0, "<": c < 0, ">": c > 0, "<=": c <= 0, ">=": c >= 0 }[op];
    };
  }

  const kerekit = (x, d) => { const m = Math.pow(10, d); return Math.round((x + Math.sign(x) * Number.EPSILON) * m) / m; };
  const opcio = (a, alap) => (a === undefined || a === null ? alap : a);

  // Keresés egy listában: pontos (0), kisebb-egyenlő (1, rendezett), nagyobb-egyenlő (-1)
  function keres(ertekek, mit, mod) {
    if (mod === 0) {
      const f = typeof mit === "string" && /[*?]/.test(mit) ? feltetel("=" + mit) : (v) => hasonlit(v, mit) === 0 && v !== null;
      return ertekek.findIndex(f);
    }
    let talalt = -1;
    for (let i = 0; i < ertekek.length; i++) {
      const v = ertekek[i];
      if (v === null) continue;
      const h = hasonlit(v, mit);
      if (mod === 1 ? h <= 0 : h >= 0) talalt = i; else break;
    }
    return talalt;
  }

  /* ======================================================
     FÜGGVÉNYEK (angol néven; a magyar nevek a szótárból jönnek)
     ====================================================== */
  const FV = {
    SUM: (a, x) => szamok(a, x).reduce((s, v) => s + v, 0),
    AVERAGE: (a, x) => { const l = szamok(a, x); return l.length ? l.reduce((s, v) => s + v, 0) / l.length : HIBA("#DIV/0!"); },
    MIN: (a, x) => { const l = szamok(a, x); return l.length ? Math.min(...l) : 0; },
    MAX: (a, x) => { const l = szamok(a, x); return l.length ? Math.max(...l) : 0; },
    COUNT: (a, x) => lapit(a, x).filter(({ v, tart }) => typeof v === "number" || (!tart && v !== null && isFinite(Number(v)))).length,
    COUNTA: (a, x) => lapit(a, x).filter(({ v }) => v !== null && v !== "").length,
    COUNTBLANK: (a, x) => lapit(a, x, { uresIs: true }).filter(({ v }) => v === null || v === "").length,
    PRODUCT: (a, x) => szamok(a, x).reduce((s, v) => s * v, 1),
    MEDIAN: (a, x) => { const l = szamok(a, x).sort((p, q) => p - q); if (!l.length) return HIBA("#NUM!"); const k = l.length >> 1; return l.length % 2 ? l[k] : (l[k - 1] + l[k]) / 2; },
    LARGE: (a, x) => { const l = szamok([a[0]], x).sort((p, q) => q - p), k = szamma(a[1]); return k >= 1 && k <= l.length ? l[k - 1] : HIBA("#NUM!"); },
    SMALL: (a, x) => { const l = szamok([a[0]], x).sort((p, q) => p - q), k = szamma(a[1]); return k >= 1 && k <= l.length ? l[k - 1] : HIBA("#NUM!"); },
    STDEV: (a, x) => { const l = szamok(a, x); if (l.length < 2) return HIBA("#DIV/0!"); const m = l.reduce((s, v) => s + v, 0) / l.length; return Math.sqrt(l.reduce((s, v) => s + (v - m) ** 2, 0) / (l.length - 1)); },

    IF: (a, x) => { const f = logikai(egyErtek(a[0], x)); return f ? (a.length > 1 ? a[1] ?? 0 : true) : a.length > 2 ? a[2] ?? 0 : false; },
    IFERROR: (a, x) => { const v = egyErtek(a[0], x); return hibaE(v) ? opcio(a[1], "") : v; },
    IFNA: (a, x) => { const v = egyErtek(a[0], x); return hibaE(v) && v.hiba === "#N/A" ? opcio(a[1], "") : v; },
    IFS: (a, x) => { for (let i = 0; i + 1 < a.length; i += 2) if (logikai(egyErtek(a[i], x))) return a[i + 1]; return HIBA("#N/A"); },
    AND: (a, x) => lapit(a, x).every(({ v }) => logikai(v)),
    OR: (a, x) => lapit(a, x).some(({ v }) => logikai(v)),
    NOT: (a, x) => !logikai(egyErtek(a[0], x)),
    ISBLANK: (a, x) => { const v = egyErtek(a[0], x); return v === null; },
    ISNUMBER: (a, x) => typeof egyErtek(a[0], x) === "number",
    ISTEXT: (a, x) => typeof egyErtek(a[0], x) === "string",
    ISERROR: (a, x) => hibaE(egyErtek(a[0], x)),
    ISNA: (a, x) => { const v = egyErtek(a[0], x); return hibaE(v) && v.hiba === "#N/A"; },
    NA: () => HIBA("#N/A"),

    ROUND: (a, x) => kerekit(szamma(egyErtek(a[0], x)), szamma(opcio(a[1], 0))),
    ROUNDUP: (a, x) => { const n = szamma(egyErtek(a[0], x)), m = Math.pow(10, szamma(opcio(a[1], 0))); return Math.sign(n) * Math.ceil(Math.abs(n) * m - 1e-9) / m; },
    ROUNDDOWN: (a, x) => { const n = szamma(egyErtek(a[0], x)), m = Math.pow(10, szamma(opcio(a[1], 0))); return Math.sign(n) * Math.floor(Math.abs(n) * m + 1e-9) / m; },
    INT: (a, x) => Math.floor(szamma(egyErtek(a[0], x))),
    TRUNC: (a, x) => Math.trunc(szamma(egyErtek(a[0], x))),
    ABS: (a, x) => Math.abs(szamma(egyErtek(a[0], x))),
    MOD: (a, x) => { const n = szamma(egyErtek(a[0], x)), d = szamma(egyErtek(a[1], x)); return d === 0 ? HIBA("#DIV/0!") : n - d * Math.floor(n / d); },
    POWER: (a, x) => Math.pow(szamma(egyErtek(a[0], x)), szamma(egyErtek(a[1], x))),
    SQRT: (a, x) => { const n = szamma(egyErtek(a[0], x)); return n < 0 ? HIBA("#NUM!") : Math.sqrt(n); },
    PI: () => Math.PI,
    RAND: () => Math.random(),
    RANDBETWEEN: (a, x) => { const lo = Math.ceil(szamma(a[0])), hi = Math.floor(szamma(a[1])); return lo + Math.floor(Math.random() * (hi - lo + 1)); },
    SIGN: (a, x) => Math.sign(szamma(egyErtek(a[0], x))),

    SUMIF: (a, x) => {
      const f = feltetel(egyErtek(a[1], x)), felt = cellak(a[0], x), osszeg = a[2] ? cellak(a[2], x) : felt;
      return felt.reduce((s, v, i) => (f(v) && typeof osszeg[i] === "number" ? s + osszeg[i] : s), 0);
    },
    COUNTIF: (a, x) => { const f = feltetel(egyErtek(a[1], x)); return cellak(a[0], x).filter(f).length; },
    AVERAGEIF: (a, x) => {
      const f = feltetel(egyErtek(a[1], x)), felt = cellak(a[0], x), atl = a[2] ? cellak(a[2], x) : felt;
      const l = felt.map((v, i) => (f(v) && typeof atl[i] === "number" ? atl[i] : null)).filter((v) => v !== null);
      return l.length ? l.reduce((s, v) => s + v, 0) / l.length : HIBA("#DIV/0!");
    },
    SUMIFS: (a, x) => {
      const osszeg = cellak(a[0], x), parok = [];
      for (let i = 1; i + 1 < a.length; i += 2) parok.push([cellak(a[i], x), feltetel(egyErtek(a[i + 1], x))]);
      return osszeg.reduce((s, v, i) => (parok.every(([t, f]) => f(t[i])) && typeof v === "number" ? s + v : s), 0);
    },
    COUNTIFS: (a, x) => {
      const parok = [];
      for (let i = 0; i + 1 < a.length; i += 2) parok.push([cellak(a[i], x), feltetel(egyErtek(a[i + 1], x))]);
      return parok.length ? parok[0][0].filter((_, i) => parok.every(([t, f]) => f(t[i]))).length : 0;
    },
    AVERAGEIFS: (a, x) => {
      const atl = cellak(a[0], x), parok = [];
      for (let i = 1; i + 1 < a.length; i += 2) parok.push([cellak(a[i], x), feltetel(egyErtek(a[i + 1], x))]);
      const l = atl.filter((v, i) => typeof v === "number" && parok.every(([t, f]) => f(t[i])));
      return l.length ? l.reduce((s, v) => s + v, 0) / l.length : HIBA("#DIV/0!");
    },
    MAXIFS: (a, x) => { const e = cellak(a[0], x), p = []; for (let i = 1; i + 1 < a.length; i += 2) p.push([cellak(a[i], x), feltetel(egyErtek(a[i + 1], x))]); const l = e.filter((v, i) => typeof v === "number" && p.every(([t, f]) => f(t[i]))); return l.length ? Math.max(...l) : 0; },
    MINIFS: (a, x) => { const e = cellak(a[0], x), p = []; for (let i = 1; i + 1 < a.length; i += 2) p.push([cellak(a[i], x), feltetel(egyErtek(a[i + 1], x))]); const l = e.filter((v, i) => typeof v === "number" && p.every(([t, f]) => f(t[i]))); return l.length ? Math.min(...l) : 0; },

    VLOOKUP: (a, x) => {
      const mit = egyErtek(a[0], x), t = tomb(a[1], x), oszl = szamma(egyErtek(a[2], x));
      const pontos = a.length > 3 && a[3] !== null ? !logikai(egyErtek(a[3], x)) : false;
      if (oszl < 1 || oszl > (t[0] || []).length) return HIBA("#REF!");
      const i = keres(t.map((s) => s[0]), mit, pontos ? 0 : 1);
      return i < 0 ? HIBA("#N/A") : t[i][oszl - 1] ?? 0;
    },
    HLOOKUP: (a, x) => {
      const mit = egyErtek(a[0], x), t = tomb(a[1], x), sor = szamma(egyErtek(a[2], x));
      const pontos = a.length > 3 && a[3] !== null ? !logikai(egyErtek(a[3], x)) : false;
      if (sor < 1 || sor > t.length) return HIBA("#REF!");
      const i = keres(t[0], mit, pontos ? 0 : 1);
      return i < 0 ? HIBA("#N/A") : t[sor - 1][i] ?? 0;
    },
    XLOOKUP: (a, x) => {
      const mit = egyErtek(a[0], x), hol = cellak(a[1], x), mitAd = tomb(a[2], x);
      const mod = szamma(opcio(a[4], 0));
      const i = keres(hol, mit, mod === 0 ? 0 : mod === -1 ? 1 : -1);
      if (i < 0) return a.length > 3 && a[3] !== null ? a[3] : HIBA("#N/A");
      return mitAd.length === 1 ? mitAd[0][i] ?? 0 : (mitAd[i] || [])[0] ?? 0;
    },
    MATCH: (a, x) => {
      const mit = egyErtek(a[0], x), hol = cellak(a[1], x), tipus = szamma(opcio(a[2], 1));
      const i = keres(hol, mit, tipus === 0 ? 0 : tipus > 0 ? 1 : -1);
      return i < 0 ? HIBA("#N/A") : i + 1;
    },
    INDEX: (a, x) => {
      const t = tomb(a[0], x);
      let s = szamma(opcio(a[1], 0)), o = szamma(opcio(a[2], 0));
      if (t.length === 1 && a.length < 3) { o = s; s = 1; }
      if (s === 0) s = 1; if (o === 0) o = 1;
      if (s < 1 || s > t.length || o < 1 || o > t[0].length) return HIBA("#REF!");
      return t[s - 1][o - 1] ?? 0;
    },
    CHOOSE: (a, x) => { const i = szamma(egyErtek(a[0], x)); return i >= 1 && i < a.length ? a[i] : HIBA("#VALUE!"); },
    ROWS: (a) => (tartomanyE(a[0]) ? a[0].r2 - a[0].r1 + 1 : 1),
    COLUMNS: (a) => (tartomanyE(a[0]) ? a[0].c2 - a[0].c1 + 1 : 1),

    CONCATENATE: (a, x) => a.map((v) => szovegge(egyErtek(v, x))).join(""),
    CONCAT: (a, x) => lapit(a, x).map(({ v }) => szovegge(v)).join(""),
    TEXTJOIN: (a, x) => {
      const elv = szovegge(egyErtek(a[0], x)), kihagy = logikai(egyErtek(a[1], x));
      return lapit(a.slice(2), x, { uresIs: true }).map(({ v }) => szovegge(v)).filter((s) => !kihagy || s !== "").join(elv);
    },
    LEFT: (a, x) => szovegge(egyErtek(a[0], x)).slice(0, szamma(opcio(a[1], 1))),
    RIGHT: (a, x) => { const s = szovegge(egyErtek(a[0], x)), n = szamma(opcio(a[1], 1)); return n ? s.slice(-n) : ""; },
    MID: (a, x) => { const s = szovegge(egyErtek(a[0], x)), k = szamma(egyErtek(a[1], x)); return s.substr(k - 1, szamma(egyErtek(a[2], x))); },
    LEN: (a, x) => szovegge(egyErtek(a[0], x)).length,
    UPPER: (a, x) => szovegge(egyErtek(a[0], x)).toUpperCase(),
    LOWER: (a, x) => szovegge(egyErtek(a[0], x)).toLowerCase(),
    PROPER: (a, x) => szovegge(egyErtek(a[0], x)).toLowerCase().replace(/(^|[^\p{L}])(\p{L})/gu, (m, e, b) => e + b.toUpperCase()),
    TRIM: (a, x) => szovegge(egyErtek(a[0], x)).trim().replace(/ +/g, " "),
    SUBSTITUTE: (a, x) => {
      const s = szovegge(egyErtek(a[0], x)), regi = szovegge(egyErtek(a[1], x)), uj = szovegge(egyErtek(a[2], x));
      if (!regi) return s;
      if (a.length < 4) return s.split(regi).join(uj);
      let n = szamma(egyErtek(a[3], x)), i = -1;
      while (n-- > 0) { i = s.indexOf(regi, i + 1); if (i < 0) return s; }
      return s.slice(0, i) + uj + s.slice(i + regi.length);
    },
    FIND: (a, x) => { const i = szovegge(egyErtek(a[1], x)).indexOf(szovegge(egyErtek(a[0], x)), szamma(opcio(a[2], 1)) - 1); return i < 0 ? HIBA("#VALUE!") : i + 1; },
    SEARCH: (a, x) => { const i = szovegge(egyErtek(a[1], x)).toLowerCase().indexOf(szovegge(egyErtek(a[0], x)).toLowerCase(), szamma(opcio(a[2], 1)) - 1); return i < 0 ? HIBA("#VALUE!") : i + 1; },
    REPT: (a, x) => szovegge(egyErtek(a[0], x)).repeat(Math.max(0, szamma(egyErtek(a[1], x)))),
    EXACT: (a, x) => szovegge(egyErtek(a[0], x)) === szovegge(egyErtek(a[1], x)),
    VALUE: (a, x) => szamma(egyErtek(a[0], x)),
    TEXT: (a, x) => szovegFormaz(szamma(egyErtek(a[0], x)), szovegge(egyErtek(a[1], x))),

    TODAY: () => ma(),
    NOW: () => { const d = new Date(); return ma() + (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) / 86400; },
    DATE: (a, x) => datumbol(szamma(a[0]), szamma(a[1]), szamma(a[2])),
    YEAR: (a, x) => datumra(szamma(egyErtek(a[0], x))).y,
    MONTH: (a, x) => datumra(szamma(egyErtek(a[0], x))).m,
    DAY: (a, x) => datumra(szamma(egyErtek(a[0], x))).d,
    WEEKDAY: (a, x) => { const h = datumra(szamma(egyErtek(a[0], x))).het, t = szamma(opcio(a[1], 1)); return t === 2 ? ((h + 6) % 7) + 1 : t === 3 ? (h + 6) % 7 : h + 1; },
    EOMONTH: (a, x) => { const d = datumra(szamma(egyErtek(a[0], x))), m = szamma(egyErtek(a[1], x)); return datumbol(d.y, d.m + m + 1, 1) - 1; },
    EDATE: (a, x) => { const d = datumra(szamma(egyErtek(a[0], x))), m = szamma(egyErtek(a[1], x)); return datumbol(d.y, d.m + m, d.d); },
    DAYS: (a, x) => Math.floor(szamma(egyErtek(a[0], x))) - Math.floor(szamma(egyErtek(a[1], x))),
    NETWORKDAYS: (a, x) => {
      let k = Math.floor(szamma(egyErtek(a[0], x))), v = Math.floor(szamma(egyErtek(a[1], x))), jel = 1;
      if (k > v) { [k, v] = [v, k]; jel = -1; }
      const unnep = new Set(a[2] ? szamok([a[2]], x).map(Math.floor) : []);
      let n = 0;
      for (let d = k; d <= v; d++) { const h = datumra(d).het; if (h !== 0 && h !== 6 && !unnep.has(d)) n++; }
      return n * jel;
    },
  };
  FV["CEILING"] = (a, x) => { const n = szamma(egyErtek(a[0], x)), s = szamma(opcio(a[1], 1)); return s ? Math.ceil(n / s) * s : 0; };
  FV["FLOOR"] = (a, x) => { const n = szamma(egyErtek(a[0], x)), s = szamma(opcio(a[1], 1)); return s ? Math.floor(n / s) * s : 0; };

  // Egyszerű SZÖVEG() formátumok: "0", "0,00", "# ##0", "0%", "éééé.hh.nn", "yyyy-mm-dd"
  function szovegFormaz(n, f) {
    const kis = f.toLowerCase();
    if (/[éeyh]{2,}|nn|dd/.test(kis)) {
      const d = datumra(n), k2 = (v) => String(v).padStart(2, "0");
      return kis.replace(/éééé|yyyy/g, d.y).replace(/éé|yy/g, String(d.y).slice(-2)).replace(/hh|mm/g, k2(d.m)).replace(/nn|dd/g, k2(d.d));
    }
    const szazalek = f.includes("%");
    if (szazalek) n *= 100;
    const tized = (f.match(/[.,](0+)/) || [, ""])[1].length;
    const ezres = /#[ ,.]#/.test(f) || /# ?##0/.test(f);
    let s = n.toFixed(tized);
    if (ezres) s = Number(s).toLocaleString("hu-HU", { minimumFractionDigits: tized, maximumFractionDigits: tized });
    else if (/,0/.test(f)) s = s.replace(".", ",");
    return s + (szazalek ? "%" : "");
  }

  // Magyar (és egyéb) nevek → angol függvénynév
  const FV_ALIAS = {};
  function aliasokFrissit() {
    if (typeof HU_EN !== "undefined") for (const [hu, en] of Object.entries(HU_EN)) if (FV[en]) FV_ALIAS[hu] = en;
    Object.assign(FV_ALIAS, { "ÁTLAG": "AVERAGE", "SZUM": "SUM", "HA": "IF", "DARAB": "COUNT", "DARAB2": "COUNTA", "FKERES": "VLOOKUP" });
  }
  aliasokFrissit();

  // Egy képlet egyszer elemezve, utána gyorsítótárból
  const faTar = new Map();
  function keplet(src, tizedesVesszo) {
    const kulcs = (tizedesVesszo ? "v" : "p") + src;
    if (faTar.has(kulcs)) return faTar.get(kulcs);
    let fa;
    try { fa = elemez(src, tizedesVesszo); }
    catch (e) { fa = { t: "const", v: hibaE(e) ? e : HIBA("#VALUE!") }; }
    if (faTar.size > 5000) faTar.clear();
    faTar.set(kulcs, fa);
    return fa;
  }

  // Melyik cellákra hivatkozik egy képlet (a kijelöléshez és az átnevezéshez)
  return {
    keplet, kiertekel, HIBA, hibaE, tartomanyE, datumbol, datumra, oszlopSzam, oszlopBetuje,
    fuggvenyek: () => Object.keys(FV).sort(), aliasokFrissit, szamma,
  };
})();

if (typeof module !== "undefined") module.exports = KM;
