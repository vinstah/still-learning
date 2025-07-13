import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Users, Star, Gift, Calendar } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import ProgressBar from '../UI/ProgressBar';

const ChallengesScreen: React.FC = () => {
  const { user } = useGameStore();

  const dailyChallenges = [
    {
      id: '1',
      title: 'Math Master',
      description: 'Complete 3 math activities',
      progress: 2,
      target: 3,
      reward: 100,
      type: 'daily' as const,
      timeLeft: '4h 23m',
      icon: '🧮'
    },
    {
      id: '2',
      title: 'Social Learner',
      description: 'Help 2 friends with activities',
      progress: 0,
      target: 2,
      reward: 75,
      type: 'daily' as const,
      timeLeft: '4h 23m',
      icon: '🤝'
    },
    {
      id: '3',
      title: 'Streak Keeper',
      description: 'Maintain your learning streak',
      progress: 1,
      target: 1,
      reward: 50,
      type: 'daily' as const,
      timeLeft: '4h 23m',
      icon: '🔥'
    }
  ];

  const weeklyChallenges = [
    {
      id: '4',
      title: 'Knowledge Explorer',
      description: 'Complete activities in 5 different categories',
      progress: 3,
      target: 5,
      reward: 500,
      type: 'weekly' as const,
      timeLeft: '3d 12h',
      icon: '🗺️'
    },
    {
      id: '5',
      title: 'Team Player',
      description: 'Participate in 10 multiplayer sessions',
      progress: 6,
      target: 10,
      reward: 300,
      type: 'weekly' as const,
      timeLeft: '3d 12h',
      icon: '👥'
    }
  ];

  const specialEvents = [
    {
      id: '6',
      title: 'Winter Learning Festival',
      description: 'Special seasonal event with exclusive rewards',
      progress: 45,
      target: 100,
      reward: 'Exclusive Avatar',
      type: 'special' as const,
      timeLeft: '12d 5h',
      icon: '❄️',
      isLimited: true
    }
  ];

  const ChallengeCard = ({ challenge }: { challenge: any }) => {
    const progressPercentage = (challenge.progress / challenge.target) * 100;
    const isCompleted = challenge.progress >= challenge.target;

    return (
      <motion.div
        className={`bg-white rounded-xl p-4 shadow-sm border ${
          isCompleted ? 'border-success-200 bg-success-50' : 'border-gray-100'
        }`}
        whileHover={{ scale: 1.02 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{challenge.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-800">{challenge.title}</h4>
              <p className="text-sm text-gray-600">{challenge.description}</p>
            </div>
          </div>
          {challenge.isLimited && (
            <span className="bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full text-xs font-medium">
              Limited
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">
                {challenge.progress}/{challenge.target}
              </span>
            </div>
            <ProgressBar 
              progress={progressPercentage} 
              color={isCompleted ? 'bg-success-500' : 'bg-primary-500'}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock size={14} />
                <span>{challenge.timeLeft}</span>
              </div>
              <div className="flex items-center space-x-1 text-warning-600">
                <Gift size={14} />
                <span>{typeof challenge.reward === 'number' ? `${challenge.reward} tokens` : challenge.reward}</span>
              </div>
            </div>

            {isCompleted ? (
              <motion.button
                className="bg-success-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trophy size={16} />
                <span>Claim</span>
              </motion.button>
            ) : (
              <div className="text-sm text-gray-500 font-medium">
                {Math.round(progressPercentage)}% Complete
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-warning-500 to-red-500 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Daily Challenges</h2>
              <p className="text-warning-100">Complete challenges to earn extra rewards!</p>
            </div>
            <Trophy size={40} className="text-warning-200" />
          </div>
        </motion.div>

        {/* Challenge Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-primary-600">5</div>
            <div className="text-sm text-gray-600">Completed Today</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-success-600">12</div>
            <div className="text-sm text-gray-600">This Week</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-warning-600">850</div>
            <div className="text-sm text-gray-600">Tokens Earned</div>
          </div>
        </motion.div>

        {/* Daily Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <Calendar size={24} />
              <span>Daily Challenges</span>
            </h3>
            <span className="text-sm text-gray-600">Resets in 4h 23m</span>
          </div>
          
          <div className="space-y-3">
            {dailyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <ChallengeCard challenge={challenge} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <Star size={24} />
              <span>Weekly Challenges</span>
            </h3>
            <span className="text-sm text-gray-600">Resets in 3d 12h</span>
          </div>
          
          <div className="space-y-3">
            {weeklyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <ChallengeCard challenge={challenge} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
              <Gift size={24} />
              <span>Special Events</span>
            </h3>
          </div>
          
          <div className="space-y-3">
            {specialEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <ChallengeCard challenge={event} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ChallengesScreen;