import React from 'react';
import { Award, Star, Trophy, Target, Zap, BookOpen } from 'lucide-react';
import { Badge as BadgeType } from '../types/user';

interface BadgeProps {
  type: BadgeType['type'];
  title: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  isDark: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Badge: React.FC<BadgeProps> = ({
  type,
  title,
  description,
  earned,
  earnedDate,
  isDark,
  size = 'medium'
}) => {
  const getIcon = () => {
    switch (type) {
      case 'achievement': return Award;
      case 'progress': return Star;
      case 'mastery': return Trophy;
      case 'streak': return Target;
      case 'speed': return Zap;
      case 'completion': return BookOpen;
      default: return Award;
    }
  };

  const getColor = () => {
    if (!earned) return isDark ? 'text-gray-600' : 'text-gray-400';
    
    switch (type) {
      case 'achievement': return 'text-yellow-500';
      case 'progress': return 'text-blue-500';
      case 'mastery': return 'text-purple-500';
      case 'streak': return 'text-green-500';
      case 'speed': return 'text-red-500';
      case 'completion': return 'text-indigo-500';
      default: return 'text-yellow-500';
    }
  };

  const getBgColor = () => {
    if (!earned) return isDark ? 'bg-gray-800' : 'bg-gray-100';
    
    switch (type) {
      case 'achievement': return 'bg-yellow-100 dark:bg-yellow-900/20';
      case 'progress': return 'bg-blue-100 dark:bg-blue-900/20';
      case 'mastery': return 'bg-purple-100 dark:bg-purple-900/20';
      case 'streak': return 'bg-green-100 dark:bg-green-900/20';
      case 'speed': return 'bg-red-100 dark:bg-red-900/20';
      case 'completion': return 'bg-indigo-100 dark:bg-indigo-900/20';
      default: return 'bg-yellow-100 dark:bg-yellow-900/20';
    }
  };

  const sizeClasses = {
    small: 'p-3 w-20 h-20',
    medium: 'p-4 w-24 h-24',
    large: 'p-6 w-32 h-32'
  };

  const iconSizes = {
    small: 24,
    medium: 32,
    large: 48
  };

  const Icon = getIcon();

  return (
    <div className={`
      ${sizeClasses[size]} rounded-2xl border-2 transition-all duration-300 cursor-pointer
      ${earned 
        ? `${getBgColor()} border-current hover:scale-105 shadow-lg` 
        : `${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'} opacity-60`
      }
      ${getColor()}
      flex flex-col items-center justify-center relative group
    `}>
      <Icon size={iconSizes[size]} className={earned ? 'animate-pulse-slow' : ''} />
      
      {earned && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
      )}
      
      {/* Tooltip */}
      <div className={`
        absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded-lg
        ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'}
        text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200
        pointer-events-none z-10
      `}>
        <div className="font-semibold">{title}</div>
        <div className="text-xs opacity-75">{description}</div>
        {earned && earnedDate && (
          <div className="text-xs opacity-50 mt-1">Earned: {earnedDate}</div>
        )}
        <div className={`
          absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0
          border-l-4 border-r-4 border-t-4 border-transparent
          ${isDark ? 'border-t-gray-900' : 'border-t-gray-800'}
        `} />
      </div>
    </div>
  );
};