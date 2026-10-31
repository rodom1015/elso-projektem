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
   - Project name: `rodom`
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

Az oldal címe: **`https://rodom.<a-te-fiokneved>.workers.dev`**
(a pontos címet a Worker oldalán, a **Visit** gomb mellett látod).

Tedd a könyvjelzők közé otthon és a munkahelyen is.

---

### Ha valami nem működik

| Hibaüzenet | Megoldás |
|---|---|
| „Nincs beállítva a JELSZO titok” | Az 5. lépés hiányzik, vagy nem `JELSZO` a neve (nagybetűvel). |
| A telepítés piros (failed) | Valószínűleg a 3. lépésben rossz az ID. Ellenőrizd, és mentsd újra. |
| „Túl sok hibás próbálkozás” | 10 rossz jelszó után 15 percig tiltva vagy. Várj, és próbáld újra. |
| Munkában nem nyílik meg | A céges hálózat tilthatja a `workers.dev` címeket. |
