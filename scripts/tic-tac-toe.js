let boardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

const winningNumbers = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let outputHTML = ``;

xClaimedSpaces = [];
oClaimedSpaces = [];

let playPiece = "X";

// initial render
renderBoard();
// initial setup
gameInteraction();

function renderBoard() {
  boardArray = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  let outputHTML = ``;

  boardArray.forEach((element, index) => {
    outputHTML = `${outputHTML}<button class="js-valid-square-${
      index + 1
    } css-valid-square">${element}</button>`;
  });

  document.querySelector(".js-game-grid-container").innerHTML = outputHTML;
}

function gameInteraction() {
  boardArray.forEach((element, index) => {
    let currentElement = document.querySelector(
      `.js-valid-square-${index + 1}`
    );

    currentElement.addEventListener("click", function userTurn() {
      if (element === " ") {
        if (playPiece === "X") {
          boardArray[index] = "X";
          xClaimedSpaces.push(index);
          currentElement.innerText = `${playPiece}`;
          playPiece = "O";
          currentElement.removeEventListener("click", userTurn);
          evaluateGameState();
        } else if (playPiece === "O") {
          boardArray[index] = "O";
          oClaimedSpaces.push(index);
          currentElement.innerText = `${playPiece}`;
          playPiece = "X";
          currentElement.removeEventListener("click", userTurn);
          evaluateGameState();
          
        }
      }
    });
  });
}

function evaluateGameState() {
  if (xClaimedSpaces.length > 2 || oClaimedSpaces.length > 2) {
    winningNumbers.forEach((element) => {
      const xPass = element.every((num) => xClaimedSpaces.includes(num));
      const oPass = element.every((num) => oClaimedSpaces.includes(num));

      if (xPass) {
        document.querySelector(`.js-victory-text`).innerHTML =
          "<p class = 'css-victory-text'>X WINS!</p><button class='js-play-again-button css-play-again-button'>Play Again</button>";
        document
          .querySelector(".js-play-again-button")
          .addEventListener("click", () => {
            renderBoard();
            gameInteraction();
            xClaimedSpaces = [];
            oClaimedSpaces = [];
            playPiece = "X";
            document.querySelector(`.js-victory-text`).innerHTML = "";
            
          });
        return;
      } else if (oPass) {
        document.querySelector(`.js-victory-text`).innerHTML =
          "<p class = 'css-victory-text'>O WINS!</p><button class='js-play-again-button  css-play-again-button'>Play Again</button>";
        document
          .querySelector(".js-play-again-button")
          .addEventListener("click", () => {
            renderBoard();
            gameInteraction();
            xClaimedSpaces = [];
            oClaimedSpaces = [];
            playPiece = "X";
            document.querySelector(`.js-victory-text`).innerHTML = "";
            
          });
        return;
      }
    });
  }
  if (xClaimedSpaces.length + oClaimedSpaces.length >= 9 && !((oPass) || (xPass))){
    document.querySelector(`.js-victory-text`).innerHTML =
          "<p class = 'css-victory-text'>It's a Tie!</p><button class='js-play-again-button  css-play-again-button'>Play Again</button>";
        document
          .querySelector(".js-play-again-button")
          .addEventListener("click", () => {
            renderBoard();
            gameInteraction();
            xClaimedSpaces = [];
            oClaimedSpaces = [];
            playPiece = "X";
            document.querySelector(`.js-victory-text`).innerHTML = "";
          });
  }
}
