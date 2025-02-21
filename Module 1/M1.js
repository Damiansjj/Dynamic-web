'use strict';

const specialElements = document.querySelectorAll('.special');
specialElements.forEach(element => {
    element.style.color = 'red';
});

const tweedeParagraaf = document.querySelectorAll('p')[1]; 
tweedeParagraaf.style.textDecoration = 'underline'; 

document.getElementById('output').innerText = 'Aantal special elementen: ' + specialElements.length;
