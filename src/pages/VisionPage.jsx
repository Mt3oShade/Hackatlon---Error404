import React, { useState } from 'react';
import WebcamView from '../components/Camera/WebcamView';
import useObjectDetector from '../components/Vision/ObjectDetector';
import DetectionCanvas from '../components/Camera/DetectionCanvas';   
const VisionPage = () => {
    const [imageSrc, setImageSrc] = useState(null);
    const predictions = useObjectDetector(imageSrc);

    // Captura de la imagen desde la webcam
    const handleCapture = (imageSrc) => {
        setImageSrc(imageSrc);
    };

    return (
        <div>
            <h1>Detección de Basura</h1>
            <WebcamView onCapture={handleCapture} />
            <DetectionCanvas predictions={predictions} />
        </div>
    );
};

export default VisionPage;