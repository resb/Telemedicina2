(function () {
    'use strict';
  
    angular
      .module('alergias')
      .config(routeConfig);
  
    routeConfig.$inject = ['$stateProvider'];
  
    function routeConfig($stateProvider) {
      $stateProvider
        .state('alergias', {
          abstract: true,
          url: '/alergias',
          template: '<ui-view/>'
        })
        .state('alergias.list', {
          url: '',
          templateUrl: 'modules/alergias/client/views/list-alergias.client.view.html',
          controller: 'AlergiasListController',
          controllerAs: 'vm',
          data: {
            pageTitle: 'Alergias List'
          }
        })
        .state('alergias.create', {
          url: '/create',
          templateUrl: 'modules/alergias/client/views/form-alergia.client.view.html',
          controller: 'AlergiasController',
          controllerAs: 'vm',
          resolve: {
            alergiaResolve: newAlergia
          },
          data: {
            roles: ['admin'],
            pageTitle: 'Alergias Create'
          }
        })
        .state('alergias.edit', {
          url: '/:alergiaId/edit',
          templateUrl: 'modules/alergias/client/views/form-alergia.client.view.html',
          controller: 'AlergiasController',
          controllerAs: 'vm',
          resolve: {
            alergiaResolve: getAlergia
          },
          data: {
            roles: ['admin'],
            pageTitle: 'Edit Alergia {{ alergiaResolve.tipoalergia }}'
          }
        })
        .state('alergias.view', {
          url: '/:alergiaId',
          templateUrl: 'modules/alergias/client/views/view-alergia.client.view.html',
          controller: 'AlergiasController',
          controllerAs: 'vm',
          resolve: {
            alergiaResolve: getAlergia
          },
          data: {
            pageTitle: 'Alergia {{ alergiaResolve.tipoalergia }}'
          }
        });
    }
  
    getAlergia.$inject = ['$stateParams', 'AlergiasService'];
  
    function getAlergia($stateParams, AlergiasService) {
      return AlergiasService.get({
        alergiaId: $stateParams.alergiaId
      }).$promise;
    }
  
    newAlergia.$inject = ['AlergiasService'];
  
    function newAlergia(AlergiasService) {
      return new AlergiasService();
    }
  }());
  