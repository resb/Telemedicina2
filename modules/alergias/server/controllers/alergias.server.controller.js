'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Specialty = mongoose.model('Alergia'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Alergia
 */
exports.create = function(req, res) {
  var alergia = new Alergia(req.body);
  alergia.user = req.user;

  alergia.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(alergia);
    }
  });
};

/**
 * Show the current Alergia
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var alergia = req.alergia ? req.alergia.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  alergia.isCurrentUserOwner = req.user && alergia.user && alergia.user._id.toString() === req.user._id.toString();

  res.jsonp(alergia);
};

/**
 * Update a Alergia
 */
exports.update = function(req, res) {
  var alergia = req.alergia;

  alergia = _.extend(alergia, req.body);

  alergia.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(alergia);
    }
  });
};

/**
 * Delete an Alergia
 */
exports.delete = function(req, res) {
  var alergia = req.alergia;

  specialty.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(alergia);
    }
  });
};

/**
 * List of Alergias
 */
exports.list = function(req, res) {
  Alergia.find().sort('-created').populate('user', 'displayName').exec(function(err, alergias) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(alergias);
    }
  });
};

/**
 * Alergia middleware
 */
exports.alergiaByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Alergia is invalid'
    });
  }

  Alergia.findById(id).populate('user', 'displayName').exec(function (err, alergia) {
    if (err) {
      return next(err);
    } else if (!alergia) {
      return res.status(404).send({
        message: 'No Alergia with that identifier has been found'
      });
    }
    req.alergia = alergia;
    next();
  });
};
