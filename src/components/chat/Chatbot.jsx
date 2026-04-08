// src/components/chat/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

// Respuestas simuladas (luego conectarás Gemini)
const getBotResponse = async (text) => {
  const lowerText = text.toLowerCase();
  
  await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay
  
  if (lowerText.includes('saboya')) {
    return "📍 Barrio Saboya: LUNES, MIÉRCOLES y VIERNES de 07:00 a 12:00. ♻️";
  }
  if (lowerText.includes('veloz')) {
    return "📍 Barrio Veloz: MARTES, JUEVES y SÁBADO de 08:00 a 13:00. ♻️";
  }
  if (lowerText.includes('terminal')) {
    return "📍 Terminal: MARTES, JUEVES y SÁBADO de 09:00 a 14:00. ♻️";
  }
  if (lowerText.includes('pilas')) {
    return "⚠️ ¡Cuidado! Las pilas son PELIGROSAS. Llévalas al Punto Verde del Parque Maldonado (L-V 8am-5pm).";
  }
  if (lowerText.includes('aceite')) {
    return "🫒 Aceite usado: Guarda en botella cerrada. Recolección los jueves en Centro de Acopio Móvil.";
  }
  if (lowerText.includes('plástico') || lowerText.includes('plastico')) {
    return "🥤 Plásticos van en contenedor AMARILLO. Recuerda enjuagar y aplastar.";
  }
  if (lowerText.includes('orgánico') || lowerText.includes('organico')) {
    return "🍌 Residuos orgánicos van en contenedor VERDE. ¡Puedes hacer compost!";
  }
  if (lowerText.includes('papel') || lowerText.includes('cartón')) {
    return "📦 Papel y cartón van en contenedor AZUL. Dobla las cajas para ahorrar espacio.";
  }
  if (lowerText.includes('vender') || lowerText.includes('chatarra') || lowerText.includes('metal')) {
    return "🚛 ¡Excelente! Para vender o donar chatarra, pronto implementaremos el formulario. Por ahora, contacta al 099 123 4567.";
  }
  if (lowerText.includes('hola') || lowerText.includes('buenas')) {
    return "¡Hola! Soy EcoRiobamba GPT ♻️ Pregúntame sobre horarios (Saboya, Veloz, Terminal), cómo reciclar (pilas, plástico, orgánico) o venta de chatarra. ¿En qué te ayudo?";
  }
  
  return "🌱 Pregúntame sobre:\n• Horarios: '¿Cuándo pasa el camión en Saboya?'\n• Residuos: '¿Qué hago con las pilas?'\n• Reciclaje: '¿Cómo reciclo plástico?'\n• Chatarra: 'Quiero vender chatarra'";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '¡Hola! Soy EcoRiobamba GPT ♻️\n\nTu asistente para gestión de residuos en Riobamba.\n\n📍 Pregúntame por horarios en Saboya, Veloz o Terminal\n⚠️ Cómo reciclar pilas, plástico o aceite\n🚛 Venta de chatarra\n\n¿En qué puedo ayudarte?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const response = await getBotResponse(text);
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      text: response,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  // Botón flotante (cuando el chat está cerrado)
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#006b49] text-white p-3 rounded-full shadow-lg hover:bg-[#004d35] transition-all z-50 flex items-center gap-2 group"
      >
        <MessageCircle size={22} />
        <span className="text-sm font-semibold hidden group-hover:inline">EcoBot</span>
      </button>
    );
  }

  // Ventana de chat (cuando está abierto)
  return (
    <div className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-[#006b49] text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">♻️</span>
          <div>
            <h3 className="font-bold">EcoRiobamba GPT</h3>
            <p className="text-xs opacity-80">En línea • Respuesta inmediata</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition">
          <X size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="bg-white border border-gray-200 p-2.5 rounded-xl">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#006b49] rounded-full animate-pulse"></span>
                <span className="w-1.5 h-1.5 bg-[#006b49] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-[#006b49] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export { Chatbot };