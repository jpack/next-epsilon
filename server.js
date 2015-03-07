var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io')(server);
var tracks = [];
var bodyParser = require('body-parser');

// configuration =================
app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/app', function(req, res) {
    res.sendfile('./public/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/display', function(req, res) {
    res.sendfile('./public/display/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

//test
app.get('/', function(req, res){
   res.sendfile('./public/display/index.html');
});

app.post('/addTrack', function(req,res){
   console.log(req.body.ID);
    addTrack(req.body);
    //pushAdd(res.body);
});

app.post('/getTrack', function(req,res){
   console.log(req.body.ID);
    var track = getTrack(req.body);
    res.send(track);
});

app.post('/deleteTrack', function(req, res){
   console.log(req.body.ID);
    deleteTrack(req.body);
    //pushDelete(res.body);
});

app.post('/updateTrack', function(req, res){
   console.log(req.body.ID);
    updateTrack(req.body);
    //pushUpdate(res.body);
});

function updateTrack(json){
    for(var i = 0; i < tracks.length; i++) {
        if (tracks[i].ID == json.ID) {
            tracks[i] = json;
        }
    }
};

function deleteTrack(json){
    for(var i = 0; i < tracks.length; i++) {
        if (tracks[i].ID == json.ID) {
            tracks.slice(i, 1);
        }
    }
};

function getTrack(json){
  for(var i = 0; i < tracks.length; i++){
      if(tracks[i].ID == json.ID) {
          if (tracks[i].lock == 0) {
              tracks[i].lock = 1; //lock file
              return tracks[i];
          } else {
              return "error"; //locked
          }
      }
  }
    return "error"; //not found
};

function addTrack(json){
    tracks.push(json);
};

console.log("App listening on port 3000");
//Added code begins below:

io.on('connection', function(socket){
    console.log('a user connected');
});
