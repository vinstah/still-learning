import React from 'react';
import { ChevronRight, Trophy } from 'lucide-react';
import { Subject } from '../App';

interface SubjectCardProps {
  subject: Subject;
  progress: number;
  onSelect: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, progress, onSelect }) => {
  const progressPercentage = (progress / subject.questionsCount) * 100;
  const IconComponent = subject.icon;

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-gray-200"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${subject.color} group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="h-6 w-6 text-white" />
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>

        {/* Title and Description */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{subject.name}</h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{subject.description}</p>

        {/* Topics */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {subject.topics.slice(0, 3).map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
            {subject.topics.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{subject.topics.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <div className="flex items-center space-x-1">
              {progressPercentage >= 100 && (
                <Trophy className="h-4 w-4 text-yellow-500" />
              )}
              <span className="font-medium text-gray-900">
                {progress} / {subject.questionsCount}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${subject.color}`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;