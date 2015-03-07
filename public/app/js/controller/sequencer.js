nextEpsilon.controller('SequencerCtrl', function ($scope) {
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

});