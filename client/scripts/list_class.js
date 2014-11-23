(function () {
  'use strict';

  angular.module('listClasses', []);
})();

(function () {
  'use strict';

  angular
    .module('listClasses')
    .controller('listClassesController', listClassesController);

  listClassesController.$inject = ['$scope', '$http', 'listClassesFactory'];

  function listClassesController($scope, $http, listClassesFactory) {
    var vm = this;

    activate();

    //////////

    function activate() {
      listClassesFactory.getClasses()
        .then(function (classes) {
          vm.classes = classes;
          doGoogleStuff(classes);
        }, function () {
          console.log('couldn\'t get classes ...');
        });

    }

    function doGoogleStuff(classes) {
      google.maps.event.addDomListener(window, 'load', initialiseTheGoogle);

      function initialiseTheGoogle() {
        var mapOptions = {
          scrollwheel: false,
          mapTypeControl: false,
          scaleControl: false,
          zoom: 15
        };

        var map = new google.maps.Map(document.getElementById('google-maps-view'), mapOptions);

        if (classes && classes.length > 0) {

          var bounds = new google.maps.LatLngBounds();

          for (var i = 0; i < classes.length; i++) {
            var classListing = classes[i];
            var classListingPosition = new google.maps.LatLng(classListing.latitude, classListing.longitude);

            var infoWindow = new google.maps.InfoWindow({
              map: map,
              position: classListingPosition,
              content: classListing.name
            });

            var boundsLocation = '(' + classListing.latitude + ', ' + classListing.longitude + ')';
            console.log(boundsLocation);
//            bounds.extend(boundsLocation);
          }

          if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
            var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.002, bounds.getNorthEast().lng() + 0.002);
            var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.002, bounds.getNorthEast().lng() - 0.002);
            bounds.extend(extendPoint1);
            bounds.extend(extendPoint2);
          }

          map.fitBounds(bounds);
        }

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );

            for (var i = 0; i < classes.length; i++) {
              var classListing = classes[i];
            }

            var currentLocation = new google.maps.Marker({
              map: map,
              title: 'Your loation',
              position: pos
            });

            map.setCenter(pos);
            map.setZoom(16);
          }, function () {
            handleNoGeolocation(true);
          });
        }

        function handleNoGeolocation(errorFlag) {
          var content = errorFlag ? 'Error: The geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation';

          var options = {
            map: map,
            position: new google.maps.LatLng(60, 105),
            content: content
          };

          var infoWindow = new google.maps.InfoWindow(options);
          map.setCenter(options.position);
        }
      }
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('listClasses')
    .factory('listClassesFactory', listClassesFactory);

  listClassesFactory.$inject = ['$q', '$http'];

  function listClassesFactory($q, $http) {
    var factory = {
      getClasses: getClasses
    };

    return factory;

    //////////

    function getClasses() {
      var deferred = $q.defer();
      var url = '/api/businesses';

      $http.get(url)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function () {
          deferred.reject();
        });

      return deferred.promise;
    }
  }
})();
