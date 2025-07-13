import React, { useState } from 'react';
import { Clock, Tag, Users, Play, CheckCircle, Eye } from 'lucide-react';
import { QuestionCard } from '../data/questionBank';
import QuestionViewer from './QuestionViewer';

interface LearnerQuestionCardProps {
  question: QuestionCard;
  onTagClick?: (tag: string) => void;
  selectedTags?: string[];
}

const LearnerQuestionCard: React.FC<LearnerQuestionCardProps> = ({
  question,
  onTagClick,
  selectedTags = []
}) => {
  const [showViewer, setShowViewer] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation': return 'bg-green-100 text-green-800 border-green-200';
      case 'building': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'mastery': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation': return '🌱';
      case 'building': return '🏗️';
      case 'mastery': return '🎯';
      default: return '📝';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'multiple-choice': return '☑️';
      case 'true-false': return '✅';
      case 'step-by-step': return '📋';
      case 'matching': return '🔗';
      case 'visual': return '👁️';
      case 'essay': return '📝';
      default: return '❓';
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getDifficultyIcon(question.difficulty)}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
            <span className="text-sm">{getTypeIcon(question.type)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowViewer(true);
              }}
              className="p-1 hover:bg-blue-100 rounded transition-colors"
            >
              <Eye className="h-4 w-4 text-blue-500" />
            </button>
            {isCompleted ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCompleted(true);
                }}
                className="p-1 hover:bg-green-100 rounded transition-colors"
              >
                <Play className="h-4 w-4 text-gray-400 hover:text-green-500" />
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
          {question.title}
        </h4>

        {/* Content Preview */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {question.content}
        </p>

        {/* Progress Indicator */}
        {isCompleted && (
          <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800 font-medium">Completed</span>
            </div>
          </div>
        )}

        {/* Meta Information */}
        <div className="space-y-2">
          {/* Time and Type */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3" />
              <span>{question.estimatedTime}min</span>
              <span>•</span>
              <span>{question.type}</span>
            </div>
          </div>

          {/* Tags */}
          {question.tags.length > 0 && (
            <div className="flex items-center space-x-1">
              <Tag className="h-3 w-3 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {question.tags.slice(0, 3).map((tag, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick?.(tag);
                    }}
                    className={`px-1 py-0.5 rounded text-xs transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
                {question.tags.length > 3 && (
                  <span className="px-1 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                    +{question.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Accommodations */}
          {question.accommodations.length > 0 && (
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3 text-blue-500" />
              <span className="text-xs text-blue-600">
                {question.accommodations.length} accommodation{question.accommodations.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Attachments */}
          {question.attachments.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-xs text-purple-600">
                📎 {question.attachments.length} attachment{question.attachments.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Question Viewer Modal */}
      {showViewer && (
        <QuestionViewer
          question={question}
          onClose={() => setShowViewer(false)}
          onComplete={() => {
            setIsCompleted(true);
            setShowViewer(false);
          }}
        />
      )}
    </>
  );
};

export default LearnerQuestionCard;