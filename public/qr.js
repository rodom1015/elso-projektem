/*
  BELÉPÉS QR KÓDDAL
  =================
  A GÉPEN (ahol nem akarod beírni a jelszót):
    1. Egyszeri ECDH kulcspárt készítünk (P-256). A nyilvános fele a QR kódba kerül.
    2. 2 másodpercenként megkérdezzük a szervert, jött-e jóváhagyás.
  A TELEFONON (ahol jelszóval be vagy lépve):
    3. A QR kód megnyitja ezt az oldalt (#/qr/...). Jóváhagyáskor a telefon is készít egy kulcspárt,
       a két kulcsból közös titkos kulcs lesz (ECDH), és ezzel titkosítva küldi el a belépési adatokat.
  A szerver csak titkosított adatot továbbít – kinyitni csak a QR kódot mutató gép tudja.
  Az ellenőrző kód (6 számjegy) mindkét képernyőn ugyanaz – így látod, hogy a saját gépedet engedélyezed.
*/

const QR_ERVENYES_MP = 150;
let qrMunkamenet = null; // { id, kulcspar, lejar, idozito }

async function ellenorzoKod(nyersPub) {
  const h = new Uint8Array(await crypto.subtle.digest("SHA-256", nyersPub));
  const n = ((h[0] << 16) | (h[1] << 8) | h[2]) % 1000000;
  const s = String(n).padStart(6, "0");
  return s.slice(0, 3) + " " + s.slice(3);
}

/* ======================================================
   A GÉPEN: QR kód mutatása és várakozás
   ====================================================== */

async function qrInditas() {
  qrLeallit();
  if (typeof qrcode !== "function") return ertesit(t("no_server"), true);
  const kulcspar = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, false, ["deriveKey"]);
  const nyersPub = new Uint8Array(await crypto.subtle.exportKey("raw", kulcspar.publicKey));
  const id = crypto.randomUUID();
  const link = `${location.origin}/#/qr/${id}.${b64url(nyersPub)}`;

  const qr = qrcode(0, "M");
  qr.addData(link);
  qr.make();
  $("qr-kep").innerHTML = qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
  $("qr-ellenorzo").textContent = await ellenorzoKod(nyersPub);
  $("qr-uj").hidden = true;
  $("qr-kep").classList.remove("lejart");
  $("belepes-urlap").hidden = true;
  $("qr-panel").hidden = false;

  qrMunkamenet = { id, kulcspar, lejar: Date.now() + QR_ERVENYES_MP * 1000 };
  qrMunkamenet.idozito = setInterval(qrLekerdez, 2000);
  qrAllapotKiir();
}

function qrAllapotKiir() {
  if (!qrMunkamenet) return;
  const mp = Math.max(0, Math.round((qrMunkamenet.lejar - Date.now()) / 1000));
  $("qr-allapot").textContent = t("qr_waiting", { s: mp });
}

async function qrLekerdez() {
  const m = qrMunkamenet;
  if (!m) return;
  if (Date.now() > m.lejar) {
    qrLeallit();
    $("qr-allapot").textContent = t("qr_expired");
    $("qr-kep").classList.add("lejart");
    $("qr-uj").hidden = false;
    return;
  }
  qrAllapotKiir();
  let adat;
  try {
    const v = await fetch(`/api/qr/${m.id}`, { cache: "no-store" });
    if (v.status === 404) return; // még nincs jóváhagyás
    if (!v.ok) return;
    adat = await v.json();
  } catch {
    return; // hálózati hiba: a következő körben újra próbáljuk
  }
  qrLeallit();
  try {
    if (adat.elutasitva) throw new Error("elutasitva");
    const telPub = await crypto.subtle.importKey("raw", b64urlBol(adat.pub), { name: "ECDH", namedCurve: "P-256" }, false, []);
    const kozos = await crypto.subtle.deriveKey({ name: "ECDH", public: telPub }, m.kulcspar.privateKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const nyitott = JSON.parse(new TextDecoder().decode(
      await crypto.subtle.decrypt({ name: "AES-GCM", iv: b64bol(adat.iv) }, kozos, b64bol(adat.ct))));
    await belepesKulcsokkal(nyitott.bk, b64bol(nyitott.k));
    $("qr-panel").hidden = true;
    ertesit(t("qr_success"));
  } catch (e) {
    $("qr-allapot").textContent = e.message === "elutasitva" ? t("qr_denied") : t("qr_bad");
    $("qr-uj").hidden = false;
  }
}

function qrLeallit() {
  if (qrMunkamenet) clearInterval(qrMunkamenet.idozito);
  qrMunkamenet = null;
}

// Ha közben jelszóval lépett be, a QR várakozás leáll
function qrBelepesUtan() {
  qrLeallit();
  $("qr-panel").hidden = true;
}

$("qr-inditas").addEventListener("click", qrInditas);
$("qr-uj").addEventListener("click", qrInditas);
$("qr-vissza").addEventListener("click", () => {
  qrLeallit();
  $("qr-panel").hidden = true;
  $("belepes-urlap").hidden = !!titkositoKulcs;
  $("jelszo").focus();
});

/* ======================================================
   A TELEFONON: jóváhagyás
   ====================================================== */

async function qrJovahagyoMegnyit(resz) {
  const doboz = $("qr-jovahagyas");
  const [id, pubSzoveg] = resz.split(".");
  const uzenet = (kulcs, osztaly = "hiba") => {
    doboz.innerHTML = `<p class="${osztaly}"></p><a href="#/kezdolap" class="link"></a>`;
    doboz.firstChild.textContent = t(kulcs);
    doboz.lastChild.textContent = t("qr_go_home");
  };
  let gepPub, kod;
  try {
    if (!/^[0-9a-f-]{36}$/.test(id || "")) throw 0;
    const nyers = b64urlBol(pubSzoveg);
    gepPub = await crypto.subtle.importKey("raw", nyers, { name: "ECDH", namedCurve: "P-256" }, false, []);
    kod = await ellenorzoKod(nyers);
  } catch {
    return uzenet("qr_bad");
  }

  // 1. Ha ezen a telefonon még nincs belépve: jelszó
  if (!titkositoKulcs) {
    doboz.innerHTML = `
      <p class="halvany-szoveg"></p>
      <form class="qr-jelszo">
        <input type="password" required autocomplete="current-password">
        <button class="gomb fo teljes" type="submit"><span></span><span class="porgo" hidden></span></button>
        <p class="hiba"></p>
      </form>`;
    doboz.querySelector(".halvany-szoveg").textContent = t("qr_login_first");
    const input = doboz.querySelector("input");
    input.placeholder = t("password_ph");
    doboz.querySelector("button span").textContent = t("login");
    doboz.querySelector("form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const gomb = doboz.querySelector("button");
      gomb.disabled = true;
      gomb.querySelector(".porgo").hidden = false;
      try {
        await belepesKulcsokkal(await szamolBelepesiKulcs(input.value), input.value);
        qrJovahagyoMegnyit(resz);
      } catch (hiba) {
        belepesiKulcs = null;
        doboz.querySelector(".hiba").textContent = hiba.status ? hiba.message : t("no_server");
        gomb.disabled = false;
        gomb.querySelector(".porgo").hidden = true;
      }
    });
    setTimeout(() => input.focus(), 50);
    return;
  }

  // 2. Belépve: ellenőrző kód és jóváhagyás
  doboz.innerHTML = `
    <p class="halvany-szoveg"></p>
    <div class="qr-nagy-kod tabular"></div>
    <button class="gomb fo teljes qr-igen"></button>
    <button class="gomb masodlagos teljes qr-nem"></button>`;
  doboz.querySelector(".halvany-szoveg").textContent = t("qr_check");
  doboz.querySelector(".qr-nagy-kod").textContent = kod;
  doboz.querySelector(".qr-igen").textContent = t("qr_approve");
  doboz.querySelector(".qr-nem").textContent = t("qr_deny");

  const kuld = async (tartalom) => {
    doboz.querySelectorAll("button").forEach((b) => (b.disabled = true));
    try {
      await api("qr/" + id, { method: "POST", body: JSON.stringify(tartalom), headers: { "Content-Type": "application/json" } });
      return true;
    } catch (hiba) {
      ertesit(hiba.message, true);
      doboz.querySelectorAll("button").forEach((b) => (b.disabled = false));
      return false;
    }
  };

  doboz.querySelector(".qr-igen").addEventListener("click", async () => {
    const telKulcspar = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, false, ["deriveKey"]);
    const kozos = await crypto.subtle.deriveKey({ name: "ECDH", public: gepPub }, telKulcspar.privateKey, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, kozos,
      szovegbol(JSON.stringify({ bk: belepesiKulcs, k: b64(nyersKulcs) }))));
    const telPub = new Uint8Array(await crypto.subtle.exportKey("raw", telKulcspar.publicKey));
    if (await kuld({ pub: b64url(telPub), iv: b64(iv), ct: b64(ct) })) uzenet("qr_approved", "siker");
  });
  doboz.querySelector(".qr-nem").addEventListener("click", async () => {
    if (await kuld({ elutasitva: true })) uzenet("qr_denied", "halvany-szoveg");
  });
}

forditasHookok.push(() => {
  if (location.hash.startsWith("#/qr/")) qrJovahagyoMegnyit(location.hash.slice(5));
  qrAllapotKiir();
});
if (location.hash.startsWith("#/qr/")) qrJovahagyoMegnyit(location.hash.slice(5));
