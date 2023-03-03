const express = require("express");
const superhero_model = require("../models/superhero.model");
const routes = express.Router();
//Añadir
routes.post("/",(req,res)=>{
    const new_superhero = superhero_model(req.body);
    new_superhero
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});
//Listar *
routes.get("/",(req,res)=>{
    superhero_model
        .find()
        .then((data)=> res.json(data))
        .catch((err)=>res.json({message:err}));
});
//Listar por ID
routes.get("/:superheroId",(req,res)=>{
    const {superheroId} = req.params;
    superhero_model
        .findById({_id:superheroId})
        .then((data)=> res.json(data))
        .catch((err)=>res.json({message:err}));
});
//Actualizar
routes.put("/:superheroId",(req,res)=>{
    const superheroId = req.params.superheroId;
    const query = {_id:superheroId};
    const update = {$set:req.body};
    superhero_model
        .updateOne(query,update)
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}))
});
//Eliminar
routes.delete("/:superheroId",(req,res)=>{
    const {superheroId} = req.params;
    superhero_model
        .deleteOne({_id:superheroId})
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}));
});
//Eliminar con filtro de búsqueda
routes.delete("/",(req,res)=>{
    const query = {superhero:{$regex:"Batman"}};
    superhero_model
        .deleteMany(query)
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}));
});

routes.get("/superpowers-list/:property",(req,res)=>{
    const property = req.params.property;
    superhero_model
        .distinct(property)
        .then((data)=>res.json(data))
        .catch((err)=>res.json({message:err}));
});

routes.get("/:property/:limit",(req,res)=>{
    const property = req.params.property;
    const limit = parseInt(req.params.limit);
    superhero_model
        .distinct(property)
        .then((data)=>res.json(data.slice(0,limit)))
        .catch((err)=>res.json({message:err}));
});
module.exports = routes;

