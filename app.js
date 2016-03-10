var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var Solver = require('./public/js/solver');



app.get('/', function(req, res) {
  var dummyLetters = ["A", "E", "A", "N", "E", "G", "A", "H", "S", "P", "C", "O", "W", "N", "G", "E"];
  res.render('index', { letters: dummyLetters });
});

app.post('/add-word', function(req, res) {
  var displayWords = req.body.word;
  res.send({ displayWords: displayWords })
});

app.get('/solve', function(req, res) {
  var letters = req.query.letters;
  var answers = Solver.getAll(letters)
  res.send({ answers: answers });
})


http.listen(process.env.PORT || 3000, function() {
  console.log("server's up");
});