import React from 'react';
import { ArrowLeft, Clock, Play, FileText, Trophy, CheckCircle, Star, Sword, Shield, Crown } from 'lucide-react';
import { YearLevel, Subject } from '../types';
import { useProgress } from '../hooks/useProgress';

interface YearPageProps {
  yearLevel: YearLevel;
  subject: Subject;
  onBack: () => void;
  onLessonSelect: (lessonId: string) => void;
  onExamStart: () => void;
}

const YearPage: React.FC<YearPageProps> = ({
  yearLevel,
  subject,
  onBack,
  onLessonSelect,
  onExamStart
}) => {
  const { isLessonCompleted, getSubjectProgress, getExamScore } = useProgress();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-400 to-emerald-500';
      case 'intermediate': return 'from-yellow-400 to-orange-500';
      case 'advanced': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return Shield;
      case 'intermediate': return Sword;
      case 'advanced': return Crown;
      default: return Shield;
    }
  };

  const completedLessons = getSubjectProgress(subject.id, yearLevel.year);
  const totalLessons = yearLevel.lessons.length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const examScore = getExamScore(subject.id, yearLevel.year);

  const realmTheme = subject.id === 'mathematics' 
    ? {
        gradient: 'from-blue-100 via-cyan-100 to-teal-100',
        headerGradient: 'from-blue-600 via-cyan-600 to-teal-600',
        border: 'border-blue-400',
        emoji: '🔢',
        title: 'Mathematics Realm'
      }
    : {
        gradient: 'from-green-100 via-emerald-100 to-lime-100',
        headerGradient: 'from-green-600 via-emerald-600 to-lime-600',
        border: 'border-green-400',
        emoji: '📚',
        title: 'English Kingdom'
      };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${realmTheme.gradient} relative overflow-hidden`}>
      {/* Fantasy Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-5 left-5 sm:top-10 sm:left-10 w-16 h-16 sm:w-32 sm:h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-10 sm:top-40 sm:right-20 w-12 h-12 sm:w-24 sm:h-24 bg-purple-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/4 sm:bottom-20 w-20 h-20 sm:w-40 sm:h-40 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      {/* Decorative Border */}
      <div className={`absolute inset-0 border-4 sm:border-8 ${realmTheme.border} pointer-events-none`}></div>
      <div className={`absolute inset-1 sm:inset-2 border-2 sm:border-4 ${realmTheme.border} opacity-50 pointer-events-none`}></div>

      {/* Header */}
      <header className={`relative bg-gradient-to-r ${realmTheme.headerGradient} shadow-2xl border-b-2 sm:border-b-4 ${realmTheme.border}`}>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 sm:space-x-3 bg-white bg-opacity-20 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-30 sm:border-2 text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">🏰 Back to {realmTheme.title}</span>
                <span className="sm:hidden">🏰 Back</span>
              </button>
              
              <div className="h-6 w-px sm:h-8 bg-white opacity-30" />
              
              <div>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                  {realmTheme.emoji} Level {yearLevel.year} Adventures
                </h1>
                <p className="text-white text-opacity-90 font-medium text-sm sm:text-lg">
                  {completedLessons} of {totalLessons} quests completed • {Math.round(progressPercentage)}% mastered
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-12">
        {/* Progress Overview */}
        <div className="bg-white bg-opacity-90 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-white border-opacity-70 p-6 sm:p-10 mb-8 sm:mb-12 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                🎯 Your Quest Progress
              </h2>
              <p className="text-gray-700 font-medium text-sm sm:text-lg">Track your legendary journey through Level {yearLevel.year}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-bold uppercase tracking-wide">Complete</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 sm:h-6 mb-6 sm:mb-8 border-2 sm:border-4 border-gray-300 shadow-inner">
            <div
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-full rounded-full transition-all duration-500 shadow-lg relative"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-bold">
                {progressPercentage > 10 && '⚡'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            <div className="text-center p-3 sm:p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-blue-300 shadow-lg">
              <div className="text-xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">{totalLessons}</div>
              <div className="text-xs sm:text-sm text-blue-700 font-bold uppercase tracking-wide">Total Quests</div>
            </div>
            <div className="text-center p-3 sm:p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-green-300 shadow-lg">
              <div className="text-xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">{completedLessons}</div>
              <div className="text-xs sm:text-sm text-green-700 font-bold uppercase tracking-wide">Completed</div>
            </div>
            <div className="text-center p-3 sm:p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-purple-300 shadow-lg">
              <div className="text-xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">{yearLevel.examQuestions.length}</div>
              <div className="text-xs sm:text-sm text-purple-700 font-bold uppercase tracking-wide">Boss Challenges</div>
            </div>
            <div className="text-center p-3 sm:p-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-orange-300 shadow-lg">
              <div className="text-xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">
                {examScore ? `${examScore.percentage}%` : 'Not Attempted'}
              </div>
              <div className="text-xs sm:text-sm text-orange-700 font-bold uppercase tracking-wide">Boss Score</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Quest List */}
          <div className="lg:col-span-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
              ⚔️ Available Quests
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {yearLevel.lessons.map((lesson, index) => {
                const completed = isLessonCompleted(lesson.id);
                const DifficultyIcon = getDifficultyIcon(lesson.difficulty);
                
                return (
                  <div
                    key={lesson.id}
                    onClick={() => onLessonSelect(lesson.id)}
                    className="bg-white bg-opacity-90 rounded-xl sm:rounded-2xl shadow-xl border-2 sm:border-4 border-white border-opacity-70 p-4 sm:p-8 cursor-pointer hover:shadow-2xl transition-all duration-300 group backdrop-blur-sm transform hover:scale-102"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-6">
                        <div className="flex-shrink-0">
                          {completed ? (
                            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 sm:border-4 border-white">
                              <CheckCircle className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg border-2 sm:border-4 border-white">
                              <Play className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                            <h4 className="text-sm sm:text-xl font-bold text-gray-800">
                              🎯 Quest {index + 1}: {lesson.title}
                            </h4>
                            <div className={`flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r ${getDifficultyColor(lesson.difficulty)} px-2 sm:px-3 py-1 rounded-lg sm:rounded-xl shadow-lg border border-white sm:border-2`}>
                              <DifficultyIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                              <span className="text-white font-bold text-xs sm:text-sm capitalize">{lesson.difficulty}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2 sm:mb-3 font-medium text-xs sm:text-base">{lesson.description}</p>
                          <div className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center space-x-1 sm:space-x-2 bg-blue-50 px-2 sm:px-3 py-1 rounded-lg border border-blue-200 sm:border-2">
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                              <span className="font-bold text-blue-700">{lesson.duration} min</span>
                            </div>
                            <div className="flex items-center space-x-1 sm:space-x-2 bg-green-50 px-2 sm:px-3 py-1 rounded-lg border border-green-200 sm:border-2">
                              <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                              <span className="font-bold text-green-700">{lesson.content.length} steps</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl shadow-lg border border-blue-400 sm:border-2 text-sm sm:text-base">
                          {completed ? '🔄 Replay Quest' : '⚔️ Start Quest'} →
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 sm:space-y-8">
            {/* Boss Battle */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl sm:rounded-2xl shadow-2xl border-2 sm:border-4 border-purple-300 p-4 sm:p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 sm:p-4 rounded-lg sm:rounded-2xl shadow-lg border border-white sm:border-2">
                  <Trophy className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800">👑 Boss Battle</h3>
                  <p className="text-purple-700 font-medium text-xs sm:text-base">Level {yearLevel.year} Final Challenge</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 sm:mb-6 font-medium leading-relaxed text-xs sm:text-base">
                Face the ultimate test! Battle through {yearLevel.examQuestions.length} epic challenges 
                to prove your mastery of Level {yearLevel.year} and earn legendary rewards! 🏆
              </p>
              
              <div className="space-y-2 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex justify-between text-xs sm:text-sm bg-white bg-opacity-50 p-2 sm:p-3 rounded-lg border border-white sm:border-2">
                  <span className="text-gray-700 font-bold">⚔️ Challenges:</span>
                  <span className="font-bold text-purple-700">{yearLevel.examQuestions.length}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm bg-white bg-opacity-50 p-2 sm:p-3 rounded-lg border border-white sm:border-2">
                  <span className="text-gray-700 font-bold">💎 Total Rewards:</span>
                  <span className="font-bold text-purple-700">
                    {yearLevel.examQuestions.reduce((total, q) => total + q.marks, 0)} XP
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm bg-white bg-opacity-50 p-2 sm:p-3 rounded-lg border border-white sm:border-2">
                  <span className="text-gray-700 font-bold">⏰ Time Limit:</span>
                  <span className="font-bold text-purple-700">60 minutes</span>
                </div>
                {examScore && (
                  <div className="flex justify-between text-xs sm:text-sm bg-green-50 p-2 sm:p-3 rounded-lg border border-green-300 sm:border-2">
                    <span className="text-gray-700 font-bold">🏆 Best Score:</span>
                    <span className="font-bold text-green-700">{examScore.percentage}%</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={onExamStart}
                disabled={completedLessons < totalLessons}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg shadow-xl hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-purple-400 sm:border-2"
              >
                {completedLessons < totalLessons 
                  ? '🔒 Complete All Quests First' 
                  : examScore 
                    ? '🔄 Rechallenge Boss' 
                    : '⚔️ Face the Boss!'
                }
              </button>
              
              {completedLessons < totalLessons && (
                <p className="text-xs text-purple-600 mt-2 sm:mt-3 text-center font-medium">
                  Complete all {totalLessons} quests to unlock the boss battle! 🗝️
                </p>
              )}
            </div>

            {/* Adventure Tips */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl sm:rounded-2xl shadow-xl border-2 sm:border-4 border-yellow-300 p-4 sm:p-8 backdrop-blur-sm">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                💡 Adventure Tips
              </h3>
              <ul className="space-y-2 sm:space-y-4 text-xs sm:text-sm text-gray-700">
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full mt-1 sm:mt-2 flex-shrink-0" />
                  <span className="font-medium">Take your time with each quest - mastery beats speed! ⏰</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full mt-1 sm:mt-2 flex-shrink-0" />
                  <span className="font-medium">Study the explanations when you get challenges wrong 📚</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full mt-1 sm:mt-2 flex-shrink-0" />
                  <span className="font-medium">Practice regularly to strengthen your magical abilities 🔮</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full mt-1 sm:mt-2 flex-shrink-0" />
                  <span className="font-medium">Complete all quests before facing the boss battle ⚔️</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default YearPage;