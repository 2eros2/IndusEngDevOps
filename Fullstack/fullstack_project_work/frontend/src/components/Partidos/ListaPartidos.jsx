import React, { useEffect, useState } from "react";
import moment from "moment";

export default function ListaPartidos({
  partidos,
  Equipos,
  Estadios,
  Consultar,
  Modificar,
  Eliminar,
  Buscar,
}) {

  return (
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
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {partidos &&
            partidos.map((partido) => (
              <tr key={partido.IdPartido}>
                <td className="text-end">{partido.IdPartido}</td>
                <td className="text-end">
                  {Equipos.find((equipo) => partido.equipo_local_id === equipo.IdEquipo)?.Nombre}
                </td>
                <td className="text-end">
                  {Equipos.find((equipo) => partido.equipo_visitante_id === equipo.IdEquipo)?.Nombre}
                  </td>
                <td className="text-end">
                  {moment(partido.fecha).format("DD/MM/YYYY")}
                </td>
                <td className="text-end">{partido.arbitro}</td>
                <td className="text-end">
                  {Estadios.find((estadio) => partido.IdEstadio === estadio.IdEstadio)?.Nombre}
                </td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(partido)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(partido)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Eliminar"
                    onClick={() => Eliminar(partido)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
