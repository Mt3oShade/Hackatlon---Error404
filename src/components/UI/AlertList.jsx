import React from 'react';
import { useAlert } from '../../state/store';  // Importa el contexto de alertas

const AlertList = () => {
    const { alerts } = useAlert();  // Obtén las alertas desde el contexto

    return (
        <div>
            <h2>Alertas de Basura Detectada</h2>
            {alerts.length === 0 ? (
                <p>No hay alertas activas.</p>
            ) : (
                <ul>
                    {alerts.map((alert, index) => (
                        <li key={index}>
                            <strong>Objeto:</strong> {alert.object} -{' '}
                            <strong>Confianza:</strong> {Math.round(alert.confidence * 100)}% -{' '}
                            <strong>Tiempo:</strong> {alert.timestamp}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AlertList;