import { useState, useCallback } from 'react';
import { GameState, PlayerProgress, MathProblem, MathCategory } from '../types';
import { achievements } from '../data/problems';

const initialPlayerProgress: PlayerProgress = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  completedProblems: [],
  achievements: [],
  currentStreak: 0,
  bestStreak: 0
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentProblem: null,
    currentStep: 0,
    showHints: false,
    playerProgress: initialPlayerProgress,
    selectedCategory: null
  });

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 100) + 1;
  };

  const calculateXpToNext = (currentXp: number) => {
    const currentLevel = calculateLevel(currentXp);
    return currentLevel * 100 - currentXp;
  };

  const checkAchievements = useCallback((progress: PlayerProgress) => {
    const newAchievements = [...progress.achievements];
    
    // Check for new achievements
    achievements.forEach(achievement => {
      const alreadyHas = progress.achievements.some(a => a.id === achievement.id);
      if (alreadyHas) return;

      let shouldUnlock = false;

      switch (achievement.id) {
        case 'first-problem':
          shouldUnlock = progress.completedProblems.length >= 1;
          break;
        case 'calculus-master':
          // This would need to check completed calculus problems specifically
          shouldUnlock = progress.completedProblems.length >= 5;
          break;
        case 'streak-5':
          shouldUnlock = progress.currentStreak >= 5;
          break;
        case 'level-10':
          shouldUnlock = progress.level >= 10;
          break;
        case 'all-categories':
          // This would need to check if problems from all categories are completed
          shouldUnlock = progress.completedProblems.length >= 6;
          break;
      }

      if (shouldUnlock) {
        newAchievements.push({
          ...achievement,
          unlockedAt: new Date()
        });
      }
    });

    return newAchievements;
  }, []);

  const completeProblem = useCallback((problem: MathProblem, usedHints: boolean) => {
    setGameState(prev => {
      const newXp = prev.playerProgress.xp + problem.xpReward;
      const newLevel = calculateLevel(newXp);
      const newStreak = usedHints ? 0 : prev.playerProgress.currentStreak + 1;
      
      const updatedProgress: PlayerProgress = {
        ...prev.playerProgress,
        xp: newXp,
        level: newLevel,
        xpToNext: calculateXpToNext(newXp),
        completedProblems: [...prev.playerProgress.completedProblems, problem.id],
        currentStreak: newStreak,
        bestStreak: Math.max(prev.playerProgress.bestStreak, newStreak),
        achievements: prev.playerProgress.achievements
      };

      // Check for new achievements
      updatedProgress.achievements = checkAchievements(updatedProgress);

      return {
        ...prev,
        playerProgress: updatedProgress,
        currentProblem: null,
        currentStep: 0,
        showHints: false
      };
    });
  }, [checkAchievements]);

  const selectCategory = useCallback((category: MathCategory) => {
    setGameState(prev => ({
      ...prev,
      selectedCategory: category
    }));
  }, []);

  const selectProblem = useCallback((problem: MathProblem) => {
    setGameState(prev => ({
      ...prev,
      currentProblem: problem,
      currentStep: 0,
      showHints: false
    }));
  }, []);

  const goBack = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      currentProblem: null,
      selectedCategory: null,
      currentStep: 0,
      showHints: false
    }));
  }, []);

  const goBackToCategories = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      selectedCategory: null,
      currentProblem: null,
      currentStep: 0,
      showHints: false
    }));
  }, []);

  return {
    gameState,
    completeProblem,
    selectCategory,
    selectProblem,
    goBack,
    goBackToCategories
  };
};