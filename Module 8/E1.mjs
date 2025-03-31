// Functie om het thema in te stellen
const setTheme = (theme) => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
};

// Functie om het thema te schakelen
const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-theme') {
        setTheme('light-theme');
        document.getElementById('themeToggle').textContent = 'Schakel naar Donker Thema';
    } else {
        setTheme('dark-theme');
        document.getElementById('themeToggle').textContent = 'Schakel naar Licht Thema';
    }
};

// Laad het opgeslagen thema bij het laden van de pagina
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    setTheme(savedTheme);

    // Update de knoptekst op basis van het huidige thema
    if (savedTheme === 'dark-theme') {
        document.getElementById('themeToggle').textContent = 'Schakel naar Licht Thema';
    }

    // Voeg eventlistener toe aan de knop
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});
