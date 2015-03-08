nextEpsilon.controller('LiveCtrl', function ($location, $scope) {
    setTimeout(function() {
        $scope.enter = true;
        $scope.$apply();
    }, 300);


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

    $scope.sampleId = 0;

    $scope.play = function(pitch){
        socket.emit('noteSend', {sampleId: $scope.sampleId, pitch: pitch})
    };

    $scope.setInstrument = function(instrumentId){
        $scope.sampleId = instrumentId;
    }
});

