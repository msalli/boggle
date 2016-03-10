var Boggle = require('./boggle').getBoggle();

var Solver = {

  Answers: [],

  getAll: function(letters) {
    var board = Boggle.board;

    for (var i = 0; i < board.length; i++) {
      Solver.solveGame(i, letters)
    }
    return Solver.Answers;
  },

  solveGame: function(index, letters, moveHistory) {
    var board = Boggle.board;
    var potentialMoves = Boggle.potentialMoves

    var currentSquare = board[index]; // board value, ex. [0,0]
    var moveHistory = moveHistory || [index]; // store indicies of squares visited

    // check each adjacent square on the board
    for (var i = 0; i < potentialMoves.length; i++) {
      var adjacentSquare = [currentSquare[0] + potentialMoves[i][0], currentSquare[1] + potentialMoves[i][1]];

      if (Solver.isSquareOnBoard(adjacentSquare)) {
        var adjacentSquareIndex = Solver.getIndexForSquare(adjacentSquare);

        // if square hasn't been checked
        if (moveHistory.indexOf(adjacentSquareIndex) === -1) {
          moveHistory.push(adjacentSquareIndex);

          var word = Solver.getWord(letters, moveHistory);

          // Keeping it short for now
          if (word.length <= 4) {
            if (Boggle.dictionary.hasOwnProperty(word)) {
              Solver.Answers.push(word);
            }
            // recursive step
            // move to next square, keep tracking move history
            Solver.solveGame(adjacentSquareIndex, letters, moveHistory);
          } else {
            moveHistory.pop()
          }
        }
      }

    }
    // if all adjacent squares have been checked - pop one off
    moveHistory.pop()
  },

  isSquareOnBoard: function(value) {
    var board = Boggle.board;

    for(var i = 0; i < board.length; i++) {
      if (board[i][0] === value[0] && board[i][1] === value[1]) {
        return true
      }
    }
    return false
  },

  getIndexForSquare: function(value) {
    var board = Boggle.board;

    for(var i = 0; i < board.length; i++) {
      if (board[i][0] === value[0] && board[i][1] === value[1]) {
        return i;
      }
    }
    return -1;
  },

  getWord: function(letters, moveHistory) {
    var word = "";
    moveHistory.forEach(function(entry) {
      var letter = letters[entry];
      word = word + letter
    });

    return word.toUpperCase();
  }

}

module.exports = Solver;


