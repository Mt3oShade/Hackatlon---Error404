import React, { useRef, useEffect } from 'react';

const DetectionCanvas = ({ predictions }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        predictions.forEach(prediction => {
            const [x, y, width, height] = prediction.bbox;
            context.beginPath();
            context.rect(x, y, width, height);
            context.lineWidth = 4;
            context.strokeStyle = 'red';
            context.fillStyle = 'red';
            context.stroke();
        });
    }, [predictions]);

    return <canvas ref={canvasRef} width="640" height="480" />;
};

export default DetectionCanvas;