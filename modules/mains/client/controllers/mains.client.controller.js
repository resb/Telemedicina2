(function () {
  'use strict';

  // Mains controller
  angular
    .module('mains')
    .controller('MainsController', MainsController);

  MainsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'mainResolve'];

  function MainsController ($scope, $state, $window, Authentication, main) {
    var vm = this;

    vm.authentication = Authentication;
    vm.main = main;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.fecha = new Date().toJSON().slice(0, 10).replace(new RegExp("-", 'g'), "/").split("/").reverse().join("/");
    vm.login = login;
    vm.createMeeting = createMeeting;
     
    // Remove existing Main
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.main.$remove($state.go('mains.list'));
      }
    }

    // Save Main
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mainForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.main._id) {
        vm.main.$update(successCallback, errorCallback);
      } else {
        vm.main.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('mains.view', {
          mainId: res._id
        });
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
            setTimeout(function() {
            Zoom.createMeeting(JSON.parse($('#meetingInfo').val()),
                       function (result) {
                        var strURL = "'" + result.start_url + "'";
                        var win = window.open(result.start_url, "theFrame"); 
                        $('#meeting_number').val(result.id);                  
                    });
            }, 500);
            return false;                                           
    };
  }
}());
