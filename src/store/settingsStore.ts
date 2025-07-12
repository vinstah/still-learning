import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppSettings } from '../types/app';

const initialAppSettings: AppSettings = {
  isDark: false,
  narrationEnabled: true,
  voiceInputEnabled: true,
};

interface SettingsState {
  appSettings: AppSettings;
  
  // Basic setter
  setAppSettings: (settings: AppSettings) => void;
  
  // Business logic methods
  toggleTheme: () => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      appSettings: initialAppSettings,
      
      setAppSettings: (settings) => set({ appSettings: settings }),
      
      toggleTheme: () => {
        const currentSettings = get().appSettings;
        set({ 
          appSettings: { ...currentSettings, isDark: !currentSettings.isDark }
        });
      },
      
      updateSettings: (updates) => {
        const currentSettings = get().appSettings;
        set({ 
          appSettings: { ...currentSettings, ...updates }
        });
      },
    }),
    {
      name: 'settings-store',
      partialize: (state) => ({ appSettings: state.appSettings }),
    }
  )
); 