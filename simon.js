// Wait for the window to load
window.onload = function () {
  const rulesModal = document.getElementById("rulesModal");
  const startBtn = document.getElementById("startBtn");
  const gameArea = document.getElementById("gameArea");

  // Show rules for 5 seconds, then show Start button
  setTimeout(() => {
    if (rulesModal) rulesModal.style.display = "none";
    if (startBtn) startBtn.classList.remove("hidden");
  }, 5000);

  // Start game when button is clicked
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startBtn.classList.add("hidden");
      if (gameArea) gameArea.classList.remove("hidden");
      startSimonGame();
    });
  }

  function startSimonGame() {
    console.log("Simon Game Started!");
  }
};

// 🎵 Load sounds for each button and error
const sounds = {
  yellow: new Audio("sounds/yellow.mp3"),
  red: new Audio("sounds/red.mp3"),
  green: new Audio("sounds/green.mp3"),
  purple: new Audio("sounds/purple.mp3"),
  wrong: new Audio("sounds/wrong.mp3"),
};

// 🧠 Game logic
let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// 🔑 Start game on keypress
document.addEventListener("keypress", function () {
  if (!started) {
    started = true;
    levelup();
  }
});

// ✨ Game flashes a button
function gameFlash(btn) {
  const color = btn.getAttribute("id");
  sounds[color].play(); // play sound
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250);
}

// 👆 User flashes a button
function userFlash(btn) {
  const color = btn.getAttribute("id");
  sounds[color].play(); // play sound
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250);
}

// ⬆️ Go to next level
function levelup() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  const randomIdx = Math.floor(Math.random() * btns.length);
  const randColor = btns[randomIdx];
  const randBtn = document.getElementById(randColor);
  gameSeq.push(randColor);

  gameFlash(randBtn);
}

// ✅ Check user answer
function checkAnswer(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelup, 1000);
    }
  } else {
    // ❌ Wrong input
    sounds.wrong.play();
    h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Press any key to restart.`;
    document.body.style.backgroundColor = "red";
    setTimeout(() => {
      document.body.style.backgroundColor = "";
    }, 150);
    resetGame();
  }
}

// 🎯 Button click handler
function btnPress() {
  const btn = this;
  userFlash(btn);
  const userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAnswer(userSeq.length - 1);
}

// 🎮 Attach event listeners to all buttons
const allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// 🔁 Reset game state
function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
