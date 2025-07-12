import React from 'react';
import { Trophy } from 'lucide-react';
import { Badge } from '../../types/user';

interface BadgeNotificationProps {
  badges: Badge[];
  isDark: boolean;
  onDismiss: () => void;
}

export const BadgeNotification: React.FC<BadgeNotificationProps> = ({
  badges,
  isDark,
  onDismiss
}) => {
  if (badges.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`
        p-4 rounded-lg shadow-lg border-l-4 border-yellow-500 max-w-sm
        ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
      `}>
        <div className="flex items-center space-x-2 mb-2">
          <Trophy className="text-yellow-500" size={20} />
          <h4 className="font-semibold">New Badge Earned!</h4>
        </div>
        <p className="text-sm opacity-75">
          {badges[0].title}: {badges[0].description}
        </p>
        <button
          onClick={onDismiss}
          className="mt-2 text-xs text-primary-500 hover:text-primary-600"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};