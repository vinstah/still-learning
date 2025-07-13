import { create } from 'zustand';
import { GameState, User, LearningActivity, Challenge, MarketplaceItem, Notification } from '../types/game';

interface GameStore extends GameState {
  // User actions
  setUser: (user: User) => void;
  updateUserTokens: (tokens: number) => void;
  updateUserExperience: (experience: number) => void;
  updateUserStreak: (streak: number) => void;
  
  // Activity actions
  setCurrentActivity: (activity: LearningActivity | null) => void;
  completeActivity: (activityId: string, score: number) => void;
  
  // Challenge actions
  setChallenges: (challenges: Challenge[]) => void;
  updateChallengeProgress: (challengeId: string, progress: any) => void;
  
  // Marketplace actions
  setMarketplaceItems: (items: MarketplaceItem[]) => void;
  purchaseItem: (itemId: string) => void;
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markNotificationRead: (notificationId: string) => void;
  clearNotifications: () => void;
  
  // UI actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  user: null,
  currentActivity: null,
  multiplayerSession: null,
  friends: [],
  challenges: [],
  marketplaceItems: [],
  notifications: [],
  isLoading: false,
  error: null,

  // User actions
  setUser: (user) => set({ user }),
  
  updateUserTokens: (tokens) => set((state) => ({
    user: state.user ? { ...state.user, tokens: state.user.tokens + tokens } : null
  })),
  
  updateUserExperience: (experience) => set((state) => {
    if (!state.user) return state;
    
    const newExp = state.user.experience + experience;
    const newLevel = Math.floor(newExp / 1000) + 1;
    
    return {
      user: {
        ...state.user,
        experience: newExp,
        level: newLevel > state.user.level ? newLevel : state.user.level
      }
    };
  }),
  
  updateUserStreak: (streak) => set((state) => ({
    user: state.user ? { ...state.user, streak } : null
  })),

  // Activity actions
  setCurrentActivity: (activity) => set({ currentActivity: activity }),
  
  completeActivity: (activityId, score) => {
    const { currentActivity, updateUserTokens, updateUserExperience, addNotification } = get();
    
    if (currentActivity && currentActivity.id === activityId) {
      const tokensEarned = Math.floor(currentActivity.tokens * (score / 100));
      const expEarned = Math.floor(currentActivity.experience * (score / 100));
      
      updateUserTokens(tokensEarned);
      updateUserExperience(expEarned);
      
      addNotification({
        type: 'reward',
        title: 'Activity Completed!',
        message: `You earned ${tokensEarned} tokens and ${expEarned} XP!`,
        isRead: false,
        createdAt: new Date(),
        data: { tokens: tokensEarned, experience: expEarned }
      });
      
      set({ currentActivity: null });
    }
  },

  // Challenge actions
  setChallenges: (challenges) => set({ challenges }),
  
  updateChallengeProgress: (challengeId, progress) => set((state) => ({
    challenges: state.challenges.map(challenge =>
      challenge.id === challengeId
        ? { ...challenge, requirements: challenge.requirements.map(req => ({ ...req, current: progress[req.type] || req.current })) }
        : challenge
    )
  })),

  // Marketplace actions
  setMarketplaceItems: (items) => set({ marketplaceItems: items }),
  
  purchaseItem: (itemId) => {
    const { user, marketplaceItems, updateUserTokens, addNotification } = get();
    const item = marketplaceItems.find(i => i.id === itemId);
    
    if (user && item && user.tokens >= item.price) {
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

  // Notification actions
  addNotification: (notification) => set((state) => ({
    notifications: [
      {
        ...notification,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      },
      ...state.notifications
    ].slice(0, 50) // Keep only last 50 notifications
  })),
  
  markNotificationRead: (notificationId) => set((state) => ({
    notifications: state.notifications.map(notif =>
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    )
  })),
  
  clearNotifications: () => set({ notifications: [] }),

  // UI actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));