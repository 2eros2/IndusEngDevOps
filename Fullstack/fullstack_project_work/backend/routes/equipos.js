const express = require('express');
const router = express.Router()
const notNumber = require('../utils/notNumber')

const db = require("../base-orm/sequelize-init");
const { Op ,ValidationError, where } = require('sequelize');

router.get("/api/equipos", async function(req, res, next) {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };}
    let data = await db.equipos.findAll({
        attributes: ['IdEquipo', 'Nombre', 'FechaFun'],
        where,
    });
    res.json(data);
})

router.get('/api/equipos/:id', async function (req, res, next){
    if(notNumber(req.params.id, res)) return;
    let data = await db.equipos.findAll({
        attributes: ["IdEquipo", 'Nombre', 'FechaFun'],
        where: {IdEquipo: Number(req.params.id)},
    });
    if(data.length > 0) res.json(data[0]);
    else res.status(400).json({mensaje: 'No encontrado :('})

})

router.post('/api/equipos/', async (req, res) => {
    try {
        let data = await db.equipos.create({
            Nombre: req.body.Nombre,
            FechaFun: req.body.FechaFun
        });
        res.status(200).json(data.dataValues)
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

router.put('/api/equipos/:id', async (req, res) => {
    if(notNumber(req.params.id, res)) return;
    try {
        let equipos = await db.equipos.update(
            {
                Nombre: req.body.Nombre,
                FechaFun: req.body.FechaFun,
                       
            },
            {where: { IdEquipo: req.params.id}}
        );
        res.sendStatus(200)
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


router.delete('/api/equipos/:id', async (req, res) => {
    if(notNumber(req.params.id, res)) return;
    try {
        let equipos = await db.equipos.destroy({
            where: {
                IdEquipo: req.params.id}
    });
        res.sendStatus(200)
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