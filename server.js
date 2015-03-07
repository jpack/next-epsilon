var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io')(server);
var tracks = [];
var bodyParser = require('body-parser');

// configuration =================
app.use(express.static('public'));

//use bodyParser to fill JSON files from POST requests.
app.use(bodyParser.json());

//Handles get requests for /app, redirects to the app itself
app.get('/app', function(req, res) {
    res.sendfile('./public/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

//Handles get requests for /display, redirects to the display part of the app.
app.get('/display', function(req, res) {
    res.sendfile('./public/display/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// POST Handlers =================

//Handles post requests for adding tracks.
app.post('/addTrack', function(req,res){
   console.log(req.body.ID);
    addTrack(req.body);
    pushAdd(res.body);
    res.send("Received");
});

//Handles post requests for getting tracks, and send the track back.
app.post('/getTrack', function(req,res){
   console.log(req.body.ID);
    var track = getTrack(req.body);
    res.send(track);
});

//Handles post requests for track deletion.
app.post('/deleteTrack', function(req, res){
   console.log(req.body.ID);
    deleteTrack(req.body);
    pushDelete(res.body);
    res.send("Deleted");
});

//Handles post requests for track updates.
app.post('/updateTrack', function(req, res){
   console.log(req.body.ID);
    updateTrack(req.body);
    pushUpdate(res.body);
    res.send("Updated");
});

// Track Handling Functions =================

//Locates a track, updates it, then unlocks it.
function updateTrack(json){
    for(var i = 0; i < tracks.length; i++) {
        if (tracks[i].ID == json.ID) {
            tracks[i] = json;
            tracks[i].lock = 0; //unlock track
        }
    }
};

//Deletes a JSON Track from memory
function deleteTrack(json){
    for(var i = 0; i < tracks.length; i++) {
        if (tracks[i].ID == json.ID) {
            tracks.slice(i, 1);
        }
    }
};

//Returns a JSON Track from memory if it exists, and locks the track.
//Returns "error" if track is locked, or does not exist.
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

//Adds JSON track to the array of tracks
function addTrack(json){
    tracks.push(json);
};

//pushes JSON Track id to delete from display
function pushDelete(id) {
    console.log("Pushed Delete");
    io.emit('delete', id);
}

//Pushes JSON track to display to add
function pushAdd(JSONTrackToAdd) {
    console.log("pushed Add");
    io.emit('add', JSONTrackToAdd);
}

//Pushes JSON track to display for update
function pushUpdate(JSONTrackToUpdate) {
    console.log("Pushed Update");
    io.emit('update', JSONTrackToUpdate);
}

//Emits JSON Note to sockets.
function pushNote(JSONNote){
    console.log("pushed Note");
    io.emit('note', JSONNote);
}

// Socket IO =================

//Listens for noteSend on a socket, then calls pushNote with it.
io.on('noteSend', function(JSONNote){
   console.log("Note Recieved");
    pushNote(JSONNote);
});

console.log("App listening on port 3000");
//Added code begins below:

io.on('connection', function(socket){
    console.log('a user connected');
});
