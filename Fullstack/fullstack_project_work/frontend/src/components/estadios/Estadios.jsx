import React, { useState, useEffect } from "react";
import moment from "moment";
import { estadiosService } from "../../services/estadios.service";

import EstadiosBuscar from "./EstadiosBuscar";
import EstadiosListado from "./EstadiosListado";
import EstadiosRegistro from "./EstadiosRegistro";


function Estadios() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarEstadios() {
      let data = await estadiosService.Buscar();
      setItems(data);
    }
    BuscarEstadios();
  }, []);

  async function Buscar() {

    const data = await estadiosService.Buscar(Nombre,); 
    setItems(data);
    setRegistrosTotal(data.RegistrosTotal);

  }


  async function BuscarPorId(item, accionABMC) {
    const data = await estadiosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdEstadio: 0,
      Nombre: null,
      FechaCracion: moment(new Date()).format("YYYY-MM-DD"),
    });
  }

  async function Eliminar(item) {

    await estadiosService.deleteEstadios(item);
    setTimeout(() => {
      alert(
        "Registro eliminado correctamente."
      );
    }, 0)
    await Buscar()
    
  }

  async function Grabar(item) {
    // agregar o modificar
    try
    {
      await estadiosService.Grabar(item);
    }
    catch (error)
    {
      alert(error?.response?.data?.message ?? error.toString())
      return;
    }
    await Buscar();
    Volver();
  
    setTimeout(() => {
      alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }
  
  

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }
  return (
    <div>
      <div className="tituloPagina">
        Estadios <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" &&<EstadiosBuscar
        Nombre={Nombre}
        setNombre={setNombre}
        Buscar={Buscar}
        Agregar={Agregar}
      />}

      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && <EstadiosListado
        {...{
          Items,
          Consultar,
          Modificar,
          Eliminar,
        }}
      />}

        {AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...
      </div> }

      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" &&  <EstadiosRegistro
        {...{ AccionABMC, Item, Grabar, Volver }}
      /> }
    </div>
  );
}
export { Estadios };
