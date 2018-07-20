//Red: 1 Blue: 2
var colors = ["red", "blue"];
var currentPlayer = 1;
var nextPlayer = 2;
var gameActive = true;
var game = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
]

function getValue(id) {
  id = parseInt(id);
  if (id <= 7) {
    return game[0][id-1];
  }else if (id <= 14) {
    id -= 7;
    return game[1][id-1];
  }else if (id <= 21) {
    id -= 14;
    return game[2][id-1];
  }else if (id <= 28) {
    id -= 21;
    return game[3][id-1];
  }else if (id <= 35) {
    id -= 28;
    return game[4][id-1];
  }else {
    id -= 35;
    return game[5][id-1];
  }
}
function getColumn(id){
  id = parseInt(id);
  if (id <= 7) {
    return id-1;
  }else if (id <= 14) {
    return id-7-1;
  }else if (id <= 21) {
    return id-14-1;
  }else if (id <= 28) {
    return id-21-1;
  }else if (id <= 35) {
    return id-28-1;
  }else {
    return id-35-1;
  }
}

function getLowestSpace(id){
  let column = getColumn(id);
  for(let i = 5; i >= 0; i--){
    if(!game[i][column]){
      return [i, column];
    }
  }
  return false;
}

function getId(cords) {
  if(cords[0] === 0){
    return (cords[1]+1).toString();
  }
  if(cords[0] === 1){
    return (cords[1]+7+1).toString();
  }
  if(cords[0] === 2){
    return (cords[1]+14+1).toString();
  }
  if(cords[0] === 3){
    return (cords[1]+21+1).toString();
  }
  if(cords[0] === 4){
    return (cords[1]+28+1).toString();
  }
  if(cords[0] === 5){
    return (cords[1]+35+1).toString();
  }
}

function changePlayer(){
  let temp = currentPlayer;
  currentPlayer = nextPlayer;
  nextPlayer = temp;
}

handleClick = function(event) {
  let id = event.target.id;
  if(gameActive) {
    var lowestSpace = getLowestSpace(id);
    if (lowestSpace !== false){
      game[lowestSpace[0]][lowestSpace[1]] = currentPlayer;
      document.getElementById(getId(lowestSpace)).style.backgroundColor = colors[currentPlayer - 1];
      if(checkWinner()){
        alert(colors[currentPlayer-1] + " Wins!");
      }
      changePlayer();
    }
  } if (id == "button") {
    startGame();
  }
}

function checkWinner(){
  //loop through rows
  for(let row = 5; row >= 0; row--){
    var matches = 0;
    for(let col = 0; col <= 6; col++){
      if(game[row][col] === currentPlayer){
        matches++;
        if (matches === 4) {
          endGame();
          return true;
        }
      }else {
        matches = 0;
      }
    }
  }

  for(let col = 0; col <= 6; col++){
    var matches = 0;
    for (let row = 5; row >= 0; row--){
      if(game[row][col] === currentPlayer){
        matches++;
        if(matches === 4){
          endGame();
          return true;
        }
      } else {
        matches = 0;
      }
    }
  }

  for(let row = 5; row >= 3; row--){
    for (let col = 0; col <= 3; col++) {
      if (game[row][col] === currentPlayer){
        let matches = 1;
        for (var i = 1; i <= 3; i++){
          if(game[row-i][col+i] == currentPlayer){
            matches++
          }
        }
        if (matches === 4){
          endGame();
          return true;
        }
      }
    }
  }

  for(let row = 2; row >= 0; row--){
    for (let col = 0; col <= 6; col++) {
      if (game[row][col] === currentPlayer){
        let matches = 1;
        for (var i = 1; i <= 3; i++){
          if(game[row+i][col+i] == currentPlayer){
            matches++
          }
        }
        if (matches === 4){
          endGame();
          return true;
        }
      }
    }
  }
  return false;
}
function endGame(){
  gameActive = false;

  document.getElementById("button").style.display = "inherit";
  document.getElementById("table").style.borderColor = colors[currentPlayer -1];
}
function startGame(){
  let cells = document.querySelectorAll('td');
  for(var i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = 'darkgrey';
  }
  document.getElementById("table").style.borderColor = "black";
  document.getElementById("button").style.display = "none";
  game = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]
  gameActive = true;
}
//Add Click handler
var cells = document.querySelectorAll("td");
for(var i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', handleClick);
}
document.getElementById("button").addEventListener("click", handleClick);
