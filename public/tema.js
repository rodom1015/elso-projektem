/*
  TÉMAVÁLTÓ – világos / sötét / automatikus, és 5 kiemelő szín
  A választás a böngészőben marad (localStorage). A <head>-ben lévő kis kód
  már betöltéskor beállítja, hogy ne villanjon fel a rossz téma.
*/

const temaMedia = matchMedia("(prefers-color-scheme: dark)");
let temaMod = "auto", temaSzin = "zold";
try { temaMod = localStorage.getItem("tema") || "auto"; temaSzin = localStorage.getItem("szin") || "zold"; } catch {}

function temaAlkalmaz() {
  const sotet = temaMod === "sotet" || (temaMod === "auto" && temaMedia.matches);
  document.documentElement.dataset.tema = sotet ? "sotet" : "vilagos";
  document.documentElement.dataset.szin = temaSzin;
  document.querySelectorAll("#tema-mod button").forEach((g) => g.classList.toggle("aktiv", g.dataset.mod === temaMod));
  document.querySelectorAll("#tema-szin button").forEach((g) => g.classList.toggle("aktiv", g.dataset.szin === temaSzin));
  if (typeof arfolyamRajzol === "function" && window.ARFOLYAM) arfolyamRajzol(); // a grafikon színe is változzon
}

temaMedia.addEventListener("change", () => temaMod === "auto" && temaAlkalmaz());

$("tema-gomb").addEventListener("click", (e) => {
  e.stopPropagation();
  $("tema-panel").hidden = !$("tema-panel").hidden;
});
document.addEventListener("click", (e) => {
  if (!$("tema-panel").hidden && !e.target.closest(".tema-doboz")) $("tema-panel").hidden = true;
});
document.querySelectorAll("#tema-mod button").forEach((g) =>
  g.addEventListener("click", () => {
    temaMod = g.dataset.mod;
    try { localStorage.setItem("tema", temaMod); } catch {}
    temaAlkalmaz();
  })
);
document.querySelectorAll("#tema-szin button").forEach((g) =>
  g.addEventListener("click", () => {
    temaSzin = g.dataset.szin;
    try { localStorage.setItem("szin", temaSzin); } catch {}
    temaAlkalmaz();
  })
);

temaAlkalmaz();
