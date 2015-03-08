nextEpsilon.controller('SplashCtrl', function ($scope, $http, $location) {
    $scope.exit=false;
    $scope.tap = function() {

        if (animation != null) animation.cancel();
        setTimeout(function() {
            $scope.exit = true;
            $scope.$apply();
            setTimeout(function () {
                $location.url("/tracks");
                $scope.$apply();
            }, 600);
        },500);
    }

    var animation;
    var textLogo = document.getElementById('logo1');
    textLogo.animate([
        {transform: 'scale(1)', easing: 'ease-in-out'},
        {transform: 'scale(.93)', easing: 'ease-in-out'},
        {transform: 'scale(1)', easing: 'ease-in-out'},
    ], {
        duration: 1500,
        iterations: 99999999
    });
    var textLogo = document.getElementById('logo2');
    var animate2 = function() {
        if ($scope.exit) {
            return;
        }
        animation = textLogo.animate([
            {transform: 'rotate(0)', easing: 'ease-in-out'},
            {transform: 'rotate(-20deg)', easing: 'ease-in-out'},
            {transform: 'rotate(20deg)', easing: 'ease-in-out'},
            {transform: 'rotate(0)', easing: 'ease-in-out'},
            {transform: 'rotate(0)', easing: 'ease-in-out'},
            {transform: 'rotate(0)', easing: 'ease-in-out'},
            {transform: 'rotate(0)', easing: 'ease-in-out'},
            {transform: 'rotate(0)', easing: 'ease-in-out'},
        ], {
            duration: 2000
        });
        setTimeout(animate2, Math.random() * 5000)
    }
    setTimeout(animate2, Math.random() * 5000)

});
