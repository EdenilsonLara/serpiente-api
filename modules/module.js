'use strict'

const mongoose = require('mongoose');

var modelo = mongoose.Schema;

var unicaesModel = new modelo({
    nombre: String,
    apodo: String,
    edad: Number,
    record: Number,
    image: String
    // Materias:[String]
});

module.exports = mongoose.model('unicaes', unicaesModel);