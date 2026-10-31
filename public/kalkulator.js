/*
  KALKULÁTOROK
  ============
  Minden kalkulátor azonnal újraszámol, ahogy gépelsz.
  Mindegyikhez kiírjuk a megfelelő Excel képletet is, az aktuális nyelven
  (a képleteket szlovák formában írjuk: angol nevek + ;  – lásd kepletNyelven az app.js-ben).
*/

// ÁFA kulcsok nyelvenként (az első az alapértelmezett)
const AFA_KULCSOK = { hu: [27, 18, 5], sk: [23, 19, 5], en: [20, 5, 0] };

// Képletek: [képlet, magyarázó szöveg kulcsa]
const KALK_KEPLETEK = {
  afa:      { kepletek: ["=A2*(1+B2)", "=A2/(1+B2)"], jelmagyarazat: "vat_legend" },
  szazalek: { kepletek: ["=A2/100*B2", "=A2/B2", "=(B2-A2)/A2"], jelmagyarazat: "pct_legend" },
  munka:    { kepletek: ["=MOD(B2-A2; 1)*24-C2/60"], jelmagyarazat: "work_legend" },
  datum:    { kepletek: ["=NETWORKDAYS(A2; B2)", "=B2-A2"], jelmagyarazat: "date_legend" },
  hitel:    { kepletek: ["=PMT(B2/12; C2; -A2)"], jelmagyarazat: "loan_legend" },
};

let afaIrany = "netto";
let afaNyelv = null;

const ertek = (id) => parseFloat(String($(id).value).replace(",", ".")) || 0;
const kiir = (id, szoveg) => ($(id).textContent = szoveg);
const penz = (x) => (isFinite(x) ? szam(x, Math.abs(x) >= 1000 ? 0 : 2) : "–");

/* ---------- ÁFA ---------- */
function afaSzamol() {
  const osszeg = ertek("afa-osszeg");
  const kulcs = ertek("afa-kulcs") / 100;
  const netto = afaIrany === "netto" ? osszeg : osszeg / (1 + kulcs);
  const brutto = netto * (1 + kulcs);
  kiir("afa-netto", penz(netto));
  kiir("afa-ado", penz(brutto - netto));
  kiir("afa-brutto", penz(brutto));
  document.querySelectorAll("#afa-kulcsok .cimke").forEach((c) => c.classList.toggle("aktiv", +c.dataset.kulcs === ertek("afa-kulcs")));
}

function afaKulcsokRajzol() {
  // Nyelvváltáskor az alapértelmezett kulcsot is átállítjuk (HU 27%, SK 23%, EN 20%)
  if (afaNyelv !== nyelv) {
    if (afaNyelv === null || AFA_KULCSOK[afaNyelv].includes(ertek("afa-kulcs"))) $("afa-kulcs").value = AFA_KULCSOK[nyelv][0];
    afaNyelv = nyelv;
  }
  const doboz = $("afa-kulcsok");
  doboz.innerHTML = "";
  for (const k of AFA_KULCSOK[nyelv]) {
    const gomb = document.createElement("button");
    gomb.type = "button";
    gomb.className = "cimke";
    gomb.dataset.kulcs = k;
    gomb.textContent = k + " %";
    gomb.addEventListener("click", () => { $("afa-kulcs").value = k; afaSzamol(); });
    doboz.appendChild(gomb);
  }
}

document.querySelectorAll("#kalk-afa .kapcsolo button").forEach((gomb) =>
  gomb.addEventListener("click", () => {
    afaIrany = gomb.dataset.irany;
    document.querySelectorAll("#kalk-afa .kapcsolo button").forEach((g) => g.classList.toggle("aktiv", g === gomb));
    afaSzamol();
  })
);

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

/* ---------- Dátum ---------- */
function munkanapok(tol, ig) {
  // Mint az Excel ÖSSZ.MUNKANAP: mindkét végpontot beleszámolja, hétfő–péntek
  let elojel = 1;
  if (ig < tol) { [tol, ig] = [ig, tol]; elojel = -1; }
  let db = 0;
  const d = new Date(tol);
  while (d <= ig) {
    const n = d.getUTCDay();
    if (n !== 0 && n !== 6) db++;
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return db * elojel;
}
function datumSzamol() {
  const tol = $("dt-tol").valueAsDate, ig = $("dt-ig").valueAsDate;
  if (!tol || !ig) { ["dt-munkanap", "dt-nap", "dt-het"].forEach((id) => kiir(id, "–")); return; }
  const napok = Math.round((ig - tol) / 864e5);
  kiir("dt-munkanap", Math.abs(napok) > 36600 ? "–" : munkanapok(tol, ig));
  kiir("dt-nap", napok);
  kiir("dt-het", szam(napok / 7, 1));
}

/* ---------- Hitel ---------- */
function hitelSzamol() {
  const osszeg = ertek("hi-osszeg");
  const havonta = ertek("hi-kamat") / 100 / 12;
  const n = Math.max(1, Math.round(ertek("hi-honap")));
  const havi = havonta ? osszeg * havonta / (1 - Math.pow(1 + havonta, -n)) : osszeg / n;
  const ossz = havi * n;
  kiir("hi-havi", penz(havi));
  kiir("hi-ossz", penz(ossz));
  kiir("hi-kamatossz", penz(ossz - osszeg));
  const tokeArany = ossz ? osszeg / ossz * 100 : 100;
  $("hi-sav-toke").style.width = tokeArany + "%";
  $("hi-sav-kamat").style.width = 100 - tokeArany + "%";
}

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
  afaSzamol();
  szazalekSzamol();
  munkaSzamol();
  datumSzamol();
  hitelSzamol();
}

// Az app.js ezt hívja nyelvváltáskor
function kalkulatorFrissit() {
  afaKulcsokRajzol();
  kalkKepletekRajzol();
  mindentSzamol();
}

// Alapértékek: ma és a hónap utolsó napja
(() => {
  const ma = new Date();
  const ho = new Date(ma.getFullYear(), ma.getMonth() + 1, 0);
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  $("dt-tol").value = iso(ma);
  $("dt-ig").value = iso(ho);
})();

document.querySelectorAll("#oldal-szamolas input").forEach((el) => el.addEventListener("input", mindentSzamol));
kalkulatorFrissit();
