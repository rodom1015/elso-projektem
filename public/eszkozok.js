/*
  ESZKÖZÖK
  ========
  1. Képletfordító: magyar ↔ szlovák ↔ angol Excel képletek
     (függvénynevek, IGAZ/HAMIS, hibaértékek, elválasztó ; ↔ , és tizedesjel)
  2. Excel eszközök (SheetJS-sel, teljesen a böngészőben):
     összehasonlítás, ismétlődések, átalakítás, egyesítés
*/

/* ======================================================
   1. KÉPLETFORDÍTÓ
   ====================================================== */

const EN_HU = {}, HU_EN = {};
for (const fv of FUGGVENYEK) {
  if (fv.hu.includes(" ") || fv.en.includes(" ")) continue;
  EN_HU[fv.en] = fv.hu;
}
Object.assign(EN_HU, EXTRA_FUGGVENYNEVEK);
for (const [en, hu] of Object.entries(EN_HU)) HU_EN[hu] = en;
const HIBA_EN_HU = HIBAERTEKEK, HIBA_HU_EN = Object.fromEntries(Object.entries(HIBAERTEKEK).map(([a, b]) => [b, a]));
const BOOL_EN_HU = LOGIKAI, BOOL_HU_EN = Object.fromEntries(Object.entries(LOGIKAI).map(([a, b]) => [b, a]));

const AZONOSITO = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű_][A-Za-z0-9ÁÉÍÓÖŐÚÜŰáéíóöőúüű_.]*/;

// Melyik nyelvű a képlet? Magyar függvénynév → hu; pontosvessző → sk; különben en
function kepletNyelve(keplet) {
  let idezet = false, pontosvesszo = false;
  for (let i = 0; i < keplet.length; i++) {
    const ch = keplet[i];
    if (ch === '"') idezet = !idezet;
    if (idezet) continue;
    if (ch === ";") pontosvesszo = true;
    const m = keplet.slice(i).match(AZONOSITO);
    if (m && (i === 0 || !/[A-Za-z0-9_.ÁÉÍÓÖŐÚÜŰáéíóöőúüű$]/.test(keplet[i - 1]))) {
      const nev = m[0].toUpperCase();
      if (keplet[i + m[0].length] === "(" && HU_EN[nev] && HU_EN[nev] !== nev) return "hu";
      if (BOOL_HU_EN[nev]) return "hu";
      i += m[0].length - 1;
    }
  }
  if (/#(HIÁNYZIK|ÉRTÉK!|ZÉRÓOSZTÓ!|HIV!|NÉV\?|SZÁM!|NULLA!)/i.test(keplet)) return "hu";
  if (pontosvesszo) return "sk";
  // Függvény nélkül, tizedesvesszővel (pl. =B2*1,27) → magyar/szlovák
  if (!keplet.includes("(") && /\d,\d/.test(keplet.replace(/"[^"]*"/g, ""))) return "hu";
  return "en";
}

function kepletForditas(keplet, honnan, hova) {
  const ismeretlen = new Set();
  if (honnan === hova) return { ki: keplet, ismeretlen: [] };
  const magyarbol = honnan === "hu", magyarra = hova === "hu";
  const vesszosBol = honnan === "en", vesszosre = hova === "en";
  let ki = "";
  for (let i = 0; i < keplet.length; i++) {
    const ch = keplet[i];
    // Szöveg idézőjelben: változatlan
    if (ch === '"') {
      let j = i + 1;
      while (j < keplet.length && !(keplet[j] === '"' && keplet[j + 1] !== '"')) j += keplet[j] === '"' ? 2 : 1;
      ki += keplet.slice(i, j + 1); i = j; continue;
    }
    // 'Munkalap neve'!A1: változatlan
    if (ch === "'") {
      const j = keplet.indexOf("'", i + 1);
      if (j > 0) { ki += keplet.slice(i, j + 1); i = j; continue; }
    }
    // Hibaérték
    if (ch === "#") {
      const m = keplet.slice(i).match(/^#[A-ZÁÉÍÓÖŐÚÜŰ\/0-9]+[!?]?/i);
      if (m) {
        const fel = m[0].toUpperCase();
        let uj = fel;
        if (magyarbol && !magyarra) uj = HIBA_HU_EN[fel] || fel;
        if (!magyarbol && magyarra) uj = HIBA_EN_HU[fel] || fel;
        ki += uj; i += m[0].length - 1; continue;
      }
    }
    // Szám (tizedesjel átírása)
    if (/\d/.test(ch) && (i === 0 || !/[A-Za-z0-9_$ÁÉÍÓÖŐÚÜŰáéíóöőúüű.]/.test(keplet[i - 1]))) {
      const m = keplet.slice(i).match(vesszosBol ? /^\d+(\.\d+)?/ : /^\d+(,\d+)?/);
      // ha ':' követi (pl. 1:5 sortartomány), nem szám
      ki += vesszosBol === vesszosre ? m[0] : vesszosre ? m[0].replace(",", ".") : m[0].replace(".", ",");
      i += m[0].length - 1; continue;
    }
    // Elválasztó
    if (ch === ";" && !vesszosBol && vesszosre) { ki += ","; continue; }
    if (ch === "," && vesszosBol && !vesszosre) { ki += ";"; continue; }
    // Függvénynév vagy IGAZ/HAMIS
    if (/[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű_]/.test(ch) && (i === 0 || !/[A-Za-z0-9_.$ÁÉÍÓÖŐÚÜŰáéíóöőúüű]/.test(keplet[i - 1]))) {
      const m = keplet.slice(i).match(AZONOSITO);
      const nev = m[0], fel = nev.toUpperCase();
      const fuggveny = keplet[i + nev.length] === "(";
      let uj = nev;
      if (fuggveny) {
        if (magyarbol && !magyarra) { uj = HU_EN[fel] || (EN_HU[fel] ? fel : (ismeretlen.add(nev), nev)); }
        else if (!magyarbol && magyarra) { uj = EN_HU[fel] || (HU_EN[fel] ? fel : (ismeretlen.add(nev), nev)); }
      } else if (magyarbol && !magyarra && BOOL_HU_EN[fel]) uj = BOOL_HU_EN[fel];
      else if (!magyarbol && magyarra && BOOL_EN_HU[fel]) uj = BOOL_EN_HU[fel];
      ki += uj; i += nev.length - 1; continue;
    }
    ki += ch;
  }
  return { ki, ismeretlen: [...ismeretlen] };
}

let forditoCel = null;
function forditoFrissit() {
  const be = $("tr-be").value.trim();
  const honnan = be ? kepletNyelve(be) : null;
  if (forditoCel === null || forditoCel === honnan) forditoCel = honnan === "hu" ? (nyelv === "sk" ? "sk" : "en") : "hu";
  document.querySelectorAll("#tr-cel button").forEach((g) => g.classList.toggle("aktiv", g.dataset.cel === forditoCel));
  $("tr-felismert").textContent = honnan ? t("tr_detected", { lang: t("tr_" + honnan) }) : "";
  const doboz = $("tr-ki");
  doboz.innerHTML = "";
  $("tr-ismeretlen").hidden = true;
  if (!be) return;
  const { ki, ismeretlen } = kepletForditas(be.startsWith("=") ? be : "=" + be, honnan, forditoCel);
  doboz.appendChild(kepletsor(ki));
  if (ismeretlen.length) {
    $("tr-ismeretlen").hidden = false;
    $("tr-ismeretlen").textContent = "⚠️ " + t("tr_unknown", { list: ismeretlen.join(", ") });
  }
}
$("tr-be").addEventListener("input", forditoFrissit);
document.querySelectorAll("#tr-cel button").forEach((g) =>
  g.addEventListener("click", () => { forditoCel = g.dataset.cel; forditoFrissit(); })
);
$("tr-be").value = '=HA(FKERES(A2;$E$2:$G$100;3;HAMIS)>1,5;"OK";HAHIBA(B2/C2;0))';

/* ======================================================
   2. EXCEL ESZKÖZÖK
   ====================================================== */

let xtFul = "osszehasonlitas";
const xtMunkafuzetek = {}; // választó azonosító → { nev, wb } vagy lista

// Munkafüzet beolvasása gépről vagy a tárolt fájlok közül
async function munkafuzetBeolvas(forras) {
  await sheetjsBetolt();
  const adat = forras.file ? new Uint8Array(await forras.file.arrayBuffer()) : await fajlTartalom(forras.tarolt);
  const nev = forras.file ? forras.file.name : forras.tarolt.nev;
  if (/\.csv$/i.test(nev)) return { nev, wb: csvMunkafuzet(new TextDecoder().decode(adat), nev) };
  return { nev, wb: XLSX.read(adat, { type: "array", cellDates: true }) };
}

// CSV beolvasása (a ; vagy , elválasztót magától felismeri, idézőjeleket kezel)
function csvSorok(szoveg) {
  szoveg = szoveg.replace(/^﻿/, "");
  const elsoSor = szoveg.split(/\r?\n/)[0];
  const sep = (elsoSor.match(/;/g) || []).length >= (elsoSor.match(/,/g) || []).length ? ";" : ",";
  const sorok = [[]];
  let mezo = "", idezet = false;
  for (let i = 0; i < szoveg.length; i++) {
    const ch = szoveg[i];
    if (idezet) {
      if (ch === '"' && szoveg[i + 1] === '"') { mezo += '"'; i++; }
      else if (ch === '"') idezet = false;
      else mezo += ch;
    } else if (ch === '"') idezet = true;
    else if (ch === sep) { sorok[sorok.length - 1].push(mezo); mezo = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && szoveg[i + 1] === "\n") i++;
      sorok[sorok.length - 1].push(mezo); mezo = ""; sorok.push([]);
    } else mezo += ch;
  }
  sorok[sorok.length - 1].push(mezo);
  while (sorok.length && sorok[sorok.length - 1].every((x) => x === "")) sorok.pop();
  // számok számként
  return sorok.map((s) => s.map((x) => (/^-?\d+([.,]\d+)?$/.test(x.trim()) ? parseFloat(x.replace(",", ".")) : x)));
}
function csvMunkafuzet(szoveg, nev) {
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(csvSorok(szoveg)), lapNev(nev.replace(/\.csv$/i, "")));
  return wb;
}

const lapNev = (s, foglalt = new Set()) => {
  let alap = s.replace(/[\\\/\?\*\[\]:]/g, "_").slice(0, 31) || "Sheet";
  let nev = alap, i = 2;
  while (foglalt.has(nev.toLowerCase())) nev = alap.slice(0, 28) + "_" + i++;
  foglalt.add(nev.toLowerCase());
  return nev;
};
const fajlAlapnev = (nev) => nev.replace(/\.[^.]+$/, "");
const cellaSzoveg = (c) => (c == null ? "" : c.v instanceof Date ? c.v.toLocaleDateString(locale()) : String(c.w ?? c.v ?? ""));

/* ---------- Fájlválasztó (gépről vagy a tárolt fájlokból) ---------- */
function fajlValaszto(azon, cimkeKulcs, { tobb = false } = {}) {
  const doboz = document.createElement("div");
  doboz.className = "xt-valaszto";
  doboz.innerHTML = `
    <span class="seged-cim"></span>
    <div class="xt-valaszto-sor">
      <label class="gomb masodlagos kicsi"><input type="file" hidden accept=".xlsx,.xlsm,.xls,.ods,.csv" ${tobb ? "multiple" : ""}><span></span></label>
      <span class="halvany-szoveg xt-vagy"></span>
      <select></select>
    </div>
    <div class="xt-kivalasztva halvany-szoveg"></div>`;
  doboz.querySelector(".seged-cim").textContent = t(cimkeKulcs);
  doboz.querySelector("label span").textContent = t("xt_from_pc");
  const select = doboz.querySelector("select");
  const tablazatok = fajlok.filter((f) => tablazatE(f.nev));
  if (titkositoKulcs && tablazatok.length) {
    doboz.querySelector(".xt-vagy").textContent = t("xt_or_stored");
    if (tobb) select.multiple = true;
    if (!tobb) select.add(new Option(t("xt_none"), ""));
    tablazatok.forEach((f) => select.add(new Option(f.nev, f.id)));
  } else {
    select.hidden = true;
  }
  const kiir = () => {
    const lista = xtMunkafuzetek[azon] || [];
    doboz.querySelector(".xt-kivalasztva").textContent =
      lista.length > 1 ? t("xt_files_selected", { n: lista.length }) : lista.length ? "✓ " + (lista[0].file?.name || lista[0].tarolt.nev) : "";
    if (typeof xtValasztoValtozott === "function") xtValasztoValtozott(azon);
  };
  doboz.querySelector("input").addEventListener("change", (e) => {
    xtMunkafuzetek[azon] = [...e.target.files].map((file) => ({ file }));
    select.value = "";
    kiir();
  });
  select.addEventListener("change", () => {
    const idk = [...select.selectedOptions].map((o) => o.value).filter(Boolean);
    xtMunkafuzetek[azon] = idk.map((id) => ({ tarolt: fajlok.find((f) => f.id === id) }));
    kiir();
  });
  return doboz;
}

function lapValaszto(azon) {
  const l = document.createElement("label");
  l.className = "mezo";
  l.innerHTML = `<span></span><select id="${azon}"></select>`;
  l.querySelector("span").textContent = t("xt_sheet");
  return l;
}

/* ---------- Panelek ---------- */
const XT_PANELEK = {
  osszehasonlitas: {
    leiras: "xt_compare_desc",
    rajzol(p) {
      const sor = document.createElement("div");
      sor.className = "mezok-2";
      sor.append(fajlValaszto("a", "xt_pick"), fajlValaszto("b", "xt_pick2"));
      p.appendChild(sor);
    },
    async futtat(ki) {
      const [a, b] = [xtMunkafuzetek.a?.[0], xtMunkafuzetek.b?.[0]];
      if (!a || !b) return xtHiba(t("xt_need_two"));
      const [A, B] = await Promise.all([munkafuzetBeolvas(a), munkafuzetBeolvas(b)]);
      const elteresek = [];
      const lapok = [...new Set([...A.wb.SheetNames, ...B.wb.SheetNames])];
      for (const lap of lapok) {
        const la = A.wb.Sheets[lap], lb = B.wb.Sheets[lap];
        if (!la || !lb) { elteresek.push([lap, "–", la ? "✓" : "(nincs)", lb ? "✓" : "(nincs)"]); continue; }
        const ra = XLSX.utils.decode_range(la["!ref"] || "A1"), rb = XLSX.utils.decode_range(lb["!ref"] || "A1");
        for (let r = 0; r <= Math.max(ra.e.r, rb.e.r); r++) {
          for (let c = 0; c <= Math.max(ra.e.c, rb.e.c); c++) {
            const cim = XLSX.utils.encode_cell({ r, c });
            const va = cellaSzoveg(la[cim]), vb = cellaSzoveg(lb[cim]);
            if (va !== vb) elteresek.push([lap, cim, va, vb]);
          }
        }
      }
      ki.innerHTML = "";
      const osszegzes = document.createElement("p");
      osszegzes.className = "xt-osszegzes " + (elteresek.length ? "" : "jo");
      osszegzes.textContent = elteresek.length ? t("xt_diff_count", { n: elteresek.length }) : t("xt_no_diff");
      ki.appendChild(osszegzes);
      if (!elteresek.length) return;
      const fej = [t("xt_sheet"), t("xt_cell"), A.nev, B.nev];
      ki.appendChild(xtTabla(fej, elteresek.slice(0, 300), [2, 3]));
      ki.appendChild(xtLetoltGomb(t("xt_dl_report"), () => {
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([fej, ...elteresek]), "Diff");
        XLSX.writeFile(wb, `${fajlAlapnev(A.nev)}_vs_${fajlAlapnev(B.nev)}.xlsx`);
      }));
    },
  },

  ismetlodes: {
    leiras: "xt_dupes_desc",
    rajzol(p) {
      p.appendChild(fajlValaszto("d", "xt_pick"));
      const sor = document.createElement("div");
      sor.className = "mezok-2";
      sor.appendChild(lapValaszto("xt-d-lap"));
      const oszlop = document.createElement("label");
      oszlop.className = "mezo";
      oszlop.innerHTML = `<span></span><select id="xt-d-oszlop"></select>`;
      oszlop.querySelector("span").textContent = t("xt_column");
      sor.appendChild(oszlop);
      p.appendChild(sor);
    },
    async betoltve(mf) {
      const lap = $("xt-d-lap");
      lap.innerHTML = "";
      mf.wb.SheetNames.forEach((n) => lap.add(new Option(n, n)));
      lap.onchange = () => this.oszlopok(mf);
      this.oszlopok(mf);
    },
    oszlopok(mf) {
      const ws = mf.wb.Sheets[$("xt-d-lap").value];
      const sor1 = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: "" })[0] || [];
      const sel = $("xt-d-oszlop");
      sel.innerHTML = "";
      sel.add(new Option(t("xt_whole_row"), "-1"));
      sor1.forEach((fej, i) => sel.add(new Option(`${oszlopBetu(i)}${fej ? " – " + fej : ""}`, i)));
    },
    async futtat(ki) {
      const mf = this.mf;
      if (!mf) return xtHiba(t("xt_need_file"));
      const lapNeve = $("xt-d-lap").value, oszlop = +$("xt-d-oszlop").value;
      const sorok = XLSX.utils.sheet_to_json(mf.wb.Sheets[lapNeve], { header: 1, raw: true, defval: "" });
      const [fej, ...adat] = sorok;
      const kulcs = (s) => (oszlop < 0 ? JSON.stringify(s) : String(s[oszlop] ?? "").trim().toLowerCase());
      const szamlalo = new Map(), tiszta = [fej];
      let dupla = 0;
      for (const s of adat) {
        const k = kulcs(s);
        if (s.every((x) => x === "")) { tiszta.push(s); continue; }
        szamlalo.set(k, (szamlalo.get(k) || { db: 0, minta: oszlop < 0 ? s.join(" | ") : s[oszlop] }));
        const e = szamlalo.get(k);
        e.db++;
        if (e.db > 1) dupla++; else tiszta.push(s);
      }
      const ismetlodok = [...szamlalo.values()].filter((e) => e.db > 1).sort((a, b) => b.db - a.db);
      ki.innerHTML = "";
      const o = document.createElement("p");
      o.className = "xt-osszegzes " + (dupla ? "" : "jo");
      o.textContent = dupla ? t("xt_dupe_count", { n: dupla, u: ismetlodok.length }) : t("xt_no_dupes");
      ki.appendChild(o);
      if (!dupla) return;
      ki.appendChild(xtTabla([t("xt_column"), t("xt_times")], ismetlodok.slice(0, 100).map((e) => [String(e.minta), e.db + " " + t("xt_times")])));
      ki.appendChild(xtLetoltGomb(t("xt_dl_clean"), () => {
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(tiszta), lapNev(lapNeve));
        XLSX.writeFile(wb, fajlAlapnev(mf.nev) + "_clean.xlsx");
      }));
    },
  },

  atalakitas: {
    leiras: "xt_convert_desc",
    rajzol(p) {
      p.appendChild(fajlValaszto("c", "xt_pick"));
      const sor = document.createElement("div");
      sor.className = "xt-opciok";
      sor.innerHTML = `
        <div class="kapcsolo harom" id="xt-c-mod">
          <button type="button" class="aktiv" data-mod="csv"></button>
          <button type="button" data-mod="xlsx"></button>
          <button type="button" data-mod="ertek"></button>
        </div>
        <label class="xt-sep"><span></span>
          <select id="xt-c-sep"><option value=";">;</option><option value=",">,</option><option value="\t">TAB</option></select>
        </label>`;
      const [b1, b2, b3] = sor.querySelectorAll("button");
      b1.textContent = t("xt_to_csv"); b2.textContent = t("xt_to_xlsx"); b3.textContent = t("xt_values");
      sor.querySelector(".xt-sep span").textContent = t("xt_sep");
      sor.querySelectorAll("button").forEach((g) => g.addEventListener("click", () => {
        sor.querySelectorAll("button").forEach((x) => x.classList.toggle("aktiv", x === g));
        sor.querySelector(".xt-sep").hidden = g.dataset.mod !== "csv";
      }));
      if (nyelv === "en") sor.querySelector("select").value = ",";
      p.appendChild(sor);
    },
    async futtat(ki) {
      const forras = xtMunkafuzetek.c?.[0];
      if (!forras) return xtHiba(t("xt_need_file"));
      const mf = await munkafuzetBeolvas(forras);
      const mod = document.querySelector("#xt-c-mod .aktiv").dataset.mod;
      const alap = fajlAlapnev(mf.nev);
      if (mod === "csv") {
        const sep = $("xt-c-sep").value;
        mf.wb.SheetNames.forEach((lap, i) => {
          const csv = XLSX.utils.sheet_to_csv(mf.wb.Sheets[lap], { FS: sep });
          setTimeout(() => mentes(szovegbol("﻿" + csv), `${alap}${mf.wb.SheetNames.length > 1 ? "_" + lap : ""}.csv`), i * 400);
        });
      } else {
        const wb = XLSX.utils.book_new(), foglalt = new Set();
        for (const lap of mf.wb.SheetNames) {
          const aoa = XLSX.utils.sheet_to_json(mf.wb.Sheets[lap], { header: 1, raw: true, defval: null });
          XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(aoa), lapNev(lap, foglalt));
        }
        XLSX.writeFile(wb, `${alap}${mod === "ertek" ? "_values" : ""}.xlsx`);
      }
      ki.innerHTML = `<p class="xt-osszegzes jo"></p>`;
      ki.firstChild.textContent = t("xt_done");
    },
  },

  egyesites: {
    leiras: "xt_merge_desc",
    rajzol(p) {
      p.appendChild(fajlValaszto("m", "xt_pick", { tobb: true }));
      const sor = document.createElement("div");
      sor.className = "xt-opciok";
      sor.innerHTML = `<div class="kapcsolo" id="xt-m-mod"><button type="button" class="aktiv" data-mod="lapok"></button><button type="button" data-mod="egymas"></button></div>`;
      const [b1, b2] = sor.querySelectorAll("button");
      b1.textContent = t("xt_merge_sheets"); b2.textContent = t("xt_merge_stack");
      sor.querySelectorAll("button").forEach((g) => g.addEventListener("click", () =>
        sor.querySelectorAll("button").forEach((x) => x.classList.toggle("aktiv", x === g))));
      p.appendChild(sor);
    },
    async futtat(ki) {
      const lista = xtMunkafuzetek.m || [];
      if (lista.length < 2) return xtHiba(t("xt_need_two"));
      const mfek = [];
      for (const f of lista) mfek.push(await munkafuzetBeolvas(f));
      const wb = XLSX.utils.book_new(), foglalt = new Set();
      if (document.querySelector("#xt-m-mod .aktiv").dataset.mod === "lapok") {
        for (const mf of mfek) for (const lap of mf.wb.SheetNames)
          XLSX.utils.book_append_sheet(wb, mf.wb.Sheets[lap], lapNev(`${fajlAlapnev(mf.nev).slice(0, 15)}_${lap}`, foglalt));
      } else {
        const osszes = [];
        mfek.forEach((mf, i) => {
          const [fej, ...sorok] = XLSX.utils.sheet_to_json(mf.wb.Sheets[mf.wb.SheetNames[0]], { header: 1, raw: true, defval: null });
          if (i === 0 && fej) osszes.push([{ hu: "Fájl", sk: "Súbor", en: "File" }[nyelv], ...fej]);
          sorok.forEach((s) => osszes.push([mf.nev, ...s]));
        });
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(osszes), "Merged");
      }
      XLSX.writeFile(wb, "merged.xlsx");
      ki.innerHTML = `<p class="xt-osszegzes jo"></p>`;
      ki.firstChild.textContent = t("xt_done");
    },
  },
};

// Ha egy fájl kiválasztásra került: ahol kell, betöltjük (pl. munkalap-listához)
async function xtValasztoValtozott(azon) {
  const panel = XT_PANELEK[xtFul];
  if (azon === "d" && panel.betoltve && xtMunkafuzetek.d?.[0]) {
    try { panel.mf = await munkafuzetBeolvas(xtMunkafuzetek.d[0]); panel.betoltve(panel.mf); }
    catch { xtHiba(t("preview_failed")); }
  }
}

function xtTabla(fej, sorok, kiemelt = []) {
  const doboz = document.createElement("div");
  doboz.className = "xt-tabla-doboz";
  const tabla = document.createElement("table");
  tabla.className = "excel-tabla xt-tabla";
  const tr = tabla.createTHead().insertRow();
  fej.forEach((f) => { const th = document.createElement("th"); th.textContent = f; tr.appendChild(th); });
  const tb = tabla.createTBody();
  sorok.forEach((s) => {
    const r = tb.insertRow();
    s.forEach((v, i) => { const td = r.insertCell(); td.textContent = v; if (kiemelt.includes(i)) td.className = i === kiemelt[0] ? "regi" : "uj"; });
  });
  doboz.appendChild(tabla);
  return doboz;
}

function xtLetoltGomb(szoveg, fn) {
  const g = document.createElement("button");
  g.className = "gomb fo kicsi";
  g.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12M7 11l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span></span>`;
  g.querySelector("span").textContent = szoveg;
  g.addEventListener("click", fn);
  return g;
}

function xtHiba(uzenet) {
  $("xt-eredmeny").innerHTML = `<p class="hiba"></p>`;
  $("xt-eredmeny").firstChild.textContent = uzenet;
}

function eszkozokRajzol() {
  document.querySelectorAll("#xt-fulek button").forEach((g) => g.classList.toggle("aktiv", g.dataset.ful === xtFul));
  const panel = XT_PANELEK[xtFul];
  $("xt-leiras").textContent = t(panel.leiras);
  const p = $("xt-panel");
  p.innerHTML = "";
  panel.rajzol(p);
  const gomb = document.createElement("button");
  gomb.className = "gomb fo xt-futtat";
  gomb.innerHTML = `<span></span><span class="porgo" hidden></span>`;
  gomb.firstChild.textContent = t("xt_run");
  gomb.addEventListener("click", async () => {
    gomb.disabled = true;
    gomb.querySelector(".porgo").hidden = false;
    $("xt-eredmeny").innerHTML = "";
    try { await panel.futtat($("xt-eredmeny")); }
    catch (e) { console.error(e); e.status === 401 ? kilepes("session_expired") : xtHiba(t("preview_failed")); }
    finally { gomb.disabled = false; gomb.querySelector(".porgo").hidden = true; }
  });
  p.appendChild(gomb);
  $("xt-eredmeny").innerHTML = "";
  // a korábban kiválasztott fájlok elfelejtése fülváltáskor
  for (const k of Object.keys(xtMunkafuzetek)) delete xtMunkafuzetek[k];
  panel.mf = null;
}

document.querySelectorAll("#xt-fulek button").forEach((g) =>
  g.addEventListener("click", () => { xtFul = g.dataset.ful; eszkozokRajzol(); })
);

forditasHookok.push(() => { forditoFrissit(); eszkozokRajzol(); });
forditoFrissit();
eszkozokRajzol();
