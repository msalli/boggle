var Board = {

  getLetters: function() {
    var selectedLetters = [];

    var dice = [
      ["A", "E", "A", "N", "E", "G"],
      ["A", "H", "S", "P", "C", "O"],
      ["A", "S", "P", "F", "F", "K"],
      ["W", "N", "G", "E", "E", "H"],
      ["L", "N", "H", "N", "R", "Z"],
      ["T", "S", "T", "I", "Y", "D"],
      ["O", "B", "J", "O", "A", "B"],
      ["O", "W", "T", "O", "A", "T"],
      ["I", "O", "T", "M", "U", "C"],
      ["E", "R", "T", "T", "Y", "L"],
      ["R", "Y", "V", "D", "E", "L"],
      ["T", "O", "E", "S", "S", "I"],
      ["L", "R", "E", "I", "X", "D"],
      ["T", "E", "R", "W", "H", "V"],
      ["E", "I", "U", "N", "E", "S"],
      ["N", "U", "I", "H", "M", "Qu"]
    ];

    dice.forEach(function(die) {
      var letter = die[Math.floor(Math.random() * die.length)];
      selectedLetters.push(letter);
    })

    return selectedLetters;
  }

}

module.exports = Board;