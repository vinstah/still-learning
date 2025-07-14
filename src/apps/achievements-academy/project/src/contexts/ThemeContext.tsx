import React, { createContext, useContext, useState, useEffect } from 'react';
import { ColorTheme, themes, currentTheme } from '../styles/themes';

interface ThemeContextType {
  currentTheme: ColorTheme;
  setTheme: (themeName: keyof typeof themes) => void;
  availableThemes: typeof themes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Function to update CSS custom properties
const updateCSSVariables = (theme: ColorTheme) => {
  const root = document.documentElement;
  
  // Update primary colors
  Object.entries(theme.colors.primary).forEach(([shade, color]) => {
    root.style.setProperty(`--theme-primary-${shade}`, color);
  });
  
  // Update secondary colors
  Object.entries(theme.colors.secondary).forEach(([shade, color]) => {
    root.style.setProperty(`--theme-secondary-${shade}`, color);
  });
  
  // Update accent colors
  Object.entries(theme.colors.accent).forEach(([shade, color]) => {
    root.style.setProperty(`--theme-accent-${shade}`, color);
  });
  
  // Update status colors
  Object.entries(theme.colors.success).forEach(([shade, color]) => {
    root.style.setProperty(`--theme-success-${shade}`, color);
  });
  
  Object.entries(theme.colors.warning).forEach(([shade, color]) => {
    root.style.setProperty(`--theme-warning-${shade}`, color);
  });
  
  Object.entries(theme.colors.error).forEach(([shade, color]) => {
    root.style.setProperty(`--theme-error-${shade}`, color);
  });
  
  // Update neutral colors
  Object.entries(theme.colors.neutral).forEach(([shade, color]) => {
    root.style.setProperty(`--theme-neutral-${shade}`, color);
  });
  
  // Update gradients
  root.style.setProperty('--theme-gradient-primary', `linear-gradient(to right, ${theme.colors.primary[600]}, ${theme.colors.primary[700]})`);
  root.style.setProperty('--theme-gradient-secondary', `linear-gradient(to right, ${theme.colors.secondary[600]}, ${theme.colors.secondary[700]})`);
  root.style.setProperty('--theme-gradient-accent', `linear-gradient(to right, ${theme.colors.accent[500]}, ${theme.colors.accent[600]})`);
  root.style.setProperty('--theme-gradient-success', `linear-gradient(to right, ${theme.colors.success[600]}, ${theme.colors.success[700]})`);
  root.style.setProperty('--theme-gradient-warning', `linear-gradient(to right, ${theme.colors.warning[500]}, ${theme.colors.warning[600]})`);
  root.style.setProperty('--theme-gradient-error', `linear-gradient(to right, ${theme.colors.error[500]}, ${theme.colors.error[600]})`);
  root.style.setProperty('--theme-gradient-background', `linear-gradient(to bottom, ${theme.colors.neutral[50]}, ${theme.colors.primary[50]}, ${theme.colors.secondary[50]})`);
  root.style.setProperty('--theme-gradient-header', `linear-gradient(to right, ${theme.colors.neutral[800]}, ${theme.colors.neutral[700]}, ${theme.colors.neutral[800]})`);
  
  // Update subject-specific gradients
  root.style.setProperty('--theme-subject-mathematics-gradient', `linear-gradient(to bottom, ${theme.colors.primary[100]}, ${theme.colors.secondary[100]}, ${theme.colors.accent[100]})`);
  root.style.setProperty('--theme-subject-mathematics-header', `linear-gradient(to right, ${theme.colors.primary[600]}, ${theme.colors.secondary[600]}, ${theme.colors.accent[600]})`);
  root.style.setProperty('--theme-subject-english-gradient', `linear-gradient(to bottom, ${theme.colors.success[100]}, ${theme.colors.accent[100]}, ${theme.colors.primary[100]})`);
  root.style.setProperty('--theme-subject-english-header', `linear-gradient(to right, ${theme.colors.success[600]}, ${theme.colors.accent[600]}, ${theme.colors.primary[600]})`);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentThemeState, setCurrentThemeState] = useState<ColorTheme>(currentTheme);

  // Load theme from localStorage on mount and update CSS variables
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && themes[savedTheme as keyof typeof themes]) {
      const theme = themes[savedTheme as keyof typeof themes];
      setCurrentThemeState(theme);
      updateCSSVariables(theme);
    } else {
      updateCSSVariables(currentTheme);
    }
  }, []);

  // Update CSS variables when theme changes
  useEffect(() => {
    updateCSSVariables(currentThemeState);
  }, [currentThemeState]);

  const setTheme = (themeName: keyof typeof themes) => {
    const newTheme = themes[themeName];
    setCurrentThemeState(newTheme);
    localStorage.setItem('selectedTheme', themeName);
  };

  const value = {
    currentTheme: currentThemeState,
    setTheme,
    availableThemes: themes,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}; 