nextEpsilon.controller('MainMenuCtrl', function ($scope, $http, $route, $location) {
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

    $scope.newTrack = function() {
        $scope.newSelected = true;
        setTimeout(function() {
            $scope.enter = false;
            $scope.$apply();
            setTimeout(function () {
                $location.url("/sequencer");
                $scope.$apply();
            }, 600);
        },100);
    };

    $scope.live = function() {
        $scope.liveSelected = true;
        setTimeout(function() {
            $scope.enter = false;
            $scope.$apply();
            setTimeout(function () {
                $location.url("/live");
                $scope.$apply();
            }, 600);
        },100);
    };

    $scope.openSettings = function(obj) {
        if (obj.open === undefined) {
            obj.open = true;
        }
        else {
            obj.open = !obj.open;
        }
        console.log("abc");
    };

    $scope.noteFill = function(track){

    };

    $scope.delTrack = function(track){
        for(var i = 0; i < tracks.length; i++) {
            if (tracks[i].ID == track.ID) {
                tracks.splice(i, 1);
            }
        }

      console.log("Attempted delete: " + track.ID);
        $http.post('/deleteTrack', track)
            .success(function(){
                $http.get('/getTracks')
                    .success(function(data){
                        $scope.tracks = data;
                    })
            });
    };

});
