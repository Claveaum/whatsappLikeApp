(function () {
  'use strict';

  angular.module('whatsapp.controllers.messages', [])

    .controller('MessagesCtrl', ['$scope', 'MessagesSrv','$stateParams',
      function($scope, MessagesSrv, $stateParams) {
        $scope.messages = MessagesSrv.getMessages($stateParams.chatId);
        $scope.write = function(text){
          MessagesSrv.writeMessage(text, $stateParams.chatId);
          $scope.message = '';
        };
      }]);

})();
