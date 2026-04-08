// src/components/maps/RouteLayer.jsx
import { Polyline } from 'react-leaflet';

export default function RouteLayer() {
  // Ejemplo: Ruta por la Av. Daniel León Borja (Riobamba)
  const rutaEficiente = [
    [-1.6730, -78.6530],
    [-1.6700, -78.6500],
    [-1.6670, -78.6470]
  ];

  const rutaIneficiente = [
    [-1.6730, -78.6530],
    [-1.6750, -78.6510], // Desvío innecesario
    [-1.6700, -78.6500],
    [-1.6670, -78.6470]
  ];

  return (
    <>
      {/* Ruta Optimizada */}
      <Polyline 
        positions={rutaEficiente} 
        pathOptions={{ color: '#10b981', weight: 6, opacity: 0.8 }} 
      />
      
      {/* Ruta Ineficiente (Punteada) */}
      <Polyline 
        positions={rutaIneficiente} 
        pathOptions={{ color: '#ef4444', weight: 4, dashArray: '10, 10', opacity: 0.6 }} 
      />
    </>
  );
}