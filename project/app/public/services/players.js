angular.module('snorkelboot')
    .factory('Players', ['$resource', function($resource) {
        return $resource('/api/players/:_id');
    }]);
