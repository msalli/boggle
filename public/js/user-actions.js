var Settings = require('../../settings');

var UserActions = {

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
      }).fail(function() {
        console.log("that figures");
      })
    });
  },

  handleUserEntry: function () {
    var formInput = document.getElementById('word');
    var boggleBoard = document.querySelector('.boggle-board');
    var letters = Settings.letters;

    // match current letters with position on board
    // var currentEntry = formInput.value.split('');

    // handle keyboard entry
    formInput.onkeydown = function(event) {
      var value = String.fromCharCode(event.keyCode);
      if (letters.indexOf(value) !== -1) {
        var index = letters.indexOf(value);
        var boggleSquare = document.querySelectorAll('.boggle-letter')[index];
        boggleSquare.classList.add('highlight');
      }
    }

    // handle click on square
    boggleBoard.onclick = function(event) {
      if (event.target.classList.contains('boggle-letter')) {
        var boggleLetter = event.target;
        boggleLetter.classList.add('highlight');
        formInput.value += boggleLetter.textContent;
      }
    }
  },

  // full string entered in form field
  // values entered cannot have the same value for data-board-index
  // values must be next to each other

//   checkNeighborValues: function(element) {
//     var potentialMoves = Settings.potentialMoves;
//     var currentSquare = Settings.board[element.data('board-index')];
//     var currentValue = element.text();

//     for (var i = 0; i < potentialMoves.length; i++) {
//       var positionToCheck = [currentSquare[0] + potentialMoves[i][0], currentSquare[1] + potentialMoves[i][1]];
//       var nextIndex = UserActions.checkForSquare(Settings.board, positionToCheck, true);
//     }

//   },

//   checkForSquare: function(array, value, getIndex) {
//   var outcome = false;
//   array.forEach(function(entry, index) {
//     if (entry[0] === value[0] && entry[1] === value[1]) {
//       outcome = getIndex ? index : true
//     }
//   });
//   return outcome;
// }


}

module.exports = UserActions;