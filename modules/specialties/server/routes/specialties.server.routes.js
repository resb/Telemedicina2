'use strict';

/**
 * Module dependencies
 */
var specialtiesPolicy = require('../policies/specialties.server.policy'),
  specialties = require('../controllers/specialties.server.controller');

module.exports = function(app) {
  // Specialties Routes
  app.route('/api/specialties').all(specialtiesPolicy.isAllowed)
    .get(specialties.list)
    .post(specialties.create);

  app.route('/api/specialties/:specialtyId').all(specialtiesPolicy.isAllowed)
    .get(specialties.read)
    .put(specialties.update)
    .delete(specialties.delete);

  // Finish by binding the Specialty middleware
  app.param('specialtyId', specialties.specialtyByID);
};
