var socket = io();
socket.on('add', function(track){
    console.log(track);
});
socket.on('update', function(track){
    console.log(track);
});
socket.on('delete', function(id){
    console.log(tracks);
});
