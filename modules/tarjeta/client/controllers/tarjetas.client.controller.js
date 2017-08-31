(function () {
    'use strict';
  
    // Specialties controller
    angular
      .module('specialties')
      .controller('SpecialtiesController', SpecialtiesController);
  
    TarjetasController.$inject = ['$scope', '$state', '$window', 'Authentication', 'tarjetaResolve'];
  
    function TarjetasController ($scope, $state, $window, Authentication, specialty) {
      var vm = this;
  
      vm.authentication = Authentication;
      vm.tarjeta = tarjeta;
      vm.error = null;
      vm.form = {};
      vm.remove = remove;
      vm.save = save;
  
      // Remove existing Specialty
      function remove() {
        if ($window.confirm('Are you sure you want to delete?')) {
          vm.tarjeta.$remove($state.go('tarjetas.list'));
        }
      }
  
      // Save Specialty
      function save(isValid) {
        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'vm.form.tarjetaForm');
          return false;
        }
  
        // TODO: move create/update logic to service
        if (vm.tarjeta._id) {
          vm.tarjeta.$update(successCallback, errorCallback);
        } else {
          vm.tarjeta.$save(successCallback, errorCallback);
        }
  
        function successCallback(res) {
          $state.go('tarjetas.view', {
            tarjetaId: res._id
          });
        }
  
        function errorCallback(res) {
          vm.error = res.data.message;
        }
      }
    }
  }());
  