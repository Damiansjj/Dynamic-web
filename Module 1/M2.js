'use strict';

const grid = document.getElementById('grid');
const redCount = document.getElementById('redCount');
const blueCount = document.getElementById('blueCount');
const greenCount = document.getElementById('greenCount');


for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    grid.appendChild(cell);
}

// Helper functie om kleuren te tellen
function updateCounts() {
    const cells = document.getElementsByClassName('cell');
    let red = 0, blue = 0, green = 0;

    Array.from(cells).forEach(cell => {
        if (cell.style.backgroundColor === 'red') red++;
        if (cell.style.backgroundColor === 'blue') blue++;
        if (cell.style.backgroundColor === 'green') green++;
    });

    redCount.textContent = red;
    blueCount.textContent = blue;
    greenCount.textContent = green;
}

grid.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('cell')) {
        e.target.style.backgroundColor = 'red';
        updateCounts();
    }
});

grid.addEventListener('click', function(e) {
    if (e.target.classList.contains('cell')) {
        e.target.style.backgroundColor = 'blue';
        updateCounts();
    }
});

grid.addEventListener('dblclick', function(e) {
    if (e.target.classList.contains('cell')) {
        e.target.style.backgroundColor = 'green';
        updateCounts();
    }
});