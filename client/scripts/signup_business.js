(function () {
  'use strict';

  angular.module('signupBusiness', ['angularFileUpload']);
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
    vm.onFileSelect = onFileSelect;
    vm.uploadedFile = undefined;

    //////////

    function submit() {
      signupBusinessFactory.registerBusiness(vm.name, vm.email, vm.phone, vm.uploadedFile)
        .then(function () {
          console.log('good');
        }, function () {
          console.log('not good');
        });
    }

    function onFileSelect(files) {
      console.log('on file selected', files);

      if (!files || !files[0]) {
        return;
      }

      vm.uploadedFile = signupBusinessFactory.uploadImage('facebook', files[0])
        .then(function () {
          console.log('success');
        }, function () {
          console.log('failed');
        });
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('signupBusiness')
    .factory('signupBusinessFactory', signupBusinessFactory);

  signupBusinessFactory.$inject = ['$q', '$http', '$upload'];

  function signupBusinessFactory($q, $http, $upload) {
    var factory = {
      registerBusiness: registerBusiness,
      uploadImage: uploadImage
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

    function uploadImage(business, image) {
      var deferred = $q.defer();
      var url = '/api/businesses/image';

      $upload.upload({
        url: url,
        file: image

      }).progress(function (evt) {
        console.log('... ' + parseInt((100 * evt.loaded) / evt.total));
      }).success(function (data) {
        deferred.resolve();
        console.log('done uploading image');
      }).error(function (err) {
        deferred.reject();
        console.log('err...', err);
      });

      return deferred.promise;
    }
  }
})();
