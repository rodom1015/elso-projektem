/*
  TÉMAVÁLTÓ – mód (világos / sötét / automatikus), 9 téma, háttér, betűméret, tömör nézet
  A választás a böngészőben marad (localStorage). A <head>-ben lévő kis kód már betöltéskor
  beállítja, hogy ne villanjon fel a rossz téma.
*/

const TEMAK = [
  ["zold", "#107c41", "#21a366", { hu: "Excel", sk: "Excel", en: "Excel" }],
  ["kek", "#1d4ed8", "#3b82f6", { hu: "Office kék", sk: "Office modrá", en: "Office blue" }],
  ["ocean", "#0e7490", "#06b6d4", { hu: "Óceán", sk: "Oceán", en: "Ocean" }],
  ["naplemente", "#ea580c", "#db2777", { hu: "Naplemente", sk: "Západ slnka", en: "Sunset" }],
  ["erdo", "#3f6212", "#65a30d", { hu: "Erdő", sk: "Les", en: "Forest" }],
  ["lila", "#6d28d9", "#a855f7", { hu: "Szőlő", sk: "Hrozno", en: "Grape" }],
  ["rozsa", "#be185d", "#ec4899", { hu: "Rózsa", sk: "Ruža", en: "Rose" }],
  ["grafit", "#334155", "#64748b", { hu: "Grafit", sk: "Grafit", en: "Graphite" }],
  ["unnepi", "#b91c1c", "#15803d", { hu: "Ünnepi ❄️", sk: "Sviatočná ❄️", en: "Festive ❄️" }],
];

const temaMedia = matchMedia("(prefers-color-scheme: dark)");
const tBeall = { tema: "auto", szin: "zold", hatter: "sima", meret: "normal", tomor: false };
try {
  tBeall.tema = localStorage.getItem("tema") || "auto";
  tBeall.szin = localStorage.getItem("szin") || "zold";
  if (tBeall.szin === "narancs") tBeall.szin = "naplemente"; // régi beállítás
  tBeall.hatter = localStorage.getItem("hatter") || "sima";
  tBeall.meret = localStorage.getItem("meret") || "normal";
  tBeall.tomor = localStorage.getItem("tomor") === "1";
} catch {}

function temaMent(kulcs, ertek) {
  tBeall[kulcs] = ertek;
  try { localStorage.setItem(kulcs, typeof ertek === "boolean" ? (ertek ? "1" : "0") : ertek); } catch {}
  temaAlkalmaz();
}

function temaAlkalmaz() {
  const d = document.documentElement.dataset;
  d.tema = tBeall.tema === "sotet" || (tBeall.tema === "auto" && temaMedia.matches) ? "sotet" : "vilagos";
  d.szin = tBeall.szin;
  d.hatter = tBeall.hatter;
  d.meret = tBeall.meret;
  if (tBeall.tomor) d.tomor = "1"; else delete d.tomor;
  document.querySelectorAll("#tema-mod button").forEach((g) => g.classList.toggle("aktiv", g.dataset.mod === tBeall.tema));
  document.querySelectorAll("#tema-szin button").forEach((g) => g.classList.toggle("aktiv", g.dataset.szin === tBeall.szin));
  document.querySelectorAll("#tema-hatter button").forEach((g) => g.classList.toggle("aktiv", g.dataset.hatter === tBeall.hatter));
  document.querySelectorAll("#tema-meret button").forEach((g) => g.classList.toggle("aktiv", g.dataset.meret === tBeall.meret));
  $("tema-tomor").checked = tBeall.tomor;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue("--sav-a").trim() || "#0c3b24";
}

function temaRacsRajzol() {
  const racs = $("tema-szin");
  racs.innerHTML = "";
  for (const [kod, a, b, nev] of TEMAK) {
    const g = document.createElement("button");
    g.type = "button";
    g.dataset.szin = kod;
    g.innerHTML = `<span class="tema-minta"></span><span></span>`;
    g.firstChild.style.background = `linear-gradient(135deg, ${a}, ${b})`;
    g.lastChild.textContent = nev[nyelv];
    g.addEventListener("click", () => temaMent("szin", kod));
    racs.appendChild(g);
  }
  temaAlkalmaz();
}

temaMedia.addEventListener("change", () => tBeall.tema === "auto" && temaAlkalmaz());
$("tema-gomb").addEventListener("click", (e) => { e.stopPropagation(); $("tema-panel").hidden = !$("tema-panel").hidden; });
document.addEventListener("click", (e) => { if (!$("tema-panel").hidden && !e.target.closest(".tema-doboz")) $("tema-panel").hidden = true; });
document.querySelectorAll("#tema-mod button").forEach((g) => g.addEventListener("click", () => temaMent("tema", g.dataset.mod)));
document.querySelectorAll("#tema-hatter button").forEach((g) => g.addEventListener("click", () => temaMent("hatter", g.dataset.hatter)));
document.querySelectorAll("#tema-meret button").forEach((g) => g.addEventListener("click", () => temaMent("meret", g.dataset.meret)));
$("tema-tomor").addEventListener("change", (e) => temaMent("tomor", e.target.checked));

forditasHookok.push(temaRacsRajzol);
temaRacsRajzol();
