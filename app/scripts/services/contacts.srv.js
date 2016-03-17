(function() {
  'use strict';
  angular.module('whatsapp.services.contacts', []).service('ContactsSrv', ['$firebaseArray','$firebaseObject', function ContactsSrv($firebaseArray,$firebaseObject) {

    var contacts;

    function loadContacts() {
      var ref = new Firebase('https://mcwhatsapp.firebaseio.com/users');
      // download the data into a local object
      var syncObject = $firebaseArray(ref);
      // synchronize the object with a three-way data binding
      // click on `index.html` above to see it used in the DOM!
      return syncObject;
    }

    this.getContacts = function() {
      return loadContacts();
    };

    this.getContact = function(id) {
      var ref = new Firebase('https://mcwhatsapp.firebaseio.com/users/'+id);
      var syncObject = $firebaseObject(ref);
      return syncObject.$loaded();
    };

  }]);
})();
