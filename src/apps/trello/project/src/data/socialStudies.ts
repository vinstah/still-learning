import { Topic } from './questionBank';

export const socialStudiesTopics: Topic[] = [
  {
    id: 'history',
    name: 'History',
    description: 'Past events and their significance',
    color: 'bg-amber-100',
    icon: 'Clock',
    questions: [
      {
        id: 'hist-1',
        title: 'Timeline Understanding',
        content: 'Put these events in chronological order: American Revolution, World War II, Civil War, Moon Landing',
        difficulty: 'building',
        type: 'step-by-step',
        correctAnswer: 'American Revolution (1776), Civil War (1861-1865), World War II (1939-1945), Moon Landing (1969)',
        explanation: 'Chronological order means arranging events by when they happened in time, from earliest to latest. Use dates to help you order events correctly.',
        tags: ['timeline', 'chronology', 'american-history'],
        estimatedTime: 5,
        accommodations: ['Visual timeline', 'Date cards', 'Extra time'],
        attachments: [],
        visualSupports: ['Interactive timeline', 'Date visualization', 'Historical images'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  },
  {
    id: 'geography',
    name: 'Geography',
    description: 'Places, maps, and physical features',
    color: 'bg-amber-200',
    icon: 'Map',
    questions: [
      {
        id: 'geo-1',
        title: 'Map Skills - Compass Rose',
        content: 'If you are facing North and turn right, which direction are you now facing?',
        difficulty: 'foundation',
        type: 'multiple-choice',
        options: ['South', 'East', 'West', 'Northeast'],
        correctAnswer: 'East',
        explanation: 'When you face North and turn right (clockwise), you face East. Remember: Never Eat Soggy Waffles (North, East, South, West) going clockwise.',
        tags: ['compass-rose', 'directions', 'map-skills'],
        estimatedTime: 3,
        accommodations: ['Physical compass', 'Direction practice', 'Extra time'],
        attachments: [],
        visualSupports: ['Compass rose diagram', 'Direction arrows', 'Memory tricks'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  },
  {
    id: 'civics',
    name: 'Civics',
    description: 'Government and citizenship',
    color: 'bg-amber-300',
    icon: 'Building',
    questions: [
      {
        id: 'civ-1',
        title: 'Branches of Government',
        content: 'Which branch of government makes the laws?',
        difficulty: 'foundation',
        type: 'multiple-choice',
        options: ['Executive', 'Legislative', 'Judicial', 'Presidential'],
        correctAnswer: 'Legislative',
        explanation: 'The Legislative branch (Congress) makes laws. Think: "Legislature = Laws." The Executive branch enforces laws, and the Judicial branch interprets laws.',
        tags: ['government', 'branches', 'civics-basics'],
        estimatedTime: 4,
        accommodations: ['Government chart', 'Visual diagram', 'Extra time'],
        attachments: [],
        visualSupports: ['Three branches diagram', 'Government building images', 'Function chart'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  }
];