const express = require('express');
const router = express.Router();
const notNumber = require('../utils/notNumber');

const db = require("../base-orm/sequelize-init");
const { Op ,ValidationError, where } = require('sequelize');

router.get("/api/goles", async function (req, res, next) {
    let where = {};
    if (req.query.clima != undefined && req.query.clima !== "") {
      where.clima = {
        [Op.like]: "%" + req.query.clima + "%",
      };}
    let data = await db.goles.findAll({
        attributes: ['IdGol', 'IdJugador','MinutoGol','FechaGol','clima'],
        where
    });
    res.json(data);
});

router.get("/api/goles/:id", async function (req, res, next) {
    if(notNumber(req.params.id, res)) return;
    let data = await db.goles.findAll({
        attributes: ['IdGol', 'IdJugador','MinutoGol','FechaGol','clima'],
        where: {IdGol: Number(req.params.id)},
    });
    if(data.length > 0) res.json(data[0]);
    else res.status(400).json({mensaje: 'No encontrado :('})

}) 

router.post('/api/goles', async (req, res) => {
    try {
        let data = await db.goles.create({
            IdJugador: req.body.IdJugador,
            MinutoGol: req.body.MinutoGol,
            FechaGol: req.body.FechaGol,
            clima: req.body.clima,
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

router.put('/api/goles/:id', async (req, res) => {
    if(notNumber(req.params.id, res)) return;
    try {
        let gol = await db.goles.update(
            {
                IdJugador: req.body.IdJugador,
                MinutoGol: req.body.MinutoGol,
                FechaGol: req.body.FechaGol,
                clima: req.body.clima,       
            },
            {where: { IdGol: req.params.id}}
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


router.delete('/api/goles/:id', async (req, res) => {
    if(notNumber(req.params.id, res)) return;
    try {
        let gol = await db.goles.destroy({
            where: {
                IdGol: req.params.id}
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


module.exports = router;