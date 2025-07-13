import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'exam' | 'project' | 'skill';
  priority: 'low' | 'medium' | 'high';
  targetDate: Date;
  completed: boolean;
  completedAt?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface GoalsState {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  getGoalsByCategory: (category: Goal['category']) => Goal[];
  getUpcomingGoals: () => Goal[];
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set, get) => ({
      goals: [],
      
      addGoal: (goalData) => {
        const newGoal: Goal = {
          ...goalData,
          id: Date.now().toString(),
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        set((state) => ({
          goals: [...state.goals, newGoal],
        }));
      },
      
      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates, updatedAt: new Date() } : goal
          ),
        }));
      },
      
      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        }));
      },
      
      getGoalsByCategory: (category) => {
        return get().goals.filter((goal) => goal.category === category);
      },
      
      getUpcomingGoals: () => {
        const now = new Date();
        return get().goals
          .filter((goal) => !goal.completed && new Date(goal.targetDate) > now)
          .sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime());
      },
    }),
    {
      name: 'goals-storage',
    }
  )
);