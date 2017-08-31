(function () {
  'use strict';

  angular
    .module('specialties')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('specialties', {
        abstract: true,
        url: '/specialties',
        template: '<ui-view/>'
      })
      .state('specialties.list', {
        url: '',
        templateUrl: 'modules/specialties/client/views/list-specialties.client.view.html',
        controller: 'SpecialtiesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Specialties List'
        }
      })
      .state('specialties.create', {
        url: '/create',
        templateUrl: 'modules/specialties/client/views/form-specialty.client.view.html',
        controller: 'SpecialtiesController',
        controllerAs: 'vm',
        resolve: {
          specialtyResolve: newSpecialty
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Specialties Create'
        }
      })
      .state('specialties.edit', {
        url: '/:specialtyId/edit',
        templateUrl: 'modules/specialties/client/views/form-specialty.client.view.html',
        controller: 'SpecialtiesController',
        controllerAs: 'vm',
        resolve: {
          specialtyResolve: getSpecialty
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Specialty {{ specialtyResolve.name }}'
        }
      })
      .state('specialties.view', {
        url: '/:specialtyId',
        templateUrl: 'modules/specialties/client/views/view-specialty.client.view.html',
        controller: 'SpecialtiesController',
        controllerAs: 'vm',
        resolve: {
          specialtyResolve: getSpecialty
        },
        data: {
          pageTitle: 'Specialty {{ specialtyResolve.name }}'
        }
      });
  }

  getSpecialty.$inject = ['$stateParams', 'SpecialtiesService'];

  function getSpecialty($stateParams, SpecialtiesService) {
    return SpecialtiesService.get({
      specialtyId: $stateParams.specialtyId
    }).$promise;
  }

  newSpecialty.$inject = ['SpecialtiesService'];

  function newSpecialty(SpecialtiesService) {
    return new SpecialtiesService();
  }
}());
