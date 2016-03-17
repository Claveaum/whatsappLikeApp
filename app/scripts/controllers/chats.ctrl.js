(function () {
  'use strict';

  angular.module('whatsapp.controllers.chats', [])

    .controller('ChatsCtrl', ['$scope', 'ChatsSrv', '$rootScope','$state',
      function($scope, ChatsSrv, $rootScope, $state) {
        $rootScope.loading = true;
        $scope.chats = ChatsSrv.getChats();
        $rootScope.loading = false;

        $scope.ajouterConversation = function(name, description){
          ChatsSrv.saveChat(name,description);
          $state.go('tab.chats');
        }
      }]);

})();
