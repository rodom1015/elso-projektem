/*
  KEZDŐLAP EXTRÁK: látogatószámláló, animált számlálók, újdonságok, lábléc
*/

const UJDONSAGOK = [
  ["2026-11-01", { hu: "+10 Excel makró (szétbontás fájlokra, változásnapló, egy PDF, sorszám…) és +6 Word makró (körlevél PDF-be, táblák Excelbe, fejezetek szétvágása…)", sk: "+10 makier pre Excel (rozdelenie do súborov, denník zmien, jedno PDF, číslovanie…) a +6 pre Word (hromadná korešpondencia do PDF, tabuľky do Excelu, rozdelenie kapitol…)", en: "+10 Excel macros (split into files, change log, one PDF, numbering…) and +6 Word macros (mail merge to PDFs, tables to Excel, split chapters…)" }],
  ["2026-11-01", { hu: "Power Query: +15 új M kód (összes munkalap, CSV mappa, SharePoint, fuzzy összefésülés, pivot…) és 10 recept kattintásról kattintásra", sk: "Power Query: +15 nových kódov M (všetky hárky, priečinok CSV, SharePoint, fuzzy zlúčenie, pivot…) a 10 receptov klik po kliku", en: "Power Query: +15 new M scripts (all sheets, CSV folder, SharePoint, fuzzy merge, pivot…) and 10 click-by-click recipes" }],
  ["2026-11-01", { hu: "Outlook súgó: beállítások lépésről lépésre (klasszikus és új Outlook), billentyűk, makrók, problémák; 9 új téma", sk: "Pomocník pre Outlook: nastavenia krok za krokom (klasický aj nový Outlook), skratky, makrá, problémy; 9 nových tém", en: "Outlook help: step-by-step settings (classic and new Outlook), shortcuts, macros, problems; 9 new themes" }],
  ["2026-11-01", { hu: "Új kezdőlap, nagy időjárás 7 napos előrejelzéssel és látogatószámláló", sk: "Nová úvodná stránka, veľké počasie na 7 dní a počítadlo návštev", en: "New home page, big 7-day weather and visitor counter" }],
  ["2026-10-31", { hu: "Power Query súgó: 15 M kód, 46 függvény, tippek és hibák", sk: "Pomocník Power Query: 15 kódov M, 46 funkcií, tipy a chyby", en: "Power Query help: 15 M scripts, 46 functions, tips and errors" }],
  ["2026-10-31", { hu: "Excel súgó egy oldalon: függvények, billentyűk, makrók, tippek", sk: "Pomocník pre Excel na jednej stránke: funkcie, skratky, makrá, tipy", en: "Excel help on one page: functions, shortcuts, macros, tips" }],
  ["2026-10-31", { hu: "Word makrók, Excel 2024 függvények, belépés QR kóddal", sk: "Makrá pre Word, funkcie Excelu 2024, prihlásenie QR kódom", en: "Word macros, Excel 2024 functions, QR code sign-in" }],
  ["2026-10-31", { hu: "Képletfordító, Excel eszközök, kimutatás-készítő, telepíthető app", sk: "Prekladač vzorcov, nástroje pre Excel, kontingenčné súhrny, inštalovateľná aplikácia", en: "Formula translator, Excel tools, pivot builder, installable app" }],
];

/* ======================================================
   LÁTOGATÓSZÁMLÁLÓ
   ====================================================== */
let latogatoAdat = null;

async function latogatasBetolt() {
  const ma = new Date().toISOString().slice(0, 10);
  let tulaj = false, mar = false;
  try { tulaj = localStorage.getItem("tulaj") === "1"; mar = localStorage.getItem("latogatas") === ma; } catch {}
  const szamol = !tulaj && !mar && !location.hash.startsWith("#/s/") && !location.hash.startsWith("#/qr/");
  try {
    const v = await fetch("/api/latogatas", { method: szamol ? "POST" : "GET" });
    if (!v.ok) throw 0;
    latogatoAdat = await v.json();
    if (szamol) try { localStorage.setItem("latogatas", ma); } catch {}
  } catch {
    latogatoAdat = null;
  }
  latogatoRajzol();
  szamlalokIndit();
}

function latogatoRajzol() {
  const a = latogatoAdat;
  $("lat-ma").textContent = a ? szam(a.ma, 0) : "–";
  $("lat-ossz").textContent = a ? szam(a.osszes, 0) : "–";
  $("lablec-latogatok").textContent = a ? t("footer_visitors", { ma: szam(a.ma, 0), ossz: szam(a.osszes, 0) }) : "";
  const doboz = $("lat-grafikon");
  doboz.innerHTML = "";
  if (!a) return;
  // az utolsó 30 nap, a hiányzó napok 0-val
  const napok = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    napok.push([d, (a.napok.find((x) => x.d === d) || {}).n || 0]);
  }
  const max = Math.max(1, ...napok.map(([, n]) => n));
  for (const [d, n] of napok) {
    const oszlop = document.createElement("div");
    oszlop.className = "lat-oszlop";
    oszlop.title = `${new Date(d + "T12:00:00").toLocaleDateString(locale(), { month: "short", day: "numeric" })}: ${n}`;
    oszlop.innerHTML = "<div></div>";
    oszlop.firstChild.style.height = Math.max(3, n / max * 100) + "%";
    doboz.appendChild(oszlop);
  }
}

/* ======================================================
   ANIMÁLT SZÁMLÁLÓK (amikor láthatóvá válnak)
   ====================================================== */
let szamlalokLatszanak = false;
function szamlaloErtekek() {
  return {
    fv: FUGGVENYEK.length,
    makro: MAKROK.length + WORD_MAKROK.length + OUTLOOK_MAKROK.length,
    mkod: PQ_PELDAK.length,
    latogato: latogatoAdat ? latogatoAdat.osszes : 0,
  };
}
function szamlalokIndit() {
  const ertekek = szamlaloErtekek();
  document.querySelectorAll("[data-szam]").forEach((el) => {
    const cel = ertekek[el.dataset.szam];
    if (!szamlalokLatszanak) { el.textContent = "0"; return; }
    const kezdo = parseInt(el.dataset.most || "0", 10), ido0 = performance.now();
    const lepes = (most) => {
      const p = Math.min(1, (most - ido0) / 1200), simitott = 1 - Math.pow(1 - p, 3);
      el.textContent = szam(Math.round(kezdo + (cel - kezdo) * simitott), 0);
      if (p < 1) requestAnimationFrame(lepes); else el.dataset.most = cel;
    };
    requestAnimationFrame(lepes);
  });
}
new IntersectionObserver((bejegyzesek) => {
  if (bejegyzesek.some((b) => b.isIntersecting) && !szamlalokLatszanak) { szamlalokLatszanak = true; szamlalokIndit(); }
}, { threshold: 0.4 }).observe($("szamlalok"));

/* ======================================================
   ÚJDONSÁGOK, LÁBLÉC
   ====================================================== */
function ujdonsagokRajzol() {
  const ul = $("ujdonsagok");
  ul.innerHTML = "";
  for (const [d, szoveg] of UJDONSAGOK) {
    const li = document.createElement("li");
    li.innerHTML = `<span class="uj-datum"></span><span></span>`;
    li.firstChild.textContent = new Date(d + "T12:00:00").toLocaleDateString(locale(), { month: "short", day: "numeric" });
    li.lastChild.textContent = szoveg[nyelv];
    ul.appendChild(li);
  }
  $("lablec-ev").textContent = new Date().getFullYear();
}

forditasHookok.push(() => { ujdonsagokRajzol(); latogatoRajzol(); });
ujdonsagokRajzol();
latogatasBetolt();
