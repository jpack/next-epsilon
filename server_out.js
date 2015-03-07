function emitDeleteTrack(id) {
	io.emit('deleteTrack', id);	
}

function emitAddTrack(JSONTrackToAdd) {
	io.emit('addTrack', JSONTrackToAdd);
}

function emitUpdateTrack(JSONTrackToUpdate) {
	io.emit('updateTrack', JSONTrackToUpdate);
}

