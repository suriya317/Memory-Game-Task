const cardValues = ["🔴", "🟠", "⚪️", "🔵", "🟢", "🟡", "🟤", "🟣"];
let cardAll = [...cardValues, ...cardValues]; // Duplicate backup
let firstCard, secondCard;
let lockBoard = false;
let matchedPairs = 0;
const totalPairs = cardValues.length;

const gameBoard = document.getElementById("game-board");
const restartButton = document.getElementById("restart");

// game function
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;
  card.addEventListener("click", flipCard);
  return card;
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.value;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  matchedPairs++;
  resetBoard();

  if (matchedPairs === totalPairs) {
    setTimeout(() => alert("VICTORY !!!"), 250); // final congratulations
  }
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    firstCard.textContent = "";
    secondCard.classList.remove("flipped");
    secondCard.textContent = "";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function startGame() {
  matchedPairs = 0;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  gameBoard.innerHTML = "";
  shuffle(cardAll);

  cardAll.forEach((value) => {
    const card = createCard(value);
    gameBoard.appendChild(card);
  });
}

// restart
restartButton.addEventListener("click", startGame);
startGame();
