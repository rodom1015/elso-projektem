/*
  EXCEL AKADÉMIA – interaktív leckék (kezdő → haladó)
  Minden leckében: rövid magyarázat, szintaxis, feladat egy kis táblázaton.
  A beírt képletet a saját képletmotor (keplet-motor.js) számolja ki, és összeveti a minta-megoldással.
  A minta-megoldás a szlovák Excel formájában van (angol nevek + ;) – a felület nyelvére fordítjuk.
  {SUM} jelölés a szövegben → a függvény neve az aktuális nyelven (magyarul SZUM).
*/

Object.assign(SZOVEGEK.hu, {
  ak_sub: "Tanuld meg az Excel függvényeket gyakorlással: olvasd el a magyarázatot, írd be a képletet, és azonnal látod, jó-e.",
  ak_beginner: "Kezdő", ak_advanced: "Haladó", ak_progress: "{k} / {n} lecke kész", ak_syntax: "Szintaxis", ak_task: "Feladat", ak_check: "Ellenőrzés", ak_hint: "Tipp", ak_solution: "Megoldás",
  ak_next: "Következő lecke →", ak_ph: "Írd ide a képletet, pl. {p}", ak_ok: "✅ Helyes! Az eredmény: {v}", ak_wrong: "❌ Nem jó. A te eredményed: {v}. Próbáld újra, vagy kérj tippet.",
  ak_need_fn: "A képlet jó eredményt ad, de ebben a leckében használd a(z) {f} függvényt.", ak_need: "Majdnem! Figyelj erre: {t}", ak_empty: "Írj be egy képletet (= jellel kezdődik).",
  ak_error: "⚠️ A képlet hibát ad: {v}. Nézd meg a zárójeleket és az elválasztót ({s}).", ak_target: "Az eredmény a(z) {c} cellába kerül.", ak_reset: "Haladás törlése", ak_reset_q: "Törlöd az összes lecke haladását?",
  ak_all_done: "🎉 Gratulálok! Minden leckét teljesítettél.", ak_sep: "elválasztó",
});
Object.assign(SZOVEGEK.sk, {
  ak_sub: "Nauč sa funkcie Excelu praxou: prečítaj si vysvetlenie, napíš vzorec a hneď uvidíš, či je správny.",
  ak_beginner: "Začiatočník", ak_advanced: "Pokročilý", ak_progress: "{k} / {n} lekcií hotových", ak_syntax: "Syntax", ak_task: "Úloha", ak_check: "Skontrolovať", ak_hint: "Nápoveda", ak_solution: "Riešenie",
  ak_next: "Ďalšia lekcia →", ak_ph: "Sem napíš vzorec, napr. {p}", ak_ok: "✅ Správne! Výsledok: {v}", ak_wrong: "❌ Nie je to správne. Tvoj výsledok: {v}. Skús znova alebo si vypýtaj nápovedu.",
  ak_need_fn: "Vzorec dáva správny výsledok, ale v tejto lekcii použi funkciu {f}.", ak_need: "Takmer! Pozor na toto: {t}", ak_empty: "Napíš vzorec (začína sa znakom =).",
  ak_error: "⚠️ Vzorec vracia chybu: {v}. Skontroluj zátvorky a oddeľovač ({s}).", ak_target: "Výsledok patrí do bunky {c}.", ak_reset: "Vymazať postup", ak_reset_q: "Vymazať postup vo všetkých lekciách?",
  ak_all_done: "🎉 Gratulujem! Splnil si všetky lekcie.", ak_sep: "oddeľovač",
});
Object.assign(SZOVEGEK.en, {
  ak_sub: "Learn Excel functions by doing: read the explanation, type the formula and see right away whether it's correct.",
  ak_beginner: "Beginner", ak_advanced: "Advanced", ak_progress: "{k} / {n} lessons done", ak_syntax: "Syntax", ak_task: "Task", ak_check: "Check", ak_hint: "Hint", ak_solution: "Solution",
  ak_next: "Next lesson →", ak_ph: "Type your formula here, e.g. {p}", ak_ok: "✅ Correct! The result: {v}", ak_wrong: "❌ Not quite. Your result: {v}. Try again or ask for a hint.",
  ak_need_fn: "The result is right, but in this lesson please use the {f} function.", ak_need: "Almost! Watch out for this: {t}", ak_empty: "Type a formula (it starts with =).",
  ak_error: "⚠️ The formula returns an error: {v}. Check the brackets and the separator ({s}).", ak_target: "The result goes into cell {c}.", ak_reset: "Reset progress", ak_reset_q: "Reset progress in every lesson?",
  ak_all_done: "🎉 Congratulations! You've completed every lesson.", ak_sep: "separator",
});

/* ---------- Adatok a feladatokhoz ---------- */
const AK_SZOVEG = {
  predaj: { hu: "Eladások", sk: "Predaj", en: "Sales" },
  cennik: { hu: "Árlista", sk: "Cenník", en: "Price list" },
  fej_predaj: { hu: ["Kereskedő", "Város", "Darab", "Egységár", "Bevétel", "Kedvezmény", "Bónusz", "Kedvezmény %"], sk: ["Obchodník", "Mesto", "Kusy", "Cena/ks", "Tržba", "Zľava", "Bonus", "Zľava %"], en: ["Seller", "City", "Units", "Unit price", "Revenue", "Discount", "Bonus", "Discount %"] },
  fej_cennik: { hu: ["Kód", "Termék", "Ár", "", "Keresett kód", "Eredmény"], sk: ["Kód", "Produkt", "Cena", "", "Hľadaný kód", "Výsledok"], en: ["Code", "Product", "Price", "", "Code to find", "Result"] },
  fej_csapat: { hu: ["Csapat", "Bevétel", "Ügyfelek", "Bevétel / ügyfél"], sk: ["Tím", "Tržba", "Zákazníci", "Tržba / zákazník"], en: ["Team", "Revenue", "Customers", "Revenue / customer"] },
  fej_datum: { hu: ["Kezdés", "Befejezés", "Munkanapok"], sk: ["Začiatok", "Koniec", "Pracovné dni"], en: ["Start", "End", "Working days"] },
  igen: { hu: "igen", sk: "áno", en: "yes" }, nem: { hu: "nem", sk: "nie", en: "no" }, nincs: { hu: "nincs", sk: "nenájdené", en: "not found" },
  csapat: { hu: ["Észak", "Dél"], sk: ["Sever", "Juh"], en: ["North", "South"] },
};
const akS = (k) => AK_SZOVEG[k][nyelv] ?? AK_SZOVEG[k].sk;

function akPredaj() {
  const f = akS("fej_predaj");
  return { [akS("predaj")]: [
    [f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7]],
    ["Anna", "Bratislava", 12, 25, null, null, null, { v: 0.1, d: "szazalek" }],
    ["Peter", "Košice", 7, 40],
    ["Eva", "Bratislava", 20, 15],
    ["Marek", "Žilina", 5, 60],
    ["Zuzana", "Košice", 9, 32],
    ["Tomáš", "Bratislava", 14, 25],
  ] };
}
function akCennik() {
  const f = akS("fej_cennik");
  return { [akS("cennik")]: [
    [f[0], f[1], f[2], null, f[4], f[5]],
    ["P-01", "Laptop", 899, null, "P-03"],
    ["P-02", "Monitor", 189, null, "P-09"],
    ["P-03", "Tablet", 349],
    ["P-04", "Router", 79],
    ["P-05", "Webcam", 59],
  ] };
}
function akCsapat() {
  const f = akS("fej_csapat"), n = akS("csapat");
  return { [akS("predaj")]: [[f[0], f[1], f[2], f[3]], [n[0], 1200, 30], [n[1], 800, 0]] };
}
function akDatum() {
  const f = akS("fej_datum");
  return { [akS("predaj")]: [[f[0], f[1], f[2]], [{ v: KM.datumbol(2026, 11, 2), d: "datum" }, { v: KM.datumbol(2026, 11, 13), d: "datum" }]] };
}

/* ---------- A leckék ---------- */
const AK_LECKEK = [
  { id: "sum", szint: "kezdo", fv: ["SUM"], adat: akPredaj, cel: "C8", megoldas: "SUM(C2:C7)",
    cim: { hu: "Összeadás: {SUM}", sk: "Súčet: {SUM}", en: "Adding up: {SUM}" },
    leiras: { hu: "A {SUM} összeadja egy tartomány számait. A tartományt kettősponttal adod meg: C2:C7 = C2-től C7-ig minden cella.", sk: "{SUM} sčíta čísla v rozsahu. Rozsah zapíšeš dvojbodkou: C2:C7 = všetky bunky od C2 po C7.", en: "{SUM} adds up the numbers in a range. Write the range with a colon: C2:C7 = every cell from C2 to C7." },
    feladat: { hu: "Add össze az eladott darabokat (C2:C7).", sk: "Sčítaj predané kusy (C2:C7).", en: "Add up the units sold (C2:C7)." },
    tipp: { hu: "Kezdd így: ={SUM}( majd jelöld ki a tartományt.", sk: "Začni takto: ={SUM}( a potom zadaj rozsah.", en: "Start with ={SUM}( and then enter the range." } },
  { id: "avg", szint: "kezdo", fv: ["AVERAGE"], adat: akPredaj, cel: "D8", megoldas: "AVERAGE(D2:D7)",
    cim: { hu: "Átlag: {AVERAGE}", sk: "Priemer: {AVERAGE}", en: "Average: {AVERAGE}" },
    leiras: { hu: "Az {AVERAGE} a számok átlagát adja (összeg ÷ darab). Az üres cellákat kihagyja.", sk: "{AVERAGE} vráti priemer čísel (súčet ÷ počet). Prázdne bunky vynechá.", en: "{AVERAGE} returns the mean of the numbers (sum ÷ count). Empty cells are skipped." },
    feladat: { hu: "Számold ki az egységárak átlagát (D2:D7).", sk: "Vypočítaj priemernú cenu za kus (D2:D7).", en: "Work out the average unit price (D2:D7)." },
    tipp: { hu: "Ugyanúgy működik, mint a {SUM}, csak más a függvény neve.", sk: "Funguje rovnako ako {SUM}, len má iný názov.", en: "It works just like {SUM}, only the name is different." } },
  { id: "szorzas", szint: "kezdo", fv: [], adat: akPredaj, cel: "E2", megoldas: "C2*D2", kell: [["C2", { hu: "használd a C2 cellát", sk: "použi bunku C2", en: "use cell C2" }], ["D2", { hu: "használd a D2 cellát", sk: "použi bunku D2", en: "use cell D2" }]],
    cim: { hu: "Számolás cellákkal", sk: "Počítanie s bunkami", en: "Calculating with cells" },
    leiras: { hu: "Képletben számok helyett cellákra hivatkozz – ha az adat változik, az eredmény magától frissül. Szorzás: *, osztás: /.", sk: "Vo vzorci namiesto čísel odkazuj na bunky – keď sa údaj zmení, výsledok sa aktualizuje sám. Násobenie: *, delenie: /.", en: "Refer to cells instead of typing numbers – when the data changes, the result updates by itself. Multiply: *, divide: /." },
    feladat: { hu: "Számold ki Anna bevételét: darab × egységár.", sk: "Vypočítaj tržbu Anny: kusy × cena za kus.", en: "Work out Anna's revenue: units × unit price." },
    tipp: { hu: "=C2*D2", sk: "=C2*D2", en: "=C2*D2" } },
  { id: "abszolut", szint: "kezdo", fv: [], adat: akPredaj, cel: "F2", megoldas: "C2*D2*$H$2", kell: [["\\$H\\$2", { hu: "a H2-t rögzítsd dollárjellel: $H$2 (F4 billentyű)", sk: "bunku H2 ukotvi znakom dolára: $H$2 (kláves F4)", en: "lock H2 with dollar signs: $H$2 (F4 key)" }]],
    cim: { hu: "Rögzített hivatkozás: $", sk: "Absolútny odkaz: $", en: "Absolute reference: $" },
    leiras: { hu: "Ha egy képletet lefelé másolsz, a hivatkozások is elcsúsznak (C2 → C3). A $ jellel rögzíted: $H$2 mindig H2 marad. Excelben az F4 teszi ki.", sk: "Keď vzorec kopíruješ nadol, odkazy sa posúvajú (C2 → C3). Znakom $ ich ukotvíš: $H$2 zostane vždy H2. V Exceli ho pridá kláves F4.", en: "When you copy a formula down, references shift (C2 → C3). The $ sign locks them: $H$2 always stays H2. In Excel, F4 adds it." },
    feladat: { hu: "Számold ki Anna kedvezményét: darab × egységár × a H2-ben lévő kedvezmény%. A H2-t rögzítsd!", sk: "Vypočítaj zľavu pre Annu: kusy × cena × zľava % z bunky H2. Bunku H2 ukotvi!", en: "Work out Anna's discount: units × price × the discount % in H2. Lock H2!" },
    tipp: { hu: "=C2*D2*$H$2", sk: "=C2*D2*$H$2", en: "=C2*D2*$H$2" } },
  { id: "max", szint: "kezdo", fv: ["MAX"], adat: akPredaj, cel: "C9", megoldas: "MAX(C2:C7)",
    cim: { hu: "Legnagyobb és legkisebb: {MAX}, {MIN}", sk: "Najväčšia a najmenšia: {MAX}, {MIN}", en: "Largest and smallest: {MAX}, {MIN}" },
    leiras: { hu: "A {MAX} a legnagyobb, a {MIN} a legkisebb számot adja vissza egy tartományból.", sk: "{MAX} vráti najväčšie, {MIN} najmenšie číslo z rozsahu.", en: "{MAX} returns the largest and {MIN} the smallest number in a range." },
    feladat: { hu: "Mennyi a legtöbb eladott darab egy kereskedőnél?", sk: "Aký je najvyšší počet predaných kusov jedného obchodníka?", en: "What is the highest number of units sold by one seller?" },
    tipp: { hu: "={MAX}(C2:C7)", sk: "={MAX}(C2:C7)", en: "={MAX}(C2:C7)" } },
  { id: "ha", szint: "kezdo", fv: ["IF"], adat: akPredaj, cel: "G2", megoldas: 'IF(C2>=10;"{igen}";"{nem}")',
    cim: { hu: "Feltétel: {IF}", sk: "Podmienka: {IF}", en: "Condition: {IF}" },
    leiras: { hu: "A {IF} megvizsgál egy feltételt: ha igaz, az első értéket adja, ha hamis, a másodikat. Összehasonlítás: > < >= <= = <>. Szöveget idézőjelbe tegyél.", sk: "{IF} otestuje podmienku: ak platí, vráti prvú hodnotu, inak druhú. Porovnanie: > < >= <= = <>. Text daj do úvodzoviek.", en: "{IF} tests a condition: if true it returns the first value, otherwise the second. Compare with > < >= <= = <>. Put text in quotes." },
    feladat: { hu: "Ha Anna legalább 10 darabot adott el, írja ki: \"{igen}\", különben: \"{nem}\".", sk: "Ak Anna predala aspoň 10 kusov, nech sa zobrazí \"{igen}\", inak \"{nem}\".", en: "If Anna sold at least 10 units, show \"{igen}\", otherwise \"{nem}\"." },
    tipp: { hu: "={IF}(C2>=10; ... ; ...)", sk: "={IF}(C2>=10; ... ; ...)", en: "={IF}(C2>=10, ... , ...)" } },
  { id: "darabteli", szint: "kezdo", fv: ["COUNTIF"], adat: akPredaj, cel: "B9", megoldas: 'COUNTIF(B2:B7;"Bratislava")',
    cim: { hu: "Számlálás feltétellel: {COUNTIF}", sk: "Počítanie s podmienkou: {COUNTIF}", en: "Counting with a condition: {COUNTIF}" },
    leiras: { hu: "A {COUNTIF} megszámolja, hány cella felel meg egy feltételnek, pl. hányszor szerepel egy név, vagy hány szám nagyobb 100-nál (\">100\").", sk: "{COUNTIF} spočíta bunky, ktoré spĺňajú podmienku, napr. koľkokrát sa vyskytuje meno alebo koľko čísel je väčších ako 100 (\">100\").", en: "{COUNTIF} counts the cells that meet a condition, e.g. how many times a name appears or how many numbers are above 100 (\">100\")." },
    feladat: { hu: "Hány kereskedő dolgozik Bratislavában?", sk: "Koľko obchodníkov pracuje v Bratislave?", en: "How many sellers work in Bratislava?" },
    tipp: { hu: "={COUNTIF}(B2:B7; \"Bratislava\")", sk: "={COUNTIF}(B2:B7; \"Bratislava\")", en: "={COUNTIF}(B2:B7, \"Bratislava\")" } },
  { id: "szumha", szint: "kezdo", fv: ["SUMIF"], adat: akPredaj, cel: "C10", megoldas: 'SUMIF(B2:B7;"Košice";C2:C7)',
    cim: { hu: "Összeg feltétellel: {SUMIF}", sk: "Súčet s podmienkou: {SUMIF}", en: "Sum with a condition: {SUMIF}" },
    leiras: { hu: "A {SUMIF} csak azokat a sorokat adja össze, ahol a feltétel teljesül: ({SUMIF}(hol keres; mit; mit ad össze)).", sk: "{SUMIF} sčíta len riadky, kde platí podmienka: ({SUMIF}(kde hľadá; čo; čo sčíta)).", en: "{SUMIF} adds only the rows where the condition is met: ({SUMIF}(where to look; what; what to add))." },
    feladat: { hu: "Hány darabot adtak el összesen Košicében?", sk: "Koľko kusov sa spolu predalo v Košiciach?", en: "How many units were sold in Košice in total?" },
    tipp: { hu: "={SUMIF}(B2:B7; \"Košice\"; C2:C7)", sk: "={SUMIF}(B2:B7; \"Košice\"; C2:C7)", en: "={SUMIF}(B2:B7, \"Košice\", C2:C7)" } },
  { id: "szoveg", szint: "kezdo", fv: [], adat: akPredaj, cel: "G3", megoldas: 'A2&" ("&B2&")"', kell: [["&|CONCAT|FŰZ|ÖSSZEFŰZ", { hu: "fűzd össze & jellel", sk: "spoj ich znakom &", en: "join them with &" }]],
    cim: { hu: "Szövegek összefűzése: &", sk: "Spájanie textov: &", en: "Joining text: &" },
    leiras: { hu: "Az & jel összefűzi a szövegeket és a cellákat. A szóközt és a zárójelet idézőjelben kell beírni: \" (\".", sk: "Znak & spája texty a bunky. Medzeru a zátvorku treba napísať v úvodzovkách: \" (\".", en: "The & sign joins text and cells. Spaces and brackets go inside quotes: \" (\"." },
    feladat: { hu: "Készítsd el: Anna (Bratislava)", sk: "Vytvor text: Anna (Bratislava)", en: "Build the text: Anna (Bratislava)" },
    tipp: { hu: "=A2&\" (\"&B2&\")\"", sk: "=A2&\" (\"&B2&\")\"", en: "=A2&\" (\"&B2&\")\"" } },
  { id: "fkeres", szint: "halado", fv: ["VLOOKUP"], adat: akCennik, cel: "F2", megoldas: "VLOOKUP(E2;A2:C6;3;FALSE)",
    kell: [["(FALSE|HAMIS|[;,]\\s*0\\s*\\))", { hu: "a 4. argumentum legyen HAMIS (pontos egyezés)", sk: "4. argument má byť FALSE (presná zhoda)", en: "the 4th argument must be FALSE (exact match)" }]],
    cim: { hu: "Keresés táblázatban: {VLOOKUP}", sk: "Vyhľadávanie v tabuľke: {VLOOKUP}", en: "Lookup in a table: {VLOOKUP}" },
    leiras: { hu: "A {VLOOKUP} a táblázat ELSŐ oszlopában keres, és ugyanabból a sorból egy másik oszlop értékét adja. A 4. argumentum {FALSE} = pontos egyezés – mindig írd ki!", sk: "{VLOOKUP} hľadá v PRVOM stĺpci tabuľky a vráti hodnotu z iného stĺpca toho istého riadku. 4. argument {FALSE} = presná zhoda – vždy ho napíš!", en: "{VLOOKUP} searches the FIRST column of a table and returns a value from another column of the same row. The 4th argument {FALSE} = exact match – always include it!" },
    feladat: { hu: "Keresd meg az E2-ben lévő kód árát (a táblázat 3. oszlopa).", sk: "Nájdi cenu kódu z bunky E2 (3. stĺpec tabuľky).", en: "Find the price of the code in E2 (3rd column of the table)." },
    tipp: { hu: "={VLOOKUP}(E2; A2:C6; 3; {FALSE})", sk: "={VLOOKUP}(E2; A2:C6; 3; {FALSE})", en: "={VLOOKUP}(E2, A2:C6, 3, {FALSE})" } },
  { id: "xkeres", szint: "halado", fv: ["XLOOKUP"], adat: akCennik, cel: "F3", megoldas: 'XLOOKUP(E3;A2:A6;C2:C6;"{nincs}")',
    cim: { hu: "Modern keresés: {XLOOKUP}", sk: "Moderné vyhľadávanie: {XLOOKUP}", en: "Modern lookup: {XLOOKUP}" },
    leiras: { hu: "Az {XLOOKUP} rugalmasabb: külön adod meg, hol keressen és honnan adjon vissza, és megadhatod, mit írjon, ha nincs találat (nem kell {IFERROR}).", sk: "{XLOOKUP} je flexibilnejší: zvlášť zadáš, kde hľadať a odkiaľ vrátiť, a môžeš určiť, čo napísať, ak sa nič nenájde (netreba {IFERROR}).", en: "{XLOOKUP} is more flexible: you say separately where to search and where to return from, and what to show if nothing is found (no {IFERROR} needed)." },
    feladat: { hu: "Keresd meg az E3-ban lévő kód árát; ha nincs ilyen, írja ki: \"{nincs}\".", sk: "Nájdi cenu kódu z E3; ak neexistuje, nech sa zobrazí \"{nincs}\".", en: "Find the price of the code in E3; if it doesn't exist, show \"{nincs}\"." },
    tipp: { hu: "={XLOOKUP}(E3; A2:A6; C2:C6; \"{nincs}\")", sk: "={XLOOKUP}(E3; A2:A6; C2:C6; \"{nincs}\")", en: "={XLOOKUP}(E3, A2:A6, C2:C6, \"{nincs}\")" } },
  { id: "indexhol", szint: "halado", fv: ["INDEX", "MATCH"], adat: akCennik, cel: "F4", megoldas: "INDEX(B2:B6;MATCH(E2;A2:A6;0))",
    cim: { hu: "Profi páros: {INDEX} + {MATCH}", sk: "Profi dvojica: {INDEX} + {MATCH}", en: "The pro pair: {INDEX} + {MATCH}" },
    leiras: { hu: "A {MATCH} megmondja, hányadik sorban van a keresett érték; az {INDEX} kiveszi az adott sor értékét bármelyik oszlopból – balra is tud keresni, és minden Excel-verzióban működik.", sk: "{MATCH} povie, v ktorom riadku je hľadaná hodnota; {INDEX} vyberie hodnotu z daného riadku z ľubovoľného stĺpca – vie hľadať aj doľava a funguje v každej verzii Excelu.", en: "{MATCH} tells you which row holds the value; {INDEX} takes that row's value from any column – it can look to the left and works in every Excel version." },
    feladat: { hu: "Add meg az E2-ben lévő kódhoz tartozó termék nevét.", sk: "Zisti názov produktu pre kód v bunke E2.", en: "Return the product name for the code in E2." },
    tipp: { hu: "={INDEX}(B2:B6; {MATCH}(E2; A2:A6; 0))", sk: "={INDEX}(B2:B6; {MATCH}(E2; A2:A6; 0))", en: "={INDEX}(B2:B6, {MATCH}(E2, A2:A6, 0))" } },
  { id: "szumhatobb", szint: "halado", fv: ["SUMIFS"], adat: akPredaj, cel: "C11", megoldas: 'SUMIFS(C2:C7;B2:B7;"Bratislava";D2:D7;">=20")',
    cim: { hu: "Több feltétel: {SUMIFS}", sk: "Viac podmienok: {SUMIFS}", en: "Several conditions: {SUMIFS}" },
    leiras: { hu: "A {SUMIFS}-ban először azt adod meg, mit adjon össze, utána feltétel-párokat (tartomány; feltétel). Minden feltételnek teljesülnie kell.", sk: "Vo {SUMIFS} najprv zadáš, čo sčítať, potom dvojice podmienok (rozsah; podmienka). Musia platiť všetky.", en: "In {SUMIFS} you first give what to add, then pairs of (range; condition). All conditions must be met." },
    feladat: { hu: "Hány darabot adtak el Bratislavában, ahol az egységár legalább 20?", sk: "Koľko kusov sa predalo v Bratislave pri cene za kus aspoň 20?", en: "How many units were sold in Bratislava at a unit price of at least 20?" },
    tipp: { hu: "={SUMIFS}(C2:C7; B2:B7; \"Bratislava\"; D2:D7; \">=20\")", sk: "={SUMIFS}(C2:C7; B2:B7; \"Bratislava\"; D2:D7; \">=20\")", en: "={SUMIFS}(C2:C7, B2:B7, \"Bratislava\", D2:D7, \">=20\")" } },
  { id: "hahiba", szint: "halado", fv: ["IFERROR"], adat: akCsapat, cel: "D3", megoldas: "IFERROR(B3/C3;0)",
    cim: { hu: "Hibák elkapása: {IFERROR}", sk: "Zachytenie chýb: {IFERROR}", en: "Catching errors: {IFERROR}" },
    leiras: { hu: "Ha egy képlet hibát adna (pl. #ZÉRÓOSZTÓ! nullával osztásnál), az {IFERROR} helyette a megadott értéket mutatja.", sk: "Ak by vzorec vrátil chybu (napr. #DIV/0! pri delení nulou), {IFERROR} namiesto nej zobrazí zadanú hodnotu.", en: "If a formula would return an error (e.g. #DIV/0! when dividing by zero), {IFERROR} shows the value you give instead." },
    feladat: { hu: "Számold ki a Dél csapat bevétel / ügyfél értékét; mivel 0 ügyfél van, hiba helyett 0 legyen.", sk: "Vypočítaj tržbu na zákazníka pre tím Juh; keďže má 0 zákazníkov, namiesto chyby nech je 0.", en: "Work out revenue per customer for team South; since it has 0 customers, show 0 instead of an error." },
    tipp: { hu: "={IFERROR}(B3/C3; 0)", sk: "={IFERROR}(B3/C3; 0)", en: "={IFERROR}(B3/C3, 0)" } },
  { id: "munkanap", szint: "halado", fv: ["NETWORKDAYS"], adat: akDatum, cel: "C2", megoldas: "NETWORKDAYS(A2;B2)",
    cim: { hu: "Munkanapok: {NETWORKDAYS}", sk: "Pracovné dni: {NETWORKDAYS}", en: "Working days: {NETWORKDAYS}" },
    leiras: { hu: "A {NETWORKDAYS} megszámolja a hétköznapokat két dátum között (a kezdő és záró napot is). 3. argumentumként megadhatod az ünnepnapok listáját.", sk: "{NETWORKDAYS} spočíta pracovné dni medzi dvoma dátumami (vrátane prvého a posledného). Ako 3. argument môžeš zadať zoznam sviatkov.", en: "{NETWORKDAYS} counts the weekdays between two dates (including both ends). As a 3rd argument you can give a list of holidays." },
    feladat: { hu: "Hány munkanap van a két dátum között?", sk: "Koľko pracovných dní je medzi dvoma dátumami?", en: "How many working days are there between the two dates?" },
    tipp: { hu: "={NETWORKDAYS}(A2; B2)", sk: "={NETWORKDAYS}(A2; B2)", en: "={NETWORKDAYS}(A2, B2)" } },
];

/* ---------- Segédek ---------- */
let akAktiv = AK_LECKEK[0].id;
let akKesz = new Set();
try { akKesz = new Set(JSON.parse(localStorage.getItem("akademia") || "[]")); } catch {}
const akMent = () => { try { localStorage.setItem("akademia", JSON.stringify([...akKesz])); } catch {} };
const akFvNev = (en) => (nyelv === "hu" && typeof EN_HU !== "undefined" && EN_HU[en] ? EN_HU[en] : en);
const akLogikai = (en) => (nyelv === "hu" ? { FALSE: "HAMIS", TRUE: "IGAZ" }[en] : en);
// {SUM} → SZUM / SUM ; {igen} → áno …
function akSzoveg(s) {
  return String(s).replace(/\{([A-Za-z.]+)\}/g, (m, k) => {
    if (AK_SZOVEG[k]) return akS(k);
    if (k === "FALSE" || k === "TRUE") return akLogikai(k);
    return akFvNev(k);
  });
}
const akMegoldas = (l) => {
  const sk = l.megoldas.replace(/\{(igen|nem|nincs)\}/g, (m, k) => akS(k));
  return "=" + (nyelv === "sk" ? sk : kepletForditas(sk, "sk", nyelv).ki);
};

// A lecke táblázata a képletmotor számára
function akKornyezet(l, felulir = {}) {
  const lapok = l.adat();
  const nevek = Object.keys(lapok);
  const cella = (lap, r, c) => {
    const nev = typeof lap === "number" ? nevek[lap] : nevek.find((n) => n.toLowerCase() === String(lap).toLowerCase());
    if (!nev) return KM.HIBA("#REF!");
    const kulcs = nev + "!" + KM.oszlopBetuje(c) + (r + 1);
    if (kulcs in felulir) return felulir[kulcs];
    const x = (lapok[nev][r] || [])[c];
    if (x === undefined || x === null) return null;
    return typeof x === "object" ? x.v : x;
  };
  return { lapok, nevek, ctx: { lap: 0, cella, hatar: (lap) => ({ sorok: (lapok[typeof lap === "number" ? nevek[lap] : lap] || []).length + 10, oszlopok: 10 }), lapLetezik: (n) => nevek.some((x) => x.toLowerCase() === String(n).toLowerCase()) } };
}
function akSzamol(keplet, l) {
  const src = keplet.trim().replace(/^=/, "");
  const { ctx } = akKornyezet(l);
  let v = KM.kiertekel(KM.keplet(src, nyelv !== "en"), ctx);
  if (KM.tartomanyE(v)) v = ctx.cella(v.lap, v.r1, v.c1);
  return v;
}
function akFuggvenyek(src) {
  const ki = new Set();
  const bejar = (n) => {
    if (!n || typeof n !== "object") return;
    if (n.t === "fn") ki.add((typeof HU_EN !== "undefined" && HU_EN[n.nev]) || n.nev);
    Object.values(n).forEach((x) => (Array.isArray(x) ? x.forEach(bejar) : typeof x === "object" && bejar(x)));
  };
  bejar(KM.keplet(src.trim().replace(/^=/, ""), nyelv !== "en"));
  return ki;
}
function akErtek(v) {
  if (v === null || v === undefined) return "∅";
  if (KM.hibaE(v)) return nyelv === "hu" && typeof HIBAERTEKEK !== "undefined" ? HIBAERTEKEK[v.hiba] || v.hiba : v.hiba;
  if (typeof v === "number") return (+v.toPrecision(12)).toLocaleString(locale(), { maximumFractionDigits: 4 });
  if (typeof v === "boolean") return akLogikai(v ? "TRUE" : "FALSE");
  return String(v);
}
const akEgyenlo = (a, b) => {
  if (typeof a === "number" && typeof b === "number") return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));
  if (KM.hibaE(a) || KM.hibaE(b)) return KM.hibaE(a) && KM.hibaE(b) && a.hiba === b.hiba;
  return String(a ?? "").trim().toLowerCase() === String(b ?? "").trim().toLowerCase();
};

/* ---------- Megjelenítés ---------- */
function akListaRajzol() {
  const doboz = $("ak-lista");
  doboz.innerHTML = "";
  for (const szint of ["kezdo", "halado"]) {
    const h = document.createElement("h3");
    h.textContent = t(szint === "kezdo" ? "ak_beginner" : "ak_advanced");
    doboz.appendChild(h);
    AK_LECKEK.filter((l) => l.szint === szint).forEach((l) => {
      const g = document.createElement("button");
      g.type = "button";
      g.className = "ak-pont" + (l.id === akAktiv ? " aktiv" : "") + (akKesz.has(l.id) ? " kesz" : "");
      g.innerHTML = `<span class="ak-jel"></span><span></span>`;
      g.firstChild.textContent = akKesz.has(l.id) ? "✓" : String(AK_LECKEK.indexOf(l) + 1);
      g.lastChild.textContent = akSzoveg(l.cim[nyelv]);
      g.addEventListener("click", () => { akAktiv = l.id; akRajzol(); $("ak-be").focus(); });
      doboz.appendChild(g);
    });
  }
  const db = AK_LECKEK.filter((l) => akKesz.has(l.id)).length;
  $("ak-haladas").textContent = t("ak_progress", { k: db, n: AK_LECKEK.length });
  $("ak-haladas-sav").style.width = (db / AK_LECKEK.length) * 100 + "%";
}

function akTablaRajzol(l, eredmeny) {
  const { lapok, nevek } = akKornyezet(l);
  const doboz = $("ak-tabla");
  doboz.innerHTML = "";
  const lap = lapok[nevek[0]];
  const oszlopok = Math.max(...lap.map((s) => s.length), KM.oszlopSzam(l.cel.match(/[A-Z]+/)[0]) + 1);
  const sorok = Math.max(lap.length, +l.cel.match(/\d+/)[0]);
  const cim = document.createElement("div");
  cim.className = "ak-lapnev";
  cim.textContent = "📄 " + nevek[0];
  doboz.appendChild(cim);
  const t2 = document.createElement("table");
  t2.className = "ak-tabla-racs";
  let html = "<thead><tr><th></th>";
  for (let c = 0; c < oszlopok; c++) html += `<th>${KM.oszlopBetuje(c)}</th>`;
  html += "</tr></thead><tbody>";
  for (let r = 0; r < sorok; r++) {
    html += `<tr><th>${r + 1}</th>`;
    for (let c = 0; c < oszlopok; c++) {
      const ref = KM.oszlopBetuje(c) + (r + 1);
      const x = (lap[r] || [])[c];
      let szoveg = "", osztaly = r === 0 ? "fej" : "";
      if (x !== undefined && x !== null) {
        const v = typeof x === "object" ? x.v : x;
        if (typeof x === "object" && x.d === "szazalek") szoveg = Math.round(v * 100) + "%";
        else if (typeof x === "object" && x.d === "datum") { const d = KM.datumra(v); szoveg = new Date(d.y, d.m - 1, d.d).toLocaleDateString(locale()); }
        else szoveg = typeof v === "number" ? v.toLocaleString(locale()) : String(v);
        if (typeof v === "number") osztaly += " szam";
      }
      if (ref === l.cel) { osztaly += " cel"; szoveg = eredmeny !== undefined ? akErtek(eredmeny) : "?"; }
      html += `<td class="${osztaly}">${dEsc(szoveg)}</td>`;
    }
    html += "</tr>";
  }
  t2.innerHTML = html + "</tbody>";
  doboz.appendChild(t2);
}

function akRajzol() {
  const l = AK_LECKEK.find((x) => x.id === akAktiv) || AK_LECKEK[0];
  akListaRajzol();
  $("ak-szint").textContent = t(l.szint === "kezdo" ? "ak_beginner" : "ak_advanced");
  $("ak-szint").className = "ak-szint " + l.szint;
  $("ak-cim").textContent = akSzoveg(l.cim[nyelv]);
  $("ak-leiras").textContent = akSzoveg(l.leiras[nyelv]);
  const szint = $("ak-szintaxis-doboz");
  const fv = l.fv.map((en) => FUGGVENYEK.find((f) => f.en === en)).filter(Boolean);
  szint.hidden = !fv.length;
  $("ak-szintaxis").textContent = fv.map((f) => fvSzintaxis(f)).join("\n");
  $("ak-feladat").textContent = akSzoveg(l.feladat[nyelv]) + " " + t("ak_target", { c: l.cel });
  $("ak-be").value = "";
  $("ak-be").placeholder = t("ak_ph", { p: nyelv === "en" ? "=SUM(A1,B1)" : nyelv === "hu" ? "=SZUM(A1;B1)" : "=SUM(A1;B1)" });
  $("ak-visszajelzes").textContent = "";
  $("ak-visszajelzes").className = "ak-visszajelzes";
  $("ak-kov").hidden = true;
  akTablaRajzol(l);
}

function akEllenoriz() {
  const l = AK_LECKEK.find((x) => x.id === akAktiv);
  const be = $("ak-be").value.trim();
  const vj = $("ak-visszajelzes");
  if (!be) { vj.textContent = t("ak_empty"); vj.className = "ak-visszajelzes info"; return; }
  const forras = be.startsWith("=") ? be : "=" + be;
  const v = akSzamol(forras, l);
  const vart = akSzamol(akMegoldas(l), l);
  akTablaRajzol(l, v);
  if (KM.hibaE(v) && !KM.hibaE(vart)) {
    vj.textContent = t("ak_error", { v: akErtek(v), s: nyelv === "en" ? "," : ";" });
    vj.className = "ak-visszajelzes rossz";
    return;
  }
  if (!akEgyenlo(v, vart)) { vj.textContent = t("ak_wrong", { v: akErtek(v) }); vj.className = "ak-visszajelzes rossz"; return; }
  const hasznalt = akFuggvenyek(forras);
  const hianyzo = l.fv.find((f) => !hasznalt.has(f));
  if (hianyzo) { vj.textContent = t("ak_need_fn", { f: akFvNev(hianyzo) }); vj.className = "ak-visszajelzes info"; return; }
  for (const [minta, uzenet] of l.kell || []) {
    if (!new RegExp(minta, "i").test(forras)) { vj.textContent = t("ak_need", { t: uzenet[nyelv] }); vj.className = "ak-visszajelzes info"; return; }
  }
  vj.textContent = t("ak_ok", { v: akErtek(v) });
  vj.className = "ak-visszajelzes jo";
  const ujKesz = !akKesz.has(l.id);
  akKesz.add(l.id);
  akMent();
  akListaRajzol();
  const i = AK_LECKEK.indexOf(l);
  $("ak-kov").hidden = i >= AK_LECKEK.length - 1;
  if (akKesz.size === AK_LECKEK.length && ujKesz) ertesit(t("ak_all_done"));
  esemenyKuld("masol", "Akademia " + l.id);
}

$("ak-ellenoriz").addEventListener("click", akEllenoriz);
$("ak-be").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); akEllenoriz(); } });
$("ak-tipp").addEventListener("click", () => {
  const l = AK_LECKEK.find((x) => x.id === akAktiv);
  $("ak-visszajelzes").textContent = "💡 " + akSzoveg(l.tipp[nyelv]);
  $("ak-visszajelzes").className = "ak-visszajelzes info";
});
$("ak-megoldas").addEventListener("click", () => {
  const l = AK_LECKEK.find((x) => x.id === akAktiv);
  $("ak-be").value = akMegoldas(l);
  $("ak-visszajelzes").textContent = "👀 " + akMegoldas(l);
  $("ak-visszajelzes").className = "ak-visszajelzes info";
  $("ak-be").focus();
});
$("ak-kov").addEventListener("click", () => {
  const i = AK_LECKEK.findIndex((x) => x.id === akAktiv);
  akAktiv = (AK_LECKEK.slice(i + 1).find((l) => !akKesz.has(l.id)) || AK_LECKEK[Math.min(i + 1, AK_LECKEK.length - 1)]).id;
  akRajzol();
  $("ak-be").focus();
});
$("ak-torles").addEventListener("click", () => { if (confirm(t("ak_reset_q"))) { akKesz.clear(); akMent(); akRajzol(); } });

forditasHookok.push(akRajzol);
oldalHookok.tanulas = (al) => { if (AK_LECKEK.some((l) => l.id === al)) akAktiv = al; akRajzol(); };
// első nem teljesített lecke
akAktiv = (AK_LECKEK.find((l) => !akKesz.has(l.id)) || AK_LECKEK[0]).id;
akRajzol();
