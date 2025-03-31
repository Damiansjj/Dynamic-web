const gebruikersContainer = document.getElementById('gebruikers-container');

async function haalGebruikersOp() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error('Er is iets mis gegaan bij het ophalen van de gebruikers.');
        }

        const gebruikers = await response.json();

        gebruikersContainer.innerHTML = '';

        gebruikers.forEach(user => {
            const gebruikerKaart = document.createElement('div');
            gebruikerKaart.classList.add('gebruiker-kaart');

            gebruikerKaart.innerHTML = `
                <div class="gebruiker-naam">${user.name}</div>
                <div class="gebruiker-email">${user.email}</div>
                <div class="gebruiker-telefoon">${user.phone}</div>
            `;

            gebruikersContainer.appendChild(gebruikerKaart);
        });
    } catch (error) {
        gebruikersContainer.innerHTML = `<div class="error-melding">${error.message}</div>`;
    }
}

haalGebruikersOp();
