import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Question } from '../../../types';
import { Button } from '../../ui/Button';

interface MultipleChoiceQuestionProps {
  question: Question;
  onAnswerSubmit: (answer: string) => void;
  showHints?: boolean;
}

export function MultipleChoiceQuestion({ 
  question, 
  onAnswerSubmit, 
  showHints = false 
}: MultipleChoiceQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswerSubmit(selectedAnswer);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {question.question}
        </h3>
        
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <label
              key={index}
              className={`
                flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                ${selectedAnswer === option
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="sr-only"
              />
              <div className={`
                w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center
                ${selectedAnswer === option
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
                }
              `}>
                {selectedAnswer === option && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
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
          disabled={!selectedAnswer}
          className="min-w-32"
        >
          Submit Answer
        </Button>
      </div>
    </div>
  );
}