import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Gift } from 'lucide-react';
import { Badge } from '../types/game';

interface RewardSystemProps {
  isVisible: boolean;
  xpGained: number;
  badgeUnlocked?: Badge;
  levelUp?: boolean;
  newLevel?: number;
  onClose: () => void;
}

export const RewardSystem: React.FC<RewardSystemProps> = ({
  isVisible,
  xpGained,
  badgeUnlocked,
  levelUp,
  newLevel,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 max-w-md w-full shadow-2xl"
          >
            {/* Celebration Animation */}
            <div className="relative mb-6">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">Excellent Work!</h2>
              </div>

              {/* Floating Particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 100],
                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 100]
                  }}
                  transition={{ 
                    duration: 2, 
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 bg-white rounded-full"
                />
              ))}
            </div>

            {/* Rewards List */}
            <div className="space-y-4 mb-6">
              {/* XP Reward */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/20 rounded-2xl p-4 flex items-center space-x-3 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold">Experience Points</p>
                  <p className="text-yellow-100">+{xpGained} XP</p>
                </div>
              </motion.div>

              {/* Level Up */}
              {levelUp && newLevel && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/20 rounded-2xl p-4 flex items-center space-x-3 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Level Up!</p>
                    <p className="text-yellow-100">Now Level {newLevel}</p>
                  </div>
                </motion.div>
              )}

              {/* Badge Unlocked */}
              {badgeUnlocked && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/20 rounded-2xl p-4 flex items-center space-x-3 backdrop-blur-sm"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    badgeUnlocked.rarity === 'legendary' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                    badgeUnlocked.rarity === 'epic' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                    badgeUnlocked.rarity === 'rare' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                    'bg-gradient-to-br from-gray-400 to-gray-600'
                  }`}>
                    <span className="text-2xl">{badgeUnlocked.icon}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">New Badge!</p>
                    <p className="text-yellow-100">{badgeUnlocked.name}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full bg-white/20 text-white py-3 rounded-xl font-semibold backdrop-blur-sm hover:bg-white/30 transition-colors"
            >
              Continue Adventure
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};