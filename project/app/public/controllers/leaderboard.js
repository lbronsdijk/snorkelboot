angular.module('snorkelboot')
    .controller('leaderboardCtrl', ['$scope', 'Players', function($scope, Players) {

        $scope.players = Players.query();
        $scope.players.minutes = 0;
        $scope.players.seconds = 0;

        millisToMinutesAndSeconds = function(millis) {
            $scope.players.minutes = Math.floor(millis / 60000);
            $scope.players.seconds = ((millis % 60000) / 1000).toFixed(0);
        };
    }]);
