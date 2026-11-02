# Telepítés – így kerül fel az oldal az internetre

Kb. 15 perc, ingyenes, bankkártya nem kell. Semmit nem kell telepítened a gépedre, minden a böngészőben történik.

## 1. Cloudflare fiók

1. Menj a **dash.cloudflare.com/sign-up** oldalra, és regisztrálj (e-mail + jelszó).
2. Erősítsd meg az e-mail címed.
3. Ajánlott: kapcsold be a kétlépcsős azonosítást (jobb felül a profilod → **Profile** → **Authentication**).

## 2. Tárhely létrehozása (KV)

1. A bal oldali menüben: **Storage & Databases** → **Workers KV**.
2. **Create instance** (vagy **Create namespace**) → név: `fajltarolo-fajlok` → **Create**.
3. A listában megjelenik egy hosszú azonosító (**ID**, pl. `3f2a9c…`). **Másold ki!**

## 3. Az azonosító beírása a kódba

1. A GitHubon nyisd meg a repóban a **`wrangler.toml`** fájlt.
2. Kattints a ceruza ikonra (**Edit**).
3. Cseréld le ezt: `IDE_JON_A_KV_AZONOSITO` → a kimásolt ID-ra (az idézőjelek maradjanak).
4. **Commit changes**.

## 4. Az oldal létrehozása

1. Cloudflare bal menü: **Compute (Workers)** → **Workers & Pages** → **Create**.
2. **Import a repository** → **Connect GitHub** → engedélyezd → válaszd az **elso-projektem** repót.
3. Beállítások:
   - Project name: `roman`
   - Build command: *(hagyd üresen)*
   - Deploy command: `npx wrangler deploy`
4. **Create and deploy** / **Deploy**. Várj 1–2 percet, amíg zöld pipa lesz.

## 5. A jelszó beállítása

1. A Worker oldalán: **Settings** → **Variables and Secrets** → **Add**.
2. Type: **Secret**, Variable name: **`JELSZO`**, Value: *a választott jelszavad*.
3. **Deploy** / **Save**.

> 💡 **Erős jelszót válassz!** Legalább 12 karakter, pl. 3–4 véletlen szó: `kék-alma-futó-ablak-42`.
> Ez a jelszó védi a fájljaidat. **Ha elfelejted, a feltöltött fájlok nem nyithatók meg többé.**
> Ha később megváltoztatod, a régi jelszóval feltöltött fájlok nem lesznek olvashatók: előtte töltsd le őket.

## 6. Kész! 🎉

Az oldal címe: **`https://roman.<a-te-fiokneved>.workers.dev`**
(a pontos címet a Worker oldalán, a **Visit** gomb mellett látod).

Tedd a könyvjelzők közé otthon és a munkahelyen is.

## 7. (Ajánlott) Adatbázis a statisztikához és a naplóhoz – D1

Ingyenes, kb. 5 perc. Enélkül is működik az oldal, de az **Admin → Statisztika** (oldalak, országok, eszközök, AI használat) csak ezzel lesz teljes.

1. Cloudflare bal oldali menü: **Storage & databases** → **D1 SQL database** → **Create database**.
2. Név: **`rodom-db`** → **Create**.
3. A megnyíló oldalon másold ki a **Database ID**-t (hosszú betű-szám sor, pl. `1a2b3c4d-…`).
4. Küldd el nekem (Claude-nak) – ez nem titkos adat –, és beírom a `wrangler.toml` fájlba.
   *Vagy magad:* a `wrangler.toml` végén vedd ki a `#` jeleket a `[[d1_databases]]` résznél, és a `database_id` helyére írd be.
5. A következő telepítés után a táblák maguktól létrejönnek.

## 8. AI asszisztens

A `wrangler.toml`-ban már be van kapcsolva (`[ai]` rész) – nincs teendőd.
- Alapból **csak belépve** használható.
- Az **Admin → AI beállítások** oldalon bekapcsolhatod a látogatóknak is, napi korláttal.
- Az ingyenes Cloudflare AI keret naponta kb. **50–150 kérdésre** elég (a válaszok hosszától függ). Ha több kell, válts a „Gyors” modellre.

---

### Ha valami nem működik

| Hibaüzenet | Megoldás |
|---|---|
| „Nincs beállítva a JELSZO titok” | Az 5. lépés hiányzik, vagy nem `JELSZO` a neve (nagybetűvel). |
| A telepítés piros (failed) | Valószínűleg a 3. lépésben rossz az ID. Ellenőrizd, és mentsd újra. |
| „Túl sok hibás próbálkozás” | 10 rossz jelszó után 15 percig tiltva vagy. Várj, és próbáld újra. |
| Munkában nem nyílik meg | A céges hálózat tilthatja a `workers.dev` címeket. |
| „Az AI nincs bekapcsolva” | Nézd meg a Worker **Settings → Bindings** részét: kell lennie egy `AI` (Workers AI) bejegyzésnek. |
| „Mára elfogyott az ingyenes AI keret” | Másnap (UTC éjfél után) újra működik. Az Admin oldalon válthatsz a „Gyors” modellre. |
