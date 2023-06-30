const express = require('express');
const router = express.Router()
const notNumber = require('../utils/notNumber')

const db = require("../base-orm/sequelize-init");
const { Op ,ValidationError, where } = require('sequelize');

router.get("/api/estadios", async function(req, res, next) {
    // ---- Nueva lineas para poder filtrar a través de query params. Ver que también le agrego el where, 8 lineas mas abajo
    let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };}
    let data = await db.estadios.findAll({
        attributes: ['IdEstadio', 'Nombre', 'FechaCreacion'],
        where,
    });
    res.json(data);
})

router.get('/api/estadios/:id', async function (req, res, next){
    if(notNumber(req.params.id, res)) return;
    let data = await db.estadios.findAll({
        attributes: ['IdEstadio', 'Nombre', 'FechaCreacion'],
        where: {IdEstadio: Number(req.params.id)},
    });
    if(data.length > 0) res.json(data[0]);
    else res.status(400).json({mensaje: 'No encontrado :('})

})

router.post('/api/estadios/', async (req, res) => {
    try {
        let data = await db.estadios.create({
            Nombre: req.body.Nombre,
            FechaCreacion: req.body.FechaCreacion,
        });
        res.status(201).json(data.dataValues)
    }catch (err){
        //errores de validacion
        if (err instanceof ValidationError){
            let message = ''
            err.errors.forEach((x)=> message += (x.path ?? 'campo') + ': ' + x.message + '\n');
            res.status(400).json({message})
        }else{
            //errores desconocidos
            throw err
        }
    }
})

router.put('/api/estadios/:id', async (req, res) => {
    if(notNumber(req.params.id, res)) return;
    try {
        let estadio = await db.estadios.update(
            {
                Nombre: req.body.Nombre,
                FechaCreacion: req.body.FechaCreacion,
                IdEstadio: req.body.IdEstadio        
            },
            {where: { IdEstadio: req.params.id}}
        );
        res.sendStatus(202)
    }catch (err){
        if (err instanceof ValidationError){
            let message = ''
            err.errors.forEach((x) => message += x.path + ": " + x.message + "\n");
            res.status(400).json({ message: message})
        } else {
            throw err;
        }
    }
})


router.delete('/api/estadios/:id', async (req, res) => {
    if(notNumber(req.params.id, res)) return;
    try {
        let estadio = await db.estadios.destroy({
            where: {
                IdEstadio: req.params.id}
    });
        res.sendStatus(202)
    }catch (err){
        if (err instanceof ValidationError){
            let message = ''
            err.errors.forEach((x) => message += x.path + ": " + x.message + "\n");
            res.status(400).json({ message: message})
        } else {
            throw err;
        }
    }

}) 


module.exports = router