export interface MathProblem {
  id: string;
  title: string;
  description: string;
  category: MathCategory;
  difficulty: Difficulty;
  xpReward: number;
  problem: string;
  solution: string;
  steps: ProblemStep[];
  hints: string[];
  requiredLevel: number;
}

export interface ProblemStep {
  id: string;
  description: string;
  equation?: string;
  explanation: string;
  isComplete: boolean;
}

export interface PlayerProgress {
  level: number;
  xp: number;
  xpToNext: number;
  completedProblems: string[];
  achievements: Achievement[];
  currentStreak: number;
  bestStreak: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  xpBonus: number;
}

export type MathCategory = 
  | 'calculus'
  | 'differential-equations'
  | 'linear-algebra'
  | 'complex-analysis'
  | 'statistics'
  | 'discrete-math';

export type Difficulty = 'apprentice' | 'adept' | 'expert' | 'master';

export interface GameState {
  currentProblem: MathProblem | null;
  currentStep: number;
  showHints: boolean;
  playerProgress: PlayerProgress;
  selectedCategory: MathCategory | null;
}