export interface User {
  id: string;
  role: 'Student' | 'Parent' | 'Teacher' | 'Individual';
  name: string;
  currentLevel: string;
  currentSubject: string;
  progress: Progress;
  achievements: Achievement[];
  streak: number;
  lastActiveDate: string;
}

export interface Progress {
  [subject: string]: {
    [level: string]: {
      completedLessons: string[];
      currentLesson: string;
      totalScore: number;
      timeSpent: number;
    };
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  levels: string[];
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  level: string;
  content: {
    concept: string;
    realWorldContext: string;
    keyPoints: string[];
    examples: string[];
  };
  quiz: QuizQuestion[];
  prerequisites: string[];
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'drag-drop' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface PomodoroSession {
  duration: number;
  isActive: boolean;
  timeRemaining: number;
  type: 'study' | 'break';
}