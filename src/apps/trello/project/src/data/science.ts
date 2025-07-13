import { Topic } from './questionBank';

export const scienceTopics: Topic[] = [
  {
    id: 'biology',
    name: 'Biology',
    description: 'Living things and life processes',
    color: 'bg-green-100',
    icon: 'Leaf',
    questions: [
      {
        id: 'bio-1',
        title: 'Plant Parts and Functions',
        content: 'What part of the plant takes in water and nutrients from the soil?',
        difficulty: 'foundation',
        type: 'multiple-choice',
        options: ['Leaves', 'Stem', 'Roots', 'Flowers'],
        correctAnswer: 'Roots',
        explanation: 'Roots are like straws that drink water and nutrients from the soil. They also help keep the plant stable in the ground.',
        tags: ['plants', 'functions', 'basic-biology'],
        estimatedTime: 3,
        accommodations: ['Plant diagram', 'Real plant example', 'Extra time'],
        attachments: [],
        visualSupports: ['Labeled plant diagram', 'Real plant observation', 'Function chart'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      },
      {
        id: 'bio-2',
        title: 'Animal Habitats',
        content: 'Match each animal to its natural habitat: Polar bear, Fish, Monkey, Camel',
        difficulty: 'building',
        type: 'matching',
        correctAnswer: ['Arctic/Ice', 'Water/Ocean', 'Forest/Trees', 'Desert'],
        explanation: 'Animals are adapted to live in specific environments: Polar bears have thick fur for cold Arctic ice, fish have gills for breathing underwater, monkeys have strong arms for swinging in trees, and camels store water for hot deserts.',
        tags: ['animals', 'habitats', 'adaptation'],
        estimatedTime: 5,
        accommodations: ['Habitat pictures', 'Animal cards', 'Extra time'],
        attachments: [],
        visualSupports: ['Habitat photos', 'Animal adaptation chart', 'World map'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 1
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Matter and chemical reactions',
    color: 'bg-green-200',
    icon: 'FlaskConical',
    questions: [
      {
        id: 'chem-1',
        title: 'States of Matter',
        content: 'What happens to water when it freezes?',
        difficulty: 'foundation',
        type: 'step-by-step',
        correctAnswer: 'It becomes ice (solid)',
        explanation: 'When water gets very cold (0°C or 32°F), the water molecules slow down and stick together to form ice. This is called freezing or solidification.',
        tags: ['states-of-matter', 'water-cycle', 'temperature'],
        estimatedTime: 4,
        accommodations: ['Temperature demonstration', 'Ice examples', 'Visual diagram'],
        attachments: [],
        visualSupports: ['State change diagram', 'Temperature scale', 'Real examples'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Forces, motion, and energy',
    color: 'bg-green-300',
    icon: 'Zap',
    questions: [
      {
        id: 'phys-1',
        title: 'Simple Machines - Lever',
        content: 'A seesaw is an example of which simple machine?',
        difficulty: 'foundation',
        type: 'multiple-choice',
        options: ['Wheel and axle', 'Lever', 'Pulley', 'Inclined plane'],
        correctAnswer: 'Lever',
        explanation: 'A seesaw is a lever! It has a fulcrum (the middle support) and helps us lift things more easily. When one person goes down, the other goes up.',
        tags: ['simple-machines', 'lever', 'everyday-physics'],
        estimatedTime: 3,
        accommodations: ['Seesaw demonstration', 'Hands-on lever', 'Extra time'],
        attachments: [],
        visualSupports: ['Seesaw diagram', 'Lever examples', 'Force arrows'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        position: 0
      }
    ]
  }
];