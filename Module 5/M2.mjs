let timerInterval;
let cancelTimer = false;

const startButton = document.getElementById("startButton");
const cancelButton = document.getElementById("cancelButton");
const timerDisplay = document.getElementById("timerDisplay");
const message = document.getElementById("message");

startButton.addEventListener("click", startCountdown);
cancelButton.addEventListener("click", cancelCountdown);

function startCountdown() {
  const seconds = parseInt(document.getElementById("seconds").value);
  cancelTimer = false;

  cancelButton.disabled = false; 
  startButton.disabled = true;  

  countdown(seconds)
    .then(() => {
      message.style.display = "block";
      message.textContent = "Timer is klaar!";
    })
    .catch((error) => {
      message.style.display = "block";
      message.textContent = error;
    })
    .finally(() => {
      startButton.disabled = false;
      cancelButton.disabled = true;
    });
}

function cancelCountdown() {
  cancelTimer = true;
  clearInterval(timerInterval);
  timerDisplay.textContent = "0";
  message.style.display = "block";
  message.textContent = "Timer is geïndigd!";
}

function countdown(seconds) {
  return new Promise((resolve, reject) => {
    let remainingTime = seconds;
    timerInterval = setInterval(() => {
      if (cancelTimer) {
        clearInterval(timerInterval);
        reject("Timer was canceled.");
      } else if (remainingTime <= 0) {
        clearInterval(timerInterval);
        resolve(); 
      } else {
        timerDisplay.textContent = remainingTime;
        remainingTime--;
      }
    }, 1000);
  });
}
