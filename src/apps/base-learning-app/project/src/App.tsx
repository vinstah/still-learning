import React, { useState, useEffect } from 'react';
import { User, Lesson } from './types';
import { lessons } from './data/lessons';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId, checkAchievements } from './utils';
import Dashboard from './components/Dashboard';
import RecapScreen from './components/RecapScreen';
import LessonContent from './components/LessonContent';
import ProgressTracker from './components/ProgressTracker';
import FloatingToolDock from './components/FloatingToolDock';
import MinimizableTimer from './components/MinimizableTimer';
import RoleToggle from './components/RoleToggle';
import LMSPage from './components/LMSPage';
import SubjectModules from './components/SubjectModules';
import { RotateCcw, BarChart3, User as UserIcon, BookOpen, Settings } from 'lucide-react';

function App() {
  const [user, setUser] = useLocalStorage<User>('neurodivergent-learning-user', {
    id: generateId(),
    role: 'Student',
    name: 'Learner',
    currentLevel: 'Grade 7',
    currentSubject: 'physics',
    progress: {},
    achievements: [],
    streak: 0,
    lastActiveDate: new Date().toISOString()
  });

  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'recap' | 'lesson' | 'progress' | 'lms' | 'modules'>('lms');
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [previousLesson, setPreviousLesson] = useState<Lesson | null>(null);
  const [showToolDock, setShowToolDock] = useState(false);

  useEffect(() => {
    // Check for new achievements
    const newAchievements = checkAchievements(user);
    if (newAchievements.length > 0) {
      setUser(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements]
      }));
    }
  }, [user, user.progress, setUser]);

  const handleUpdateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const handleStartLesson = () => {
    // Get the current lesson key
    const lessonKey = `${user.currentSubject}-${user.currentLevel.toLowerCase().replace(' ', '-')}`;
    const availableLessons = lessons[lessonKey] || [];
    
    if (availableLessons.length === 0) {
      alert('No lessons available for this subject/level combination yet. Try a different subject or level!');
      return;
    }

    // Get the user's progress for this subject/level
    const currentProgress = user.progress[user.currentSubject]?.[user.currentLevel];
    const completedLessons = currentProgress?.completedLessons || [];
    
    // Find the next lesson to take
    const nextLesson = availableLessons.find(lesson => !completedLessons.includes(lesson.id));
    
    if (!nextLesson) {
      alert('Congratulations! You have completed all lessons for this level.');
      return;
    }

    // Get the previous lesson (most recently completed)
    const previousLessonId = completedLessons[completedLessons.length - 1];
    const prevLesson = availableLessons.find(lesson => lesson.id === previousLessonId) || null;

    setCurrentLesson(nextLesson);
    setPreviousLesson(prevLesson);
    setCurrentScreen('recap');
  };

  const handleContinueToLesson = () => {
    setCurrentScreen('lesson');
  };

  const handleCompleteLesson = () => {
    if (!currentLesson) return;

    // Update progress
    const newProgress = { ...user.progress };
    if (!newProgress[user.currentSubject]) {
      newProgress[user.currentSubject] = {};
    }
    if (!newProgress[user.currentSubject][user.currentLevel]) {
      newProgress[user.currentSubject][user.currentLevel] = {
        completedLessons: [],
        currentLesson: '',
        totalScore: 0,
        timeSpent: 0
      };
    }

    newProgress[user.currentSubject][user.currentLevel].completedLessons.push(currentLesson.id);
    newProgress[user.currentSubject][user.currentLevel].totalScore += 85; // Assume 85% score
    newProgress[user.currentSubject][user.currentLevel].timeSpent += 1200; // 20 minutes

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    const lastActiveDate = user.lastActiveDate.split('T')[0];
    const newStreak = today !== lastActiveDate ? user.streak + 1 : user.streak;

    setUser(prev => ({
      ...prev,
      progress: newProgress,
      streak: newStreak,
      lastActiveDate: new Date().toISOString()
    }));

    setCurrentScreen('dashboard');
    setCurrentLesson(null);
    setPreviousLesson(null);
  };

  const handleRestart = () => {
    setCurrentScreen('dashboard');
    setCurrentLesson(null);
    setPreviousLesson(null);
  };

  const handleShowProgress = () => {
    setCurrentScreen('progress');
  };

  const handleShowDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleShowLMS = () => {
    setCurrentScreen('lms');
  };

  const handleShowModules = () => {
    setCurrentScreen('modules');
  };

  const handleRoleChange = (role: User['role']) => {
    setUser(prev => ({ ...prev, role }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">NeuroLearn</h1>
                <span className="text-sm text-gray-500 hidden sm:inline">Personalized Learning Hub</span>
              </div>
              <RoleToggle currentRole={user.role} onRoleChange={handleRoleChange} />
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShowDashboard}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  currentScreen === 'dashboard'
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <UserIcon className="h-5 w-5 mr-2" />
                Dashboard
              </button>
              
              <button
                onClick={handleShowModules}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  currentScreen === 'modules'
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Modules
              </button>
              
              <button
                onClick={handleShowProgress}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  currentScreen === 'progress'
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Progress
              </button>
              
              {(user.role === 'Teacher' || user.role === 'Parent') && (
                <button
                  onClick={handleShowLMS}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    currentScreen === 'lms'
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-2" />
                  LMS
                </button>
              )}
              
              <button
                onClick={handleRestart}
                className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Restart
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {/* Floating Tool Dock */}
        <FloatingToolDock 
          isVisible={showToolDock}
          onToggle={() => setShowToolDock(!showToolDock)}
        />
        
        {/* Minimizable Timer */}
        <MinimizableTimer />

        {currentScreen === 'dashboard' && (
          <Dashboard
            user={user}
            onUpdateUser={handleUpdateUser}
            onStartLesson={handleStartLesson}
          />
        )}

        {currentScreen === 'modules' && (
          <SubjectModules
            onBack={handleShowDashboard}
            onStartLesson={handleStartLesson}
          />
        )}

        {currentScreen === 'lms' && (
          <LMSPage onBack={handleShowDashboard} />
        )}

        {currentScreen === 'recap' && (
          <RecapScreen
            previousLesson={previousLesson}
            onContinue={handleContinueToLesson}
          />
        )}

        {currentScreen === 'lesson' && currentLesson && (
          <LessonContent
            lesson={currentLesson}
            onComplete={handleCompleteLesson}
          />
        )}

        {currentScreen === 'progress' && (
          <div className="container mx-auto px-4 py-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Your Learning Progress</h1>
              <ProgressTracker user={user} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;