var port = process.argv[2] || 8085;

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());


router.post('/form', function(req, res, next) {
	console.log(req.body);
	res.send('success');
});

app.use('/api', router);

app.listen(port, function() {
	console.log('The server listening on port ' + port);
});