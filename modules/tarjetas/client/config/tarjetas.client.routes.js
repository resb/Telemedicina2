(function () {
    'use strict';
  
    angular
      .module('tarjetas')
      .config(routeConfig);
  
    routeConfig.$inject = ['$stateProvider'];
  
    function routeConfig($stateProvider) {
      $stateProvider
        .state('tarjetas', {
          abstract: true,
          url: '/tarjetas',
          template: '<ui-view/>'
        })
        .state('tarjetas.list', {
          url: '',
          templateUrl: 'modules/tarjetas/client/views/list-tarjetas.client.view.html',
          controller: 'TarjetasListController',
          controllerAs: 'vm',
          data: {
            pageTitle: 'Tarjetas List'
          }
        })
        .state('tarjetas.create', {
          url: '/create',
          templateUrl: 'modules/mains/client/views/form-tarjeta.client.view.html',
          controller: 'TarjetasController',
          controllerAs: 'vm',
          resolve: {
            tarjetaResolve: newTarjeta
          },
          data: {
            roles: ['admin'],
            pageTitle: 'Tarjeta Create'
          }
        })
        .state('tarjetas.edit', {
          url: '/:tarjetaId/edit',
          templateUrl: 'modules/tarjetas/client/views/form-tarjeta.client.view.html',
          controller: 'TarjetasController',
          controllerAs: 'vm',
          resolve: {
            tarjetaResolve: getTarjeta
          },
          data: {
            roles: ['admin'],
            pageTitle: 'Edit Tarjeta {{ tarjetaResolve.name }}'
          }
        })
        .state('tarjetas.view', {
          url: '/:tarjetaId',
          templateUrl: 'modules/tarjetas/client/views/view-tarjeta.client.view.html',
          controller: 'TarjetasController',
          controllerAs: 'vm',
          resolve: {
            tarjetaResolve: getTarjeta
          },
          data: {
            pageTitle: 'Tarjeta {{ tarjetaResolve.name }}'
          }
        });
    }
  
    getTarjeta.$inject = ['$stateParams', 'TarjetasService'];
  
    function getTarjeta($stateParams, TarjetasService) {
      return TarjetasService.get({
        tarjetaId: $stateParams.tarjetaId
      }).$promise;
    }
  
    newTarjeta.$inject = ['TarjetasService'];
  
    function newTarjeta(TarjetasService) {
      return new TarjetasService();
    }
  }());
  