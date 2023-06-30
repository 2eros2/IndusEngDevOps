import React, { useState, useEffect } from 'react';
import moment from "moment";
import BuscarPartidos from './BuscarPartidos';
import ListaPartidos from './ListaPartidos';
import RegistroPartidos from './RegistroPartidos';
import { partidosService } from '../../services/partidos.services';
import { estadiosService } from '../../services/estadios.service';
import { getEquipos } from '../../services/equipos.service';
import modalDialogService from '../../services/ModalDialog';


function Partidos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [arbitro, setArbitro] = useState("");

  const [partidos, setPartidos] = useState(null);
  const [partido, setPartido] = useState(null); // usado en BuscarporId(Modificar, Consultar)
  
  const [Equipos, setEquipos] = useState(null);
  const [Estadios, setEstadios] = useState(null);


  // cargar Partidos
 
 useEffect(() => {
    async function BuscarEstadios() {
      let data = await estadiosService.Buscar();
      setEstadios(data);
    }
    BuscarEstadios();
  }, []);

  useEffect(() => {
    async function BuscarEquipos() {
      let data = await getEquipos();
      setEquipos(data);
    }
    BuscarEquipos();
  }, []);


  async function Buscar() {
    //modalDialogService.BloquearPantalla(true);
    const data = await partidosService.Buscar(arbitro);
    setPartidos(data);
  }

  async function BuscarPorId(IdPartido, accionABMC) {
    const data = await partidosService.BuscarPorId(IdPartido);
    setPartido(data);
    setAccionABMC(accionABMC);
  }


  function Consultar(partido) {
    BuscarPorId(partido, "C");
  }

  function Modificar(partido) {
    BuscarPorId(partido, "M");
  }

  function Agregar() {
    setAccionABMC("A");
    setPartido({
      IdPartido: 0,
      equipo_local_id: null,
      equipo_visitante_id: null,
      fecha: moment(new Date()).format("YYYY-MM-DD"),
      IdEstadio: null,
      arbitro: null,
    });
  }

  async function Eliminar(partido) {

    await partidosService.deletePartido(partido);
    setTimeout(() => {
      alert(
        "Registro eliminado correctamente."
      );
    }, 0)
    await Buscar()
    
  }

    async function Grabar(partido) {
      try {
        await partidosService.Grabar(partido);
      } catch (error) {
        modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
        return;
      }
      await Buscar();
      Volver();
      setTimeout(() => {
        modalDialogService.Alert("Registro " + (AccionABMC === "A" ? "agregado" :
          "modificado") + " correctamente.");
      }, 0);
    }

    function Volver() {
      setAccionABMC("L");
    }

    return (
      <div>
        <div className="tituloPagina">
          <h1>Partidos X Arbitro</h1> <small>{TituloAccionABMC[AccionABMC]}</small>
        </div>
        {AccionABMC === "L" && (
        <BuscarPartidos
          arbitro={arbitro}
          setArbitro={setArbitro}
          Buscar={Buscar}
          Agregar={Agregar}
        />)}
        {/* Tabla de resutados de busqueda y Paginador */}
        {AccionABMC === "L" && partidos?.length > 0 && (
        <ListaPartidos
          {...{
            partidos,
            Equipos,
            Estadios,
            Consultar,
            Modificar,
            Eliminar,
            Buscar,
          }}
        />)}
        {AccionABMC === "L" && partidos?.length === 0 && <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>}
        {/* Formulario de alta/modificacion/consulta */}
        {AccionABMC !== "L" && (
        <RegistroPartidos
          {...{ AccionABMC, Equipos, Estadios, partido, Grabar, Volver }}
        />)}
      </div>
    );
  }
  export { Partidos };