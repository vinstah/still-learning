import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  isDark: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, isDark }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Progress
        </span>
        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {current}/{total}
        </span>
      </div>
      <div className={`
        w-full h-3 rounded-full overflow-hidden
        ${isDark ? 'bg-gray-700' : 'bg-gray-200'}
      `}>
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};