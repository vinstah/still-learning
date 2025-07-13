import React from 'react';
import { TrendingUp, Target, Award } from 'lucide-react';
import { Subject } from '../App';

interface ProgressTrackerProps {
  subjects: Subject[];
  progress: Record<string, number>;
  totalQuestions: number;
  completedQuestions: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  subjects,
  progress,
  totalQuestions,
  completedQuestions
}) => {
  const overallProgress = (completedQuestions / totalQuestions) * 100;
  const completedSubjects = subjects.filter(subject => 
    progress[subject.id] >= subject.questionsCount
  ).length;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Study Progress Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Overall Progress */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{overallProgress.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Overall Progress</div>
        </div>

        {/* Questions Completed */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{completedQuestions}</div>
          <div className="text-sm text-gray-600">Questions Completed</div>
        </div>

        {/* Subjects Mastered */}
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{completedSubjects}</div>
          <div className="text-sm text-gray-600">Subjects Mastered</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Total Progress</span>
          <span>{completedQuestions} / {totalQuestions} questions</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Subject Progress List */}
      <div className="space-y-3">
        {subjects.map(subject => {
          const subjectProgress = progress[subject.id] || 0;
          const percentage = (subjectProgress / subject.questionsCount) * 100;
          
          return (
            <div key={subject.id} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg ${subject.color} flex items-center justify-center`}>
                <subject.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900">{subject.name}</span>
                  <span className="text-xs text-gray-600">
                    {subjectProgress} / {subject.questionsCount}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${subject.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;