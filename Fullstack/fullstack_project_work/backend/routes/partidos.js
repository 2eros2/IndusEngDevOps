const express = require('express');
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op ,ValidationError, where } = require('sequelize');



router
    .get('/api/partidos', async function(req,res,next){
        let data = await db.partidos.findAll({
            attributes:["IdPartido","equipo_local_id","equipo_visitante_id","fecha","arbitro","IdEstadio"],
        });
        res.json(data);
});
router
    .get("/api/partidos/:id", async function(req, res, next) {
    let data = await db.partidos.findOne({
      attributes: ["IdPartido", "equipo_local_id", "equipo_visitante_id", "fecha", "arbitro","IdEstadio"],
     where: { IdPartido: req.params.id },
   });
  
    if (data !== null) {
      res.json(data);
    } else {
      res.status(404).json({ mensaje: 'No encontrado!!' });
    }
});
router
    .post("/api/partidos", async (req,res) =>{
      try{
        let data = await db.partidos.create({
          equipo_local_id: req.body.equipo_local_id,
          equipo_visitante_id: req.body.equipo_visitante_id,
          fecha: req.body.fecha,
          arbitro: req.body.arbitro,
          IdEstadio: req.body.IdEstadio,
        });
        res.status(200).json(data.dataValues);
      } catch(err){
        if (err instanceof ValidationError){
          let messages = '';
          err.errors.forEach((x) => messages += (x.path ?? 'campo')+ ": "+ x.message+ '\n');
          res.status(400).json({message:messages});
        }else{
          throw err;
        }
      }
    });

router
    .put("/api/partidos/:id", async(req,res) =>{
      try{
        let partido = await db.partidos.findOne({
          attributes: [
            "IdPartido",
            "equipo_local_id",
            "equipo_visitante_id",
            "fecha",
            "arbitro",
            "IdEstadio",
          ],
          where: { IdPartido: req.params.id},
        });
        if(!partido){
          res.status(404).json({message: "Partido no encontrado"});
          return
        }
        partido.equipo_local_id = req.body.equipo_local_id;
        partido.equipo_visitante_id = req.body.equipo_visitante_id;
        partido.fecha = req.body.fecha;
        partido.arbitro = req.body.arbitro;
        partido.IdEstadio = req.body.IdEstadio;
        await partido.save(); 
        res.sendStatus(200);
      } catch(err){
        if (err instanceof ValidationError){
          let messages = '';
          err.errors.forEach((x) => messages += x.path + ": "+ x.message+ '\n');
          res.status(400).json({message: messages});
      }else{
        throw err;
      }
    }
    });
router
      .delete("/api/partidos/:id", async (req, res) => {
      try {
        const partido = await db.partidos.findOne({
          where: { IdPartido: req.params.id },
        });
    
        if (!partido) {
          res.status(404).json({ message: "Partido no encontrado" });
          return;
        }
    
        await partido.destroy();
        res.sendStatus(200);
      } catch (err) {
        res.status(500).json({ message: "Error al eliminar el partido" });
        console.error(err);
      }
    });
    

module.exports = router;