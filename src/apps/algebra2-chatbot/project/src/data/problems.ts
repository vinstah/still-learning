import { Problem } from '../types';

export const problems: Problem[] = [
  {
    id: 'linear-eq-1',
    topicId: 'linear-equations',
    question: 'Solve for x: 2x + 5 = 13',
    correctAnswer: 'x = 4',
    explanation: 'To solve, subtract 5 from both sides, then divide by 2.',
    hints: ['Isolate the variable by moving constants to the other side', 'Remember to divide by the coefficient of x'],
    steps: [
      '2x + 5 = 13',
      '2x = 13 - 5',
      '2x = 8',
      'x = 8 ÷ 2',
      'x = 4'
    ]
  },
  {
    id: 'quad-eq-1',
    topicId: 'quadratic-functions',
    question: 'Solve the quadratic equation: x² - 5x + 6 = 0',
    correctAnswer: 'x = 2, x = 3',
    explanation: 'Factor the expression and set each factor equal to zero.',
    hints: ['Look for factors of 6 that add up to -5', 'Try using (x-a)(x-b) format'],
    steps: [
      'x² - 5x + 6 = 0',
      '(x - 2)(x - 3) = 0',
      'x - 2 = 0 or x - 3 = 0',
      'x = 2 or x = 3'
    ]
  },
  {
    id: 'poly-1',
    topicId: 'polynomials',
    question: 'Factor completely: 2x³ - 2x² - 12x',
    correctAnswer: '2x(x² - x - 6) = 2x(x - 3)(x + 2)',
    explanation: 'First factor out the GCF, then factor the remaining quadratic expression.',
    hints: ['Find the greatest common factor first', 'Then factor the remaining quadratic expression'],
    steps: [
      '2x³ - 2x² - 12x',
      '2x(x² - x - 6)',
      '2x(x² - x - 6)',
      '2x(x - 3)(x + 2)'
    ]
  },
  {
    id: 'rational-1',
    topicId: 'rational-expressions',
    question: 'Simplify: (x² - 9) / (x - 3)',
    correctAnswer: 'x + 3, x ≠ 3',
    explanation: 'Factor the numerator and cancel common terms with the denominator.',
    hints: ['Factor the difference of squares in the numerator', 'Remember to state the restriction'],
    steps: [
      '(x² - 9) / (x - 3)',
      '((x - 3)(x + 3)) / (x - 3)',
      'x + 3, where x ≠ 3'
    ]
  },
  {
    id: 'exp-1',
    topicId: 'exponential-functions',
    question: 'Solve for x: 2^x = 32',
    correctAnswer: 'x = 5',
    explanation: 'Express 32 as a power of 2, then solve the equation.',
    hints: ['Convert 32 to a power of 2', 'Remember that 2^5 = 32'],
    steps: [
      '2^x = 32',
      '2^x = 2^5',
      'x = 5'
    ]
  },
  {
    id: 'log-1',
    topicId: 'logarithms',
    question: 'Solve for x: log₃(x + 1) = 2',
    correctAnswer: 'x = 8',
    explanation: 'Apply the definition of logarithm to convert to exponential form.',
    hints: ['Convert to exponential form: if log₃(x + 1) = 2, then x + 1 = 3²', 'Solve for x'],
    steps: [
      'log₃(x + 1) = 2',
      'x + 1 = 3²',
      'x + 1 = 9',
      'x = 8'
    ]
  }
];