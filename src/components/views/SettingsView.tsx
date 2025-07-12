import React from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { AppSettings } from '../../types/app';

interface SettingsViewProps {
  appSettings: AppSettings;
  isDark: boolean;
  onThemeToggle: () => void;
  onSettingsChange: (settings: Partial<AppSettings>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  appSettings,
  isDark,
  onThemeToggle,
  onSettingsChange
}) => {
  return (
    <div className={`
      max-w-2xl mx-auto p-6 rounded-2xl shadow-lg
      ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
    `}>
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Settings
      </h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Dark Mode
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Switch between light and dark themes
            </p>
          </div>
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Narration
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Enable text-to-speech for questions
            </p>
          </div>
          <button
            onClick={() => onSettingsChange({ narrationEnabled: !appSettings.narrationEnabled })}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${appSettings.narrationEnabled ? 'bg-primary-500' : 'bg-gray-300'}
            `}
          >
            <div className={`
              absolute w-5 h-5 rounded-full bg-white top-0.5 transition-transform
              ${appSettings.narrationEnabled ? 'translate-x-6' : 'translate-x-0.5'}
            `} />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Voice Input
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Enable voice answers for questions
            </p>
          </div>
          <button
            onClick={() => onSettingsChange({ voiceInputEnabled: !appSettings.voiceInputEnabled })}
            className={`
              relative w-12 h-6 rounded-full transition-colors
              ${appSettings.voiceInputEnabled ? 'bg-primary-500' : 'bg-gray-300'}
            `}
          >
            <div className={`
              absolute w-5 h-5 rounded-full bg-white top-0.5 transition-transform
              ${appSettings.voiceInputEnabled ? 'translate-x-6' : 'translate-x-0.5'}
            `} />
          </button>
        </div>
      </div>
    </div>
  );
};