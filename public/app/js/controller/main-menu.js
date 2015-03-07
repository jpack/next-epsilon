nextEpsilon.controller('MainMenuCtrl', function ($scope, $http) {
    setTimeout(function() {
        $scope.enter = true;
        $scope.$apply();
    }, 300);

    $scope.tracks = [];

    // 8 pitches for our interface
    $scope.measure = new Array(8);

    $http.get("/getTracks").success(function(data) {
         $scope.tracks = data;
    });

    $scope.volumeChange = function(track) {
        socket.emit('volume', {
            id: track.ID,
            volume: track.volume
        });
    };


    // 16 beats for each measure
    for(var i = 0; i < 8; i++){
        var notes = new Array(16);

        for(var j = 0; j < 16; j++){
            notes[j] = {active: false};
        }

        $scope.measure[i] = notes;
    }

    $scope.openSettings = function(obj) {
        if (obj.open === undefined) {
            obj.open = true;
        }
        else {
            obj.open = !obj.open;
        }
        console.log("abc");
    };
    $scope.delTrack = function(track){
        for(var i = 0; i < tracks.length; i++) {
            if (tracks[i].ID == track.ID) {
                tracks.splice(i, 1);
            }
        }
      console.log("Attempted delete: " + track.ID);
        $http.post('/deleteTrack', track);
    };

});
