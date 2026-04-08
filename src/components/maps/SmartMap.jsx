// src/components/maps/SmartMap.jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // ¡CRÍTICO! Sin esto el mapa se rompe

// Coordenadas centrales de Riobamba, Chimborazo
const RIOBAMBA_CENTER = [-1.6698, -78.6481];

export default function SmartMap() {
  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-700">
      <MapContainer 
        center={RIOBAMBA_CENTER} 
        zoom={14} 
        className="h-full w-full"
      >
        {/* Capa base de OpenStreetMap (100% Gratuita) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Un marcador de prueba */}
        <Marker position={RIOBAMBA_CENTER}>
          <Popup>
            <strong>Centro de Riobamba</strong> <br /> 
            Aquí empezaremos a mapear los ecotachos.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}