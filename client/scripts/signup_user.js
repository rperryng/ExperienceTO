(function () {
	'use strict';

	angular.module('ExploreTO', ['facebook']);
})();

(function () {
	'use strict';

	angular
		.module('ExploreTO')
		.controller('MainController', MainController);

	MainController.$inject = ['$scope', 'facebook'];

	function MainController($scope, facebook) {
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
					// error logging in
				}
			});

			function getMe() {
				facebook.getMe()
					.then(function (me) {
						$scope.loggedUser = me;
					}, function (error) {

					});
			}
		}
	}
})();