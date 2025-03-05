import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoidGhldnV0bWFuIiwiYSI6ImNtNzZzOWFuaDB4bTcybHBycnBhemVoNzUifQ.G9SDpwKht98fi8QSsy94nw"; // Reemplázalo con tu clave de Mapbox

function Example() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-75.5879, 6.2636], // Coordenadas iniciales
      zoom: 25,
    });

    map.on("load", () => {
      map.addSource("mall-layout", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { name: "Local A" },
              geometry: {
                type: "Polygon",
                coordinates: [[
                  [-74.007, 40.713],
                  [-74.008, 40.713],
                  [-74.008, 40.712],
                  [-74.007, 40.712],
                  [-74.007, 40.713]
                ]]
              }
            }
          ]
        }
      });

      map.addLayer({
        id: "mall-layout-layer",
        type: "fill",
        source: "mall-layout",
        paint: {
          "fill-color": "#088",
          "fill-opacity": 0.5
        }
      });
    });

    //marker
    new mapboxgl.Marker({ color: "red" })
    .setLngLat([-75.5879, 6.2636])
    .addTo(map);

    // Obtener y mostrar la ubicación del usuario
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     const userLocation = [position.coords.longitude, position.coords.latitude];
        
    //     new mapboxgl.Marker({ color: "red" })
    //       .setLngLat(userLocation)
    //       .addTo(map);

    //     map.flyTo({ center: userLocation, zoom: 18 });
    //   });
    // }

    return () => map.remove();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Mapa de MallP</h1>
      <div id="map" style={{ width: "100vw", height: "90vh" }}></div>
    </div>
  );
}

export default Example;
