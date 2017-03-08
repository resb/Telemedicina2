'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Main Schema
 */
var MainSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Main name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Main', MainSchema);
