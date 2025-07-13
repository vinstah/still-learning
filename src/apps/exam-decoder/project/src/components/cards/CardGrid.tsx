import React from 'react';
import { LearningCard } from '../../types';
import { LearningCardComponent } from './LearningCardComponent';

interface CardGridProps {
  cards: LearningCard[];
  onStartQuiz: (cardId: string) => void;
  onEditCard: (cardId: string) => void;
  onViewVersions: (cardId: string) => void;
}

export function CardGrid({ cards, onStartQuiz, onEditCard, onViewVersions }: CardGridProps) {
  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">📚</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No learning cards yet
        </h3>
        <p className="text-gray-600 max-w-md">
          Create your first learning board to start building interactive study materials 
          with quizzes and progress tracking.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <LearningCardComponent
          key={card.id}
          card={card}
          onStartQuiz={onStartQuiz}
          onEditCard={onEditCard}
          onViewVersions={onViewVersions}
        />
      ))}
    </div>
  );
}