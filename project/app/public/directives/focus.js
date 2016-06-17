angular.module('snorkelboot')
    .directive('focus', function () {
        return {
            restrict: 'A',
            link: function($scope, elem, attrs) {
                elem.bind('keyup', function(e) {
                    var keyCode = e.which || e.keyCode;

                    if (keyCode !== 8 && keyCode !== 9 && keyCode !== 46) {
                        elem.next()[0].focus();
                        elem.next()[0].select();

                    }
                });
            }
        };
    });
