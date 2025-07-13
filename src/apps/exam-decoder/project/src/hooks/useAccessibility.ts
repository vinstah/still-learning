import { useState, useEffect, useCallback } from 'react';
import { AccessibilitySettings } from '../types';

const defaultSettings: AccessibilitySettings = {
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  screenReader: false,
  keyboardNavigation: true
};

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('accessibility-settings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Detect system preferences
  useEffect(() => {
    const mediaQueries = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
      largeText: window.matchMedia('(prefers-reduced-data: reduce)')
    };

    const updateFromSystem = () => {
      setSettings(prev => ({
        ...prev,
        reducedMotion: prev.reducedMotion || mediaQueries.reducedMotion.matches,
        highContrast: prev.highContrast || mediaQueries.highContrast.matches
      }));
    };

    // Initial check
    updateFromSystem();

    // Listen for changes
    Object.values(mediaQueries).forEach(mq => {
      mq.addEventListener('change', updateFromSystem);
    });

    return () => {
      Object.values(mediaQueries).forEach(mq => {
        mq.removeEventListener('change', updateFromSystem);
      });
    };
  }, []);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    root.classList.toggle('high-contrast', settings.highContrast);
    root.classList.toggle('large-text', settings.largeText);
    root.classList.toggle('reduced-motion', settings.reducedMotion);
    root.classList.toggle('keyboard-navigation', settings.keyboardNavigation);

    // Save to localStorage
    try {
      localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
    }
  }, [settings]);

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  // Keyboard navigation helpers
  const handleKeyboardNavigation = useCallback((event: KeyboardEvent) => {
    if (!settings.keyboardNavigation) return;

    // Add custom keyboard navigation logic here
    switch (event.key) {
      case 'Tab':
        // Ensure focus is visible
        document.body.classList.add('keyboard-navigation');
        break;
      case 'Escape':
        // Close modals, dropdowns, etc.
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
        break;
    }
  }, [settings.keyboardNavigation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardNavigation);
    return () => document.removeEventListener('keydown', handleKeyboardNavigation);
  }, [handleKeyboardNavigation]);

  return {
    settings,
    updateSetting,
    resetSettings,
    isHighContrast: settings.highContrast,
    isLargeText: settings.largeText,
    isReducedMotion: settings.reducedMotion,
    isScreenReader: settings.screenReader,
    isKeyboardNavigation: settings.keyboardNavigation
  };
}