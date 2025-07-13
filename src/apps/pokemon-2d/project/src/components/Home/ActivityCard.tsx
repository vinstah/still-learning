import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Trophy, Users } from 'lucide-react';
import { LearningActivity } from '../../types/game';

interface ActivityCardProps {
  activity: LearningActivity;
  onStart: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onStart }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-success-600 bg-success-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    // You can expand this with more specific icons
    return '📚';
  };

  return (
    <motion.div
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getCategoryIcon(activity.category)}</div>
          <div>
            <h4 className="font-semibold text-gray-800">{activity.title}</h4>
            <p className="text-sm text-gray-600">{activity.description}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
          {activity.difficulty}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{activity.duration}m</span>
          </div>
          <div className="flex items-center space-x-1">
            <Trophy size={14} />
            <span>{activity.tokens} tokens</span>
          </div>
        </div>

        <motion.button
          onClick={onStart}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-1 hover:bg-primary-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={16} />
          <span>Start</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ActivityCard;