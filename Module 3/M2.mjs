function verwerkScore(naam = "Onbekend", score = 0) {
    naam = naam.trim() || "Onbekend";
    score = Number(score);
    if (isNaN(score) || score < 0) score = 10;
    return { naam, score };
}

function voegScoreToe() {
    let naam = document.getElementById("playerName").value.trim();
    let score = document.getElementById("score").value.trim();
    let scoreObject = verwerkScore(naam, score);
    
    let scoreBoard = document.getElementById("scoreBoard"); 
    let p = document.createElement("p");
    p.textContent = `${scoreObject.naam}: ${scoreObject.score} punten`;
    scoreBoard.appendChild(p);
}

window.voegScoreToe = voegScoreToe; 
