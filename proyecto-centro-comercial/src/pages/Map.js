'useClient'

import { useEffect } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// import Location from "../components/Location"; // Importamos el componente

export default function Mapa() {
  // const [map, setMap] = useState(null);
  // const [marker, setMarker] = useState(null);

  useEffect(() => {
    const mapInstance = new maplibregl.Map({
      container: "map",
      style: "https://demotiles.maplibre.org/style.json",
      center: [-75.59172030798746, 6.178177527057414], // Coordenadas de tu centro comercial
      zoom: 15,
    });

    fetch("/out.json")
      .then((response) => response.json())
      .then((geojsonData) => {
        mapInstance.on("load", () => {
          mapInstance.addSource("planos", {
            type: "geojson",
            data: geojsonData,
          });
            // Agregar polígonos
          mapInstance.addLayer({
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
          mapInstance.addLayer({
            id: "polygon-borders",
            type: "line",
            source: "planos",
            paint: {
              "line-color": "#0033cc",
              "line-width": 2,
            },
            filter: ["==", "$type", "Polygon"],
          });
          mapInstance.addLayer({
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
          mapInstance.addSource('marcador-mall', {
            type: 'geojson',
            data: {
              type: 'Point',
            coordinates: [-75.59179039798749, 6.178177527057414],
            },
          });
          mapInstance.addLayer({
            id: 'capa-ubicacion-mall',
            type: 'circle',
            source: 'marcador-mall',
            paint: {
              'circle-radius': 8,
              'circle-color': '#00fbff',
            },
          });
          mapInstance.addSource('marcador-casa', {
            type: 'geojson',
            data: {
              type: 'Point',
              coordinates: [-75.58778530111002, 6.263452767665115],
            },
          });
      
          mapInstance.addLayer({
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
                  actualizarUbicacion(longitude, latitude, mapInstance);
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
      })
      .catch((error) => console.error("Error cargando el GeoJSON:", error));

    // setMap(mapInstance);


    return () => mapInstance.remove();
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

  //user location
  // const updateUserLocation = ({ lat, lng }) => {
  //   if (!map) return;

  //   if (!marker) {
  //     // Si el marcador no existe, crearlo
  //     const newMarker = new maplibregl.Marker({ color: "blue" })
  //       .setLngLat([lng, lat])
  //       .addTo(map);
  //     setMarker(newMarker);
  //   } else {
  //     // Si ya existe, actualizar la posición
  //     marker.setLngLat([lng, lat]);
  //   }

  //   // Centrar el mapa en la ubicación actual
  //   map.flyTo({ center: [lng, lat], zoom: 17 });
  // };

  
  return(
    <div id="map" style={{ width: "100%", height: "100vh" }}>
      {/* <Location onLocationUpdate={updateUserLocation} /> */}
    </div>
  )
}
