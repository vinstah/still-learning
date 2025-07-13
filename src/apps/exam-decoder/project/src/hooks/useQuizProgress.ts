import { useState, useCallback, useEffect } from 'react';
import { QuizAttempt, Question, QuestionAnswer } from '../types';

interface UseQuizProgressOptions {
  timeLimit?: number; // seconds
  autoSubmit?: boolean;
  saveProgress?: boolean;
}

export function useQuizProgress(
  questions: Question[], 
  options: UseQuizProgressOptions = {}
) {
  const [currentAttempt, setCurrentAttempt] = useState<Partial<QuizAttempt>>({
    id: crypto.randomUUID(),
    timestamp: new Date(),
    answers: {},
    timeSpent: 0,
    hintsUsed: [],
    isCompleted: false
  });

  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    options.timeLimit || null
  );
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isTimerActive || timeRemaining === null) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          if (options.autoSubmit) {
            handleSubmitAttempt();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining, options.autoSubmit]);

  const startTimer = useCallback(() => {
    setIsTimerActive(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsTimerActive(false);
  }, []);

  const updateAnswer = useCallback((questionId: string, answer: any) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = validateAnswer(question, answer);
    const points = isCorrect ? question.points : 0;

    const questionAnswer: QuestionAnswer = {
      questionId,
      answer,
      isCorrect,
      points,
      timeSpent: 0, // This would be tracked per question in a real implementation
      attempts: (currentAttempt.answers?.[questionId]?.attempts || 0) + 1,
      hintsUsed: currentAttempt.answers?.[questionId]?.hintsUsed || []
    };

    setCurrentAttempt(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: questionAnswer
      }
    }));

    // Auto-save progress if enabled
    if (options.saveProgress) {
      saveProgressToStorage();
    }
  }, [questions, currentAttempt.answers, options.saveProgress]);

  const useHint = useCallback((questionId: string, hintId: string) => {
    setCurrentAttempt(prev => {
      const existingAnswer = prev.answers?.[questionId];
      const updatedAnswer = existingAnswer ? {
        ...existingAnswer,
        hintsUsed: [...existingAnswer.hintsUsed, hintId]
      } : {
        questionId,
        answer: null,
        isCorrect: false,
        points: 0,
        timeSpent: 0,
        attempts: 0,
        hintsUsed: [hintId]
      };

      return {
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: updatedAnswer
        },
        hintsUsed: [...(prev.hintsUsed || []), hintId]
      };
    });
  }, []);

  const calculateScore = useCallback(() => {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = Object.values(currentAttempt.answers || {})
      .reduce((sum, answer) => sum + answer.points, 0);
    
    return totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  }, [questions, currentAttempt.answers]);

  const calculateDetailedResults = useCallback(() => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(currentAttempt.answers || {}).length;
    const correctAnswers = Object.values(currentAttempt.answers || {})
      .filter(answer => answer.isCorrect).length;
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = Object.values(currentAttempt.answers || {})
      .reduce((sum, answer) => sum + answer.points, 0);

    return {
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      incorrectAnswers: answeredQuestions - correctAnswers,
      totalPoints,
      earnedPoints,
      percentage: totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0,
      completionRate: totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0
    };
  }, [questions, currentAttempt.answers]);

  const handleSubmitAttempt = useCallback(() => {
    const score = calculateScore();
    const results = calculateDetailedResults();
    
    const completedAttempt: QuizAttempt = {
      id: currentAttempt.id || crypto.randomUUID(),
      timestamp: currentAttempt.timestamp || new Date(),
      score: results.earnedPoints,
      maxScore: results.totalPoints,
      percentage: results.percentage,
      answers: currentAttempt.answers || {},
      timeSpent: currentAttempt.timeSpent || 0,
      hintsUsed: currentAttempt.hintsUsed || [],
      isCompleted: true,
      submittedAt: new Date()
    };

    setAttempts(prev => [...prev, completedAttempt]);
    setIsTimerActive(false);
    
    // Reset for next attempt
    setCurrentAttempt({
      id: crypto.randomUUID(),
      timestamp: new Date(),
      answers: {},
      timeSpent: 0,
      hintsUsed: [],
      isCompleted: false
    });

    return completedAttempt;
  }, [currentAttempt, calculateScore, calculateDetailedResults]);

  const getBestScore = useCallback(() => {
    return attempts.length > 0 ? Math.max(...attempts.map(a => a.percentage)) : 0;
  }, [attempts]);

  const getAverageScore = useCallback(() => {
    if (attempts.length === 0) return 0;
    return Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length);
  }, [attempts]);

  const getProgress = useCallback(() => {
    const totalQuestions = questions.length;
    const answeredQuestions = Object.keys(currentAttempt.answers || {}).length;
    return totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  }, [questions.length, currentAttempt.answers]);

  const saveProgressToStorage = useCallback(() => {
    try {
      const progressKey = `quiz-progress-${currentAttempt.id}`;
      localStorage.setItem(progressKey, JSON.stringify(currentAttempt));
    } catch (error) {
      console.error('Failed to save quiz progress:', error);
    }
  }, [currentAttempt]);

  const loadProgressFromStorage = useCallback((attemptId: string) => {
    try {
      const progressKey = `quiz-progress-${attemptId}`;
      const saved = localStorage.getItem(progressKey);
      if (saved) {
        const progress = JSON.parse(saved);
        setCurrentAttempt(progress);
        return true;
      }
    } catch (error) {
      console.error('Failed to load quiz progress:', error);
    }
    return false;
  }, []);

  return {
    currentAttempt,
    attempts,
    timeRemaining,
    isTimerActive,
    startTimer,
    pauseTimer,
    updateAnswer,
    useHint,
    submitAttempt: handleSubmitAttempt,
    calculateScore,
    calculateDetailedResults,
    getBestScore,
    getAverageScore,
    getProgress,
    saveProgressToStorage,
    loadProgressFromStorage
  };
}

function validateAnswer(question: Question, answer: any): boolean {
  switch (question.type) {
    case 'multiple-choice':
    case 'true-false':
      return answer === question.correctAnswer;
    
    case 'multiple-select':
      if (!Array.isArray(answer) || !Array.isArray(question.correctAnswer)) {
        return false;
      }
      return answer.length === question.correctAnswer.length &&
             answer.every(a => question.correctAnswer.includes(a));
    
    case 'numerical-input':
      const numAnswer = parseFloat(answer);
      const correctNum = parseFloat(question.correctAnswer as string);
      return Math.abs(numAnswer - correctNum) < 0.01; // Allow small floating point errors
    
    case 'equation-input':
      // This would need a more sophisticated equation parser in production
      return answer.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase().trim();
    
    case 'drag-drop':
    case 'ordering':
      return JSON.stringify(answer) === JSON.stringify(question.correctAnswer);
    
    case 'fill-in-blank':
      if (Array.isArray(answer) && Array.isArray(question.correctAnswer)) {
        return answer.every((a, i) => 
          a.toLowerCase().trim() === question.correctAnswer[i]?.toLowerCase().trim()
        );
      }
      return false;
    
    default:
      return false;
  }
}