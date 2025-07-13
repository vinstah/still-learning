export interface ExamQuestion {
  id: string;
  subject: string;
  question: string;
  keyWords: string[];
  expectedFormulas: string[];
  answerStructure: string;
  commonMistakes: string[];
  decodingSteps: string[];
  markingCriteria: MarkingCriterion[];
  sampleAnswers: SampleAnswer[];
}

export interface MarkingCriterion {
  id: string;
  criterion: string;
  points: number;
  description: string;
}

export interface SampleAnswer {
  id: string;
  answer: string;
  grade: string;
  feedback: string;
  strengths: string[];
  improvements: string[];
}
export function decodeExamQuestion(questionText: string, subject: string): ExamQuestion {
  const commandWords = ['calculate', 'explain', 'describe', 'compare', 'analyze', 'evaluate', 'discuss'];
  const keyWords = commandWords.filter(word => 
    questionText.toLowerCase().includes(word)
  );

  const decodingSteps = [
    '1. Identify the command word (what you need to do)',
    '2. Find the key information given',
    '3. Determine what you need to find',
    '4. Choose the appropriate formula or method',
    '5. Structure your answer clearly'
  ];

  return {
    id: crypto.randomUUID(),
    subject,
    question: questionText,
    keyWords,
    expectedFormulas: getExpectedFormulas(subject, questionText),
    answerStructure: getAnswerStructure(keyWords[0] || 'explain'),
    commonMistakes: getCommonMistakes(subject),
    decodingSteps
  };
}

function getExpectedFormulas(subject: string, question: string): string[] {
  const formulas: Record<string, string[]> = {
    physics: ['F = ma', 'E = mc²', 'v = u + at', 'P = IV'],
    mathematics: ['y = mx + c', 'a² + b² = c²', 'V = πr²h'],
    engineering: ['σ = F/A', 'P = VI', 'η = Pout/Pin']
  };

  return formulas[subject.toLowerCase()] || [];
}

function getAnswerStructure(commandWord: string): string {
  const structures: Record<string, string> = {
    calculate: 'Given → Formula → Substitution → Calculation → Answer with units',
    explain: 'Definition → Process → Examples → Conclusion',
    describe: 'Overview → Key features → Details → Summary',
    compare: 'Similarities → Differences → Conclusion'
  };

  return structures[commandWord] || 'Introduction → Main points → Conclusion';
}

function getCommonMistakes(subject: string): string[] {
  const mistakes: Record<string, string[]> = {
    physics: ['Forgetting units', 'Wrong formula selection', 'Sign errors in vectors'],
    mathematics: ['Calculation errors', 'Not showing working', 'Misreading the question'],
    engineering: ['Unit conversion errors', 'Assumption not stated', 'Incomplete analysis']
  };

  return mistakes[subject.toLowerCase()] || ['Not reading the question carefully'];
}