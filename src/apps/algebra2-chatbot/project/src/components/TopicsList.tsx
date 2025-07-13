import React from 'react';
import { Topic, UserProgress } from '../types';
import TopicCard from './TopicCard';

interface TopicsListProps {
  topics: Topic[];
  progress?: Record<string, UserProgress>;
  onSelectTopic: (topicId: string) => void;
}

const TopicsList: React.FC<TopicsListProps> = ({ topics, progress = {}, onSelectTopic }) => {
  const getTopicProgress = (topicId: string): number => {
    if (!progress[topicId]) return 0;
    const { completed, total } = progress[topicId];
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <>
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Math Topics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(topic => (
          <TopicCard
            key={topic.id}
            topic={topic}
            progress={getTopicProgress(topic.id)}
            onSelect={onSelectTopic}
          />
        ))}
      </div>
    </div>
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Math Topics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map(topic => (
          <TopicCard
            key={topic.id}
            topic={topic}
            progress={getTopicProgress(topic.id)}
            onSelect={onSelectTopic}
          />
        ))}
      </div>
    </div>
  </>
  );
};

export default TopicsList;