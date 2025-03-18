import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Map from './Map';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Mallp</h1>
          <Link to="/map">
            <button className="boton-entrar">Entrar</button>
          </Link>
        </header>
        <Routes>
          <Route path="/map" element={<Map />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;