'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center">
        <h1 className="tracking-[-.01em] text-5xl font-extrabold">
          Mallp Desarrollo.
        </h1>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button 
            onClick={() => router.push('/Map')} 
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center cursor-pointer hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"         
          >
            Entrar
          </button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="flex items-center gap-2 hover:underline hover:underline-offset-4 cursor-pointer">Pogo & Jj</p>
      </footer>
    </div>
  );
}

// 'use client'
// import { useEffect, useRef, useState } from 'react';
// import maplibregl from 'maplibre-gl';

// const geojsonData = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Polygon',
//         coordinates: [
//           [
//             [-74.006, 40.7128],
//             [-74.005, 40.7128],
//             [-74.005, 40.7138],
//             [-74.006, 40.7138],
//             [-74.006, 40.7128]
//           ]
//         ]
//       },
//       properties: {}
//     }
//   ]
// };

// export default function Mapa() {
//   const mapContainer = useRef(null);
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     const map = new maplibregl.Map({
//       container: mapContainer.current,
//       style: 'https://demotiles.maplibre.org/style.json',
//       center: [-74.0059, 40.7128],
//       zoom: 16
//     });

//     map.on('load', () => {
//       map.addSource('zona', {
//         type: 'geojson',
//         data: geojsonData
//       });

//       map.addLayer({
//         id: 'zona-layer',
//         type: 'fill',
//         source: 'zona',
//         layout: {},
//         paint: {
//           'fill-color': '#0080ff',
//           'fill-opacity': 0.5
//         }
//       });
//     });

//     mapRef.current = map;
//     markerRef.current = new maplibregl.Marker();

//     function updateUserLocation() {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           if (!isNaN(latitude) && !isNaN(longitude)) {
//             console.log('Ubicación obtenida:', latitude, longitude);
//             markerRef.current.setLngLat([longitude, latitude]).addTo(map);
//             map.setCenter([longitude, latitude]);
//           } else {
//             console.warn('Coordenadas inválidas:', latitude, longitude);
//           }
//         },
//         (error) => console.error('Error obteniendo ubicación:', error),
//         { enableHighAccuracy: true, maximumAge: 10000 }
//       );
//     }

//     // updateUserLocation();
//     // const locationInterval = setInterval(updateUserLocation, 5000);

//     return () => {
//       clearInterval(locationInterval);
//       map.remove();
//     };
//   }, []);

//   return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
// }
