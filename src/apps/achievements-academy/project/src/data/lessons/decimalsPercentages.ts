import { Lesson } from '../../types/index';

export const decimalsPercentagesLessons: Lesson[] = [
  // Decimal Numbers
  {
    id: 'math-y5-l1',
    title: 'Decimal Numbers',
    description: 'Introduction to decimal places and decimal notation',
    duration: 55,
    difficulty: 'intermediate',
    content: [
      {
        type: 'text',
        content: 'Decimals are another way to write fractions. The decimal point separates whole numbers from parts of numbers. For example, 0.5 is the same as 1/2, and 0.25 is the same as 1/4.'
      },
      {
        type: 'question',
        content: 'Which decimal is equivalent to the fraction 3/4?',
        options: ['0.34', '0.75', '0.43', '3.4'],
        correctAnswer: '0.75',
        explanation: '3/4 = 3 ÷ 4 = 0.75. You can also think of it as 75/100 or 75 hundredths.'
      },
      {
        type: 'question',
        content: 'What is 0.6 + 0.3?',
        options: ['0.9', '0.63', '0.36', '6.3'],
        correctAnswer: '0.9',
        explanation: 'Add the decimal parts: 0.6 + 0.3 = 0.9. Think of it as 6 tenths + 3 tenths = 9 tenths.'
      },
      {
        type: 'question',
        content: 'Which number is bigger: 0.7 or 0.07?',
        options: ['0.7', '0.07', 'They are equal', 'Cannot tell'],
        correctAnswer: '0.7',
        explanation: '0.7 is 7 tenths, while 0.07 is 7 hundredths. 7 tenths is much bigger than 7 hundredths.'
      },
      {
        type: 'question',
        content: 'What is 1.5 + 2.3?',
        options: ['3.8', '4.8', '3.5', '2.8'],
        correctAnswer: '3.8',
        explanation: 'Add the whole numbers: 1 + 2 = 3. Add the decimal parts: 0.5 + 0.3 = 0.8. Total: 3.8.'
      }
    ]
  },
  // Percentages
  {
    id: 'math-y5-l2',
    title: 'Percentages',
    description: 'Understanding percentages as parts of 100',
    duration: 50,
    difficulty: 'intermediate',
    content: [
      {
        type: 'text',
        content: 'Percent means "out of 100". So 25% means 25 out of 100, which is the same as 25/100 or 0.25. Percentages help us compare parts of different wholes.'
      },
      {
        type: 'question',
        content: 'What percentage is equivalent to 1/2?',
        options: ['25%', '50%', '75%', '100%'],
        correctAnswer: '50%',
        explanation: '1/2 = 50/100 = 50%. Half of something is always 50%.'
      },
      {
        type: 'question',
        content: 'If 20 out of 100 students wear glasses, what percentage wear glasses?',
        options: ['2%', '20%', '80%', '200%'],
        correctAnswer: '20%',
        explanation: '20 out of 100 = 20%. Percent means "out of 100".'
      },
      {
        type: 'question',
        content: 'What is 25% of 80?',
        options: ['15', '20', '25', '30'],
        correctAnswer: '20',
        explanation: '25% = 1/4. So 25% of 80 = 80 ÷ 4 = 20.'
      }
    ]
  }
]; 