/*
  WORD MAKRÓK (VBA)
  A felépítés ugyanaz, mint az Excel makróknál (makrok.js): a {1}, {2}… helyére a nyelvenkénti szöveg kerül.
  Ha a makrót a „Normal” sablonba teszed, MINDEN Word dokumentumban elérhető lesz.
*/

const WORD_MAKRO_UTMUTATO = {
  hu: [
    "Nyisd meg a Wordöt, és nyomd meg: Alt + F11 (megnyílik a VBA szerkesztő).",
    "Bal oldalt kattints a „Normal” projektre – így a makró minden dokumentumban működni fog.",
    "Menü: Insert → Module, majd illeszd be a kódot (Ctrl + V).",
    "Futtatás: Alt + F8 → válaszd ki a makrót → Futtatás.",
    "Tipp: Fájl → Beállítások → Gyorselérési eszköztár → „Makrók” – így egy gombbal indíthatod.",
  ],
  sk: [
    "Otvor Word a stlač Alt + F11 (otvorí sa editor VBA).",
    "Vľavo klikni na projekt „Normal“ – makro bude fungovať v každom dokumente.",
    "Ponuka: Insert → Module a vlož kód (Ctrl + V).",
    "Spustenie: Alt + F8 → vyber makro → Spustiť.",
    "Tip: Súbor → Možnosti → Panel s nástrojmi Rýchly prístup → „Makrá“ – spustíš ho jedným tlačidlom.",
  ],
  en: [
    "Open Word and press Alt + F11 (the VBA editor opens).",
    "On the left click the \"Normal\" project – the macro will then work in every document.",
    "Menu: Insert → Module, then paste the code (Ctrl + V).",
    "To run: Alt + F8 → pick the macro → Run.",
    "Tip: File → Options → Quick Access Toolbar → \"Macros\" – run it with one button.",
  ],
};

const WORD_MAKRO_FIGYELMEZTETES = {
  hu: "⚠️ Fontos dokumentumon előbb készíts másolatot (vagy futtasd a „Biztonsági másolat” makrót). Makrót tartalmazó dokumentumot .docm formátumban kell menteni – a Normal sablonba tett makróhoz ez nem kell.",
  sk: "⚠️ Pri dôležitom dokumente si najprv urob kópiu (alebo spusti makro „Záložná kópia“). Dokument s makrom treba uložiť vo formáte .docm – pri makre v šablóne Normal to netreba.",
  en: "⚠️ On important documents make a copy first (or run the \"Backup copy\" macro). A document containing macros must be saved as .docm – not needed for macros in the Normal template.",
};

const WORD_MAKROK = [
  {
    ikon: "💾", szin: "zold",
    cim: { hu: "Biztonsági másolat dátummal", sk: "Záložná kópia s dátumom", en: "Backup copy with date" },
    leiras: {
      hu: "Elmenti a dokumentumot, és ugyanabba a mappába másolatot készít a mai dátummal és időponttal a nevében.",
      sk: "Uloží dokument a do toho istého priečinka vytvorí kópiu s dnešným dátumom a časom v názve.",
      en: "Saves the document and makes a copy in the same folder with today's date and time in its name.",
    },
    s: { hu: ["Előbb mentsd el a dokumentumot!", "Másolat elmentve:"], sk: ["Najprv ulož dokument!", "Kópia uložená:"], en: ["Save the document first!", "Copy saved:"] },
    kod: `Sub BackupCopy()
    Dim fileName As String, baseName As String, doc As Document
    If ActiveDocument.Path = "" Then
        MsgBox "{1}"
        Exit Sub
    End If
    ActiveDocument.Save
    baseName = Left(ActiveDocument.Name, InStrRev(ActiveDocument.Name, ".") - 1)
    fileName = ActiveDocument.Path & Application.PathSeparator & _
               Format(Now, "yyyy-mm-dd_hh-nn") & "_" & baseName & ".docx"
    Set doc = Documents.Add(Template:=ActiveDocument.FullName, Visible:=False)
    doc.SaveAs2 FileName:=fileName, FileFormat:=wdFormatDocumentDefault
    doc.Close SaveChanges:=False
    MsgBox "{2}" & vbCrLf & fileName
End Sub`,
  },
  {
    ikon: "📄", szin: "narancs",
    cim: { hu: "Mentés PDF-be egy kattintással", sk: "Uloženie do PDF jedným klikom", en: "Save as PDF in one click" },
    leiras: {
      hu: "A dokumentumot PDF-be menti ugyanabba a mappába, ugyanazzal a névvel.",
      sk: "Uloží dokument do PDF do toho istého priečinka s rovnakým názvom.",
      en: "Saves the document as a PDF in the same folder with the same name.",
    },
    s: { hu: ["Előbb mentsd el a dokumentumot!", "PDF elmentve:"], sk: ["Najprv ulož dokument!", "PDF uložené:"], en: ["Save the document first!", "PDF saved:"] },
    kod: `Sub SaveAsPdf()
    Dim pdfPath As String
    If ActiveDocument.Path = "" Then
        MsgBox "{1}"
        Exit Sub
    End If
    pdfPath = ActiveDocument.Path & Application.PathSeparator & _
              Left(ActiveDocument.Name, InStrRev(ActiveDocument.Name, ".") - 1) & ".pdf"
    ActiveDocument.ExportAsFixedFormat OutputFileName:=pdfPath, ExportFormat:=wdExportFormatPDF
    MsgBox "{2}" & vbCrLf & pdfPath
End Sub`,
  },
  {
    ikon: "✂️", szin: "kek",
    cim: { hu: "Dupla szóközök eltávolítása", sk: "Odstránenie dvojitých medzier", en: "Remove double spaces" },
    leiras: {
      hu: "Az egész dokumentumban addig cseréli a dupla szóközöket szimplára, amíg egy sem marad.",
      sk: "V celom dokumente nahrádza dvojité medzery jednoduchými, kým nezostane žiadna.",
      en: "Replaces double spaces with single ones throughout the document until none are left.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub RemoveDoubleSpaces()
    With ActiveDocument.Content.Find
        .ClearFormatting
        .Replacement.ClearFormatting
        .Text = "  "
        .Replacement.Text = " "
        .MatchWildcards = False
        Do While .Execute(Replace:=wdReplaceAll)
        Loop
    End With
End Sub`,
  },
  {
    ikon: "🧹", szin: "lila",
    cim: { hu: "Üres bekezdések törlése", sk: "Odstránenie prázdnych odsekov", en: "Remove empty paragraphs" },
    leiras: {
      hu: "Kitörli a felesleges üres sorokat (dupla Entereket) – pl. e-mailből vagy weboldalról bemásolt szövegnél.",
      sk: "Odstráni nadbytočné prázdne riadky (dvojité Entery) – napr. v texte skopírovanom z e-mailu alebo webu.",
      en: "Removes extra empty lines (double Enters) – e.g. in text pasted from an e-mail or a website.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub RemoveEmptyParagraphs()
    With ActiveDocument.Content.Find
        .ClearFormatting
        .Replacement.ClearFormatting
        .Text = "^p^p"
        .Replacement.Text = "^p"
        .MatchWildcards = False
        Do While .Execute(Replace:=wdReplaceAll)
        Loop
    End With
End Sub`,
  },
  {
    ikon: "✅", szin: "zold",
    cim: { hu: "Változások elfogadása, megjegyzések törlése", sk: "Prijatie zmien a odstránenie komentárov", en: "Accept changes, delete comments" },
    leiras: {
      hu: "Elfogadja az összes követett változást, és törli a megjegyzéseket – így a dokumentum tiszta, végleges változat lesz.",
      sk: "Prijme všetky sledované zmeny a odstráni komentáre – dokument bude čistou finálnou verziou.",
      en: "Accepts all tracked changes and deletes all comments – leaving a clean, final version.",
    },
    s: { hu: ["Kész: minden változás elfogadva, megjegyzések törölve."], sk: ["Hotovo: zmeny prijaté, komentáre odstránené."], en: ["Done: all changes accepted, comments deleted."] },
    kod: `Sub AcceptChangesRemoveComments()
    ActiveDocument.TrackRevisions = False
    ActiveDocument.Revisions.AcceptAll
    If ActiveDocument.Comments.Count > 0 Then ActiveDocument.DeleteAllComments
    MsgBox "{1}"
End Sub`,
  },
  {
    ikon: "🖼️", szin: "narancs",
    cim: { hu: "Képek igazítása az oldal szélességéhez", sk: "Prispôsobenie obrázkov šírke strany", en: "Fit images to page width" },
    leiras: {
      hu: "Minden túl nagy képet (ami kilógna) az oldal szélességére kicsinyít, az arányokat megtartva.",
      sk: "Každý príliš veľký obrázok (ktorý by presahoval) zmenší na šírku strany so zachovaním pomeru strán.",
      en: "Shrinks every oversized image (that would stick out) to the page width, keeping its proportions.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub ResizeImagesToPageWidth()
    Dim shp As InlineShape, maxW As Single
    With ActiveDocument.PageSetup
        maxW = .PageWidth - .LeftMargin - .RightMargin
    End With
    For Each shp In ActiveDocument.InlineShapes
        If shp.Width > maxW Then
            shp.LockAspectRatio = msoTrue
            shp.Width = maxW
        End If
    Next shp
End Sub`,
  },
  {
    ikon: "📋", szin: "kek",
    cim: { hu: "Minden táblázat egységes formázása", sk: "Jednotné formátovanie všetkých tabuliek", en: "Format all tables the same way" },
    leiras: {
      hu: "Minden táblázatnak keretet ad, az első sort félkövér, színezett fejléccé teszi (oldaltöréskor ismétlődik), és az oldal szélességére igazítja.",
      sk: "Každej tabuľke pridá orámovanie, prvý riadok zmení na tučnú farebnú hlavičku (opakuje sa na každej strane) a prispôsobí ju šírke strany.",
      en: "Gives every table borders, turns the first row into a bold coloured header (repeated on each page) and fits it to the page width.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub FormatAllTables()
    Dim tbl As Table
    For Each tbl In ActiveDocument.Tables
        On Error Resume Next
        tbl.Borders.Enable = True
        tbl.Rows(1).Range.Font.Bold = True
        tbl.Rows(1).Shading.BackgroundPatternColor = RGB(226, 239, 218)
        tbl.Rows(1).HeadingFormat = True
        tbl.AutoFitBehavior wdAutoFitWindow
        On Error GoTo 0
    Next tbl
End Sub`,
  },
  {
    ikon: "🖍️", szin: "lila",
    cim: { hu: "Szó kiemelése mindenhol", sk: "Zvýraznenie slova všade", en: "Highlight a word everywhere" },
    leiras: {
      hu: "Megkérdezi, melyik szót keresed, és a dokumentumban mindenhol sárgával kiemeli – átnézéshez, ellenőrzéshez.",
      sk: "Opýta sa, ktoré slovo hľadáš, a v celom dokumente ho zvýrazní žltou – na kontrolu a prehľad.",
      en: "Asks which word to look for and highlights it in yellow everywhere in the document – handy for reviewing.",
    },
    s: { hu: ["Melyik szót emeljem ki?"], sk: ["Ktoré slovo mám zvýrazniť?"], en: ["Which word should I highlight?"] },
    kod: `Sub HighlightWord()
    Dim txt As String
    txt = InputBox("{1}")
    If txt = "" Then Exit Sub
    Options.DefaultHighlightColorIndex = wdYellow
    With ActiveDocument.Content.Find
        .ClearFormatting
        .Replacement.ClearFormatting
        .Text = txt
        .Replacement.Text = "^&"
        .Replacement.Highlight = True
        .MatchCase = False
        .MatchWildcards = False
        .Execute Replace:=wdReplaceAll
    End With
End Sub`,
  },
  {
    ikon: "📊", szin: "zold",
    cim: { hu: "Dokumentum statisztika", sk: "Štatistika dokumentu", en: "Document statistics" },
    leiras: {
      hu: "Egy ablakban mutatja: oldalak, szavak, karakterek, bekezdések, táblázatok és képek száma.",
      sk: "V jednom okne zobrazí počet strán, slov, znakov, odsekov, tabuliek a obrázkov.",
      en: "Shows in one box: number of pages, words, characters, paragraphs, tables and images.",
    },
    s: {
      hu: ["Oldalak:", "Szavak:", "Karakterek:", "Bekezdések:", "Táblázatok:", "Képek:"],
      sk: ["Strany:", "Slová:", "Znaky:", "Odseky:", "Tabuľky:", "Obrázky:"],
      en: ["Pages:", "Words:", "Characters:", "Paragraphs:", "Tables:", "Images:"],
    },
    kod: `Sub DocumentStatistics()
    With ActiveDocument
        MsgBox "{1} " & .ComputeStatistics(wdStatisticPages) & vbCrLf & _
               "{2} " & .ComputeStatistics(wdStatisticWords) & vbCrLf & _
               "{3} " & .ComputeStatistics(wdStatisticCharacters) & vbCrLf & _
               "{4} " & .ComputeStatistics(wdStatisticParagraphs) & vbCrLf & _
               "{5} " & .Tables.Count & vbCrLf & _
               "{6} " & .InlineShapes.Count
    End With
End Sub`,
  },
  {
    ikon: "🔗", szin: "narancs",
    cim: { hu: "Összes hivatkozás (link) eltávolítása", sk: "Odstránenie všetkých odkazov", en: "Remove all hyperlinks" },
    leiras: {
      hu: "Kiveszi a kék, kattintható linkeket, de a szöveg megmarad – pl. weboldalról másolt szövegnél.",
      sk: "Odstráni modré klikateľné odkazy, ale text zostane – napr. v texte skopírovanom z webu.",
      en: "Removes the blue clickable links but keeps the text – e.g. in text copied from a website.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub RemoveAllHyperlinks()
    Dim i As Long
    For i = ActiveDocument.Hyperlinks.Count To 1 Step -1
        ActiveDocument.Hyperlinks(i).Delete
    Next i
End Sub`,
  },
  {
    ikon: "🔄", szin: "kek",
    cim: { hu: "Mezők és tartalomjegyzék frissítése", sk: "Aktualizácia polí a obsahu", en: "Update fields and table of contents" },
    leiras: {
      hu: "Egyszerre frissíti az összes mezőt (oldalszám, dátum, hivatkozások) és a tartalomjegyzéket – nyomtatás előtt hasznos.",
      sk: "Naraz aktualizuje všetky polia (čísla strán, dátumy, odkazy) aj obsah – užitočné pred tlačou.",
      en: "Updates all fields (page numbers, dates, cross-references) and the table of contents at once – useful before printing.",
    },
    s: { hu: ["Minden mező és tartalomjegyzék frissítve."], sk: ["Všetky polia a obsah sú aktualizované."], en: ["All fields and tables of contents updated."] },
    kod: `Sub UpdateAllFields()
    Dim rng As Range, toc As TableOfContents
    For Each rng In ActiveDocument.StoryRanges
        rng.Fields.Update
    Next rng
    For Each toc In ActiveDocument.TablesOfContents
        toc.Update
    Next toc
    MsgBox "{1}"
End Sub`,
  },
  {
    ikon: "🕒", szin: "lila",
    cim: { hu: "Dátum és idő beszúrása", sk: "Vloženie dátumu a času", en: "Insert date and time" },
    leiras: {
      hu: "A kurzor helyére beírja a mostani dátumot és időt (nem frissülő szövegként). Gyorsbillentyűt is adhatsz neki.",
      sk: "Na miesto kurzora vloží aktuálny dátum a čas (ako text, ktorý sa nemení). Môžeš mu priradiť aj skratku.",
      en: "Inserts the current date and time at the cursor (as text that won't change). You can give it a shortcut too.",
    },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub InsertDateTimeHere()
    Selection.InsertDateTime DateTimeFormat:="yyyy.MM.dd. HH:mm", InsertAsField:=False
End Sub`,
  },
];
