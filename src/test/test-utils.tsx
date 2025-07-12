import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Mock data for tests
export const mockUserProgress = {
  totalQuestions: 10,
  correctAnswers: 8,
  currentQuestionIndex: 0,
  badges: ['first_lesson', 'quiz_master'],
  timeSpent: 120,
  lastActivity: '2024-01-01T10:00:00Z',
  completedLessons: 2,
  totalLessons: 5,
  currentStreak: 3,
  averageAccuracy: 80
};

export const mockAppSettings = {
  isDark: false,
  soundEnabled: true,
  notificationsEnabled: true,
  language: 'en'
};

export const mockQuizResults = [
  { questionId: '1', userAnswer: 'A', isCorrect: true },
  { questionId: '2', userAnswer: 'B', isCorrect: false }
];

export const mockCurrentQuizQuestions = [
  {
    id: '1',
    question: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    correctAnswer: 'B',
    topic: 'geography'
  },
  {
    id: '2',
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 'B',
    topic: 'math'
  }
]; 