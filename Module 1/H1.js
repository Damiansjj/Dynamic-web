'use strict';

const nav = document.getElementById('mainMenu');
const ul = document.createElement('ul');
nav.appendChild(ul);

let currentH1Item;

document.querySelectorAll('h1, h2').forEach(element => {
    const li = document.createElement('li');
    li.textContent = element.innerText;
    li.addEventListener('click', () => {
        document.querySelectorAll('li').forEach(item => item.classList.remove('active'));
        li.classList.add('active');
        element.scrollIntoView({ behavior: 'smooth' });
    });

    if (element.tagName === 'H1') {
        currentH1Item = li;
        ul.appendChild(li);
    } else if (element.tagName === 'H2' && currentH1Item) {
        let subUl = currentH1Item.querySelector('ul');
        if (!subUl) {
            subUl = document.createElement('ul');
            subUl.classList.add('submenu');
            currentH1Item.appendChild(subUl);
        }
        subUl.appendChild(li);
    }
});

document.querySelectorAll('nav ul > li').forEach(h1Item => {
    h1Item.addEventListener('click', () => {
        const submenu = h1Item.querySelector('.submenu');
        if (submenu) {
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        }
    });
});
