'use strict';

/**
 * Module dependencies
 */
var alergiasPolicy = require('../policies/alergias.server.policy'),
  alergias = require('../controllers/alergias.server.controller');

module.exports = function(app) {
  // Alergias Routes
  app.route('/api/alergias').all(alergiasPolicy.isAllowed)
    .get(alergias.list)
    .post(alergias.create);

  app.route('/api/alergias/:alergiaId').all(alergiasPolicy.isAllowed)
    .get(alergias.read)
    .put(alergias.update)
    .delete(alergias.delete);

  // Finish by binding the Alergia middleware
  app.param('alergiaId', alergias.alergiaByID);
};
