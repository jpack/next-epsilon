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
        'sounds/electric_ping01.ogg',
    ],
    finishedLoading
);

var tracks = [{
    sampleId: 0,
    isRecording: false,
    offset: 0,
    resolution: 1,
    repeat: 0,
    lock: false,
    volume: 1,
    notes: [
        {startTime: 0, pitch: 0},
        {startTime: 4, pitch: 0},
        {startTime: 4, pitch: 1},
        {startTime: 8, pitch: 0},
        {startTime: 8, pitch: 0},
        {startTime: 12, pitch: 1},
        {startTime: 14, pitch: 2},
    ]
},
    {
    sampleId: 1,
    isRecording: false,
    offset: 0,
    resolution: 1,
    repeat: 1,
    lock: false,
    volume: 1,
    notes: [
        {startTime: 0, pitch: 0},
        {startTime: 2, pitch: 7},
        {startTime: 4, pitch: 0},
        {startTime: 6, pitch: 7},
        {startTime: 8, pitch: 0},
        {startTime: 10, pitch: 7},
        {startTime: 12, pitch: 5},
        {startTime: 14, pitch: 4},
    ]
},
    {
        sampleId: 2,
        isRecording: false,
        offset: 0,
        resolution: 1,
        repeat: 0,
        lock: false,
        volume: 1,
        notes: [
            {startTime: 0, pitch: 7},
            {startTime: 2, pitch: 6},
            {startTime: 4, pitch: 2},
            {startTime: 8, pitch: 7},
            {startTime: 10, pitch: 5},
            {startTime: 11, pitch: 5},
            {startTime: 12, pitch: 5},
            {startTime: 14, pitch: 0},
        ]
}];

bufferLoader.load();

var pitchToSemitones = [
    0,
    2,
    4,
    5,
    7,
    9,
    11,
    12,
];




function playSound(bufferId, pitch, time) {

    var source = context.createBufferSource();
    if (bufferId != 0) {
        source.buffer = bufferList[bufferId+3];
        console.log(Math.pow(2, pitchToSemitones[pitch] / 12));
        source.playbackRate.value = (Math.pow(2, (pitchToSemitones[pitch] / 12)));
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
var resolution = 4;

var loop = function() {
    var time = (context.currentTime + 0.100) * 1000;
    var nextSchedule = time + 220;
    var farthestNote = 0;

    tracks.forEach(function(track) {
            track.notes.forEach(function (note) {
                var modifiedNoteTime = (note.startTime * (beat / resolution)) + startTime + track.offset + loopStart;
                if (modifiedNoteTime >= scheduledUntil && modifiedNoteTime < nextSchedule) {
                    playSound(track.sampleId, note.pitch, modifiedNoteTime / 1000);
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
    }

    scheduledUntil = nextSchedule;
}

function finishedLoading(list) {
    bufferList = list;
    startTime = (context.currentTime + 0.200) * 1000;

    var intervalID = window.setInterval(loop, 200);
}
