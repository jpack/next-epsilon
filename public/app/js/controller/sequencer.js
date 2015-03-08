nextEpsilon.controller('SequencerCtrl', function ($scope, $http, $location) {
    setTimeout(function() {
        $scope.enter = true;
        $scope.$apply();
    }, 300);

    $scope.instrumentId = 0;
    $scope.measure = [];
    $scope.trackName = '';

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

    $scope.back = function() {
        setTimeout(function() {
            $scope.enter = false;
            $scope.$apply();
            setTimeout(function () {
                $location.url("/tracks");
                $scope.$apply();
            }, 600);
        },100);
    };

    $scope.saveSequence = function(){
        var trackTemplate = {
            sampleId: $scope.instrumentId,
            trackName: $scope.trackName,
            ID: window.trackId++,
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
                    trackTemplate.notes.push({startTime: 2 * j, pitch: 7-i});
                }
            }
        }

        $http.post('/addTrack', trackTemplate);
        setTimeout(function() {
            $scope.enter = false;
            $scope.$apply();
            setTimeout(function () {
                $location.url("/tracks");
                $scope.$apply();
            }, 600);
        },100);
    };

    $scope.setInstrument = function(instrumentId){
        $scope.instrumentId = instrumentId;
    };

    $scope.measure = createMeasure();
});