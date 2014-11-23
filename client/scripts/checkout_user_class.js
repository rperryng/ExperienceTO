(function () {
  'use strict';

  angular.module('checkoutUserClass', []);
})();

(function () {
  'use strict';

  angular
    .module('checkoutUserClass')
    .controller('CheckoutUserClassController', CheckoutUserClassController);

  CheckoutUserClassController.$inject = ['$scope', '$location', 'checkoutUserClassFactory'];

  function CheckoutUserClassController($scope, $location, checkoutUserClassFactory) {
    var vm = this;
    vm.searchForUserCode = searchForUserCode;

    vm.classId = getClassIdFromUrl();

    //////////

    function searchForUserCode() {
      checkoutUserClassFactory.searchForUserCode(vm.classId, vm.userCode)
        .then(function () {
          console.log('good');
        }, function () {
          console.log('not good');
        });
    }

    function getClassIdFromUrl() {
      var url = $location.$$absUrl;
      return url.substring(url.indexOf('/class/')+7, url.length);
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('checkoutUserClass')
    .factory('checkoutUserClassFactory', checkoutUserClassFactory);

  checkoutUserClassFactory.$inject = ['$q', '$http'];

  function checkoutUserClassFactory($q, $http) {
    var factory = {
      searchForUserCode: searchForUserCode,
      checkoutUser: checkoutUser
    };

    return factory;

    // //////////
    function searchForUserCode(classId, code) {
      var deferred = $q.defer();
      var url = '/api/business/class/'+classId+'/usercode/'+code;

      $http.get(url, code)
        .success(function () {
          deferred.resolve();
        })
        .error(function () {
          deferred.reject();
        });

      return deferred.promise;
    }


    function checkoutUser(code) {
      var deferred = $q.defer();
      var url = '/api/signup/user';

      $http.post(url, code)
        .success(function () {
          deferred.resolve();
        })
        .error(function () {
          deferred.reject();
        });

      return deferred.promise;
    }

    // function getUser(id) {
    //   var deferred = $q.defer();
    //   var url = '/api/user/' + id;

    //   $http.get(url)
    //     .success(function () {
    //       deferred.resolve();
    //     })
    //     .error(function () {
    //       deferred.reject();
    //     });

    //   return deferred.promise;
    // }
  }

})();
