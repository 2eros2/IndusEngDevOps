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
            <li>Ferrazo</li>
            <li>Gago</li>
            <li>Paglia</li>
            <li>Perucca Eros 92934</li>
            <li>Zavala</li>
          </ol>
        </h3>
        <p>Porfavor utilize nuestra barra superior para navegar</p>
      </div>
    </div>
    
  );
}

export { Inicio };