// src/components/maps/HeatmapController.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../../api/supabase'; 
import HeatmapLayer from './HeatmapLayer'; 

/**
 * HeatmapController: 
 * Actúa como el puente de datos entre la base de datos (Supabase) 
 * y la visualización geoespacial (Heatmap + RouteLayer).
 */
export default function HeatmapController({ onDataLoaded }) {
  const [puntosParaMapa, setPuntosParaMapa] = useState([]);

  useEffect(() => {
    async function cargarAlertasDeBasura() {
      console.log("📡 Consultando alertas en tiempo real desde Supabase...");
      
      // 1. Consultamos la vista que procesa las coordenadas de Riobamba
      const { data, error } = await supabase
        .from('vista_alertas_calor')
        .select('*');

      if (error) {
        console.error("❌ Error al obtener datos geoespaciales:", error.message);
        return;
      }

      if (data && data.length > 0) {
        // 2. Formateamos los datos para el componente HeatmapLayer
        // Esperamos: { lat, lng, intensity }
        const puntosFormateados = data.map(alerta => ({
          lat: alerta.lat,
          lng: alerta.lng,
          // Si es un montículo de basura, la mancha es más intensa (1.0)
          // Si es solo una botella/alerta pequeña, es más suave (0.6)
          intensity: alerta.tipo_basura === 'monticulo' ? 1.0 : 0.6
        }));

        setPuntosParaMapa(puntosFormateados);

        // 3. ¡CONEXIÓN INTELIGENTE! 
        // Enviamos los datos originales al componente padre (SmartMap)
        // para que la Ruta Verde se dibuje automáticamente sobre estos puntos.
        if (onDataLoaded) {
          onDataLoaded(data);
        }
        
        console.log(`✅ ${data.length} puntos de calor cargados exitosamente.`);
      } else {
        console.warn("⚠️ No se encontraron alertas activas en Riobamba.");
      }
    }

    cargarAlertasDeBasura();

    // OPCIONAL: Configurar canal de tiempo real (Realtime)
    // Para que el mapa se actualice sin refrescar cuando la cámara detecte algo
    const channel = supabase
      .channel('cambios-en-basura')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'alertas_basura' }, () => {
        cargarAlertasDeBasura();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onDataLoaded]);

  // Si no hay puntos, no renderizamos la capa de calor para ahorrar recursos
  if (puntosParaMapa.length === 0) return null;

  return <HeatmapLayer points={puntosParaMapa} />;
}