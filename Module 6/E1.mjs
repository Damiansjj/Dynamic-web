const knop = document.getElementById('haalTekstOp');
const resultaatDiv = document.getElementById('resultaat');

async function haalTekstOp() {
    resultaatDiv.innerHTML = '<p>Bezig met ophalen...</p>';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        if (!response.ok) {
            throw new Error('Er is iets mis gegaan bij het ophalen van de tekst.');
        }

        const data = await response.json();

        const formattedText = `
            <h3>${data.title}</h3>
            <p>${data.body}</p>
        `;

        resultaatDiv.innerHTML = formattedText;

    } catch (error) {
        resultaatDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

knop.addEventListener('click', haalTekstOp);
