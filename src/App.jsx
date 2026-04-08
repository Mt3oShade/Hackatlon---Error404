// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos los componentes que ya creaste
import Layout from './components/ui/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { Chatbot } from './components/chat/Chatbot.jsx'; 
import VisionDetector from './components/vision/VisionDetector';

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
  <div className="h-full flex items-start justify-center">
    <VisionDetector />
  </div>
);


// =====================================================================
// ENRUTADOR PRINCIPAL
// =====================================================================

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="mapa" element={<MapaView />} />
          <Route path="vision" element={<VisionView />} />
        </Route>
      </Routes>
      {/* EL CHATBOT FLOTANTE APARECE EN TODAS LAS PÁGINAS */}
      <Chatbot />
    </BrowserRouter>
  );
}