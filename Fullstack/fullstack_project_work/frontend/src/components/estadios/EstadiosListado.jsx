import React from "react";
import moment from "moment";

export default function EstadioListados({
  Items,
  Consultar,
  Modificar,
  Eliminar,
}) {
    return (
        <div className="table-responsive">
          <table className="table table-hover table-sm table-bordered table-striped">
            <thead>
              <tr>
                <th className="text-center">IdEstadio</th>
                <th className="text-center">Nombre</th>
                <th className="text-center">Fecha de creacion</th>
                <th className="text-center text-nowrap">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Items &&
                Items.map((Item) => (
                  <tr key={Item.IdEstadio}>
                    <td className="text-center">{Item.IdEstadio}</td>
                    <td>{Item.Nombre}</td>
                    <td className="text-end">
                      {moment(Item.FechaCreacion).format("DD/MM/YYYY")}
                    </td>
                    <td className="text-center text-nowrap">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        title="Consultar"
                        onClick={() => Consultar(Item)}
                      >
                        <i className="fa fa-eye"></i>
                        </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Eliminar"
                    onClick={() => Eliminar(Item)}
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

    