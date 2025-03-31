let teller = 0;

document.getElementById("clickButton").addEventListener("click", () => {
  teller++;
  document.querySelector(".counter").textContent = teller;
});

async function wachtOpVijfClicks() {
  while (teller < 5) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Wacht totdat de teller 5 is
  }
  document.querySelector(".message").textContent = "Gefeliciteerd! Je hebt 5 keer geklikt!";
}

wachtOpVijfClicks();
