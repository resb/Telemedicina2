'use strict';

angular.module('users').controller('DoctorController', ['$scope', '$http', 'Authentication', '$filter', 'toastr',
  function ($scope, $http, Authentication, $filter, toastr) {
    $scope.user = Authentication.user;
    $scope.meeting = {};
    $scope.idMeeting = null;
    $scope.flag = false;  
    $scope.lastMeeting = {};
    $scope.flagEmpezar = false;
    $scope.formatMeeting = {};
    $scope.emptyMeeting = false;


  $scope.listarMeeting = function() { 
    if(!$scope.flag){
    $scope.login();
    }
    setTimeout(function() {
            Zoom.listMeeting({ page_size: 100, page_number: 1 }, function (result) {
                $scope.formatMeeting = $filter('orderBy')(result.meetings, '-created_at');
                //console.log($filter('orderBy')(result.meetings, '-created_at'));
                //$scope.meeting = result.meetings;
                $scope.flag = true;
            });                                
            return false;
             }, 1000);
      setTimeout(function() {
          $('#btn_ultimo').click();
           }, 2000);
}

    

    $scope.login = function() {
      Zoom.init("https://www.zoom.us/api/v1");
                //Remember to put your email and password to login
            Zoom.login({ email: "msouga@gmail.com", password: "Pablito12@Zoom" }, function (result) {
                    $('#btn_login').val("login completado");
                });

             return false;
    };

    $scope.getLastMeeting = function() {  
        if($scope.formatMeeting.length != 0){     
            $scope.lastMeeting = $scope.formatMeeting[0];
            $scope.flagEmpezar = true; 
        } else {
            toastr.info("No existen reuniones pendiente");
        }            
    }


    $scope.getMeeting = function(meetingId){
        Zoom.getMeeting({ meeting_number: meetingId},
        function (result) {
        var win = window.open(result.join_url, "theFrame");                  
        //$('#jsonMst').html(result.start_url);
        //$('#jsonMst').html("<a href='" + result.join_url + "' id='btnIniciar'>Iniciar Reuni&#243n (adm)</a>");                      
     });
        return false;
    }  

    $scope.endMeeting = function(idmeeting) {
      Zoom.endMeeting({ meeting_number: idmeeting },
                function (result) {
                    $('#api_title').html("End Meeting");              
                });
      $scope.borrarMeeting(idmeeting);           
      $scope.listarMeeting();  
      setTimeout(function() {
               $('#btn_ultimo').click();
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
  }
]);
