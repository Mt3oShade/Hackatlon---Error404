// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos los componentes que ya creaste
import Layout from './components/ui/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';

// =====================================================================
// PLACEHOLDERS (Espacios reservados para el resto del equipo)
// =====================================================================

const MapaView = () => (
  <div className="flex h-full min-h-[600px] items-center justify-center border-2 border-dashed border-gray-700 rounded-xl bg-gray-800/50">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-blue-400 mb-2">🗺️ Área del Dev 3</h2>
      <p className="text-gray-400">Aquí irá el SmartMap con Leaflet y OpenStreetMap.</p>
    </div>
  </div>
);

const VisionView = () => (
  <div className="flex h-full min-h-[600px] items-center justify-center border-2 border-dashed border-gray-700 rounded-xl bg-gray-800/50">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-red-400 mb-2">🧠 Área del Dev 2</h2>
      <p className="text-gray-400">Aquí irá la cámara con TensorFlow.js detectando basura.</p>
    </div>
  </div>
);

const ChatView = () => (
  <div className="flex h-full min-h-[600px] items-center justify-center border-2 border-dashed border-gray-700 rounded-xl bg-gray-800/50">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-purple-400 mb-2">🤖 Área del Dev 4</h2>
      <p className="text-gray-400">Aquí irá el asistente conectado a Gemini.</p>
    </div>
  </div>
);

// =====================================================================
// ENRUTADOR PRINCIPAL
// =====================================================================

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* El Layout envuelve todas estas rutas, por eso el menú lateral nunca desaparece */}
        <Route path="/" element={<Layout />}>
          {/* 'index' significa que el Dashboard es la ruta por defecto ("/") */}
          <Route index element={<Dashboard />} />
          <Route path="mapa" element={<MapaView />} />
          <Route path="vision" element={<VisionView />} />
          <Route path="chat" element={<ChatView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}