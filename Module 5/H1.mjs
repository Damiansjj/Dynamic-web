function wacht(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function verlichtBlok(blok) {
    const origineleKleur = blok.style.backgroundColor;
    blok.style.backgroundColor = 'white'; 
    await wacht(500); 
    blok.style.backgroundColor = origineleKleur; 
  }
  
  async function startLichtshow() {
    const blokken = document.querySelectorAll('.block');
    
    for (let blok of blokken) {
      await verlichtBlok(blok);
    }
    
    await wacht(500);
    
    for (let i = blokken.length - 1; i >= 0; i--) {
      await verlichtBlok(blokken[i]);
    }
  }
  
  document.getElementById('startBtn').addEventListener('click', startLichtshow);
  