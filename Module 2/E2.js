'use strict'

const nameInput = document.getElementById('recipeName');
const timeInput = document.getElementById('prepTime');
const ingredientsInput = document.getElementById('ingredients');
const generatorCardInput = document.getElementById('generateCard');

generatorCardInput.addEventListener('click', function() {
    let name = nameInput.value;
    let time = timeInput.value;
    let ingredientsText = ingredientsInput.value;

    if (!name || !time || !ingredientsText) {
        alert('Vul alle velden in!');
        return;
    }

    let ingredients = ingredientsText.split('\n').map(ing => `- ${ing}`).join('<br>');

    document.getElementById('result').innerHTML = `
        <h2>🥘 ${name}</h2>
        <p>⏱️ Bereidingstijd: ${time} minuten</p>
        <h3>Ingrediënten:</h3>
        <p>${ingredients}</p>
    `;
});
