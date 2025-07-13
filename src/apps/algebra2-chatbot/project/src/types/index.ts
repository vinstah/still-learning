export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  color: string;
}

export interface Problem {
  id: string;
  topicId: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hints: string[];
  steps?: string[];
}

export interface UserProgress {
  topicId: string;
  completed: number;
  total: number;
  lastAccessed: Date;
}