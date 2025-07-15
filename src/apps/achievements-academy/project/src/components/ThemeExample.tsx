import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeExample: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Theme System Examples - {currentTheme.name}
      </h2>

      {/* Background Colors */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Background Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-theme-primary-500 p-4 rounded-lg text-white text-center">
            Primary 500
          </div>
          <div className="bg-theme-secondary-500 p-4 rounded-lg text-white text-center">
            Secondary 500
          </div>
          <div className="bg-theme-accent-500 p-4 rounded-lg text-white text-center">
            Accent 500
          </div>
          <div className="bg-theme-success-500 p-4 rounded-lg text-white text-center">
            Success 500
          </div>
        </div>
      </div>

      {/* Text Colors */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Text Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-theme-primary-600 p-4 rounded-lg bg-gray-100 text-center font-semibold">
            Primary Text
          </div>
          <div className="text-theme-secondary-600 p-4 rounded-lg bg-gray-100 text-center font-semibold">
            Secondary Text
          </div>
          <div className="text-theme-accent-600 p-4 rounded-lg bg-gray-100 text-center font-semibold">
            Accent Text
          </div>
          <div className="text-theme-success-600 p-4 rounded-lg bg-gray-100 text-center font-semibold">
            Success Text
          </div>
        </div>
      </div>

      {/* Border Colors */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Border Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border-4 border-theme-primary-400 p-4 rounded-lg text-center">
            Primary Border
          </div>
          <div className="border-4 border-theme-secondary-400 p-4 rounded-lg text-center">
            Secondary Border
          </div>
          <div className="border-4 border-theme-accent-400 p-4 rounded-lg text-center">
            Accent Border
          </div>
          <div className="border-4 border-theme-success-400 p-4 rounded-lg text-center">
            Success Border
          </div>
        </div>
      </div>

      {/* Gradient Examples */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Gradient Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="theme-gradient-primary p-6 rounded-lg text-white text-center">
            <h4 className="text-lg font-bold mb-2">Primary Gradient</h4>
            <p>Uses theme-aware gradient</p>
          </div>
          <div className="theme-gradient-secondary p-6 rounded-lg text-white text-center">
            <h4 className="text-lg font-bold mb-2">Secondary Gradient</h4>
            <p>Uses theme-aware gradient</p>
          </div>
        </div>
      </div>

      {/* Subject-Specific Examples */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Subject-Specific Themes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="theme-subject-mathematics p-6 rounded-lg text-center">
            <h4 className="text-lg font-bold mb-2">Mathematics Theme</h4>
            <p>Uses mathematics-specific gradient</p>
          </div>
          <div className="theme-subject-english p-6 rounded-lg text-center">
            <h4 className="text-lg font-bold mb-2">English Theme</h4>
            <p>Uses english-specific gradient</p>
          </div>
        </div>
      </div>

      {/* Custom CSS Classes */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Custom CSS Classes</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="theme-bg-primary p-4 rounded-lg text-white text-center">
            theme-bg-primary
          </div>
          <div className="theme-bg-secondary p-4 rounded-lg text-white text-center">
            theme-bg-secondary
          </div>
          <div className="theme-text-primary p-4 rounded-lg bg-gray-100 text-center font-semibold">
            theme-text-primary
          </div>
          <div className="theme-border-primary border-4 p-4 rounded-lg text-center">
            theme-border-primary
          </div>
        </div>
      </div>

      {/* Color Palette */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Color Palette (Primary)</h3>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div
              key={shade}
              className={`bg-theme-primary-${shade} p-3 rounded text-center text-xs ${
                shade >= 500 ? 'text-white' : 'text-gray-800'
              }`}
            >
              {shade}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeExample; 