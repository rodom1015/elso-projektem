/*
  KEZDŐLAP EXTRÁK: látogatószámláló, üzenőfal (privát, titkosított), animált számlálók, újdonságok, lábléc

  ÜZENŐFAL – hogyan titkos?
  - Első belépéskor a böngésződ készít egy kulcspárt (ECDH P-256). A nyilvános kulcs a szerverre kerül,
    a titkos kulcsot a saját jelszavas kulcsoddal titkosítva tároljuk – csak te tudod kinyitni.
  - A látogató böngészője a nyilvános kulcsoddal titkosítja az üzenetet. A szerver csak titkosított adatot lát.
*/

const UJDONSAGOK = [
  ["2026-11-01", { hu: "Power Query: +15 új M kód (összes munkalap, CSV mappa, SharePoint, fuzzy összefésülés, pivot…) és 10 recept kattintásról kattintásra", sk: "Power Query: +15 nových kódov M (všetky hárky, priečinok CSV, SharePoint, fuzzy zlúčenie, pivot…) a 10 receptov klik po kliku", en: "Power Query: +15 new M scripts (all sheets, CSV folder, SharePoint, fuzzy merge, pivot…) and 10 click-by-click recipes" }],
  ["2026-11-01", { hu: "Outlook súgó: beállítások lépésről lépésre (klasszikus és új Outlook), billentyűk, makrók, problémák; 9 új téma", sk: "Pomocník pre Outlook: nastavenia krok za krokom (klasický aj nový Outlook), skratky, makrá, problémy; 9 nových tém", en: "Outlook help: step-by-step settings (classic and new Outlook), shortcuts, macros, problems; 9 new themes" }],
  ["2026-11-01", { hu: "Új kezdőlap, nagy időjárás 7 napos előrejelzéssel, üzenőfal és látogatószámláló", sk: "Nová úvodná stránka, veľké počasie na 7 dní, odkazovač a počítadlo návštev", en: "New home page, big 7-day weather, message board and visitor counter" }],
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

/* ======================================================
   ÜZENŐFAL – a látogató oldala
   ====================================================== */
$("iras-gomb").addEventListener("click", () => {
  $("uzenofal").scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => $("uz-szoveg").focus(), 500);
});
$("uz-szoveg").addEventListener("input", () => ($("uz-szamlalo").textContent = `${$("uz-szoveg").value.length} / 2000`));
const urlapMegnyitva = Date.now(); // robotvédelem: a túl gyors (1,5 mp alatti) küldés gyanús

$("uzenet-urlap").addEventListener("submit", async (e) => {
  e.preventDefault();
  const allapot = $("uz-allapot"), gomb = $("uz-kuld");
  const uzenet = (kulcs, jo = false) => { allapot.textContent = t(kulcs); allapot.className = "uz-allapot " + (jo ? "jo" : "rossz"); };
  const szoveg = $("uz-szoveg").value.trim();
  if (!szoveg) return uzenet("msg_empty");
  if ($("uz-web").value || Date.now() - urlapMegnyitva < 1500) return uzenet("msg_sent", true); // robot: csendben "sikeres"

  gomb.disabled = true;
  gomb.querySelector(".porgo").hidden = false;
  try {
    const kv = await fetch("/api/uzenet/kulcs");
    if (kv.status === 404) return uzenet("msg_not_ready");
    if (!kv.ok) throw 0;
    const { pub } = await kv.json();
    const tulajPub = await crypto.subtle.importKey("raw", b64bol(pub), { name: "ECDH", namedCurve: "P-256" }, false, []);
    const ideiglenes = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, false, ["deriveKey"]);
    const kozos = await crypto.subtle.deriveKey({ name: "ECDH", public: tulajPub }, ideiglenes.privateKey, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const tartalom = { nev: $("uz-nev").value.trim(), kapcsolat: $("uz-kapcsolat").value.trim(), szoveg, nyelv };
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, kozos, szovegbol(JSON.stringify(tartalom))));
    const epub = new Uint8Array(await crypto.subtle.exportKey("raw", ideiglenes.publicKey));
    const v = await fetch("/api/uzenet", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ epub: b64(epub), iv: b64(iv), ct: b64(ct), web: "" }),
    });
    if (v.status === 429) return uzenet("msg_too_many");
    if (!v.ok) throw 0;
    $("uz-szoveg").value = "";
    $("uz-szamlalo").textContent = "0 / 2000";
    uzenet("msg_sent", true);
  } catch {
    uzenet("msg_error");
  } finally {
    gomb.disabled = false;
    gomb.querySelector(".porgo").hidden = true;
  }
});

/* ======================================================
   ÜZENŐFAL – a tulajdonos oldala (belépve, a Fájljaim oldalon)
   ====================================================== */
let uzenetLista = [];

async function uzenetekBetolt() {
  if (!titkositoKulcs) return;
  try {
    const adat = await (await api("uzenetek")).json();
    let privat;
    if (!adat.kulcs) {
      // Első alkalom: kulcspár készítése és feltöltése
      const par = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveKey"]);
      const pub = new Uint8Array(await crypto.subtle.exportKey("raw", par.publicKey));
      const pkcs8 = new Uint8Array(await crypto.subtle.exportKey("pkcs8", par.privateKey));
      await api("uzenet/kulcs", { method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pub: b64(pub), privTitkos: b64(await titkosit(pkcs8)) }) });
      privat = par.privateKey;
    } else {
      const pkcs8 = await visszafejt(b64bol(adat.kulcs.privTitkos));
      privat = await crypto.subtle.importKey("pkcs8", pkcs8, { name: "ECDH", namedCurve: "P-256" }, false, ["deriveKey"]);
    }
    uzenetLista = [];
    for (const u of adat.uzenetek) {
      try {
        const epub = await crypto.subtle.importKey("raw", b64bol(u.epub), { name: "ECDH", namedCurve: "P-256" }, false, []);
        const kozos = await crypto.subtle.deriveKey({ name: "ECDH", public: epub }, privat, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
        const nyitott = JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64bol(u.iv) }, kozos, b64bol(u.ct))));
        uzenetLista.push({ id: u.id, ido: u.ido, ...nyitott });
      } catch { /* sérült vagy más kulccsal küldött üzenet – kihagyjuk */ }
    }
    // Értesítés az új üzenetekről
    let utolso = 0;
    try { utolso = parseInt(localStorage.getItem("uzenetLatott") || "0", 10); } catch {}
    const uj = uzenetLista.filter((u) => u.ido > utolso).length;
    if (uj) ertesit("📬 " + t("inbox_count", { n: uj }));
    try { localStorage.setItem("uzenetLatott", String(Date.now())); } catch {}
  } catch (hiba) {
    if (hiba.status === 401) return;
    uzenetLista = [];
  }
  uzenetekRajzol();
}

function uzenetekRajzol() {
  const kartya = $("uzenetek-kartya");
  kartya.hidden = !titkositoKulcs;
  if (!titkositoKulcs) return;
  $("uzenetek-szam").textContent = t("inbox_count", { n: uzenetLista.length });
  $("uzenet-ures").hidden = uzenetLista.length > 0;
  const ul = $("uzenet-lista");
  ul.innerHTML = "";
  for (const u of uzenetLista) {
    const li = document.createElement("li");
    li.className = "uzenet";
    li.innerHTML = `
      <div class="uzenet-fej"><span class="uzenet-avatar"></span><div><strong></strong><small></small></div>
        <button class="kis-gomb torles"><svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>
      <p class="uzenet-szoveg"></p>`;
    const nev = u.nev || t("inbox_anon");
    li.querySelector(".uzenet-avatar").textContent = nev.trim().charAt(0).toUpperCase() || "?";
    li.querySelector("strong").textContent = nev;
    li.querySelector("small").textContent = [new Date(u.ido).toLocaleString(locale(), { dateStyle: "medium", timeStyle: "short" }), u.kapcsolat].filter(Boolean).join(" · ");
    li.querySelector(".uzenet-szoveg").textContent = u.szoveg;
    const torles = li.querySelector(".torles");
    torles.title = t("delete");
    torles.addEventListener("click", async () => {
      if (!confirm(t("inbox_delete_confirm"))) return;
      try {
        await api("uzenetek/" + u.id, { method: "DELETE" });
        uzenetLista = uzenetLista.filter((x) => x.id !== u.id);
        uzenetekRajzol();
        ertesit(t("deleted"));
      } catch (hiba) { hibaKezeles(hiba); }
    });
    ul.appendChild(li);
  }
}

forditasHookok.push(() => { ujdonsagokRajzol(); latogatoRajzol(); uzenetekRajzol(); });
ujdonsagokRajzol();
latogatasBetolt();
