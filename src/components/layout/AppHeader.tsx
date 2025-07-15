import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ThemeToggle } from '../ThemeToggle';
import { Navigation } from '../navigation/Navigation';

interface AppHeaderProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  isDark,
  onThemeToggle
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Still App
      </h1>
      <Navigation currentView={(location.pathname.slice(1) || '') as any}
          isDark={isDark}
          onViewChange={(view) => navigate(`/${view}`)} />
      <div className="flex items-center space-x-4">
        <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
      </div>
    </header>
  );
};