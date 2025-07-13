export interface ColorTheme {
  name: string;
  colors: {
    // Primary colors
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    // Secondary colors
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    // Accent colors
    accent: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    // Status colors
    success: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    warning: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    error: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    // Neutral colors
    neutral: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  };
  // Gradient combinations
  gradients: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    background: string;
    header: string;
  };
  // Subject-specific themes
  subjects: {
    mathematics: {
      gradient: string;
      headerGradient: string;
      border: string;
      emoji: string;
      title: string;
    };
    english: {
      gradient: string;
      headerGradient: string;
      border: string;
      emoji: string;
      title: string;
    };
  };
}

// Default Fantasy Theme (Current)
export const fantasyTheme: ColorTheme = {
  name: 'Fantasy Adventure',
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    accent: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  gradients: {
    primary: 'from-blue-600 to-indigo-700',
    secondary: 'from-cyan-600 to-blue-700',
    accent: 'from-purple-600 to-violet-700',
    success: 'from-emerald-600 to-green-700',
    warning: 'from-amber-500 to-orange-600',
    error: 'from-red-500 to-pink-600',
    background: 'from-slate-50 via-blue-50 to-indigo-50',
    header: 'from-slate-800 via-slate-700 to-slate-800',
  },
  subjects: {
    mathematics: {
      gradient: 'from-blue-100 via-cyan-100 to-teal-100',
      headerGradient: 'from-blue-600 via-cyan-600 to-teal-600',
      border: 'border-blue-400',
      emoji: '🔢',
      title: 'Mathematics Realm',
    },
    english: {
      gradient: 'from-green-100 via-emerald-100 to-lime-100',
      headerGradient: 'from-green-600 via-emerald-600 to-lime-600',
      border: 'border-green-400',
      emoji: '📚',
      title: 'English Kingdom',
    },
  },
};

// Ocean Theme
export const oceanTheme: ColorTheme = {
  name: 'Ocean Adventure',
  colors: {
    primary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    secondary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    accent: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  gradients: {
    primary: 'from-cyan-600 to-teal-700',
    secondary: 'from-teal-600 to-emerald-700',
    accent: 'from-sky-600 to-blue-700',
    success: 'from-emerald-600 to-green-700',
    warning: 'from-amber-500 to-orange-600',
    error: 'from-red-500 to-pink-600',
    background: 'from-cyan-50 via-teal-50 to-blue-50',
    header: 'from-cyan-800 via-teal-700 to-blue-800',
  },
  subjects: {
    mathematics: {
      gradient: 'from-cyan-100 via-teal-100 to-blue-100',
      headerGradient: 'from-cyan-600 via-teal-600 to-blue-600',
      border: 'border-cyan-400',
      emoji: '🌊',
      title: 'Mathematics Ocean',
    },
    english: {
      gradient: 'from-teal-100 via-emerald-100 to-green-100',
      headerGradient: 'from-teal-600 via-emerald-600 to-green-600',
      border: 'border-teal-400',
      emoji: '🐚',
      title: 'English Lagoon',
    },
  },
};

// Forest Theme
export const forestTheme: ColorTheme = {
  name: 'Forest Quest',
  colors: {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    secondary: {
      50: '#f7fee7',
      100: '#ecfccb',
      200: '#d9f99d',
      300: '#bef264',
      400: '#a3e635',
      500: '#84cc16',
      600: '#65a30d',
      700: '#4d7c0f',
      800: '#3f6212',
      900: '#365314',
    },
    accent: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
    },
  },
  gradients: {
    primary: 'from-green-600 to-emerald-700',
    secondary: 'from-lime-600 to-green-700',
    accent: 'from-yellow-500 to-amber-600',
    success: 'from-emerald-600 to-green-700',
    warning: 'from-amber-500 to-orange-600',
    error: 'from-red-500 to-pink-600',
    background: 'from-green-50 via-emerald-50 to-lime-50',
    header: 'from-green-800 via-emerald-700 to-lime-800',
  },
  subjects: {
    mathematics: {
      gradient: 'from-green-100 via-emerald-100 to-teal-100',
      headerGradient: 'from-green-600 via-emerald-600 to-teal-600',
      border: 'border-green-400',
      emoji: '🌲',
      title: 'Mathematics Forest',
    },
    english: {
      gradient: 'from-lime-100 via-green-100 to-emerald-100',
      headerGradient: 'from-lime-600 via-green-600 to-emerald-600',
      border: 'border-lime-400',
      emoji: '🍃',
      title: 'English Grove',
    },
  },
};

// Sunset Theme
export const sunsetTheme: ColorTheme = {
  name: 'Sunset Magic',
  colors: {
    primary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
    secondary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    },
    accent: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
    },
  },
  gradients: {
    primary: 'from-pink-600 to-rose-700',
    secondary: 'from-orange-600 to-red-700',
    accent: 'from-yellow-500 to-orange-600',
    success: 'from-emerald-600 to-green-700',
    warning: 'from-amber-500 to-orange-600',
    error: 'from-red-500 to-pink-600',
    background: 'from-pink-50 via-orange-50 to-yellow-50',
    header: 'from-pink-800 via-orange-700 to-red-800',
  },
  subjects: {
    mathematics: {
      gradient: 'from-pink-100 via-orange-100 to-yellow-100',
      headerGradient: 'from-pink-600 via-orange-600 to-yellow-600',
      border: 'border-pink-400',
      emoji: '🌅',
      title: 'Mathematics Sunset',
    },
    english: {
      gradient: 'from-orange-100 via-red-100 to-pink-100',
      headerGradient: 'from-orange-600 via-red-600 to-pink-600',
      border: 'border-orange-400',
      emoji: '🌇',
      title: 'English Twilight',
    },
  },
};

// Available themes
export const themes = {
  fantasy: fantasyTheme,
  ocean: oceanTheme,
  forest: forestTheme,
  sunset: sunsetTheme,
};

// Default theme
export const currentTheme = oceanTheme;

// Theme utility functions
export const getThemeColors = (theme: ColorTheme = currentTheme) => theme.colors;
export const getThemeGradients = (theme: ColorTheme = currentTheme) => theme.gradients;
export const getSubjectTheme = (subjectId: string, theme: ColorTheme = currentTheme) => {
  return theme.subjects[subjectId as keyof typeof theme.subjects] || theme.subjects.mathematics;
};