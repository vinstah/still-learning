interface HistoryEntry {
  expression: string;
  result: string;
}

interface CalculatorState {
  expression: string;
  result: string;
  mode: 'basic' | 'scientific' | 'algebra' | 'calculus';
  history: HistoryEntry[];
}