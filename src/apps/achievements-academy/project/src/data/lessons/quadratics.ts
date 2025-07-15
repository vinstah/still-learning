import { Lesson } from '../../types/index';

export const quadraticsLessons: Lesson[] = [
  // Quadratic Functions
  {
    id: 'math-y9-l1',
    title: 'Quadratic Functions',
    description: 'Understanding parabolas and quadratic equations',
    duration: 75,
    difficulty: 'advanced',
    content: [
      {
        type: 'text',
        content: 'A quadratic function has the form f(x) = ax² + bx + c, where a ≠ 0. The graph of a quadratic function is a parabola, which opens upward if a > 0 and downward if a < 0.'
      },
      {
        type: 'question',
        content: 'What is the vertex of the parabola y = x² - 4x + 3?',
        options: ['(2, -1)', '(2, 1)', '(-2, -1)', '(-2, 1)'],
        correctAnswer: '(2, -1)',
        explanation: 'For y = x² - 4x + 3, the x-coordinate of the vertex is -b/(2a) = -(-4)/(2×1) = 2. Substituting: y = 4 - 8 + 3 = -1. So the vertex is (2, -1).'
      },
      {
        type: 'question',
        content: 'Which way does the parabola y = -2x² + 3x - 1 open?',
        options: ['Upward', 'Downward', 'To the right', 'To the left'],
        correctAnswer: 'Downward',
        explanation: 'Since the coefficient of x² is -2 (negative), the parabola opens downward.'
      }
    ]
  }
]; 