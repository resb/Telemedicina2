// Specialties service used to communicate Specialties REST endpoints
(function () {
  'use strict';

  angular
    .module('specialties')
    .factory('SpecialtiesService', SpecialtiesService);

  SpecialtiesService.$inject = ['$resource'];

  function SpecialtiesService($resource) {
    return $resource('api/specialties/:specialtyId', {
      specialtyId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
