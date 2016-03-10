var Timer = require('./timer');
var UserActions = require('./user-actions');
var Boggle = require('./boggle').getBoggle();

document.addEventListener("DOMContentLoaded", function(event) {
  UserActions.handleUserEntry();
  UserActions.handleSubmit();

  // Start New Game
  $('.btn-new-game').click(function() {
    var newLetters = Boggle.letters;

    // UI STUFF
    var boggleSquares = $('.boggle-board').find('.boggle-letter')
    boggleSquares.each(function(index, square) {
      $(square).text(newLetters[index]);
    })

    $('.btn-new-game').fadeOut('fast');
    $('.overlay').fadeOut('fast');
    Timer.initializeClock(new Date());

    // start request to get answers
    $.ajax({
      url: "/solve",
      method: "GET",
      data: { letters: Boggle.letters }
    }).done(function(data) {
      Boggle.answers = data['answers'];
    })
  });
});
