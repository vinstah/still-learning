import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Star, Zap, Shield } from 'lucide-react';
import { PlayerProgress } from '../types';
import { CharacterSprite } from './CharacterSprite';

interface HeaderProps {
  playerProgress: PlayerProgress;
}

export const Header: React.FC<HeaderProps> = ({ playerProgress }) => {
  const progressPercentage = (playerProgress.xp / playerProgress.xpToNext) * 100;

  return (
    <motion.header 
      className="bg-gradient-to-r from-slate-900/95 to-blue-900/95 backdrop-blur-sm border-b-4 border-yellow-400 p-3 md:p-4 relative z-10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <motion.div 
          className="flex items-center space-x-2 md:space-x-4"
          whileHover={{ scale: 1.02 }}
        >
          <CharacterSprite type="wizard" size="small" />
          <div>
            <h1 className="fantasy-title text-lg md:text-2xl font-bold text-yellow-400">
              RuneScape Math Academy
            </h1>
            <p className="text-slate-300 text-xs md:text-sm hidden sm:block">Master the Ancient Arts of Mathematics</p>
          </div>
        </motion.div>

        {/* Player Stats */}
        <div className="flex items-center space-x-2 md:space-x-6">
          {/* Level and XP */}
          <motion.div 
            className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-yellow-400/30"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-2 md:space-x-3">
              <motion.div 
                className="skill-orb w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base"
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(251, 191, 36, 0.5)',
                    '0 0 20px rgba(251, 191, 36, 0.8)',
                    '0 0 10px rgba(251, 191, 36, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {playerProgress.level}
              </motion.div>
              <div className="hidden md:block">
                <div className="text-yellow-400 font-semibold text-sm">Level {playerProgress.level}</div>
                <div className="w-24 md:w-32 bg-slate-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="progress-bar h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {playerProgress.xp} / {playerProgress.xpToNext} XP
                </div>
              </div>
            </div>
          </motion.div>

          {/* Streak */}
          <motion.div 
            className="flex items-center space-x-1 md:space-x-2 bg-slate-800/80 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-orange-400/30"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
            </motion.div>
            <div>
              <div className="text-orange-400 font-semibold text-sm md:text-base">{playerProgress.currentStreak}</div>
              <div className="text-xs text-slate-400 hidden md:block">Streak</div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div 
            className="flex items-center space-x-1 md:space-x-2 bg-slate-800/80 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-purple-400/30"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
            </motion.div>
            <div>
              <div className="text-purple-400 font-semibold text-sm md:text-base">{playerProgress.achievements.length}</div>
              <div className="text-xs text-slate-400 hidden md:block">Achievements</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};