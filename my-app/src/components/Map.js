import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// import { geo } from "./assets/out.json"

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null); // Usamos useRef para el mapa
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  let ubicacionUsuario = null;

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Puedes usar otro estilo
      // center: [-75.58777499661787, 6.263433865116909], // Coordenadas de tu centro comercial
      center: [-75.59172030798746, 6.178177527057414], // Coordenadas de tu centro comercial
      // center: [-75.5269632, 6.3176704 ], // Coordenadas de tu centro comercial
      zoom: 21, // Nivel de zoom inicial
    });

    map.current.on('load', () => {
      map.current.addSource('planos', {
        type: 'geojson',
        data: './out.json',
      });

      // Agregar líneas (LineString)
      map.current.addLayer({
        id: "lines",
        type: "line",
        source: "planos",
        paint: {
          "line-color": "#da0000",
          "line-width": 3,
        },
      });

      // Agregar polígonos
      map.current.addLayer({
        id: "polygons",
        type: "fill",
        source: "planos",
        paint: {
          "fill-color": "#0080ff",
          "fill-opacity": 0.5,
        },
        filter: ["==", "$type", "Polygon"],
      });

      // Agregar bordes a los polígonos
      map.current.addLayer({
        id: "polygon-borders",
        type: "line",
        source: "planos",
        paint: {
          "line-color": "#0033cc",
          "line-width": 2,
        },
        filter: ["==", "$type", "Polygon"],
      });
      // map.addLayer({
      //   id: 'capa-planos',
      //   type: 'line',
      //   source: 'planos',
      //   layout: {
      //     'line-join': 'round',
      //     'line-cap': 'round'
      //   },
      //   paint: {
      //     'line-color': '#088', // Color azul para las líneas
      //     'line-width': 2 // Ancho de las líneas
      //   }
      // });
      map.current.addSource('marcador-mall', {
        type: 'geojson',
        data: {
          type: 'Point',
          coordinates: [-75.59172030798746, 6.178177527057414],
        },
      });
      
      map.current.addLayer({
        id: 'capa-ubicacion-mall',
        type: 'circle',
        source: 'marcador-mall',
        paint: {
          'circle-radius': 8,
          'circle-color': '#00fbff',
        },
      });
      map.current.addSource('marcador-casa', {
        type: 'geojson',
        data: {
          type: 'Point',
          coordinates: [-75.58778530111002, 6.263452767665115],
        },
      });
      
      map.current.addLayer({
        id: 'capa-ubicacion-casa',
        type: 'circle',
        source: 'marcador-casa',
        paint: {
          'circle-radius': 8,
          'circle-color': '#ff5443',
        },
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

    return () => map.current.remove();
  }, []);

  const irAUbicacion = () => {
    console.log('irAUbicacion fue llamada');
    if ('geolocation' in navigator && map.current) {
      console.log('entro al if');
      setLoading(true); // Mostrar indicador de carga
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('asigno valores', longitude, latitude);
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 20,
          });
          setLoading(false); // Ocultar indicador de carga
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          setLoading(false); // Ocultar indicador de carga
        }
      );
    } else {
      console.error('Geolocalización no xdisponible o mapa no inicializado. JAJA');
    }
  };

  // Función para actualizar la ubicación en el mapa
  const actualizarUbicacion = (longitude, latitude, map) => {
    console.log(longitude, latitude, map);
    if (map.current.getSource('ubicacion-usuario')) {
      // Actualizar las coordenadas de la fuente de datos GeoJSON existente
      map.current.getSource('ubicacion-usuario').setData({
        type: 'Point',
        coordinates: [longitude, latitude],
      });
    } else {
      // Crear una nueva fuente de datos GeoJSON y agregarla al mapa
      map.current.addSource('ubicacion-usuario', {
        type: 'geojson',
        data: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      });
      map.current.addLayer({
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

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '500px' }} />
      <button onClick={irAUbicacion}>Ir a mi ubicación</button>
        {loading ? 'Obteniendo ubicación...' : ''}
    </div>
  );
};

export default Map;