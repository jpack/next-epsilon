var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io')(server);


// configuration =================
app.use(express.static('public'));

app.get('/app', function(req, res) {
    res.sendfile('./public/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/display', function(req, res) {
    res.sendfile('./public/display/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

console.log("App listening on port 3000");
//Added code begins below:

io.on('connection', function(socket){
    console.log('a user connected');
});
