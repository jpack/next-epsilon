nextEpsilon.controller('SequencerCtrl', function ($scope, $http) {
    $scope.instrumentId = 0;
    $scope.measure = [];

    var trackId = 0;

    var createMeasure = function(){
        // 8 pitches per measure
        var measure = new Array(8);

        for(var i = 0; i < 8; i++){
            // 16 notes per measure
            measure[i] = new Array(16);

            for(var j = 0; j < 16; j++){
                measure[i][j] = {active: false};
            }
        }

        return measure;
    };

    $scope.saveSequence = function(){
        var trackTemplate = {
            sampleId: $scope.instrumentId,
            ID: trackId++,
            isRecording: false,
            offset: 0,
            resolution: 1,
            repeat: 0,
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

        $http.post('/addTrack', trackTemplate);
    };

    $scope.setInstrument = function(instrumentId){
        $scope.instrumentId = instrumentId;
    };

    $scope.measure = createMeasure();
});