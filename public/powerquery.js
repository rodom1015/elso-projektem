/*
  POWER QUERY SÚGÓ – alapok, tippek, M kód példák, M függvények, hibák (HU / SK / EN)
  Az M nyelv függvényei minden nyelvű Excelben angolul vannak, ezért a kód mindenhol ugyanaz.
  A példakódban a {1}, {2}… helyére a nyelvenkénti szöveg kerül (pl. oszlopnevek, hu-HU / sk-SK).
*/

const PQ_LEPESEK = {
  hu: [
    ["Mi ez?", "A Power Query az Excel beépített adat-előkészítő eszköze: betölt, megtisztít és átalakít adatokat – és minden lépést megjegyez. Legközelebb egy Frissítés gombbal ugyanazt elvégzi az új adaton."],
    ["Hol van?", "Adatok fül → Adatok beolvasása (Get Data). Innen tölthetsz be Excel fájlt, CSV-t, egész mappát, weboldalt vagy a munkafüzet egy táblázatát (Táblázatból/Tartományból)."],
    ["A szerkesztő", "Megnyílik a Power Query-szerkesztő. Jobb oldalt az „Alkalmazott lépések” listája – minden kattintásod egy lépés, ami bármikor módosítható vagy törölhető."],
    ["Tisztítás", "Tipikus lépések: felesleges oszlopok eltávolítása, szűrés, típusok beállítása, oszlop felosztása, kitöltés lefelé, ismétlődések eltávolítása, csoportosítás."],
    ["Betöltés", "Kezdőlap → Bezárás és betöltés (Close & Load). Az eredmény egy új munkalapra kerül táblázatként – vagy a „Betöltés ide…” (Load To) menüben csak kapcsolatként."],
    ["Frissítés", "Ha új adat érkezik (pl. új havi fájl a mappában): Adatok → Összes frissítése (Ctrl + Alt + F5). Minden lépés újra lefut – kézi munka nélkül."],
    ["M kód", "Minden lépés mögött M nyelvű kód áll. Kezdőlap → Speciális szerkesztő (Advanced Editor): itt látod és ide másolhatod be a Példák fülön lévő kódokat."],
  ],
  sk: [
    ["Čo to je?", "Power Query je vstavaný nástroj Excelu na prípravu údajov: načíta, vyčistí a transformuje údaje – a zapamätá si každý krok. Nabudúce to isté urobí s novými údajmi jedným tlačidlom Obnoviť."],
    ["Kde je?", "Karta Údaje → Získať údaje (Get Data). Môžeš načítať súbor Excel, CSV, celý priečinok, webovú stránku alebo tabuľku zo zošita (Z tabuľky/rozsahu)."],
    ["Editor", "Otvorí sa editor Power Query. Vpravo je zoznam „Použité kroky“ – každé kliknutie je krok, ktorý môžeš kedykoľvek upraviť alebo odstrániť."],
    ["Čistenie", "Typické kroky: odstránenie nepotrebných stĺpcov, filtrovanie, nastavenie typov, rozdelenie stĺpca, vyplnenie nadol, odstránenie duplicít, zoskupenie."],
    ["Načítanie", "Domov → Zavrieť a načítať (Close & Load). Výsledok sa vloží na nový hárok ako tabuľka – alebo v ponuke „Načítať do…“ (Load To) iba ako pripojenie."],
    ["Obnovenie", "Keď prídu nové údaje (napr. nový mesačný súbor v priečinku): Údaje → Obnoviť všetko (Ctrl + Alt + F5). Všetky kroky sa zopakujú – bez ručnej práce."],
    ["Kód M", "Za každým krokom je kód v jazyku M. Domov → Rozšírený editor (Advanced Editor): tu ho vidíš a sem môžeš vložiť kódy z karty Príklady."],
  ],
  en: [
    ["What is it?", "Power Query is Excel's built-in data preparation tool: it loads, cleans and reshapes data – and remembers every step. Next time one Refresh repeats it all on the new data."],
    ["Where is it?", "Data tab → Get Data. Load an Excel file, a CSV, a whole folder, a web page or a table from the workbook (From Table/Range)."],
    ["The editor", "The Power Query Editor opens. On the right, \"Applied Steps\" lists every click as a step you can edit or delete at any time."],
    ["Cleaning", "Typical steps: remove unneeded columns, filter, set data types, split a column, fill down, remove duplicates, group."],
    ["Loading", "Home → Close & Load. The result lands on a new sheet as a table – or, via \"Load To…\", as a connection only."],
    ["Refreshing", "When new data arrives (e.g. a new monthly file in the folder): Data → Refresh All (Ctrl + Alt + F5). Every step runs again – no manual work."],
    ["M code", "Behind every step is M code. Home → Advanced Editor: see it there, and paste the code from the Examples tab."],
  ],
};

const PQ_TIPPEK = [
  { ikon: "🏷️", cim: { hu: "Nevezd el a lépéseket", sk: "Pomenuj kroky", en: "Name your steps" },
    szoveg: { hu: "Jobb klikk egy lépésen → Átnevezés. A „Típus módosítva 3” helyett a „Dátum szöveggé” fél év múlva is érthető lesz – neked és a kollégáknak is.",
      sk: "Pravý klik na krok → Premenovať. Namiesto „Zmenený typ 3“ bude „Dátum na text“ zrozumiteľný aj o pol roka – tebe aj kolegom.",
      en: "Right-click a step → Rename. \"Date to text\" is far clearer in six months than \"Changed Type 3\" – for you and your colleagues." } },
  { ikon: "🌍", cim: { hu: "Típus módosítása területi beállítással", sk: "Zmena typu s miestnym nastavením", en: "Change type using locale" },
    szoveg: { hu: "Ha a CSV-ben tizedesvessző vagy pl. 2026.10.31. formátum van, jobb klikk az oszlopon → Típus módosítása → Területi beállítás használata (Using Locale) → Magyar. Így nem lesz hibás a szám és a dátum.",
      sk: "Ak má CSV desatinnú čiarku alebo dátum 31. 10. 2026, pravý klik na stĺpec → Zmeniť typ → Použiť miestne nastavenie (Using Locale) → Slovenčina. Čísla aj dátumy budú správne.",
      en: "If the CSV uses decimal commas or local date formats, right-click the column → Change Type → Using Locale → pick the right country. Numbers and dates then convert correctly." } },
  { ikon: "🔗", cim: { hu: "Csak kapcsolat a segédlekérdezéseknek", sk: "Iba pripojenie pre pomocné dotazy", en: "Connection only for helper queries" },
    szoveg: { hu: "Betöltés ide… (Load To) → Csak kapcsolat létrehozása. A köztes lekérdezések így nem gyártanak felesleges munkalapokat, a fájl kisebb és gyorsabb.",
      sk: "Načítať do… (Load To) → Iba vytvoriť pripojenie. Pomocné dotazy tak nevytvárajú zbytočné hárky a súbor je menší a rýchlejší.",
      en: "Load To… → Only Create Connection. Intermediate queries then don't create extra sheets, keeping the file smaller and faster." } },
  { ikon: "📂", cim: { hu: "Mappa betöltése = havi riport automatikusan", sk: "Načítanie priečinka = mesačný výkaz automaticky", en: "Load a folder = automatic monthly report" },
    szoveg: { hu: "Adatok beolvasása → Fájlból → Mappából, majd Egyesítés. Ha jövő hónapban bemásolsz egy új fájlt a mappába, csak Frissítesz – és benne van az összesítésben.",
      sk: "Získať údaje → Zo súboru → Z priečinka, potom Kombinovať. Keď budúci mesiac skopíruješ do priečinka nový súbor, stačí Obnoviť – a je v súhrne.",
      en: "Get Data → From File → From Folder, then Combine. Next month just drop the new file into the folder and Refresh – it's in the summary." } },
  { ikon: "🧲", cim: { hu: "Összefésülés FKERES helyett", sk: "Zlúčenie namiesto VLOOKUP", en: "Merge instead of VLOOKUP" },
    szoveg: { hu: "Kezdőlap → Lekérdezések egyesítése (Merge Queries): két táblát köt össze egy közös oszlop alapján. Nagy adatnál sokkal gyorsabb, mint több ezer FKERES.",
      sk: "Domov → Zlúčiť dotazy (Merge Queries): spojí dve tabuľky podľa spoločného stĺpca. Pri veľkých údajoch oveľa rýchlejšie ako tisíce VLOOKUP.",
      en: "Home → Merge Queries: joins two tables on a shared column. With big data it's much faster than thousands of VLOOKUPs." } },
  { ikon: "📚", cim: { hu: "Hozzáfűzés: táblák egymás alá", sk: "Pripojenie: tabuľky pod seba", en: "Append: stack tables" },
    szoveg: { hu: "Kezdőlap → Lekérdezések hozzáfűzése (Append Queries): több azonos szerkezetű táblát fűz egymás alá – pl. a 12 havi lapot egyetlen éves listává.",
      sk: "Domov → Pripojiť dotazy (Append Queries): spojí pod seba viac tabuliek s rovnakou štruktúrou – napr. 12 mesačných hárkov do jedného ročného zoznamu.",
      en: "Home → Append Queries: stacks tables with the same structure – e.g. 12 monthly sheets into one yearly list." } },
  { ikon: "🔃", cim: { hu: "Kereszttáblából adatbázis: Unpivot", sk: "Z krížovej tabuľky databáza: Unpivot", en: "Cross-tab to database: Unpivot" },
    szoveg: { hu: "Ha a hónapok oszlopokban vannak (Jan, Feb, Már…), jelöld ki a fix oszlopot, majd jobb klikk → Egyéb oszlopok elforgatásának visszavonása (Unpivot Other Columns). Így szűrhető és kimutatásba tehető lesz.",
      sk: "Ak sú mesiace v stĺpcoch (Jan, Feb, Mar…), označ pevný stĺpec, potom pravý klik → Zrušiť kontingenciu ostatných stĺpcov (Unpivot Other Columns). Dá sa potom filtrovať aj použiť v kontingenčnej tabuľke.",
      en: "If months are in columns (Jan, Feb, Mar…), select the fixed column, then right-click → Unpivot Other Columns. It becomes filterable and pivot-ready." } },
  { ikon: "✨", cim: { hu: "Oszlop példákból", sk: "Stĺpec z príkladov", en: "Column From Examples" },
    szoveg: { hu: "Oszlop hozzáadása → Oszlop példákból: beírsz 1–2 mintát (pl. a névből a keresztnevet), és a Power Query megírja hozzá a képletet. Mint a villámkitöltés, de frissíthető.",
      sk: "Pridať stĺpec → Stĺpec z príkladov: napíšeš 1–2 vzory (napr. z mena krstné meno) a Power Query zostaví vzorec. Ako dynamické dopĺňanie, ale dá sa obnoviť.",
      en: "Add Column → Column From Examples: type 1–2 examples (e.g. the first name from a full name) and Power Query writes the formula. Like Flash Fill, but refreshable." } },
  { ikon: "🛡️", cim: { hu: "„Egyéb oszlopok eltávolítása” a biztonság kedvéért", sk: "„Odstrániť ostatné stĺpce“ pre istotu", en: "\"Remove Other Columns\" for safety" },
    szoveg: { hu: "Jelöld ki a szükséges oszlopokat → jobb klikk → Egyéb oszlopok eltávolítása. Ha a forrásba később új oszlop kerül, a lekérdezés nem romlik el.",
      sk: "Označ potrebné stĺpce → pravý klik → Odstrániť ostatné stĺpce. Ak sa do zdroja neskôr pridá nový stĺpec, dotaz sa nepokazí.",
      en: "Select the columns you need → right-click → Remove Other Columns. If the source later gains new columns, the query won't break." } },
  { ikon: "⚡", cim: { hu: "Szűrj és távolíts el korán", sk: "Filtruj a odstraňuj čo najskôr", en: "Filter and remove early" },
    szoveg: { hu: "A felesleges sorokat és oszlopokat már az elején dobd ki – minden további lépés kevesebb adattal dolgozik, így a frissítés sokszor gyorsabb.",
      sk: "Nepotrebné riadky a stĺpce odstráň hneď na začiatku – každý ďalší krok pracuje s menej údajmi a obnovenie je oveľa rýchlejšie.",
      en: "Drop unneeded rows and columns right at the start – every later step handles less data, so refresh is much faster." } },
  { ikon: "🔄", cim: { hu: "Frissítés megnyitáskor", sk: "Obnovenie pri otvorení", en: "Refresh on open" },
    szoveg: { hu: "Lekérdezések és kapcsolatok → jobb klikk → Tulajdonságok → „Adatok frissítése a fájl megnyitásakor”. Vagy időzítve: „Frissítés x percenként”.",
      sk: "Dotazy a pripojenia → pravý klik → Vlastnosti → „Obnoviť údaje pri otvorení súboru“. Alebo pravidelne: „Obnoviť každých x minút“.",
      en: "Queries & Connections → right-click → Properties → \"Refresh data when opening the file\". Or on a timer: \"Refresh every x minutes\"." } },
  { ikon: "🕸️", cim: { hu: "Lekérdezésfüggőségek nézet", sk: "Zobrazenie závislostí dotazov", en: "Query Dependencies view" },
    szoveg: { hu: "Nézet → Lekérdezésfüggőségek: ábrán mutatja, melyik lekérdezés melyik forrásból és lekérdezésből táplálkozik – sok lekérdezésnél aranyat ér.",
      sk: "Zobraziť → Závislosti dotazov: graficky ukáže, z ktorého zdroja a dotazu čerpá ktorý dotaz – pri veľa dotazoch na nezaplatenie.",
      en: "View → Query Dependencies: a diagram of which query feeds from which source and query – priceless with many queries." } },
];

const PQ_PELDAK = [
  {
    ikon: "📄", szin: "kek",
    cim: { hu: "CSV betöltése magyar / szlovák formátummal", sk: "Načítanie CSV v slovenskom formáte", en: "Load a CSV with local formats" },
    leiras: {
      hu: "Pontosvesszős, UTF-8 kódolású CSV betöltése; az első sor lesz a fejléc, a dátum és az összeg a magyar formátum szerint alakul át.",
      sk: "Načíta CSV oddelené bodkočiarkou v kódovaní UTF-8; prvý riadok bude hlavička, dátum a suma sa prevedú podľa slovenského formátu.",
      en: "Loads a semicolon-separated UTF-8 CSV; the first row becomes the header, date and amount are converted using the given locale.",
    },
    s: { hu: ["Dátum", "Összeg", "hu-HU"], sk: ["Dátum", "Suma", "sk-SK"], en: ["Date", "Amount", "en-GB"] },
    kod: `let
    Source = Csv.Document(
        File.Contents("C:\\Adatok\\export.csv"),
        [Delimiter = ";", Encoding = 65001, QuoteStyle = QuoteStyle.Csv]
    ),
    Headers = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),
    Types = Table.TransformColumnTypes(
        Headers,
        {{"{1}", type date}, {"{2}", type number}},
        "{3}"
    )
in
    Types`,
  },
  {
    ikon: "📂", szin: "zold",
    cim: { hu: "Egy mappa összes Excel fájljának egyesítése", sk: "Spojenie všetkých súborov Excel v priečinku", en: "Combine every Excel file in a folder" },
    leiras: {
      hu: "A mappa minden .xlsx fájljából az első lapot/táblát egymás alá fűzi, és egy oszlopban jelzi, melyik fájlból jött a sor. A megnyitott fájlok ideiglenes (~$) másolatait kihagyja.",
      sk: "Z každého súboru .xlsx v priečinku spojí pod seba prvý hárok/tabuľku a v stĺpci uvedie, z ktorého súboru riadok pochádza. Dočasné kópie (~$) vynechá.",
      en: "Stacks the first sheet/table of every .xlsx file in the folder and records in a column which file each row came from. Skips temporary (~$) copies.",
    },
    s: { hu: ["Fájl"], sk: ["Súbor"], en: ["File"] },
    kod: `let
    Source = Folder.Files("C:\\Adatok\\Havi"),
    OnlyXlsx = Table.SelectRows(Source, each [Extension] = ".xlsx" and not Text.StartsWith([Name], "~$")),
    WithData = Table.AddColumn(OnlyXlsx, "Data", each Excel.Workbook([Content], true){0}[Data]),
    Kept = Table.SelectColumns(WithData, {"Name", "Data"}),
    Renamed = Table.RenameColumns(Kept, {{"Name", "{1}"}}),
    Expanded = Table.ExpandTableColumn(Renamed, "Data", Table.ColumnNames(Renamed{0}[Data]))
in
    Expanded`,
  },
  {
    ikon: "📋", szin: "lila",
    cim: { hu: "Táblázat a munkafüzetből", sk: "Tabuľka zo zošita", en: "A table from this workbook" },
    leiras: {
      hu: "Az aktuális munkafüzet egy elnevezett táblázatát (Ctrl + T, Táblázattervezés → Táblázat neve) tölti be.",
      sk: "Načíta pomenovanú tabuľku z aktuálneho zošita (Ctrl + T, Návrh tabuľky → Názov tabuľky).",
      en: "Loads a named table (Ctrl + T, Table Design → Table Name) from the current workbook.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Eladasok"]}[Content]
in
    Source`,
  },
  {
    ikon: "🧲", szin: "kek",
    cim: { hu: "Összefésülés (FKERES helyett)", sk: "Zlúčenie (namiesto VLOOKUP)", en: "Merge (instead of VLOOKUP)" },
    leiras: {
      hu: "Az Eladasok táblához hozzáveszi a Termekek tábla Ár oszlopát a közös Cikkszám alapján. Ami nem talál párt, az is megmarad (bal oldali külső illesztés).",
      sk: "K tabuľke Eladasok pridá stĺpec Cena z tabuľky Termekek podľa spoločného kódu. Riadky bez zhody zostanú (ľavé vonkajšie spojenie).",
      en: "Adds the Price column of the Products table to the Sales table using the shared item code. Rows without a match are kept (left outer join).",
    },
    s: { hu: ["Cikkszám", "Ár"], sk: ["Kód", "Cena"], en: ["Code", "Price"] },
    kod: `let
    Sales = Excel.CurrentWorkbook(){[Name = "Eladasok"]}[Content],
    Products = Excel.CurrentWorkbook(){[Name = "Termekek"]}[Content],
    Joined = Table.NestedJoin(Sales, {"{1}"}, Products, {"{1}"}, "P", JoinKind.LeftOuter),
    Result = Table.ExpandTableColumn(Joined, "P", {"{2}"})
in
    Result`,
  },
  {
    ikon: "📊", szin: "zold",
    cim: { hu: "Csoportosítás: összeg és darab", sk: "Zoskupenie: súčet a počet", en: "Group by: sum and count" },
    leiras: {
      hu: "Városonként összeadja az összeget és megszámolja a sorokat – mint egy kimutatás, de frissíthető táblázatként.",
      sk: "Pre každé mesto sčíta sumu a spočíta riadky – ako kontingenčná tabuľka, ale ako obnoviteľná tabuľka.",
      en: "Sums the amount and counts rows per city – like a pivot, but as a refreshable table.",
    },
    s: { hu: ["Város", "Összeg", "Darab"], sk: ["Mesto", "Suma", "Počet"], en: ["City", "Amount", "Count"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Eladasok"]}[Content],
    Grouped = Table.Group(
        Source,
        {"{1}"},
        {
            {"{2}", each List.Sum([{2}]), type number},
            {"{3}", each Table.RowCount(_), Int64.Type}
        }
    ),
    Sorted = Table.Sort(Grouped, {{"{2}", Order.Descending}})
in
    Sorted`,
  },
  {
    ikon: "🔃", szin: "narancs",
    cim: { hu: "Unpivot: hónap-oszlopokból sorok", sk: "Unpivot: zo stĺpcov mesiacov riadky", en: "Unpivot: month columns into rows" },
    leiras: {
      hu: "Ha a táblában a hónapok külön oszlopok (Jan, Feb…), egyetlen Hónap + Érték oszlopot csinál belőlük – így szűrhető és kimutatásba tehető.",
      sk: "Ak sú mesiace samostatné stĺpce (Jan, Feb…), vytvorí z nich jeden stĺpec Mesiac + Hodnota – dá sa filtrovať a použiť v kontingenčnej tabuľke.",
      en: "If months are separate columns (Jan, Feb…), turns them into one Month + Value pair – filterable and pivot-ready.",
    },
    s: { hu: ["Termék", "Hónap", "Érték"], sk: ["Produkt", "Mesiac", "Hodnota"], en: ["Product", "Month", "Value"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Havi"]}[Content],
    Unpivoted = Table.UnpivotOtherColumns(Source, {"{1}"}, "{2}", "{3}")
in
    Unpivoted`,
  },
  {
    ikon: "🔀", szin: "lila",
    cim: { hu: "Feltételes oszlop (kategória)", sk: "Podmienený stĺpec (kategória)", en: "Conditional column (category)" },
    leiras: {
      hu: "Új oszlop az összeg nagysága szerint: Nagy / Közepes / Kicsi – mint a HA függvény, de a lekérdezésben.",
      sk: "Nový stĺpec podľa výšky sumy: Veľká / Stredná / Malá – ako funkcia IF, ale v dotaze.",
      en: "A new column based on the amount: Large / Medium / Small – like IF, but in the query.",
    },
    s: { hu: ["Kategória", "Összeg", "Nagy", "Közepes", "Kicsi"], sk: ["Kategória", "Suma", "Veľká", "Stredná", "Malá"], en: ["Category", "Amount", "Large", "Medium", "Small"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Eladasok"]}[Content],
    Added = Table.AddColumn(
        Source,
        "{1}",
        each if [{2}] >= 100000 then "{3}"
             else if [{2}] >= 10000 then "{4}"
             else "{5}",
        type text
    )
in
    Added`,
  },
  {
    ikon: "🧹", szin: "kek",
    cim: { hu: "Szöveg tisztítása (szóközök, kis-nagybetű)", sk: "Čistenie textu (medzery, veľké písmená)", en: "Clean text (spaces, capitalisation)" },
    leiras: {
      hu: "A Név oszlopból kitörli a felesleges szóközöket és rejtett karaktereket, és Nagy Kezdőbetűssé alakítja.",
      sk: "Zo stĺpca Meno odstráni nadbytočné medzery a skryté znaky a prevedie ho na Veľké Začiatočné Písmená.",
      en: "Removes extra spaces and hidden characters from the Name column and converts it to Proper Case.",
    },
    s: { hu: ["Név"], sk: ["Meno"], en: ["Name"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Ugyfelek"]}[Content],
    Cleaned = Table.TransformColumns(
        Source,
        {{"{1}", each if _ = null then null else Text.Proper(Text.Trim(Text.Clean(_))), type text}}
    )
in
    Cleaned`,
  },
  {
    ikon: "✂️", szin: "zold",
    cim: { hu: "Oszlop felosztása határolóval", sk: "Rozdelenie stĺpca oddeľovačom", en: "Split a column by delimiter" },
    leiras: {
      hu: "A „Teljes név” oszlopot az első szóköznél kettébontja vezeték- és keresztnévre.",
      sk: "Stĺpec „Celé meno“ rozdelí pri prvej medzere na priezvisko a meno.",
      en: "Splits the \"Full name\" column at the first space into last and first name.",
    },
    s: { hu: ["Teljes név", "Vezetéknév", "Keresztnév"], sk: ["Celé meno", "Priezvisko", "Meno"], en: ["Full name", "Last name", "First name"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Ugyfelek"]}[Content],
    Split = Table.SplitColumn(
        Source,
        "{1}",
        Splitter.SplitTextByEachDelimiter({" "}, QuoteStyle.None, false),
        {"{2}", "{3}"}
    )
in
    Split`,
  },
  {
    ikon: "⬇️", szin: "narancs",
    cim: { hu: "Kitöltés lefelé és üres sorok törlése", sk: "Vyplnenie nadol a odstránenie prázdnych riadkov", en: "Fill down and remove blank rows" },
    leiras: {
      hu: "Ha a város csak a csoport első sorában szerepel (pl. egyesített cellák után), lefelé kitölti; majd kitörli a teljesen üres sorokat.",
      sk: "Ak je mesto uvedené len v prvom riadku skupiny (napr. po zlúčených bunkách), vyplní ho nadol; potom odstráni úplne prázdne riadky.",
      en: "If the city only appears on the first row of each group (e.g. after merged cells), fills it down; then removes completely blank rows.",
    },
    s: { hu: ["Város"], sk: ["Mesto"], en: ["City"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Adatok"]}[Content],
    Filled = Table.FillDown(Source, {"{1}"}),
    NoBlanks = Table.SelectRows(
        Filled,
        each not List.IsEmpty(List.RemoveMatchingItems(Record.FieldValues(_), {"", null}))
    )
in
    NoBlanks`,
  },
  {
    ikon: "📅", szin: "lila",
    cim: { hu: "Naptártábla készítése", sk: "Vytvorenie kalendárnej tabuľky", en: "Build a calendar table" },
    leiras: {
      hu: "Egy teljes év minden napja egy táblában, évvel, hónappal, hónapnévvel, ISO héttel és napnévvel – kimutatásokhoz, diagramokhoz.",
      sk: "Každý deň celého roka v tabuľke s rokom, mesiacom, názvom mesiaca, týždňom ISO a názvom dňa – pre kontingenčné tabuľky a grafy.",
      en: "Every day of a full year in one table with year, month, month name, ISO week and day name – for pivots and charts.",
    },
    s: {
      hu: ["Dátum", "Év", "Hónap", "Hónap neve", "Hét", "Nap neve", "hu-HU"],
      sk: ["Dátum", "Rok", "Mesiac", "Názov mesiaca", "Týždeň", "Názov dňa", "sk-SK"],
      en: ["Date", "Year", "Month", "Month name", "Week", "Day name", "en-GB"],
    },
    kod: `let
    StartDate = #date(2026, 1, 1),
    EndDate = #date(2026, 12, 31),
    Days = List.Dates(StartDate, Duration.Days(EndDate - StartDate) + 1, #duration(1, 0, 0, 0)),
    Calendar = Table.FromList(Days, Splitter.SplitByNothing(), {"{1}"}),
    Typed = Table.TransformColumnTypes(Calendar, {{"{1}", type date}}),
    AddYear = Table.AddColumn(Typed, "{2}", each Date.Year([{1}]), Int64.Type),
    AddMonth = Table.AddColumn(AddYear, "{3}", each Date.Month([{1}]), Int64.Type),
    AddMonthName = Table.AddColumn(AddMonth, "{4}", each Date.MonthName([{1}], "{7}"), type text),
    // ISO week (based on Thursday)
    AddWeek = Table.AddColumn(AddMonthName, "{5}", each
        let thursday = Date.AddDays([{1}], 3 - Date.DayOfWeek([{1}], Day.Monday))
        in Number.RoundUp(Date.DayOfYear(thursday) / 7), Int64.Type),
    AddDayName = Table.AddColumn(AddWeek, "{6}", each Date.DayOfWeekName([{1}], "{7}"), type text)
in
    AddDayName`,
  },
  {
    ikon: "🧭", szin: "kek",
    cim: { hu: "Fájl útvonala egy cellából (paraméter)", sk: "Cesta k súboru z bunky (parameter)", en: "File path from a cell (parameter)" },
    leiras: {
      hu: "Nevezz el egy cellát „Utvonal”-nak (Névmező), írd bele a mappa elérési útját. A lekérdezés onnan olvassa – így más gépen is működik, csak a cellát kell átírni.",
      sk: "Pomenuj bunku „Utvonal“ (pole Názov) a napíš do nej cestu k priečinku. Dotaz ju načíta odtiaľ – funguje aj na inom počítači, stačí zmeniť bunku.",
      en: "Name a cell \"Utvonal\" (Name Box) and type the folder path into it. The query reads it from there – works on any PC, just edit the cell.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `let
    FolderPath = Excel.CurrentWorkbook(){[Name = "Utvonal"]}[Content]{0}[Column1],
    Source = Folder.Files(FolderPath)
in
    Source`,
  },
  {
    ikon: "💱", szin: "zold",
    cim: { hu: "Élő árfolyamok a netről (EKB)", sk: "Aktuálne kurzy z internetu (ECB)", en: "Live exchange rates from the web (ECB)" },
    leiras: {
      hu: "Az Európai Központi Bank napi árfolyamait tölti be egy ingyenes nyilvános szolgáltatásból (frankfurter.app) – frissítéskor mindig a legújabbat.",
      sk: "Načíta denné kurzy Európskej centrálnej banky z bezplatnej verejnej služby (frankfurter.app) – pri obnovení vždy najnovšie.",
      en: "Loads the European Central Bank's daily rates from a free public service (frankfurter.app) – always the latest on refresh.",
    },
    s: { hu: ["Pénznem", "Árfolyam"], sk: ["Mena", "Kurz"], en: ["Currency", "Rate"] },
    kod: `let
    Source = Json.Document(Web.Contents("https://api.frankfurter.app/latest?from=EUR")),
    Rates = Record.ToTable(Source[rates]),
    Renamed = Table.RenameColumns(Rates, {{"Name", "{1}"}, {"Value", "{2}"}}),
    Typed = Table.TransformColumnTypes(Renamed, {{"{2}", type number}})
in
    Typed`,
  },
  {
    ikon: "🔢", szin: "narancs",
    cim: { hu: "Sorszám és hibák kezelése", sk: "Poradové číslo a spracovanie chýb", en: "Index column and error handling" },
    leiras: {
      hu: "Sorszám oszlopot ad a táblához, a hibás összegeket 0-ra cseréli, a teljesen hibás sorokat pedig eltávolítja.",
      sk: "Pridá stĺpec s poradovým číslom, chybné sumy nahradí nulou a úplne chybné riadky odstráni.",
      en: "Adds an index column, replaces erroneous amounts with 0, and removes rows that still contain errors.",
    },
    s: { hu: ["Sorszám", "Összeg"], sk: ["Poradie", "Suma"], en: ["Index", "Amount"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Eladasok"]}[Content],
    Indexed = Table.AddIndexColumn(Source, "{1}", 1, 1, Int64.Type),
    Typed = Table.TransformColumnTypes(Indexed, {{"{2}", type number}}),
    Fixed = Table.ReplaceErrorValues(Typed, {{"{2}", 0}}),
    NoErrors = Table.RemoveRowsWithErrors(Fixed)
in
    NoErrors`,
  },
  {
    ikon: "🧮", szin: "lila",
    cim: { hu: "Göngyölített (futó) összeg", sk: "Kumulatívny (priebežný) súčet", en: "Running total" },
    leiras: {
      hu: "Dátum szerint rendezi a táblát, és minden sorhoz kiszámolja az addigi összeget (pl. havi halmozott bevétel).",
      sk: "Zoradí tabuľku podľa dátumu a ku každému riadku vypočíta doterajší súčet (napr. kumulatívne tržby).",
      en: "Sorts the table by date and calculates the cumulative total up to each row (e.g. year-to-date revenue).",
    },
    s: { hu: ["Dátum", "Összeg", "Göngyölített"], sk: ["Dátum", "Suma", "Kumulatívne"], en: ["Date", "Amount", "Running total"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Eladasok"]}[Content],
    Sorted = Table.Buffer(Table.Sort(Source, {{"{1}", Order.Ascending}})),
    Amounts = List.Buffer(Sorted[{2}]),
    Running = List.Skip(List.Accumulate(Amounts, {0}, (state, x) => state & {List.Last(state) + x})),
    Result = Table.FromColumns(Table.ToColumns(Sorted) & {Running}, Table.ColumnNames(Sorted) & {"{3}"})
in
    Result`,
  },
];

// M függvények: [név, kategória, leírás {hu, sk, en}, példa]
const PQ_FUGGVENYEK = [
  ["Csv.Document", "forras", { hu: "CSV / szövegfájl beolvasása", sk: "Načítanie CSV / textového súboru", en: "Read a CSV / text file" }, 'Csv.Document(File.Contents(path), [Delimiter=";", Encoding=65001])'],
  ["Excel.Workbook", "forras", { hu: "Egy Excel fájl lapjai és táblái", sk: "Hárky a tabuľky súboru Excel", en: "Sheets and tables of an Excel file" }, "Excel.Workbook(File.Contents(path), true)"],
  ["Excel.CurrentWorkbook", "forras", { hu: "Az aktuális munkafüzet táblái, nevei", sk: "Tabuľky a názvy aktuálneho zošita", en: "Tables and names in this workbook" }, 'Excel.CurrentWorkbook(){[Name="Tabla1"]}[Content]'],
  ["Folder.Files", "forras", { hu: "Egy mappa összes fájlja (almappákkal)", sk: "Všetky súbory priečinka (aj podpriečinky)", en: "All files in a folder (incl. subfolders)" }, 'Folder.Files("C:\\Adatok")'],
  ["Web.Contents", "forras", { hu: "Weboldal / API letöltése", sk: "Stiahnutie webu / API", en: "Download a web page / API" }, 'Web.Contents("https://…")'],
  ["Json.Document", "forras", { hu: "JSON adat feldolgozása", sk: "Spracovanie JSON", en: "Parse JSON" }, "Json.Document(Web.Contents(url))"],
  ["Table.PromoteHeaders", "tabla", { hu: "Első sor fejléccé", sk: "Prvý riadok ako hlavička", en: "First row to headers" }, "Table.PromoteHeaders(t, [PromoteAllScalars=true])"],
  ["Table.TransformColumnTypes", "tabla", { hu: "Oszloptípusok beállítása", sk: "Nastavenie typov stĺpcov", en: "Set column types" }, 'Table.TransformColumnTypes(t, {{"Összeg", type number}}, "hu-HU")'],
  ["Table.SelectRows", "tabla", { hu: "Sorok szűrése feltétellel", sk: "Filtrovanie riadkov podmienkou", en: "Filter rows by condition" }, 'Table.SelectRows(t, each [Város] = "Budapest")'],
  ["Table.SelectColumns", "tabla", { hu: "Csak a megadott oszlopok", sk: "Iba zadané stĺpce", en: "Keep only listed columns" }, 'Table.SelectColumns(t, {"Név", "Összeg"})'],
  ["Table.RemoveColumns", "tabla", { hu: "Oszlopok törlése", sk: "Odstránenie stĺpcov", en: "Remove columns" }, 'Table.RemoveColumns(t, {"Megjegyzés"})'],
  ["Table.RenameColumns", "tabla", { hu: "Oszlopok átnevezése", sk: "Premenovanie stĺpcov", en: "Rename columns" }, 'Table.RenameColumns(t, {{"Old", "Új"}})'],
  ["Table.AddColumn", "tabla", { hu: "Új, számolt oszlop", sk: "Nový vypočítaný stĺpec", en: "New calculated column" }, 'Table.AddColumn(t, "Bruttó", each [Nettó] * 1.27, type number)'],
  ["Table.TransformColumns", "tabla", { hu: "Meglévő oszlop átalakítása", sk: "Transformácia existujúceho stĺpca", en: "Transform an existing column" }, 'Table.TransformColumns(t, {{"Név", Text.Upper}})'],
  ["Table.Group", "tabla", { hu: "Csoportosítás (összeg, darab…)", sk: "Zoskupenie (súčet, počet…)", en: "Group by (sum, count…)" }, 'Table.Group(t, {"Város"}, {{"Össz", each List.Sum([Összeg])}})'],
  ["Table.Sort", "tabla", { hu: "Rendezés", sk: "Zoradenie", en: "Sort" }, 'Table.Sort(t, {{"Összeg", Order.Descending}})'],
  ["Table.Distinct", "tabla", { hu: "Ismétlődések eltávolítása", sk: "Odstránenie duplicít", en: "Remove duplicates" }, 'Table.Distinct(t, {"Email"})'],
  ["Table.NestedJoin", "tabla", { hu: "Két tábla összefésülése", sk: "Zlúčenie dvoch tabuliek", en: "Join two tables" }, 'Table.NestedJoin(a, {"Kód"}, b, {"Kód"}, "B", JoinKind.LeftOuter)'],
  ["Table.ExpandTableColumn", "tabla", { hu: "Beágyazott tábla kibontása", sk: "Rozbalenie vnorenej tabuľky", en: "Expand a nested table" }, 'Table.ExpandTableColumn(t, "B", {"Ár"})'],
  ["Table.Combine", "tabla", { hu: "Táblák egymás alá", sk: "Tabuľky pod seba", en: "Stack tables" }, "Table.Combine({jan, feb, mar})"],
  ["Table.UnpivotOtherColumns", "tabla", { hu: "Oszlopokból sorok (unpivot)", sk: "Zo stĺpcov riadky (unpivot)", en: "Columns to rows (unpivot)" }, 'Table.UnpivotOtherColumns(t, {"Termék"}, "Hónap", "Érték")'],
  ["Table.Pivot", "tabla", { hu: "Sorokból oszlopok (pivot)", sk: "Z riadkov stĺpce (pivot)", en: "Rows to columns (pivot)" }, 'Table.Pivot(t, List.Distinct(t[Hónap]), "Hónap", "Érték", List.Sum)'],
  ["Table.FillDown", "tabla", { hu: "Kitöltés lefelé", sk: "Vyplniť nadol", en: "Fill down" }, 'Table.FillDown(t, {"Város"})'],
  ["Table.SplitColumn", "tabla", { hu: "Oszlop felosztása", sk: "Rozdelenie stĺpca", en: "Split a column" }, 'Table.SplitColumn(t, "Név", Splitter.SplitTextByDelimiter(" "))'],
  ["Table.AddIndexColumn", "tabla", { hu: "Sorszám oszlop", sk: "Stĺpec s poradím", en: "Index column" }, 'Table.AddIndexColumn(t, "Sorszám", 1, 1)'],
  ["Table.ReplaceValue", "tabla", { hu: "Érték cseréje", sk: "Nahradenie hodnoty", en: "Replace a value" }, 'Table.ReplaceValue(t, "N/A", null, Replacer.ReplaceValue, {"Ár"})'],
  ["Table.FirstN / Table.Skip", "tabla", { hu: "Első N sor / sorok kihagyása", sk: "Prvých N riadkov / preskočenie", en: "First N rows / skip rows" }, "Table.Skip(t, 3)"],
  ["Text.Trim / Text.Clean", "szoveg", { hu: "Szóközök és rejtett karakterek ki", sk: "Odstránenie medzier a skrytých znakov", en: "Remove spaces / hidden characters" }, "Text.Trim(Text.Clean([Név]))"],
  ["Text.Upper / Lower / Proper", "szoveg", { hu: "Kis- és nagybetű", sk: "Veľké a malé písmená", en: "Change case" }, "Text.Proper([Név])"],
  ["Text.Start / End / Middle", "szoveg", { hu: "Szövegrész az elejéről / végéről / közepéről", sk: "Časť textu zo začiatku / konca / stredu", en: "Part of text from start / end / middle" }, "Text.Start([Kód], 4)"],
  ["Text.Contains", "szoveg", { hu: "Tartalmazza-e (szűréshez)", sk: "Či obsahuje (na filter)", en: "Contains? (for filters)" }, 'Text.Contains([Név], "Kft", Comparer.OrdinalIgnoreCase)'],
  ["Text.BeforeDelimiter / AfterDelimiter", "szoveg", { hu: "Határoló előtti / utáni rész", sk: "Časť pred / za oddeľovačom", en: "Text before / after a delimiter" }, 'Text.AfterDelimiter([Email], "@")'],
  ["Text.PadStart", "szoveg", { hu: "Kiegészítés nullákkal", sk: "Doplnenie nulami", en: "Pad with zeros" }, 'Text.PadStart(Text.From([Kód]), 6, "0")'],
  ["Number.Round", "szam", { hu: "Kerekítés", sk: "Zaokrúhlenie", en: "Round" }, "Number.Round([Összeg], 2)"],
  ["Number.From / Text.From", "szam", { hu: "Átalakítás szám ↔ szöveg", sk: "Prevod číslo ↔ text", en: "Convert number ↔ text" }, 'Number.From("1,5", "hu-HU")'],
  ["List.Sum / Max / Min / Average", "szam", { hu: "Lista összege, max, min, átlag", sk: "Súčet, max, min, priemer zoznamu", en: "Sum, max, min, average of a list" }, "List.Sum(t[Összeg])"],
  ["Date.Year / Month / Day", "datum", { hu: "Dátum részei", sk: "Časti dátumu", en: "Date parts" }, "Date.Month([Dátum])"],
  ["Date.AddDays / AddMonths", "datum", { hu: "Napok / hónapok hozzáadása", sk: "Pridanie dní / mesiacov", en: "Add days / months" }, "Date.AddMonths([Dátum], 1)"],
  ["Date.EndOfMonth", "datum", { hu: "Hónap utolsó napja", sk: "Posledný deň mesiaca", en: "Last day of the month" }, "Date.EndOfMonth([Dátum])"],
  ["Date.DayOfWeekName", "datum", { hu: "A hét napjának neve", sk: "Názov dňa v týždni", en: "Name of the weekday" }, 'Date.DayOfWeekName([Dátum], "hu-HU")'],
  ["DateTime.LocalNow", "datum", { hu: "Mostani dátum és idő", sk: "Aktuálny dátum a čas", en: "Current date and time" }, "Date.From(DateTime.LocalNow())"],
  ["Duration.Days", "datum", { hu: "Két dátum különbsége napokban", sk: "Rozdiel dátumov v dňoch", en: "Difference of dates in days" }, "Duration.Days([Vége] - [Kezdet])"],
  ["if … then … else", "logika", { hu: "Feltétel (mint a HA)", sk: "Podmienka (ako IF)", en: "Condition (like IF)" }, 'if [Összeg] > 0 then "Bevétel" else "Kiadás"'],
  ["each _", "logika", { hu: "Rövid függvény az aktuális sorra / értékre", sk: "Krátka funkcia pre aktuálny riadok / hodnotu", en: "Short function for the current row / value" }, "each Text.Upper(_)"],
  ["try … otherwise", "logika", { hu: "Hiba esetén alapérték (mint a HAHIBA)", sk: "Pri chybe predvolená hodnota (ako IFERROR)", en: "Fallback value on error (like IFERROR)" }, "try Number.From([Ár]) otherwise 0"],
  ["Table.Buffer / List.Buffer", "logika", { hu: "Memóriába töltés – gyorsítás", sk: "Načítanie do pamäte – zrýchlenie", en: "Load into memory – speed-up" }, "Table.Buffer(Table.Sort(t, …))"],
];

const PQ_KATEGORIAK = {
  forras: { hu: "Adatforrások", sk: "Zdroje údajov", en: "Data sources" },
  tabla: { hu: "Táblák", sk: "Tabuľky", en: "Tables" },
  szoveg: { hu: "Szöveg", sk: "Text", en: "Text" },
  szam: { hu: "Számok és listák", sk: "Čísla a zoznamy", en: "Numbers & lists" },
  datum: { hu: "Dátum", sk: "Dátum", en: "Date" },
  logika: { hu: "Logika és gyorsítás", sk: "Logika a zrýchlenie", en: "Logic & speed" },
};

const PQ_HIBAK = [
  { hiba: "Expression.Error: The column 'X' of the table wasn't found.",
    megoldas: { hu: "A forrásban átnevezték vagy törölték az oszlopot. Nézd meg, melyik lépés hivatkozik rá (általában a „Típus módosítva”), és javítsd vagy töröld. Megelőzés: a típusbeállítást tedd a végére, és használd az „Egyéb oszlopok eltávolítása” lépést.",
      sk: "V zdroji stĺpec premenovali alebo odstránili. Nájdi krok, ktorý naň odkazuje (zvyčajne „Zmenený typ“), a oprav ho alebo odstráň. Prevencia: nastavenie typov daj na koniec a použi „Odstrániť ostatné stĺpce“.",
      en: "The column was renamed or removed in the source. Find the step that refers to it (usually \"Changed Type\") and fix or delete it. Prevention: set types at the end and use \"Remove Other Columns\"." } },
  { hiba: "DataFormat.Error: We couldn't convert to Number.",
    megoldas: { hu: "A szám szövegként, tizedesvesszővel vagy szóközös ezres tagolással jött. Megoldás: Típus módosítása → Területi beállítás használata → Magyar. Ha maradnak hibák: jobb klikk → Hibák cseréje → 0.",
      sk: "Číslo prišlo ako text, s desatinnou čiarkou alebo medzerou ako oddeľovačom tisícov. Riešenie: Zmeniť typ → Použiť miestne nastavenie → Slovenčina. Ak chyby zostanú: pravý klik → Nahradiť chyby → 0.",
      en: "The number came as text, with a decimal comma or space as thousands separator. Fix: Change Type → Using Locale → the right country. If errors remain: right-click → Replace Errors → 0." } },
  { hiba: "Formula.Firewall: Query 'X' references other queries or steps…",
    megoldas: { hu: "Adatvédelmi szint ütközés két forrás között. Fájl → Beállítások és opciók → Lekérdezési beállítások → Adatvédelem: állítsd be a forrásokat azonos szintre, vagy (ha a fájl csak a tiéd) „Adatvédelmi szintek figyelmen kívül hagyása”.",
      sk: "Konflikt úrovní ochrany osobných údajov medzi zdrojmi. Súbor → Možnosti a nastavenia → Možnosti dotazu → Ochrana osobných údajov: nastav zdroje na rovnakú úroveň, alebo (ak je súbor len tvoj) „Ignorovať úrovne ochrany“.",
      en: "Privacy-level clash between two sources. File → Options and settings → Query Options → Privacy: set the sources to the same level, or (if the file is only yours) \"Ignore the Privacy Levels\"." } },
  { hiba: "DataSource.Error: Could not find file / a part of the path.",
    megoldas: { hu: "A fájl vagy mappa máshol van (pl. más gépen, áthelyezték). Kezdőlap → Adatforrás-beállítások → Forrás módosítása. Profi megoldás: az útvonal egy cellából jöjjön (Példák → „Fájl útvonala egy cellából”).",
      sk: "Súbor alebo priečinok je inde (napr. iný počítač, presunutý). Domov → Nastavenia zdroja údajov → Zmeniť zdroj. Profi riešenie: cesta z bunky (Príklady → „Cesta k súboru z bunky“).",
      en: "The file or folder is elsewhere (another PC, moved). Home → Data Source Settings → Change Source. Pro fix: take the path from a cell (Examples → \"File path from a cell\")." } },
  { hiba: "Expression.Error: We cannot convert the value null to type Text.",
    megoldas: { hu: "Üres cellán futott egy szövegfüggvény. Írd így: each if _ = null then null else Text.Trim(_), vagy előbb cseréld az üres értékeket: Érték cseréje → null → \"\".",
      sk: "Textová funkcia narazila na prázdnu bunku. Píš: each if _ = null then null else Text.Trim(_), alebo najprv nahraď prázdne hodnoty: Nahradiť hodnoty → null → \"\".",
      en: "A text function hit an empty cell. Write: each if _ = null then null else Text.Trim(_), or first Replace Values → null → \"\"." } },
  { hiba: { hu: "A dátumok számként vagy rossz sorrendben (hónap/nap) jönnek", sk: "Dátumy prichádzajú ako čísla alebo v zlom poradí (mesiac/deň)", en: "Dates arrive as numbers or in the wrong order (month/day)" },
    megoldas: { hu: "Számként (pl. 46326): típus → Dátum. Felcserélt hónap/nap: Típus módosítása → Területi beállítás használata → a forrás országa (pl. Angol (Egyesült Államok) az amerikai formátumhoz).",
      sk: "Ako čísla (napr. 46326): typ → Dátum. Zamenený mesiac/deň: Zmeniť typ → Použiť miestne nastavenie → krajina zdroja (napr. angličtina (USA) pre americký formát).",
      en: "As numbers (e.g. 46326): set type → Date. Month/day swapped: Change Type → Using Locale → the source's country (e.g. English (United States) for US format)." } },
  { hiba: { hu: "A mappa betöltésekor hiba: ~$fájlnév.xlsx", sk: "Chyba pri načítaní priečinka: ~$názov.xlsx", en: "Error when loading a folder: ~$filename.xlsx" },
    megoldas: { hu: "Ez egy éppen megnyitott Excel fájl ideiglenes másolata. Szűrd ki: Name oszlop → Szövegszűrők → Nem ezzel kezdődik → ~$ (vagy használd a Példák fül mappás kódját).",
      sk: "Je to dočasná kópia práve otvoreného súboru Excel. Vyfiltruj ju: stĺpec Name → Textové filtre → Nezačína na → ~$ (alebo použi kód s priečinkom z karty Príklady).",
      en: "It's the temporary copy of an Excel file that is open. Filter it out: Name column → Text Filters → Does Not Begin With → ~$ (or use the folder code on the Examples tab)." } },
  { hiba: { hu: "A frissítés nagyon lassú", sk: "Obnovenie je veľmi pomalé", en: "Refreshing is very slow" },
    megoldas: { hu: "Szűrj és törölj oszlopokat a legelején; kerüld a soronkénti FKERES-szerű egyéni oszlopokat (használj Összefésülést); nagy rendezés/összefésülés előtt Table.Buffer; és a segédlekérdezések legyenek „Csak kapcsolat”.",
      sk: "Filtruj a odstraňuj stĺpce hneď na začiatku; vyhni sa vlastným stĺpcom typu VLOOKUP po riadkoch (použi Zlúčenie); pred veľkým triedením/zlúčením Table.Buffer; pomocné dotazy nastav ako „Iba pripojenie“.",
      en: "Filter and remove columns at the very start; avoid row-by-row VLOOKUP-style custom columns (use Merge); Table.Buffer before big sorts/joins; and make helper queries \"Connection only\"." } },
];
