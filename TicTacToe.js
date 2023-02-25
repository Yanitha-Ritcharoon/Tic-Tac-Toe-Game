// Wait for the page to finish loading before running the code
window.addEventListener("DOMContentLoaded", () => {
// Select all the game board cells and display elements
const cells = document.querySelectorAll(".col-4-tile");
const displayPlayer = document.querySelector(".display-player");
const winner = document.querySelector('.winner');
const restartBtn = document.querySelector("#restart");
// Set up the initial game state variables
let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = true;
// Set up varaibles to store the names of each player and the tie condition
const playerOWins = "OWins";
const playerXWins = "XWins";
const tie ="Tie";
// create the game logic and define the winning conditions for the game
const winningConditions = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

// Function to check if a player has won
function checkForWin() {
    let roundWin = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const winnerCondition = winningConditions[i];
      let a = gameState[winnerCondition[0]];
      let b = gameState[winnerCondition[1]];
      let c = gameState[winnerCondition[2]];
      
      // If any of the cells are empty, skip this iteration of the loop
      if (a === "" || b === "" ||  c === "") {
        continue;
      }
      // If all three cells match, we have a win
      if (a === b && b === c) {
        roundWin = true;
        break;
      }
    }
    // If a player has won, annouce the winner and end the game
    if (roundWin) {
        announce(currentPlayer === "O" ? playerOWins : playerXWins);
        gameOver = false;
        return;
    }
    // If there are no empty cells left, the game is a tie
    if (!gameState.includes('')) 
      announce(tie);
}
   
// Function to announce the winner or tie
let announce = (type) => {
    switch (type) {
        case playerOWins:
            winner.innerHTML = `Player O Wins!`;
            break;
        case playerXWins:
            winner.innerHTML = `Player X Wins!`;
            break;
        case tie:
            winner.innerHTML = `Tie! Please restart game.`;
    }
    // Show the winner element and style it with Bootstrap classes
    winner.classList.remove("hide");     
    winner.classList.add('alert', 'alert-info', 'text-center');  
};
    
// Function to update the game state when a player makes a move
let updateGame = (index) => {
    gameState[index] = currentPlayer;
}

// Function to switch to the other player's turn
let switchPlayer = () => {
    displayPlayer.classList.remove(`Player${currentPlayer}`);
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
    displayPlayer.innerText = currentPlayer;
    displayPlayer.classList.add(`Player${currentPlayer}`);
}
    
// Function to hadle a user clicking on a cell
let userAction = (cell, index) => {
    if (gameState[index] === "" && gameOver) {
        cell.innerText = currentPlayer;
        cell.classList.add(`player${currentPlayer}`);
        cell.style.color = currentPlayer === 'X' ? 'rgb(88, 244, 174)' : 'rgb(252, 105, 100)';
        updateGame(index);
        checkForWin();
        switchPlayer();
    }
}
// Add click event listener to each cell
cells.forEach((cell, index) => {
        cell.addEventListener("click", () => userAction(cell, index));
});

// Function to restart game when the restart button is clicked
function restartGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        gameOver = true;
        // Hide the winner announcement
        winner.classList.add("hide");

        if (currentPlayer == "X") {
            switchPlayer();
        }
        cells.forEach(cell => {
            cell.innerText = "";
            cell.classList.remove("PlayerX");
            cell.classList.remove("PlayerO");
        });
    }
    restartBtn.addEventListener("click", restartGame);
});

