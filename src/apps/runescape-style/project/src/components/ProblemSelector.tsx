import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Lock, CheckCircle } from 'lucide-react';
import { MathProblem, MathCategory, PlayerProgress } from '../types';

interface ProblemSelectorProps {
  category: MathCategory;
  problems: MathProblem[];
  playerProgress: PlayerProgress;
  onProblemSelect: (problem: MathProblem) => void;
  onBack: () => void;
}

const difficultyColors = {
  apprentice: 'from-green-500 to-green-600',
  adept: 'from-blue-500 to-blue-600',
  expert: 'from-purple-500 to-purple-600',
  master: 'from-red-500 to-red-600'
};

const difficultyBorders = {
  apprentice: 'border-green-400',
  adept: 'border-blue-400',
  expert: 'border-purple-400',
  master: 'border-red-400'
};

export const ProblemSelector: React.FC<ProblemSelectorProps> = ({
  category,
  problems,
  playerProgress,
  onProblemSelect,
  onBack
}) => {
  const categoryProblems = problems.filter(p => p.category === category);
  
  const getCategoryTitle = (cat: MathCategory) => {
    const titles = {
      'calculus': 'Calculus Magic',
      'linear-algebra': 'Matrix Sorcery',
      'differential-equations': 'Temporal Equations',
      'complex-analysis': 'Ethereal Numbers',
      'statistics': 'Probability Divination',
      'discrete-math': 'Logic Enchantments'
    };
    return titles[cat];
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="fantasy-title text-2xl font-bold text-yellow-400">
            {getCategoryTitle(category)}
          </h2>
          <p className="text-slate-300">Choose a problem to begin your quest</p>
        </div>
      </div>

      {/* Problems Grid */}
      <div className="grid gap-4">
        {categoryProblems.map((problem, index) => {
          const isUnlocked = playerProgress.level >= problem.requiredLevel;
          const isCompleted = playerProgress.completedProblems.includes(problem.id);

          return (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={isUnlocked ? { scale: 1.01 } : {}}
              whileTap={isUnlocked ? { scale: 0.99 } : {}}
            >
              <div
                className={`
                  parchment-bg rounded-lg p-6 border-2 cursor-pointer transition-all
                  ${isUnlocked ? difficultyBorders[problem.difficulty] + ' hover:shadow-lg' : 'border-gray-400 opacity-50 cursor-not-allowed'}
                  ${isCompleted ? 'gold-glow' : ''}
                `}
                onClick={() => isUnlocked && onProblemSelect(problem)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="fantasy-title text-lg font-semibold text-slate-800 mr-3">
                        {problem.title}
                      </h3>
                      
                      {/* Difficulty Badge */}
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium text-white
                        bg-gradient-to-r ${difficultyColors[problem.difficulty]}
                        ${!isUnlocked ? 'grayscale' : ''}
                      `}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </span>

                      {/* Status Icons */}
                      <div className="ml-3 flex items-center space-x-2">
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {!isUnlocked && (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </div>

                    <p className="text-slate-600 mb-3">
                      {problem.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-slate-600">{problem.xpReward} XP</span>
                        </div>
                        <div className="text-slate-500">
                          Level {problem.requiredLevel}+
                        </div>
                      </div>

                      {!isUnlocked && (
                        <span className="text-sm text-red-500">
                          Requires Level {problem.requiredLevel}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {categoryProblems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-2">🔮</div>
          <p className="text-slate-400">More problems are being prepared by the ancient mathematicians...</p>
        </div>
      )}
    </div>
  );
};