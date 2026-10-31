/*
  IDŐJÁRÁS – Open-Meteo (ingyenes, regisztráció és kulcs nélkül, közvetlenül a böngészőből)
  A választott város a böngészőben marad. Alapból: HU → Budapest, SK → Pozsony, EN → London.
*/

const WX_ALAP = {
  hu: { nev: "Budapest", lat: 47.4979, lon: 19.0402 },
  sk: { nev: "Bratislava", lat: 48.1486, lon: 17.1077 },
  en: { nev: "London", lat: 51.5072, lon: -0.1276 },
};

// WMO időjárás-kódok → ikon + leírás
const WX_KODOK = [
  [[0], "☀️", { hu: "Derült", sk: "Jasno", en: "Clear" }],
  [[1], "🌤️", { hu: "Többnyire derült", sk: "Prevažne jasno", en: "Mainly clear" }],
  [[2], "⛅", { hu: "Részben felhős", sk: "Polojasno", en: "Partly cloudy" }],
  [[3], "☁️", { hu: "Borult", sk: "Zamračené", en: "Overcast" }],
  [[45, 48], "🌫️", { hu: "Köd", sk: "Hmla", en: "Fog" }],
  [[51, 53, 55], "🌦️", { hu: "Szitálás", sk: "Mrholenie", en: "Drizzle" }],
  [[56, 57], "🌧️", { hu: "Ónos szitálás", sk: "Mrznúce mrholenie", en: "Freezing drizzle" }],
  [[61, 63, 65], "🌧️", { hu: "Eső", sk: "Dážď", en: "Rain" }],
  [[66, 67], "🌧️", { hu: "Ónos eső", sk: "Mrznúci dážď", en: "Freezing rain" }],
  [[71, 73, 75, 77], "🌨️", { hu: "Havazás", sk: "Sneženie", en: "Snow" }],
  [[80, 81, 82], "🌦️", { hu: "Zápor", sk: "Prehánky", en: "Showers" }],
  [[85, 86], "🌨️", { hu: "Hózápor", sk: "Snehové prehánky", en: "Snow showers" }],
  [[95, 96, 99], "⛈️", { hu: "Zivatar", sk: "Búrka", en: "Thunderstorm" }],
];
function wxKod(kod, nappal = true) {
  const sor = WX_KODOK.find(([kodok]) => kodok.includes(kod)) || WX_KODOK[3];
  const ikon = !nappal && kod <= 1 ? "🌙" : sor[1];
  return { ikon, leiras: sor[2][nyelv] };
}

let wxVaros = null;
try { wxVaros = JSON.parse(localStorage.getItem("varos") || "null"); } catch {}
let wxAdat = null, wxHiba = false;

const aktivVaros = () => wxVaros || WX_ALAP[nyelv];

async function idojarasBetolt() {
  const v = aktivVaros();
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${v.lat}&longitude=${v.lon}` +
    "&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,is_day" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=4";
  try {
    const r = await fetch(url);
    if (!r.ok) throw new Error(r.status);
    wxAdat = await r.json();
    wxAdat.varosNev = v.nev;
    wxHiba = false;
  } catch {
    wxHiba = true;
  }
  idojarasRajzol();
}

function idojarasRajzol() {
  const doboz = $("wx-tartalom");
  const chip = $("sav-idojaras");
  if (!wxAdat || wxAdat.varosNev !== aktivVaros().nev) {
    doboz.innerHTML = `<p class="halvany-szoveg"></p>`;
    doboz.firstChild.textContent = wxHiba ? t("wx_error") : t("fx_loading");
    chip.hidden = true;
    return;
  }
  const c = wxAdat.current;
  const most = wxKod(c.weather_code, c.is_day === 1);
  const fok = (x) => Math.round(x) + "°";

  doboz.innerHTML = `
    <div class="wx-most">
      <div class="wx-ikon"></div>
      <div class="wx-fok tabular"></div>
      <div class="wx-adatok"><strong></strong><span></span><span class="halvany-szoveg"></span></div>
    </div>
    <div class="wx-napok"></div>`;
  doboz.querySelector(".wx-ikon").textContent = most.ikon;
  doboz.querySelector(".wx-fok").textContent = fok(c.temperature_2m);
  doboz.querySelector(".wx-adatok strong").textContent = wxAdat.varosNev;
  doboz.querySelector(".wx-adatok span").textContent = most.leiras;
  doboz.querySelector(".wx-adatok .halvany-szoveg").textContent =
    `${t("wx_feels")} ${fok(c.apparent_temperature)} · ${t("wx_wind")} ${Math.round(c.wind_speed_10m)} km/h`;

  const napok = doboz.querySelector(".wx-napok");
  wxAdat.daily.time.slice(1, 4).forEach((nap, i) => {
    const k = wxKod(wxAdat.daily.weather_code[i + 1]);
    const d = new Date(nap + "T12:00:00");
    const el = document.createElement("div");
    el.className = "wx-nap";
    el.title = k.leiras;
    el.innerHTML = `<span></span><b></b><span class="tabular"></span>`;
    el.children[0].textContent = d.toLocaleDateString(locale(), { weekday: "short" }).replace(".", "");
    el.children[1].textContent = k.ikon;
    el.children[2].innerHTML = `<strong></strong> <em></em>`;
    el.children[2].firstChild.textContent = fok(wxAdat.daily.temperature_2m_max[i + 1]);
    el.children[2].lastChild.textContent = fok(wxAdat.daily.temperature_2m_min[i + 1]);
    napok.appendChild(el);
  });

  chip.hidden = false;
  chip.textContent = `${most.ikon} ${fok(c.temperature_2m)} ${wxAdat.varosNev}`;
  chip.title = most.leiras;
}

/* ---------- Városválasztó ---------- */
$("wx-valt").addEventListener("click", () => {
  $("wx-kereso").hidden = !$("wx-kereso").hidden;
  if (!$("wx-kereso").hidden) $("wx-varos").focus();
});

let wxKeresIdozito;
$("wx-varos").addEventListener("input", () => {
  clearTimeout(wxKeresIdozito);
  const nev = $("wx-varos").value.trim();
  if (nev.length < 2) { $("wx-talalatok").innerHTML = ""; return; }
  wxKeresIdozito = setTimeout(async () => {
    try {
      const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nev)}&count=6&language=${nyelv}&format=json`);
      const adat = await r.json();
      const lista = $("wx-talalatok");
      lista.innerHTML = "";
      if (!adat.results?.length) {
        const li = document.createElement("li");
        li.className = "halvany-szoveg";
        li.textContent = t("wx_not_found");
        lista.appendChild(li);
        return;
      }
      for (const v of adat.results) {
        const li = document.createElement("li");
        const gomb = document.createElement("button");
        gomb.type = "button";
        gomb.textContent = [v.name, v.admin1, v.country_code].filter(Boolean).join(", ");
        gomb.addEventListener("click", () => varosBeallit({ nev: v.name, lat: v.latitude, lon: v.longitude }));
        li.appendChild(gomb);
        lista.appendChild(li);
      }
    } catch {
      ertesit(t("wx_error"), true);
    }
  }, 350);
});

$("wx-hely").addEventListener("click", () => {
  if (!navigator.geolocation) return ertesit(t("wx_error"), true);
  navigator.geolocation.getCurrentPosition(
    (p) => varosBeallit({ nev: t("wx_my_location").replace(/^\S+\s/, ""), lat: +p.coords.latitude.toFixed(3), lon: +p.coords.longitude.toFixed(3) }),
    () => ertesit(t("wx_error"), true),
    { timeout: 10000 }
  );
});

function varosBeallit(v) {
  wxVaros = v;
  try { localStorage.setItem("varos", JSON.stringify(v)); } catch {}
  $("wx-kereso").hidden = true;
  $("wx-varos").value = "";
  $("wx-talalatok").innerHTML = "";
  wxAdat = null;
  idojarasRajzol();
  idojarasBetolt();
}

// Nyelvváltáskor: ha nincs saját város, az alapértelmezett város is változik
forditasHookok.push(() => {
  if (!wxVaros && wxAdat && wxAdat.varosNev !== aktivVaros().nev) idojarasBetolt();
  idojarasRajzol();
});

idojarasBetolt();
setInterval(idojarasBetolt, 30 * 60 * 1000); // félóránként frissül
