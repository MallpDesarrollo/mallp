import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useLocationURL = () => {
  const [location, setLocation] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const lat = parseFloat(searchParams.get('lat'));
    const lon = parseFloat(searchParams.get('lon'));

    if (!isNaN(lat) && !isNaN(lon)) {
      setLocation({ lat, lon });
    }
  }, [searchParams]);

  return location;
};

export default useLocationURL;