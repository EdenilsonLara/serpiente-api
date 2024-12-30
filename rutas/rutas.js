'use strict'

var express = require('express');

var controller = require('../controllers/controller'); // Importación correcta
var multer = require('multer');
var multiparty = require('connect-multiparty');
var multipartyModdleware = multiparty({uploadDir: './img'});

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var router = express.Router();
router.get('/', controller.home);
router.get('/get/:id', controller.get);
router.post('/save', multipartyModdleware, controller.save);
router.get('/getAll', controller.getAll);
router.put('/update/:id', upload.none(), controller.update);
router.delete('/delete/:id', controller.delete);
router.post('/updateImage/:id', multipartyModdleware, controller.updateImage);
router.get('/getImage/:img', multipartyModdleware, controller.getImage);
router.put('/updateRecord/:id', controller.updateRecord); // Cambio de Controller a controller

module.exports = router;


//api node