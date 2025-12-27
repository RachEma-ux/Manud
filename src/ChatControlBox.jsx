import React, { useRef, useEffect, useMemo, useState } from 'react';

// ==================== PROPORTIONALITY SYSTEM ====================

const RATIOS = {
  toolbarIconButton: 0.65,
  toolbarIcon: 0.60,
  inputIcon: 0.458,
  gap: 0.32,
  padding: 0.25,
  inputHeight: 0.917,
  fontSize: 0.23,
  maxHeightMultiplier: 4.17
};

function calculateProportionalDimensions(screenWidth) {
  const minWidth = 320;
  const maxWidth = 1920;
  const minRowHeight = 32;
  const maxRowHeight = 48;

  const normalized = (screenWidth - minWidth) / (maxWidth - minWidth);
  const clamped = Math.max(0, Math.min(1, normalized));
  const masterRowHeight = minRowHeight + (maxRowHeight - minRowHeight) * clamped;

  return {
    rowHeight: masterRowHeight,
    toolbarIconButton: masterRowHeight * RATIOS.toolbarIconButton,
    toolbarIcon: masterRowHeight * RATIOS.toolbarIcon,
    inputIcon: masterRowHeight * RATIOS.inputIcon,
    gap: masterRowHeight * RATIOS.gap,
    containerPadding: masterRowHeight * RATIOS.padding,
    inputHeight: Math.max(40, masterRowHeight * RATIOS.inputHeight),
    maxInputHeight: masterRowHeight * RATIOS.maxHeightMultiplier,
    fontSize: Math.max(14, masterRowHeight * RATIOS.fontSize),
  };
}

function useResponsive() {
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScreenWidth(window.innerWidth);
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const dimensions = useMemo(() =>
    calculateProportionalDimensions(screenWidth),
    [screenWidth]
  );

  return { isMobile, screenWidth, dimensions };
}

// ==================== CHAT CONTROL BOX ====================

/**
 * ChatControlBox - Reusable chat control component
 *
 * @param {React.ReactNode} toolbarItems - Elements to render in toolbar (buttons, controls, etc.)
 * @param {React.ReactNode} inputLeftControls - Controls to render on left side of input
 * @param {React.ReactNode} inputRightControls - Controls to render on right side of input
 * @param {string} inputMessage - Current input message value
 * @param {function} onInputChange - Callback when input changes
 * @param {function} onSend - Callback when message is sent
 * @param {boolean} disabled - Whether input is disabled
 * @param {string} placeholder - Input placeholder text
 * @param {string} className - Additional CSS classes for container
 * @param {object} style - Additional inline styles for container
 */
const ChatControlBox = ({
  toolbarItems,
  inputLeftControls,
  inputRightControls,
  inputMessage = '',
  onInputChange,
  onSend,
  disabled = false,
  placeholder = 'Type your message...',
  className = '',
  style = {}
}) => {
  const { isMobile, dimensions } = useResponsive();
  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, dimensions.maxInputHeight);
    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage, dimensions.maxInputHeight]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isMobile) {
      e.preventDefault();
      if (onSend) onSend();
    }
  };

  return (
    <div
      className={`bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden ${className}`}
      style={{
        padding: `${dimensions.containerPadding}px`,
        boxSizing: 'border-box',
        ...style
      }}
    >
      {/* Toolbar */}
      {toolbarItems && (
        <div
          className="flex items-center justify-between mb-3"
          style={{ gap: `${dimensions.gap}px` }}
        >
          {toolbarItems}
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-end" style={{ gap: `${dimensions.gap}px`, maxWidth: '100%', boxSizing: 'border-box' }}>
        <div className="flex-1 bg-gray-100 rounded-2xl flex items-end" style={{
          paddingTop: `${dimensions.gap}px`,
          paddingLeft: `${dimensions.gap}px`,
          paddingRight: `${dimensions.gap}px`,
          paddingBottom: `${dimensions.gap * 0.3}px`,
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Left Controls */}
          {inputLeftControls}

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => {
              if (onInputChange) onInputChange(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 bg-transparent border-0 outline-none resize-none text-gray-900 placeholder-gray-400"
            style={{
              marginLeft: inputLeftControls ? `${dimensions.gap}px` : '0',
              marginRight: inputRightControls ? `${dimensions.gap}px` : '0',
              fontSize: `${dimensions.fontSize}px`,
              minHeight: `${dimensions.inputHeight}px`,
              maxHeight: `${dimensions.maxInputHeight}px`,
              lineHeight: '1.5',
              paddingTop: '8px',
              paddingBottom: '4px'
            }}
            rows={1}
          />

          {/* Right Controls */}
          {inputRightControls}
        </div>
      </div>
    </div>
  );
};

export default ChatControlBox;
export { useResponsive, RATIOS, calculateProportionalDimensions };
