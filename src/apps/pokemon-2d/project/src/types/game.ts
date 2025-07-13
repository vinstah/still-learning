export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  experience: number;
  tokens: number;
  streak: number;
  lastLogin: Date;
  learningGoals: string[];
  achievements: Achievement[];
  friends: string[];
  createdAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  tokens: number;
}

export interface LearningActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // in minutes
  tokens: number;
  experience: number;
  content: ActivityContent;
  prerequisites?: string[];
}

export interface ActivityContent {
  type: 'quiz' | 'puzzle' | 'memory' | 'typing' | 'math';
  questions: Question[];
  timeLimit?: number;
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  points: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  requirements: ChallengeRequirement[];
  rewards: Reward[];
  startDate: Date;
  endDate: Date;
  participants: string[];
  isActive: boolean;
}

export interface ChallengeRequirement {
  type: 'complete_activities' | 'earn_tokens' | 'help_friends' | 'login_streak';
  target: number;
  current?: number;
}

export interface Reward {
  type: 'tokens' | 'experience' | 'item' | 'achievement';
  value: number;
  itemId?: string;
  achievementId?: string;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  description: string;
  category: 'avatar' | 'decoration' | 'powerup' | 'collectible';
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  isLimited: boolean;
  stock?: number;
}

export interface PlayerRoom {
  id: string;
  ownerId: string;
  name: string;
  decorations: RoomDecoration[];
  visitors: string[];
  isPublic: boolean;
}

export interface RoomDecoration {
  itemId: string;
  position: { x: number; y: number };
  rotation?: number;
}

export interface MultiplayerSession {
  id: string;
  type: 'collaborative' | 'competitive';
  activity: LearningActivity;
  players: SessionPlayer[];
  status: 'waiting' | 'active' | 'completed';
  createdAt: Date;
  maxPlayers: number;
}

export interface SessionPlayer {
  userId: string;
  username: string;
  avatar: string;
  score: number;
  isReady: boolean;
  progress: number;
}

export interface GameState {
  user: User | null;
  currentActivity: LearningActivity | null;
  multiplayerSession: MultiplayerSession | null;
  friends: User[];
  challenges: Challenge[];
  marketplaceItems: MarketplaceItem[];
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
}

export interface Notification {
  id: string;
  type: 'achievement' | 'friend_request' | 'challenge' | 'reward';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  data?: any;
}