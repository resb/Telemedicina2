'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', 'toastr',
  function ($scope, $state, $http, $location, $window, Authentication, PasswordValidator, toastr) {
    $scope.authentication = Authentication;
    $scope.popoverMsg = PasswordValidator.getPopoverMsg();
    $scope.emailExist = true;
    $scope.flagCheck = false;
    $scope.flagButton = false;

    // Get an eventual error defined in the URL query string:
    $scope.error = $location.search().err;


    // If user is signed in then redirect back home
    if ($scope.authentication.user) {
      $location.path('/');
    }

    $scope.signup = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        var mess = response.message.split(":");
        $scope.error = mess[2];
      });
    };

    $scope.signin = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'userForm');

        return false;
      }

      $http.post('/api/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;

        // And redirect to the previous or home page
        $state.go($state.previous.state.name || 'home', $state.previous.params);
      }).error(function (response) {
        $scope.error = response.message;
      });
    };

    // OAuth provider request
    $scope.callOauthProvider = function (url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    };

    $scope.getbyemail = function(){
      /*Las credenciales de la cuenta zoom vences en 60 dias (free-trial)*/
      //var zoom_key = '_6AlG_L7QRayLYrF4jc0Aw'; <---- msouga@gmail.com
      //var zoom_sec = 'd00ZS5m2YCy9HYrmr1nmW7SUREzu1sjYlTo8'; <--- msouga@gmail.com
      var zoom_key = '9tWwl770TMaxKYabrrO7cQ'; // davidbulnes19@hotmail.com --- vence 27/05
      var zoom_sec = 'fhyI8Hcgf90QDiVEowwdPmTbnajLnCdUaL6p'; // davidbulnes19@hotmail.com --- vence 27/05
    
      $http.post('https://api.zoom.us/v1/user/checkemail?api_key=' + zoom_key + '&api_secret=' + zoom_sec+ '&data_type="JSON"&email=' + $scope.credentials.correoZoom).success(function (response) {
        console.log(response);
        if(response.existed_email){
          toastr.success("Correo válido, por favor ingrese la contraseña de su cuenta Zoom");
        } else {
          toastr.error("El correo ingresado no está vinculado a una cuenta Zoom");
        }
        $scope.emailExist= response.existed_email;
      });
    }

    $scope.validateLogin = function(){
      Zoom.init("https://www.zoom.us/api/v1");
      Zoom.login({ email: $scope.credentials.correoZoom, password: $scope.credentials.contrasenaZoom }, function (result) {
        if(result){
        toastr.success("Login successful!");
        $scope.flagButton = true;
        } 
      }, function(err){
        if(err){
          toastr.error("El correo o contraseña es incorrecto");
          $scope.flagButton = false;
        }
      });
    }
  }
]);
