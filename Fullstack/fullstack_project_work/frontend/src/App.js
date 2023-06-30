import './App.css';

import Goles from './components/goles/Goles';
import {Menu} from './components/Menu';
import { Inicio } from './components/Inicio';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Jugadores from './components/jugadores/Jugadores';
import Equipos from './components/Equipos/Equipos';
import { Estadios } from './components/estadios/Estadios';
import { Partidos } from './components/Partidos/Partidos';
import ModalDialog from './components/ModalDialog';




function App() {
  return (
    <>
      <BrowserRouter>
        {/* <ModalDialog/> */}
        <div className="ClassInicio">
        
            <Menu />
          <div className="divBody">
              <Routes>
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/estadios" element={< Estadios/>} />
                <Route path="/goles" element={< Goles/>} />
                <Route path="/jugadores" element={< Jugadores/>} />
                <Route path="/equipos" element={< Equipos/>} />
                <Route path="/partidos" element={< Partidos/>} />


                <Route path="*" element={<Navigate to="/inicio" replace />} />
              </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App; 
