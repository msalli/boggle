var Boggle = require('./boggle').getBoggle();
var UserActions = require('./user-actions')

var Timer = {

  initializeClock: function(startTime) {
    var timerEl = document.getElementById('boggle-timer');

    var timeInterval = setInterval(function() {
      var timer = Timer.countdown(startTime);
      if (timer.seconds < 10) {
        timer.seconds = "0" + timer.seconds
      }

      timerEl.textContent = timer.minutes + ":" + timer.seconds

      if (timer.total <= 0) {
        window.clearInterval(timeInterval);
        timerEl.textContent = "Time's up!"
        var formInput = document.getElementById('word');
        var submitButton = document.querySelector('.submit-btn');
        formInput.setAttribute('disabled', 'disabled');
        submitButton.setAttribute('disabled', 'disabled');
        Timer.gameOver(Boggle.answers, UserActions.submittedWords, UserActions.points);
      }

    }, 1000)
  },

  countdown: function(startTime) {
    var time = (Date.parse(startTime) + 180000) - Date.parse(new Date());
    var seconds = Math.floor( (time/1000) % 60 );
    var minutes = Math.floor( (time/1000/60) % 60 );

    return {
      'total': time,
      'minutes': minutes,
      'seconds': seconds
    }
  },

  gameOver: function(answers, userAnswers, points) {
    var parentDiv = document.querySelector('.game-over');
    var allWordsDiv = document.querySelector('.all-words');
    var totalPoints = answers.length * 4;
    var userPoints;

    for (var i = 0; i < answers.length; i++) {
      var newEl = document.createElement('h5');
      var textNode = document.createTextNode(answers[i]);
      newEl.appendChild(textNode);
      newEl.classList.add('boggle-answer');

      if (userAnswers.indexOf(answers[i]) !== -1) {
        newEl.classList.add('winner');
        userPoints += answers[i].length;
      }

      allWordsDiv.appendChild(newEl);
    }

    document.querySelector('.boggle-word-bank').removeChild(document.querySelector('.submitted-words'))
    parentDiv.classList.remove('hidden');
  }

}


module.exports = Timer;





