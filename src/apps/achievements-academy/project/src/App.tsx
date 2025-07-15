import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import SubjectPage from './components/SubjectPage';
import YearPage from './components/YearPage';
import LessonPage from './components/LessonPage';
import ExamPage from './components/ExamPage';
import AuthModal from './components/AuthModal';
import TeacherDashboard from './components/TeacherDashboard';
import RoleSelector from './components/RoleSelector';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { useRoles } from './hooks/useRoles';
import { subjects, getAllLessonsBySubjectAndYear, createMathExamQuestions, createEnglishExamQuestions } from './data/lessons';
import { NavigationState, YearLevel, Lesson } from './types';

function AppContent() {
  const { user } = useAuth();
  const { userRole, loading: roleLoading } = useRoles();
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentSubject: null,
    currentYear: null,
    currentLesson: null
  });
  
  const [currentView, setCurrentView] = useState<'dashboard' | 'subject' | 'year' | 'lesson' | 'exam' | 'teacher'>('dashboard');
  const [currentLessonData, setCurrentLessonData] = useState<Lesson | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  // Show role selector for new users
  useEffect(() => {
    if (user && !roleLoading && !userRole) {
      setShowRoleSelector(true);
    }
  }, [user, userRole, roleLoading]);

  // Redirect teachers to teacher dashboard
  useEffect(() => {
    if (userRole?.role === 'teacher' && currentView === 'dashboard') {
      setCurrentView('teacher');
    }
  }, [userRole, currentView]);

  const resetNavigation = () => {
    setNavigationState({
      currentSubject: null,
      currentYear: null,
      currentLesson: null
    });
    
    // Redirect based on user role
    if (userRole?.role === 'teacher') {
      setCurrentView('teacher');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleSubjectSelect = (subjectId: string) => {
    setNavigationState({
      currentSubject: subjectId,
      currentYear: null,
      currentLesson: null
    });
    setCurrentView('subject');
  };

  const handleYearSelect = (year: number) => {
    setNavigationState(prev => ({
      ...prev,
      currentYear: year,
      currentLesson: null
    }));
    setCurrentView('year');
  };

  const handleLessonSelect = (lessonId: string) => {
    if (!navigationState.currentSubject || !navigationState.currentYear) return;
    const lessons = getAllLessonsBySubjectAndYear(navigationState.currentSubject, navigationState.currentYear);
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setCurrentLessonData(lesson);
      setNavigationState(prev => ({
        ...prev,
        currentLesson: lessonId
      }));
      setCurrentView('lesson');
    }
  };

  const handleExamStart = () => {
    setCurrentView('exam');
  };

  const handleLessonComplete = () => {
    if (!navigationState.currentSubject || !navigationState.currentYear || !currentLessonData) return;
    
    // Mark lesson as completed (this will be handled by the progress hook)
    currentLessonData.completed = true;
    
    // Go back to year view
    setCurrentView('year');
  };

  const handleExamComplete = (score: number) => {
    // Exam score will be saved by the progress hook
    console.log('Exam completed with score:', score);
    setCurrentView('year');
  };

  const handleBackToSubject = () => {
    setNavigationState(prev => ({
      ...prev,
      currentYear: null,
      currentLesson: null
    }));
    setCurrentLessonData(null);
    setCurrentView('subject');
  };

  const handleBackToYear = () => {
    setNavigationState(prev => ({
      ...prev,
      currentLesson: null
    }));
    setCurrentLessonData(null);
    setCurrentView('year');
  };

  // Get current data based on navigation state
  const currentSubject = navigationState.currentSubject 
    ? subjects.find(s => s.id === navigationState.currentSubject)
    : null;

  const currentLessons = navigationState.currentSubject && navigationState.currentYear
    ? getAllLessonsBySubjectAndYear(navigationState.currentSubject, navigationState.currentYear)
    : [];

  const currentYearData = navigationState.currentSubject && navigationState.currentYear
    ? {
        year: navigationState.currentYear,
        lessons: currentLessons,
        examQuestions: navigationState.currentSubject === 'mathematics'
          ? createMathExamQuestions(navigationState.currentYear)
          : navigationState.currentSubject === 'english'
            ? createEnglishExamQuestions(navigationState.currentYear)
            : [],
        progress: 0
      }
    : null;

  const currentSubjectYears = navigationState.currentSubject
    ? Array.from({ length: 13 }, (_, i) => ({
        year: i + 1,
        lessons: getAllLessonsBySubjectAndYear(navigationState.currentSubject!, i + 1),
        examQuestions: navigationState.currentSubject === 'mathematics'
          ? createMathExamQuestions(i + 1)
          : navigationState.currentSubject === 'english'
            ? createEnglishExamQuestions(i + 1)
            : [],
        progress: 0
      }))
    : [];

  // Show loading while checking roles
  if (roleLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render current view
  switch (currentView) {
    case 'teacher':
      return <TeacherDashboard />;

    case 'subject':
      return currentSubject ? (
        <SubjectPage
          subject={currentSubject}
          yearLevels={currentSubjectYears}
          onBack={resetNavigation}
          onYearSelect={handleYearSelect}
        />
      ) : (
        <Dashboard 
          subjects={subjects} 
          onSubjectSelect={handleSubjectSelect}
          onAuthRequired={() => setShowAuthModal(true)}
        />
      );

    case 'year':
      return currentSubject && currentYearData ? (
        <YearPage
          yearLevel={currentYearData}
          subject={currentSubject}
          onBack={handleBackToSubject}
          onLessonSelect={handleLessonSelect}
          onExamStart={handleExamStart}
        />
      ) : (
        <Dashboard 
          subjects={subjects} 
          onSubjectSelect={handleSubjectSelect}
          onAuthRequired={() => setShowAuthModal(true)}
        />
      );

    case 'lesson':
      return currentLessonData ? (
        <LessonPage
          lesson={currentLessonData}
          onBack={handleBackToYear}
          onComplete={handleLessonComplete}
          subjectId={navigationState.currentSubject!}
          yearLevel={navigationState.currentYear!}
        />
      ) : (
        <Dashboard 
          subjects={subjects} 
          onSubjectSelect={handleSubjectSelect}
          onAuthRequired={() => setShowAuthModal(true)}
        />
      );

    case 'exam':
      return currentSubject && currentYearData ? (
        <ExamPage
          examQuestions={currentYearData.examQuestions}
          yearLevel={currentYearData.year}
          subject={currentSubject.name}
          subjectId={currentSubject.id}
          onBack={handleBackToYear}
          onComplete={handleExamComplete}
        />
      ) : (
        <Dashboard 
          subjects={subjects} 
          onSubjectSelect={handleSubjectSelect}
          onAuthRequired={() => setShowAuthModal(true)}
        />
      );

    default:
      return (
        <>
          <Dashboard 
            subjects={subjects} 
            onSubjectSelect={handleSubjectSelect}
            onAuthRequired={() => setShowAuthModal(true)}
          />
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)} 
          />
          <RoleSelector
            isOpen={showRoleSelector}
            onClose={() => setShowRoleSelector(false)}
          />
        </>
      );
  }
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;