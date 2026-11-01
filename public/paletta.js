/*
  GYORSKERESŐ (Ctrl + K) – mint a profi programokban
  Bármit megtalál: oldalak, függvények, Excel és Word billentyűk, makrók, saját fájlok.
  Ékezet nélkül is lehet keresni (pl. "kerekites" → KEREKÍTÉS).
*/

const ekezetNelkul = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
let palettaTalalatok = [];
let palettaKijelolt = 0;

function palettaElemek() {
  const elemek = [];
  const add = (csoport, ikon, cim, al, kereses, muvelet) => elemek.push({ csoport, ikon, cim, al, kereses: ekezetNelkul(kereses), muvelet });
  const ugras = (oldal, mezo, ertek) => () => {
    location.hash = "#/" + oldal;
    if (mezo) setTimeout(() => { $(mezo).value = ertek; $(mezo).dispatchEvent(new Event("input")); }, 30);
  };

  const ikonok = { kezdolap: "🏠", fajlok: "📁", eszkozok: "🧰", szamolas: "🧮", excel: "X", powerquery: "PQ", word: "W", outlook: "O" };
  for (const o of OLDALAK) add("cp_pages", ikonok[o], t(OLDAL_NEVEK[o]), "", t(OLDAL_NEVEK[o]) + " " + o, ugras(o));

  if (titkositoKulcs) for (const f of fajlok)
    add("cp_files", "📎", f.nev, meret(f.meret) + " · " + datum(f.ido), f.nev, () => (tablazatE(f.nev) ? elonezet(f) : letolt(f)));

  for (const fv of FUGGVENYEK)
    add("cp_functions", "ƒx", fvNev(fv), (nyelv === "hu" ? fv.en : fv.hu) + " · " + fv.leiras[nyelv], `${fv.hu} ${fv.en} ${fv.leiras[nyelv]}`, ugras("excel/fuggvenyek", "excel-kereses", fvNev(fv)));

  for (const m of MAKROK)
    add("cp_macros", m.ikon, m.cim[nyelv], m.leiras[nyelv], m.cim[nyelv] + " " + m.leiras[nyelv] + " " + m.kod.match(/(?:Sub|Function) (\w+)/)[1], () => {
      $("excel-kereses").value = "";
      makrokRajzol();
      location.hash = "#/excel/makrok";
      setTimeout(() => {
        const k = [...document.querySelectorAll(".makro")].find((x) => x.querySelector("h2").textContent === m.cim[nyelv]);
        if (k) { k.scrollIntoView({ behavior: "smooth", block: "center" }); k.classList.add("villan"); setTimeout(() => k.classList.remove("villan"), 1600); }
      }, 60);
    });

  for (const m of WORD_MAKROK)
    add("cp_word_macros", "W", m.cim[nyelv], m.leiras[nyelv], "word " + m.cim[nyelv] + " " + m.leiras[nyelv] + " " + m.kod.match(/(?:Sub|Function) (\w+)/)[1], () => {
      wordFul = "makrok";
      location.hash = "#/word";
      wordRajzol();
      setTimeout(() => {
        const k = [...document.querySelectorAll("#word-makro-lista .makro")].find((x) => x.querySelector("h2").textContent === m.cim[nyelv]);
        if (k) { k.scrollIntoView({ behavior: "smooth", block: "center" }); k.classList.add("villan"); setTimeout(() => k.classList.remove("villan"), 1600); }
      }, 60);
    });

  // Power Query példák és tippek
  for (const p of PQ_PELDAK)
    add("cp_pq", p.ikon, p.cim[nyelv], p.leiras[nyelv], "power query pq m " + p.cim[nyelv] + " " + p.leiras[nyelv], () => {
      pqFul = "peldak"; $("pq-kereses").value = ""; location.hash = "#/powerquery"; pqRajzol();
      setTimeout(() => {
        const k = [...document.querySelectorAll(".pq-pelda")].find((x) => x.querySelector("h2").textContent === p.cim[nyelv]);
        if (k) { k.scrollIntoView({ behavior: "smooth", block: "center" }); k.classList.add("villan"); setTimeout(() => k.classList.remove("villan"), 1600); }
      }, 60);
    });
  for (const tp of PQ_TIPPEK)
    add("cp_pq", tp.ikon, tp.cim[nyelv], tp.szoveg[nyelv], "power query pq " + tp.cim[nyelv] + " " + tp.szoveg[nyelv], () => {
      pqFul = "tippek"; $("pq-kereses").value = tp.cim[nyelv]; location.hash = "#/powerquery"; pqRajzol();
    });

  const billentyuk = (adat, csoport, oldal, mezo) => {
    for (const cs of adat) for (const [leiras, ...kombok] of cs.sorok) {
      const komb = kombok.map((k) => k.map(billentyuNev).join("+")).join(" / ");
      add(csoport, "⌨️", leiras[nyelv], komb, leiras[nyelv] + " " + komb, ugras(oldal, mezo, leiras[nyelv]));
    }
  };
  billentyuk(BILLENTYUK, "cp_shortcuts", "excel/billentyuk", "excel-kereses");
  billentyuk(WORD_BILLENTYUK, "cp_word", "word", "word-kereses");
  billentyuk(OUTLOOK_BILLENTYUK, "cp_outlook", "outlook/billentyuk", "ol-kereses");
  for (const b of OUTLOOK_BEALLITASOK)
    add("cp_outlook", b.ikon, b.cim[nyelv], t("ol_tab_set"), "outlook " + b.cim[nyelv], ugras("outlook/beallitasok", "ol-kereses", b.cim[nyelv]));
  for (const m of OUTLOOK_MAKROK)
    add("cp_outlook", m.ikon, m.cim[nyelv], m.leiras[nyelv], "outlook makro macro " + m.cim[nyelv] + " " + m.leiras[nyelv], ugras("outlook/makrok", "ol-kereses", m.cim[nyelv]));
  for (const h of OUTLOOK_HIBAK)
    add("cp_outlook", "🩺", h.hiba[nyelv], t("ol_tab_fix"), "outlook " + h.hiba[nyelv], ugras("outlook/hibak", "ol-kereses", h.hiba[nyelv]));
  return elemek;
}

function palettaKeres() {
  const q = ekezetNelkul($("paletta-be").value.trim());
  const elemek = palettaElemek();
  let talalat;
  if (!q) {
    talalat = elemek.filter((e) => e.csoport === "cp_pages" || e.csoport === "cp_files").slice(0, 14);
  } else {
    const szavak = q.split(/\s+/);
    talalat = elemek
      .filter((e) => szavak.every((sz) => e.kereses.includes(sz)))
      .map((e) => ({ ...e, pont: ekezetNelkul(e.cim).startsWith(q) ? 0 : ekezetNelkul(e.cim).includes(q) ? 1 : 2 }))
      .sort((a, b) => a.pont - b.pont);
    // csoportonként legfeljebb 6
    const db = {};
    talalat = talalat.filter((e) => (db[e.csoport] = (db[e.csoport] || 0) + 1) <= 6).slice(0, 30);
  }
  // csoportok sorrendje
  const sorrend = ["cp_pages", "cp_files", "cp_functions", "cp_macros", "cp_word_macros", "cp_pq", "cp_shortcuts", "cp_word", "cp_outlook"];
  talalat.sort((a, b) => sorrend.indexOf(a.csoport) - sorrend.indexOf(b.csoport) || (a.pont ?? 0) - (b.pont ?? 0));
  palettaTalalatok = talalat;
  palettaKijelolt = 0;
  palettaRajzol();
}

function palettaRajzol() {
  const doboz = $("paletta-lista");
  doboz.innerHTML = "";
  if (!palettaTalalatok.length) {
    doboz.innerHTML = `<p class="halvany-szoveg kozep"></p>`;
    doboz.firstChild.textContent = t("cp_none");
    return;
  }
  let elozo = null;
  palettaTalalatok.forEach((e, i) => {
    if (e.csoport !== elozo) {
      const h = document.createElement("div");
      h.className = "paletta-csoport";
      h.textContent = t(e.csoport);
      doboz.appendChild(h);
      elozo = e.csoport;
    }
    const sor = document.createElement("button");
    sor.type = "button";
    sor.className = "paletta-sor" + (i === palettaKijelolt ? " kijelolt" : "");
    sor.innerHTML = `<span class="paletta-ikon"></span><span class="paletta-szoveg"><strong></strong><small></small></span><span class="paletta-enter">↵</span>`;
    sor.querySelector(".paletta-ikon").textContent = e.ikon;
    sor.querySelector("strong").textContent = e.cim;
    sor.querySelector("small").textContent = e.al;
    sor.addEventListener("mousemove", () => { if (palettaKijelolt !== i) { palettaKijelolt = i; palettaJeloles(); } });
    sor.addEventListener("click", () => palettaValaszt(i));
    doboz.appendChild(sor);
  });
}

function palettaJeloles() {
  document.querySelectorAll(".paletta-sor").forEach((s, i) => s.classList.toggle("kijelolt", i === palettaKijelolt));
  document.querySelectorAll(".paletta-sor")[palettaKijelolt]?.scrollIntoView({ block: "nearest" });
}

function palettaValaszt(i) {
  const e = palettaTalalatok[i];
  if (!e) return;
  $("paletta").close();
  e.muvelet();
}

function palettaNyit() {
  if (location.hash.startsWith("#/s/")) return;
  $("paletta-be").value = "";
  palettaKeres();
  $("paletta").showModal();
  $("paletta-be").focus();
}

$("paletta-be").addEventListener("input", palettaKeres);
$("paletta-be").addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") { e.preventDefault(); palettaKijelolt = Math.min(palettaKijelolt + 1, palettaTalalatok.length - 1); palettaJeloles(); }
  else if (e.key === "ArrowUp") { e.preventDefault(); palettaKijelolt = Math.max(palettaKijelolt - 1, 0); palettaJeloles(); }
  else if (e.key === "Enter") { e.preventDefault(); palettaValaszt(palettaKijelolt); }
});
$("paletta").addEventListener("click", (e) => { if (e.target === $("paletta")) $("paletta").close(); });
$("paletta-nyit").addEventListener("click", palettaNyit);
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    $("paletta").open ? $("paletta").close() : palettaNyit();
  } else if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !document.querySelector("dialog[open]")) {
    e.preventDefault();
    palettaNyit();
  }
});
