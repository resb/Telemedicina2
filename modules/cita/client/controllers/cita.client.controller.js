(function () {
  'use strict';

  // Cita controller
  angular
    .module('cita')
    .controller('CitaController', CitaController);

  CitaController.$inject = ['$scope', '$state', '$window', 'Authentication', 'citaResolve', 'SpecialtiesService'];

  function CitaController ($scope, $state, $window, Authentication, cita, SpecialtiesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.cita = cita;
    vm.cita.fecha = new Date(vm.cita.fecha);
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.specialties = SpecialtiesService.query({}, function(){
      if(vm.cita._id){
        var i = -1;
        angular.forEach(vm.specialties, function(value, key) {
            i++;
            if(value._id == vm.cita.specialty._id){
              vm.specialtieSelect = vm.specialties[i];
            }
      });        
      } else {
        vm.specialtieSelect = vm.specialties[0];
      }
    });    
   
    // Remove existing Cita
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.cita.$remove($state.go('cita.list'));
      }
    }

    // Save Cita
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.citaForm');
        return false;
      }
      vm.cita.specialty = vm.specialtieSelect;
      console.log(vm.cita)
      // TODO: move create/update logic to service
      if (vm.cita._id) {
        vm.cita.$update(successCallback, errorCallback);
      } else {        
        vm.cita.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('cita.view', {
          citaId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
