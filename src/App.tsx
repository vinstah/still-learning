import { Routes, Route, useNavigate, useLocation } from 'react-router';
import { AppHeader } from './components/layout/AppHeader';
import { BadgeNotification } from './components/notifications/BadgeNotification';
import { HomeView } from './components/views/HomeView';
import { LessonsView } from './components/views/LessonsView';
import { LessonView } from './components/views/LessonView';
import { QuizView } from './components/views/QuizView';
import { BadgesView } from './components/views/BadgesView';
import { DashboardView } from './components/views/DashboardView';
import { TeacherView } from './components/views/TeacherView';
import { SettingsView } from './components/views/SettingsView';
import { Navigation } from './components/navigation/Navigation';
import { questionsByTopic } from './data/questions';
import { physicsLessons, getLessonById } from './data/lessons';
import { useViewStore, useUserStore, useSettingsStore, useQuizStore } from './store';
import { useAppHandlers } from './hooks/useAppHandlers';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // View state - only keep what's needed for routing
  const {
    isNameEditing,
    tempName,
    startTime,
    currentLessonId,
    currentSlideIndex,
    showCertificate,
    setIsNameEditing,
    setTempName,
    setStartTime,
    setCurrentLessonId,
    setCurrentSlideIndex,
    setShowCertificate
  } = useViewStore();

  // User state
  const {
    userName,
    userProgress,
    completedLessons,
    newBadges,
    setUserName,
    setUserProgress,
    setCompletedLessons,
    setNewBadges,
    handleNameSubmit,
    addCompletedLesson
  } = useUserStore();

  // Settings state
  const {
    appSettings,
    setAppSettings,
    toggleTheme,
    updateSettings
  } = useSettingsStore();

  // Quiz state
  const {
    quizResults,
    currentQuizQuestions,
    setQuizResults,
    setCurrentQuizQuestions
  } = useQuizStore();

  const {
    handleAnswer,
    handleLessonSelect,
    handleSlideNext,
    handleSlidePrevious,
    handleCertificateDownload,
    handleCertificateShare
  } = useAppHandlers({
    userName,
    tempName,
    startTime,
    userProgress,
    completedLessons,
    quizResults,
    currentQuizQuestions,
    appSettings,
    currentSlideIndex,
    setUserName,
    setUserProgress,
    setAppSettings,
    setIsNameEditing,
    setStartTime,
    setCurrentLessonId,
    setCurrentSlideIndex,
    setCompletedLessons,
    setShowCertificate,
    setQuizResults,
    setCurrentQuizQuestions
  });

  const currentQuestion = currentQuizQuestions[userProgress.currentQuestionIndex] || null;
  const currentLesson = currentLessonId ? getLessonById(currentLessonId) : null;
  
  // Calculate user accuracy and completed topics
  const userAccuracy = userProgress.totalQuestions > 0 
    ? Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100) 
    : 0;
  
  const completedTopics = Object.keys(questionsByTopic).filter(topic => {
    // Consider a topic completed if user has >80% accuracy in that topic
    return true; // Simplified for now
  });

  const mockStudents = [
    {
      ...userProgress,
      averageAccuracy: userAccuracy
    },
    {
      id: '2',
      name: 'Alex',
      email: 'alex@example.com',
      totalQuestions: 15,
      correctAnswers: 12,
      timeSpent: 45,
      lastActivity: '2 days ago',
      completedLessons: 2,
      totalLessons: physicsLessons.length,
      badges: 3,
      currentStreak: 5,
      averageAccuracy: 80
    },
    {
      id: '3',
      name: 'Maya',
      email: 'maya@example.com',
      totalQuestions: 22,
      correctAnswers: 19,
      timeSpent: 67,
      lastActivity: '1 day ago',
      completedLessons: 3,
      totalLessons: physicsLessons.length,
      badges: 5,
      currentStreak: 8,
      averageAccuracy: 86
    }
  ] as any;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      appSettings.isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <AppHeader
          isDark={appSettings.isDark}
          onThemeToggle={toggleTheme}
        />
        
        <main className="mb-8">
          <Routes>
            <Route path="/" element={<HomeView />} />
            
            <Route path="/lessons" element={
              <LessonsView
                lessons={physicsLessons}
                completedLessons={completedLessons}
                onSelectLesson={(lessonId) => handleLessonSelect(lessonId, navigate)}
                isDark={appSettings.isDark}
              />
            } />
            
            <Route path="/lesson/:lessonId" element={
              currentLesson ? (
                <LessonView
                  lesson={currentLesson}
                  currentSlideIndex={currentSlideIndex}
                  onNext={() => handleSlideNext(currentLessonId)}
                  onPrevious={handleSlidePrevious}
                  isDark={appSettings.isDark}
                />
              ) : null
            } />
            
            <Route path="/quiz" element={
              <QuizView
                currentQuestion={currentQuestion}
                currentQuestionIndex={userProgress.currentQuestionIndex}
                totalQuestions={currentQuizQuestions.length}
                onAnswer={handleAnswer}
                userAccuracy={userAccuracy}
                completedTopics={completedTopics}
                quizResults={quizResults}
                isDark={appSettings.isDark}
              />
            } />
            
            <Route path="/badges" element={
              <BadgesView
                badges={userProgress.badges}
                showCertificate={showCertificate}
                userName={userName}
                accuracy={userProgress.totalQuestions > 0 ? Math.round((userProgress.correctAnswers / userProgress.totalQuestions) * 100) : 0}
                isDark={appSettings.isDark}
                onCertificateDownload={handleCertificateDownload}
                onCertificateShare={handleCertificateShare}
              />
            } />
            
            <Route path="/dashboard" element={
              <DashboardView
                students={mockStudents}
                isDark={appSettings.isDark}
              />
            } />
            
            <Route path="/teacher" element={
              <TeacherView
                students={mockStudents}
                isDark={appSettings.isDark}
              />
            } />
            
            <Route path="/settings" element={
              <SettingsView
                appSettings={appSettings}
                isDark={appSettings.isDark}
                onThemeToggle={toggleTheme}
                onSettingsChange={(settings) => updateSettings(settings)}
              />
            } />
          </Routes>
        </main>
        
        <Navigation
          currentView={(location.pathname.slice(1) || 'home') as any}
          isDark={appSettings.isDark}
          onViewChange={(view) => navigate(`/${view}`)}
        />
        
        <BadgeNotification
          badges={newBadges}
          isDark={appSettings.isDark}
          onDismiss={() => setNewBadges([])}
        />
      </div>
    </div>
  );
}

export default App;