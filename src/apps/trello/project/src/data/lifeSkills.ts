import { Topic } from './questionBank';

export const lifeSkillsTopics: Topic[] = [
  {
    id: 'daily-living',
    name: 'Daily Living',
    description: 'Essential everyday skills',
    color: 'bg-emerald-100',
    icon: 'Home',
    questions: [
      {
        id: 'daily-1',
        title: 'Time Management',
        content: 'You need to be at school by 8:00 AM. It takes 30 minutes to get ready and 15 minutes to travel. What time should you wake up?',
        difficulty: 'building',
        type: 'step-by-step',
        correctAnswer: '7:15 AM',
        explanation: 'Work backwards: School starts at 8:00 AM. Travel time: 15 minutes, so leave at 7:45 AM. Getting ready: 30 minutes, so wake up at 7:15 AM.',
        tags: ['time-management', 'planning', 'daily-routine'],
        estimatedTime: 5,
        accommodations: ['Clock visual', 'Timeline chart', 'Extra time'],
        attachments: [],
        visualSupports: ['Digital and analog clocks', 'Timeline visual', 'Morning routine chart'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  },
  {
    id: 'social-skills',
    name: 'Social Skills',
    description: 'Interacting with others effectively',
    color: 'bg-emerald-200',
    icon: 'Users',
    questions: [
      {
        id: 'social-1',
        title: 'Active Listening',
        content: 'What are three ways to show someone you are listening to them?',
        difficulty: 'foundation',
        type: 'multiple-choice',
        options: [
          'Look at them, nod, ask questions',
          'Look away, interrupt, check phone',
          'Close eyes, be silent, walk away',
          'Talk loudly, disagree, change topic'
        ],
        correctAnswer: 'Look at them, nod, ask questions',
        explanation: 'Good listening shows respect and helps you understand. Make eye contact, nod to show you understand, and ask questions to learn more.',
        tags: ['listening', 'communication', 'respect'],
        estimatedTime: 4,
        accommodations: ['Role-play examples', 'Visual cues', 'Extra time'],
        attachments: [],
        visualSupports: ['Body language chart', 'Communication examples', 'Social cue cards'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  },
  {
    id: 'money-management',
    name: 'Money Management',
    description: 'Understanding and using money wisely',
    color: 'bg-emerald-300',
    icon: 'DollarSign',
    questions: [
      {
        id: 'money-1',
        title: 'Making Change',
        content: 'You buy something for $3.25 and pay with a $5 bill. How much change should you get?',
        difficulty: 'foundation',
        type: 'step-by-step',
        correctAnswer: '$1.75',
        explanation: 'Subtract the cost from what you paid: $5.00 - $3.25 = $1.75. You can also count up: $3.25 + $0.75 = $4.00, then $4.00 + $1.00 = $5.00, so $0.75 + $1.00 = $1.75.',
        tags: ['money', 'subtraction', 'real-world-math'],
        estimatedTime: 4,
        accommodations: ['Play money', 'Calculator allowed', 'Extra time'],
        attachments: [],
        visualSupports: ['Money visuals', 'Counting chart', 'Step-by-step guide'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  }
];