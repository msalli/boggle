var Settings = require('./settings');

var UserActions = {

   trackHistory: [],
   validPotentialMoves: [],

   handleSubmit: function() {
    $('form').submit(function(event) {
      event.preventDefault();
      var formInput = $(this).find('#word')
      var value = formInput.val();

      $.ajax({
        url: "/add-word",
        method: "POST",
        data: { word: value }
      }).success(function(data) {
        formInput.val('');
        $('.submitted-words').append("<h5>" + data['displayWords'] + "</h5>");
        $('.boggle-letter').removeClass('highlight');
        $('#invalidEntry').addClass('hidden');
        UserActions.trackHistory = [];
        UserActions.validPotentialMoves = [];
      }).fail(function() {
        console.log("that figures");
      })
    });
  },

  checkPositionExists: function(array, value, getIndex) {
    var outcome = false;
    array.forEach(function(entry, index) {
      if (entry[0] === value[0] && entry[1] === value[1]) {
        outcome = getIndex ? index : true
      }
    });
    return outcome;
  },

  getValidMoves: function(boardPosition) {
    var potentialMoves = Settings.traverseBoard;

    // clear moves from last entry
    if (UserActions.validPotentialMoves.length !== 0) {
      UserActions.validPotentialMoves = [];
    }

    for (var i = 0; i < potentialMoves.length; i++) {
      var positionToCheck = [boardPosition[0] + potentialMoves[i][0], boardPosition[1] + potentialMoves[i][1]];
      var isValidMove = UserActions.checkPositionExists(Settings.board, positionToCheck, true);

      if (isValidMove) {
        UserActions.validPotentialMoves.push(isValidMove);
      }
    }
  },

  createHistory: function(boardIndex) {
    var boardPosition = Settings.board[boardIndex];
    UserActions.trackHistory.push(boardIndex);
    UserActions.getValidMoves(boardPosition);
  },

  handleInvalidEntry: function(formElement) {
    // formElement.parentNode.classList.add("has-error");
    document.getElementById('invalidEntry').classList.remove('hidden');
    // document.querySelector('input[type="submit"]').setAttribute('disabled', 'disabled');
    return
  },

  handleUserEntry: function () {
    var formInput = document.getElementById('word');
    var boggleBoard = document.querySelector('.boggle-board');
    var letters = Settings.letters;

    // handle keyboard entry
    formInput.onkeydown = function(event) {
      var value = String.fromCharCode(event.keyCode);
      if (letters.indexOf(value) !== -1) {
        var index = letters.indexOf(value);

          if (UserActions.validPotentialMoves.length === 0 || UserActions.validPotentialMoves.indexOf(index) !== -1) {
            UserActions.createHistory(index);
          } else {
            console.log("catch 1")
            console.log(index)
            console.log(UserActions.validPotentialMoves)
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
    boggleBoard.onclick = function(event) {
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