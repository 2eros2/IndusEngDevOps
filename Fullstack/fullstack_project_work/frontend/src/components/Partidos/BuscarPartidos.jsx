import React from "react";
export default function BuscarPartidos ({arbitro, setArbitro, Buscar, Agregar}) {


    return (
    <form name="FormBusqueda" onSubmit={(e)=> e.preventDefault()}>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4 col-md-2">
                    <label className="col-form-label">Arbitro:</label>
                </div>
                <div className="col-sm-8 col-md-4">
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setArbitro(e.target.value)}
                        value={arbitro}
                        maxLength="15"
                        autoFocus
                    />
                </div>
            <hr />

            {/* Botones */}
            <div className="row">
                <div className="col text-center botones">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => Buscar(1) }
                >
                    <i className="fa fa-search"> </i> Buscar Partidos
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => Agregar() }
                >
                    <i className="fa fa-plus"> </i> Agregar Partido
                </button>
                </div>
            </div>
        </div>
        </div>
    </form>
    )
};