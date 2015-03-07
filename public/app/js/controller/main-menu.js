nextEpsilon.controller('MainMenuCtrl', function ($scope, $http) {
    $http.get('/getTracks').success(function(data){
        $scope.tracks = data;
    });

/*    $scope.tracks = [{
        sampleId: 0,
        isRecording: false,
        offset: 0,
        resolution: 1,
        repeat: 2,
        lock: false,
        volume: 1,
        notes: [
            {startTime: 0, pitch: 0},
            {startTime: 1, pitch: 0},
            {startTime: 1, pitch: 1},
            {startTime: 2, pitch: 0},
            {startTime: 3, pitch: 0},
            {startTime: 3, pitch: 1},
            {startTime: 4, pitch: 2},
        ]
    },
        {
            sampleId: 1,
            isRecording: false,
            offset: 0,
            resolution: 1,
            repeat: 2,
            lock: false,
            volume: 1,
            notes: [
                {startTime: 0, pitch: 0},
                {startTime: 1, pitch: 7},
                {startTime: 2, pitch: 0},
                {startTime: 3, pitch: 7},
                {startTime: 4, pitch: 0},
                {startTime: 5, pitch: 7},
                {startTime: 6, pitch: 5},
                {startTime: 7, pitch: 4},
            ]
        }];*/

    $scope.tracks = [1, 2, 3, 4, 5, 6 , 7];
});
