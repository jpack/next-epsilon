nextEpsilon.controller('SequencerCtrl', function ($scope, $http) {
    // 8 pitches for our interface
    $scope.measure = new Array(8);

    // 16 beats for each measure
    for(var i = 0; i < 8; i++){
        var notes = new Array(16);

        for(var j = 0; j < 16; j++){
            notes[j] = {active: false};
        }

        $scope.measure[i] = notes;
    }

    $scope.saveSequence = function(){
        var trackTemplate = {
            sampleId: 0,
                isRecording: false,
            offset: 0,
            resolution: 1,
            repeat: 2,
            lock: false,
            volume: 1,
            notes: []
        };

        for(var i = 0; i < $scope.measure.length; i++){
            for(var j = 0; j < $scope.measure[i].length; j++){
                if($scope.measure[i][j].active){
                    trackTemplate.notes.push({startTime: 2 * j, pitch: i});
                }
            }
        }

        $http.post('/addTrack', trackTemplate).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    }
});