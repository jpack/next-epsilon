var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io')(server);
var tracks = [
    {
        ID: 0,
        trackName: "Drum Loop",
        sampleId: 0,
        isRecording: false,
        offset: 0,
        resolution: 1,
        repeat: 7,
        lock: false,
        volume: 1.3,
        notes: [
            {startTime: 0, pitch: 0},
            {startTime: 2, pitch: 2},
            {startTime: 2, pitch: 4},
            {startTime: 4, pitch: 0},
            {startTime: 4, pitch: 1},
            {startTime: 4, pitch: 4},
            {startTime: 6, pitch: 2},
            {startTime: 7, pitch: 2},
            {startTime: 8, pitch: 0},
            {startTime: 10, pitch: 2},
            {startTime: 12, pitch: 0},
            {startTime: 12, pitch: 1},
            {startTime: 14, pitch: 2},
            {startTime: 14, pitch: 4},
            {startTime: 15, pitch: 4},
        ]
    },
    {
        ID: 1,
        trackName: "Beepin' Bass",
        sampleId: 1,
        isRecording: false,
        offset: 0,
        resolution: 1,
        repeat: 1,
        lock: false,
        volume: 1,
        notes: [
            {startTime: 0, pitch: 1},
            {startTime: 2, pitch: 8},
            {startTime: 4, pitch: 1},
            {startTime: 6, pitch: 8},
            {startTime: 8, pitch: 1},
            {startTime: 10, pitch: 8},
            {startTime: 12, pitch: 1},
            {startTime: 14, pitch: 8},

            {startTime: 16, pitch: 4},
            {startTime: 18, pitch: 11},
            {startTime: 20, pitch: 4},
            {startTime: 22, pitch: 11},
            {startTime: 24, pitch: 4},
            {startTime: 26, pitch: 11},
            {startTime: 28, pitch: 4},
            {startTime: 30, pitch: 11},

            {startTime: 32, pitch: 0},
            {startTime: 34, pitch: 7},
            {startTime: 36, pitch: 0},
            {startTime: 38, pitch: 7},
            {startTime: 40, pitch: 0},
            {startTime: 42, pitch: 7},
            {startTime: 44, pitch: 0},
            {startTime: 46, pitch: 7},

            {startTime: 48, pitch: 2},
            {startTime: 50, pitch: 9},
            {startTime: 52, pitch: 2},
            {startTime: 54, pitch: 9},
            {startTime: 56, pitch: 2},
            {startTime: 58, pitch: 9},
            {startTime: 60, pitch: 2},
            {startTime: 62, pitch: 9},
        ]
    },
    {
        ID: 2,
        trackName: "Sweet Synth",
        sampleId: 3,
        isRecording: false,
        offset: 0,
        resolution: 1,
        repeat: 1,
        lock: false,
        volume: 1,
        notes: [
            /*Chord 1 */
            {startTime: 0, pitch: 1},
            {startTime: 0, pitch: 3},
            {startTime: 0, pitch: 8},

            {startTime: 4, pitch: 1},
            {startTime: 4, pitch: 3},
            {startTime: 4, pitch: 8},

            {startTime: 8, pitch: 1},
            {startTime: 8, pitch: 3},
            {startTime: 8, pitch: 8},

            {startTime: 12, pitch: 1},
            {startTime: 12, pitch: 3},
            {startTime: 12, pitch: 8},

            /*Chord 2 */
            {startTime: 16, pitch: 1},
            {startTime: 16, pitch: 4},
            {startTime: 16, pitch: 8},

            {startTime: 20, pitch: 1},
            {startTime: 20, pitch: 4},
            {startTime: 20, pitch: 8},

            {startTime: 24, pitch: 1},
            {startTime: 24, pitch: 4},
            {startTime: 24, pitch: 8},

            {startTime: 28, pitch: 1},
            {startTime: 28, pitch: 4},
            {startTime: 28, pitch: 8},

            /*Chord 3 */
            {startTime: 32, pitch: 0},
            {startTime: 32, pitch: 4},
            {startTime: 32, pitch: 6.5},

            {startTime: 36, pitch: 0},
            {startTime: 36, pitch: 4},
            {startTime: 36, pitch: 6.5},

            {startTime: 40, pitch: 0},
            {startTime: 40, pitch: 4},
            {startTime: 40, pitch: 6.5},

            {startTime: 44, pitch: 0},
            {startTime: 44, pitch: 4},
            {startTime: 44, pitch: 6.5},

            /*Chord 4 */
            {startTime: 48, pitch: -2},
            {startTime: 48, pitch: 2},
            {startTime: 48, pitch: 5},

            {startTime: 52, pitch: -2},
            {startTime: 52, pitch: 2},
            {startTime: 52, pitch: 5},

            {startTime: 56, pitch: -2},
            {startTime: 56, pitch: 2},
            {startTime: 56, pitch: 5},

            {startTime: 60, pitch: -2},
            {startTime: 60, pitch: 2},
            {startTime: 60, pitch: 5},
        ]
    },
    {
        ID: 3,
        trackName: "Melody",
        sampleId: 4,
        isRecording: false,
        offset: 0,
        resolution: 1,
        repeat: 0,
        lock: false,
        volume: 1.3,
        notes: [
            /*Chord 1 */
            {startTime: 0, pitch: 2},

            {startTime: 16, pitch: 4},
            {startTime: 28, pitch: 3},
            {startTime: 30, pitch: 2},

            {startTime: 32, pitch: 0},
            {startTime: 44, pitch: 3},
            {startTime: 46, pitch: 2},

            {startTime: 48, pitch: 0},


            {startTime: 64, pitch: 2},

            {startTime: 80, pitch: 1},
            {startTime: 92, pitch: 2},
            {startTime: 94, pitch: 3},

            {startTime: 96, pitch: 0},
            {startTime: 100, pitch: 2},
            {startTime: 104, pitch: 4},
            {startTime: 108, pitch: 2},

            {startTime: 112, pitch: 4},
            {startTime: 116, pitch: 4},
            {startTime: 120, pitch: 4},
            {startTime: 122, pitch: 3},
            {startTime: 124, pitch: 2},
            {startTime: 126, pitch: 3},
        ]
    }
];
var bodyParser = require('body-parser');


// configuration =================
app.use(express.static('public'));

//use bodyParser to fill JSON files from POST requests.
app.use(bodyParser.json());

//Handles get requests for /app, redirects to the app itself
app.get('/app', function(req, res) {
    res.sendFile('./public/app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

//Handles get requests for /display, redirects to the display part of the app.
app.get('/display', function(req, res) {
    res.sendFile('./public/display/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// POST Handlers =================

app.get('/getTracks', function(req, res){
    res.send(tracks);
});

//Handles post requests for adding tracks.
app.post('/addTrack', function(req,res){
   console.log(req.body);
    addTrack(req.body);
    pushAdd(req.body);
    res.send(req.body);
});

//Handles post requests for getting tracks, and send the track back.
app.post('/getTrack', function(req,res){
   console.log(req.body.ID);
    var track = getTrack(req.body);
    res.send(track);
});

//Handles post requests for track deletion.
app.post('/deleteTrack', function(req, res){
   console.log("ATTEMPTING DELETE ON: " + req.body.ID);
    deleteTrack(req.body);
    pushDelete(req.body);
    res.send("Deleted");
});

//Handles post requests for track updates.
app.post('/updateTrack', function(req, res){
   console.log(req.body.ID);
    updateTrack(req.body);
    pushUpdate(req.body);
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
    console.log("Attempting Delete: ");
    for(var i = 0; i < tracks.length; i++) {
        if (tracks[i].ID == json.ID) {
            tracks.splice(i, 1);
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

io.sockets.on('connect', function(socket){
    console.log('a user connected');
    socket.on('volume', function(volume){
        console.log("pushed volume change");
        io.emit('volumeChange', volume);
    });

    //Listens for noteSend on a socket, then calls pushNote with it.
    socket.on('noteSend', function(JSONNote){
        console.log("Note Recieved");
        pushNote(JSONNote);
    });

    socket.on('getTracks', function(nothing){
       console.log("getTracks!");
        io.emit('allTracks', tracks);
    });
});

console.log("App listening on port 3000");
