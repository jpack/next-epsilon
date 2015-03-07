nextEpsilon.controller('LiveCtrl', function ($scope) {
    $scope.sampleId = 0;

    $scope.play = function(pitch){
        socket.emit('noteSend', {sampleId: $scope.sampleId, pitch: pitch})
    };

    $scope.setInstrument = function(instrumentId){
        $scope.sampleId = instrumentId;
    }
});

