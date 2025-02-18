'use strict';

const knop = document.getElementById('begroeting');
knop.addEventListener('click', () => {
    knop.textContent = knop.textContent === 'Hallo!' ? 'Tot ziens!' : 'Hallo!';
});