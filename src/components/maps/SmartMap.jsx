// src/components/maps/SmartMap.jsx
import { MapContainer, TileLayer } from 'react-leaflet';
import HeatmapController from './HeatmapController';
import RouteLayer from './RouteLayer'; // <--- Importar tu nueva capa
import 'leaflet/dist/leaflet.css';

const RIOBAMBA_CENTER = [-1.6698, -78.6481];

export default function SmartMap() {
  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-700">
      <MapContainer center={RIOBAMBA_CENTER} zoom={14} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Tus dos grandes logros como Dev 3: */}
        <HeatmapController /> 
        <RouteLayer /> 
        
      </MapContainer>
    </div>
  );
}