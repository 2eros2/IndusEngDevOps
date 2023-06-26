import React, { useEffect, useState } from 'react'
import {getEstadios, deleteEstadio, saveEstadio} from '../../services/estadios.services'
import EditEstadios from './EditEstadios';
import Tabla from './Tabla';
import FiltroEstadios from './FiltroEstadios';

export default function Estadios() {
  const [filas, setFilas] = useState([]);
  const [action, setAction] = useState('C');
  const [estadio, setEstadio] = useState(null);

  useEffect(() => {
    cargarEstadios()
  }, [])


  const cargarEstadios = async function (filtro) {
    const estadios = await getEstadios(filtro)
    setFilas(estadios.map((element) => {
      return {
        IdEstadio: element.IdEstadio,
        Nombre : element.Nombre,
        FechaCreacion: element.FechaCreacion,
      }
    }))
  }

  const onConsultar = (filtro) => {
    console.log(filtro)
    setAction('C')
    cargarEstadios(filtro)
  }
  const onNuevo = (estadio) => {
    setEstadio(estadio)
    setAction('N')
  }
  const onCancelar = () => {
    setAction('C')
  }

  const onConfirmar = async (estadio) => {
    console.log(estadio)
    await saveEstadio(estadio);
    await cargarEstadios()
    setAction('C')
  }

  const onDelete = async(IdEstadio) => {
    await deleteEstadio(IdEstadio)
    await cargarEstadios()
    setAction('C')
  }


  return (
    <>
      {action === 'C' && (
        <div>
          <FiltroEstadios onConsultar={onConsultar}></FiltroEstadios>
          <Tabla items={filas} onClickNuevo={onNuevo} onClickDelete={onDelete}></Tabla>
        </div>
      )}

      {
        action === 'N' && (
          <div>
            { <EditEstadios  onCancelar={onCancelar} onConfirmar={onConfirmar} estadio={estadio}/> }
          </div>
        )
      }

    </>
  )
}