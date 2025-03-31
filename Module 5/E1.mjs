document.getElementById("startButton").addEventListener("click", function() {
    kleurOvergang();
  });
  
  function kleurOvergang() {
    veranderKleur("red", function() {
      setTimeout(function() {
        veranderKleur("green", function() {
          setTimeout(function() {
            veranderKleur("blue");
          }, 1000);
        });
      }, 1000);
    });
  }
  
  function veranderKleur(kleur, callback) {
    document.body.style.backgroundColor = kleur;
    if (callback) callback();
  }
  