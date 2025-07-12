import { Question } from '../types/question';
import { additionalPhysicsQuestions } from './physics';

// Convert physics questions to our Question interface format
const convertPhysicsQuestion = (physicsQ: any, id: number): Question => ({
  id,
  question: physicsQ.question,
  options: physicsQ.options || [],
  correctAnswer: physicsQ.correctAnswer,
  explanation: physicsQ.explanation,
  topic: physicsQ.questTitle || physicsQ.tags?.[0] || 'Physics'
});

// Convert all physics questions
export const physicsQuestions: Question[] = additionalPhysicsQuestions.map((q, index) => 
  convertPhysicsQuestion(q, index + 1)
);

// Legacy questions for backward compatibility
export const legacyQuestions: Question[] = [
  {
    id: 101,
    question: "What happens to an object at rest according to Newton's First Law?",
    options: [
      "It stays at rest unless acted upon by a force",
      "It automatically starts moving",
      "It moves in a circle",
      "It falls down"
    ],
    correctAnswer: 0,
    explanation: "Newton's First Law states that objects at rest stay at rest unless acted upon by an external force.",
    topic: "Newton's Laws"
  },
  {
    id: 102,
    question: "If you push a shopping cart with more force, what happens?",
    options: [
      "It moves slower",
      "It moves faster",
      "Nothing changes",
      "It stops moving"
    ],
    correctAnswer: 1,
    explanation: "According to Newton's Second Law (F = ma), more force results in greater acceleration, making the cart move faster.",
    topic: "Newton's Laws"
  },
  {
    id: 103,
    question: "When you walk forward, what does the ground do?",
    options: [
      "Nothing happens",
      "The ground pushes back on you",
      "The ground moves forward",
      "The ground disappears"
    ],
    correctAnswer: 1,
    explanation: "Newton's Third Law: For every action, there is an equal and opposite reaction. When you push on the ground, it pushes back.",
    topic: "Newton's Laws"
  },
  {
    id: 104,
    question: "What is friction?",
    options: [
      "A type of energy",
      "A force that opposes motion",
      "A way to make things move faster",
      "Something that only exists in space"
    ],
    correctAnswer: 1,
    explanation: "Friction is a force that opposes motion between two surfaces in contact.",
    topic: "Friction"
  },
  {
    id: 105,
    question: "Why do things fall down when you drop them?",
    options: [
      "Because of gravity",
      "Because of wind",
      "Because they want to",
      "Because of magnetism"
    ],
    correctAnswer: 0,
    explanation: "Gravity is the force that attracts objects toward the center of the Earth.",
    topic: "Gravity"
  }
];

// Export all questions combined
export const allQuestions: Question[] = [...physicsQuestions, ...legacyQuestions];

// Export by difficulty for adaptive learning
export const questionsByDifficulty = {
  beginner: physicsQuestions.filter(q => 
    additionalPhysicsQuestions.find(pq => pq.explanation === q.explanation)?.difficulty === 'Beginner'
  ),
  intermediate: physicsQuestions.filter(q => 
    additionalPhysicsQuestions.find(pq => pq.explanation === q.explanation)?.difficulty === 'Intermediate'
  ),
  advanced: physicsQuestions.filter(q => 
    additionalPhysicsQuestions.find(pq => pq.explanation === q.explanation)?.difficulty === 'Advanced'
  )
};

// Export by topic for targeted practice
export const questionsByTopic = {
  'Simple Machines': physicsQuestions.filter(q => q.topic.includes('Simple Machines') || q.topic.includes('pulleys') || q.topic.includes('inclined-plane')),
  'Motion & Forces': physicsQuestions.filter(q => q.topic.includes('Motion') || q.topic.includes('Forces') || q.topic.includes('speed')),
  'Energy': physicsQuestions.filter(q => q.topic.includes('Energy') || q.topic.includes('kinetic') || q.topic.includes('potential')),
  'Waves & Sound': physicsQuestions.filter(q => q.topic.includes('Sound') || q.topic.includes('waves') || q.topic.includes('frequency')),
  'Light & Optics': physicsQuestions.filter(q => q.topic.includes('Light') || q.topic.includes('reflection') || q.topic.includes('optics')),
  'Electricity & Magnetism': physicsQuestions.filter(q => q.topic.includes('magnetism') || q.topic.includes('circuits') || q.topic.includes('electricity')),
  'Heat & Matter': physicsQuestions.filter(q => q.topic.includes('Heat') || q.topic.includes('thermal') || q.topic.includes('states-of-matter')),
  'Fluids & Pressure': physicsQuestions.filter(q => q.topic.includes('pressure') || q.topic.includes('fluids') || q.topic.includes('density')),
  'Space & Gravity': physicsQuestions.filter(q => q.topic.includes('gravity') || q.topic.includes('space') || q.topic.includes('planetary'))
};

// Get random question by difficulty
export const getRandomQuestionByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): Question | null => {
  const questions = questionsByDifficulty[difficulty];
  if (questions.length === 0) return null;
  return questions[Math.floor(Math.random() * questions.length)];
};

// Get questions for adaptive learning path
export const getAdaptiveQuestions = (userAccuracy: number, completedTopics: string[] = []): Question[] => {
  let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner';
  
  if (userAccuracy >= 80) difficulty = 'advanced';
  else if (userAccuracy >= 60) difficulty = 'intermediate';
  
  const availableQuestions = questionsByDifficulty[difficulty];
  
  // Filter out topics the user has already mastered
  return availableQuestions.filter(q => !completedTopics.includes(q.topic));
};