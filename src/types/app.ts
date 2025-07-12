export interface AppSettings {
  isDark: boolean;
  narrationEnabled: boolean;
  voiceInputEnabled: boolean;
}

export type ViewType = 'home' | 'lessons' | 'lesson' | 'quiz' | 'badges' | 'dashboard' | 'teacher' | 'settings';