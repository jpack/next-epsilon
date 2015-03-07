function emitDeleteTrack(int id) {
	io.emit('deleteTrack', id);	
}

function emitAddTrack(string JSONTrackToAdd) {
	io.emit('addTrack', JSONTrackToAdd);
}

function emitUpdateTrack(string JSONTrackToUpdate) {
	io.emit('updateTrack', JSONTrackToUpdate);
}