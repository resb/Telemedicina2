(function () {
  'use strict';

  angular
    .module('cita')
    .controller('CitaListController', CitaListController);

  CitaListController.$inject = ['CitaService', '$state', '$window',];

  function CitaListController(CitaService, $state, $window) {
    var vm = this;
    vm.remove = remove;
    vm.flag = false;

    vm.cita = CitaService.query();

    //Delete
    function remove(cita) {
    if ($window.confirm('Are you sure you want to delete?')) {
        cita.$remove();
        setTimeout(function() {
               vm.cita = CitaService.query();
        }, 500) ;  
      }      
    }
  }
}());
