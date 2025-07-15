import { Lesson } from '../../types/index';

export const multiplicationDivisionLessons: Lesson[] = [
  // Multiplication Tables
  {
    id: 'math-y3-l1',
    title: 'Multiplication Tables',
    description: 'Learning the 2, 5, and 10 times tables',
    duration: 45,
    difficulty: 'beginner',
    content: [
      {
        type: 'text',
        content: 'Multiplication is repeated addition. When we multiply 3 × 4, it means we add 3 four times: 3 + 3 + 3 + 3 = 12. The times tables help us remember these quickly!'
      },
      {
        type: 'question',
        content: 'What is 5 × 6?',
        options: ['25', '30', '35', '40'],
        correctAnswer: '30',
        explanation: '5 × 6 means 5 added six times: 5 + 5 + 5 + 5 + 5 + 5 = 30. Or think of it as 6 groups of 5.'
      },
      {
        type: 'question',
        content: 'What is 2 × 8?',
        options: ['14', '16', '18', '20'],
        correctAnswer: '16',
        explanation: '2 × 8 = 2 + 2 + 2 + 2 + 2 + 2 + 2 + 2 = 16. Or 8 groups of 2.'
      },
      {
        type: 'question',
        content: 'If you have 4 bags with 5 apples in each bag, how many apples do you have altogether?',
        options: ['9', '15', '20', '25'],
        correctAnswer: '20',
        explanation: '4 bags × 5 apples = 20 apples. You can count: 5 + 5 + 5 + 5 = 20.'
      },
      {
        type: 'question',
        content: 'What is 10 × 3?',
        options: ['13', '30', '33', '103'],
        correctAnswer: '30',
        explanation: '10 × 3 = 30. When multiplying by 10, we add a zero: 3 becomes 30.'
      },
      {
        type: 'question',
        content: 'What is 7 × 2?',
        options: ['9', '12', '14', '16'],
        correctAnswer: '14',
        explanation: '7 × 2 = 7 + 7 = 14. Or think of it as 2 groups of 7.'
      }
    ]
  },
  // Division Basics
  {
    id: 'math-y3-l2',
    title: 'Division Basics',
    description: 'Understanding division as sharing equally',
    duration: 40,
    difficulty: 'beginner',
    content: [
      {
        type: 'text',
        content: 'Division means sharing things equally into groups. When we divide 12 ÷ 3, we\'re asking "how many groups of 3 can we make from 12?" or "if we share 12 things among 3 people, how many does each person get?"'
      },
      {
        type: 'question',
        content: 'If you have 15 cookies and want to share them equally among 3 friends, how many cookies does each friend get?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5',
        explanation: '15 ÷ 3 = 5. Each friend gets 5 cookies: 5 + 5 + 5 = 15.'
      },
      {
        type: 'question',
        content: 'What is 20 ÷ 4?',
        options: ['4', '5', '6', '16'],
        correctAnswer: '5',
        explanation: '20 ÷ 4 = 5. We can make 5 groups of 4, or share 20 things among 4 people giving each person 5.'
      },
      {
        type: 'question',
        content: 'If 18 students need to form equal teams of 6, how many teams can they make?',
        options: ['2', '3', '4', '12'],
        correctAnswer: '3',
        explanation: '18 ÷ 6 = 3. They can make 3 teams with 6 students each: 6 + 6 + 6 = 18.'
      }
    ]
  }
]; 