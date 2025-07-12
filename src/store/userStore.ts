import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, Badge } from '../types/user';
import { physicsLessons } from '../data/lessons';
import { DatabaseService } from '../services/database';

const initialUserProgress: UserProgress = {
  id: 1,
  name: 'Student',
  totalQuestions: 0,
  correctAnswers: 0,
  timeSpent: 0,
  lastActivity: new Date().toLocaleDateString(),
  currentQuestionIndex: 0,
  completedLessons: 0,
  totalLessons: physicsLessons.length,
  badges: [],
  achievements: [],
  streak: 0,
  lastLoginDate: new Date().toLocaleDateString(),
};

interface UserState {
  userName: string;
  userProgress: UserProgress;
  completedLessons: string[];
  newBadges: Badge[];

  // Basic setters
  setUserName: (name: string) => void;
  setUserProgress: (progress: UserProgress) => void;
  setCompletedLessons: (lessons: string[]) => void;
  setNewBadges: (badges: Badge[]) => void;
  
  // Business logic methods
  handleNameSubmit: (tempName: string) => void;
  updateUserProgress: (updates: Partial<UserProgress>) => void;
  addCompletedLesson: (lessonId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userName: 'Student',
      userProgress: initialUserProgress,
      completedLessons: [],
      newBadges: [],

      setUserName: (name) => set({ userName: name }),
      setUserProgress: (progress) => {
        set({ userProgress: progress });
        // Sync with Dexie.js
        DatabaseService.updateUserProgress(progress);
      },
      setCompletedLessons: (lessons) => set({ completedLessons: lessons }),
      setNewBadges: (badges) => set({ newBadges: badges }),
      
      // Business logic methods
      handleNameSubmit: (tempName) => {
        if (tempName.trim()) {
          const name = tempName.trim();
          const updatedProgress = { ...get().userProgress, name };
          set({ 
            userName: name,
            userProgress: updatedProgress
          });
          // Sync with Dexie.js
          DatabaseService.updateUserProgress(updatedProgress);
        }
      },
      
      updateUserProgress: (updates) => {
        const updatedProgress = { ...get().userProgress, ...updates };
        set({ userProgress: updatedProgress });
        // Sync with Dexie.js
        DatabaseService.updateUserProgress(updatedProgress);
      },
      
      addCompletedLesson: (lessonId) => {
        const state = get();
        if (!state.completedLessons.includes(lessonId)) {
          const updatedProgress = {
            ...state.userProgress,
            completedLessons: state.userProgress.completedLessons + 1,
            lastActivity: new Date().toLocaleDateString()
          };
          set({
            completedLessons: [...state.completedLessons, lessonId],
            userProgress: updatedProgress
          });
          // Sync with Dexie.js
          DatabaseService.updateUserProgress(updatedProgress);
        }
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        userName: state.userName,
        userProgress: state.userProgress,
        completedLessons: state.completedLessons,
      }),
    }
  )
); 