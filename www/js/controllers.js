angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
        $scope.newVar = "hey";
        console.log("newVar: " + $scope.newVar);

    })
    //Start test
    //    <script type="text/javascript">
    //        $("#dialog").dialog({
    //            autoOpen: false,
    //            width: 400,
    //            buttons: [{
    //                    text: "Ok",
    //                    click: function() {
    //                        $(this).dialog("close");
    //                    }
    //                },
    //                {
    //                    text: "Cancel",
    //                    click: function() {
    //                        $(this).dialog("close");
    //                    }
    //                }
    //            ]
    //        });
    //
    //        // Link to open the dialog
    //        $("#dialog-link").click(function(event) {
    //            $("#dialog").dialog("open");
    //            event.preventDefault();
    //        });
    //
    //
    //        // Hover states on the static widgets
    //        $("#dialog-link, #icons li").hover(
    //            function() {
    //                $(this).addClass("ui-state-hover");
    //            },
    //            function() {
    //                $(this).removeClass("ui-state-hover");
    //            }
    //        );
    //    </script>




    // start tests

.directive('dirOne', function(){
    return{
        link: function($scope, element){
            element.on('click', function(){
                console.log('inside dirOne click');
                element.dialog({
                autoOpen: false,
                width: 400,
                buttons: [{
                        text: "Ok",
                        click: function() {
                            $(this).dialog("close");
                        }
                    },
                    {
                        text: "Cancel",
                        click: function() {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
    
            // Link to open the dialog
            $("#dialog-link").click(function(event) {
                $("#dialog").dialog("open");
                event.preventDefault();
            });
    
    
            // Hover states on the static widgets
            $("#dialog-link, #icons li").hover(
                function() {
                    $(this).addClass("ui-state-hover");
                },
                function() {
                    $(this).removeClass("ui-state-hover");
                }
            );
            })
        }
    }
})
    .directive('myDomDirective', function () {
        return {
            link: function ($scope, element, attrs) {
                element.on('click', function () {
                    element.html('You clicked me!!');
                    element.dialog({
                        autoOpen: false,
                        width: 400,
                        buttons: [{
                                text: "Ok",
                                click: function () {
                                    $(this).dialog("close");
                                }
                },
                            {
                                text: "Cancel",
                                click: function () {
                                    $(this).dialog("close");
                                }
                }]
                    });
                });
//                element.on('mouseenter', function () {
//                    element.css('background-color', 'yellow');
//                });
//                element.on('mouseleave', function () {
//                    element.css('background-color', 'orange');
//                });
            }
        };
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
