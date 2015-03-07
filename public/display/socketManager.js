var socket = io();
socket.on('add', function(tracks){
    console.log(tracks);
});
socket.on('update', function(tracks){
    console.log(tracks);
});
socket.on('delete', function(tracks){
    console.log(tracks);
});
