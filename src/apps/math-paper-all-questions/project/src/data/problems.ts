import { MathProblem } from '../types';


// import { MathProblem } from '../types';

// const problems: MathProblem[] = [
//   // Arithmetic Properties
//   {
//     id: "ap1",
//     topicId: "arithmetic-properties",
//     question: "Which property is demonstrated by the equation:\n\n3 + (4 + 2) = (3 + 4) + 2",
//     difficulty: "easy",
//     hint: "Think about how we can group numbers when adding. The order of grouping doesn't affect the result.",
//     solution: "This demonstrates the Associative Property of Addition.\n\nThe associative property states that when adding three or more numbers, the way we group them doesn't matter:\n(a + b) + c = a + (b + c)",
//     answer: "Associative Property"
//   },
//   {
//     id: "ap2",
//     topicId: "arithmetic-properties",
//     question: "What property is shown by:\n\n5 × 1 = 5",
//     difficulty: "easy",
//     hint: "What happens when we multiply any number by 1?",
//     solution: "This demonstrates the Identity Property of Multiplication.\n\nThe identity property states that any number multiplied by 1 equals itself:\nn × 1 = n",
//     answer: "Identity Property"
//   },
//   {
//     id: "1",
//     topicId: "linear-equations",
//     question: "Solve for x:\n\n3x + 5 = 14",
//     difficulty: "easy",
//     hint: "Subtract 5 from both sides first, then divide both sides by 3.",
//     solution: "3x + 5 = 14\n3x = 14 - 5\n3x = 9\nx = 9 ÷ 3\nx = 3",
//     answer: "3"
//   },
//   {
//     id: "2",
//     topicId: "linear-equations",
//     question: "Solve for x:\n\n4x - 7 = 2x + 3",
//     difficulty: "easy",
//     hint: "Move all x terms to one side and all constant terms to the other side.",
//     solution: "4x - 7 = 2x + 3\n4x - 2x = 3 + 7\n2x = 10\nx = 5",
//     answer: "5"
//   },
//   {
//     id: "3",
//     topicId: "linear-equations",
//     question: "Solve for x:\n\n2(3x - 4) = 10",
//     difficulty: "medium",
//     hint: "First, distribute the 2 to the terms inside the parentheses.",
//     solution: "2(3x - 4) = 10\n6x - 8 = 10\n6x = 10 + 8\n6x = 18\nx = 3",
//     answer: "3"
//   },
//   {
//     id: "4",
//     topicId: "inequalities",
//     question: "Solve for x:\n\n2x + 3 > 7",
//     difficulty: "easy",
//     hint: "Subtract 3 from both sides, then divide both sides by 2.",
//     solution: "2x + 3 > 7\n2x > 7 - 3\n2x > 4\nx > 2",
//     answer: "x > 2"
//   },
//   {
//     id: "5",
//     topicId: "inequalities",
//     question: "Solve for x:\n\n-3x + 4 ≤ -5",
//     difficulty: "medium",
//     hint: "Subtract 4 from both sides, then divide by -3. Remember that when you divide by a negative number, the inequality sign flips!",
//     solution: "-3x + 4 ≤ -5\n-3x ≤ -5 - 4\n-3x ≤ -9\nx ≥ 3",
//     answer: "x ≥ 3"
//   },
//   {
//     id: "6",
//     topicId: "quadratic-equations",
//     question: "Solve for x using the quadratic formula:\n\nx² - 5x + 6 = 0",
//     difficulty: "medium",
//     hint: "Use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a where a=1, b=-5, c=6",
//     solution: "Using the quadratic formula with a=1, b=-5, c=6:\n\nx = (-(-5) ± √((-5)² - 4×1×6)) / 2×1\nx = (5 ± √(25 - 24)) / 2\nx = (5 ± √1) / 2\nx = (5 ± 1) / 2\n\nSo, x = 3 or x = 2",
//     answer: "x = 2, x = 3"
//   },
//   {
//     id: "7",
//     topicId: "quadratic-equations",
//     question: "Factor completely:\n\nx² - 7x + 12",
//     difficulty: "medium",
//     hint: "Find two numbers that multiply to give 12 and add up to -7.",
//     solution: "We need two numbers that multiply to give 12 and add up to -7.\n\nThose numbers are -3 and -4 because:\n(-3) × (-4) = 12\n-3 + (-4) = -7\n\nTherefore, x² - 7x + 12 = (x - 3)(x - 4)",
//     answer: "(x - 3)(x - 4)"
//   },
//   {
//     id: "8",
//     topicId: "systems-of-equations",
//     question: "Solve the system of equations:\n\n2x + y = 5\nx - y = 1",
//     difficulty: "medium",
//     hint: "Try solving for y in terms of x using the second equation, then substitute into the first equation.",
//     solution: "From the second equation: x - y = 1\nRearranging: y = x - 1\n\nSubstituting into the first equation:\n2x + (x - 1) = 5\n3x - 1 = 5\n3x = 6\nx = 2\n\nNow we find y by substituting x = 2 into y = x - 1:\ny = 2 - 1 = 1\n\nThe solution is (2, 1)",
//     answer: "(2, 1)"
//   },
//   {
//     id: "9",
//     topicId: "exponents",
//     question: "Simplify the expression:\n\n(x³)² · x⁴",
//     difficulty: "hard",
//     hint: "Use the power rule: (x^m)^n = x^(m×n), and the product rule: x^m · x^n = x^(m+n).",
//     solution: "(x³)² · x⁴\n= x^(3×2) · x⁴\n= x⁶ · x⁴\n= x^(6+4)\n= x¹⁰",
//     answer: "x^10"
//   },
//   {
//     id: "10",
//     topicId: "exponents",
//     question: "Simplify the expression:\n\n(2x²y)³ ÷ (4xy²)²",
//     difficulty: "hard",
//     hint: "Expand using the power rules, then simplify by combining like terms in the exponents.",
//     solution: "(2x²y)³ ÷ (4xy²)²\n= (2³)(x²)³(y)³ ÷ (4²)(x)²(y²)²\n= 8x⁶y³ ÷ 16x²y⁴\n= (8/16)x^(6-2)y^(3-4)\n= (1/2)x⁴y⁻¹\n= x⁴/(2y)",
//     answer: "x^4/(2y)"
//   },
//   {
//     id: "ns1",
//     topicId: "number-system",
//     question: "What is the absolute value of -7?",
//     difficulty: "easy",
//     hint: "The absolute value is the distance from zero on a number line, regardless of direction.",
//     solution: "The absolute value of a number is its distance from 0 on the number line, regardless of whether it's positive or negative.\n\n|-7| = 7",
//     answer: "7"
//   },
//   {
//     id: "ns2",
//     topicId: "number-system",
//     question: "Simplify:\n\n-3 + (-5)",
//     difficulty: "medium",
//     hint: "When adding negative numbers, add their absolute values and keep the negative sign.",
//     solution: "When adding two negative numbers:\n1. Add their absolute values: 3 + 5 = 8\n2. Keep the negative sign\n\nTherefore, -3 + (-5) = -8",
//     answer: "-8"
//   }
// ].sort((a, b) => a.id.localeCompare(b.id));

// export default problems;

// import { Problem } from '../types';

export const problems: MathProblem[] = [
  // Linear Equations
  {
    id: "linear-eq 1",
    topicId: "linear-equations",
    question: "Solve for x:\n\n3x + 5 = 14",
    difficulty: "easy",
    answer: "x = 3",
    solution: "To solve this equation, isolate the variable by subtracting 5 from both sides, then divide both sides by 3.",
    hint: "Subtract 5 from both sides first, then divide both sides by 3.",
    steps: [
      "3x + 5 = 14",
      "3x = 14 - 5",
      "3x = 9",
      "x = 9 ÷ 3",
      "x = 3"
    ]
  },
  {
    id: "linear-eq 2",
    topicId: "linear-equations",
    question: "Solve for x:\n\n4x - 7 = 2x + 3",
    difficulty: "easy",
    answer: "x = 5",
    solution: "To solve this equation, group like terms by moving all variable terms to one side and all constants to the other side.",
    hint: "Move all x terms to one side and all constant terms to the other side.",
    steps: [
      "4x - 7 = 2x + 3",
      "4x - 2x = 3 + 7",
      "2x = 10",
      "x = 5"
    ]
  },
  {
    id: "linear-eq 3",
    topicId: "linear-equations",
    question: "Solve for x:\n\n2(3x - 4) = 10",
    difficulty: "medium",
    answer: "x = 3",
    solution: "To solve this equation, first distribute the coefficient, then isolate the variable.",
    hint: "First, distribute the 2 to the terms inside the parentheses.",
    steps: [
      "2(3x - 4) = 10",
      "6x - 8 = 10",
      "6x = 10 + 8",
      "6x = 18",
      "x = 3"
    ]
  },
  {
    id: "linear-eq 4",
    topicId: "linear-equations",
    question: "Solve for x: 2x + 5 = 13",
    difficulty: "easy",
    answer: "x = 4",
    solution: "To solve, subtract 5 from both sides, then divide by 2.",
    hint: "Isolate the variable by moving constants to the other side, Remember to divide by the coefficient of x",
    steps: [
      "2x + 5 = 13",
      "2x = 13 - 5",
      "2x = 8",
      "x = 8 ÷ 2",
      "x = 4"
    ]
  },
  {
    id: "eq11",
    topicId: "linear-equations",
    question: "Solve: ( x + 4 = -3 )",
    difficulty: "easy",
    hint: "Subtract 4 from both sides.",
    solution: "x = -3 - 4 = -7",
    answer: "-7",
    steps: ["@TODO"],
  },
  {
    id: "eq12",
    topicId: "linear-equations",
    question: "Solve: ( 6x = 42 )",
    difficulty: "easy",
    hint: "Divide both sides by 6.",
    solution: "x = 42 / 6 = 7",
    answer: "7",
    steps: ["@TODO"],
  },
  {
    id: "eq13",
    topicId: "linear-equations",
    question: "Three times a number is 24. What is the number?",
    difficulty: "easy",
    hint: "Let x be the number. Then 3x = 24.",
    solution: "x = 24 / 3 = 8",
    answer: "8",
    steps: ["@TODO"],
  },
  {
    id: "eq14",
    topicId: "linear-equations",
    question: "The sum of a number and 9 is equal to 20. Find the number.",
    difficulty: "easy",
    hint: "Let x be the number. Then x + 9 = 20.",
    solution: "x = 20 - 9 = 11",
    answer: "11",
    steps: ["@TODO"],
  },
  {
    id: "eq15",
    topicId: "linear-equations",
    question: "Solve: \( 4x - 1 = 2x + 5 \)",
    difficulty: "medium",
    hint: "Get x terms on one side and constants on the other.",
    solution: "4x - 2x = 5 + 1 → 2x = 6 → x = 3",
    answer: "3",
    steps: ["@TODO"],
  },
  {
    id: "eq16",
    topicId: "more-solving-equations",
    question: "Solve: \( 7x + 4 = 3x - 12 \)",
    difficulty: "medium",
    hint: "Move all x terms to one side and constants to the other.",
    solution: "7x - 3x = -12 - 4 → 4x = -16 → x = -4",
    answer: "-4",
    steps: ["@TODO"],
  },
  {
    id: "eq17",
    topicId: "equations-parentheses-fractions",
    question: "Solve: \( 3(x + 2) = 2(x - 1) \)",
    difficulty: "medium",
    hint: "Distribute both sides and solve for x.",
    solution: "3x + 6 = 2x - 2 → x = -8",
    answer: "-8",
    steps: ["@TODO"],
  },
  {
    id: "eq18",
    topicId: "equations-parentheses-fractions",
    question: "Solve: \( \frac{2x - 1}{5} = \frac{x + 3}{2} \)",
    difficulty: "hard",
    hint: "Multiply both sides by 10 to eliminate denominators.",
    solution: "4x - 2 = 5x + 15 → -x = 17 → x = -17",
    answer: "-17",
    steps: ["@TODO"],
  },

  
  {
    "id": "eq01",
    "topicId": "basic-equations",
    "question": "Solve: $4x + 7 = 19$",
    "difficulty": "easy",
    "hint": "Subtract 7 from both sides, then divide by 4.",
    "solution": "4x + 7 = 19 → 4x = 12 → x = 3",
    "answer": "3"
  },
  {
    "id": "eq02",
    "topicId": "basic-equations",
    "question": "Solve: $-2x + 5 = -13$",
    "difficulty": "easy",
    "hint": "Subtract 5 from both sides, then divide by -2.",
    "solution": "-2x + 5 = -13 → -2x = -18 → x = 9",
    "answer": "9"
  },
  {
    "id": "eq03",
    "topicId": "basic-equations",
    "question": "Solve: $3(x - 4) = 15$",
    "difficulty": "medium",
    "hint": "First divide both sides by 3, then add 4.",
    "solution": "3(x - 4) = 15 → x - 4 = 5 → x = 9",
    "answer": "9"
  },
  {
    "id": "eq04",
    "topicId": "word-problems",
    "question": "The sum of three consecutive integers is 42. Find the smallest integer.",
    "difficulty": "medium",
    "hint": "Let x be the smallest integer. Then the three consecutive integers are x, x+1, and x+2.",
    "solution": "x + (x+1) + (x+2) = 42 → 3x + 3 = 42 → 3x = 39 → x = 13",
    "answer": "13"
  },
  {
    "id": "eq05",
    "topicId": "word-problems",
    "question": "A rectangular garden has a perimeter of 36 feet. If the length is 2 feet more than twice the width, find the dimensions of the garden.",
    "difficulty": "hard",
    "hint": "Let w = width. Then length = 2 + 2w. Use the perimeter formula P = 2l + 2w.",
    "solution": "2(2 + 2w) + 2w = 36 → 4 + 4w + 2w = 36 → 4 + 6w = 36 → 6w = 32 → w = 5⅓, l = 2 + 2(5⅓) = 12⅔",
    "answer": "width: 5⅓ feet, length: 12⅔ feet"
  },
  {
    "id": "eq06",
    "topicId": "complex-equations",
    "question": "Solve: $5x - 3(x + 2) = 4(x - 1) + 7$",
    "difficulty": "medium",
    "hint": "Expand all terms, then collect like terms.",
    "solution": "5x - 3x - 6 = 4x - 4 + 7 → 2x - 6 = 4x + 3 → -2x = 9 → x = -4.5",
    "answer": "-4.5"
  },
  {
    "id": "eq07",
    "topicId": "complex-equations",
    "question": "Solve: $8 - 2(3 - x) = 5x - 10$",
    "difficulty": "medium",
    "hint": "Distribute -2 through the parentheses first.",
    "solution": "8 - 6 + 2x = 5x - 10 → 2 + 2x = 5x - 10 → 2x - 5x = -10 - 2 → -3x = -12 → x = 4",
    "answer": "4"
  },
  {
    "id": "eq08",
    "topicId": "equations-parentheses-fractions",
    "question": "Solve: $\\frac{x}{3} + \\frac{x-1}{4} = 5$",
    "difficulty": "medium",
    "hint": "Multiply all terms by 12 to eliminate the denominators.",
    "solution": "4x + 3(x-1) = 60 → 4x + 3x - 3 = 60 → 7x = 63 → x = 9",
    "answer": "9"
  },
  {
    "id": "eq09",
    "topicId": "equations-parentheses-fractions",
    "question": "Solve: $2(x-3) - 4(2x+1) = 3(x-4) - 5$",
    "difficulty": "hard",
    "hint": "Expand all expressions and collect like terms.",
    "solution": "2x - 6 - 8x - 4 = 3x - 12 - 5 → -6x - 10 = 3x - 17 → -6x - 3x = -17 + 10 → -9x = -7 → x = 7/9",
    "answer": "7/9"
  },
  {
    "id": "eq10",
    "topicId": "linear-equations",
    "question": "Solve: $\\frac{2x - 1}{5} = \\frac{x + 3}{2}$",
    "difficulty": "hard",
    "hint": "Multiply both sides by 10 to eliminate denominators.",
    "solution": "4x - 2 = 5x + 15 → -x = 17 → x = -17",
    "answer": "-17"
  },

  {
    "id": "eq19",
    "topicId": "linear-equations",
    "question": "Solve: $\\frac{1}{2}(3x-4) - \\frac{1}{3}(2x+1) = 5$",
    "difficulty": "hard",
    "hint": "Multiply all terms by 6 to eliminate the fractions.",
    "solution": "6[\\frac{1}{2}(3x-4) - \\frac{1}{3}(2x+1) = 5] → 3(3x-4) - 2(2x+1) = 30 → 9x - 12 - 4x - 2 = 30 → 5x - 14 = 30 → 5x = 44 → x = 8.8",
    "answer": "8.8"
  },
  

  
  // Inequalities
  {
    id: "4",
    topicId: "inequalities",
    question: "Solve for x:\n\n2x + 3 > 7",
    difficulty: "easy",
    answer: "x > 2",
    solution: "To solve this inequality, isolate the variable while preserving the inequality sign.",
    hint: "Subtract 3 from both sides, then divide both sides by 2.",
    steps: [
      "2x + 3 > 7",
      "2x > 7 - 3",
      "2x > 4",
      "x > 2"
    ]
  },
  {
    id: "5",
    topicId: "inequalities",
    question: "Solve for x:\n\n-3x + 4 ≤ -5",
    difficulty: "medium",
    answer: "x ≥ 3",
    solution: "To solve this inequality, isolate the variable. Remember that when multiplying or dividing by a negative number, the inequality sign flips.",
    hint: "Subtract 4 from both sides, then divide by -3. Remember that when you divide by a negative number, the inequality sign flips!",
    steps: [
      "-3x + 4 ≤ -5",
      "-3x ≤ -5 - 4",
      "-3x ≤ -9",
      "x ≥ 3"
    ]
  },
  {
    id: "eq19",
    topicId: "compound-inequalities",
    question: "Solve: \( 1 \leq 3x - 2 < 7 \)",
    difficulty: "medium",
    hint: "Break it into two inequalities and solve.",
    solution: "1 ≤ 3x - 2 → 3 ≤ 3x → x ≥ 1; 3x - 2 < 7 → 3x < 9 → x < 3; Final: 1 ≤ x < 3",
    answer: "1 ≤ x < 3",
    steps: ["@TODO"],
  },
  {
    id: "eq20",
    topicId: "compound-inequalities-problems",
    question: "A number is no less than -2 and no more than 5. Write this as an inequality.",
    difficulty: "easy",
    hint: "No less than means ≥, no more than means ≤.",
    solution: "-2 ≤ x ≤ 5",
    answer: "-2 ≤ x ≤ 5",
    steps: ["@TODO"],
  },

  {
    "id": "eq20",
    "topicId": "compound-inequalities",
    "question": "Solve: $\\frac{x-2}{4} > 1$ and $\\frac{x+3}{2} < 4$",
    "difficulty": "hard",
    "hint": "Solve each inequality separately, then find the intersection.",
    "solution": "\\frac{x-2}{4} > 1 → x - 2 > 4 → x > 6; \\frac{x+3}{2} < 4 → x + 3 < 8 → x < 5; Solution: x > 6 and x < 5, which is impossible.",
    "answer": "∅ (empty set)"
  },
  
  // Quadratic Equations
  {
    id: "6",
    topicId: "quadratic-equations",
    question: "Solve for x using the quadratic formula:\n\nx² - 5x + 6 = 0",
    difficulty: "medium",
    answer: "x = 2, x = 3",
    solution: "Using the quadratic formula with a=1, b=-5, c=6 to find the roots of this quadratic equation.",
    hint: "Use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a where a=1, b=-5, c=6",
    steps: [
      "Using the quadratic formula with a=1, b=-5, c=6:",
      "x = (-(-5) ± √((-5)² - 4×1×6)) / 2×1",
      "x = (5 ± √(25 - 24)) / 2",
      "x = (5 ± √1) / 2",
      "x = (5 ± 1) / 2",
      "x = 3 or x = 2"
    ]
  },
  {
    id: "7",
    topicId: "quadratic-equations",
    question: "Factor completely:\n\nx² - 7x + 12",
    difficulty: "medium",
    answer: "(x - 3)(x - 4)",
    solution: "Find the factors of 12 that add up to -7 to factor this quadratic expression.",
    hint: "Find two numbers that multiply to give 12 and add up to -7.",
    steps: [
      "We need two numbers that multiply to give 12 and add up to -7",
      "Those numbers are -3 and -4 because:",
      "(-3) × (-4) = 12",
      "-3 + (-4) = -7",
      "Therefore, x² - 7x + 12 = (x - 3)(x - 4)"
    ]
  },
  {
    id: "quad-eq-1",
    topicId: "quadratic-functions",
    question: "Solve the quadratic equation: x² - 5x + 6 = 0",
    difficulty: "medium",
    answer: "x = 2, x = 3",
    solution: "Factor the expression and set each factor equal to zero.",
    hint: "Look for factors of 6 that add up to -5, Try using (x-a)(x-b) format",
    steps: [
      "x² - 5x + 6 = 0",
      "(x - 2)(x - 3) = 0",
      "x - 2 = 0 or x - 3 = 0",
      "x = 2 or x = 3"
    ]
  },
  
  // Systems of Equations
  {
    id: "8",
    topicId: "systems-of-equations",
    question: "Solve the system of equations:\n\n2x + y = 5\nx - y = 1",
    difficulty: "medium",
    answer: "(2, 1)",
    solution: "To solve this system, we can solve for y in terms of x using the second equation, then substitute into the first equation.",
    hint: "Try solving for y in terms of x using the second equation, then substitute into the first equation.",
    steps: [
      "From the second equation: x - y = 1",
      "Rearranging: y = x - 1",
      "Substituting into the first equation:",
      "2x + (x - 1) = 5",
      "3x - 1 = 5",
      "3x = 6",
      "x = 2",
      "Now we find y by substituting x = 2 into y = x - 1:",
      "y = 2 - 1 = 1",
      "The solution is (2, 1)"
    ]
  },
  
  // Exponents
  {
    id: "9",
    topicId: "exponents",
    question: "Simplify the expression:\n\n(x³)² · x⁴",
    difficulty: "hard",
    answer: "x¹⁰",
    solution: "To simplify this expression, apply the power rule and the product rule for exponents.",
    hint: "Use the power rule: (x^m)^n = x^(m×n), and the product rule: x^m · x^n = x^(m+n).",
    steps: [
      "(x³)² · x⁴",
      "= x^(3×2) · x⁴",
      "= x⁶ · x⁴",
      "= x^(6+4)",
      "= x¹⁰"
    ]
  },
  {
    id: "10",
    topicId: "exponents",
    question: "Simplify the expression:\n\n(2x²y)³ ÷ (4xy²)²",
    difficulty: "hard",
    answer: "x⁴/(2y)",
    solution: "To simplify this expression, apply the power rules for exponents and then combine like terms.",
    hint: "Expand using the power rules, then simplify by combining like terms in the exponents.",
    steps: [
      "(2x²y)³ ÷ (4xy²)²",
      "= (2³)(x²)³(y)³ ÷ (4²)(x)²(y²)²",
      "= 8x⁶y³ ÷ 16x²y⁴",
      "= (8/16)x^(6-2)y^(3-4)",
      "= (1/2)x⁴y⁻¹",
      "= x⁴/(2y)"
    ]
  },
  {
    id: "exp-1",
    topicId: "exponential-functions",
    question: "Solve for x: 2^x = 32",
    difficulty: "medium",
    answer: "x = 5",
    solution: "Express 32 as a power of 2, then solve the equation.",
    hint: "Convert 32 to a power of 2, Remember that 2^5 = 32",
    steps: [
      "2^x = 32",
      "2^x = 2^5",
      "x = 5"
    ]
  },
  
  // Number System
  {
    id: "ns1",
    topicId: "number-system",
    question: "What is the absolute value of -7?",
    difficulty: "easy",
    answer: "7",
    solution: "The absolute value of a number is its distance from zero on the number line, regardless of sign.",
    hint: "The absolute value is the distance from zero on a number line, regardless of direction.",
    steps: [
      "The absolute value of a number is its distance from 0 on the number line",
      "|-7| represents the distance between -7 and 0",
      "This distance is 7 units",
      "Therefore, |-7| = 7"
    ]
  },
  {
    id: "ns2",
    topicId: "number-system",
    question: "Simplify:\n\n-3 + (-5)",
    difficulty: "medium",
    answer: "-8",
    solution: "When adding two negative numbers, add their absolute values and keep the negative sign.",
    hint: "When adding negative numbers, add their absolute values and keep the negative sign.",
    steps: [
      "When adding two negative numbers:",
      "1. Add their absolute values: 3 + 5 = 8",
      "2. Keep the negative sign",
      "Therefore, -3 + (-5) = -8"
    ]
  },
  
  // Polynomials
  {
    id: "poly-1",
    topicId: "polynomials",
    question: "Factor completely: 2x³ - 2x² - 12x",
    difficulty: "medium",
    answer: "2x(x² - x - 6) = 2x(x - 3)(x + 2)",
    solution: "First factor out the GCF, then factor the remaining quadratic expression.",
    hint: "Find the greatest common factor first. Then factor the remaining quadratic expression",
    steps: [
      "2x³ - 2x² - 12x",
      "First, factor out the GCF of 2x:",
      "2x(x² - x - 6)",
      "Now factor the quadratic expression x² - x - 6:",
      "Find two numbers that multiply to give -6 and add to give -1",
      "Those numbers are -3 and 2, because (-3)(2) = -6 and -3 + 2 = -1",
      "2x(x - 3)(x + 2)"
    ]
  },
  
  // Rational Expressions
  {
    id: "rational-1",
    topicId: "rational-expressions",
    question: "Simplify: (x² - 9) / (x - 3)",
    difficulty: "medium",
    answer: "x + 3, x ≠ 3",
    solution: "Factor the numerator and cancel common terms with the denominator.",
    hint: "Factor the difference of squares in the numerator. Remember to state the restriction",
    steps: [
      "(x² - 9) / (x - 3)",
      "Factor the numerator as a difference of squares: x² - 9 = (x - 3)(x + 3)",
      "((x - 3)(x + 3)) / (x - 3)",
      "Cancel the common factor (x - 3):",
      "x + 3, where x ≠ 3"
    ]
  },
  
  // Logarithms
  {
    id: "log-1",
    topicId: "logarithms",
    question: "Solve for x: log₃(x + 1) = 2",
    difficulty: "medium",
    answer: "x = 8",
    solution: "Apply the definition of logarithm to convert to exponential form.",
    hint: "Convert to exponential form: if log₃(x + 1) = 2, then x + 1 = 3². Solve for x",
    steps: [
      "log₃(x + 1) = 2",
      "Convert to exponential form:",
      "x + 1 = 3²",
      "x + 1 = 9",
      "x = 8"
    ]
  },
  
  // Arithmetic Properties
  {
    id: "ap1",
    topicId: "arithmetic-properties",
    question: "Which property is demonstrated by the equation:\n\n3 + (4 + 2) = (3 + 4) + 2",
    difficulty: "easy",
    answer: "Associative Property",
    solution: "The associative property states that when adding three or more numbers, the way we group them doesn't matter.",
    hint: "Think about how we can group numbers when adding. The order of grouping doesn't affect the result.",
    steps: [
      "This equation shows that changing how numbers are grouped doesn't affect the result",
      "On the left: 3 + (4 + 2) = 3 + 6 = 9",
      "On the right: (3 + 4) + 2 = 7 + 2 = 9",
      "This demonstrates the Associative Property of Addition",
      "The associative property states that (a + b) + c = a + (b + c)"
    ]
  },
  {
    id: "ap2",
    topicId: "arithmetic-properties",
    question: "What property is shown by:\n\n5 × 1 = 5",
    difficulty: "easy",
    answer: "Identity Property",
    solution: "The identity property of multiplication states that any number multiplied by 1 equals itself.",
    hint: "What happens when we multiply any number by 1?",
    steps: [
      "This equation shows that 5 multiplied by 1 gives back 5",
      "This demonstrates the Identity Property of Multiplication",
      "The identity property states that any number multiplied by 1 equals itself",
      "Generally written as: n × 1 = n"
    ]
  },
  {
    id: "rn1",
    topicId: "rational-multiply-divide",
    question: "Evaluate: \\( \\frac{3}{4} \\times \\frac{8}{9} \\)",
    difficulty: "easy",
    hint: "Multiply the numerators and denominators directly. Simplify if possible.",
    solution: "\\( \\frac{3 \\times 8}{4 \\times 9} = \\frac{24}{36} = \\frac{2}{3} \\)",
    answer: "2/3"
  },
  {
    id: "rn2",
    topicId: "rational-multiply-divide",
    question: "Divide: \\( \\frac{5}{6} \\div \\frac{2}{3} \\)",
    difficulty: "medium",
    hint: "Dividing by a fraction is the same as multiplying by its reciprocal.",
    solution: "\\( \\frac{5}{6} \\div \\frac{2}{3} = \\frac{5}{6} \\times \\frac{3}{2} = \\frac{15}{12} = \\frac{5}{4} \\)",
    answer: "5/4"
  },
  {
    id: "rn3",
    topicId: "rational-add-subtract",
    question: "Add: \\( -\\frac{7}{8} + \\frac{3}{4} \\)",
    difficulty: "medium",
    hint: "Find a common denominator before adding.",
    solution: "\\( -\\frac{7}{8} + \\frac{6}{8} = -\\frac{1}{8} \\)",
    answer: "-1/8"
  },
  {
    id: "rn4",
    topicId: "rational-add-subtract",
    question: "Subtract: \\( \\frac{2}{5} - (-\\frac{1}{10}) \\)",
    difficulty: "medium",
    hint: "Subtracting a negative is the same as adding.",
    solution: "\\( \\frac{2}{5} + \\frac{1}{10} = \\frac{4}{10} + \\frac{1}{10} = \\frac{5}{10} = \\frac{1}{2} \\)",
    answer: "1/2"
  },
  {
    id: "rn5",
    topicId: "real-numbers-expressions",
    question: "Simplify: \\( \\sqrt{16} + \\frac{3}{2} \\times 4 \\)",
    difficulty: "easy",
    hint: "Evaluate square roots and perform multiplication.",
    solution: "\\( \\sqrt{16} = 4, \\frac{3}{2} \\times 4 = 6, 4 + 6 = 10 \\)",
    answer: "10"
  },
  {
    id: "rn6",
    topicId: "real-numbers-expressions",
    question: "Evaluate the expression when \\( x = 2 \\): \\( \\frac{5}{x} + x^2 \\)",
    difficulty: "easy",
    hint: "Substitute the value of x and follow order of operations.",
    solution: "\\( \\frac{5}{2} + 2^2 = 2.5 + 4 = 6.5 \\)",
    answer: "6.5"
  },
  {
    id: "rn7",
    topicId: "exponents",
    question: "Simplify: \\( 2^3 \\times 2^2 \\)",
    difficulty: "easy",
    hint: "When multiplying with the same base, add exponents.",
    solution: "\\( 2^{3+2} = 2^5 = 32 \\)",
    answer: "32"
  },
  {
    id: "rn8",
    topicId: "exponents",
    question: "Simplify: \\( (3^2)^3 \\)",
    difficulty: "medium",
    hint: "Power of a power: multiply the exponents.",
    solution: "\\( 3^{2 \\times 3} = 3^6 = 729 \\)",
    answer: "729"
  },
  {
    id: "rn9",
    topicId: "english-to-algebra",
    question: "Translate into an algebraic expression: Five more than twice a number.",
    difficulty: "easy",
    hint: "Let the number be x. Twice means 2 times.",
    solution: "Twice a number is 2x. Five more than that is 2x + 5.",
    answer: "2x + 5"
  },
  {
    id: "rn10",
    topicId: "english-to-algebra",
    question: "Write an algebraic expression for: The quotient of a number and 4 decreased by 3.",
    difficulty: "medium",
    hint: "Let the number be x. Quotient means division.",
    solution: "The quotient of a number and 4 is \\( \\frac{x}{4} \\), decreased by 3: \\( \\frac{x}{4} - 3 \\)",
    answer: "x/4 - 3"
  },

  {
    "id": "eq11",
    "topicId": "basic-inequalities",
    "question": "Solve and express the solution in interval notation: $2x - 5 < 11$",
    "difficulty": "easy",
    "hint": "Add 5 to both sides, then divide by 2.",
    "solution": "2x - 5 < 11 → 2x < 16 → x < 8",
    "answer": "(-∞, 8)"
  },
  {
    "id": "eq12",
    "topicId": "basic-inequalities",
    "question": "Solve and express the solution in interval notation: $-3x + 4 ≤ -8$",
    "difficulty": "medium",
    "hint": "Subtract 4 from both sides, then divide by -3. Remember to flip the inequality when dividing by a negative number.",
    "solution": "-3x + 4 ≤ -8 → -3x ≤ -12 → x ≥ 4",
    "answer": "[4, ∞)"
  },
  {
    "id": "eq13",
    "topicId": "basic-inequalities",
    "question": "Solve and graph the solution: $7 - 2x > 4x + 15$",
    "difficulty": "medium",
    "hint": "Collect all terms with x on one side.",
    "solution": "7 - 2x > 4x + 15 → -2x - 4x > 15 - 7 → -6x > 8 → x < -4/3",
    "answer": "(-∞, -4/3)"
  },
  {
    "id": "eq14",
    "topicId": "compound-inequalities",
    "question": "Solve: $-1 < 2x - 3 < 7$",
    "difficulty": "medium",
    "hint": "Add 3 to all parts, then divide all parts by 2.",
    "solution": "-1 < 2x - 3 < 7 → 2 < 2x < 10 → 1 < x < 5",
    "answer": "(1, 5)"
  },
  {
    "id": "eq15",
    "topicId": "compound-inequalities",
    "question": "Solve: $x - 5 < -2$ or $x + 1 > 8$",
    "difficulty": "medium",
    "hint": "Solve each inequality separately, then find the union.",
    "solution": "x - 5 < -2 → x < 3; x + 1 > 8 → x > 7; Solution: x < 3 or x > 7",
    "answer": "(-∞, 3) ∪ (7, ∞)"
  },
  {
    "id": "eq16",
    "topicId": "compound-inequalities",
    "question": "Solve: $-3 ≤ 4x - 5 ≤ 11$",
    "difficulty": "medium",
    "hint": "Add 5 to all parts, then divide all parts by 4.",
    "solution": "-3 ≤ 4x - 5 ≤ 11 → 2 ≤ 4x ≤ 16 → 1/2 ≤ x ≤ 4",
    "answer": "[1/2, 4]"
  },
  {
    "id": "eq17",
    "topicId": "inequality-word-problems",
    "question": "A student needs to earn at least 70 points to pass a course. They have already earned 58 points. If the final exam is worth x points, write and solve an inequality to find the minimum score needed on the final exam.",
    "difficulty": "medium",
    "hint": "Set up the inequality: 58 + x ≥ 70",
    "solution": "58 + x ≥ 70 → x ≥ 12",
    "answer": "x ≥ 12 points"
  },
  {
    "id": "eq18",
    "topicId": "inequality-word-problems",
    "question": "A rectangular pool has a perimeter of at most 100 feet. If the width must be 15 feet, what are the possible values for the length?",
    "difficulty": "hard",
    "hint": "Use the formula for perimeter: 2l + 2w ≤ 100",
    "solution": "2l + 2(15) ≤ 100 → 2l + 30 ≤ 100 → 2l ≤ 70 → l ≤ 35",
    "answer": "(0, 35]"
  },
 
].sort((a, b) => a.id.localeCompare(b.id));

export default problems;