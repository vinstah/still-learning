import { Lesson } from '../../types/index';

export const arithmeticLessons: Lesson[] = [
  // Counting to 20
  {
    id: 'math-y1-l1',
    title: 'Counting to 20',
    description: 'Learn to count objects and recognize numbers from 1 to 20',
    duration: 25,
    difficulty: 'beginner',
    content: [
      {
        type: 'text',
        content: 'Numbers help us count everything around us! Let\'s start by counting from 1 to 20. When we count, we say each number in order: 1, 2, 3, 4, 5...'
      },
      {
        type: 'interactive',
        content: 'Count these apples: 🍎🍎🍎🍎🍎🍎🍎 How many apples do you see?'
      },
      {
        type: 'question',
        content: 'What number comes after 7?',
        options: ['6', '8', '9', '10'],
        correctAnswer: '8',
        explanation: 'When counting: 1, 2, 3, 4, 5, 6, 7, 8... The number 8 comes right after 7.'
      },
      {
        type: 'question',
        content: 'Count these stars: ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐',
        options: ['10', '11', '12', '13'],
        correctAnswer: '12',
        explanation: 'Let\'s count together: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12. There are 12 stars!'
      },
      {
        type: 'question',
        content: 'Which number comes between 15 and 17?',
        options: ['14', '16', '18', '19'],
        correctAnswer: '16',
        explanation: 'When we count: 15, 16, 17. The number 16 comes between 15 and 17.'
      },
      {
        type: 'question',
        content: 'What is the biggest number: 8, 12, or 5?',
        options: ['8', '12', '5', 'They are all the same'],
        correctAnswer: '12',
        explanation: 'When we count up, we reach 12 after both 8 and 5, so 12 is the biggest number.'
      }
    ]
  },
  // Simple Addition
  {
    id: 'math-y1-l2',
    title: 'Simple Addition',
    description: 'Adding numbers together using objects and the + symbol',
    duration: 30,
    difficulty: 'beginner',
    content: [
      {
        type: 'text',
        content: 'Addition means putting groups together to make a bigger group. We use the + symbol to show addition. For example: 2 + 3 means we have 2 things, then we add 3 more things.'
      },
      {
        type: 'question',
        content: 'Sarah has 3 stickers. Her friend gives her 2 more stickers. How many stickers does Sarah have now?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '5',
        explanation: 'Sarah starts with 3 stickers. When she gets 2 more, we add: 3 + 2 = 5 stickers total.'
      },
      {
        type: 'interactive',
        content: 'Let\'s practice! Count these groups: 🐶🐶 + 🐶🐶🐶 = ?'
      },
      {
        type: 'question',
        content: 'What is 4 + 3?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '7',
        explanation: 'Start with 4, then count 3 more: 5, 6, 7. So 4 + 3 = 7.'
      },
      {
        type: 'question',
        content: 'Tom has 1 toy car. His dad gives him 4 more toy cars. How many toy cars does Tom have altogether?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '5',
        explanation: 'Tom starts with 1 car, then gets 4 more: 1 + 4 = 5 cars altogether.'
      },
      {
        type: 'question',
        content: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
        explanation: 'When we add 2 + 2, we count: 1, 2 (start) then 3, 4 (add 2 more). So 2 + 2 = 4.'
      },
      {
        type: 'question',
        content: 'If you have 6 marbles and find 1 more marble, how many marbles do you have?',
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
        explanation: 'You start with 6 marbles and find 1 more: 6 + 1 = 7 marbles total.'
      }
    ]
  },
  // Simple Subtraction
  {
    id: 'math-y1-l3',
    title: 'Simple Subtraction',
    description: 'Taking away numbers and understanding the - symbol',
    duration: 25,
    difficulty: 'beginner',
    content: [
      {
        type: 'text',
        content: 'Subtraction means taking away. We use the - symbol. When we subtract, we start with a number and take some away to get a smaller number.'
      },
      {
        type: 'question',
        content: 'You have 5 cookies and eat 2 of them. How many cookies are left?',
        options: ['2', '3', '4', '7'],
        correctAnswer: '3',
        explanation: 'Start with 5 cookies, take away 2: 5 - 2 = 3 cookies left.'
      },
      {
        type: 'question',
        content: 'What is 8 - 3?',
        options: ['4', '5', '6', '11'],
        correctAnswer: '5',
        explanation: 'Start with 8, count backwards 3 times: 7, 6, 5. So 8 - 3 = 5.'
      },
      {
        type: 'question',
        content: 'There are 7 birds on a tree. 4 birds fly away. How many birds are still on the tree?',
        options: ['2', '3', '4', '11'],
        correctAnswer: '3',
        explanation: 'Start with 7 birds, subtract the 4 that flew away: 7 - 4 = 3 birds left.'
      }
    ]
  },
  // Two-Digit Numbers
  {
    id: 'math-y2-l1',
    title: 'Two-Digit Numbers',
    description: 'Understanding place value with tens and ones',
    duration: 35,
    difficulty: 'beginner',
    content: [
      {
        type: 'text',
        content: 'Numbers bigger than 9 have two digits. The first digit tells us how many tens, and the second digit tells us how many ones. For example, in the number 23, we have 2 tens and 3 ones.'
      },
      {
        type: 'question',
        content: 'In the number 47, how many tens are there?',
        options: ['4', '7', '11', '47'],
        correctAnswer: '4',
        explanation: 'In 47, the first digit (4) represents the tens place. So there are 4 tens and 7 ones.'
      },
      {
        type: 'question',
        content: 'What number has 3 tens and 6 ones?',
        options: ['63', '36', '96', '39'],
        correctAnswer: '36',
        explanation: '3 tens and 6 ones makes 36. The tens digit is 3, the ones digit is 6.'
      },
      {
        type: 'question',
        content: 'In the number 85, how many ones are there?',
        options: ['8', '5', '13', '85'],
        correctAnswer: '5',
        explanation: 'In 85, the second digit (5) represents the ones place. So there are 5 ones.'
      },
      {
        type: 'question',
        content: 'Which number is bigger: 34 or 43?',
        options: ['34', '43', 'They are the same', 'Cannot tell'],
        correctAnswer: '43',
        explanation: '43 is bigger than 34. We compare the tens first: 4 tens is more than 3 tens.'
      }
    ]
  },
  // Adding Two-Digit Numbers
  {
    id: 'math-y2-l2',
    title: 'Adding Two-Digit Numbers',
    description: 'Adding numbers with tens and ones',
    duration: 40,
    difficulty: 'beginner',
    content: [
      {
        type: 'text',
        content: 'When adding two-digit numbers, we can add the tens and ones separately, or count on from the bigger number.'
      },
      {
        type: 'question',
        content: 'What is 23 + 15?',
        options: ['38', '28', '48', '35'],
        correctAnswer: '38',
        explanation: 'Add the tens: 20 + 10 = 30. Add the ones: 3 + 5 = 8. Total: 30 + 8 = 38.'
      },
      {
        type: 'question',
        content: 'What is 34 + 12?',
        options: ['44', '46', '56', '42'],
        correctAnswer: '46',
        explanation: 'Add the tens: 30 + 10 = 40. Add the ones: 4 + 2 = 6. Total: 40 + 6 = 46.'
      },
      {
        type: 'question',
        content: 'Sarah has 26 stickers. She gets 13 more stickers. How many stickers does she have now?',
        options: ['39', '29', '49', '33'],
        correctAnswer: '39',
        explanation: 'Add 26 + 13. Tens: 20 + 10 = 30. Ones: 6 + 3 = 9. Total: 30 + 9 = 39 stickers.'
      }
    ]
  }
]; 