/*
  HASZNOS VBA MAKRÓK
  ==================
  A kódban a {1}, {2}… jelek helyére kerülnek a nyelvenkénti szövegek (s.hu / s.sk / s.en).
  A makrók nevei angolul vannak, mert a VBA-ban ez a megszokott, és így minden Excelben működnek.
*/

const MAKRO_UTMUTATO = {
  hu: [
    "Nyisd meg a munkafüzetet, és nyomd meg: Alt + F11 (megnyílik a VBA szerkesztő).",
    "Menü: Insert → Module (Beszúrás → Modul).",
    "Másold be a makró kódját a 📋 gombbal, majd Ctrl + V.",
    "Zárd be a VBA ablakot. Futtatás: Alt + F8 → válaszd ki a makrót → Futtatás.",
    "Mentsd a fájlt makróbarát formátumban: .xlsm (Mentés másként → Excel makróbarát munkafüzet).",
  ],
  sk: [
    "Otvor zošit a stlač Alt + F11 (otvorí sa editor VBA).",
    "Ponuka: Insert → Module (Vložiť → Modul).",
    "Skopíruj kód makra tlačidlom 📋 a vlož ho cez Ctrl + V.",
    "Zavri okno VBA. Spustenie: Alt + F8 → vyber makro → Spustiť.",
    "Ulož súbor vo formáte s podporou makier: .xlsm (Uložiť ako → Zošit Excelu s podporou makier).",
  ],
  en: [
    "Open the workbook and press Alt + F11 (the VBA editor opens).",
    "Menu: Insert → Module.",
    "Copy the macro code with the 📋 button and paste it with Ctrl + V.",
    "Close the VBA window. To run: Alt + F8 → pick the macro → Run.",
    "Save the file in macro-enabled format: .xlsm (Save As → Excel Macro-Enabled Workbook).",
  ],
};

const MAKRO_FIGYELMEZTETES = {
  hu: "⚠️ A makrók műveleteit a Ctrl + Z NEM vonja vissza! Fontos fájlon előbb készíts másolatot (vagy futtasd a „Biztonsági másolat” makrót).",
  sk: "⚠️ Akcie makier sa NEDAJÚ vrátiť cez Ctrl + Z! Pri dôležitom súbore si najprv urob kópiu (alebo spusti makro „Záložná kópia“).",
  en: "⚠️ Ctrl + Z can NOT undo what a macro does! On important files make a copy first (or run the \"Backup copy\" macro).",
};

const MAKROK = [
  {
    ikon: "💾", szin: "zold",
    cim: { hu: "Biztonsági másolat dátummal", sk: "Záložná kópia s dátumom", en: "Backup copy with date" },
    leiras: {
      hu: "Egy kattintással másolatot ment a munkafüzetről ugyanabba a mappába, a mai dátummal és időponttal a nevében. Futtasd, mielőtt nagyobb változtatásba kezdesz!",
      sk: "Jedným klikom uloží kópiu zošita do toho istého priečinka s dnešným dátumom a časom v názve. Spusti ho pred väčšími zmenami!",
      en: "Saves a copy of the workbook in the same folder with today's date and time in its name. Run it before making big changes!",
    },
    s: {
      hu: ["Előbb mentsd el a munkafüzetet!", "Másolat elmentve:"],
      sk: ["Najprv ulož zošit!", "Kópia uložená:"],
      en: ["Save the workbook first!", "Copy saved:"],
    },
    kod: `Sub BackupCopy()
    Dim fileName As String
    If ThisWorkbook.Path = "" Then
        MsgBox "{1}"
        Exit Sub
    End If
    fileName = ThisWorkbook.Path & Application.PathSeparator & _
               Format(Now, "yyyy-mm-dd_hh-nn") & "_" & ThisWorkbook.Name
    ThisWorkbook.SaveCopyAs fileName
    MsgBox "{2}" & vbCrLf & fileName
End Sub`,
  },
  {
    ikon: "📑", szin: "kek",
    cim: { hu: "Tartalomjegyzék kattintható linkekkel", sk: "Obsah s klikateľnými odkazmi", en: "Table of contents with links" },
    leiras: {
      hu: "Új lapot készít a munkafüzet elejére, amin az összes munkalap neve szerepel kattintható hivatkozásként. Sok lapnál nagyon hasznos.",
      sk: "Vytvorí na začiatku zošita nový hárok so zoznamom všetkých hárkov ako klikateľných odkazov. Veľmi užitočné pri veľa hárkoch.",
      en: "Adds a new sheet at the front listing every sheet as a clickable link. Very handy with many sheets.",
    },
    s: { hu: ["Tartalom"], sk: ["Obsah"], en: ["Contents"] },
    kod: `Sub CreateTableOfContents()
    Const TOC_NAME As String = "{1}"
    Dim ws As Worksheet, toc As Worksheet, r As Long
    Application.DisplayAlerts = False
    On Error Resume Next
    Worksheets(TOC_NAME).Delete
    On Error GoTo 0
    Application.DisplayAlerts = True

    Set toc = Worksheets.Add(Before:=Worksheets(1))
    toc.Name = TOC_NAME
    toc.Range("A1").Value = TOC_NAME
    toc.Range("A1").Font.Bold = True
    r = 3
    For Each ws In Worksheets
        If ws.Name <> TOC_NAME Then
            toc.Hyperlinks.Add Anchor:=toc.Cells(r, 1), Address:="", _
                SubAddress:="'" & ws.Name & "'!A1", TextToDisplay:=ws.Name
            r = r + 1
        End If
    Next ws
    toc.Columns(1).AutoFit
End Sub`,
  },
  {
    ikon: "📄", szin: "narancs",
    cim: { hu: "Minden lap külön PDF-be", sk: "Každý hárok do samostatného PDF", en: "Every sheet to its own PDF" },
    leiras: {
      hu: "A munkafüzet minden látható munkalapját külön PDF fájlba menti, a munkafüzet mappájába, a lap nevével.",
      sk: "Každý viditeľný hárok uloží do samostatného PDF v priečinku zošita, s názvom hárka.",
      en: "Saves every visible sheet as a separate PDF in the workbook's folder, named after the sheet.",
    },
    s: {
      hu: ["Előbb mentsd el a munkafüzetet!", "PDF fájlok elmentve ide:"],
      sk: ["Najprv ulož zošit!", "PDF súbory uložené do:"],
      en: ["Save the workbook first!", "PDF files saved to:"],
    },
    kod: `Sub ExportSheetsToPdf()
    Dim ws As Worksheet, folder As String
    If ThisWorkbook.Path = "" Then
        MsgBox "{1}"
        Exit Sub
    End If
    folder = ThisWorkbook.Path & Application.PathSeparator
    For Each ws In ThisWorkbook.Worksheets
        If ws.Visible = xlSheetVisible Then
            ws.ExportAsFixedFormat Type:=xlTypePDF, Filename:=folder & ws.Name & ".pdf"
        End If
    Next ws
    MsgBox "{2}" & vbCrLf & folder
End Sub`,
  },
  {
    ikon: "🗂️", szin: "lila",
    cim: { hu: "Minden lap külön Excel fájlba", sk: "Každý hárok do samostatného súboru", en: "Every sheet to its own workbook" },
    leiras: {
      hu: "Minden munkalapot külön .xlsx fájlba ment (a lap nevével), a munkafüzet mappájába. Az azonos nevű régi fájlokat felülírja!",
      sk: "Každý hárok uloží do samostatného súboru .xlsx (s názvom hárka) do priečinka zošita. Staré súbory s rovnakým názvom prepíše!",
      en: "Saves every sheet as a separate .xlsx file (named after the sheet) in the workbook's folder. Overwrites old files with the same name!",
    },
    s: {
      hu: ["Előbb mentsd el a munkafüzetet!", "Kész! A fájlok helye:"],
      sk: ["Najprv ulož zošit!", "Hotovo! Súbory sú v:"],
      en: ["Save the workbook first!", "Done! Files saved to:"],
    },
    kod: `Sub SplitSheetsToFiles()
    Dim ws As Worksheet, folder As String
    If ThisWorkbook.Path = "" Then
        MsgBox "{1}"
        Exit Sub
    End If
    folder = ThisWorkbook.Path & Application.PathSeparator
    Application.ScreenUpdating = False
    Application.DisplayAlerts = False
    For Each ws In ThisWorkbook.Worksheets
        ws.Copy
        ActiveWorkbook.SaveAs Filename:=folder & ws.Name & ".xlsx", FileFormat:=xlOpenXMLWorkbook
        ActiveWorkbook.Close SaveChanges:=False
    Next ws
    Application.DisplayAlerts = True
    Application.ScreenUpdating = True
    MsgBox "{2}" & vbCrLf & folder
End Sub`,
  },
  {
    ikon: "🧲", szin: "kek",
    cim: { hu: "Lapok összefűzése egy lapra", sk: "Spojenie hárkov do jedného", en: "Combine sheets into one" },
    leiras: {
      hu: "Az összes munkalap adatait egymás alá másolja egy új lapra. A fejlécet csak az első lapról veszi át – akkor jó, ha minden lapon ugyanazok az oszlopok vannak (pl. havi kimutatások).",
      sk: "Skopíruje údaje zo všetkých hárkov pod seba na nový hárok. Hlavičku vezme iba z prvého – vhodné, ak majú všetky hárky rovnaké stĺpce (napr. mesačné výkazy).",
      en: "Copies the data of all sheets below each other onto a new sheet. The header is taken from the first sheet only – best when all sheets have the same columns (e.g. monthly reports).",
    },
    s: { hu: ["Összesítő"], sk: ["Súhrn"], en: ["Combined"] },
    kod: `Sub CombineSheets()
    Const TARGET_NAME As String = "{1}"
    Dim ws As Worksheet, target As Worksheet, data As Range, nextRow As Long
    Application.DisplayAlerts = False
    On Error Resume Next
    Worksheets(TARGET_NAME).Delete
    On Error GoTo 0
    Application.DisplayAlerts = True

    Set target = Worksheets.Add(After:=Worksheets(Worksheets.Count))
    target.Name = TARGET_NAME
    nextRow = 1
    For Each ws In Worksheets
        If ws.Name <> TARGET_NAME Then
            Set data = ws.UsedRange
            If nextRow > 1 Then
                If data.Rows.Count > 1 Then
                    Set data = data.Offset(1).Resize(data.Rows.Count - 1)
                Else
                    Set data = Nothing
                End If
            End If
            If Not data Is Nothing Then
                data.Copy target.Cells(nextRow, 1)
                nextRow = nextRow + data.Rows.Count
            End If
        End If
    Next ws
    target.Columns.AutoFit
End Sub`,
  },
  {
    ikon: "🔢", szin: "zold",
    cim: { hu: "Képletek értékké alakítása", sk: "Vzorce na hodnoty", en: "Convert formulas to values" },
    leiras: {
      hu: "A kijelölt cellákban a képleteket a kiszámolt értékükre cseréli (mint a „Beillesztés értékként”). Jó, ha továbbküldenéd a táblát képletek nélkül.",
      sk: "Vo vybraných bunkách nahradí vzorce ich vypočítanými hodnotami (ako „Prilepiť hodnoty“). Vhodné, ak chceš tabuľku poslať ďalej bez vzorcov.",
      en: "Replaces formulas in the selected cells with their calculated values (like \"Paste values\"). Good before sending a table on without formulas.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub FormulasToValues()
    Dim area As Range
    For Each area In Selection.Areas
        area.Value = area.Value
    Next area
End Sub`,
  },
  {
    ikon: "✂️", szin: "narancs",
    cim: { hu: "Felesleges szóközök eltávolítása", sk: "Odstránenie nadbytočných medzier", en: "Remove extra spaces" },
    leiras: {
      hu: "A kijelölt cellák szövegéből kitörli az elején/végén lévő és a dupla szóközöket, a „nem törhető” szóközöket is. Gyakran ettől kezd működni egy makacs FKERES!",
      sk: "Z textu vybraných buniek odstráni medzery na začiatku/konci a dvojité medzery, aj nezlomiteľné medzery. Často vďaka tomu začne fungovať tvrdohlavý VLOOKUP!",
      en: "Removes leading/trailing and double spaces – including non-breaking spaces – from the selected cells. Often this is what makes a stubborn VLOOKUP work!",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub CleanSpaces()
    Dim c As Range, rng As Range
    Set rng = Intersect(Selection, ActiveSheet.UsedRange)
    If rng Is Nothing Then Exit Sub
    For Each c In rng.Cells
        If Not c.HasFormula And VarType(c.Value) = vbString Then
            c.Value = Application.WorksheetFunction.Trim(Replace(c.Value, Chr(160), " "))
        End If
    Next c
End Sub`,
  },
  {
    ikon: "🧹", szin: "lila",
    cim: { hu: "Üres sorok törlése", sk: "Odstránenie prázdnych riadkov", en: "Delete empty rows" },
    leiras: {
      hu: "Az aktív munkalapról kitöröl minden teljesen üres sort. Alulról felfelé halad, így egy sort sem hagy ki.",
      sk: "Z aktívneho hárka odstráni všetky úplne prázdne riadky. Postupuje zdola nahor, takže žiadny nevynechá.",
      en: "Deletes every completely empty row on the active sheet. It works bottom-up so no row is skipped.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub DeleteEmptyRows()
    Dim ws As Worksheet, i As Long, firstRow As Long, lastRow As Long
    Set ws = ActiveSheet
    firstRow = ws.UsedRange.Row
    lastRow = firstRow + ws.UsedRange.Rows.Count - 1
    Application.ScreenUpdating = False
    For i = lastRow To firstRow Step -1
        If Application.WorksheetFunction.CountA(ws.Rows(i)) = 0 Then ws.Rows(i).Delete
    Next i
    Application.ScreenUpdating = True
End Sub`,
  },
  {
    ikon: "🎯", szin: "narancs",
    cim: { hu: "Ismétlődések kiemelése", sk: "Zvýraznenie duplicít", en: "Highlight duplicates" },
    leiras: {
      hu: "A kijelölt területen sárgával kiemeli azokat az értékeket, amelyek többször is előfordulnak. Nem töröl semmit, csak megmutatja őket.",
      sk: "Vo vybranej oblasti žltou zvýrazní hodnoty, ktoré sa vyskytujú viackrát. Nič nemaže, len ich ukáže.",
      en: "Highlights in yellow every value that appears more than once in the selection. Deletes nothing, just shows them.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub HighlightDuplicates()
    Dim c As Range, rng As Range
    Set rng = Intersect(Selection, ActiveSheet.UsedRange)
    If rng Is Nothing Then Exit Sub
    For Each c In rng.Cells
        If Not IsError(c.Value) Then
            If c.Value <> "" Then
                If Application.WorksheetFunction.CountIf(rng, c.Value) > 1 Then
                    c.Interior.Color = RGB(255, 235, 156)
                End If
            End If
        End If
    Next c
End Sub`,
  },
  {
    ikon: "🚨", szin: "kek",
    cim: { hu: "Hibás képletek megkeresése", sk: "Nájdenie chybných vzorcov", en: "Find formula errors" },
    leiras: {
      hu: "Megkeresi az aktív lapon az összes hibát adó képletet (#HIÁNYZIK, #ZÉRÓOSZTÓ! …), pirossal kiemeli és kijelöli őket.",
      sk: "Nájde na aktívnom hárku všetky vzorce s chybou (#N/A, #DIV/0! …), zvýrazní ich červenou a označí.",
      en: "Finds every formula returning an error (#N/A, #DIV/0! …) on the active sheet, highlights them in red and selects them.",
    },
    s: {
      hu: ["Nincs hibás képlet ezen a lapon.", "hibás cella kiemelve."],
      sk: ["Na tomto hárku nie je žiadny chybný vzorec.", "chybných buniek zvýraznených."],
      en: ["No formula errors on this sheet.", "error cells highlighted."],
    },
    kod: `Sub FindFormulaErrors()
    Dim errs As Range
    On Error Resume Next
    Set errs = ActiveSheet.UsedRange.SpecialCells(xlCellTypeFormulas, xlErrors)
    On Error GoTo 0
    If errs Is Nothing Then
        MsgBox "{1}"
    Else
        errs.Interior.Color = RGB(255, 199, 206)
        errs.Select
        MsgBox errs.Count & " {2}"
    End If
End Sub`,
  },
  {
    ikon: "🔤", szin: "zold",
    cim: { hu: "Munkalapok ábécé sorrendbe", sk: "Zoradenie hárkov podľa abecedy", en: "Sort sheets alphabetically" },
    leiras: {
      hu: "A munkalap-füleket név szerint ábécé sorrendbe rendezi.",
      sk: "Zoradí karty hárkov podľa názvu v abecednom poradí.",
      en: "Sorts the sheet tabs alphabetically by name.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub SortSheets()
    Dim i As Long, j As Long, n As Long
    n = Worksheets.Count
    Application.ScreenUpdating = False
    For i = 1 To n - 1
        For j = i + 1 To n
            If UCase(Worksheets(j).Name) < UCase(Worksheets(i).Name) Then
                Worksheets(j).Move Before:=Worksheets(i)
            End If
        Next j
    Next i
    Application.ScreenUpdating = True
End Sub`,
  },
  {
    ikon: "👁️", szin: "lila",
    cim: { hu: "Minden rejtett lap felfedése", sk: "Zobrazenie všetkých skrytých hárkov", en: "Unhide all sheets" },
    leiras: {
      hu: "Egyszerre felfedi az összes elrejtett munkalapot – az Excel alapból csak egyesével engedi.",
      sk: "Naraz zobrazí všetky skryté hárky – Excel to inak dovolí len po jednom.",
      en: "Unhides every hidden sheet at once – Excel normally only lets you do it one by one.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub UnhideAllSheets()
    Dim ws As Worksheet
    For Each ws In ActiveWorkbook.Worksheets
        ws.Visible = xlSheetVisible
    Next ws
End Sub`,
  },
  {
    ikon: "↔️", szin: "narancs",
    cim: { hu: "Oszlopszélesség igazítása mindenhol", sk: "Prispôsobenie šírky stĺpcov všade", en: "AutoFit columns everywhere" },
    leiras: {
      hu: "Minden munkalapon a tartalomhoz igazítja az oszlopok szélességét – nincs több ##### a cellákban.",
      sk: "Na všetkých hárkoch prispôsobí šírku stĺpcov obsahu – žiadne ##### v bunkách.",
      en: "Fits column widths to their content on every sheet – no more ##### in cells.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub AutoFitAllSheets()
    Dim ws As Worksheet
    For Each ws In ActiveWorkbook.Worksheets
        ws.UsedRange.Columns.AutoFit
    Next ws
End Sub`,
  },
  {
    ikon: "🕒", szin: "kek",
    cim: { hu: "Dátum és idő beírása", sk: "Vloženie dátumu a času", en: "Insert date and time" },
    leiras: {
      hu: "A kijelölt cellába beírja a mostani dátumot és időt (ami később már nem változik). Tipp: Alt + F8 → Beállítások, és adj neki gyorsbillentyűt, pl. Ctrl + Shift + T.",
      sk: "Do vybranej bunky zapíše aktuálny dátum a čas (ktorý sa už nezmení). Tip: Alt + F8 → Možnosti a priraď mu skratku, napr. Ctrl + Shift + T.",
      en: "Writes the current date and time into the active cell (it won't change later). Tip: Alt + F8 → Options to give it a shortcut, e.g. Ctrl + Shift + T.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub InsertTimestamp()
    With ActiveCell
        .Value = Now
        .NumberFormat = "yyyy.mm.dd hh:mm"
    End With
End Sub`,
  },
  {
    ikon: "🔒", szin: "lila",
    cim: { hu: "Minden lap védelme / feloldása", sk: "Zamknutie / odomknutie všetkých hárkov", en: "Protect / unprotect all sheets" },
    leiras: {
      hu: "Két makró: az első egy jelszóval levédi az összes munkalapot, a második feloldja őket. Hasznos, ha sok lapot kell egyszerre védeni.",
      sk: "Dve makrá: prvé zamkne všetky hárky heslom, druhé ich odomkne. Užitočné, ak treba chrániť veľa hárkov naraz.",
      en: "Two macros: the first protects every sheet with a password, the second unprotects them. Handy when many sheets need protecting at once.",
    },
    s: {
      hu: ["Add meg a jelszót:", "Nem sikerült feloldani (rossz jelszó?):"],
      sk: ["Zadaj heslo:", "Nepodarilo sa odomknúť (nesprávne heslo?):"],
      en: ["Enter the password:", "Could not unprotect (wrong password?):"],
    },
    kod: `Sub ProtectAllSheets()
    Dim ws As Worksheet, pwd As String
    pwd = InputBox("{1}")
    If pwd = "" Then Exit Sub
    For Each ws In ActiveWorkbook.Worksheets
        ws.Protect Password:=pwd
    Next ws
End Sub

Sub UnprotectAllSheets()
    Dim ws As Worksheet, pwd As String, failed As String
    pwd = InputBox("{1}")
    If pwd = "" Then Exit Sub
    For Each ws In ActiveWorkbook.Worksheets
        On Error Resume Next
        ws.Unprotect Password:=pwd
        If Err.Number <> 0 Then failed = failed & vbCrLf & ws.Name
        On Error GoTo 0
    Next ws
    If failed <> "" Then MsgBox "{2}" & failed
End Sub`,
  },
];
