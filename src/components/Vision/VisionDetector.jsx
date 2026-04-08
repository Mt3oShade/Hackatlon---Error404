// src/components/vision/VisionDetector.jsx
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export default function VisionDetector() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar el modelo de IA al iniciar
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
      setIsLoading(false);
    };
    loadModel();
  }, []);

  // Bucle de detección en tiempo real
  useEffect(() => {
    let animationId;

    const detectFrame = async () => {
      if (
        typeof webcamRef.current !== 'undefined' &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4 &&
        model
      ) {
        // Obtener propiedades del video
        const video = webcamRef.current.video;
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

        // Ajustar el tamaño del canvas para que coincida con el video
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Hacer la predicción
        const predictions = await model.detect(video);
        
        // Dibujar en el canvas
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, videoWidth, videoHeight); // ¡Vital! Borrar el frame anterior
        
        predictions.forEach(prediction => {
          // Filtrar para que solo detecte objetos que parezcan basura (botellas, tazas, cajas)
          // coco-ssd detecta 80 clases, aquí filtramos un par de ejemplo
          const targetClasses = ['bottle', 'cup', 'box']; 
          
          if (targetClasses.includes(prediction.class)) {
            const [x, y, width, height] = prediction.bbox;
            
            // Dibujar la caja
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#ef4444'; // Rojo Tailwind (red-500)
            ctx.stroke();

            // Dibujar la etiqueta
            ctx.fillStyle = '#ef4444';
            ctx.fillRect(x, y - 24, width, 24);
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px Inter';
            ctx.fillText(`${prediction.class} (${Math.round(prediction.score * 100)}%)`, x + 4, y - 6);
          }
        });
      }
      // Volver a llamar a la función para el siguiente frame
      animationId = requestAnimationFrame(detectFrame);
    };

    if (model) {
      detectFrame();
    }

    return () => cancelAnimationFrame(animationId);
  }, [model]);

  return (
    <div className="flex flex-col items-center w-full h-full bg-slate-900 rounded-xl p-4 overflow-hidden">
      
      {/* Cabecera del componente */}
      <div className="w-full flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-headline">Cámara de Monitoreo</h2>
          <p className="text-sm text-slate-400">Análisis perimetral Edge AI en tiempo real</p>
        </div>
        {isLoading ? (
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full animate-pulse">
            Cargando Motor IA...
          </span>
        ) : (
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            IA Activa
          </span>
        )}
      </div>

      {/* Contenedor Relativo: La clave para poner el Canvas sobre el Video */}
      <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden border border-slate-700 bg-black shadow-xl">
        <Webcam
          ref={webcamRef}
          muted={true}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
      </div>
    </div>
  );
}