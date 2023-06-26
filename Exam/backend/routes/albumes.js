const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/albumes", async function (req, res) {
  // consulta de albumes con filtros y paginacion

  let where = {};
  if (req.query.Artista != undefined && req.query.Artista !== "") {
    where.Artista = {
      [Op.like]: "%" + req.query.Artista + "%",
    };
  }
  let items = await db.albumes.findAndCountAll({
    attributes: [
      "Id",
      "Artista",
      "Album",
      "Genero",
      "Precio",
    ],
    order: [["Artista", "ASC"]],
    where,
  });

  res.json(items.rows);
});

module.exports = router;
