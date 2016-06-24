angular.module('snorkelboot')
    .controller('gameCtrl', ['$scope', 'wordsFactory', 'ModalService', '$document', 'Players', function($scope, wordsFactory, ModalService, $document, Players) {
        $document.on('keydown', function(e){
            if(e.which === 8 && ( e.target.nodeName !== "INPUT" && e.target.nodeName !== "SELECT" ) ) {
                e.preventDefault();
            }
        });

        var $jq = jQuery.noConflict();
        var createResults;
        var gameNumber = Math.floor(Math.random() * (6 - 1 + 1) + 1);

        console.log(gameNumber);

        $scope.user = {};
        $scope.gameData = [];
        $scope.code = {};
        $scope.answerInputs = [];
        $scope.timerRunning = false;
        $scope.currentTime = false;
        $scope.guessingState = false;
        $scope.succes = 0;
        $scope.blacklist = [];

        wordsFactory.get(function (data) {
            $scope.gameData = data.games[gameNumber];

            initGame();
        });

        initGame = function () {
            if (!$scope.user.name) {
                ModalService.showModal({
                    templateUrl: "views/register.html",
                    controller: "modalCtrl",
                    inputs: {
                        heading: "Alle hens aan dek!",
                        subheading: "",
                        error: true,
                        autoclose: false
                    }
                }).then(function(modal) {
                    modal.close.then(function(user) {
                        $scope.user = user;

                        setAnswerInputs();
                        $scope.startTimer();
                        $scope.timerRunning = true;
                    });
                });
            } else {
                setAnswerInputs();
                $scope.startTimer();
                $scope.timerRunning = true;
            }
        };

        setAnswerInputs = function () {
            for (var i = 0; i < $scope.gameData.totalChar; i++) {
                $scope.answerInputs.push({ 
                    class: "",
                    value: "",
                    disabled: false
                });
            }
        };

        $scope.revealWordPart = function (code) {
            code = code.toUpperCase();

            if ($scope.gameData.codes[code]) {
                if ($scope.blacklist.indexOf(code) === -1) {
                    var wordPartObject   = $scope.gameData.codes[code];
                    var wordPartPosition = wordPartObject.position;
                    var wordPartPart     = wordPartObject.part;
                    var wordPartLength   = wordPartPart.length;

                    for (var i = 0; i < wordPartLength; i++) {
                        $scope.answerInputs[wordPartPosition].class = "active";
                        $scope.answerInputs[wordPartPosition].value = wordPartPart[i];
                        $scope.answerInputs[wordPartPosition].disabled = true;

                        wordPartPosition++;
                    }

                    $scope.succes++;
                    $scope.blacklist.push(code);

                    if ($scope.succes === 3) {
                        $scope.stopTimer();
                        $scope.timerRunning = false;

                        $scope.user.time = $scope.currentTime;

                        Players.save($scope.user,
                            function() {
                            },
                            function(response) {
                                console.log(response);
                            });

                        ModalService.showModal({
                            templateUrl: "views/modal.html",
                            controller: "modalCtrl",
                            inputs: {
                                heading: "woord geraden!",
                                subheading: "goed gedaan",
                                error: false,
                                autoclose: false
                            }
                        });
                    } else {
                        ModalService.showModal({
                            templateUrl: "views/modal.html",
                            controller: "modalCtrl",
                            inputs: {
                                heading: "code juist!",
                                subheading: "op naar de volgende",
                                error: false,
                                autoclose: true
                            }
                        });
                    }
                } else {
                    ModalService.showModal({
                        templateUrl: "views/modal.html",
                        controller: "modalCtrl",
                        inputs: {
                            heading: "code is al gebruikt!",
                            subheading: "op naar de volgende",
                            error: true,
                            autoclose: true
                        }
                    });
                }
            } else {
                ModalService.showModal({
                    templateUrl: "views/modal.html",
                    controller: "modalCtrl",
                    inputs: {
                        heading: "code niet juist…",
                        subheading: "op naar de volgende",
                        error: true,
                        autoclose: true
                    }
                });
            }
        };

        // $scope.revealWord = function () {
        //     $scope.guessingState = true;

        //     for (var i = 0; i < $scope.answerInputs.length; i++) {
        //         $scope.answerInputs[i].class = "active";
        //     }
        //     console.log($scope.answerInputs);
        // };

        // // $scope.continueGame = function () {
        // //     continueGame();
        // // };

        // $scope.continueGame = function () {
        //     $scope.guessingState = false;
        //     $scope.$apply(function () {
        //         for (var i = 0; i < $scope.answerInputs.length; i++) {
        //             if ($scope.answerInputs[i].disabled !== true) {
        //                 $scope.answerInputs[i].class = "";
        //                 $scope.answerInputs[i].value = "";
        //             }
        //         }
        //     });
        //     // $jq('.answer form input').each(function(i, obj) {
        //     //     if (!$jq(obj).data("wordpart")) {
        //     //         $jq(this).val("");
        //     //     }
        //     // });
        // };

        $scope.submitCode = function () {
            if ($scope.code.first && $scope.code.second && $scope.code.third) {
                $scope.revealWordPart($scope.code.first + $scope.code.second + $scope.code.third);

                $scope.code.first = "";
                $scope.code.second = "";
                $scope.code.third = "";
            }
        };

        $scope.startTimer = function () {
            $scope.$broadcast('timer-start');
            $scope.timerRunning = true;
        };

        $scope.stopTimer = function () {
            $scope.$broadcast('timer-stop');
            $scope.timerRunning = false;
        };

        $scope.$on('timer-tick', function (event, data) {
            $scope.currentTime = data.millis;
        });
    }]);
