// src/components/maps/RouteLayer.jsx
import { Polyline, Tooltip } from 'react-leaflet';

export default function RouteLayer({ activeAlerts = [] }) {
  // Si no hay alertas, mostramos una ruta de patrullaje estándar
  const rutaBase = [
    [-1.6730, -78.6530], // Parque Infantil
    [-1.6700, -78.6500], // Av. Daniel L. Borja
    [-1.6670, -78.6470]  // Estación
  ];

  // LOGICA INTELIGENTE: Si hay alertas de Supabase, las unimos para crear la ruta
  // En un sistema real, aquí enviaríamos estos puntos a OpenRouteService para obtener el camino por calles
  const puntosDinamicos = activeAlerts.length > 0 
    ? activeAlerts.map(alerta => [alerta.lat, alerta.lng])
    : rutaBase;

  return (
    <>
      {/* Ruta Inteligente (Verde Esmeralda) */}
      <Polyline 
        positions={puntosDinamicos} 
        pathOptions={{ 
          color: '#10b981', 
          weight: 6, 
          opacity: 0.9,
          lineJoin: 'round',
          dashArray: activeAlerts.length > 0 ? '1, 0' : '10, 10' // Sólida si hay alertas, punteada si es patrulla
        }} 
      >
        <Tooltip sticky>Ruta Optimizada por EcoIA</Tooltip>
      </Polyline>

      {/* Marcadores visuales de 'Nodos' en la ruta */}
      {puntosDinamicos.map((pos, idx) => (
        <circle 
          key={idx} 
          center={pos} 
          r={5} 
          pathOptions={{ color: '#059669', fillOpacity: 1 }} 
        />
      ))}
    </>
  );
}