import React, { useEffect, useState } from 'react'
import {getEquipos, deleteEquipos, saveEquipos} from '../../services/equipos.service'
import EditarEquipos from './EditarEquipos';
import EquiposFiltrar from './EquiposFiltrar';
import TablaEquipos from './TablaEquipos';


export default function Equipos() {
  const [filas, setFilas] = useState([]);
  const [action, setAction] = useState('C');
  const [equipo, setEquipo] = useState(null);

  useEffect(() => {
    cargarEquipos()
  }, [])


  const cargarEquipos = async function (filtro) {
    const equipos = await getEquipos(filtro)
    setFilas(equipos .map((element) => {
      return {
        IdEquipo: element.IdEquipo,
        Nombre : element.Nombre,
        FechaFun: element.FechaFun,
      }
    }))
  }

  const onConsultar = (filtro) => {
    setAction('C')
    cargarEquipos(filtro)
  }
  const onNuevo = (equipo) => {
    setEquipo(equipo)
    setAction('N')
  }
  const onCancelar = () => {
    setAction('C')
  }

  const onConfirmar = async (equipo) => {
    await saveEquipos(equipo);
    await cargarEquipos()
    setAction('C')
  }

  const onDelete = async(IdEquipo) => {
    await deleteEquipos(IdEquipo)
    await cargarEquipos()
    setAction('C')
  }


  return (
    <>
      {action === 'C' && (
        <div>
          <EquiposFiltrar onConsultar={onConsultar}></EquiposFiltrar>
          <TablaEquipos items={filas} onClickNuevo={onNuevo} onClickDelete={onDelete}></TablaEquipos>
        </div>
      )}

      {
        action === 'N' && (
          <div>
            { <EditarEquipos  onCancelar={onCancelar} onConfirmar={onConfirmar} equipo={equipo}/> }
          </div>
        )
      }

    </>
  )
}