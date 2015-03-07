nextEpsilon.controller('SequencerCtrl', function ($scope, $http) {
    $scope.offset = 0;
    $scope.measure = 0;
    $scope.repeat = false;

    // 8 pitches for our interface
    $scope.measures = [];
    $scope.currMeasure = new Array(8);

    // 16 beats for each measure
    for(var i = 0; i < 8; i++){
        var notes = new Array(16);

        for(var j = 0; j < 16; j++){
            notes[j] = {active: false};
        }

        $scope.currMeasure[i] = notes;
    }

    $scope.saveSequence = function(){
        var trackTemplate = {
            sampleId: 0,
            isRecording: false,
            offset: $scope.offset,
            resolution: 1,
            repeat: $scope.repeat,
            lock: false,
            volume: 1,
            notes: []
        };

        for(var i = 0; i < $scope.currMeasure.length; i++){
            for(var j = 0; j < $scope.currMeasure[i].length; j++){
                if($scope.currMeasure[i][j].active){
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