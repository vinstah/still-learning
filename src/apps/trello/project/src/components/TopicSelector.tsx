import React from 'react';
import { ArrowRight, BookOpen, Plus } from 'lucide-react';
import { Topic } from '../data/questionBank';

interface TopicSelectorProps {
  subject: {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    topics: Topic[];
  };
  onTopicSelect: (topic: Topic) => void;
  onBack: () => void;
}

const TopicSelector: React.FC<TopicSelectorProps> = ({
  subject,
  onTopicSelect,
  onBack
}) => {
  const getTopicIcon = (iconName: string) => {
    // Map icon names to emojis for visual representation
    const iconMap: Record<string, string> = {
      'Plus': '➕',
      'Square': '⬜',
      'Divide': '➗',
      'Leaf': '🍃',
      'FlaskConical': '🧪',
      'Zap': '⚡',
      'BookOpen': '📖',
      'Type': '📝',
      'PenTool': '✏️',
      'Clock': '🕐',
      'Map': '🗺️',
      'Building': '🏛️',
      'Home': '🏠',
      'Users': '👥',
      'DollarSign': '💰',
      'FolderOpen': '📁',
      'Heart': '❤️',
      'Calendar': '📅'
    };
    return iconMap[iconName] || '📚';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Back to Subjects</span>
        </button>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className={`p-4 rounded-xl ${subject.color}`}>
            <span className="text-2xl text-white">
              {subject.icon === 'Calculator' && '🧮'}
              {subject.icon === 'FlaskConical' && '🧪'}
              {subject.icon === 'BookOpen' && '📚'}
              {subject.icon === 'Globe' && '🌍'}
              {subject.icon === 'Users' && '👥'}
              {subject.icon === 'Brain' && '🧠'}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{subject.name}</h1>
            <p className="text-lg text-gray-600">{subject.description}</p>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Select a Topic to Manage</h3>
          <p className="text-blue-800">Choose a topic below to view and edit its question bank using our Trello-style interface.</p>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subject.topics.map((topic) => (
          <div
            key={topic.id}
            onClick={() => onTopicSelect(topic)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-gray-200 p-6"
          >
            <div className={`p-4 rounded-lg ${topic.color} mb-4 group-hover:scale-110 transition-transform duration-300 w-fit`}>
              <span className="text-2xl text-white">
                {getTopicIcon(topic.icon)}
              </span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.name}</h3>
            <p className="text-gray-600 mb-4">{topic.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{topic.questions.length} questions</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;