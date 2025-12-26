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
  FileJson
} from 'lucide-react';

// Import from V3 Framework modules
import useResponsive from './useResponsive';

// ==================== SIMPLE BUTTON ====================

const Button = ({ children, onClick, disabled, variant = 'default', className = '' }) => {
  const baseClass = "inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none";
  const variantClass = variant === 'ghost'
    ? "hover:bg-gray-700 text-gray-400"
    : "bg-gray-700 hover:bg-gray-600 text-gray-200 border border-gray-600";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
};

// ==================== CHAT BUBBLE ====================

const ChatBubble = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 px-4`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'
        }`}
      >
        <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
          {message.content}
        </div>
        <div className={`text-xs mt-2 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
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
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Hello! This is a test chat bot for JSON file creation.\n\nTry these features:\n• Type messages and send them\n• Export chat to JSON\n• Import JSON to restore chat\n• Test file creation capability',
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
  }, [messages]);

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

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        content: `Received: "${inputMessage}"\n\nThis is a simulated response. Try exporting the chat to JSON to test file creation!`,
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 800);
  };

  // ==================== JSON FILE OPERATIONS ====================

  // Export chat to JSON
  const handleExportJSON = () => {
    const chatData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      metadata: {
        totalMessages: messages.length,
        selectedModels: selectedModels,
        framework: 'Responsiveness Framework V3',
        testPurpose: 'JSON file creation test'
      },
      messages: messages,
      dimensions: {
        screenWidth: window.innerWidth,
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
      content: '✅ Chat exported to JSON successfully!\n\nFile created: chat-export-[timestamp].json\n\nThe JSON file includes:\n• All messages\n• Metadata\n• Timestamps\n• Current dimensions',
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
          content: `✅ Chat imported successfully!\n\nRestored ${chatData.messages.length} messages from ${new Date(chatData.exportDate).toLocaleString()}\n\nJSON file parsing test: PASSED`,
          role: 'assistant',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, successMsg]);

      } catch (error) {
        // Show error message
        const errorMsg = {
          id: Date.now().toString(),
          content: `❌ Failed to import chat:\n\n${error.message}\n\nPlease ensure the JSON file is valid.`,
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
      version: '1.0',
      exportDate: new Date().toISOString(),
      metadata: {
        totalMessages: messages.length,
        selectedModels: selectedModels,
        framework: 'Responsiveness Framework V3',
        testPurpose: 'JSON file creation test'
      },
      messages: messages.slice(0, 2), // Preview first 2 messages only
      dimensions: {
        screenWidth: window.innerWidth,
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
    <div className="h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-4 shrink-0">
        <h1 className="text-white text-lg font-semibold">Simple Chat Bot</h1>
        <p className="text-gray-400 text-sm mt-1">
          {selectedModels} model{selectedModels !== 1 ? 's' : ''} • {messages.length} messages • JSON Test
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} isUser={msg.role === 'user'} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer */}
      <div
        className="bg-gray-900 border-t border-gray-800 shrink-0"
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
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                  <button
                    onClick={() => {
                      setMessages([{
                        id: '1',
                        content: 'New chat started! Ready to test JSON file creation.',
                        role: 'assistant',
                        timestamp: new Date().toISOString()
                      }]);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-gray-200 text-left"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-sm">New Chat</span>
                  </button>
                  <button
                    onClick={() => {
                      handleViewJSON();
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-gray-200 text-left"
                  >
                    <FileJson className="h-4 w-4" />
                    <span className="text-sm">View JSON</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* New Chat Button */}
          <Button
            onClick={() => setMessages([{
              id: '1',
              content: 'New chat started!',
              role: 'assistant',
              timestamp: new Date().toISOString()
            }])}
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
            style={{
              height: `${dimensions.modelsButtonHeight}px`,
              fontSize: `${dimensions.fontSize}px`,
              paddingLeft: `${dimensions.containerPadding}px`,
              paddingRight: `${dimensions.containerPadding}px`
            }}
            className={selectedModels > 0 ? "bg-blue-600 hover:bg-blue-500 border-blue-600" : ""}
          >
            {selectedModels} Models
          </Button>

          {/* Bot Icon (when models selected) */}
          {selectedModels > 0 && (
            <Button
              style={{
                height: `${dimensions.toolbarIconButton}px`,
                width: `${dimensions.toolbarIconButton}px`
              }}
              className="text-cyan-400 hover:text-cyan-300"
            >
              <Bot style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
            </Button>
          )}

          {/* Export JSON Button */}
          <Button
            onClick={handleExportJSON}
            disabled={messages.length === 0}
            style={{
              height: `${dimensions.toolbarIconButton}px`,
              width: `${dimensions.toolbarIconButton}px`
            }}
            className="bg-green-700 hover:bg-green-600 border-green-700"
            title="Export to JSON"
          >
            <Download style={{ height: `${dimensions.toolbarIcon}px`, width: `${dimensions.toolbarIcon}px` }} />
          </Button>

          {/* Import JSON Button */}
          <Button
            onClick={() => fileInputRef.current?.click()}
            style={{
              height: `${dimensions.toolbarIconButton}px`,
              width: `${dimensions.toolbarIconButton}px`
            }}
            className="bg-purple-700 hover:bg-purple-600 border-purple-700"
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
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSettings(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <h3 className="text-sm font-semibold text-white">Settings</h3>
                  </div>
                  <button
                    onClick={() => {
                      console.log('Presets Setting');
                      setShowSettings(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-gray-200 text-left"
                  >
                    <Zap className="h-4 w-4" />
                    <span className="text-sm">Presets Setting</span>
                  </button>
                  <button
                    onClick={() => {
                      console.log('Chat Theme');
                      setShowSettings(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-gray-200 text-left"
                  >
                    <Palette className="h-4 w-4" />
                    <span className="text-sm">Chat Theme</span>
                  </button>
                  <button
                    onClick={() => {
                      handleViewJSON();
                      setShowSettings(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 text-gray-200 text-left"
                  >
                    <FileJson className="h-4 w-4" />
                    <span className="text-sm">JSON Preview</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Presets Button */}
          <Button
            onClick={() => setShowPresets(!showPresets)}
            style={{
              height: `${dimensions.modelsButtonHeight}px`,
              fontSize: `${dimensions.fontSize}px`,
              paddingLeft: `${dimensions.containerPadding}px`,
              paddingRight: `${dimensions.containerPadding}px`
            }}
            className="bg-stone-300 hover:bg-stone-200 text-zinc-800 border-stone-300"
          >
            Presets
          </Button>
        </div>

        {/* Input Area - Pill Shaped */}
        <div
          className="flex items-end bg-zinc-200 rounded-full"
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
            className="shrink-0 hover:bg-zinc-300 text-zinc-500"
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
            className="shrink-0 hover:bg-zinc-300 text-zinc-500"
          >
            <Plug style={{ height: `${dimensions.inputIcon}px`, width: `${dimensions.inputIcon}px` }} />
          </Button>

          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onInput={adjustHeight}
              placeholder={selectedModels === 0 ? "Select models first..." : "Type your message..."}
              disabled={selectedModels === 0}
              rows={1}
              className="w-full bg-transparent border-none text-zinc-900 resize-none focus:outline-none disabled:opacity-50 placeholder:text-zinc-500"
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
            className="shrink-0 hover:bg-zinc-300 text-zinc-500"
          >
            <Mic style={{ height: `${dimensions.inputIcon}px`, width: `${dimensions.inputIcon}px` }} />
          </Button>

          <Button
            onClick={handleSend}
            disabled={!inputMessage.trim() || selectedModels === 0}
            style={{
              height: `${isMobile ? dimensions.sendButtonMobile : dimensions.sendButton}px`,
              width: `${isMobile ? dimensions.sendButtonMobile : dimensions.sendButton}px`
            }}
            className="shrink-0 bg-zinc-700 hover:bg-zinc-600 border-zinc-600 text-zinc-400 hover:text-white disabled:opacity-50"
          >
            <ArrowUp style={{ height: `${dimensions.sendIcon}px`, width: `${dimensions.sendIcon}px` }} strokeWidth={2.5} />
          </Button>
        </div>

        {/* Tip */}
        <p
          className="text-center text-gray-500 mt-2"
          style={{ fontSize: `${dimensions.fontSize * 0.85}px` }}
        >
          Press Return/Enter for new line • Test JSON export/import features
        </p>
      </div>

      {/* JSON Preview Modal */}
      {showJsonModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50"
            style={{ zIndex: 40 }}
            onClick={() => setShowJsonModal(false)}
          />
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl"
            style={{ zIndex: 50, maxHeight: '80vh' }}
          >
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileJson className="h-5 w-5 text-green-400" />
                JSON Preview
              </h2>
              <button onClick={() => setShowJsonModal(false)} className="text-gray-400 hover:text-white">
                <Plus className="h-5 w-5 rotate-45" />
              </button>
            </div>
            <div className="p-4 overflow-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
              <pre className="text-xs text-green-400 bg-gray-950 p-4 rounded-lg overflow-x-auto">
                {getJSONPreview()}
              </pre>
            </div>
            <div className="p-4 border-t border-gray-700 flex gap-2">
              <Button
                onClick={handleExportJSON}
                className="bg-green-700 hover:bg-green-600 border-green-700"
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
            className="fixed inset-0 bg-black/20"
            style={{ zIndex: 40 }}
            onClick={() => setShowPresets(false)}
          />
          <div
            className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-96 bg-gray-900 border border-gray-700 rounded-t-2xl md:rounded-2xl shadow-2xl"
            style={{ zIndex: 50 }}
          >
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Quick Presets</h2>
              <button onClick={() => setShowPresets(false)} className="text-gray-400 hover:text-white">
                <Plus className="h-5 w-5 rotate-45" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-400">No presets saved yet. This is a JSON file creation test.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SimpleChatBot;
