import { Lesson } from '../../types/index';

export const ratiosProportionsLessons: Lesson[] = [
  // Ratios and Proportions
  {
    id: 'math-y6-l1',
    title: 'Ratios and Proportions',
    description: 'Understanding relationships between quantities',
    duration: 60,
    difficulty: 'intermediate',
    content: [
      {
        type: 'text',
        content: 'A ratio compares two quantities. If there are 3 red balls and 2 blue balls, the ratio of red to blue is 3:2. Proportions help us solve problems when ratios stay the same.'
      },
      {
        type: 'question',
        content: 'In a recipe, the ratio of flour to sugar is 4:1. If you use 8 cups of flour, how many cups of sugar do you need?',
        options: ['1 cup', '2 cups', '4 cups', '8 cups'],
        correctAnswer: '2 cups',
        explanation: 'The ratio is 4:1, so for every 4 cups of flour, you need 1 cup of sugar. With 8 cups of flour (which is 4 × 2), you need 2 cups of sugar (1 × 2).'
      },
      {
        type: 'question',
        content: 'In a class, the ratio of boys to girls is 3:2. If there are 15 boys, how many girls are there?',
        options: ['9', '10', '12', '18'],
        correctAnswer: '10',
        explanation: 'The ratio 3:2 means for every 3 boys there are 2 girls. 15 boys = 3 × 5, so there are 2 × 5 = 10 girls.'
      },
      {
        type: 'question',
        content: 'If 2 pencils cost $3, how much do 6 pencils cost?',
        options: ['$6', '$9', '$12', '$15'],
        correctAnswer: '$9',
        explanation: 'The ratio is 2 pencils : $3. For 6 pencils (which is 2 × 3), the cost is $3 × 3 = $9.'
      }
    ]
  }
]; 