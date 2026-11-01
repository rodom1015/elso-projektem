/*
  IDŐJÁRÁS – Open-Meteo (ingyenes, regisztráció és kulcs nélkül, közvetlenül a böngészőből)
  Nagy kártya a kezdőlapon: most + részletek, óránkénti grafikon (24 óra), 7 napos előrejelzés.
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
const fok = (x) => Math.round(x) + "°";
const oraPercbol = (iso) => iso.slice(11, 16);

async function idojarasBetolt() {
  const v = aktivVaros();
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${v.lat}&longitude=${v.lon}` +
    "&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,is_day" +
    "&hourly=temperature_2m,precipitation_probability,weather_code,is_day" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max" +
    "&timezone=auto&forecast_days=7";
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
  const mini = $("nyito-idojaras");
  if (!wxAdat || wxAdat.varosNev !== aktivVaros().nev) {
    doboz.innerHTML = `<p class="halvany-szoveg"></p>`;
    doboz.firstChild.textContent = wxHiba ? t("wx_error") : t("fx_loading");
    chip.hidden = true;
    mini.hidden = true;
    return;
  }
  const c = wxAdat.current, d = wxAdat.daily, h = wxAdat.hourly;
  const most = wxKod(c.weather_code, c.is_day === 1);

  doboz.innerHTML = `
    <div class="wx-fo">
      <div class="wx-most-nagy">
        <div class="wx-ikon-nagy"></div>
        <div>
          <div class="wx-fok-nagy tabular"></div>
          <div class="wx-leiras"></div>
          <div class="wx-varos-nev"></div>
        </div>
      </div>
      <div class="wx-reszletek"></div>
    </div>
    <div class="wx-blokk"><h3></h3><div class="wx-orak"></div></div>
    <div class="wx-blokk"><h3></h3><div class="wx-het"></div></div>`;
  doboz.querySelector(".wx-ikon-nagy").textContent = most.ikon;
  doboz.querySelector(".wx-fok-nagy").textContent = fok(c.temperature_2m);
  doboz.querySelector(".wx-leiras").textContent = `${most.leiras} · ${t("wx_feels")} ${fok(c.apparent_temperature)}`;
  doboz.querySelector(".wx-varos-nev").textContent = "📍 " + wxAdat.varosNev;

  // Részletek
  const reszletek = [
    ["💧", t("wx_humidity"), Math.round(c.relative_humidity_2m) + " %"],
    ["💨", t("wx_wind"), Math.round(c.wind_speed_10m) + " km/h"],
    ["☔", t("wx_rain"), (d.precipitation_probability_max[0] ?? 0) + " %"],
    ["🔆", t("wx_uv"), Math.round(d.uv_index_max[0] ?? 0)],
    ["🌅", t("wx_sunrise"), oraPercbol(d.sunrise[0])],
    ["🌇", t("wx_sunset"), oraPercbol(d.sunset[0])],
  ];
  const rDoboz = doboz.querySelector(".wx-reszletek");
  for (const [ikon, cimke, ertek] of reszletek) {
    const el = document.createElement("div");
    el.innerHTML = `<span class="wx-r-ikon"></span><span class="wx-r-cimke"></span><strong class="tabular"></strong>`;
    el.children[0].textContent = ikon;
    el.children[1].textContent = cimke;
    el.children[2].textContent = ertek;
    rDoboz.appendChild(el);
  }

  // Óránkénti grafikon: a következő 24 óra
  doboz.querySelectorAll(".wx-blokk h3")[0].textContent = t("wx_hourly");
  const kezdo = Math.max(0, h.time.findIndex((x) => x >= c.time.slice(0, 13)));
  const orak = h.time.slice(kezdo, kezdo + 24).map((ido, i) => ({
    ora: ido.slice(11, 13), fok: h.temperature_2m[kezdo + i], eso: h.precipitation_probability[kezdo + i] ?? 0,
    kod: h.weather_code[kezdo + i], nappal: h.is_day[kezdo + i] === 1,
  }));
  doboz.querySelector(".wx-orak").appendChild(oraGrafikon(orak));

  // 7 napos előrejelzés, a hőmérséklet-tartomány sávként
  doboz.querySelectorAll(".wx-blokk h3")[1].textContent = t("wx_week");
  const hetMin = Math.min(...d.temperature_2m_min), hetMax = Math.max(...d.temperature_2m_max);
  const terj = Math.max(1, hetMax - hetMin);
  const het = doboz.querySelector(".wx-het");
  d.time.forEach((nap, i) => {
    const k = wxKod(d.weather_code[i]);
    const datum = new Date(nap + "T12:00:00");
    const sor = document.createElement("div");
    sor.className = "wx-nap-sor";
    sor.title = k.leiras;
    sor.innerHTML = `<span class="wx-nap-nev"></span><span class="wx-nap-ikon"></span><span class="wx-nap-eso"></span>
      <span class="wx-min tabular"></span><div class="wx-tartomany"><div></div></div><span class="wx-max tabular"></span>`;
    sor.querySelector(".wx-nap-nev").textContent = i === 0 ? t("wx_today") : datum.toLocaleDateString(locale(), { weekday: "short", day: "numeric" }).replace(".", "");
    sor.querySelector(".wx-nap-ikon").textContent = k.ikon;
    sor.querySelector(".wx-nap-eso").textContent = (d.precipitation_probability_max[i] ?? 0) >= 20 ? "💧" + d.precipitation_probability_max[i] + "%" : "";
    sor.querySelector(".wx-min").textContent = fok(d.temperature_2m_min[i]);
    sor.querySelector(".wx-max").textContent = fok(d.temperature_2m_max[i]);
    const sav = sor.querySelector(".wx-tartomany div");
    sav.style.left = ((d.temperature_2m_min[i] - hetMin) / terj * 100) + "%";
    sav.style.width = Math.max(4, (d.temperature_2m_max[i] - d.temperature_2m_min[i]) / terj * 100) + "%";
    het.appendChild(sor);
  });

  // Kis jelzés a felső sávban és a nyitóképen
  chip.hidden = false;
  chip.textContent = `${most.ikon} ${fok(c.temperature_2m)} ${wxAdat.varosNev}`;
  chip.title = most.leiras;
  mini.hidden = false;
  mini.innerHTML = `<span class="mini-ikon"></span><span><strong class="tabular"></strong><small></small></span>`;
  mini.querySelector(".mini-ikon").textContent = most.ikon;
  mini.querySelector("strong").textContent = fok(c.temperature_2m);
  mini.querySelector("small").textContent = `${wxAdat.varosNev} · ${fok(d.temperature_2m_max[0])} / ${fok(d.temperature_2m_min[0])}`;
}

// SVG grafikon: hőmérséklet-görbe + eső esélye oszlopként, 3 óránként felirattal
function oraGrafikon(orak) {
  const W = 720, H = 170, felso = 34, also = 34, n = orak.length;
  const min = Math.min(...orak.map((o) => o.fok)), max = Math.max(...orak.map((o) => o.fok));
  const x = (i) => 18 + i * ((W - 36) / Math.max(1, n - 1));
  const y = (f) => felso + (max === min ? 0.5 : (max - f) / (max - min)) * (H - felso - also - 20);
  const pontok = orak.map((o, i) => `${x(i).toFixed(1)},${y(o.fok).toFixed(1)}`).join(" ");
  let svg = `<svg viewBox="0 0 ${W} ${H}" class="wx-grafikon" role="img">
    <defs><linearGradient id="wxszin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f59e0b" stop-opacity=".35"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></linearGradient></defs>`;
  orak.forEach((o, i) => {   // eső oszlopok alul
    const mag = o.eso / 100 * 26;
    if (mag > 0) svg += `<rect x="${x(i) - 6}" y="${H - also - mag + 6}" width="12" height="${mag}" rx="3" fill="#3b82f6" opacity=".45"/>`;
  });
  svg += `<polygon points="${x(0)},${H - also} ${pontok} ${x(n - 1)},${H - also}" fill="url(#wxszin)"/>
    <polyline points="${pontok}" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`;
  orak.forEach((o, i) => {
    if (i % 3 !== 0) return;
    svg += `<circle cx="${x(i)}" cy="${y(o.fok)}" r="4" fill="#f59e0b" stroke="var(--kartya)" stroke-width="2"/>
      <text x="${x(i)}" y="${y(o.fok) - 12}" text-anchor="middle" class="wx-g-fok">${Math.round(o.fok)}°</text>
      <text x="${x(i)}" y="${H - 8}" text-anchor="middle" class="wx-g-ora">${o.ora}:00</text>
      <text x="${x(i)}" y="${H - also + 2}" text-anchor="middle" class="wx-g-ikon">${wxKod(o.kod, o.nappal).ikon}</text>`;
  });
  svg += "</svg>";
  const div = document.createElement("div");
  div.className = "wx-grafikon-doboz";
  div.innerHTML = svg;
  return div;
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

$("nyito-idojaras").addEventListener("click", (e) => {
  e.preventDefault();
  $("idojaras-kartya").scrollIntoView({ behavior: "smooth", block: "start" });
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
