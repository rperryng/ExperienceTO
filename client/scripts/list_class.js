(function () {
  'use strict';

  angular.module('listClasses', []);
})();

(function () {
  'use strict';

  angular
    .module('listClasses')
    .controller('listClassesController', listClassesController);

  listClassesController.$inject = ['$scope', '$http'];

  function listClassesController($scope, $http) {
	var vm = this;

	$http.get('api/business/classes').success(function (data) {
		vm.classes = data;
		console.log("success", data);
	});
  }
})();