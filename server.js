var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var port = 8080;

server.use(express.static(__dirname + '/app'));
server.use(bodyParser.json());
server.use(bodyParser.json({ type: 'application/vdn.api+json' }));

server.listen(port);
console.log("App listening on port " + port);


//application
server.get('*', function(req, res) {
  res.sendfile('./app/index.html');
});
