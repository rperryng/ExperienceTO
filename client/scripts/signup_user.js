(function () {
  'use strict';

  angular.module('ExploreTO', ['facebook']);
})();

(function () {
  'use strict';

  angular
    .module('ExploreTO')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$http', 'facebook', 'userSignupFactory'];

  function MainController($scope, $http, facebook, userSignupFactory) {
    var vm = this;

    console.log('listening');
    var stopListening = $scope.$on('facebookReady', onFacebookReady);

    //////////

    function onFacebookReady() {
      console.log('done...');
      stopListening();

      facebook.login().then(function (connected) {
        if (connected) {
          getMe();
        } else {
          console.log("Error when was trying to log in on facebook.");
        }
      });

      function getMe() {
        facebook.getMe()
          .then(function (me) {
            vm.facebookUserId = me.id;
            vm.firstName = me.first_name;

            userSignupFactory.registerUser(me)
              .then(function () {
                console.log('success');
              });
          });
      }
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('ExploreTO')
    .factory('userSignupFactory', userSignupFactory);

  userSignupFactory.$inject = ['$q', '$http'];

  function userSignupFactory($q, $http) {
    var factory = {
      registerUser: registerUser
    };

    return factory;

    //////////

    function registerUser(me) {
      var deferred = $q.defer();
      var url = '/api/signup/user';

      $http.post(url, me)
        .success(function () {
          deferred.resolve();
        })
        .error(function () {
          deferred.reject();
        });

      return deferred.promise;
    }
  }

})();
