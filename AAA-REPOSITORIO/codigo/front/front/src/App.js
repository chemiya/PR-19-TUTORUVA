import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PantallaPrincipal from './componentes/PantallaPrincipal';
import BuscadorAlumno from './componentes/BuscadorAlumno';
import BuscadorProfesor from './componentes/BuscadorProfesor';
import CrearTutoria from './componentes/CrearTutoria';
import MiUsuario from './componentes/MiUsuario';
import EditarPerfil from './componentes/EditarPerfil';
import MisTutorias from './componentes/MisTutorias';
import DetallesTutoria from './componentes/DetallesTutoria';
import MisAlumnos from './componentes/MisAlumnos';
import MisProfesores from './componentes/MisProfesores';
function App() {
  return (
    <div className="App">
      


      <Router>
        <Routes>
          <Route path="/" element={<PantallaPrincipal />} />
          <Route path="/buscadorAlumno" element={<BuscadorAlumno />} />
          <Route path="/buscadorProfesor" element={<BuscadorProfesor />} />
          <Route path="/crearTutoria/:id" element={<CrearTutoria />} />
          <Route path="/miUsuario" element={<MiUsuario />} />
          <Route path="/misTutorias" element={<MisTutorias />} />
          <Route path="/misAlumnos" element={<MisAlumnos />} />
          <Route path="/misProfesores" element={<MisProfesores />} />
          <Route path="/editarPerfil" element={<EditarPerfil />} />
          <Route path="/detallesTutoria/:id" element={<DetallesTutoria />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
