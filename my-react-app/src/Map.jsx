import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const Map = () => {
  const mapContainer = useRef(null);
  let ubicacionUsuario = null;

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Puedes usar otro estilo
      center: [-75.58777499661787, 6.263433865116909], // Coordenadas de tu centro comercial
      // center: [-75.5269632, 6.3176704 ], // Coordenadas de tu centro comercial
      zoom: 21, // Nivel de zoom inicial
    });

    map.on('load', () => {
      map.addSource('planos', {
        type: 'geojson',
        data: '../public/out.json', // Ruta a tu archivo GeoJSON
      });

      map.addLayer({
        id: 'capa-planos',
        type: 'line',
        source: 'planos',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#088', // Color azul para las líneas
          'line-width': 2 // Ancho de las líneas
        }
      });

      const geolocalizar = () => {
        if ('geolocation' in navigator) {
          navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              actualizarUbicacion(longitude, latitude, map);
            },
            (error) => {
              console.error('Error al geolocalizar:', error);
            },
            { enableHighAccuracy: true }
          );
        } else {
          console.error('Geolocalización no disponible en este navegador.');
        }
      };
      geolocalizar();

      
    });

    return () => map.remove();
  }, []);

  // Función para actualizar la ubicación en el mapa
  const actualizarUbicacion = (longitude, latitude, map) => {
    console.log(longitude, latitude, map);
    if (map.getSource('ubicacion-usuario')) {
      // Actualizar las coordenadas de la fuente de datos GeoJSON existente
      map.getSource('ubicacion-usuario').setData({
        type: 'Point',
        coordinates: [longitude, latitude],
      });
    } else {
      // Crear una nueva fuente de datos GeoJSON y agregarla al mapa
      map.addSource('ubicacion-usuario', {
        type: 'geojson',
        data: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      });
      map.addLayer({
        id: 'capa-ubicacion-usuario',
        type: 'circle',
        source: 'ubicacion-usuario',
        paint: {
          'circle-radius': 8,
          'circle-color': '#007bff',
        },
      });
    }
  };

  return <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />;
};

export default Map;