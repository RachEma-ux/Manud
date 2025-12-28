import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  setTheme: () => {},
  switchable: false,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({
  children,
  defaultTheme = 'dark',
  switchable = false,
}) => {
  const [theme, setTheme] = useState(() => {
    if (switchable && typeof window !== 'undefined') {
      const stored = localStorage.getItem('app-theme');
      return stored || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    if (switchable) {
      localStorage.setItem('app-theme', theme);
    }
  }, [theme, switchable]);

  const value = {
    theme,
    setTheme: switchable ? setTheme : () => {},
    switchable,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
