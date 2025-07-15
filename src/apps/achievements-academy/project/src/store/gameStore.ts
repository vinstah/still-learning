import { create } from 'zustand';
import Dexie, { Table } from 'dexie';
import { supabase } from '../lib/supabase';

// Dexie setup
class GameDexie extends Dexie {
  tokens!: Table<{ id: string; value: number }>;
  experience!: Table<{ id: string; value: number }>;
  level!: Table<{ id: string; value: number }>;
  streak!: Table<{ id: string; value: number }>;
  marketplaceItems!: Table<{ id: string; items: any[] }>;

  constructor() {
    super('GameStoreDB');
    this.version(1).stores({
      tokens: 'id',
      experience: 'id',
      level: 'id',
      streak: 'id',
      marketplaceItems: 'id',
    });
  }
}

const db = new GameDexie();

// Helper functions for Dexie
const saveToDexie = async (key: 'tokens' | 'experience' | 'level' | 'streak', value: any) => {
  await db[key].put({ id: key, value });
};
const saveItemsToDexie = async (key: 'marketplaceItems', items: any[]) => {
  await db[key].put({ id: key, items });
};
const loadFromDexie = async (key: 'tokens' | 'experience' | 'level' | 'streak', defaultValue: any) => {
  const entry = await db[key].get(key);
  return entry ? entry.value : defaultValue;
};
const loadItemsFromDexie = async (key: 'marketplaceItems', defaultValue: any[]) => {
  const entry = await db[key].get(key);
  return entry ? entry.items : defaultValue;
};

// Supabase helpers
const updateTokensInSupabase = async (userId: string, tokens: number) => {
  await supabase
    .from('user_tokens')
    .upsert([
      { user_id: userId, tokens, updated_at: new Date().toISOString() }
    ], { onConflict: 'user_id' });
};
const fetchTokensFromSupabase = async (userId: string): Promise<number | null> => {
  const { data, error } = await supabase
    .from('user_tokens')
    .select('tokens')
    .eq('user_id', userId)
    .single();
  if (error || !data) return null;
  return data.tokens;
};

interface GameStore {
  user: any; // Replace with actual User type
  tokens: number;
  experience: number;
  level: number;
  streak: number;
  marketplaceItems: any[]; // Replace with actual MarketplaceItem type
  notifications: any[]; // Replace with actual Notification type
  isLoading: boolean;
  error: string | null;

  setUser: (user: any) => void;
  updateUserTokens: (tokens: number) => void;
  updateUserExperience: (experience: number) => void;
  updateUserStreak: (streak: number) => void;
  setMarketplaceItems: (items: any[]) => void;
  purchaseItem: (itemId: string) => void;
  addNotification: (notification: Omit<any, 'id'>) => void;
  markNotificationRead: (notificationId: string) => void;
  clearNotifications: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  hydrateFromDexie: () => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  user: null,
  tokens: 0,
  experience: 0,
  level: 1,
  streak: 0,
  marketplaceItems: [],
  notifications: [],
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  updateUserTokens: (tokens) => {
    const state = get();
    const newTokens = state.tokens + tokens;
    set({ tokens: newTokens });
    saveToDexie('tokens', newTokens);
    if (state.user && state.user.id) {
      updateTokensInSupabase(state.user.id, newTokens);
    }
  },

  updateUserExperience: (experience) => {
    const state = get();
    const newExp = state.experience + experience;
    const newLevel = Math.floor(newExp / 1000) + 1;
    set({
      experience: newExp,
      level: newLevel > state.level ? newLevel : state.level
    });
    saveToDexie('experience', newExp);
    saveToDexie('level', newLevel > state.level ? newLevel : state.level);
  },

  updateUserStreak: (streak) => {
    set({ streak });
    saveToDexie('streak', streak);
  },

  setMarketplaceItems: (items) => {
    set({ marketplaceItems: items });
    saveItemsToDexie('marketplaceItems', items);
  },

  purchaseItem: (itemId) => {
    const { tokens, marketplaceItems, updateUserTokens, addNotification } = get();
    const item = marketplaceItems.find(i => i.id === itemId);
    if (item && tokens >= item.price) {
      updateUserTokens(-item.price);
      addNotification({
        type: 'reward',
        title: 'Item Purchased!',
        message: `You bought ${item.name} for ${item.price} tokens!`,
        isRead: false,
        createdAt: new Date(),
        data: { item }
      });
    }
  },

  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      },
      ...state.notifications
    ].slice(0, 50)
  })),

  markNotificationRead: (notificationId) => set((state) => ({
    notifications: state.notifications.map(notif =>
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    )
  })),

  clearNotifications: () => set({ notifications: [] }),

  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  hydrateFromDexie: async () => {
    const state = get();
    const tokensLocal = await loadFromDexie('tokens', 0);
    let tokens = tokensLocal;
    if (state.user && state.user.id) {
      const tokensCloud = await fetchTokensFromSupabase(state.user.id);
      if (tokensCloud !== null) {
        // Use the higher of local/cloud value
        tokens = Math.max(tokensLocal, tokensCloud);
        // If local is higher, update cloud; if cloud is higher, update local
        if (tokensLocal > tokensCloud) {
          await updateTokensInSupabase(state.user.id, tokensLocal);
        } else if (tokensCloud > tokensLocal) {
          await saveToDexie('tokens', tokensCloud);
        }
      }
    }
    const experience = await loadFromDexie('experience', 0);
    const level = await loadFromDexie('level', 1);
    const streak = await loadFromDexie('streak', 0);
    const marketplaceItems = await loadItemsFromDexie('marketplaceItems', []);
    set({ tokens, experience, level, streak, marketplaceItems });
  }
})); 