(function () {
  'use strict';

  angular.module('facebook', []);
})();

(function () {
  'use strict';

  angular
    .module('facebook')
    .provider('facebook', facebookProvider);

  function facebookProvider() {

    var facebookAppId;

    var provider = {
      init: init,
      $get: $get
    };

    $get.$inject = ['$q'];
    return provider;

    //////////

    function init(appId) {
      if (typeof appId !== 'string') {
        throw 'Facebook appid must be type string';
      }
      facebookAppId = appId;
    }

    /* @ngInject */
    function $get($q) {

      var service = {
        login: login,
        logout: logout,
        getAppId: getAppId,
        getEvent: getEvent,
        getEventPicture: getEventPicture,
        getLoginStatus: getLoginStatus,
        getMe: getMe,
        getUpcomingEvents: getUpcomingEvents
      };

      return service;

      //////////

      function getAppId() {
        return facebookAppId;
      }

      function login() {
        var deferred = $q.defer();

        FB.login(function(response) {
          var connected = (response.status === 'connected');
          deferred.resolve(connected);
        });

        return deferred.promise;
      }

      function logout() {
        FB.logout();
      }

      function getEvent(eventId) {
        var deferred = $q.defer();

        var url = '/' + eventId;
        console.log('hitting endpoint', url);

        FB.api(url, function (response) {
          if (response.error) {
            deferred.reject();
            return;
          }

          deferred.resolve(response);
        });

        return deferred.promise;
      }

      function getLoginStatus() {
        var deferred = $q.defer();

        FB.getLoginStatus(function (response) {
          var connected = (response.status === 'connected');
          deferred.resolve(connected);
        });

        return deferred.promise;
      }

      function getMe() {
        var deferred = $q.defer();

        var params = {
          fields: ['first_name, id']
        };

        FB.api('/me', params, function (response) {
          if (response.error) {
            deferred.reject();
            return;
          }

          deferred.resolve(response);
        });

        return deferred.promise;
      }

      function getUpcomingEvents() {
        var deferred = $q.defer();

        var timeNow = Math.round(Date.now() / 1000);
        var twoMonthsFromNow = timeNow + 5184000;

        var params = {
          since: timeNow,
          until: twoMonthsFromNow
        };

        FB.api('/me/events', params, function (response) {
          if (response.error) {
            deferred.reject(response.error);
            return;
          }

          deferred.resolve(response.data);
        });

        return deferred.promise;
      }

      function getEventPicture(eventId, size) {
        var deferred = $q.defer();

        var url = '/' + eventId + '/picture';
        var params = {};

        if (size) {
          params = {
            width: size,
            height: size
          };
        }

        FB.api(url, params, function (response) {
          if (response.error) {
            deferred.reject(response.error);
            return;
          }

          deferred.resolve(response.data.url);
        });

        return deferred.promise;
      }
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('facebook')
    .run(run);

  run.$inject = ['$window', '$document', '$q', '$rootScrope', '$facebook'];

  function run($window, $document, $q, $rootScope, facebook) {

    $window.fbAsyncInit = function () {
      var fbParams = {
        appId: facebook.getAppId(),
        xbfml: false,
        version: 'v2.1'
      };

      FB.init(fbParams);

      console.log('broadcasting');
      $rootScope.$broadcast('facebookReady');
    };

    (function insertFbRoot() {
      var fbroot = $document[0].createElement('div');
      fbroot.id = 'fb-root';
      $document[0].body.insertBefore(fbroot, $document[0].body.childNodes[0]);
    })();

    (function loadSdk() {
      var script = $document[0].createElement('script');
      script.src = '//connect.facebook.net/en_US/sdk.js';
      script.id = 'facebook-jssdk';
      script.async = true;

      $document[0].getElementsByTagName('head')[0].appendChild(script);
    })();
  }
  run.$inject = ["$window", "$document", "$q", "$rootScope", "facebook"];
})();