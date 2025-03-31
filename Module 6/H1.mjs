const apiKey = 'c87ebc76530c388afa82756692daee50';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q={CITY}&units=metric&appid=' + apiKey;
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const favoritesList = document.getElementById('favorites-list');
let favoriteCities = JSON.parse(localStorage.getItem('favorites')) || [];

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const url = apiUrl.replace('{CITY}', city);
    weatherDisplay.innerHTML = '<div class="loading">Bezig met ophalen...</div>';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message || 'Er is iets mis gegaan');
        }

        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = `<div class="error">Fout: ${error.message}</div>`;
    }
}

function displayWeather(data) {
    const { main, weather, wind, sys, name } = data;

    const temperature = main.temp;
    const humidity = main.humidity;
    const windSpeed = wind.speed;
    const description = weather[0].description;
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();

    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');
    weatherCard.innerHTML = `
        <h3>Weer in ${name}</h3>
        <p>Temperatuur: <span id="temperature">${temperature} °C</span></p>
        <p>Beschrijving: ${description}</p>
        <p>Luchtvochtigheid: ${humidity}%</p>
        <p>Windsnelheid: ${windSpeed} m/s</p>
        <p>Zonsopgang: ${sunrise}</p>
        <p>Zonsondergang: ${sunset}</p>
        <button id="toggle-temp">Schakel naar °F</button>
        <button id="add-favorite">Voeg toe aan favorieten</button>
    `;

    weatherDisplay.innerHTML = '';
    weatherDisplay.appendChild(weatherCard);

    const toggleTempButton = document.getElementById('toggle-temp');
    toggleTempButton.addEventListener('click', () => toggleTemperature(temperature));

    const addFavoriteButton = document.getElementById('add-favorite');
    addFavoriteButton.addEventListener('click', () => addToFavorites(name, temperature));

    checkFavoriteStatus(name);
}

function toggleTemperature(celsiusTemp) {
    const temperatureElement = document.getElementById('temperature');
    const currentTemp = parseFloat(temperatureElement.textContent);

    if (temperatureElement.textContent.includes('°C')) {
        const fahrenheit = (celsiusTemp * 9/5) + 32;
        temperatureElement.textContent = `${fahrenheit.toFixed(2)} °F`;
        document.getElementById('toggle-temp').textContent = 'Schakel naar °C';
    } else {
        temperatureElement.textContent = `${celsiusTemp} °C`;
        document.getElementById('toggle-temp').textContent = 'Schakel naar °F';
    }
}

function addToFavorites(city, temperature) {
    if (!favoriteCities.includes(city)) {
        favoriteCities.push(city);
        localStorage.setItem('favorites', JSON.stringify(favoriteCities));
        displayFavorites();
    }
}

function displayFavorites() {
    favoritesList.innerHTML = '';
    if (favoriteCities.length > 0) {
        favoriteCities.forEach(city => {
            const favoriteItem = document.createElement('div');
            favoriteItem.classList.add('favorite-item');
            favoriteItem.textContent = city;
            favoritesList.appendChild(favoriteItem);
        });
    } else {
        favoritesList.innerHTML = '<p>Geen favorieten toegevoegd.</p>';
    }
}

function checkFavoriteStatus(city) {
    const addFavoriteButton = document.getElementById('add-favorite');
    if (favoriteCities.includes(city)) {
        addFavoriteButton.disabled = true;
        addFavoriteButton.textContent = 'Al in favorieten';
    } else {
        addFavoriteButton.disabled = false;
        addFavoriteButton.textContent = 'Voeg toe aan favorieten';
    }
}

displayFavorites();
