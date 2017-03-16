(function () {
  'use strict';

  angular
    .module('cita')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('cita', {
        abstract: true,
        url: '/cita',
        templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('cita.listCita', {
        url: '',
        templateUrl: 'modules/cita/client/views/list-cita.client.view.html',
        controller: 'CitaListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Cita List'
        }
      })
      .state('cita.create', {
        url: '/create',
        templateUrl: 'modules/cita/client/views/form-cita.client.view.html',
        controller: 'CitaController',
        controllerAs: 'vm',
        resolve: {
          citaResolve: newCita
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Cita Create'
        }
      })
      .state('cita.edit', {
        url: '/:citaId/edit',
        templateUrl: 'modules/cita/client/views/form-cita.client.view.html',
        controller: 'CitaController',
        controllerAs: 'vm',
        resolve: {
          citaResolve: getCita
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Cita {{ citaResolve.name }}'
        }
      })
      .state('cita.view', {
        url: '/:citaId',
        templateUrl: 'modules/cita/client/views/view-cita.client.view.html',
        controller: 'CitaController',
        controllerAs: 'vm',
        resolve: {
          citaResolve: getCita
        },
        data: {
          pageTitle: 'Cita {{ citaResolve.name }}'
        }
      });
  }

  getCita.$inject = ['$stateParams', 'CitaService'];

  function getCita($stateParams, CitaService) {
    return CitaService.get({
      citaId: $stateParams.citaId
    }).$promise;
  }

  newCita.$inject = ['CitaService'];

  function newCita(CitaService) {
    return new CitaService();
  }
}());
