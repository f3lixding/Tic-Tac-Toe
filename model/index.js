class Player {
  constructor(id) {
    this.id = id;
    this.tokens = [];
    this.wins = 0;
  }

  place(token) {
    this.tokens.push(token);
  }
}

class Token {
  constructor(newCoord, id) {
    this.id = id;
    this.coord = newCoord;
    this.logo = id === 1 ? '❌' : '⚪';
  }
}

class Board {
  constructor() {
    this.status = [[undefined, undefined, undefined],[undefined, undefined, undefined],[undefined, undefined, undefined]];
    this.players = [new Player(1), new Player(2)];
    this.currentPlayer = this.players[0];
    this.winner;
  }

  place(newCoord) {
    var i = newCoord[0];
    var j = newCoord[1];
    if (this.status[i][j] !== undefined) {
      // space is already occupied
      return false;
    }
    this.status[i][j] = new Token(newCoord, this.currentPlayer.id);
    this.currentPlayer.place(this.status[i][j]);
    this.checkWin();
    return true;
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  reset() {
    var gridItems = document.getElementsByClassName('grid-item');
    var scores = document.getElementsByClassName('score');
    // re-rendering grid
    for (var i = 0; i < gridItems.length; i++) {
      gridItems[i].innerText = '';
    }
    //re-rendering scoreBoard
    for (var i = 0; i < scores.length; i++) {
      scores[i].innerText = 'player ' + String(i + 1) + ' victories: ' + String(this.players[i].wins);
    }
    //reset game state
    for (var i = 0; i < this.status.length; i++) {
      for (var j = 0; j < this.status[i].length; j++) {
        this.status[i][j] = undefined;
      }
    }
    // reset winner
    this.winner = undefined;
  }

  checkWin() {
    var lastPlaced = this.currentPlayer.tokens[this.currentPlayer.tokens.length - 1];
    var dirs = [[1, 0, -1, 0], [0, 1, 0, -1], [1, 1, -1, -1], [1, -1, -1, 1]];
    for (var dir of dirs) {
      var acc = 1;
      var i = 0;
      var X = lastPlaced.coord[1];
      var Y = lastPlaced.coord[0];
      while (i < dir.length - 1) {
        var newX = X + dir[i];
        var newY = Y + dir[i + 1];
        while (newX >= 0 && newX < this.status[0].length && newY >= 0 && newY < this.status.length && this.status[newY][newX] && this.status[newY][newX].id === lastPlaced.id) {
          acc++;
          newX += dir[i];
          newY += dir[i + 1];
          if (acc === 3) {
            this.winner = this.currentPlayer;
            this.winner.wins++;
          }
        }
        i += 2;
      }
    }
  }
}