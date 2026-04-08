// src/components/maps/RouteLayer.jsx
import { Polyline } from 'react-leaflet';

export default function RouteLayer() {
  // --- CONCEPTUALIZACIÓN DE PUNTOS CLAVE EN RIOBAMBA (PARADAS DE RECOLECCIÓN) ---
  // P1: Cerca Terminal Terrestre (Inicio)
  // P2: Barrio Santa Rosa
  // P3: Sector Estadio Olímpico
  // P4: Cerca de la ESPOCH (Norte)
  // P5: Avenida Lizarzaburu (Retorno)
  // P6: Parque Infantil / Av. 9 de Octubre
  // P7: Parque Sucre / Centro (Final conceptual)

  // 🟢 RUTA EFICIENTE (OPTIMIZADA)
  // Sigue un flujo lógico y directo utilizando avenidas principales, minimizando giros y distancia.
  // Flujo: P1 -> P2 -> P3 -> P4 -> P5 -> P6 -> P7
  const rutaEficiente = [
    [-1.6745, -78.6540], // P1: Inicio (Terminal)
    [-1.6695, -78.6580], // P2: Santa Rosa
    [-1.6630, -78.6530], // P3: Sector Estadio
    [-1.6570, -78.6730], // P4: Cerca ESPOCH (Norte)
    [-1.6620, -78.6500], // P5: Retorno Av. Lizarzaburu
    [-1.6675, -78.6495], // P6: Parque Infantil
    [-1.6705, -78.6485], // P7: Centro / Parque Sucre
  ];

  // 🔴 RUTA INEFICIENTE (CHAOTIC / ACTUAL CONCEPCIONAL)
  // Simula un recolector visitando los puntos en un orden ilógico, backtracking (volver atrás),
  // tomando desvíos innecesarios y cruzando la ciudad de forma caótica.
  // Flujo: P1 -> P3 -> P2 -> P7 -> P4 -> P6 -> P5
  const rutaIneficiente = [
    [-1.6745, -78.6540], // P1: Inicio (Terminal)
    // Desvío innecesario hacia el este antes de ir a P3
    [-1.6760, -78.6480], 
    [-1.6630, -78.6530], // P3: Sector Estadio
    // Vuelve atrás drásticamente al sur
    [-1.6695, -78.6580], // P2: Santa Rosa
    // Zig-zag por calles secundarias hacia el centro
    [-1.6730, -78.6510], 
    [-1.6705, -78.6485], // P7: Centro / Parque Sucre
    // Cruza toda la ciudad de sur a norte
    [-1.6570, -78.6730], // P4: Cerca ESPOCH (Norte)
    // Baja por el mismo camino pero se mete a P6
    [-1.6675, -78.6495], // P6: Parque Infantil
    // Vuelve a subir innecesariamente a P5
    [-1.6620, -78.6500], // P5: Retorno Av. Lizarzaburu
    // Termina en un punto aleatorio al este
    [-1.6640, -78.6400]
  ];

  return (
    <>
      {/* Ruta Optimizada (Verde Esmeralda - Ancha y Clara) */}
      <Polyline 
        positions={rutaEficiente} 
        pathOptions={{ 
          color: '#10b981', 
          weight: 6, 
          opacity: 0.9,
          lineJoin: 'round'
        }} 
      />
      
      {/* Ruta Ineficiente (Roja Fuerte - Punteada y Caótica) */}
      <Polyline 
        positions={rutaIneficiente} 
        pathOptions={{ 
          color: '#ef4444', 
          weight: 4, 
          dashArray: '15, 20', // Puntos más largos y espaciados
          opacity: 0.7,
          lineJoin: 'round'
        }} 
      />
    </>
  );
}