const endpointKnoppen = document.querySelectorAll('.endpoint-knop');

const statusInfo = document.getElementById('status-info');
const responseDetails = document.getElementById('response-details');

function getStatusCategory(code) {
    if (code >= 200 && code < 300) {
        return 'status-success';
    } else if (code >= 300 && code < 400) {
        return 'status-redirect';
    } else if (code >= 400 && code < 500) {
        return 'status-client-error';
    } else if (code >= 500 && code < 600) {
        return 'status-server-error';
    }
    return '';
}

async function testStatusCode(code) {
    const url = `https://httpstat.us/${code}`;

    try {
        const response = await fetch(url);
        const statusText = `${response.status} ${response.statusText}`;

        const category = getStatusCategory(response.status);

        statusInfo.innerHTML = `
            Status: <span class="${category}">${statusText}</span><br>
            Succesvol: ${response.ok ? 'Ja' : 'Nee'}<br>
            Categorie: ${category.replace('status-', '').toUpperCase()}
        `;

        const headers = [...response.headers.entries()]
            .map(([key, value]) => `${key}: ${value}`)
            .join('<br>');

        responseDetails.innerHTML = `
            <strong>Response Headers:</strong><br>
            ${headers ? headers : 'Geen headers ontvangen.'}<br><br>
            <strong>Response Type:</strong> ${response.type}
        `;
    } catch (error) {
        statusInfo.innerHTML = `<span class="status-client-error">Fout bij het ophalen van gegevens: ${error.message}</span>`;
        responseDetails.innerHTML = '';
    }
}

endpointKnoppen.forEach(button => {
    button.addEventListener('click', () => {
        const statusCode = button.getAttribute('data-code');
        testStatusCode(statusCode);
    });
});
