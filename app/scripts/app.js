(function() {
  'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
  angular.module('starter', ['ionic','firebase','angularMoment',
    'whatsapp.controllers.contacts', 'whatsapp.services.contacts',
    'whatsapp.controllers.chats','whatsapp.services.chats',
    'whatsapp.controllers.login','whatsapp.services.login',
    'whatsapp.controllers.messages', 'whatsapp.services.messages'])

    .run(function ($ionicPlatform) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
      });
    })
  .run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      // We can catch the error thrown when the $requireAuth promise is rejected
      // and redirect the user back to the home page
      if (error === "AUTH_REQUIRED") {
        $state.go("login");
      }
    });
  }])

    .config(function ($stateProvider, $urlRouterProvider) {

      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js
      $stateProvider

      // setup an abstract state for the tabs directive
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html',
          resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["LoginSrv", function(LoginSrv) {
              // $waitForAuth returns a promise so the resolve waits for it to complete
              return LoginSrv.requireAuth();
            }]
          }
        })

        // Each tab has its own nav history stack:

        .state('tab.contacts', {
          url: '/contacts',
          views: {
            'tab-contacts': {
              templateUrl: 'templates/tab-contacts.html',
              controller: 'ContactsCtrl'
            }
          }
        })

        .state('tab.chats', {
          url: '/chats',
          views: {
            'tab-chats': {
              templateUrl: 'templates/tab-chats.html',
              controller: 'ChatsCtrl'
            }
          }
        })
        .state('tab.chat-detail', {
          url: '/chats/:chatId',
          views: {
            'tab-chats': {
              templateUrl: 'templates/chat-detail.html',
              controller: 'MessagesCtrl'
            }
          }
        })
        .state('tab.logout', {
          url: '/logout',
          views: {
            'tab-logout': {
              templateUrl: 'templates/tab-logout.html',
              controller: 'LoginCtrl'
            }
          }
        })
        .state('tab.chat-create', {
          url: '/createchat',
          views: {
            'tab-chats': {
              templateUrl: 'templates/chat-create.html',
              controller: 'ChatsCtrl'
            }
          }
        })
        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        })
        .state('register', {
          url: '/register',
          templateUrl: 'templates/register.html',
          controller: 'LoginCtrl'
      });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');

    });
})();
