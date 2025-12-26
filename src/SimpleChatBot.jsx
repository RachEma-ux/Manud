import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Plus,
  Settings,
  Paperclip,
  ArrowUp,
  Bot,
  Mic,
  Plug,
  Save,
  Zap,
  FolderOpen,
  Palette,
  Globe,
  Download,
  Upload,
  FileJson,
  Sparkles
} from 'lucide-react';

// Import from V3 Framework modules
import useResponsive from './useResponsive';

// ==================== ENHANCED BUTTON ====================

const Button = ({ children, onClick, disabled, variant = 'default', className = '' }) => {
  const baseClass = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95";

  const variantClasses = {
    default: "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-200 border border-gray-600 shadow-lg hover:shadow-xl",
    ghost: "hover:bg-gray-700/50 text-gray-400 hover:text-gray-200",
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white border border-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50",
    success: "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white border border-green-600 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50",
    accent: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border border-purple-600 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50",
    light: "bg-gradient-to-br from-stone-200 to-stone-300 hover:from-stone-100 hover:to-stone-200 text-zinc-800 border border-stone-300 shadow-lg hover:shadow-xl"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClasses[variant] || variantClasses.default} ${className}`}
    >
      {children}
    </button>
  );
};

// ==================== TYPING INDICATOR ====================

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4 px-4 animate-slide-up">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl px-6 py-4 shadow-xl border border-gray-700/50">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-typing" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

// ==================== ENHANCED CHAT BUBBLE ====================

const ChatBubble = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 px-4 animate-slide-up`}>
      <div
        className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 text-white shadow-blue-500/30 border border-blue-500/30'
            : 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 text-gray-100 shadow-gray-900/50 border border-gray-700/50'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
          {message.content}
        </div>
        <div className={`text-xs mt-2 flex items-center gap-1 ${isUser ? 'text-blue-200/80' : 'text-gray-400'}`}>
          <span className="w-1 h-1 rounded-full bg-current opacity-60"></span>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================

function SimpleChatBot() {
  const { isMobile, dimensions } = useResponsive();
  const [selectedModels, setSelectedModels] = useState(0);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: '👋 Hello! Welcome to the Enhanced Chat Bot!\n\n✨ Features:\n• Beautiful modern UI with animations\n• Type messages and get instant responses\n• Export chat to JSON files\n• Import previous conversations\n• Fully responsive design\n\nSelect a model to get started!',
      role: 'assistant',
      timestamp: new Date().toISOString()
    }
  ]);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Textarea auto-grow
  const adjustHeight = () => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${dimensions.inputHeight}px`;

    const scrollHeight = textareaRef.current.scrollHeight;
    const newHeight = Math.min(
      Math.max(scrollHeight, dimensions.inputHeight),
      dimensions.maxInputHeight
    );

    textareaRef.current.style.height = `${newHeight}px`;
    textareaRef.current.style.overflowY = scrollHeight > dimensions.maxInputHeight ? 'auto' : 'hidden';
  };

  useEffect(() => {
    adjustHeight();
  }, [inputMessage, dimensions]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${dimensions.inputHeight}px`;
    }
  }, [dimensions]);

  // Send message
  const handleSend = () => {
    if (!inputMessage.trim() || selectedModels === 0) return;

    const userMsg = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response with typing indicator
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        content: `✅ Message received: "${inputMessage}"\n\n🤖 This is an enhanced AI response with beautiful styling!\n\n💡 Try exporting the chat to JSON to test the file creation feature.`,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ==================== JSON FILE OPERATIONS ====================

  // Export chat to JSON
  const handleExportJSON = () => {
    const chatData = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      metadata: {
        totalMessages: messages.length,
        selectedModels: selectedModels,
        framework: 'Responsiveness Framework V3 - Enhanced Edition',
        features: ['Modern UI', 'Animations', 'Gradient Design', 'Typing Indicator']
      },
      messages: messages,
      dimensions: {
        screenWidth: window.innerWidth,
        isMobile: isMobile,
        currentDimensions: dimensions
      }
    };

    // Create JSON string with pretty formatting
    const jsonString = JSON.stringify(chatData, null, 2);

    // Create blob and download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-export-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show success message
    const successMsg = {
      id: Date.now().toString(),
      content: '✅ Chat exported successfully!\n\n📁 File: chat-export-[timestamp].json\n\n📊 Contents:\n• All messages with timestamps\n• Metadata and statistics\n• Responsive dimensions\n• Enhanced UI version info',
      role: 'assistant',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, successMsg]);
  };

  // Import chat from JSON
  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const chatData = JSON.parse(e.target.result);

        // Validate JSON structure
        if (!chatData.messages || !Array.isArray(chatData.messages)) {
          throw new Error('Invalid chat data structure');
        }

        // Restore messages
        setMessages(chatData.messages);

        // Restore selected models if available
        if (chatData.metadata?.selectedModels !== undefined) {
          setSelectedModels(chatData.metadata.selectedModels);
        }

        // Show success message
        const successMsg = {
          id: Date.now().toString(),
          content: `✅ Chat imported successfully!\n\n📊 Statistics:\n• ${chatData.messages.length} messages restored\n• Exported: ${new Date(chatData.exportDate).toLocaleString()}\n• Version: ${chatData.version || '1.0'}\n\n✨ All data loaded perfectly!`,
          role: 'assistant',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, successMsg]);

      } catch (error) {
        // Show error message
        const errorMsg = {
          id: Date.now().toString(),
          content: `❌ Import failed!\n\n🔍 Error: ${error.message}\n\n💡 Please ensure you're uploading a valid JSON file exported from this app.`,
          role: 'assistant',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = '';
  };

  // View JSON preview
  const handleViewJSON = () => {
    setShowJsonModal(true);
  };

  const getJSONPreview = () => {
    const chatData = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      metadata: {
        totalMessages: messages.length,
        selectedModels: selectedModels,
        framework: 'Responsiveness Framework V3 - Enhanced Edition',
        features: ['Modern UI', 'Animations', 'Gradient Design']
      },
      messages: messages.slice(0, 2), // Preview first 2 messages only
      dimensions: {
        screenWidth: window.innerWidth,
        isMobile: isMobile,
        currentDimensions: {
          rowHeight: dimensions.rowHeight,
          toolbarIconButton: dimensions.toolbarIconButton,
          gap: dimensions.gap,
          fontSize: dimensions.fontSize
        }
      }
    };

    return JSON.stringify(chatData, null, 2);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-soft"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 p-4 shrink-0 shadow-2xl relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Enhanced Chat Bot
              </h1>
              <p className="text-gray-400 text-sm mt-0.5 flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  {selectedModels} model{selectedModels !== 1 ? 's' : ''}
                </span>
                <span className="text-gray-600">•</span>
                <span>{messages.length} messages</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 relative z-10" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 transparent' }}>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} isUser={msg.role === 'user'} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div
        className="bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-t border-gray-700/50 shrink-0 shadow-2xl relative z-10"
        style={{ padding: `${dimensions.containerPadding}px` }}
      >
        {/* Toolbar - Mobile Optimized */}
        <div
          className="flex items-center justify-center mb-3 flex-wrap"
          style={{ gap: `${dimensions.gap}px` }}
        >
          {/* Menu Button */}
          <div className="relative">
            <Button
              onClick={() => setShowMenu(!showMenu)}
              variant="ghost"
              style={{
                height: `${dimensions.toolbarIconButton}px`,
                width: `${dimensions.toolbarIconButton}px`
              }}
            >
              <Menu style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
            </Button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 w-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 z-50 overflow-hidden animate-scale-in">
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setMessages([{
                          id: '1',
                          content: '✨ New chat started! Ready to help you with anything.',
                          role: 'assistant',
                          timestamp: new Date().toISOString()
                        }]);
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 text-gray-200 text-left rounded-xl transition-all duration-200"
                    >
                      <Plus className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium">New Chat</span>
                    </button>
                    <button
                      onClick={() => {
                        handleViewJSON();
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 text-gray-200 text-left rounded-xl transition-all duration-200"
                    >
                      <FileJson className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium">View JSON</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* New Chat Button */}
          <Button
            onClick={() => setMessages([{
              id: '1',
              content: '✨ New chat started!',
              role: 'assistant',
              timestamp: new Date().toISOString()
            }])}
            variant="ghost"
            style={{
              height: `${dimensions.toolbarIconButton}px`,
              width: `${dimensions.toolbarIconButton}px`
            }}
          >
            <Plus style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
          </Button>

          {/* Models Button */}
          <Button
            onClick={() => setSelectedModels(prev => prev === 0 ? 3 : 0)}
            variant={selectedModels > 0 ? "primary" : "default"}
            style={{
              height: `${dimensions.modelsButtonHeight}px`,
              fontSize: `${dimensions.fontSize}px`,
              paddingLeft: `${dimensions.containerPadding}px`,
              paddingRight: `${dimensions.containerPadding}px`
            }}
          >
            {selectedModels} Models
          </Button>

          {/* Bot Icon (when models selected) */}
          {selectedModels > 0 && (
            <Button
              variant="ghost"
              style={{
                height: `${dimensions.toolbarIconButton}px`,
                width: `${dimensions.toolbarIconButton}px`
              }}
              className="text-cyan-400 hover:text-cyan-300 animate-scale-in"
            >
              <Bot style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
            </Button>
          )}

          {/* Export JSON Button */}
          <Button
            onClick={handleExportJSON}
            disabled={messages.length === 0}
            variant="success"
            style={{
              height: `${dimensions.toolbarIconButton}px`,
              width: `${dimensions.toolbarIconButton}px`
            }}
            title="Export to JSON"
          >
            <Download style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
          </Button>

          {/* Import JSON Button */}
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="accent"
            style={{
              height: `${dimensions.toolbarIconButton}px`,
              width: `${dimensions.toolbarIconButton}px`
            }}
            title="Import from JSON"
          >
            <Upload style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />

          {/* Settings Button */}
          <div className="relative">
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="ghost"
              style={{
                height: `${dimensions.toolbarIconButton}px`,
                width: `${dimensions.toolbarIconButton}px`
              }}
            >
              <Settings style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
            </Button>

            {showSettings && (
              <>
                <div
                  className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm animate-fade-in"
                  onClick={() => setShowSettings(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 w-60 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700/50 z-50 overflow-hidden animate-scale-in">
                  <div className="px-4 py-3 border-b border-gray-700/50 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </h3>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => {
                        console.log('Presets Setting');
                        setShowSettings(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 text-gray-200 text-left rounded-xl transition-all duration-200"
                    >
                      <Zap className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm font-medium">Presets Setting</span>
                    </button>
                    <button
                      onClick={() => {
                        console.log('Chat Theme');
                        setShowSettings(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 text-gray-200 text-left rounded-xl transition-all duration-200"
                    >
                      <Palette className="h-4 w-4 text-pink-400" />
                      <span className="text-sm font-medium">Chat Theme</span>
                    </button>
                    <button
                      onClick={() => {
                        handleViewJSON();
                        setShowSettings(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 text-gray-200 text-left rounded-xl transition-all duration-200"
                    >
                      <FileJson className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium">JSON Preview</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Presets Button */}
          <Button
            onClick={() => setShowPresets(!showPresets)}
            variant="light"
            style={{
              height: `${dimensions.modelsButtonHeight}px`,
              fontSize: `${dimensions.fontSize}px`,
              paddingLeft: `${dimensions.containerPadding}px`,
              paddingRight: `${dimensions.containerPadding}px`
            }}
          >
            Presets
          </Button>
        </div>

        {/* Input Area - Enhanced Pill Shape */}
        <div
          className="flex items-end bg-gradient-to-r from-zinc-100 via-white to-zinc-100 rounded-full shadow-2xl border border-gray-300/50 transition-all duration-300 hover:shadow-glow"
          style={{
            gap: `${dimensions.gap}px`,
            paddingLeft: `${dimensions.containerPadding / 2}px`,
            paddingRight: `${dimensions.containerPadding / 2}px`,
            paddingTop: `${dimensions.gap / 2}px`,
            paddingBottom: `${dimensions.gap / 2}px`
          }}
        >
          <Button
            onClick={() => console.log('Attach')}
            variant="ghost"
            style={{
              height: `${dimensions.sendButton}px`,
              width: `${dimensions.sendButton}px`
            }}
            className="shrink-0 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700"
          >
            <Paperclip
              style={{
                height: `${dimensions.inputIcon}px`,
                width: `${dimensions.inputIcon}px`,
                transform: 'rotate(-45deg)'
              }}
            />
          </Button>

          <Button
            onClick={() => console.log('Connector')}
            variant="ghost"
            style={{
              height: `${dimensions.sendButton}px`,
              width: `${dimensions.sendButton}px`
            }}
            className="shrink-0 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700"
          >
            <Plug style={{ height: `${dimensions.inputIcon}px`, width: `${dimensions.inputIcon}px` }} />
          </Button>

          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onInput={adjustHeight}
              onKeyPress={handleKeyPress}
              placeholder={selectedModels === 0 ? "Select models first..." : "Type your message..."}
              disabled={selectedModels === 0}
              rows={1}
              className="w-full bg-transparent border-none text-zinc-900 resize-none focus:outline-none disabled:opacity-50 placeholder:text-zinc-400 font-medium"
              style={{
                lineHeight: 1.5,
                height: `${dimensions.inputHeight}px`,
                minHeight: `${dimensions.inputHeight}px`,
                maxHeight: `${dimensions.maxInputHeight}px`,
                fontSize: `${dimensions.fontSize}px`,
                overflowY: 'hidden'
              }}
            />
          </div>

          <Button
            onClick={() => console.log('Voice')}
            variant="ghost"
            style={{
              height: `${dimensions.sendButton}px`,
              width: `${dimensions.sendButton}px`
            }}
            className="shrink-0 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700"
          >
            <Mic style={{ height: `${dimensions.inputIcon}px`, width: `${dimensions.inputIcon}px` }} />
          </Button>

          <Button
            onClick={handleSend}
            disabled={!inputMessage.trim() || selectedModels === 0}
            variant="ghost"
            style={{
              height: `${isMobile ? dimensions.sendButtonMobile : dimensions.sendButton}px`,
              width: `${isMobile ? dimensions.sendButtonMobile : dimensions.sendButton}px`
            }}
            className="shrink-0 bg-gradient-to-br from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 border-zinc-600 text-white shadow-lg disabled:opacity-50"
          >
            <ArrowUp style={{ height: `${dimensions.sendIcon}px`, width: `${dimensions.sendIcon}px` }} strokeWidth={2.5} />
          </Button>
        </div>

        {/* Tip */}
        <p
          className="text-center text-gray-400 mt-2"
          style={{ fontSize: `${dimensions.fontSize * 0.85}px` }}
        >
          Press Shift+Enter for new line • Enhanced with modern design
        </p>
      </div>

      {/* JSON Preview Modal */}
      {showJsonModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 animate-fade-in"
            onClick={() => setShowJsonModal(false)}
          />
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-3xl shadow-2xl z-50 animate-scale-in"
            style={{ maxHeight: '80vh' }}
          >
            <div className="p-5 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-purple-600/10">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileJson className="h-5 w-5 text-green-400" />
                JSON Preview
              </h2>
              <button
                onClick={() => setShowJsonModal(false)}
                className="text-gray-400 hover:text-white transition-all duration-200 hover:rotate-90 transform"
              >
                <Plus className="h-6 w-6 rotate-45" />
              </button>
            </div>
            <div className="p-5 overflow-auto" style={{ maxHeight: 'calc(80vh - 140px)' }}>
              <pre className="text-xs text-green-400 bg-gray-950/80 p-5 rounded-2xl overflow-x-auto border border-gray-800/50 shadow-inner font-mono">
                {getJSONPreview()}
              </pre>
            </div>
            <div className="p-5 border-t border-gray-700/50 flex gap-3 bg-gray-900/50">
              <Button
                onClick={() => {
                  handleExportJSON();
                  setShowJsonModal(false);
                }}
                variant="success"
                style={{
                  height: `${dimensions.modelsButtonHeight}px`,
                  fontSize: `${dimensions.fontSize}px`,
                  paddingLeft: `${dimensions.containerPadding}px`,
                  paddingRight: `${dimensions.containerPadding}px`
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Full JSON
              </Button>
              <Button
                onClick={() => setShowJsonModal(false)}
                style={{
                  height: `${dimensions.modelsButtonHeight}px`,
                  fontSize: `${dimensions.fontSize}px`,
                  paddingLeft: `${dimensions.containerPadding}px`,
                  paddingRight: `${dimensions.containerPadding}px`
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Presets Modal */}
      {showPresets && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 animate-fade-in"
            onClick={() => setShowPresets(false)}
          />
          <div
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-t-3xl md:rounded-3xl shadow-2xl z-50 animate-slide-up"
          >
            <div className="p-5 border-b border-gray-700/50 flex justify-between items-center bg-gradient-to-r from-purple-600/10 to-pink-600/10">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Presets
              </h2>
              <button
                onClick={() => setShowPresets(false)}
                className="text-gray-400 hover:text-white transition-all duration-200 hover:rotate-90 transform"
              >
                <Plus className="h-6 w-6 rotate-45" />
              </button>
            </div>
            <div className="p-5">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-gray-400 mb-2">No presets saved yet</p>
                <p className="text-xs text-gray-500">Create custom presets to quickly start conversations</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SimpleChatBot;
