import React, { useEffect, useState } from 'react'
import {getJugadores, deleteJugador, saveJugador} from '../../services/jugadores.services'
import EditJugadores from './EditJug';
import FiltroJug from './FiltroJug';
import TableJug from './TableJug';

export default function Jugadores() {
  const [filas, setFilas] = useState([]);
  const [action, setAction] = useState('C');
  const [jugador, setJugador] = useState(null);

  useEffect(() => {
    cargarJugadores()
  }, [])


  const cargarJugadores = async function (filtro) {
    const jugadores = await getJugadores(filtro)
    setFilas(jugadores.map((element) => {
      const dateObj = new Date(element.FechaNac)
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const formattedDateTime = `${year}-${month}-${day}`
      return {
        IdJugador: element.IdJugador,
        Nombre : element.Nombre,
        FechaNac: formattedDateTime,
      }
    }))
  }

  const onConsultar = (filtro) => {
    setAction('C')
    cargarJugadores(filtro)
  }
  const onNuevo = (jugador) => {
    setJugador(jugador)
    console.log(jugador)
    setAction('N')
  }
  const onCancelar = () => {
    setAction('C')
  }

  const onConfirmar = async (jugador) => {
    await saveJugador(jugador);
    await cargarJugadores()
    setAction('C')
  }

  const onDelete = async(idJugador) => {
    await deleteJugador(idJugador)
    await cargarJugadores()
    setAction('C')
  }


  return (
    <>
      {action === 'C' && (
        <div>
          <FiltroJug onConsultar={onConsultar}></FiltroJug>
          <TableJug items={filas} onClickNuevo={onNuevo} onClickDelete={onDelete}></TableJug>
        </div>
      )}

      {
        action === 'N' && (
          <div>
            { <EditJugadores  onCancelar={onCancelar} onConfirmar={onConfirmar} jugador={jugador}/> }
          </div>
        )
      }

    </>
  )
}