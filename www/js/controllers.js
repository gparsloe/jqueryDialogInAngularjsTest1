angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
        $scope.newVar = "hey";
        console.log("newVar: " + $scope.newVar);

    })
    .directive('dirOne', function () {
        return {
            link: function ($scope, element) {
                element.on('click', function () {
                    console.log('inside dirOne click');
                    var dialogElement = angular.element(document.querySelector('#dialog'));
                    console.log("dialogElement: ", dialogElement);
                    dialogElement.dialog({
                        autoOpen: false,
                        width: 400,
                        buttons: [{
                                text: "Ok",
                                click: function () {
                                    dialogElement.dialog("close");
                                }
                    },
                            {
                                text: "Cancel",
                                click: function () {
                                    dialogElement.dialog("close");
                                }
                    }
                ]
                    });

                    // Link to open the dialog
                    var dialogLinkElement = angular.element(document.querySelector('#dialog-link'));
                    dialogLinkElement.click(function (event) {
                        console.log('dialogLinkEl: ', dialogLinkElement);
                        dialogElement.dialog("open");
                        event.preventDefault();
                    });
                })
            }
        }
    })
    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
