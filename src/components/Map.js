import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ambulanceIcon from '../assets/ambulance-icon2.png';

// Criar o ícone personalizado
const AmbulanceIcon = L.icon({
  iconUrl: ambulanceIcon,
  iconSize: [38, 38], // Tamanho do ícone (ajuste conforme necessário)
  iconAnchor: [19, 38], // Ponto de ancoragem (base do ícone)
  popupAnchor: [0, -38], // Posição do popup em relação ao ícone
});

const Map = ({ locations }) => {
  return (
    <MapContainer
      center={[locations[0]?.latitude || 0, locations[0]?.longitude || 0]}  // Definindo a localização inicial
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((loc, index) => (
        <Marker key={index} position={[loc.latitude, loc.longitude]} icon={AmbulanceIcon}>
          <Popup>
            {loc.username || 'Usuário desconhecido'} - {new Date(loc.created_at).toLocaleString()}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
