class Product {
    constructor(naam, prijs, voorraad) {
      this.naam = naam;
      this._prijs = prijs;  
      this._voorraad = voorraad;  
    }
  
    set prijs(value) {
      if (value >= 0) {
        this._prijs = value;
      }
    }
  
    get prijs() {
      return this._prijs;
    }
  
    set voorraad(value) {
      if (value >= 0) {
        this._voorraad = value;
      }
    }
  
    get voorraad() {
      return this._voorraad;
    }
  
    get verkoopprijs() {
      return this._prijs * 1.21;
    }
  
    get beschikbaar() {
      return this._voorraad > 0;
    }
  }
  
  let product1 = new Product("Laptop", 800, 5);
  let product2 = new Product("Smartphone", 500, 0);
  let product3 = new Product("Koptelefoon", 100, 15);
  
  let outputText = "";
  let producten = [product1, product2, product3];
  
  producten.forEach(product => {
    outputText += `${product.naam}:\n`;
    outputText += `Prijs: €${product.prijs}\n`;
    outputText += `Verkoopprijs: €${product.verkoopprijs.toFixed(2)}\n`;
    outputText += `Beschikbaar: ${product.beschikbaar ? "Ja" : "Nee"}\n\n`;
  });
  
  document.getElementById("output").innerText = outputText;
  