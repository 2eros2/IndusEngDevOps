//acceder a la base de datos 
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste(){
    //abrir base, si no existe el archivo/base lo crea
    await db.open("./.data/tpi.db");

    let existe = false;
    let res = null;

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
        FechaFun text NOT NULL);`
    );
    console.log("tabla de equipos creada!");
    await db.run(
      "insert into equipos values	(1,'FC Barcelona','1899-11-29'),(2,'Juventus','1897-01-11'),(3,'Paris Saint-Germain','1970-08-12'),(4,'Liverpool FC','1892-03-15'), \
      (5,'Bayern Munich','1900-02-27'),(6,'Manchester City','1880-04-16'),(7,'Real Madrid CF','1902-03-06'),(8,'Tottenham Hotspur','1882-09-05'),(9,'Manchester United','1878-03-01'),\
      (10,'AC Milan','1899-12-16'),(11,'AFC Ajax ','1900-03-18');"
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
        FechaNac TEXT NOT NULL,
        IDEquipo INTEGER,
        FOREIGN KEY (IDEquipo) REFERENCES equipos(IdEquipo)
        on DELETE SET NULL)
        ;`
    );
    console.log("tabla jugadores creada!");
    await db.run(
      "insert into jugadores values	(1,'LIONEL MESSI','1987-06-24',3),(2,'CRISTIANO RONALDO','1985-02-05',7), (3,'NEYMAR JR','1992-02-05',3),(4,'MOHAMED SALAH','1992-06-15',4), (5,'KYLIAN MBAPPE','1998-01-20',3),(6,'ROBERT LEWANDOWSKI','1988-08-21',1), (7,'KEVIN DE BRUYNE','1991-06-28',6),(8,'VIRGIL VAN DIJK','1991-07-08',7), (9,'SERGIO RAMOS','1986-03-30',3), (10,'HARRY KANE','1993-07-28', 8);"
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
      "insert into estadios values	(1,'Camp Nou','1987-06-24'),(2,'Alianz Stadium','1985-05-02'), (3,'Parc des Princes','1992-02-05'),(4,'Anfield','1992-06-15'), (5,'Alianz Arena','1998-01-20'),(6,'Etihad Stadium','1988-08-21'), (7,'Santiago Bernabeu','1991-06-28'),(8,'Tottenham Hotsupr Stadium','1991-08-07'), (9,'Old Trafford','1986-03-30'), (10,'San siro','1993-07-28');"
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

await db.run(
  "insert into goles values	(1,1,23,'2023-05-15','LLUVIA'),(2,2,55,'2023-05-15','LLUVIA'),(3,3,10,'2023-05-16','SOLEADO'),(4,4,76,'2023-05-16','SOLEADO'),\
  (5,5,31,'2023-05-17','SOLEADO'),(6,6,82,'2023-05-17','NUBLADO'),(7,7,15,'2023-05-18','NUBLADO'),(8,8,40,'2023-05-18','NUBLADO'),(9,9,65,'2023-05-19','LLUVIA'),(10,10,88,'2023-05-19','LLUVIA');"
  );
}
existe = false;
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
              FOREIGN KEY (IdEstadio) REFERENCES estadios(IdEstadio)
              on DELETE SET NULL,
              FOREIGN KEY (equipo_local_id) REFERENCES equipos(IdEquipo)
              on DELETE SET NULL,
              FOREIGN KEY (equipo_visitante_id) REFERENCES equipos(IdEquipo)
              on DELETE SET NULL);`
             
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

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
