// src/components/maps/SmartMap.jsx
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import HeatmapController from './HeatmapController';
import RouteLayer from './RouteLayer'; 
import 'leaflet/dist/leaflet.css';

const RIOBAMBA_CENTER = [-1.6698, -78.6481];

export default function SmartMap() {
  const [currentAlerts, setCurrentAlerts] = useState([]);

  // Esta función recibirá los datos desde el HeatmapController
  const handleDataLoaded = (data) => {
    setCurrentAlerts(data);
  };

  return (
    <div className="h-full w-full">
      <MapContainer center={RIOBAMBA_CENTER} zoom={14} className="h-full w-full z-0">
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Pasamos la función para capturar los datos */}
        <HeatmapController onDataLoaded={handleDataLoaded} /> 
        
        {/* Pasamos las alertas para que la ruta sea inteligente */}
        <RouteLayer activeAlerts={currentAlerts} /> 
        
      </MapContainer>
    </div>
  );
}