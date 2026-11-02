/*
  MENÜ
  - Csoportok (Munkaterület, Súgók, Eszközök, Admin) nyitása-csukása – megjegyzi a böngésző
  - Telefonon: alsó menüsáv + balról kihúzható teljes menü
  - Morzsamenü: rodom › csoport › oldal
  - Névtelen statisztika: melyik oldalt nézik (csak ha a D1 adatbázis be van kapcsolva)
*/

let menuCsukva = [];
try { menuCsukva = JSON.parse(localStorage.getItem("menuCsukva") || "[]"); } catch {}

document.querySelectorAll(".menu-csoport").forEach((cs) => {
  cs.classList.toggle("csukva", menuCsukva.includes(cs.dataset.csoport));
  cs.querySelector(".menu-csoport-fej").addEventListener("click", () => {
    cs.classList.toggle("csukva");
    menuCsukva = [...document.querySelectorAll(".menu-csoport.csukva")].map((x) => x.dataset.csoport);
    try { localStorage.setItem("menuCsukva", JSON.stringify(menuCsukva)); } catch {}
  });
});

/* ---------- Telefonos fiók ---------- */
const menuNyit = (nyitva) => document.body.classList.toggle("menu-nyitva", nyitva);
$("menu-nyit").addEventListener("click", () => menuNyit(true));
$("menu-hatter").addEventListener("click", () => menuNyit(false));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") menuNyit(false); });
// Elhúzás balra = bezárás
let huzasX = null;
$("menu").closest(".oldalsav").addEventListener("touchstart", (e) => (huzasX = e.touches[0].clientX), { passive: true });
$("menu").closest(".oldalsav").addEventListener("touchend", (e) => {
  if (huzasX !== null && huzasX - e.changedTouches[0].clientX > 60) menuNyit(false);
  huzasX = null;
});

/* ---------- Névtelen statisztika ---------- */
const latottOldalak = new Set();
function esemenyKuld(tipus, nev) {
  try {
    if (localStorage.getItem("tulaj") === "1") return; // a saját látogatásaid nem számítanak
  } catch {}
  const tiszta = String(nev).replace(/[^\p{L}\p{N} .,:()/+&–-]/gu, "").trim().slice(0, 80);
  if (!tiszta) return;
  const adat = JSON.stringify({ t: tipus, n: tiszta });
  try {
    if (navigator.sendBeacon) navigator.sendBeacon("/api/esemeny", new Blob([adat], { type: "application/json" }));
    else fetch("/api/esemeny", { method: "POST", body: adat, headers: { "Content-Type": "application/json" }, keepalive: true });
  } catch {}
}

/* ---------- Oldalváltás után ---------- */
function menuOldalUtan(oldal) {
  menuNyit(false);
  const link = document.querySelector(`.oldalsav .menu-pont[data-oldal="${oldal}"]`);
  const csoport = link && link.closest(".menu-csoport");
  let fej = csoport && csoport.querySelector(".menu-csoport-fej span");
  if (fej && fej.textContent === t(OLDAL_NEVEK[oldal])) fej = null; // pl. Admin › Admin helyett csak Admin
  $("morzsa-csoport").hidden = $("morzsa-nyil2").hidden = !fej;
  if (fej) $("morzsa-csoport").textContent = fej.textContent;
  if (!latottOldalak.has(oldal)) {
    latottOldalak.add(oldal);
    esemenyKuld("oldal", oldal);
  }
}
forditasHookok.push(() => menuOldalUtan(aktivOldal));
menuOldalUtan(aktivOldal);
