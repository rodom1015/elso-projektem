# rodom – Excel, Power Query és Office segédlet

Saját, jelszóval védett oldal: otthon feltöltöm az Excel fájljaimat, munkában letöltöm őket.

- 🔒 **Titkosítás a böngészőben**: a fájlok és a nevük AES-256 titkosítással mennek fel; a szerver csak olvashatatlan adatot lát
- ⬆️ **Fogd és vidd feltöltés**, több fájl egyszerre, max. 20 MB / fájl
- 🔎 Keresés, rendezés, letöltés, törlés
- 👁️ **Előnézet**: Excel fájl megnézése a böngészőben, letöltés nélkül (munkalapokkal)
- 🤖 **AI asszisztens**: leírod, mit szeretnél, és kész Excel képletet, Excel / Word / Outlook makrót vagy Power Query M kódot kapsz magyarázattal (Cloudflare Workers AI; alapból csak belépve, az Admin oldalon a látogatóknak is bekapcsolható napi korláttal)
- 📝 **Táblázatszerkesztő**: Excel fájl szerkesztése a böngészőben, saját képletmotorral (kb. 90 függvény magyar és angol néven), több munkalap, másolás-beillesztés, visszavonás, mentés .xlsx-be vagy titkosítva a Fájljaimba
- 📊 **Excel-elemző és grafikonkészítő**: automatikus áttekintés oszloponként, oszlop- / sáv- / vonal- / kör- / fánkdiagram, megállapítások, letöltés PNG / SVG / Excel
- 📄 **PDF eszközök**: egyesítés, kivonás és szétvágás, forgatás, oldalak törlése, képekből PDF, oldalszámozás, vízjel – a böngészőben (pdf-lib)
- 🛡️ **Admin oldal**: statisztika (oldalak, országok, eszközök, AI használat), belépési napló (sikeres és hibás próbálkozások), AI beállítások
- 🧭 **Csoportosított menü** (Munkaterület, Súgók, Eszközök, Admin), telefonon alsó menüsáv és kihúzható menü
- ⭐ **Kedvencek és legutóbb megnyitott**: csillag az oldalakon, makrókon, M kódokon és függvényeken, a kezdőlapon gyors elérés
- 📝 **Szövegeszközök**: rendezés, ismétlődések, ékezetek, kis-nagybetű, összefűzés vesszővel, szétbontás, számlálók
- 🔳 **QR-kód készítő**: link, szöveg, Wi-Fi, névjegy, e-mail – PNG / SVG letöltés, saját színekkel
- 🧹 **Adattisztító** és ✂️ **Szétválogató** (Excel eszközök): szóközök, szövegként tárolt számok és dátumok, üres sorok, ismétlődések; lap szétbontása oszlop szerint lapokra vagy fájlokra
- 🏠 **Kezdőlap** igazi weboldal felépítéssel: nyitókép, animált számlálók, szolgáltatások, újdonságok, lábléc
- 👥 **Látogatószámláló** (napi egyedi látogatók, 30 napos grafikon; D1 adatbázissal vagy anélkül)
- 📚 **Excel súgó** egy oldalon, fülekkel (mint a Word súgó): 114 függvény (köztük 17 új Excel 2024 függvény), 93 billentyűparancs, 36 makró és 15 tipp – közös keresővel
- 🧮 Kalkulátorok (fülekre rendezve): pénzváltó, százalék, munkaidő, munkanapok (ünnepnapokkal), Excel segéd – mindegyikhez Excel képlettel
- 📅 Naptár magyar és szlovák ünnepnapokkal
- 🔄 **Power Query súgó**: alapok lépésről lépésre, 10 recept kattintásról kattintásra, 12 tipp, 30 kész M kód (mappa egyesítése, összes munkalap, SharePoint, fuzzy összefésülés, pivot, naptártábla, élő árfolyam…), 46 M függvény, 8 gyakori hiba megoldással
- 📄 Word súgó: 63 billentyűparancs, 12 tipp és 18 kész Word makró
- 📧 **Outlook súgó**: 27 billentyűparancs, 12 beállítás lépésről lépésre (külön a klasszikus és az új/webes Outlookhoz: aláírás, szabadság, szabályok, késleltetett küldés…), 10 tipp, 7 makró, 8 gyakori probléma
- 🕒 Felső sáv élő órával, dátummal és a hét számával
- 📎 Word, PDF, PowerPoint és szöveges fájlok tárolása is
- 📱 **Belépés QR kóddal**: a gépen QR kód, a telefonon jóváhagyás (ECDH titkosítással, ellenőrző kóddal) – a munkahelyi gépen nem kell beírni a jelszót
- 📊 **Kimutatás-készítő**: csoportosítás összeggel/darabbal/átlaggal, grafikonnal és Excel letöltéssel
- 📲 **Telepíthető alkalmazás (PWA)**: ikon a telefonon és az asztalon, offline is megnyílik
- 🔗 **Megosztó link** lejárattal (1 óra / 1 nap / 7 nap), egyszeri letöltés opcióval, visszavonható – a link saját kulccsal titkosított
- 🔄 **Képletfordító**: magyar ↔ szlovák ↔ angol Excel képletek (függvénynevek, elválasztók, tizedesjel, IGAZ/HAMIS, hibaértékek)
- 🧰 **Excel eszközök** a böngészőben: összehasonlítás, ismétlődések, CSV ↔ Excel, egyesítés
- 🌤️ Időjárás (Open-Meteo): óránkénti grafikon, 7 napos előrejelzés, városválasztás
- 🎨 Témák: 9 téma (köztük ünnepi hóeséssel), világos/sötét/automatikus mód, háttér, betűméret, tömör nézet
- ⌨️ **Ctrl + K gyorskereső**: oldalak, függvények, billentyűk, makrók, fájlok – ékezet nélkül is
- 🌍 Három nyelv: szlovák (alap), magyar, angol
- 🛡️ 10 hibás jelszó után 15 perc tiltás · 15 perc tétlenség után automatikus kilépés
- 🌙 Sötét mód, telefonon is működik
- 💸 **Ingyenes** (Cloudflare Workers + KV, bankkártya nélkül)

👉 **Telepítés: [TELEPITES.md](TELEPITES.md)**

## A fájlok

| Fájl | Mi ez |
|---|---|
| `public/index.html` | az oldal szerkezete (HTML) |
| `public/style.css` | a kinézet (CSS) |
| `public/app.js` | a böngésző oldali logika: menü, nyelvváltás, titkosítás, előnézet (JavaScript) |
| `public/i18n.js` | a felület szövegei magyarul, szlovákul és angolul |
| `public/excel-adatok.js` | az Excel súgó tartalma: függvények, billentyűparancsok |
| `public/makrok.js`, `public/makrok-bovites.js` | a kész VBA makrók (Excel és a Word bővítés) és a használati útmutató |
| `public/kalkulator.js` | a kalkulátorok számolása |
| `public/word-adatok.js` | a Word súgó tartalma |
| `public/word-makrok.js` | a kész Word VBA makrók |
| `public/outlook-adatok.js`, `public/outlook-oldal.js` | az Outlook súgó tartalma és megjelenítése |
| `public/powerquery.js`, `public/pq-bovites.js`, `public/pq-oldal.js` | a Power Query súgó tartalma és megjelenítése |
| `public/unnepnapok.js` | magyar és szlovák ünnepnapok (húsvét számítással) |
| `public/eszkozok.js` | képletfordító és Excel eszközök |
| `public/megosztas.js` | megosztó linkek |
| `public/idojaras.js` | időjárás |
| `public/uzenofal.js` | látogatószámláló, számlálók, újdonságok |
| `public/tema.js` | témaváltó |
| `public/menu.js` | csoportosított menü, telefonos menü, névtelen statisztika |
| `public/ai.js` | AI asszisztens |
| `public/keplet-motor.js`, `public/tabla.js` | képletmotor és táblázatszerkesztő |
| `public/elemzo.js` | Excel-elemző és SVG grafikonok |
| `public/pdf-eszkozok.js` | PDF eszközök |
| `public/eszkozok2.js` | szövegeszközök, QR-kód készítő, adattisztító, szétválogató |
| `public/kedvencek.js` | kedvencek és legutóbb megnyitott oldalak |
| `public/admin.js` | admin oldal: statisztika, belépési napló, AI beállítások |
| `public/paletta.js` | Ctrl + K gyorskereső |
| `public/qr.js` | belépés QR kóddal |
| `public/sw.js`, `public/manifest.webmanifest`, `public/ikonok/` | telepíthető alkalmazás (PWA) |
| `public/vendor/` | SheetJS (Apache-2.0), qrcode-generator (MIT), pdf-lib (MIT) |
| `src/worker.js` | a szerver: tárolja és visszaadja a titkosított fájlokat |
| `wrangler.toml` | a Cloudflare beállításai |

## Hogyan működik a védelem?

1. A jelszavadból a böngésző két dolgot számol ki:
   - egy **belépési kulcsot** (SHA-256) – ezt küldi el, ezzel ellenőrzi a szerver, hogy te vagy-e;
   - egy **titkosító kulcsot** (PBKDF2, 250 000 kör) – ez **soha nem hagyja el** a böngészőt.
2. Feltöltéskor a fájl tartalma és neve titkosítva kerül fel (AES-GCM).
3. Letöltéskor a böngésző visszafejti.

## Helyi kipróbálás (fejlesztőknek)

```bash
npm install
echo "JELSZO=teszt123" > .dev.vars
npm run dev
```

Utána: http://localhost:8787
