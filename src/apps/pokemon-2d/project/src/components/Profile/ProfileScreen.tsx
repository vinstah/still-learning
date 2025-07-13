import React from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Calendar, Flame, Star, Settings, LogOut, Edit } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import ProgressBar from '../UI/ProgressBar';

const ProfileScreen: React.FC = () => {
  const { user } = useGameStore();

  if (!user) return null;

  const levelProgress = (user.experience % 1000) / 1000 * 100;
  const nextLevelXP = 1000 - (user.experience % 1000);

  const stats = [
    { label: 'Activities Completed', value: '47', icon: '📚' },
    { label: 'Friends Helped', value: '12', icon: '🤝' },
    { label: 'Challenges Won', value: '8', icon: '🏆' },
    { label: 'Days Active', value: '23', icon: '📅' }
  ];

  const achievements = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first activity',
      icon: '🎯',
      rarity: 'common',
      unlockedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Math Wizard',
      description: 'Complete 10 math activities',
      icon: '🧮',
      rarity: 'rare',
      unlockedAt: new Date('2024-01-20')
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Add 5 friends',
      icon: '🦋',
      rarity: 'epic',
      unlockedAt: new Date('2024-01-25')
    },
    {
      id: '4',
      title: 'Streak Master',
      description: 'Maintain a 30-day learning streak',
      icon: '🔥',
      rarity: 'legendary',
      unlockedAt: new Date('2024-02-01')
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.username}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-primary-600 rounded-full flex items-center justify-center shadow-lg">
                <Edit size={16} />
              </button>
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-primary-100 mb-2">Level {user.level} Learner</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress to Level {user.level + 1}</span>
                  <span>{nextLevelXP} XP to go</span>
                </div>
                <ProgressBar progress={levelProgress} color="bg-white" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-warning-600">{user.tokens}</div>
            <div className="text-sm text-gray-600">Tokens</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-red-600">{user.streak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-primary-600">{user.experience}</div>
            <div className="text-sm text-gray-600">Total XP</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl font-bold text-success-600">{user.friends.length}</div>
            <div className="text-sm text-gray-600">Friends</div>
          </div>
        </motion.div>

        {/* Learning Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-3">Learning Goals</h3>
          <div className="flex flex-wrap gap-2">
            {user.learningGoals.map((goal) => (
              <span
                key={goal}
                className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {goal}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Activity Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4">Activity Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-3 bg-gray-50 rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Achievements</h3>
            <span className="text-sm text-gray-600">{achievements.length} unlocked</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className={`p-3 rounded-lg border-2 ${getRarityColor(achievement.rarity)}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <h4 className="font-semibold text-gray-800 text-sm">{achievement.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    achievement.rarity === 'common' ? 'bg-gray-200 text-gray-700' :
                    achievement.rarity === 'rare' ? 'bg-blue-200 text-blue-700' :
                    achievement.rarity === 'epic' ? 'bg-purple-200 text-purple-700' :
                    'bg-yellow-200 text-yellow-700'
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3 hover:bg-gray-50 transition-colors">
            <Settings className="text-gray-600" size={20} />
            <span className="font-medium text-gray-800">Settings</span>
          </button>
          
          <button className="w-full bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3 hover:bg-gray-50 transition-colors">
            <LogOut className="text-red-600" size={20} />
            <span className="font-medium text-red-600">Sign Out</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileScreen;