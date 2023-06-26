import React from "react";
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        {/* <a className="navbar-brand" href="#!">
          <i>Pymes</i>
        </a> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/inicio">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/estadios">
                Estadios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/goles">
                Goles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/jugadores">
                Jugadores
              </NavLink>
              
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/equipos">
                Equipos
              </NavLink>
              
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/partidos">
                Partidos
              </NavLink>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export {Menu};
