(function() {
  'use strict';

  angular.module('whatsapp.controllers.login', [])

    .controller('LoginCtrl', ['$scope','LoginSrv','$state', function ($scope, LoginSrv, $state){
        $scope.login = function(mail,password){
          LoginSrv.login({
            email: mail,
            password: password
          }).then(function () {
            $state.go('tab.contacts');
          }, console.error);
        }

        $scope.logout = function(){
          LoginSrv.logout();
          $state.go("login");
        };

        $scope.register = function(first, last, mail, password){
          LoginSrv.createUser(first, last, mail, password);
          $state.go("login");
        }
    }]);

})();
