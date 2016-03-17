(function () {
  'use strict';
  angular.module('whatsapp.services.login', []).service('LoginSrv', ['$firebaseAuth', 'ContactsSrv','$firebaseObject', function ($firebaseAuth, ContactsSrv, $firebaseObject) {
    var authObject = $firebaseAuth(new Firebase("https://mcwhatsapp.firebaseio.com"));

    var firebaseObject = $firebaseObject(new Firebase('https://mcwhatsapp.firebaseio.com/users'));


    this.login = function (user) {
      return authObject.$authWithPassword(user).then(function (authData) {
      }).catch(function (error) {
      });
    };
    var authenticated = null;

    this.requireAuth = function () {
      return authObject.$requireAuth();
    };

    this.authUser = function () {
      return ContactsSrv.getContact(authObject.$getAuth().uid);
    };

    this.logout = function () {
      return authObject.$unauth();
    };

    this.createUser = function (first, last, mail, password) {
      authObject.$createUser({
        email: mail,
        password: password
      }).then(function (userData) {
        var user = {'email' : mail,
          'firstName' : first,
          'lastName' : last };
        firebaseObject[userData.uid] = user;
        firebaseObject.$save();
      }).catch(function(error) {
      });
    };

    firebaseObject.$loaded(function () {
      authObject.$onAuth(bindAuthenticated, this);
    });

    function bindAuthenticated(authData) {
      if (authData) {
        authenticated = $firebaseObject(firebaseObject.$ref().child(authData.uid));
      } else {
        authenticated = null;
      }
    };

  }]);
})();
