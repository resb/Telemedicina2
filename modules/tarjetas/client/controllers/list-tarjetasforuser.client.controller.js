(function () {
    'use strict';
  
    angular
      .module('tarjetas')
      .controller('TarjetasListforuserController', TarjetasListforuserController);
  
    TarjetasListforuserController.$inject = ['TarjetasforUserService'];
  
   /* function TarjetasListController(TarjetasService) {
      var vm = this;
  
      vm.tarjetas = TarjetasService.query();
    }*/

    function TarjetasListForUser(TarjetasforUserService){
      var vmx=this;
      vm.tarjetas=TarjetasforUserService.query();
    }
  }());
  