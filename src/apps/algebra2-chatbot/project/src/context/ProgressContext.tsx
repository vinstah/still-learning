import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types';

interface ProgressContextType {
  progress: Record<string, UserProgress>;
  updateProgress: (topicId: string, completed: boolean) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Record<string, UserProgress>>({});

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('v2MathProgress');
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        // Convert stored date strings back to Date objects
        const progressWithDates = Object.entries(parsed).reduce((acc, [key, value]) => ({
          ...acc,
          [key]: {
            ...value,
            lastAccessed: new Date(value.lastAccessed)
          }
        }), {});
        setProgress(progressWithDates);
      } catch (error) {
        console.error('Error loading progress:', error);
        localStorage.removeItem('v2MathProgress');
      }
    }
  }, []);

  const updateProgress = (topicId: string, completed: boolean) => {
    setProgress(prev => {
      const topicProgress = prev[topicId] || {
        topicId,
        completed: 0,
        total: 10,
        lastAccessed: new Date()
      };

      const newProgress = {
        ...prev,
        [topicId]: {
          ...topicProgress,
          completed: completed 
            ? Math.min(topicProgress.completed + 1, topicProgress.total)
            : topicProgress.completed,
          lastAccessed: new Date()
        }
      };

      // Save to localStorage
      try {
        localStorage.setItem('v2MathProgress', JSON.stringify(newProgress));
      } catch (error) {
        console.error('Error saving progress:', error);
      }

      return newProgress;
    });
  };

  const resetProgress = () => {
    localStorage.removeItem('v2MathProgress');
    setProgress({});
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};