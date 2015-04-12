var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var users = require("./mock/users");




var app = express();
app.use('/js', express.static(__dirname + '/js'));
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(methodOverride());

app.get('/api/user', function(req, res) {
	res.json(users);
});

//application -------------------------------------------------------------
app.get('/', function(req, res) {
	res.sendfile('index.html');
});

app.listen(8080, "127.0.0.1");
console.log("App listening on port 8080");
