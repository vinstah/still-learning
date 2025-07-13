import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lightbulb, CheckCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import { MathProblem, ProblemStep } from '../types';
import { CharacterSprite } from './CharacterSprite';

interface ProblemSolverProps {
  problem: MathProblem;
  onComplete: (problem: MathProblem, usedHints: boolean) => void;
  onBack: () => void;
}

export const ProblemSolver: React.FC<ProblemSolverProps> = ({
  problem,
  onComplete,
  onBack
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showHints, setShowHints] = useState(false);
  const [usedHints, setUsedHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);

  const currentStep = problem.steps[currentStepIndex];
  const isLastStep = currentStepIndex === problem.steps.length - 1;

  useEffect(() => {
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setShowHints(false);
    setUsedHints(false);
    setShowSolution(false);
    setCelebrationActive(false);
  }, [problem.id]);

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep.id)) {
      setCompletedSteps([...completedSteps, currentStep.id]);
    }
    
    if (!isLastStep) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setShowSolution(true);
      setCelebrationActive(true);
      setTimeout(() => setCelebrationActive(false), 3000);
    }
  };

  const handleShowHints = () => {
    setShowHints(true);
    setUsedHints(true);
  };

  const handleProblemComplete = () => {
    onComplete(problem, usedHints);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCompletedSteps([]);
    setShowHints(false);
    setUsedHints(false);
    setShowSolution(false);
    setCelebrationActive(false);
  };

  const renderMath = (content: string) => {
    if (content.includes('\\frac') || content.includes('\\int') || content.includes('\\sum')) {
      return <BlockMath math={content} />;
    }
    return <InlineMath math={content} />;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 relative z-10">
      {/* Celebration particles */}
      <AnimatePresence>
        {celebrationActive && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                  y: [0, -100]
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5
                }}
              >
                {['🎉', '✨', '🌟', '🎊'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center">
          <motion.button
            onClick={onBack}
            className="mr-4 p-2 rounded-lg bg-slate-700/80 backdrop-blur-sm hover:bg-slate-600 text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h2 className="fantasy-title text-xl md:text-2xl font-bold text-yellow-400">
              {problem.title}
            </h2>
            <p className="text-slate-300 text-sm md:text-base">{problem.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <CharacterSprite type="wizard" size="small" />
          <motion.button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-700/80 backdrop-blur-sm hover:bg-slate-600 text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            title="Reset Problem"
          >
            <RotateCcw className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="mb-6 md:mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Quest Progress</span>
          <span className="text-sm text-slate-400">
            Step {currentStepIndex + 1} of {problem.steps.length}
          </span>
        </div>
        <div className="w-full bg-slate-700/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-slate-600">
          <motion.div
            className="progress-bar h-full rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${(completedSteps.length / problem.steps.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Problem Statement */}
      <motion.div 
        className="parchment-bg rounded-xl p-4 md:p-6 mb-6 border-2 border-yellow-400 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="absolute top-2 right-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400 opacity-50" />
          </motion.div>
        </div>
        <h3 className="fantasy-title text-lg font-semibold text-slate-800 mb-3">
          The Mathematical Challenge
        </h3>
        <motion.div 
          className="text-slate-700 text-center text-base md:text-lg bg-white/90 backdrop-blur-sm rounded-lg p-4 border border-yellow-200"
          whileHover={{ scale: 1.02 }}
        >
          {renderMath(problem.problem)}
        </motion.div>
      </motion.div>

      {/* Current Step */}
      {!showSolution && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="parchment-bg rounded-xl p-4 md:p-6 mb-6 border-2 border-blue-400 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="flex items-start justify-between mb-4 relative z-10">
              <h3 className="fantasy-title text-lg font-semibold text-slate-800">
                Step {currentStepIndex + 1}: {currentStep.description}
              </h3>
              {completedSteps.includes(currentStep.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                </motion.div>
              )}
            </div>

            {currentStep.equation && (
              <motion.div 
                className="text-center bg-white/90 backdrop-blur-sm rounded-lg p-4 mb-4 border border-blue-200"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {renderMath(currentStep.equation)}
              </motion.div>
            )}

            <motion.p 
              className="text-slate-700 mb-4 text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentStep.explanation}
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4">
              <motion.button
                onClick={handleShowHints}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg transition-all w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lightbulb className="w-4 h-4" />
                </motion.div>
                <span>Show Ancient Wisdom</span>
              </motion.button>

              <motion.button
                onClick={handleStepComplete}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{isLastStep ? 'Reveal Solution' : 'Continue Quest'}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Solution */}
      {showSolution && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="parchment-bg rounded-xl p-4 md:p-6 mb-6 border-2 border-green-400 gold-glow relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-green-500/10"
            animate={{ 
              background: [
                'linear-gradient(90deg, rgba(34,197,94,0.1) 0%, rgba(234,179,8,0.1) 50%, rgba(34,197,94,0.1) 100%)',
                'linear-gradient(90deg, rgba(234,179,8,0.1) 0%, rgba(34,197,94,0.1) 50%, rgba(234,179,8,0.1) 100%)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <div className="relative z-10">
            <motion.h3 
              className="fantasy-title text-lg font-semibold text-slate-800 mb-3 flex items-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="mr-2">🎉</span>
              Quest Complete! Solution Revealed!
            </motion.h3>
            
            <motion.div 
              className="text-center bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 mb-4 border-2 border-green-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-xl md:text-2xl font-bold text-green-600">
                {renderMath(problem.solution)}
              </div>
            </motion.div>
            
            <div className="text-center">
              <motion.button
                onClick={handleProblemComplete}
                className="px-6 md:px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all level-up relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(251, 191, 36, 0.5)',
                    '0 0 30px rgba(251, 191, 36, 0.8)',
                    '0 0 20px rgba(251, 191, 36, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative z-10">
                  Complete Quest (+{problem.xpReward} XP)
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Hints Panel */}
      <AnimatePresence>
        {showHints && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="parchment-bg rounded-xl p-4 md:p-6 border-2 border-orange-400 overflow-hidden relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <h3 className="fantasy-title text-lg font-semibold text-slate-800 mb-3 flex items-center relative z-10">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
              </motion.div>
              Ancient Wisdom Scrolls
            </h3>
            
            <div className="space-y-3 relative z-10">
              {problem.hints.map((hint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3, duration: 0.5 }}
                  className="flex items-start space-x-3 bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-orange-200"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <motion.div 
                    className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    {index + 1}
                  </motion.div>
                  <p className="text-slate-700 text-sm md:text-base">{hint}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};