import React from "react";
import moment from 'moment';

export default function ListaPartidos({
    partidos,
    Consultar,
    Modificar,
    ActivarDesactivar,
    Imprimir,
    Pagina,
    RegistrosTotal,
    Paginas,
    Buscar,
    }) {

    return(
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="text-center">ID </th>
                        <th className="text-center">Equipo Local</th>
                        <th className="text-center">Equipo Visitante</th>
                        <th className="text-center">Fecha</th>
                        <th className="text-center">Arbitro</th>
                        <th className="text-center">Estadio</th>
                        <th className="text-center">Activo</th>
                        <th className="text-center text-nowrap">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {partidos.map((partido) => {
                return(
                    <tr key={partido.IdPartido}> 
                        <td className="text-end">{partido.IdPartido}</td>
                        <td className="text-end">{partido.equipo_local_id}</td>
                        <td className="text-end">{partido.equipo_visitante_id}</td>
                        <td className="text-end">{moment(partido.fecha).format("DD/MM/YYYY")}</td>
                        <td className="text-end">{partido.arbitro}</td>
                        <td className="text-end">{partido.IdEstadio}</td>
                        <td className="text-end">{partido.Activo ? "SI" : "NO"}</td>
                        <td className="text-center text-nowrap">
                            <button className="btn btn-sm btn-outline-primary" title="Consultar"
                                    onClick={() => Consultar(partido)}>
                                    <i className="fa fa-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-primary" title="Modificar"
                                    onClick={() => Modificar(partido)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                                <button
                                    className={"btn btn-sm " + (partido.Activo ? "btn-outline-danger"
                                    : "btn-outline-success")
                                    }
                                    title={partido.Activo ? "Desactivar" : "Activar"}
                                    onClick={() => ActivarDesactivar(partido)}
                                    >
                                    <i className={"fa fa-" + (partido.Activo ? "times" : "check")}></i>
                                </button>
                                    </td>
                
                    </tr>
                    )
                })}
            </tbody>
        
        </table>
        {/* Paginador*/}
        <div className="paginador">
            <div className="row"></div>
            <div className="col">
                <span className="pyBadge">Registros: {RegistrosTotal}</span>
            </div>
            <div className="col text-center">
                Pagina: &nbsp;
                <select value={Pagina} onChange={(e) => {Buscar(e.target.value);}}>
                {Paginas?.map((x) => (<option value={x} key={x}>{x}</option>))}</select>
                &nbsp; de {Paginas?.length}
            </div>
            <div className="col">
            <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
              <i className="fa fa-print"></i>Imprimir
            </button>
            </div>
        </div>
    </div>
    );
}