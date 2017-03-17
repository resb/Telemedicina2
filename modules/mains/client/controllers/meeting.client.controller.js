(function () {
  'use strict';

  // Mains controller
  angular
    .module('mains')
    .controller('MeetingController', MeetingController);

  MeetingController.$inject = ['$scope', '$state', '$window', 'Authentication', 'meetingResolve'];

  function MeetingController ($scope, $state, $window, Authentication, meeting) {
    var vm = this;

    vm.authentication = Authentication;
    vm.meeting = meeting;
    vm.error = null;  
    vm.saveMeeting = saveMeeting;
    vm.login = login;
    vm.createMeeting = createMeeting;
     
    function saveMeeting() {
      vm.meeting.$save();   
    }

//Zoom meeting

    function login() {
      Zoom.init("https://www.zoom.us/api/v1");
                //Remember to put your email and password to login
      Zoom.login({ email: vm.authentication.user.correoZoom, password: vm.authentication.user.contrasenaZoom }, function (result) {});
      return false;
    };

    function createMeeting() {
            vm.login();
            Zoom.createMeeting(JSON.parse($('#meetingInfo').val()),
                       function (result) {
                        var strURL = "'" + result.start_url + "'";
                        var win = window.open(result.start_url, "theFrame"); 
                        $('#meeting_number').val(result.id);
                        vm.saveMeeting();
                    });
            return false;                                           
    };
  }
}());
