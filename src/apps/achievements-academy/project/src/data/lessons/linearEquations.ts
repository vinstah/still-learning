import { Lesson } from '../../types/index';

export const linearEquationsLessons: Lesson[] = [
  // Linear Equations
  {
    id: 'math-y8-l1',
    title: 'Linear Equations',
    description: 'Solving equations with one variable',
    duration: 70,
    difficulty: 'intermediate',
    content: [
      {
        type: 'text',
        content: 'A linear equation has an equals sign and contains variables to the first power only. To solve equations, we use inverse operations to isolate the variable.'
      },
      {
        type: 'question',
        content: 'Solve for x: 3x - 8 = 16',
        options: ['x = 6', 'x = 8', 'x = 10', 'x = 12'],
        correctAnswer: 'x = 8',
        explanation: 'Add 8 to both sides: 3x = 24. Then divide both sides by 3: x = 8.'
      },
      {
        type: 'question',
        content: 'Solve for y: 2y + 5 = 17',
        options: ['y = 5', 'y = 6', 'y = 7', 'y = 11'],
        correctAnswer: 'y = 6',
        explanation: 'Subtract 5 from both sides: 2y = 12. Divide by 2: y = 6.'
      },
      {
        type: 'question',
        content: 'Solve for z: z/4 = 7',
        options: ['z = 3', 'z = 11', 'z = 28', 'z = 1.75'],
        correctAnswer: 'z = 28',
        explanation: 'Multiply both sides by 4: z = 7 × 4 = 28.'
      }
    ]
  }
]; 