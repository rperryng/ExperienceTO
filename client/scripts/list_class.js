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

(function () {
  'use strict';

  google.maps.event.addDomListener(window, 'load', activate);

  function activate() {
    var mapOptions = {
      zoom: 15
    };

    var map = new google.maps.Map(document.getElementById('google-maps-view'), mapOptions);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        var infoWindow = new google.maps.InfoWindow({
          map: map,
          position: pos,
          content: 'Location found using HTML5'
        });

        map.setCenter(pos);
      }, function () {
        handleNoGeolocation(true);
      });
    }

    function handleNoGeolocation(errorFlag) {
      var content = errorFlag
        ? 'Error: The geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation';

      var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
      };

      var infoWindow = new google.maps.InfoWindow(options);
      map.setCenter(options.position);
    }
  }

})();
