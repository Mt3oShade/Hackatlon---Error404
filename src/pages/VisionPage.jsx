import React, { useState, useEffect } from 'react';
import WebcamView from '../components/camera/WebcamView';
import ObjectDetector from '../components/vision/ObjectDetector';
import DetectionCanvas from '../components/camera/DetectionCanvas';

const VisionPage = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [predictions, setPredictions] = useState([]);

    // Captura de la imagen desde la webcam
    const handleCapture = (imageSrc) => {
        setImageSrc(imageSrc);
    };

    // Usamos useEffect para ejecutar la detección cuando la imagen cambia
    useEffect(() => {
        const detectObjects = async () => {
            if (imageSrc) {
                const predictionsFromModel = await ObjectDetector({ imageSrc });
                setPredictions(predictionsFromModel);
            }
        };
        detectObjects();
    }, [imageSrc]); // Solo se ejecuta cuando imageSrc cambia

    return (
        <div>
            <h1>Detección de Basura</h1>
            <WebcamView onCapture={handleCapture} />
            <DetectionCanvas predictions={predictions} />
        </div>
    );
};

export default VisionPage;