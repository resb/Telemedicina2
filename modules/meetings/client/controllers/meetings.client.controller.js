(function () {
  'use strict';

  // Meetings controller
  angular
    .module('meetings')
    .controller('MeetingsController', MeetingsController);

  MeetingsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'meetingResolve'];

  function MeetingsController ($scope, $state, $window, Authentication, meeting) {
    var vm = this;

    vm.authentication = Authentication;
    vm.meeting = meeting;
    vm.error = null;
    vm.form = {};
    vm.save = save;
    vm.login = login;
    vm.createMeeting = createMeeting;

    createMeeting();

    // Save Meeting
    function save() {

      vm.meeting.$save(successCallback, errorCallback);

      function successCallback(res) {
       console.log("guardo");
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
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
                        vm.save();
                    });
            return false;                                           
    };
  }
}());
