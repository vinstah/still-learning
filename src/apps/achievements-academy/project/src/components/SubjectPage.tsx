import React from 'react';
import { ArrowLeft, Clock, Star, BookOpen, FileText, Crown, Sword, Shield } from 'lucide-react';
import { Subject, YearLevel } from '../types';

interface SubjectPageProps {
  subject: Subject;
  yearLevels: YearLevel[];
  onBack: () => void;
  onYearSelect: (year: number) => void;
}

const SubjectPage: React.FC<SubjectPageProps> = ({ 
  subject, 
  yearLevels, 
  onBack, 
  onYearSelect 
}) => {
  const getDifficultyColor = (year: number) => {
    if (year <= 3) return 'from-green-400 to-emerald-500';
    if (year <= 8) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getDifficultyLabel = (year: number) => {
    if (year <= 3) return 'Apprentice';
    if (year <= 8) return 'Warrior';
    return 'Master';
  };

  const getDifficultyIcon = (year: number) => {
    if (year <= 3) return Shield;
    if (year <= 8) return Sword;
    return Crown;
  };

  const realmTheme = subject.id === 'mathematics' 
    ? {
        gradient: 'from-blue-100 via-cyan-100 to-teal-100',
        headerGradient: 'from-blue-600 via-cyan-600 to-teal-600',
        border: 'border-blue-400',
        emoji: '🔢',
        title: 'Mathematics Realm',
        description: 'Master the ancient arts of numbers and magical calculations'
      }
    : {
        gradient: 'from-green-100 via-emerald-100 to-lime-100',
        headerGradient: 'from-green-600 via-emerald-600 to-lime-600',
        border: 'border-green-400',
        emoji: '📚',
        title: 'English Kingdom',
        description: 'Explore the enchanted world of words and stories'
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
                <span className="hidden sm:inline">🏰 Back to Academy</span>
                <span className="sm:hidden">🏰 Back</span>
              </button>
              
              <div className="h-6 w-px sm:h-8 bg-white opacity-30" />
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-lg sm:rounded-2xl border border-white border-opacity-30 sm:border-2">
                  <FileText className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                    {realmTheme.emoji} {realmTheme.title}
                  </h1>
                  <p className="text-white text-opacity-90 font-medium text-sm sm:text-lg hidden sm:block">
                    {realmTheme.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-12">
        {/* Realm Overview */}
        <div className="bg-white bg-opacity-80 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-white border-opacity-50 p-6 sm:p-10 mb-8 sm:mb-12 backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
            🗺️ Realm Overview
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed font-medium">
            {subject.description} Embark on an epic journey through {yearLevels.length} challenging levels, 
            each filled with exciting quests and magical knowledge to discover!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-blue-300 shadow-lg">
              <div className="text-2xl sm:text-4xl font-bold text-blue-600 mb-1 sm:mb-2">13</div>
              <div className="text-xs sm:text-sm text-blue-700 font-bold uppercase tracking-wide">Epic Levels</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-green-300 shadow-lg">
              <div className="text-2xl sm:text-4xl font-bold text-green-600 mb-1 sm:mb-2">100+</div>
              <div className="text-xs sm:text-sm text-green-700 font-bold uppercase tracking-wide">Learning Quests</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-purple-300 shadow-lg">
              <div className="text-2xl sm:text-4xl font-bold text-purple-600 mb-1 sm:mb-2">50+</div>
              <div className="text-xs sm:text-sm text-purple-700 font-bold uppercase tracking-wide">Boss Challenges</div>
            </div>
          </div>
        </div>

        {/* Year Levels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {yearLevels.map((yearLevel) => {
            const DifficultyIcon = getDifficultyIcon(yearLevel.year);
            
            return (
              <div
                key={yearLevel.year}
                onClick={() => onYearSelect(yearLevel.year)}
                className="bg-white bg-opacity-90 rounded-xl sm:rounded-2xl shadow-2xl border-2 sm:border-4 border-white border-opacity-70 p-4 sm:p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl group backdrop-blur-sm relative overflow-hidden"
              >
                {/* Magical Effects */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 text-sm sm:text-xl animate-pulse">✨</div>
                <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-xs sm:text-lg animate-bounce">⭐</div>
                
                {/* Level Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800">
                    🏰 Level {yearLevel.year}
                  </h3>
                  <div className={`flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r ${getDifficultyColor(yearLevel.year)} px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl shadow-lg border border-white sm:border-2`}>
                    <DifficultyIcon className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    <span className="text-white font-bold text-xs sm:text-sm">{getDifficultyLabel(yearLevel.year)}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">Quest Progress</span>
                    <span className="text-xs sm:text-sm font-bold text-blue-600">
                      {yearLevel.progress}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-4 border border-gray-300 sm:border-2">
                    <div
                      className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-full rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${yearLevel.progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center space-x-2 sm:space-x-3 bg-blue-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-blue-200 sm:border-2">
                    <BookOpen className="h-3 w-3 sm:h-5 sm:w-5 text-blue-600" />
                    <div>
                      <div className="font-bold text-blue-800 text-sm sm:text-base">{yearLevel.lessons.length}</div>
                      <div className="text-xs text-blue-600 font-medium">Quests</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 bg-green-50 p-2 sm:p-3 rounded-lg sm:rounded-xl border border-green-200 sm:border-2">
                    <FileText className="h-3 w-3 sm:h-5 sm:w-5 text-green-600" />
                    <div>
                      <div className="font-bold text-green-800 text-sm sm:text-base">{yearLevel.examQuestions.length}</div>
                      <div className="text-xs text-green-600 font-medium">Challenges</div>
                    </div>
                  </div>
                </div>

                {/* Duration and Rating */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center space-x-1 sm:space-x-2 bg-purple-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border border-purple-200 sm:border-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                    <span className="text-xs sm:text-sm text-purple-700 font-bold">
                      {yearLevel.lessons.reduce((total, lesson) => total + lesson.duration, 0)} min
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 text-center border border-blue-400 sm:border-2 shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-lg">
                    ⚔️ Enter Level {yearLevel.year} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Path */}
        <div className="mt-12 sm:mt-20 bg-white bg-opacity-80 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-white border-opacity-50 p-6 sm:p-10 backdrop-blur-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6 sm:mb-8">
            🗺️ Your Epic Learning Journey
          </h3>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            {yearLevels.slice(0, 6).map((yearLevel, index) => (
              <div key={yearLevel.year} className="flex items-center">
                <div className={`
                  w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold text-white text-sm sm:text-lg shadow-lg border-2 sm:border-4 border-white
                  ${yearLevel.progress > 0 
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                    : 'bg-gradient-to-br from-gray-400 to-gray-500'
                  }
                `}>
                  {yearLevel.year}
                </div>
                {index < 5 && (
                  <div className={`
                    w-6 sm:w-12 h-1 sm:h-2 mx-2 sm:mx-3 rounded-full border border-white sm:border-2 shadow-lg
                    ${yearLevel.progress === 100 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                      : 'bg-gradient-to-r from-gray-300 to-gray-400'
                    }
                  `} />
                )}
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-700 mt-6 sm:mt-8 text-sm sm:text-lg font-medium">
            🎯 Complete each level to unlock the next adventure and earn legendary rewards!
          </p>
        </div>
      </main>
    </div>
  );
};

export default SubjectPage;