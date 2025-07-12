export interface UserProgress {
  id?: number;
  name: string;
  email?: string;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  lastActivity: string;
  currentQuestionIndex: number;
  completedLessons: number;
  totalLessons: number;
  badges: Badge[];
  achievements: Achievement[];
  streak: number;
  lastLoginDate: string;
}

export interface Badge {
  id: string;
  type: 'achievement' | 'progress' | 'mastery' | 'streak' | 'speed' | 'completion';
  title: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  criteria: {
    type: string;
    value: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  points: number;
  unlockedDate: string;
  category: string;
}