import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { CategoryGrid } from './components/CategoryGrid';
import { ProblemSelector } from './components/ProblemSelector';
import { ProblemSolver } from './components/ProblemSolver';
import { GameBackground } from './components/GameBackground';
import { FloatingElements } from './components/FloatingElements';
import { useGameState } from './hooks/useGameState';
import { mathProblems } from './data/problems';
import { MathCategory } from './types';

function App() {
  const { 
    gameState, 
    completeProblem, 
    selectCategory, 
    selectProblem, 
    goBack, 
    goBackToCategories 
  } = useGameState();

  // Calculate completed problems by category
  const completedByCategory: Record<MathCategory, number> = {
    'calculus': 0,
    'linear-algebra': 0,
    'differential-equations': 0,
    'complex-analysis': 0,
    'statistics': 0,
    'discrete-math': 0
  };

  gameState.playerProgress.completedProblems.forEach(problemId => {
    const problem = mathProblems.find(p => p.id === problemId);
    if (problem) {
      completedByCategory[problem.category]++;
    }
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GameBackground />
      <FloatingElements />
      
      <div className="relative z-10">
        <Header playerProgress={gameState.playerProgress} />
        
        <main className="relative min-h-[calc(100vh-80px)]">
          <AnimatePresence mode="wait">
            {/* Current Problem View */}
            {gameState.currentProblem && (
              <motion.div
                key="problem-solver"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -50 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              >
                <ProblemSolver
                  problem={gameState.currentProblem}
                  onComplete={completeProblem}
                  onBack={goBack}
                />
              </motion.div>
            )}

            {/* Problem Selector View */}
            {!gameState.currentProblem && gameState.selectedCategory && (
              <motion.div
                key="problem-selector"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
              >
                <ProblemSelector
                  category={gameState.selectedCategory}
                  problems={mathProblems}
                  playerProgress={gameState.playerProgress}
                  onProblemSelect={selectProblem}
                  onBack={goBackToCategories}
                />
              </motion.div>
            )}

            {/* Category Grid View */}
            {!gameState.currentProblem && !gameState.selectedCategory && (
              <motion.div
                key="category-grid"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="py-4 md:py-8">
                  <CategoryGrid
                    onCategorySelect={selectCategory}
                    completedByCategory={completedByCategory}
                    playerLevel={gameState.playerProgress.level}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Floating Achievement Notifications */}
        <AnimatePresence>
          {gameState.playerProgress.achievements
            .filter(a => a.unlockedAt && Date.now() - a.unlockedAt.getTime() < 5000)
            .map(achievement => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.5, x: 100, y: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, x: 100, y: -100 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20 
                }}
                className="fixed bottom-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-4 rounded-xl shadow-2xl border-2 border-yellow-400 z-50 max-w-sm"
                style={{
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.6)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-xl"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="flex items-center space-x-3 relative z-10">
                  <motion.span 
                    className="text-3xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                  >
                    {achievement.icon}
                  </motion.span>
                  <div>
                    <div className="font-bold text-sm">Achievement Unlocked!</div>
                    <div className="text-sm opacity-90">{achievement.title}</div>
                    <div className="text-xs opacity-75">+{achievement.xpBonus} XP</div>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;