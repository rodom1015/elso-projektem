/*
  ADMIN (csak belépve)
  - Statisztika: látogatók, legnézettebb oldalak, legtöbbet másolt makrók, országok, eszközök, AI használat
  - Belépési napló: mikor, honnan, milyen eszközről léptek be (sikeres és hibás próbálkozások)
  - AI beállítások: látogatók is használhatják-e, napi korlát, modell
  A részletes statisztikához a D1 adatbázis kell; a napló nélküle is működik.
*/

Object.assign(SZOVEGEK.hu, {
  ad_sub: "Csak te látod: látogatottság, belépések és az AI asszisztens beállításai.", ad_t_stat: "📈 Statisztika", ad_t_log: "🔐 Belépési napló", ad_t_ai: "🤖 AI beállítások",
  ad_locked: "🔒 Az admin oldal csak belépve érhető el.", ad_today: "ma", ad_total: "összes látogató", ad_ai30: "AI kérdés (30 nap)", ad_fails: "hibás belépés (24 óra)",
  ad_visitors30: "Látogatók – utolsó 30 nap", ad_pages: "Legnézettebb oldalak", ad_copies: "Legtöbbet használt makrók és eszközök", ad_countries: "Országok", ad_devices: "Eszközök",
  ad_none: "Még nincs adat.", ad_no_db: "A részletes statisztikához (oldalak, országok, eszközök, AI) kapcsold be a D1 adatbázist – lásd a TELEPITES.md fájlt. A látogatószámláló és a belépési napló nélküle is működik.",
  ad_time: "Időpont", ad_result: "Eredmény", ad_mode: "Mód", ad_place: "Hely", ad_device: "Eszköz", ad_ok: "✅ sikeres", ad_fail: "❌ hibás jelszó",
  ad_mode_jelszo: "jelszó", ad_mode_qr: "QR kód", ad_warn: "⚠️ Az elmúlt 24 órában {n} hibás belépési kísérlet volt. Ha nem te voltál, változtasd meg a jelszót!",
  ad_ai_public: "A látogatók is használhatják az AI asszisztenst", ad_ai_limit: "Napi kérdés látogatónként", ad_ai_model: "AI modell",
  ad_ai_smart: "Okos (jobb válaszok, kevesebb kérdés naponta)", ad_ai_fast: "Gyors (több kérdés, egyszerűbb válaszok)", ad_save: "Mentés", ad_saved: "Beállítások elmentve",
  ad_ai_off: "⚠️ Az AI nincs bekapcsolva a Cloudflare-en.", ad_ai_note: "Az ingyenes Cloudflare AI keret naponta közösen fogy (a te kérdéseid és a látogatóké is). Ha elfogy, másnap újraindul.",
  ad_refresh: "Frissítés",
  ad_ai_today: "🤖 Mai AI használat", ad_ai_used: "Felhasznált napi keret: kb. {p}% ({n} / {k} neuron)", ad_ai_q: "Kérdések ma: {o} összesen · te: {t} · látogatók: {l}",
  ad_ai_left: "Becslés: még kb. {n} kérdés fér bele mára.", ad_ai_out: "⛔ Ma {ido}-kor elfogyott a keret. Holnap 01:00 után (UTC éjfél) újraindul.",
  ad_ai_ok: "✅ Van még keret.", ad_ai_reset: "A keret minden nap UTC éjfélkor (Szlovákiában télen 01:00, nyáron 02:00) újraindul.",
});
Object.assign(SZOVEGEK.sk, {
  ad_sub: "Vidíš iba ty: návštevnosť, prihlásenia a nastavenia AI asistenta.", ad_t_stat: "📈 Štatistika", ad_t_log: "🔐 Denník prihlásení", ad_t_ai: "🤖 Nastavenia AI",
  ad_locked: "🔒 Stránka admin je dostupná iba po prihlásení.", ad_today: "dnes", ad_total: "všetkých návštevníkov", ad_ai30: "otázok AI (30 dní)", ad_fails: "chybných prihlásení (24 h)",
  ad_visitors30: "Návštevníci – posledných 30 dní", ad_pages: "Najnavštevovanejšie stránky", ad_copies: "Najpoužívanejšie makrá a nástroje", ad_countries: "Krajiny", ad_devices: "Zariadenia",
  ad_none: "Zatiaľ žiadne údaje.", ad_no_db: "Na podrobnú štatistiku (stránky, krajiny, zariadenia, AI) zapni databázu D1 – pozri súbor TELEPITES.md. Počítadlo návštev a denník prihlásení fungujú aj bez nej.",
  ad_time: "Čas", ad_result: "Výsledok", ad_mode: "Spôsob", ad_place: "Miesto", ad_device: "Zariadenie", ad_ok: "✅ úspešné", ad_fail: "❌ chybné heslo",
  ad_mode_jelszo: "heslo", ad_mode_qr: "QR kód", ad_warn: "⚠️ Za posledných 24 hodín bolo {n} chybných pokusov o prihlásenie. Ak si to nebol ty, zmeň heslo!",
  ad_ai_public: "AI asistenta môžu používať aj návštevníci", ad_ai_limit: "Otázok denne na návštevníka", ad_ai_model: "Model AI",
  ad_ai_smart: "Múdry (lepšie odpovede, menej otázok denne)", ad_ai_fast: "Rýchly (viac otázok, jednoduchšie odpovede)", ad_save: "Uložiť", ad_saved: "Nastavenia uložené",
  ad_ai_off: "⚠️ AI nie je zapnutá na Cloudflare.", ad_ai_note: "Bezplatný denný limit Cloudflare AI sa míňa spoločne (tvoje otázky aj otázky návštevníkov). Keď sa minie, ďalší deň sa obnoví.",
  ad_refresh: "Obnoviť",
  ad_ai_today: "🤖 Dnešné využitie AI", ad_ai_used: "Využitý denný limit: asi {p} % ({n} / {k} neurónov)", ad_ai_q: "Otázky dnes: {o} spolu · ty: {t} · návštevníci: {l}",
  ad_ai_left: "Odhad: dnes sa zmestí ešte asi {n} otázok.", ad_ai_out: "⛔ Dnes o {ido} sa limit minul. Zajtra po 01:00 (polnoc UTC) sa obnoví.",
  ad_ai_ok: "✅ Limit ešte nie je vyčerpaný.", ad_ai_reset: "Limit sa obnovuje každý deň o polnoci UTC (na Slovensku v zime 01:00, v lete 02:00).",
});
Object.assign(SZOVEGEK.en, {
  ad_sub: "Only you can see this: traffic, sign-ins and the AI assistant settings.", ad_t_stat: "📈 Statistics", ad_t_log: "🔐 Sign-in log", ad_t_ai: "🤖 AI settings",
  ad_locked: "🔒 The admin page is only available when signed in.", ad_today: "today", ad_total: "visitors in total", ad_ai30: "AI questions (30 days)", ad_fails: "failed sign-ins (24 h)",
  ad_visitors30: "Visitors – last 30 days", ad_pages: "Most viewed pages", ad_copies: "Most used macros and tools", ad_countries: "Countries", ad_devices: "Devices",
  ad_none: "No data yet.", ad_no_db: "For detailed statistics (pages, countries, devices, AI) enable the D1 database – see TELEPITES.md. The visitor counter and the sign-in log work without it.",
  ad_time: "Time", ad_result: "Result", ad_mode: "Method", ad_place: "Location", ad_device: "Device", ad_ok: "✅ success", ad_fail: "❌ wrong password",
  ad_mode_jelszo: "password", ad_mode_qr: "QR code", ad_warn: "⚠️ There were {n} failed sign-in attempts in the last 24 hours. If it wasn't you, change your password!",
  ad_ai_public: "Visitors can use the AI assistant too", ad_ai_limit: "Questions per visitor per day", ad_ai_model: "AI model",
  ad_ai_smart: "Smart (better answers, fewer questions a day)", ad_ai_fast: "Fast (more questions, simpler answers)", ad_save: "Save", ad_saved: "Settings saved",
  ad_ai_off: "⚠️ AI isn't enabled on Cloudflare.", ad_ai_note: "The free Cloudflare AI quota is shared each day (your questions and visitors'). When it runs out, it resets the next day.",
  ad_refresh: "Refresh",
  ad_ai_today: "🤖 AI usage today", ad_ai_used: "Daily quota used: about {p}% ({n} / {k} neurons)", ad_ai_q: "Questions today: {o} in total · you: {t} · visitors: {l}",
  ad_ai_left: "Estimate: about {n} more questions fit in today.", ad_ai_out: "⛔ The quota ran out today at {ido}. It resets after 00:00 UTC.",
  ad_ai_ok: "✅ There is quota left.", ad_ai_reset: "The quota resets every day at midnight UTC.",
});

let adFul = "stat";
let adAdat = null;

const zaszlo = (kod) => (/^[A-Z]{2}$/.test(kod || "") ? String.fromCodePoint(...[...kod].map((c) => 127397 + c.charCodeAt(0))) : "🌐");
const orszagNev = (kod) => { try { return new Intl.DisplayNames([locale()], { type: "region" }).of(kod); } catch { return kod; } };
const OLDAL_IKON = { kezdolap: "🏠", fajlok: "📁", ai: "🤖", tabla: "📝", elemzo: "📊", pdf: "📄", excel: "X", powerquery: "PQ", word: "W", outlook: "O", eszkozok: "🧰", szamolas: "🧮", admin: "🛡️" };

async function adBetolt() {
  if (!titkositoKulcs) return adRajzol();
  try {
    const [admin, lat] = await Promise.all([api("admin").then((v) => v.json()), fetch("/api/latogatas").then((v) => v.json()).catch(() => null)]);
    adAdat = { ...admin, lat };
  } catch (hiba) { hibaKezeles(hiba); }
  adRajzol();
}

function adRajzol() {
  const bent = !!titkositoKulcs;
  $("ad-zar").hidden = bent;
  $("ad-munka").hidden = !bent;
  if (!bent) return;
  document.querySelectorAll("#ad-fulek button").forEach((g) => g.classList.toggle("aktiv", g.dataset.ful === adFul));
  ["stat", "log", "ai"].forEach((f) => ($("ad-" + f).hidden = f !== adFul));
  if (!adAdat) return;
  if (adFul === "stat") adStatisztika();
  if (adFul === "log") adNaplo();
  if (adFul === "ai") adAi();
}

function adToplista(cim, lista, nevFn) {
  const k = document.createElement("section");
  k.className = "kartya ad-top";
  k.innerHTML = "<h3></h3><div class='ad-sorok'></div>";
  k.querySelector("h3").textContent = cim;
  const doboz = k.querySelector(".ad-sorok");
  if (!lista || !lista.length) { doboz.textContent = t("ad_none"); doboz.className = "halvany-szoveg"; return k; }
  const max = Math.max(...lista.map((x) => x.db), 1);
  for (const x of lista) {
    const sor = document.createElement("div");
    sor.className = "ad-sor";
    sor.innerHTML = "<span class='ad-nev'></span><div class='ad-sav'><div></div></div><strong class='tabular'></strong>";
    sor.querySelector(".ad-nev").textContent = nevFn ? nevFn(x.nev) : x.nev;
    sor.querySelector(".ad-sav div").style.width = (x.db / max) * 100 + "%";
    sor.querySelector("strong").textContent = x.db.toLocaleString(locale());
    doboz.appendChild(sor);
  }
  return k;
}

// Mai AI használat kártya (Statisztika és AI beállítások fülön is)
function adAiMaKartya() {
  const m = adAdat.aiMa;
  const k = document.createElement("section");
  k.className = "kartya ad-ai-ma" + (m && m.elfogyott ? " elfogyott" : "");
  if (!m) return k;
  const p = Math.min(100, Math.round((m.neuron / m.keret) * 100));
  k.innerHTML = `<h3></h3><div class="ad-keret-sav"><div></div></div><p class="ad-keret-szoveg"></p><p class="ad-keret-kerdes"></p><p class="ad-keret-allapot"></p><p class="halvany-szoveg kicsi-szoveg ad-keret-megj"></p>`;
  k.querySelector("h3").textContent = t("ad_ai_today");
  const sav = k.querySelector(".ad-keret-sav div");
  sav.style.width = (m.elfogyott ? 100 : p) + "%";
  sav.className = m.elfogyott || p >= 90 ? "piros" : p >= 70 ? "sarga" : "";
  k.querySelector(".ad-keret-szoveg").textContent = t("ad_ai_used", { p: m.elfogyott ? 100 : p, n: m.neuron.toLocaleString(locale()), k: m.keret.toLocaleString(locale()) });
  k.querySelector(".ad-keret-kerdes").textContent = t("ad_ai_q", { o: m.tulaj + m.latogato, t: m.tulaj, l: m.latogato });
  k.querySelector(".ad-keret-allapot").textContent = m.elfogyott
    ? t("ad_ai_out", { ido: new Date(m.elfogyott).toLocaleTimeString(locale(), { hour: "2-digit", minute: "2-digit" }) })
    : t("ad_ai_ok") + " " + t("ad_ai_left", { n: m.maradtBecsles });
  k.querySelector(".ad-keret-megj").textContent = t("ad_ai_reset");
  return k;
}

function adStatisztika() {
  const d = $("ad-stat");
  d.innerHTML = "";
  const a = adAdat, lat = a.lat || { ma: 0, osszes: 0, napok: [] };
  const naplo = a.naplo || [];
  const hibak24 = naplo.filter((n) => !n.siker && Date.now() - n.ido < 864e5).length;
  const ai30 = (a.aiNapok || []).reduce((s, x) => s + x.db, 0);
  const kartyak = document.createElement("div");
  kartyak.className = "ez-kartyak ad-kartyak";
  for (const [ertek, cimke, hiba] of [[lat.ma, t("ad_today")], [lat.osszes, t("ad_total")], [a.db ? ai30 : "–", t("ad_ai30")], [hibak24, t("ad_fails"), hibak24 > 0]]) {
    const k = document.createElement("div");
    k.className = "ez-kartya" + (hiba ? " veszely" : "");
    k.innerHTML = "<strong class='tabular'></strong><span></span>";
    k.firstChild.textContent = typeof ertek === "number" ? ertek.toLocaleString(locale()) : ertek;
    k.lastChild.textContent = cimke;
    kartyak.appendChild(k);
  }
  d.appendChild(kartyak);
  d.appendChild(adAiMaKartya());
  if (hibak24 >= 3) { const w = document.createElement("p"); w.className = "ad-figyelem"; w.textContent = t("ad_warn", { n: hibak24 }); d.appendChild(w); }

  // 30 napos látogatói grafikon
  const napok = [];
  for (let i = 29; i >= 0; i--) {
    const nap = new Date(Date.now() - i * 864e5).toISOString().slice(0, 10);
    napok.push([new Date(nap + "T12:00:00").toLocaleDateString(locale(), { month: "short", day: "numeric" }), (lat.napok.find((x) => x.d === nap) || {}).n || 0]);
  }
  const graf = document.createElement("section");
  graf.className = "kartya ad-graf";
  graf.innerHTML = "<h3></h3><div class='ad-graf-svg'></div>";
  graf.querySelector("h3").textContent = t("ad_visitors30");
  d.appendChild(graf);
  const szel = Math.max(320, Math.min(1000, graf.clientWidth - 40 || 760));
  graf.querySelector(".ad-graf-svg").innerHTML = diagramSvg("oszlop", napok.map((x) => x[0]), napok.map((x) => x[1]), { szelesseg: szel, magassag: 240 });

  if (!a.db) { const p = document.createElement("p"); p.className = "panel-megj"; p.textContent = "ℹ️ " + t("ad_no_db"); d.appendChild(p); return; }
  const racs = document.createElement("div");
  racs.className = "ad-racs";
  racs.appendChild(adToplista(t("ad_pages"), a.oldalak, (n) => `${OLDAL_IKON[n] || "•"}  ${OLDAL_NEVEK[n] ? t(OLDAL_NEVEK[n]) : n}`));
  racs.appendChild(adToplista(t("ad_copies"), a.masolasok));
  racs.appendChild(adToplista(t("ad_countries"), a.orszagok, (n) => `${zaszlo(n)}  ${n === "?" ? "?" : orszagNev(n)}`));
  racs.appendChild(adToplista(t("ad_devices"), a.eszkozok));
  d.appendChild(racs);
}

function adNaplo() {
  const d = $("ad-log");
  d.innerHTML = "";
  const naplo = adAdat.naplo || [];
  const hibak24 = naplo.filter((n) => !n.siker && Date.now() - n.ido < 864e5).length;
  if (hibak24) { const w = document.createElement("p"); w.className = "ad-figyelem"; w.textContent = t("ad_warn", { n: hibak24 }); d.appendChild(w); }
  if (!naplo.length) { const p = document.createElement("p"); p.className = "halvany-szoveg"; p.textContent = t("ad_none"); d.appendChild(p); return; }
  const doboz = document.createElement("div");
  doboz.className = "kartya ad-tabla-doboz";
  const tabla = document.createElement("table");
  tabla.className = "ad-tabla";
  tabla.innerHTML = `<thead><tr>${["ad_time", "ad_result", "ad_mode", "ad_place", "ad_device", ""].map((k) => `<th>${k ? dEsc(t(k)) : "IP"}</th>`).join("")}</tr></thead>`;
  const tb = document.createElement("tbody");
  for (const n of naplo) {
    const tr = document.createElement("tr");
    if (!n.siker) tr.className = "hibas";
    const cellak = [
      new Date(n.ido).toLocaleString(locale(), { dateStyle: "medium", timeStyle: "short" }),
      t(n.siker ? "ad_ok" : "ad_fail"),
      t("ad_mode_" + n.mod) === "ad_mode_" + n.mod ? n.mod : t("ad_mode_" + n.mod),
      `${zaszlo(n.orszag)} ${[n.varos, n.orszag].filter(Boolean).join(", ")}`,
      n.eszkoz || "",
      n.ip || "",
    ];
    cellak.forEach((c) => { const td = document.createElement("td"); td.textContent = c; tr.appendChild(td); });
    tb.appendChild(tr);
  }
  tabla.appendChild(tb);
  doboz.appendChild(tabla);
  d.appendChild(doboz);
}

function adAi() {
  const d = $("ad-ai");
  const b = adAdat.ai || {};
  d.innerHTML = `
    <section class="kartya ad-ai-kartya">
      <p class="ad-figyelem" id="ad-ai-ki" hidden></p>
      <label class="jelolo"><input type="checkbox" id="ad-ai-nyilv"><span></span></label>
      <label class="mezo"><span></span><input type="number" id="ad-ai-napi" min="1" max="50"></label>
      <label class="mezo"><span></span><select id="ad-ai-modell"></select></label>
      <p class="halvany-szoveg kicsi-szoveg" id="ad-ai-megj"></p>
      <button type="button" class="gomb fo" id="ad-ai-ment"></button>
    </section>`;
  d.prepend(adAiMaKartya());
  $("ad-ai-ki").hidden = !!b.elerheto;
  $("ad-ai-ki").textContent = t("ad_ai_off");
  d.querySelector(".jelolo span").textContent = t("ad_ai_public");
  const mezok = d.querySelectorAll(".mezo > span");
  mezok[0].textContent = t("ad_ai_limit");
  mezok[1].textContent = t("ad_ai_model");
  $("ad-ai-nyilv").checked = !!b.nyilvanos;
  $("ad-ai-napi").value = b.napi || 3;
  $("ad-ai-modell").add(new Option(t("ad_ai_smart"), "okos"));
  $("ad-ai-modell").add(new Option(t("ad_ai_fast"), "gyors"));
  $("ad-ai-modell").value = b.modell || "okos";
  $("ad-ai-megj").textContent = t("ad_ai_note");
  $("ad-ai-ment").textContent = t("ad_save");
  $("ad-ai-ment").addEventListener("click", async () => {
    try {
      const uj = await (await api("admin/ai", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nyilvanos: $("ad-ai-nyilv").checked, napi: +$("ad-ai-napi").value, modell: $("ad-ai-modell").value }),
      })).json();
      adAdat.ai = { ...adAdat.ai, ...uj };
      if (typeof aiInfoAdat !== "undefined") aiInfoAdat = null; // az AI oldal újra lekérdezi
      ertesit(t("ad_saved"));
    } catch (hiba) { hibaKezeles(hiba); }
  });
}

document.querySelectorAll("#ad-fulek button").forEach((g) => g.addEventListener("click", () => { adFul = g.dataset.ful; adRajzol(); }));
$("ad-frissit").addEventListener("click", adBetolt);
forditasHookok.push(adRajzol);
oldalHookok.admin = (al) => { if (["stat", "log", "ai"].includes(al)) adFul = al; adBetolt(); };
if (aktivOldal === "admin") oldalHookok.admin();

// Belépés / kilépés után: a menü Admin pontja és a nyitott oldalak frissítése
function belepesValtozott(bent) {
  if (!bent) adAdat = null;
  if (aktivOldal === "admin") bent ? adBetolt() : adRajzol();
  if (aktivOldal === "ai" && typeof aiRajzol === "function") aiRajzol();
  if (aktivOldal === "tabla" && typeof tbRajzol === "function" && tb) { tbRajzol(); tbTaroltLista(); }
  if (aktivOldal === "elemzo" && typeof ezSelectek === "function") ezSelectek();
  if (aktivOldal === "pdf" && typeof pdfRajzol === "function") pdfRajzol();
}

// A modulok saját szövegei az app.js első fordítása után kerültek be – most még egyszer kiírjuk őket
document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
document.querySelectorAll("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
document.querySelectorAll("[data-i18n-title]").forEach((el) => { el.title = t(el.dataset.i18nTitle); el.setAttribute("aria-label", t(el.dataset.i18nTitle)); });
