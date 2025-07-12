import { physicsLessons, getLessonById } from '../data/lessons';
import { AppSettings } from '../types/app';
import { UserProgress } from '../types/user';
import { QuizResult } from '../types/question';

interface UseAppHandlersProps {
  userName: string;
  tempName: string;
  startTime: number | null;
  userProgress: UserProgress;
  completedLessons: string[];
  quizResults: QuizResult[];
  currentQuizQuestions: any[];
  appSettings: AppSettings;
  currentSlideIndex: number;
  setUserName: (name: string) => void;
  setUserProgress: (progress: UserProgress) => void;
  setAppSettings: (settings: AppSettings) => void;
  setIsNameEditing: (editing: boolean) => void;
  setStartTime: (time: number | null) => void;
  setCurrentLessonId: (id: string | null) => void;
  setCurrentSlideIndex: (index: number) => void;
  setCompletedLessons: (lessons: string[]) => void;
  setShowCertificate: (show: boolean) => void;
  setQuizResults: (results: QuizResult[]) => void;
  setCurrentQuizQuestions: (questions: any[]) => void;
}

export const useAppHandlers = ({
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
}: UseAppHandlersProps) => {
  const handleNameSubmit = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setUserProgress({ ...userProgress, name: tempName.trim() });
    }
    setIsNameEditing(false);
  };

  const handleAnswer = (correct: boolean) => {
    const endTime = Date.now();
    const timeSpent = startTime ? Math.floor((endTime - startTime) / 1000 / 60) : 0;
    const currentQuestion = currentQuizQuestions[userProgress.currentQuestionIndex];

    setUserProgress({
      ...userProgress,
      totalQuestions: userProgress.totalQuestions + 1,
      correctAnswers: userProgress.correctAnswers + (correct ? 1 : 0),
      timeSpent: userProgress.timeSpent + timeSpent,
      lastActivity: new Date().toLocaleDateString(),
      currentQuestionIndex: (userProgress.currentQuestionIndex + 1) % currentQuizQuestions.length
    });

    // Create quiz result if this completes a quiz session
    if ((userProgress.currentQuestionIndex + 1) % 10 === 0) { // Every 10 questions
      const sessionQuestions = currentQuizQuestions.slice(
        userProgress.currentQuestionIndex - 9, 
        userProgress.currentQuestionIndex + 1
      );
      
      const newResult: QuizResult = {
        sessionId: `session-${Date.now()}`,
        totalQuestions: 10,
        correctAnswers: userProgress.correctAnswers % 10, // Approximate
        accuracy: Math.round(((userProgress.correctAnswers % 10) / 10) * 100),
        totalTime: timeSpent,
        topicBreakdown: {},
        difficultyBreakdown: {}
      };
      
      setQuizResults([...quizResults, newResult]);
    }

    setStartTime(Date.now());
  };

  const toggleTheme = () => {
    setAppSettings({ ...appSettings, isDark: !appSettings.isDark });
  };

  const handleLessonSelect = (lessonId: string, navigate?: (path: string) => void) => {
    setCurrentLessonId(lessonId);
    setCurrentSlideIndex(0);
    if (navigate) {
      navigate(`/lesson/${lessonId}`);
    }
  };

  const handleSlideNext = (currentLessonId: string | null) => {
    const currentLesson = currentLessonId ? getLessonById(currentLessonId) : null;
    
    if (currentLesson) {
      if (currentSlideIndex < currentLesson.slides.length - 1) {
        setCurrentSlideIndex(currentSlideIndex + 1);
      } else {
        // Lesson completed
        if (!completedLessons.includes(currentLesson.id)) {
          setCompletedLessons([...completedLessons, currentLesson.id]);
          setUserProgress({ 
            ...userProgress, 
            completedLessons: userProgress.completedLessons + 1,
            lastActivity: new Date().toLocaleDateString()
          });
          
          // Check if this completes all lessons for certificate
          if (completedLessons.length + 1 === physicsLessons.length) {
            setShowCertificate(true);
          }
        }
        // Navigation will be handled by React Router
      }
    }
  };

  const handleSlidePrevious = () => {
    setCurrentSlideIndex(currentSlideIndex > 0 ? currentSlideIndex - 1 : currentSlideIndex);
  };

  const handleCertificateDownload = () => {
    alert('Certificate download would be implemented here');
  };

  const handleCertificateShare = () => {
    alert('Certificate sharing would be implemented here');
  };

  return {
    handleNameSubmit,
    handleAnswer,
    toggleTheme,
    handleLessonSelect,
    handleSlideNext,
    handleSlidePrevious,
    handleCertificateDownload,
    handleCertificateShare
  };
};