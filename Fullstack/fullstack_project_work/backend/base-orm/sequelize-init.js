const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('sqlite:' + './.data/tpi.db')


const equipos = sequelize.define(
    "equipos",
    {
        IdEquipo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        Nombre :{
            type: DataTypes.STRING(25),
            allowNull: false,
            validate : {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido"
                },
                len: {
                    args: [9,25],
                    msg: "Nombre debe tener entre 9 y 25 caracteres"
                }
            }, unique: {
                args: true,
                msg: "este Nombre ya existe en la tabla!",
              }

        },
        FechaFun:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate:{
                notEmpty:{
                    args: true,
                    msg: "Fecha es requerido"
                },
            },
        },
    },
    {
    hooks: {
        beforeValidate: function (equipos, options){
            if (typeof equipos.Nombre === 'string'){
                equipos.Nombre = equipos.Nombre.toUpperCase().trim();
            }
        }
    },
    timestamps: false,
})



const jugadores = sequelize.define(
    "jugadores",
    {
        IdJugador: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        Nombre :{
            type: DataTypes.STRING(30),
            allowNull: false,
            validate : {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido"
                },
                len: {
                    args: [9,30],
                    msg: "Nombre debe tener entre 9 y 30 caracteres"
                }
            }

        },
        //esta en formato yy-mm-dd
        FechaNac:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate:{
                notEmpty:{
                    args: true,
                    msg: "Fecha es requerido"
                },
            },
        },
        // IdEquipo: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     validate: {
        //         notNull: {
        //             args: true,
        //             msg: "IdEquipo es requerido",
        //         }
        //     }
        // }
    },
    {
    hooks: {
        beforeValidate: function (jugadores, options){
            if (typeof jugadores.Nombre === 'string'){
                jugadores.Nombre = jugadores.Nombre.toUpperCase().trim();
            }
        }
    },
    timestamps: false,
})

const estadios = sequelize.define(
    "estadios",
    {
        IdEstadio: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

        },
        Nombre :{
            type: DataTypes.STRING(30),
            allowNull: false,
            validate : {
                notEmpty: {
                    args: true,
                    msg: "Nombre es requerido"
                },
                len: {
                    args: [3,30],
                    msg: "Nombre debe tener entre 3 y 30 caracteres"
                }
            }
        },
        //esta en formato yy-mm-dd
        FechaCreacion:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate:{
                notEmpty:{
                    args: true,
                    msg: "Fecha es requerido"
                },
            },
        },
    },
    {
    hooks: {
        beforeValidate: function (estadios, options){
            if (typeof estadios.Nombre === 'string'){
                estadios.Nombre = estadios.Nombre.toUpperCase().trim();
            }
        }
    },
    timestamps: false,
})

const goles = sequelize.define(
    "goles",
    {
        IdGol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        IdJugador:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate : {
                notEmpty: {
                    args: true,
                    msg: "Jugador id es requerido"
                },
            }

        },
        MinutoGol:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate : {
                notEmpty: {
                    args: true,
                    msg: "Minuto gol es requerido"
                },
            }

        },
        FechaGol:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate:{
                notEmpty:{
                    args: true,
                    msg: "Fecha es requerido"
                },
            },
        },
        clima:{
            type: DataTypes.STRING(30),
            allowNull: false,
            validate : {
                len: {
                    args: [3,30],
                    msg: "Clima debe tener entre 3 y 30 caracteres"
                }
            }

        },
    },
    {
    hooks: {
        beforeValidate: function (goles, options){
            if (typeof goles.clima === 'string'){
                goles.clima = goles.clima.toUpperCase().trim();
            }
        }
    },
    timestamps: false,
});





//definicion de modelo de datos
const partidos = sequelize.define(
    "partidos",
    {
        IdPartido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        equipo_local_id: {
            type: DataTypes.INTEGER,
    },
        equipo_visitante_id:{
            type: DataTypes.INTEGER,

    },
        fecha: {
            type: DataTypes.DATEONLY,

    },
        IdEstadio: {
            type:DataTypes.INTEGER, 
    },
        arbitro: {
            type: DataTypes.STRING(15),
            validate: {
                len:{
                    args: [2, 15],
                    msg: "El arbitro tiene que ser de tipo caracteres entre 2 y 15 de longitud"
                },
            },
        },
        
    },

        {
            timestamps: false,
            //Paso a mayusculas y no permito espacions en blanco en el nombre del arbitro
            hooks:{
                beforeValidate: function(partidos,options){
                    if(typeof partidos.arbitro === "string"){
                        partidos.arbitro = partidos.arbitro.toUpperCase().trim();
                }
            },
        },
    });

    module.exports = {sequelize, jugadores, equipos, estadios, goles, partidos}
