import React, { useState } from 'react';
import { User, LogOut, Settings, Award, Crown, Star, Sword, Shield, X, Trophy, Target, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { getAchievements } from '../data/achievements';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { user, signOut } = useAuth();
  const { progress, examScores } = useProgress();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  if (!user) return null;

  const completedLessons = progress.filter(p => p.completed).length;
  const totalAchievements = examScores.length;

  const getPlayerLevel = () => {
    if (completedLessons >= 20) return { level: 5, title: 'Master Scholar', icon: Crown, color: 'from-amber-500 to-orange-600' };
    if (completedLessons >= 15) return { level: 4, title: 'Expert Learner', icon: Star, color: 'from-violet-500 to-purple-600' };
    if (completedLessons >= 10) return { level: 3, title: 'Skilled Student', icon: Sword, color: 'from-blue-500 to-cyan-600' };
    if (completedLessons >= 5) return { level: 2, title: 'Apprentice', icon: Shield, color: 'from-emerald-500 to-teal-600' };
    return { level: 1, title: 'Novice', icon: User, color: 'from-slate-500 to-slate-600' };
  };

  const playerInfo = getPlayerLevel();
  const IconComponent = playerInfo.icon;

  // Get achievements from the separate file
  const achievements = getAchievements(completedLessons, totalAchievements);

  const earnedAchievements = achievements.filter(a => a.earned);

  const AchievementsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-4xl max-h-[90vh] border-2 sm:border-4 border-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-8 border-b-2 sm:border-b-4 border-white border-opacity-50 bg-gradient-to-r from-violet-600 to-purple-700 rounded-t-xl sm:rounded-t-2xl flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <Trophy className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-3xl font-bold text-white drop-shadow-lg">🏆 My Achievements</h2>
              <p className="text-white text-opacity-90 font-medium text-xs sm:text-base">Your legendary accomplishments</p>
            </div>
          </div>
          <button
            onClick={() => setShowAchievements(false)}
            className="p-1 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
          >
            <X className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {achievements.map((achievement) => {
              const AchievementIcon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`
                    p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 shadow-lg transition-all duration-200
                    ${achievement.earned 
                      ? `bg-gradient-to-br ${achievement.color} bg-opacity-20 border-white` 
                      : 'bg-gray-100 border-gray-300 opacity-60'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-4">
                    <div className={`
                      w-8 h-8 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 sm:border-4 border-white shadow-lg
                      ${achievement.earned 
                        ? `bg-gradient-to-br ${achievement.color}` 
                        : 'bg-gray-400'
                      }
                    `}>
                      <AchievementIcon className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm sm:text-lg font-bold ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-xs sm:text-sm ${achievement.earned ? 'text-gray-700' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className={`
                      px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm
                      ${achievement.earned 
                        ? 'bg-white bg-opacity-70 text-gray-800' 
                        : 'bg-gray-300 text-gray-500'
                      }
                    `}>
                      {achievement.earned ? '✅ EARNED!' : '🔒 Locked'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Summary */}
          <div className="mt-6 sm:mt-8 bg-white bg-opacity-70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-white">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">📊 Your Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200 sm:border-2">
                <div className="text-xl sm:text-3xl font-bold text-blue-600">{completedLessons}</div>
                <div className="text-xs sm:text-sm text-blue-700 font-bold">Quests Completed</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl border border-purple-200 sm:border-2">
                <div className="text-xl sm:text-3xl font-bold text-purple-600">{earnedAchievements.length}</div>
                <div className="text-xs sm:text-sm text-purple-700 font-bold">Achievements Earned</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-200 sm:border-2">
                <div className="text-xl sm:text-3xl font-bold text-green-600">{totalAchievements}</div>
                <div className="text-xs sm:text-sm text-green-700 font-bold">Boss Battles Won</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-2xl border-2 sm:border-4 border-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-8 border-b-2 sm:border-b-4 border-white border-opacity-50 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl sm:rounded-t-2xl flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <Settings className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-3xl font-bold text-white drop-shadow-lg">⚙️ Quest Settings</h2>
              <p className="text-white text-opacity-90 font-medium text-xs sm:text-base">Customize your learning adventure</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className="p-1 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
          >
            <X className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Account Info */}
            <div className="bg-white bg-opacity-70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-white">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">👤 Account Information</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Email:</span>
                  <span className="text-gray-800 font-bold text-sm sm:text-base truncate ml-2">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Player Level:</span>
                  <span className="text-gray-800 font-bold text-sm sm:text-base">Level {playerInfo.level} {playerInfo.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Quests Completed:</span>
                  <span className="text-gray-800 font-bold text-sm sm:text-base">{completedLessons}</span>
                </div>
              </div>
            </div>

            {/* Learning Preferences */}
            <div className="bg-white bg-opacity-70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-white">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">🎯 Learning Preferences</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Sound Effects</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Auto-advance lessons</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Show hints</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white bg-opacity-70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-white">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">🔔 Notifications</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Daily quest reminders</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Achievement notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-4 sm:p-8 border-t-2 sm:border-t-4 border-white border-opacity-50">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 border border-blue-400 sm:border-2 text-sm sm:text-base">
              💾 Save Settings
            </button>
            <button 
              onClick={() => setShowSettings(false)}
              className="flex-1 bg-gray-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold hover:bg-gray-600 transition-all duration-200 border border-gray-400 sm:border-2 text-sm sm:text-base"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 sm:space-x-3 bg-white bg-opacity-95 border-2 sm:border-4 border-white rounded-xl sm:rounded-2xl px-2 sm:px-4 py-2 sm:py-3 hover:bg-opacity-100 transition-all duration-200 shadow-lg backdrop-blur-sm"
        >
          <div className={`w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br ${playerInfo.color} rounded-full flex items-center justify-center border border-white sm:border-2 shadow-lg`}>
            <IconComponent className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              {user.email?.split('@')[0]}
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Level {playerInfo.level} {playerInfo.title}
            </div>
          </div>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 sm:mt-3 w-64 sm:w-80 bg-white bg-opacity-95 rounded-xl sm:rounded-2xl shadow-2xl border-2 sm:border-4 border-white z-20 backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                {/* Player Info Header */}
                <div className="border-b border-slate-200 sm:border-b-2 pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${playerInfo.color} rounded-full flex items-center justify-center border-2 sm:border-4 border-white shadow-lg`}>
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-lg font-bold text-slate-800 truncate">{user.email}</p>
                      <p className="text-xs sm:text-sm font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">
                        Level {playerInfo.level} {playerInfo.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Player Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200 sm:border-2 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-700">{completedLessons}</div>
                    <div className="text-xs text-blue-800 font-bold uppercase tracking-wide">Quests Complete</div>
                  </div>
                  <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-violet-200 sm:border-2 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-violet-700">{totalAchievements}</div>
                    <div className="text-xs text-violet-800 font-bold uppercase tracking-wide">Trophies Earned</div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-1 sm:space-y-2">
                  <button 
                    onClick={() => {
                      setShowAchievements(true);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-700 hover:bg-blue-50 rounded-lg sm:rounded-xl flex items-center space-x-2 sm:space-x-3 font-medium transition-colors duration-200 border border-transparent hover:border-blue-200 sm:border-2"
                  >
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700" />
                    <span>🏆 My Achievements</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setShowSettings(true);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-700 hover:bg-violet-50 rounded-lg sm:rounded-xl flex items-center space-x-2 sm:space-x-3 font-medium transition-colors duration-200 border border-transparent hover:border-violet-200 sm:border-2"
                  >
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-violet-700" />
                    <span>⚙️ Quest Settings</span>
                  </button>
                  
                  <div className="border-t border-slate-200 sm:border-t-2 pt-1 sm:pt-2 mt-2 sm:mt-4">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-red-700 hover:bg-red-50 rounded-lg sm:rounded-xl flex items-center space-x-2 sm:space-x-3 font-medium transition-colors duration-200 border border-transparent hover:border-red-200 sm:border-2"
                    >
                      <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>🚪 Leave Academy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {showAchievements && <AchievementsModal />}
      {showSettings && <SettingsModal />}
    </>
  );
};

export default UserMenu;