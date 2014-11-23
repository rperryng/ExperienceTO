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

						$http.get('/api/user/'+me.id).
						  success(function(data, status, headers, config) {
						  	console.log("Success2", data)
						    // this callback will be called asynchronously
						    // when the response is available
						  }).
						  error(function(data, status, headers, config) {
						    // called asynchronously if an error occurs
						    // or server returns response with an error status.
						    console.log("2Error when was trying to save the logged user.");
						  });

						$http.post(ENDPOINT, me)
					        .success(function (response) {
					          console.log("Success")
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