/*
  OUTLOOK SÚGÓ (HU / SK / EN)
  - Billentyűk: a klasszikus és az új Outlookban is működnek (Windows)
  - Beállítások: lépések külön a KLASSZIKUS és az ÚJ / WEBES Outlookhoz
  - Makrók: csak a klasszikus (asztali, Windows) Outlookban futnak – az új Outlook és a webes nem támogatja a VBA-t
  A menüpontok neve verziótól függően kicsit eltérhet – zárójelben az angol nevet is megadjuk.
*/

const OUTLOOK_BILLENTYUK = [
  { ikon: "✉️", szin: "kek", cim: { hu: "Levelek", sk: "Pošta", en: "Mail" }, sorok: [
    [{ hu: "Új levél", sk: "Nová správa", en: "New message" }, ["Ctrl", "N"]],
    [{ hu: "Új levél bárhonnan (pl. a naptárból)", sk: "Nová správa odkiaľkoľvek (napr. z kalendára)", en: "New message from anywhere (e.g. calendar)" }, ["Ctrl", "Shift", "M"]],
    [{ hu: "Válasz / Válasz mindenkinek", sk: "Odpovedať / Odpovedať všetkým", en: "Reply / Reply all" }, ["Ctrl", "R"], ["Ctrl", "Shift", "R"]],
    [{ hu: "Továbbítás", sk: "Poslať ďalej", en: "Forward" }, ["Ctrl", "F"]],
    [{ hu: "Küldés", sk: "Odoslať", en: "Send" }, ["Ctrl", "Enter"], ["Alt", "S"]],
    [{ hu: "Olvasottnak / olvasatlannak jelölés", sk: "Označiť ako prečítané / neprečítané", en: "Mark as read / unread" }, ["Ctrl", "Q"], ["Ctrl", "U"]],
    [{ hu: "Áthelyezés mappába", sk: "Presunúť do priečinka", en: "Move to folder" }, ["Ctrl", "Shift", "V"]],
    [{ hu: "Megjelölés nyomon követésre", sk: "Označiť na spracovanie", en: "Flag for follow-up" }, ["Ctrl", "Shift", "G"]],
    [{ hu: "Nevek ellenőrzése (címzett kiegészítése)", sk: "Kontrola mien (doplnenie adresáta)", en: "Check names (complete recipient)" }, ["Ctrl", "K"]],
    [{ hu: "Címjegyzék", sk: "Adresár", en: "Address book" }, ["Ctrl", "Shift", "B"]],
    [{ hu: "Küldés/fogadás (klasszikus)", sk: "Odoslať/prijať (klasické)", en: "Send/Receive (classic)" }, ["F9"]],
    [{ hu: "Beszélgetés figyelmen kívül hagyása", sk: "Ignorovať konverzáciu", en: "Ignore conversation" }, ["Ctrl", "Delete"]],
  ]},
  { ikon: "🧭", szin: "zold", cim: { hu: "Navigáció és keresés", sk: "Navigácia a hľadanie", en: "Navigation & search" }, sorok: [
    [{ hu: "Levelek / Naptár / Kapcsolatok / Feladatok", sk: "Pošta / Kalendár / Kontakty / Úlohy", en: "Mail / Calendar / People / Tasks" }, ["Ctrl", "1"], ["Ctrl", "2"], ["Ctrl", "3"], ["Ctrl", "4"]],
    [{ hu: "Keresés", sk: "Hľadať", en: "Search" }, ["Ctrl", "E"], ["F3"]],
    [{ hu: "Részletes keresés (klasszikus)", sk: "Rozšírené hľadanie (klasické)", en: "Advanced Find (classic)" }, ["Ctrl", "Shift", "F"]],
    [{ hu: "Ugrás mappára", sk: "Prejsť do priečinka", en: "Go to folder" }, ["Ctrl", "Y"]],
    [{ hu: "Beérkezett üzenetek / Postázandó", sk: "Doručená pošta / Pošta na odoslanie", en: "Inbox / Outbox" }, ["Ctrl", "Shift", "I"], ["Ctrl", "Shift", "O"]],
    [{ hu: "Következő / előző levél", sk: "Ďalšia / predchádzajúca správa", en: "Next / previous message" }, ["Ctrl", "."], ["Ctrl", ","]],
  ]},
  { ikon: "📅", szin: "narancs", cim: { hu: "Naptár", sk: "Kalendár", en: "Calendar" }, sorok: [
    [{ hu: "Új találkozó / értekezlet", sk: "Nová schôdzka / porada", en: "New appointment / meeting" }, ["Ctrl", "Shift", "A"], ["Ctrl", "Shift", "Q"]],
    [{ hu: "Nap / munkahét / hét / hónap nézet", sk: "Deň / pracovný týždeň / týždeň / mesiac", en: "Day / work week / week / month view" }, ["Ctrl", "Alt", "1"], ["Ctrl", "Alt", "2"], ["Ctrl", "Alt", "3"], ["Ctrl", "Alt", "4"]],
    [{ hu: "Ugrás dátumra", sk: "Prejsť na dátum", en: "Go to date" }, ["Ctrl", "G"]],
    [{ hu: "Új feladat / új névjegy", sk: "Nová úloha / nový kontakt", en: "New task / new contact" }, ["Ctrl", "Shift", "K"], ["Ctrl", "Shift", "C"]],
  ]},
  { ikon: "✏️", szin: "lila", cim: { hu: "Levélírás", sk: "Písanie správy", en: "Writing" }, sorok: [
    [{ hu: "Félkövér / dőlt / aláhúzott", sk: "Tučné / kurzíva / podčiarknuté", en: "Bold / italic / underline" }, ["Ctrl", "B"], ["Ctrl", "I"], ["Ctrl", "U"]],
    [{ hu: "Felsorolás", sk: "Odrážky", en: "Bullet list" }, ["Ctrl", "Shift", "L"]],
    [{ hu: "Helyesírás-ellenőrzés", sk: "Kontrola pravopisu", en: "Spell check" }, ["F7"]],
    [{ hu: "Melléklet csatolása (klasszikus: Beszúrás menü)", sk: "Priložiť súbor (klasické: ponuka Vložiť)", en: "Attach a file (classic: Insert menu)" }, ["Alt", "N"], ["A"]],
    [{ hu: "Visszavonás / mégis", sk: "Späť / znova", en: "Undo / redo" }, ["Ctrl", "Z"], ["Ctrl", "Y"]],
  ]},
];

// Beállítás-útmutatók: [ikon, cím, klasszikus lépések, új/webes lépések]
const OUTLOOK_BEALLITASOK = [
  { ikon: "✍️", cim: { hu: "Aláírás beállítása", sk: "Nastavenie podpisu", en: "Set up a signature" },
    klasszikus: { hu: ["Fájl → Beállítások → Levelezés", "Aláírások… (Signatures) → Új", "Írd be a szöveget, logót a kép ikonnal tehetsz be", "Jobb oldalt: „Új üzenetek” és „Válaszok/továbbítások” → válaszd ki az aláírást"],
      sk: ["Súbor → Možnosti → Pošta", "Podpisy… (Signatures) → Nový", "Napíš text, logo vložíš ikonou obrázka", "Vpravo: „Nové správy“ a „Odpovede/posielanie ďalej“ → vyber podpis"],
      en: ["File → Options → Mail", "Signatures… → New", "Type the text; add a logo with the picture icon", "On the right: \"New messages\" and \"Replies/forwards\" → choose the signature"] },
    uj: { hu: ["⚙️ Beállítások (jobb felül)", "Fiókok → Aláírások (Signatures)", "+ Új aláírás, írd be és mentsd", "Alul: alapértelmezett aláírás új levelekhez és válaszokhoz"],
      sk: ["⚙️ Nastavenia (vpravo hore)", "Kontá → Podpisy (Signatures)", "+ Nový podpis, napíš a ulož", "Dole: predvolený podpis pre nové správy a odpovede"],
      en: ["⚙️ Settings (top right)", "Accounts → Signatures", "+ New signature, type it and save", "Below: default signature for new messages and replies"] } },
  { ikon: "🏖️", cim: { hu: "Automatikus válasz (szabadság)", sk: "Automatická odpoveď (dovolenka)", en: "Automatic replies (out of office)" },
    klasszikus: { hu: ["Fájl → Automatikus válaszok (Automatic Replies)", "„Automatikus válaszok küldése” bekapcsolása", "Pipáld be: „Küldés csak ebben az időtartományban” → add meg a dátumokat", "Írd meg a szöveget külön a szervezeten belülre és kívülre → OK"],
      sk: ["Súbor → Automatické odpovede (Automatic Replies)", "Zapni „Posielať automatické odpovede“", "Zaškrtni „Posielať iba v tomto časovom rozsahu“ → zadaj dátumy", "Napíš text zvlášť pre ľudí v organizácii a mimo nej → OK"],
      en: ["File → Automatic Replies", "Turn on \"Send automatic replies\"", "Tick \"Only send during this time range\" → enter dates", "Write the text for inside and outside your organisation → OK"] },
    uj: { hu: ["⚙️ Beállítások → Fiókok → Automatikus válaszok", "Kapcsold be, add meg a kezdő és záró dátumot", "Írd meg az üzenetet → Mentés"],
      sk: ["⚙️ Nastavenia → Kontá → Automatické odpovede", "Zapni, zadaj začiatok a koniec", "Napíš správu → Uložiť"],
      en: ["⚙️ Settings → Accounts → Automatic replies", "Turn on, set start and end date", "Write the message → Save"] } },
  { ikon: "🧹", cim: { hu: "Szabályok: levelek automatikus rendezése", sk: "Pravidlá: automatické triedenie pošty", en: "Rules: sort mail automatically" },
    klasszikus: { hu: ["Kattints jobb gombbal egy levélre → Szabályok → Szabály létrehozása", "Feltétel: pl. „Feladó”, „A tárgy tartalmazza”", "Művelet: „Áthelyezés mappába” → válaszd a mappát", "Pipáld be: „Futtatás most a Beérkezett üzenetekben” → OK"],
      sk: ["Pravý klik na správu → Pravidlá → Vytvoriť pravidlo", "Podmienka: napr. „Od“, „Predmet obsahuje“", "Akcia: „Presunúť do priečinka“ → vyber priečinok", "Zaškrtni „Spustiť hneď v priečinku Doručená pošta“ → OK"],
      en: ["Right-click a message → Rules → Create Rule", "Condition: e.g. \"From\", \"Subject contains\"", "Action: \"Move the item to folder\" → pick a folder", "Tick \"Run this rule now on messages already in the current folder\" → OK"] },
    uj: { hu: ["⚙️ Beállítások → Levelezés → Szabályok", "+ Új szabály hozzáadása, adj neki nevet", "Feltétel (pl. Feladó) és művelet (pl. Áthelyezés ide)", "Mentés, majd a szabály melletti ▷ gombbal futtathatod most"],
      sk: ["⚙️ Nastavenia → Pošta → Pravidlá", "+ Pridať nové pravidlo, pomenuj ho", "Podmienka (napr. Od) a akcia (napr. Presunúť do)", "Uložiť; tlačidlom ▷ pri pravidle ho spustíš hneď"],
      en: ["⚙️ Settings → Mail → Rules", "+ Add new rule and name it", "Condition (e.g. From) and action (e.g. Move to)", "Save; run it now with the ▷ button next to the rule"] } },
  { ikon: "⚡", cim: { hu: "Gyorsműveletek (Quick Steps)", sk: "Rýchle kroky (Quick Steps)", en: "Quick Steps" },
    klasszikus: { hu: ["Kezdőlap → Gyorsműveletek csoport → Új létrehozása", "Adj nevet (pl. „Kész → Archívum”)", "Műveletek: pl. Olvasottnak jelölés + Áthelyezés mappába", "Adhatsz neki billentyűt (Ctrl+Shift+1…9) → Befejezés"],
      sk: ["Domov → Rýchle kroky → Vytvoriť nový", "Pomenuj ho (napr. „Hotovo → Archív“)", "Akcie: napr. Označiť ako prečítané + Presunúť do priečinka", "Môžeš priradiť skratku (Ctrl+Shift+1…9) → Dokončiť"],
      en: ["Home → Quick Steps → Create New", "Name it (e.g. \"Done → Archive\")", "Actions: e.g. Mark as read + Move to folder", "Optionally assign a shortcut (Ctrl+Shift+1…9) → Finish"] },
    uj: { hu: ["⚙️ Beállítások → Levelezés → Gyors lépések (Quick steps)", "+ Új gyors lépés, nevet és műveleteket adsz meg", "Mentés – a levél fölötti eszköztáron jelenik meg"],
      sk: ["⚙️ Nastavenia → Pošta → Rýchle kroky", "+ Nový rýchly krok, zadaj názov a akcie", "Uložiť – zobrazí sa na paneli nad správou"],
      en: ["⚙️ Settings → Mail → Quick steps", "+ New quick step, set name and actions", "Save – it appears on the toolbar above the message"] } },
  { ikon: "⏰", cim: { hu: "Késleltetett / ütemezett küldés", sk: "Oneskorené / naplánované odoslanie", en: "Delay / schedule sending" },
    klasszikus: { hu: ["Írás közben: Beállítások fül → Kézbesítés késleltetése (Delay Delivery)", "„Ne kézbesítse ez előtt:” → dátum és idő → Bezárás", "Küldés – a levél a Postázandók között vár (az Outlooknak futnia kell)"],
      sk: ["Pri písaní: karta Možnosti → Oneskoriť doručenie (Delay Delivery)", "„Nedoručiť pred:“ → dátum a čas → Zavrieť", "Odoslať – správa čaká v Pošte na odoslanie (Outlook musí bežať)"],
      en: ["While writing: Options tab → Delay Delivery", "\"Do not deliver before\" → date and time → Close", "Send – it waits in the Outbox (Outlook must be running)"] },
    uj: { hu: ["Írás közben a Küldés gomb melletti ⌄ nyíl", "Küldés ütemezése (Schedule send) → válassz időpontot", "A levél a szerverről megy ki – a gépnek nem kell bekapcsolva lennie"],
      sk: ["Pri písaní šípka ⌄ vedľa tlačidla Odoslať", "Naplánovať odoslanie (Schedule send) → vyber čas", "Správa odíde zo servera – počítač nemusí byť zapnutý"],
      en: ["While writing, the ⌄ arrow next to Send", "Schedule send → pick a time", "It's sent from the server – your PC doesn't need to be on"] } },
  { ikon: "↩️", cim: { hu: "Küldés visszavonása", sk: "Zrušenie odoslania", en: "Undo send" },
    klasszikus: { hu: ["Nincs beépített gomb – megoldás: szabály minden kimenő levél késleltetésére", "Szabályok → Új szabály → „Szabály alkalmazása az általam küldött üzenetekre”", "Művelet: „kézbesítés késleltetése ennyi perccel: 1–2”", "Így 1–2 percig a Postázandókból még visszahívhatod"],
      sk: ["Nie je vstavané tlačidlo – riešenie: pravidlo na oneskorenie všetkej odchádzajúcej pošty", "Pravidlá → Nové pravidlo → „Použiť pravidlo na správy, ktoré odošlem“", "Akcia: „oneskoriť doručenie o 1–2 minúty“", "Takto ju ešte 1–2 minúty vytiahneš z Pošty na odoslanie"],
      en: ["No built-in button – workaround: a rule that delays all outgoing mail", "Rules → New Rule → \"Apply rule on messages I send\"", "Action: \"defer delivery by 1–2 minutes\"", "You can then pull it back from the Outbox for 1–2 minutes"] },
    uj: { hu: ["⚙️ Beállítások → Levelezés → Írás és válasz (Compose and reply)", "Küldés visszavonása: húzd 10 másodpercre", "Küldés után alul megjelenik a „Visszavonás” gomb"],
      sk: ["⚙️ Nastavenia → Pošta → Písanie a odpovedanie", "Zrušiť odoslanie: nastav 10 sekúnd", "Po odoslaní sa dole zobrazí tlačidlo „Späť“"],
      en: ["⚙️ Settings → Mail → Compose and reply", "Undo send: set it to 10 seconds", "After sending, an \"Undo\" button appears at the bottom"] } },
  { ikon: "📅", cim: { hu: "Naptár megosztása", sk: "Zdieľanie kalendára", en: "Share your calendar" },
    klasszikus: { hu: ["Naptár nézet → Kezdőlap → Naptár megosztása", "Hozzáadás… → válaszd a kollégát", "Jogosultság: „Csak elérhetőség”, „Részletek” vagy „Szerkesztő” → OK"],
      sk: ["Kalendár → Domov → Zdieľať kalendár", "Pridať… → vyber kolegu", "Oprávnenie: „Iba dostupnosť“, „Podrobnosti“ alebo „Upraviť“ → OK"],
      en: ["Calendar → Home → Share Calendar", "Add… → pick a colleague", "Permission: \"Availability only\", \"Details\" or \"Can edit\" → OK"] },
    uj: { hu: ["Naptár → jobb klikk a naptárad nevén → Megosztás és engedélyek", "Írd be a nevet vagy e-mailt, válaszd a jogosultságot → Megosztás"],
      sk: ["Kalendár → pravý klik na názov kalendára → Zdieľanie a povolenia", "Zadaj meno alebo e-mail, vyber oprávnenie → Zdieľať"],
      en: ["Calendar → right-click your calendar → Sharing and permissions", "Enter a name or e-mail, pick the permission → Share"] } },
  { ikon: "👥", cim: { hu: "Közös (megosztott) postafiók hozzáadása", sk: "Pridanie zdieľanej poštovej schránky", en: "Add a shared mailbox" },
    klasszikus: { hu: ["Általában magától megjelenik, ha kaptál hozzá jogot (újraindítás után)", "Ha nem: Fájl → Fiókbeállítások → Fiókbeállítások… → a fiókod → Módosítás", "További beállítások → Speciális → Hozzáadás… → írd be a közös postafiók nevét"],
      sk: ["Zvyčajne sa zobrazí sám, ak máš oprávnenie (po reštarte)", "Ak nie: Súbor → Nastavenia konta → tvoje konto → Zmeniť", "Ďalšie nastavenia → Rozšírené → Pridať… → zadaj názov zdieľanej schránky"],
      en: ["Usually appears by itself once you have access (after a restart)", "If not: File → Account Settings → your account → Change", "More Settings → Advanced → Add… → type the shared mailbox name"] },
    uj: { hu: ["A mappalistában jobb klikk a „Mappák” feliraton (vagy a fiókodon)", "Megosztott mappa vagy postafiók hozzáadása → írd be a címét → Hozzáadás"],
      sk: ["V zozname priečinkov pravý klik na „Priečinky“ (alebo na konto)", "Pridať zdieľaný priečinok alebo schránku → zadaj adresu → Pridať"],
      en: ["In the folder list right-click \"Folders\" (or your account)", "Add shared folder or mailbox → type its address → Add"] } },
  { ikon: "🎯", cim: { hu: "Fókuszált beérkezett üzenetek ki/be", sk: "Prioritná doručená pošta zap./vyp.", en: "Focused Inbox on/off" },
    klasszikus: { hu: ["Nézet fül → „Fókuszált beérkezett üzenetek megjelenítése” gomb"], sk: ["Karta Zobraziť → tlačidlo „Zobraziť prioritnú doručenú poštu“"], en: ["View tab → \"Show Focused Inbox\" button"] },
    uj: { hu: ["⚙️ Beállítások → Levelezés → Elrendezés → Fókuszált beérkezett üzenetek → Be / Ki"], sk: ["⚙️ Nastavenia → Pošta → Rozloženie → Prioritná doručená pošta → Zap. / Vyp."], en: ["⚙️ Settings → Mail → Layout → Focused Inbox → On / Off"] } },
  { ikon: "📦", cim: { hu: "Archiválás, hely felszabadítása", sk: "Archivácia, uvoľnenie miesta", en: "Archive and free up space" },
    klasszikus: { hu: ["Fájl → Eszközök → Postafiók karbantartása (Mailbox Cleanup): méret, régi elemek", "Archiválás: levél kijelölése → Backspace vagy az „Archiválás” gomb", "Törölt elemek ürítése: jobb klikk a mappán → Mappa kiürítése"],
      sk: ["Súbor → Nástroje → Vyčistenie poštovej schránky: veľkosť, staré položky", "Archivácia: označ správu → Backspace alebo tlačidlo „Archivovať“", "Vyprázdnenie Odstránenej pošty: pravý klik na priečinok → Vyprázdniť priečinok"],
      en: ["File → Tools → Mailbox Cleanup: size, old items", "Archive: select a message → Backspace or the \"Archive\" button", "Empty Deleted Items: right-click the folder → Empty Folder"] },
    uj: { hu: ["Levél kijelölése → Archiválás gomb (vagy E billentyű)", "⚙️ Beállítások → Általános → Tárhely: mi foglalja a helyet, mappák ürítése"],
      sk: ["Označ správu → tlačidlo Archivovať (alebo kláves E)", "⚙️ Nastavenia → Všeobecné → Úložisko: čo zaberá miesto, vyprázdnenie priečinkov"],
      en: ["Select a message → Archive button (or the E key)", "⚙️ Settings → General → Storage: what takes space, empty folders"] } },
  { ikon: "📬", cim: { hu: "Olvasási visszaigazolás kérése", sk: "Žiadosť o potvrdenie prečítania", en: "Request a read receipt" },
    klasszikus: { hu: ["Új levél → Beállítások fül → pipáld be: „Olvasási visszaigazolás kérése”"], sk: ["Nová správa → karta Možnosti → zaškrtni „Požadovať potvrdenie o prečítaní“"], en: ["New message → Options tab → tick \"Request a Read Receipt\""] },
    uj: { hu: ["Írás közben: Beállítások (Options) fül vagy … menü → Olvasási visszaigazolás kérése"], sk: ["Pri písaní: karta Možnosti alebo ponuka … → Požiadať o potvrdenie prečítania"], en: ["While writing: Options tab or … menu → Request a read receipt"] } },
  { ikon: "🕘", cim: { hu: "Munkaidő és időzóna a naptárban", sk: "Pracovný čas a časové pásmo v kalendári", en: "Working hours and time zone" },
    klasszikus: { hu: ["Fájl → Beállítások → Naptár", "Munkaidő: kezdés, befejezés, munkanapok", "Időzónák: itt adhatsz hozzá második időzónát is"], sk: ["Súbor → Možnosti → Kalendár", "Pracovný čas: začiatok, koniec, pracovné dni", "Časové pásma: môžeš pridať aj druhé pásmo"], en: ["File → Options → Calendar", "Work time: start, end, work days", "Time zones: you can add a second one too"] },
    uj: { hu: ["⚙️ Beállítások → Naptár → Nézet", "Munkaidő és munkanapok, időzóna beállítása → Mentés"], sk: ["⚙️ Nastavenia → Kalendár → Zobrazenie", "Pracovný čas, pracovné dni, časové pásmo → Uložiť"], en: ["⚙️ Settings → Calendar → View", "Working hours, work days and time zone → Save"] } },
];

const OUTLOOK_TIPPEK = [
  { ikon: "🔍", cim: { hu: "Profi keresés kulcsszavakkal", sk: "Profi hľadanie kľúčovými slovami", en: "Pro search keywords" },
    szoveg: { hu: "A keresőbe írd: from:kovacs  ·  to:anna  ·  subject:számla  ·  hasattachments:yes  ·  received:this week. Kombinálhatod is: from:kovacs hasattachments:yes.",
      sk: "Do vyhľadávania napíš: from:kovac  ·  to:anna  ·  subject:faktúra  ·  hasattachments:yes  ·  received:this week. Dajú sa aj kombinovať.",
      en: "Type: from:smith  ·  to:anna  ·  subject:invoice  ·  hasattachments:yes  ·  received:this week. You can combine them too." } },
  { ikon: "📌", cim: { hu: "Levélből értekezlet vagy feladat", sk: "Zo správy porada alebo úloha", en: "Turn a mail into a meeting or task" },
    szoveg: { hu: "Húzd a levelet a bal alsó Naptár ikonra: kész egy találkozó a levél szövegével. A Feladatok ikonra húzva feladat lesz belőle.",
      sk: "Pretiahni správu na ikonu Kalendára vľavo dole: vznikne schôdzka s textom správy. Na ikonu Úloh vznikne úloha.",
      en: "Drag the message onto the Calendar icon: you get an appointment with the mail text. Drop it on Tasks to make a task." } },
  { ikon: "🏷️", cim: { hu: "Színes kategóriák", sk: "Farebné kategórie", en: "Colour categories" },
    szoveg: { hu: "Jobb klikk → Kategorizálás: pl. piros = sürgős, zöld = kész. Rá lehet keresni és szűrni is, és a naptárban is működik.",
      sk: "Pravý klik → Kategorizovať: napr. červená = súrne, zelená = hotovo. Dá sa podľa nich hľadať a filtrovať, funguje aj v kalendári.",
      en: "Right-click → Categorize: e.g. red = urgent, green = done. You can search and filter by them, and it works in the calendar too." } },
  { ikon: "@", cim: { hu: "@ említés a levélben", sk: "@ zmienka v správe", en: "@mention in a mail" },
    szoveg: { hu: "Írd a szövegbe: @ és a kolléga nevét – automatikusan bekerül a címzettek közé, és ő külön jelzést kap.",
      sk: "Napíš do textu @ a meno kolegu – automaticky sa pridá medzi adresátov a dostane upozornenie.",
      en: "Type @ and a colleague's name in the text – they're added as a recipient automatically and get a notification." } },
  { ikon: "📎", cim: { hu: "Link csatolmány helyett", sk: "Odkaz namiesto prílohy", en: "Link instead of attachment" },
    szoveg: { hu: "OneDrive / SharePoint fájlnál csatoláskor válaszd a „Megosztás hivatkozásként” lehetőséget: mindenki ugyanazt a friss változatot látja, és nem telik meg a postafiók.",
      sk: "Pri súbore z OneDrive / SharePoint zvoľ „Zdieľať ako odkaz“: všetci vidia rovnakú aktuálnu verziu a schránka sa neplní.",
      en: "For OneDrive / SharePoint files choose \"Share link\" when attaching: everyone sees the same latest version and mailboxes don't fill up." } },
  { ikon: "🧹", cim: { hu: "Beszélgetés tisztítása", sk: "Vyčistenie konverzácie", en: "Clean up conversations" },
    szoveg: { hu: "Kezdőlap → Tisztítás → Beszélgetés: a hosszú levélváltásból csak az utolsó, mindent tartalmazó levelet hagyja meg.",
      sk: "Domov → Vyčistiť → Konverzácia: z dlhej výmeny správ ponechá len poslednú, ktorá obsahuje všetko.",
      en: "Home → Clean Up → Conversation: keeps only the last message that already contains the whole thread." } },
  { ikon: "🗓️", cim: { hu: "Ütemezési segéd értekezlethez", sk: "Asistent plánovania porád", en: "Scheduling Assistant" },
    szoveg: { hu: "Értekezlet szervezésekor nyisd meg az Ütemezési segédet: látod a meghívottak szabad és foglalt idejét, és egy kattintással jó időpontot választhatsz.",
      sk: "Pri plánovaní porady otvor Asistenta plánovania: uvidíš voľný a obsadený čas pozvaných a jedným klikom vyberieš vhodný termín.",
      en: "When organising a meeting open the Scheduling Assistant: see everyone's free/busy time and pick a good slot in one click." } },
  { ikon: "📝", cim: { hu: "Sablonok és gyorsrészek", sk: "Šablóny a rýchle časti", en: "Templates and Quick Parts" },
    szoveg: { hu: "Gyakran írt szöveghez: Beszúrás → Gyorsrészek → Kijelölés mentése (klasszikus), vagy az új Outlookban a „Saját sablonok” (My templates).",
      sk: "Pre často písaný text: Vložiť → Rýchle časti → Uložiť výber (klasické), v novom Outlooku „Moje šablóny“ (My templates).",
      en: "For text you write often: Insert → Quick Parts → Save Selection (classic), or \"My templates\" in the new Outlook." } },
  { ikon: "🔕", cim: { hu: "Beszélgetés némítása", sk: "Stlmenie konverzácie", en: "Mute a conversation" },
    szoveg: { hu: "Ha egy „válasz mindenkinek” lánc zavar: Ctrl + Delete (Figyelmen kívül hagyás) – a jövőbeli válaszok is egyből a Törölt elemek közé mennek.",
      sk: "Ak ťa ruší reťaz „odpovedať všetkým“: Ctrl + Delete (Ignorovať) – aj budúce odpovede pôjdu rovno do Odstránenej pošty.",
      en: "If a reply-all thread bothers you: Ctrl + Delete (Ignore) – future replies go straight to Deleted Items too." } },
  { ikon: "⏰", cim: { hu: "Emlékeztető egy levélre", sk: "Pripomienka k správe", en: "Remind me about a mail" },
    szoveg: { hu: "Jelölő (zászló) → Egyéni → Emlékeztető: dátum és idő. Az új Outlookban a levél „Szundi” (Snooze) gombjával később újra a lista tetején lesz.",
      sk: "Príznak → Vlastné → Pripomienka: dátum a čas. V novom Outlooku tlačidlo „Odložiť“ (Snooze) vráti správu neskôr na vrch zoznamu.",
      en: "Flag → Custom → Reminder: date and time. In the new Outlook, Snooze brings the message back to the top later." } },
];

const OUTLOOK_MAKROK = [
  {
    ikon: "📎", szin: "kek", hol: "outlook",
    cim: { hu: "Mellékletek mentése mappába", sk: "Uloženie príloh do priečinka", en: "Save attachments to a folder" },
    leiras: { hu: "A kijelölt levelek összes mellékletét elmenti egy választott mappába, a fájlnév elé a levél dátumát írva.", sk: "Uloží všetky prílohy vybraných správ do zvoleného priečinka, pred názov súboru dá dátum správy.", en: "Saves every attachment of the selected messages into a folder you pick, prefixing the mail's date." },
    s: { hu: ["Válaszd ki, hova mentsem a mellékleteket", "melléklet elmentve."], sk: ["Vyber, kam uložiť prílohy", "príloh uložených."], en: ["Choose where to save the attachments", "attachments saved."] },
    kod: `Sub SaveAttachmentsFromSelected()
    Dim sh As Object, fld As Object, path As String, itm As Object, att As Object, n As Long
    Set sh = CreateObject("Shell.Application")
    Set fld = sh.BrowseForFolder(0, "{1}", 0)
    If fld Is Nothing Then Exit Sub
    path = fld.Self.Path & "\\"
    For Each itm In Application.ActiveExplorer.Selection
        If itm.Class = olMail Then
            For Each att In itm.Attachments
                If att.Type = olByValue Then
                    att.SaveAsFile path & Format(itm.ReceivedTime, "yyyy-mm-dd_hhnn") & "_" & att.FileName
                    n = n + 1
                End If
            Next att
        End If
    Next itm
    MsgBox n & " {2}"
End Sub`,
  },
  {
    ikon: "📊", szin: "zold", hol: "outlook",
    cim: { hu: "Kijelölt levelek listája Excelbe", sk: "Zoznam vybraných správ do Excelu", en: "Export selected mails to Excel" },
    leiras: { hu: "A kijelölt levelekről (dátum, feladó, e-mail, tárgy, mellékletek száma) új Excel munkafüzetet készít – kimutatáshoz, nyilvántartáshoz.", sk: "Z vybraných správ (dátum, odosielateľ, e-mail, predmet, počet príloh) vytvorí nový zošit Excel.", en: "Creates a new Excel workbook listing the selected mails (date, sender, e-mail, subject, attachment count)." },
    s: { hu: ["Dátum", "Feladó", "E-mail", "Tárgy", "Mellékletek"], sk: ["Dátum", "Odosielateľ", "E-mail", "Predmet", "Prílohy"], en: ["Date", "Sender", "E-mail", "Subject", "Attachments"] },
    kod: `Sub ExportSelectedToExcel()
    Dim xl As Object, wb As Object, ws As Object, itm As Object, r As Long
    Set xl = CreateObject("Excel.Application")
    Set wb = xl.Workbooks.Add
    Set ws = wb.Worksheets(1)
    ws.Range("A1:E1").Value = Array("{1}", "{2}", "{3}", "{4}", "{5}")
    ws.Range("A1:E1").Font.Bold = True
    r = 2
    For Each itm In Application.ActiveExplorer.Selection
        If itm.Class = olMail Then
            ws.Cells(r, 1).Value = itm.ReceivedTime
            ws.Cells(r, 2).Value = itm.SenderName
            ws.Cells(r, 3).Value = itm.SenderEmailAddress
            ws.Cells(r, 4).Value = itm.Subject
            ws.Cells(r, 5).Value = itm.Attachments.Count
            r = r + 1
        End If
    Next itm
    ws.Columns("A:E").AutoFit
    xl.Visible = True
End Sub`,
  },
  {
    ikon: "📮", szin: "narancs", hol: "excel",
    cim: { hu: "Tömeges, személyre szabott levelek Excel listából", sk: "Hromadné osobné e-maily zo zoznamu v Exceli", en: "Personalised bulk e-mails from an Excel list" },
    leiras: { hu: "EXCELBEN fut. Oszlopok: A = e-mail, B = név, C = tárgy, D = szöveg, E = melléklet útvonala (nem kötelező). Minden sorhoz megnyit egy kész levelet ellenőrzésre (.Display) – ha minden jó, átírhatod .Send-re.", sk: "Spúšťa sa v EXCELI. Stĺpce: A = e-mail, B = meno, C = predmet, D = text, E = cesta k prílohe (nepovinné). Pre každý riadok otvorí hotový e-mail na kontrolu (.Display) – potom môžeš zmeniť na .Send.", en: "Runs in EXCEL. Columns: A = e-mail, B = name, C = subject, D = text, E = attachment path (optional). Opens a ready mail for each row to check (.Display) – change to .Send once happy." },
    s: { hu: ["Kedves", "' Ellenőrzés után a .Display helyett írhatsz .Send-et"], sk: ["Milý/á", "' Po kontrole môžeš .Display nahradiť .Send"], en: ["Dear", "' After checking you can replace .Display with .Send"] },
    kod: `Sub SendMailsFromList()
    Dim ol As Object, mail As Object, ws As Worksheet, r As Long
    Set ws = ActiveSheet
    Set ol = CreateObject("Outlook.Application")
    For r = 2 To ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
        If ws.Cells(r, 1).Value <> "" Then
            Set mail = ol.CreateItem(0)
            With mail
                .To = ws.Cells(r, 1).Value
                .Subject = ws.Cells(r, 3).Value
                .Body = "{1} " & ws.Cells(r, 2).Value & "!" & vbCrLf & vbCrLf & ws.Cells(r, 4).Value
                If ws.Cells(r, 5).Value <> "" Then .Attachments.Add CStr(ws.Cells(r, 5).Value)
                {2}
                .Display
            End With
        End If
    Next r
End Sub`,
  },
  {
    ikon: "🛑", szin: "lila", hol: "thisoutlooksession",
    cim: { hu: "Figyelmeztetés: elfelejtett melléklet", sk: "Upozornenie: zabudnutá príloha", en: "Warning: forgotten attachment" },
    leiras: { hu: "Küldéskor szól, ha a levélben szerepel a „melléklet”, „csatol” szó, de nincs csatolva semmi. A ThisOutlookSession modulba kell tenni (VBA szerkesztő bal oldalán).", sk: "Pri odoslaní upozorní, ak sa v správe spomína „príloha“, ale nič nie je priložené. Patrí do modulu ThisOutlookSession (vľavo v editore VBA).", en: "Warns on send if the mail mentions \"attach\" but nothing is attached. Goes into the ThisOutlookSession module (left side of the VBA editor)." },
    s: {
      hu: ['"mellékel", "melléklet", "csatol", "attach"', "A levélben mellékletet említesz, de nincs csatolva semmi. Biztosan elküldöd?"],
      sk: ['"príloh", "prikladám", "attach"', "V správe spomínaš prílohu, ale nič nie je priložené. Naozaj odoslať?"],
      en: ['"attach", "enclosed"', "You mention an attachment but nothing is attached. Send anyway?"],
    },
    kod: `Private Sub Application_ItemSend(ByVal Item As Object, Cancel As Boolean)
    Dim words As Variant, w As Variant, txt As String
    If Item.Class <> olMail Then Exit Sub
    If Item.Attachments.Count > 0 Then Exit Sub
    txt = LCase(Item.Subject & " " & Item.Body)
    words = Array({1})
    For Each w In words
        If InStr(txt, w) > 0 Then
            If MsgBox("{2}", vbYesNo + vbQuestion) = vbNo Then Cancel = True
            Exit Sub
        End If
    Next w
End Sub`,
  },
  {
    ikon: "💾", szin: "zold", hol: "outlook",
    cim: { hu: "Levelek mentése .msg fájlba", sk: "Uloženie správ do súborov .msg", en: "Save mails as .msg files" },
    leiras: { hu: "A kijelölt leveleket .msg fájlként elmenti egy mappába (dátum + tárgy névvel) – pl. projekt-dokumentációhoz.", sk: "Vybrané správy uloží ako súbory .msg do priečinka (dátum + predmet v názve) – napr. do projektovej dokumentácie.", en: "Saves the selected mails as .msg files into a folder (date + subject as name) – e.g. for project records." },
    s: { hu: ["Válaszd ki a mappát"], sk: ["Vyber priečinok"], en: ["Choose the folder"] },
    kod: `Sub SaveSelectedAsMsg()
    Dim sh As Object, fld As Object, itm As Object, fname As String, path As String, c As Variant
    Set sh = CreateObject("Shell.Application")
    Set fld = sh.BrowseForFolder(0, "{1}", 0)
    If fld Is Nothing Then Exit Sub
    path = fld.Self.Path & "\\"
    For Each itm In Application.ActiveExplorer.Selection
        If itm.Class = olMail Then
            fname = itm.Subject
            For Each c In Array("\\", "/", ":", "*", "?", """", "<", ">", "|")
                fname = Replace(fname, c, "_")
            Next c
            itm.SaveAs path & Format(itm.ReceivedTime, "yyyy-mm-dd_hhnn") & "_" & Left(fname, 80) & ".msg", olMSG
        End If
    Next itm
End Sub`,
  },
  {
    ikon: "📭", szin: "kek", hol: "outlook",
    cim: { hu: "Olvasatlan levelek összesítése", sk: "Súhrn neprečítaných správ", en: "Unread mail summary" },
    leiras: { hu: "Megmutatja, hány olvasatlan levél van a Beérkezett üzenetekben és azok almappáiban.", sk: "Ukáže počet neprečítaných správ v Doručenej pošte a jej podpriečinkoch.", en: "Shows how many unread mails are in the Inbox and its subfolders." },
    s: { hu: ["Beérkezett üzenetek"], sk: ["Doručená pošta"], en: ["Inbox"] },
    kod: `Sub UnreadSummary()
    Dim inbox As Object, f As Object, txt As String
    Set inbox = Application.Session.GetDefaultFolder(olFolderInbox)
    txt = "{1}: " & inbox.UnReadItemCount & vbCrLf
    For Each f In inbox.Folders
        If f.UnReadItemCount > 0 Then txt = txt & "  • " & f.Name & ": " & f.UnReadItemCount & vbCrLf
    Next f
    MsgBox txt
End Sub`,
  },
  {
    ikon: "✅", szin: "narancs", hol: "outlook",
    cim: { hu: "Mappa minden levele olvasottnak", sk: "Všetky správy v priečinku ako prečítané", en: "Mark the whole folder as read" },
    leiras: { hu: "Az éppen megnyitott mappa összes levelét olvasottnak jelöli.", sk: "Označí všetky správy v otvorenom priečinku ako prečítané.", en: "Marks every item in the open folder as read." },
    s: { hu: [], sk: [], en: [] },
    kod: `Sub MarkFolderAsRead()
    Dim itm As Object
    On Error Resume Next
    For Each itm In Application.ActiveExplorer.CurrentFolder.Items
        If itm.UnRead Then itm.UnRead = False
    Next itm
End Sub`,
  },
];

const OUTLOOK_MAKRO_UTMUTATO = {
  hu: ["Csak a KLASSZIKUS (asztali, Windows) Outlookban működik – az új és a webes Outlook nem futtat makrót.", "Engedélyezés: Fájl → Beállítások → Adatvédelmi központ → Adatvédelmi központ beállításai → Makróbeállítások → „Értesítés minden makróról”, majd indítsd újra az Outlookot.", "Alt + F11 → bal oldalt Project1 → Insert → Module → illeszd be a kódot. (A „ThisOutlookSession” jelölésű makrót oda kell tenni.)", "Futtatás: Alt + F8 → válaszd ki → Futtatás. Az „Excelben fut” jelölésűt Excelben kell beilleszteni."],
  sk: ["Funguje iba v KLASICKOM (desktopovom, Windows) Outlooku – nový a webový Outlook makrá nespúšťajú.", "Povolenie: Súbor → Možnosti → Centrum dôveryhodnosti → Nastavenia → Nastavenia makier → „Upozorniť na všetky makrá“, potom reštartuj Outlook.", "Alt + F11 → vľavo Project1 → Insert → Module → vlož kód. (Makro označené „ThisOutlookSession“ patrí tam.)", "Spustenie: Alt + F8 → vyber → Spustiť. Makro „beží v Exceli“ vlož do Excelu."],
  en: ["Only works in CLASSIC (desktop, Windows) Outlook – the new and web Outlook don't run macros.", "Enable: File → Options → Trust Center → Trust Center Settings → Macro Settings → \"Notifications for all macros\", then restart Outlook.", "Alt + F11 → Project1 on the left → Insert → Module → paste the code. (Macros marked \"ThisOutlookSession\" go there.)", "Run: Alt + F8 → choose → Run. Macros marked \"runs in Excel\" go into Excel."],
};

const OUTLOOK_HIBAK = [
  { hiba: { hu: "Az Outlook lassú vagy le-lefagy", sk: "Outlook je pomalý alebo zamŕza", en: "Outlook is slow or freezes" },
    megoldas: { hu: "Indítsd csökkentett módban: Win + R → outlook.exe /safe. Ha így gyors, egy bővítmény a hibás: Fájl → Beállítások → Bővítmények → COM-bővítmények → kapcsold ki őket egyenként.", sk: "Spusti v núdzovom režime: Win + R → outlook.exe /safe. Ak je rýchly, chybný je doplnok: Súbor → Možnosti → Doplnky → Doplnky COM → vypínaj ich po jednom.", en: "Start in safe mode: Win + R → outlook.exe /safe. If it's fast, an add-in is to blame: File → Options → Add-ins → COM Add-ins → disable them one by one." } },
  { hiba: { hu: "A keresés nem találja a leveleket", sk: "Hľadanie nenachádza správy", en: "Search doesn't find mails" },
    megoldas: { hu: "Fájl → Beállítások → Keresés → Indexelési beállítások → Speciális → Újraépítés. Pár órát is igénybe vehet, közben hagyd futni az Outlookot.", sk: "Súbor → Možnosti → Hľadanie → Možnosti indexovania → Rozšírené → Znova vytvoriť. Môže trvať aj pár hodín, nechaj Outlook bežať.", en: "File → Options → Search → Indexing Options → Advanced → Rebuild. It can take hours; keep Outlook running." } },
  { hiba: { hu: "Megtelt a postafiók", sk: "Poštová schránka je plná", en: "Mailbox is full" },
    megoldas: { hu: "Ürítsd a Törölt elemeket, keresd meg a nagy leveleket (keresés: size:>5MB), a mellékleteket mentsd OneDrive-ra, régi leveleket archiváld (lásd Beállítások → Archiválás).", sk: "Vyprázdni Odstránenú poštu, nájdi veľké správy (hľadaj: size:>5MB), prílohy ulož na OneDrive, staré správy archivuj.", en: "Empty Deleted Items, find big mails (search: size:>5MB), move attachments to OneDrive, archive old mail." } },
  { hiba: { hu: "A levél a Postázandók között ragad", sk: "Správa zostáva v Pošte na odoslanie", en: "Mail stuck in the Outbox" },
    megoldas: { hu: "Nézd meg, nincs-e bekapcsolva a Kapcsolat nélküli munka (Küldés/fogadás fül). Túl nagy melléklet esetén töröld a levelet a Postázandókból, és küldd linkként.", sk: "Skontroluj, či nie je zapnutá Práca offline (karta Odoslať/prijať). Pri príliš veľkej prílohe správu vymaž a pošli odkaz.", en: "Check that Work Offline isn't on (Send/Receive tab). If the attachment is too big, delete it from the Outbox and send a link instead." } },
  { hiba: { hu: "Folyton jelszót kér", sk: "Neustále pýta heslo", en: "Keeps asking for the password" },
    megoldas: { hu: "Windows Hitelesítőadat-kezelő → Windows-hitelesítő adatok → töröld az Outlook / Office / MicrosoftOffice bejegyzéseket, majd indítsd újra az Outlookot és lépj be újra.", sk: "Správca poverení Windows → Poverenia Windows → odstráň položky Outlook / Office / MicrosoftOffice, reštartuj Outlook a prihlás sa znova.", en: "Windows Credential Manager → Windows Credentials → remove the Outlook / Office / MicrosoftOffice entries, then restart Outlook and sign in again." } },
  { hiba: { hu: "Új Outlook ↔ klasszikus: hogyan váltok?", sk: "Nový Outlook ↔ klasický: ako prepnúť?", en: "New Outlook ↔ classic: how do I switch?" },
    megoldas: { hu: "A klasszikusban jobb felül az „Új Outlook kipróbálása” kapcsoló, az újban a ⚙️ Beállítások → Általános → „Visszaváltás a klasszikus Outlookra” (ha a szervezeted engedi).", sk: "V klasickom vpravo hore prepínač „Vyskúšať nový Outlook“, v novom ⚙️ Nastavenia → Všeobecné → „Prepnúť späť na klasický Outlook“ (ak to organizácia povoľuje).", en: "In classic, the \"Try the new Outlook\" toggle at the top right; in the new one ⚙️ Settings → General → \"Go back to classic Outlook\" (if your organisation allows it)." } },
  { hiba: { hu: "Válaszoknál nem jelenik meg az aláírás", sk: "Pri odpovediach sa nezobrazuje podpis", en: "Signature missing on replies" },
    megoldas: { hu: "Az aláírás-beállításban külön kell kiválasztani a „Válaszok/továbbítások” aláírását is (lásd Beállítások → Aláírás).", sk: "V nastavení podpisu treba zvlášť vybrať aj podpis pre „Odpovede/posielanie ďalej“ (pozri Nastavenia → Podpis).", en: "In signature settings you must also pick a signature for \"Replies/forwards\" (see Settings → Signature)." } },
  { hiba: { hu: "Nem nyílik meg a melléklet", sk: "Príloha sa neotvára", en: "An attachment won't open" },
    megoldas: { hu: "Mentsd el a gépre (jobb klikk → Mentés másként), és onnan nyisd meg. Egyes típusokat (pl. .exe) biztonsági okból tilt az Outlook – ilyet kérj tömörítve vagy linkként.", sk: "Ulož ju do počítača (pravý klik → Uložiť ako) a otvor odtiaľ. Niektoré typy (napr. .exe) Outlook blokuje – vypýtaj si ich zabalené alebo ako odkaz.", en: "Save it to your PC (right-click → Save As) and open it from there. Some types (e.g. .exe) are blocked – ask for it zipped or as a link." } },
];
