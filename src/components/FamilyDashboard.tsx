import React from 'react';
import { Trophy, Clock, Target, Star } from 'lucide-react';
import { StudentRecord } from '../types/student';

interface FamilyDashboardProps {
  students: StudentRecord[];
  isDark: boolean;
}

export const FamilyDashboard: React.FC<FamilyDashboardProps> = ({ students, isDark }) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getAccuracy = (correct: number, total: number) => {
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  };

  return (
    <div className={`
      p-6 rounded-2xl shadow-lg
      ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
    `}>
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Family Progress Dashboard
      </h2>
      
      <div className="space-y-4">
        {students.map((student, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-lg border transition-all duration-200
              ${isDark 
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {student.name}
              </h3>
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-500" size={16} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {getAccuracy(student.correctAnswers, student.totalQuestions)}% accuracy
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Target className="text-blue-500" size={16} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Questions
                  </p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {student.totalQuestions}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Trophy className="text-green-500" size={16} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Correct
                  </p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {student.correctAnswers}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="text-purple-500" size={16} />
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Time Spent
                  </p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {formatTime(student.timeSpent)}
                  </p>
                </div>
              </div>
              
              <div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Last Activity
                </p>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {student.lastActivity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};