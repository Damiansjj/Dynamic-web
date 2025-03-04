'use strict';

const studenten = {
    Alex: { cijfers: [] },
    Sam: { cijfers: [] },
    Jo: { cijfers: [] }
};

document.getElementById('addGrade').addEventListener('click', function () {
    const studentNaam = document.getElementById('student').value;
    const vakNaam = document.getElementById('course').value.trim();
    const cijfer = Number(document.getElementById('grade').value);

    if (!vakNaam || cijfer < 0 || cijfer > 20 || isNaN(cijfer)) {
        alert('Vul een geldige vaknaam in en een cijfer tussen 0 en 20!');
        return;
    }

    studenten[studentNaam].cijfers.push({ vak: vakNaam, cijfer });
    updateOverzicht();
    document.getElementById('course').value = '';
    document.getElementById('grade').value = '';
});

function updateOverzicht() {
    let overzichtHTML = '';
    for (const student in studenten) {
        const cijfers = studenten[student].cijfers;
        const totaal = cijfers.reduce((sum, { cijfer }) => sum + cijfer, 0);
        const gemiddelde = cijfers.length ? (totaal / cijfers.length).toFixed(2) : 0;
        const hoogste = cijfers.length ? Math.max(...cijfers.map(c => c.cijfer)) : 0;
        const laagste = cijfers.length ? Math.min(...cijfers.map(c => c.cijfer)) : 0;

        overzichtHTML += `
            <h2>${student}</h2>
            <ul>${cijfers.map(c => `<li>${c.vak}: ${c.cijfer}</li>`).join('')}</ul>
            <p>Gemiddelde: ${gemiddelde}</p>
            <p>Hoogste: ${hoogste}</p>
            <p>Laagste: ${laagste}</p>
            <hr>
        `;
    }
    document.getElementById('studentOverview').innerHTML = overzichtHTML;
}