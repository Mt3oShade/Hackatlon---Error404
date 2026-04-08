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
// CHAT VIEW - AHORA CON TU COMPONENTE REAL
// =====================================================================

const ChatView = () => (
  <div className="flex h-full min-h-[600px] items-center justify-center">
    {/* Tu chatbot ya tiene su propio botón flotante, 
        pero en esta vista mostramos el chat abierto por defecto */}
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#006b49] text-white p-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span>♻️</span> EcoRiobamba GPT
          </h2>
          <p className="text-sm opacity-90">Asistente inteligente para gestión de residuos</p>
        </div>
        <div className="h-[500px]">
          {/* Aquí puedes mostrar tu chat embebido si lo deseas */}
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Usa el botón flotante en la esquina inferior derecha para chatear 💬</p>
          </div>
        </div>
      </div>
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
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="mapa" element={<MapaView />} />
          <Route path="vision" element={<VisionView />} />
          <Route path="chat" element={<ChatView />} />
        </Route>
      </Routes>
      {/* EL CHATBOT FLOTANTE APARECE EN TODAS LAS PÁGINAS */}
      <Chatbot />
    </BrowserRouter>
  );
}