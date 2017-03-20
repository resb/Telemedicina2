'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Specialty Schema
 */
var SpecialtySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Specialty name',
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

mongoose.model('Specialty', SpecialtySchema);
