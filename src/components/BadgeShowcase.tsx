import React from 'react';
import { Trophy } from 'lucide-react';
import { Badge } from './Badge';
import { Badge as BadgeType } from '../types/user';

interface BadgeShowcaseProps {
  badges: BadgeType[];
  isDark: boolean;
}

export const BadgeShowcase: React.FC<BadgeShowcaseProps> = ({ badges, isDark }) => {
  const earnedBadges = badges.filter(b => b.earned);
  const unearnedBadges = badges.filter(b => !b.earned);

  return (
    <div className={`
      p-6 rounded-2xl shadow-lg
      ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
    `}>
      <div className="flex items-center space-x-3 mb-6">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Achievements
        </h2>
      </div>

      {earnedBadges.length > 0 && (
        <div className="mb-8">
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Earned Badges ({earnedBadges.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {earnedBadges.map((badge) => (
              <Badge
                key={badge.id}
                type={badge.type}
                title={badge.title}
                description={badge.description}
                earned={badge.earned}
                earnedDate={badge.earnedDate}
                isDark={isDark}
                size="medium"
              />
            ))}
          </div>
        </div>
      )}

      {unearnedBadges.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Available Badges ({unearnedBadges.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {unearnedBadges.map((badge) => (
              <Badge
                key={badge.id}
                type={badge.type}
                title={badge.title}
                description={badge.description}
                earned={badge.earned}
                isDark={isDark}
                size="medium"
              />
            ))}
          </div>
        </div>
      )}

      {badges.length === 0 && (
        <div className="text-center py-8">
          <Trophy size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Start learning to earn your first badges!
          </p>
        </div>
      )}
    </div>
  );
};