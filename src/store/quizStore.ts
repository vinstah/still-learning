import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { QuizResult } from '../types/question';
import { physicsQuestions } from '../data/questions';
import { DatabaseService } from '../services/database';

interface QuizState {
  quizResults: QuizResult[];
  currentQuizQuestions: typeof physicsQuestions;

  setQuizResults: (results: QuizResult[]) => void;
  setCurrentQuizQuestions: (questions: typeof physicsQuestions) => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      quizResults: [],
      currentQuizQuestions: physicsQuestions,
      setQuizResults: (results) => set({ quizResults: results }),
      setCurrentQuizQuestions: (questions) => set({ currentQuizQuestions: questions }),
    }),
    {
      name: 'quiz-store',
      partialize: (state) => ({ quizResults: state.quizResults }),
    }
  )
); 