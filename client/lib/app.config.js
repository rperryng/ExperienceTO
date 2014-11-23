(function () {
	'use strict';

	angular
		.module('ExploreTO')
		.config(config);

	config.$inject = ['facebookProvider'];

	function config(facebookProvider) {
		facebookProvider.init('794234560634526');
	}
})();