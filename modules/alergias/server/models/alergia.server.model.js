'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Alergia Schema
 */
var AlergiaSchema = new Schema({
    tipoalergia: {
        type: String,
        default: '',
        required: 'Please fill Alergia name',
        trim: true
    },
    sintomas: {
        type: String,
        trim: true,
        default: ''
    },
    tratamiento:{
        type:String,
        trime:true,
        default:''
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

mongoose.model('Alergia', AlergiaSchema);
