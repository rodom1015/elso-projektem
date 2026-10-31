/*
  JavaScript - ez a 2. lecke témája lesz.
  Most még csak annyit csinál, hogy a gombnyomásra kiír egy üzenetet,
  hogy lásd: a gombok "élnek".
*/

// Megkeressük a gombot az id-ja alapján (lásd index.html: id="feltolt-gomb")
const feltoltGomb = document.getElementById("feltolt-gomb");
const feltoltUzenet = document.getElementById("feltolt-uzenet");

// Ha rákattintanak, lefut ez a függvény
feltoltGomb.addEventListener("click", function () {
  const fajl = document.getElementById("fajl").files[0];

  if (!fajl) {
    feltoltUzenet.textContent = "⚠️ Előbb válassz ki egy fájlt!";
  } else {
    feltoltUzenet.textContent = "✅ Kiválasztva: " + fajl.name + " (a feltöltés a 3. leckében jön)";
  }
});

document.getElementById("lista-gomb").addEventListener("click", function () {
  alert("A letöltés a 3. leckében készül el 🙂");
});
