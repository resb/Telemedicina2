'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Specialty = mongoose.model('Specialty'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Specialty
 */
exports.create = function(req, res) {
  var specialty = new Specialty(req.body);
  specialty.user = req.user;

  specialty.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(specialty);
    }
  });
};

/**
 * Show the current Specialty
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var specialty = req.specialty ? req.specialty.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  specialty.isCurrentUserOwner = req.user && specialty.user && specialty.user._id.toString() === req.user._id.toString();

  res.jsonp(specialty);
};

/**
 * Update a Specialty
 */
exports.update = function(req, res) {
  var specialty = req.specialty;

  specialty = _.extend(specialty, req.body);

  specialty.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(specialty);
    }
  });
};

/**
 * Delete an Specialty
 */
exports.delete = function(req, res) {
  var specialty = req.specialty;

  specialty.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(specialty);
    }
  });
};

/**
 * List of Specialties
 */
exports.list = function(req, res) {
  Specialty.find().sort('-created').populate('user', 'displayName').exec(function(err, specialties) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(specialties);
    }
  });
};

/**
 * Specialty middleware
 */
exports.specialtyByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Specialty is invalid'
    });
  }

  Specialty.findById(id).populate('user', 'displayName').exec(function (err, specialty) {
    if (err) {
      return next(err);
    } else if (!specialty) {
      return res.status(404).send({
        message: 'No Specialty with that identifier has been found'
      });
    }
    req.specialty = specialty;
    next();
  });
};
