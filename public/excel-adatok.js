/*
  EXCEL SÚGÓ ADATOK (magyar / szlovák / angol)
  ============================================
  Függvények:  F(magyar név, angol név, kategória, magyar paraméterek, angol paraméterek, példa képlet, leírások)
    - A példa képletet a szlovák Excel formájában írjuk: angol függvénynevek + pontosvessző (;).
      Ebből a program automatikusan elkészíti a magyar (magyar nevek, ;) és az angol (vessző) változatot.
    - A szlovák Excel az angol függvényneveket használja, de pontosvesszővel.
  Billentyűk:  csoportok, soronként: [leírások, billentyű-kombináció(k)]
*/

const KATEGORIAK = {
  kereses:   { szin: "kek",     nev: { hu: "Keresés és hivatkozás", sk: "Vyhľadávanie a odkazy", en: "Lookup & reference" } },
  logikai:   { szin: "lila",    nev: { hu: "Logikai és infó",       sk: "Logické a informačné",  en: "Logical & info" } },
  matek:     { szin: "zold",    nev: { hu: "Matek",                 sk: "Matematika",            en: "Math" } },
  stat:      { szin: "narancs", nev: { hu: "Statisztika és számlálás", sk: "Štatistika a počítanie", en: "Statistics & counting" } },
  szoveg:    { szin: "narancs", nev: { hu: "Szöveg",                sk: "Text",                  en: "Text" } },
  datum:     { szin: "kek",     nev: { hu: "Dátum és idő",          sk: "Dátum a čas",           en: "Date & time" } },
  dinamikus: { szin: "lila",    nev: { hu: "Dinamikus tömbök",      sk: "Dynamické polia",       en: "Dynamic arrays" } },
  excel2024: { szin: "zold",    nev: { hu: "Új – Excel 2024",       sk: "Nové – Excel 2024",     en: "New – Excel 2024" } },
};

const FUGGVENYEK = [];
function F(hu, en, kat, parHu, parEn, keplet, hu_, sk_, en_) {
  FUGGVENYEK.push({ hu, en, kat, parHu, parEn, keplet, leiras: { hu: hu_, sk: sk_, en: en_ } });
}

/* ---------------- Keresés és hivatkozás ---------------- */
F("FKERES", "VLOOKUP", "kereses", "keresési_érték; tábla; oszlop_szám; [tartományban_keres]", "lookup_value, table_array, col_index_num, [range_lookup]",
  "=VLOOKUP(A2; $E$2:$G$100; 3; 0)",
  "Megkeresi A2-t a táblázat első oszlopában, és ugyanabból a sorból a 3. oszlop értékét adja vissza. A 0 = pontos egyezés.",
  "Nájde A2 v prvom stĺpci tabuľky a vráti hodnotu z 3. stĺpca v tom istom riadku. 0 = presná zhoda.",
  "Finds A2 in the first column of the table and returns the value from the 3rd column of the same row. 0 = exact match.");
F("VKERES", "HLOOKUP", "kereses", "keresési_érték; tábla; sor_szám; [tartományban_keres]", "lookup_value, table_array, row_index_num, [range_lookup]",
  "=HLOOKUP(B1; $A$10:$M$12; 2; 0)",
  "Mint az FKERES, csak vízszintesen: a táblázat első sorában keres, és lefelé a 2. sorból ad vissza értéket.",
  "Ako VLOOKUP, ale vodorovne: hľadá v prvom riadku tabuľky a vráti hodnotu z 2. riadku.",
  "Like VLOOKUP but horizontal: searches the first row of the table and returns a value from the 2nd row.");
F("XKERES", "XLOOKUP", "kereses", "keresési_érték; keresési_tömb; visszaadási_tömb; [ha_nincs]", "lookup_value, lookup_array, return_array, [if_not_found]",
  '=XLOOKUP(A2; $E$2:$E$100; $G$2:$G$100; "-")',
  "Az FKERES modern utódja: bármelyik irányba keres, nem kell oszlopszám, és megadható, mit írjon ki, ha nincs találat. (Excel 2021 / 365)",
  "Moderný nástupca VLOOKUP: hľadá ľubovoľným smerom, netreba číslo stĺpca a určíš, čo sa zobrazí, ak sa nič nenájde. (Excel 2021 / 365)",
  "The modern successor of VLOOKUP: searches in any direction, no column number needed, and you can set a value for 'not found'. (Excel 2021 / 365)");
F("INDEX", "INDEX", "kereses", "tömb; sor_szám; [oszlop_szám]", "array, row_num, [column_num]",
  "=INDEX($A$2:$D$100; 5; 2)",
  "A tartomány 5. sorának 2. oszlopában lévő értéket adja vissza. A HOL.VAN függvénnyel együtt rugalmas keresést ad.",
  "Vráti hodnotu z 5. riadku a 2. stĺpca rozsahu. Spolu s MATCH tvorí flexibilné vyhľadávanie.",
  "Returns the value in row 5, column 2 of the range. Combined with MATCH it gives a flexible lookup.");
F("HOL.VAN", "MATCH", "kereses", "keresési_érték; tartomány; [egyezés_típus]", "lookup_value, lookup_array, [match_type]",
  "=INDEX($C$2:$C$100; MATCH(A2; $A$2:$A$100; 0))",
  "Megadja, hányadik helyen van A2 a listában. Az INDEX-szel együtt: kikeresi a C oszlop megfelelő értékét – régi Excelekben is működik.",
  "Zistí, na ktorom mieste v zozname je A2. S INDEX vráti zodpovedajúcu hodnotu zo stĺpca C – funguje aj v starších verziách.",
  "Gives the position of A2 in the list. With INDEX it returns the matching value from column C – works in older Excel too.");
F("XHOL.VAN", "XMATCH", "kereses", "keresési_érték; keresési_tömb; [egyezés_mód]; [keresési_mód]", "lookup_value, lookup_array, [match_mode], [search_mode]",
  "=XMATCH(A2; $E$2:$E$100)",
  "A HOL.VAN modern változata: alapból pontos egyezést keres, és visszafelé is tud keresni. (Excel 2021 / 365)",
  "Moderná verzia MATCH: predvolene hľadá presnú zhodu a vie hľadať aj odzadu. (Excel 2021 / 365)",
  "Modern version of MATCH: exact match by default and can search from the end. (Excel 2021 / 365)");
F("ELTOLÁS", "OFFSET", "kereses", "hivatkozás; sorok; oszlopok; [magasság]; [szélesség]", "reference, rows, cols, [height], [width]",
  "=SUM(OFFSET(A1; 1; 2; 12; 1))",
  "Egy kezdőcellától eltolt tartományt ad: itt A1-től 1 sorral lejjebb és 2 oszloppal jobbra induló 12 cellát összegez.",
  "Vráti rozsah posunutý od začiatočnej bunky: tu sčíta 12 buniek začínajúcich o 1 riadok nižšie a 2 stĺpce vpravo od A1.",
  "Returns a range shifted from a starting cell: here it sums 12 cells starting 1 row down and 2 columns right of A1.");
F("INDIREKT", "INDIRECT", "kereses", "hivatkozás_szöveg; [a1]", "ref_text, [a1]",
  '=INDIRECT("B" & D1)',
  "Szövegből készít cellahivatkozást: ha D1-ben 5 áll, a B5 cella értékét adja vissza.",
  "Vytvorí odkaz na bunku z textu: ak je v D1 číslo 5, vráti hodnotu bunky B5.",
  "Builds a cell reference from text: if D1 contains 5, it returns the value of cell B5.");
F("VÁLASZT", "CHOOSE", "kereses", "index; érték1; [érték2]; …", "index_num, value1, [value2], …",
  '=CHOOSE(A2; "I."; "II."; "III."; "IV.")',
  "Az index alapján választ a felsorolt értékek közül: ha A2 = 3, az eredmény „III.”.",
  "Podľa indexu vyberie jednu z hodnôt: ak A2 = 3, výsledok je „III.“.",
  "Picks one of the listed values by index: if A2 = 3, the result is \"III.\".");
F("SOR", "ROW", "kereses", "[hivatkozás]", "[reference]",
  "=ROW()-1",
  "A cella sorszámát adja vissza. Fejléc alatt a SOR()-1 automatikus sorszámozást ad.",
  "Vráti číslo riadku bunky. Pod hlavičkou dá ROW()-1 automatické číslovanie.",
  "Returns the row number of a cell. Below a header, ROW()-1 gives automatic numbering.");
F("OSZLOP", "COLUMN", "kereses", "[hivatkozás]", "[reference]",
  "=COLUMN(D1)",
  "Az oszlop sorszámát adja vissza (D = 4). Hasznos az FKERES oszlopszámának automatikus számolásához.",
  "Vráti číslo stĺpca (D = 4). Užitočné na automatické určenie čísla stĺpca pre VLOOKUP.",
  "Returns the column number (D = 4). Handy for computing the VLOOKUP column number automatically.");
F("TRANSZPONÁLÁS", "TRANSPOSE", "kereses", "tömb", "array",
  "=TRANSPOSE(A1:D3)",
  "Elforgatja a tartományt: a sorokból oszlopok lesznek és fordítva.",
  "Otočí rozsah: z riadkov sa stanú stĺpce a naopak.",
  "Flips a range: rows become columns and vice versa.");
F("HIPERHIVATKOZÁS", "HYPERLINK", "kereses", "hivatkozás_helye; [rövid_név]", "link_location, [friendly_name]",
  '=HYPERLINK("https://www.google.com"; "Google")',
  "Kattintható hivatkozást készít egy weboldalra, fájlra vagy a munkafüzet egy cellájára.",
  "Vytvorí klikateľný odkaz na webovú stránku, súbor alebo bunku v zošite.",
  "Creates a clickable link to a web page, a file or a cell in the workbook.");

/* ---------------- Logikai és infó ---------------- */
F("HA", "IF", "logikai", "feltétel; érték_ha_igaz; érték_ha_hamis", "logical_test, value_if_true, value_if_false",
  '=IF(B2>=50; "OK"; "-")',
  "Feltételtől függően két eredmény közül választ: ha B2 legalább 50, „OK”, különben „-”.",
  "Podľa podmienky vyberie jeden z dvoch výsledkov: ak je B2 aspoň 50, „OK“, inak „-“.",
  "Chooses between two results based on a condition: if B2 is at least 50, \"OK\", otherwise \"-\".");
F("HAELSŐIGAZ", "IFS", "logikai", "feltétel1; érték1; [feltétel2; érték2]; …", "logical_test1, value_if_true1, …",
  '=IFS(B2>=90; "A"; B2>=75; "B"; B2>=50; "C"; B2<50; "D")',
  "Több feltételt vizsgál sorban, és az első igaz feltétel értékét adja – nem kell egymásba ágyazott HA.",
  "Postupne testuje viac podmienok a vráti hodnotu prvej pravdivej – netreba vnorené IF.",
  "Tests several conditions in order and returns the value of the first true one – no nested IFs needed.");
F("ÁTVÁLT", "SWITCH", "logikai", "kifejezés; érték1; eredmény1; …; [alapértelmezett]", "expression, value1, result1, …, [default]",
  '=SWITCH(A2; 1; "Q1"; 2; "Q2"; 3; "Q3"; "Q4")',
  "Egy érték alapján választ eredményt; az utolsó, pár nélküli érték az alapértelmezett.",
  "Podľa hodnoty vyberie výsledok; posledná hodnota bez páru je predvolená.",
  "Picks a result based on a value; the last unpaired value is the default.");
F("HAHIBA", "IFERROR", "logikai", "érték; érték_hiba_esetén", "value, value_if_error",
  '=IFERROR(VLOOKUP(A2; $E$2:$G$100; 3; 0); "-")',
  "Ha a képlet hibát ad (#HIÁNYZIK, #ZÉRÓOSZTÓ! stb.), helyette a megadott értéket mutatja.",
  "Ak vzorec vráti chybu (#N/A, #DIV/0! atď.), zobrazí namiesto nej zadanú hodnotu.",
  "If the formula returns an error (#N/A, #DIV/0! etc.), shows the given value instead.");
F("HAHIÁNYZIK", "IFNA", "logikai", "érték; érték_ha_hiányzik", "value, value_if_na",
  '=IFNA(MATCH(A2; $E$2:$E$100; 0); "nincs")',
  "Csak a #HIÁNYZIK hibát cseréli le – a többi hiba látszik marad, így nem rejt el valódi hibát.",
  "Nahradí iba chybu #N/A – ostatné chyby zostanú viditeľné, takže neskryje skutočný problém.",
  "Replaces only the #N/A error – other errors stay visible, so real problems are not hidden.");
F("ÉS", "AND", "logikai", "logikai1; [logikai2]; …", "logical1, [logical2], …",
  '=IF(AND(B2>0; C2="OK"); "Kész"; "-")',
  "Akkor IGAZ, ha minden feltétel teljesül. Itt: B2 pozitív ÉS C2 = „OK”.",
  "Je PRAVDA, ak platia všetky podmienky. Tu: B2 je kladné A ZÁROVEŇ C2 = „OK“.",
  "TRUE if all conditions are met. Here: B2 is positive AND C2 = \"OK\".");
F("VAGY", "OR", "logikai", "logikai1; [logikai2]; …", "logical1, [logical2], …",
  '=IF(OR(C2="A"; C2="B"); 1; 0)',
  "Akkor IGAZ, ha legalább egy feltétel teljesül.",
  "Je PRAVDA, ak platí aspoň jedna podmienka.",
  "TRUE if at least one condition is met.");
F("NEM", "NOT", "logikai", "logikai", "logical",
  "=NOT(ISBLANK(A2))",
  "Megfordítja a logikai értéket: itt akkor IGAZ, ha A2 NEM üres.",
  "Obráti logickú hodnotu: tu je PRAVDA, ak A2 NIE JE prázdna.",
  "Reverses a logical value: here TRUE when A2 is NOT empty.");
F("XVAGY", "XOR", "logikai", "logikai1; [logikai2]; …", "logical1, [logical2], …",
  "=XOR(B2>0; C2>0)",
  "Akkor IGAZ, ha a feltételek közül pontosan egy (páratlan számú) teljesül.",
  "Je PRAVDA, ak platí práve jedna (nepárny počet) z podmienok.",
  "TRUE if exactly one (an odd number) of the conditions is met.");
F("ÜRES", "ISBLANK", "logikai", "érték", "value",
  '=IF(ISBLANK(A2); "hiányzik"; A2)',
  "IGAZ, ha a cella teljesen üres.",
  "PRAVDA, ak je bunka úplne prázdna.",
  "TRUE if the cell is completely empty.");
F("SZÁM", "ISNUMBER", "logikai", "érték", "value",
  '=ISNUMBER(SEARCH("abc"; A2))',
  "IGAZ, ha az érték szám. A SZÖVEG.KERES-sel együtt megmondja, tartalmaz-e A2 egy szövegrészt.",
  "PRAVDA, ak je hodnota číslo. So SEARCH zistí, či A2 obsahuje daný text.",
  "TRUE if the value is a number. With SEARCH it tells whether A2 contains a piece of text.");
F("SZÖVEG.E", "ISTEXT", "logikai", "érték", "value",
  "=ISTEXT(A2)",
  "IGAZ, ha a cella szöveget tartalmaz – jól jön, ha „számnak látszó” szövegeket keresel.",
  "PRAVDA, ak bunka obsahuje text – užitočné pri hľadaní čísel uložených ako text.",
  "TRUE if the cell contains text – useful to find numbers stored as text.");
F("HIBÁS", "ISERROR", "logikai", "érték", "value",
  "=ISERROR(B2/C2)",
  "IGAZ, ha az érték bármilyen hiba (#ZÉRÓOSZTÓ!, #HIÁNYZIK, #ÉRTÉK! …).",
  "PRAVDA, ak je hodnota akákoľvek chyba (#DIV/0!, #N/A, #VALUE! …).",
  "TRUE if the value is any error (#DIV/0!, #N/A, #VALUE! …).");

/* ---------------- Matek ---------------- */
F("SZUM", "SUM", "matek", "szám1; [szám2]; …", "number1, [number2], …",
  "=SUM(B2:B100)",
  "Összeadja a tartomány számait.",
  "Sčíta čísla v rozsahu.",
  "Adds up the numbers in the range.");
F("SZUMHA", "SUMIF", "matek", "tartomány; feltétel; [összeg_tartomány]", "range, criteria, [sum_range]",
  '=SUMIF(A:A; "Budapest"; C:C)',
  "Csak azokat a sorokat adja össze, ahol az A oszlopban „Budapest” áll.",
  "Sčíta iba riadky, kde je v stĺpci A „Budapest“.",
  "Sums only the rows where column A says \"Budapest\".");
F("SZUMHATÖBB", "SUMIFS", "matek", "összeg_tartomány; feltétel_tartomány1; feltétel1; …", "sum_range, criteria_range1, criteria1, …",
  '=SUMIFS(D:D; A:A; "Budapest"; B:B; ">=" & DATE(2026; 1; 1))',
  "Több feltétellel összegez. Figyelj: itt az összegzendő oszlop van elöl!",
  "Sčíta podľa viacerých podmienok. Pozor: tu je stĺpec na sčítanie na prvom mieste!",
  "Sums with several conditions. Note: here the sum column comes first!");
F("SZORZATÖSSZEG", "SUMPRODUCT", "matek", "tömb1; [tömb2]; …", "array1, [array2], …",
  "=SUMPRODUCT(B2:B100; C2:C100)",
  "Soronként összeszorozza a tartományokat, majd összeadja: pl. mennyiség × egységár = teljes érték.",
  "Vynásobí rozsahy riadok po riadku a výsledky sčíta: napr. množstvo × cena = celková hodnota.",
  "Multiplies the ranges row by row and adds the results: e.g. quantity × unit price = total value.");
F("KEREKÍTÉS", "ROUND", "matek", "szám; számjegyek", "number, num_digits",
  "=ROUND(B2*C2; 2)",
  "A megadott tizedesjegyre kerekít. Negatív érték a tizesekre, százasokra… kerekít (pl. -3 = ezresekre).",
  "Zaokrúhli na zadaný počet desatinných miest. Záporné číslo zaokrúhli na desiatky, stovky… (-3 = tisícky).",
  "Rounds to the given number of decimals. Negative values round to tens, hundreds… (-3 = thousands).");
F("KEREK.FEL", "ROUNDUP", "matek", "szám; számjegyek", "number, num_digits",
  "=ROUNDUP(B2/12; 0)",
  "Mindig felfelé kerekít – pl. hány doboz kell, ha egy dobozba 12 darab fér.",
  "Vždy zaokrúhli nahor – napr. koľko krabíc treba, ak sa do jednej zmestí 12 kusov.",
  "Always rounds up – e.g. how many boxes you need if 12 pieces fit in one.");
F("KEREK.LE", "ROUNDDOWN", "matek", "szám; számjegyek", "number, num_digits",
  "=ROUNDDOWN(B2; 0)",
  "Mindig lefelé kerekít (levágja a tizedeseket).",
  "Vždy zaokrúhli nadol (odreže desatinné miesta).",
  "Always rounds down (cuts off the decimals).");
F("TÖBBSZ.KEREKÍT", "MROUND", "matek", "szám; pontosság", "number, multiple",
  "=MROUND(B2; 5)",
  "A megadott szám legközelebbi többszörösére kerekít – pl. 5 forintra.",
  "Zaokrúhli na najbližší násobok zadaného čísla – napr. na 5 centov.",
  "Rounds to the nearest multiple – e.g. to the nearest 5.");
F("INT", "INT", "matek", "szám", "number",
  "=INT(B2)",
  "A szám egész részét adja (lefelé kerekít a legközelebbi egészre).",
  "Vráti celú časť čísla (zaokrúhli nadol na celé číslo).",
  "Returns the integer part (rounds down to the nearest whole number).");
F("MARADÉK", "MOD", "matek", "szám; osztó", "number, divisor",
  '=IF(MOD(ROW(); 2)=0; "páros"; "páratlan")',
  "Az osztás maradékát adja. Itt: páros vagy páratlan sorban vagyunk-e.",
  "Vráti zvyšok po delení. Tu: či sme v párnom alebo nepárnom riadku.",
  "Returns the remainder of a division. Here: whether we are on an even or odd row.");
F("ABS", "ABS", "matek", "szám", "number",
  "=ABS(B2-C2)",
  "Az abszolút értéket adja (előjel nélkül) – pl. két érték eltérése.",
  "Vráti absolútnu hodnotu (bez znamienka) – napr. rozdiel dvoch hodnôt.",
  "Returns the absolute value (no sign) – e.g. the difference of two values.");
F("HATVÁNY", "POWER", "matek", "szám; kitevő", "number, power",
  "=POWER(B2; 2)",
  "Hatványoz (ugyanaz, mint B2^2).",
  "Umocní číslo (to isté ako B2^2).",
  "Raises to a power (same as B2^2).");
F("GYÖK", "SQRT", "matek", "szám", "number",
  "=SQRT(B2)",
  "A szám négyzetgyökét adja.",
  "Vráti druhú odmocninu čísla.",
  "Returns the square root of a number.");
F("RÉSZÖSSZEG", "SUBTOTAL", "matek", "függvény_szám; hivatkozás1; …", "function_num, ref1, …",
  "=SUBTOTAL(109; C2:C500)",
  "Szűrésnél csak a látható sorokat számolja. 109 = SZUM, 101 = ÁTLAG, 103 = DARAB2.",
  "Pri filtrovaní počíta iba viditeľné riadky. 109 = SUM, 101 = AVERAGE, 103 = COUNTA.",
  "Counts only visible rows when filtered. 109 = SUM, 101 = AVERAGE, 103 = COUNTA.");
F("ÖSSZESÍT", "AGGREGATE", "matek", "függvény_szám; beállítások; tömb; …", "function_num, options, array, …",
  "=AGGREGATE(9; 6; C2:C500)",
  "Mint a RÉSZÖSSZEG, de a hibás cellákat is ki tudja hagyni (6). 9 = SZUM.",
  "Ako SUBTOTAL, ale vie vynechať aj bunky s chybou (6). 9 = SUM.",
  "Like SUBTOTAL but can also ignore error cells (6). 9 = SUM.");
F("VÉLETLEN.KÖZÖTT", "RANDBETWEEN", "matek", "alsó; felső", "bottom, top",
  "=RANDBETWEEN(1; 100)",
  "Véletlen egész szám a két határ között – minden újraszámoláskor változik.",
  "Náhodné celé číslo medzi dvoma hranicami – mení sa pri každom prepočte.",
  "A random whole number between two limits – changes on every recalculation.");

/* ---------------- Statisztika és számlálás ---------------- */
F("ÁTLAG", "AVERAGE", "stat", "szám1; [szám2]; …", "number1, [number2], …",
  "=AVERAGE(B2:B50)",
  "A számok átlaga (az üres cellákat kihagyja).",
  "Priemer čísel (prázdne bunky vynechá).",
  "The average of the numbers (empty cells are ignored).");
F("ÁTLAGHA", "AVERAGEIF", "stat", "tartomány; feltétel; [átlag_tartomány]", "range, criteria, [average_range]",
  '=AVERAGEIF(A:A; "Budapest"; C:C)',
  "Csak a feltételnek megfelelő sorok átlaga.",
  "Priemer iba riadkov, ktoré spĺňajú podmienku.",
  "The average of only the rows that meet the condition.");
F("ÁTLAGHATÖBB", "AVERAGEIFS", "stat", "átlag_tartomány; feltétel_tartomány1; feltétel1; …", "average_range, criteria_range1, criteria1, …",
  '=AVERAGEIFS(D:D; A:A; "Budapest"; C:C; ">0")',
  "Több feltétel szerinti átlag.",
  "Priemer podľa viacerých podmienok.",
  "Average with several conditions.");
F("DARAB", "COUNT", "stat", "érték1; [érték2]; …", "value1, [value2], …",
  "=COUNT(B2:B100)",
  "Megszámolja, hány cellában van SZÁM.",
  "Spočíta bunky, ktoré obsahujú ČÍSLO.",
  "Counts the cells that contain a NUMBER.");
F("DARAB2", "COUNTA", "stat", "érték1; [érték2]; …", "value1, [value2], …",
  "=COUNTA(A2:A100)",
  "Megszámolja a nem üres cellákat (szöveget is).",
  "Spočíta neprázdne bunky (aj text).",
  "Counts non-empty cells (text too).");
F("DARABÜRES", "COUNTBLANK", "stat", "tartomány", "range",
  "=COUNTBLANK(C2:C100)",
  "Megszámolja az üres cellákat – pl. hány adat hiányzik még.",
  "Spočíta prázdne bunky – napr. koľko údajov ešte chýba.",
  "Counts empty cells – e.g. how much data is still missing.");
F("DARABTELI", "COUNTIF", "stat", "tartomány; feltétel", "range, criteria",
  '=COUNTIF(C:C; "OK")',
  "Megszámolja, hány cella felel meg a feltételnek.",
  "Spočíta bunky, ktoré spĺňajú podmienku.",
  "Counts the cells that meet the condition.");
F("DARABHATÖBB", "COUNTIFS", "stat", "tartomány1; feltétel1; [tartomány2; feltétel2]; …", "criteria_range1, criteria1, …",
  '=COUNTIFS(A:A; "Budapest"; D:D; ">100000")',
  "Több feltétel szerint számol.",
  "Počíta podľa viacerých podmienok.",
  "Counts with several conditions.");
F("MAX", "MAX", "stat", "szám1; [szám2]; …", "number1, [number2], …",
  "=MAX(B2:B100)",
  "A legnagyobb érték.",
  "Najväčšia hodnota.",
  "The largest value.");
F("MIN", "MIN", "stat", "szám1; [szám2]; …", "number1, [number2], …",
  "=MIN(B2:B100)",
  "A legkisebb érték.",
  "Najmenšia hodnota.",
  "The smallest value.");
F("MAXHA", "MAXIFS", "stat", "max_tartomány; feltétel_tartomány1; feltétel1; …", "max_range, criteria_range1, criteria1, …",
  '=MAXIFS(D:D; A:A; "Budapest")',
  "A legnagyobb érték a feltételnek megfelelő sorok közül.",
  "Najväčšia hodnota spomedzi riadkov, ktoré spĺňajú podmienku.",
  "The largest value among the rows that meet the condition.");
F("MINHA", "MINIFS", "stat", "min_tartomány; feltétel_tartomány1; feltétel1; …", "min_range, criteria_range1, criteria1, …",
  '=MINIFS(D:D; A:A; "Budapest")',
  "A legkisebb érték a feltételnek megfelelő sorok közül.",
  "Najmenšia hodnota spomedzi riadkov, ktoré spĺňajú podmienku.",
  "The smallest value among the rows that meet the condition.");
F("MEDIÁN", "MEDIAN", "stat", "szám1; [szám2]; …", "number1, [number2], …",
  "=MEDIAN(B2:B100)",
  "A középső érték – kevésbé érzékeny a kiugró adatokra, mint az átlag.",
  "Stredná hodnota – menej citlivá na extrémne hodnoty ako priemer.",
  "The middle value – less sensitive to outliers than the average.");
F("NAGY", "LARGE", "stat", "tömb; k", "array, k",
  "=LARGE(B2:B100; 3)",
  "A k-adik legnagyobb érték – itt a harmadik legnagyobb (pl. TOP 3 lista).",
  "k-ta najväčšia hodnota – tu tretia najväčšia (napr. TOP 3).",
  "The k-th largest value – here the third largest (e.g. a top 3 list).");
F("KICSI", "SMALL", "stat", "tömb; k", "array, k",
  "=SMALL(B2:B100; 1)",
  "A k-adik legkisebb érték.",
  "k-ta najmenšia hodnota.",
  "The k-th smallest value.");
F("SORSZÁM.EGY", "RANK.EQ", "stat", "szám; hivatkozás; [sorrend]", "number, ref, [order]",
  "=RANK.EQ(B2; $B$2:$B$100)",
  "Megmondja, hányadik B2 a listában (1 = a legnagyobb).",
  "Určí poradie B2 v zozname (1 = najväčšie).",
  "Tells the rank of B2 in the list (1 = the largest).");

/* ---------------- Szöveg ---------------- */
F("FŰZ", "CONCAT", "szoveg", "szöveg1; [szöveg2]; …", "text1, [text2], …",
  '=CONCAT(A2; " "; B2)',
  "Szövegeket fűz össze (a régebbi Excelekben: ÖSSZEFŰZ). Ugyanez az & jellel is megy: =A2 & \" \" & B2.",
  "Spojí texty. To isté ide aj so znakom &: =A2 & \" \" & B2.",
  "Joins texts. The & sign does the same: =A2 & \" \" & B2.");
F("SZÖVEGÖSSZEFŰZÉS", "TEXTJOIN", "szoveg", "elválasztó; üreset_kihagy; szöveg1; …", "delimiter, ignore_empty, text1, …",
  '=TEXTJOIN(", "; 1; A2:A20)',
  "Egy egész tartományt fűz össze elválasztóval; az 1 = üres cellák kihagyása.",
  "Spojí celý rozsah s oddeľovačom; 1 = vynechať prázdne bunky.",
  "Joins a whole range with a delimiter; 1 = skip empty cells.");
F("BAL", "LEFT", "szoveg", "szöveg; [db]", "text, [num_chars]",
  "=LEFT(A2; 4)",
  "A szöveg első 4 karaktere – pl. cikkszám előtagja.",
  "Prvé 4 znaky textu – napr. predpona kódu.",
  "The first 4 characters of the text – e.g. a code prefix.");
F("JOBB", "RIGHT", "szoveg", "szöveg; [db]", "text, [num_chars]",
  "=RIGHT(A2; 3)",
  "A szöveg utolsó 3 karaktere.",
  "Posledné 3 znaky textu.",
  "The last 3 characters of the text.");
F("KÖZÉP", "MID", "szoveg", "szöveg; kezdet; db", "text, start_num, num_chars",
  "=MID(A2; 5; 2)",
  "A szöveg közepéből vesz ki: az 5. karaktertől 2 karaktert.",
  "Vyberie časť zo stredu textu: od 5. znaku 2 znaky.",
  "Takes part from the middle of the text: 2 characters from the 5th.");
F("HOSSZ", "LEN", "szoveg", "szöveg", "text",
  "=LEN(A2)",
  "A szöveg hossza karakterekben.",
  "Dĺžka textu v znakoch.",
  "The length of the text in characters.");
F("KIMETSZ", "TRIM", "szoveg", "szöveg", "text",
  "=TRIM(A2)",
  "Eltávolítja a felesleges szóközöket. Ha egy FKERES „nem talál”, gyakran egy rejtett szóköz a hibás.",
  "Odstráni nadbytočné medzery. Keď VLOOKUP „nenájde“, často je na vine skrytá medzera.",
  "Removes extra spaces. When VLOOKUP \"can't find\" something, a hidden space is often the culprit.");
F("TISZTÍT", "CLEAN", "szoveg", "szöveg", "text",
  "=CLEAN(A2)",
  "Eltávolítja a nem nyomtatható karaktereket (pl. más rendszerből másolt adatoknál).",
  "Odstráni netlačiteľné znaky (napr. pri dátach skopírovaných z iného systému).",
  "Removes non-printable characters (e.g. in data copied from another system).");
F("NAGYBETŰS", "UPPER", "szoveg", "szöveg", "text",
  "=UPPER(A2)",
  "Csupa nagybetűssé alakít.",
  "Prevedie na veľké písmená.",
  "Converts to upper case.");
F("KISBETŰ", "LOWER", "szoveg", "szöveg", "text",
  "=LOWER(A2)",
  "Csupa kisbetűssé alakít.",
  "Prevedie na malé písmená.",
  "Converts to lower case.");
F("TNÉV", "PROPER", "szoveg", "szöveg", "text",
  "=PROPER(A2)",
  "Minden szót nagy kezdőbetűvel ír – pl. nevek javítására.",
  "Každé slovo začne veľkým písmenom – napr. na opravu mien.",
  "Capitalises each word – e.g. to fix names.");
F("HELYETTE", "SUBSTITUTE", "szoveg", "szöveg; régi; új; [hányadik]", "text, old_text, new_text, [instance_num]",
  '=SUBSTITUTE(A2; "-"; "")',
  "Kicserél egy szövegrészt egy másikra – itt kitörli a kötőjeleket.",
  "Nahradí časť textu iným textom – tu odstráni pomlčky.",
  "Replaces part of a text with another – here it removes the dashes.");
F("CSERE", "REPLACE", "szoveg", "régi_szöveg; kezdet; db; új_szöveg", "old_text, start_num, num_chars, new_text",
  '=REPLACE(A2; 1; 3; "XYZ")',
  "Adott pozíción cserél: az első 3 karaktert „XYZ”-re.",
  "Nahradí znaky na danej pozícii: prvé 3 znaky na „XYZ“.",
  "Replaces characters at a position: the first 3 characters with \"XYZ\".");
F("SZÖVEG.KERES", "SEARCH", "szoveg", "keresett; szöveg; [kezdet]", "find_text, within_text, [start_num]",
  '=SEARCH("@"; A2)',
  "Megadja, hányadik karakternél van a keresett szöveg (kis- és nagybetűt nem különböztet meg).",
  "Vráti pozíciu hľadaného textu (nerozlišuje malé a veľké písmená).",
  "Returns the position of the text you look for (not case-sensitive).");
F("SZÖVEG.TALÁL", "FIND", "szoveg", "keresett; szöveg; [kezdet]", "find_text, within_text, [start_num]",
  '=FIND("A"; A2)',
  "Mint a SZÖVEG.KERES, de megkülönbözteti a kis- és nagybetűt.",
  "Ako SEARCH, ale rozlišuje malé a veľké písmená.",
  "Like SEARCH but case-sensitive.");
F("SZÖVEG", "TEXT", "szoveg", "érték; formátum", "value, format_text",
  '=TEXT(A2; "000000")',
  "Számot adott formátumú szöveggé alakít – itt 6 jegyűre egészíti ki nullákkal (42 → 000042).",
  "Prevedie číslo na text v danom formáte – tu doplní nulami na 6 číslic (42 → 000042).",
  "Turns a number into text with a format – here padded with zeros to 6 digits (42 → 000042).");
F("ÉRTÉK", "VALUE", "szoveg", "szöveg", "text",
  "=VALUE(A2)",
  "A számnak látszó szöveget valódi számmá alakítja.",
  "Prevedie text, ktorý vyzerá ako číslo, na skutočné číslo.",
  "Turns text that looks like a number into a real number.");
F("AZONOS", "EXACT", "szoveg", "szöveg1; szöveg2", "text1, text2",
  "=EXACT(A2; B2)",
  "IGAZ, ha a két szöveg pontosan azonos (a kis- és nagybetűt is figyeli).",
  "PRAVDA, ak sú dva texty úplne rovnaké (rozlišuje aj veľkosť písmen).",
  "TRUE if the two texts are exactly the same (case-sensitive).");
F("SOKSZOR", "REPT", "szoveg", "szöveg; hányszor", "text, number_times",
  '=REPT("★"; B2)',
  "Megismétli a szöveget – egyszerű „csillagos értékelés” vagy szöveges diagram készíthető vele.",
  "Zopakuje text – vytvoríš ním jednoduché „hviezdičkové hodnotenie“ alebo textový graf.",
  "Repeats a text – makes a simple \"star rating\" or text-based chart.");

/* ---------------- Dátum és idő ---------------- */
F("MA", "TODAY", "datum", "", "",
  "=TODAY()-B2",
  "A mai dátum, minden megnyitáskor frissül. Itt: hány nap telt el B2 óta.",
  "Dnešný dátum, aktualizuje sa pri každom otvorení. Tu: koľko dní uplynulo od B2.",
  "Today's date, updated every time you open the file. Here: days since B2.");
F("MOST", "NOW", "datum", "", "",
  "=NOW()",
  "A mostani dátum és időpont.",
  "Aktuálny dátum a čas.",
  "The current date and time.");
F("DÁTUM", "DATE", "datum", "év; hónap; nap", "year, month, day",
  "=DATE(2026; 12; 31)",
  "Évből, hónapból és napból dátumot készít.",
  "Vytvorí dátum z roka, mesiaca a dňa.",
  "Builds a date from year, month and day.");
F("ÉV", "YEAR", "datum", "dátum", "serial_number",
  "=YEAR(A2)",
  "A dátum éve. Hasonlóan: HÓNAP, NAP.",
  "Rok z dátumu. Podobne: MONTH, DAY.",
  "The year of a date. Similarly: MONTH, DAY.");
F("HÓNAP", "MONTH", "datum", "dátum", "serial_number",
  "=MONTH(A2)",
  "A dátum hónapja (1–12).",
  "Mesiac z dátumu (1–12).",
  "The month of a date (1–12).");
F("NAP", "DAY", "datum", "dátum", "serial_number",
  "=DAY(A2)",
  "A dátum napja (1–31).",
  "Deň z dátumu (1–31).",
  "The day of a date (1–31).");
F("HÉT.NAPJA", "WEEKDAY", "datum", "dátum; [típus]", "serial_number, [return_type]",
  "=WEEKDAY(A2; 2)",
  "A hét napja számként; a 2-es típusnál hétfő = 1, vasárnap = 7.",
  "Deň v týždni ako číslo; pri type 2 je pondelok = 1, nedeľa = 7.",
  "The day of the week as a number; with type 2 Monday = 1, Sunday = 7.");
F("ISO.HÉT.SZÁMA", "ISOWEEKNUM", "datum", "dátum", "date",
  "=ISOWEEKNUM(A2)",
  "Az ISO szerinti hét száma (Európában ez a megszokott).",
  "Číslo týždňa podľa ISO (v Európe bežné).",
  "The ISO week number (the usual one in Europe).");
F("HÓNAP.UTOLSÓ.NAP", "EOMONTH", "datum", "kezdő_dátum; hónapok", "start_date, months",
  "=EOMONTH(TODAY(); 0)",
  "A hónap utolsó napja. 0 = ez a hónap, 1 = jövő hónap, -1 = előző hónap vége.",
  "Posledný deň mesiaca. 0 = tento mesiac, 1 = budúci, -1 = koniec minulého mesiaca.",
  "The last day of the month. 0 = this month, 1 = next month, -1 = end of last month.");
F("KALK.DÁTUM", "EDATE", "datum", "kezdő_dátum; hónapok", "start_date, months",
  "=EDATE(A2; 3)",
  "A dátumhoz hónapokat ad – itt 3 hónappal későbbi dátum (pl. lejárat).",
  "Pripočíta mesiace k dátumu – tu dátum o 3 mesiace neskôr (napr. splatnosť).",
  "Adds months to a date – here the date 3 months later (e.g. a due date).");
F("ÖSSZ.MUNKANAP", "NETWORKDAYS", "datum", "kezdő; záró; [ünnepek]", "start_date, end_date, [holidays]",
  "=NETWORKDAYS(A2; B2; $H$2:$H$20)",
  "Munkanapok száma két dátum között; a H oszlopban felsorolt ünnepeket kihagyja.",
  "Počet pracovných dní medzi dvoma dátumami; vynechá sviatky zo stĺpca H.",
  "Number of working days between two dates; skips the holidays listed in column H.");
F("KALK.MUNKANAP", "WORKDAY", "datum", "kezdő; napok; [ünnepek]", "start_date, days, [holidays]",
  "=WORKDAY(A2; 10)",
  "A dátum, ami 10 munkanappal későbbi (hétvégék nélkül).",
  "Dátum o 10 pracovných dní neskôr (bez víkendov).",
  "The date 10 working days later (weekends skipped).");
F("DÁTUMTÓLIG", "DATEDIF", "datum", "kezdő; záró; egység", "start_date, end_date, unit",
  '=DATEDIF(A2; TODAY(); "Y")',
  "Két dátum különbsége években (\"Y\"), hónapokban (\"M\") vagy napokban (\"D\") – pl. életkor.",
  "Rozdiel dvoch dátumov v rokoch (\"Y\"), mesiacoch (\"M\") alebo dňoch (\"D\") – napr. vek.",
  "The difference of two dates in years (\"Y\"), months (\"M\") or days (\"D\") – e.g. age.");
F("TÖRTÉV", "YEARFRAC", "datum", "kezdő; záró; [alap]", "start_date, end_date, [basis]",
  "=YEARFRAC(A2; B2)",
  "Két dátum között eltelt idő évben, törtként (pl. 1,5 év).",
  "Čas medzi dvoma dátumami v rokoch ako zlomok (napr. 1,5 roka).",
  "Time between two dates in years as a fraction (e.g. 1.5 years).");
F("IDŐ", "TIME", "datum", "óra; perc; mperc", "hour, minute, second",
  "=A2+TIME(8; 30; 0)",
  "Időpontot készít; itt A2-höz 8 óra 30 percet ad.",
  "Vytvorí čas; tu pripočíta k A2 8 hodín 30 minút.",
  "Builds a time; here it adds 8 hours 30 minutes to A2.");

/* ---------------- Dinamikus tömbök ---------------- */
F("SZŰRŐ", "FILTER", "dinamikus", "tömb; feltétel; [ha_üres]", "array, include, [if_empty]",
  '=FILTER(A2:D100; C2:C100="OK"; "-")',
  "Kilistázza a feltételnek megfelelő sorokat egy új területre, és automatikusan frissül. (365 / 2021)",
  "Vypíše riadky, ktoré spĺňajú podmienku, do novej oblasti a automaticky sa aktualizuje. (365 / 2021)",
  "Lists the rows that meet the condition in a new area and updates automatically. (365 / 2021)");
F("EGYEDI", "UNIQUE", "dinamikus", "tömb; [oszloponként]; [csak_egyszer]", "array, [by_col], [exactly_once]",
  "=UNIQUE(A2:A500)",
  "Egy lista ismétlődés nélküli elemei.",
  "Jedinečné položky zoznamu bez opakovania.",
  "The distinct items of a list, without repeats.");
F("SORBA.RENDEZ", "SORT", "dinamikus", "tömb; [oszlop]; [sorrend]", "array, [sort_index], [sort_order]",
  "=SORT(A2:C100; 3; -1)",
  "Rendezve adja vissza a tartományt (az eredeti marad). Itt a 3. oszlop szerint csökkenőben (-1).",
  "Vráti rozsah zoradený (pôvodný zostane). Tu podľa 3. stĺpca zostupne (-1).",
  "Returns the range sorted (the original stays). Here by the 3rd column, descending (-1).");
F("RENDEZÉS.ALAPJÁN", "SORTBY", "dinamikus", "tömb; alapján_tömb1; [sorrend1]; …", "array, by_array1, [sort_order1], …",
  "=SORTBY(A2:B100; C2:C100; -1)",
  "Egy másik oszlop szerint rendez – az az oszlop nem is kell, hogy megjelenjen az eredményben.",
  "Zoradí podľa iného stĺpca – ten stĺpec sa ani nemusí zobraziť vo výsledku.",
  "Sorts by another column – that column doesn't even need to appear in the result.");
F("SORSZÁMLISTA", "SEQUENCE", "dinamikus", "sorok; [oszlopok]; [kezdet]; [lépés]", "rows, [columns], [start], [step]",
  "=SEQUENCE(12)",
  "Számsort készít: itt 1-től 12-ig, egymás alá.",
  "Vytvorí rad čísel: tu od 1 do 12 pod seba.",
  "Creates a series of numbers: here 1 to 12 downwards.");

/* ---------------- Új – Excel 2024 (és Microsoft 365) ----------------
   ellenorzott = false: a magyar nevet nem tudtuk hivatalos forrásból megerősíteni,
   ilyenkor az angol nevet mutatjuk, és figyelmeztetünk. */
function F24(hu, en, parHu, parEn, keplet, hu_, sk_, en_, ellenorzott = true) {
  F(hu, en, "excel2024", parHu, parEn, keplet, hu_, sk_, en_);
  FUGGVENYEK[FUGGVENYEK.length - 1].uj = true;
  FUGGVENYEK[FUGGVENYEK.length - 1].ellenorzetlen = !ellenorzott;
}

F24("SZÖVEGFELOSZTÁS", "TEXTSPLIT", "szöveg; oszlop_határoló; [sor_határoló]; …", "text, col_delimiter, [row_delimiter], …",
  '=TEXTSPLIT(A2; ", ")',
  "Egy cella szövegét több cellába bontja egy határoló mentén – pl. „Kovács, Anna, Budapest” → 3 oszlop. Mint a Szövegből oszlopok, csak képlettel.",
  "Rozdelí text bunky do viacerých buniek podľa oddeľovača – napr. „Kováč, Anna, Bratislava“ → 3 stĺpce. Ako Text na stĺpce, ale vzorcom.",
  "Splits a cell's text into several cells at a delimiter – e.g. \"Smith, Anna, London\" → 3 columns. Like Text to Columns, but as a formula.");
F24("SZÖVEGELŐTTE", "TEXTBEFORE", "szöveg; határoló; [hányadik]; …", "text, delimiter, [instance_num], …",
  '=TEXTBEFORE(A2; "@")',
  "A határoló ELŐTTI szövegrész – itt egy e-mail címből a felhasználónév. Nem kell többé BAL + SZÖVEG.KERES.",
  "Časť textu PRED oddeľovačom – tu používateľské meno z e-mailovej adresy. Už netreba LEFT + SEARCH.",
  "The text BEFORE a delimiter – here the user name from an e-mail address. No more LEFT + SEARCH.");
F24("SZÖVEGUTÁNA", "TEXTAFTER", "szöveg; határoló; [hányadik]; …", "text, delimiter, [instance_num], …",
  '=TEXTAFTER(A2; "@")',
  "A határoló UTÁNI szövegrész – itt az e-mail cím domainje. Negatív „hányadik” értékkel a végétől számol.",
  "Časť textu ZA oddeľovačom – tu doména e-mailovej adresy. So záporným poradím počíta od konca.",
  "The text AFTER a delimiter – here the domain of an e-mail address. A negative instance counts from the end.", false);
F24("FÜGG.HALMOZÁS", "VSTACK", "tömb1; [tömb2]; …", "array1, [array2], …",
  "=VSTACK(A2:C10; E2:G10)",
  "Tartományokat (akár több munkalapról) EGYMÁS ALÁ fűz egyetlen listává – pl. havi táblák összesítése.",
  "Spojí rozsahy (aj z viacerých hárkov) POD SEBA do jedného zoznamu – napr. súhrn mesačných tabuliek.",
  "Stacks ranges (even from several sheets) ON TOP of each other into one list – e.g. combining monthly tables.");
F24("VÍZSZ.HALMOZÁS", "HSTACK", "tömb1; [tömb2]; …", "array1, [array2], …",
  "=HSTACK(A2:A10; D2:D10)",
  "Tartományokat EGYMÁS MELLÉ tesz – pl. két nem szomszédos oszlopból egy új táblát készít.",
  "Spojí rozsahy VEDĽA SEBA – napr. vytvorí novú tabuľku z dvoch nesusediacich stĺpcov.",
  "Places ranges SIDE BY SIDE – e.g. builds a new table from two non-adjacent columns.");
F24("TAKE", "TAKE", "tömb; sorok; [oszlopok]", "array, rows, [columns]",
  "=TAKE(SORT(A2:C100; 3; -1); 5)",
  "Az első (vagy negatív számmal az utolsó) N sort adja vissza. Itt: TOP 5 a 3. oszlop szerint.",
  "Vráti prvých (alebo so záporným číslom posledných) N riadkov. Tu: TOP 5 podľa 3. stĺpca.",
  "Returns the first (or, with a negative number, the last) N rows. Here: the top 5 by the 3rd column.", false);
F24("DROP", "DROP", "tömb; sorok; [oszlopok]", "array, rows, [columns]",
  "=DROP(A1:C100; 1)",
  "Elhagy N sort az elejéről (vagy negatívval a végéről) – itt a fejlécet.",
  "Vynechá N riadkov zo začiatku (alebo so záporným číslom z konca) – tu hlavičku.",
  "Removes N rows from the start (or, with a negative number, the end) – here the header.", false);
F24("CHOOSECOLS", "CHOOSECOLS", "tömb; oszlop1; [oszlop2]; …", "array, col_num1, [col_num2], …",
  "=CHOOSECOLS(A2:F100; 1; 4)",
  "Csak a megadott oszlopokat adja vissza, a megadott sorrendben – itt az 1. és 4. oszlopot.",
  "Vráti iba zadané stĺpce v zadanom poradí – tu 1. a 4. stĺpec.",
  "Returns only the columns you list, in that order – here columns 1 and 4.", false);
F24("CHOOSEROWS", "CHOOSEROWS", "tömb; sor1; [sor2]; …", "array, row_num1, [row_num2], …",
  "=CHOOSEROWS(A2:C100; 1; -1)",
  "A megadott sorokat adja vissza – itt az elsőt és az utolsót (-1).",
  "Vráti zadané riadky – tu prvý a posledný (-1).",
  "Returns the rows you list – here the first and the last (-1).", false);
F24("TOCOL", "TOCOL", "tömb; [kihagy]; [oszloponként]", "array, [ignore], [scan_by_column]",
  "=TOCOL(A2:D10; 1)",
  "Egy egész tartományt EGYETLEN OSZLOPBA rendez; az 1 = az üres cellák kihagyása.",
  "Usporiada celý rozsah do JEDNÉHO STĹPCA; 1 = vynechať prázdne bunky.",
  "Turns a whole range into a SINGLE COLUMN; 1 = skip blank cells.", false);
F24("TOROW", "TOROW", "tömb; [kihagy]; [oszloponként]", "array, [ignore], [scan_by_column]",
  "=TOROW(A2:A10)",
  "Egy tartományt EGYETLEN SORBA rendez.",
  "Usporiada rozsah do JEDNÉHO RIADKA.",
  "Turns a range into a SINGLE ROW.", false);
F24("WRAPROWS", "WRAPROWS", "vektor; darab; [kitöltés]", "vector, wrap_count, [pad_with]",
  "=WRAPROWS(A2:A13; 3)",
  "Egy hosszú listát 3 elemes sorokba tördel – pl. egy oszlopnyi címadatból táblázat lesz.",
  "Zalomí dlhý zoznam do riadkov po 3 položkách – napr. zo stĺpca adries vznikne tabuľka.",
  "Wraps a long list into rows of 3 items – e.g. turns a column of address data into a table.", false);
F24("EXPAND", "EXPAND", "tömb; sorok; [oszlopok]; [kitöltés]", "array, rows, [columns], [pad_with]",
  '=EXPAND(A2:B3; 5; 3; "")',
  "Megnöveli a tartomány méretét a megadott sorra és oszlopra, a hiányzó helyeket kitölti.",
  "Rozšíri rozsah na zadaný počet riadkov a stĺpcov a chýbajúce miesta vyplní.",
  "Expands the range to the given number of rows and columns and fills the gaps.", false);
F24("LET", "LET", "név1; érték1; [név2; érték2]; …; számítás", "name1, value1, …, calculation",
  "=LET(x; B2*C2; IF(x>1000; x*90/100; x))",
  "Elnevez egy részeredményt (itt x), így nem kell többször kiszámolni – rövidebb, gyorsabb, olvashatóbb képlet.",
  "Pomenuje medzivýsledok (tu x), takže sa nemusí počítať viackrát – kratší, rýchlejší a prehľadnejší vzorec.",
  "Names an intermediate result (here x) so it isn't calculated twice – shorter, faster, more readable formulas.");
F24("LAMBDA", "LAMBDA", "[paraméter1; …]; számítás", "[parameter1, …], calculation",
  "=LAMBDA(netto; netto*127/100)(A2)",
  "Saját függvényt készíthetsz vele. Ha a Névkezelőben (Ctrl+F3) elnevezed pl. BRUTTO-nak, utána =BRUTTO(A2) formában használhatod.",
  "Vytvoríš si vlastnú funkciu. Ak ju v Správcovi názvov (Ctrl+F3) pomenuješ napr. BRUTTO, potom ju použiješ ako =BRUTTO(A2).",
  "Lets you create your own function. Name it in the Name Manager (Ctrl+F3), e.g. GROSS, then use it as =GROSS(A2).");
F24("BYROW", "BYROW", "tömb; LAMBDA(sor; számítás)", "array, LAMBDA(row, calculation)",
  "=BYROW(B2:E10; LAMBDA(r; SUM(r)))",
  "Soronként lefuttat egy számítást, és oszlopként adja vissza az eredményt – itt minden sor összegét.",
  "Spustí výpočet pre každý riadok a výsledky vráti ako stĺpec – tu súčet každého riadka.",
  "Runs a calculation for each row and returns the results as a column – here each row's sum.", false);
F24("MAP", "MAP", "tömb; LAMBDA(x; számítás)", "array, LAMBDA(x, calculation)",
  "=MAP(A2:A10; LAMBDA(x; UPPER(TRIM(x))))",
  "Minden cellára külön lefuttatja a számítást – itt egyszerre tisztítja és nagybetűsíti a listát.",
  "Spustí výpočet pre každú bunku zvlášť – tu naraz vyčistí zoznam a prevedie ho na veľké písmená.",
  "Runs the calculation on every cell – here it cleans the list and converts it to upper case in one go.", false);

/* ======================================================
   BILLENTYŰPARANCSOK (Windows)
   ====================================================== */

// Billentyűnevek fordítása
const BILLENTYU_NEVEK = {
  Space:  { hu: "Szóköz", sk: "Medzerník", en: "Space" },
  Arrows: { hu: "Nyilak", sk: "Šípky",     en: "Arrows" },
  Click:  { hu: "Kattintás", sk: "Kliknutie", en: "Click" },
  Wheel:  { hu: "Görgő", sk: "Koliesko", en: "Wheel" },
  Drag:   { hu: "Húzás", sk: "Ťahanie", en: "Drag" },
  "Num-": { hu: "Num −", sk: "Num −", en: "Num −" },
  "Num+": { hu: "Num +", sk: "Num +", en: "Num +" },
};

const BILLENTYUK = [
  { ikon: "📁", szin: "zold", cim: { hu: "Fájl és munkafüzet", sk: "Súbor a zošit", en: "File & workbook" }, sorok: [
    [{ hu: "Új munkafüzet", sk: "Nový zošit", en: "New workbook" }, ["Ctrl", "N"]],
    [{ hu: "Megnyitás", sk: "Otvoriť", en: "Open" }, ["Ctrl", "O"]],
    [{ hu: "Mentés", sk: "Uložiť", en: "Save" }, ["Ctrl", "S"]],
    [{ hu: "Mentés másként", sk: "Uložiť ako", en: "Save as" }, ["F12"]],
    [{ hu: "Nyomtatás", sk: "Tlačiť", en: "Print" }, ["Ctrl", "P"]],
    [{ hu: "Munkafüzet bezárása", sk: "Zavrieť zošit", en: "Close workbook" }, ["Ctrl", "W"]],
    [{ hu: "Excel bezárása", sk: "Zavrieť Excel", en: "Quit Excel" }, ["Alt", "F4"]],
    [{ hu: "Váltás nyitott munkafüzetek között", sk: "Prepínanie otvorených zošitov", en: "Switch between open workbooks" }, ["Ctrl", "Tab"]],
    [{ hu: "Menüszalag elrejtése / mutatása", sk: "Skryť / zobraziť pás s nástrojmi", en: "Hide / show the ribbon" }, ["Ctrl", "F1"]],
    [{ hu: "Gyorsbillentyű-betűk a menüszalagon", sk: "Klávesové tipy na páse s nástrojmi", en: "Ribbon key tips" }, ["Alt"], ["F10"]],
    [{ hu: "Súgó", sk: "Pomocník", en: "Help" }, ["F1"]],
  ]},
  { ikon: "✂️", szin: "narancs", cim: { hu: "Alap szerkesztés", sk: "Základné úpravy", en: "Basic editing" }, sorok: [
    [{ hu: "Másolás", sk: "Kopírovať", en: "Copy" }, ["Ctrl", "C"]],
    [{ hu: "Kivágás", sk: "Vystrihnúť", en: "Cut" }, ["Ctrl", "X"]],
    [{ hu: "Beillesztés", sk: "Prilepiť", en: "Paste" }, ["Ctrl", "V"]],
    [{ hu: "Irányított beillesztés", sk: "Prilepiť špeciálne", en: "Paste special" }, ["Ctrl", "Alt", "V"]],
    [{ hu: "Visszavonás", sk: "Späť", en: "Undo" }, ["Ctrl", "Z"]],
    [{ hu: "Mégis / utolsó művelet ismétlése", sk: "Znova / zopakovať poslednú akciu", en: "Redo / repeat last action" }, ["Ctrl", "Y"], ["F4"]],
    [{ hu: "Keresés", sk: "Hľadať", en: "Find" }, ["Ctrl", "F"]],
    [{ hu: "Csere", sk: "Nahradiť", en: "Replace" }, ["Ctrl", "H"]],
    [{ hu: "Következő találat", sk: "Ďalší výskyt", en: "Find next" }, ["Shift", "F4"]],
    [{ hu: "Cella tartalmának törlése", sk: "Vymazať obsah bunky", en: "Clear cell contents" }, ["Delete"]],
    [{ hu: "Cellák törlése (sorok, oszlopok)", sk: "Odstrániť bunky (riadky, stĺpce)", en: "Delete cells (rows, columns)" }, ["Ctrl", "Num-"]],
    [{ hu: "Cellák beszúrása", sk: "Vložiť bunky", en: "Insert cells" }, ["Ctrl", "Shift", "Num+"]],
    [{ hu: "Helyesírás-ellenőrzés", sk: "Kontrola pravopisu", en: "Spell check" }, ["F7"]],
  ]},
  { ikon: "🧭", szin: "kek", cim: { hu: "Mozgás", sk: "Pohyb", en: "Navigation" }, sorok: [
    [{ hu: "Ugrás az adatok széléig", sk: "Skok na okraj údajov", en: "Jump to the edge of the data" }, ["Ctrl", "Arrows"]],
    [{ hu: "Ugrás az A1 cellába", sk: "Skok na bunku A1", en: "Go to cell A1" }, ["Ctrl", "Home"]],
    [{ hu: "Ugrás az utolsó használt cellába", sk: "Skok na poslednú použitú bunku", en: "Go to the last used cell" }, ["Ctrl", "End"]],
    [{ hu: "Ugrás a sor elejére", sk: "Skok na začiatok riadka", en: "Go to the start of the row" }, ["Home"]],
    [{ hu: "Egy képernyővel le / fel", sk: "O obrazovku nadol / nahor", en: "One screen down / up" }, ["PgDn"], ["PgUp"]],
    [{ hu: "Egy képernyővel jobbra / balra", sk: "O obrazovku vpravo / vľavo", en: "One screen right / left" }, ["Alt", "PgDn"], ["Alt", "PgUp"]],
    [{ hu: "Következő / előző munkalap", sk: "Ďalší / predchádzajúci hárok", en: "Next / previous sheet" }, ["Ctrl", "PgDn"], ["Ctrl", "PgUp"]],
    [{ hu: "Ugrás adott cellára (Ugrás ablak)", sk: "Prejsť na bunku (okno Prejsť na)", en: "Go To dialog" }, ["Ctrl", "G"], ["F5"]],
    [{ hu: "Következő / előző cella jobbra-balra", sk: "Ďalšia / predchádzajúca bunka vpravo-vľavo", en: "Next / previous cell right-left" }, ["Tab"], ["Shift", "Tab"]],
    [{ hu: "Vissza az aktív cellához", sk: "Späť na aktívnu bunku", en: "Scroll back to the active cell" }, ["Ctrl", "Backspace"]],
    [{ hu: "Váltás a panelek között", sk: "Prepínanie medzi panelmi", en: "Switch between panes" }, ["F6"]],
  ]},
  { ikon: "🔲", szin: "lila", cim: { hu: "Kijelölés", sk: "Výber", en: "Selection" }, sorok: [
    [{ hu: "Kijelölés bővítése cellánként", sk: "Rozšíriť výber o bunku", en: "Extend selection by one cell" }, ["Shift", "Arrows"]],
    [{ hu: "Kijelölés az adatok széléig", sk: "Výber po okraj údajov", en: "Select to the edge of the data" }, ["Ctrl", "Shift", "Arrows"]],
    [{ hu: "Kijelölés az A1 / utolsó cellától", sk: "Výber po A1 / poslednú bunku", en: "Select to A1 / the last cell" }, ["Ctrl", "Shift", "Home"], ["Ctrl", "Shift", "End"]],
    [{ hu: "Teljes oszlop kijelölése", sk: "Vybrať celý stĺpec", en: "Select the whole column" }, ["Ctrl", "Space"]],
    [{ hu: "Teljes sor kijelölése", sk: "Vybrať celý riadok", en: "Select the whole row" }, ["Shift", "Space"]],
    [{ hu: "Minden kijelölése", sk: "Vybrať všetko", en: "Select all" }, ["Ctrl", "A"]],
    [{ hu: "Kijelölés bővítése mód be / ki", sk: "Režim rozšírenia výberu zap. / vyp.", en: "Extend selection mode on / off" }, ["F8"]],
    [{ hu: "Nem szomszédos cellák hozzáadása", sk: "Pridať nesusediace bunky", en: "Add non-adjacent cells" }, ["Ctrl", "Click"], ["Shift", "F8"]],
  ]},
  { ikon: "🎨", szin: "narancs", cim: { hu: "Formázás", sk: "Formátovanie", en: "Formatting" }, sorok: [
    [{ hu: "Cellák formázása ablak", sk: "Okno Formátovať bunky", en: "Format Cells dialog" }, ["Ctrl", "1"]],
    [{ hu: "Félkövér", sk: "Tučné", en: "Bold" }, ["Ctrl", "B"]],
    [{ hu: "Dőlt", sk: "Kurzíva", en: "Italic" }, ["Ctrl", "I"]],
    [{ hu: "Aláhúzott", sk: "Podčiarknuté", en: "Underline" }, ["Ctrl", "U"]],
    [{ hu: "Áthúzott", sk: "Prečiarknuté", en: "Strikethrough" }, ["Ctrl", "5"]],
    [{ hu: "Betűtípus fül", sk: "Karta Písmo", en: "Font tab" }, ["Ctrl", "Shift", "P"]],
    [{ hu: "Számformátum (2 tizedes, ezres tagolás)", sk: "Formát čísla (2 desatinné miesta, oddeľovač tisícov)", en: "Number format (2 decimals, thousands separator)" }, ["Ctrl", "Shift", "1"]],
    [{ hu: "Időformátum", sk: "Formát času", en: "Time format" }, ["Ctrl", "Shift", "2"]],
    [{ hu: "Dátumformátum", sk: "Formát dátumu", en: "Date format" }, ["Ctrl", "Shift", "3"]],
    [{ hu: "Pénznem formátum", sk: "Formát meny", en: "Currency format" }, ["Ctrl", "Shift", "4"]],
    [{ hu: "Százalék formátum", sk: "Formát percent", en: "Percentage format" }, ["Ctrl", "Shift", "5"]],
    [{ hu: "Sorok elrejtése / felfedése", sk: "Skryť / zobraziť riadky", en: "Hide / unhide rows" }, ["Ctrl", "9"], ["Ctrl", "Shift", "9"]],
    [{ hu: "Oszlopok elrejtése", sk: "Skryť stĺpce", en: "Hide columns" }, ["Ctrl", "0"]],
  ]},
  { ikon: "✏️", szin: "zold", cim: { hu: "Cellák és kitöltés", sk: "Bunky a vypĺňanie", en: "Cells & filling" }, sorok: [
    [{ hu: "Cella szerkesztése", sk: "Upraviť bunku", en: "Edit the cell" }, ["F2"]],
    [{ hu: "Szerkesztés megszakítása", sk: "Zrušiť úpravu", en: "Cancel editing" }, ["Esc"]],
    [{ hu: "Új sor a cellán belül", sk: "Nový riadok v bunke", en: "New line in a cell" }, ["Alt", "Enter"]],
    [{ hu: "Kijelölés kitöltése ugyanazzal", sk: "Vyplniť výber rovnakou hodnotou", en: "Fill the selection with the same entry" }, ["Ctrl", "Enter"]],
    [{ hu: "Kitöltés lefelé", sk: "Vyplniť nadol", en: "Fill down" }, ["Ctrl", "D"]],
    [{ hu: "Kitöltés jobbra", sk: "Vyplniť doprava", en: "Fill right" }, ["Ctrl", "R"]],
    [{ hu: "Villámkitöltés (minta alapján)", sk: "Dynamické dopĺňanie (podľa vzoru)", en: "Flash Fill (by example)" }, ["Ctrl", "E"]],
    [{ hu: "Lenyíló lista / szűrő megnyitása", sk: "Otvoriť rozbaľovací zoznam / filter", en: "Open drop-down list / filter" }, ["Alt", "↓"]],
    [{ hu: "Megjegyzés hozzáadása / szerkesztése", sk: "Pridať / upraviť poznámku", en: "Add / edit a note" }, ["Shift", "F2"]],
    [{ hu: "Hivatkozás beszúrása", sk: "Vložiť prepojenie", en: "Insert hyperlink" }, ["Ctrl", "K"]],
    [{ hu: "Új munkalap beszúrása", sk: "Vložiť nový hárok", en: "Insert a new sheet" }, ["Shift", "F11"]],
  ]},
  { ikon: "ƒx", szin: "kek", cim: { hu: "Képletek", sk: "Vzorce", en: "Formulas" }, sorok: [
    [{ hu: "Abszolút / relatív hivatkozás ($A$1) váltása", sk: "Prepnúť absolútny / relatívny odkaz ($A$1)", en: "Toggle absolute / relative reference ($A$1)" }, ["F4"]],
    [{ hu: "Függvény beszúrása", sk: "Vložiť funkciu", en: "Insert function" }, ["Shift", "F3"]],
    [{ hu: "Függvényargumentumok ablak (a név beírása után)", sk: "Okno argumentov funkcie (po napísaní názvu)", en: "Function Arguments dialog (after typing the name)" }, ["Ctrl", "A"]],
    [{ hu: "Tömbképlet (régi Excel)", sk: "Vzorec poľa (staršie verzie)", en: "Array formula (older Excel)" }, ["Ctrl", "Shift", "Enter"]],
    [{ hu: "Szerkesztőléc kinyitása / becsukása", sk: "Rozbaliť / zbaliť riadok vzorcov", en: "Expand / collapse the formula bar" }, ["Ctrl", "Shift", "U"]],
    [{ hu: "Név beillesztése", sk: "Vložiť názov", en: "Paste a name" }, ["F3"]],
    [{ hu: "Névkezelő", sk: "Správca názvov", en: "Name Manager" }, ["Ctrl", "F3"]],
    [{ hu: "Minden újraszámolása", sk: "Prepočítať všetko", en: "Calculate all" }, ["F9"]],
    [{ hu: "Aktív munkalap újraszámolása", sk: "Prepočítať aktívny hárok", en: "Calculate the active sheet" }, ["Shift", "F9"]],
    [{ hu: "Teljes újraszámolás", sk: "Úplný prepočet", en: "Full recalculation" }, ["Ctrl", "Alt", "F9"]],
    [{ hu: "Képletrész kiértékelése (szerkesztés közben)", sk: "Vyhodnotiť časť vzorca (pri úprave)", en: "Evaluate part of a formula (while editing)" }, ["F9"]],
  ]},
  { ikon: "📊", szin: "lila", cim: { hu: "Adatok, táblázat, diagram", sk: "Údaje, tabuľka, graf", en: "Data, tables, charts" }, sorok: [
    [{ hu: "Táblázattá alakítás", sk: "Previesť na tabuľku", en: "Create a table" }, ["Ctrl", "T"], ["Ctrl", "L"]],
    [{ hu: "Szűrő be / ki", sk: "Filter zap. / vyp.", en: "Filter on / off" }, ["Ctrl", "Shift", "L"]],
    [{ hu: "Gyorselemzés", sk: "Rýchla analýza", en: "Quick Analysis" }, ["Ctrl", "Q"]],
    [{ hu: "Sorok / oszlopok csoportosítása", sk: "Zoskupiť riadky / stĺpce", en: "Group rows / columns" }, ["Alt", "Shift", "→"]],
    [{ hu: "Csoportosítás bontása", sk: "Zrušiť zoskupenie", en: "Ungroup" }, ["Alt", "Shift", "←"]],
    [{ hu: "Tagolás szimbólumai be / ki", sk: "Symboly prehľadu zap. / vyp.", en: "Show / hide outline symbols" }, ["Ctrl", "8"]],
    [{ hu: "Diagram a munkalapon", sk: "Graf na hárku", en: "Chart on the sheet" }, ["Alt", "F1"]],
    [{ hu: "Diagram külön lapon", sk: "Graf na samostatnom hárku", en: "Chart on a separate sheet" }, ["F11"]],
  ]},
  { ikon: "⚙️", szin: "zold", cim: { hu: "Makrók és VBA", sk: "Makrá a VBA", en: "Macros & VBA" }, sorok: [
    [{ hu: "Makrók listája", sk: "Zoznam makier", en: "Macro list" }, ["Alt", "F8"]],
    [{ hu: "VBA szerkesztő megnyitása", sk: "Otvoriť editor VBA", en: "Open the VBA editor" }, ["Alt", "F11"]],
    [{ hu: "Makró futtatása (VBA-ban)", sk: "Spustiť makro (vo VBA)", en: "Run macro (in VBA)" }, ["F5"]],
    [{ hu: "Lépésenkénti futtatás (VBA-ban)", sk: "Krokovanie (vo VBA)", en: "Step through (in VBA)" }, ["F8"]],
    [{ hu: "Futó makró megállítása", sk: "Zastaviť bežiace makro", en: "Stop a running macro" }, ["Ctrl", "Break"], ["Esc"]],
    [{ hu: "Projektböngésző (VBA-ban)", sk: "Prieskumník projektu (vo VBA)", en: "Project Explorer (in VBA)" }, ["Ctrl", "R"]],
    [{ hu: "Immediate ablak (VBA-ban)", sk: "Okno Immediate (vo VBA)", en: "Immediate window (in VBA)" }, ["Ctrl", "G"]],
  ]},
];

/* ======================================================
   KÉPLETFORDÍTÓ – további függvénynevek (a fenti 97-en felül)
   ====================================================== */
const EXTRA_FUGGVENYNEVEK = {
  PMT: "RÉSZLET", ADDRESS: "CÍM", CONCATENATE: "ÖSSZEFŰZ", PRODUCT: "SZORZAT", TRUNC: "CSONK",
  CEILING: "PLAFON", FLOOR: "PADLÓ", NA: "HIÁNYZIK", ISNA: "NINCS", ISERR: "HIBA.E", ISEVEN: "PÁROSE", ISODD: "PÁRATLANE",
  HOUR: "ÓRA", MINUTE: "PERCEK", SECOND: "MPERC", CHAR: "KARAKTER", CODE: "KÓD", RAND: "VÉL",
  STDEV: "SZÓRÁS", ROWS: "SOROK", COLUMNS: "OSZLOPOK", LOOKUP: "KERES", DAYS: "NAPOK", WEEKNUM: "HÉT.SZÁMA",
  RANK: "SORSZÁM", TEXTSPLIT: "SZÖVEGFELOSZTÁS", TEXTBEFORE: "SZÖVEGELŐTTE", VSTACK: "FÜGG.HALMOZÁS", HSTACK: "VÍZSZ.HALMOZÁS", "NETWORKDAYS.INTL": "ÖSSZ.MUNKANAP.INTL", "WORKDAY.INTL": "KALK.MUNKANAP.INTL", RANDARRAY: "VÉLETLENTÖMB",
};
const HIBAERTEKEK = { "#N/A": "#HIÁNYZIK", "#VALUE!": "#ÉRTÉK!", "#DIV/0!": "#ZÉRÓOSZTÓ!", "#REF!": "#HIV!", "#NAME?": "#NÉV?", "#NUM!": "#SZÁM!", "#NULL!": "#NULLA!" };
const LOGIKAI = { TRUE: "IGAZ", FALSE: "HAMIS" };
