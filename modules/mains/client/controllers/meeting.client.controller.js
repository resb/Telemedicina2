(function () {
  'use strict';

  // Mains controller
  angular
    .module('mains')
    .controller('MeetingController', MeetingController);

  MainsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'meetingResolve'];

  function MeetingController ($scope, $state, $window, Authentication, meeting) {
    var vm = this;

    vm.authentication = Authentication;
    vm.meeting = meeting;
    vm.error = null;


    // Save Main
    function save() {
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

  }
}());
