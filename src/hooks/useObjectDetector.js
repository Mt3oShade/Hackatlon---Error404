// src/hooks/useObjectDetector.js
import { useState, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { useAlert } from '../state/store'; // Importa el contexto

// Cambiamos el nombre para que empiece con "use" (Regla de Hooks en React)
export default function useObjectDetector(imageSrc) {
    const [predictions, setPredictions] = useState([]);
    const addAlert = useAlert((state) => state.addAlert); // Forma optimizada de Zustand

    useEffect(() => {
        const detectObjects = async () => {
            const img = document.createElement('img');
            img.src = imageSrc;
            
            img.onload = async () => {
                const model = await cocoSsd.load();
                const foundPredictions = await model.detect(img);
                setPredictions(foundPredictions);

                // Filtra y envía al estado global
                foundPredictions.forEach(prediction => {
                    if (prediction.class === "bottle" || prediction.class === "cup") { // Ajustado a clases reales de COCO-SSD
                        addAlert({
                            object: prediction.class,
                            confidence: prediction.score,
                            timestamp: new Date().toLocaleTimeString(), // Hora legible
                            timestampMs: Date.now() // Necesario para el antispam
                        });
                    }
                });
            };
        };

        if (imageSrc) detectObjects();
    }, [imageSrc, addAlert]);

    return predictions;
}