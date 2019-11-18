var gameBoard = new Board();

// binding events
var grid = document.getElementsByClassName('grid-container')[0];
var nameForm = document.getElementById('player-names');

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

nameForm.addEventListener('keypress', function(e) {
  if (e.keyCode == 13) {
    gameBoard.players[0].name = document.getElementById('player-1-name').value;
    gameBoard.players[1].name = document.getElementById('player-2-name').value;
    document.getElementById('player-1-name').value = '';
    document.getElementById('player-2-name').value = '';
    var scores = document.getElementsByClassName('score');
    for (var i = 0; i < scores.length; i++) {
      scores[i].innerText = 'player ' + (gameBoard.players[i].name || String(i + 1)) + ' victories: ' + String(gameBoard.players[i].wins);
    }
  }
});

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