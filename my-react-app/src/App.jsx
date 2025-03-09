import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Example from "./Example";
import MapPage from "./MapPage";
import Lol from "./Lol";
import Map from "./Map";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>MallP</h1>
            <Link to="/map">
              <button 
                style={{ padding: "10px 20px", fontSize: "1.2rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
              >
                Entrar
              </button>
            </Link>
          </div>
        } />
        <Route path="/map" element={<Map />} />
      </Routes>
    </Router>
  );
}

export default App;