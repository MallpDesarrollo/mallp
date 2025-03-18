import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Map from './Map'; // Importa el componente Map
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Mallps</h1>
          <Link to="/map">
            <button className="boton-entrar">Entrar</button>
          </Link>
        </header>
        <Route path="/map" component={Map} />
      </div>
    </Router>
  );
}

export default App;