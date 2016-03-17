(function() {
  'use strict';
  angular.module('whatsapp.services.chats', []).service('ChatsSrv', ['$firebaseArray', function($firebaseArray) {

    var chats;

    function getChatIndexFromId(id) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i]._id === id) {
          return i;
        }
      }
    }

    function loadChats() {
      var ref = new Firebase('https://mcwhatsapp.firebaseio.com/chats');
      // download the data into a local object
      var syncObject = $firebaseArray(ref);
      // synchronize the object with a three-way data binding
      // click on `index.html` above to see it used in the DOM!
      return syncObject;
    }

    this.getChats = function() {
      return loadChats();
    };

    this.getChat = function(id) {
      return loadChats().then(function() {
        return chats[getChatIndexFromId(id)];
      });
    };

    this.saveChat = function(name,description) {
      loadChats().$add({
        'name' : name,
        'description' : description,
        'creationDate' : new Date().toISOString()
      }).then(function(res){});
    };
  }]);
})();
