var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').createServer(app);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var Settings = require('./settings')

app.get('/', function(req, res) {
  res.render('index', { letters: Settings.letters });
});

app.post('/add-word', function(req, res) {
  var displayWords = req.body.word;
  res.send({ displayWords: displayWords })
})


http.listen(3000, function() {
  console.log("server's up");
});