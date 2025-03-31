async function fetchData() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const resultElement = document.getElementById('result');

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Fout bij ophalen data: ${response.statusText}`);
        }

        const data = await response.json();
        resultElement.innerHTML = `Todo title: ${data.title}`;
    } catch (error) {
        resultElement.innerHTML = `<span class="error">Fout: ${error.message}</span>`;
    }
}

document.getElementById('fetchButton').addEventListener('click', fetchData);
