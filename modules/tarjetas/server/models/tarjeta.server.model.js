/* Module dependencies.
*/
var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

/**
* Specialty Schema
*/
var tarjetaSchema = new mongoose.Schema({
    nombre: {
      type: String,
      default: ''
    },
    nrotarjeta: {
      type: String,
      default: ''
    },
    codseguridad: {
      type: String,
      default: ''
    },
    mesexpiracion: {
      type: String,
      default: ''
    },
    anioexpiracion: {
      type: String,
      default: ''
    },
    user:{type:Schema.ObjectId,ref:'User'}
  })

  mongoose.model('Tarjeta', tarjetaSchema);