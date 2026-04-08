import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamView = ({ onCapture }) => {
    const webcamRef = useRef(null);
    const [error, setError] = useState(null);

    // Función para manejar la captura de imagen
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
            onCapture(imageSrc);
        } else {
            setError('No se pudo capturar la imagen');
        }
    }, [webcamRef, onCapture]);

    // Configuración mejorada para la cámara (usamos la cámara trasera)
    const videoConstraints = {
        facingMode: "environment",  // Forzar cámara trasera en móviles
        width: 1280,  // Resolución más alta para mejorar el detalle
        height: 720
    };

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={videoConstraints}
                onUserMediaError={() => setError('No se pudo acceder a la cámara')}
            />
            <button onClick={capture}>Capturar Imagen</button>
        </div>
    );
};

export default WebcamView;