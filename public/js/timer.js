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
        form.setAttribute('disabled', 'disabled');
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
  }

}


module.exports = Timer;





