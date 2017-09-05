'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Tarjeta=mongoose.model('Tarjeta'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;

  //For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = req.body.roles;

  user.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  User.find({}, '-salt -password').sort('-created').populate('user', 'displayName').exec(function (err, users) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.json(users);
  });
};

exports.listforUser=function (req,res) {
  var userId =req.model._id;
  Tarjeta.find({user:userId}).exec(function (err,tarjetas) {
    if (err) {
      return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
      });
  }else{
      res.jsonp(tarjetas)
  }
  });
};

exports.listforUser=function (req,res) {
  var userId =req.model._id;
  console.log(req.model);
  Tarjeta.find({user:userId}).exec(function (err,tarjetas) {
    if (err) {
      return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
      });
  }else{
      res.jsonp(tarjetas)
  }
  });
};

exports.listforUserID=function (req,res) {
  var userId =req.model._id;
  var tarjetaId=req.params.tarjetaId;
  //var tarjetaId=req.model.
  console.log(req.model);
  Tarjeta.find({user:userId,_id:tarjetaId}).exec(function (err,tarjetas) {
    if (err) {
      return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
      });
  }else{
      res.jsonp(tarjetas)
  }
  });
};
/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }
    req.model = user;
    next();
  });
};

exports.tarjetaByID=function (req,res,next,id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
          message: 'Tarjeta es invalida'
      });
  }
  Tarjeta.findById(id).populate('user','displayName').exec(function (err,tarjeta) {
      if (err) {
          return next(err);
      }else if (!tarjeta) {
          return res.status(400).send({
              message:'No Tarjeta with that identifier has benn found'
          });
      }
      req.tarjeta=tarjeta;
      next();
  });
};