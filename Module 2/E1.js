'use strict';

const scores = [];
const scoreInput = document.getElementById('score');
const addScoreButton = document.getElementById('addScore');
const scoreList = document.getElementById('scoreList');
const averageSpan = document.getElementById('average');
const highestSpan = document.getElementById('highest');

addScoreButton.addEventListener('click', () => {
    let score = Number(scoreInput.value);

    if (isNaN(score) || score < 0 || score > 20) {
        alert('Geef een score tussen 0 en 20');
        return;
    }

    scores.push(score);
    scoreList.innerHTML += `<li>Score: ${score}</li>`;

    let sum = scores.reduce((total, num) => total + num, 0);
    averageSpan.innerText = (sum / scores.length).toFixed(2);
    highestSpan.innerText = Math.max(...scores);

    scoreInput.value = ''; 
});
