const gameBoard = document.querySelector("#gameboard");
const info = document.querySelector("#info");
info.textContent = "Circle goes first";
// let counter = 0;

const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circle";
// info.textContent = "circle goes first";

function createBoard() {
  startCells.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addGo);
    gameBoard.append(cellElement);
    // counter++;
  });
}

createBoard();

function addGo(e) {
  const goDisplay = document.createElement("div");
  goDisplay.classList.add(go);
  e.target.append(goDisplay);
  go = go === "circle" ? "cross" : "circle";
  info.textContent = "it is now " + go + "'s turn.";
  // should not be able to click a taken sqaure again:
  e.target.removeEventListener("click", addGo);
  checkScore();
}

function checkScore() {
  const allSquares = document.querySelectorAll(".square");

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  winningCombos.forEach(array => {
    let circleWins = array.every(cell =>
      allSquares[cell].firstChild?.classList.contains("circle")
    );
    if (circleWins) {
      info.textContent = "Circle Wins!!!!";
      // because we cannot remove the event listener we will reoplace it:
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });

  winningCombos.forEach((array) => {
    let crossWins = array.every((cell) =>
      allSquares[cell].firstChild?.classList.contains("cross")
    );
    if (crossWins) {
      info.textContent = "Cross Wins!!!!";
      // because we cannot remove the event listener we will reoplace it:
      allSquares.forEach((square) =>
        square.replaceWith(square.cloneNode(true))
      );
      return;
    }
  });
}
