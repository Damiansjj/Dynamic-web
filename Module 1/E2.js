'use strict'

const loadingmessage = document.getElementById('loadingmessage')

window.addEventListener('load', function(){
    loadingmessage.textContent = 'Welcome';
    setTimeout(function(){
        loadingmessage.style.display='none';
    }, 2000);
});