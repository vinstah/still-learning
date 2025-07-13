export interface MathProblem {
  id: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  solution: string;
  answer: string | number;
  topicId: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface UserProgress {
  id?: number;
  userId: string;
  problemId: string;
  completed: boolean;
  attempts: number;
  lastAttemptDate: Date;
  score?: number;
}

export interface UserNote {
  id?: number;
  userId: string;
  topicId: string;
  content: string;
  color?: 'yellow' | 'blue' | 'green' | 'pink' | 'purple';
  createdAt: Date;
  updatedAt: Date;
  title?: string;
  position?: { x: number; y: number };
}

export interface ElementPosition {
  id: string;
  type: 'problem' | 'note' | 'calculator' | 'canvas' | 'pdf';
  position: { x: number; y: number };
  zIndex: number;
}

export interface WorkspaceState {
  elements: ElementPosition[];
  selectedElement: string | null;
}