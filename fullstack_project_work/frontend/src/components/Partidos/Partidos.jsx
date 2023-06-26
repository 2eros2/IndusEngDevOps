import { useState, useEffect } from 'react';
import ListaPartidos from './ListarPartidos';
import BuscarPartidos from './BuscarPartidos';
import RegistroPartidos from './RegistroPartido';
import { partidosService } from '../../services/partidos.services';

import moment from "moment";
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
  const [Activo, setActivo] = useState("");

  const [partidos, setPartidos] = useState(null);
  const [partido, setPartido] = useState(null); // usado en BuscarporId(Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  
  const [Equipos, setEquipos] = useState(null);
  const [Estadios, setEstadios] = useState(null);


  // cargar Partidos
 




  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    }
    else {
      _pagina = Pagina;
    }
    const data = await partidosService.Buscar(arbitro, Activo, _pagina);
    setPartidos(data.partidos);
    setRegistrosTotal(data.RegistrosTotal);
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }


  async function BuscarPorId(partido, accionABMC) {
    const data = await partidosService.BuscarPorId(partido);
    setPartido(data);
    setAccionABMC(accionABMC);
  }


  function Consultar(partido) {
    BuscarPorId(partido, "C");
  }

  function Modificar(partido) {
    if (!partido.Activo) {
      modalDialogService.Alert("No puede modificarse un registro Inactivo.");
      return;
    }
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
      Activo: true,
    });
  }
  function Imprimir() {
    modalDialogService.Alert("En Desarrollo...");
  }

  async function ActivarDesactivar(partido) {
    modalDialogService.Confirm(
      "Esta seguro que quiere " +
      (partido.Activo ? "desactivar" : "activar") +
      " el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await partidosService.ActivarDesactivar(partido);
        await Buscar();
      }
    );}


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
        {AccionABMC === "L" && <BuscarPartidos
          arbitro={arbitro}
          setArbitro={setArbitro}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />}
        {/* Tabla de resutados de busqueda y Paginador */}
        {AccionABMC === "L" && partidos?.lenght > 0 && <ListaPartidos
          {...{
            partidos,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Imprimir,
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />}
        {AccionABMC === "L" && partidos?.lenght === 0 && <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>}
        {/* Formulario de alta/modificacion/consulta */}
        {AccionABMC !== "L" && <RegistroPartidos
          {...{ AccionABMC, Equipos, Estadios, partido, Grabar, Volver }}
        />}
      </div>
    );
  }
  export { Partidos };