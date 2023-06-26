//acceder a la base de datos 
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste(){
    //abrir base, si no existe el archivo/base lo crea
    await db.open("./.data/tpi.db");

    let existe = false;
    let res = null;

    res = await db.get(
        "SELECT count(*) AS contar FROM sqlite_schema WHERE type='table' AND name='partidos'",
        []
    ); 
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE TABLE partidos( 
                    IdPartido INTEGER PRIMARY KEY AUTOINCREMENT,
                    equipo_local_id INTEGER,
                    equipo_visitante_id INTEGER,
                    fecha DATE, 
                    arbitro TEXT,
                    IdEstadio INTIGER,
                    FOREIGN KEY (IdEstadio) REFERENCES estadios(IdEstadio));`
                   //FOREIGN KEY (equipo_local_id, equipo_visitante_id) REFERENCES equipos(IdEquipo));
                   
        );
        console.log("tabla de partidos creada!");
        await db.run(
            `INSERT INTO partidos VALUES 
            (1,1,2,'2023-05-31','Pitana',1),
            (2,3,4,'2023-05-30','Loustau',2),
            (3,6,5,'2023-06-02','Vigliano',3),
            (4,7,8,'2023-02-23', 'Rapallini',4),
            (5,2,3,'2023-03-04','Abal',5),
            (6,9,10,'2023-07-27','Delfino',6),
            (7,11,10,'2023-06-28','Herrera',7),
            (8,1,6,'2023-05-17','Penel',8),
            (9,2,7,'2023-04-03','Tello',9),
            (10,6,11,'2023-01-12','Lamolina',10);`
        );      
    }


  existe = false;
  res = null;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'equipos'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table equipos( 
        IdEquipo INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre text NOT NULL UNIQUE, 
        FechaFun DATE NOT NULL);`
    );
    console.log("tabla de equipos creada!");
    await db.run(
      "insert into equipos values	(1,'FC Barcelona','29-11-1899'),(2,'Juventus','11-01-1897'),(3,'Paris Saint-Germain','12-08-1970'),(4,'Liverpool FC','15-03-1892'), \
      (5,'Bayern Munich','27-02-1900'),(6,'Manchester City','16-04-1880'),(7,'Real Madrid CF','06-03-1902'),(8,'Tottenham Hotspur','05-09-1882'),(9,'Manchester United','01-03-1878'),\
      (10,'AC Milan','16-12-1899'),(11,'AFC Ajax ','18-03-1900');"
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'jugadores'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table jugadores( 
        IdJugador INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre text NOT NULL UNIQUE, 
        FechaNac DATE NOT NULL,
        IDEquipo INTEGER,
        FOREIGN KEY (IDEquipo) REFERENCES equipos(IdEquipo));`
    );
    console.log("tabla jugadores creada!");
    await db.run(
      "insert into jugadores values	(1,'LIONEL MESSI','1987-06-24',3),(2,'CRISTIANO RONALDO','05-02-1985',7), (3,'NEYMAR JR','1992-02-05',3),(4,'MOHAMED SALAH','1992-06-15',4), (5,'KYLIAN MBAPPE','1998-01-20',3),(6,'ROBERT LEWANDOWSKI','1988-08-21',1), (7,'KEVIN DE BRUYNE','28-06-1991',6),(8,'VIRGIL VAN DIJK','08-07-1991',7), (9,'SERGIO RAMOS','30-03-1986',3), (10,'HARRY KANE','28-07-1993', 8);"
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'estadios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table estadios( 
        IdEstadio INTEGER PRIMARY KEY AUTOINCREMENT, 
        Nombre text NOT NULL UNIQUE, 
        FechaCreacion DATE NOT NULL);`
    );
    console.log("tabla estadios creada!");
    await db.run(
      "insert into estadios values	(1,'Camp Nou','24-06-1987'),(2,'Alianz Stadium','05-02-1985'), (3,'Parc des Princes','1992-02-05'),(4,'Anfield','15-06-1992'), (5,'Alianz Arena','20-01-1998'),(6,'Etihad Stadium','21-08-1988'), (7,'Santiago Bernabeu','28-06-1991'),(8,'Tottenham Hotsupr Stadium','08-07-1991'), (9,'Old Trafford','30-03-1986'), (10,'San siro','28-07-1993');"
    );
  }

  existe = false;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'goles'",
    []
    );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table goles( 
        IdGol INTEGER PRIMARY KEY AUTOINCREMENT, 
        IdJugador INTEGER NOT NULL,
        MinutoGol INTEGER NOT NULL, 
        FechaGol DATE NOT NULL,
        clima TEXT);`
    );  
    console.log("tabla goles creada!");

        console.log("Entro a crear tabla")
await db.run(
  "insert into goles values	(1,1,23,'2023-05-15','lluvia'),(2,2,55,'2023-05-15','lluvia'),(3,3,10,'2023-05-16','soleado'),(4,4,76,'2023-05-16','soleado'),\
  (5,5,31,'2023-05-17','soleado'),(6,6,82,'2023-05-17','nublado'),(7,7,15,'2023-05-18','nublado'),(8,8,40,'2023-05-18','nublado'),(9,9,65,'2023-05-19','lluvia'),(10,10,88,'2023-05-19','lluvia');"
  );
}

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
