import { getDatas, setData } from "./events/storage.js";

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

// Sélect div with id game
const game = document.getElementById("game");

// Create section with grid
const grid = document.createElement("section");
grid.setAttribute("class", "grid");

game.appendChild(grid);

function resetGame() {
  // Init grid remove previous cards
  grid.innerHTML = "";
  testCount = 0;
  // Create double cards
  const gameGrid = cardsArray.concat(cardsArray);
  // Randomize by comparison
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

    // Insert cards in grid, insert front and back as child of card too
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
  // Remove win message if exist
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

// Function for reset guesses
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

// Function for check if user win the game
function checkWin() {
  const allCardsRevealed =
    document.querySelectorAll(".card.match").length ===
    document.querySelectorAll(".card").length;
  
  if (allCardsRevealed) {
    displayWinMessage();
    
    const users = getDatas("users") || []; ;
    const currentUser = getDatas("currentUser") || [];
    
    if (currentUser && users) {
      const userIndex = users.findIndex(
        (user) => user.email === currentUser.email
      );
      
      if (userIndex !== -1) {
        const user = users[userIndex];
        // Ajouter ou mettre à jour le champ "score" avec le nombre de tentatives
        currentUser.score = testCount;
        user.score =  testCount;
        // Mettre à jour le localStorage avec les nouvelles infos de l'utilisateur
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        // setData("currentUser", currentUser);
        users[userIndex] = user; // Mettre à jour l'utilisateur dans le tableau
        localStorage.setItem("users", JSON.stringify(users));
      
       // localStorage.setItem("users", JSON.stringify(user));
      }
    } else {
      console.log("Utilisateur non trouvé dans le localStorage !");
    }
  }
}

// Display win Message
function displayWinMessage() {
  const winMessage = document.createElement("div");
  winMessage.classList.add("win-message");
  winMessage.textContent =
    "Bravo, vous avez gagné en " +
    testCount +
    " essais ! Pressez la touche espace pour rejouer";
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
    clickedCard === previousTarget ||
    clickedCard.parentNode.classList.contains("match")
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
