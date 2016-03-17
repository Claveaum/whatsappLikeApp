(function() {
  'use strict';
  angular.module('whatsapp.services.messages', []).service('MessagesSrv', ['$firebaseArray','LoginSrv', function($firebaseArray, LoginSrv) {

    var messages;

    function loadMessages(id) {
      var ref = new Firebase('https://mcwhatsapp.firebaseio.com/messages/'+id);
      // download the data into a local object
      var syncObject = $firebaseArray(ref);
      // synchronize the object with a three-way data binding
      // click on `index.html` above to see it used in the DOM!s
      return syncObject;
    }

    this.getMessages = function(id) {
      return loadMessages(id);
    };

    this.writeMessage = function(text,id){
      var ref = new Firebase('https://mcwhatsapp.firebaseio.com/messages/'+id);
      var syncObject = $firebaseArray(ref);
      LoginSrv.authUser().then(function(user) {
        syncObject.$add({
          "sender": user.firstName + ' ' + user.lastName,
          "message": text,
          "sentDate": new Date().toISOString()
        }).then(function (ref) {
        });
      });
    }

  }]);
})();
