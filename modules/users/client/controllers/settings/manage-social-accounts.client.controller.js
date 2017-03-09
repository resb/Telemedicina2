'use strict';

angular.module('users').controller('SocialAccountsController', ['$scope', '$http', 'Authentication',
  function ($scope, $http, Authentication) {
    $scope.user = Authentication.user;
    $scope.meeting = {};
    $scope.idMeeting = null;
    $scope.flag = false;

  $scope.listarMeeting = function() { 
    if(!$scope.flag){
    $scope.login();
    }
    setTimeout(function() {
            Zoom.listMeeting({ page_size: 100, page_number: 1 }, function (result) {
                $scope.meeting = result.meetings;
                console.log($scope.meeting);
                $scope.flag = true;
                //$('#api_title').html("List Meeting");

                //$('#errMsg').html(JSON.stringify(result));

            });           
            return false;
             }, 1000) 
}

$scope.selectMeeting = function(idmeeting) {
		$scope.idMeeting = idmeeting;
    Zoom.endMeeting({ meeting_number: idmeeting },

                function (result) {

                    $('#api_title').html("End Meeting");
               

                });
          $scope.borrarMeeting(idmeeting);           
          $scope.listarMeeting();  
           setTimeout(function() {
                     $('#btn_listar').click();
                 }, 2000)           
            return false;		
	};

   $scope.borrarMeeting = function(idmeeting) { 
          Zoom.deleteMeeting({ meeting_number: idmeeting },

                function (result) {

                    $('#api_title').html("Delete Meeting");

                    
                });
            return false;
};

$scope.login = function() {
  Zoom.init("https://www.zoom.us/api/v1");
                //Remember to put your email and password to login
                Zoom.login({ email: "msouga@gmail.com", password: "Pablito12@Zoom" }, function (result) {

                    $('#btn_login').val("login completado");


                });

                return false;
};

$scope.endAll = function() {
  console.log($scope.meeting.length);
  for (var i = 0; i < $scope.meeting.length; i++) { 
    console.log($scope.meeting[i].id);
    $scope.borrarMeeting($scope.meeting[i].id);
};
$scope.listarMeeting();
    setTimeout(function() {
                     $('#btn_listar').click();
                 }, 2000)   
}

    // Check if there are additional accounts
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }

      return false;
    };

    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
    };

    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;

      $http.delete('/api/users/accounts', {
        params: {
          provider: provider
        }
      }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);
