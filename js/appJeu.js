
// Card data
const cardsArray = [
  {
    name: "mouse",
    img: "assets/animauxAnimes/1.webp",
  },
  {
    name: "bee",
    img: "assets/animauxAnimes/2.webp",
  },
  {
    name: "hedgehog",
    img: "assets/animauxAnimes/3.webp",
  },
  {
    name: "frog",
    img: "assets/animauxAnimes/4.webp",
  },
  {
    name: "puffer",
    img: "assets/animauxAnimes/5.webp",
  },
  {
    name: "stripe",
    img: "assets/animauxAnimes/6.webp",
  },
  {
    name: "caterpillar",
    img: "assets/animauxAnimes/7.webp",
  },
  {
    name: "jellyfish",
    img: "assets/animauxAnimes/8.webp",
  },
];

let testCount = 0;
let count = 0;
let firstGuess = "";
let secondGuess = "";
let previousTarget = null;
const delay = 1200;

// Sélection des div avec id game
const game = document.getElementById("game");

// Create section with grid
const grid = document.createElement("section");
grid.setAttribute("class", "grid");

game.appendChild(grid);

function resetGame() {
  grid.innerHTML = "";
  testCount = 0;
  // Create double cards
  const gameGrid = cardsArray.concat(cardsArray);
  gameGrid.sort(() => 0.5 - Math.random());
  gameGrid.forEach((item) => {
    // Create div
    const card = document.createElement("div");

    // Create each card
    card.classList.add("card");
    card.dataset.name = item.name;

    // Create front of the card
    const front = document.createElement("div");
    front.classList.add("front");

    // Create back of the card
    const back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = `url(${item.img})`;

    // Insert cards in grid front and back too
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





// Function for match
const match = () => {
  let selectedCards = document.querySelectorAll(".selected");
  selectedCards.forEach((card) => {
    card.classList.add("match");
    checkWin();
    
  });
};

// Function for reset
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

// Function for check if win
function checkWin() {
  const allCardsRevealed =
    document.querySelectorAll(".card.match").length ===
    document.querySelectorAll(".card").length;
  if (allCardsRevealed) {
    displayWinMessage();
   
  }
}

// Display win Message
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

// Add event listener to grid
grid.addEventListener("click", (event) => {
  
  // When a card is clicked
  let clickedCard = event.target;
  
  // Select just div and avoid double click on a card
  if (
    clickedCard.nodeName === "SECTION" ||
    clickedCard === previousTarget || clickedCard.parentNode.classList.contains("selected")
  ) {
    return;
  }
  
  if (count < 2) {
    count++;
    if (count === 1) {
      
      // Assign first guess ascending to parentNode
      firstGuess = clickedCard.parentNode.dataset.name;
      clickedCard.parentNode.classList.add("selected");
      
      // Avoid double click on a card
      previousTarget = clickedCard;
    } else {
      
      // Assign second guess ascending to parentNode
      secondGuess = clickedCard.parentNode.dataset.name;
      clickedCard.parentNode.classList.add("selected");
    }
    
    // Check if the guess are empty
    if (firstGuess !== "" && secondGuess !== "") {
      if (firstGuess === secondGuess) {
        
        // Call match function with delay
        setTimeout(match, delay);
        
        // Reset guesses with delay
        setTimeout(resetGuesses, delay);
      } else {
        setTimeout(resetGuesses, delay);
      }
      // Increase testCount
      testCount++;

      // Display testCount  
      const tries = document.getElementById("nbTry");
      tries.innerHTML = "Tentatives : " + testCount;
    }
  }
});




