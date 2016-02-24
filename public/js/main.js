var Timer = require('./timer');
var UserActions = require('./user-actions')

document.addEventListener("DOMContentLoaded", function(event) {

  UserActions.handleUserEntry();
  UserActions.handleSubmit();
  Timer.initializeClock(new Date());

})
