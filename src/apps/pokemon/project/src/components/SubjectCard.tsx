import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Users } from 'lucide-react';
import { Subject } from '../types/game';
import { subjects } from '../data/gameData';

interface SubjectCardProps {
  subject: Subject;
  progress: number;
  isUnlocked: boolean;
  playerCount: number;
  onSelect: (subject: Subject) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  progress,
  isUnlocked,
  playerCount,
  onSelect
}) => {
  const subjectData = subjects[subject];

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`relative group cursor-pointer ${!isUnlocked ? 'pointer-events-none' : ''}`}
      onClick={() => isUnlocked && onSelect(subject)}
    >
      <div className={`
        relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-2xl
        border-4 border-transparent hover:border-blue-300 transition-all duration-300
        ${!isUnlocked ? 'grayscale opacity-50' : ''}
        transform-gpu perspective-1000
      `}>
        {/* 3D Effect Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-3xl transform rotate-1 -z-10"></div>
        
        {/* Subject Icon */}
        <div className={`w-20 h-20 ${subjectData.color} rounded-2xl flex items-center justify-center text-4xl mb-4 shadow-xl transform group-hover:rotate-12 transition-transform`}>
          {subjectData.icon}
        </div>

        {/* Subject Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{subjectData.name}</h3>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{Math.floor(progress)}% Complete</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{playerCount} players</span>
          </div>
        </div>

        {/* Action Button */}
        {isUnlocked && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Play className="w-5 h-5" />
            <span>Start Adventure</span>
          </motion.button>
        )}

        {/* Lock Overlay */}
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black/20 rounded-3xl flex items-center justify-center">
            <div className="bg-white/90 rounded-2xl p-4 text-center backdrop-blur-sm">
              <div className="text-4xl mb-2">🔒</div>
              <p className="text-gray-600 font-medium">Complete previous levels to unlock!</p>
            </div>
          </div>
        )}

        {/* Floating Particles */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-pink-400 rounded-full animate-pulse opacity-60"></div>
      </div>
    </motion.div>
  );
};