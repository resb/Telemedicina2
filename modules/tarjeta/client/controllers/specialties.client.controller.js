(function () {
  'use strict';

  // Specialties controller
  angular
    .module('specialties')
    .controller('SpecialtiesController', SpecialtiesController);

  SpecialtiesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'specialtyResolve'];

  function SpecialtiesController ($scope, $state, $window, Authentication, specialty) {
    var vm = this;

    vm.authentication = Authentication;
    vm.specialty = specialty;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Specialty
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.specialty.$remove($state.go('specialties.list'));
      }
    }

    // Save Specialty
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.specialtyForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.specialty._id) {
        vm.specialty.$update(successCallback, errorCallback);
      } else {
        vm.specialty.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('specialties.view', {
          specialtyId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
