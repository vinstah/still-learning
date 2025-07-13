export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: LessonContent[];
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed?: boolean;
}

export interface LessonContent {
  type: 'text' | 'question' | 'exercise' | 'video' | 'interactive';
  content: string;
  options?: string[];
  correctAnswer?: string | number;
  explanation?: string;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  icon: string;
  description: string;
}

export interface YearLevel {
  year: number;
  lessons: Lesson[];
  examQuestions: ExamQuestion[];
  progress: number; // percentage completed
}

export interface ExamQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'short-answer' | 'essay' | 'calculation';
  options?: string[];
  correctAnswer: string;
  marks: number;
  explanation: string;
  topic: string;
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  examScores: { [examId: string]: number };
  totalProgress: number;
}

export interface NavigationState {
  currentSubject: string | null;
  currentYear: number | null;
  currentLesson: string | null;
}

export interface UserRole {
  id: string;
  userId: string;
  role: 'student' | 'teacher' | 'parent' | 'tutor';
  permissions: string[];
  createdAt: string;
}

export interface StudentConnection {
  id: string;
  teacherId: string;
  studentId: string;
  relationship: 'teacher' | 'parent' | 'tutor' | 'guardian';
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  acceptedAt?: string;
}

export interface StudentProgressSummary {
  studentId: string;
  studentName: string;
  studentEmail: string;
  totalLessonsCompleted: number;
  totalExamsTaken: number;
  averageExamScore: number;
  lastActivity: string;
  subjectProgress: {
    [subjectId: string]: {
      lessonsCompleted: number;
      totalLessons: number;
      averageScore: number;
      lastActivity: string;
    };
  };
}