const apiKey = 'c87ebc76530c388afa82756692daee50';
document.addEventListener("DOMContentLoaded", () => {
    const weatherDataDiv = document.getElementById('weather-data');
    const cachedNotice = document.getElementById('cached-notice');
    const loader = document.getElementById('loader');
    const getWeatherButton = document.getElementById('getWeather');

    const getWeather = async (lat, lon) => {
        try {
            loader.style.display = 'block';
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
            
            if (!response.ok) {
                throw new Error(`API-fout: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const { name: city, main: { temp: temperature }, weather } = data;
            const description = weather[0].description;

            weatherDataDiv.innerHTML = `
                <h2>${city}</h2>
                <p>Temperatuur: ${temperature}°C</p>
                <p>Beschrijving: ${description}</p>
            `;

            localStorage.setItem('weather', JSON.stringify({ city, temperature, description }));
            cachedNotice.innerText = '';
        } catch (error) {
            console.error(error);
            weatherDataDiv.innerHTML = `<p>Er is een fout opgetreden: ${error.message}</p>`;
        } finally {
            loader.style.display = 'none';
        }
    };

    const getLocationAndWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    getWeather(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error(error);
                    weatherDataDiv.innerHTML = '<p>Kan je locatie niet ophalen. Controleer je browserinstellingen.</p>';
                }
            );
        } else {
            weatherDataDiv.innerHTML = '<p>Geolocatie wordt niet ondersteund door deze browser.</p>';
        }
    };

    getWeatherButton.addEventListener('click', getLocationAndWeather);

    const cachedWeather = localStorage.getItem('weather');
    if (cachedWeather) {
        const { city, temperature, description } = JSON.parse(cachedWeather);
        weatherDataDiv.innerHTML = `
            <h2>${city}</h2>
            <p>Temperatuur: ${temperature}°C</p>
            <p>Beschrijving: ${description}</p>
        `;
        cachedNotice.innerText = 'Gegevens geladen uit cache.';
    }
});