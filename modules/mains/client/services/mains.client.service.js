// Mains service used to communicate Mains REST endpoints
(function () {
  'use strict';

  angular
    .module('mains')
    .factory('MainsService', MainsService);

  MainsService.$inject = ['$resource'];

  function MainsService($resource) {
    return $resource('api/mains/:mainId', {
      mainId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
