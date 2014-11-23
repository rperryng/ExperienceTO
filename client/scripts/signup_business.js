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

    activate();

    //////////

    function activate() {
      doGoogleStuff();
    }

    function submit() {
      signupBusinessFactory.registerBusiness(vm.name, vm.email, vm.phone, vm.uploadedFile, vm.about)
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
        .then(function (url) {
          vm.imageSource = url;
          console.log('image souce', vm.imageSource);
        }, function () {
          console.log('failed');
        });
    }

    function doGoogleStuff() {
      google.maps.event.addDomListener(window, 'load', initaliseGoogle);

      function initaliseGoogle() {

        var markers = [];
        var mapOptions = {
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById('google-maps-view'), mapOptions);

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var searchBox = new google.maps.places.SearchBox(input);

        google.maps.event.addListener(searchBox, 'places_changed', function () {
          var places = searchBox.getPlaces();

          if (places.length === 0) {
            return;
          }

          for (var i = 0, marker; marker = markers[i]; i++) {
            marker.setMap(null);
          }

          // For each place, get the icon, place name, and location.
          markers = [];
          var bounds = new google.maps.LatLngBounds();
          for (var i = 0, place; place = places[i]; i++) {
            var image = {
              url: '/client/assets/images/map-marker.png',
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(35, 35)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
              map: map,
              icon: image,
              title: place.name,
              position: place.geometry.location
            });

            markers.push(marker);

            bounds.extend(place.geometry.location);

            console.log(marker)
            console.log(marker.getPosition());
          }

          map.fitBounds(bounds);
        });

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
        } else {

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

    function registerBusiness(companyName, email, phone, about) {
      var deferred = $q.defer();
      var data = {
        name: companyName,
        email: email,
        phone: phone,
        description: about
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
      var url = '/api/businesses/images';
      var filename = 'business';

      $upload.upload({
        url: url,
        file: image,
        filename: filename,
        fileFormDataName: filename
      }).progress(function (evt) {
        console.log('... ' + parseInt((100 * evt.loaded) / evt.total));
      }).success(function (uploadedImageUrl) {
        deferred.resolve(uploadedImageUrl);
      }).error(function (err) {
        deferred.reject();
        console.log('err...', err);
      });

      return deferred.promise;
    }

  }
})();
