import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Question } from '../../../types';
import { Button } from '../../ui/Button';

interface WrittenResponseQuestionProps {
  question: Question;
  onAnswerSubmit: (answer: string) => void;
  showHints?: boolean;
}

export function WrittenResponseQuestion({ 
  question, 
  onAnswerSubmit, 
  showHints = false 
}: WrittenResponseQuestionProps) {
  const [response, setResponse] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (response.trim()) {
      onAnswerSubmit(response.trim());
    }
  };

  const wordCount = response.trim().split(/\s+/).filter(word => word.length > 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {question.question}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your response:
            </label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your detailed answer here..."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Write a clear, detailed explanation</span>
              <span>{wordCount} words</span>
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
          disabled={!response.trim() || wordCount < 5}
          className="min-w-32"
        >
          Submit Response
        </Button>
      </div>
    </div>
  );
}