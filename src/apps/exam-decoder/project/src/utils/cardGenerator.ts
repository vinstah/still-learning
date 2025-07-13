import { LearningCard, Question } from '../types';

export function generateSampleCard(subject: string, topic: string): LearningCard {
  const id = crypto.randomUUID();
  
  const sampleQuestions: Question[] = [
    {
      id: crypto.randomUUID(),
      type: 'multiple-choice',
      question: `What is the fundamental principle of ${topic}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      hints: ['Think about the basic definition', 'Consider the core concept'],
      explanation: `The fundamental principle involves understanding the core mechanics of ${topic}.`
    },
    {
      id: crypto.randomUUID(),
      type: 'equation-input',
      question: `Write the equation for ${topic}:`,
      correctAnswer: 'F = ma',
      hints: ['Remember the relationship between force, mass, and acceleration'],
      explanation: 'This is Newton\'s second law of motion.'
    }
  ];

  return {
    id,
    title: `Understanding ${topic}`,
    subject,
    difficulty: 'intermediate',
    tags: [subject.toLowerCase(), topic.toLowerCase(), 'fundamentals'],
    content: {
      explanation: `# 🧠 Understanding ${topic}\n\n## Visual Metaphor\nThink of ${topic} like a well-oiled machine - each component works together to create the desired outcome.\n\n## Key Concepts\n- **Foundation**: The basic principles\n- **Application**: How it works in practice\n- **Connection**: How it relates to other concepts`,
      visualMetaphors: [
        `${topic} is like a bridge connecting two important concepts`,
        'Imagine the flow of information like water through pipes'
      ],
      memoryHooks: [
        `Remember: ${topic} = Key to understanding ${subject}`,
        'Use the acronym method for complex formulas'
      ],
      mnemonics: [`${topic.charAt(0)}${topic.charAt(1)} = ${subject} Success`]
    },
    quiz: {
      questions: sampleQuestions,
      attempts: [],
      bestScore: 0,
      averageScore: 0
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    version: 1,
    versions: []
  };
}

export function generateLearningBoard(subject: string, topics: string[]) {
  return {
    id: crypto.randomUUID(),
    title: `${subject} Learning Board`,
    subject,
    description: `Comprehensive learning board for ${subject} covering ${topics.length} key topics`,
    cards: topics.map(topic => generateSampleCard(subject, topic)),
    createdAt: new Date(),
    isTeacherMode: false
  };
}