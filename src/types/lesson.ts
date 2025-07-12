export interface Lesson {
  id: string;
  title: string;
  description: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  slides: LessonSlide[];
  quiz?: {
    questions: number[];
  };
}

export interface LessonSlide {
  id: number;
  title: string;
  content: string;
  image?: string;
  story?: string;
  concept: string;
  narrationText?: string;
}