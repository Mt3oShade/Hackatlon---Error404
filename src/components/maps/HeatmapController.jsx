// src/components/maps/HeatmapController.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../api/supabase'; // Tu archivo de conexión
import HeatmapLayer from './HeatmapLayer'; // El componente de calor que creamos antes

export default function HeatmapController() {
  const [puntosCalor, setPuntosCalor] = useState([]);

  useEffect(() => {
    async function cargarAlertas() {
      // 1. Llamamos a la vista que acabas de crear en Supabase
      const { data, error } = await supabase
        .from('vista_alertas_calor')
        .select('*');

      if (error) {
        console.error("Error cargando alertas de Riobamba:", error);
        return;
      }

      // 2. Formateamos los datos para leaflet.heat: [lat, lng, intensidad]
      const puntosFormateados = data.map(alerta => {
        // Le damos más intensidad visual a los montículos grandes
        const intensidad = alerta.tipo_basura === 'monticulo' ? 1.0 : 0.6;
        return [alerta.lat, alerta.lng, intensidad];
      });

      setPuntosCalor(puntosFormateados);
    }

    cargarAlertas();

    // Opcional: Configurar suscripción en tiempo real (Supabase Realtime)
    // para que el mapa se actualice solo cuando la cámara detecte nueva basura.
  }, []);

  // Si aún no hay datos, no renderizamos la capa
  if (puntosCalor.length === 0) return null;

  // Si hay datos, llamamos a la capa de calor nativa de Leaflet
  return <HeatmapLayer points={puntosCalor} />;
}