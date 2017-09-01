'use strict';

/**
 * Module dependencies
 */
var tarjetasPolicy = require('../policies/tarjetas.server.policy'),
  tarjetas = require('../controllers/tarjetas.server.controllers');

module.exports = function(app) {
  // Specialties Routes
  app.route('/api/tarjetas').all(tarjetasPolicy.isAllowed)
    .get(tarjetas.list)
    .get(tarjetas.listforUser)
    .post(tarjetas.create);
  
  /*  app.route('/api/tarjetas/:usuarioId').all(tarjetasPolicy.isAllowed)
    .get(tarjetas.listforUser);*/

  app.route('/api/tarjetas/:tarjetaId').all(tarjetasPolicy.isAllowed)
    .get(tarjetas.read)
    .put(tarjetas.update)
    .delete(tarjetas.delete);

  // Finish by binding the Specialty middleware
  app.param('tarjetaId', tarjetas.tarjetaByID);
};
