var Timer = require('./timer');
var UserActions = require('./user-actions')

document.addEventListener("DOMContentLoaded", function(event) {

  UserActions.handleUserEntry();
  UserActions.handleSubmit();
  Timer.initializeClock(new Date());

  // letters must be next to each other
  function checkValue(value, letters) {

  }


})


//things i want to happen
// on entering a letter - highlight the correct box
// don't let them enter a letter that is not next to that letter
// so need a smaller version of the full word script