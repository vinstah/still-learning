import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '../../types';
import { Edit, Trash2, Volume2, Tag } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';

interface BoardCardProps {
  card: Card;
}

const BoardCard: React.FC<BoardCardProps> = ({ card }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { deleteCard, updateCard } = useBoardStore();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      deleteCard(card.id);
    }
  };

  const handleTextToSpeech = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(card.content);
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900 flex-1 pr-2">
          {card.title}
        </h3>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleTextToSpeech}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <Volume2 className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-3 line-clamp-3">
        {card.content.split('\n')[0]}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(card.difficulty)}`}>
            {card.difficulty}
          </span>
          <span className="text-xs text-gray-500">
            {card.type}
          </span>
        </div>
        
        {card.tags.length > 0 && (
          <div className="flex items-center space-x-1">
            <Tag className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">
              {card.tags.length}
            </span>
          </div>
        )}
      </div>

      {card.quiz && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Quiz: {card.quiz.questions.length} questions</span>
            <span className="text-indigo-600 font-medium">
              {card.quiz.attempts.length} attempts
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoardCard;