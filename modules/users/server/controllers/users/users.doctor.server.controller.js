'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
  mongoose = require('mongoose'),
  Meeting = mongoose.model('Meeting');

/**
 * User middleware
 */
exports.list = function(req, res) {
  Meeting.find().sort('-created').populate('User', 'displayName').exec(function(err, meeting) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(meeting);
    }
  });
};

exports.delete = function(req, res) {
  var meeting = req.meeting;

  meeting.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      //res.jsonp(meeting);
      console.log("borro")
    }
  });
};
