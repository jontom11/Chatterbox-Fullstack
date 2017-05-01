var express = require('express');
var bodyParser = require('body-parser');
var Items = require('../database-mongo');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.json());

app.post('/db', function(req,res) {
	console.log('WE ARE IN', req.body);
	var username = req.body.username;
	var message = req.body.message;

	var oneRecord = new Items({
		username: username,
		message: message
	})

	oneRecord.save(function(err, data) {
		if(err) {
			console.log('ERROR FOR DATABASE SAVE')
		}
	})


	res.end('Server Post Response: Success!')
})


app.get('/items', function (req, res) {
  console.log("received ajax get request")
  Items.find(function (err, data) {
  	if (err) {
  		console.log( 'server get request failure', err)
  	} else {
  		console.log('server get request Success!', data)
  	}
	  res.end(JSON.stringify(data));
  })
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

