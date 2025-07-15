import { Lesson } from '../../types/index';

export const geometryLessons: Lesson[] = [
  // Area and Perimeter
  {
    id: 'math-y4-l2',
    title: 'Area and Perimeter',
    description: 'Finding the area and perimeter of rectangles',
    duration: 45,
    difficulty: 'intermediate',
    content: [
      {
        type: 'text',
        content: 'Area is the space inside a shape. For rectangles, area = length × width. Perimeter is the distance around the outside of a shape. For rectangles, perimeter = 2 × (length + width).'
      },
      {
        type: 'question',
        content: 'What is the area of a rectangle that is 6 cm long and 4 cm wide?',
        options: ['10 cm²', '20 cm²', '24 cm²', '26 cm²'],
        correctAnswer: '24 cm²',
        explanation: 'Area = length × width = 6 × 4 = 24 cm².'
      },
      {
        type: 'question',
        content: 'What is the perimeter of a rectangle that is 5 cm long and 3 cm wide?',
        options: ['8 cm', '15 cm', '16 cm', '18 cm'],
        correctAnswer: '16 cm',
        explanation: 'Perimeter = 2 × (length + width) = 2 × (5 + 3) = 2 × 8 = 16 cm.'
      },
      {
        type: 'question',
        content: 'A garden is 8 meters long and 5 meters wide. How much space does it cover?',
        options: ['13 m²', '26 m²', '40 m²', '45 m²'],
        correctAnswer: '40 m²',
        explanation: 'The space covered is the area: 8 × 5 = 40 square meters.'
      }
    ]
  }
]; 