(function () {
  'use strict';

  angular.module('signupBusiness', []);
})();

(function () {
  'use strict';

  angular
    .module('signupBusiness')
    .controller('SignupBusinessController', SignupBusinessController);

  SignupBusinessController.$inject = ['$scope', 'signupBusinessFactory'];

  function SignupBusinessController($scope, signupBusinessFactory) {
    var vm = this;

    vm.submit = submit;

    //////////

    function submit() {
      signupBusinessFactory.registerBusiness(vm.name, vm.email, vm.phone)
        .then(function () {
          console.log('good');
        }, function () {
          console.log('not good');
        });
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('signupBusiness')
    .factory('signupBusinessFactory', signupBusinessFactory);

  signupBusinessFactory.$inject = ['$q', '$http'];

  function signupBusinessFactory($q, $http) {
    var factory = {
      registerBusiness: registerBusiness
    };

    var ENDPOINT = '/api/signup/businesses';

    return factory;

    //////////

    function registerBusiness(companyName, email, phone) {
      var deferred = $q.defer();
      var data = {
        name: companyName,
        email: email,
        phone: phone
      };

      $http.post(ENDPOINT, data)
        .success(function (response) {
          deferred.resolve();
        })
        .error(function (response) {
          deferred.reject();
        });

      return deferred.promise;
    }
  }
})();
