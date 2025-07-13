import Dexie, { Table } from 'dexie';
import { UserProgress, UserNote } from '../types';

export class AppDatabase extends Dexie {
  userProgress!: Table<UserProgress>;
  notes!: Table<UserNote>;

  constructor() {
    super('algebra_mastery_db');
    
    this.version(1).stores({
      userProgress: '++id, userId, problemId, completed, attempts',
      notes: '++id, userId, topicId, content, createdAt, updatedAt'
    });
  }
}

export const db = new AppDatabase();

// Helper functions for database operations
export const addNote = async (note: Omit<UserNote, 'id'>) => {
  return await db.notes.add(note);
};

export const updateNote = async (id: number, updates: Partial<UserNote>) => {
  return await db.notes.update(id, updates);
};

export const deleteNote = async (id: number) => {
  return await db.notes.delete(id);
};

export const updateProgress = async (progress: Omit<UserProgress, 'id'>) => {
  const existing = await db.userProgress
    .where({ userId: progress.userId, problemId: progress.problemId })
    .first();

  if (existing) {
    return await db.userProgress.update(existing.id, {
      ...progress,
      attempts: existing.attempts + 1
    });
  }

  return await db.userProgress.add({ ...progress, attempts: 1 });
};