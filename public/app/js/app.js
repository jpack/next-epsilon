var nextEpsilon = angular.module('nextEpsilon', ['ngRoute']);
var socket = io.connect();

nextEpsilon.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/splash.html',
                controller: 'SplashCtrl'
            })
            .when('/tracks', {
                templateUrl: 'templates/main-menu.html',
                controller: 'MainMenuCtrl'
            })
            .when('/sequencer', {
                templateUrl: 'templates/sequencer.html',
                controller: 'SequencerCtrl'
            })
            .when('/live', {
            templateUrl: 'templates/live.html',
            controller: 'LiveCtrl'
            })
    }]);

nextEpsilon.directive("ngMobileClick", [function () {
    return function (scope, elem, attrs) {
        elem.bind("touchstart click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            scope.$apply(attrs["ngMobileClick"]);
        });
    }
}]);

window.trackId = 0;