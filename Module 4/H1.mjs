class Persoon {
  constructor(naam, email, leeftijd) {
    this.naam = naam;
    this.email = email;
    this.leeftijd = leeftijd;
  }

  get email() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(this._email) ? this._email : 'Ongeldig email';
  }

  set email(value) {
    this._email = value;
  }
}

class Student extends Persoon {
  constructor(naam, email, leeftijd, studentnummer, studiejaar) {
    super(naam, email, leeftijd);
    this.studentnummer = studentnummer;
    this.studiejaar = studiejaar;
    this.inschrijvingen = [];
  }

  schrijfIn(cursus) {
    if (this.inschrijvingen.includes(cursus)) {
      console.log(`${this.naam} is al ingeschreven voor de cursus: ${cursus.titel}`);
      return false;
    }
    if (cursus.studenten.length < cursus.maximumStudenten) {
      cursus.voegInschrijvingToe(this);
      this.inschrijvingen.push(cursus);
      console.log(`${this.naam} is succesvol ingeschreven voor de cursus: ${cursus.titel}`);
      return true;
    }
    console.log(`Er zijn geen beschikbare plaatsen in de cursus: ${cursus.titel}`);
    return false;
  }

  voegBeoordelingToe(cursus, beoordeling) {
    const inschrijving = this.inschrijvingen.find(i => i === cursus);
    if (inschrijving) {
      inschrijving.voegBeoordelingToe(beoordeling);
      console.log(`Beoordeling toegevoegd voor cursus: ${cursus.titel}`);
    } else {
      console.log(`${this.naam} is niet ingeschreven voor deze cursus.`);
    }
  }
}


class Docent extends Persoon {
  constructor(naam, email, leeftijd, vakgebied, aanstellingsdatum) {
    super(naam, email, leeftijd);
    this.vakgebied = vakgebied;
    this.aanstellingsdatum = aanstellingsdatum;
  }
}


class Cursus {
  constructor(titel, beschrijving, docent, ects, maximumStudenten) {
    this.titel = titel;
    this.beschrijving = beschrijving;
    this.docent = docent;
    this.ects = ects;
    this.maximumStudenten = maximumStudenten;
    this.studenten = [];
    this.inschrijvingen = [];
  }


  voegInschrijvingToe(student) {
    if (this.studenten.length < this.maximumStudenten) {
      this.studenten.push(student);
      this.inschrijvingen.push(new Inschrijving(student, this));
      return true;
    }
    return false;
  }

 
  toonCursusDetails() {
    return `${this.titel} - Docent: ${this.docent.naam} - ECTS: ${this.ects}`;
  }
}


class Inschrijving {
  constructor(student, cursus) {
    this.student = student;
    this.cursus = cursus;
    this.datum = new Date();
    this.status = 'actief';
    this.beoordeling = null;  
  }

  wijzigStatus(nieuweStatus) {
    this.status = nieuweStatus;
  }

  voegBeoordelingToe(beoordeling) {
    this.beoordeling = beoordeling;
  }
}


let docent1 = new Docent('Dr. Anna van der Meer', 'anna@docent.nl', 45, 'Informatica', '2010-09-01');
let student1 = new Student('John Doe', 'john.doe@student.nl', 21, 'S12345', 2);
let cursus1 = new Cursus('Introductie Informatica', 'Leer de basisprincipes van informatica', docent1, 6, 30);


const updateUI = () => {
  
  const courseListDiv = document.getElementById('course-list');
  courseListDiv.innerHTML = `<h3>Cursussen</h3><ul>${[cursus1].map(cursus => `<li>${cursus.toonCursusDetails()}</li>`).join('')}</ul>`;

 
  const studentListDiv = document.getElementById('student-list');
  studentListDiv.innerHTML = `<h3>Studenten</h3><ul>${[student1].map(student => `<li>${student.naam} - ${student.studiejaar}e jaar</li>`).join('')}</ul>`;


  const teacherListDiv = document.getElementById('teacher-list');
  teacherListDiv.innerHTML = `<h3>Docenten</h3><ul>${[docent1].map(docent => `<li>${docent.naam} - Vakgebied: ${docent.vakgebied}</li>`).join('')}</ul>`;


  const enrollmentListDiv = document.getElementById('enrollment-list');
  const inschrijvingen = cursus1.inschrijvingen.map(i => {
    return `<li>${i.student.naam} - Cursus: ${i.cursus.titel} - Status: ${i.status}</li>`;
  }).join('');
  enrollmentListDiv.innerHTML = `<h3>Inschrijvingen</h3><ul>${inschrijvingen}</ul>`;
};

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tabContents.forEach(tc => tc.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

  updateUI();
});

student1.schrijfIn(cursus1);  
student1.voegBeoordelingToe(cursus1, 8);  
