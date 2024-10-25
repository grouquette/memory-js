
// Card data
const cardsArray = [
  {
    name: "dolmen",
    img: "assets/Breizh/dolmen.png",
  },
  {
    name: "becassine",
    img: "assets/Breizh/becassine.png",
  },
  {
    name: "caramel",
    img: "assets/Breizh/caramel.jpg",
  },
  {
    name: "carte",
    img: "assets/Breizh/carte_bretagne.jpg",
  },
  {
    name: "cornemuse",
    img: "assets/Breizh/cornemuse.png",
  },
  {
    name: "hermine",
    img: "assets/Breizh/hermine.png",
  },
  {
    name: "korrigans",
    img: "assets/Breizh/korrigans.png",
  },
  {
    name: "triskell",
    img: "assets/Breizh/triskell.png",
  },
];

let testCount = 0;
let count = 0;
let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
const delay = 1200;

const game = document.getElementById("game");

const grid = document.createElement("section");
grid.setAttribute("class", "grid");

game.appendChild(grid);

function resetGame() {
  grid.innerHTML = "";
  testCount = 0;
  const gameGrid = cardsArray.concat(cardsArray);
  gameGrid.sort(() => 0.5 - Math.random());
  gameGrid.forEach((item) => {
    const card = document.createElement("div");

    card.classList.add("card");
    card.dataset.name = item.name;

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = `url(${item.img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
  
  const winMessage = document.querySelector(".win-message");
  if (winMessage) {
    winMessage.remove();
  }
}

resetGame();





const match = () => {
  let selectedCards = document.querySelectorAll(".selected");
  selectedCards.forEach((card) => {
    card.classList.add("match");
    checkWin();
    
  });
};

const resetGuesses = () => {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  previousTarget = null;
  let selectedCards = document.querySelectorAll(".selected");
  selectedCards.forEach((card) => {
    card.classList.remove("selected");
  });
};

function checkWin() {
  const allCardsRevealed =
    document.querySelectorAll(".card.match").length ===
    document.querySelectorAll(".card").length;
  if (allCardsRevealed) {
    displayWinMessage();
   
  }
}

function displayWinMessage() {
  const winMessage = document.createElement("div");
  winMessage.classList.add("win-message");
  winMessage.textContent = "Bravo, vous avez gagné en " + testCount + " essais ! Pressez la touche espace pour rejouer";
  document.body.appendChild(winMessage);
  
  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      resetGame();
    }
  });
}

grid.addEventListener("click", (event) => {
  
  let clickedCard = event.target;
  
  if (
    clickedCard.nodeName === "SECTION" ||
    clickedCard === previousTarget || clickedCard.parentNode.classList.contains("selected")
  ) {
    return;
  }
  
  if (count < 2) {
    count++;
    if (count === 1) {
      
      firstGuess = clickedCard.parentNode.dataset.name;
      clickedCard.parentNode.classList.add("selected");
      
      previousTarget = clickedCard;
    } else {
      
      secondGuess = clickedCard.parentNode.dataset.name;
      clickedCard.parentNode.classList.add("selected");
    }
    
    if (firstGuess !== "" && secondGuess !== "") {
      if (firstGuess === secondGuess) {
        
        setTimeout(match, delay);
        
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
      testCount++;

      const tries = document.getElementById("nbTry");
      tries.innerHTML = "Tentatives : " + testCount;
    }
  }
});




