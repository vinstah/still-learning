import React from 'react';
import { Home, GraduationCap, BookOpen, Trophy, BarChart3, Users, Settings } from 'lucide-react';
import { ViewType } from '../../types/app';

interface NavigationProps {
  currentView: ViewType;
  isDark: boolean;
  onViewChange: (view: ViewType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  isDark,
  onViewChange
}) => {
  const getButtonClass = (view: ViewType) => `
    flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors
    ${currentView === view 
      ? 'text-primary-500' 
      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
    }
  `;

  return (
    <nav className={`
      fixed bottom-0 left-0 right-0 p-4
      ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      border-t backdrop-blur-sm
    `}>
      <div className="flex justify-center space-x-8 max-w-md mx-auto">
        <button
          onClick={() => onViewChange('home')}
          className={getButtonClass('home')}
        >
          <Home size={20} />
          <span className="text-xs">Home</span>
        </button>
        
        <button
          onClick={() => onViewChange('lessons')}
          className={getButtonClass('lessons')}
        >
          <GraduationCap size={20} />
          <span className="text-xs">Lessons</span>
        </button>
        
        <button
          onClick={() => onViewChange('quiz')}
          className={getButtonClass('quiz')}
        >
          <BookOpen size={20} />
          <span className="text-xs">Quiz</span>
        </button>
        
        <button
          onClick={() => onViewChange('badges')}
          className={getButtonClass('badges')}
        >
          <Trophy size={20} />
          <span className="text-xs">Badges</span>
        </button>
        
        <button
          onClick={() => onViewChange('dashboard')}
          className={getButtonClass('dashboard')}
        >
          <BarChart3 size={20} />
          <span className="text-xs">Progress</span>
        </button>
      </div>
      
      {/* Secondary Navigation */}
      <div className="flex justify-center space-x-8 max-w-md mx-auto mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => onViewChange('teacher')}
          className={getButtonClass('teacher')}
        >
          <Users size={16} />
          <span className="text-xs">Teacher</span>
        </button>
        
        <button
          onClick={() => onViewChange('settings')}
          className={getButtonClass('settings')}
        >
          <Settings size={16} />
          <span className="text-xs">Settings</span>
        </button>
      </div>
    </nav>
  );
};