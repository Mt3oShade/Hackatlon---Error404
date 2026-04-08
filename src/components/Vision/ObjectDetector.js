import { useState, useEffect } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

const ObjectDetector = ({ imageSrc }) => {
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        const detectObjects = async () => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.onload = async () => {
                const model = await cocoSsd.load();
                const predictions = await model.detect(img);
                setPredictions(predictions);
            };
        };
        if (imageSrc) detectObjects();
    }, [imageSrc]);

    return predictions;
};

export default ObjectDetector;