import React, { useState } from 'react';
import { BookOpen, Calculator, Award, TrendingUp, LogIn, Sword, Shield, Star, Crown, Zap, HelpCircle } from 'lucide-react';
import { Subject } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import UserMenu from './UserMenu';
import HelpGuide from './HelpGuide';

interface DashboardProps {
  subjects: Subject[];
  onSubjectSelect: (subjectId: string) => void;
  onAuthRequired: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ subjects, onSubjectSelect, onAuthRequired }) => {
  const { user } = useAuth();
  const { progress, examScores, loading } = useProgress();
  const [showHelpGuide, setShowHelpGuide] = useState(false);

  const totalLessons = 26;
  const completedLessons = progress.filter(p => p.completed).length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const totalAchievements = examScores.length;

  const getPlayerLevel = () => {
    if (completedLessons >= 20) return { level: 5, title: 'Master Scholar', icon: Crown };
    if (completedLessons >= 15) return { level: 4, title: 'Expert Learner', icon: Star };
    if (completedLessons >= 10) return { level: 3, title: 'Skilled Student', icon: Sword };
    if (completedLessons >= 5) return { level: 2, title: 'Apprentice', icon: Shield };
    return { level: 1, title: 'Novice', icon: BookOpen };
  };

  const playerInfo = getPlayerLevel();

  const handleSubjectClick = (subjectId: string) => {
    if (!user) {
      onAuthRequired();
      return;
    }
    onSubjectSelect(subjectId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Fantasy Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-16 h-16 sm:w-32 sm:h-32 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-12 h-12 sm:w-24 sm:h-24 bg-violet-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 sm:w-40 sm:h-40 bg-cyan-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 sm:w-28 sm:h-28 bg-emerald-400 rounded-full blur-2xl"></div>
      </div>

      {/* Decorative Border */}
      <div className="absolute inset-0 border-4 sm:border-8 border-slate-200 pointer-events-none"></div>
      <div className="absolute inset-1 sm:inset-2 border-2 sm:border-4 border-slate-300 pointer-events-none"></div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-2xl border-b-2 sm:border-b-4 border-slate-600">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-lg border border-amber-400 sm:border-2">
                <BookOpen className="h-6 w-6 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                  🏰 Learning Quest Academy
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 font-medium hidden sm:block">Embark on your magical learning adventure!</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {user ? (
                <>
                  <div className="hidden md:flex items-center bg-gradient-to-r from-emerald-600 to-teal-700 px-3 py-2 rounded-lg sm:rounded-xl shadow-lg border border-emerald-500 sm:border-2">
                    <playerInfo.icon className="h-4 w-4 text-white mr-2" />
                    <span className="text-white font-bold text-sm">
                      Level {playerInfo.level} {playerInfo.title}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowHelpGuide(true)}
                    className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg hover:from-purple-700 hover:to-violet-800 transition-all duration-200 border border-purple-500 sm:border-2 text-sm sm:text-base"
                  >
                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Help</span>
                  </button>
                  <UserMenu />
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowHelpGuide(true)}
                    className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg hover:from-purple-700 hover:to-violet-800 transition-all duration-200 border border-purple-500 sm:border-2 text-sm sm:text-base"
                  >
                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Help</span>
                  </button>
                  <button
                    onClick={onAuthRequired}
                    className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 border border-blue-500 sm:border-2 text-sm sm:text-base"
                  >
                    <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="hidden sm:inline">Join the Quest!</span>
                    <span className="sm:hidden">Join</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-12">
        {/* Welcome Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2 sm:mb-4">
            {user ? `Welcome back, brave ${user.email?.split('@')[0]}! 🌟` : 'Welcome to Your Epic Learning Adventure! ⚔️'}
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-700 max-w-4xl mx-auto font-medium px-4">
            {user 
              ? 'Continue your quest through the magical realms of Mathematics and English!'
              : 'Join thousands of young heroes on an incredible journey of discovery and learning!'
            }
          </p>
        </div>

        {/* Player Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border-2 sm:border-4 border-blue-200 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
                <BookOpen className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-bold text-blue-800 uppercase tracking-wide">Quest Progress</p>
                <p className="text-2xl sm:text-4xl font-bold text-blue-900">{totalLessons}</p>
                <p className="text-xs sm:text-sm text-blue-700 font-medium">Total Quests</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border-2 sm:border-4 border-emerald-200 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
                <TrendingUp className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-bold text-emerald-800 uppercase tracking-wide">Experience</p>
                <p className="text-2xl sm:text-4xl font-bold text-emerald-900">
                  {user ? `${progressPercentage}%` : '0%'}
                </p>
                <p className="text-xs sm:text-sm text-emerald-700 font-medium">Complete</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 border-2 sm:border-4 border-violet-200 transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div className="bg-gradient-to-br from-violet-600 to-violet-700 p-2 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
                <Award className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xs sm:text-sm font-bold text-violet-800 uppercase tracking-wide">Trophies</p>
                <p className="text-2xl sm:text-4xl font-bold text-violet-900">
                  {user ? totalAchievements : '0'}
                </p>
                <p className="text-xs sm:text-sm text-violet-700 font-medium">Earned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Prompt for Non-Users */}
        {!user && (
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 border-2 sm:border-4 border-blue-200 rounded-2xl sm:rounded-3xl p-6 sm:p-10 mb-8 sm:mb-12 text-center shadow-2xl">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-12 h-12 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <Zap className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-3 sm:mb-4">
              🎯 Start Your Learning Quest Today!
            </h3>
            <p className="text-sm sm:text-lg text-slate-700 mb-6 sm:mb-8 max-w-2xl mx-auto font-medium px-2">
              Join the academy to unlock magical learning adventures, earn experience points, 
              collect trophies, and become a true scholar hero! 🏆✨
            </p>
            <button
              onClick={onAuthRequired}
              className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg shadow-xl hover:from-emerald-700 hover:to-teal-800 transition-all duration-200 border border-emerald-500 sm:border-2 transform hover:scale-105"
            >
              🚀 Begin Your Adventure - It's Free!
            </button>
          </div>
        )}

        {/* Subject Realms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {subjects.map((subject) => {
            const IconComponent = subject.icon === 'Calculator' ? Calculator : BookOpen;
            const subjectProgress = user ? progress.filter(p => p.subjectId === subject.id && p.completed).length : 0;
            
            const realmTheme = subject.id === 'mathematics' 
              ? {
                  gradient: 'from-cyan-50 via-blue-50 to-indigo-50',
                  border: 'border-cyan-200',
                  iconBg: 'from-cyan-600 to-blue-700',
                  emoji: '🔢',
                  title: 'Mathematics Realm',
                  description: 'Master the ancient arts of numbers, calculations, and magical formulas!'
                }
              : {
                  gradient: 'from-emerald-50 via-teal-50 to-green-50',
                  border: 'border-emerald-200',
                  iconBg: 'from-emerald-600 to-teal-700',
                  emoji: '📚',
                  title: 'English Kingdom',
                  description: 'Explore the enchanted world of words, stories, and communication spells!'
                };
            
            return (
              <div
                key={subject.id}
                onClick={() => handleSubjectClick(subject.id)}
                className={`bg-gradient-to-br ${realmTheme.gradient} rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 ${realmTheme.border} p-6 sm:p-10 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-3xl group relative overflow-hidden`}
              >
                {/* Magical Sparkles */}
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 text-lg sm:text-2xl animate-pulse">✨</div>
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 text-sm sm:text-xl animate-bounce">⭐</div>
                
                <div className="flex items-center mb-6 sm:mb-8">
                  <div className={`bg-gradient-to-br ${realmTheme.iconBg} p-3 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white sm:border-2`}>
                    <IconComponent className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-6">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-1 sm:mb-2">
                      {realmTheme.emoji} {realmTheme.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">Years 1-13 • Epic Adventures Await</p>
                  </div>
                </div>
                
                <p className="text-slate-800 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-lg font-medium">
                  {realmTheme.description}
                </p>

                {user && (
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">Your Progress</span>
                      <span className="text-xs sm:text-sm font-bold text-blue-800">{subjectProgress} quests completed</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-70 rounded-full h-2 sm:h-4 border border-white sm:border-2">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-orange-600 h-full rounded-full transition-all duration-500 shadow-lg"
                        style={{ width: `${Math.min((subjectProgress / 13) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
                  <div className="text-center bg-white bg-opacity-60 rounded-lg sm:rounded-xl p-2 sm:p-4 border border-white border-opacity-70 sm:border-2">
                    <p className="text-lg sm:text-3xl font-bold text-slate-800">13</p>
                    <p className="text-xs sm:text-sm text-slate-700 font-bold">Levels</p>
                  </div>
                  <div className="text-center bg-white bg-opacity-60 rounded-lg sm:rounded-xl p-2 sm:p-4 border border-white border-opacity-70 sm:border-2">
                    <p className="text-lg sm:text-3xl font-bold text-slate-800">100+</p>
                    <p className="text-xs sm:text-sm text-slate-700 font-bold">Quests</p>
                  </div>
                  <div className="text-center bg-white bg-opacity-60 rounded-lg sm:rounded-xl p-2 sm:p-4 border border-white border-opacity-70 sm:border-2">
                    <p className="text-lg sm:text-3xl font-bold text-slate-800">50+</p>
                    <p className="text-xs sm:text-sm text-slate-700 font-bold">Challenges</p>
                  </div>
                </div>
                
                <div className="bg-white bg-opacity-70 group-hover:bg-opacity-90 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 text-center border border-white border-opacity-70 sm:border-2">
                  <span className="text-slate-800 font-bold text-sm sm:text-lg">
                    {user ? '⚔️ Continue Your Quest' : '🎮 Start Adventure'} →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-20 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-slate-200 p-6 sm:p-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent mb-6 sm:mb-10">
            🌟 Why Choose Learning Quest Academy?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-12 h-12 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <BookOpen className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-4">🎯 Epic Quests</h4>
              <p className="text-slate-700 font-medium text-sm sm:text-lg">
                Transform learning into exciting adventures with interactive quests and magical challenges!
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 w-12 h-12 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <TrendingUp className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-4">📊 Level Up System</h4>
              <p className="text-slate-700 font-medium text-sm sm:text-lg">
                Gain experience points, unlock achievements, and watch your knowledge grow with every quest!
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-violet-600 to-purple-700 w-12 h-12 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                <Award className="h-6 w-6 sm:h-10 sm:w-10 text-white" />
              </div>
              <h4 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-4">🏆 Magical Rewards</h4>
              <p className="text-slate-700 font-medium text-sm sm:text-lg">
                Earn trophies, badges, and special titles as you master each subject realm!
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Help Guide Modal */}
      <HelpGuide isOpen={showHelpGuide} onClose={() => setShowHelpGuide(false)} />
    </div>
  );
};

export default Dashboard;