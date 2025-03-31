class Bankrekening {
  static rekeningNrGenerator() {
    return 'NL' + Math.floor(Math.random() * 1000000000).toString().padStart(10, '0');
  }

  constructor(eigenaar, saldo) {
    this._rekeningNr = Bankrekening.rekeningNrGenerator(); 
    this._eigenaar = eigenaar;
    this._saldo = saldo >= 0 ? saldo : 0;
  }

  get rekeningNr() { return this._rekeningNr; }
  get eigenaar() { return this._eigenaar; }
  get saldo() { return this._saldo; }

  set saldo(value) {
    if (value >= 0) {
      this._saldo = value;
    }
  }

  storten(bedrag) {
    if (bedrag > 0) {
      this._saldo += bedrag;
      return `€${bedrag} succesvol gestort op rekening ${this.rekeningNr}. Huidig saldo: €${this._saldo}`;
    }
    return "Stortingsbedrag moet groter zijn dan 0.";
}

opnemen(bedrag) {
    if (bedrag > 0 && bedrag <= this._saldo) {
      this._saldo -= bedrag;
      return `€${bedrag} succesvol opgenomen van rekening ${this.rekeningNr}. Huidig saldo: €${this._saldo}`;
    }
    return "Opname mislukt: onvoldoende saldo of ongeldige opnamebedrag.";
}


  static validerenTransactie(from, to, bedrag) {
    return from.saldo >= bedrag && bedrag > 0;
  }
}

class Spaarrekening extends Bankrekening {
  constructor(eigenaar, saldo, rentePercentage) {
    super(eigenaar, saldo);
    this._rentePercentage = rentePercentage;
  }

  renteToevoegen() {
    const renteBedrag = (this._saldo * this._rentePercentage) / 100;
    this._saldo += renteBedrag;
    return `Rente van ${this._rentePercentage}% toegevoegd. Huidig saldo: €${this._saldo.toFixed(2)}`;
  }
}

let rekening1 = new Bankrekening("Jan de Vries", 500);
let rekening2 = new Spaarrekening("Marie Jansen", 1000, 3);
let rekening3 = new Bankrekening("Klaas Peters", 200);

let transacties = [];

transacties.push(rekening1.storten(200));
transacties.push(rekening2.renteToevoegen());
transacties.push(rekening3.opnemen(50));
transacties.push(rekening1.opnemen(700));
transacties.push(rekening2.storten(300));

const updateAccountsTable = () => {
  const accountsDiv = document.getElementById("accounts");
  accountsDiv.innerHTML = ""; 

  const accountsTable = document.createElement("table");
  accountsTable.innerHTML = `
    <thead>
      <tr>
        <th>Rekeningnummer</th>
        <th>Eigenaar</th>
        <th>Saldo</th>
      </tr>
    </thead>
    <tbody>
      ${[rekening1, rekening2, rekening3].map(rekening => `
        <tr>
          <td>${rekening.rekeningNr}</td>
          <td>${rekening.eigenaar}</td>
          <td>€${rekening.saldo}</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  accountsDiv.appendChild(accountsTable);
};

const updateTransactions = () => {
  const transactionsDiv = document.getElementById("transactions");
  transactionsDiv.innerHTML = "";

  const ul = document.createElement("ul");

  transacties.forEach(transactie => {
    const li = document.createElement("li");
    li.textContent = transactie;
    ul.appendChild(li);
  });

  transactionsDiv.appendChild(ul);
};

document.addEventListener("DOMContentLoaded", () => {
  updateAccountsTable();
  updateTransactions();
});