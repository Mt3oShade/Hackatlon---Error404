import { useState, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { useAlert } from '../../state/store';  // Importa el contexto de alertas

const ObjectDetector = ({ imageSrc }) => {
    const [predictions, setPredictions] = useState([]);
    const { addAlert } = useAlert();  // Obtén la función addAlert desde el contexto

    useEffect(() => {
        const detectObjects = async () => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.onload = async () => {
                const model = await cocoSsd.load();
                const predictions = await model.detect(img);
                setPredictions(predictions);

                // Filtra las predicciones para agregar solo las alertas relevantes (ej. "bottle", "plastic")
                predictions.forEach(prediction => {
                    if (prediction.class === "bottle" || prediction.class === "plastic") {
                        // Crea una alerta con la información de la detección
                        const alert = {
                            object: prediction.class,
                            confidence: prediction.score,
                            timestamp: new Date().toISOString(),
                        };
                        addAlert(alert);  // Agrega la alerta al estado global
                    }
                });
            };
        };

        if (imageSrc) detectObjects();
    }, [imageSrc, addAlert]);  // Dependencias para volver a ejecutar cuando cambie imageSrc

    return predictions;
};

export default ObjectDetector;