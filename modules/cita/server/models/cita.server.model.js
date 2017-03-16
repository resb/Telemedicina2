'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * cita Schema
 */
var CitaSchema = new Schema({
  doctor: {
    type: String,
    default: '',
    required: 'Please fill doctor name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  especialidad: {
    type: String,
    default: '',
    required: 'Please fill Especialidad name',
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('Cita', CitaSchema);
