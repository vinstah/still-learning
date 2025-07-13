import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProgressEntry {
  id: string;
  userId: string;
  date: Date;
  timeSpent: number; // in minutes
  cardsCreated: number;
  quizzesCompleted: number;
  quizScore?: number;
  subject?: string;
  activity: 'study' | 'quiz' | 'review' | 'create';
}

interface ProgressState {
  progress: ProgressEntry[];
  addProgressEntry: (entry: Omit<ProgressEntry, 'id'>) => void;
  getWeeklyProgress: () => Array<{
    timeSpent: number;
    cardsCreated: number;
    quizzesCompleted: number;
  }>;
  getSubjectProgress: () => Array<{
    subject: string;
    timeSpent: number;
    cardsCreated: number;
    averageScore: number;
  }>;
  getTotalStudyTime: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: [
        // Sample data for demonstration
        {
          id: '1',
          userId: 'current-user',
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          timeSpent: 45,
          cardsCreated: 3,
          quizzesCompleted: 2,
          quizScore: 85,
          subject: 'Physics',
          activity: 'study',
        },
        {
          id: '2',
          userId: 'current-user',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          timeSpent: 60,
          cardsCreated: 4,
          quizzesCompleted: 1,
          quizScore: 92,
          subject: 'Mathematics',
          activity: 'study',
        },
        {
          id: '3',
          userId: 'current-user',
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          timeSpent: 30,
          cardsCreated: 2,
          quizzesCompleted: 3,
          quizScore: 78,
          subject: 'Physics',
          activity: 'quiz',
        },
        {
          id: '4',
          userId: 'current-user',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          timeSpent: 75,
          cardsCreated: 5,
          quizzesCompleted: 1,
          quizScore: 88,
          subject: 'Chemistry',
          activity: 'study',
        },
        {
          id: '5',
          userId: 'current-user',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          timeSpent: 40,
          cardsCreated: 2,
          quizzesCompleted: 2,
          quizScore: 95,
          subject: 'Mathematics',
          activity: 'review',
        },
        {
          id: '6',
          userId: 'current-user',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          timeSpent: 55,
          cardsCreated: 3,
          quizzesCompleted: 1,
          quizScore: 82,
          subject: 'Physics',
          activity: 'study',
        },
        {
          id: '7',
          userId: 'current-user',
          date: new Date(),
          timeSpent: 35,
          cardsCreated: 2,
          quizzesCompleted: 2,
          quizScore: 90,
          subject: 'Chemistry',
          activity: 'quiz',
        },
      ],
      
      addProgressEntry: (entryData) => {
        const newEntry: ProgressEntry = {
          ...entryData,
          id: Date.now().toString(),
        };
        
        set((state) => ({
          progress: [...state.progress, newEntry],
        }));
      },
      
      getWeeklyProgress: () => {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay() + 1); // Start of week (Monday)
        weekStart.setHours(0, 0, 0, 0);
        
        const weekData = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(weekStart);
          date.setDate(weekStart.getDate() + i);
          
          const dayProgress = get().progress.filter(p => {
            const pDate = new Date(p.date);
            return pDate.toDateString() === date.toDateString();
          });
          
          return {
            timeSpent: dayProgress.reduce((acc, p) => acc + p.timeSpent, 0),
            cardsCreated: dayProgress.reduce((acc, p) => acc + p.cardsCreated, 0),
            quizzesCompleted: dayProgress.reduce((acc, p) => acc + p.quizzesCompleted, 0),
          };
        });
        
        return weekData;
      },
      
      getSubjectProgress: () => {
        const progress = get().progress;
        const subjectMap = new Map<string, {
          timeSpent: number;
          cardsCreated: number;
          scores: number[];
        }>();
        
        progress.forEach(p => {
          if (p.subject) {
            const existing = subjectMap.get(p.subject) || {
              timeSpent: 0,
              cardsCreated: 0,
              scores: [],
            };
            
            existing.timeSpent += p.timeSpent;
            existing.cardsCreated += p.cardsCreated;
            if (p.quizScore !== undefined) {
              existing.scores.push(p.quizScore);
            }
            
            subjectMap.set(p.subject, existing);
          }
        });
        
        return Array.from(subjectMap.entries()).map(([subject, data]) => ({
          subject,
          timeSpent: data.timeSpent,
          cardsCreated: data.cardsCreated,
          averageScore: data.scores.length > 0 
            ? data.scores.reduce((acc, score) => acc + score, 0) / data.scores.length 
            : 0,
        }));
      },
      
      getTotalStudyTime: () => {
        return get().progress.reduce((acc, p) => acc + p.timeSpent, 0);
      },
    }),
    {
      name: 'progress-storage',
    }
  )
);