import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Zap, Grid3X3, Activity, BarChart, Cpu } from 'lucide-react';
import { MathCategory } from '../types';
import { CharacterSprite } from './CharacterSprite';

interface CategoryGridProps {
  onCategorySelect: (category: MathCategory) => void;
  completedByCategory: Record<MathCategory, number>;
  playerLevel: number;
}

const categoryData = [
  {
    id: 'calculus' as MathCategory,
    title: 'Calculus Magic',
    description: 'Master the art of change and motion',
    icon: Calculator,
    character: 'wizard' as const,
    color: 'from-blue-500 to-blue-700',
    borderColor: 'border-blue-400',
    glowColor: 'shadow-blue-500/30',
    requiredLevel: 1
  },
  {
    id: 'linear-algebra' as MathCategory,
    title: 'Matrix Sorcery',
    description: 'Manipulate vectors and transformations',
    icon: Grid3X3,
    character: 'scholar' as const,
    color: 'from-green-500 to-green-700',
    borderColor: 'border-green-400',
    glowColor: 'shadow-green-500/30',
    requiredLevel: 3
  },
  {
    id: 'differential-equations' as MathCategory,
    title: 'Temporal Equations',
    description: 'Control the flow of time and change',
    icon: Activity,
    character: 'knight' as const,
    color: 'from-purple-500 to-purple-700',
    borderColor: 'border-purple-400',
    glowColor: 'shadow-purple-500/30',
    requiredLevel: 5
  },
  {
    id: 'complex-analysis' as MathCategory,
    title: 'Ethereal Numbers',
    description: 'Explore the mystical complex plane',
    icon: Zap,
    character: 'dragon' as const,
    color: 'from-yellow-500 to-yellow-700',
    borderColor: 'border-yellow-400',
    glowColor: 'shadow-yellow-500/30',
    requiredLevel: 8
  },
  {
    id: 'statistics' as MathCategory,
    title: 'Probability Divination',
    description: 'Predict outcomes and analyze data',
    icon: BarChart,
    character: 'wizard' as const,
    color: 'from-red-500 to-red-700',
    borderColor: 'border-red-400',
    glowColor: 'shadow-red-500/30',
    requiredLevel: 6
  },
  {
    id: 'discrete-math' as MathCategory,
    title: 'Logic Enchantments',
    description: 'Master discrete structures and algorithms',
    icon: Cpu,
    character: 'scholar' as const,
    color: 'from-indigo-500 to-indigo-700',
    borderColor: 'border-indigo-400',
    glowColor: 'shadow-indigo-500/30',
    requiredLevel: 10
  }
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onCategorySelect,
  completedByCategory,
  playerLevel
}) => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 relative z-10">
      <motion.div 
        className="text-center mb-6 md:mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="fantasy-title text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
          Choose Your Mathematical Discipline
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Each discipline contains ancient problems waiting to be solved...
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categoryData.map((category, index) => {
          const isUnlocked = playerLevel >= category.requiredLevel;
          const completed = completedByCategory[category.id] || 0;
          const Icon = category.icon;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={isUnlocked ? { 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              } : {}}
              whileTap={isUnlocked ? { scale: 0.95 } : {}}
            >
              <motion.div
                className={`
                  parchment-bg rounded-xl p-4 md:p-6 border-2 cursor-pointer transition-all relative overflow-hidden
                  ${isUnlocked ? category.borderColor + ' hover:shadow-xl ' + category.glowColor : 'border-gray-400 opacity-50 cursor-not-allowed'}
                  ${completed > 0 ? 'gold-glow' : ''}
                `}
                onClick={() => isUnlocked && onCategorySelect(category.id)}
                animate={completed > 0 ? {
                  boxShadow: [
                    '0 0 20px rgba(251, 191, 36, 0.3)',
                    '0 0 30px rgba(251, 191, 36, 0.5)',
                    '0 0 20px rgba(251, 191, 36, 0.3)'
                  ]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Character sprite in corner */}
                <div className="absolute -top-2 -right-2">
                  <CharacterSprite 
                    type={category.character} 
                    size="small" 
                    isAnimated={isUnlocked}
                  />
                </div>

                <div className="flex items-center mb-4">
                  <motion.div 
                    className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${category.color} 
                      flex items-center justify-center border-2 ${category.borderColor}
                      ${!isUnlocked ? 'grayscale' : ''}
                    `}
                    whileHover={isUnlocked ? { rotate: 360 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </motion.div>
                  <div className="ml-4 flex-1">
                    <h3 className="fantasy-title font-semibold text-slate-800 text-sm md:text-base">
                      {category.title}
                    </h3>
                    {!isUnlocked && (
                      <span className="text-xs md:text-sm text-gray-500">
                        Requires Level {category.requiredLevel}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-slate-600 text-xs md:text-sm mb-4">
                  {category.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="text-xs md:text-sm">
                    {isUnlocked ? (
                      <motion.span 
                        className="text-green-600 font-medium"
                        animate={completed > 0 ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {completed} problems solved
                      </motion.span>
                    ) : (
                      <span className="text-gray-500">Locked</span>
                    )}
                  </div>
                  {completed > 0 && (
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: Math.min(completed, 3) }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-yellow-400 rounded-full"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Animated background effect for unlocked categories */}
                {isUnlocked && (
                  <motion.div
                    className="absolute inset-0 opacity-10 rounded-xl"
                    style={{
                      background: `linear-gradient(45deg, transparent 30%, ${category.color.split(' ')[1]} 50%, transparent 70%)`
                    }}
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};