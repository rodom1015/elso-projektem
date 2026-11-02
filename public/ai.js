/*
  AI ASSZISZTENS
  - Módok: általános kérdés, Excel képlet, Excel / Word / Outlook makró, Power Query, magyarázat
  - A válasz folyamatosan érkezik (streaming), a kódblokkok egy kattintással másolhatók
  - Belépve használható; az Admin oldalon bekapcsolható a látogatóknak is (napi korláttal)
  - A beszélgetés csak ebben a böngészőben marad meg
*/

Object.assign(SZOVEGEK.hu, {
  ai_title: "AI asszisztens", ai_sub: "Írd le a saját szavaiddal, mit szeretnél – kész képletet, makrót vagy Power Query kódot kapsz, magyarázattal.",
  ai_m_altalanos: "💬 Kérdés", ai_m_keplet: "ƒx Képlet", "ai_m_excel-makro": "🟩 Excel makró", "ai_m_word-makro": "📄 Word makró",
  "ai_m_outlook-makro": "✉️ Outlook makró", ai_m_pq: "🔄 Power Query", ai_m_magyaraz: "🔍 Magyarázat",
  ai_ph_altalanos: "Kérdezz bármit az Excelről, Wordről, Outlookról…", ai_ph_keplet: "Pl. Ha a B oszlopban „Kész” van, akkor számolja össze a C oszlop értékeit",
  "ai_ph_excel-makro": "Pl. Minden munkalapot mentsen külön PDF-be a fájl mappájába", "ai_ph_word-makro": "Pl. Minden táblázat fejléce legyen félkövér és szürke hátterű",
  "ai_ph_outlook-makro": "Pl. A kijelölt levelek mellékleteit mentse egy mappába", ai_ph_pq: "Pl. Egy mappa összes CSV fájlját fűzze össze, és szűrje az idei évre",
  ai_ph_magyaraz: "Másold be a képletet, makrót vagy hibaüzenetet, amit nem értesz",
  ai_send: "Küldés", ai_stop: "Leállítás", ai_new: "Új beszélgetés", ai_thinking: "Gondolkodom…", ai_copy: "Másolás", ai_copied: "Kód kimásolva",
  ai_locked_title: "🔒 Az AI asszisztens belépés után érhető el", ai_locked_text: "Lépj be a jelszavaddal a Fájljaim oldalon, utána itt kérdezhetsz.", ai_go_login: "Belépés",
  ai_public_left: "Látogatóként naponta {n} kérdést tehetsz fel.", ai_owner_note: "Belépve korlátlanul kérdezhetsz (a napi ingyenes AI keretig).",
  ai_err_limit: "Mára elfogyott a kérdéskereted. Holnap újra kérdezhetsz!", ai_err_quota: "Mára elfogyott az ingyenes AI keret. Holnap újra működik.",
  ai_err_off: "Az AI még nincs bekapcsolva a Cloudflare-en.", ai_err_generic: "Az AI most nem érhető el. Próbáld újra kicsit később.",
  ai_warning: "⚠️ Az AI tévedhet. A makrókat mindig a fájl másolatán próbáld ki először!",
  ai_examples: "Példák:", ai_you: "Te", ai_bot: "rodom AI", ai_ask_own: "✨ Kérj saját makrót az AI-tól", ai_ask_own_pq: "✨ Kérj saját M kódot az AI-tól",
});
Object.assign(SZOVEGEK.sk, {
  ai_title: "AI asistent", ai_sub: "Popíš vlastnými slovami, čo chceš – dostaneš hotový vzorec, makro alebo kód Power Query s vysvetlením.",
  ai_m_altalanos: "💬 Otázka", ai_m_keplet: "ƒx Vzorec", "ai_m_excel-makro": "🟩 Makro Excel", "ai_m_word-makro": "📄 Makro Word",
  "ai_m_outlook-makro": "✉️ Makro Outlook", ai_m_pq: "🔄 Power Query", ai_m_magyaraz: "🔍 Vysvetlenie",
  ai_ph_altalanos: "Opýtaj sa čokoľvek o Exceli, Worde, Outlooku…", ai_ph_keplet: "Napr. Ak je v stĺpci B „Hotovo“, nech spočíta hodnoty zo stĺpca C",
  "ai_ph_excel-makro": "Napr. Každý hárok nech uloží do samostatného PDF do priečinka súboru", "ai_ph_word-makro": "Napr. Hlavička každej tabuľky nech je tučná so sivým pozadím",
  "ai_ph_outlook-makro": "Napr. Prílohy vybraných správ nech uloží do priečinka", ai_ph_pq: "Napr. Nech spojí všetky CSV súbory v priečinku a vyfiltruje tento rok",
  ai_ph_magyaraz: "Vlož vzorec, makro alebo chybovú hlášku, ktorej nerozumieš",
  ai_send: "Odoslať", ai_stop: "Zastaviť", ai_new: "Nový rozhovor", ai_thinking: "Premýšľam…", ai_copy: "Kopírovať", ai_copied: "Kód skopírovaný",
  ai_locked_title: "🔒 AI asistent je dostupný po prihlásení", ai_locked_text: "Prihlás sa heslom na stránke Moje súbory, potom sa tu môžeš pýtať.", ai_go_login: "Prihlásiť sa",
  ai_public_left: "Ako návštevník môžeš položiť {n} otázok denne.", ai_owner_note: "Po prihlásení sa môžeš pýtať bez obmedzenia (do denného bezplatného limitu AI).",
  ai_err_limit: "Na dnes si vyčerpal limit otázok. Zajtra môžeš znova!", ai_err_quota: "Na dnes sa minul bezplatný limit AI. Zajtra bude znova fungovať.",
  ai_err_off: "AI ešte nie je zapnutá na Cloudflare.", ai_err_generic: "AI teraz nie je dostupná. Skús to o chvíľu.",
  ai_warning: "⚠️ AI sa môže mýliť. Makrá vždy najprv vyskúšaj na kópii súboru!",
  ai_examples: "Príklady:", ai_you: "Ty", ai_bot: "rodom AI", ai_ask_own: "✨ Vypýtaj si vlastné makro od AI", ai_ask_own_pq: "✨ Vypýtaj si vlastný kód M od AI",
});
Object.assign(SZOVEGEK.en, {
  ai_title: "AI assistant", ai_sub: "Describe in your own words what you need – get a ready formula, macro or Power Query code with an explanation.",
  ai_m_altalanos: "💬 Question", ai_m_keplet: "ƒx Formula", "ai_m_excel-makro": "🟩 Excel macro", "ai_m_word-makro": "📄 Word macro",
  "ai_m_outlook-makro": "✉️ Outlook macro", ai_m_pq: "🔄 Power Query", ai_m_magyaraz: "🔍 Explain",
  ai_ph_altalanos: "Ask anything about Excel, Word, Outlook…", ai_ph_keplet: "E.g. If column B says \"Done\", sum the values of column C",
  "ai_ph_excel-makro": "E.g. Save every sheet as a separate PDF into the file's folder", "ai_ph_word-makro": "E.g. Make every table header bold with a grey background",
  "ai_ph_outlook-makro": "E.g. Save the attachments of the selected mails into a folder", ai_ph_pq: "E.g. Combine every CSV in a folder and filter to this year",
  ai_ph_magyaraz: "Paste the formula, macro or error message you don't understand",
  ai_send: "Send", ai_stop: "Stop", ai_new: "New chat", ai_thinking: "Thinking…", ai_copy: "Copy", ai_copied: "Code copied",
  ai_locked_title: "🔒 The AI assistant is available after signing in", ai_locked_text: "Sign in with your password on the My files page, then you can ask here.", ai_go_login: "Sign in",
  ai_public_left: "As a visitor you can ask {n} questions a day.", ai_owner_note: "Signed in you can ask without limits (up to the free daily AI quota).",
  ai_err_limit: "You've used up today's questions. Come back tomorrow!", ai_err_quota: "Today's free AI quota is used up. It works again tomorrow.",
  ai_err_off: "AI isn't enabled on Cloudflare yet.", ai_err_generic: "The AI isn't available right now. Try again a bit later.",
  ai_warning: "⚠️ AI can make mistakes. Always test macros on a copy of your file first!",
  ai_examples: "Examples:", ai_you: "You", ai_bot: "rodom AI", ai_ask_own: "✨ Ask the AI for your own macro", ai_ask_own_pq: "✨ Ask the AI for your own M code",
});

const AI_MODOK_LISTA = ["altalanos", "keplet", "excel-makro", "word-makro", "outlook-makro", "pq", "magyaraz"];
const AI_PELDAK = {
  hu: {
    altalanos: ["Mi a különbség az FKERES és az XKERES között?", "Hogyan rögzítem a fejlécet görgetéskor?", "Hogyan küldök késleltetve levelet Outlookban?"],
    keplet: ["Két dátum között hány munkanap van, ünnepnapok nélkül?", "Keresd meg a cikkszám árát egy másik munkalapról, és ha nincs, írja ki: nincs", "Számolja meg, hány egyedi név van az A oszlopban"],
    "excel-makro": ["Minden munkalapot mentsen külön Excel fájlba", "Színezze pirosra azokat a sorokat, ahol a határidő lejárt", "Készítsen tartalomjegyzéket a munkalapokról linkekkel"],
    "word-makro": ["Cserélje le az összes dupla szóközt egy szóközre", "Minden képet méretezzen 15 cm szélesre", "Mentse a dokumentumot PDF-be ugyanabba a mappába"],
    "outlook-makro": ["Mentse a kijelölt levelek mellékleteit a Letöltések mappába", "Figyelmeztessen küldés előtt, ha nincs tárgy", "Exportálja a kijelölt leveleket Excelbe"],
    pq: ["Fűzze össze egy mappa összes Excel fájlját", "A hónap-oszlopokat alakítsa sorokká (unpivot)", "Vegye ki a duplikált sorokat, a legfrissebb dátumút tartsa meg"],
    magyaraz: ["=HAHIBA(FKERES(A2;Árak!A:B;2;HAMIS);0)", "Mit jelent a #HIÁNYZIK hiba?", "Expression.Error: The column 'Dátum' of the table wasn't found."],
  },
  sk: {
    altalanos: ["Aký je rozdiel medzi VLOOKUP a XLOOKUP?", "Ako ukotvím hlavičku pri posúvaní?", "Ako odošlem správu v Outlooku oneskorene?"],
    keplet: ["Koľko pracovných dní je medzi dvoma dátumami bez sviatkov?", "Nájdi cenu kódu z iného hárka, a ak nie je, nech napíše: nie je", "Spočítaj, koľko jedinečných mien je v stĺpci A"],
    "excel-makro": ["Každý hárok nech uloží do samostatného súboru Excel", "Riadky s prekročeným termínom nech zafarbí na červeno", "Vytvor obsah hárkov s odkazmi"],
    "word-makro": ["Nahraď všetky dvojité medzery jednou", "Všetky obrázky nastav na šírku 15 cm", "Ulož dokument do PDF do toho istého priečinka"],
    "outlook-makro": ["Ulož prílohy vybraných správ do priečinka Stiahnuté", "Upozorni ma pred odoslaním, ak chýba predmet", "Exportuj vybrané správy do Excelu"],
    pq: ["Spoj všetky súbory Excel v priečinku", "Stĺpce mesiacov zmeň na riadky (unpivot)", "Odstráň duplicitné riadky, ponechaj najnovší dátum"],
    magyaraz: ["=IFERROR(VLOOKUP(A2;Ceny!A:B;2;FALSE);0)", "Čo znamená chyba #N/A?", "Expression.Error: The column 'Dátum' of the table wasn't found."],
  },
  en: {
    altalanos: ["What's the difference between VLOOKUP and XLOOKUP?", "How do I freeze the header row?", "How do I delay sending a mail in Outlook?"],
    keplet: ["How many workdays between two dates, excluding holidays?", "Look up the price of a code from another sheet, and show 'none' if missing", "Count the unique names in column A"],
    "excel-makro": ["Save every sheet into a separate Excel file", "Colour rows red where the deadline has passed", "Create a table of contents of the sheets with links"],
    "word-makro": ["Replace every double space with a single space", "Resize every picture to 15 cm wide", "Save the document as PDF in the same folder"],
    "outlook-makro": ["Save the attachments of the selected mails to Downloads", "Warn me before sending if the subject is empty", "Export the selected mails to Excel"],
    pq: ["Combine every Excel file in a folder", "Turn month columns into rows (unpivot)", "Remove duplicate rows, keep the latest date"],
    magyaraz: ["=IFERROR(VLOOKUP(A2,Prices!A:B,2,FALSE),0)", "What does the #N/A error mean?", "Expression.Error: The column 'Date' of the table wasn't found."],
  },
};

let aiMod = "altalanos";
let aiUzenetek = [];   // {szerep: "user"|"assistant", szoveg, mod}
let aiInfoAdat = null;
let aiFolyamat = null; // AbortController a futó kérdéshez
try { aiUzenetek = JSON.parse(localStorage.getItem("aiBeszelgetes") || "[]"); } catch {}
const aiMent = () => { try { localStorage.setItem("aiBeszelgetes", JSON.stringify(aiUzenetek.slice(-30))); } catch {} };

/* ---------- Egyszerű, biztonságos Markdown megjelenítő ---------- */
const htmlVedett = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
function sorKozi(s) {
  return htmlVedett(s)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, "$1<em>$2</em>");
}
function markdown(szoveg) {
  const doboz = document.createElement("div");
  doboz.className = "ai-md";
  const reszek = szoveg.split(/^```/m);
  reszek.forEach((resz, i) => {
    if (i % 2 === 1) {
      // kódblokk: első sor a nyelv
      const uj = resz.indexOf("\n");
      const nyelvCimke = uj >= 0 ? resz.slice(0, uj).trim() : "";
      const kod = (uj >= 0 ? resz.slice(uj + 1) : resz).replace(/\n$/, "");
      const blokk = document.createElement("div");
      blokk.className = "ai-kod";
      blokk.innerHTML = `<div class="ai-kod-fej"><span></span><button type="button" class="gomb masodlagos kicsi">${MASOL_IKON}<span></span></button></div><pre><code></code></pre>`;
      blokk.querySelector(".ai-kod-fej > span").textContent = nyelvCimke || "kód";
      blokk.querySelector("button span").textContent = t("ai_copy");
      blokk.querySelector("code").textContent = kod;
      blokk.querySelector("button").addEventListener("click", () => { masol(kod, "ai_copied"); esemenyKuld("masol", "AI " + aiMod); });
      doboz.appendChild(blokk);
      return;
    }
    let lista = null;
    for (const sor of resz.split("\n")) {
      const cim = sor.match(/^(#{1,4})\s+(.*)/);
      const pont = sor.match(/^\s*[-*•]\s+(.*)/);
      const szam = sor.match(/^\s*(\d+)[.)]\s+(.*)/);
      if (pont || szam) {
        const tipusa = pont ? "UL" : "OL";
        if (!lista || lista.tagName !== tipusa) { lista = document.createElement(tipusa.toLowerCase()); doboz.appendChild(lista); }
        const li = document.createElement("li");
        li.innerHTML = sorKozi(pont ? pont[1] : szam[2]);
        lista.appendChild(li);
        continue;
      }
      lista = null;
      if (!sor.trim()) continue;
      const el = document.createElement(cim ? "h4" : "p");
      el.innerHTML = sorKozi(cim ? cim[2] : sor);
      doboz.appendChild(el);
    }
  });
  return doboz;
}

/* ---------- Megjelenítés ---------- */
function aiHozzaferes() {
  if (titkositoKulcs) return "tulaj";
  if (aiInfoAdat && aiInfoAdat.nyilvanos) return "latogato";
  return "zarva";
}

function aiRajzol() {
  const hozzaferes = aiHozzaferes();
  $("ai-zar").hidden = hozzaferes !== "zarva";
  $("ai-munka").hidden = hozzaferes === "zarva";
  $("ai-info").textContent = hozzaferes === "tulaj" ? t("ai_owner_note") : aiInfoAdat ? t("ai_public_left", { n: aiInfoAdat.napi }) : "";
  // módválasztó
  const modok = $("ai-modok");
  modok.innerHTML = "";
  for (const m of AI_MODOK_LISTA) {
    const g = document.createElement("button");
    g.type = "button";
    g.textContent = t("ai_m_" + m);
    g.classList.toggle("aktiv", m === aiMod);
    g.addEventListener("click", () => { aiMod = m; aiRajzol(); $("ai-be").focus(); });
    modok.appendChild(g);
  }
  $("ai-be").placeholder = t("ai_ph_" + aiMod);
  // példák
  const peldak = $("ai-peldak");
  peldak.innerHTML = "";
  const cim = document.createElement("span");
  cim.textContent = t("ai_examples");
  peldak.appendChild(cim);
  for (const p of AI_PELDAK[nyelv][aiMod]) {
    const g = document.createElement("button");
    g.type = "button";
    g.className = "ai-pelda";
    g.textContent = p;
    g.addEventListener("click", () => { $("ai-be").value = p; aiAutoMagassag(); $("ai-be").focus(); });
    peldak.appendChild(g);
  }
  aiBeszelgetesRajzol();
}

function aiBuborek(u) {
  const el = document.createElement("div");
  el.className = "ai-uzenet " + (u.szerep === "user" ? "en" : "bot");
  const fej = document.createElement("div");
  fej.className = "ai-uzenet-fej";
  fej.textContent = u.szerep === "user" ? t("ai_you") : t("ai_bot");
  if (u.mod && u.szerep === "user") {
    const c = document.createElement("span");
    c.className = "ai-mod-cimke";
    c.textContent = t("ai_m_" + u.mod);
    fej.appendChild(c);
  }
  el.appendChild(fej);
  if (u.szerep === "user") {
    const p = document.createElement("div");
    p.className = "ai-sajat-szoveg";
    p.textContent = u.szoveg;
    el.appendChild(p);
  } else {
    el.appendChild(u.hiba ? Object.assign(document.createElement("p"), { className: "ai-hiba", textContent: u.szoveg }) : markdown(u.szoveg || ""));
  }
  return el;
}

function aiBeszelgetesRajzol() {
  const doboz = $("ai-beszelgetes");
  doboz.innerHTML = "";
  $("ai-ures").hidden = aiUzenetek.length > 0;
  aiUzenetek.forEach((u) => doboz.appendChild(aiBuborek(u)));
}

const aiAutoMagassag = () => {
  const be = $("ai-be");
  be.style.height = "auto";
  be.style.height = Math.min(240, be.scrollHeight) + "px";
};

/* ---------- Ellenőrzött háttérinfó a kérdésben említett függvényekről ----------
   A kis AI modellek a magyar függvényneveket és a paraméterek sorrendjét gyakran rosszul tudják.
   Ezért a kérdésben szereplő függvényeket kikeressük a saját (ellenőrzött) szótárunkból, és elküldjük. */
let aiFvMinta = null;
function aiFuggvenyKontextus(szoveg) {
  if (typeof FUGGVENYEK === "undefined") return [];
  if (!aiFvMinta) {
    const nevek = [...new Set(FUGGVENYEK.flatMap((f) => [f.hu, f.en]).filter((n) => n && n.length > 1))]
      .sort((a, b) => b.length - a.length)
      .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    aiFvMinta = new RegExp(`(?<![\\p{L}\\p{N}.])(${nevek.join("|")})(?![\\p{L}\\p{N}.])`, "giu");
  }
  const talalt = new Map();
  // Ezek köznapi szavak is (pl. „és”, „ma”) – csak zárójellel együtt számítanak függvénynek
  const SZAVAK = new Set(["ÉS", "VAGY", "NEM", "HA", "MA", "NAP", "ÉV", "ÓRA", "PERC", "HÉT", "LAP", "LAPOK", "KÓD", "CÍM", "KÉP", "SOROK", "AND", "OR", "NOT", "IF", "DAY", "YEAR", "NOW", "HOUR", "MINUTE", "SHEET", "SHEETS", "IMAGE", "ROWS", "CODE", "TODAY", "TEXT", "VALUE", "MONTH", "INDEX", "HÓNAP", "SZÖVEG", "ÉRTÉK", "MATCH", "LOOKUP", "KERES", "SUM", "MIN", "MAX"]);
  const s = String(szoveg);
  for (const m of s.matchAll(aiFvMinta)) {
    const nev = m[1].toUpperCase();
    if (SZAVAK.has(nev) && s[m.index + m[1].length] !== "(" && !(nev === m[1] && nev.length > 3)) continue;
    const fv = FUGGVENYEK.find((f) => f.hu === nev || f.en === nev);
    if (fv && !talalt.has(fv.en)) talalt.set(fv.en, fv);
    if (talalt.size >= 8) break;
  }
  return [...talalt.values()].map((f) => ({ hu: f.hu, en: f.en, parHu: f.parHu, parEn: f.parEn, leiras: f.leiras[nyelv] || f.leiras.hu }));
}

/* ---------- Kérdés küldése (streaming válasz) ---------- */
async function aiKuld() {
  const kerdes = $("ai-be").value.trim();
  if (!kerdes || aiFolyamat) return;
  const elozmeny = aiUzenetek.filter((u) => !u.hiba).slice(-6).map(({ szerep, szoveg }) => ({ szerep, szoveg }));
  aiUzenetek.push({ szerep: "user", szoveg: kerdes, mod: aiMod });
  const valasz = { szerep: "assistant", szoveg: "" };
  aiUzenetek.push(valasz);
  $("ai-be").value = "";
  aiAutoMagassag();
  aiBeszelgetesRajzol();

  const doboz = $("ai-beszelgetes");
  const buborek = doboz.lastElementChild;
  buborek.classList.add("ir");
  buborek.lastElementChild.replaceWith(Object.assign(document.createElement("p"), { className: "ai-gondolkodik", textContent: t("ai_thinking") }));
  buborek.scrollIntoView({ behavior: "smooth", block: "end" });
  aiGombok(true);

  aiFolyamat = new AbortController();
  let utolsoRajz = 0;
  const frissit = (vegso = false) => {
    if (!vegso && Date.now() - utolsoRajz < 120) return;
    utolsoRajz = Date.now();
    const uj = aiBuborek(valasz);
    uj.classList.toggle("ir", !vegso);
    buborek.replaceChildren(...uj.childNodes);
    buborek.className = uj.className;
  };
  try {
    const fejlec = { "Content-Type": "application/json" };
    if (belepesiKulcs) fejlec["X-Kulcs"] = belepesiKulcs;
    const v = await fetch("/api/ai", {
      method: "POST", headers: fejlec, signal: aiFolyamat.signal,
      body: JSON.stringify({ mod: aiMod, kerdes, nyelv, elozmeny, kontextus: aiFuggvenyKontextus(kerdes + " " + (elozmeny.at(-1)?.szoveg || "")) }),
    });
    if (!v.ok) {
      let adat = {};
      try { adat = await v.json(); } catch {}
      throw Object.assign(new Error(
        v.status === 503 ? t("ai_err_off") : v.status === 429 ? (adat.keret ? t("ai_err_quota") : adat.limit ? t("ai_err_limit") : t("too_many"))
          : v.status === 401 ? t("session_expired") : v.status === 403 ? t("ai_locked_title") : t("ai_err_generic")), { status: v.status });
    }
    const olvaso = v.body.getReader();
    const dek = new TextDecoder();
    let puffer = "";
    for (;;) {
      const { value, done } = await olvaso.read();
      if (done) break;
      puffer += dek.decode(value, { stream: true });
      const sorok = puffer.split("\n");
      puffer = sorok.pop();
      for (const sor of sorok) {
        if (!sor.startsWith("data:")) continue;
        const adat = sor.slice(5).trim();
        if (!adat || adat === "[DONE]") continue;
        try {
          const j = JSON.parse(adat);
          valasz.szoveg += j.response ?? j.choices?.[0]?.delta?.content ?? "";
        } catch {}
      }
      frissit();
    }
    if (!valasz.szoveg.trim()) throw new Error(t("ai_err_generic"));
  } catch (hiba) {
    if (hiba.name === "AbortError") {
      if (!valasz.szoveg) valasz.szoveg = "…";
    } else {
      valasz.szoveg = hiba.message || t("ai_err_generic");
      valasz.hiba = true;
    }
  } finally {
    aiFolyamat = null;
    aiGombok(false);
    frissit(true);
    aiMent();
  }
}

function aiGombok(fut) {
  $("ai-kuld").hidden = fut;
  $("ai-leallit").hidden = !fut;
}

$("ai-urlap").addEventListener("submit", (e) => { e.preventDefault(); aiKuld(); });
$("ai-be").addEventListener("input", aiAutoMagassag);
$("ai-be").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); aiKuld(); }
});
$("ai-leallit").addEventListener("click", () => aiFolyamat && aiFolyamat.abort());
$("ai-uj").addEventListener("click", () => {
  if (aiFolyamat) aiFolyamat.abort();
  aiUzenetek = [];
  aiMent();
  aiBeszelgetesRajzol();
  $("ai-be").focus();
});

async function aiInfoBetolt() {
  try { aiInfoAdat = await (await fetch("/api/ai/info")).json(); } catch { aiInfoAdat = null; }
  aiRajzol();
}

// #/ai/excel-makro → rögtön a megfelelő mód
oldalHookok.ai = (al) => {
  if (AI_MODOK_LISTA.includes(al)) aiMod = al;
  aiRajzol();
  if (!aiInfoAdat) aiInfoBetolt();
  setTimeout(() => !$("ai-munka").hidden && $("ai-be").focus(), 50);
};
forditasHookok.push(aiRajzol);

/* ---------- „Kérj saját makrót” gombok a súgó oldalakon ---------- */
function aiGombBeszur(hova, mod, kulcs = "ai_ask_own") {
  const doboz = typeof hova === "string" ? $(hova) : hova;
  if (!doboz) return;
  const a = document.createElement("a");
  a.href = "#/ai/" + mod;
  a.className = "gomb fo ai-kerj-gomb";
  a.dataset.i18n = kulcs;
  a.textContent = t(kulcs);
  doboz.before(a);
}
aiGombBeszur("makro-lista", "excel-makro");
aiGombBeszur("word-makro-lista", "word-makro");
aiGombBeszur("ol-makro-lista", "outlook-makro");

if (aktivOldal === "ai") oldalHookok.ai(location.hash.split("/")[2]);
