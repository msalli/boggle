var Boggle = require('./boggle').getBoggle();

var UserActions = {

  trackHistory: [],
  validPotentialMoves: [],
  letters: Boggle.letters,
  dictionary: Boggle.dictionary,
  board: Boggle.board,
  potentialMoves: Boggle.potentialMoves,
  submittedWords: [],
  points: 0,

  // submitting a word
  handleSubmit: function() {
    $('form').submit(function(event) {
      event.preventDefault();
      var formInput = $(this).find('#word')
      var value = formInput.val();

      $.ajax({
        url: "/add-word",
        method: "POST",
        data: { word: value }
      }).done(function(data) {
        var word = data['displayWords']
        // reset
        formInput.val('');
        UserActions.trackHistory = [];
        UserActions.validPotentialMoves = [];

        // save word and calculate points
        UserActions.submittedWords.push(word);
        if (UserActions.dictionary.hasOwnProperty(word)) {
          UserActions.points = UserActions.points + word.length
          $('.point-tracker').text(UserActions.points)
        }

        // UI STUFF
        $('.submitted-words').append("<h5>" + word + "</h5>");
        $('.boggle-letter').removeClass('highlight');
        $('#invalidEntry').addClass('hidden');
      }).fail(function() {
        console.log("something done broke");
      })
    });
  },

  getIndexForSquare: function(value) {
    var board = UserActions.board;

    for(var i = 0; i < board.length; i++) {
      if (board[i][0] === value[0] && board[i][1] === value[1]) {
        return i;
      }
    }
    return -1;
  },

  getValidMoves: function(currentSquare) {
    var potentialMoves = UserActions.potentialMoves;

    // clear potential moves from last entry
    if (UserActions.validPotentialMoves.length !== 0) {
      UserActions.validPotentialMoves = [];
    }

    // find all adjacent squares
    for (var i = 0; i < potentialMoves.length; i++) {
      var adjacentSquare = [currentSquare[0] + potentialMoves[i][0], currentSquare[1] + potentialMoves[i][1]];
      var adjacentSquareIndex = UserActions.getIndexForSquare(adjacentSquare);

      // if square is on the board and hasn't already been selected
      if (adjacentSquareIndex !== -1 && UserActions.trackHistory.indexOf(adjacentSquareIndex) === -1) {
        UserActions.validPotentialMoves.push(adjacentSquareIndex);
      }
    }
  },

  createHistory: function(boardIndex) {
    var currentSquare = UserActions.board[boardIndex];
    UserActions.trackHistory.push(boardIndex);
    UserActions.getValidMoves(currentSquare);
  },

  handleInvalidEntry: function(formElement) {
    document.getElementById('invalidEntry').classList.remove('hidden');
    return
  },

  handleUserEntry: function () {
    var formInput = document.getElementById('word');
    var boggleBoardEl = document.querySelector('.boggle-board');
    var letters = UserActions.letters;

    // handle keyboard entry
    formInput.onkeydown = function(event) {
      var value = String.fromCharCode(event.keyCode);
      if (letters.indexOf(value) !== -1) {
        // use the entered value to figure out letter, instead of index...
        var index = letters.indexOf(value);

          if (UserActions.validPotentialMoves.length === 0 || UserActions.validPotentialMoves.indexOf(index) !== -1) {
            UserActions.createHistory(index);
          } else {
            console.log("catch 1")
            UserActions.handleInvalidEntry(formInput);
          }

        // UI STUFF
        var boggleLetter = document.querySelectorAll('.boggle-letter')[index];
        boggleLetter.classList.add('highlight');
      } else {
        if (index !== undefined) {
          UserActions.handleInvalidEntry(formInput);
        }
      }

    }

    // handle click on square
    boggleBoardEl.onclick = function(event) {
      if (event.target.classList.contains('boggle-letter')) {
        var index = parseInt(event.target.dataset.boardIndex);

          if (UserActions.validPotentialMoves.length === 0 || UserActions.validPotentialMoves.indexOf(index) !== -1) {
            UserActions.createHistory(index);
          } else {
            console.log("catch 3")
            UserActions.handleInvalidEntry(formInput);
          }

        //UI STUFF
        var boggleLetter = event.target;
        boggleLetter.classList.add('highlight');
        formInput.value += boggleLetter.textContent;
      }
    }
  }


}

module.exports = UserActions;