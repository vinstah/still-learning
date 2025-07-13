export interface QuestionCard {
  id: string;
  title: string;
  content: string;
  difficulty: 'foundation' | 'building' | 'mastery';
  type: 'multiple-choice' | 'true-false' | 'step-by-step' | 'matching' | 'visual' | 'essay';
  options?: string[];
  correctAnswer?: string | string[];
  explanation: string;
  tags: string[];
  estimatedTime: number; // in minutes
  accommodations: string[];
  attachments: Attachment[];
  latex?: string;
  visualSupports: string[];
  createdAt: string;
  updatedAt: string;
  position: number;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'audio' | 'video' | 'document';
  url: string;
  size: number;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  questions: QuestionCard[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  topics: Topic[];
}

export const questionBank: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Visual math with step-by-step breakdowns',
    color: 'bg-blue-500',
    icon: 'Calculator',
    topics: []
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Hands-on exploration with clear explanations',
    color: 'bg-green-500',
    icon: 'FlaskConical',
    topics: []
  },
  {
    id: 'language-arts',
    name: 'Language Arts',
    description: 'Structured reading and writing support',
    color: 'bg-purple-500',
    icon: 'BookOpen',
    topics: []
  },
  {
    id: 'social-studies',
    name: 'Social Studies',
    description: 'Timeline and map-based learning',
    color: 'bg-amber-500',
    icon: 'Globe',
    topics: []
  },
  {
    id: 'life-skills',
    name: 'Life Skills',
    description: 'Practical daily living skills',
    color: 'bg-emerald-500',
    icon: 'Users',
    topics: []
  },
  {
    id: 'executive-function',
    name: 'Executive Function',
    description: 'Organization and self-regulation strategies',
    color: 'bg-indigo-500',
    icon: 'Brain',
    topics: []
  }
];