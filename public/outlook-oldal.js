/*
  OUTLOOK OLDAL – fülek: Billentyűk, Beállítások, Tippek, Makrók, Problémák
  Az adatok az outlook-adatok.js-ben vannak.
*/

const OL_FULEK = ["billentyuk", "beallitasok", "tippek", "makrok", "hibak"];
let olFul = "billentyuk";
try { olFul = localStorage.getItem("olFul") || olFul; } catch {}
if (!OL_FULEK.includes(olFul)) olFul = "billentyuk";

const olSzuro = () => $("ol-kereses").value.trim().toLowerCase();
const olIllik = (...szovegek) => !olSzuro() || szovegek.join(" ").toLowerCase().includes(olSzuro());
const olBillentyuDarab = () => OUTLOOK_BILLENTYUK.reduce((s, cs) => s + cs.sorok.length, 0);

function outlookRajzol() {
  $("ol-alcim").textContent = t("ol_sub", { b: olBillentyuDarab(), s: OUTLOOK_BEALLITASOK.length, t: OUTLOOK_TIPPEK.length, m: OUTLOOK_MAKROK.length, h: OUTLOOK_HIBAK.length });
  document.querySelectorAll("#ol-fulek button").forEach((g) => g.classList.toggle("aktiv", g.dataset.ful === olFul));
  $("ol-billentyuk").hidden = olFul !== "billentyuk";
  $("ol-beallitasok").hidden = olFul !== "beallitasok";
  $("ol-tippek").hidden = olFul !== "tippek";
  $("ol-makrok-doboz").hidden = olFul !== "makrok";
  $("ol-hibak").hidden = olFul !== "hibak";
  const db = {
    billentyuk: () => billentyuCsoportokRajzol(OUTLOOK_BILLENTYUK, $("ol-billentyuk"), olSzuro()),
    beallitasok: olBeallitasok,
    tippek: olTippek,
    makrok: olMakrok,
    hibak: olHibak,
  }[olFul]();
  $("ol-ures").hidden = db > 0;
}

// Egy lépéslista (klasszikus vagy új Outlook oszlop)
function olOszlop(cim, osztaly, lepesek) {
  const d = document.createElement("div");
  d.className = "ol-oszlop " + osztaly;
  const h = document.createElement("h3");
  h.textContent = cim;
  const ol = document.createElement("ol");
  ol.className = "lepesek";
  for (const l of lepesek) {
    const li = document.createElement("li");
    li.textContent = l;
    ol.appendChild(li);
  }
  d.append(h, ol);
  return d;
}

function olBeallitasok() {
  const doboz = $("ol-beallitasok");
  doboz.innerHTML = "";
  const lista = OUTLOOK_BEALLITASOK.filter((b) => olIllik(b.cim[nyelv], b.klasszikus[nyelv].join(" "), b.uj[nyelv].join(" ")));
  for (const b of lista) {
    const k = document.createElement("article");
    k.className = "kartya ol-beall";
    const h = document.createElement("h2");
    h.innerHTML = `<span class="word-tipp-ikon"></span><b></b>`;
    h.querySelector("span").textContent = b.ikon;
    h.querySelector("b").textContent = b.cim[nyelv];
    const racs = document.createElement("div");
    racs.className = "ol-oszlopok";
    racs.append(olOszlop("🖥️ " + t("ol_classic"), "klasszikus", b.klasszikus[nyelv]), olOszlop("🌐 " + t("ol_new"), "uj", b.uj[nyelv]));
    k.append(h, racs);
    doboz.appendChild(k);
  }
  return lista.length;
}

function olTippek() {
  const doboz = $("ol-tippek");
  doboz.innerHTML = "";
  const lista = OUTLOOK_TIPPEK.filter((tp) => olIllik(tp.cim[nyelv], tp.szoveg[nyelv]));
  for (const tp of lista) {
    const k = document.createElement("article");
    k.className = "kartya word-tipp";
    k.innerHTML = `<div class="word-tipp-ikon"></div><div><h2></h2><p></p></div>`;
    k.querySelector(".word-tipp-ikon").textContent = tp.ikon;
    k.querySelector("h2").textContent = tp.cim[nyelv];
    k.querySelector("p").textContent = tp.szoveg[nyelv];
    doboz.appendChild(k);
  }
  return lista.length;
}

function olMakrok() {
  const lepesek = $("ol-mac-lepesek");
  lepesek.innerHTML = "";
  for (const l of OUTLOOK_MAKRO_UTMUTATO[nyelv]) {
    const li = document.createElement("li");
    li.textContent = l;
    lepesek.appendChild(li);
  }
  const doboz = $("ol-makro-lista");
  doboz.innerHTML = "";
  const helyek = { outlook: "ol_where_outlook", excel: "ol_where_excel", thisoutlooksession: "ol_where_tos" };
  const lista = OUTLOOK_MAKROK.filter((m) => olIllik(m.cim[nyelv], m.leiras[nyelv], m.kod));
  for (const m of lista) {
    const k = makroKartya(m);
    const cimke = document.createElement("span");
    cimke.className = "ol-hol " + m.hol;
    cimke.textContent = t(helyek[m.hol]);
    k.querySelector(".makro-cim").appendChild(cimke);
    doboz.appendChild(k);
  }
  return lista.length;
}

function olHibak() {
  const doboz = $("ol-hibak");
  doboz.innerHTML = "";
  const lista = OUTLOOK_HIBAK.filter((h) => olIllik(h.hiba[nyelv], h.megoldas[nyelv]));
  for (const h of lista) {
    const k = document.createElement("article");
    k.className = "kartya pq-hiba";
    k.innerHTML = `<div class="pq-hiba-uzenet"><span>🩺</span><code></code></div><p><strong></strong> <span></span></p>`;
    k.querySelector("code").textContent = h.hiba[nyelv];
    k.querySelector("strong").textContent = "✅ " + t("pq_fix") + ":";
    k.querySelector("p span").textContent = h.megoldas[nyelv];
    doboz.appendChild(k);
  }
  return lista.length;
}

// Az útvonalból (#/outlook/makrok) is lehet fület választani
function outlookFulValt(al) {
  if (OL_FULEK.includes(al)) olFul = al;
  outlookRajzol();
}

document.querySelectorAll("#ol-fulek button").forEach((g) =>
  g.addEventListener("click", () => {
    olFul = g.dataset.ful;
    try { localStorage.setItem("olFul", olFul); } catch {}
    outlookRajzol();
  })
);
$("ol-kereses").addEventListener("input", outlookRajzol);
forditasHookok.push(outlookRajzol);
{
  const [o, al] = location.hash.replace("#/", "").split("/");
  outlookFulValt(o === "outlook" ? al : null);
}
