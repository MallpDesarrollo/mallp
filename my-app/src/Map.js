import React, { useRef, useEffect } from 'react'; // Importa useEffect
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = () => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapContainer.current) {
      const map = new maplibregl.Map({
        container: mapContainer.current, // Usa mapContainer.current
        style: 'https://demotiles.maplibre.org/style.json',
        center: [-75.5877, 6.2634],
        zoom: 16,
      });

      map.on('load', () => {
        const marker = new maplibregl.Marker({
          color: 'red',
          size: 10,
        })
          .setLngLat([-75.5877, 6.2634])
          .addTo(map);

        marker.setPopup(
          new maplibregl.Popup({ offset: [0, -15] }).setHTML(
            '<strong>Viva Envigado</strong><br>Cra. 48 #32B Sur-139, Zona 1, Envigado, Antioquia, Colombia'
          )
        );
      });

      return () => map.remove(); // Limpieza al desmontar el componente
    }
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
};

export default Map;