// Init app
angular.module('snorkelboot', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap', 'angularModalService', 'timer'])
    .config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        // Inject HTML5 PushState for route history
        $locationProvider.html5Mode(true);

        // Routes
        $routeProvider
            .when('/', {
                templateUrl: 'views/game.html',
                controller: 'gameCtrl'
            })
            .when('/leaderboard', {
                templateUrl: 'views/leaderboard.html',
                controller: 'leaderboardCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
