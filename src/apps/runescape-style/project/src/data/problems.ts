import { MathProblem, Achievement } from '../types';

export const mathProblems: MathProblem[] = [
  {
    id: 'calc-001',
    title: 'The Wizard\'s Rate of Change',
    description: 'A wizard\'s mana pool changes over time. Find the rate at which mana regenerates.',
    category: 'calculus',
    difficulty: 'apprentice',
    xpReward: 50,
    requiredLevel: 1,
    problem: 'If a wizard\'s mana M(t) = 3t² + 2t + 10, find dM/dt at t = 5 seconds.',
    solution: '32 mana per second',
    steps: [
      {
        id: 'step-1',
        description: 'Identify the function to differentiate',
        equation: 'M(t) = 3t² + 2t + 10',
        explanation: 'We have a polynomial function representing mana over time.',
        isComplete: false
      },
      {
        id: 'step-2',
        description: 'Apply the power rule to each term',
        equation: 'dM/dt = 6t + 2',
        explanation: 'The derivative of 3t² is 6t, derivative of 2t is 2, and the constant 10 becomes 0.',
        isComplete: false
      },
      {
        id: 'step-3',
        description: 'Substitute t = 5',
        equation: 'dM/dt|_{t=5} = 6(5) + 2 = 32',
        explanation: 'At t = 5 seconds, the mana regenerates at 32 units per second.',
        isComplete: false
      }
    ],
    hints: [
      'Remember the power rule: d/dx(x^n) = nx^(n-1)',
      'The derivative of a constant is always zero',
      'Don\'t forget to substitute the given value of t'
    ]
  },
  {
    id: 'calc-002',
    title: 'Dragon\'s Projectile Motion',
    description: 'A dragon breathes fire in an arc. Calculate the maximum height of the flame.',
    category: 'calculus',
    difficulty: 'adept',
    xpReward: 75,
    requiredLevel: 3,
    problem: 'A dragon\'s fire follows the path h(t) = -16t² + 64t + 80. Find the maximum height.',
    solution: '144 feet',
    steps: [
      {
        id: 'step-1',
        description: 'Find the derivative to locate critical points',
        equation: 'h\'(t) = -32t + 64',
        explanation: 'The derivative tells us the rate of change of height.',
        isComplete: false
      },
      {
        id: 'step-2',
        description: 'Set the derivative equal to zero',
        equation: '-32t + 64 = 0',
        explanation: 'Critical points occur where the derivative equals zero.',
        isComplete: false
      },
      {
        id: 'step-3',
        description: 'Solve for t',
        equation: 't = 2 seconds',
        explanation: 'The flame reaches its peak at t = 2 seconds.',
        isComplete: false
      },
      {
        id: 'step-4',
        description: 'Calculate the maximum height',
        equation: 'h(2) = -16(4) + 64(2) + 80 = 144',
        explanation: 'The maximum height is 144 feet above the ground.',
        isComplete: false
      }
    ],
    hints: [
      'For quadratic functions, the maximum occurs at the vertex',
      'Set the first derivative equal to zero to find critical points',
      'Use the second derivative test to confirm it\'s a maximum'
    ]
  },
  {
    id: 'linalg-001',
    title: 'The Enchanted Matrix Spell',
    description: 'Decode an ancient spell matrix to unlock powerful magic.',
    category: 'linear-algebra',
    difficulty: 'adept',
    xpReward: 85,
    requiredLevel: 5,
    problem: 'Find the determinant of the spell matrix: [[2, -1, 3], [1, 0, 4], [-1, 2, 1]]',
    solution: '-25',
    steps: [
      {
        id: 'step-1',
        description: 'Set up the 3×3 determinant calculation',
        equation: '|A| = 2|0  4|  - (-1)|1  4|  + 3|1   0|',
        explanation: 'Expand along the first row using cofactor expansion.',
        isComplete: false
      },
      {
        id: 'step-2',
        description: 'Calculate each 2×2 determinant',
        equation: '|0  4| = -8,  |1  4| = -7,  |1  0| = 2',
        explanation: 'For 2×2 matrices, determinant = ad - bc.',
        isComplete: false
      },
      {
        id: 'step-3',
        description: 'Substitute and compute',
        equation: '|A| = 2(-8) + 1(-7) + 3(2) = -16 - 7 - 6 = -25',
        explanation: 'The determinant reveals the spell\'s power level.',
        isComplete: false
      }
    ],
    hints: [
      'Use cofactor expansion along the first row',
      'Remember to alternate signs: +, -, +',
      'For 2×2 determinants: ad - bc'
    ]
  },
  {
    id: 'diff-001',
    title: 'The Alchemist\'s Reaction',
    description: 'Model a magical chemical reaction that changes exponentially over time.',
    category: 'differential-equations',
    difficulty: 'expert',
    xpReward: 120,
    requiredLevel: 8,
    problem: 'Solve the differential equation dy/dt = 3y with initial condition y(0) = 2.',
    solution: 'y = 2e^(3t)',
    steps: [
      {
        id: 'step-1',
        description: 'Identify the type of differential equation',
        equation: 'dy/dt = 3y',
        explanation: 'This is a first-order linear homogeneous ODE.',
        isComplete: false
      },
      {
        id: 'step-2',
        description: 'Separate variables',
        equation: 'dy/y = 3dt',
        explanation: 'Move all y terms to one side and t terms to the other.',
        isComplete: false
      },
      {
        id: 'step-3',
        description: 'Integrate both sides',
        equation: 'ln|y| = 3t + C',
        explanation: 'The integral of 1/y is ln|y|, and the integral of 3 is 3t.',
        isComplete: false
      },
      {
        id: 'step-4',
        description: 'Solve for y',
        equation: 'y = Ae^(3t)',
        explanation: 'Exponentiating both sides gives us the general solution.',
        isComplete: false
      },
      {
        id: 'step-5',
        description: 'Apply initial condition',
        equation: '2 = Ae^0 = A, so y = 2e^(3t)',
        explanation: 'Using y(0) = 2, we find A = 2.',
        isComplete: false
      }
    ],
    hints: [
      'This is a separable differential equation',
      'Remember that the integral of 1/y is ln|y|',
      'Use the initial condition to find the constant'
    ]
  }
];

export const achievements: Achievement[] = [
  {
    id: 'first-problem',
    title: 'Apprentice Scholar',
    description: 'Complete your first magical mathematics problem',
    icon: '🎓',
    xpBonus: 25
  },
  {
    id: 'calculus-master',
    title: 'Master of Calculus',
    description: 'Complete 5 calculus problems',
    icon: '📈',
    xpBonus: 100
  },
  {
    id: 'streak-5',
    title: 'Consistent Caster',
    description: 'Solve 5 problems in a row without hints',
    icon: '🔥',
    xpBonus: 75
  },
  {
    id: 'level-10',
    title: 'Mathematical Wizard',
    description: 'Reach level 10',
    icon: '🧙‍♂️',
    xpBonus: 200
  },
  {
    id: 'all-categories',
    title: 'Omniscient Scholar',
    description: 'Complete problems in all mathematical disciplines',
    icon: '🌟',
    xpBonus: 300
  }
];