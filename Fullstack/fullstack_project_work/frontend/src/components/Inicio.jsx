import React from "react";

function Inicio() {
  return (
    
    <div className="container">
      <h1>Inicio</h1>
      <hr />
      <div
        className="mt-4 p-5 rounded"
        style={{ color: "white" ,backgroundColor: "darkgray" }}
      >
        <h1>TPI Desarrollo de software</h1>
        <h3>Integrantes: 
          <ol>
            <li>Ferrazzo Franco 82974   </li>
            <li>Gago Mauricio 92290     </li>
            <li>Paglia Francisco 88688  </li>
            <li>Perucca Eros 92934      </li>
            <li>Zavala Francisco 87464  </li>
          </ol>
        </h3>
        <p>Porfavor utilize nuestra barra superior para navegar</p>
      </div>
    </div>
    
  );
}

export { Inicio };