/*
  SERVICE WORKER – ettől lesz az oldal telepíthető alkalmazás, és offline is megnyílik.
  - Az oldal fájljait (HTML, CSS, JS, ikonok) elmenti a böngészőbe.
  - Mindig a friss változatot kéri le először; ha nincs internet, a mentettet használja.
  - Az /api/ kéréseket (fájlok, árfolyam) SOHA nem menti el – azok mindig a szerverről jönnek.
*/
const GYORSITOTAR = "rodom-v6";
const ALAP_FAJLOK = [
  "/", "/style.css", "/app.js", "/i18n.js", "/excel-adatok.js", "/word-adatok.js", "/word-makrok.js", "/powerquery.js", "/pq-oldal.js", "/unnepnapok.js", "/makrok.js",
  "/kalkulator.js", "/tema.js", "/idojaras.js", "/megosztas.js", "/eszkozok.js", "/paletta.js", "/qr.js", "/uzenofal.js",
  "/vendor/qrcode-1.4.4.js", "/vendor/xlsx-0.18.5.full.min.js", "/manifest.webmanifest",
  "/ikonok/ikon-192.png", "/ikonok/ikon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(GYORSITOTAR).then((c) => c.addAll(ALAP_FAJLOK)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((nevek) => Promise.all(nevek.filter((n) => n !== GYORSITOTAR).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin || url.pathname.startsWith("/api/")) return;
  e.respondWith(
    fetch(e.request)
      .then((valasz) => {
        if (valasz.ok) {
          const masolat = valasz.clone();
          caches.open(GYORSITOTAR).then((c) => c.put(e.request, masolat));
        }
        return valasz;
      })
      .catch(() => caches.match(e.request).then((m) => m || (e.request.mode === "navigate" ? caches.match("/") : undefined)))
  );
});
