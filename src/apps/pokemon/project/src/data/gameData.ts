import { Subject, GradeLevel, Question, Badge, AICompanion, WildPokemon, Environment } from '../types/game';

export const subjects: Record<Subject, { name: string; color: string; icon: string }> = {
  math: { name: 'Mathematics', color: 'bg-blue-500', icon: '📊' },
  english: { name: 'English', color: 'bg-green-500', icon: '📚' },
  science: { name: 'Science', color: 'bg-purple-500', icon: '🔬' },
  physics: { name: 'Physics', color: 'bg-red-500', icon: '⚡' },
  history: { name: 'History', color: 'bg-yellow-500', icon: '🏛️' },
  nature: { name: 'Nature', color: 'bg-emerald-500', icon: '🌿' }
};

export const gradeLevels: Record<GradeLevel, { name: string; order: number }> = {
  year1: { name: 'Year 1', order: 1 },
  year2: { name: 'Year 2', order: 2 },
  year3: { name: 'Year 3', order: 3 },
  year4: { name: 'Year 4', order: 4 },
  year5: { name: 'Year 5', order: 5 },
  year6: { name: 'Year 6', order: 6 },
  year7: { name: 'Year 7', order: 7 },
  year8: { name: 'Year 8', order: 8 },
  year9: { name: 'Year 9', order: 9 },
  year10: { name: 'Year 10', order: 10 },
  year11: { name: 'Year 11', order: 11 },
  year12: { name: 'Year 12', order: 12 },
  college: { name: 'College', order: 13 }
};

export const environments: Environment[] = [
  {
    id: 'math-meadow',
    name: 'Mathematics Meadow',
    theme: 'A peaceful grassland where number Pokemon roam freely',
    backgroundColor: '#87CEEB',
    groundColor: '#90EE90',
    ambientLight: '#ffffff',
    directionalLight: '#ffff99',
    subjects: ['math'],
    pokemonTypes: ['normal', 'psychic'],
    terrain: [
      { type: 'tree', position: { x: -15, y: 0, z: -10 }, scale: 1, color: '#228B22' },
      { type: 'tree', position: { x: 20, y: 0, z: 15 }, scale: 1.2, color: '#228B22' },
      { type: 'flower', position: { x: 5, y: 0, z: -8 }, scale: 0.8, color: '#FF69B4' },
      { type: 'flower', position: { x: -8, y: 0, z: 12 }, scale: 0.6, color: '#FFD700' },
      { type: 'rock', position: { x: 10, y: 0, z: -15 }, scale: 0.7, color: '#696969' }
    ]
  },
  {
    id: 'science-lab',
    name: 'Science Laboratory',
    theme: 'A high-tech research facility with experimental Pokemon',
    backgroundColor: '#4B0082',
    groundColor: '#C0C0C0',
    ambientLight: '#E6E6FA',
    directionalLight: '#00FFFF',
    subjects: ['science', 'physics'],
    pokemonTypes: ['electric', 'psychic'],
    terrain: [
      { type: 'building', position: { x: -20, y: 0, z: -20 }, scale: 1, color: '#C0C0C0' },
      { type: 'building', position: { x: 25, y: 0, z: 10 }, scale: 0.8, color: '#C0C0C0' },
      { type: 'rock', position: { x: 0, y: 0, z: -25 }, scale: 1.5, color: '#4169E1' }
    ]
  },
  {
    id: 'history-ruins',
    name: 'Ancient History Ruins',
    theme: 'Mysterious ruins where ancient Pokemon guard historical secrets',
    backgroundColor: '#8B4513',
    groundColor: '#DEB887',
    ambientLight: '#FFA500',
    directionalLight: '#FFD700',
    subjects: ['history'],
    pokemonTypes: ['rock', 'psychic'],
    terrain: [
      { type: 'building', position: { x: -10, y: 0, z: -15 }, scale: 1.5, color: '#8B4513' },
      { type: 'building', position: { x: 15, y: 0, z: 20 }, scale: 1.2, color: '#A0522D' },
      { type: 'rock', position: { x: 0, y: 0, z: 0 }, scale: 2, color: '#696969' },
      { type: 'rock', position: { x: -25, y: 0, z: 10 }, scale: 1.8, color: '#708090' }
    ]
  },
  {
    id: 'nature-forest',
    name: 'Enchanted Nature Forest',
    theme: 'A magical forest teeming with nature-loving Pokemon',
    backgroundColor: '#228B22',
    groundColor: '#006400',
    ambientLight: '#98FB98',
    directionalLight: '#ADFF2F',
    subjects: ['nature', 'science'],
    pokemonTypes: ['grass', 'flying'],
    terrain: [
      { type: 'tree', position: { x: -12, y: 0, z: -8 }, scale: 1.5, color: '#228B22' },
      { type: 'tree', position: { x: 8, y: 0, z: -20 }, scale: 1.8, color: '#32CD32' },
      { type: 'tree', position: { x: -20, y: 0, z: 15 }, scale: 1.3, color: '#228B22' },
      { type: 'tree', position: { x: 18, y: 0, z: 12 }, scale: 1.6, color: '#32CD32' },
      { type: 'flower', position: { x: 3, y: 0, z: 5 }, scale: 1, color: '#FF1493' },
      { type: 'flower', position: { x: -5, y: 0, z: -3 }, scale: 0.8, color: '#FF69B4' }
    ]
  }
];

export const wildPokemon: WildPokemon[] = [
  {
    id: 'numbchu',
    name: 'Numbchu',
    type: 'electric',
    subject: 'math',
    position: { x: 5, y: 1, z: 8 },
    model: 'sphere',
    color: '#FFD700',
    scale: 1,
    animationSpeed: 2,
    rarity: 'common',
    facts: [
      'Addition is like combining groups of objects together!',
      'When you add 0 to any number, the number stays the same.',
      'The order of addition doesn\'t matter: 3 + 5 = 5 + 3'
    ],
    questions: []
  },
  {
    id: 'algebragon',
    name: 'Algebragon',
    type: 'psychic',
    subject: 'math',
    position: { x: -12, y: 1, z: -5 },
    model: 'sphere',
    color: '#9370DB',
    scale: 1.2,
    animationSpeed: 1.5,
    rarity: 'rare',
    facts: [
      'Variables are like mystery boxes that can hold different numbers!',
      'An equation is like a balanced scale - both sides must be equal.',
      'You can solve for x by doing the same thing to both sides of an equation.'
    ],
    questions: []
  },
  {
    id: 'grammareon',
    name: 'Grammareon',
    type: 'normal',
    subject: 'english',
    position: { x: 15, y: 1, z: -10 },
    model: 'box',
    color: '#32CD32',
    scale: 1,
    animationSpeed: 1.8,
    rarity: 'common',
    facts: [
      'A noun is a person, place, thing, or idea.',
      'Adjectives describe nouns and make writing more interesting.',
      'Every sentence needs a subject and a predicate to be complete.'
    ],
    questions: []
  },
  {
    id: 'atomeon',
    name: 'Atomeon',
    type: 'electric',
    subject: 'science',
    position: { x: -8, y: 1, z: 12 },
    model: 'sphere',
    color: '#00BFFF',
    scale: 0.8,
    animationSpeed: 3,
    rarity: 'uncommon',
    facts: [
      'Everything is made of tiny particles called atoms!',
      'Atoms have a nucleus in the center with electrons spinning around it.',
      'There are over 100 different types of atoms called elements.'
    ],
    questions: []
  },
  {
    id: 'velocityrex',
    name: 'Velocityrex',
    type: 'flying',
    subject: 'physics',
    position: { x: 20, y: 1, z: 5 },
    model: 'cylinder',
    color: '#FF4500',
    scale: 1.3,
    animationSpeed: 2.5,
    rarity: 'rare',
    facts: [
      'Velocity is speed with direction - it tells us how fast and which way!',
      'Gravity pulls everything toward the center of the Earth.',
      'Force equals mass times acceleration (F = ma).'
    ],
    questions: []
  },
  {
    id: 'historuff',
    name: 'Historuff',
    type: 'rock',
    subject: 'history',
    position: { x: -15, y: 1, z: -15 },
    model: 'box',
    color: '#8B4513',
    scale: 1.1,
    animationSpeed: 1,
    rarity: 'uncommon',
    facts: [
      'Ancient civilizations built amazing structures that still stand today!',
      'The pyramids of Egypt were built over 4,000 years ago.',
      'History helps us learn from the past to make better decisions.'
    ],
    questions: []
  },
  {
    id: 'leafeon-nature',
    name: 'Natureon',
    type: 'grass',
    subject: 'nature',
    position: { x: 8, y: 1, z: -18 },
    model: 'box',
    color: '#228B22',
    scale: 1,
    animationSpeed: 1.2,
    rarity: 'common',
    facts: [
      'Plants make their own food using sunlight, water, and carbon dioxide!',
      'Trees produce oxygen that we need to breathe.',
      'Every living thing is connected in the web of life.'
    ],
    questions: []
  },
  {
    id: 'legendary-einstein',
    name: 'Einsteineon',
    type: 'psychic',
    subject: 'physics',
    position: { x: 0, y: 1, z: 0 },
    model: 'sphere',
    color: '#9932CC',
    scale: 1.5,
    animationSpeed: 0.8,
    rarity: 'legendary',
    facts: [
      'Energy and matter are related by the famous equation E=mc²!',
      'Time can actually slow down when you travel very fast.',
      'Light is the fastest thing in the universe - nothing can go faster!'
    ],
    questions: []
  }
];

export const sampleQuestions: Question[] = [
  {
    id: '1',
    subject: 'math',
    gradeLevel: 'year1',
    question: 'What is 2 + 3?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    difficulty: 'easy',
    xpReward: 10,
    hint: 'Count on your fingers: start with 2, then add 3 more!',
    pokemonId: 'numbchu'
  },
  {
    id: '2',
    subject: 'english',
    gradeLevel: 'year2',
    question: 'Which word rhymes with "cat"?',
    options: ['dog', 'hat', 'bird', 'fish'],
    correctAnswer: 1,
    difficulty: 'easy',
    xpReward: 10,
    hint: 'Think about words that end with the same sound as "cat"',
    pokemonId: 'grammareon'
  },
  {
    id: '3',
    subject: 'science',
    gradeLevel: 'year3',
    question: 'What do plants need to grow?',
    options: ['Only water', 'Only sunlight', 'Water and sunlight', 'Nothing'],
    correctAnswer: 2,
    difficulty: 'easy',
    xpReward: 15,
    hint: 'Think about what you see plants reaching toward!',
    pokemonId: 'atomeon'
  },
  {
    id: '4',
    subject: 'math',
    gradeLevel: 'year5',
    question: 'What is 12 × 8?',
    options: ['84', '96', '104', '88'],
    correctAnswer: 1,
    difficulty: 'medium',
    xpReward: 20,
    hint: 'Try breaking it down: 12 × 8 = 12 × (10 - 2) = 120 - 24',
    pokemonId: 'algebragon'
  },
  {
    id: '5',
    subject: 'physics',
    gradeLevel: 'year8',
    question: 'What is the speed of light?',
    options: ['300,000 km/s', '3,000,000 km/s', '30,000 km/s', '300,000,000 km/s'],
    correctAnswer: 0,
    difficulty: 'hard',
    xpReward: 30,
    hint: 'It\'s approximately 3 × 10^8 meters per second!',
    pokemonId: 'velocityrex'
  }
];

export const badges: Badge[] = [
  {
    id: 'math-starter',
    name: 'Math Explorer',
    description: 'Complete your first math challenge',
    icon: '🏅',
    subject: 'math',
    rarity: 'common',
    unlockedAt: new Date()
  },
  {
    id: 'science-master',
    name: 'Science Wizard',
    description: 'Master 10 science challenges',
    icon: '🧙‍♂️',
    subject: 'science',
    rarity: 'epic',
    unlockedAt: new Date()
  }
];

export const aiCompanions: Record<string, AICompanion> = {
  nova: {
    name: 'Nova',
    personality: 'encouraging',
    hints: [
      "You're doing great! Take your time to think through this one.",
      "Remember what we learned earlier - you've got this!",
      "Don't worry if it's tricky, every expert was once a beginner!"
    ],
    motivationalMessages: [
      "Excellent work! You're becoming a real learning champion!",
      "Amazing progress! Your brain is growing stronger with each challenge!",
      "Fantastic! You're unlocking new levels of knowledge!"
    ]
  },
  sage: {
    name: 'Professor Sage',
    personality: 'wise',
    hints: [
      "Let's break this problem down into smaller, manageable parts.",
      "Consider what you already know about this topic.",
      "Sometimes the answer becomes clear when we approach it differently."
    ],
    motivationalMessages: [
      "Wisdom comes from learning, and you're gaining so much!",
      "Your curiosity and dedication are truly admirable.",
      "Knowledge is power, and you're becoming more powerful every day!"
    ]
  }
};