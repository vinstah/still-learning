import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Award, BookOpen, Target, Clock, Zap } from 'lucide-react';
import { useProgressStore } from '../../store/progressStore';
import { useBoardStore } from '../../store/boardStore';
import { useGoalsStore } from '../../store/goalsStore';

const ProgressPage: React.FC = () => {
  const { progress, getWeeklyProgress, getSubjectProgress } = useProgressStore();
  const { boards } = useBoardStore();
  const { goals } = useGoalsStore();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const weeklyProgress = getWeeklyProgress();
  const subjectProgress = getSubjectProgress();

  const totalCards = boards.reduce((acc, board) => 
    acc + board.columns.reduce((colAcc, col) => colAcc + col.cards.length, 0), 0
  );

  const completedGoals = goals.filter(g => g.completed).length;
  const totalStudyTime = progress.reduce((acc, p) => acc + p.timeSpent, 0);
  const averageScore = progress.length > 0 
    ? progress.reduce((acc, p) => acc + (p.quizScore || 0), 0) / progress.length 
    : 0;

  const getStreakDays = () => {
    const today = new Date();
    let streak = 0;
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const hasActivity = progress.some(p => 
        p.date.toISOString().split('T')[0] === dateStr
      );
      if (hasActivity) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    return streak;
  };

  const stats = [
    {
      name: 'Study Streak',
      value: `${getStreakDays()} days`,
      icon: Zap,
      color: 'bg-orange-500',
      change: '+2 from last week',
    },
    {
      name: 'Total Study Time',
      value: `${Math.round(totalStudyTime / 60)}h`,
      icon: Clock,
      color: 'bg-blue-500',
      change: '+5h from last week',
    },
    {
      name: 'Cards Created',
      value: totalCards,
      icon: BookOpen,
      color: 'bg-green-500',
      change: '+12 from last week',
    },
    {
      name: 'Goals Completed',
      value: completedGoals,
      icon: Target,
      color: 'bg-purple-500',
      change: '+1 from last week',
    },
  ];

  const chartData = weeklyProgress.map((day, index) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index],
    time: day.timeSpent / 60, // Convert to hours
    cards: day.cardsCreated,
    quizzes: day.quizzesCompleted,
  }));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-8 h-8 text-indigo-600 mr-3" />
                Learning Progress
              </h1>
              <p className="text-gray-600 mt-1">
                Track your learning journey and achievements
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                </div>
              </div>
              <div className="flex items-center text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Weekly Activity</h2>
          <div className="space-y-4">
            {chartData.map((day) => (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((day.time / 4) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 w-16">
                    {day.time.toFixed(1)}h
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{day.cards} cards</span>
                  <span>{day.quizzes} quizzes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Subject Progress</h2>
            <div className="space-y-4">
              {subjectProgress.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{subject.subject}</span>
                    <span className="text-sm text-gray-600">{subject.cardsCreated} cards</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((subject.timeSpent / 300) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{Math.round(subject.timeSpent / 60)}h studied</span>
                    <span>{subject.averageScore.toFixed(1)}% avg score</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Achievements</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Award className="w-8 h-8 text-yellow-600" />
                <div>
                  <p className="font-medium text-gray-900">7-Day Streak!</p>
                  <p className="text-sm text-gray-600">Studied for 7 consecutive days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Target className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Goal Completed</p>
                  <p className="text-sm text-gray-600">Finished "Master Physics Forces"</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Quiz Master</p>
                  <p className="text-sm text-gray-600">Scored 90%+ on 5 quizzes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Calendar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Learning Calendar</h2>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
                {day}
              </div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - 34 + i);
              const hasActivity = progress.some(p => 
                p.date.toISOString().split('T')[0] === date.toISOString().split('T')[0]
              );
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs ${
                    hasActivity 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;