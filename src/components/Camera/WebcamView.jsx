import React from 'react';
import Webcam from 'react-webcam';

const WebcamView = ({ onCapture }) => {
    return (
        <div>
            <Webcam
                audio={false}
                screenshotFormat="image/jpeg"
                width="100%"
                onCapture={onCapture}
            />
        </div>
    );
};

export default WebcamView;