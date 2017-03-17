// Mains service used to communicate Mains REST endpoints
(function () {
  'use strict';

  angular
    .module('mains')
    .factory('MeetingService', MeetingService);

  MeetingService.$inject = ['$resource'];

  function MeetingService($resource) {
    return $resource('api/mains/atencion/:mainId', {
      mainId: '@_id'
    });
  }
}());
