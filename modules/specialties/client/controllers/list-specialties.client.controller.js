(function () {
  'use strict';

  angular
    .module('specialties')
    .controller('SpecialtiesListController', SpecialtiesListController);

  SpecialtiesListController.$inject = ['SpecialtiesService'];

  function SpecialtiesListController(SpecialtiesService) {
    var vm = this;

    vm.specialties = SpecialtiesService.query();
  }
}());
