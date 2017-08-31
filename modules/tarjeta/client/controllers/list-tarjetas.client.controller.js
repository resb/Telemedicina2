(function () {
    'use strict';
  
    angular
      .module('tarjetas')
      .controller('TarjetasListController', TarjetasListController);
  
    TarjetasListController.$inject = ['TarjetasService'];
  
    function TarjetasListController(TarjetasService) {
      var vm = this;
  
      vm.tarjetas = TarjetasService.query();
    }
  }());
  