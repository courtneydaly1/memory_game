let startButton = document.querySelector("#startBtn");
let restartButton = document.querySelector("#restartBtn");
let score = 0;
let lowScore = localStorage.getItem("low-score");

startButton.addEventListener("click", function () {
  const gameContainer = document.getElementById("game");
  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple",
  ];

  function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
      let index = Math.floor(Math.random() * counter);
      counter--;

      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  let shuffledColors = shuffle(COLORS);

  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(color);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  }

  let cardOne = null;
  let cardTwo = null;
  let flippedCards = 0;
  let noClicks = false;

  function handleCardClick(event) {
    if (noClicks) return;
    if (event.target.classList.contains("flipped")) return;

    let currentCard = event.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    if (!cardOne || !cardTwo) {
      currentCard.classList.add("flipped");
      cardOne = cardOne || currentCard;
      cardTwo = currentCard === cardOne ? null : currentCard;
    }
    if (cardOne && cardTwo) {
      noClicks = true;
      let matchOne = cardOne.className;
      let matchTwo = cardTwo.className;

      if (matchOne === matchTwo) {
        flippedCards += 2;
        cardOne.removeEventListener("click", handleCardClick);
        cardTwo.removeEventListener("click", handleCardClick);
        cardOne = null;
        cardTwo = null;
        noClicks = false;
        updateScore();
      } else {
        setTimeout(function () {
          cardOne.classList.remove("flipped");
          cardTwo.classList.remove("flipped");
          cardOne.style.backgroundColor = "";
          cardTwo.style.backgroundColor = "";
          cardOne = null;
          cardTwo = null;
          noClicks = false;
          updateScore();
        }, 1200);
      }
    }

    if (flippedCards === COLORS.length) endGame();
    
    function endGame() {
      let end = document.getElementById("end");
      let scoreHeader = end.children[1];
      scoreHeader.innerText = "Your Score: " + score + "!" + "  ";
      let lowScore = +localStorage.getItem("low-score") || Infinity;
      if (score < lowScore) {
        scoreHeader.innerText += "New High Score!!";
        localStorage.setItem("lowscore", score);
      }
      document.getElementById("end").classList.add("game-over");
    };

    function updateScore() {
      let newScore = document.querySelector("#score");
      score++;
      newScore.innerHTML = `Score: ${score}`;
    }

    function removeDivs(elementID) {
      while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
      }
    }

    restartButton.addEventListener("click", function () {
      removeDivs();
      shuffle(COLORS);
      createDivsForColors(shuffledColors);
      let score = document.querySelector("#score");
      score.innerHTML = `Score: 0`;
      end.innerHTML= "";
    });
  }
  

  createDivsForColors(shuffledColors);
});
