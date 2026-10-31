/*
  MEGOSZTÓ LINKEK
  ===============
  1. A böngésző visszafejti a fájlt a saját kulcsoddal.
  2. Készít egy ÚJ, véletlen kulcsot, és azzal újra titkosítja.
  3. A szerverre csak ez a titkosított másolat kerül, lejárati idővel.
  4. A link: https://…/#/s/<azonosító>.<kulcs> – a # utáni rész sosem jut el a szerverhez,
     így a szerver a megosztott fájlt sem tudja elolvasni.
*/

const b64url = (bytes) => b64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const b64urlBol = (s) => b64bol(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));

async function kulccsalTitkosit(kulcs, bytes) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const titkos = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, kulcs, bytes));
  const ki = new Uint8Array(12 + titkos.length);
  ki.set(iv);
  ki.set(titkos, 12);
  return ki;
}
async function kulccsalVisszafejt(kulcs, bytes) {
  return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: bytes.subarray(0, 12) }, kulcs, bytes.subarray(12)));
}

/* ---------- Megosztás készítése (a fájllistából) ---------- */
let megosztandoFajl = null;
let megosztasIdo = 86400;

function megosztasAblak(f) {
  megosztandoFajl = f;
  const k = kiterjesztesOf(f.nev);
  const ikon = document.querySelector("#megosztas-ablak .fajl-ikon");
  ikon.className = "fajl-ikon " + ikonOsztaly(k);
  ikon.textContent = (k || "?").slice(0, 4).toUpperCase();
  $("mo-nev").textContent = f.nev;
  $("mo-info").textContent = meret(f.meret) + " · " + datum(f.ido);
  $("mo-beallitas").hidden = false;
  $("mo-eredmeny").hidden = true;
  $("mo-egyszeri").checked = false;
  $("megosztas-ablak").showModal();
}

document.querySelectorAll("#mo-ido button").forEach((g) =>
  g.addEventListener("click", () => {
    megosztasIdo = +g.dataset.ido;
    document.querySelectorAll("#mo-ido button").forEach((x) => x.classList.toggle("aktiv", x === g));
  })
);
$("mo-bezar").addEventListener("click", () => $("megosztas-ablak").close());

$("mo-keszit").addEventListener("click", async () => {
  const gomb = $("mo-keszit");
  gomb.disabled = true;
  gomb.querySelector(".porgo").hidden = false;
  try {
    const f = megosztandoFajl;
    const tartalom = await fajlTartalom(f);
    const kulcs = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
    const titkos = await kulccsalTitkosit(kulcs, tartalom);
    const nev = b64(await kulccsalTitkosit(kulcs, szovegbol(f.nev)));
    const valasz = await api("shares", {
      method: "POST",
      body: titkos,
      headers: {
        "X-Nev": nev,
        "X-Nev-Tulaj": await nevTitkosit(f.nev),
        "X-Meret": String(f.meret || tartalom.length),
        "X-Ervenyes": String(megosztasIdo),
        "X-Egyszeri": $("mo-egyszeri").checked ? "1" : "0",
      },
    });
    const { id } = await valasz.json();
    const nyers = new Uint8Array(await crypto.subtle.exportKey("raw", kulcs));
    const link = `${location.origin}/#/s/${id}.${b64url(nyers)}`;
    $("mo-link").value = link;
    $("mo-lejar").textContent = t("sh_expires", { date: new Date(Date.now() + megosztasIdo * 1000).toLocaleString(locale(), { dateStyle: "medium", timeStyle: "short" }) });
    $("mo-beallitas").hidden = true;
    $("mo-eredmeny").hidden = false;
    $("mo-link").select();
    megosztasokBetolt();
  } catch (hiba) {
    hibaKezeles(hiba);
  } finally {
    gomb.disabled = false;
    gomb.querySelector(".porgo").hidden = true;
  }
});

$("mo-masol").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText($("mo-link").value);
    ertesit(t("sh_copied"));
  } catch {
    $("mo-link").select();
    ertesit(t("copy_failed"), true);
  }
});

/* ---------- Aktív megosztások listája ---------- */
let megosztasLista = [];

async function megosztasokBetolt() {
  if (!titkositoKulcs) return;
  try {
    const adat = await (await api("shares")).json();
    megosztasLista = await Promise.all(adat.megosztasok.map(async (m) => ({ ...m, nev: (await nevVisszafejt(m.nevTulaj)) ?? t("unreadable_name") })));
  } catch {
    megosztasLista = [];
  }
  megosztasokRajzol();
}

function megosztasokRajzol() {
  const kartya = $("megosztasok-kartya");
  kartya.hidden = !titkositoKulcs || megosztasLista.length === 0;
  const ul = $("megosztas-lista");
  ul.innerHTML = "";
  for (const m of megosztasLista) {
    const li = document.createElement("li");
    li.className = "fajl";
    li.innerHTML = `
      <div class="fajl-ikon"></div>
      <div class="fajl-adatok"><div class="fajl-nev"></div><div class="fajl-info"></div></div>
      <button class="gomb masodlagos kicsi"></button>`;
    const k = kiterjesztesOf(m.nev);
    li.querySelector(".fajl-ikon").className = "fajl-ikon " + ikonOsztaly(k);
    li.querySelector(".fajl-ikon").textContent = (k || "?").slice(0, 4).toUpperCase();
    li.querySelector(".fajl-nev").textContent = m.nev;
    li.querySelector(".fajl-info").textContent =
      t("sh_expires", { date: new Date(m.lejar).toLocaleString(locale(), { dateStyle: "medium", timeStyle: "short" }) }) +
      (m.egyszeri ? " · " + t("sh_once_label") : "");
    const gomb = li.querySelector("button");
    gomb.textContent = t("sh_revoke");
    gomb.addEventListener("click", async () => {
      try {
        await api("shares/" + m.id, { method: "DELETE" });
        megosztasLista = megosztasLista.filter((x) => x.id !== m.id);
        megosztasokRajzol();
        ertesit(t("sh_revoked"));
      } catch (hiba) {
        hibaKezeles(hiba);
      }
    });
    ul.appendChild(li);
  }
}

/* ---------- A link megnyitása (a fogadó oldalán, jelszó nélkül) ---------- */
async function megosztottMegnyit(resz) {
  const doboz = $("mo-tartalom");
  const hibaUzenet = (kulcs) => {
    doboz.innerHTML = `<p class="hiba"></p>`;
    doboz.firstChild.textContent = t(kulcs);
  };
  const [id, kulcsSzoveg] = resz.split(".");
  if (!/^[0-9a-f-]{36}$/.test(id || "") || !kulcsSzoveg) return hibaUzenet("sh_bad_link");

  doboz.innerHTML = `<span class="porgo sotet"></span>`;
  let kulcs, info;
  try {
    kulcs = await crypto.subtle.importKey("raw", b64urlBol(kulcsSzoveg), "AES-GCM", false, ["decrypt"]);
  } catch {
    return hibaUzenet("sh_bad_link");
  }
  try {
    const v = await fetch(`/api/s/${id}/info`);
    if (!v.ok) return hibaUzenet("sh_gone");
    info = await v.json();
    info.nevSzoveg = new TextDecoder().decode(await kulccsalVisszafejt(kulcs, b64bol(info.nev)));
  } catch {
    return hibaUzenet("sh_bad_link");
  }

  const k = kiterjesztesOf(info.nevSzoveg);
  doboz.innerHTML = `
    <div class="fajl mo-fajl"><div class="fajl-ikon"></div><div class="fajl-adatok"><div class="fajl-nev"></div><div class="fajl-info"></div></div></div>
    <button class="gomb fo teljes"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12M7 11l5 5 5-5M5 20h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span></span></button>`;
  doboz.querySelector(".fajl-ikon").className = "fajl-ikon " + ikonOsztaly(k);
  doboz.querySelector(".fajl-ikon").textContent = (k || "?").slice(0, 4).toUpperCase();
  doboz.querySelector(".fajl-nev").textContent = info.nevSzoveg;
  doboz.querySelector(".fajl-info").textContent = meret(info.meret) + " · " +
    t("sh_expires", { date: new Date(info.lejar).toLocaleString(locale(), { dateStyle: "medium", timeStyle: "short" }) }) +
    (info.egyszeri ? " · " + t("sh_once_label") : "");
  const gomb = doboz.querySelector("button");
  gomb.querySelector("span").textContent = t("sh_download");
  gomb.addEventListener("click", async () => {
    gomb.disabled = true;
    try {
      const v = await fetch(`/api/s/${id}`);
      if (!v.ok) return hibaUzenet("sh_gone");
      const adat = await kulccsalVisszafejt(kulcs, new Uint8Array(await v.arrayBuffer()));
      mentes(adat, info.nevSzoveg);
      ertesit("✓ " + info.nevSzoveg);
      if (info.egyszeri) setTimeout(() => hibaUzenet("sh_gone"), 1500);
    } catch {
      hibaUzenet("sh_bad_link");
    } finally {
      gomb.disabled = false;
    }
  });
}

forditasHookok.push(() => {
  megosztasokRajzol();
  if (location.hash.startsWith("#/s/")) megosztottMegnyit(location.hash.slice(4));
});
// Ha az oldal egy megosztott linkkel nyílt meg, az app.js már meghívta volna – most már be van töltve
if (location.hash.startsWith("#/s/")) megosztottMegnyit(location.hash.slice(4));
