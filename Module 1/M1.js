'use strict';

const specialElements = document.querySelectorAll('.special');
specialElements.forEach(element => {
    element.style.color = 'red';
});


const tweedeParagraaf = document.getElementById('tweede');
tweedeParagraaf.classList.add('onderstreept');


document.getElementById('output').innerText = 'Aantal special elementen: ' + specialElements.length;
