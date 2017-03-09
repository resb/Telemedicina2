(function () {
  'use strict';

  // Mains controller
  angular
    .module('mains')
    .controller('MainsController', MainsController);

  MainsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'mainResolve'];

  function MainsController ($scope, $state, $window, Authentication, main) {
    var vm = this;

    vm.authentication = Authentication;
    vm.main = main;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.fecha = new Date().toJSON().slice(0, 10).replace(new RegExp("-", 'g'), "/").split("/").reverse().join("/");

    // Remove existing Main
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.main.$remove($state.go('mains.list'));
      }
    }

    // Save Main
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mainForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.main._id) {
        vm.main.$update(successCallback, errorCallback);
      } else {
        vm.main.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('mains.view', {
          mainId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }

      function prueba(res){
         setTimeout(function() {
                     $('#btn_crearMeeting').click();
                 }, 2000)
      }
    }

  }
}());
