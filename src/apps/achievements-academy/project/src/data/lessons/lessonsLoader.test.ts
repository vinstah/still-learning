import { describe, it, expect } from 'vitest';
import { getAllMathLessons, getMathLessonById } from '../lessons';

// Test suite for the new lessons loader

describe('Math Lessons Loader', () => {
  it('should load all math lessons from all topics', () => {
    const lessons = getAllMathLessons();
    expect(Array.isArray(lessons)).toBe(true);
    expect(lessons.length).toBeGreaterThan(0);
    // Check that at least one lesson from each topic exists
    const topics = [
      'Counting to 20',
      'Multiplication Tables',
      'Understanding Fractions',
      'Area and Perimeter',
      'Decimal Numbers',
      'Ratios and Proportions',
      'Algebraic Expressions',
      'Linear Equations',
      'Quadratic Functions',
      'Trigonometry',
      'Calculus - Limits',
    ];
    for (const topic of topics) {
      expect(lessons.some(l => l.title === topic)).toBe(true);
    }
  });

  it('should retrieve a lesson by id', () => {
    const lessons = getAllMathLessons();
    const sample = lessons[0];
    const found = getMathLessonById(sample.id);
    expect(found).toBeDefined();
    expect(found?.id).toBe(sample.id);
  });

  it('should return undefined for a non-existent lesson id', () => {
    const found = getMathLessonById('non-existent-id');
    expect(found).toBeUndefined();
  });
}); 