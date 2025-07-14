// 20 Additional Mathematics Assessment Questions for Quest Learning Platform

export const additionalMathQuestions = [
    // Fractions & Decimals
    {
      questTitle: "Bakery Fraction Challenge",
      question: "Emma baked 12 cupcakes. She gave 1/3 to her neighbors and 1/4 to her classmates. How many cupcakes does she have left?",
      type: 'multiple-choice' as const,
      options: ['3 cupcakes', '4 cupcakes', '5 cupcakes', '6 cupcakes'],
      correctAnswer: 2,
      explanation: '1/3 of 12 = 4 cupcakes, 1/4 of 12 = 3 cupcakes. She gave away 4 + 3 = 7 cupcakes, so she has 12 - 7 = 5 cupcakes left.',
      difficulty: 'Intermediate',
      tags: ['fractions', 'word-problems', 'subtraction', 'real-world']
    },
  
    {
      questTitle: "Decimal Race Track",
      question: "Order these race times from fastest to slowest: 10.45 seconds, 10.5 seconds, 10.05 seconds, 10.4 seconds",
      type: 'drag-drop' as const,
      correctAnswer: 3,
      explanation: 'Fastest to slowest: 10.05, 10.4, 10.45, 10.5. Remember that 10.4 = 10.40, so 10.40 < 10.45.',
      difficulty: 'Beginner',
      tags: ['decimals', 'ordering', 'place-value', 'comparison']
    },
  
    // Percentages & Ratios
    {
      questTitle: "Shopping Spree Savings",
      question: "A video game costs $60. If it's on sale for 25% off, what is the sale price?",
      type: 'text-input' as const,
      correctAnswer: "45",
      explanation: '25% of $60 = 0.25 × $60 = $15. Sale price = $60 - $15 = $45.',
      difficulty: 'Intermediate',
      tags: ['percentages', 'money', 'discount', 'real-world']
    },
  
    {
      questTitle: "Recipe Ratio Master",
      question: "A cookie recipe calls for 2 cups of flour for every 3 cups of sugar. If you use 6 cups of flour, how many cups of sugar do you need?",
      type: 'multiple-choice' as const,
      options: ['4 cups', '6 cups', '8 cups', '9 cups'],
      correctAnswer: 3,
      explanation: 'The ratio is 2:3 (flour:sugar). If flour is tripled (2×3=6), sugar must also be tripled (3×3=9).',
      difficulty: 'Intermediate',
      tags: ['ratios', 'proportions', 'cooking', 'scaling']
    },
  
    // Geometry & Measurement
    {
      questTitle: "Garden Plot Planner",
      question: "Maya wants to fence a rectangular garden that is 8 feet long and 6 feet wide. How much fencing does she need?",
      type: 'text-input' as const,
      correctAnswer: "28",
      explanation: 'Perimeter = 2 × (length + width) = 2 × (8 + 6) = 2 × 14 = 28 feet.',
      difficulty: 'Beginner',
      tags: ['perimeter', 'rectangles', 'measurement', 'real-world']
    },
  
    {
      questTitle: "Pizza Area Calculator",
      question: "Which pizza gives you more food: a 10-inch diameter pizza or two 6-inch diameter pizzas?",
      type: 'multiple-choice' as const,
      options: ['The 10-inch pizza', 'Two 6-inch pizzas', 'They are exactly the same', 'Need more information'],
      correctAnswer: 0,
      explanation: '10-inch pizza area: π × 5² = 25π ≈ 78.5 sq in. Two 6-inch pizzas: 2 × π × 3² = 18π ≈ 56.5 sq in. The large pizza wins!',
      difficulty: 'Advanced',
      tags: ['area', 'circles', 'comparison', 'real-world']
    },
  
    {
      questTitle: "Treasure Map Coordinates",
      question: "The treasure is located at point (4, -2) on a coordinate grid. From the origin (0, 0), which direction should you go?",
      type: 'multiple-choice' as const,
      options: ['4 right, 2 up', '4 right, 2 down', '4 left, 2 up', '4 left, 2 down'],
      correctAnswer: 1,
      explanation: 'Positive x means right, negative y means down. So go 4 units right and 2 units down.',
      difficulty: 'Beginner',
      tags: ['coordinates', 'graphing', 'positive-negative', 'treasure-hunt']
    },
  
    // Algebra & Patterns
    {
      questTitle: "Magic Number Machine",
      question: "The number machine follows this rule: Output = 3 × Input + 2. If the input is 7, what is the output?",
      type: 'text-input' as const,
      correctAnswer: "23",
      explanation: 'Output = 3 × 7 + 2 = 21 + 2 = 23.',
      difficulty: 'Intermediate',
      tags: ['algebra', 'functions', 'order-of-operations', 'patterns']
    },
  
    {
      questTitle: "Pattern Detective",
      question: "What comes next in this pattern: 2, 6, 18, 54, ?",
      type: 'multiple-choice' as const,
      options: ['108', '162', '216', '270'],
      correctAnswer: 1,
      explanation: 'Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162.',
      difficulty: 'Intermediate',
      tags: ['patterns', 'sequences', 'multiplication', 'logic']
    },
  
    {
      questTitle: "Balanced Equation Scale",
      question: "If 3x + 5 = 14, what is the value of x?",
      type: 'multiple-choice' as const,
      options: ['x = 2', 'x = 3', 'x = 4', 'x = 5'],
      correctAnswer: 1,
      explanation: '3x + 5 = 14. Subtract 5 from both sides: 3x = 9. Divide by 3: x = 3.',
      difficulty: 'Advanced',
      tags: ['algebra', 'equations', 'solving', 'balance']
    },
  
    // Data & Statistics
    {
      questTitle: "Class Pet Survey",
      question: "The class voted for their favorite pets: Dogs (12), Cats (8), Fish (5), Birds (3). What percentage of students chose dogs?",
      type: 'text-input' as const,
      correctAnswer: "43",
      explanation: 'Total votes: 12+8+5+3 = 28. Dog percentage: (12/28) × 100% = 42.86% ≈ 43%.',
      difficulty: 'Intermediate',
      tags: ['percentages', 'data', 'surveys', 'calculation']
    },
  
    {
      questTitle: "Weather Station Data",
      question: "The temperatures this week were: 72°F, 75°F, 68°F, 71°F, 74°F. What is the mean temperature?",
      type: 'multiple-choice' as const,
      options: ['70°F', '71°F', '72°F', '73°F'],
      correctAnswer: 2,
      explanation: 'Mean = (72+75+68+71+74) ÷ 5 = 360 ÷ 5 = 72°F.',
      difficulty: 'Beginner',
      tags: ['mean', 'average', 'data', 'temperature']
    },
  
    {
      questTitle: "Sports Statistics Challenge",
      question: "In a basketball game, Sam scored these points per quarter: 8, 12, 6, 10. What is the range of his scores?",
      type: 'text-input' as const,
      correctAnswer: "6",
      explanation: 'Range = Highest score - Lowest score = 12 - 6 = 6 points.',
      difficulty: 'Beginner',
      tags: ['range', 'statistics', 'sports', 'data-analysis']
    },
  
    // Money & Time
    {
      questTitle: "Allowance Budget Planner",
      question: "Sophie gets $15 allowance weekly. She wants to buy a $75 skateboard. How many weeks must she save all her allowance?",
      type: 'multiple-choice' as const,
      options: ['4 weeks', '5 weeks', '6 weeks', '7 weeks'],
      correctAnswer: 1,
      explanation: '$75 ÷ $15 per week = 5 weeks of saving.',
      difficulty: 'Beginner',
      tags: ['division', 'money', 'planning', 'real-world']
    },
  
    {
      questTitle: "Time Zone Traveler",
      question: "If it's 3:30 PM in New York and you travel to a city that is 2 hours behind, what time is it there?",
      type: 'multiple-choice' as const,
      options: ['1:30 PM', '2:30 PM', '4:30 PM', '5:30 PM'],
      correctAnswer: 0,
      explanation: 'If the destination is 2 hours behind, subtract 2 hours: 3:30 PM - 2 hours = 1:30 PM.',
      difficulty: 'Intermediate',
      tags: ['time', 'subtraction', 'time-zones', 'travel']
    },
  
    // Probability & Logic
    {
      questTitle: "Carnival Game Probability",
      question: "A spinner has 8 equal sections: 3 red, 3 blue, 2 yellow. What is the probability of spinning red?",
      type: 'multiple-choice' as const,
      options: ['1/8', '2/8', '3/8', '4/8'],
      correctAnswer: 2,
      explanation: 'Probability = Number of red sections ÷ Total sections = 3 ÷ 8 = 3/8.',
      difficulty: 'Intermediate',
      tags: ['probability', 'fractions', 'games', 'chance']
    },
  
    {
      questTitle: "Logic Puzzle Solver",
      question: "If all cats are animals, and some animals are pets, which statement must be true?",
      type: 'multiple-choice' as const,
      options: [
        'All cats are pets',
        'Some cats might be pets',
        'No cats are pets',
        'All pets are cats'
      ],
      correctAnswer: 1,
      explanation: 'We know cats are animals, and some animals are pets, so some cats might be pets. We cannot say all cats are pets.',
      difficulty: 'Advanced',
      tags: ['logic', 'reasoning', 'sets', 'critical-thinking']
    },
  
    // Multi-step Word Problems
    {
      questTitle: "School Fundraiser Challenge",
      question: "The school needs $2,400 for new books. They've raised $800 so far. If 40 students each sell $30 worth of items, will they reach their goal?",
      type: 'multiple-choice' as const,
      options: ['Yes, they will exceed the goal', 'Yes, they will exactly meet the goal', 'No, they will fall short', 'Not enough information'],
      correctAnswer: 0,
      explanation: 'Additional funds: 40 × $30 = $1,200. Total: $800 + $1,200 = $2,000. They need $2,400, so they fall short by $400.',
      difficulty: 'Advanced',
      tags: ['multi-step', 'money', 'multiplication', 'problem-solving']
    },
  
    {
      questTitle: "Movie Theater Seating",
      question: "A theater has 15 rows with 20 seats each. If 3/4 of the seats are filled, how many empty seats are there?",
      type: 'text-input' as const,
      correctAnswer: "75",
      explanation: 'Total seats: 15 × 20 = 300. Filled seats: 3/4 × 300 = 225. Empty seats: 300 - 225 = 75.',
      difficulty: 'Intermediate',
      tags: ['multiplication', 'fractions', 'subtraction', 'multi-step']
    },
  
    {
      questTitle: "Garden Growth Tracker",
      question: "A plant grows 2.5 cm each week. After 6 weeks, it is 25 cm tall. How tall was it when first planted?",
      type: 'multiple-choice' as const,
      options: ['8 cm', '10 cm', '12 cm', '15 cm'],
      correctAnswer: 1,
      explanation: 'Growth in 6 weeks: 6 × 2.5 = 15 cm. Original height: 25 - 15 = 10 cm.',
      difficulty: 'Intermediate',
      tags: ['decimals', 'multiplication', 'subtraction', 'growth']
    }
  ];
  
  // Helper function to organize questions by difficulty and topic
  export const organizeMathQuestions = () => {
    const byDifficulty = {
      Beginner: additionalMathQuestions.filter(q => q.difficulty === 'Beginner'),
      Intermediate: additionalMathQuestions.filter(q => q.difficulty === 'Intermediate'),
      Advanced: additionalMathQuestions.filter(q => q.difficulty === 'Advanced')
    };
  
    const byTopic = {
      'Fractions & Decimals': additionalMathQuestions.filter(q => 
        q.tags.some(tag => ['fractions', 'decimals', 'place-value'].includes(tag))
      ),
      'Percentages & Ratios': additionalMathQuestions.filter(q => 
        q.tags.some(tag => ['percentages', 'ratios', 'proportions'].includes(tag))
      ),
      'Geometry & Measurement': additionalMathQuestions.filter(q => 
        q.tags.some(tag => ['perimeter', 'area', 'coordinates', 'measurement'].includes(tag))
      ),
      'Algebra & Patterns': additionalMathQuestions.filter(q => 
        q.tags.some(tag => ['algebra', 'patterns', 'equations', 'functions'].includes(tag))
      ),
      'Data & Statistics': additionalMathQuestions.filter(q => 
        q.tags.some(tag => ['mean', 'range', 'data', 'statistics', 'surveys'].includes(tag))
      ),
      'Money & Time': additionalMathQuestions.filter(q => 
        q.tags.some(tag => ['money', 'time', 'time-zones', 'planning'].includes(tag))
      ),
      'Probability & Logic': additionalMathQuestions.filter(q => 
        q.tags.some(tag => ['probability', 'logic', 'reasoning', 'chance'].includes(tag))
      ),
      'Word Problems': additionalMathQuestions.filter(q => 
        q.tags.some(tag => ['word-problems', 'multi-step', 'problem-solving', 'real-world'].includes(tag))
      )
    };
  
    const byGradeLevel = {
      'Elementary (3rd-5th)': additionalMathQuestions.filter(q => 
        q.difficulty === 'Beginner' && 
        q.tags.some(tag => ['fractions', 'decimals', 'perimeter', 'mean', 'money'].includes(tag))
      ),
      'Middle School (6th-8th)': additionalMathQuestions.filter(q => 
        q.difficulty === 'Intermediate' && 
        q.tags.some(tag => ['percentages', 'ratios', 'coordinates', 'patterns', 'probability'].includes(tag))
      ),
      'Pre-Algebra (8th-9th)': additionalMathQuestions.filter(q => 
        q.difficulty === 'Advanced' && 
        q.tags.some(tag => ['algebra', 'equations', 'area', 'logic'].includes(tag))
      )
    };
  
    return { byDifficulty, byTopic, byGradeLevel };
  };
  
  // Assessment rubric for math questions
  export const mathAssessmentRubric = {
    'Beginner': {
      criteria: 'Student demonstrates basic understanding of concepts with minimal support',
      skills: ['Basic operations', 'Simple word problems', 'Pattern recognition', 'Basic measurement']
    },
    'Intermediate': {
      criteria: 'Student applies concepts to solve multi-step problems with some independence',
      skills: ['Multi-step operations', 'Real-world applications', 'Data interpretation', 'Proportional reasoning']
    },
    'Advanced': {
      criteria: 'Student demonstrates mastery by solving complex problems and explaining reasoning',
      skills: ['Abstract thinking', 'Complex problem solving', 'Mathematical reasoning', 'Proof and justification']
    }
  };