import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! How can I help you today?',
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    toast.success('Message sent!');

    // Simulate response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        role: 'assistant',
        content: `You said: "${message}"`,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-white">Chat</h1>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">{msg.content}</div>
                <div className="text-xs opacity-50 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 bg-gray-900 p-4">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
