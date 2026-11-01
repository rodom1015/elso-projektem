/*
  POWER QUERY BŐVÍTÉS
  - 15 új kész M kód (a PQ_PELDAK listához fűzzük)
  - Receptek: gyakori feladatok kattintásról kattintásra (kód nélkül)
  A menüpontok neve Excel-verziótól függően kicsit eltérhet – zárójelben az angol nevet is megadjuk.
*/

PQ_PELDAK.push(
  {
    ikon: "📑", szin: "zold",
    cim: { hu: "Egy munkafüzet összes munkalapja egymás alá", sk: "Všetky hárky zošita pod seba", en: "Stack every sheet of a workbook" },
    leiras: {
      hu: "Egy fájl minden munkalapját (pl. Január, Február…) egy táblába fűzi, és egy oszlopban jelzi a lap nevét. Az oszlopneveknek egyezniük kell.",
      sk: "Všetky hárky súboru (napr. Január, Február…) spojí do jednej tabuľky a v stĺpci uvedie názov hárka. Názvy stĺpcov sa musia zhodovať.",
      en: "Stacks every worksheet of a file (e.g. January, February…) into one table and records the sheet name in a column. Column names must match.",
    },
    s: { hu: ["Munkalap"], sk: ["Hárok"], en: ["Sheet"] },
    kod: `let
    Source = Excel.Workbook(File.Contents("C:\\Adatok\\Eves.xlsx"), true),
    Sheets = Table.SelectRows(Source, each [Kind] = "Sheet"),
    Kept = Table.SelectColumns(Sheets, {"Name", "Data"}),
    Renamed = Table.RenameColumns(Kept, {{"Name", "{1}"}}),
    Expanded = Table.ExpandTableColumn(Renamed, "Data", Table.ColumnNames(Renamed{0}[Data]))
in
    Expanded`,
  },
  {
    ikon: "🗂️", szin: "kek",
    cim: { hu: "Egy mappa összes CSV fájlja egy táblába", sk: "Všetky CSV súbory z priečinka do jednej tabuľky", en: "Combine every CSV file in a folder" },
    leiras: {
      hu: "A mappa minden .csv fájlját beolvassa (pontosvessző, UTF-8), az első sorukat fejlécnek veszi, és egymás alá fűzi őket a fájlnévvel együtt.",
      sk: "Načíta každý súbor .csv v priečinku (bodkočiarka, UTF-8), prvý riadok berie ako hlavičku a spojí ich pod seba aj s názvom súboru.",
      en: "Reads every .csv file in the folder (semicolon, UTF-8), promotes the first row to headers and stacks them with the file name.",
    },
    s: { hu: ["Fájl"], sk: ["Súbor"], en: ["File"] },
    kod: `let
    Source = Folder.Files("C:\\Adatok\\CSV"),
    OnlyCsv = Table.SelectRows(Source, each Text.Lower([Extension]) = ".csv"),
    WithData = Table.AddColumn(OnlyCsv, "Data", each Table.PromoteHeaders(
        Csv.Document([Content], [Delimiter = ";", Encoding = 65001, QuoteStyle = QuoteStyle.Csv]),
        [PromoteAllScalars = true])),
    Kept = Table.SelectColumns(WithData, {"Name", "Data"}),
    Renamed = Table.RenameColumns(Kept, {{"Name", "{1}"}}),
    Expanded = Table.ExpandTableColumn(Renamed, "Data", Table.ColumnNames(Renamed{0}[Data]))
in
    Expanded`,
  },
  {
    ikon: "✂️", szin: "narancs",
    cim: { hu: "Fejléc előtti szemét sorok levágása", sk: "Odstránenie zbytočných riadkov nad hlavičkou", en: "Skip junk rows above the header" },
    leiras: {
      hu: "Sok rendszer exportja a táblázat fölé logót, dátumot, üres sorokat tesz. Ez a kód megkeresi azt a sort, ahol az első oszlopban a „Dátum” felirat áll, és onnan kezdi a táblát – akkor is, ha a sorok száma változik.",
      sk: "Exporty často dávajú nad tabuľku logo, dátum a prázdne riadky. Kód nájde riadok, kde je v prvom stĺpci „Dátum“, a tabuľku začne odtiaľ – aj keď sa počet riadkov mení.",
      en: "Many exports put a logo, a date and blank rows above the table. This finds the row whose first column says \"Date\" and starts the table there – even if the number of junk rows changes.",
    },
    s: { hu: ["Dátum"], sk: ["Dátum"], en: ["Date"] },
    kod: `let
    Source = Excel.Workbook(File.Contents("C:\\Adatok\\Export.xlsx"), false){0}[Data],
    HeaderRow = List.PositionOf(List.Transform(Table.Column(Source, "Column1"), Text.From), "{1}"),
    Skipped = Table.Skip(Source, HeaderRow),
    Headers = Table.PromoteHeaders(Skipped, [PromoteAllScalars = true])
in
    Headers`,
  },
  {
    ikon: "↕️", szin: "lila",
    cim: { hu: "Cellában felsorolt értékek külön sorokba", sk: "Hodnoty vymenované v bunke do samostatných riadkov", en: "Split a list in a cell into rows" },
    leiras: {
      hu: "Ha egy cellában vesszővel elválasztva több érték van (pl. „alma, körte, szilva”), mindegyik saját sort kap, a többi oszlop ismétlődik.",
      sk: "Ak je v bunke viac hodnôt oddelených čiarkou (napr. „jablko, hruška, slivka“), každá dostane vlastný riadok, ostatné stĺpce sa zopakujú.",
      en: "If a cell holds several comma-separated values (e.g. \"apple, pear, plum\"), each gets its own row and the other columns repeat.",
    },
    s: { hu: ["Termékek"], sk: ["Produkty"], en: ["Products"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Rendelesek"]}[Content],
    ToLists = Table.TransformColumns(Source, {{"{1}", each
        if _ = null then {null} else List.Transform(Text.Split(Text.From(_), ","), Text.Trim), type list}}),
    Expanded = Table.ExpandListColumn(ToLists, "{1}")
in
    Expanded`,
  },
  {
    ikon: "🧵", szin: "kek",
    cim: { hu: "Csoportonként felsorolás egy cellába (Text.Combine)", sk: "Zoznam v skupine do jednej bunky (Text.Combine)", en: "List values per group in one cell (Text.Combine)" },
    leiras: {
      hu: "Az előző fordítottja: vevőnként egy sor, a megvett termékek vesszővel felsorolva, ismétlés nélkül.",
      sk: "Opak predchádzajúceho: jeden riadok na zákazníka, kúpené produkty vymenované čiarkou, bez opakovania.",
      en: "The reverse of the previous one: one row per customer with the products listed, comma-separated, without duplicates.",
    },
    s: { hu: ["Vevő", "Termékek", "Termék"], sk: ["Zákazník", "Produkty", "Produkt"], en: ["Customer", "Products", "Product"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Eladasok"]}[Content],
    Grouped = Table.Group(Source, {"{1}"}, {
        {"{2}", each Text.Combine(List.Distinct(List.Transform([{3}], Text.From)), ", "), type text}
    })
in
    Grouped`,
  },
  {
    ikon: "🥧", szin: "zold",
    cim: { hu: "Százalékos arány az összeshez képest", sk: "Percentuálny podiel z celku", en: "Percent of total" },
    leiras: {
      hu: "Új oszlop, ami megmutatja, hogy a sor összege hány százaléka a teljes összegnek. Százalék típusú, így Excelben rögtön %-ként jelenik meg.",
      sk: "Nový stĺpec ukáže, koľko percent z celkovej sumy tvorí riadok. Je typu percento, v Exceli sa hneď zobrazí ako %.",
      en: "Adds a column showing what percentage of the grand total each row is. It's a Percentage type, so Excel shows it as % right away.",
    },
    s: { hu: ["Összeg", "Arány"], sk: ["Suma", "Podiel"], en: ["Amount", "Share"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Eladasok"]}[Content],
    Total = List.Sum(Source[{1}]),
    Percent = Table.AddColumn(Source, "{2}", each [{1}] / Total, Percentage.Type)
in
    Percent`,
  },
  {
    ikon: "🏆", szin: "narancs",
    cim: { hu: "Rangsor (helyezés) oszlop", sk: "Stĺpec poradia (umiestnenie)", en: "Rank column" },
    leiras: {
      hu: "Összeg szerint csökkenő sorrendben helyezést ad (holtversenyben ugyanazt a számot, mint a RANG.EGY). Microsoft 365 / Excel 2021+ kell hozzá.",
      sk: "Podľa sumy zostupne pridelí poradie (pri zhode rovnaké číslo, ako RANK.EQ). Potrebuje Microsoft 365 / Excel 2021+.",
      en: "Ranks rows by amount, descending (ties get the same number, like RANK.EQ). Needs Microsoft 365 / Excel 2021+.",
    },
    s: { hu: ["Összeg", "Helyezés"], sk: ["Suma", "Poradie"], en: ["Amount", "Rank"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Eladasok"]}[Content],
    Ranked = Table.AddRankColumn(Source, "{2}", {"{1}", Order.Descending}, [RankKind = RankKind.Competition]),
    Sorted = Table.Sort(Ranked, {{"{2}", Order.Ascending}})
in
    Sorted`,
  },
  {
    ikon: "🕒", szin: "lila",
    cim: { hu: "Csak a legutolsó rekord megtartása", sk: "Ponechať iba posledný záznam", en: "Keep only the latest record" },
    leiras: {
      hu: "Ha egy ügyfélhez/termékhez több sor van (pl. árváltozások), csak a legfrissebb dátumú sor marad meg mindegyikből.",
      sk: "Ak má zákazník/produkt viac riadkov (napr. zmeny cien), z každého zostane iba riadok s najnovším dátumom.",
      en: "If a customer/product has several rows (e.g. price changes), only the row with the latest date is kept for each.",
    },
    s: { hu: ["Cikkszám", "Dátum"], sk: ["Kód", "Dátum"], en: ["Code", "Date"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Arak"]}[Content],
    Typed = Table.TransformColumnTypes(Source, {{"{2}", type date}}),
    Grouped = Table.Group(Typed, {"{1}"}, {{"Rows", each Table.Max(_, "{2}"), type record}}),
    Result = Table.FromRecords(Grouped[Rows])
in
    Result`,
  },
  {
    ikon: "📆", szin: "kek",
    cim: { hu: "Munkanapok két dátum között (ünnepnapokkal)", sk: "Pracovné dni medzi dvoma dátumami (so sviatkami)", en: "Workdays between two dates (with holidays)" },
    leiras: {
      hu: "Mint a HÁLÓZATI.MUNKANAPOK: megszámolja a hétköznapokat a kezdő és a záró dátum között, és kihagyja az Unnepnapok tábla dátumait.",
      sk: "Ako NETWORKDAYS: spočíta pracovné dni medzi začiatkom a koncom a vynechá dátumy z tabuľky Unnepnapok (sviatky).",
      en: "Like NETWORKDAYS: counts weekdays between the start and end date and skips the dates in the Unnepnapok (holidays) table.",
    },
    s: { hu: ["Kezdés", "Befejezés", "Munkanapok", "Dátum"], sk: ["Začiatok", "Koniec", "Pracovné dni", "Dátum"], en: ["Start", "End", "Workdays", "Date"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Projektek"]}[Content],
    Holidays = List.Transform(Excel.CurrentWorkbook(){[Name = "Unnepnapok"]}[Content][{4}], Date.From),
    Typed = Table.TransformColumnTypes(Source, {{"{1}", type date}, {"{2}", type date}}),
    Workdays = Table.AddColumn(Typed, "{3}", each
        List.Count(List.Select(
            List.Dates([{1}], Duration.Days([{2}] - [{1}]) + 1, #duration(1, 0, 0, 0)),
            (d) => Date.DayOfWeek(d, Day.Monday) < 5 and not List.Contains(Holidays, d)
        )), Int64.Type)
in
    Workdays`,
  },
  {
    ikon: "🌐", szin: "zold",
    cim: { hu: "Táblázat egy weboldalról", sk: "Tabuľka z webovej stránky", en: "A table from a web page" },
    leiras: {
      hu: "Egy weboldal első HTML táblázatát tölti be. Ha nem az kell, a {0} helyére írd a 1, 2… számot. Frissítéskor mindig az aktuális adat jön.",
      sk: "Načíta prvú HTML tabuľku stránky. Ak potrebuješ inú, prepíš {0} na 1, 2… Pri obnovení vždy príde aktuálny stav.",
      en: "Loads the first HTML table of a web page. For another one change {0} to 1, 2… Each refresh brings the current data.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `let
    Source = Web.Page(Web.Contents("https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population")),
    Tables = Table.SelectRows(Source, each [Kind] = "Table"),
    FirstTable = Tables{0}[Data]
in
    FirstTable`,
  },
  {
    ikon: "☁️", szin: "kek",
    cim: { hu: "Mappa a OneDrive-ról / SharePointról", sk: "Priečinok z OneDrive / SharePointu", en: "A folder from OneDrive / SharePoint" },
    leiras: {
      hu: "A céges SharePoint vagy OneDrive egy mappájának Excel fájljait fűzi össze – így bárhonnan frissíthető, nem kell C:\\ meghajtó. Saját OneDrive-nál a cím: https://ceg-my.sharepoint.com/personal/nev_ceg_hu",
      sk: "Spojí súbory Excel z priečinka firemného SharePointu alebo OneDrive – dá sa obnoviť odkiaľkoľvek, netreba disk C:\\. Pre osobný OneDrive je adresa: https://firma-my.sharepoint.com/personal/meno_firma_sk",
      en: "Combines the Excel files of a company SharePoint or OneDrive folder – refreshable from anywhere, no C:\\ drive needed. For personal OneDrive the URL is: https://company-my.sharepoint.com/personal/name_company_com",
    },
    s: { hu: ["Fájl"], sk: ["Súbor"], en: ["File"] },
    kod: `let
    Source = SharePoint.Files("https://ceg.sharepoint.com/sites/Csapat", [ApiVersion = 15]),
    InFolder = Table.SelectRows(Source, each
        Text.Contains([Folder Path], "/Shared Documents/Havi/") and [Extension] = ".xlsx"),
    WithData = Table.AddColumn(InFolder, "Data", each Excel.Workbook([Content], true){0}[Data]),
    Kept = Table.SelectColumns(WithData, {"Name", "Data"}),
    Renamed = Table.RenameColumns(Kept, {{"Name", "{1}"}}),
    Expanded = Table.ExpandTableColumn(Renamed, "Data", Table.ColumnNames(Renamed{0}[Data]))
in
    Expanded`,
  },
  {
    ikon: "🧩", szin: "narancs",
    cim: { hu: "Fuzzy összefésülés (elírások ellenére)", sk: "Fuzzy zlúčenie (aj pri preklepoch)", en: "Fuzzy merge (despite typos)" },
    leiras: {
      hu: "Akkor is párosít, ha a nevek nem egyeznek pontosan (pl. „Kovács Kft.” és „Kovacs kft”). A Threshold 0–1 között állítja, mennyire legyen szigorú.",
      sk: "Spáruje aj vtedy, keď sa mená presne nezhodujú (napr. „Novák s.r.o.“ a „Novak sro“). Threshold 0–1 určuje prísnosť.",
      en: "Matches even when names aren't identical (e.g. \"Smith Ltd.\" and \"smith ltd\"). Threshold 0–1 sets how strict it is.",
    },
    s: { hu: ["Partner", "Város"], sk: ["Partner", "Mesto"], en: ["Partner", "City"] },
    kod: `let
    Orders = Excel.CurrentWorkbook(){[Name = "Rendelesek"]}[Content],
    Partners = Excel.CurrentWorkbook(){[Name = "Partnerek"]}[Content],
    Merged = Table.FuzzyNestedJoin(Orders, {"{1}"}, Partners, {"{1}"}, "Match", JoinKind.LeftOuter,
        [IgnoreCase = true, IgnoreSpace = true, Threshold = 0.8]),
    Expanded = Table.ExpandTableColumn(Merged, "Match", {"{2}"})
in
    Expanded`,
  },
  {
    ikon: "🔤", szin: "lila",
    cim: { hu: "Oszlopok átnevezése egy táblázat alapján", sk: "Premenovanie stĺpcov podľa tabuľky", en: "Rename columns from a mapping table" },
    leiras: {
      hu: "Egy kis Atnevezes táblában (Régi | Új) megadod a neveket, és a lekérdezés mindet átnevezi. Ami nincs meg, azt kihagyja hiba nélkül.",
      sk: "V malej tabuľke Atnevezes (Starý | Nový) zadáš názvy a dotaz ich všetky premenuje. Chýbajúce preskočí bez chyby.",
      en: "List the names in a small Atnevezes table (Old | New) and the query renames them all. Missing ones are skipped without an error.",
    },
    s: { hu: ["Régi", "Új"], sk: ["Starý", "Nový"], en: ["Old", "New"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Adatok"]}[Content],
    Map = Excel.CurrentWorkbook(){[Name = "Atnevezes"]}[Content],
    Pairs = List.Zip({Map[{1}], Map[{2}]}),
    Renamed = Table.RenameColumns(Source, Pairs, MissingField.Ignore)
in
    Renamed`,
  },
  {
    ikon: "🔁", szin: "zold",
    cim: { hu: "Pivot: sorokból oszlopok összeggel", sk: "Pivot: z riadkov stĺpce so súčtom", en: "Pivot: rows into columns with a sum" },
    leiras: {
      hu: "Az unpivot fordítottja: a Hónap oszlop értékeiből oszlopok lesznek, a cellákba az összeg kerül (termékenként). Mint egy kimutatás, de frissíthető táblaként.",
      sk: "Opak unpivotu: z hodnôt stĺpca Mesiac budú stĺpce, v bunkách bude súčet (pre každý produkt). Ako kontingenčná tabuľka, ale obnoviteľná.",
      en: "The reverse of unpivot: the values of the Month column become columns, the cells get the sum (per product). Like a pivot, but as a refreshable table.",
    },
    s: { hu: ["Hónap", "Összeg"], sk: ["Mesiac", "Suma"], en: ["Month", "Amount"] },
    kod: `let
    Source = Excel.CurrentWorkbook(){[Name = "Eladasok"]}[Content],
    AsText = Table.TransformColumnTypes(Source, {{"{1}", type text}}),
    Pivoted = Table.Pivot(AsText, List.Sort(List.Distinct(AsText[{1}])), "{1}", "{2}", List.Sum)
in
    Pivoted`,
  },
  {
    ikon: "🎛️", szin: "kek",
    cim: { hu: "Paramétertábla (több beállítás egy helyen)", sk: "Tabuľka parametrov (viac nastavení na jednom mieste)", en: "Parameter table (several settings in one place)" },
    leiras: {
      hu: "Egy Parameterek táblában (Név | Érték) tartod az útvonalat és a kezdő dátumot. A kollégának csak a cellát kell átírnia, a kódhoz nem kell nyúlni.",
      sk: "V tabuľke Parameterek (Názov | Hodnota) máš cestu aj počiatočný dátum. Kolega prepíše iba bunku, do kódu nemusí siahať.",
      en: "Keep the file path and start date in a Parameterek table (Name | Value). Colleagues just edit a cell and never touch the code.",
    },
    s: { hu: ["Név", "Érték", "Útvonal", "Kezdő dátum", "Dátum"], sk: ["Názov", "Hodnota", "Cesta", "Počiatočný dátum", "Dátum"], en: ["Name", "Value", "Path", "Start date", "Date"] },
    kod: `let
    Params = Excel.CurrentWorkbook(){[Name = "Parameterek"]}[Content],
    Get = (name as text) => Params{[{1} = name]}[{2}],
    FilePath = Get("{3}"),
    StartDate = Date.From(Get("{4}")),
    Source = Excel.Workbook(File.Contents(FilePath), true){0}[Data],
    Filtered = Table.SelectRows(Source, each Date.From([{5}]) >= StartDate)
in
    Filtered`,
  }
);

/* Receptek: kattintásról kattintásra, kód nélkül */
const PQ_RECEPTEK = [
  { ikon: "📂", cim: { hu: "Havi fájlok egyesítése egy mappából", sk: "Spojenie mesačných súborov z priečinka", en: "Combine monthly files from a folder" },
    lepesek: {
      hu: ["Tedd az összes havi fájlt egy mappába (ugyanolyan oszlopokkal)", "Adatok → Adatok beolvasása → Fájlból → Mappából (From Folder)", "Tallózd ki a mappát → Megnyitás", "Alul: Kombinálás → Kombinálás és átalakítás (Combine & Transform)", "Válaszd ki a mintafájlban a munkalapot → OK", "Javítsd az adattípusokat → Kezdőlap → Bezárás és betöltés", "Új hónap: másold a fájlt a mappába → Adatok → Összes frissítése"],
      sk: ["Daj všetky mesačné súbory do jedného priečinka (s rovnakými stĺpcami)", "Údaje → Získať údaje → Zo súboru → Z priečinka (From Folder)", "Vyber priečinok → Otvoriť", "Dole: Kombinovať → Kombinovať a transformovať (Combine & Transform)", "Vo vzorovom súbore vyber hárok → OK", "Oprav typy údajov → Domov → Zavrieť a načítať", "Nový mesiac: skopíruj súbor do priečinka → Údaje → Obnoviť všetko"],
      en: ["Put all monthly files in one folder (with the same columns)", "Data → Get Data → From File → From Folder", "Browse to the folder → Open", "At the bottom: Combine → Combine & Transform", "Pick the sheet in the sample file → OK", "Fix the data types → Home → Close & Load", "New month: copy the file into the folder → Data → Refresh All"] } },
  { ikon: "🧲", cim: { hu: "FKERES helyett: két tábla összefésülése", sk: "Namiesto VLOOKUP: zlúčenie dvoch tabuliek", en: "Instead of VLOOKUP: merge two tables" },
    lepesek: {
      hu: ["Mindkét listából csinálj táblázatot (Ctrl + T)", "Kattints az elsőbe → Adatok → Táblázatból/tartományból → Kezdőlap → Bezárás és betöltés ide… → Csak kapcsolat", "Ugyanígy a másodikkal", "Adatok → Adatok beolvasása → Lekérdezések egyesítése → Egyesítés (Merge)", "Felül az egyik tábla, alul a másik – kattints mindkettőben a közös oszlopra", "Illesztés típusa: Bal oldali külső → OK", "Az új oszlop fejlécében a ↔ ikonnal válaszd ki, mely oszlopok kellenek → Bezárás és betöltés"],
      sk: ["Z oboch zoznamov sprav tabuľku (Ctrl + T)", "Klikni do prvej → Údaje → Z tabuľky/rozsahu → Domov → Zavrieť a načítať do… → Iba vytvoriť pripojenie", "To isté s druhou", "Údaje → Získať údaje → Kombinovať dotazy → Zlúčiť (Merge)", "Hore jedna tabuľka, dole druhá – v oboch klikni na spoločný stĺpec", "Typ spojenia: Ľavé vonkajšie → OK", "V hlavičke nového stĺpca ikonou ↔ vyber potrebné stĺpce → Zavrieť a načítať"],
      en: ["Turn both lists into tables (Ctrl + T)", "Click in the first → Data → From Table/Range → Home → Close & Load To… → Only Create Connection", "Same with the second", "Data → Get Data → Combine Queries → Merge", "One table on top, the other below – click the shared column in both", "Join kind: Left Outer → OK", "Use the ↔ icon in the new column's header to pick the columns → Close & Load"] } },
  { ikon: "🧹", cim: { hu: "Ismétlődések törlése (az első marad)", sk: "Odstránenie duplicít (prvý zostane)", en: "Remove duplicates (keep the first)" },
    lepesek: {
      hu: ["Töltsd be a táblát a Power Querybe (Adatok → Táblázatból/tartományból)", "Rendezd úgy, hogy a megtartandó sor legyen felül (pl. dátum szerint csökkenő)", "Jelöld ki azokat az oszlopokat, amik együtt egyediek (Ctrl + kattintás)", "Kezdőlap → Sorok eltávolítása → Ismétlődések eltávolítása (Remove Duplicates)", "Tipp: rendezés után a Table.Buffer biztosítja, hogy tényleg a felső maradjon"],
      sk: ["Načítaj tabuľku do Power Query (Údaje → Z tabuľky/rozsahu)", "Zoraď tak, aby riadok, ktorý chceš nechať, bol hore (napr. podľa dátumu zostupne)", "Označ stĺpce, ktoré spolu tvoria jedinečnosť (Ctrl + klik)", "Domov → Odstrániť riadky → Odstrániť duplikáty (Remove Duplicates)", "Tip: po zoradení Table.Buffer zaistí, že naozaj zostane horný"],
      en: ["Load the table into Power Query (Data → From Table/Range)", "Sort so the row to keep is on top (e.g. date descending)", "Select the columns that together must be unique (Ctrl + click)", "Home → Remove Rows → Remove Duplicates", "Tip: Table.Buffer after sorting guarantees the top row is kept"] } },
  { ikon: "🔃", cim: { hu: "Kereszttábla visszaalakítása (Unpivot)", sk: "Krížová tabuľka späť na zoznam (Unpivot)", en: "Turn a cross-tab back into a list (Unpivot)" },
    lepesek: {
      hu: ["Töltsd be a táblát a Power Querybe", "Jelöld ki azokat az oszlopokat, amik MARADNAK (pl. Termék)", "Jobb klikk a fejlécen → Egyéb oszlopok elforgatásának visszavonása (Unpivot Other Columns)", "Nevezd át az Attribútum és Érték oszlopot (pl. Hónap, Összeg)", "Állítsd be a típusokat → Bezárás és betöltés"],
      sk: ["Načítaj tabuľku do Power Query", "Označ stĺpce, ktoré ZOSTANÚ (napr. Produkt)", "Pravý klik na hlavičku → Zrušiť kontingenciu ostatných stĺpcov (Unpivot Other Columns)", "Premenuj stĺpce Atribút a Hodnota (napr. Mesiac, Suma)", "Nastav typy → Zavrieť a načítať"],
      en: ["Load the table into Power Query", "Select the columns that STAY (e.g. Product)", "Right-click the header → Unpivot Other Columns", "Rename Attribute and Value (e.g. Month, Amount)", "Set the types → Close & Load"] } },
  { ikon: "📊", cim: { hu: "Csoportosítás több összesítővel", sk: "Zoskupenie s viacerými súhrnmi", en: "Group by with several aggregations" },
    lepesek: {
      hu: ["Kezdőlap (vagy Átalakítás) → Csoportosítási szempont (Group By)", "Válts a Speciális nézetre", "Csoportosítás: pl. Város (+ Csoportosítás hozzáadása: Hónap)", "Új oszlopok: Összeg = Összeg művelet, Darab = Sorok száma, Átlag = Átlag", "OK → rendezd csökkenőre → Bezárás és betöltés"],
      sk: ["Domov (alebo Transformovať) → Zoskupiť podľa (Group By)", "Prepni na Rozšírené", "Zoskupiť: napr. Mesto (+ Pridať zoskupenie: Mesiac)", "Nové stĺpce: Suma = Súčet, Počet = Počet riadkov, Priemer = Priemer", "OK → zoraď zostupne → Zavrieť a načítať"],
      en: ["Home (or Transform) → Group By", "Switch to Advanced", "Group by: e.g. City (+ Add grouping: Month)", "New columns: Total = Sum, Count = Count Rows, Average = Average", "OK → sort descending → Close & Load"] } },
  { ikon: "✂️", cim: { hu: "Egy cella felosztása több sorba", sk: "Rozdelenie bunky do viacerých riadkov", en: "Split a cell into several rows" },
    lepesek: {
      hu: ["Jelöld ki az oszlopot (pl. „alma; körte; szilva”)", "Kezdőlap → Oszlop felosztása → Határolójel szerint (By Delimiter)", "Határoló: pontosvessző", "Nyisd le a Speciális beállításokat → Felosztás: Sorokba (Rows)", "OK → Átalakítás → Formátum → Levágás (Trim) a szóközök ellen"],
      sk: ["Označ stĺpec (napr. „jablko; hruška; slivka“)", "Domov → Rozdeliť stĺpec → Podľa oddeľovača (By Delimiter)", "Oddeľovač: bodkočiarka", "Rozbaľ Rozšírené možnosti → Rozdeliť do: Riadkov (Rows)", "OK → Transformovať → Formát → Orezať (Trim) proti medzerám"],
      en: ["Select the column (e.g. \"apple; pear; plum\")", "Home → Split Column → By Delimiter", "Delimiter: semicolon", "Open Advanced options → Split into: Rows", "OK → Transform → Format → Trim to remove spaces"] } },
  { ikon: "🔀", cim: { hu: "Feltételes oszlop kattintással", sk: "Podmienený stĺpec klikaním", en: "Conditional column by clicking" },
    lepesek: {
      hu: ["Oszlop hozzáadása → Feltételes oszlop (Conditional Column)", "Új oszlop neve: pl. Kategória", "Ha Összeg nagyobb vagy egyenlő mint 100000 → Kimenet: Nagy", "Záradék hozzáadása: 10000 felett → Közepes", "Különben: Kicsi → OK (a sorrend számít: felülről az első igaz nyer)"],
      sk: ["Pridať stĺpec → Podmienený stĺpec (Conditional Column)", "Názov nového stĺpca: napr. Kategória", "Ak Suma je väčšia alebo rovná 100000 → Výstup: Veľký", "Pridať klauzulu: nad 10000 → Stredný", "Inak: Malý → OK (poradie je dôležité: vyhrá prvá pravdivá zhora)"],
      en: ["Add Column → Conditional Column", "New column name: e.g. Category", "If Amount is greater than or equal to 100000 → Output: Large", "Add clause: above 10000 → Medium", "Else: Small → OK (order matters: the first true rule from the top wins)"] } },
  { ikon: "🧭", cim: { hu: "A forrásfájl elköltözött – útvonal javítása", sk: "Zdrojový súbor sa presunul – oprava cesty", en: "The source file moved – fix the path" },
    lepesek: {
      hu: ["Adatok → Adatok beolvasása → Adatforrás-beállítások (Data Source Settings)", "Válaszd ki a régi útvonalat → Forrás módosítása (Change Source)", "Tallózd ki az új helyet → OK → Bezárás", "Adatok → Összes frissítése", "Tipp: hogy ne kelljen többé, használd a „Fájl útvonala egy cellából” vagy a „Paramétertábla” példát"],
      sk: ["Údaje → Získať údaje → Nastavenia zdroja údajov (Data Source Settings)", "Vyber starú cestu → Zmeniť zdroj (Change Source)", "Vyber nové umiestnenie → OK → Zavrieť", "Údaje → Obnoviť všetko", "Tip: aby to už nebolo treba, použi príklad „Cesta k súboru z bunky“ alebo „Tabuľka parametrov“"],
      en: ["Data → Get Data → Data Source Settings", "Select the old path → Change Source", "Browse to the new location → OK → Close", "Data → Refresh All", "Tip: to avoid this, use the \"File path from a cell\" or \"Parameter table\" example"] } },
  { ikon: "⏱️", cim: { hu: "Automatikus frissítés percenként / megnyitáskor", sk: "Automatické obnovenie každých X minút / pri otvorení", en: "Auto refresh every X minutes / on open" },
    lepesek: {
      hu: ["Adatok → Lekérdezések és kapcsolatok → jobb klikk a lekérdezésen → Tulajdonságok", "Pipáld be: Frissítés ennyi percenként (pl. 10)", "Pipáld be: Adatok frissítése a fájl megnyitásakor", "Ha kell: „Háttérben frissítés engedélyezése” kikapcsolása, hogy a makrók megvárják", "OK – a fájl mentés után is megtartja"],
      sk: ["Údaje → Dotazy a pripojenia → pravý klik na dotaz → Vlastnosti", "Zaškrtni: Obnoviť každých (napr. 10) minút", "Zaškrtni: Obnoviť údaje pri otvorení súboru", "Ak treba: vypni „Povoliť obnovenie na pozadí“, aby makrá počkali", "OK – súbor si to zapamätá aj po uložení"],
      en: ["Data → Queries & Connections → right-click the query → Properties", "Tick: Refresh every (e.g. 10) minutes", "Tick: Refresh data when opening the file", "If needed: turn off \"Enable background refresh\" so macros wait", "OK – the file keeps it after saving"] } },
  { ikon: "🧮", cim: { hu: "Betöltés kimutatásba / adatmodellbe", sk: "Načítanie do kontingenčnej tabuľky / dátového modelu", en: "Load into a PivotTable / the Data Model" },
    lepesek: {
      hu: ["A szerkesztőben: Kezdőlap → Bezárás és betöltés → Bezárás és betöltés ide… (Close & Load To)", "Válaszd: Kimutatás (PivotTable Report)", "Nagy adatnál pipáld be: Hozzáadás az adatmodellhez – így milliós sor is elfér", "OK → húzd a mezőket a kimutatásba", "Frissítés: jobb klikk a kimutatáson → Frissítés (vagy Összes frissítése)"],
      sk: ["V editore: Domov → Zavrieť a načítať → Zavrieť a načítať do… (Close & Load To)", "Vyber: Kontingenčná tabuľka (PivotTable Report)", "Pri veľkých dátach zaškrtni: Pridať do dátového modelu – zmestia sa aj milióny riadkov", "OK → presuň polia do kontingenčnej tabuľky", "Obnovenie: pravý klik na tabuľku → Obnoviť (alebo Obnoviť všetko)"],
      en: ["In the editor: Home → Close & Load → Close & Load To…", "Choose: PivotTable Report", "For big data tick: Add this data to the Data Model – millions of rows fit", "OK → drag the fields into the pivot", "Refresh: right-click the pivot → Refresh (or Refresh All)"] } },
];
