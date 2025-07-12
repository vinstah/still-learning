export interface StudentRecord {
  id: string;
  name: string;
  email?: string;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  lastActivity: string;
  currentQuestionIndex?: number;
  completedLessons: number;
  totalLessons: number;
  badges: number;
  currentStreak?: number;
  averageAccuracy: number;
}