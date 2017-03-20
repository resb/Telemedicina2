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
   pacienteDni: {
    type: String,
    default: '',
    required: 'Please fill dni',
    trim: true
  },
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
  specialty: {
    type: Schema.ObjectId,
    ref: 'Specialty'
  },
  fecha: {
    type: Date,
    default: Date.now
  },
});

mongoose.model('Cita', CitaSchema);
