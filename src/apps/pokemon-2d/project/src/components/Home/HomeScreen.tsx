import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Trophy, Users, Flame, Star } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import ActivityCard from './ActivityCard';
import ProgressBar from '../UI/ProgressBar';
import { LearningActivity } from '../../types/game';

const HomeScreen: React.FC = () => {
  const { user, setCurrentActivity } = useGameStore();

  // Mock activities data
  const featuredActivities: LearningActivity[] = [
    {
      id: '1',
      title: 'Quick Math Challenge',
      description: 'Test your arithmetic skills with fun problems',
      category: 'Mathematics',
      difficulty: 'easy',
      duration: 3,
      tokens: 50,
      experience: 100,
      content: {
        type: 'math',
        questions: [
          { id: '1', text: 'What is 15 + 27?', correctAnswer: '42', points: 10 },
          { id: '2', text: 'What is 8 × 9?', correctAnswer: '72', points: 15 },
        ]
      }
    },
    {
      id: '2',
      title: 'Word Memory Game',
      description: 'Improve your vocabulary and memory',
      category: 'Languages',
      difficulty: 'medium',
      duration: 5,
      tokens: 75,
      experience: 150,
      content: {
        type: 'memory',
        questions: [
          { id: '1', text: 'Remember these words: Apple, Book, Car, Dog', correctAnswer: 'Apple, Book, Car, Dog', points: 20 }
        ]
      }
    },
    {
      id: '3',
      title: 'Science Quiz',
      description: 'Explore the wonders of science',
      category: 'Science',
      difficulty: 'hard',
      duration: 4,
      tokens: 100,
      experience: 200,
      content: {
        type: 'quiz',
        questions: [
          { 
            id: '1', 
            text: 'What is the chemical symbol for gold?', 
            options: ['Go', 'Gd', 'Au', 'Ag'],
            correctAnswer: 'Au',
            points: 25
          }
        ]
      }
    }
  ];

  const dailyStats = {
    activitiesCompleted: 3,
    tokensEarned: 225,
    timeSpent: 12, // minutes
    streakDays: user?.streak || 0
  };

  const levelProgress = user ? (user.experience % 1000) / 1000 * 100 : 0;

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                Welcome back, {user?.username}!
              </h2>
              <p className="text-primary-100">Ready for today's learning adventure?</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">Level {user?.level}</div>
              <ProgressBar progress={levelProgress} className="w-20 mt-1" />
            </div>
          </div>
        </motion.div>

        {/* Daily Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="text-warning-500" size={20} />
              <span className="text-sm font-medium text-gray-600">Today's Tokens</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{dailyStats.tokensEarned}</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Flame className="text-red-500" size={20} />
              <span className="text-sm font-medium text-gray-600">Streak</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{dailyStats.streakDays} days</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Play className="text-success-500" size={20} />
              <span className="text-sm font-medium text-gray-600">Completed</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{dailyStats.activitiesCompleted}</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="text-primary-500" size={20} />
              <span className="text-sm font-medium text-gray-600">Time Spent</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{dailyStats.timeSpent}m</div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex space-x-3"
        >
          <button className="flex-1 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-xl p-4 font-semibold shadow-lg">
            <Users size={20} className="mx-auto mb-1" />
            Join Friends
          </button>
          <button className="flex-1 bg-gradient-to-r from-warning-500 to-warning-600 text-white rounded-xl p-4 font-semibold shadow-lg">
            <Trophy size={20} className="mx-auto mb-1" />
            Daily Challenge
          </button>
        </motion.div>

        {/* Featured Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Featured Activities</h3>
            <button className="text-primary-600 font-semibold text-sm">View All</button>
          </div>
          
          <div className="space-y-3">
            {featuredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <ActivityCard
                  activity={activity}
                  onStart={() => setCurrentActivity(activity)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-3">Recent Achievements</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 bg-warning-50 rounded-lg">
              <Star className="text-warning-500" size={20} />
              <div>
                <div className="font-medium text-gray-800">First Steps</div>
                <div className="text-sm text-gray-600">Complete your first activity</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;