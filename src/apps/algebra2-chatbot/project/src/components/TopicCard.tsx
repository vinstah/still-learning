import React from 'react';
import { Topic } from '../types';
import { ChevronRight, Star } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  progress?: number;
  onSelect: (topicId: string) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, progress = 0, onSelect }) => {
  const IconComponent = () => {
    switch(topic.icon) {
      case 'line-chart': return <div className="text-white">📈</div>;
      case 'function-square': return <div className="text-white">📊</div>;
      case 'wave-sine': return <div className="text-white">〰️</div>;
      case 'divide': return <div className="text-white">➗</div>;
      case 'trending-up': return <div className="text-white">📈</div>;
      case 'bar-chart': return <div className="text-white">📊</div>;
      default: return <Star className="text-white" />;
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'Beginner';
      case 'intermediate': return 'Intermediate';
      case 'advanced': return 'Advanced';
      default: return difficulty;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white cursor-pointer"
      onClick={() => onSelect(topic.id)}
    >
      <div className="flex items-center p-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0"
          style={{ backgroundColor: topic.color }}
        >
          <IconComponent />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-800">{topic.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{topic.description}</p>
        </div>
        
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(topic.difficulty)}`}>
            {getDifficultyLabel(topic.difficulty)}
          </span>
          <span className="text-sm text-gray-600">{progress}% Complete</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, backgroundColor: topic.color }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;