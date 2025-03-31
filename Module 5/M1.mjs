const images = [
  'https://picsum.photos/200/200?random=1',
  'https://picsum.photos/200/200?random=2',
  'https://picsum.photos/200/200?random=3'
];

document.getElementById("loadButton").addEventListener("click", () => {
  loadImages();
});

function loadImages() {
  let progress = 0;
  const progressBar = document.querySelector(".progress-bar");
  const gallery = document.querySelector(".gallery");

  // Reset de galerij en voortgangsbalk voor elke nieuwe poging
  gallery.innerHTML = '';
  progressBar.style.width = '0%';
  progressBar.textContent = '0%';

  // Laad elke afbeelding één voor één
  images.reduce((promise, imageUrl, index) => {
    return promise.then(() => {
      return loadImage(imageUrl).then(img => {
        gallery.appendChild(img); // Voeg afbeelding toe aan galerij
        progress += 33.33; // Aangezien we 3 afbeeldingen hebben, wordt elke afbeelding 33.33% van de voortgang
        progressBar.style.width = `${progress}%`; // Update de voortgangsbalk
        progressBar.textContent = `${Math.round(progress)}%`; // Toon percentage in de voortgangsbalk
      });
    });
  }, Promise.resolve()).then(() => {
    console.log('Alle afbeeldingen zijn geladen');
  });
}

// Functie om de afbeelding te laden
function loadImage(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => resolve(img); // Wanneer de afbeelding geladen is, resolve de Promise
    img.onerror = () => console.error('Fout bij het laden van de afbeelding: ' + imageUrl); // Foutafhandelaar
  });
}
