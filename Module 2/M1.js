'use strict';

const winkelwagen = [];
const naamInput = document.getElementById('productName');
const prijsInput = document.getElementById('productPrice');
const voegToeKnop = document.getElementById('addToCart');
const sorteerKnop = document.getElementById('sortByPrice');
const totaalWeergave = document.getElementById('total');
const lijstWeergave = document.getElementById('cartItems');

voegToeKnop.addEventListener('click', function () {
    const naam = naamInput.value.trim();
    const prijs = Number(prijsInput.value);

    if (naam === '' || prijs <= 0) {
        alert('Vul een geldige productnaam en prijs in.');
        return;
    }

    winkelwagen.push({ naam, prijs });
    naamInput.value = '';
    prijsInput.value = '';

    updateWinkelwagen();
});

sorteerKnop.addEventListener('click', function () {
    winkelwagen.sort((a, b) => a.prijs - b.prijs);
    updateWinkelwagen();
});

function verwijderProduct(index) {
    winkelwagen.splice(index, 1);
    updateWinkelwagen();
}

function updateWinkelwagen() {
    lijstWeergave.innerHTML = '';
    let totaal = 0;

    winkelwagen.forEach((product, index) => {
        totaal += product.prijs;

        const item = document.createElement('li');
        item.innerHTML = `${product.naam} - €${product.prijs.toFixed(2)} 
            <button onclick="verwijderProduct(${index})">Verwijder</button>`;
        lijstWeergave.appendChild(item);
    });

    totaalWeergave.innerText = totaal.toFixed(2);
}