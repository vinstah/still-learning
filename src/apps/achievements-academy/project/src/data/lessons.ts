import { Subject, YearLevel, Lesson, ExamQuestion } from '../types';
import { allMathLessons } from './lessons/index';

export const subjects: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    color: 'bg-blue-500',
    icon: 'Calculator',
    description: 'Comprehensive mathematics curriculum from basic arithmetic to advanced calculus'
  },
  {
    id: 'english',
    name: 'English',
    color: 'bg-green-500',
    icon: 'BookOpen',
    description: 'Complete English language and literature program covering reading, writing, and comprehension'
  }
];

// Mathematics lessons for each year
const createMathLessons = (year: number): Lesson[] => {
  const lessons: { [key: number]: Lesson[] } = {
    1: [
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
      }
    ],
    2: [
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
    ],
    3: [
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
    ],
    4: [
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
      },
      {
        id: 'math-y4-l2',
        title: 'Area and Perimeter',
        description: 'Finding the area and perimeter of rectangles',
        duration: 45,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'Area is the space inside a shape. For rectangles, area = length × width. Perimeter is the distance around the outside of a shape. For rectangles, perimeter = 2 × (length + width).'
          },
          {
            type: 'question',
            content: 'What is the area of a rectangle that is 6 cm long and 4 cm wide?',
            options: ['10 cm²', '20 cm²', '24 cm²', '26 cm²'],
            correctAnswer: '24 cm²',
            explanation: 'Area = length × width = 6 × 4 = 24 cm².'
          },
          {
            type: 'question',
            content: 'What is the perimeter of a rectangle that is 5 cm long and 3 cm wide?',
            options: ['8 cm', '15 cm', '16 cm', '18 cm'],
            correctAnswer: '16 cm',
            explanation: 'Perimeter = 2 × (length + width) = 2 × (5 + 3) = 2 × 8 = 16 cm.'
          },
          {
            type: 'question',
            content: 'A garden is 8 meters long and 5 meters wide. How much space does it cover?',
            options: ['13 m²', '26 m²', '40 m²', '45 m²'],
            correctAnswer: '40 m²',
            explanation: 'The space covered is the area: 8 × 5 = 40 square meters.'
          }
        ]
      }
    ],
    5: [
      {
        id: 'math-y5-l1',
        title: 'Decimal Numbers',
        description: 'Introduction to decimal places and decimal notation',
        duration: 55,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'Decimals are another way to write fractions. The decimal point separates whole numbers from parts of numbers. For example, 0.5 is the same as 1/2, and 0.25 is the same as 1/4.'
          },
          {
            type: 'question',
            content: 'Which decimal is equivalent to the fraction 3/4?',
            options: ['0.34', '0.75', '0.43', '3.4'],
            correctAnswer: '0.75',
            explanation: '3/4 = 3 ÷ 4 = 0.75. You can also think of it as 75/100 or 75 hundredths.'
          },
          {
            type: 'question',
            content: 'What is 0.6 + 0.3?',
            options: ['0.9', '0.63', '0.36', '6.3'],
            correctAnswer: '0.9',
            explanation: 'Add the decimal parts: 0.6 + 0.3 = 0.9. Think of it as 6 tenths + 3 tenths = 9 tenths.'
          },
          {
            type: 'question',
            content: 'Which number is bigger: 0.7 or 0.07?',
            options: ['0.7', '0.07', 'They are equal', 'Cannot tell'],
            correctAnswer: '0.7',
            explanation: '0.7 is 7 tenths, while 0.07 is 7 hundredths. 7 tenths is much bigger than 7 hundredths.'
          },
          {
            type: 'question',
            content: 'What is 1.5 + 2.3?',
            options: ['3.8', '4.8', '3.5', '2.8'],
            correctAnswer: '3.8',
            explanation: 'Add the whole numbers: 1 + 2 = 3. Add the decimal parts: 0.5 + 0.3 = 0.8. Total: 3.8.'
          }
        ]
      },
      {
        id: 'math-y5-l2',
        title: 'Percentages',
        description: 'Understanding percentages as parts of 100',
        duration: 50,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'Percent means "out of 100". So 25% means 25 out of 100, which is the same as 25/100 or 0.25. Percentages help us compare parts of different wholes.'
          },
          {
            type: 'question',
            content: 'What percentage is equivalent to 1/2?',
            options: ['25%', '50%', '75%', '100%'],
            correctAnswer: '50%',
            explanation: '1/2 = 50/100 = 50%. Half of something is always 50%.'
          },
          {
            type: 'question',
            content: 'If 20 out of 100 students wear glasses, what percentage wear glasses?',
            options: ['2%', '20%', '80%', '200%'],
            correctAnswer: '20%',
            explanation: '20 out of 100 = 20%. Percent means "out of 100".'
          },
          {
            type: 'question',
            content: 'What is 25% of 80?',
            options: ['15', '20', '25', '30'],
            correctAnswer: '20',
            explanation: '25% = 1/4. So 25% of 80 = 80 ÷ 4 = 20.'
          }
        ]
      }
    ],
    6: [
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
            correctAnswer: '9',
            explanation: 'The ratio is 2 pencils : $3. For 6 pencils (which is 2 × 3), the cost is $3 × 3 = $9.'
          }
        ]
      }
    ],
    7: [
      {
        id: 'math-y7-l1',
        title: 'Algebraic Expressions',
        description: 'Introduction to variables and simple algebraic expressions',
        duration: 65,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'In algebra, we use letters (like x or y) to represent unknown numbers. These are called variables. An expression like 3x + 5 means "3 times some number, plus 5".'
          },
          {
            type: 'question',
            content: 'If x = 4, what is the value of 2x + 7?',
            options: ['11', '15', '18', '22'],
            correctAnswer: '15',
            explanation: 'Substitute x = 4 into the expression: 2(4) + 7 = 8 + 7 = 15.'
          },
          {
            type: 'question',
            content: 'What is the value of 5y - 3 when y = 6?',
            options: ['27', '28', '30', '33'],
            correctAnswer: '27',
            explanation: 'Substitute y = 6: 5(6) - 3 = 30 - 3 = 27.'
          },
          {
            type: 'question',
            content: 'Simplify: 3x + 2x',
            options: ['5x', '6x', '5x²', '6x²'],
            correctAnswer: '5x',
            explanation: 'When adding like terms: 3x + 2x = (3 + 2)x = 5x.'
          }
        ]
      }
    ],
    8: [
      {
        id: 'math-y8-l1',
        title: 'Linear Equations',
        description: 'Solving equations with one variable',
        duration: 70,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'A linear equation has an equals sign and contains variables to the first power only. To solve equations, we use inverse operations to isolate the variable.'
          },
          {
            type: 'question',
            content: 'Solve for x: 3x - 8 = 16',
            options: ['x = 6', 'x = 8', 'x = 10', 'x = 12'],
            correctAnswer: 'x = 8',
            explanation: 'Add 8 to both sides: 3x = 24. Then divide both sides by 3: x = 8.'
          },
          {
            type: 'question',
            content: 'Solve for y: 2y + 5 = 17',
            options: ['y = 5', 'y = 6', 'y = 7', 'y = 11'],
            correctAnswer: 'y = 6',
            explanation: 'Subtract 5 from both sides: 2y = 12. Divide by 2: y = 6.'
          },
          {
            type: 'question',
            content: 'Solve for z: z/4 = 7',
            options: ['z = 3', 'z = 11', 'z = 28', 'z = 1.75'],
            correctAnswer: 'z = 28',
            explanation: 'Multiply both sides by 4: z = 7 × 4 = 28.'
          }
        ]
      }
    ],
    9: [
      {
        id: 'math-y9-l1',
        title: 'Quadratic Functions',
        description: 'Understanding parabolas and quadratic equations',
        duration: 75,
        difficulty: 'advanced',
        content: [
          {
            type: 'text',
            content: 'A quadratic function has the form f(x) = ax² + bx + c, where a ≠ 0. The graph of a quadratic function is a parabola, which opens upward if a > 0 and downward if a < 0.'
          },
          {
            type: 'question',
            content: 'What is the vertex of the parabola y = x² - 4x + 3?',
            options: ['(2, -1)', '(2, 1)', '(-2, -1)', '(-2, 1)'],
            correctAnswer: '(2, -1)',
            explanation: 'For y = x² - 4x + 3, the x-coordinate of the vertex is -b/(2a) = -(-4)/(2×1) = 2. Substituting: y = 4 - 8 + 3 = -1. So the vertex is (2, -1).'
          },
          {
            type: 'question',
            content: 'Which way does the parabola y = -2x² + 3x - 1 open?',
            options: ['Upward', 'Downward', 'To the right', 'To the left'],
            correctAnswer: 'Downward',
            explanation: 'Since the coefficient of x² is -2 (negative), the parabola opens downward.'
          }
        ]
      }
    ],
    10: [
      {
        id: 'math-y10-l1',
        title: 'Trigonometry',
        description: 'Introduction to sine, cosine, and tangent ratios',
        duration: 80,
        difficulty: 'advanced',
        content: [
          {
            type: 'text',
            content: 'Trigonometry studies the relationships between angles and sides in triangles. The three main ratios are: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent.'
          },
          {
            type: 'question',
            content: 'In a right triangle, if the opposite side is 3 and the hypotenuse is 5, what is sin θ?',
            options: ['3/4', '3/5', '4/5', '5/3'],
            correctAnswer: '3/5',
            explanation: 'sin θ = opposite/hypotenuse = 3/5. This is a 3-4-5 right triangle.'
          },
          {
            type: 'question',
            content: 'If cos θ = 4/5, what is the adjacent side when the hypotenuse is 10?',
            options: ['6', '8', '10', '12'],
            correctAnswer: '8',
            explanation: 'cos θ = adjacent/hypotenuse = 4/5. If hypotenuse = 10, then adjacent = (4/5) × 10 = 8.'
          }
        ]
      }
    ],
    11: [
      {
        id: 'math-y11-l1',
        title: 'Calculus - Limits',
        description: 'Understanding the concept of limits and continuity',
        duration: 85,
        difficulty: 'advanced',
        content: [
          {
            type: 'text',
            content: 'A limit describes what happens to a function as the input approaches a particular value. We write lim(x→a) f(x) = L to mean that f(x) gets arbitrarily close to L as x gets close to a.'
          },
          {
            type: 'question',
            content: 'What is lim(x→2) (x² - 4)/(x - 2)?',
            options: ['0', '2', '4', 'undefined'],
            correctAnswer: '4',
            explanation: 'Factor the numerator: (x² - 4) = (x + 2)(x - 2). So the expression becomes (x + 2)(x - 2)/(x - 2) = x + 2. As x approaches 2, this approaches 2 + 2 = 4.'
          }
        ]
      }
    ],
    12: [
      {
        id: 'math-y12-l1',
        title: 'Derivatives',
        description: 'Finding rates of change using differentiation',
        duration: 90,
        difficulty: 'advanced',
        content: [
          {
            type: 'text',
            content: 'The derivative of a function measures how fast the function is changing at any point. If f(x) = x², then f\'(x) = 2x, which tells us the slope of the tangent line at any point x.'
          },
          {
            type: 'question',
            content: 'What is the derivative of f(x) = 3x³ - 2x + 5?',
            options: ['9x² - 2', '9x² + 5', '3x² - 2x', 'x³ - x'],
            correctAnswer: '9x² - 2',
            explanation: 'Using the power rule: d/dx(3x³) = 9x², d/dx(-2x) = -2, d/dx(5) = 0. So f\'(x) = 9x² - 2.'
          }
        ]
      }
    ],
    13: [
      {
        id: 'math-y13-l1',
        title: 'Integration',
        description: 'Finding areas under curves using integration',
        duration: 95,
        difficulty: 'advanced',
        content: [
          {
            type: 'text',
            content: 'Integration is the reverse of differentiation. The integral of a function gives us the area under its curve. The fundamental theorem of calculus connects derivatives and integrals.'
          },
          {
            type: 'question',
            content: 'What is ∫(2x + 3)dx?',
            options: ['x² + 3x + C', '2x² + 3x + C', 'x² + 3x', '2 + C'],
            correctAnswer: 'x² + 3x + C',
            explanation: 'Using the power rule for integration: ∫2x dx = x² and ∫3 dx = 3x. Don\'t forget the constant of integration C.'
          }
        ]
      }
    ]
  };

  return lessons[year] || [{
    id: `math-y${year}-l1`,
    title: `Advanced Mathematics Year ${year}`,
    description: `Comprehensive mathematics concepts for Year ${year}`,
    duration: 45,
    difficulty: year <= 3 ? 'beginner' : year <= 8 ? 'intermediate' : 'advanced',
    content: [
      {
        type: 'text',
        content: `Welcome to Year ${year} Mathematics! This year builds on previous concepts with more advanced problem-solving.`
      },
      {
        type: 'question',
        content: `Year ${year} mathematics challenge question`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        explanation: 'This demonstrates the mathematical reasoning required for this year level.'
      }
    ]
  }];
};

// English lessons for each year
const createEnglishLessons = (year: number): Lesson[] => {
  const lessons: { [key: number]: Lesson[] } = {
    1: [
      {
        id: 'eng-y1-l1',
        title: 'Phonics - Letter Sounds',
        description: 'Learning the sounds that letters make',
        duration: 30,
        difficulty: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Every letter makes a sound! The letter "A" can sound like "ah" in "apple" or "ay" in "cake". Let\'s learn the most common sounds each letter makes.'
          },
          {
            type: 'question',
            content: 'What sound does the letter "B" make at the beginning of "ball"?',
            options: ['buh', 'bee', 'bay', 'bah'],
            correctAnswer: 'buh',
            explanation: 'The letter B makes a "buh" sound at the beginning of words like "ball", "book", and "big".'
          },
          {
            type: 'question',
            content: 'Which letter makes the "sss" sound like a snake?',
            options: ['C', 'S', 'Z', 'X'],
            correctAnswer: 'S',
            explanation: 'The letter S makes the "sss" sound like a snake in words like "sun", "sit", and "snake".'
          },
          {
            type: 'question',
            content: 'What sound does "M" make at the beginning of "mom"?',
            options: ['mmm', 'nnn', 'www', 'rrr'],
            correctAnswer: 'mmm',
            explanation: 'The letter M makes a "mmm" sound. You close your lips to make this sound.'
          },
          {
            type: 'question',
            content: 'Which word starts with the "T" sound?',
            options: ['cat', 'dog', 'top', 'sun'],
            correctAnswer: 'top',
            explanation: 'Top starts with the "tuh" sound that the letter T makes.'
          }
        ]
      },
      {
        id: 'eng-y1-l2',
        title: 'Sight Words',
        description: 'Learning common words that appear frequently in reading',
        duration: 25,
        difficulty: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Sight words are words we see so often that we should recognize them instantly! Words like "the", "and", "is", and "you" appear in almost every sentence we read.'
          },
          {
            type: 'question',
            content: 'Which of these is a sight word that appears very frequently in books?',
            options: ['elephant', 'the', 'purple', 'bicycle'],
            correctAnswer: 'the',
            explanation: 'The word "the" is one of the most common sight words. It appears in almost every paragraph we read!'
          },
          {
            type: 'question',
            content: 'Complete this sentence with a sight word: "I ___ happy."',
            options: ['elephant', 'am', 'purple', 'bicycle'],
            correctAnswer: 'am',
            explanation: 'The word "am" is a sight word that completes the sentence "I am happy."'
          },
          {
            type: 'question',
            content: 'Which sight word means more than one?',
            options: ['I', 'you', 'we', 'me'],
            correctAnswer: 'we',
            explanation: 'The word "we" means more than one person - it includes yourself and others.'
          }
        ]
      },
      {
        id: 'eng-y1-l3',
        title: 'Simple Sentences',
        description: 'Building sentences with subjects and actions',
        duration: 20,
        difficulty: 'beginner',
        content: [
          {
            type: 'text',
            content: 'A sentence tells us about someone or something doing an action. Every sentence needs a person or thing (subject) and what they do (action). For example: "The cat runs."'
          },
          {
            type: 'question',
            content: 'Which is a complete sentence?',
            options: ['The dog', 'Running fast', 'The dog runs.', 'Fast dog'],
            correctAnswer: 'The dog runs.',
            explanation: 'The dog runs is a complete sentence because it has a subject (the dog) and an action (runs).'
          },
          {
            type: 'question',
            content: 'In the sentence "Birds fly," what is the action?',
            options: ['Birds', 'fly', 'the', 'sentence'],
            correctAnswer: 'fly',
            explanation: 'Fly is the action - it tells us what the birds do.'
          }
        ]
      }
    ],
    2: [
      {
        id: 'eng-y2-l1',
        title: 'Reading Comprehension',
        description: 'Understanding what we read through simple stories',
        duration: 35,
        difficulty: 'beginner',
        content: [
          {
            type: 'text',
            content: 'When we read, we should understand what the story is telling us. Let\'s practice with this short story: "Tom has a red bike. He rides it to school every day. Tom loves his bike because it goes very fast."'
          },
          {
            type: 'question',
            content: 'What color is Tom\'s bike?',
            options: ['blue', 'red', 'green', 'yellow'],
            correctAnswer: 'red',
            explanation: 'The story says "Tom has a red bike" right at the beginning.'
          },
          {
            type: 'question',
            content: 'Where does Tom ride his bike?',
            options: ['to the park', 'to school', 'to the store', 'to his friend\'s house'],
            correctAnswer: 'to school',
            explanation: 'The story says "He rides it to school every day."'
          },
          {
            type: 'question',
            content: 'Why does Tom love his bike?',
            options: ['It is red', 'It is new', 'It goes very fast', 'It is big'],
            correctAnswer: 'It goes very fast',
            explanation: 'The story says "Tom loves his bike because it goes very fast."'
          },
          {
            type: 'text',
            content: 'Here\'s another story: "Emma found a lost kitten in her garden. The kitten was hungry and scared. Emma gave it some milk and a warm blanket. Soon the kitten was purring happily."'
          },
          {
            type: 'question',
            content: 'Where did Emma find the kitten?',
            options: ['in the street', 'in her garden', 'at school', 'in the park'],
            correctAnswer: 'in her garden',
            explanation: 'The story says "Emma found a lost kitten in her garden."'
          },
          {
            type: 'question',
            content: 'How did the kitten feel at the end?',
            options: ['hungry', 'scared', 'happy', 'tired'],
            correctAnswer: 'happy',
            explanation: 'The story ends with "Soon the kitten was purring happily."'
          }
        ]
      },
      {
        id: 'eng-y2-l2',
        title: 'Rhyming Words',
        description: 'Finding words that sound alike at the end',
        duration: 30,
        difficulty: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Rhyming words sound the same at the end. Cat and hat rhyme because they both end with "at". Rhyming makes poems and songs fun to hear!'
          },
          {
            type: 'question',
            content: 'Which word rhymes with "cat"?',
            options: ['dog', 'hat', 'run', 'big'],
            correctAnswer: 'hat',
            explanation: 'Hat rhymes with cat because they both end with the same "-at" sound.'
          },
          {
            type: 'question',
            content: 'Which word rhymes with "sun"?',
            options: ['moon', 'fun', 'star', 'sky'],
            correctAnswer: 'fun',
            explanation: 'Fun rhymes with sun because they both end with the "-un" sound.'
          },
          {
            type: 'question',
            content: 'Find the rhyming pair:',
            options: ['dog and log', 'cat and bird', 'fish and tree', 'car and house'],
            correctAnswer: 'dog and log',
            explanation: 'Dog and log rhyme because they both end with the "-og" sound.'
          }
        ]
      }
    ],
    3: [
      {
        id: 'eng-y3-l1',
        title: 'Parts of Speech - Nouns',
        description: 'Identifying people, places, and things in sentences',
        duration: 40,
        difficulty: 'beginner',
        content: [
          {
            type: 'text',
            content: 'A noun is a word that names a person, place, or thing. Examples: "teacher" (person), "school" (place), "book" (thing). Proper nouns name specific people or places and start with capital letters, like "Sarah" or "London".'
          },
          {
            type: 'question',
            content: 'Which word in this sentence is a noun? "The happy dog ran quickly."',
            options: ['happy', 'dog', 'ran', 'quickly'],
            correctAnswer: 'dog',
            explanation: 'Dog is a noun because it names a thing (an animal). Happy describes the dog, ran is an action, and quickly describes how the dog ran.'
          },
          {
            type: 'question',
            content: 'Which of these is a proper noun?',
            options: ['city', 'school', 'London', 'teacher'],
            correctAnswer: 'London',
            explanation: 'London is a proper noun because it names a specific place and starts with a capital letter.'
          },
          {
            type: 'question',
            content: 'How many nouns are in this sentence? "The teacher read a book to the children."',
            options: ['1', '2', '3', '4'],
            correctAnswer: '3',
            explanation: 'There are 3 nouns: teacher (person), book (thing), and children (people).'
          },
          {
            type: 'question',
            content: 'Which word is a place noun?',
            options: ['doctor', 'hospital', 'medicine', 'healthy'],
            correctAnswer: 'hospital',
            explanation: 'Hospital is a place noun because it names a location where people go.'
          }
        ]
      },
      {
        id: 'eng-y3-l2',
        title: 'Verbs - Action Words',
        description: 'Understanding words that show what someone does',
        duration: 35,
        difficulty: 'beginner',
        content: [
          {
            type: 'text',
            content: 'Verbs are action words. They tell us what someone or something does. Examples: run, jump, sing, think, sleep. Every sentence needs a verb!'
          },
          {
            type: 'question',
            content: 'Which word is a verb in this sentence? "The bird sings beautifully."',
            options: ['bird', 'sings', 'beautifully', 'the'],
            correctAnswer: 'sings',
            explanation: 'Sings is the verb because it tells us what the bird does.'
          },
          {
            type: 'question',
            content: 'Which of these is NOT a verb?',
            options: ['dance', 'table', 'write', 'laugh'],
            correctAnswer: 'table',
            explanation: 'Table is a noun (thing), not a verb. Dance, write, and laugh are all action words.'
          },
          {
            type: 'question',
            content: 'Complete the sentence with a verb: "The children ___ in the playground."',
            options: ['happy', 'play', 'playground', 'children'],
            correctAnswer: 'play',
            explanation: 'Play is a verb that tells us what the children do in the playground.'
          }
        ]
      }
    ],
    4: [
      {
        id: 'eng-y4-l1',
        title: 'Creative Writing - Story Structure',
        description: 'Learning beginning, middle, and end in stories',
        duration: 50,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'Every good story has three parts: a beginning (introduces characters and setting), a middle (the main events and problems), and an end (how everything is resolved). This structure helps readers follow along easily.'
          },
          {
            type: 'question',
            content: 'In which part of a story would you introduce the main character?',
            options: ['Beginning', 'Middle', 'End', 'All parts equally'],
            correctAnswer: 'Beginning',
            explanation: 'We introduce main characters at the beginning so readers know who the story is about from the start.'
          },
          {
            type: 'question',
            content: 'Where in a story would the main problem or conflict happen?',
            options: ['Beginning', 'Middle', 'End', 'Before the story starts'],
            correctAnswer: 'Middle',
            explanation: 'The main problem or conflict usually happens in the middle of the story, after we know the characters.'
          },
          {
            type: 'question',
            content: 'What should happen at the end of a story?',
            options: ['Introduce new characters', 'Start a new problem', 'Solve the problem', 'Leave everything unclear'],
            correctAnswer: 'Solve the problem',
            explanation: 'The end of a story should resolve the main problem and give the reader a satisfying conclusion.'
          },
          {
            type: 'question',
            content: 'Which is the best beginning for a story?',
            options: ['The end.', 'Once upon a time, there was a brave knight named Sir Arthur.', 'And they lived happily ever after.', 'The problem was solved.'],
            correctAnswer: 'Once upon a time, there was a brave knight named Sir Arthur.',
            explanation: 'This beginning introduces the main character (Sir Arthur) and gives us an idea of what kind of story it will be.'
          }
        ]
      },
      {
        id: 'eng-y4-l2',
        title: 'Punctuation and Capitalization',
        description: 'Using periods, question marks, and capital letters correctly',
        duration: 45,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'Punctuation marks help us understand sentences. Periods (.) end statements, question marks (?) end questions, and exclamation marks (!) show excitement. Capital letters start sentences and proper nouns.'
          },
          {
            type: 'question',
            content: 'Which sentence is punctuated correctly?',
            options: ['what time is it', 'What time is it?', 'what time is it!', 'What time is it'],
            correctAnswer: 'What time is it?',
            explanation: 'This sentence asks a question, so it needs a question mark. It also starts with a capital letter.'
          },
          {
            type: 'question',
            content: 'Which word should be capitalized?',
            options: ['the dog ran to the park', 'The dog ran to the park', 'the dog ran to The park', 'the Dog ran to the park'],
            correctAnswer: 'The dog ran to the park',
            explanation: 'The first word of a sentence should always be capitalized.'
          },
          {
            type: 'question',
            content: 'What punctuation mark should end this sentence? "I love ice cream"',
            options: ['.', '?', '!', ','],
            correctAnswer: '.',
            explanation: 'This is a statement, so it should end with a period.'
          }
        ]
      }
    ],
    5: [
      {
        id: 'eng-y5-l1',
        title: 'Poetry - Rhyme and Rhythm',
        description: 'Understanding how poems use sound patterns',
        duration: 55,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'Poetry uses rhyme (words that sound alike) and rhythm (the beat of the words) to create musical effects. For example: "Roses are red, violets are blue" - "red" and "blue" don\'t rhyme, but "red" and "said" would!'
          },
          {
            type: 'question',
            content: 'Which word rhymes with "night"?',
            options: ['day', 'bright', 'dark', 'moon'],
            correctAnswer: 'bright',
            explanation: 'Bright rhymes with night because they both end with the same "-ight" sound.'
          },
          {
            type: 'question',
            content: 'What is rhythm in poetry?',
            options: ['Words that rhyme', 'The beat or pattern of sounds', 'Long sentences', 'Difficult words'],
            correctAnswer: 'The beat or pattern of sounds',
            explanation: 'Rhythm is the beat or pattern of stressed and unstressed sounds in poetry, like music.'
          },
          {
            type: 'question',
            content: 'Complete this rhyming couplet: "The cat sat on the mat, wearing a funny ___"',
            options: ['shirt', 'hat', 'shoe', 'coat'],
            correctAnswer: 'hat',
            explanation: 'Hat rhymes with cat and mat, completing the rhyming pattern.'
          },
          {
            type: 'question',
            content: 'Which line has a strong rhythm? (Try reading them aloud)',
            options: ['The big dog ran', 'Hickory dickory dock', 'I like apples', 'The book is good'],
            correctAnswer: 'Hickory dickory dock',
            explanation: 'Hickory dickory dock has a strong, bouncy rhythm that you can feel when you say it.'
          }
        ]
      },
      {
        id: 'eng-y5-l2',
        title: 'Descriptive Writing',
        description: 'Using adjectives and sensory details to paint pictures with words',
        duration: 50,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'Descriptive writing uses adjectives and sensory details to help readers picture what you\'re describing. Instead of "The dog ran," try "The fluffy, golden dog raced quickly across the green grass."'
          },
          {
            type: 'question',
            content: 'Which sentence is more descriptive?',
            options: ['The car drove down the road.', 'The shiny red car zoomed down the bumpy dirt road.', 'A car moved.', 'The car went somewhere.'],
            correctAnswer: 'The shiny red car zoomed down the bumpy dirt road.',
            explanation: 'This sentence uses descriptive words like "shiny red," "zoomed," and "bumpy dirt" to create a clear picture.'
          },
          {
            type: 'question',
            content: 'Which word appeals to the sense of smell?',
            options: ['loud', 'fragrant', 'smooth', 'bright'],
            correctAnswer: 'fragrant',
            explanation: 'Fragrant describes a pleasant smell, appealing to our sense of smell.'
          },
          {
            type: 'question',
            content: 'Add a descriptive adjective: "The ___ butterfly landed on the flower."',
            options: ['and', 'beautiful', 'quickly', 'because'],
            correctAnswer: 'beautiful',
            explanation: 'Beautiful is an adjective that describes what the butterfly looks like.'
          }
        ]
      }
    ],
    6: [
      {
        id: 'eng-y6-l1',
        title: 'Persuasive Writing',
        description: 'Learning to write convincing arguments',
        duration: 60,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'Persuasive writing tries to convince readers to agree with your opinion. You need a clear opinion, strong reasons, and evidence to support your argument. Words like "because", "therefore", and "for example" help connect your ideas.'
          },
          {
            type: 'question',
            content: 'Which sentence is the strongest argument for having longer lunch breaks at school?',
            options: ['Lunch breaks are nice.', 'Students need longer lunch breaks because they can eat properly and have time to play, which helps them focus better in afternoon classes.', 'I like long lunch breaks.', 'Other schools have longer lunch breaks.'],
            correctAnswer: 'Students need longer lunch breaks because they can eat properly and have time to play, which helps them focus better in afternoon classes.',
            explanation: 'This sentence gives specific reasons (eating properly, time to play) and explains the benefit (better focus in class).'
          },
          {
            type: 'question',
            content: 'What makes a persuasive argument strong?',
            options: ['Using big words', 'Giving specific reasons and evidence', 'Writing very long sentences', 'Repeating the same idea'],
            correctAnswer: 'Giving specific reasons and evidence',
            explanation: 'Strong arguments are supported by specific reasons and evidence that readers can understand and believe.'
          },
          {
            type: 'question',
            content: 'Which word best connects a reason to an opinion?',
            options: ['but', 'because', 'and', 'or'],
            correctAnswer: 'because',
            explanation: 'Because connects an opinion to the reason that supports it, showing cause and effect.'
          },
          {
            type: 'question',
            content: 'What should come first in persuasive writing?',
            options: ['A conclusion', 'Your clear opinion', 'A long story', 'Questions for the reader'],
            correctAnswer: 'Your clear opinion',
            explanation: 'You should state your opinion clearly at the beginning so readers know what you\'re trying to persuade them about.'
          }
        ]
      }
    ],
    7: [
      {
        id: 'eng-y7-l1',
        title: 'Literary Devices - Metaphors and Similes',
        description: 'Understanding how authors use comparisons for effect',
        duration: 65,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'A metaphor compares two different things by saying one IS the other, without using "like" or "as". A simile compares using "like" or "as". For example: "Her voice is music" (metaphor) vs "Her voice is like music" (simile).'
          },
          {
            type: 'question',
            content: 'Which sentence contains a metaphor?',
            options: ['The car is as fast as lightning.', 'Time is money.', 'She runs like the wind.', 'The flower smells sweet.'],
            correctAnswer: 'Time is money.',
            explanation: 'Time is money is a metaphor because it directly compares time to money without using "like" or "as". It suggests time is valuable like money.'
          },
          {
            type: 'question',
            content: 'Which sentence contains a simile?',
            options: ['The classroom was a zoo.', 'Her eyes are stars.', 'He fought like a lion.', 'Life is a journey.'],
            correctAnswer: 'He fought like a lion.',
            explanation: 'He fought like a lion is a simile because it uses "like" to compare his fighting to a lion\'s fierceness.'
          },
          {
            type: 'question',
            content: 'What does the metaphor "The world is a stage" suggest?',
            options: ['The world is made of wood', 'Life is like a performance', 'The world is small', 'People like to act'],
            correctAnswer: 'Life is like a performance',
            explanation: 'This metaphor suggests that life is like a performance where people play different roles.'
          },
          {
            type: 'question',
            content: 'Complete this simile: "The snow was as white as ___"',
            options: ['night', 'paper', 'grass', 'mud'],
            correctAnswer: 'paper',
            explanation: 'Paper is white, making this a logical comparison for the whiteness of snow.'
          }
        ]
      }
    ],
    8: [
      {
        id: 'eng-y8-l1',
        title: 'Character Analysis',
        description: 'Understanding how authors develop characters in literature',
        duration: 70,
        difficulty: 'intermediate',
        content: [
          {
            type: 'text',
            content: 'Authors reveal character traits through what characters say, do, think, and how others react to them. We can analyze characters by looking at their motivations (why they act), conflicts (problems they face), and how they change throughout the story.'
          },
          {
            type: 'question',
            content: 'If a character always helps others even when it\'s difficult for them, what character trait does this show?',
            options: ['Selfishness', 'Laziness', 'Compassion', 'Anger'],
            correctAnswer: 'Compassion',
            explanation: 'Compassion means caring about others and wanting to help them, even when it requires sacrifice or effort from yourself.'
          },
          {
            type: 'question',
            content: 'How do authors usually reveal character traits?',
            options: ['Only through description', 'Through actions, words, thoughts, and others\' reactions', 'Only through dialogue', 'Only through appearance'],
            correctAnswer: 'Through actions, words, thoughts, and others\' reactions',
            explanation: 'Authors use multiple methods to show character traits, making characters feel real and complex.'
          },
          {
            type: 'question',
            content: 'What is character motivation?',
            options: ['How a character looks', 'Why a character acts the way they do', 'Where a character lives', 'When a character was born'],
            correctAnswer: 'Why a character acts the way they do',
            explanation: 'Character motivation is the reason behind a character\'s actions and decisions.'
          },
          {
            type: 'question',
            content: 'If a character starts shy but becomes confident by the end, this shows:',
            options: ['Character development', 'Poor writing', 'Character confusion', 'Character weakness'],
            correctAnswer: 'Character development',
            explanation: 'Character development is when a character grows and changes throughout the story.'
          }
        ]
      }
    ],
    9: [
      {
        id: 'eng-y9-l1',
        title: 'Shakespeare - Language and Themes',
        description: 'Introduction to Shakespearean language and universal themes',
        duration: 75,
        difficulty: 'advanced',
        content: [
          {
            type: 'text',
            content: 'Shakespeare wrote in Early Modern English, which can seem difficult at first. However, his themes - love, betrayal, ambition, revenge - are universal and timeless. Understanding the context and using modern translations can help us appreciate his genius.'
          },
          {
            type: 'question',
            content: 'What does "Wherefore art thou Romeo?" mean in modern English?',
            options: ['Where are you, Romeo?', 'Why are you Romeo?', 'How are you, Romeo?', 'When will you come, Romeo?'],
            correctAnswer: 'Why are you Romeo?',
            explanation: '"Wherefore" means "why" in Shakespeare\'s time. Juliet is asking why Romeo has to be a Montague (her family\'s enemy), not where he is.'
          },
          {
            type: 'question',
            content: 'Which of these is a universal theme in Shakespeare\'s plays?',
            options: ['Using smartphones', 'Driving cars', 'Love and conflict', 'Watching television'],
            correctAnswer: 'Love and conflict',
            explanation: 'Love and conflict are timeless themes that people in any era can understand and relate to.'
          },
          {
            type: 'question',
            content: 'What does "thou" mean in Shakespeare\'s language?',
            options: ['I', 'you', 'he', 'we'],
            correctAnswer: 'you',
            explanation: 'Thou is an old form of "you" that was commonly used in Shakespeare\'s time.'
          }
        ]
      }
    ],
    10: [
      {
        id: 'eng-y10-l1',
        title: 'Critical Essay Writing',
        description: 'Analyzing literature and presenting arguments with evidence',
        duration: 80,
        difficulty: 'advanced',
        content: [
          {
            type: 'text',
            content: 'A critical essay analyzes literature by making an argument about the text and supporting it with evidence. You need a clear thesis statement, topic sentences for each paragraph, quotations from the text, and analysis that explains how your evidence supports your argument.'
          },
          {
            type: 'question',
            content: 'Which is the strongest thesis statement for an essay about symbolism in "The Great Gatsby"?',
            options: ['The Great Gatsby has many symbols.', 'Fitzgerald uses the green light as a symbol.', 'Fitzgerald\'s use of the green light, the eyes of Doctor T.J. Eckleburg, and the Valley of Ashes symbolizes the corruption of the American Dream.', 'There are symbols in The Great Gatsby that are important.'],
            correctAnswer: 'Fitzgerald\'s use of the green light, the eyes of Doctor T.J. Eckleburg, and the Valley of Ashes symbolizes the corruption of the American Dream.',
            explanation: 'This thesis is specific, arguable, and provides a roadmap for the essay by naming specific symbols and their meaning.'
          },
          {
            type: 'question',
            content: 'What should follow a quotation in a critical essay?',
            options: ['Another quotation', 'Analysis explaining how it supports your argument', 'A summary of the plot', 'Your personal opinion'],
            correctAnswer: 'Analysis explaining how it supports your argument',
            explanation: 'After using evidence (quotations), you must analyze how that evidence supports your thesis or main argument.'
          },
          {
            type: 'question',
            content: 'What makes a thesis statement effective?',
            options: ['It\'s very long', 'It\'s specific and arguable', 'It summarizes the plot', 'It asks a question'],
            correctAnswer: 'It\'s specific and arguable',
            explanation: 'An effective thesis makes a specific claim that can be debated and supported with evidence from the text.'
          }
        ]
      }
    ],
    11: [
      {
        id: 'eng-y11-l1',
        title: 'Advanced Poetry Analysis',
        description: 'Analyzing complex poetic techniques and their effects',
        duration: 85,
        difficulty: 'advanced',
        content: [
          {
            type: 'text',
            content: 'Advanced poetry analysis examines how poets use form, structure, sound devices, and figurative language to create meaning and emotional impact. Consider how line breaks, stanza structure, rhyme scheme, and meter contribute to the poem\'s overall effect.'
          },
          {
            type: 'question',
            content: 'What effect does enjambment (lines that continue without pause into the next line) typically create in poetry?',
            options: ['It creates a choppy, disconnected feeling', 'It creates flow and mimics natural speech or thought', 'It always indicates the end of an idea', 'It has no particular effect'],
            correctAnswer: 'It creates flow and mimics natural speech or thought',
            explanation: 'Enjambment creates continuity and flow, often making the poem feel more conversational or reflecting the natural flow of thoughts and emotions.'
          },
          {
            type: 'question',
            content: 'What is the effect of alliteration in poetry?',
            options: ['It makes poems longer', 'It creates musical quality and emphasis', 'It makes poems harder to understand', 'It always indicates sadness'],
            correctAnswer: 'It creates musical quality and emphasis',
            explanation: 'Alliteration (repeated initial sounds) creates a musical quality and can emphasize important words or ideas.'
          }
        ]
      }
    ],
    12: [
      {
        id: 'eng-y12-l1',
        title: 'Comparative Literature',
        description: 'Comparing themes and techniques across different texts and time periods',
        duration: 90,
        difficulty: 'advanced',
        content: [
          {
            type: 'text',
            content: 'Comparative literature examines how different authors, time periods, and cultures approach similar themes. When comparing texts, consider historical context, cultural influences, literary movements, and how each author\'s unique perspective shapes their treatment of universal themes.'
          },
          {
            type: 'question',
            content: 'When comparing how two authors from different time periods treat the theme of social class, what should you consider?',
            options: ['Only the plot similarities', 'Only the writing style differences', 'The historical context, social attitudes of each era, and how these influence each author\'s perspective', 'Only which author writes better'],
            correctAnswer: 'The historical context, social attitudes of each era, and how these influence each author\'s perspective',
            explanation: 'Effective comparison considers how historical and cultural context shapes each author\'s treatment of themes, leading to deeper understanding of both texts.'
          }
        ]
      }
    ],
    13: [
      {
        id: 'eng-y13-l1',
        title: 'Independent Research and Analysis',
        description: 'Conducting original literary research and presenting findings',
        duration: 95,
        difficulty: 'advanced',
        content: [
          {
            type: 'text',
            content: 'Independent research involves formulating your own research question, finding and evaluating scholarly sources, developing an original argument, and presenting your findings clearly. This requires critical thinking, academic integrity, and the ability to synthesize multiple perspectives.'
          },
          {
            type: 'question',
            content: 'What is the most important first step in conducting independent literary research?',
            options: ['Finding as many sources as possible', 'Writing your conclusion first', 'Formulating a clear, focused research question', 'Choosing the longest text to analyze'],
            correctAnswer: 'Formulating a clear, focused research question',
            explanation: 'A clear research question guides your entire research process, helping you find relevant sources and develop a focused argument.'
          }
        ]
      }
    ]
  };

  return lessons[year] || [{
    id: `eng-y${year}-l1`,
    title: `Advanced English Year ${year}`,
    description: `Comprehensive English language and literature for Year ${year}`,
    duration: 45,
    difficulty: year <= 3 ? 'beginner' : year <= 8 ? 'intermediate' : 'advanced',
    content: [
      {
        type: 'text',
        content: `Welcome to Year ${year} English! This year focuses on advanced language skills and literary analysis.`
      },
      {
        type: 'question',
        content: `Year ${year} English comprehension question`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        explanation: 'This demonstrates the language skills required for this year level.'
      }
    ]
  }];
};

// Mathematics exam questions for each year
const createMathExamQuestions = (year: number): ExamQuestion[] => {
  const examQuestions: { [key: number]: ExamQuestion[] } = {
    1: [
      {
        id: 'math-y1-exam-1',
        question: 'Count the stars: ⭐⭐⭐⭐⭐⭐⭐⭐⭐',
        type: 'multiple-choice',
        options: ['8', '9', '10', '11'],
        correctAnswer: '9',
        marks: 2,
        explanation: 'Counting each star carefully: 1, 2, 3, 4, 5, 6, 7, 8, 9. There are 9 stars.',
        topic: 'Counting'
      },
      {
        id: 'math-y1-exam-2',
        question: 'Tom has 5 toy cars. His sister gives him 3 more. How many toy cars does Tom have now?',
        type: 'multiple-choice',
        options: ['7', '8', '9', '2'],
        correctAnswer: '8',
        marks: 3,
        explanation: 'Tom starts with 5 cars. When he gets 3 more: 5 + 3 = 8 cars total.',
        topic: 'Addition'
      },
      {
        id: 'math-y1-exam-3',
        question: 'Which number is bigger: 7 or 4?',
        type: 'multiple-choice',
        options: ['7', '4', 'They are the same', 'Cannot tell'],
        correctAnswer: '7',
        marks: 1,
        explanation: 'When counting: 1, 2, 3, 4, 5, 6, 7... We reach 7 after 4, so 7 is bigger.',
        topic: 'Number Comparison'
      },
      {
        id: 'math-y1-exam-4',
        question: 'What comes after 12?',
        type: 'multiple-choice',
        options: ['11', '13', '14', '10'],
        correctAnswer: '13',
        marks: 2,
        explanation: 'When counting: 10, 11, 12, 13... The number 13 comes after 12.',
        topic: 'Number Sequence'
      },
      {
        id: 'math-y1-exam-5',
        question: 'Sarah has 6 stickers. She gives away 2 stickers. How many stickers does she have left?',
        type: 'multiple-choice',
        options: ['3', '4', '5', '8'],
        correctAnswer: '4',
        marks: 3,
        explanation: 'Sarah starts with 6 stickers and gives away 2: 6 - 2 = 4 stickers left.',
        topic: 'Subtraction'
      }
    ],
    2: [
      {
        id: 'math-y2-exam-1',
        question: 'What is 25 + 17?',
        type: 'multiple-choice',
        options: ['32', '42', '52', '41'],
        correctAnswer: '42',
        marks: 3,
        explanation: 'Adding: 25 + 17. Start with 25, add 10 to get 35, then add 7 more to get 42.',
        topic: 'Two-digit Addition'
      },
      {
        id: 'math-y2-exam-2',
        question: 'In the number 63, what does the digit 6 represent?',
        type: 'multiple-choice',
        options: ['6 ones', '6 tens', '6 hundreds', '60 ones'],
        correctAnswer: '6 tens',
        marks: 2,
        explanation: 'In 63, the 6 is in the tens place, so it represents 6 tens or 60.',
        topic: 'Place Value'
      },
      {
        id: 'math-y2-exam-3',
        question: 'What number has 4 tens and 7 ones?',
        type: 'multiple-choice',
        options: ['74', '47', '407', '704'],
        correctAnswer: '47',
        marks: 2,
        explanation: '4 tens and 7 ones makes 47. The tens digit is 4, the ones digit is 7.',
        topic: 'Place Value'
      },
      {
        id: 'math-y2-exam-4',
        question: 'What is 56 - 23?',
        type: 'multiple-choice',
        options: ['33', '23', '43', '79'],
        correctAnswer: '33',
        marks: 3,
        explanation: 'Subtract: 56 - 23. Take away 20 from 56 to get 36, then take away 3 more to get 33.',
        topic: 'Two-digit Subtraction'
      }
    ],
    3: [
      {
        id: 'math-y3-exam-1',
        question: 'What is 7 × 8?',
        type: 'multiple-choice',
        options: ['54', '56', '58', '64'],
        correctAnswer: '56',
        marks: 2,
        explanation: '7 × 8 = 56. This is from the multiplication table: 7 eights are 56.',
        topic: 'Multiplication'
      },
      {
        id: 'math-y3-exam-2',
        question: 'If 48 ÷ 6 = 8, what is 48 ÷ 8?',
        type: 'multiple-choice',
        options: ['6', '7', '8', '9'],
        correctAnswer: '6',
        marks: 3,
        explanation: 'Since 6 × 8 = 48, we know that 48 ÷ 8 = 6. Division and multiplication are inverse operations.',
        topic: 'Division'
      },
      {
        id: 'math-y3-exam-3',
        question: 'What is 9 × 4?',
        type: 'multiple-choice',
        options: ['32', '36', '40', '45'],
        correctAnswer: '36',
        marks: 2,
        explanation: '9 × 4 = 36. You can think of it as 9 + 9 + 9 + 9 = 36.',
        topic: 'Multiplication'
      },
      {
        id: 'math-y3-exam-4',
        question: 'There are 35 students. They form groups of 5. How many groups are there?',
        type: 'multiple-choice',
        options: ['6', '7', '8', '30'],
        correctAnswer: '7',
        marks: 4,
        explanation: '35 ÷ 5 = 7. There are 7 groups with 5 students each.',
        topic: 'Division Word Problems'
      }
    ],
    4: [
      {
        id: 'math-y4-exam-1',
        question: 'Which fraction is equivalent to 1/2?',
        type: 'multiple-choice',
        options: ['2/3', '3/6', '1/4', '2/5'],
        correctAnswer: '3/6',
        marks: 2,
        explanation: '3/6 = 1/2 because if you divide both the numerator and denominator by 3, you get 1/2.',
        topic: 'Equivalent Fractions'
      },
      {
        id: 'math-y4-exam-2',
        question: 'What is the area of a rectangle that is 6 cm long and 4 cm wide?',
        type: 'multiple-choice',
        options: ['10 cm²', '20 cm²', '24 cm²', '26 cm²'],
        correctAnswer: '24 cm²',
        marks: 3,
        explanation: 'Area of rectangle = length × width = 6 × 4 = 24 cm².',
        topic: 'Area'
      },
      {
        id: 'math-y4-exam-3',
        question: 'What fraction of this group is shaded? ■■■□□□□□ (3 shaded, 5 not shaded)',
        type: 'multiple-choice',
        options: ['3/5', '3/8', '5/8', '5/3'],
        correctAnswer: '3/8',
        marks: 2,
        explanation: '3 out of 8 total squares are shaded, so 3/8 of the group is shaded.',
        topic: 'Fractions'
      },
      {
        id: 'math-y4-exam-4',
        question: 'What is the perimeter of a square with sides of 5 cm?',
        type: 'multiple-choice',
        options: ['10 cm', '15 cm', '20 cm', '25 cm'],
        correctAnswer: '20 cm',
        marks: 3,
        explanation: 'Perimeter of square = 4 × side length = 4 × 5 = 20 cm.',
        topic: 'Perimeter'
      }
    ],
    5: [
      {
        id: 'math-y5-exam-1',
        question: 'What is 0.7 + 0.25?',
        type: 'multiple-choice',
        options: ['0.32', '0.75', '0.95', '1.25'],
        correctAnswer: '0.95',
        marks: 3,
        explanation: '0.7 + 0.25 = 0.70 + 0.25 = 0.95. Line up the decimal points when adding.',
        topic: 'Decimal Addition'
      },
      {
        id: 'math-y5-exam-2',
        question: 'What percentage is equivalent to 3/4?',
        type: 'multiple-choice',
        options: ['34%', '43%', '75%', '80%'],
        correctAnswer: '75%',
        marks: 2,
        explanation: '3/4 = 0.75 = 75%. To convert a fraction to percentage, divide and multiply by 100.',
        topic: 'Percentages'
      },
      {
        id: 'math-y5-exam-3',
        question: 'What is 2.4 × 10?',
        type: 'multiple-choice',
        options: ['2.40', '24', '240', '0.24'],
        correctAnswer: '24',
        marks: 2,
        explanation: 'When multiplying by 10, move the decimal point one place to the right: 2.4 × 10 = 24.',
        topic: 'Decimal Multiplication'
      },
      {
        id: 'math-y5-exam-4',
        question: 'What is 30% of 60?',
        type: 'multiple-choice',
        options: ['15', '18', '20', '25'],
        correctAnswer: '18',
        marks: 3,
        explanation: '30% of 60 = 0.30 × 60 = 18.',
        topic: 'Percentage Calculations'
      }
    ],
    6: [
      {
        id: 'math-y6-exam-1',
        question: 'If the ratio of boys to girls in a class is 3:2 and there are 12 boys, how many girls are there?',
        type: 'multiple-choice',
        options: ['6', '8', '9', '18'],
        correctAnswer: '8',
        marks: 4,
        explanation: 'The ratio 3:2 means for every 3 boys there are 2 girls. If there are 12 boys (3×4), there must be 8 girls (2×4).',
        topic: 'Ratios'
      },
      {
        id: 'math-y6-exam-2',
        question: 'A recipe calls for 2 cups of flour for every 3 cups of milk. If you use 6 cups of milk, how much flour do you need?',
        type: 'multiple-choice',
        options: ['3 cups', '4 cups', '8 cups', '9 cups'],
        correctAnswer: '4 cups',
        marks: 4,
        explanation: 'The ratio is 2:3 (flour:milk). If milk is doubled from 3 to 6 cups, flour must also be doubled from 2 to 4 cups.',
        topic: 'Proportions'
      },
      {
        id: 'math-y6-exam-3',
        question: 'What is 2/3 + 1/6?',
        type: 'multiple-choice',
        options: ['3/9', '3/6', '5/6', '1/2'],
        correctAnswer: '5/6',
        marks: 3,
        explanation: 'Convert to common denominator: 2/3 = 4/6. Then 4/6 + 1/6 = 5/6.',
        topic: 'Adding Fractions'
      }
    ],
    7: [
      {
        id: 'math-y7-exam-1',
        question: 'Solve for x: 2x + 5 = 17',
        type: 'multiple-choice',
        options: ['x = 5', 'x = 6', 'x = 7', 'x = 11'],
        correctAnswer: 'x = 6',
        marks: 4,
        explanation: 'Subtract 5 from both sides: 2x = 12. Divide by 2: x = 6.',
        topic: 'Linear Equations'
      },
      {
        id: 'math-y7-exam-2',
        question: 'If y = 3x - 2 and x = 4, what is y?',
        type: 'multiple-choice',
        options: ['8', '10', '12', '14'],
        correctAnswer: '10',
        marks: 3,
        explanation: 'Substitute x = 4: y = 3(4) - 2 = 12 - 2 = 10.',
        topic: 'Substitution'
      },
      {
        id: 'math-y7-exam-3',
        question: 'Simplify: 4x + 3x - 2x',
        type: 'multiple-choice',
        options: ['5x', '6x', '7x', '9x'],
        correctAnswer: '5x',
        marks: 2,
        explanation: 'Combine like terms: 4x + 3x - 2x = (4 + 3 - 2)x = 5x.',
        topic: 'Combining Like Terms'
      }
    ],
    8: [
      {
        id: 'math-y8-exam-1',
        question: 'What is the slope of the line passing through points (2, 3) and (6, 11)?',
        type: 'multiple-choice',
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        marks: 3,
        explanation: 'Slope = (y₂ - y₁)/(x₂ - x₁) = (11 - 3)/(6 - 2) = 8/4 = 2.',
        topic: 'Linear Functions'
      },
      {
        id: 'math-y8-exam-2',
        question: 'Solve the system: x + y = 7, x - y = 1',
        type: 'multiple-choice',
        options: ['x = 3, y = 4', 'x = 4, y = 3', 'x = 5, y = 2', 'x = 2, y = 5'],
        correctAnswer: 'x = 4, y = 3',
        marks: 4,
        explanation: 'Add the equations: 2x = 8, so x = 4. Substitute: 4 + y = 7, so y = 3.',
        topic: 'Systems of Equations'
      }
    ],
    9: [
      {
        id: 'math-y9-exam-1',
        question: 'What are the roots of x² - 5x + 6 = 0?',
        type: 'multiple-choice',
        options: ['x = 1, 6', 'x = 2, 3', 'x = -2, -3', 'x = 1, -6'],
        correctAnswer: 'x = 2, 3',
        marks: 4,
        explanation: 'Factor: (x - 2)(x - 3) = 0. So x = 2 or x = 3.',
        topic: 'Quadratic Equations'
      },
      {
        id: 'math-y9-exam-2',
        question: 'What is the vertex of y = x² - 4x + 7?',
        type: 'multiple-choice',
        options: ['(2, 3)', '(2, 7)', '(-2, 3)', '(4, 7)'],
        correctAnswer: '(2, 3)',
        marks: 4,
        explanation: 'x-coordinate: -b/(2a) = 4/2 = 2. y-coordinate: (2)² - 4(2) + 7 = 3. Vertex is (2, 3).',
        topic: 'Parabolas'
      }
    ],
    10: [
      {
        id: 'math-y10-exam-1',
        question: 'In a right triangle, if sin θ = 3/5, what is cos θ?',
        type: 'multiple-choice',
        options: ['3/4', '4/5', '5/4', '4/3'],
        correctAnswer: '4/5',
        marks: 4,
        explanation: 'If sin θ = 3/5, then opposite = 3 and hypotenuse = 5. Using Pythagorean theorem: adjacent = 4. So cos θ = 4/5.',
        topic: 'Trigonometry'
      },
      {
        id: 'math-y10-exam-2',
        question: 'What is tan 45°?',
        type: 'multiple-choice',
        options: ['0', '1/2', '1', '√3'],
        correctAnswer: '1',
        marks: 2,
        explanation: 'In a 45-45-90 triangle, opposite = adjacent, so tan 45° = opposite/adjacent = 1.',
        topic: 'Special Angles'
      }
    ],
    11: [
      {
        id: 'math-y11-exam-1',
        question: 'What is lim(x→0) (sin x)/x?',
        type: 'multiple-choice',
        options: ['0', '1', '∞', 'undefined'],
        correctAnswer: '1',
        marks: 5,
        explanation: 'This is a standard limit in calculus. lim(x→0) (sin x)/x = 1.',
        topic: 'Limits'
      },
      {
        id: 'math-y11-exam-2',
        question: 'What is lim(x→2) (x² - 4)/(x - 2)?',
        type: 'multiple-choice',
        options: ['0', '2', '4', 'undefined'],
        correctAnswer: '4',
        marks: 4,
        explanation: 'Factor: (x² - 4)/(x - 2) = (x + 2)(x - 2)/(x - 2) = x + 2. As x → 2, this approaches 4.',
        topic: 'Limits'
      }
    ],
    12: [
      {
        id: 'math-y12-exam-1',
        question: 'What is the derivative of f(x) = x³ - 4x² + 7x - 2?',
        type: 'multiple-choice',
        options: ['3x² - 8x + 7', '3x² - 4x + 7', 'x² - 8x + 7', '3x² - 8x + 2'],
        correctAnswer: '3x² - 8x + 7',
        marks: 4,
        explanation: 'Using power rule: f\'(x) = 3x² - 8x + 7.',
        topic: 'Derivatives'
      },
      {
        id: 'math-y12-exam-2',
        question: 'What is the derivative of f(x) = 5x⁴ - 3x² + 2?',
        type: 'multiple-choice',
        options: ['20x³ - 6x', '5x³ - 3x', '20x³ - 6x + 2', '4x³ - 2x'],
        correctAnswer: '20x³ - 6x',
        marks: 3,
        explanation: 'Using power rule: f\'(x) = 20x³ - 6x + 0 = 20x³ - 6x.',
        topic: 'Derivatives'
      }
    ],
    13: [
      {
        id: 'math-y13-exam-1',
        question: 'What is ∫(3x² - 2x + 1)dx?',
        type: 'multiple-choice',
        options: ['x³ - x² + x + C', '6x - 2 + C', '3x³ - x² + x + C', 'x³ - x² + x'],
        correctAnswer: 'x³ - x² + x + C',
        marks: 4,
        explanation: 'Using power rule for integration: ∫3x²dx = x³, ∫-2x dx = -x², ∫1 dx = x. Don\'t forget +C.',
        topic: 'Integration'
      },
      {
        id: 'math-y13-exam-2',
        question: 'What is ∫(4x³ + 2x)dx?',
        type: 'multiple-choice',
        options: ['x⁴ + x² + C', '4x⁴ + 2x² + C', 'x⁴ + x² + C', '12x² + 2 + C'],
        correctAnswer: 'x⁴ + x² + C',
        marks: 3,
        explanation: 'Using power rule: ∫4x³dx = x⁴, ∫2x dx = x². So the answer is x⁴ + x² + C.',
        topic: 'Integration'
      }
    ]
  };

  return examQuestions[year] || [{
    id: `math-y${year}-exam-1`,
    question: `Advanced Year ${year} mathematics problem`,
    type: 'multiple-choice',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'A',
    marks: 5,
    explanation: `This problem tests advanced Year ${year} mathematical concepts.`,
    topic: `Year ${year} Advanced Topics`
  }];
};

// English exam questions for each year
const createEnglishExamQuestions = (year: number): ExamQuestion[] => {
  const examQuestions: { [key: number]: ExamQuestion[] } = {
    1: [
      {
        id: 'eng-y1-exam-1',
        question: 'Which letter comes right after "M" in the alphabet?',
        type: 'multiple-choice',
        options: ['L', 'N', 'O', 'P'],
        correctAnswer: 'N',
        marks: 1,
        explanation: 'In the alphabet: K, L, M, N, O... N comes right after M.',
        topic: 'Alphabet'
      },
      {
        id: 'eng-y1-exam-2',
        question: 'What sound does "CH" make in the word "chair"?',
        type: 'multiple-choice',
        options: ['kuh', 'chuh', 'shuh', 'tuh'],
        correctAnswer: 'chuh',
        marks: 2,
        explanation: 'The letters CH together make a "chuh" sound in words like chair, cheese, and chicken.',
        topic: 'Phonics'
      },
      {
        id: 'eng-y1-exam-3',
        question: 'Which is a sight word?',
        type: 'multiple-choice',
        options: ['elephant', 'and', 'dinosaur', 'butterfly'],
        correctAnswer: 'and',
        marks: 1,
        explanation: 'And is a sight word that appears very frequently in reading.',
        topic: 'Sight Words'
      },
      {
        id: 'eng-y1-exam-4',
        question: 'Which word starts with the "B" sound?',
        type: 'multiple-choice',
        options: ['cat', 'dog', 'ball', 'sun'],
        correctAnswer: 'ball',
        marks: 1,
        explanation: 'Ball starts with the "buh" sound that the letter B makes.',
        topic: 'Phonics'
      },
      {
        id: 'eng-y1-exam-5',
        question: 'Complete the sentence: "The cat ___ on the mat."',
        type: 'multiple-choice',
        options: ['sat', 'happy', 'big', 'red'],
        correctAnswer: 'sat',
        marks: 2,
        explanation: 'Sat is an action word that makes sense in this sentence.',
        topic: 'Sentence Completion'
      }
    ],
    2: [
      {
        id: 'eng-y2-exam-1',
        question: 'Read this story: "Lucy found a lost puppy in the park. She took it home and gave it food and water. The puppy was very happy." Why was the puppy happy?',
        type: 'multiple-choice',
        options: ['It was lost', 'It was in the park', 'Lucy gave it food and water', 'It was small'],
        correctAnswer: 'Lucy gave it food and water',
        marks: 3,
        explanation: 'The story says Lucy gave the puppy food and water, and then says "The puppy was very happy," showing the puppy was happy because Lucy cared for it.',
        topic: 'Reading Comprehension'
      },
      {
        id: 'eng-y2-exam-2',
        question: 'Which word rhymes with "cat"?',
        type: 'multiple-choice',
        options: ['dog', 'hat', 'run', 'big'],
        correctAnswer: 'hat',
        marks: 2,
        explanation: 'Hat rhymes with cat because they both end with the same "-at" sound.',
        topic: 'Rhyming'
      },
      {
        id: 'eng-y2-exam-3',
        question: 'Which word rhymes with "tree"?',
        type: 'multiple-choice',
        options: ['car', 'bee', 'dog', 'sun'],
        correctAnswer: 'bee',
        marks: 2,
        explanation: 'Bee rhymes with tree because they both end with the "-ee" sound.',
        topic: 'Rhyming'
      },
      {
        id: 'eng-y2-exam-4',
        question: 'In the story about Lucy and the puppy, where did Lucy find the puppy?',
        type: 'multiple-choice',
        options: ['at home', 'in the park', 'at school', 'in the store'],
        correctAnswer: 'in the park',
        marks: 2,
        explanation: 'The story says "Lucy found a lost puppy in the park."',
        topic: 'Reading Comprehension'
      }
    ],
    3: [
      {
        id: 'eng-y3-exam-1',
        question: 'In the sentence "The brave firefighter rescued the kitten," which word is an adjective?',
        type: 'multiple-choice',
        options: ['firefighter', 'brave', 'rescued', 'kitten'],
        correctAnswer: 'brave',
        marks: 2,
        explanation: 'Brave is an adjective because it describes what kind of firefighter - a brave one.',
        topic: 'Parts of Speech'
      },
      {
        id: 'eng-y3-exam-2',
        question: 'What is the plural form of "child"?',
        type: 'multiple-choice',
        options: ['childs', 'childes', 'children', 'child'],
        correctAnswer: 'children',
        marks: 2,
        explanation: 'Child is an irregular noun. Its plural form is children, not childs.',
        topic: 'Grammar'
      },
      {
        id: 'eng-y3-exam-3',
        question: 'Which word is a verb in this sentence? "The dog runs quickly."',
        type: 'multiple-choice',
        options: ['dog', 'runs', 'quickly', 'the'],
        correctAnswer: 'runs',
        marks: 2,
        explanation: 'Runs is the verb because it tells us what the dog does.',
        topic: 'Parts of Speech'
      },
      {
        id: 'eng-y3-exam-4',
        question: 'How many nouns are in this sentence? "The teacher gave the students new books."',
        type: 'multiple-choice',
        options: ['1', '2', '3', '4'],
        correctAnswer: '3',
        marks: 3,
        explanation: 'There are 3 nouns: teacher (person), students (people), and books (things).',
        topic: 'Parts of Speech'
      }
    ],
    4: [
      {
        id: 'eng-y4-exam-1',
        question: 'Which sentence shows the correct use of quotation marks?',
        type: 'multiple-choice',
        options: ['"Hello, said Sarah."', 'Hello, "said Sarah."', '"Hello," said Sarah.', 'Hello, said "Sarah."'],
        correctAnswer: '"Hello," said Sarah.',
        marks: 3,
        explanation: 'Quotation marks go around the exact words being spoken, and the comma goes inside the quotation marks.',
        topic: 'Punctuation'
      },
      {
        id: 'eng-y4-exam-2',
        question: 'What should come at the end of a story?',
        type: 'multiple-choice',
        options: ['A new character', 'A new problem', 'A solution to the problem', 'More questions'],
        correctAnswer: 'A solution to the problem',
        marks: 2,
        explanation: 'The end of a story should resolve the main problem and provide closure.',
        topic: 'Story Structure'
      },
      {
        id: 'eng-y4-exam-3',
        question: 'Which sentence is punctuated correctly?',
        type: 'multiple-choice',
        options: ['I love pizza', 'I love pizza.', 'i love pizza.', 'I love pizza,'],
        correctAnswer: 'I love pizza.',
        marks: 2,
        explanation: 'This sentence starts with a capital letter and ends with a period.',
        topic: 'Punctuation'
      },
      {
        id: 'eng-y4-exam-4',
        question: 'In which part of a story do you introduce the main character?',
        type: 'multiple-choice',
        options: ['Beginning', 'Middle', 'End', 'Conclusion'],
        correctAnswer: 'Beginning',
        marks: 2,
        explanation: 'Main characters are introduced at the beginning so readers know who the story is about.',
        topic: 'Story Structure'
      }
    ],
    5: [
      {
        id: 'eng-y5-exam-1',
        question: 'Which line from a poem shows alliteration?',
        type: 'multiple-choice',
        options: ['The sun shines bright', 'Peter picked purple plums', 'Birds fly high in the sky', 'The cat and the dog'],
        correctAnswer: 'Peter picked purple plums',
        marks: 3,
        explanation: 'Alliteration is when words start with the same sound. "Peter picked purple plums" has four words starting with "p".',
        topic: 'Poetry'
      },
      {
        id: 'eng-y5-exam-2',
        question: 'Which word rhymes with "bright"?',
        type: 'multiple-choice',
        options: ['dark', 'light', 'sun', 'day'],
        correctAnswer: 'light',
        marks: 2,
        explanation: 'Light rhymes with bright because they both end with the "-ight" sound.',
        topic: 'Poetry'
      },
      {
        id: 'eng-y5-exam-3',
        question: 'Which sentence is more descriptive?',
        type: 'multiple-choice',
        options: ['The dog ran.', 'The fluffy brown dog raced quickly.', 'A dog moved.', 'The dog went.'],
        correctAnswer: 'The fluffy brown dog raced quickly.',
        marks: 3,
        explanation: 'This sentence uses descriptive words like "fluffy brown" and "raced quickly" to create a clear picture.',
        topic: 'Descriptive Writing'
      },
      {
        id: 'eng-y5-exam-4',
        question: 'What is rhythm in poetry?',
        type: 'multiple-choice',
        options: ['Words that rhyme', 'The beat or pattern of sounds', 'Long words', 'Difficult vocabulary'],
        correctAnswer: 'The beat or pattern of sounds',
        marks: 2,
        explanation: 'Rhythm is the beat or pattern of stressed and unstressed sounds in poetry.',
        topic: 'Poetry'
      }
    ],
    6: [
      {
        id: 'eng-y6-exam-1',
        question: 'Which sentence is the most persuasive argument for recycling?',
        type: 'multiple-choice',
        options: ['Recycling is good.', 'Everyone should recycle because it reduces waste, saves natural resources, and protects the environment for future generations.', 'I like recycling.', 'Recycling helps sometimes.'],
        correctAnswer: 'Everyone should recycle because it reduces waste, saves natural resources, and protects the environment for future generations.',
        marks: 4,
        explanation: 'This sentence gives specific reasons (reduces waste, saves resources, protects environment) and explains the long-term benefit.',
        topic: 'Persuasive Writing'
      },
      {
        id: 'eng-y6-exam-2',
        question: 'What makes a persuasive argument strong?',
        type: 'multiple-choice',
        options: ['Using big words', 'Giving specific reasons and evidence', 'Writing long sentences', 'Repeating the same idea'],
        correctAnswer: 'Giving specific reasons and evidence',
        marks: 3,
        explanation: 'Strong arguments are supported by specific reasons and evidence that readers can understand and believe.',
        topic: 'Persuasive Writing'
      },
      {
        id: 'eng-y6-exam-3',
        question: 'Which word best connects a reason to an opinion?',
        type: 'multiple-choice',
        options: ['but', 'because', 'and', 'or'],
        correctAnswer: 'because',
        marks: 2,
        explanation: 'Because connects an opinion to the reason that supports it, showing cause and effect.',
        topic: 'Persuasive Writing'
      }
    ],
    7: [
      {
        id: 'eng-y7-exam-1',
        question: 'In the sentence "The classroom was a zoo during the substitute teacher\'s visit," what literary device is being used?',
        type: 'multiple-choice',
        options: ['Simile', 'Metaphor', 'Alliteration', 'Rhyme'],
        correctAnswer: 'Metaphor',
        marks: 3,
        explanation: 'This is a metaphor because it directly compares the classroom to a zoo without using "like" or "as".',
        topic: 'Literary Devices'
      },
      {
        id: 'eng-y7-exam-2',
        question: 'Which sentence contains a simile?',
        type: 'multiple-choice',
        options: ['Her voice is music.', 'Time is money.', 'He runs like the wind.', 'Life is a journey.'],
        correctAnswer: 'He runs like the wind.',
        marks: 3,
        explanation: 'He runs like the wind is a simile because it uses "like" to compare his running to the wind.',
        topic: 'Literary Devices'
      },
      {
        id: 'eng-y7-exam-3',
        question: 'What does the metaphor "Her smile is sunshine" suggest?',
        type: 'multiple-choice',
        options: ['She has yellow teeth', 'Her smile is bright and warming', 'She smiles outside', 'She likes sunny days'],
        correctAnswer: 'Her smile is bright and warming',
        marks: 3,
        explanation: 'This metaphor compares her smile to sunshine, suggesting it\'s bright, warm, and makes people feel good.',
        topic: 'Literary Devices'
      }
    ],
    8: [
      {
        id: 'eng-y8-exam-1',
        question: 'If a character in a story always stands up for others who are being bullied, even when it puts them at risk, what does this reveal about their character?',
        type: 'multiple-choice',
        options: ['They are reckless', 'They are courageous and principled', 'They are popular', 'They are afraid'],
        correctAnswer: 'They are courageous and principled',
        marks: 4,
        explanation: 'Standing up for others despite personal risk shows both courage (facing danger) and strong principles (doing what\'s right).',
        topic: 'Character Analysis'
      },
      {
        id: 'eng-y8-exam-2',
        question: 'How do authors usually reveal character traits?',
        type: 'multiple-choice',
        options: ['Only through description', 'Through actions, words, thoughts, and others\' reactions', 'Only through dialogue', 'Only through appearance'],
        correctAnswer: 'Through actions, words, thoughts, and others\' reactions',
        marks: 3,
        explanation: 'Authors use multiple methods to show character traits, making characters feel real and complex.',
        topic: 'Character Analysis'
      },
      {
        id: 'eng-y8-exam-3',
        question: 'What is character motivation?',
        type: 'multiple-choice',
        options: ['How a character looks', 'Why a character acts the way they do', 'Where a character lives', 'When a character was born'],
        correctAnswer: 'Why a character acts the way they do',
        marks: 2,
        explanation: 'Character motivation is the reason behind a character\'s actions and decisions.',
        topic: 'Character Analysis'
      }
    ],
    9: [
      {
        id: 'eng-y9-exam-1',
        question: 'In Romeo and Juliet, when Juliet says "Romeo, Romeo, wherefore art thou Romeo?" she is asking:',
        type: 'multiple-choice',
        options: ['Where is Romeo?', 'Why must you be Romeo (a Montague)?', 'How are you, Romeo?', 'When will Romeo come?'],
        correctAnswer: 'Why must you be Romeo (a Montague)?',
        marks: 4,
        explanation: '"Wherefore" means "why" in Shakespeare\'s language. Juliet is lamenting that Romeo belongs to her family\'s enemy.',
        topic: 'Shakespeare'
      },
      {
        id: 'eng-y9-exam-2',
        question: 'Which of these is a universal theme in Shakespeare\'s plays?',
        type: 'multiple-choice',
        options: ['Using technology', 'Driving cars', 'Love and betrayal', 'Watching movies'],
        correctAnswer: 'Love and betrayal',
        marks: 3,
        explanation: 'Love and betrayal are timeless themes that people in any era can understand and relate to.',
        topic: 'Shakespeare'
      },
      {
        id: 'eng-y9-exam-3',
        question: 'What does "thou" mean in Shakespeare\'s language?',
        type: 'multiple-choice',
        options: ['I', 'you', 'he', 'we'],
        correctAnswer: 'you',
        marks: 2,
        explanation: 'Thou is an old form of "you" that was commonly used in Shakespeare\'s time.',
        topic: 'Shakespeare'
      }
    ],
    10: [
      {
        id: 'eng-y10-exam-1',
        question: 'Which thesis statement would be most effective for a critical essay?',
        type: 'multiple-choice',
        options: ['This essay is about symbolism.', 'The author uses symbols.', 'Through the recurring symbols of light and darkness, the author explores the theme of good versus evil.', 'There are many symbols in this book.'],
        correctAnswer: 'Through the recurring symbols of light and darkness, the author explores the theme of good versus evil.',
        marks: 5,
        explanation: 'This thesis is specific, arguable, and provides a clear direction for analysis by naming specific symbols and their thematic significance.',
        topic: 'Critical Writing'
      },
      {
        id: 'eng-y10-exam-2',
        question: 'What should follow a quotation in a critical essay?',
        type: 'multiple-choice',
        options: ['Another quotation', 'Analysis explaining how it supports your argument', 'A summary of the plot', 'Your personal opinion'],
        correctAnswer: 'Analysis explaining how it supports your argument',
        marks: 4,
        explanation: 'After using evidence (quotations), you must analyze how that evidence supports your thesis or main argument.',
        topic: 'Critical Writing'
      },
      {
        id: 'eng-y10-exam-3',
        question: 'What makes a thesis statement effective?',
        type: 'multiple-choice',
        options: ['It\'s very long', 'It\'s specific and arguable', 'It summarizes the plot', 'It asks a question'],
        correctAnswer: 'It\'s specific and arguable',
        marks: 3,
        explanation: 'An effective thesis makes a specific claim that can be debated and supported with evidence from the text.',
        topic: 'Critical Writing'
      }
    ],
    11: [
      {
        id: 'eng-y11-exam-1',
        question: 'What is the primary effect of caesura (a deliberate pause or break) in poetry?',
        type: 'multiple-choice',
        options: ['It makes poems longer', 'It creates emphasis and controls rhythm', 'It always indicates sadness', 'It shows the poet made a mistake'],
        correctAnswer: 'It creates emphasis and controls rhythm',
        marks: 4,
        explanation: 'Caesura is used strategically to create pauses that emphasize certain words or ideas and control the poem\'s rhythm and pacing.',
        topic: 'Advanced Poetry'
      },
      {
        id: 'eng-y11-exam-2',
        question: 'What effect does enjambment create in poetry?',
        type: 'multiple-choice',
        options: ['Choppy rhythm', 'Flow and continuity', 'Confusion', 'Sadness'],
        correctAnswer: 'Flow and continuity',
        marks: 3,
        explanation: 'Enjambment creates flow and continuity by carrying thoughts across line breaks.',
        topic: 'Advanced Poetry'
      }
    ],
    12: [
      {
        id: 'eng-y12-exam-1',
        question: 'When comparing texts from different historical periods, what is most important to consider?',
        type: 'multiple-choice',
        options: ['Which author is more famous', 'How the historical and cultural context influences each author\'s perspective', 'Which book is longer', 'Which book was published first'],
        correctAnswer: 'How the historical and cultural context influences each author\'s perspective',
        marks: 5,
        explanation: 'Understanding historical and cultural context is crucial for meaningful comparison, as it explains why authors approach themes differently.',
        topic: 'Comparative Literature'
      },
      {
        id: 'eng-y12-exam-2',
        question: 'What is the purpose of comparative literature analysis?',
        type: 'multiple-choice',
        options: ['To find which book is better', 'To understand how different perspectives shape similar themes', 'To count similarities', 'To prove one author copied another'],
        correctAnswer: 'To understand how different perspectives shape similar themes',
        marks: 4,
        explanation: 'Comparative analysis helps us understand how different authors, cultures, and time periods approach universal themes.',
        topic: 'Comparative Literature'
      }
    ],
    13: [
      {
        id: 'eng-y13-exam-1',
        question: 'What is the most crucial element of independent literary research?',
        type: 'multiple-choice',
        options: ['Using the most sources possible', 'Having a clear, focused research question that guides your investigation', 'Choosing the most popular topic', 'Writing the longest paper possible'],
        correctAnswer: 'Having a clear, focused research question that guides your investigation',
        marks: 5,
        explanation: 'A focused research question is essential as it directs your research, helps you select relevant sources, and shapes your argument.',
        topic: 'Independent Research'
      },
      {
        id: 'eng-y13-exam-2',
        question: 'What is the first step in conducting independent research?',
        type: 'multiple-choice',
        options: ['Finding sources', 'Writing the conclusion', 'Formulating a research question', 'Choosing a long text'],
        correctAnswer: 'Formulating a research question',
        marks: 4,
        explanation: 'A clear research question guides your entire research process and helps focus your investigation.',
        topic: 'Independent Research'
      }
    ]
  };

  return examQuestions[year] || [{
    id: `eng-y${year}-exam-1`,
    question: `Advanced Year ${year} English literature question`,
    type: 'multiple-choice',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'A',
    marks: 5,
    explanation: `This question tests advanced Year ${year} English skills.`,
    topic: `Year ${year} Advanced Topics`
  }];
};

// Create year levels with comprehensive educational content
export const createYearLevels = (): { [subject: string]: YearLevel[] } => {
  const years: { [subject: string]: YearLevel[] } = {
    mathematics: [],
    english: []
  };

  // Create 13 years for each subject with comprehensive content
  for (let year = 1; year <= 13; year++) {
    // Mathematics years: use all topic-based lessons for all years
    const mathYear: YearLevel = {
      year,
      lessons: allMathLessons, // Use all topic-based lessons
      examQuestions: createMathExamQuestions(year),
      progress: 0
    };

    // English years (unchanged)
    const englishYear: YearLevel = {
      year,
      lessons: createEnglishLessons(year),
      examQuestions: createEnglishExamQuestions(year),
      progress: 0
    };

    years.mathematics.push(mathYear);
    years.english.push(englishYear);
  }

  return years;
};

// New loader for math lessons
export const getAllMathLessons = (): Lesson[] => allMathLessons;

export const getMathLessonById = (id: string): Lesson | undefined => allMathLessons.find((lesson: Lesson) => lesson.id === id);

// TODO: Add similar loaders for English and other subjects as you split them by topic

export const getAllLessonsBySubjectAndYear = (subject: string, year: number): Lesson[] => {
  if (subject === 'mathematics') {
    const yearPattern = new RegExp(`-y${year}-l`);
    return allMathLessons.filter(lesson => yearPattern.test(lesson.id));
  } else if (subject === 'english') {
    return createEnglishLessons(year);
  }
  // Add more subjects as needed
  return [];
};

// Deprecated: use getAllLessonsBySubjectAndYear instead
export const getAllLessonsByYear = (year: number): Lesson[] => {
  return getAllLessonsBySubjectAndYear('mathematics', year);
};

export { createMathExamQuestions, createEnglishExamQuestions };