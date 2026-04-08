// src/components/chat/ChatInput.jsx
import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const suggestions = [
    { text: "📍 Horarios Saboya", action: "¿Cuándo pasa el camión en Saboya?" },
    { text: "⚠️ Reciclar pilas", action: "¿Qué hago con las pilas?" },
    { text: "🥤 Reciclar plástico", action: "¿Cómo reciclo plástico?" },
    { text: "🚛 Vender chatarra", action: "Quiero vender chatarra" },
  ];

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="flex gap-2 p-3 overflow-x-auto">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSend(s.action)}
            disabled={isLoading}
            className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 whitespace-nowrap transition"
          >
            {s.text}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 flex gap-2 border-t border-gray-100">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006b49]"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-[#006b49] text-white p-2 rounded-xl hover:bg-[#004d35] disabled:opacity-50 transition"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;