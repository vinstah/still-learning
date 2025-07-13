import React from 'react';
import { motion } from 'framer-motion';

export const FloatingElements: React.FC = () => {
  const elements = [
    { emoji: '✨', delay: 0, x: '10%', y: '20%' },
    { emoji: '🔮', delay: 1, x: '80%', y: '15%' },
    { emoji: '📜', delay: 2, x: '15%', y: '70%' },
    { emoji: '⚡', delay: 0.5, x: '85%', y: '75%' },
    { emoji: '🌟', delay: 1.5, x: '50%', y: '10%' },
    { emoji: '🗡️', delay: 2.5, x: '90%', y: '45%' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-20"
          style={{ left: element.x, top: element.y }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  );
};