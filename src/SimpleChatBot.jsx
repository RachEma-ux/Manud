import React, { useState, useRef, useEffect } from 'react';
import { Menu, Plus, Settings, Paperclip, ArrowUp, Bot, Mic, Plug, Save } from 'lucide-react';
import ChatControlBox, { useResponsive } from './ChatControlBox';

// ==================== BUTTON COMPONENT ====================

const Button = ({ children, onClick, disabled = false, variant = 'default', className = '', style, title }) => {
  const baseClass = "inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const variantClass = variant === 'ghost'
    ? "hover:bg-gray-700 text-gray-400"
    : variant === 'minimal-ghost'
    ? "hover:bg-gray-800 text-gray-400"
    : "bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${className}`}
      style={style}
      title={title}
      type="button"
    >
      {children}
    </button>
  );
};

// ==================== MAIN APP ====================

export default function SimpleChatBot() {
  const { dimensions } = useResponsive();
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: '👋 Reusable ChatControlBox Demo!\n\n✨ Features:\n• ChatControlBox extracted as reusable component\n• No hardcoded icons in the component\n• Centered in the interface\n• Same proportionality-based design\n• Fully customizable toolbar and input controls\n\nTest it now!',
      role: 'assistant',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedModels, setSelectedModels] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputMessage.trim() || selectedModels === 0) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        content: `✅ Message received!\n\n**You said:** "${inputMessage}"\n\n**Models:** ${selectedModels}\n\nChatControlBox is now a reusable component!`,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1000);
  };

  // Toolbar items
  const toolbarItems = (
    <>
      <Button
        onClick={() => alert('Menu clicked')}
        variant="minimal-ghost"
        style={{ height: `${dimensions.toolbarIconButton}px`, width: `${dimensions.toolbarIconButton}px` }}
        title="Menu"
      >
        <Menu style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
      </Button>

      <Button
        onClick={() => alert('New chat clicked')}
        variant="minimal-ghost"
        style={{ height: `${dimensions.toolbarIconButton}px`, width: `${dimensions.toolbarIconButton}px` }}
        title="New Chat"
      >
        <Plus style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
      </Button>

      <Button
        onClick={() => setSelectedModels(prev => prev === 0 ? 1 : 0)}
        style={{
          height: `${dimensions.toolbarIconButton}px`,
          minWidth: '85px',
          fontSize: `${dimensions.fontSize}px`,
          paddingLeft: `${dimensions.containerPadding}px`,
          paddingRight: `${dimensions.containerPadding}px`,
          lineHeight: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className={selectedModels > 0 ? "bg-blue-600 hover:bg-blue-500 border-blue-600" : ""}
        title="Toggle Models"
      >
        {selectedModels} Model{selectedModels !== 1 ? 's' : ''}
      </Button>

      {selectedModels > 0 && (
        <Button
          variant="minimal-ghost"
          style={{ height: `${dimensions.toolbarIconButton}px`, width: `${dimensions.toolbarIconButton}px` }}
          className="text-cyan-400 hover:text-cyan-300"
          title="AI Active"
          disabled
        >
          <Bot style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
        </Button>
      )}

      <Button
        onClick={() => alert('Settings clicked')}
        variant="minimal-ghost"
        style={{ height: `${dimensions.toolbarIconButton}px`, width: `${dimensions.toolbarIconButton}px` }}
        title="Settings"
      >
        <Settings style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
      </Button>

      <Button
        onClick={() => alert('Save clicked')}
        disabled={isProcessing}
        variant="minimal-ghost"
        style={{ height: `${dimensions.toolbarIconButton}px`, width: `${dimensions.toolbarIconButton}px` }}
        title="Save"
      >
        <Save style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
      </Button>

      <Button
        onClick={() => alert('Presets clicked')}
        style={{
          height: `${dimensions.toolbarIconButton}px`,
          minWidth: '95px',
          fontSize: `${dimensions.fontSize}px`,
          paddingLeft: `${dimensions.containerPadding}px`,
          paddingRight: `${dimensions.containerPadding}px`,
          lineHeight: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        className="bg-stone-300 hover:bg-stone-200 text-zinc-800 border-stone-300"
        title="Presets"
      >
        Presets
      </Button>
    </>
  );

  // Input left controls
  const inputLeftControls = (
    <>
      <Button
        variant="ghost"
        style={{ height: `${dimensions.inputHeight}px`, width: `${dimensions.inputHeight}px`, padding: 0, flexShrink: 0 }}
        title="Attach"
      >
        <Paperclip style={{ height: `${dimensions.inputIcon}px`, width: `${dimensions.inputIcon}px`, transform: 'rotate(-45deg)' }} className="text-gray-500" />
      </Button>

      <Button
        variant="ghost"
        style={{ height: `${dimensions.inputHeight}px`, width: `${dimensions.inputHeight}px`, padding: 0, marginLeft: `${dimensions.gap * 0.1}px`, flexShrink: 0 }}
        title="Connect"
      >
        <Plug style={{ height: `${dimensions.inputIcon}px`, width: `${dimensions.inputIcon}px` }} className="text-gray-500" />
      </Button>
    </>
  );

  // Input right controls
  const inputRightControls = (
    <>
      <Button
        variant="ghost"
        style={{ height: `${dimensions.inputHeight}px`, width: `${dimensions.inputHeight}px`, padding: 0, flexShrink: 0 }}
        title="Voice"
      >
        <Mic style={{ height: `${dimensions.inputIcon}px`, width: `${dimensions.inputIcon}px` }} className="text-gray-500" />
      </Button>

      <Button
        onClick={handleSend}
        disabled={isProcessing || !inputMessage.trim() || selectedModels === 0}
        variant="ghost"
        style={{
          height: `${dimensions.inputHeight}px`,
          width: `${dimensions.inputHeight}px`,
          padding: 0,
          marginLeft: `${dimensions.gap * 0.1}px`,
          flexShrink: 0
        }}
        title="Send"
      >
        <ArrowUp style={{ height: `${dimensions.inputIcon}px`, width: `${dimensions.inputIcon}px` }} className="text-gray-500" />
      </Button>
    </>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-950">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Reusable ChatControlBox</h1>
            <p className="text-gray-400">
              {selectedModels} model{selectedModels !== 1 ? 's' : ''} • {messages.length} message{messages.length !== 1 ? 's' : ''}
            </p>
          </div>

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
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Centered ChatControlBox */}
      <div className="flex justify-center px-4 pb-4">
        <div className="w-full max-w-4xl">
          <ChatControlBox
            toolbarItems={toolbarItems}
            inputLeftControls={inputLeftControls}
            inputRightControls={inputRightControls}
            inputMessage={inputMessage}
            onInputChange={setInputMessage}
            onSend={handleSend}
            disabled={isProcessing}
            placeholder={selectedModels === 0 ? "Select models first..." : "Type your message..."}
          />
        </div>
      </div>
    </div>
  );
}
