import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'student' | 'teacher') => Promise<void>;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Mock authentication - in production, this would call your API
        const mockUser: User = {
          id: '1',
          name: 'John Doe',
          email,
          role: email.includes('teacher') ? 'teacher' : 'student',
          preferences: {
            dyslexiaFriendly: false,
            adhdFriendly: false,
            darkMode: false,
            textToSpeech: false,
          },
        };
        
        set({ user: mockUser, isAuthenticated: true });
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      register: async (name: string, email: string, password: string, role: 'student' | 'teacher') => {
        // Mock registration
        const mockUser: User = {
          id: Date.now().toString(),
          name,
          email,
          role,
          preferences: {
            dyslexiaFriendly: false,
            adhdFriendly: false,
            darkMode: false,
            textToSpeech: false,
          },
        };
        
        set({ user: mockUser, isAuthenticated: true });
      },
      
      updatePreferences: (preferences: Partial<User['preferences']>) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              preferences: { ...user.preferences, ...preferences },
            },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);