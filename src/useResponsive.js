import { useState, useEffect } from 'react';

/**
 * Responsiveness Framework V3
 * Custom hook for handling responsive dimensions across different screen sizes
 */
const useResponsive = () => {
  const [dimensions, setDimensions] = useState({
    // Row heights
    rowHeight: 48,

    // Toolbar dimensions
    toolbarIconButton: 40,
    toolbarIcon: 20,

    // Models button
    modelsButtonHeight: 40,

    // Gap/spacing
    gap: 8,
    containerPadding: 16,

    // Font sizes
    fontSize: 14,

    // Input area
    inputHeight: 24,
    maxInputHeight: 200,
    inputIcon: 18,

    // Send button
    sendButton: 40,
    sendButtonMobile: 48,
    sendIcon: 20,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;

      // Determine if mobile
      const mobile = width < 768;
      setIsMobile(mobile);

      // Calculate responsive dimensions
      let newDimensions = {
        rowHeight: 48,
        toolbarIconButton: 40,
        toolbarIcon: 20,
        modelsButtonHeight: 40,
        gap: 8,
        containerPadding: 16,
        fontSize: 14,
        inputHeight: 24,
        maxInputHeight: 200,
        inputIcon: 18,
        sendButton: 40,
        sendButtonMobile: 48,
        sendIcon: 20,
      };

      // Mobile adjustments (< 768px)
      if (width < 768) {
        newDimensions = {
          ...newDimensions,
          rowHeight: 44,
          toolbarIconButton: 36,
          toolbarIcon: 18,
          modelsButtonHeight: 36,
          gap: 6,
          containerPadding: 12,
          fontSize: 13,
          inputHeight: 22,
          maxInputHeight: 150,
          inputIcon: 16,
          sendButton: 36,
          sendButtonMobile: 44,
          sendIcon: 18,
        };
      }

      // Small mobile adjustments (< 480px)
      if (width < 480) {
        newDimensions = {
          ...newDimensions,
          rowHeight: 40,
          toolbarIconButton: 32,
          toolbarIcon: 16,
          modelsButtonHeight: 32,
          gap: 4,
          containerPadding: 10,
          fontSize: 12,
          inputHeight: 20,
          maxInputHeight: 120,
          inputIcon: 14,
          sendButton: 32,
          sendButtonMobile: 40,
          sendIcon: 16,
        };
      }

      // Large desktop adjustments (> 1440px)
      if (width > 1440) {
        newDimensions = {
          ...newDimensions,
          rowHeight: 52,
          toolbarIconButton: 44,
          toolbarIcon: 22,
          modelsButtonHeight: 44,
          gap: 10,
          containerPadding: 20,
          fontSize: 15,
          inputHeight: 26,
          maxInputHeight: 250,
          inputIcon: 20,
          sendButton: 44,
          sendButtonMobile: 52,
          sendIcon: 22,
        };
      }

      setDimensions(newDimensions);
    };

    // Initial update
    updateDimensions();

    // Add resize listener
    window.addEventListener('resize', updateDimensions);

    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return {
    isMobile,
    dimensions,
  };
};

export default useResponsive;
