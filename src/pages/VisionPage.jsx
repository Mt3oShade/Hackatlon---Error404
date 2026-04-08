import React, { useState } from 'react';
import WebcamView from '../components/Camera/WebcamView';
import ObjectDetector from '../components/Vision/ObjectDetector';
import DetectionCanvas from '../components/Camera/DetectionCanvas';

const VisionPage = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const [predictions, setPredictions] = useState([]);

    const handleCapture = (imageSrc) => {
        setImageSrc(imageSrc);
    };

    const predictionsFromModel = ObjectDetector({ imageSrc });
    setPredictions(predictionsFromModel);

    return (
        <div>
            <h1>Detección de Basura</h1>
            <WebcamView onCapture={handleCapture} />
            <DetectionCanvas predictions={predictions} />
        </div>
    );
};

export default VisionPage;