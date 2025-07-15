import { Lesson } from '../../types/index';

export const fractionsLessons: Lesson[] = [
  // Understanding Fractions
  {
    id: 'math-y4-l1',
    title: 'Understanding Fractions',
    description: 'Learning about parts of a whole with simple fractions',
    duration: 50,
    difficulty: 'intermediate',
    content: [
      {
        type: 'text',
        content: 'A fraction shows part of a whole. The bottom number (denominator) tells us how many equal parts the whole is divided into. The top number (numerator) tells us how many parts we have.'
      },
      {
        type: 'question',
        content: 'If you eat 3 slices of a pizza that was cut into 8 equal slices, what fraction of the pizza did you eat?',
        options: ['3/5', '3/8', '5/8', '8/3'],
        correctAnswer: '3/8',
        explanation: 'You ate 3 slices out of 8 total slices, so you ate 3/8 of the pizza.'
      },
      {
        type: 'question',
        content: 'Which fraction is bigger: 1/2 or 1/4?',
        options: ['1/2', '1/4', 'They are equal', 'Cannot tell'],
        correctAnswer: '1/2',
        explanation: '1/2 is bigger than 1/4. Think of a pizza: half a pizza is more than a quarter of a pizza.'
      },
      {
        type: 'question',
        content: 'What fraction of this shape is shaded? ■■□□ (2 squares shaded, 2 not shaded)',
        options: ['1/2', '1/4', '2/4', '4/2'],
        correctAnswer: '1/2',
        explanation: '2 out of 4 squares are shaded. 2/4 = 1/2, so half the shape is shaded.'
      },
      {
        type: 'question',
        content: 'If a chocolate bar has 6 pieces and you eat 2 pieces, what fraction did you eat?',
        options: ['2/4', '2/6', '4/6', '6/2'],
        correctAnswer: '2/6',
        explanation: 'You ate 2 pieces out of 6 total pieces, so you ate 2/6 of the chocolate bar.'
      }
    ]
  }
]; 