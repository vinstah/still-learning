import { Topic } from './questionBank';

export const languageArtsTopics: Topic[] = [
  {
    id: 'reading-comprehension',
    name: 'Reading Comprehension',
    description: 'Understanding and analyzing texts',
    color: 'bg-purple-100',
    icon: 'BookOpen',
    questions: [
      {
        id: 'read-1',
        title: 'Main Idea Practice',
        content: 'Read this paragraph: "Dogs make wonderful pets. They are loyal, friendly, and protective. Dogs can be trained to help people in many ways. Some dogs help police officers, while others help people who cannot see." What is the main idea?',
        difficulty: 'foundation',
        type: 'multiple-choice',
        options: [
          'Dogs help police officers',
          'Dogs make wonderful pets',
          'Dogs are protective',
          'Some people cannot see'
        ],
        correctAnswer: 'Dogs make wonderful pets',
        explanation: 'The main idea is the most important point of the paragraph. The first sentence tells us the main idea: "Dogs make wonderful pets." All the other sentences give details that support this main idea.',
        tags: ['main-idea', 'reading-comprehension', 'text-analysis'],
        estimatedTime: 5,
        accommodations: ['Read aloud', 'Highlight main idea', 'Extra time'],
        attachments: [],
        visualSupports: ['Main idea graphic organizer', 'Text highlighting', 'Supporting details chart'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  },
  {
    id: 'grammar',
    name: 'Grammar',
    description: 'Parts of speech and sentence structure',
    color: 'bg-purple-200',
    icon: 'Type',
    questions: [
      {
        id: 'gram-1',
        title: 'Identifying Nouns',
        content: 'Which words in this sentence are nouns? "The happy dog ran quickly to the park."',
        difficulty: 'foundation',
        type: 'multiple-choice',
        options: ['dog, park', 'happy, quickly', 'the, to', 'ran, happy'],
        correctAnswer: 'dog, park',
        explanation: 'Nouns are words that name people, places, things, or ideas. "Dog" is a thing (animal) and "park" is a place. "Happy" and "quickly" describe things but are not nouns themselves.',
        tags: ['nouns', 'parts-of-speech', 'grammar-basics'],
        estimatedTime: 4,
        accommodations: ['Noun chart', 'Color coding', 'Extra time'],
        attachments: [],
        visualSupports: ['Parts of speech chart', 'Color-coded examples', 'Visual categories'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  },
  {
    id: 'writing',
    name: 'Writing',
    description: 'Creative and structured writing skills',
    color: 'bg-purple-300',
    icon: 'PenTool',
    questions: [
      {
        id: 'write-1',
        title: 'Paragraph Structure',
        content: 'What are the three main parts of a good paragraph?',
        difficulty: 'building',
        type: 'step-by-step',
        correctAnswer: 'Topic sentence, supporting details, concluding sentence',
        explanation: 'A good paragraph has: 1) Topic sentence (tells what the paragraph is about), 2) Supporting details (give more information about the topic), 3) Concluding sentence (wraps up the paragraph).',
        tags: ['paragraph-structure', 'writing-organization', 'essay-writing'],
        estimatedTime: 6,
        accommodations: ['Paragraph template', 'Visual organizer', 'Extra time'],
        attachments: [],
        visualSupports: ['Paragraph structure diagram', 'Color-coded template', 'Example paragraphs'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  }
];