class Voertuig {
    constructor(merk, model, jaar, verhuurPrijs, beschikbaar) {
      this.merk = merk;
      this.model = model;
      this.jaar = jaar;
      this.verhuurPrijs = verhuurPrijs;
      this.beschikbaar = beschikbaar;
    }
  
    verhuur = () => {
      if (this.beschikbaar) {
        this.beschikbaar = false;
        return `${this.merk} ${this.model} is verhuurd.`;
      }
      return `${this.merk} ${this.model} is al verhuurd.`;
    }
  
    retourneer = () => {
      this.beschikbaar = true;
      return `${this.merk} ${this.model} is geretourneerd.`;
    }
  }
  
  class Auto extends Voertuig {
    constructor(merk, model, jaar, verhuurPrijs, beschikbaar, aantalDeuren, brandstofType) {
      super(merk, model, jaar, verhuurPrijs, beschikbaar);
      this.aantalDeuren = aantalDeuren;
      this.brandstofType = brandstofType;
    }
  
    verhuur = () => {
      if (this.beschikbaar) {
        this.beschikbaar = false;
        return `${this.merk} ${this.model} auto met ${this.aantalDeuren} deuren en brandstoftype ${this.brandstofType} is verhuurd.`;
      }
      return `${this.merk} ${this.model} auto is al verhuurd.`;
    }
  }
  
  class Motor extends Voertuig {
    constructor(merk, model, jaar, verhuurPrijs, beschikbaar, cilinderinhoud, type) {
      super(merk, model, jaar, verhuurPrijs, beschikbaar);
      this.cilinderinhoud = cilinderinhoud;
      this.type = type;
    }
  
    verhuur = () => {
      if (this.beschikbaar) {
        this.beschikbaar = false;
        return `${this.merk} ${this.model} motor met ${this.cilinderinhoud}cc cilinderinhoud en type ${this.type} is verhuurd.`;
      }
      return `${this.merk} ${this.model} motor is al verhuurd.`;
    }
  }
  
  let voertuigen = [
    new Auto("Citroën", "Berlingo", 2020, 50, true, 4, "Benzine"),
    new Auto("BMW", "R5", 2021, 100, true, 5, "Diesel"),
    new Motor("Yamaha", "R1", 2022, 75, true, 998, "Sport"),
    new Motor("Mercedes", "AMG", 2019, 60, true, 883, "Benzine"),
  ];
  
  const updateTable = () => {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    
    voertuigen.forEach(voertuig => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${voertuig.merk}</td>
        <td>${voertuig.model}</td>
        <td>${voertuig.jaar}</td>
        <td>€${voertuig.verhuurPrijs}</td>
        <td class="${voertuig.beschikbaar ? '' : 'verhuurd'}">${voertuig.beschikbaar ? 'Beschikbaar' : 'Verhuurd'}</td>
        <td>
          <button onclick="verhuur(${voertuigen.indexOf(voertuig)})">Verhuur</button>
          <button onclick="retourneer(${voertuigen.indexOf(voertuig)})">Retourneer</button>
        </td>
      `;
      
      outputDiv.appendChild(row);
    });
  }
  
  const verhuur = (index) => {
    const voertuig = voertuigen[index];
    alert(voertuig.verhuur());
    updateTable();
  }
  
  const retourneer = (index) => {
    const voertuig = voertuigen[index];
    alert(voertuig.retourneer());
    updateTable();
  }
  
  updateTable();
  