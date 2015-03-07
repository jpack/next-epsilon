var socket = io();
socket.on('update', function(tracks){
    console.log(tracks);
});
