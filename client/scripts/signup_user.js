(function () {
	'use strict';

	angular.module('ExploreTO', ['facebook']);
})();

(function () {
	'use strict';

	angular
		.module('ExploreTO')
		.controller('MainController', MainController);

	MainController.$inject = ['$scope', '$http', 'facebook'];

	function MainController($scope, $http, facebook) {
		var ENDPOINT = '/api/signup/user';
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
						$scope.loggedUser = me;

						$http.post(ENDPOINT, me)
					        .success(function (response) {
					          console.log("Success")
					          console.log(me)
					        })
					        .error(function (response) {
					          console.log("Error when was trying to save the logged user.");
					        });

					}, function (error) {

					});
			}
		}
	}
})();