// import { useEffect, useRef } from "react";
// import maplibregl from "maplibre-gl";
// const Map = ({ lat, lng }) => {
//   const mapContainer = useRef(null);
//   useEffect(() => {
//     const map = new maplibregl.Map({
//       container: mapContainer.current,
//       style: "https://demotiles.maplibre.org/style.json",
//       center: [lng, lat],
//       zoom: 16
//     });
//     new maplibregl.Marker().setLngLat([lng, lat]).addTo(map);
//     return () => map.remove();
//   }, [lat, lng]);
//   return <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />;
// };
// export default Map;
"use strict";