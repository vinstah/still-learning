import React from 'react';
import { BarChart3, Target, Clock, Trophy } from 'lucide-react';
import { QuizResult } from '../../types/question';

interface QuizStatsProps {
  results: QuizResult[];
  isDark: boolean;
}

export const QuizStats: React.FC<QuizStatsProps> = ({ results, isDark }) => {
  if (results.length === 0) {
    return (
      <div className={`
        p-6 rounded-2xl border text-center
        ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <BarChart3 size={48} className={`mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Complete some quizzes to see your statistics!
        </p>
      </div>
    );
  }

  const totalQuestions = results.reduce((sum, r) => sum + r.totalQuestions, 0);
  const totalCorrect = results.reduce((sum, r) => sum + r.correctAnswers, 0);
  const averageAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const totalTime = results.reduce((sum, r) => sum + r.totalTime, 0);

  // Topic performance analysis
  const topicStats: { [topic: string]: { total: number; correct: number } } = {};
  results.forEach(result => {
    Object.entries(result.topicBreakdown).forEach(([topic, stats]) => {
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0 };
      }
      topicStats[topic].total += stats.total;
      topicStats[topic].correct += stats.correct;
    });
  });

  const topicPerformance = Object.entries(topicStats).map(([topic, stats]) => ({
    topic,
    accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    total: stats.total
  })).sort((a, b) => b.accuracy - a.accuracy);

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`
          p-4 rounded-lg border
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-2 mb-2">
            <Target className="text-blue-500" size={20} />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Total Questions
            </span>
          </div>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {totalQuestions}
          </p>
        </div>

        <div className={`
          p-4 rounded-lg border
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="text-green-500" size={20} />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Accuracy
            </span>
          </div>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {averageAccuracy}%
          </p>
        </div>

        <div className={`
          p-4 rounded-lg border
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="text-purple-500" size={20} />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Time Spent
            </span>
          </div>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {Math.round(totalTime)}m
          </p>
        </div>

        <div className={`
          p-4 rounded-lg border
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="text-yellow-500" size={20} />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Quizzes Taken
            </span>
          </div>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {results.length}
          </p>
        </div>
      </div>

      {/* Topic Performance */}
      <div className={`
        p-6 rounded-2xl border
        ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Topic Performance
        </h3>
        <div className="space-y-3">
          {topicPerformance.map(({ topic, accuracy, total }) => (
            <div key={topic} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {topic}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {accuracy}% ({total} questions)
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    accuracy >= 80 ? 'bg-green-500' :
                    accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Performance */}
      <div className={`
        p-6 rounded-2xl border
        ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      `}>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Recent Quiz Results
        </h3>
        <div className="space-y-3">
          {results.slice(-5).reverse().map((result, index) => (
            <div key={index} className={`
              p-3 rounded-lg border
              ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}
            `}>
              <div className="flex justify-between items-center">
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Quiz #{results.length - index}
                  </p>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {result.correctAnswers}/{result.totalQuestions} correct • {Math.round(result.totalTime)}m
                  </p>
                </div>
                <span className={`
                  px-2 py-1 rounded text-sm font-medium
                  ${result.accuracy >= 80 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : result.accuracy >= 60
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }
                `}>
                  {result.accuracy}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};