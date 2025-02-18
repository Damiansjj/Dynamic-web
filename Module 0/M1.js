'use strict';

document.getElementById('bereken').addEventListener('click', function() {
    
    const getal1 = document.getElementById('getal1').value;
    const getal2 = document.getElementById('getal2').value;

    
    if (isNaN(getal1) || isNaN(getal2) || getal1 === '' || getal2 === '') {
        document.getElementById('resultaat').innerText = 'Voer geldige getallen in.';
    } else {
    
        const resultaat = parseFloat(getal1) + parseFloat(getal2);
        document.getElementById('resultaat').innerText = 'Resultaat: ' + resultaat;
    }
});
