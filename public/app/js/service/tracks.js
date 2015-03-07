nextEpsilon.service('Tracks', function($http){
    var trackService = this;

    tracksService.tracks = [];

    trackService.addTrack = function(track){
        $http.post('/addTrack', track)
            .success(function () {
                trackService.getTracks();
            });
    };

    trackService.getTracks = function(){
        $http.get('/getTracks')
            .success(function(data){
                trackService.tracks = data;
            });
    }
});
