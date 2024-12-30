'use strict'

var mongoose = require('mongoose');

var app = require('./server');
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/unicaes1')
    .then(() => {

        app.listen(port, () => {
            console.log(`Servidor corriendo en el puerto ${port}`);
        });

        console.log('Conexion a base de datos exitosa');
    })
    .catch(err => console.log(err));