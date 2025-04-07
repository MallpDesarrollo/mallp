import QRCode from 'qrcode.react';

function LocationQR() {
  const locationUrl = 'http://localhost:3000/navigate?lat=-74.0060&lon=40.7128';

  return (
    <div>
      <h3>Escanea este código para abrir la ubicación</h3>
      <QRCode value={locationUrl} size={256} level={'H'} />
    </div>
  );
}

export default LocationQR;
