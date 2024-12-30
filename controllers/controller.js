'use strict'
var Proyecto = require('../modules/module');
var fs = require('fs');
var path = require('path');

var Controller = {
    home: function(req, res){
        res.status(200).json({
            mensaje: "Inicio Api"
        })
    },
    get: async function(req, res){
        var id = req.params.id;

        if(id == null){
            res.status(404).json({
                mensaje: "id no encontrado"
            })
        }

        try {
            var data = await Proyecto.findById(id);
            res.status(200).json({
                mensaje: data
            })
        }
        catch (error) {
            res.status(500).json({
                mensaje: "Proyecto Error"
            })
        }
    },
    save: async function(req, res) {
        var proyecto = new Proyecto();
        var params = req.body;
    
        proyecto.nombre = params.nombre;
        proyecto.apodo = params.apodo;
        proyecto.edad = params.edad;
        proyecto.record = params.record;
    
        if (req.files && req.files.image) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];
    
            if (fileExt == "jpg" || fileExt == "png" || fileExt == "jpeg" || fileExt == "gif") {
                proyecto.image = fileName;
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(400).json({
                        mensaje: "Extension de archivo no válida"
                    });
                });
            }
        }
    
        try {
            await proyecto.save();
            res.status(200).json({
                mensaje: "Proyecto Guardado",
                data: proyecto
            });
        } catch (error) {
            res.status(500).json({
                mensaje: "Proyecto Error"
            });
        }
    },    
    getAll: async function(req, res){
        try {
            var data = await Proyecto.find();
            res.status(200).json({
                mensaje: data
            })
        }
        catch (error) {
            res.status(500).json({
                mensaje: "Proyecto Error"
            })
        }
    },
    
    update: async function(req, res) {
        var id = req.params.id;
        var updateData = req.body;
    
        // console.log("ID del proyecto a actualizar:", id);
        // console.log("Datos para actualizar:", updateData);
    
        if (!id) {
            return res.status(404).json({
                mensaje: "ID no encontrado"
            });
        }
    
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                mensaje: "Datos de actualización vacíos"
            });
        }
    
        try {
            var proyectoExistente = await Proyecto.findById(id);
            if (!proyectoExistente) {
                return res.status(404).json({
                    mensaje: "Proyecto no encontrado"
                });
            }
    
            var data = await Proyecto.findByIdAndUpdate(id, updateData, { new: true });
            // console.log("Datos actualizados:", data);
            res.status(200).json({
                mensaje: "Proyecto Actualizado",
                data: data
            });
        } catch (error) {
            // console.error("Error al actualizar el proyecto:", error);
            res.status(500).json({
                mensaje: "Proyecto Error",
                error: error.message
            });
        }
    },    
    
    delete: async function(req, res){
        var id = req.params.id;

        if(id == null){
            res.status(404).json({
                mensaje: "id no encontrado"
            })
        }

        try {
            var data = await Proyecto.findByIdAndDelete(id);
            res.status(200).json({
                mensaje: data
            })
        }
        catch (error) {
            res.status(500).json({
                mensaje: "Proyecto Error"
            })
        }
    },
    updateImage: async function(req, res){
        var id = req.params.id;

        if(id == null){
            res.status(404).json({
                mensaje: "id no encontrado"
            })
        }

        var fileName = "Imagen no subida"

        if (req.files) {


            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == "jpg" || fileExt == "png" || fileExt == "jpeg" || fileExt == "gif"){
                try {
                    var data = await Proyecto.findByIdAndUpdate(id, {image: fileName}, {new: true});
                    res.status(200).json({
                        mensaje: data
                    })
                }
                catch (error) {
                    res.status(500).json({
                        mensaje: "Proyecto Error"
                    })
                }
            }else{
                
                fs.unlink(filePath, (err) => {
                   return res.status(500).json({
                        mensaje: "Extension no valida"
                    })
                })
            }
            
        }   
    },
    getImage: function (req, res){
        
        var img = req.params.img;

        if(img == null){
            res.status(404).json({
                mensaje: "img error"
            })
        }

        var ruta = "./img/" + img;

        fs.exists(ruta, (exists) => {
            if(exists){
               res.sendFile(path.resolve(ruta));
            }else{
                res.status(404).json({
                    mensaje: "img no encontrada"
                })
            }
        })
    },
    updateRecord: async function(req, res) {
        var id = req.params.id;
        var newRecord = req.body.record;

        if (!id) {
            return res.status(404).json({
                mensaje: "ID no encontrado"
            });
        }

        if (newRecord === undefined) {
            return res.status(400).json({
                mensaje: "Record no proporcionado"
            });
        }

        try {
            var proyectoExistente = await Proyecto.findById(id);
            if (!proyectoExistente) {
                return res.status(404).json({
                    mensaje: "Proyecto no encontrado"
                });
            }

            proyectoExistente.record = newRecord;
            await proyectoExistente.save();

            res.status(200).json({
                mensaje: "Record actualizado correctamente",
                data: proyectoExistente
            });
        } catch (error) {
            console.error("Error al actualizar el record:", error);
            res.status(500).json({
                mensaje: "Error al actualizar el record",
                error: error.message
            });
        }
    }
};

module.exports = Controller;