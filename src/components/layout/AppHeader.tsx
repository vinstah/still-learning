import React from 'react';
import { ThemeToggle } from '../ThemeToggle';

interface AppHeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  isDark,
  onThemeToggle
}) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Still App
      </h1>
      <div className="flex items-center space-x-4">
        <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
      </div>
    </header>
  );
};