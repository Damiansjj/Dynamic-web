'use strict';

const cursussen = [];
const studenten = [];

const $ = id => document.getElementById(id); 

$('addCourse').addEventListener('click', () => {
    const titel = $('courseTitle').value.trim();
    const beschrijving = $('courseDesc').value.trim();
    if (!titel || !beschrijving) return alert('Vul titel en beschrijving in!');
    
    cursussen.push({ titel, beschrijving, studenten: [] });
    updateCursusLijst();
    $('courseTitle').value = $('courseDesc').value = '';
});

function updateCursusLijst() {
    $('courseList').innerHTML = cursussen.map(c => `<p>${c.titel}: ${c.beschrijving}</p>`).join('');
    $('coursePicker').innerHTML = cursussen.map(c => `<option>${c.titel}</option>`).join('');
}

$('enrollStudent').addEventListener('click', () => {
    const naam = $('studentName').value.trim();
    const cursus = $('coursePicker').value;
    if (!naam || !cursus) return alert('Vul een naam in en kies een cursus!');

    let student = studenten.find(s => s.naam === naam);
    if (!student) {
        student = { naam, scores: {} };
        studenten.push(student);
        updateStudentLijst();
    }
    
    student.scores[cursus] = student.scores[cursus] || [];
    $('studentName').value = '';
});

function updateStudentLijst() {
    $('studentList').innerHTML = studenten.map(s => `<p>${s.naam}</p>`).join('');
    $('studentPicker').innerHTML = $('reportStudent').innerHTML =
        studenten.map(s => `<option>${s.naam}</option>`).join('');
}

$('addGrade').addEventListener('click', () => {
    const studentNaam = $('studentPicker').value;
    const cursus = $('coursePicker').value;
    const score = Number($('moduleGrade').value);
    
    if (!studentNaam || !cursus || isNaN(score) || score < 0 || score > 100) {
        return alert('Vul een geldige score in (0-100)!');
    }

    const student = studenten.find(s => s.naam === studentNaam);
    student.scores[cursus].push(score);
    $('moduleGrade').value = '';
});

$('generateReport').addEventListener('click', () => {
    const studentNaam = $('reportStudent').value;
    const student = studenten.find(s => s.naam === studentNaam);
    
    let rapport = `<h4>Rapport voor ${studentNaam}</h4>`;
    for (const [cursus, scores] of Object.entries(student.scores)) {
        const gemiddelde = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 'Geen scores';
        rapport += `<p>${cursus}: Gemiddelde Score - ${gemiddelde}</p>`;
    }
    $('reportOutput').innerHTML = rapport;
});
