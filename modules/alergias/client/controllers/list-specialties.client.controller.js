(function () {
    'use strict';
  
    angular
      .module('alergias')
      .controller('AlergiasListController', AlergiasListController);
  
    AlergiasListController.$inject = ['AlergiasService'];
  
    function AlergiasListController(AlergiasService) {
      var vm = this;
  
      vm.alergias = AlergiasService.query();
    }
  }());
  