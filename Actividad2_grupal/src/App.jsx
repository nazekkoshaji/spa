import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Importar las páginas (asegúrate de tener estas vistas creadas)
import Activities from './pages/Activities';
import ActivityDetail from './pages/ActivityDetail';


// Importar componentes comunes (como Navbar)
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar /> {/* Aquí se mostrará la barra de navegación en todas las páginas */}
      <div className="page-content">
        <Routes>
          {/* Define las rutas de la aplicación */}
          <Route path="/actividades" element={<Activities />} />
          <Route path="/actividad/:id" element={<ActivityDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
