import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface TopicSelectorProps {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({ topics, onSelectTopic }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {topics.map((topic) => (
        <div 
          key={topic.id}
          onClick={() => onSelectTopic(topic.id)}
          className={`${topic.color} rounded-lg shadow-md p-4 cursor-pointer transform transition-transform duration-200 hover:scale-105 relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
            {topic.icon}
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {topic.icon}
            </div>
            <div>
              <h3 className="font-handwriting text-xl mb-2">{topic.title}</h3>
              <p className="text-sm opacity-90 mb-4">{topic.description}</p>
              <div className="flex items-center text-sm font-semibold">
                Start Learning <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopicSelector;