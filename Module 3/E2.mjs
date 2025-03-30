function maakBestelling(drank = "cola", snack = "chips") {
    return {
        drank: drank,
        snack: snack,
        tijd: new Date().toLocaleTimeString()
    };
}

let bestelling1 = maakBestelling();
let bestelling2 = maakBestelling("fanta");
let bestelling3 = maakBestelling("sprite", "nootjes");

let output = document.getElementById("output");
output.innerHTML += `Bestelling 1: Drank - ${bestelling1.drank}, Snack - ${bestelling1.snack}, Tijd - ${bestelling1.tijd} <br>`;
output.innerHTML += `Bestelling 2: Drank - ${bestelling2.drank}, Snack - ${bestelling2.snack}, Tijd - ${bestelling2.tijd} <br>`;
output.innerHTML += `Bestelling 3: Drank - ${bestelling3.drank}, Snack - ${bestelling3.snack}, Tijd - ${bestelling3.tijd} <br>`;
