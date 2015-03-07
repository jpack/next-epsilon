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
        'sounds/synth.ogg',
        'sounds/8bit.ogg',
        'sounds/beepbass.ogg',
    ],
    finishedLoading
);

var tracks = []
/*{
    ID: 0,
    sampleId: 0,
    isRecording: false,
    offset: 0,
    resolution: 1,
    repeat: 3,
    lock: false,
    volume: 1.3,
    notes: [
        {startTime: 0, pitch: 0},
        {startTime: 2, pitch: 2},
        {startTime: 4, pitch: 0},
        {startTime: 4, pitch: 1},
        {startTime: 6, pitch: 2},
        {startTime: 8, pitch: 0},
        {startTime: 8, pitch: 1},
        {startTime: 10, pitch: 2},
        {startTime: 12, pitch: 0},
        {startTime: 12, pitch: 1},
        {startTime: 14, pitch: 2},
    ]
},
    {
        ID: 1,
    sampleId: 5,
    isRecording: false,
    offset: 0,
    resolution: 1,
    repeat: 0,
    lock: false,
    volume: 1,
    notes: [
        {startTime: 0, pitch: 0},
        {startTime: 2, pitch: 7},
        {startTime: 4, pitch: 0},
        {startTime: 6, pitch: 7},
        {startTime: 8, pitch: 0},
        {startTime: 10, pitch: 7},
        {startTime: 12, pitch: 0},
        {startTime: 14, pitch: 7},
        {startTime: 16, pitch: 0},
        {startTime: 18, pitch: 7},
        {startTime: 20, pitch: 0},
        {startTime: 22, pitch: 7},
        {startTime: 24, pitch: 0},
        {startTime: 26, pitch: 7},
        {startTime: 28, pitch: 0},
        {startTime: 30, pitch: 7},
        {startTime: 32, pitch: 6},
        {startTime: 34, pitch: 13},
        {startTime: 36, pitch: 6},
        {startTime: 38, pitch: 13},
        {startTime: 40, pitch: 6},
        {startTime: 42, pitch: 13},
        {startTime: 44, pitch: 6},
        {startTime: 46, pitch: 13},
        {startTime: 48, pitch: 6},
        {startTime: 50, pitch: 13},
        {startTime: 52, pitch: 6},
        {startTime: 54, pitch: 13},
        {startTime: 56, pitch: 6},
        {startTime: 58, pitch: 13},
        {startTime: 60, pitch: 6},
        {startTime: 62, pitch: 13},
    ]
},
    {
        ID: 2,
        sampleId: 4,
        isRecording: false,
        offset: 0,
        resolution: 1,
        repeat: 0,
        lock: false,
        volume: 1,
        notes: [
            {startTime: 0, pitch: 3},
            {startTime: 4, pitch: 5},
            {startTime: 8, pitch: 6},
            {startTime: 12, pitch: 7},
            {startTime: 14, pitch: 6},
            {startTime: 18, pitch: 5},
            {startTime: 22, pitch: 3},
            {startTime: 32, pitch: 2},
            {startTime: 36, pitch: 5},
            {startTime: 40, pitch: 6},
            {startTime: 44, pitch: 7},
            {startTime: 46, pitch: 6},
            {startTime: 50, pitch: 5},
            {startTime: 54, pitch: 2},
        ]
    },
    {
        ID: 3,
        sampleId: 3,
        isRecording: false,
        offset: 0,
        resolution: 1,
        repeat: 2,
        lock: false,
        volume: 0,
        notes: [
            {startTime: 0, pitch: 0},
            {startTime: 0, pitch: 4},
            {startTime: 2, pitch: 0},
            {startTime: 2, pitch: 4},
            {startTime: 4, pitch: 0},
            {startTime: 4, pitch: 4},
            {startTime: 6, pitch: 0},
            {startTime: 6, pitch: 4},
            {startTime: 8, pitch: 0},
            {startTime: 8, pitch: 4},
            {startTime: 10, pitch: 0},
            {startTime: 10, pitch: 4},
            {startTime: 12, pitch: 0},
            {startTime: 12, pitch: 4},
            {startTime: 14, pitch: 0},
            {startTime: 14, pitch: 4},
        ]
}]; */

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
    14,
    16,
    17,
    19,
    21,
    23,
];

function allTracks(allTracks) {
    tracks = allTracks;
}

function changeVolume(volume) {
    for(var i = 0; i < tracks.length; i++) {
        if (tracks[i].ID == volume.id) {
            console.log("haha");
            tracks[i].volume = volume.volume;
        }
    }
}

function add(Track){
    tracks.push(Track);
}

function update(Track){
    for(var i = 0; i < tracks.length; i++) {
        if (tracks[i].ID == Track.ID) {
            tracks[i] = Track;
        }
    }
}

function deleteID(ID){
    for(var i = 0; i < tracks.length; i++) {
        if (tracks[i].ID == ID) {
            tracks.slice(i, 1);
        }
    }
}

function playNote(note) {
    playSound(note.sampleId, note.pitch, 1, context.currentTime );
    pulse();
}

function playSound(bufferId, pitch, volume, time) {

    var source = context.createBufferSource();
    if (bufferId != 0) {
        source.buffer = bufferList[bufferId+3];
        source.playbackRate.value = (Math.pow(2, (pitchToSemitones[pitch] / 12)));
    }
    else {
        source.buffer = bufferList[pitch];
    }
    var gainNode = context.createGain();
    source.connect(gainNode);
    gainNode.gain.value = volume;
    gainNode.connect(context.destination);
    if (!source.start)
        source.start = source.noteOn;
    source.start(time);
}

var bufferList = null;
var startTime = (context.currentTime + 1.00) * 1000;
var currentTime = 0;
var loopStart = 0;
var scheduledUntil = 0;
var beat = 1/140 * 1000 * 60; //beat in milliseconds (120 bpm)
var resolution = 4;

var loop = function() {
    var time = (context.currentTime + 0.100) * 1000;
    var nextSchedule = time + 220;
    var farthestNote = 0;

    tracks.forEach(function(track) {
        var myMaxLength= 0;
        for (var i = 0; i <= track.repeat; i++) {
            track.notes.forEach(function (note) {
                var modifiedNoteTime = (note.startTime * (beat / resolution)) + startTime + (track.offset * beat * 4) + loopStart + (i * (Math.floor(myMaxLength/32) + 1) * beat * 4);
                if (modifiedNoteTime >= scheduledUntil && modifiedNoteTime < nextSchedule) {
                    playSound(track.sampleId, note.pitch, track.volume, modifiedNoteTime / 1000);
                    pulse();
                }
                if (modifiedNoteTime > farthestNote) {
                    farthestNote = modifiedNoteTime;
                }
                if (i == 0 && myMaxLength < note.startTime) {
                    myMaxLength = note.startTime;
                }
            });
        }
    });

    if (farthestNote < nextSchedule) {
        console.log(((farthestNote-startTime) / (beat*4)));
        loopStart = (Math.floor((farthestNote-startTime) / (beat*4))+1) * (beat*4);
    }

    scheduledUntil = nextSchedule;
}

function finishedLoading(list) {
    bufferList = list;
    startTime = (context.currentTime + 0.200) * 1000;

    var intervalID = window.setInterval(loop, 200);
}
