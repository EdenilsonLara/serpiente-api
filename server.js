'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var rou = require('./rutas/rutas');
var multer = require('multer');
var app = express();



// Configuración de multer para manejar form-data
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

//cargar archivos de ruta


//peticiones
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
    });


//CORS


//rutas
app.use("/", rou);


//exportar
module.exports = app;
