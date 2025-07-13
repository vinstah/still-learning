import { Achievement, User } from './types';

export function calculateStreak(lastActiveDate: string): number {
  const today = new Date();
  const lastActive = new Date(lastActiveDate);
  const diffTime = Math.abs(today.getTime() - lastActive.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= 1 ? 1 : 0; // Simplified streak calculation
}

export function checkAchievements(user: User): Achievement[] {
  const newAchievements: Achievement[] = [];
  
  // First lesson achievement
  const hasCompletedFirstLesson = Object.values(user.progress).some(subject =>
    Object.values(subject).some(level => level.completedLessons.length > 0)
  );
  
  if (hasCompletedFirstLesson && !user.achievements.some(a => a.id === 'first-lesson')) {
    newAchievements.push({
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Completed your first lesson!',
      icon: 'Trophy',
      unlockedAt: new Date().toISOString()
    });
  }
  
  // Streak achievements
  if (user.streak >= 7 && !user.achievements.some(a => a.id === 'week-streak')) {
    newAchievements.push({
      id: 'week-streak',
      title: 'Week Warrior',
      description: 'Maintained a 7-day learning streak!',
      icon: 'Fire',
      unlockedAt: new Date().toISOString()
    });
  }
  
  return newAchievements;
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function formatTimeSpent(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}