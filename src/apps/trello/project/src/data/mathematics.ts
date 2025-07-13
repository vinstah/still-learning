import { Topic } from './questionBank';

export const mathematicsTopics: Topic[] = [
  {
    id: 'basic-arithmetic',
    name: 'Basic Arithmetic',
    description: 'Addition, subtraction, multiplication, and division',
    color: 'bg-blue-100',
    icon: 'Plus',
    questions: [
      {
        id: 'math-1',
        title: 'Addition with Visual Supports',
        content: 'What is 15 + 23? Use the visual counting method.',
        difficulty: 'foundation',
        type: 'step-by-step',
        correctAnswer: '38',
        explanation: 'Break it down: 15 + 20 = 35, then 35 + 3 = 38. Visual: 🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵🔵 + 🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡',
        tags: ['addition', 'visual-learning', 'step-by-step'],
        estimatedTime: 3,
        accommodations: ['Extra time', 'Visual supports', 'Calculator allowed'],
        attachments: [],
        visualSupports: ['Number line', 'Counting blocks', 'Visual grouping'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      },
      {
        id: 'math-2',
        title: 'Multiplication Patterns',
        content: 'Find the pattern: 2 × 4 = 8, 2 × 5 = 10, 2 × 6 = ?',
        difficulty: 'building',
        type: 'multiple-choice',
        options: ['10', '12', '14', '16'],
        correctAnswer: '12',
        explanation: 'The pattern shows multiplying by 2. Each answer increases by 2. So 2 × 6 = 12.',
        tags: ['multiplication', 'patterns', 'logical-thinking'],
        estimatedTime: 4,
        accommodations: ['Visual pattern chart', 'Extra time', 'Highlight key information'],
        attachments: [],
        latex: '2 \\times 6 = 12',
        visualSupports: ['Pattern chart', 'Color coding', 'Skip counting'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 1
      },
      {
        id: 'math-3',
        title: 'Word Problem Strategy',
        content: 'Sarah has 24 stickers. She gives 8 to her friend and buys 15 more. How many stickers does she have now?',
        difficulty: 'mastery',
        type: 'step-by-step',
        correctAnswer: '31',
        explanation: 'Step 1: Start with 24 stickers\nStep 2: Give away 8: 24 - 8 = 16\nStep 3: Buy 15 more: 16 + 15 = 31\nFinal answer: 31 stickers',
        tags: ['word-problems', 'multi-step', 'real-world-application'],
        estimatedTime: 6,
        accommodations: ['Read aloud', 'Highlight keywords', 'Break into steps'],
        attachments: [],
        visualSupports: ['Problem breakdown chart', 'Visual equation', 'Step-by-step guide'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 2
      }
    ]
  },
  {
    id: 'geometry',
    name: 'Geometry',
    description: 'Shapes, angles, and spatial reasoning',
    color: 'bg-blue-200',
    icon: 'Square',
    questions: [
      {
        id: 'geo-1',
        title: 'Shape Recognition',
        content: 'Which shape has 4 equal sides and 4 right angles?',
        difficulty: 'foundation',
        type: 'multiple-choice',
        options: ['Rectangle', 'Square', 'Triangle', 'Circle'],
        correctAnswer: 'Square',
        explanation: 'A square has 4 equal sides and 4 right angles (90°). A rectangle has 4 right angles but opposite sides are equal, not all sides.',
        tags: ['shapes', 'properties', 'visual-recognition'],
        estimatedTime: 2,
        accommodations: ['Visual shape chart', 'Hands-on shapes', 'Extra time'],
        attachments: [],
        visualSupports: ['Shape comparison chart', 'Real-world examples', 'Interactive shapes'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  },
  {
    id: 'fractions',
    name: 'Fractions',
    description: 'Understanding parts of a whole',
    color: 'bg-blue-300',
    icon: 'Divide',
    questions: [
      {
        id: 'frac-1',
        title: 'Pizza Fractions',
        content: 'If you eat 3 slices of a pizza that has 8 slices total, what fraction did you eat?',
        difficulty: 'foundation',
        type: 'visual',
        correctAnswer: '3/8',
        explanation: 'You ate 3 out of 8 slices, which is written as 3/8. The bottom number (8) shows the total pieces, and the top number (3) shows how many you ate.',
        tags: ['fractions', 'real-world', 'visual-learning'],
        estimatedTime: 4,
        accommodations: ['Pizza visual', 'Fraction circles', 'Extra time'],
        attachments: [],
        latex: '\\frac{3}{8}',
        visualSupports: ['Pizza diagram', 'Fraction circles', 'Visual representation'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  }
];