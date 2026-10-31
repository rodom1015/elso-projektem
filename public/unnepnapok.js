/*
  ÜNNEPNAPOK (munkaszüneti napok) – Magyarország és Szlovákia
  ==========================================================
  A húsvéthoz kötött ünnepeket (nagypéntek, húsvét, pünkösd) minden évre kiszámoljuk.
  Az évente változó áthelyezett munkanapokat (pl. hídnapok) NEM tartalmazza.
*/

// Húsvétvasárnap dátuma (Gauss–Meeus-féle algoritmus, Gergely-naptár)
function husvet(ev) {
  const a = ev % 19, b = Math.floor(ev / 100), c = ev % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const honap = Math.floor((h + l - 7 * m + 114) / 31);
  const nap = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(ev, honap - 1, nap);
}

// [hónap, nap, név] – vagy húsvéthoz képest eltolva: ["H", eltolás, név]
const UNNEP_SZABALYOK = {
  hu: [
    [1, 1, { hu: "Újév", sk: "Nový rok", en: "New Year's Day" }],
    [3, 15, { hu: "Nemzeti ünnep (1848)", sk: "Maďarský národný sviatok (1848)", en: "National Day (1848)" }],
    ["H", -2, { hu: "Nagypéntek", sk: "Veľký piatok", en: "Good Friday" }],
    ["H", 0, { hu: "Húsvétvasárnap", sk: "Veľkonočná nedeľa", en: "Easter Sunday" }],
    ["H", 1, { hu: "Húsvéthétfő", sk: "Veľkonočný pondelok", en: "Easter Monday" }],
    [5, 1, { hu: "A munka ünnepe", sk: "Sviatok práce", en: "Labour Day" }],
    ["H", 49, { hu: "Pünkösdvasárnap", sk: "Turíčna nedeľa", en: "Whit Sunday" }],
    ["H", 50, { hu: "Pünkösdhétfő", sk: "Turíčny pondelok", en: "Whit Monday" }],
    [8, 20, { hu: "Államalapítás ünnepe", sk: "Deň založenia štátu", en: "St. Stephen's Day" }],
    [10, 23, { hu: "Nemzeti ünnep (1956)", sk: "Maďarský národný sviatok (1956)", en: "National Day (1956)" }],
    [11, 1, { hu: "Mindenszentek", sk: "Sviatok všetkých svätých", en: "All Saints' Day" }],
    [12, 25, { hu: "Karácsony", sk: "Prvý sviatok vianočný", en: "Christmas Day" }],
    [12, 26, { hu: "Karácsony másnapja", sk: "Druhý sviatok vianočný", en: "Boxing Day" }],
  ],
  sk: [
    [1, 1, { hu: "A Szlovák Köztársaság napja", sk: "Deň vzniku Slovenskej republiky", en: "Day of the Slovak Republic" }],
    [1, 6, { hu: "Vízkereszt", sk: "Zjavenie Pána (Traja králi)", en: "Epiphany" }],
    ["H", -2, { hu: "Nagypéntek", sk: "Veľký piatok", en: "Good Friday" }],
    ["H", 1, { hu: "Húsvéthétfő", sk: "Veľkonočný pondelok", en: "Easter Monday" }],
    [5, 1, { hu: "A munka ünnepe", sk: "Sviatok práce", en: "Labour Day" }],
    [5, 8, { hu: "A fasizmus feletti győzelem napja", sk: "Deň víťazstva nad fašizmom", en: "Victory over Fascism Day" }],
    [7, 5, { hu: "Szent Cirill és Metód", sk: "Sviatok sv. Cyrila a Metoda", en: "St. Cyril and Methodius Day" }],
    [8, 29, { hu: "A Szlovák Nemzeti Felkelés", sk: "Výročie SNP", en: "Slovak National Uprising" }],
    [9, 15, { hu: "Hétfájdalmú Szűz Mária", sk: "Sedembolestná Panna Mária", en: "Our Lady of Sorrows" }],
    [11, 1, { hu: "Mindenszentek", sk: "Sviatok všetkých svätých", en: "All Saints' Day" }],
    [11, 17, { hu: "A szabadságért és demokráciáért folytatott harc napja", sk: "Deň boja za slobodu a demokraciu", en: "Struggle for Freedom and Democracy Day" }],
    [12, 24, { hu: "Szenteste", sk: "Štedrý deň", en: "Christmas Eve" }],
    [12, 25, { hu: "Karácsony", sk: "Prvý sviatok vianočný", en: "Christmas Day" }],
    [12, 26, { hu: "Karácsony másnapja", sk: "Druhý sviatok vianočný", en: "St. Stephen's Day" }],
  ],
};

const unnepGyorsitotar = {};

// Egy ország adott évi ünnepei: { "2026-12-25": {hu, sk, en}, ... }
function unnepnapok(orszag, ev) {
  const kulcs = orszag + ev;
  if (unnepGyorsitotar[kulcs]) return unnepGyorsitotar[kulcs];
  const ki = {};
  const h = husvet(ev);
  for (const [a, b, nev] of UNNEP_SZABALYOK[orszag]) {
    const d = a === "H" ? new Date(h.getFullYear(), h.getMonth(), h.getDate() + b) : new Date(ev, a - 1, b);
    ki[datumKulcs(d)] = nev;
  }
  return (unnepGyorsitotar[kulcs] = ki);
}

function datumKulcs(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Ünnepnap-e az adott nap (orszag: "hu" | "sk" | "" = egyik sem)
function unnepE(d, orszag) {
  return orszag ? unnepnapok(orszag, d.getFullYear())[datumKulcs(d)] || null : null;
}
