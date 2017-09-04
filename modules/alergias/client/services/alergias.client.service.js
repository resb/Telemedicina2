// Alergias service used to communicateAlergias REST endpoints
(function () {
    'use strict';
  
    angular
      .module('alergias')
      .factory('AlergiasService', AlergiasService);
  
    AlergiasService.$inject = ['$resource'];
  
    function AlergiasService($resource) {
      return $resource('api/alergias/:alergiaId', {
        alergiaId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
  }());
  