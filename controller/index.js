var gameBoard = new Board();

// binding events
var grid = document.getElementsByClassName('grid-container')[0];

grid.addEventListener("click", function(e) {
  var i = Number(e.target.id.split('')[0]);
  var j = Number(e.target.id.split('')[1]);
  var result = gameBoard.place([i, j]);
  if (result) {
    event.target.innerText = gameBoard.currentPlayer.tokens[0].logo;
    if (gameBoard.winner !== undefined) {
      var result = confirm('the winner is player ' + gameBoard.winner + '! Play again?');
      if (result) {
        location.reload();
      } else {
        return;
      }
    }
  }
  gameBoard.switchPlayer();
});