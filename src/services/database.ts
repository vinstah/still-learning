import Dexie, { Table } from 'dexie';
import { UserProgress, Badge, Achievement } from '../types/user';

export interface LessonProgress {
  id?: number;
  userId: number;
  lessonId: string;
  completed: boolean;
  completedDate?: string;
  timeSpent: number;
  slides: SlideProgress[];
}

export interface SlideProgress {
  slideId: number;
  viewed: boolean;
  timeSpent: number;
}

export interface QuizResult {
  id?: number;
  userId: number;
  questionId: number;
  correct: boolean;
  timeSpent: number;
  timestamp: string;
}

export interface SyncStatus {
  id?: number;
  lastSync: string;
  pendingChanges: number;
  cloudEnabled: boolean;
}

class StillAppDatabase extends Dexie {
  userProgress!: Table<UserProgress>;
  lessonProgress!: Table<LessonProgress>;
  quizResults!: Table<QuizResult>;
  syncStatus!: Table<SyncStatus>;

  constructor() {
    super('StillAppDatabase');
    
    this.version(1).stores({
      userProgress: '++id, name, email, lastActivity',
      lessonProgress: '++id, userId, lessonId, completed',
      quizResults: '++id, userId, questionId, timestamp',
      syncStatus: '++id, lastSync'
    });
  }
}

export const db = new StillAppDatabase();

// Database operations
export class DatabaseService {
  static async getUserProgress(userId: number = 1): Promise<UserProgress | undefined> {
    return await db.userProgress.get(userId);
  }

  static async updateUserProgress(progress: UserProgress): Promise<void> {
    await db.userProgress.put(progress);
  }

  static async getLessonProgress(userId: number, lessonId: string): Promise<LessonProgress | undefined> {
    return await db.lessonProgress.where({ userId, lessonId }).first();
  }

  static async updateLessonProgress(progress: LessonProgress): Promise<void> {
    await db.lessonProgress.put(progress);
  }

  static async addQuizResult(result: QuizResult): Promise<void> {
    await db.quizResults.add(result);
  }

  static async getQuizResults(userId: number): Promise<QuizResult[]> {
    return await db.quizResults.where('userId').equals(userId).toArray();
  }

  static async getAllUserProgress(): Promise<UserProgress[]> {
    return await db.userProgress.toArray();
  }

  static async checkAndAwardBadges(userId: number): Promise<Badge[]> {
    const progress = await this.getUserProgress(userId);
    if (!progress) return [];

    const newBadges: Badge[] = [];
    const existingBadgeIds = progress.badges.filter(b => b.earned).map(b => b.id);

    // Define badge criteria
    const badgeCriteria = [
      {
        id: 'first-quiz',
        type: 'achievement' as const,
        title: 'First Steps',
        description: 'Complete your first quiz',
        criteria: { type: 'totalQuestions', value: 1 }
      },
      {
        id: 'quiz-master',
        type: 'mastery' as const,
        title: 'Quiz Master',
        description: 'Answer 50 questions correctly',
        criteria: { type: 'correctAnswers', value: 50 }
      },
      {
        id: 'speed-demon',
        type: 'speed' as const,
        title: 'Speed Demon',
        description: 'Complete 10 questions in under 5 minutes',
        criteria: { type: 'speed', value: 10 }
      },
      {
        id: 'lesson-complete',
        type: 'completion' as const,
        title: 'Lesson Complete',
        description: 'Complete your first lesson',
        criteria: { type: 'completedLessons', value: 1 }
      },
      {
        id: 'streak-5',
        type: 'streak' as const,
        title: '5-Day Streak',
        description: 'Study for 5 consecutive days',
        criteria: { type: 'streak', value: 5 }
      }
    ];

    for (const criteria of badgeCriteria) {
      if (existingBadgeIds.includes(criteria.id)) continue;

      let earned = false;
      const currentDate = new Date().toLocaleDateString();

      switch (criteria.criteria.type) {
        case 'totalQuestions':
          earned = progress.totalQuestions >= criteria.criteria.value;
          break;
        case 'correctAnswers':
          earned = progress.correctAnswers >= criteria.criteria.value;
          break;
        case 'completedLessons':
          earned = progress.completedLessons >= criteria.criteria.value;
          break;
        case 'streak':
          earned = progress.streak >= criteria.criteria.value;
          break;
      }

      if (earned) {
        const badge: Badge = {
          ...criteria,
          earned: true,
          earnedDate: currentDate
        };
        newBadges.push(badge);
      }
    }

    if (newBadges.length > 0) {
      progress.badges = [...progress.badges, ...newBadges];
      await this.updateUserProgress(progress);
    }

    return newBadges;
  }

  static async exportUserData(userId: number): Promise<string> {
    const progress = await this.getUserProgress(userId);
    const lessonProgress = await db.lessonProgress.where('userId').equals(userId).toArray();
    const quizResults = await this.getQuizResults(userId);

    const exportData = {
      userProgress: progress,
      lessonProgress,
      quizResults,
      exportDate: new Date().toISOString()
    };

    return JSON.stringify(exportData, null, 2);
  }
}