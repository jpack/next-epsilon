window.AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();

bufferLoader = new BufferLoader(
    context,
    [
        'sounds/kick.ogg',
        'sounds/snare.ogg',
        'sounds/hihat.ogg',
        'sounds/clap.ogg',
        'sounds/bass01.ogg',
    ],
    finishedLoading
);

var tracks = [{
    sampleId: 0,
    isRecording: false,
    offset: 0,
    resolution: 1,
    repeat: 2,
    lock: false,
    volume: 1,
    notes: [
        {startTime: 1, pitch: 0},
        {startTime: 32, pitch: 0},
        {startTime: 32, pitch: 1},
        {startTime: 64, pitch: 0},
        {startTime: 96, pitch: 0},
        {startTime: 96, pitch: 1},
        {startTime: 112, pitch: 2},
    ]
},
    {
    sampleId: 1,
    isRecording: false,
    offset: 0,
    resolution: 1,
    repeat: 2,
    lock: false,
    volume: 1,
    notes: [
        {startTime: 1, pitch: 0},
        {startTime: 16, pitch: 7},
        {startTime: 32, pitch: 0},
        {startTime: 48, pitch: 7},
        {startTime: 64, pitch: 0},
        {startTime: 80, pitch: 7},
        {startTime: 96, pitch: 0},
        {startTime: 112, pitch: 7},
    ]
}];

bufferLoader.load();




function playSound(bufferId, pitch, time) {

    var source = context.createBufferSource();
    if (bufferId != 0) {
        source.buffer = bufferList[bufferId+4];
    }
    else {
        source.buffer = bufferList[pitch];
    }
    source.connect(context.destination);
    if (!source.start)
        source.start = source.noteOn;
    source.start(time);
}

var bufferList = null;
var startTime = (context.currentTime + 1.00) * 1000;
var currentTime = 0;
var loopStart = 0;
var scheduledUntil = 0;
var beat = 1/120 * 1000 * 60; //beat in milliseconds (120 bpm)
var resolution = 32;

var loop = function() {
    var time = (context.currentTime + 0.100) * 1000;
    var nextSchedule = time + 220;
    var farthestNote = 0;

    tracks.forEach(function(track) {
        track.notes.forEach(function(note) {
            var modifiedNoteTime = (note.startTime*(beat/resolution)) + startTime + track.offset + loopStart;
            if (modifiedNoteTime >= scheduledUntil && modifiedNoteTime < nextSchedule) {
                playSound(track.sampleId, note.pitch, modifiedNoteTime/1000);
                if (note.pitch == 2) {
                    console.log(loopStart);
                    console.log(modifiedNoteTime);
                }
            }
            if (modifiedNoteTime > farthestNote) {
                farthestNote = modifiedNoteTime;
            }
        });
    });

    if (farthestNote < nextSchedule) {
        var tmpFarthest = Math.floor(farthestNote);
        var tmpNext = Math.floor(nextSchedule);
        var tmpBeat = Math.floor(beat);
        loopStart = (Math.floor(nextSchedule / (beat*4))) * (beat*4);
        console.log("call")
    }

    scheduledUntil = nextSchedule;
}

function finishedLoading(list) {
    bufferList = list;
    startTime = (context.currentTime + 0.200) * 1000;

    var intervalID = window.setInterval(loop, 200);
}
