import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Question } from '../../../types';
import { Button } from '../../ui/Button';

interface HighlightKeywordsQuestionProps {
  question: Question;
  onAnswerSubmit: (answer: string[]) => void;
  showHints?: boolean;
}

export function HighlightKeywordsQuestion({ 
  question, 
  onAnswerSubmit, 
  showHints = false 
}: HighlightKeywordsQuestionProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);

  // Split question text into words for highlighting
  const words = question.question.split(/(\s+)/).filter(word => word.trim().length > 0);

  const toggleWord = (word: string, index: number) => {
    const wordKey = `${word}-${index}`;
    setSelectedWords(prev => 
      prev.includes(wordKey) 
        ? prev.filter(w => w !== wordKey)
        : [...prev, wordKey]
    );
  };

  const handleSubmit = () => {
    const selectedKeywords = selectedWords.map(wordKey => wordKey.split('-')[0]);
    onAnswerSubmit(selectedKeywords);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Highlight the key words in this question:
        </h3>
        
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
          <p className="text-base leading-relaxed">
            {words.map((word, index) => {
              const wordKey = `${word}-${index}`;
              const isSelected = selectedWords.includes(wordKey);
              
              return (
                <span
                  key={index}
                  onClick={() => toggleWord(word, index)}
                  className={`
                    cursor-pointer transition-all duration-200 px-1 py-0.5 rounded
                    ${isSelected 
                      ? 'bg-yellow-200 text-yellow-900 font-semibold' 
                      : 'hover:bg-gray-200'
                    }
                  `}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        <div className="text-sm text-gray-600">
          <p className="mb-2">
            <strong>Instructions:</strong> Click on words that are important for understanding what the question is asking.
          </p>
          <p>
            Selected keywords: {selectedWords.length > 0 ? (
              <span className="font-medium text-blue-600">
                {selectedWords.map(wordKey => wordKey.split('-')[0]).join(', ')}
              </span>
            ) : (
              <span className="text-gray-400">None selected</span>
            )}
          </p>
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
          disabled={selectedWords.length === 0}
          className="min-w-32"
        >
          Submit Keywords
        </Button>
      </div>
    </div>
  );
}