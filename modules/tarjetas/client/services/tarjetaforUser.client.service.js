// Tarjetas service used to communicate Specialties REST endpoints
(function () {
    'use strict';
  
    angular
      .module('tarjetas')
      .factory('TarjetasforUserService', TarjetasforUserService);
  
      TarjetasforUserService.$inject = ['$resource'];
  
   /* function TarjetasService($resource) {
      return $resource('api/tarjetas/:tarjetaId', {
        tarjetaId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }*/

  function TarjetasforUserService($resource) {
      return $resource('api/tarjetas/:userId', {
        userId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
  }());
  