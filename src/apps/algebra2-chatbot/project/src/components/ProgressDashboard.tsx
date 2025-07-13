import React from 'react';
import { Topic, UserProgress } from '../types';
import { Award, BookOpen, Clock, BarChart } from 'lucide-react';

interface ProgressDashboardProps {
  progress: Record<string, UserProgress>;
  topics: Topic[];
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ progress, topics }) => {
  // Calculate overall progress
  const totalCompleted = Object.values(progress).reduce((sum, p) => sum + p.completed, 0);
  const totalProblems = Object.values(progress).reduce((sum, p) => sum + p.total, 0);
  const overallPercentage = totalProblems > 0 ? Math.round((totalCompleted / totalProblems) * 100) : 0;
  
  // Get topics with progress sorted by most recent
  const topicsWithProgress = topics
    .filter(topic => progress[topic.id])
    .sort((a, b) => {
      const dateA = new Date(progress[a.id]?.lastAccessed || 0);
      const dateB = new Date(progress[b.id]?.lastAccessed || 0);
      return dateB.getTime() - dateA.getTime();
    });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-700">Topics Started</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {Object.keys(progress).length} <span className="text-sm text-gray-500">/ {topics.length}</span>
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-700">Problems Solved</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {totalCompleted} <span className="text-sm text-gray-500">/ {totalProblems}</span>
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <BarChart className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-700">Overall Progress</h3>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-3 mr-3">
              <div
                className="h-3 rounded-full bg-purple-600"
                style={{ width: `${overallPercentage}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-gray-900">{overallPercentage}%</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">Recent Activity</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {topicsWithProgress.length > 0 ? (
            topicsWithProgress.map(topic => (
              <div key={topic.id} className="px-6 py-4 flex items-center">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                  style={{ backgroundColor: topic.color + '20' }}
                >
                  <div className="w-5 h-5" style={{ color: topic.color }}>📊</div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{topic.title}</h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    Last accessed {formatDate(progress[topic.id].lastAccessed)}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-700">
                    {progress[topic.id].completed} / {progress[topic.id].total} Problems
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${(progress[topic.id].completed / progress[topic.id].total) * 100}%`,
                        backgroundColor: topic.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              <p>You haven't started any topics yet!</p>
              <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Start Learning
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;