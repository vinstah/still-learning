import { Topic } from '../types';

export const topics: Topic[] = [
  {
    id: 'linear-equations',
    title: 'Linear Equations',
    description: 'Master solving various forms of linear equations and inequalities',
    icon: 'line-chart',
    difficulty: 'beginner',
    color: '#8B5CF6', // Purple
  },
  {
    id: 'quadratic-functions',
    title: 'Quadratic Functions',
    description: 'Explore quadratic equations, factoring, and the quadratic formula',
    icon: 'function-square',
    difficulty: 'intermediate',
    color: '#0EA5E9', // Blue
  },
  {
    id: 'polynomials',
    title: 'Polynomials',
    description: 'Work with polynomial functions, operations, and factoring techniques',
    icon: 'wave-sine',
    difficulty: 'intermediate',
    color: '#10B981', // Green
  },
  {
    id: 'rational-expressions',
    title: 'Rational Expressions',
    description: 'Learn to simplify, multiply, divide, add, and subtract rational expressions',
    icon: 'divide',
    difficulty: 'advanced',
    color: '#F97316', // Orange
  },
  {
    id: 'exponential-functions',
    title: 'Exponential Functions',
    description: 'Understand exponential growth, decay, and applications',
    icon: 'trending-up',
    difficulty: 'intermediate',
    color: '#EC4899', // Pink
  },
  {
    id: 'logarithms',
    title: 'Logarithms',
    description: 'Master logarithmic functions, properties, and equations',
    icon: 'bar-chart',
    difficulty: 'advanced',
    color: '#F59E0B', // Amber
  },
];