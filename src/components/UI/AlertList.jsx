// src/components/vision/AlertList.jsx
import React from 'react';
import { useAlert } from '../../state/store';

export default function AlertList() {
    // Obtenemos las alertas desde el store global
    const { alerts } = useAlert();

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-sm w-full max-w-2xl mt-4">
            <h3 className="font-headline font-bold text-lg text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-red-400">notifications_active</span>
                Registro de Detecciones
            </h3>
            
            {alerts.length === 0 ? (
                <p className="text-slate-400 text-sm italic">Escaneando área... sin novedades.</p>
            ) : (
                <ul className="space-y-3">
                    {alerts.map((alert, index) => (
                        <li key={index} className="flex items-center gap-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20 animate-fade-in">
                            <div className="p-2 bg-red-500/20 rounded-md">
                                <span className="material-symbols-outlined text-red-400 text-xl">delete</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-red-400 uppercase tracking-wider">{alert.object}</p>
                                <p className="text-xs text-slate-400">{alert.timestamp}</p>
                            </div>
                            <span className="text-xs font-bold text-red-300 bg-red-500/20 px-2 py-1 rounded-md">
                                Confianza: {Math.round(alert.confidence * 100)}%
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}