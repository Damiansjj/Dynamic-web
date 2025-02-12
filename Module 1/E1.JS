'use strict';

let score= 0;
let naam = prompt("Wat is je naam")
alert(`welkom bij de quiz, ${naam}!`)
let vraag1 = prompt("Hoeveel programmeertaal bestaat er?")
if(vraag1.toLocaleLowerCase().includes("2500")){
    alert("goed gedaan!");
    score++;
} else {
    alert(" Helaas was het antwoord 2500.");
}
let vraag2 = prompt("Wat betekent CSS?")
if(vraag2.toLocaleLowerCase().includes("cascading style sheets")){
    alert("Prima!");
    score++;
} else {
    alert(" Helaas was het antwoord cascading style sheets.");
}
let vraag3 = prompt ("Welke module zijn we?")
if(vraag3.toLocaleLowerCase().includes("1")){
    alert("Correct!");
    score++;
} else {
    alert(" Helaas was het antwoord 1.");
}

alert("je hebt "+ score + " juist")