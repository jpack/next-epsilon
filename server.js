// server.js

// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var server = require('http').Server(app);
var io = require('socket.io')(server);

// configuration =================
app.use(express.static('public'));

app.get('/app', function(req, res) {
	res.sendfile('./public/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/display', function(req, res) {
    res.sendfile('./public/display/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

server.listen(3000);
console.log("App listening on port 3000");
