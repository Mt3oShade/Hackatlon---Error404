// src/components/maps/HeatmapLayer.jsx
import React from 'react';
import { useMap } from 'react-leaflet';
import { HeatmapLayer as LeafletHeatmapLayer } from 'react-leaflet-heatmap-layer-v3';

// Este componente recibe los 'points' desde el Controller
export default function HeatmapLayer({ points }) {
  const map = useMap(); // Obtenemos el contexto del mapa actual

  if (!points || points.length === 0) {
    return null; // Si no hay basura, no pintamos nada
  }

  // Convertimos los datos de Supabase al formato que espera el Heatmap
  // Asumiendo que Supabase devuelve [latitud, longitud, intensidad]
  const heatData = points.map(p => [p.lat, p.lng, p.intensity || 1]);

  return (
    <LeafletHeatmapLayer
      fitBoundsOnLoad={false}
      fitBoundsOnUpdate={false}
      points={heatData}
      longitudeExtractor={(m) => m[1]}
      latitudeExtractor={(m) => m[0]}
      intensityExtractor={(m) => parseFloat(m[2])}
      radius={25} // Tamaño de la mancha de calor
      blur={15}   // Qué tan difuminado se ve
      max={5}     // Intensidad máxima para mostrar el color rojo fuerte
      gradient={{
        0.4: 'blue',
        0.6: 'lime',
        0.8: 'yellow',
        1.0: 'red'
      }}
    />
  );
}   