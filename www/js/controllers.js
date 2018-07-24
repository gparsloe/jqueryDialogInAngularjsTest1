angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
        $scope.newVar = "hey";
        console.log("newVar: " + $scope.newVar);
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

        var dialogLinkElement = angular.element(document.querySelector('#dialog-link'));
        dialogLinkElement.click(function (event) {
            console.log('dialogLinkEl: ', dialogLinkElement);
            dialogElement.dialog("open");
            event.preventDefault();
        });


    })
    .directive('dirOne', function () {
        return {
            link: function ($scope, element) {
                element.on('click', function () {
                    console.log('inside dirOne click');
                    //                    var dialogElement = angular.element(document.querySelector('#dialog'));
                    //                    console.log("dialogElement: ", dialogElement);
                    //                    dialogElement.dialog({
                    //                        autoOpen: false,
                    //                        width: 400,
                    //                        buttons: [{
                    //                                text: "Ok",
                    //                                click: function () {
                    //                                    dialogElement.dialog("close");
                    //                                }
                    //                    },
                    //                            {
                    //                                text: "Cancel",
                    //                                click: function () {
                    //                                    dialogElement.dialog("close");
                    //                                }
                    //                    }
                    //                ]
                    //                    });

                    // Link to open the dialog
                    //                    var dialogLinkElement = angular.element(document.querySelector('#dialog-link'));
                    //                    dialogLinkElement.click(function (event) {
                    //                        console.log('dialogLinkEl: ', dialogLinkElement);
                    //                        dialogElement.dialog("open");
                    //                        event.preventDefault();
                    //                    });
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
        ////////////////////////////////////////////////
        // start new modal stuff -
        // Check copyright if end up using this
        // //////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

        // jQuery formatted selector to search for focusable items
        var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

        var startModalElement = angular.element(document.querySelector('#startModal'));
        console.log("startModelElement: ", startModalElement);
        var modalElement = angular.element(document.querySelector('#modal'));
        console.log("modalElement: ", modalElement);
        var cancelElement = angular.element(document.querySelector('#cancel'));
        console.log("cancelElement: ", cancelElement);
        var cancelButtonElement = angular.element(document.querySelector('#cancelButton'));
        var enterElement = angular.element(document.querySelector('#enter'));
        var modalCloseButtonElement = angular.element(document.querySelector('#modalCloseButton'));
        var mainPageElement = angular.element(document.querySelector('#mainPage'));
        var modalOverlayElement = angular.element(document.querySelector('#modalOverlay'));
        var SOMEElement = angular.element(document.querySelector('#mainPage'));
        var bodyElement = angular.element(document.querySelector('body'));


        startModalElement.click(function (e) {
            showModal(modalElement);
        });
        cancelElement.click(function (e) {
            hideModal();
        });
        cancelButtonElement.click(function (e) {
            hideModal();
        });
        enterElement.click(function (e) {
            enterButtonModal();
        });
        modalCloseButtonElement.click(function (e) {
            hideModal();
        });
        modalElement.keydown(function (event) {
            trapTabKey($(this), event);
        })
        modalElement.keydown(function (event) {
            trapEscapeKey($(this), event);
        })


        function trapEscapeKey(obj, evt) {

            // if escape pressed
            if (evt.which == 27) {

                // get list of all children elements in given object
                var o = obj.find('*');

                // get list of focusable items
                var cancelElement;
                cancelElement = o.filter("#cancel")

                // close the modal window
                cancelElement.click();
                evt.preventDefault();
            }

        }

        function trapTabKey(obj, evt) {

            // if tab or shift-tab pressed
            if (evt.which == 9) {

                // get list of all children elements in given object
                var o = obj.find('*');

                // get list of focusable items
                var focusableItems;
                focusableItems = o.filter(focusableElementsString).filter(':visible')

                // get currently focused item
                var focusedItem;
                //                focusedItem = jQuery(':focus');
                focusedItem = angular.element(document.querySelector(':focus'));

                // get the number of focusable items
                var numberOfFocusableItems;
                numberOfFocusableItems = focusableItems.length

                // get the index of the currently focused item
                var focusedItemIndex;
                focusedItemIndex = focusableItems.index(focusedItem);

                if (evt.shiftKey) {
                    //back tab
                    // if focused on first item and user preses back-tab, go to the last focusable item
                    if (focusedItemIndex == 0) {
                        focusableItems.get(numberOfFocusableItems - 1).focus();
                        evt.preventDefault();
                    }

                } else {
                    //forward tab
                    // if focused on the last item and user preses tab, go to the first focusable item
                    if (focusedItemIndex == numberOfFocusableItems - 1) {
                        focusableItems.get(0).focus();
                        evt.preventDefault();
                    }
                }
            }

        }

        function setInitialFocusModal(obj) {
            // get list of all children elements in given object
            var o = obj.find('*');

            // set focus to first focusable item
            var focusableItems;
            focusableItems = o.filter(focusableElementsString).filter(':visible').first().focus();

        }

        function enterButtonModal() {
            // BEGIN logic for executing the Enter button action for the modal window
            alert('form submitted');
            // END logic for executing the Enter button action for the modal window
            hideModal();
        }

        function setFocusToFirstItemInModal(obj) {
            // get list of all children elements in given object
            var o = obj.find('*');

            // set the focus to the first keyboard focusable item
            o.filter(focusableElementsString).filter(':visible').first().focus();
        }

        function showModal(obj) {
            mainPageElement.attr('aria-hidden', 'true'); // mark the main page as hidden
            modalOverlayElement.css('display', 'block'); // insert an overlay to prevent clicking and make a visual change to indicate the main apge is not available
            modalElement.css('display', 'block'); // make the modal window visible
            modalElement.attr('aria-hidden', 'false'); // mark the modal window as visible

            // attach a listener to redirect the tab to the modal window if the user somehow gets out of the modal window
            bodyElement.on('focusin', '#mainPage', function () {
                setFocusToFirstItemInModal(modalElement);
            })

            // save current focus
            // focusedElementBeforeModal = jQuery(':focus');
            focusedElementBeforeModal = angular.element(document.querySelector(':focus'));

            setFocusToFirstItemInModal(obj);
        }

        function hideModal() {
            modalOverlayElement.css('display', 'none'); // remove the overlay in order to make the main screen available again
            modalElement.css('display', 'none'); // hide the modal window
            modalElement.attr('aria-hidden', 'true'); // mark the modal window as hidden
            mainPageElement.attr('aria-hidden', 'false'); // mark the main page as visible

            // remove the listener which redirects tab keys in the main content area to the modal
            bodyElement.off('focusin', '#mainPage');

            // set focus back to element that had it before the modal was opened
            focusedElementBeforeModal.focus();
        }

        ////////////////////////////////////////////////
        // end new modal stuff // //////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////
        ////////////////////////////////////////////////

    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
