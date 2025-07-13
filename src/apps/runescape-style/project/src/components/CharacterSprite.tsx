import React from 'react';
import { motion } from 'framer-motion';

interface CharacterSpriteProps {
  type: 'wizard' | 'scholar' | 'dragon' | 'knight';
  size?: 'small' | 'medium' | 'large';
  isAnimated?: boolean;
  className?: string;
}

export const CharacterSprite: React.FC<CharacterSpriteProps> = ({
  type,
  size = 'medium',
  isAnimated = true,
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-20 h-20',
    large: 'w-32 h-32'
  };

  const characters = {
    wizard: {
      emoji: '🧙‍♂️',
      color: 'from-purple-600 to-blue-600',
      glow: 'shadow-purple-500/50'
    },
    scholar: {
      emoji: '👨‍🎓',
      color: 'from-blue-600 to-indigo-600',
      glow: 'shadow-blue-500/50'
    },
    dragon: {
      emoji: '🐉',
      color: 'from-red-600 to-orange-600',
      glow: 'shadow-red-500/50'
    },
    knight: {
      emoji: '⚔️',
      color: 'from-gray-600 to-slate-600',
      glow: 'shadow-gray-500/50'
    }
  };

  const character = characters[type];

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br ${character.color} 
        rounded-full flex items-center justify-center
        border-4 border-yellow-400 shadow-lg ${character.glow}
        ${className}
      `}
      animate={isAnimated ? {
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0]
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.span 
        className="text-2xl"
        animate={isAnimated ? {
          scale: [1, 1.1, 1]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {character.emoji}
      </motion.span>
    </motion.div>
  );
};