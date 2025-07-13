import React from 'react';
import { motion } from 'framer-motion';

export const GameBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900"
        animate={{
          background: [
            'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)',
            'linear-gradient(135deg, #1e293b 0%, #312e81 50%, #0f172a 100%)',
            'linear-gradient(135deg, #312e81 0%, #0f172a 50%, #1e293b 100%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};