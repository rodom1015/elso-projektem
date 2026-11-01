/*
  MAKRÓ BŐVÍTÉS – 10 új Excel és 6 új Word makró
  A segédfüggvények neve egyedi (pl. SplitSafeName), hogy több makró is mehessen egy modulba.
*/

MAKROK.push(
  {
    ikon: "🗃️", szin: "zold",
    cim: { hu: "Lap szétbontása fájlokra egy oszlop alapján", sk: "Rozdelenie hárka do súborov podľa stĺpca", en: "Split a sheet into files by a column" },
    leiras: {
      hu: "Pl. a Város oszlop minden értékéhez külön Excel fájlt készít, csak az ahhoz tartozó sorokkal (fejléccel együtt). A táblázat az A1 cellától induljon; a fájlok a munkafüzet melletti mappába kerülnek.",
      sk: "Napr. pre každú hodnotu stĺpca Mesto vytvorí samostatný súbor Excel iba s jej riadkami (aj s hlavičkou). Tabuľka má začínať v bunke A1; súbory pôjdu do priečinka vedľa zošita.",
      en: "E.g. creates a separate Excel file for each value of the City column, holding only its rows (with the header). The table must start at A1; files go to a folder next to the workbook.",
    },
    s: {
      hu: ["Melyik oszlop szerint bontsam? (betűjel, pl. C)", "Előbb mentsd el a munkafüzetet!", "Szetbontva", "fájl elkészült."],
      sk: ["Podľa ktorého stĺpca rozdeliť? (písmeno, napr. C)", "Najprv ulož zošit!", "Rozdelene", "súborov hotových."],
      en: ["Split by which column? (letter, e.g. C)", "Save the workbook first!", "Split", "files created."],
    },
    kod: `Sub SplitByColumnToFiles()
    Dim ws As Worksheet, col As String, keys As Object, r As Long, lastRow As Long
    Dim k As Variant, wb As Workbook, folder As String, rng As Range
    Set ws = ActiveSheet
    If ws.Parent.Path = "" Then MsgBox "{2}": Exit Sub
    col = InputBox("{1}", , "A")
    If col = "" Then Exit Sub
    folder = ws.Parent.Path & "\\{3}\\"
    If Dir(folder, vbDirectory) = "" Then MkDir folder
    Set keys = CreateObject("Scripting.Dictionary")
    lastRow = ws.Cells(ws.Rows.Count, col).End(xlUp).Row
    For r = 2 To lastRow
        If Len(ws.Cells(r, col).Text) > 0 Then keys(CStr(ws.Cells(r, col).Text)) = 1
    Next r
    Application.ScreenUpdating = False
    ws.AutoFilterMode = False
    Set rng = ws.Range("A1").CurrentRegion
    For Each k In keys.Keys
        rng.AutoFilter Field:=ws.Columns(col).Column - rng.Column + 1, Criteria1:=k
        Set wb = Workbooks.Add(xlWBATWorksheet)
        rng.SpecialCells(xlCellTypeVisible).Copy wb.Worksheets(1).Range("A1")
        wb.Worksheets(1).Columns.AutoFit
        Application.DisplayAlerts = False
        wb.SaveAs folder & SplitSafeName(CStr(k)) & ".xlsx", xlOpenXMLWorkbook
        Application.DisplayAlerts = True
        wb.Close False
    Next k
    ws.AutoFilterMode = False
    Application.ScreenUpdating = True
    MsgBox keys.Count & " {4}" & vbLf & folder
End Sub

Function SplitSafeName(s As String) As String
    Dim ch As Variant
    For Each ch In Array("\\", "/", ":", "*", "?", """", "<", ">", "|")
        s = Replace(s, ch, "_")
    Next ch
    SplitSafeName = Left(Trim(s), 100)
End Function`,
  },
  {
    ikon: "📑", szin: "kek",
    cim: { hu: "Munkalapok létrehozása egy listából", sk: "Vytvorenie hárkov zo zoznamu", en: "Create sheets from a list" },
    leiras: {
      hu: "Jelölj ki egy listát (pl. hónapok vagy kollégák nevei), és mindegyikből új munkalap lesz. A már létező nevűeket kihagyja.",
      sk: "Označ zoznam (napr. mesiace alebo mená kolegov) a z každej položky bude nový hárok. Existujúce názvy preskočí.",
      en: "Select a list (e.g. months or colleagues' names) and each item becomes a new sheet. Names that already exist are skipped.",
    },
    s: { hu: ["új munkalap készült."], sk: ["nových hárkov vytvorených."], en: ["new sheets created."] },
    kod: `Sub SheetsFromList()
    Dim src As Range, c As Range, ws As Worksheet, nm As String, n As Long
    Set src = Selection
    For Each c In src.Cells
        nm = Left(Trim(c.Text), 31)
        If Len(nm) > 0 Then
            Set ws = Nothing
            On Error Resume Next
            Set ws = ActiveWorkbook.Worksheets(nm)
            On Error GoTo 0
            If ws Is Nothing Then
                Set ws = ActiveWorkbook.Worksheets.Add(After:=ActiveWorkbook.Worksheets(ActiveWorkbook.Worksheets.Count))
                On Error Resume Next
                ws.Name = nm
                On Error GoTo 0
                n = n + 1
            End If
        End If
    Next c
    src.Parent.Activate
    MsgBox n & " {1}"
End Sub`,
  },
  {
    ikon: "📥", szin: "narancs",
    cim: { hu: "Mappa összes munkafüzetének behúzása", sk: "Načítanie všetkých zošitov z priečinka", en: "Pull in every workbook from a folder" },
    leiras: {
      hu: "Kiválasztasz egy mappát, és minden Excel fájl első lapja átmásolódik ebbe a munkafüzetbe, a fájl nevével elnevezve. Nem kell egyenként megnyitni őket.",
      sk: "Vyberieš priečinok a prvý hárok každého súboru Excel sa skopíruje do tohto zošita, pomenovaný podľa súboru. Netreba ich otvárať po jednom.",
      en: "Pick a folder and the first sheet of every Excel file is copied into this workbook, named after the file. No need to open them one by one.",
    },
    s: { hu: ["Válaszd ki a mappát", "munkalap átmásolva."], sk: ["Vyber priečinok", "hárkov skopírovaných."], en: ["Choose the folder", "sheets copied."] },
    kod: `Sub MergeWorkbooksInFolder()
    Dim folder As String, f As String, src As Workbook, dest As Workbook, n As Long
    With Application.FileDialog(msoFileDialogFolderPicker)
        .Title = "{1}"
        If .Show <> -1 Then Exit Sub
        folder = .SelectedItems(1) & "\\"
    End With
    Set dest = ActiveWorkbook
    Application.ScreenUpdating = False
    Application.DisplayAlerts = False
    f = Dir(folder & "*.xls*")
    Do While f <> ""
        If f <> dest.Name And Left(f, 2) <> "~$" Then
            Set src = Workbooks.Open(folder & f, ReadOnly:=True, UpdateLinks:=False)
            src.Worksheets(1).Copy After:=dest.Worksheets(dest.Worksheets.Count)
            On Error Resume Next
            dest.Worksheets(dest.Worksheets.Count).Name = Left(Left(f, InStrRev(f, ".") - 1), 31)
            On Error GoTo 0
            src.Close False
            n = n + 1
        End If
        f = Dir()
    Loop
    Application.DisplayAlerts = True
    Application.ScreenUpdating = True
    MsgBox n & " {2}"
End Sub`,
  },
  {
    ikon: "📕", szin: "lila",
    cim: { hu: "Az egész munkafüzet egyetlen PDF-be", sk: "Celý zošit do jedného PDF", en: "The whole workbook as one PDF" },
    leiras: {
      hu: "Az összes (látható) munkalapot egy PDF fájlba menti a munkafüzet mellé, ugyanazzal a névvel, és meg is nyitja. A nyomtatási beállításokat (tájolás, oldalra igazítás) figyelembe veszi.",
      sk: "Všetky (viditeľné) hárky uloží do jedného PDF vedľa zošita s rovnakým názvom a otvorí ho. Rešpektuje nastavenia tlače (orientácia, prispôsobenie strane).",
      en: "Saves every (visible) sheet into one PDF next to the workbook with the same name and opens it. Page setup (orientation, fit to page) is respected.",
    },
    s: { hu: ["Előbb mentsd el a munkafüzetet!"], sk: ["Najprv ulož zošit!"], en: ["Save the workbook first!"] },
    kod: `Sub AllSheetsToOnePdf()
    Dim wb As Workbook, pdfPath As String
    Set wb = ActiveWorkbook
    If wb.Path = "" Then MsgBox "{1}": Exit Sub
    pdfPath = wb.Path & "\\" & Left(wb.Name, InStrRev(wb.Name, ".") - 1) & ".pdf"
    wb.ExportAsFixedFormat Type:=xlTypePDF, Filename:=pdfPath, _
        Quality:=xlQualityStandard, IgnorePrintAreas:=False, OpenAfterPublish:=True
End Sub`,
  },
  {
    ikon: "📝", szin: "kek",
    cim: { hu: "Változásnapló: ki, mikor, mit írt át", sk: "Denník zmien: kto, kedy, čo zmenil", en: "Change log: who changed what and when" },
    leiras: {
      hu: "Minden cellamódosítást felír egy Naplo lapra (idő, felhasználó, lap, cella, új érték). NEM modulba kell tenni: a VBA szerkesztőben dupla katt a „ThisWorkbook”-ra (Ez_a_munkafüzet), és oda illeszd be.",
      sk: "Každú zmenu bunky zapíše na hárok Naplo (čas, používateľ, hárok, bunka, nová hodnota). NEVKLADAJ do modulu: v editore VBA dvojklik na „ThisWorkbook“ a vlož to tam.",
      en: "Logs every cell change to a Naplo sheet (time, user, sheet, cell, new value). Do NOT put it in a module: in the VBA editor double-click \"ThisWorkbook\" and paste it there.",
    },
    s: {
      hu: ["Időpont", "Felhasználó", "Munkalap", "Cella", "Új érték"],
      sk: ["Čas", "Používateľ", "Hárok", "Bunka", "Nová hodnota"],
      en: ["Time", "User", "Sheet", "Cell", "New value"],
    },
    kod: `Private Sub Workbook_SheetChange(ByVal Sh As Object, ByVal Target As Range)
    Dim logWs As Worksheet, r As Long
    If Sh.Name = "Naplo" Then Exit Sub
    On Error Resume Next
    Set logWs = Me.Worksheets("Naplo")
    On Error GoTo 0
    Application.EnableEvents = False
    If logWs Is Nothing Then
        Set logWs = Me.Worksheets.Add(After:=Me.Worksheets(Me.Worksheets.Count))
        logWs.Name = "Naplo"
        logWs.Range("A1:E1").Value = Array("{1}", "{2}", "{3}", "{4}", "{5}")
        logWs.Rows(1).Font.Bold = True
        Sh.Activate
    End If
    r = logWs.Cells(logWs.Rows.Count, 1).End(xlUp).Row + 1
    logWs.Cells(r, 1).Value = Now
    logWs.Cells(r, 2).Value = Environ("USERNAME")
    logWs.Cells(r, 3).Value = Sh.Name
    logWs.Cells(r, 4).Value = Target.Address(False, False)
    If Target.CountLarge = 1 Then logWs.Cells(r, 5).Value = "'" & CStr(Target.Formula)
    Application.EnableEvents = True
End Sub`,
  },
  {
    ikon: "🧽", szin: "zold",
    cim: { hu: "Üres oszlopok törlése", sk: "Odstránenie prázdnych stĺpcov", en: "Delete empty columns" },
    leiras: {
      hu: "Az aktív lapon törli azokat az oszlopokat, amelyekben egyetlen adat sincs – exportok után jól jön.",
      sk: "Na aktívnom hárku odstráni stĺpce, v ktorých nie je ani jeden údaj – hodí sa po exportoch.",
      en: "Deletes the columns on the active sheet that contain no data at all – handy after exports.",
    },
    s: { hu: ["üres oszlop törölve."], sk: ["prázdnych stĺpcov odstránených."], en: ["empty columns deleted."] },
    kod: `Sub DeleteEmptyColumns()
    Dim ws As Worksheet, c As Long, lastCol As Long, n As Long
    Set ws = ActiveSheet
    If Application.WorksheetFunction.CountA(ws.Cells) = 0 Then Exit Sub
    lastCol = ws.Cells.Find("*", SearchOrder:=xlByColumns, SearchDirection:=xlPrevious).Column
    Application.ScreenUpdating = False
    For c = lastCol To 1 Step -1
        If Application.WorksheetFunction.CountA(ws.Columns(c)) = 0 Then
            ws.Columns(c).Delete
            n = n + 1
        End If
    Next c
    Application.ScreenUpdating = True
    MsgBox n & " {1}"
End Sub`,
  },
  {
    ikon: "🔎", szin: "narancs",
    cim: { hu: "Szűrt sorok másolása új lapra", sk: "Kopírovanie filtrovaných riadkov na nový hárok", en: "Copy filtered rows to a new sheet" },
    leiras: {
      hu: "Szűrd meg a táblát (Adatok → Szűrő vagy Ctrl + T-s táblázat), majd futtasd: csak a látható sorok kerülnek egy új lapra, fejléccel együtt.",
      sk: "Vyfiltruj tabuľku (Údaje → Filter alebo tabuľka cez Ctrl + T) a spusti: na nový hárok pôjdu iba viditeľné riadky aj s hlavičkou.",
      en: "Filter the table (Data → Filter or a Ctrl + T table), then run it: only the visible rows go to a new sheet, with the header.",
    },
    s: { hu: ["Nincs szűrő ezen a lapon (vagy kattints a táblázatba).", "Szurt"], sk: ["Na tomto hárku nie je filter (alebo klikni do tabuľky).", "Filter"], en: ["No filter on this sheet (or click inside the table).", "Filtered"] },
    kod: `Sub CopyFilteredRows()
    Dim src As Worksheet, dest As Worksheet, rng As Range
    Set src = ActiveSheet
    If src.AutoFilterMode Then
        Set rng = src.AutoFilter.Range
    ElseIf Not ActiveCell.ListObject Is Nothing Then
        Set rng = ActiveCell.ListObject.Range
    Else
        MsgBox "{1}": Exit Sub
    End If
    Set dest = ActiveWorkbook.Worksheets.Add(After:=ActiveWorkbook.Worksheets(ActiveWorkbook.Worksheets.Count))
    rng.SpecialCells(xlCellTypeVisible).Copy dest.Range("A1")
    dest.Columns.AutoFit
    On Error Resume Next
    dest.Name = Left("{2} " & Format(Now, "mmdd-hhnn"), 31)
End Sub`,
  },
  {
    ikon: "🔢", szin: "lila",
    cim: { hu: "Következő sorszám (ajánlat, számla) beírása", sk: "Ďalšie poradové číslo (ponuka, faktúra)", en: "Next document number (quote, invoice)" },
    leiras: {
      hu: "Az aktív cellába beírja a következő sorszámot, pl. AJ-2026-0007. A számlálót a munkafüzet rejtett névként tárolja, így mentés után is folytatódik. Tegyél rá gombot (Fejlesztőeszközök → Beszúrás → Gomb).",
      sk: "Do aktívnej bunky zapíše ďalšie číslo, napr. CP-2026-0007. Počítadlo sa ukladá v zošite ako skrytý názov, takže pokračuje aj po uložení. Priraď ho k tlačidlu (Vývojár → Vložiť → Tlačidlo).",
      en: "Writes the next number into the active cell, e.g. Q-2026-0007. The counter is stored in the workbook as a hidden name, so it continues after saving. Put it on a button (Developer → Insert → Button).",
    },
    s: { hu: ["AJ-"], sk: ["CP-"], en: ["Q-"] },
    kod: `Sub NextDocumentNumber()
    Dim n As Long
    On Error Resume Next
    n = Evaluate(ActiveWorkbook.Names("rodom_counter").RefersTo)
    On Error GoTo 0
    n = n + 1
    ActiveWorkbook.Names.Add Name:="rodom_counter", RefersTo:="=" & n, Visible:=False
    ActiveCell.Value = "{1}" & Year(Date) & "-" & Format(n, "0000")
End Sub`,
  },
  {
    ikon: "🖼️", szin: "kek",
    cim: { hu: "Összes diagram mentése képként (PNG)", sk: "Uloženie všetkých grafov ako obrázky (PNG)", en: "Save every chart as an image (PNG)" },
    leiras: {
      hu: "A munkafüzet összes diagramját PNG képként menti egy mappába – egyből mehet PowerPointba, e-mailbe vagy Wordbe.",
      sk: "Všetky grafy zošita uloží ako obrázky PNG do priečinka – hneď do PowerPointu, e-mailu alebo Wordu.",
      en: "Saves every chart in the workbook as a PNG image into a folder – ready for PowerPoint, email or Word.",
    },
    s: { hu: ["Előbb mentsd el a munkafüzetet!", "Diagramok", "diagram elmentve."], sk: ["Najprv ulož zošit!", "Grafy", "grafov uložených."], en: ["Save the workbook first!", "Charts", "charts saved."] },
    kod: `Sub ExportChartsToPng()
    Dim ws As Worksheet, co As ChartObject, folder As String, n As Long
    If ActiveWorkbook.Path = "" Then MsgBox "{1}": Exit Sub
    folder = ActiveWorkbook.Path & "\\{2}\\"
    If Dir(folder, vbDirectory) = "" Then MkDir folder
    For Each ws In ActiveWorkbook.Worksheets
        For Each co In ws.ChartObjects
            n = n + 1
            co.Chart.Export folder & ws.Name & "_" & n & ".png", "PNG"
        Next co
    Next ws
    MsgBox n & " {3}" & vbLf & folder
End Sub`,
  },
  {
    ikon: "🔠", szin: "zold",
    cim: { hu: "Kis- és nagybetűk átalakítása", sk: "Zmena veľkých a malých písmen", en: "Change text case" },
    leiras: {
      hu: "A kijelölt cellák szövegét NAGYBETŰSSÉ, kisbetűssé vagy Tulajdonnév Formára alakítja – képlet nélkül, helyben. A képleteket nem bántja.",
      sk: "Text označených buniek zmení na VEĽKÉ, malé alebo Prvé Písmeno Veľké – bez vzorca, priamo v bunkách. Vzorce nechá tak.",
      en: "Turns the text of the selected cells into UPPER, lower or Proper Case – in place, no helper formula. Formulas are left alone.",
    },
    s: {
      hu: ["1 = NAGYBETŰ   2 = kisbetű   3 = Tulajdonnév"],
      sk: ["1 = VEĽKÉ   2 = malé   3 = Prvé Veľké"],
      en: ["1 = UPPER   2 = lower   3 = Proper"],
    },
    kod: `Sub ChangeTextCase()
    Dim c As Range, mode As String
    mode = InputBox("{1}", , "1")
    If mode = "" Then Exit Sub
    For Each c In Selection.Cells
        If Not c.HasFormula And VarType(c.Value) = vbString Then
            Select Case mode
                Case "1": c.Value = UCase(c.Value)
                Case "2": c.Value = LCase(c.Value)
                Case "3": c.Value = Application.WorksheetFunction.Proper(c.Value)
            End Select
        End If
    Next c
End Sub`,
  }
);

WORD_MAKROK.push(
  {
    ikon: "📨", szin: "kek",
    cim: { hu: "Körlevél: minden címzett külön PDF-be", sk: "Hromadná korešpondencia: každý adresát do samostatného PDF", en: "Mail merge: one PDF per recipient" },
    leiras: {
      hu: "Kész körlevél-dokumentumnál (Levelezés fül, összekapcsolt adatforrással) minden rekordból külön PDF-et készít egy PDF mappába, a választott mező (pl. Név) alapján elnevezve.",
      sk: "Pri hotovom dokumente hromadnej korešpondencie (karta Korešpondencia, s pripojeným zdrojom údajov) vytvorí z každého záznamu samostatné PDF do priečinka PDF, pomenované podľa zvoleného poľa (napr. Meno).",
      en: "For a finished mail merge document (Mailings tab, data source connected) creates a separate PDF for every record in a PDF folder, named after the field you choose (e.g. Name).",
    },
    s: {
      hu: ["Ez nem körlevél-dokumentum (Levelezés > Körlevélkészítés indítása).", "Melyik mező legyen a fájlnév?", "PDF elkészült.", "Előbb mentsd el a dokumentumot!"],
      sk: ["Toto nie je dokument hromadnej korešpondencie (Korešpondencia > Spustiť hromadnú korešpondenciu).", "Ktoré pole bude názov súboru?", "PDF hotových.", "Najprv ulož dokument!"],
      en: ["This is not a mail merge document (Mailings > Start Mail Merge).", "Which field should be the file name?", "PDFs created.", "Save the document first!"],
    },
    kod: `Sub MailMergeToSeparatePdfs()
    Dim doc As Document, folder As String, i As Long, n As Long, fld As String, nm As String
    Set doc = ActiveDocument
    If doc.MailMerge.MainDocumentType = wdNotAMergeDocument Then MsgBox "{1}": Exit Sub
    If doc.Path = "" Then MsgBox "{4}": Exit Sub
    folder = doc.Path & "\\PDF\\"
    If Dir(folder, vbDirectory) = "" Then MkDir folder
    fld = InputBox("{2}", , doc.MailMerge.DataSource.FieldNames(1).Name)
    If fld = "" Then Exit Sub
    With doc.MailMerge
        .DataSource.ActiveRecord = wdLastRecord
        n = .DataSource.ActiveRecord
        For i = 1 To n
            .DataSource.ActiveRecord = i
            nm = .DataSource.DataFields(fld).Value
            .DataSource.FirstRecord = i
            .DataSource.LastRecord = i
            .Destination = wdSendToNewDocument
            .Execute Pause:=False
            ActiveDocument.ExportAsFixedFormat folder & MergeSafeName(nm) & "_" & i & ".pdf", wdExportFormatPDF
            ActiveDocument.Close wdDoNotSaveChanges
        Next i
    End With
    MsgBox n & " {3}" & vbLf & folder
End Sub

Function MergeSafeName(ByVal s As String) As String
    Dim ch As Variant
    For Each ch In Array("\\", "/", ":", "*", "?", """", "<", ">", "|", vbCr, vbLf)
        s = Replace(s, ch, "_")
    Next ch
    MergeSafeName = Left(Trim(s), 80)
End Function`,
  },
  {
    ikon: "📊", szin: "zold",
    cim: { hu: "Összes táblázat exportálása Excelbe", sk: "Export všetkých tabuliek do Excelu", en: "Export every table to Excel" },
    leiras: {
      hu: "A dokumentum minden táblázatát külön munkalapra másolja egy új Excel munkafüzetben – ajánlatok, jegyzőkönyvek adatainak továbbszámolásához.",
      sk: "Každú tabuľku dokumentu skopíruje na samostatný hárok nového zošita Excel – na ďalšie počítanie s údajmi z ponúk či zápisníc.",
      en: "Copies every table of the document to its own sheet in a new Excel workbook – for further calculation with data from quotes or minutes.",
    },
    s: { hu: ["A dokumentumban nincs táblázat.", "Táblázat"], sk: ["V dokumente nie je tabuľka.", "Tabuľka"], en: ["The document has no tables.", "Table"] },
    kod: `Sub ExportTablesToExcel()
    Dim xl As Object, wb As Object, ws As Object, t As Table, r As Long, c As Long, k As Long
    If ActiveDocument.Tables.Count = 0 Then MsgBox "{1}": Exit Sub
    Set xl = CreateObject("Excel.Application")
    Set wb = xl.Workbooks.Add
    For Each t In ActiveDocument.Tables
        k = k + 1
        If k = 1 Then
            Set ws = wb.Worksheets(1)
        Else
            Set ws = wb.Worksheets.Add(After:=wb.Worksheets(wb.Worksheets.Count))
        End If
        ws.Name = "{2} " & k
        For r = 1 To t.Rows.Count
            For c = 1 To t.Columns.Count
                On Error Resume Next
                ws.Cells(r, c).Value = TableCellText(t.Cell(r, c))
                On Error GoTo 0
            Next c
        Next r
        ws.UsedRange.Columns.AutoFit
    Next t
    xl.Visible = True
End Sub

Function TableCellText(cl As Cell) As String
    Dim s As String
    s = cl.Range.Text
    TableCellText = Left(s, Len(s) - 2)
End Function`,
  },
  {
    ikon: "🏷️", szin: "narancs",
    cim: { hu: "Képaláírás minden képhez", sk: "Popis ku každému obrázku", en: "Caption every picture" },
    leiras: {
      hu: "Minden (szövegbe ágyazott) kép alá számozott képaláírást tesz (Ábra 1, Ábra 2…), amiből utána ábrajegyzék is készíthető (Hivatkozás → Ábrajegyzék beszúrása).",
      sk: "Pod každý (vložený) obrázok pridá číslovaný popis (Obrázok 1, Obrázok 2…), z ktorého sa dá potom spraviť zoznam obrázkov (Referencie → Vložiť zoznam obrázkov).",
      en: "Adds a numbered caption (Figure 1, Figure 2…) under every inline picture – you can then build a table of figures (References → Insert Table of Figures).",
    },
    s: { hu: ["képaláírás hozzáadva."], sk: ["popisov pridaných."], en: ["captions added."] },
    kod: `Sub CaptionAllPictures()
    Dim i As Long, n As Long, s As InlineShape
    For i = ActiveDocument.InlineShapes.Count To 1 Step -1
        Set s = ActiveDocument.InlineShapes(i)
        If s.Type = wdInlineShapePicture Or s.Type = wdInlineShapeLinkedPicture Then
            s.Range.InsertCaption Label:=wdCaptionFigure, Position:=wdCaptionPositionBelow
            n = n + 1
        End If
    Next i
    ActiveDocument.Fields.Update
    MsgBox n & " {1}"
End Sub`,
  },
  {
    ikon: "🔁", szin: "lila",
    cim: { hu: "Csere minden élőfejben és élőlábban", sk: "Nahradenie vo všetkých hlavičkách a pätách", en: "Replace in all headers and footers" },
    leiras: {
      hu: "A sima Keresés-csere nem mindig éri el az összes szakasz élőfejét/élőlábát. Ez mindegyikben lecseréli a szöveget (pl. régi cégnév, évszám).",
      sk: "Bežné Nájsť a nahradiť nie vždy zasiahne hlavičky/päty všetkých sekcií. Toto nahradí text vo všetkých (napr. starý názov firmy, rok).",
      en: "Plain Find & Replace doesn't always reach the headers/footers of every section. This replaces the text in all of them (e.g. an old company name, the year).",
    },
    s: { hu: ["Mit keressek?", "Mire cseréljem?", "Kész! Az élőfejek és élőlábak frissítve."], sk: ["Čo hľadať?", "Čím nahradiť?", "Hotovo! Hlavičky a päty sú aktualizované."], en: ["Find what?", "Replace with?", "Done! Headers and footers updated."] },
    kod: `Sub ReplaceInHeadersFooters()
    Dim sec As Section, hf As HeaderFooter, f As String, r As String
    f = InputBox("{1}")
    If f = "" Then Exit Sub
    r = InputBox("{2}")
    For Each sec In ActiveDocument.Sections
        For Each hf In sec.Headers
            If hf.Exists Then HeaderFooterReplace hf.Range, f, r
        Next hf
        For Each hf In sec.Footers
            If hf.Exists Then HeaderFooterReplace hf.Range, f, r
        Next hf
    Next sec
    MsgBox "{3}"
End Sub

Sub HeaderFooterReplace(rng As Range, f As String, r As String)
    With rng.Find
        .ClearFormatting
        .Replacement.ClearFormatting
        .Text = f
        .Replacement.Text = r
        .MatchCase = False
        .Wrap = wdFindStop
        .Execute Replace:=wdReplaceAll
    End With
End Sub`,
  },
  {
    ikon: "✂️", szin: "kek",
    cim: { hu: "Dokumentum szétvágása fejezetenként", sk: "Rozdelenie dokumentu podľa kapitol", en: "Split a document by chapters" },
    leiras: {
      hu: "Minden Címsor 1 stílusú fejezetből külön Word fájlt készít (formázással együtt), egy mappába a dokumentum mellé, a fejezet címével elnevezve.",
      sk: "Z každej kapitoly so štýlom Nadpis 1 vytvorí samostatný súbor Word (aj s formátovaním) do priečinka vedľa dokumentu, pomenovaný podľa nadpisu.",
      en: "Makes a separate Word file (with formatting) from every Heading 1 chapter, in a folder next to the document, named after the heading.",
    },
    s: {
      hu: ["Előbb mentsd el a dokumentumot!", "Nincs Címsor 1 stílusú bekezdés.", "Fejezetek", "fájl elkészült."],
      sk: ["Najprv ulož dokument!", "Nie je tu odsek so štýlom Nadpis 1.", "Kapitoly", "súborov hotových."],
      en: ["Save the document first!", "There is no Heading 1 paragraph.", "Chapters", "files created."],
    },
    kod: `Sub SplitByHeading1()
    Dim src As Document, out As Document, p As Paragraph, starts As New Collection
    Dim i As Long, endPos As Long, rng As Range, title As String, folder As String
    Set src = ActiveDocument
    If src.Path = "" Then MsgBox "{1}": Exit Sub
    For Each p In src.Paragraphs
        If p.OutlineLevel = wdOutlineLevel1 Then starts.Add p.Range.Start
    Next p
    If starts.Count = 0 Then MsgBox "{2}": Exit Sub
    folder = src.Path & "\\{3}\\"
    If Dir(folder, vbDirectory) = "" Then MkDir folder
    For i = 1 To starts.Count
        If i < starts.Count Then endPos = starts(i + 1) Else endPos = src.Content.End
        Set rng = src.Range(starts(i), endPos)
        title = ChapterSafeName(rng.Paragraphs(1).Range.Text)
        Set out = Documents.Add
        out.Content.FormattedText = rng.FormattedText
        out.SaveAs2 folder & Format(i, "00") & "_" & title & ".docx", wdFormatXMLDocument
        out.Close
    Next i
    MsgBox starts.Count & " {4}" & vbLf & folder
End Sub

Function ChapterSafeName(ByVal s As String) As String
    Dim ch As Variant
    For Each ch In Array("\\", "/", ":", "*", "?", """", "<", ">", "|", vbCr, vbLf, Chr(7), vbTab)
        s = Replace(s, ch, "")
    Next ch
    ChapterSafeName = Left(Trim(s), 60)
End Function`,
  },
  {
    ikon: "💬", szin: "zold",
    cim: { hu: "Megjegyzések listája táblázatba", sk: "Zoznam komentárov do tabuľky", en: "List all comments in a table" },
    leiras: {
      hu: "Új dokumentumban táblázatba gyűjti az összes megjegyzést: szerző, a megjegyzett szöveg és maga a megjegyzés – átnézéshez, egyeztetéshez.",
      sk: "V novom dokumente zhromaždí všetky komentáre do tabuľky: autor, komentovaný text a samotný komentár – na kontrolu a dohodnutie.",
      en: "Collects every comment in a table in a new document: author, the commented text and the comment itself – for reviews and meetings.",
    },
    s: {
      hu: ["Nincs megjegyzés a dokumentumban.", "Szerző", "Szöveg", "Megjegyzés"],
      sk: ["V dokumente nie sú komentáre.", "Autor", "Text", "Komentár"],
      en: ["The document has no comments.", "Author", "Text", "Comment"],
    },
    kod: `Sub ListComments()
    Dim src As Document, out As Document, t As Table, c As Comment, i As Long
    Set src = ActiveDocument
    If src.Comments.Count = 0 Then MsgBox "{1}": Exit Sub
    Set out = Documents.Add
    Set t = out.Tables.Add(out.Range, src.Comments.Count + 1, 4)
    t.Borders.Enable = True
    t.Cell(1, 1).Range.Text = "#"
    t.Cell(1, 2).Range.Text = "{2}"
    t.Cell(1, 3).Range.Text = "{3}"
    t.Cell(1, 4).Range.Text = "{4}"
    t.Rows(1).Range.Font.Bold = True
    t.Rows(1).HeadingFormat = True
    For Each c In src.Comments
        i = i + 1
        t.Cell(i + 1, 1).Range.Text = i
        t.Cell(i + 1, 2).Range.Text = c.Author
        t.Cell(i + 1, 3).Range.Text = c.Scope.Text
        t.Cell(i + 1, 4).Range.Text = c.Range.Text
    Next c
End Sub`,
  }
);
