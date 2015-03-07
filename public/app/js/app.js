var nextEpsilon = angular.module('nextEpsilon', ['ngRoute']);

nextEpsilon.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/splash.html',
                controller: 'SplashCtrl'
            }).
            when('/tracks', {
                templateUrl: 'templates/main-menu.html',
                controller: 'MainMenuCtrl'
            }).
            when('/sequencer', {
                templateUrl: 'templates/sequencer.html',
                controller: 'SequencerCtrl'
            })
    }]);
