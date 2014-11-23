(function () {
  'use strict';

  angular.module('ExploreTO', ['facebook', 'ngTagsInput']);
})();

(function () {
  'use strict';

  angular
    .module('ExploreTO')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'facebook', 'userSignupFactory', 'ngTagsInput'];

  function MainController($scope, facebook, userSignupFactory, ngTagsInput) {
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

            userSignupFactory.getUser(me.id)
              .then(function () {
                console.log('got success');
              });

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
      registerUser: registerUser,
      getUser: getUser
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

    function getUser(id) {
      var deferred = $q.defer();
      var url = '/api/user/' + id;

      $http.get(url)
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
