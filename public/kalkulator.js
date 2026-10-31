/*
  KALKULÁTOROK
  ============
  Minden kalkulátor azonnal újraszámol, ahogy gépelsz.
  Mindegyikhez kiírjuk a megfelelő Excel képletet is, az aktuális nyelven
  (a képleteket szlovák formában írjuk: angol nevek + ;  – lásd kepletNyelven az app.js-ben).
*/

// Képletek és magyarázatuk
const KALK_KEPLETEK = {
  valto:    { kepletek: ["=A2*B2"], jelmagyarazat: "conv_legend" },
  szazalek: { kepletek: ["=A2/100*B2", "=A2/B2", "=(B2-A2)/A2"], jelmagyarazat: "pct_legend" },
  munka:    { kepletek: ["=MOD(B2-A2; 1)*24-C2/60"], jelmagyarazat: "work_legend" },
  datum:    { kepletek: ["=NETWORKDAYS(A2; B2; H2:H20)", "=B2-A2"], jelmagyarazat: "date_legend" },
  excel:    { kepletek: ['=COLUMN(INDIRECT(A2 & "1"))', '=SUBSTITUTE(ADDRESS(1; A2; 4); "1"; "")'], jelmagyarazat: "xl_legend" },
};

const ertek = (id) => parseFloat(String($(id).value).replace(",", ".")) || 0;
const kiir = (id, szoveg) => ($(id).textContent = szoveg);
const isoNap = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/* ---------- Pénzváltó (EKB árfolyammal) ---------- */
const VALUTA_SORREND = ["EUR", "HUF", "USD", "CZK", "GBP", "CHF", "PLN", "RON", "SEK", "NOK", "DKK", "JPY", "CNY", "CAD", "AUD", "TRY"];
let valtoKitoltve = false;

function valtoListakRajzol() {
  if (!window.ARFOLYAM || valtoKitoltve) return;
  const kodok = Object.keys(ARFOLYAM.arfolyamok).sort((a, b) => {
    const ia = VALUTA_SORREND.indexOf(a), ib = VALUTA_SORREND.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  });
  for (const id of ["va-mibol", "va-mibe"]) {
    $(id).innerHTML = "";
    for (const k of kodok) $(id).add(new Option(k, k));
  }
  $("va-mibol").value = "EUR";
  $("va-mibe").value = nyelv === "sk" ? "USD" : "HUF";
  valtoKitoltve = true;
}

function valtoSzamol() {
  if (!window.ARFOLYAM) {
    kiir("va-eredmeny", "–"); kiir("va-arfolyam", "–");
    $("va-megj").textContent = window.ARFOLYAM_HIBA ? t("fx_error") : t("fx_loading");
    return;
  }
  const r = ARFOLYAM.arfolyamok;
  const mibol = $("va-mibol").value, mibe = $("va-mibe").value;
  const arfolyam = r[mibe] / r[mibol];         // 1 egység "miből" = ennyi "mibe"
  const eredmeny = ertek("va-osszeg") * arfolyam;
  kiir("va-eredmeny", szam(eredmeny, Math.abs(eredmeny) >= 1000 ? 0 : 2) + " " + mibe);
  kiir("va-arfolyam", `1 ${mibol} = ${szam(arfolyam, arfolyam >= 100 ? 2 : 4)} ${mibe}`);
  $("va-megj").textContent = t("conv_note", { date: new Date(ARFOLYAM.datum).toLocaleDateString(locale()) });
}

$("va-csere").addEventListener("click", () => {
  const a = $("va-mibol").value;
  $("va-mibol").value = $("va-mibe").value;
  $("va-mibe").value = a;
  valtoSzamol();
});
["va-mibol", "va-mibe"].forEach((id) => $(id).addEventListener("change", valtoSzamol));

// Az app.js hívja, amikor megjöttek az árfolyamok
function valtoFrissit() {
  valtoListakRajzol();
  valtoSzamol();
}

/* ---------- Százalék ---------- */
function szazalekSzamol() {
  const [x1, y1, x2, y2, x3, y3] = ["sz1-x", "sz1-y", "sz2-x", "sz2-y", "sz3-x", "sz3-y"].map(ertek);
  kiir("sz1-e", szam(x1 / 100 * y1, 2));
  kiir("sz2-e", y2 ? szam(x2 / y2 * 100, 2) + " %" : "–");
  const valtozas = x3 ? (y3 - x3) / x3 * 100 : NaN;
  kiir("sz3-e", isFinite(valtozas) ? (valtozas > 0 ? "+" : "") + szam(valtozas, 2) + " %" : "–");
  $("sz3-e").className = valtozas > 0 ? "pozitiv" : valtozas < 0 ? "negativ" : "";
}

/* ---------- Munkaidő ---------- */
function percbe(ido) {
  const [o, p] = (ido || "0:0").split(":").map(Number);
  return o * 60 + p;
}
function oraPerc(perc) {
  const o = Math.floor(perc / 60), p = Math.round(perc % 60);
  return `${o}:${String(p).padStart(2, "0")}`;
}
function munkaSzamol() {
  let perc = percbe($("mu-vege").value) - percbe($("mu-kezd").value);
  if (perc < 0) perc += 24 * 60; // éjfélen átnyúló műszak
  perc = Math.max(0, perc - ertek("mu-szunet"));
  kiir("mu-ido", oraPerc(perc));
  kiir("mu-tizedes", szam(perc / 60, 2));
  kiir("mu-het", oraPerc(perc * 5));
}

/* ---------- Dátum (munkanapok, ünnepnapokkal) ---------- */
let datumUnnep = null; // "", "hu", "sk" – alapból a nyelv szerint

function helyiDatum(ertekStr) {
  if (!ertekStr) return null;
  const [e, h, n] = ertekStr.split("-").map(Number);
  return new Date(e, h - 1, n);
}

// Mint az Excel ÖSSZ.MUNKANAP: mindkét végpontot beleszámolja, hétfő–péntek, ünnepek nélkül
function munkanapok(tol, ig, orszag) {
  let elojel = 1;
  if (ig < tol) { [tol, ig] = [ig, tol]; elojel = -1; }
  let db = 0;
  for (const d = new Date(tol); d <= ig; d.setDate(d.getDate() + 1)) {
    const n = d.getDay();
    if (n !== 0 && n !== 6 && !unnepE(d, orszag)) db++;
  }
  return db * elojel;
}

function datumSzamol() {
  const tol = helyiDatum($("dt-tol").value), ig = helyiDatum($("dt-ig").value);
  document.querySelectorAll("#dt-unnep button").forEach((g) => g.classList.toggle("aktiv", g.dataset.orszag === datumUnnep));
  if (!tol || !ig) { ["dt-munkanap", "dt-nap", "dt-het"].forEach((id) => kiir(id, "–")); return; }
  const napok = Math.round((ig - tol) / 864e5);
  kiir("dt-munkanap", Math.abs(napok) > 36600 ? "–" : munkanapok(tol, ig, datumUnnep));
  kiir("dt-nap", napok);
  kiir("dt-het", szam(napok / 7, 1));
}

document.querySelectorAll("#dt-unnep button").forEach((g) =>
  g.addEventListener("click", () => { datumUnnep = g.dataset.orszag; datumSzamol(); })
);

/* ---------- Excel segéd ---------- */
function betubolSzam(betu) {
  betu = betu.toUpperCase().replace(/[^A-Z]/g, "");
  if (!betu) return null;
  let n = 0;
  for (const ch of betu) n = n * 26 + (ch.charCodeAt(0) - 64);
  return n <= 16384 ? n : null;
}
function szambolBetu(n) {
  let s = "";
  for (; n > 0; n = Math.floor((n - 1) / 26)) s = String.fromCharCode(65 + ((n - 1) % 26)) + s;
  return s;
}
// Excel sorszám: 1899-12-30 a nulladik nap (az Excel 1900-as szökőév-hibája miatt)
const EXCEL_NULLA = Date.UTC(1899, 11, 30);
// (Az Excel 1900.02.29-et is létezőnek tekinti, ezért 1900.03.01. előtt egy nappal eltolódik.)
function datumbolSorszam(d) {
  const n = Math.round((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - EXCEL_NULLA) / 864e5);
  return n < 61 ? n - 1 : n;
}
function sorszambolDatum(n) {
  const d = new Date(EXCEL_NULLA + (n < 61 ? n + 1 : n) * 864e5);
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

$("xs-betu").addEventListener("input", () => {
  const n = betubolSzam($("xs-betu").value);
  $("xs-betu").classList.toggle("hibas", n === null && $("xs-betu").value !== "");
  if (n) $("xs-szam").value = n;
});
$("xs-szam").addEventListener("input", () => {
  const n = Math.round(ertek("xs-szam"));
  if (n >= 1 && n <= 16384) $("xs-betu").value = szambolBetu(n);
});
$("xs-datum").addEventListener("input", () => {
  const d = helyiDatum($("xs-datum").value);
  if (d) $("xs-sorszam").value = datumbolSorszam(d);
});
$("xs-sorszam").addEventListener("input", () => {
  const n = Math.round(ertek("xs-sorszam"));
  if (n >= 1 && n <= 2958465) $("xs-datum").value = isoNap(sorszambolDatum(n));
});

/* ---------- Képletek és indulás ---------- */
function kalkKepletekRajzol() {
  document.querySelectorAll(".kalk-keplet").forEach((doboz) => {
    const adat = KALK_KEPLETEK[doboz.dataset.keplet];
    doboz.innerHTML = "";
    const cim = document.createElement("div");
    cim.className = "kalk-keplet-cim";
    cim.textContent = t("formula_label") + " · " + t(adat.jelmagyarazat);
    doboz.appendChild(cim);
    adat.kepletek.forEach((k) => doboz.appendChild(kepletsor(kepletNyelven(k))));
  });
}

function mindentSzamol() {
  valtoSzamol();
  szazalekSzamol();
  munkaSzamol();
  datumSzamol();
}

// Az app.js ezt hívja nyelvváltáskor
function kalkulatorFrissit() {
  if (datumUnnep === null) datumUnnep = nyelv === "sk" ? "sk" : "hu";
  kalkKepletekRajzol();
  mindentSzamol();
}

// Alapértékek: ma és a hónap utolsó napja
(() => {
  const ma = new Date();
  $("dt-tol").value = isoNap(ma);
  $("dt-ig").value = isoNap(new Date(ma.getFullYear(), ma.getMonth() + 1, 0));
  $("xs-datum").value = isoNap(ma);
  $("xs-sorszam").value = datumbolSorszam(ma);
})();

document.querySelectorAll("#oldal-szamolas input").forEach((el) => el.addEventListener("input", mindentSzamol));
kalkulatorFrissit();
valtoFrissit();
