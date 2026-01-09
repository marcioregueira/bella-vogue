import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { getChatInstance, resetChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'welcome', role: 'model', text: 'Olá! Sou a Bella, sua consultora de beleza. Como posso te ajudar hoje? Posso sugerir cortes, cores de unhas ou ajudar no agendamento.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const chat = getChatInstance();
      const result = await chat.sendMessageStream({ message: userMessage.text });
      
      const botMessageId = (Date.now() + 1).toString();
      let fullText = '';
      
      setMessages(prev => [...prev, { id: botMessageId, role: 'model', text: '', isStreaming: true }]);

      for await (const chunk of result) {
        const contentResponse = chunk as GenerateContentResponse;
        const textChunk = contentResponse.text || '';
        fullText += textChunk;
        
        setMessages(prev => 
          prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, text: fullText } 
              : msg
          )
        );
      }
      
       setMessages(prev => 
          prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, isStreaming: false } 
              : msg
          )
        );

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'Desculpe, tive um problema ao processar sua mensagem. Tente novamente mais tarde.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center
          ${isOpen ? 'bg-gray-200 text-gray-600 rotate-90' : 'bg-primary text-white animate-bounce-subtle'}`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden border border-gray-100 animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-rose-300 p-4 flex items-center gap-3 text-white">
            <div className="bg-white/20 p-2 rounded-full">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold font-serif">Bella</h3>
              <p className="text-xs opacity-90">Consultora IA • Online</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-hide space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-dark text-white rounded-br-none' 
                      : 'bg-white text-gray-700 shadow-sm rounded-bl-none border border-gray-100'}`}
                >
                  {msg.text}
                  {msg.isStreaming && <span className="inline-block w-1.5 h-3 ml-1 bg-primary animate-pulse"/>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Pergunte sobre serviços..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-dark"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                className="p-2 bg-primary text-white rounded-full hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-2">
              IA alimentada por Google Gemini. Pode cometer erros.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIConsultant;