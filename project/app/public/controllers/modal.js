angular.module('snorkelboot')
    .controller('modalCtrl', ['$scope', 'heading', 'subheading', 'error', 'autoclose', 'close', function($scope, heading, subheading, error, autoclose, close) {
        $scope.heading    = heading;
        $scope.subheading = subheading;
        $scope.error      = error;
        $scope.autoclose  = autoclose;
        $scope.close      = close;
        $scope.user       = {};

        if ($scope.autoclose) {
            close(null, 5000);
        }

        $scope.submitUser = function () {
            if ($scope.user.name && $scope.user.phone) {
                close({
                    name: $scope.user.name,
                    phone: $scope.user.phone
                });
            }
        };
    }]);
