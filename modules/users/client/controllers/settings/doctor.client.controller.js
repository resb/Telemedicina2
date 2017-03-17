'use strict';

angular.module('users').controller('DoctorController', ['Meeting','$scope', '$state', '$window', '$http', 'Authentication', '$filter', 'toastr',
  function (Meeting, $scope, $state, $window, $http, Authentication, $filter, toastr) {
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

    $scope.meeting = Meeting.query(function (res){
        $scope.formatMeeting = $filter('orderBy')(res, '-created');  
        $scope.flag = true;     
    });
     setTimeout(function() {
           $('#btn_ultimo').click();
           if($scope.formatMeeting.length < 1){
               $scope.flagEmpezar = false; 
           }
     }, 200);
    // setTimeout(function() {
    //         Zoom.listMeeting({ page_size: 100, page_number: 1 }, function (result) {
    //             $scope.formatMeeting = $filter('orderBy')(result.meetings, '-created_at');
    //             //console.log($filter('orderBy')(result.meetings, '-created_at'));
    //             //$scope.meeting = result.meetings;
    //             $scope.flag = true;
    //         });                                
    //         return false;
    //          }, 1000);
    //   setTimeout(function() {
    //       $('#btn_ultimo').click();
    //        }, 2000);
}
    
   $scope.remove = function(meeting){
      if ($window.confirm('Are you sure you want to delete?')) {
        meeting.$remove($state.go('settings.doctor'));
         setTimeout(function() {
             $scope.lastMeeting = {};
               $('#btn_listar').click();
                 }, 200) ;         
          return false;	
      }
    }

    $scope.login = function() {
      Zoom.init("https://www.zoom.us/api/v1");
                //Remember to put your email and password to login
            Zoom.login({ email: $scope.user.correoZoom, password: $scope.user.contrasenaZoom }, function (result) {
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

    $scope.endMeeting = function(meeting) {
      Zoom.endMeeting({ meeting_number: meeting.idMeeting },
                function (result) {
                    $('#api_title').html("End Meeting");              
                });
      $scope.borrarMeeting(meeting.idMeeting);             
      $scope.remove(meeting);
 	
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
