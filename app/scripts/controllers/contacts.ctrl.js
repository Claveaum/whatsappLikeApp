(function() {
  'use strict';

  angular.module('whatsapp.controllers.contacts', [])

    .controller('ContactsCtrl',['$scope', 'ContactsSrv', '$rootScope',
      function ContactsCtrl($scope, ContactsSrv, $rootScope) {
        $rootScope.loading = true;
        $scope.contacts = ContactsSrv.getContacts();
        $rootScope.loading = false;
    }]);
})();
