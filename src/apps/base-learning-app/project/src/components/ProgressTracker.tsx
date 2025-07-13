import React from 'react';
import { Trophy, Target, Calendar, Clock } from 'lucide-react';
import { User } from '../types';
import { formatTimeSpent } from '../utils';

interface ProgressTrackerProps {
  user: User;
}

export default function ProgressTracker({ user }: ProgressTrackerProps) {
  const getTotalLessonsCompleted = () => {
    let total = 0;
    Object.values(user.progress).forEach(subject => {
      Object.values(subject).forEach(level => {
        total += level.completedLessons.length;
      });
    });
    return total;
  };

  const getTotalTimeSpent = () => {
    let total = 0;
    Object.values(user.progress).forEach(subject => {
      Object.values(subject).forEach(level => {
        total += level.timeSpent;
      });
    });
    return total;
  };

  const getSubjectProgress = () => {
    const subjectStats = [];
    Object.entries(user.progress).forEach(([subjectId, levels]) => {
      let completedLessons = 0;
      let totalScore = 0;
      let timeSpent = 0;
      
      Object.values(levels).forEach(level => {
        completedLessons += level.completedLessons.length;
        totalScore += level.totalScore;
        timeSpent += level.timeSpent;
      });
      
      subjectStats.push({
        id: subjectId,
        name: subjectId.charAt(0).toUpperCase() + subjectId.slice(1),
        completedLessons,
        averageScore: completedLessons > 0 ? Math.round(totalScore / completedLessons) : 0,
        timeSpent
      });
    });
    return subjectStats;
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-blue-600">Lessons Completed</p>
              <p className="text-2xl font-bold text-blue-900">{getTotalLessonsCompleted()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-green-600">Achievements</p>
              <p className="text-2xl font-bold text-green-900">{user.achievements.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-purple-600">Streak</p>
              <p className="text-2xl font-bold text-purple-900">{user.streak} days</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-orange-600">Time Spent</p>
              <p className="text-2xl font-bold text-orange-900">{formatTimeSpent(getTotalTimeSpent())}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Progress</h3>
        <div className="space-y-4">
          {getSubjectProgress().map(subject => (
            <div key={subject.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{subject.name}</h4>
                <p className="text-sm text-gray-600">
                  {subject.completedLessons} lessons • {subject.averageScore}% avg score
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{formatTimeSpent(subject.timeSpent)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {user.achievements.slice(-5).map(achievement => (
            <div key={achievement.id} className="flex items-center p-3 bg-yellow-50 rounded-lg">
              <Trophy className="h-6 w-6 text-yellow-500 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}