import { Lesson } from '../../types/index';

export const algebraLessons: Lesson[] = [
  // Algebraic Expressions
  {
    id: 'math-y7-l1',
    title: 'Algebraic Expressions',
    description: 'Introduction to variables and simple algebraic expressions',
    duration: 65,
    difficulty: 'intermediate',
    content: [
      {
        type: 'text',
        content: 'In algebra, we use letters (like x or y) to represent unknown numbers. These are called variables. An expression like 3x + 5 means "3 times some number, plus 5".'
      },
      {
        type: 'question',
        content: 'If x = 4, what is the value of 2x + 7?',
        options: ['11', '15', '18', '22'],
        correctAnswer: '15',
        explanation: 'Substitute x = 4 into the expression: 2(4) + 7 = 8 + 7 = 15.'
      },
      {
        type: 'question',
        content: 'What is the value of 5y - 3 when y = 6?',
        options: ['27', '28', '30', '33'],
        correctAnswer: '27',
        explanation: 'Substitute y = 6: 5(6) - 3 = 30 - 3 = 27.'
      },
      {
        type: 'question',
        content: 'Simplify: 3x + 2x',
        options: ['5x', '6x', '5x²', '6x²'],
        correctAnswer: '5x',
        explanation: 'When adding like terms: 3x + 2x = (3 + 2)x = 5x.'
      }
    ]
  }
]; 