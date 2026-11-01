# rodom – Excel, Power Query és Office segédlet

Saját, jelszóval védett oldal: otthon feltöltöm az Excel fájljaimat, munkában letöltöm őket.

- 🔒 **Titkosítás a böngészőben**: a fájlok és a nevük AES-256 titkosítással mennek fel; a szerver csak olvashatatlan adatot lát
- ⬆️ **Fogd és vidd feltöltés**, több fájl egyszerre, max. 20 MB / fájl
- 🔎 Keresés, rendezés, letöltés, törlés
- 👁️ **Előnézet**: Excel fájl megnézése a böngészőben, letöltés nélkül (munkalapokkal)
- 🏠 **Kezdőlap** igazi weboldal felépítéssel: nyitókép, animált számlálók, szolgáltatások, újdonságok, lábléc
- 👥 **Látogatószámláló** (napi egyedi látogatók, 30 napos grafikon; D1 adatbázissal vagy anélkül)
- ✉️ **Üzenőfal**: privát, titkosított postaláda – a látogatók írhatnak, csak a tulajdonos olvashatja
- 📚 **Excel súgó** egy oldalon, fülekkel (mint a Word súgó): 114 függvény (köztük 17 új Excel 2024 függvény), 93 billentyűparancs, 26 makró és 15 tipp – közös keresővel
- 🧮 Kalkulátorok (fülekre rendezve): pénzváltó, százalék, munkaidő, munkanapok (ünnepnapokkal), Excel segéd – mindegyikhez Excel képlettel
- 📅 Naptár magyar és szlovák ünnepnapokkal
- 🔄 **Power Query súgó**: alapok lépésről lépésre, 12 tipp, 15 kész M kód (mappa egyesítése, összefésülés, unpivot, naptártábla, élő árfolyam…), 46 M függvény, 8 gyakori hiba megoldással
- 📄 Word súgó: 63 billentyűparancs, 12 tipp és 12 kész Word makró
- 🕒 Felső sáv élő órával, dátummal és a hét számával
- 📎 Word, PDF, PowerPoint és szöveges fájlok tárolása is
- 📱 **Belépés QR kóddal**: a gépen QR kód, a telefonon jóváhagyás (ECDH titkosítással, ellenőrző kóddal) – a munkahelyi gépen nem kell beírni a jelszót
- 📊 **Kimutatás-készítő**: csoportosítás összeggel/darabbal/átlaggal, grafikonnal és Excel letöltéssel
- 📲 **Telepíthető alkalmazás (PWA)**: ikon a telefonon és az asztalon, offline is megnyílik
- 🔗 **Megosztó link** lejárattal (1 óra / 1 nap / 7 nap), egyszeri letöltés opcióval, visszavonható – a link saját kulccsal titkosított
- 🔄 **Képletfordító**: magyar ↔ szlovák ↔ angol Excel képletek (függvénynevek, elválasztók, tizedesjel, IGAZ/HAMIS, hibaértékek)
- 🧰 **Excel eszközök** a böngészőben: összehasonlítás, ismétlődések, CSV ↔ Excel, egyesítés
- 🌤️ Időjárás (Open-Meteo): óránkénti grafikon, 7 napos előrejelzés, városválasztás
- 🎨 Témaváltó: világos / sötét / automatikus, 5 kiemelő szín
- ⌨️ **Ctrl + K gyorskereső**: oldalak, függvények, billentyűk, makrók, fájlok – ékezet nélkül is
- 🌍 Három nyelv: magyar (alap), szlovák, angol
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
| `public/makrok.js` | a kész VBA makrók és a használati útmutató |
| `public/kalkulator.js` | a kalkulátorok számolása |
| `public/word-adatok.js` | a Word súgó tartalma |
| `public/word-makrok.js` | a kész Word VBA makrók |
| `public/powerquery.js`, `public/pq-oldal.js` | a Power Query súgó tartalma és megjelenítése |
| `public/unnepnapok.js` | magyar és szlovák ünnepnapok (húsvét számítással) |
| `public/eszkozok.js` | képletfordító és Excel eszközök |
| `public/megosztas.js` | megosztó linkek |
| `public/idojaras.js` | időjárás |
| `public/uzenofal.js` | látogatószámláló, üzenőfal, számlálók, újdonságok |
| `public/tema.js` | témaváltó |
| `public/paletta.js` | Ctrl + K gyorskereső |
| `public/qr.js` | belépés QR kóddal |
| `public/sw.js`, `public/manifest.webmanifest`, `public/ikonok/` | telepíthető alkalmazás (PWA) |
| `public/vendor/` | SheetJS (Apache-2.0) és qrcode-generator (MIT) |
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
