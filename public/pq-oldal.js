/*
  POWER QUERY OLDAL – fülek: Alapok, Tippek, Példák (M kód), M függvények, Hibák
  Az adatok a powerquery.js-ben vannak.
*/

let pqFul = "alapok";
try { pqFul = localStorage.getItem("pqFul") || pqFul; } catch {}

const pqKod = (p) => p.kod.replace(/\{([1-9]\d*)\}/g, (_, n) => p.s[nyelv][n - 1] ?? "");
const pqSzuro = () => $("pq-kereses").value.trim().toLowerCase();
const pqIllik = (...szovegek) => !pqSzuro() || szovegek.join(" ").toLowerCase().includes(pqSzuro());

function pqRajzol() {
  $("pq-alcim").textContent = t("pq_sub", { e: PQ_PELDAK.length, f: PQ_FUGGVENYEK.length, t: PQ_TIPPEK.length, h: PQ_HIBAK.length });
  document.querySelectorAll("#pq-fulek button").forEach((g) => g.classList.toggle("aktiv", g.dataset.ful === pqFul));
  for (const f of ["alapok", "tippek", "peldak", "fuggvenyek", "hibak"]) $("pq-" + f).hidden = f !== pqFul;
  const db = { alapok: pqAlapok, tippek: pqTippek, peldak: pqPeldak, fuggvenyek: pqFuggvenyek, hibak: pqHibak }[pqFul]();
  $("pq-ures").hidden = db > 0;
}

function pqAlapok() {
  const doboz = $("pq-alapok");
  doboz.innerHTML = "";
  const lepesek = PQ_LEPESEK[nyelv].filter(([c, sz]) => pqIllik(c, sz));
  lepesek.forEach(([cim, szoveg], i) => {
    const k = document.createElement("article");
    k.className = "kartya pq-lepes";
    k.innerHTML = `<div class="pq-lepes-szam"></div><div><h2></h2><p></p></div>`;
    k.querySelector(".pq-lepes-szam").textContent = PQ_LEPESEK[nyelv].findIndex((x) => x[0] === cim) + 1;
    k.querySelector("h2").textContent = cim;
    k.querySelector("p").textContent = szoveg;
    doboz.appendChild(k);
  });
  return lepesek.length;
}

function pqTippek() {
  const doboz = $("pq-tippek");
  doboz.innerHTML = "";
  const lista = PQ_TIPPEK.filter((tp) => pqIllik(tp.cim[nyelv], tp.szoveg[nyelv]));
  for (const tp of lista) {
    const k = document.createElement("article");
    k.className = "kartya word-tipp pq-tipp";
    k.innerHTML = `<div class="word-tipp-ikon"></div><div><h2></h2><p></p></div>`;
    k.querySelector(".word-tipp-ikon").textContent = tp.ikon;
    k.querySelector("h2").textContent = tp.cim[nyelv];
    k.querySelector("p").textContent = tp.szoveg[nyelv];
    doboz.appendChild(k);
  }
  return lista.length;
}

function pqPeldak() {
  const doboz = $("pq-peldak");
  doboz.innerHTML = "";
  const utmutato = document.createElement("p");
  utmutato.className = "panel-megj pq-utmutato";
  utmutato.textContent = "💡 " + t("pq_howto");
  doboz.appendChild(utmutato);
  const lista = PQ_PELDAK.filter((p) => pqIllik(p.cim[nyelv], p.leiras[nyelv], p.kod));
  for (const p of lista) {
    const kod = pqKod(p);
    const k = document.createElement("article");
    k.className = "kartya makro pq-pelda";
    k.innerHTML = `
      <div class="makro-fej"><span class="makro-ikon ${p.szin}"></span><div class="makro-cim"><h2></h2><code class="makro-nev">Power Query · M</code></div></div>
      <p class="makro-leiras"></p>
      <div class="makro-gombok">
        <button class="gomb fo kicsi">${MASOL_IKON}<span></span></button>
        <button class="gomb masodlagos kicsi kod-gomb"><span></span></button>
      </div>
      <pre class="makro-kod" hidden><code></code></pre>`;
    k.querySelector(".makro-ikon").textContent = p.ikon;
    k.querySelector("h2").textContent = p.cim[nyelv];
    k.querySelector(".makro-leiras").textContent = p.leiras[nyelv];
    k.querySelector("pre code").textContent = kod;
    k.querySelector(".gomb.fo span").textContent = t("pq_copy");
    k.querySelector(".gomb.fo").addEventListener("click", () => masol(kod, "pq_copied"));
    const kodGomb = k.querySelector(".kod-gomb"), pre = k.querySelector("pre");
    kodGomb.querySelector("span").textContent = t("show_code");
    kodGomb.addEventListener("click", () => {
      pre.hidden = !pre.hidden;
      kodGomb.querySelector("span").textContent = pre.hidden ? t("show_code") : t("hide_code");
    });
    doboz.appendChild(k);
  }
  return lista.length;
}

function pqFuggvenyek() {
  const doboz = $("pq-fuggvenyek");
  doboz.innerHTML = "";
  let osszes = 0;
  for (const [kat, katNev] of Object.entries(PQ_KATEGORIAK)) {
    const sorok = PQ_FUGGVENYEK.filter(([nev, k, leiras, pelda]) => k === kat && pqIllik(nev, leiras[nyelv], pelda));
    if (!sorok.length) continue;
    osszes += sorok.length;
    const kartya = document.createElement("section");
    kartya.className = "kartya pq-fv-csoport";
    const h2 = document.createElement("h2");
    h2.innerHTML = `<b></b><em class="darab"></em>`;
    h2.querySelector("b").textContent = katNev[nyelv];
    h2.querySelector("em").textContent = sorok.length;
    kartya.appendChild(h2);
    for (const [nev, , leiras, pelda] of sorok) {
      const sor = document.createElement("div");
      sor.className = "pq-fv-sor";
      sor.innerHTML = `<div class="pq-fv-fej"><code class="pq-fv-nev"></code><span></span></div>`;
      sor.querySelector(".pq-fv-nev").textContent = nev;
      sor.querySelector("span").textContent = leiras[nyelv];
      sor.appendChild(kepletsor(pelda));
      sor.querySelector(".kepletsor .fx").textContent = "M";
      kartya.appendChild(sor);
    }
    doboz.appendChild(kartya);
  }
  return osszes;
}

function pqHibak() {
  const doboz = $("pq-hibak");
  doboz.innerHTML = "";
  const hibaSzoveg = (h) => (typeof h.hiba === "string" ? h.hiba : h.hiba[nyelv]);
  const lista = PQ_HIBAK.filter((h) => pqIllik(hibaSzoveg(h), h.megoldas[nyelv]));
  for (const h of lista) {
    const k = document.createElement("article");
    k.className = "kartya pq-hiba";
    k.innerHTML = `<div class="pq-hiba-uzenet"><span>⚠️</span><code></code></div><p><strong></strong> <span></span></p>`;
    k.querySelector("code").textContent = hibaSzoveg(h);
    k.querySelector("strong").textContent = "✅ " + t("pq_fix") + ":";
    k.querySelector("p span").textContent = h.megoldas[nyelv];
    doboz.appendChild(k);
  }
  return lista.length;
}

document.querySelectorAll("#pq-fulek button").forEach((g) =>
  g.addEventListener("click", () => {
    pqFul = g.dataset.ful;
    try { localStorage.setItem("pqFul", pqFul); } catch {}
    pqRajzol();
  })
);
$("pq-kereses").addEventListener("input", pqRajzol);
forditasHookok.push(pqRajzol);
pqRajzol();
