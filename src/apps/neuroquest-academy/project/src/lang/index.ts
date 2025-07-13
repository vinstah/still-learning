import { en } from './en';

export type Language = 'en';
export type TranslationKey = keyof typeof en;

const translations = {
  en
};

let currentLanguage: Language = 'en';

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
};

export const getCurrentLanguage = (): Language => currentLanguage;

// Type-safe translation function
export const t = (key: string): string => {
  const keys = key.split('.');
  let value: any = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key; // Return the key if translation is not found
    }
  }
  
  return typeof value === 'string' ? value : key;
};

// Helper function for array translations
export const tArray = (key: string): string[] => {
  const value = t(key);
  return Array.isArray(value) ? value : [];
};

// Helper function for object translations
export const tObject = (key: string): Record<string, any> => {
  const keys = key.split('.');
  let value: any = translations[currentLanguage];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return {};
    }
  }
  
  return typeof value === 'object' && !Array.isArray(value) ? value : {};
};

export { en };