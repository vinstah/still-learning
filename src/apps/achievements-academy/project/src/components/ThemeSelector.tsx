import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme, availableThemes } = useTheme();

  const themeOptions = [
    { key: 'fantasy', name: 'Fantasy Adventure', description: 'Magical blue and purple theme' },
    { key: 'ocean', name: 'Ocean Adventure', description: 'Calming cyan and teal theme' },
    { key: 'forest', name: 'Forest Quest', description: 'Natural green and lime theme' },
    { key: 'sunset', name: 'Sunset Magic', description: 'Warm pink and orange theme' },
  ];

  const handleThemeChange = (themeKey: keyof typeof availableThemes) => {
    setTheme(themeKey);
    setIsOpen(false);
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        title="Change Theme"
      >
        <Palette className="h-6 w-6 text-gray-700" />
      </button>

      {/* Theme Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Palette className="h-6 w-6 text-gray-700" />
                <h2 className="text-xl font-bold text-gray-900">Choose Your Theme</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Theme Options */}
            <div className="p-6 space-y-4">
              {themeOptions.map((theme) => {
                const isActive = currentTheme.name === availableThemes[theme.key as keyof typeof availableThemes].name;
                return (
                  <button
                    key={theme.key}
                    onClick={() => handleThemeChange(theme.key as keyof typeof availableThemes)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                      isActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">{theme.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
                      </div>
                      {isActive && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Current Theme Info */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600">Current Theme</p>
                <p className="font-semibold text-gray-900">{currentTheme.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSelector; 