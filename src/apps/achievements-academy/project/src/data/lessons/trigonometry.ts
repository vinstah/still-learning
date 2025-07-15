import { Lesson } from '../../types/index';

export const trigonometryLessons: Lesson[] = [
  // Trigonometry
  {
    id: 'math-y10-l1',
    title: 'Trigonometry',
    description: 'Introduction to sine, cosine, and tangent ratios',
    duration: 80,
    difficulty: 'advanced',
    content: [
      {
        type: 'text',
        content: 'Trigonometry studies the relationships between angles and sides in triangles. The three main ratios are: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent.'
      },
      {
        type: 'question',
        content: 'In a right triangle, if the opposite side is 3 and the hypotenuse is 5, what is sin θ?',
        options: ['3/4', '3/5', '4/5', '5/3'],
        correctAnswer: '3/5',
        explanation: 'sin θ = opposite/hypotenuse = 3/5. This is a 3-4-5 right triangle.'
      },
      {
        type: 'question',
        content: 'If cos θ = 4/5, what is the adjacent side when the hypotenuse is 10?',
        options: ['6', '8', '10', '12'],
        correctAnswer: '8',
        explanation: 'cos θ = adjacent/hypotenuse = 4/5. If hypotenuse = 10, then adjacent = (4/5) × 10 = 8.'
      }
    ]
  }
]; 