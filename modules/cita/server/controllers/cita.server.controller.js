'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Cita = mongoose.model('Cita'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Cita
 */
exports.create = function(req, res) {
  var cita = new Cita(req.body);
  cita.user = req.user;

  cita.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cita);
    }
  });
};

/**
 * Show the current Cita
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var cita = req.cita ? req.cita.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  cita.isCurrentUserOwner = req.user && cita.user && cita.user._id.toString() === req.user._id.toString();

  res.jsonp(cita);
};

/**
 * Update a Cita
 */
exports.update = function(req, res) {
  var cita = req.cita;

  cita = _.extend(cita, req.body);

  cita.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cita);
    }
  });
};

/**
 * Delete an Cita
 */
exports.delete = function(req, res) {
  var cita = req.cita;

  cita.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      //res.jsonp(cita);
      console.log("borrado")
    }
  });
};

/**
 * List of Cita
 */
exports.list = function(req, res) {
  //{ pacienteDni : req.user.dni}
  Cita.find().sort('-created').populate('user', 'displayName').exec(function(err, cita) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(cita);
    }
  });
};

/**
 * Cita middleware
 */
exports.citaByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Cita is invalid'
    });
  }

  Cita.findById(id).populate('user', 'displayName').exec(function (err, cita) {
    if (err) {
      return next(err);
    } else if (!cita) {
      return res.status(404).send({
        message: 'No Cita with that identifier has been found'
      });
    }
    req.cita = cita;
    next();
  });
};
