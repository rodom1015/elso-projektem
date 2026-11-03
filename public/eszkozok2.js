/*
  ESZKÖZÖK – BŐVÍTÉS
  - Az Eszközök oldal fülekre bontva: Képletfordító · Excel eszközök · Szövegeszközök · QR-kód
  - Szövegeszközök: rendezés, ismétlődések, ékezetek, kis-nagybetű, összefűzés, szétbontás, számlálók
  - QR-kód készítő: link, szöveg, Wi-Fi, névjegy (vCard), e-mail – PNG / SVG letöltés
  - Excel eszközök +2: Adattisztító és Szétválogató (oszlop szerint lapokra vagy fájlokra)
  Minden a böngészőben fut.
*/

Object.assign(SZOVEGEK.hu, {
  esz_t_fordito: "🔄 Képletfordító", esz_t_excel: "🧰 Excel eszközök", esz_t_szoveg: "📝 Szövegeszközök", esz_t_qr: "🔳 QR-kód",
  sz_title: "📝 Szövegeszközök", sz_sub: "Másolj be egy listát (pl. egy Excel oszlopot), és egy kattintással rendezheted, tisztíthatod, összefűzheted.",
  sz_ph: "Ide másold a szöveget vagy a listát – soronként egy elem…", sz_sep: "Elválasztó", sz_quote: "Idézőjelek közé (\"alma\")",
  sz_join: "Sorok összefűzése egy sorba", sz_split: "Szétbontás sorokra", sz_clear: "Törlés", sz_copy: "📋 Másolás", sz_copied: "Szöveg kimásolva",
  sz_g_sort: "Rendezés", sz_g_clean: "Tisztítás", sz_g_case: "Kis- és nagybetű", sz_g_other: "Egyéb",
  sz_az: "A → Z", sz_za: "Z → A", sz_num: "Számok szerint", sz_rev: "Megfordítás", sz_shuffle: "Keverés",
  sz_dedupe: "Ismétlődések törlése", sz_empty: "Üres sorok törlése", sz_trim: "Szóközök levágása", sz_accents: "Ékezetek eltávolítása", sz_nonprint: "Láthatatlan karakterek törlése",
  sz_upper: "NAGYBETŰ", sz_lower: "kisbetű", sz_proper: "Tulajdonnév", sz_sentence: "Mondat eleje nagy",
  sz_number: "Sorszámozás", sz_dupes_only: "Csak az ismétlődők", sz_prefix: "Elé / mögé írás",
  sz_prefix_ask: "Mit írjak minden sor ELÉ? (üresen hagyható)", sz_suffix_ask: "Mit írjak minden sor MÖGÉ? (üresen hagyható)",
  sz_stats: "{k} karakter · {ks} szóköz nélkül · {s} szó · {r} sor · {u} egyedi sor",
  sz_sep_comma: "vessző ( , )", sz_sep_semi: "pontosvessző ( ; )", sz_sep_space: "szóköz", sz_sep_tab: "tabulátor", sz_sep_line: "új sor", sz_sep_pipe: "függőleges vonal ( | )",
  qk_title: "🔳 QR-kód készítő", qk_sub: "Link, Wi-Fi jelszó, névjegy vagy e-mail QR-kódban – plakátra, névjegykártyára, prezentációba.",
  qk_t_link: "🔗 Link", qk_t_text: "📝 Szöveg", qk_t_wifi: "📶 Wi-Fi", qk_t_vcard: "👤 Névjegy", qk_t_email: "✉️ E-mail",
  qk_url: "Webcím", qk_text: "Szöveg", qk_ssid: "Hálózat neve (SSID)", qk_pass: "Jelszó", qk_enc: "Titkosítás", qk_enc_none: "nincs", qk_hidden: "Rejtett hálózat",
  qk_name: "Név", qk_org: "Cég", qk_titlef: "Beosztás", qk_phone: "Telefon", qk_mail: "E-mail", qk_web: "Weboldal", qk_addr: "Cím",
  qk_to: "Címzett", qk_subject: "Tárgy", qk_body: "Üzenet", qk_color: "Szín", qk_bg: "Háttér", qk_size: "Méret", qk_ecl: "Hibatűrés",
  qk_empty: "Töltsd ki a mezőket – a QR-kód magától frissül.", qk_too_long: "Túl hosszú a szöveg egy QR-kódhoz.", qk_contrast: "⚠️ Kevés a kontraszt – a telefon lehet, hogy nem tudja beolvasni.",
  xt_clean: "Adattisztító", xt_split: "Szétválogató",
  xt_clean_desc: "Rendbe teszi a táblázatot: felesleges szóközök, szövegként tárolt számok és dátumok, kis-nagybetű, üres sorok és oszlopok, ismétlődések. A képletekből érték lesz.",
  xt_split_desc: "Egy munkalapot szétbont egy oszlop értékei szerint (pl. városonként) – külön munkalapokra egy fájlban, vagy külön fájlokba. A fejléc mindenhova bekerül.",
  cl_trim: "Felesleges szóközök (elején, végén, dupla szóköz)", cl_nums: "Szövegként tárolt számok → szám", cl_dates: "Szövegként tárolt dátumok → dátum",
  cl_empty_rows: "Üres sorok törlése", cl_empty_cols: "Üres oszlopok törlése", cl_dupes: "Ismétlődő sorok törlése (az első marad)", cl_nonprint: "Láthatatlan karakterek törlése",
  cl_case: "Kis- és nagybetű", cl_case_none: "változatlan", cl_all_sheets: "Minden munkalapon",
  cl_report: "Kész! {c} cella javítva · {r} sor és {o} oszlop törölve · {d} ismétlődés törölve", cl_dl: "Tisztított fájl letöltése",
  sp_col: "Melyik oszlop szerint?", sp_mode: "Hova?", sp_sheets: "Külön munkalapokra (egy fájl)", sp_files: "Külön fájlokba",
  sp_done: "{n} csoport készült.", sp_dl_one: "Fájl letöltése", sp_empty: "(üres)",
});
Object.assign(SZOVEGEK.sk, {
  esz_t_fordito: "🔄 Prekladač vzorcov", esz_t_excel: "🧰 Nástroje pre Excel", esz_t_szoveg: "📝 Textové nástroje", esz_t_qr: "🔳 QR kód",
  sz_title: "📝 Textové nástroje", sz_sub: "Vlož zoznam (napr. stĺpec z Excelu) a jedným klikom ho zoradíš, vyčistíš alebo spojíš.",
  sz_ph: "Sem vlož text alebo zoznam – jedna položka na riadok…", sz_sep: "Oddeľovač", sz_quote: "Do úvodzoviek (\"jablko\")",
  sz_join: "Spojiť riadky do jedného", sz_split: "Rozdeliť na riadky", sz_clear: "Vymazať", sz_copy: "📋 Kopírovať", sz_copied: "Text skopírovaný",
  sz_g_sort: "Zoradenie", sz_g_clean: "Čistenie", sz_g_case: "Veľké a malé písmená", sz_g_other: "Ďalšie",
  sz_az: "A → Z", sz_za: "Z → A", sz_num: "Podľa čísel", sz_rev: "Obrátiť", sz_shuffle: "Zamiešať",
  sz_dedupe: "Odstrániť duplicity", sz_empty: "Odstrániť prázdne riadky", sz_trim: "Orezať medzery", sz_accents: "Odstrániť diakritiku", sz_nonprint: "Odstrániť neviditeľné znaky",
  sz_upper: "VEĽKÉ", sz_lower: "malé", sz_proper: "Prvé Veľké", sz_sentence: "Začiatok vety veľký",
  sz_number: "Očíslovať", sz_dupes_only: "Iba duplicitné", sz_prefix: "Pridať pred / za",
  sz_prefix_ask: "Čo pridať PRED každý riadok? (môže byť prázdne)", sz_suffix_ask: "Čo pridať ZA každý riadok? (môže byť prázdne)",
  sz_stats: "{k} znakov · {ks} bez medzier · {s} slov · {r} riadkov · {u} jedinečných riadkov",
  sz_sep_comma: "čiarka ( , )", sz_sep_semi: "bodkočiarka ( ; )", sz_sep_space: "medzera", sz_sep_tab: "tabulátor", sz_sep_line: "nový riadok", sz_sep_pipe: "zvislá čiara ( | )",
  qk_title: "🔳 Generátor QR kódov", qk_sub: "Odkaz, heslo k Wi-Fi, vizitka alebo e-mail v QR kóde – na plagát, vizitku, do prezentácie.",
  qk_t_link: "🔗 Odkaz", qk_t_text: "📝 Text", qk_t_wifi: "📶 Wi-Fi", qk_t_vcard: "👤 Vizitka", qk_t_email: "✉️ E-mail",
  qk_url: "Webová adresa", qk_text: "Text", qk_ssid: "Názov siete (SSID)", qk_pass: "Heslo", qk_enc: "Šifrovanie", qk_enc_none: "žiadne", qk_hidden: "Skrytá sieť",
  qk_name: "Meno", qk_org: "Firma", qk_titlef: "Pozícia", qk_phone: "Telefón", qk_mail: "E-mail", qk_web: "Web", qk_addr: "Adresa",
  qk_to: "Príjemca", qk_subject: "Predmet", qk_body: "Správa", qk_color: "Farba", qk_bg: "Pozadie", qk_size: "Veľkosť", qk_ecl: "Odolnosť voči chybám",
  qk_empty: "Vyplň polia – QR kód sa aktualizuje sám.", qk_too_long: "Text je pre QR kód príliš dlhý.", qk_contrast: "⚠️ Malý kontrast – telefón ho nemusí prečítať.",
  xt_clean: "Čistič dát", xt_split: "Rozdeľovač",
  xt_clean_desc: "Dá tabuľku do poriadku: nadbytočné medzery, čísla a dátumy uložené ako text, veľké/malé písmená, prázdne riadky a stĺpce, duplicity. Zo vzorcov budú hodnoty.",
  xt_split_desc: "Rozdelí hárok podľa hodnôt stĺpca (napr. podľa miest) – na samostatné hárky v jednom súbore alebo do samostatných súborov. Hlavička bude všade.",
  cl_trim: "Nadbytočné medzery (na začiatku, na konci, dvojité)", cl_nums: "Čísla uložené ako text → číslo", cl_dates: "Dátumy uložené ako text → dátum",
  cl_empty_rows: "Odstrániť prázdne riadky", cl_empty_cols: "Odstrániť prázdne stĺpce", cl_dupes: "Odstrániť duplicitné riadky (prvý zostane)", cl_nonprint: "Odstrániť neviditeľné znaky",
  cl_case: "Veľké a malé písmená", cl_case_none: "bez zmeny", cl_all_sheets: "Na všetkých hárkoch",
  cl_report: "Hotovo! Opravených {c} buniek · odstránených {r} riadkov a {o} stĺpcov · {d} duplicít", cl_dl: "Stiahnuť vyčistený súbor",
  sp_col: "Podľa ktorého stĺpca?", sp_mode: "Kam?", sp_sheets: "Na samostatné hárky (jeden súbor)", sp_files: "Do samostatných súborov",
  sp_done: "Vytvorených {n} skupín.", sp_dl_one: "Stiahnuť súbor", sp_empty: "(prázdne)",
});
Object.assign(SZOVEGEK.en, {
  esz_t_fordito: "🔄 Formula translator", esz_t_excel: "🧰 Excel tools", esz_t_szoveg: "📝 Text tools", esz_t_qr: "🔳 QR code",
  sz_title: "📝 Text tools", sz_sub: "Paste a list (e.g. an Excel column) and sort, clean or join it with one click.",
  sz_ph: "Paste your text or list here – one item per line…", sz_sep: "Separator", sz_quote: "Wrap in quotes (\"apple\")",
  sz_join: "Join lines into one", sz_split: "Split into lines", sz_clear: "Clear", sz_copy: "📋 Copy", sz_copied: "Text copied",
  sz_g_sort: "Sort", sz_g_clean: "Clean", sz_g_case: "Case", sz_g_other: "Other",
  sz_az: "A → Z", sz_za: "Z → A", sz_num: "By number", sz_rev: "Reverse", sz_shuffle: "Shuffle",
  sz_dedupe: "Remove duplicates", sz_empty: "Remove empty lines", sz_trim: "Trim spaces", sz_accents: "Remove accents", sz_nonprint: "Remove invisible characters",
  sz_upper: "UPPER", sz_lower: "lower", sz_proper: "Proper Case", sz_sentence: "Sentence case",
  sz_number: "Number lines", sz_dupes_only: "Duplicates only", sz_prefix: "Add before / after",
  sz_prefix_ask: "What to add BEFORE every line? (can be empty)", sz_suffix_ask: "What to add AFTER every line? (can be empty)",
  sz_stats: "{k} characters · {ks} without spaces · {s} words · {r} lines · {u} unique lines",
  sz_sep_comma: "comma ( , )", sz_sep_semi: "semicolon ( ; )", sz_sep_space: "space", sz_sep_tab: "tab", sz_sep_line: "new line", sz_sep_pipe: "pipe ( | )",
  qk_title: "🔳 QR code maker", qk_sub: "A link, Wi-Fi password, contact card or e-mail as a QR code – for posters, business cards, slides.",
  qk_t_link: "🔗 Link", qk_t_text: "📝 Text", qk_t_wifi: "📶 Wi-Fi", qk_t_vcard: "👤 Contact", qk_t_email: "✉️ E-mail",
  qk_url: "Web address", qk_text: "Text", qk_ssid: "Network name (SSID)", qk_pass: "Password", qk_enc: "Encryption", qk_enc_none: "none", qk_hidden: "Hidden network",
  qk_name: "Name", qk_org: "Company", qk_titlef: "Job title", qk_phone: "Phone", qk_mail: "E-mail", qk_web: "Website", qk_addr: "Address",
  qk_to: "To", qk_subject: "Subject", qk_body: "Message", qk_color: "Colour", qk_bg: "Background", qk_size: "Size", qk_ecl: "Error correction",
  qk_empty: "Fill in the fields – the QR code updates by itself.", qk_too_long: "The text is too long for a QR code.", qk_contrast: "⚠️ Low contrast – phones may not be able to read it.",
  xt_clean: "Data cleaner", xt_split: "Splitter",
  xt_clean_desc: "Tidies up a table: extra spaces, numbers and dates stored as text, case, empty rows and columns, duplicates. Formulas become values.",
  xt_split_desc: "Splits a sheet by the values of a column (e.g. by city) – into separate sheets in one file, or into separate files. The header goes everywhere.",
  cl_trim: "Extra spaces (leading, trailing, double)", cl_nums: "Numbers stored as text → number", cl_dates: "Dates stored as text → date",
  cl_empty_rows: "Delete empty rows", cl_empty_cols: "Delete empty columns", cl_dupes: "Delete duplicate rows (keep the first)", cl_nonprint: "Remove invisible characters",
  cl_case: "Case", cl_case_none: "unchanged", cl_all_sheets: "On every sheet",
  cl_report: "Done! {c} cells fixed · {r} rows and {o} columns deleted · {d} duplicates removed", cl_dl: "Download cleaned file",
  sp_col: "Split by which column?", sp_mode: "Where to?", sp_sheets: "Separate sheets (one file)", sp_files: "Separate files",
  sp_done: "{n} groups created.", sp_dl_one: "Download file", sp_empty: "(empty)",
});

/* ======================================================
   AZ ESZKÖZÖK OLDAL FÜLEI
   ====================================================== */
const ESZ_RESZEK = ["fordito", "excel", "szoveg", "qr"];
let eszResz = "fordito";
try { if (ESZ_RESZEK.includes(localStorage.getItem("eszResz"))) eszResz = localStorage.getItem("eszResz"); } catch {}

function eszReszRajzol() {
  document.querySelectorAll("#esz-fulek button").forEach((g) => g.classList.toggle("aktiv", g.dataset.resz === eszResz));
  document.querySelectorAll("#oldal-eszkozok article[data-resz]").forEach((a) => (a.hidden = a.dataset.resz !== eszResz));
  if (eszResz === "qr") qkRajzol();
  if (eszResz === "szoveg") szStatok();
}
document.querySelectorAll("#esz-fulek button").forEach((g) => g.addEventListener("click", () => {
  eszResz = g.dataset.resz;
  try { localStorage.setItem("eszResz", eszResz); } catch {}
  eszReszRajzol();
}));
oldalHookok.eszkozok = (al) => { if (ESZ_RESZEK.includes(al)) eszResz = al; eszReszRajzol(); };

/* ======================================================
   SZÖVEGESZKÖZÖK
   ====================================================== */
let szVisszaLista = [];
const szSorok = () => $("sz-be").value.replace(/\r\n?/g, "\n").split("\n");
const ekezetTelen = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/Ł/g, "L").replace(/ß/g, "ss");
const rendezo = () => new Intl.Collator(locale(), { numeric: true, sensitivity: "base" });

function szBeallit(uj) {
  if (uj === $("sz-be").value) return;
  szVisszaLista.push($("sz-be").value);
  if (szVisszaLista.length > 50) szVisszaLista.shift();
  $("sz-be").value = uj;
  szStatok();
}
const szSoronkent = (fn) => () => szBeallit(fn(szSorok()).join("\n"));

const SZ_MUVELETEK = {
  sz_g_sort: {
    sz_az: szSoronkent((l) => [...l].sort(rendezo().compare)),
    sz_za: szSoronkent((l) => [...l].sort(rendezo().compare).reverse()),
    sz_num: szSoronkent((l) => [...l].sort((a, b) => (parseFloat(a.replace(/\s/g, "").replace(",", ".")) || 0) - (parseFloat(b.replace(/\s/g, "").replace(",", ".")) || 0))),
    sz_rev: szSoronkent((l) => [...l].reverse()),
    sz_shuffle: szSoronkent((l) => { const k = [...l]; for (let i = k.length - 1; i > 0; i--) { const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1); [k[i], k[j]] = [k[j], k[i]]; } return k; }),
  },
  sz_g_clean: {
    sz_dedupe: szSoronkent((l) => { const lat = new Set(); return l.filter((s) => { const k = s.trim().toLowerCase(); if (lat.has(k)) return false; lat.add(k); return true; }); }),
    sz_empty: szSoronkent((l) => l.filter((s) => s.trim() !== "")),
    sz_trim: szSoronkent((l) => l.map((s) => s.replace(/[\t  ]+/g, " ").trim())),
    sz_accents: () => szBeallit(ekezetTelen($("sz-be").value)),
    sz_nonprint: () => szBeallit($("sz-be").value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u200b-\u200f\u2028\u2029\u2060\ufeff]/g, "").replace(/ /g, " ")),
  },
  sz_g_case: {
    sz_upper: () => szBeallit($("sz-be").value.toLocaleUpperCase(locale())),
    sz_lower: () => szBeallit($("sz-be").value.toLocaleLowerCase(locale())),
    sz_proper: () => szBeallit($("sz-be").value.toLocaleLowerCase(locale()).replace(/(^|[^\p{L}])(\p{L})/gu, (m, e, b) => e + b.toLocaleUpperCase(locale()))),
    sz_sentence: () => szBeallit($("sz-be").value.toLocaleLowerCase(locale()).replace(/(^\s*|[.!?]\s+|\n\s*)(\p{L})/gu, (m, e, b) => e + b.toLocaleUpperCase(locale()))),
  },
  sz_g_other: {
    sz_number: szSoronkent((l) => { let n = 0; return l.map((s) => (s.trim() ? `${++n}. ${s}` : s)); }),
    sz_dupes_only: szSoronkent((l) => { const db = new Map(); l.forEach((s) => db.set(s.trim().toLowerCase(), (db.get(s.trim().toLowerCase()) || 0) + 1)); const lat = new Set(); return l.filter((s) => { const k = s.trim().toLowerCase(); if (db.get(k) < 2 || lat.has(k) || !k) return false; lat.add(k); return true; }); }),
    sz_prefix: () => {
      const ele = prompt(t("sz_prefix_ask"), "");
      if (ele === null) return;
      const moge = prompt(t("sz_suffix_ask"), "");
      if (moge === null) return;
      szSoronkent((l) => l.map((s) => (s.trim() ? ele + s + moge : s)))();
    },
  },
};

const SZ_ELVALASZTOK = { comma: ", ", semi: "; ", space: " ", tab: "\t", line: "\n", pipe: " | " };
function szGombok() {
  const doboz = $("sz-gombok");
  doboz.innerHTML = "";
  for (const [csoport, muveletek] of Object.entries(SZ_MUVELETEK)) {
    const d = document.createElement("div");
    d.className = "sz-csoport";
    const h = document.createElement("span");
    h.className = "sz-csoport-cim";
    h.textContent = t(csoport);
    d.appendChild(h);
    for (const [kulcs, fn] of Object.entries(muveletek)) {
      const g = document.createElement("button");
      g.type = "button";
      g.className = "gomb masodlagos kicsi";
      g.textContent = t(kulcs);
      g.addEventListener("click", fn);
      d.appendChild(g);
    }
    doboz.appendChild(d);
  }
  const sel = $("sz-elv"), regi = sel.value || "comma";
  sel.innerHTML = "";
  for (const k of Object.keys(SZ_ELVALASZTOK)) sel.add(new Option(t("sz_sep_" + k), k));
  sel.value = regi;
}

function szStatok() {
  const s = $("sz-be").value;
  const sorok = s ? szSorok() : [];
  const nemUres = sorok.filter((x) => x.trim());
  $("sz-statok").textContent = t("sz_stats", {
    k: s.length.toLocaleString(locale()),
    ks: s.replace(/\s/g, "").length.toLocaleString(locale()),
    s: (s.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu) || []).length.toLocaleString(locale()),
    r: nemUres.length.toLocaleString(locale()),
    u: new Set(nemUres.map((x) => x.trim().toLowerCase())).size.toLocaleString(locale()),
  });
}

$("sz-fuz").addEventListener("click", () => {
  const elv = SZ_ELVALASZTOK[$("sz-elv").value];
  const idezo = $("sz-idezo").checked;
  szBeallit(szSorok().filter((s) => s.trim()).map((s) => (idezo ? `"${s.trim().replace(/"/g, '""')}"` : s.trim())).join(elv));
});
$("sz-bont").addEventListener("click", () => {
  const elv = SZ_ELVALASZTOK[$("sz-elv").value].trim() || (($("sz-elv").value === "tab") ? "\t" : " ");
  const v = $("sz-be").value;
  const reszek = elv === "\n" ? v.split("\n") : v.split(elv === " " ? /\s+/ : elv);
  szBeallit(reszek.map((s) => s.trim().replace(/^"(.*)"$/s, "$1").replace(/""/g, '"')).filter((s) => s !== "").join("\n"));
});
$("sz-vissza").addEventListener("click", () => { if (szVisszaLista.length) { $("sz-be").value = szVisszaLista.pop(); szStatok(); } });
$("sz-torol").addEventListener("click", () => szBeallit(""));
$("sz-masol").addEventListener("click", () => masol($("sz-be").value, "sz_copied"));
$("sz-be").addEventListener("input", szStatok);

/* ======================================================
   QR-KÓD KÉSZÍTŐ
   ====================================================== */
const QK_TIPUSOK = {
  link: [["url", "qk_url", "https://"]],
  text: [["text", "qk_text", "", "textarea"]],
  wifi: [["ssid", "qk_ssid", ""], ["pass", "qk_pass", ""], ["enc", "qk_enc", "WPA", "enc"], ["hidden", "qk_hidden", "", "check"]],
  vcard: [["name", "qk_name", ""], ["org", "qk_org", ""], ["titlef", "qk_titlef", ""], ["phone", "qk_phone", "", "tel"], ["mail", "qk_mail", "", "email"], ["web", "qk_web", ""], ["addr", "qk_addr", ""]],
  email: [["to", "qk_to", "", "email"], ["subject", "qk_subject", ""], ["body", "qk_body", "", "textarea"]],
};
let qkTipus = "link";
const qkAdat = {};
let qkUtolso = null;

// Wi-Fi és vCard szövegben a különleges karaktereket védeni kell
const wifiVed = (s) => s.replace(/([\\;,:"])/g, "\\$1");
const vcVed = (s) => s.replace(/([\\;,])/g, "\\$1").replace(/\n/g, "\\n");

function qkTartalom() {
  const a = qkAdat[qkTipus] || {};
  const v = (k) => (a[k] || "").trim();
  if (qkTipus === "link") { const u = v("url"); return u && u !== "https://" ? (/^[a-z]+:/i.test(u) ? u : "https://" + u) : ""; }
  if (qkTipus === "text") return v("text");
  if (qkTipus === "wifi") {
    if (!v("ssid")) return "";
    const enc = a.enc || "WPA";
    return `WIFI:T:${enc === "nopass" ? "nopass" : enc};S:${wifiVed(v("ssid"))};${enc !== "nopass" ? `P:${wifiVed(a.pass || "")};` : ""}${a.hidden ? "H:true;" : ""};`;
  }
  if (qkTipus === "vcard") {
    if (!v("name")) return "";
    const nevek = v("name").split(/\s+/);
    const vezetek = nevek.length > 1 ? nevek.slice(nyelv === "hu" ? 0 : -1, nyelv === "hu" ? 1 : undefined).join(" ") : "";
    const kereszt = nevek.length > 1 ? (nyelv === "hu" ? nevek.slice(1) : nevek.slice(0, -1)).join(" ") : nevek[0];
    return ["BEGIN:VCARD", "VERSION:3.0", `N:${vcVed(vezetek)};${vcVed(kereszt)};;;`, `FN:${vcVed(v("name"))}`,
      v("org") && `ORG:${vcVed(v("org"))}`, v("titlef") && `TITLE:${vcVed(v("titlef"))}`, v("phone") && `TEL;TYPE=CELL:${v("phone")}`,
      v("mail") && `EMAIL:${v("mail")}`, v("web") && `URL:${v("web")}`, v("addr") && `ADR:;;${vcVed(v("addr"))};;;;`, "END:VCARD"].filter(Boolean).join("\r\n");
  }
  if (qkTipus === "email") {
    if (!v("to")) return "";
    const p = [v("subject") && "subject=" + encodeURIComponent(v("subject")), v("body") && "body=" + encodeURIComponent(v("body"))].filter(Boolean);
    return `mailto:${v("to")}${p.length ? "?" + p.join("&") : ""}`;
  }
  return "";
}

function qkMezok() {
  const tip = $("qk-tipus");
  tip.innerHTML = "";
  for (const k of Object.keys(QK_TIPUSOK)) {
    const g = document.createElement("button");
    g.type = "button";
    g.textContent = t("qk_t_" + k);
    g.classList.toggle("aktiv", k === qkTipus);
    g.addEventListener("click", () => { qkTipus = k; qkMezok(); qkRajzol(); });
    tip.appendChild(g);
  }
  const d = $("qk-mezok");
  d.innerHTML = "";
  const adat = (qkAdat[qkTipus] ||= {});
  for (const [kulcs, cimke, alap, fajta] of QK_TIPUSOK[qkTipus]) {
    if (adat[kulcs] === undefined && alap) adat[kulcs] = alap;
    if (fajta === "check") {
      const l = document.createElement("label");
      l.className = "jelolo";
      l.innerHTML = `<input type="checkbox"><span></span>`;
      l.querySelector("span").textContent = t(cimke);
      l.querySelector("input").checked = !!adat[kulcs];
      l.querySelector("input").addEventListener("change", (e) => { adat[kulcs] = e.target.checked; qkRajzol(); });
      d.appendChild(l);
      continue;
    }
    const l = document.createElement("label");
    l.className = "mezo";
    l.innerHTML = "<span></span>";
    l.firstChild.textContent = t(cimke);
    let el;
    if (fajta === "textarea") { el = document.createElement("textarea"); el.rows = 4; }
    else if (fajta === "enc") {
      el = document.createElement("select");
      [["WPA", "WPA / WPA2 / WPA3"], ["WEP", "WEP"], ["nopass", t("qk_enc_none")]].forEach(([v, n]) => el.add(new Option(n, v)));
    } else { el = document.createElement("input"); el.type = fajta || "text"; }
    el.value = adat[kulcs] ?? "";
    el.addEventListener("input", () => { adat[kulcs] = el.value; qkRajzol(); });
    el.addEventListener("change", () => { adat[kulcs] = el.value; qkRajzol(); });
    l.appendChild(el);
    d.appendChild(l);
  }
}

// A QR könyvtár bájtonként dolgozik: az ékezetes szöveget UTF-8 bájtokká alakítjuk
const utf8Bajtszoveg = (s) => String.fromCharCode(...new TextEncoder().encode(s));
const fenyesseg = (hex) => { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };

function qkRajzol() {
  if (typeof qrcode !== "function") return;
  const tartalom = qkTartalom();
  const kep = $("qk-kep");
  $("qk-png").disabled = $("qk-svg").disabled = !tartalom;
  qkUtolso = null;
  if (!tartalom) { kep.innerHTML = `<p class="halvany-szoveg"></p>`; kep.firstChild.textContent = t("qk_empty"); $("qk-tartalom").textContent = ""; return; }
  let qr;
  try {
    qr = qrcode(0, $("qk-ecl").value);
    qr.addData(utf8Bajtszoveg(tartalom), "Byte");
    qr.make();
  } catch {
    kep.innerHTML = `<p class="hiba"></p>`;
    kep.firstChild.textContent = t("qk_too_long");
    $("qk-png").disabled = $("qk-svg").disabled = true;
    return;
  }
  const n = qr.getModuleCount(), margo = 4, meret = n + margo * 2;
  const szin = $("qk-szin").value, hatter = $("qk-hatter").value;
  let ut = "";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) ut += `M${c + margo} ${r + margo}h1v1h-1z`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${meret} ${meret}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="${hatter}"/><path d="${ut}" fill="${szin}"/></svg>`;
  qkUtolso = { svg, n, margo, qr, szin, hatter };
  kep.innerHTML = svg;
  const kontraszt = Math.abs(fenyesseg(szin) - fenyesseg(hatter));
  $("qk-tartalom").textContent = (kontraszt < 0.4 ? t("qk_contrast") + " · " : "") + (tartalom.length > 120 ? tartalom.slice(0, 117) + "…" : tartalom).replace(/\r\n/g, " · ");
}

function qkFajlnev() {
  const a = qkAdat[qkTipus] || {};
  const alap = { link: a.url, text: "szoveg", wifi: "wifi-" + (a.ssid || ""), vcard: a.name, email: a.to }[qkTipus] || "qr";
  return "qr-" + ekezetTelen(String(alap)).replace(/^https?:\/\//, "").replace(/[^A-Za-z0-9._-]+/g, "-").slice(0, 40).replace(/-+$/, "");
}
$("qk-png").addEventListener("click", () => {
  if (!qkUtolso) return;
  const px = +$("qk-meret").value, { n, margo, qr, szin, hatter } = qkUtolso;
  const meret = n + margo * 2, cella = Math.max(1, Math.floor(px / meret));
  const c = document.createElement("canvas");
  c.width = c.height = cella * meret;
  const g = c.getContext("2d");
  g.fillStyle = hatter; g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = szin;
  for (let r = 0; r < n; r++) for (let k = 0; k < n; k++) if (qr.isDark(r, k)) g.fillRect((k + margo) * cella, (r + margo) * cella, cella, cella);
  c.toBlob((b) => mentes(b, qkFajlnev() + ".png"), "image/png");
});
$("qk-svg").addEventListener("click", () => qkUtolso && mentes(new TextEncoder().encode(qkUtolso.svg), qkFajlnev() + ".svg"));
["qk-szin", "qk-hatter", "qk-ecl"].forEach((id) => $(id).addEventListener("input", qkRajzol));

/* ======================================================
   EXCEL: ADATTISZTÍTÓ és SZÉTVÁLOGATÓ
   ====================================================== */
function xtJelolo(id, kulcs, alap = true) {
  const l = document.createElement("label");
  l.className = "jelolo";
  l.innerHTML = `<input type="checkbox" id="${id}"><span></span>`;
  l.querySelector("input").checked = alap;
  l.querySelector("span").textContent = t(kulcs);
  return l;
}
function xtValaszto(id, kulcs, opciok) {
  const l = document.createElement("label");
  l.className = "mezo";
  l.innerHTML = `<span></span><select id="${id}"></select>`;
  l.querySelector("span").textContent = t(kulcs);
  opciok.forEach(([v, k]) => l.querySelector("select").add(new Option(k, v)));
  return l;
}

// "2026.11.03" / "2026-11-03" / "3.11.2026" / "03.11.2026." → Date (helyi éjfél)
function szovegDatum(s) {
  let m = s.match(/^(\d{4})[.\-/]\s?(\d{1,2})[.\-/]\s?(\d{1,2})\.?$/);
  if (m) return ervenyesDatum(+m[1], +m[2], +m[3]);
  m = s.match(/^(\d{1,2})\.\s?(\d{1,2})\.\s?(\d{4})\.?$/);
  if (m) return ervenyesDatum(+m[3], +m[2], +m[1]);
  return null;
}
function ervenyesDatum(y, mo, d) {
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  const x = new Date(y, mo - 1, d);
  return x.getMonth() === mo - 1 ? x : null;
}
const NEM_LATHATO = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f\u200b-\u200f\u2060\ufeff]/g;

XT_PANELEK.tisztito = {
  leiras: "xt_clean_desc",
  azon: "c",
  rajzol(p) {
    p.appendChild(fajlValaszto("c", "xt_pick"));
    const sor = document.createElement("div");
    sor.className = "mezok-2";
    sor.appendChild(lapValaszto("xt-c-lap"));
    sor.appendChild(xtValaszto("xt-c-betu", "cl_case", [["", t("cl_case_none")], ["upper", t("sz_upper")], ["lower", t("sz_lower")], ["proper", t("sz_proper")]]));
    p.appendChild(sor);
    const jelolok = document.createElement("div");
    jelolok.className = "xt-jelolok";
    [["xt-c-szokoz", "cl_trim"], ["xt-c-lathatatlan", "cl_nonprint"], ["xt-c-szam", "cl_nums"], ["xt-c-datum", "cl_dates"],
      ["xt-c-uressor", "cl_empty_rows"], ["xt-c-uresoszlop", "cl_empty_cols"], ["xt-c-ismetlo", "cl_dupes", false], ["xt-c-mind", "cl_all_sheets", false]]
      .forEach(([id, k, alap]) => jelolok.appendChild(xtJelolo(id, k, alap !== false)));
    p.appendChild(jelolok);
  },
  betoltve(mf) {
    const lap = $("xt-c-lap");
    lap.innerHTML = "";
    mf.wb.SheetNames.forEach((n) => lap.add(new Option(n, n)));
  },
  async futtat(ki) {
    const mf = this.mf;
    if (!mf) return xtHiba(t("xt_need_file"));
    const o = (id) => $(id).checked;
    const betu = $("xt-c-betu").value;
    const lapok = o("xt-c-mind") ? mf.wb.SheetNames : [$("xt-c-lap").value];
    const uj = XLSX.utils.book_new();
    let javitott = 0, torSor = 0, torOszlop = 0, ismetlo = 0;
    for (const nev of mf.wb.SheetNames) {
      let aoa = XLSX.utils.sheet_to_json(mf.wb.Sheets[nev], { header: 1, raw: true, defval: "" });
      if (lapok.includes(nev)) {
        aoa = aoa.map((sor) => sor.map((v) => {
          if (typeof v !== "string") return v;
          let x = v;
          if (o("xt-c-lathatatlan")) x = x.replace(NEM_LATHATO, "").replace(/ /g, " ");
          if (o("xt-c-szokoz")) x = x.replace(/[ \t ]+/g, " ").trim();
          if (o("xt-c-szam") && /^[-+]?[\d\s .]*\d([.,]\d+)?\s*%?$/.test(x.trim()) && /\d/.test(x)) {
            const tiszta = x.trim();
            const szazalek = tiszta.endsWith("%");
            let sz = tiszta.replace(/%$/, "").replace(/[\s ]/g, "");
            // 1.234,56 → 1234.56 ; 1,5 → 1.5 ; 1.5 marad
            if (/,\d+$/.test(sz)) sz = sz.replace(/\./g, "").replace(",", ".");
            else if (/^\d{1,3}(\.\d{3})+$/.test(sz)) sz = sz.replace(/\./g, "");
            const n = Number(sz);
            if (sz !== "" && isFinite(n)) { javitott++; return szazalek ? n / 100 : n; }
          }
          if (o("xt-c-datum")) { const d = szovegDatum(x.trim()); if (d) { javitott++; return d; } }
          if (betu === "upper") x = x.toLocaleUpperCase(locale());
          else if (betu === "lower") x = x.toLocaleLowerCase(locale());
          else if (betu === "proper") x = x.toLocaleLowerCase(locale()).replace(/(^|[^\p{L}])(\p{L})/gu, (m, e, b) => e + b.toLocaleUpperCase(locale()));
          if (x !== v) javitott++;
          return x;
        }));
        const ures = (v) => v === "" || v === null || v === undefined;
        if (o("xt-c-uressor")) { const elotte = aoa.length; aoa = aoa.filter((s) => !s.every(ures)); torSor += elotte - aoa.length; }
        if (o("xt-c-uresoszlop") && aoa.length) {
          const szel = Math.max(...aoa.map((s) => s.length));
          const marad = [...Array(szel).keys()].filter((c) => aoa.some((s) => !ures(s[c])));
          torOszlop += szel - marad.length;
          aoa = aoa.map((s) => marad.map((c) => s[c] ?? ""));
        }
        if (o("xt-c-ismetlo")) {
          const lat = new Set(), elotte = aoa.length;
          aoa = aoa.filter((s, i) => { if (i === 0) return true; const k = JSON.stringify(s.map((v) => (v instanceof Date ? v.getTime() : typeof v === "string" ? v.trim().toLowerCase() : v))); if (lat.has(k)) return false; lat.add(k); return true; });
          ismetlo += elotte - aoa.length;
        }
      }
      const ws = XLSX.utils.aoa_to_sheet(aoa, { cellDates: true, dateNF: "yyyy-mm-dd" });
      ws["!cols"] = (aoa[0] || []).map((_, c) => ({ wch: Math.min(40, Math.max(8, ...aoa.slice(0, 200).map((s) => String(s[c] instanceof Date ? "2026-01-01" : s[c] ?? "").length + 2))) }));
      XLSX.utils.book_append_sheet(uj, ws, nev);
    }
    ki.innerHTML = "";
    const p = document.createElement("p");
    p.className = "xt-osszegzes jo";
    p.textContent = t("cl_report", { c: javitott.toLocaleString(locale()), r: torSor, o: torOszlop, d: ismetlo });
    ki.appendChild(p);
    ki.appendChild(xtLetoltGomb(t("cl_dl"), () => XLSX.writeFile(uj, `${fajlAlapnev(mf.nev)}_tiszta.xlsx`, { cellDates: true })));
    esemenyKuld("masol", "Excel " + t("xt_clean"));
  },
};

XT_PANELEK.szetvalogat = {
  leiras: "xt_split_desc",
  azon: "v",
  rajzol(p) {
    p.appendChild(fajlValaszto("v", "xt_pick"));
    const sor = document.createElement("div");
    sor.className = "mezok-3";
    sor.appendChild(lapValaszto("xt-v-lap"));
    sor.appendChild(xtValaszto("xt-v-oszlop", "sp_col", []));
    sor.appendChild(xtValaszto("xt-v-mod", "sp_mode", [["lapok", t("sp_sheets")], ["fajlok", t("sp_files")]]));
    p.appendChild(sor);
  },
  betoltve(mf) {
    const lap = $("xt-v-lap");
    lap.innerHTML = "";
    mf.wb.SheetNames.forEach((n) => lap.add(new Option(n, n)));
    lap.onchange = () => this.oszlopok(mf);
    this.oszlopok(mf);
  },
  oszlopok(mf) {
    const fej = (XLSX.utils.sheet_to_json(mf.wb.Sheets[$("xt-v-lap").value], { header: 1, raw: true, defval: "" })[0]) || [];
    const sel = $("xt-v-oszlop");
    sel.innerHTML = "";
    fej.forEach((f, i) => sel.add(new Option(`${oszlopBetu(i)}${f !== "" ? " – " + f : ""}`, i)));
  },
  async futtat(ki) {
    const mf = this.mf;
    if (!mf) return xtHiba(t("xt_need_file"));
    const ci = +$("xt-v-oszlop").value, mod = $("xt-v-mod").value;
    const [fej, ...sorok] = XLSX.utils.sheet_to_json(mf.wb.Sheets[$("xt-v-lap").value], { header: 1, raw: true, defval: "" });
    const csoportok = new Map();
    for (const s of sorok) {
      if (s.every((v) => v === "")) continue;
      let k = s[ci];
      k = k instanceof Date ? k.toLocaleDateString(locale()) : String(k ?? "").trim() || t("sp_empty");
      if (!csoportok.has(k)) csoportok.set(k, []);
      csoportok.get(k).push(s);
    }
    const rendezett = [...csoportok].sort(([a], [b]) => a.localeCompare(b, locale(), { numeric: true }));
    const szelesseg = (fej || []).map((f, c) => ({ wch: Math.min(40, Math.max(8, String(f ?? "").length + 2, ...sorok.slice(0, 200).map((s) => String(s[c] ?? "").length + 2))) }));
    const lapLetrehoz = (lista) => { const ws = XLSX.utils.aoa_to_sheet([fej, ...lista], { cellDates: true }); ws["!cols"] = szelesseg; return ws; };
    ki.innerHTML = "";
    const p = document.createElement("p");
    p.className = "xt-osszegzes jo";
    p.textContent = t("sp_done", { n: rendezett.length });
    ki.appendChild(p);
    const alap = fajlAlapnev(mf.nev);
    if (mod === "lapok") {
      const uj = XLSX.utils.book_new(), foglalt = new Set();
      for (const [k, lista] of rendezett) XLSX.utils.book_append_sheet(uj, lapLetrehoz(lista), lapNev(k, foglalt));
      ki.appendChild(xtLetoltGomb(t("sp_dl_one"), () => XLSX.writeFile(uj, `${alap}_szetvalogatva.xlsx`, { cellDates: true })));
    } else {
      const doboz = document.createElement("div");
      doboz.className = "pdf-reszek";
      for (const [k, lista] of rendezett) {
        const g = xtLetoltGomb(`${k} (${lista.length})`, () => {
          const uj = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(uj, lapLetrehoz(lista), lapNev(k));
          XLSX.writeFile(uj, `${alap}_${ekezetTelen(k).replace(/[^A-Za-z0-9._-]+/g, "_").slice(0, 60)}.xlsx`, { cellDates: true });
        });
        g.className = "gomb masodlagos kicsi";
        doboz.appendChild(g);
      }
      ki.appendChild(doboz);
    }
    esemenyKuld("masol", "Excel " + t("xt_split"));
  },
};

/* ---------- Indulás és nyelvváltás ---------- */
function eszkozok2Forditas() {
  szGombok();
  szStatok();
  qkMezok();
  eszReszRajzol();
}
forditasHookok.push(eszkozok2Forditas);
eszkozok2Forditas();
eszkozokRajzol(); // az Excel eszközök fülsora az új panelekkel
if (aktivOldal === "eszkozok") oldalHookok.eszkozok(location.hash.split("/")[2]);
