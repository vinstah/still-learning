import { Topic } from './questionBank';

export const executiveFunctionTopics: Topic[] = [
  {
    id: 'organization',
    name: 'Organization',
    description: 'Keeping things neat and systematic',
    color: 'bg-indigo-100',
    icon: 'FolderOpen',
    questions: [
      {
        id: 'org-1',
        title: 'Organizing Your Backpack',
        content: 'What is the best way to organize your school backpack?',
        difficulty: 'foundation',
        type: 'multiple-choice',
        options: [
          'Put everything in the main compartment',
          'Use different pockets for different subjects',
          'Keep everything loose',
          'Only bring one subject at a time'
        ],
        correctAnswer: 'Use different pockets for different subjects',
        explanation: 'Organization helps you find things quickly and reduces stress. Use different pockets or folders for each subject so you know exactly where everything is.',
        tags: ['organization', 'school-supplies', 'planning'],
        estimatedTime: 3,
        accommodations: ['Visual organizer', 'Practice with real backpack', 'Extra time'],
        attachments: [],
        visualSupports: ['Backpack organization chart', 'Color-coding system', 'Checklist'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  },
  {
    id: 'self-regulation',
    name: 'Self-Regulation',
    description: 'Managing emotions and behavior',
    color: 'bg-indigo-200',
    icon: 'Heart',
    questions: [
      {
        id: 'self-1',
        title: 'Calming Strategies',
        content: 'When you feel overwhelmed, which strategy can help you calm down?',
        difficulty: 'foundation',
        type: 'multiple-choice',
        options: [
          'Take deep breaths and count to 10',
          'Yell loudly',
          'Run away from the situation',
          'Ignore the feeling'
        ],
        correctAnswer: 'Take deep breaths and count to 10',
        explanation: 'Deep breathing helps your body relax and gives your brain time to think clearly. Counting helps focus your mind on something simple and calming.',
        tags: ['self-regulation', 'coping-strategies', 'emotional-management'],
        estimatedTime: 4,
        accommodations: ['Practice breathing', 'Calm-down kit', 'Extra time'],
        attachments: [],
        visualSupports: ['Breathing exercise guide', 'Emotion thermometer', 'Calming strategies chart'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  },
  {
    id: 'planning',
    name: 'Planning',
    description: 'Thinking ahead and preparing',
    color: 'bg-indigo-300',
    icon: 'Calendar',
    questions: [
      {
        id: 'plan-1',
        title: 'Project Planning',
        content: 'You have a project due in 2 weeks. What should you do first?',
        difficulty: 'building',
        type: 'step-by-step',
        correctAnswer: 'Break the project into smaller tasks and make a timeline',
        explanation: 'Good planning prevents last-minute stress. Break big tasks into smaller, manageable pieces and spread them out over time. This makes the work less overwhelming.',
        tags: ['planning', 'project-management', 'time-management'],
        estimatedTime: 5,
        accommodations: ['Planning template', 'Visual timeline', 'Extra time'],
        attachments: [],
        visualSupports: ['Project planning template', 'Timeline visual', 'Task breakdown chart'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  }
];