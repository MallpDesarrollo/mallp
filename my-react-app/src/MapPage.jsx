import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  // Cargar el GeoJSON desde public/plano.json
  useEffect(() => {
    fetch("/out.json")
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
      .catch((error) => console.error("Error cargando el GeoJSON:", error));
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer center={[6.2442, -75.5812]} zoom={24} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {geojsonData && <GeoJSON data={geojsonData} style={{ color: "blue", weight: 2 }} />}
      </MapContainer>
    </div>
  );
};

export default MapPage;
