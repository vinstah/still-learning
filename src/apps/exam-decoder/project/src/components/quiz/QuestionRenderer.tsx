import React from 'react';
import { Question } from '../../types';
import { MultipleChoiceQuestion } from './questions/MultipleChoiceQuestion';
import { EquationInputQuestion } from './questions/EquationInputQuestion';
import { DragDropQuestion } from './questions/DragDropQuestion';
import { WrittenResponseQuestion } from './questions/WrittenResponseQuestion';
import { HighlightKeywordsQuestion } from './questions/HighlightKeywordsQuestion';
import { ErrorBoundary } from '../ui/ErrorBoundary';

interface QuestionRendererProps {
  question: Question;
  onAnswerSubmit: (answer: any) => void;
  onUseHint?: (hintId: string) => void;
  showHints?: boolean;
  disabled?: boolean;
  userAnswer?: any;
}

export function QuestionRenderer({ 
  question, 
  onAnswerSubmit, 
  onUseHint,
  showHints = false,
  disabled = false,
  userAnswer
}: QuestionRendererProps) {
  const renderQuestion = () => {
    const commonProps = {
      question,
      onAnswerSubmit,
      onUseHint,
      showHints,
      disabled,
      userAnswer
    };

    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
        return <MultipleChoiceQuestion {...commonProps} />;
      
      case 'equation-input':
      case 'numerical-input':
        return <EquationInputQuestion {...commonProps} />;
      
      case 'drag-drop':
      case 'ordering':
        return <DragDropQuestion {...commonProps} />;
      
      case 'written-response':
      case 'fill-in-blank':
        return <WrittenResponseQuestion {...commonProps} />;
      
      case 'highlight-keywords':
        return <HighlightKeywordsQuestion {...commonProps} />;
      
      default:
        return (
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              Question Type Not Supported
            </h3>
            <p className="text-yellow-700">
              Question type "{question.type}" is not yet implemented.
            </p>
            <div className="mt-4 p-3 bg-white rounded border">
              <p className="text-sm text-gray-700">{question.question}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <ErrorBoundary
      fallback={
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Question
          </h3>
          <p className="text-red-700">
            There was an error loading this question. Please try refreshing the page.
          </p>
        </div>
      }
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {/* Question metadata */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600">
              {question.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-600">
              {question.points} {question.points === 1 ? 'point' : 'points'}
            </span>
            {question.difficulty && (
              <>
                <span className="text-sm text-gray-500">•</span>
                <span className={`text-sm font-medium ${
                  question.difficulty === 'easy' ? 'text-green-600' :
                  question.difficulty === 'medium' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {question.difficulty}
                </span>
              </>
            )}
          </div>
          
          {question.timeLimit && (
            <div className="text-sm text-gray-500">
              Time limit: {question.timeLimit}s
            </div>
          )}
        </div>

        {/* Media content */}
        {question.media && question.media.length > 0 && (
          <div className="mb-6">
            {question.media.map((media) => (
              <div key={media.id} className="mb-4">
                {media.type === 'image' && (
                  <div className="text-center">
                    <img
                      src={media.url}
                      alt={media.alt || 'Question image'}
                      className="max-w-full h-auto rounded-lg border border-gray-200"
                      loading="lazy"
                    />
                    {media.caption && (
                      <p className="text-sm text-gray-600 mt-2">{media.caption}</p>
                    )}
                  </div>
                )}
                {media.type === 'video' && (
                  <div className="text-center">
                    <video
                      src={media.url}
                      controls
                      className="max-w-full h-auto rounded-lg border border-gray-200"
                    >
                      Your browser does not support the video tag.
                    </video>
                    {media.caption && (
                      <p className="text-sm text-gray-600 mt-2">{media.caption}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Question content */}
        {renderQuestion()}
      </div>
    </ErrorBoundary>
  );
}