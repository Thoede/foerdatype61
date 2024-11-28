let timer;
let timeLeft = 60;
let typingStarted = false;
let correctWords = 0;
let totalWords = 0;
const targetText = "Ade Ababil Athalla Shivano Wahyu Wijaya Bintang Rendra Adit Nata Ricko Satria Yana Tunik Negaroa Dewangga Okan Respa Alek Abhy Dayu Gita Wahyu Sedana Daniel Athar Ana Mudiantari Lin Marsya Shintya Citra Vio Tude Ganteng Ananta Bhaskara Shifa Zacharia";

const textElement = document.getElementById("text");
const inputElement = document.getElementById("inputText");
const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const themeToggleBtn = document.getElementById("themeToggle");

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeElement.textContent = timeLeft;
    } else {
      clearInterval(timer);
      calculateResults();
    }
  }, 1000);
}

function calculateResults() {
  const typedText = inputElement.value.trim();
  totalWords = typedText.split(/\s+/).length;
  correctWords = typedText.split(/\s+/).filter((word, index) => word === targetText.split(/\s+/)[index]).length;

  const wpm = Math.round((correctWords / 5) / (60 - timeLeft) * 60); 
  const accuracy = Math.round((correctWords / totalWords) * 100);    

  wpmElement.textContent = wpm || 0;
  accuracyElement.textContent = accuracy + "%";
}

function startTyping() {
  typingStarted = true;
  startBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
  inputElement.disabled = false;
  inputElement.focus();
  inputElement.value = "";

  timeLeft = 60;
  timeElement.textContent = timeLeft;
  startTimer();
}

function reset() {
  typingStarted = false;
  inputElement.value = "";
  inputElement.disabled = true;
  wpmElement.textContent = "0";
  accuracyElement.textContent = "0%";
  startBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
  timeLeft = 60;
  timeElement.textContent = timeLeft;
  textElement.classList.remove("correct", "incorrect");
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

startBtn.addEventListener("click", startTyping);
resetBtn.addEventListener("click", reset);
themeToggleBtn.addEventListener("click", toggleTheme);

inputElement.addEventListener("input", () => {
  if (typingStarted) {
    const typedText = inputElement.value;
    const targetSubstring = targetText.substring(0, typedText.length);

    if (typedText === targetSubstring) {
      textElement.classList.remove("incorrect");
      textElement.classList.add("correct");
    } else {
      textElement.classList.remove("correct");
      textElement.classList.add("incorrect");
    }

    if (typedText === targetText) {
      clearInterval(timer);
      calculateResults();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  inputElement.disabled = true;
  inputElement.placeholder = "Start typing...";
});
