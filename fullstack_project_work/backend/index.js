const express = require("express")
const app = express();
const cors = require('cors')

require("./base-orm/sqlite-init");  // crear base si no existe

app.use(express.json()); // para poder leer json en el body

app.use(cors())


app.get("/", (req, res) => {
    res.send("Hola mundo!");
});


const partidos  = require("./routes/partidos");
app.use(partidos);

// Routes Equipos
const equiposRouter = require('./routes/equipos');
app.use(equiposRouter)

const jugadoresRouter = require('./routes/jugadores');
app.use(jugadoresRouter)

const estadiosRouter = require('./routes/estadios');
app.use(estadiosRouter)

const golesRouter = require('./routes/goles');
app.use(golesRouter)

if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
    const port = process.env.PORT || 4000;   // en produccion se usa el puerto de la variable de entorno PORT
    app.locals.fechaInicio = new Date();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  }
  module.exports = app; // para testing
  