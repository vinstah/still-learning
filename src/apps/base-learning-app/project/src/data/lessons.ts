import { Lesson } from '../types';

export const lessons: { [key: string]: Lesson[] } = {
  'physics-grade-7': [
    {
      id: 'forces-intro',
      title: 'Introduction to Forces',
      subject: 'physics',
      level: 'Grade 7',
      content: {
        concept: 'Forces are pushes and pulls that can change how objects move',
        realWorldContext: 'Every time you open a door, kick a ball, or sit in a chair, you are using forces! Forces are everywhere around us.',
        keyPoints: [
          'Forces can be pushes or pulls',
          'Forces can make things start moving, stop moving, or change direction',
          'We measure forces in units called Newtons (N)',
          'Multiple forces can act on the same object at once'
        ],
        examples: [
          'Pushing a shopping cart at the grocery store',
          'Pulling a wagon with toys',
          'Gravity pulling you down when you jump',
          'Wind pushing against a kite'
        ]
      },
      quiz: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'What is a force?',
          options: ['A push or pull', 'A type of energy', 'A measurement', 'A color'],
          correctAnswer: 'A push or pull',
          explanation: 'Forces are pushes and pulls that can change how objects move.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'Forces can only make things start moving.',
          correctAnswer: 'false',
          explanation: 'Forces can make things start moving, stop moving, or change direction.'
        }
      ],
      prerequisites: []
    },
    {
      id: 'balanced-unbalanced-forces',
      title: 'Balanced and Unbalanced Forces',
      subject: 'physics',
      level: 'Grade 7',
      content: {
        concept: 'When forces are balanced, objects stay still or keep moving at the same speed. When forces are unbalanced, objects change their motion.',
        realWorldContext: 'Think about tug-of-war: when both teams pull with equal strength, nobody moves (balanced). When one team pulls harder, the rope moves toward the stronger team (unbalanced).',
        keyPoints: [
          'Balanced forces = no change in motion',
          'Unbalanced forces = change in motion',
          'Net force is the total force after adding all forces together',
          'Objects can have multiple forces acting on them at once'
        ],
        examples: [
          'Tug-of-war with equal teams (balanced)',
          'Pushing a heavy box that won\'t budge (balanced)',
          'A car speeding up when you press the gas (unbalanced)',
          'A book sitting on a table (balanced - gravity vs. table support)'
        ]
      },
      quiz: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'What happens when forces are balanced?',
          options: ['Object speeds up', 'Object changes direction', 'Object stays still or moves at constant speed', 'Object breaks'],
          correctAnswer: 'Object stays still or moves at constant speed',
          explanation: 'When forces are balanced, there is no change in motion.'
        },
        {
          id: 'q2',
          type: 'fill-in-blank',
          question: 'When forces are _______, objects change their motion.',
          correctAnswer: 'unbalanced',
          explanation: 'Unbalanced forces cause changes in motion.'
        }
      ],
      prerequisites: ['forces-intro']
    }
  ],
  'math-grade-7': [
    {
      id: 'integers-intro',
      title: 'Introduction to Integers',
      subject: 'math',
      level: 'Grade 7',
      content: {
        concept: 'Integers are whole numbers that can be positive, negative, or zero',
        realWorldContext: 'Integers help us describe real situations like temperatures below freezing, floors below ground level, or owing money.',
        keyPoints: [
          'Integers include positive numbers (1, 2, 3...)',
          'Integers include negative numbers (-1, -2, -3...)',
          'Zero is also an integer',
          'Integers do not include fractions or decimals'
        ],
        examples: [
          'Temperature: -5°C means 5 degrees below freezing',
          'Elevation: -2 floors means 2 floors below ground',
          'Money: -$10 means you owe $10',
          'Golf score: -3 means 3 under par'
        ]
      },
      quiz: [
        {
          id: 'q1',
          type: 'multiple-choice',
          question: 'Which of these is an integer?',
          options: ['2.5', '-7', '1/2', 'π'],
          correctAnswer: '-7',
          explanation: 'Integers are whole numbers, including negative ones like -7.'
        },
        {
          id: 'q2',
          type: 'true-false',
          question: 'Zero is an integer.',
          correctAnswer: 'true',
          explanation: 'Zero is considered an integer.'
        }
      ],
      prerequisites: []
    }
  ]
};