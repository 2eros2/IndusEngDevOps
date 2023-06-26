import React, { useEffect, useState } from 'react';
import { getGoles, deleteGol, saveClima } from '../../services/goles.services';
import EditGoles from './EditGoles';
import FiltroGoles from './FiltroGoles';
import TablaGoles from './Tabla.Goles';

export default function Goles() {
  const [filas, setFilas] = useState([]);
  const [action, setAction] = useState('C');
  const [gol, setGol] = useState(null);

  useEffect(() => {
    cargarGoles();
  }, []);

  const cargarGoles = async function (filtro) {
    const goles = await getGoles(filtro);
    setFilas(
      goles.map((element) => {
        return {
          IdGol: element.IdGol,
          MinutoGol: element.MinutoGol,
          FechaGol: element.FechaGol,
          clima: element.clima,
        };
      })
    );
  };

  const onConsultar = (filtro) => {
    setAction('C');
    cargarGoles(filtro);
  };

  const onNuevo = (gol) => {
    setGol(gol);
    setAction('N');
  };

  const onEditar = (gol) => {
    setGol(gol);
    setAction('E');
  };

  const onCancelar = () => {
    setAction('C');
  };

  const onConfirmar = async (gol) => {
    await saveClima(gol);
    await cargarGoles();
    setAction('C');
  };

  const onDelete = async (idGol) => {
    await deleteGol(idGol);
    await cargarGoles();
    setAction('C');
  };

  return (
    <>
      {action === 'C' && (
        <div>
          <FiltroGoles onConsultar={onConsultar}></FiltroGoles>
          <TablaGoles
            items={filas}
            onClickNuevo={onNuevo}
            onClickEditar={onEditar}
            onClickDelete={onDelete}
          ></TablaGoles>
        </div>
      )}

      {action === 'N' && (
        <div>
          <EditGoles onCancelar={onCancelar} onConfirmar={onConfirmar} gol={gol} isNew={true} />
        </div>
      )}

      {action === 'E' && (
        <div>
          <EditGoles onCancelar={onCancelar} onConfirmar={onConfirmar} gol={gol} isNew={false} />
        </div>
      )}
    </>
  );
}
