class Student {
    constructor(naam, vakken) {
      this.naam = naam;
      this.vakken = vakken;
    }
  
    voegPuntToe(vak, punt) {
      if (this.vakken[vak]) {
        this.vakken[vak].push(punt);
      } else {
        this.vakken[vak] = [punt];
      }
    }
  
    gemiddelde() {
      let totaalPunten = 0, aantalPunten = 0;
      for (let vak in this.vakken) {
        totaalPunten += this.vakken[vak].reduce((a, b) => a + b, 0);
        aantalPunten += this.vakken[vak].length;
      }
      return totaalPunten / aantalPunten;
    }
  
    toonRapport() {
      let rapport = `Rapport van ${this.naam}:\n`;
      for (let vak in this.vakken) {
        rapport += `${vak}: ${this.vakken[vak].join(', ')}\n`;
      }
      rapport += `Gemiddeld: ${this.gemiddelde().toFixed(2)}`;
      return rapport;
    }
  }
  
  let student1 = new Student("Damian", { Wiskunde: [9], Engels: [7], Biologie: [4], Geschiedenis: [5] });
  let student2 = new Student("Didier", { Wiskunde: [7], Engels: [6], Biologie: [9], Geschiedenis: [7] });
  

  
  document.getElementById("output").innerText = student1.toonRapport() + "\n\n" + student2.toonRapport();
  