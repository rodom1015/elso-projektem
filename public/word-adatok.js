/*
  WORD SÚGÓ – billentyűparancsok és tippek (magyar / szlovák / angol)
  Felépítés ugyanaz, mint az Excel billentyűknél (excel-adatok.js).
*/

const WORD_BILLENTYUK = [
  { ikon: "📁", szin: "kek", cim: { hu: "Fájl és nézet", sk: "Súbor a zobrazenie", en: "File & view" }, sorok: [
    [{ hu: "Új dokumentum", sk: "Nový dokument", en: "New document" }, ["Ctrl", "N"]],
    [{ hu: "Megnyitás", sk: "Otvoriť", en: "Open" }, ["Ctrl", "O"]],
    [{ hu: "Mentés", sk: "Uložiť", en: "Save" }, ["Ctrl", "S"]],
    [{ hu: "Mentés másként", sk: "Uložiť ako", en: "Save as" }, ["F12"]],
    [{ hu: "Nyomtatás / nyomtatási kép", sk: "Tlačiť / ukážka pred tlačou", en: "Print / print preview" }, ["Ctrl", "P"], ["Ctrl", "F2"]],
    [{ hu: "Dokumentum bezárása", sk: "Zavrieť dokument", en: "Close document" }, ["Ctrl", "W"]],
    [{ hu: "Menüszalag elrejtése / mutatása", sk: "Skryť / zobraziť pás s nástrojmi", en: "Hide / show the ribbon" }, ["Ctrl", "F1"]],
    [{ hu: "Nyomtatási elrendezés nézet", sk: "Zobrazenie rozloženia pri tlači", en: "Print Layout view" }, ["Ctrl", "Alt", "P"]],
    [{ hu: "Vázlat nézet", sk: "Zobrazenie osnovy", en: "Outline view" }, ["Ctrl", "Alt", "O"]],
    [{ hu: "Nagyítás / kicsinyítés", sk: "Priblížiť / oddialiť", en: "Zoom in / out" }, ["Ctrl", "Wheel"]],
  ]},
  { ikon: "✂️", szin: "narancs", cim: { hu: "Szerkesztés", sk: "Úpravy", en: "Editing" }, sorok: [
    [{ hu: "Másolás / kivágás / beillesztés", sk: "Kopírovať / vystrihnúť / prilepiť", en: "Copy / cut / paste" }, ["Ctrl", "C"], ["Ctrl", "X"], ["Ctrl", "V"]],
    [{ hu: "Irányított beillesztés", sk: "Prilepiť špeciálne", en: "Paste special" }, ["Ctrl", "Alt", "V"]],
    [{ hu: "Visszavonás / mégis", sk: "Späť / znova", en: "Undo / redo" }, ["Ctrl", "Z"], ["Ctrl", "Y"]],
    [{ hu: "Utolsó művelet ismétlése", sk: "Zopakovať poslednú akciu", en: "Repeat the last action" }, ["F4"]],
    [{ hu: "Keresés (navigációs ablak)", sk: "Hľadať (navigačná tabla)", en: "Find (navigation pane)" }, ["Ctrl", "F"]],
    [{ hu: "Csere", sk: "Nahradiť", en: "Replace" }, ["Ctrl", "H"]],
    [{ hu: "Ugrás oldalra, szakaszra…", sk: "Prejsť na stranu, sekciu…", en: "Go to page, section…" }, ["Ctrl", "G"]],
    [{ hu: "Szó törlése balra / jobbra", sk: "Odstrániť slovo vľavo / vpravo", en: "Delete word left / right" }, ["Ctrl", "Backspace"], ["Ctrl", "Delete"]],
    [{ hu: "Kis- / nagybetű váltása", sk: "Zmena veľkosti písmen", en: "Change case" }, ["Shift", "F3"]],
    [{ hu: "Formátum másolása / beillesztése", sk: "Kopírovať / prilepiť formát", en: "Copy / paste formatting" }, ["Ctrl", "Shift", "C"], ["Ctrl", "Shift", "V"]],
    [{ hu: "Helyesírás-ellenőrzés", sk: "Kontrola pravopisu", en: "Spelling & grammar" }, ["F7"]],
    [{ hu: "Szinonimaszótár", sk: "Synonymický slovník", en: "Thesaurus" }, ["Shift", "F7"]],
  ]},
  { ikon: "➕", szin: "zold", cim: { hu: "Beszúrás", sk: "Vloženie", en: "Insert" }, sorok: [
    [{ hu: "Oldaltörés", sk: "Zlom strany", en: "Page break" }, ["Ctrl", "Enter"]],
    [{ hu: "Hasábtörés", sk: "Zlom stĺpca", en: "Column break" }, ["Ctrl", "Shift", "Enter"]],
    [{ hu: "Sortörés (új bekezdés nélkül)", sk: "Zlom riadka (bez nového odseku)", en: "Line break (no new paragraph)" }, ["Shift", "Enter"]],
    [{ hu: "Nem törhető szóköz", sk: "Nezlomiteľná medzera", en: "Non-breaking space" }, ["Ctrl", "Shift", "Space"]],
    [{ hu: "Hivatkozás (link)", sk: "Hypertextové prepojenie", en: "Hyperlink" }, ["Ctrl", "K"]],
    [{ hu: "Mai dátum / pontos idő", sk: "Dnešný dátum / čas", en: "Today's date / time" }, ["Alt", "Shift", "D"], ["Alt", "Shift", "T"]],
    [{ hu: "Megjegyzés", sk: "Komentár", en: "Comment" }, ["Ctrl", "Alt", "M"]],
    [{ hu: "Lábjegyzet / végjegyzet", sk: "Poznámka pod čiarou / koncová poznámka", en: "Footnote / endnote" }, ["Ctrl", "Alt", "F"], ["Ctrl", "Alt", "D"]],
    [{ hu: "Mező frissítése (pl. tartalomjegyzék)", sk: "Aktualizovať pole (napr. obsah)", en: "Update field (e.g. table of contents)" }, ["F9"]],
  ]},
  { ikon: "🔤", szin: "lila", cim: { hu: "Karakterformázás", sk: "Formát písma", en: "Character formatting" }, sorok: [
    [{ hu: "Félkövér / dőlt / aláhúzott", sk: "Tučné / kurzíva / podčiarknuté", en: "Bold / italic / underline" }, ["Ctrl", "B"], ["Ctrl", "I"], ["Ctrl", "U"]],
    [{ hu: "Dupla aláhúzás", sk: "Dvojité podčiarknutie", en: "Double underline" }, ["Ctrl", "Shift", "D"]],
    [{ hu: "Betűtípus ablak", sk: "Okno Písmo", en: "Font dialog" }, ["Ctrl", "D"]],
    [{ hu: "Csupa nagybetű", sk: "Všetky veľké písmená", en: "All caps" }, ["Ctrl", "Shift", "A"]],
    [{ hu: "Kiskapitális", sk: "Kapitálky", en: "Small caps" }, ["Ctrl", "Shift", "K"]],
    [{ hu: "Karakterformázás törlése", sk: "Odstrániť formát písma", en: "Clear character formatting" }, ["Ctrl", "Space"]],
  ]},
  { ikon: "📐", szin: "kek", cim: { hu: "Bekezdés és stílusok", sk: "Odsek a štýly", en: "Paragraph & styles" }, sorok: [
    [{ hu: "Balra / középre / jobbra / sorkizárt", sk: "Vľavo / na stred / vpravo / do bloku", en: "Left / center / right / justify" }, ["Ctrl", "L"], ["Ctrl", "E"], ["Ctrl", "R"], ["Ctrl", "J"]],
    [{ hu: "Szimpla / másfeles / dupla sorköz", sk: "Jednoduché / 1,5 / dvojité riadkovanie", en: "Single / 1.5 / double spacing" }, ["Ctrl", "1"], ["Ctrl", "5"], ["Ctrl", "2"]],
    [{ hu: "Behúzás növelése / csökkentése", sk: "Zväčšiť / zmenšiť zarážku", en: "Increase / decrease indent" }, ["Ctrl", "M"], ["Ctrl", "Shift", "M"]],
    [{ hu: "Függő behúzás", sk: "Predsadenie", en: "Hanging indent" }, ["Ctrl", "T"]],
    [{ hu: "Bekezdésformázás törlése", sk: "Odstrániť formát odseku", en: "Clear paragraph formatting" }, ["Ctrl", "Q"]],
    [{ hu: "Címsor 1 / 2 / 3", sk: "Nadpis 1 / 2 / 3", en: "Heading 1 / 2 / 3" }, ["Ctrl", "Alt", "1"], ["Ctrl", "Alt", "2"], ["Ctrl", "Alt", "3"]],
    [{ hu: "Normál stílus", sk: "Štýl Normálny", en: "Normal style" }, ["Ctrl", "Shift", "N"]],
    [{ hu: "Stílusok ablak", sk: "Tabla Štýly", en: "Styles pane" }, ["Ctrl", "Alt", "Shift", "S"]],
    [{ hu: "Rejtett jelek (¶) mutatása", sk: "Zobraziť skryté znaky (¶)", en: "Show formatting marks (¶)" }, ["Ctrl", "Shift", "8"]],
  ]},
  { ikon: "🧭", szin: "narancs", cim: { hu: "Mozgás és kijelölés", sk: "Pohyb a výber", en: "Navigation & selection" }, sorok: [
    [{ hu: "Dokumentum eleje / vége", sk: "Začiatok / koniec dokumentu", en: "Start / end of document" }, ["Ctrl", "Home"], ["Ctrl", "End"]],
    [{ hu: "Szavanként / bekezdésenként ugrás", sk: "Skok po slovách / odsekoch", en: "Jump by word / paragraph" }, ["Ctrl", "Arrows"]],
    [{ hu: "Vissza az utolsó szerkesztés helyére", sk: "Späť na miesto poslednej úpravy", en: "Back to the last edit" }, ["Shift", "F5"]],
    [{ hu: "Kijelölés szavanként / bekezdésenként", sk: "Výber po slovách / odsekoch", en: "Select by word / paragraph" }, ["Ctrl", "Shift", "Arrows"]],
    [{ hu: "Kijelölés a sor elejéig / végéig", sk: "Výber po začiatok / koniec riadka", en: "Select to start / end of line" }, ["Shift", "Home"], ["Shift", "End"]],
    [{ hu: "Kijelölés bővítése (többször: szó, mondat, bekezdés)", sk: "Rozšíriť výber (opakovane: slovo, veta, odsek)", en: "Extend selection (repeat: word, sentence, paragraph)" }, ["F8"]],
    [{ hu: "Függőleges (oszlop) kijelölés", sk: "Zvislý (stĺpcový) výber", en: "Vertical (block) selection" }, ["Alt", "Drag"]],
    [{ hu: "Minden kijelölése", sk: "Vybrať všetko", en: "Select all" }, ["Ctrl", "A"]],
  ]},
  { ikon: "📋", szin: "zold", cim: { hu: "Táblázatok", sk: "Tabuľky", en: "Tables" }, sorok: [
    [{ hu: "Következő / előző cella", sk: "Ďalšia / predchádzajúca bunka", en: "Next / previous cell" }, ["Tab"], ["Shift", "Tab"]],
    [{ hu: "Új sor a táblázat végén (az utolsó cellában)", sk: "Nový riadok na konci tabuľky (v poslednej bunke)", en: "New row at the end (in the last cell)" }, ["Tab"]],
    [{ hu: "Sor mozgatása fel / le", sk: "Presunúť riadok hore / dole", en: "Move row up / down" }, ["Alt", "Shift", "↑"], ["Alt", "Shift", "↓"]],
    [{ hu: "Tabulátor a cellán belül", sk: "Tabulátor v bunke", en: "Tab character inside a cell" }, ["Ctrl", "Tab"]],
    [{ hu: "Sor első / utolsó cellája", sk: "Prvá / posledná bunka riadka", en: "First / last cell of the row" }, ["Alt", "Home"], ["Alt", "End"]],
  ]},
  { ikon: "📝", szin: "lila", cim: { hu: "Áttekintés és makrók", sk: "Revízia a makrá", en: "Review & macros" }, sorok: [
    [{ hu: "Változások követése be / ki", sk: "Sledovať zmeny zap. / vyp.", en: "Track changes on / off" }, ["Ctrl", "Shift", "E"]],
    [{ hu: "Szószám", sk: "Počet slov", en: "Word count" }, ["Ctrl", "Shift", "G"]],
    [{ hu: "Makrók listája", sk: "Zoznam makier", en: "Macro list" }, ["Alt", "F8"]],
    [{ hu: "VBA szerkesztő", sk: "Editor VBA", en: "VBA editor" }, ["Alt", "F11"]],
  ]},
];

const WORD_TIPPEK = [
  { ikon: "📑", cim: { hu: "Automatikus tartalomjegyzék", sk: "Automatický obsah", en: "Automatic table of contents" },
    szoveg: {
      hu: "A fejezetcímekre használd a Címsor 1, 2, 3 stílust (Ctrl+Alt+1/2/3). Utána: Hivatkozás → Tartalomjegyzék. Változás után elég rákattintani és F9-et nyomni.",
      sk: "Na nadpisy kapitol použi štýly Nadpis 1, 2, 3 (Ctrl+Alt+1/2/3). Potom: Referencie → Obsah. Po zmenách stačí kliknúť do obsahu a stlačiť F9.",
      en: "Use the Heading 1, 2, 3 styles for chapter titles (Ctrl+Alt+1/2/3). Then: References → Table of Contents. After changes just click it and press F9." } },
  { ikon: "🖌️", cim: { hu: "Formátummásoló többször", sk: "Kopírovanie formátu viackrát", en: "Format Painter, many times" },
    szoveg: {
      hu: "Ha DUPLÁN kattintasz a Formátummásoló ecsetre, nem csak egyszer, hanem tetszőleges helyre átviheted a formázást. Kilépés: Esc.",
      sk: "Ak na štetec Kopírovať formát DVAKRÁT klikneš, formát môžeš preniesť na ľubovoľný počet miest. Ukončenie: Esc.",
      en: "DOUBLE-click the Format Painter brush and you can apply the formatting to as many places as you like. Press Esc to stop." } },
  { ikon: "🔁", cim: { hu: "Csere speciális jelekkel", sk: "Nahradenie špeciálnych znakov", en: "Replace special characters" },
    szoveg: {
      hu: "Ctrl+H: a ^p a bekezdésjel, a ^t a tabulátor. Az üres sorok eltüntetése: keresd ^p^p, cseréld ^p-re. A dupla szóközöket is így tüntetheted el.",
      sk: "Ctrl+H: ^p je znak odseku, ^t tabulátor. Odstránenie prázdnych riadkov: hľadaj ^p^p, nahraď ^p. Rovnako odstrániš aj dvojité medzery.",
      en: "Ctrl+H: ^p is a paragraph mark, ^t a tab. To remove empty lines: find ^p^p, replace with ^p. Double spaces can be removed the same way." } },
  { ikon: "📋", cim: { hu: "Beillesztés formázás nélkül", sk: "Prilepenie bez formátovania", en: "Paste without formatting" },
    szoveg: {
      hu: "Weboldalról vagy e-mailből másolt szövegnél: Ctrl+Shift+V (újabb Word), vagy beillesztés után a kis vágólap ikon → „Csak a szöveg megtartása”.",
      sk: "Pri texte z webu alebo e-mailu: Ctrl+Shift+V (novší Word), alebo po prilepení malá ikona schránky → „Ponechať iba text“.",
      en: "For text copied from a website or e-mail: Ctrl+Shift+V (newer Word), or after pasting click the small clipboard icon → \"Keep Text Only\"." } },
  { ikon: "✉️", cim: { hu: "Körlevél Excel listából", sk: "Hromadná korešpondencia z Excelu", en: "Mail merge from an Excel list" },
    szoveg: {
      hu: "Levelezés → Körlevélkészítés → Címzettek kiválasztása → Meglévő lista: válaszd ki az Excel fájlt. Az „Egyesítő mező beszúrása” gombbal teheted be a neveket, címeket – egy kattintással akár 100 személyre szabott levél.",
      sk: "Korešpondencia → Spustiť hromadnú korešpondenciu → Vybrať príjemcov → Použiť existujúci zoznam: vyber súbor Excel. Tlačidlom „Vložiť zlučovacie pole“ vložíš mená a adresy – jedným klikom aj 100 osobných listov.",
      en: "Mailings → Start Mail Merge → Select Recipients → Use an Existing List: pick the Excel file. Insert names and addresses with \"Insert Merge Field\" – 100 personalised letters in one click." } },
  { ikon: "🔗", cim: { hu: "Excel táblázat élő csatolással", sk: "Tabuľka z Excelu s prepojením", en: "Linked Excel table" },
    szoveg: {
      hu: "Másold ki a tartományt Excelben, Wordben: Irányított beillesztés (Ctrl+Alt+V) → Csatolás → Microsoft Excel munkalap objektum. Ha az Excelben változik, a Wordben is frissül.",
      sk: "Skopíruj rozsah v Exceli, vo Worde: Prilepiť špeciálne (Ctrl+Alt+V) → Prilepiť prepojenie → Objekt hárka Microsoft Excel. Keď sa zmení Excel, aktualizuje sa aj Word.",
      en: "Copy the range in Excel, then in Word: Paste Special (Ctrl+Alt+V) → Paste link → Microsoft Excel Worksheet Object. When the Excel file changes, Word updates too." } },
  { ikon: "🔄", cim: { hu: "Fekvő oldal a dokumentum közepén", sk: "Strana na šírku uprostred dokumentu", en: "One landscape page in the middle" },
    szoveg: {
      hu: "Tegyél szakasztörést (Elrendezés → Törések → Következő oldal) az oldal elé és mögé, majd csak ennél a szakasznál állítsd át a tájolást fekvőre.",
      sk: "Vlož zlom sekcie (Rozloženie → Zlomy → Nasledujúca strana) pred a za stranu a orientáciu na šírku nastav len pre túto sekciu.",
      en: "Insert a section break (Layout → Breaks → Next Page) before and after the page, then set landscape orientation for that section only." } },
  { ikon: "🔢", cim: { hu: "Oldalszám, első oldal nélkül", sk: "Číslovanie strán bez prvej strany", en: "Page numbers, skipping the first page" },
    szoveg: {
      hu: "Beszúrás → Oldalszám. Duplán kattints az élőfejbe/élőlábba, és pipáld be: „Első oldal eltérő” – így a címlapon nem lesz szám.",
      sk: "Vložiť → Číslo strany. Dvakrát klikni do hlavičky/päty a zaškrtni „Iná prvá strana“ – na titulnej strane nebude číslo.",
      en: "Insert → Page Number. Double-click the header/footer and tick \"Different First Page\" – the cover page won't get a number." } },
  { ikon: "🔒", cim: { hu: "Összetartozó szavak egy sorban", sk: "Spolupatriace slová v jednom riadku", en: "Keep words together on a line" },
    szoveg: {
      hu: "Nem törhető szóköz (Ctrl+Shift+Szóköz) a szám és a mértékegység közé (pl. 10 000 Ft, 5 kg), hogy ne kerüljenek külön sorba.",
      sk: "Nezlomiteľná medzera (Ctrl+Shift+Medzerník) medzi číslo a jednotku (napr. 10 000 €, 5 kg), aby sa nerozdelili na dva riadky.",
      en: "Use a non-breaking space (Ctrl+Shift+Space) between a number and its unit (e.g. 10 000 €, 5 kg) so they never split across lines." } },
  { ikon: "👀", cim: { hu: "Két dokumentum összehasonlítása", sk: "Porovnanie dvoch dokumentov", en: "Compare two documents" },
    szoveg: {
      hu: "Korrektúra → Összehasonlítás → Összehasonlítás: válaszd ki a régi és az új változatot – a Word megmutatja az összes különbséget.",
      sk: "Revízia → Porovnať → Porovnať: vyber pôvodnú a novú verziu – Word zobrazí všetky rozdiely.",
      en: "Review → Compare → Compare: pick the original and the revised version – Word shows every difference." } },
  { ikon: "⚡", cim: { hu: "Gyorsrészek – ismétlődő szövegek", sk: "Rýchle časti – opakované texty", en: "Quick Parts – reusable text" },
    szoveg: {
      hu: "Jelöld ki a gyakran használt szöveget (pl. aláírás, cégadatok) → Beszúrás → Gyorsrészek → Kijelölés mentése. Később egy kattintással beszúrhatod.",
      sk: "Označ často používaný text (napr. podpis, údaje firmy) → Vložiť → Rýchle časti → Uložiť výber. Neskôr ho vložíš jedným klikom.",
      en: "Select text you use often (e.g. signature, company details) → Insert → Quick Parts → Save Selection. Insert it later in one click." } },
  { ikon: "📄", cim: { hu: "Mentés PDF-be", sk: "Uloženie do PDF", en: "Save as PDF" },
    szoveg: {
      hu: "Fájl → Mentés másként → Fájltípus: PDF. A „Beállítások” alatt megadhatod, hogy csak néhány oldal kerüljön bele.",
      sk: "Súbor → Uložiť ako → Typ súboru: PDF. V „Možnostiach“ môžeš zvoliť len niektoré strany.",
      en: "File → Save As → File type: PDF. Under \"Options\" you can export only some pages." } },
];
