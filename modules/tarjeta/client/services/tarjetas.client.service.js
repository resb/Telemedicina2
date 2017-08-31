// Tarjetas service used to communicate Specialties REST endpoints
(function () {
    'use strict';
  
    angular
      .module('tarjetas')
      .factory('TarjetasService', SpecialtiesService);
  
    TarjetasService.$inject = ['$resource'];
  
    function TarjetasService($resource) {
      return $resource('api/tarjetas/:tarjetaId', {
        tarjetaId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
  }());
  