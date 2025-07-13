import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Question } from '../../../types';
import { Button } from '../../ui/Button';

interface EquationInputQuestionProps {
  question: Question;
  onAnswerSubmit: (answer: string) => void;
  showHints?: boolean;
}

export function EquationInputQuestion({ 
  question, 
  onAnswerSubmit, 
  showHints = false 
}: EquationInputQuestionProps) {
  const [equation, setEquation] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (equation.trim()) {
      onAnswerSubmit(equation.trim());
    }
  };

  const insertSymbol = (symbol: string) => {
    setEquation(prev => prev + symbol);
  };

  const commonSymbols = ['π', '∞', '∑', '∫', '√', '²', '³', '±', '≤', '≥', '≠', '∆'];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {question.question}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter your equation:
            </label>
            <input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g., F = ma"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-lg"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Common symbols:</p>
            <div className="flex flex-wrap gap-2">
              {commonSymbols.map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => insertSymbol(symbol)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded border text-sm font-mono transition-colors"
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showHints && question.hints.length > 0 && (
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(!showHint)}
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Button>
          
          {showHint && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 {question.hints[0]}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!equation.trim()}
          className="min-w-32"
        >
          Submit Answer
        </Button>
      </div>
    </div>
  );
}