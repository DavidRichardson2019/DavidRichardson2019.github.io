var currentPlayer = "X";
var nextPlayer = "O";
const winningCombinations = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"]
]

var playerSelections;
var playerXSelections = {"1": false,
                         "2": false,
                         "3": false,
                         "4": false,
                         "5": false,
                         "6": false,
                         "7": false,
                         "8": false,
                         "9": false};
var playerOSelections = {"1": false,
                         "2": false,
                         "3": false,
                         "4": false,
                         "5": false,
                         "6": false,
                         "7": false,
                         "8": false,
                         "9": false};;


handleClick = function(event) {
  var cell = event.target;

  cell.innerHTML = currentPlayer;
  if(currentPlayer === "X" ) {
    playerXSelections[cell.id] = true;
    nextPlayer = "O";
  } else {
    playerOSelections[cell.id] = true;
    nextPlayer = "X";
  }
  if(checkWinners(currentPlayer)) {
    playerWins(currentPlayer);
  }
  currentPlayer = nextPlayer;
  }
  // Swap players


function checkWinners(player){
  if (player === "X") {
    for (let set of winningCombinations) {
      if(playerXSelections[set[0]] && playerXSelections[set[1]] && playerXSelections[set[2]]) {
        return true;
      }
    }
    return false;
  }else {
    for (let set of winningCombinations) {
      if(playerOSelections[set[0]] && playerOSelections[set[1]] && playerOSelections[set[2]]) {
        return true;
      }
    }
    return false;
  }
}

function playerWins(player) {
  alert(player + " wins!");
}
var cells = document.querySelectorAll("td");

for(var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', handleClick)
}
