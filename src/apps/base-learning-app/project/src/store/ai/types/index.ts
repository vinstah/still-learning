export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  preferences: {
    dyslexiaFriendly: boolean;
    adhdFriendly: boolean;
    darkMode: boolean;
    textToSpeech: boolean;
  };
}

export interface Board {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: 'middle-school' | 'high-school' | 'university';
  columns: Column[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  sharedWith: string[];
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
  color: string;
}

export interface Card {
  id: string;
  title: string;
  content: string;
  type: 'concept' | 'quiz' | 'note';
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  quiz?: Quiz;
  versions: CardVersion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CardVersion {
  id: string;
  content: string;
  timestamp: Date;
  author: string;
}

export interface Quiz {
  id: string;
  questions: Question[];
  totalScore: number;
  attempts: QuizAttempt[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'equation' | 'drag-drop' | 'written';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  answers: Record<string, string>;
  score: number;
  maxScore: number;
  timestamp: Date;
  timeSpent: number;
}

export interface AIConversation {
  id: string;
  messages: AIMessage[];
  context: string;
  createdAt: Date;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}