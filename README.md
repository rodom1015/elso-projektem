# 📁 Fájltárolóm

Saját, jelszóval védett oldal: otthon feltöltöm az Excel fájljaimat, munkában letöltöm őket.

- 🔒 **Titkosítás a böngészőben**: a fájlok és a nevük AES-256 titkosítással mennek fel; a szerver csak olvashatatlan adatot lát
- ⬆️ **Fogd és vidd feltöltés**, több fájl egyszerre, max. 20 MB / fájl
- 🔎 Keresés, rendezés, letöltés, törlés
- 👁️ **Előnézet**: Excel fájl megnézése a böngészőben, letöltés nélkül (munkalapokkal)
- 📊 Kezdőlap statisztikával, napi Excel-tippel
- 📚 Excel súgó: függvények magyarul példákkal, billentyűparancsok
- 🛡️ 10 hibás jelszó után 15 perc tiltás · 15 perc tétlenség után automatikus kilépés
- 🌙 Sötét mód, telefonon is működik
- 💸 **Ingyenes** (Cloudflare Workers + KV, bankkártya nélkül)

👉 **Telepítés: [TELEPITES.md](TELEPITES.md)**

## A fájlok

| Fájl | Mi ez |
|---|---|
| `public/index.html` | az oldal szerkezete (HTML) |
| `public/style.css` | a kinézet (CSS) |
| `public/app.js` | a böngésző oldali logika: menü, titkosítás, előnézet (JavaScript) |
| `public/excel-adatok.js` | az Excel súgó tartalma: függvények, billentyűparancsok |
| `public/vendor/` | SheetJS – az Excel fájlok előnézetéhez (Apache-2.0 licenc) |
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
