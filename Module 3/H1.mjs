const maakSpeler = (naam = "Player 1") => ({
    naam: naam,
    level: 1,
    health: 100,
});

const doeSchade = (speler, schade) => ({
    naam: speler.naam,
    level: speler.level,
    health: Math.max(0, speler.health - schade)
});

const levelOmhoog = (speler) => ({
    naam: speler.naam,
    level: speler.level + 1,
    health: 100
});

let huidigespeler = null;

const updateDisplay = () => {
    const statsdiv = document.getElementById('playerStats');
    if (!huidigespeler) {
        statsdiv.innerHTML = '<p>Geen actieve speler</p>';
        return;
    }
    statsdiv.innerHTML = `
    <div class="player-card">
        <h2>${huidigespeler.naam}</h2>
        <p>Level: ${huidigespeler.level}</p>
        <p>Health: ${huidigespeler.health}/100</p>
    </div>
    `;
};

const maakNieuweSpeler = () => {
    const naam = document.getElementById('playerName').value || "Player 1";
    huidigespeler = maakSpeler(naam);
    updateDisplay();
}

const doeSchadeBijSpeler = () => {
    if (!huidigespeler) return;
    huidigespeler = doeSchade(huidigespeler, 25);
    updateDisplay();
}

const levelSpelerOp = () => {
    if (!huidigespeler) return;
    huidigespeler = levelOmhoog(huidigespeler);
    updateDisplay();
};

updateDisplay();
