var socket = io();
socket.on('add', function(track){
    console.log(track);
    add(track);
});
socket.on('update', function(track){
    console.log(track);
    update(track);
});
socket.on('delete', function(ID){
    console.log(ID);
    deleteID(ID);
});
socket.on('note', function(note){
});
socket.on('volume', function(note){
    console.log(note);
});
socket.on('volumeChange', function(trackVol){
    console.log(trackVol);
    changeVolume(trackVol);
});
