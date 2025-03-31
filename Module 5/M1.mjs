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

  gallery.innerHTML = '';
  progressBar.style.width = '0%';
  progressBar.textContent = '0%';

  
  images.reduce((promise, imageUrl, index) => {
    return promise.then(() => {
      return loadImage(imageUrl).then(img => {
        gallery.appendChild(img); 
        progress += 33.33; 
        progressBar.style.width = `${progress}%`; 
        progressBar.textContent = `${Math.round(progress)}%`; 
      });
    });
  }, Promise.resolve()).then(() => {
    console.log('Alle afbeeldingen zijn geladen');
  });
}


function loadImage(imageUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => resolve(img); 
    img.onerror = () => console.error('Fout bij het laden van de afbeelding: ' + imageUrl); 
  });
}
