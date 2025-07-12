import React, { useState } from 'react';
import { Users, BookOpen, Trophy, Clock, TrendingUp, Download, Filter } from 'lucide-react';
import { StudentRecord } from '../types/student';

interface TeacherDashboardProps {
  students: StudentRecord[];
  isDark: boolean;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ students, isDark }) => {
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'accuracy' | 'activity'>('name');
  const [filterBy, setFilterBy] = useState<'all' | 'active' | 'struggling' | 'excelling'>('all');

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgressPercentage = (completed: number, total: number) => {
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const getFilteredStudents = () => {
    let filtered = [...students];

    // Apply filters
    switch (filterBy) {
      case 'active':
        filtered = filtered.filter(s => s.lastActivity.includes('day'));
        break;
      case 'struggling':
        filtered = filtered.filter(s => s.averageAccuracy < 70);
        break;
      case 'excelling':
        filtered = filtered.filter(s => s.averageAccuracy >= 90);
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'progress':
        filtered.sort((a, b) => getProgressPercentage(b.completedLessons, b.totalLessons) - getProgressPercentage(a.completedLessons, a.totalLessons));
        break;
      case 'accuracy':
        filtered.sort((a, b) => b.averageAccuracy - a.averageAccuracy);
        break;
      case 'activity':
        filtered.sort((a, b) => a.lastActivity.localeCompare(b.lastActivity));
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  const exportData = () => {
    const csvContent = [
      ['Name', 'Email', 'Progress %', 'Accuracy %', 'Time Spent', 'Badges', 'Last Activity'].join(','),
      ...students.map(s => [
        s.name,
        s.email,
        getProgressPercentage(s.completedLessons, s.totalLessons),
        s.averageAccuracy,
        formatTime(s.timeSpent),
        s.badges,
        s.lastActivity
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student-progress.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredStudents = getFilteredStudents();

  // Calculate summary stats
  const totalStudents = students.length;
  const averageProgress = students.reduce((acc, s) => acc + getProgressPercentage(s.completedLessons, s.totalLessons), 0) / totalStudents;
  const averageAccuracy = students.reduce((acc, s) => acc + s.averageAccuracy, 0) / totalStudents;
  const totalTimeSpent = students.reduce((acc, s) => acc + s.timeSpent, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`
          p-4 rounded-lg border
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-3">
            <Users className="text-blue-500" size={24} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Students</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalStudents}</p>
            </div>
          </div>
        </div>

        <div className={`
          p-4 rounded-lg border
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-green-500" size={24} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Progress</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{Math.round(averageProgress)}%</p>
            </div>
          </div>
        </div>

        <div className={`
          p-4 rounded-lg border
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-3">
            <Trophy className="text-yellow-500" size={24} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Accuracy</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{Math.round(averageAccuracy)}%</p>
            </div>
          </div>
        </div>

        <div className={`
          p-4 rounded-lg border
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-3">
            <Clock className="text-purple-500" size={24} />
            <div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Time</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{formatTime(totalTimeSpent)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={`
        p-4 rounded-lg border flex flex-wrap items-center justify-between gap-4
        ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className={`
                px-3 py-1 rounded border text-sm
                ${isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
              `}
            >
              <option value="all">All Students</option>
              <option value="active">Recently Active</option>
              <option value="struggling">Struggling (&lt;70%)</option>
              <option value="excelling">Excelling (≥90%)</option>
            </select>
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className={`
              px-3 py-1 rounded border text-sm
              ${isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
          >
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
            <option value="accuracy">Sort by Accuracy</option>
            <option value="activity">Sort by Activity</option>
          </select>
        </div>

        <button
          onClick={exportData}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Download size={16} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Student Table */}
      <div className={`
        rounded-lg border overflow-hidden
        ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  Student
                </th>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  Progress
                </th>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  Accuracy
                </th>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  Time Spent
                </th>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  Badges
                </th>
                <th className={`px-4 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStudents.map((student) => (
                <tr key={student.id} className={`hover:${isDark ? 'bg-gray-750' : 'bg-gray-50'} transition-colors`}>
                  <td className="px-4 py-3">
                    <div>
                      <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {student.name}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {student.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                        {student.completedLessons}/{student.totalLessons} lessons
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(student.completedLessons, student.totalLessons)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${student.averageAccuracy >= 90
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : student.averageAccuracy >= 70
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }
                    `}>
                      {student.averageAccuracy}%
                    </span>
                  </td>
                  <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                    {formatTime(student.timeSpent)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Trophy size={16} className="text-yellow-500" />
                      <span className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                        {student.badges}
                      </span>
                    </div>
                  </td>
                  <td className={`px-4 py-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {student.lastActivity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};