import { useState, useEffect } from "react";

export default function Location({ onLocationUpdate }) {
  const [coords, setCoords] = useState(null);
  // console.log(`Location: ${onLocationUpdate}`);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Obtenida ubicación: ${latitude}, ${longitude}`);
          setCoords({ lat: latitude, lng: longitude });

          if (onLocationUpdate) {
            onLocationUpdate({ lat: latitude, lng: longitude });
          }
        },
        (error) => console.error("Error obteniendo ubicación:", error),
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
    } else {
      console.error("Geolocalización no disponible");
    }
  }, []);

  return null; // No renderiza nada, solo obtiene ubicación
}
