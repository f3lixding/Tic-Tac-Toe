var gameBoard = new Board();

// binding events
var grid = document.getElementsByClassName('grid-container')[0];

var messageBoard = function() {
  if (gameBoard.winner === undefined) {
    return;
  }
  var result = confirm('the winner is player ' + gameBoard.winner.id + '! Play again?');
  if (result) {
    gameBoard.switchPlayer();
    gameBoard.reset();
  } else {
    return;
  }
};

grid.addEventListener("click", function(e) {
  var i = Number(e.target.id.split('')[0]);
  var j = Number(e.target.id.split('')[1]);
  var isValid = gameBoard.place([i, j]);
  if (isValid) {
    event.target.innerText = gameBoard.currentPlayer.tokens[0].logo;
    setTimeout(messageBoard, 500);
  }
  gameBoard.switchPlayer();
});