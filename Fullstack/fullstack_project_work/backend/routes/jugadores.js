const express = require('express');
const router = express.Router()
const notNumber = require('../utils/notNumber')

const db = require("../base-orm/sequelize-init");
const { Op ,ValidationError, where } = require('sequelize');

router.get("/api/jugadores", async function(req, res, next) {
    let data = await db.jugadores.findAll({
        attributes: ['IdJugador', 'Nombre', 'FechaNac', 'IDEquipo'],
    });
    res.json(data);
})

router.get('/api/jugadores/:id', async function (req, res, next){
    if(notNumber(req.params.id, res)) return;
    let data = await db.jugadores.findAll({
        attributes: ["IdJugador", 'Nombre', 'FechaNac', 'IDEquipo'],
        where: {IdJugador: Number(req.params.id)},
    });
    if(data.length > 0) res.json(data[0]);
    else res.status(400).json({mensaje: 'No encontrado :('})

})

router.post('/api/jugadores/', async (req, res) => {
    try {
        let data = await db.jugadores.create({
            Nombre: req.body.Nombre,
            FechaNac: req.body.FechaNac,
            // IDEquipo: req.body.IDEquipo
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

router.put('/api/jugadores/:id', async (req, res) => {
    // if(notNumber(req.params.id, res)) return;
    try {
        let jugador = await db.jugadores.update(
            {
                Nombre: req.body.Nombre,
                FechaNac: req.body.FechaNac     
            },
            {where: { IdJugador: req.params.id}}
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



router.delete('/api/jugadores/:id', async (req, res) => {
    if(notNumber(req.params.id, res)) return;
    try {
        let jugador = await db.jugadores.destroy({
            where: {
                IdJugador: req.params.id}
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