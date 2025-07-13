export interface LearningCard {
  id: string;
  title: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  content: CardContent;
  quiz: Quiz;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  versions: CardVersion[];
  estimatedTime: number; // minutes
  prerequisites: string[];
  learningObjectives: string[];
  isPublished: boolean;
  authorId?: string;
}

export interface CardContent {
  explanation: string;
  visualMetaphors: string[];
  memoryHooks: string[];
  diagrams?: DiagramData[];
  mnemonics?: string[];
  keyFormulas?: Formula[];
  realWorldExamples?: string[];
  commonMisconceptions?: string[];
}

export interface DiagramData {
  id: string;
  type: 'image' | 'svg' | 'interactive';
  url?: string;
  svgContent?: string;
  alt: string;
  caption?: string;
}

export interface Formula {
  id: string;
  latex: string;
  description: string;
  variables: Record<string, string>;
}

export interface Quiz {
  id: string;
  questions: Question[];
  attempts: QuizAttempt[];
  bestScore: number;
  averageScore: number;
  timeLimit?: number; // minutes
  passingScore: number;
  maxAttempts?: number;
  shuffleQuestions: boolean;
  showCorrectAnswers: boolean;
  allowReview: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: QuestionOption[];
  correctAnswer: string | string[] | number;
  hints: Hint[];
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  timeLimit?: number; // seconds
  media?: MediaContent[];
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface Hint {
  id: string;
  text: string;
  pointDeduction: number;
  unlockAfterAttempts: number;
}

export interface MediaContent {
  id: string;
  type: 'image' | 'video' | 'audio' | 'diagram';
  url: string;
  alt?: string;
  caption?: string;
}

export type QuestionType = 
  | 'multiple-choice'
  | 'multiple-select'
  | 'equation-input'
  | 'drag-drop'
  | 'written-response'
  | 'highlight-keywords'
  | 'diagram-label'
  | 'fraction-builder'
  | 'matching'
  | 'ordering'
  | 'fill-in-blank'
  | 'true-false'
  | 'numerical-input';

export interface QuizAttempt {
  id: string;
  timestamp: Date;
  score: number;
  maxScore: number;
  percentage: number;
  answers: Record<string, QuestionAnswer>;
  timeSpent: number; // seconds
  hintsUsed: string[];
  isCompleted: boolean;
  submittedAt?: Date;
}

export interface QuestionAnswer {
  questionId: string;
  answer: any;
  isCorrect: boolean;
  points: number;
  timeSpent: number;
  attempts: number;
  hintsUsed: string[];
}

export interface CardVersion {
  version: number;
  timestamp: Date;
  changes: string;
  content: CardContent;
  authorId?: string;
  changeType: 'major' | 'minor' | 'patch';
}

export interface LearningBoard {
  id: string;
  title: string;
  subject: string;
  description: string;
  cards: LearningCard[];
  createdAt: Date;
  updatedAt: Date;
  isTeacherMode: boolean;
  isPublic: boolean;
  authorId?: string;
  collaborators: string[];
  studentProgress?: StudentProgress[];
  settings: BoardSettings;
}

export interface BoardSettings {
  allowStudentEdits: boolean;
  requirePassingScore: boolean;
  showLeaderboard: boolean;
  enableDiscussion: boolean;
  autoAdvance: boolean;
  adaptiveDifficulty: boolean;
}

export interface StudentProgress {
  studentId: string;
  studentName: string;
  email?: string;
  enrolledAt: Date;
  lastActivity: Date;
  cardProgress: Record<string, CardProgress>;
  overallProgress: number;
  timeSpent: number;
  achievements: Achievement[];
}

export interface CardProgress {
  cardId: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'mastered';
  completed: boolean;
  bestScore: number;
  attempts: number;
  lastAttempt: Date;
  timeSpent: number;
  masteryLevel: number; // 0-100
}

export interface Achievement {
  id: string;
  type: 'streak' | 'score' | 'completion' | 'improvement' | 'speed';
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  points: number;
}

export interface ExamQuestion {
  id: string;
  subject: string;
  question: string;
  keyWords: string[];
  expectedFormulas: string[];
  answerStructure: string;
  commonMistakes: string[];
  decodingSteps: string[];
  markingCriteria: MarkingCriterion[];
  sampleAnswers: SampleAnswer[];
}

export interface MarkingCriterion {
  id: string;
  criterion: string;
  points: number;
  description: string;
}

export interface SampleAnswer {
  id: string;
  answer: string;
  grade: string;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  preferences: UserPreferences;
  createdAt: Date;
  lastLogin: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: NotificationSettings;
  accessibility: AccessibilitySettings;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  reminders: boolean;
  achievements: boolean;
  progress: boolean;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated?: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}