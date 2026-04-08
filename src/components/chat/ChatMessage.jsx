// src/components/chat/ChatMessage.jsx
import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isBot = message.type === 'bot';
  
  const formattedTime = new Date(message.timestamp).toLocaleTimeString('es-EC', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3 animate-fade-in`}>
      <div className={`flex gap-2 max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot ? 'bg-[#006b49]' : 'bg-gray-300'
        }`}>
          {isBot ? <Bot size={14} className="text-white" /> : <User size={14} className="text-gray-700" />}
        </div>
        <div className={`p-2.5 rounded-xl text-sm ${isBot ? 'bg-white border border-gray-200' : 'bg-[#006b49] text-white'}`}>
          <p className="whitespace-pre-wrap">{message.text}</p>
          <span className={`text-[9px] mt-1 block ${isBot ? 'text-gray-400' : 'text-white/60'}`}>
            {formattedTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;