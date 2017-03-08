(function () {
  'use strict';

  angular
    .module('mains')
    .controller('MainsListController', MainsListController);

  MainsListController.$inject = ['MainsService'];

  function MainsListController(MainsService) {
    var vm = this;

    vm.mains = MainsService.query();
  }
}());
