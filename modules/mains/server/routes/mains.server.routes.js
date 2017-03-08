'use strict';

/**
 * Module dependencies
 */
var mainsPolicy = require('../policies/mains.server.policy'),
  mains = require('../controllers/mains.server.controller');

module.exports = function(app) {
  // Mains Routes
  app.route('/api/mains').all(mainsPolicy.isAllowed)
    .get(mains.list)
    .post(mains.create);

  app.route('/api/mains/:mainId').all(mainsPolicy.isAllowed)
    .get(mains.read)
    .put(mains.update)
    .delete(mains.delete);

  // Finish by binding the Main middleware
  app.param('mainId', mains.mainByID);
};
