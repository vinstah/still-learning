import React from 'react';
import { Edit3, Trash2, Clock, Tag, Users } from 'lucide-react';
import { QuestionCard } from '../data/questionBank';

interface QuestionCardComponentProps {
  question: QuestionCard;
  onEdit: () => void;
  onDelete: () => void;
  onTagClick?: (tag: string) => void;
  selectedTags?: string[];
}

const QuestionCardComponent: React.FC<QuestionCardComponentProps> = ({
  question,
  onEdit,
  onDelete,
  onTagClick,
  selectedTags = []
}) => {
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getDifficultyIcon(question.difficulty)}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="text-sm">{getTypeIcon(question.type)}</span>
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Edit3 className="h-3 w-3 text-gray-500" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1 hover:bg-red-100 rounded"
          >
            <Trash2 className="h-3 w-3 text-red-500" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
        {question.title}
      </h4>

      {/* Content Preview */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">
        {question.content}
      </p>

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
  );
};

export default QuestionCardComponent;