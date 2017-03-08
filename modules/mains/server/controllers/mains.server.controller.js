'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Main = mongoose.model('Main'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Main
 */
exports.create = function(req, res) {
  var main = new Main(req.body);
  main.user = req.user;

  main.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(main);
    }
  });
};

/**
 * Show the current Main
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var main = req.main ? req.main.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  main.isCurrentUserOwner = req.user && main.user && main.user._id.toString() === req.user._id.toString();

  res.jsonp(main);
};

/**
 * Update a Main
 */
exports.update = function(req, res) {
  var main = req.main;

  main = _.extend(main, req.body);

  main.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(main);
    }
  });
};

/**
 * Delete an Main
 */
exports.delete = function(req, res) {
  var main = req.main;

  main.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(main);
    }
  });
};

/**
 * List of Mains
 */
exports.list = function(req, res) {
  Main.find().sort('-created').populate('user', 'displayName').exec(function(err, mains) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(mains);
    }
  });
};

/**
 * Main middleware
 */
exports.mainByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Main is invalid'
    });
  }

  Main.findById(id).populate('user', 'displayName').exec(function (err, main) {
    if (err) {
      return next(err);
    } else if (!main) {
      return res.status(404).send({
        message: 'No Main with that identifier has been found'
      });
    }
    req.main = main;
    next();
  });
};
