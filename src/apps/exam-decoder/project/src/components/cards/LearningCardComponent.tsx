import React, { useState } from 'react';
import { Clock, Trophy, RotateCcw, Edit3, Play } from 'lucide-react';
import { LearningCard } from '../../types';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';

interface LearningCardProps {
  card: LearningCard;
  onStartQuiz: (cardId: string) => void;
  onEditCard: (cardId: string) => void;
  onViewVersions: (cardId: string) => void;
}

export function LearningCardComponent({ 
  card, 
  onStartQuiz, 
  onEditCard, 
  onViewVersions 
}: LearningCardProps) {
  const [showFullContent, setShowFullContent] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <Card hover className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {card.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant={getDifficultyColor(card.difficulty)}>
                {card.difficulty}
              </Badge>
              <Badge variant="info">{card.subject}</Badge>
              {card.tags.slice(0, 2).map(tag => (
                <Badge key={tag} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
              {card.tags.length > 2 && (
                <Badge variant="default" size="sm">
                  +{card.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" onClick={() => onEditCard(card.id)}>
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onViewVersions(card.id)}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="prose prose-sm max-w-none">
          <div 
            className={`text-gray-700 ${!showFullContent ? 'line-clamp-3' : ''}`}
            dangerouslySetInnerHTML={{ 
              __html: card.content.explanation.replace(/\n/g, '<br>') 
            }}
          />
          {card.content.explanation.length > 150 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
            >
              {showFullContent ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {card.content.memoryHooks.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="text-sm font-semibold text-yellow-800 mb-1">
              🧠 Memory Hook
            </h4>
            <p className="text-sm text-yellow-700">
              {card.content.memoryHooks[0]}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <div className="w-full space-y-3">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Quiz Progress</span>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <Trophy className="h-3 w-3 mr-1" />
                  Best: {card.quiz.bestScore}%
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {card.quiz.attempts.length} attempts
                </div>
              </div>
            </div>
            <Progress 
              value={card.quiz.bestScore} 
              className="h-2"
            />
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => onStartQuiz(card.id)}
            className="w-full"
            variant={card.quiz.bestScore >= 80 ? 'secondary' : 'primary'}
          >
            <Play className="h-4 w-4 mr-2" />
            {card.quiz.attempts.length === 0 ? 'Start Quiz' : 'Retake Quiz'}
          </Button>

          {/* Metadata */}
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
            <div className="flex justify-between">
              <span>Created: {formatDate(card.createdAt)}</span>
              <span>v{card.version}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}