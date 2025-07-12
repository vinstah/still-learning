import React, { useEffect } from 'react';
import { User, BookOpen, BarChart3, GraduationCap, Trophy } from 'lucide-react';
import { Avatar } from '../Avatar';
import { ProgressBar } from '../ProgressBar';
import { useUserStore, useSettingsStore, useViewStore } from '../../store';
import { useNavigate } from 'react-router';

export const HomeView: React.FC = () => {
  const navigate = useNavigate();
  
  // Get state from stores
  const { 
    userName, 
    userProgress, 
    handleNameSubmit 
  } = useUserStore();
  
  const { appSettings } = useSettingsStore();
  
  const { 
    isNameEditing, 
    tempName, 
    setIsNameEditing, 
    setTempName 
  } = useViewStore();

  // Debug logging
  console.log('HomeView render:', { userName, userProgress, appSettings, isNameEditing, tempName });

  // Test store initialization
  useEffect(() => {
    console.log('HomeView mounted, stores initialized');
    console.log('userName:', userName);
    console.log('userProgress:', userProgress);
    console.log('appSettings:', appSettings);
  }, [userName, userProgress, appSettings]);

  const handleNameEdit = () => {
    setIsNameEditing(true);
    setTempName(userName);
  };

  const handleNameSubmitClick = () => {
    handleNameSubmit(tempName);
    setIsNameEditing(false);
  };

  const handleViewChange = (view: string) => {
    navigate(`/${view}`);
  };

  // Fallback values in case stores are not initialized
  const displayName = userName || 'Student';
  const displayProgress = userProgress || { completedLessons: 0, totalLessons: 0, badges: [] };
  const isDark = appSettings?.isDark || false;

  return (
    <div className="text-center space-y-8">
      {/* Debug info */}
      <div className="text-xs text-gray-500 mb-4">
        Debug: userName={displayName}, isDark={isDark.toString()}
      </div>
      
      <div className="space-y-4">
        <Avatar name={displayName} size={120} className="mx-auto" />
        <div className="space-y-2">
          {isNameEditing ? (
            <div className="flex items-center justify-center space-x-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmitClick()}
                className={`
                  px-3 py-2 rounded-lg border text-center
                  ${isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                `}
                placeholder="Enter your name"
                autoFocus
              />
              <button
                onClick={handleNameSubmitClick}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Hello, {displayName}!
              </h1>
              <button
                onClick={handleNameEdit}
                className={`
                  p-2 rounded-lg transition-colors
                  ${isDark 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                  }
                `}
              >
                <User size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
        <button
          onClick={() => handleViewChange('lessons')}
          className={`
            p-6 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105
            ${isDark 
              ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750' 
              : 'bg-white border border-gray-200 hover:shadow-xl'
            }
          `}
        >
          <GraduationCap size={32} className="mx-auto mb-4 text-primary-500" />
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Lessons
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Slide-based lessons with real-world stories
          </p>
        </button>
        
        <button
          onClick={() => handleViewChange('quiz')}
          className={`
            p-6 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105
            ${isDark 
              ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750' 
              : 'bg-white border border-gray-200 hover:shadow-xl'
            }
          `}
        >
          <BookOpen size={32} className="mx-auto mb-4 text-blue-500" />
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Quick Quiz
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Test your knowledge with interactive questions
          </p>
        </button>
        
        <button
          onClick={() => handleViewChange('badges')}
          className={`
            p-6 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105
            ${isDark 
              ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750' 
              : 'bg-white border border-gray-200 hover:shadow-xl'
            }
          `}
        >
          <Trophy size={32} className="mx-auto mb-4 text-yellow-500" />
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Achievements
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            View your badges and certificates
          </p>
        </button>
        
        <button
          onClick={() => handleViewChange('dashboard')}
          className={`
            p-6 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105
            ${isDark 
              ? 'bg-gray-800 border border-gray-700 hover:bg-gray-750' 
              : 'bg-white border border-gray-200 hover:shadow-xl'
            }
          `}
        >
          <BarChart3 size={32} className="mx-auto mb-4 text-green-500" />
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Progress
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Family dashboard and statistics
          </p>
        </button>
      </div>
      
      <div className="max-w-md mx-auto">
        <ProgressBar 
          current={displayProgress.completedLessons} 
          total={displayProgress.totalLessons} 
          isDark={isDark} 
        />
        <div className="mt-4 text-center">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {displayProgress.completedLessons > 0 
              ? `${displayProgress.completedLessons}/${displayProgress.totalLessons} lessons completed • ${displayProgress.badges.filter(b => b.earned).length} badges earned`
              : 'Ready to start your physics journey!'
            }
          </p>
        </div>
      </div>
    </div>
  );
};