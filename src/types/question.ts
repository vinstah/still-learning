export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number | string; // Allow both number and string for flexibility
  explanation: string;
  topic: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  type?: 'multiple-choice' | 'text-input' | 'drag-drop' | 'drawing';
  tags?: string[];
  questTitle?: string;
}

export interface QuizSession {
  id: string;
  userId: number;
  questions: Question[];
  currentQuestionIndex: number;
  answers: QuizAnswer[];
  startTime: number;
  endTime?: number;
  completed: boolean;
}

export interface QuizAnswer {
  questionId: number;
  userAnswer: number | string;
  correct: boolean;
  timeSpent: number; // in seconds
  timestamp: string;
}

export interface QuizResult {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  totalTime: number; // in minutes
  topicBreakdown: {
    [topic: string]: {
      total: number;
      correct: number;
      accuracy: number;
    };
  };
  difficultyBreakdown: {
    [difficulty: string]: {
      total: number;
      correct: number;
      accuracy: number;
    };
  };
}

export interface AdaptiveLearningData {
  userId: number;
  currentDifficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  masteredTopics: string[];
  strugglingTopics: string[];
  recommendedQuestions: number[];
  lastAssessment: string;
}