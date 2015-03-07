nextEpsilon.controller('SequencerCtrl', function ($scope, $http) {
    $scope.sampleId = 0;
    $scope.offset = 0;
    $scope.currMeasure = 0;
    $scope.measures = [];
    $scope.repeat = 1;

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

        return measure
    };

    $scope.addMeasure = function(){
        $scope.currMeasure++;

        if($scope.measures[$scope.currMeasure] == null){
            $scope.measures[$scope.currMeasure] = createMeasure();
        }
    };

    $scope.subMeasure = function(){
        if($scope.currMeasure <= 0){
            return;
        }

        $scope.currMeasure--;
    };

    $scope.saveSequence = function(){
        var trackTemplate = {
            sampleId: $scope.sampleId,
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
                if($scope.currMeasure[i][j]){
                    trackTemplate.notes.push({startTime: 2 * j, pitch: i});
                }
            }
        }

        $http.post('/addTrack', trackTemplate);
    };

    $scope.setInstrument = function(intstrumentId){
        $scope.sampleId = intstrumentId;
    };

    $scope.measures[$scope.currMeasure] = createMeasure();
});