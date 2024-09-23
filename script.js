//----------------Buttons-------------------------------------
const rulesBtn = document.querySelectorAll(".rules-btn");
const nextBtn = document.getElementById("next-btn");
const playAgainBtn = document.querySelector("#play-again");
const replayBtn = document.querySelector("#replay");
const closeModalBtn = document.getElementById("close");

//---------------Rules Modal-----------------------------------
const rulesModal = document.getElementById("rules-modal");

//----------------Won Game-------------------------------------
const wonGame = document.querySelector(".won-game");

//----------------Play Board-----------------------------------
const playBoard = document.getElementById("play-board");

//---------------ResultBoard-----------------------------------
const resultBoard = document.getElementById("result-board");
const userResult = document.querySelector(".user-result");
const pcResult = document.querySelector(".pc-result");
let resultText = document.getElementById("result-text-1");
let resultText2 = document.getElementById("result-text-2");
let picked = document.querySelectorAll(".picked");

// ------------------ Score Board-------------------------------
const computerScore = document.getElementById("computer-score");
const userScore = document.getElementById("user-score");

// Initialize scores from localStorage or default to 0
let score = {
  user: parseInt(localStorage.getItem("userScore")) || 0,
  computer: parseInt(localStorage.getItem("computerScore")) || 0,
};

userScore.innerHTML = score.user;
computerScore.innerHTML = score.computer;

// -------------------- RESULT ------------------------------

const result = {
  WIN: "YOU WIN",
  LOST: "YOU LOST",
  TIEUP: "TIE UP",
};

// =========================================================================| EVENT LISTENERS |=============================================================================

rulesBtn.forEach((element) => {
  element.addEventListener("click", () => {
    rulesModal.style.display = "block";
  });
});

closeModalBtn.addEventListener("click", () => {
  rulesModal.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  playBoard.style.display = "none";
  resultBoard.style.display = "none";
  wonGame.style.display = "flex";
});

playAgainBtn.addEventListener("click", playAgain);
replayBtn.addEventListener("click", playAgain);

// =========================================================================| FUNCTIONS |=============================================================================

function playAgain() {
  playBoard.style.display = "grid";
  resultBoard.style.display = "none";
  wonGame.style.display = "none";
  nextBtn.style.display = "none";
}

// computer Picks
const computer = ["rock", "paper", "scissor"];

function computerPicked() {
  let picked = Math.floor(Math.random() * computer.length);
  return computer[picked];
}

function setImg(picked) {
  let img = `<img src="./images/${picked}.png" alt=${picked} width="60px"/>`;
  return img;
}

function setStyles() {
  resultBoard.style.marginTop = "3rem";

  picked.forEach((element) => {
    element.style.top = "300px";
  });

  for (let index = 0; index < 3; index++) {
    userResult.classList.remove("rock-div");
    userResult.classList.remove("paper-div");
    userResult.classList.remove("scissor-div");
    pcResult.classList.remove("rock-div");
    pcResult.classList.remove("paper-div");
    pcResult.classList.remove("scissor-div");

    playAgainBtn.style.display = "block";
    resultText2.style.display = "block";
    replayBtn.style.display = "none";
    nextBtn.style.display = "none";
  }
}

// ================================================================| GAME START |==========================================================================

const startGame = (userPicked) => {
  let pcPicked = computerPicked();

  setStyles();

  let res;

  if (userPicked === pcPicked) {
    res = result.TIEUP;

    removeFocus();

    playAgainBtn.style.display = "none";
    replayBtn.style.display = "block";
    resultText2.style.display = "none";

    picked.forEach((element) => {
      element.style.top = "256px";
    });

    resultBoard.style.marginTop = "6rem";

  } else if (
    (userPicked === "rock" && pcPicked === "scissors") ||
    (userPicked === "paper" && pcPicked === "rock") ||
    (userPicked === "scissors" && pcPicked === "paper")
  ) {
    res = result.WIN;

    nextBtn.style.display = "block";
    focusOnUserWinner();
    score.user++; // Update score for user
  } else {
    res = result.LOST;
    focusOnPCWinner();
    score.computer++; // Update score for computer
  }

  // Update the scoreboard
  userScore.innerHTML = score.user;
  computerScore.innerHTML = score.computer;

  // Save scores to local storage
  localStorage.setItem("userScore", score.user);
  localStorage.setItem("computerScore", score.computer);

  playBoard.style.display = "none";
  resultBoard.style.display = "flex";

  // RESULT BOARD 
  userResult.classList.add(`${userPicked}-div`);
  pcResult.classList.add(`${pcPicked}-div`);
  userResult.innerHTML = setImg(userPicked);
  pcResult.innerHTML = setImg(pcPicked);
  resultText.innerHTML = res;
};

// ================================================================| GAME END |==========================================================================

// Winner Focus Boxes

let winUserBox1 = document.querySelector(".user-box-1");
let winUserBox2 = document.querySelector(".user-box-2");
let winUserBox3 = document.querySelector(".user-box-3");
let winPcBox1 = document.querySelector(".pc-box-1");
let winPcBox2 = document.querySelector(".pc-box-2");
let winPcBox3 = document.querySelector(".pc-box-3");

let focusOnUserWinner = () => {
  winPcBox1.classList.remove("winner-box-1");
  winPcBox2.classList.remove("winner-box-2");
  winPcBox3.classList.remove("winner-box-3");

  winUserBox1.classList.add("winner-box-1");
  winUserBox2.classList.add("winner-box-2");
  winUserBox3.classList.add("winner-box-3");
};

let focusOnPCWinner = () => {
  winUserBox1.classList.remove("winner-box-1");
  winUserBox2.classList.remove("winner-box-2");
  winUserBox3.classList.remove("winner-box-3");

  winPcBox1.classList.add("winner-box-1");
  winPcBox2.classList.add("winner-box-2");
  winPcBox3.classList.add("winner-box-3");
};

let removeFocus = () => {
  winUserBox1.classList.remove("winner-box-1");
  winUserBox2.classList.remove("winner-box-2");
  winUserBox3.classList.remove("winner-box-3");

  winPcBox1.classList.remove("winner-box-1");
  winPcBox2.classList.remove("winner-box-2");
  winPcBox3.classList.remove("winner-box-3");
};
