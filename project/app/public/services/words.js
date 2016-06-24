angular.module('snorkelboot')
    .factory('wordsFactory', function ($resource) {
        return $resource('./data/words.json');
    });
