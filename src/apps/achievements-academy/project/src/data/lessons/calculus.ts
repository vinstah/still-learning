import { Lesson } from '../../types/index';

export const calculusLessons: Lesson[] = [
  // Calculus - Limits
  {
    id: 'math-y11-l1',
    title: 'Calculus - Limits',
    description: 'Understanding the concept of limits and continuity',
    duration: 85,
    difficulty: 'advanced',
    content: [
      {
        type: 'text',
        content: 'A limit describes what happens to a function as the input approaches a particular value. We write lim(x→a) f(x) = L to mean that f(x) gets arbitrarily close to L as x gets close to a.'
      },
      {
        type: 'question',
        content: 'What is lim(x→2) (x² - 4)/(x - 2)?',
        options: ['0', '2', '4', 'undefined'],
        correctAnswer: '4',
        explanation: 'Factor the numerator: (x² - 4) = (x + 2)(x - 2). So the expression becomes (x + 2)(x - 2)/(x - 2) = x + 2. As x approaches 2, this approaches 2 + 2 = 4.'
      }
    ]
  },
  // Derivatives
  {
    id: 'math-y12-l1',
    title: 'Derivatives',
    description: 'Finding rates of change using differentiation',
    duration: 90,
    difficulty: 'advanced',
    content: [
      {
        type: 'text',
        content: 'The derivative of a function measures how fast the function is changing at any point. If f(x) = x², then f\'(x) = 2x, which tells us the slope of the tangent line at any point x.'
      },
      {
        type: 'question',
        content: 'What is the derivative of f(x) = 3x³ - 2x + 5?',
        options: ['9x² - 2', '9x² + 5', '3x² - 2x', 'x³ - x'],
        correctAnswer: '9x² - 2',
        explanation: 'Using the power rule: d/dx(3x³) = 9x², d/dx(-2x) = -2, d/dx(5) = 0. So f\'(x) = 9x² - 2.'
      }
    ]
  },
  // Integration
  {
    id: 'math-y13-l1',
    title: 'Integration',
    description: 'Finding areas under curves using integration',
    duration: 95,
    difficulty: 'advanced',
    content: [
      {
        type: 'text',
        content: 'Integration is the reverse of differentiation. The integral of a function gives us the area under its curve. The fundamental theorem of calculus connects derivatives and integrals.'
      },
      {
        type: 'question',
        content: 'What is ∫(2x + 3)dx?',
        options: ['x² + 3x + C', '2x² + 3x + C', 'x² + 3x', '2 + C'],
        correctAnswer: 'x² + 3x + C',
        explanation: 'Using the power rule for integration: ∫2x dx = x² and ∫3 dx = 3x. Don\'t forget the constant of integration C.'
      }
    ]
  }
]; 