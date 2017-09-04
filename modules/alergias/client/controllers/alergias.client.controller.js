(function () {
    'use strict';
  
    // Specialties controller
    angular
      .module('alergias')
      .controller('AlergiasController', AlergiasController);
  
    AlergiasController.$inject = ['$scope', '$state', '$window', 'Authentication', 'alergiaResolve'];
  
    function AlergiasController ($scope, $state, $window, Authentication, alergia) {
      var vm = this;
  
      vm.authentication = Authentication;
      vm.alergia = alergia;
      vm.error = null;
      vm.form = {};
      vm.remove = remove;
      vm.save = save;
  
      // Remove existing Alergia
      function remove() {
        if ($window.confirm('Are you sure you want to delete?')) {
          vm.alergia.$remove($state.go('alergias.list'));
        }
      }
  
      // Save Alergia
      function save(isValid) {
        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'vm.form.alergiaForm');
          return false;
        }
  
        // TODO: move create/update logic to service
        if (vm.alergia._id) {
          vm.alergia.$update(successCallback, errorCallback);
        } else {
          vm.alergia.$save(successCallback, errorCallback);
        }
  
        function successCallback(res) {
          $state.go('alergias.view', {
            alergiaId: res._id
          });
        }
  
        function errorCallback(res) {
          vm.error = res.data.message;
        }
      }
    }
  }());
  