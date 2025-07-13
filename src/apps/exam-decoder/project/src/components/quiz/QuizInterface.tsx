import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, Pause, Play } from 'lucide-react';
import { LearningCard } from '../../types';
import { useQuizProgress } from '../../hooks/useQuizProgress';
import { useAccessibility } from '../../hooks/useAccessibility';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { QuestionRenderer } from './QuestionRenderer';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useToast } from '../ui/Toast';
import { analytics } from '../../utils/analytics';
import { performanceMonitor } from '../../utils/performance';

interface QuizInterfaceProps {
  card: LearningCard;
  onComplete: (score: number) => void;
  onBack: () => void;
  userId?: string;
}

export function QuizInterface({ card, onComplete, onBack, userId }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startTime] = useState(Date.now());
  const [showResults, setShowResults] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { settings: accessibilitySettings } = useAccessibility();
  const { addToast } = useToast();

  const {
    currentAttempt,
    timeRemaining,
    isTimerActive,
    startTimer,
    pauseTimer,
    updateAnswer,
    useHint,
    submitAttempt,
    calculateScore,
    calculateDetailedResults,
    getProgress,
    saveProgressToStorage
  } = useQuizProgress(card.quiz.questions, {
    timeLimit: card.quiz.timeLimit ? card.quiz.timeLimit * 60 : undefined,
    autoSubmit: true,
    saveProgress: true
  });

  const currentQuestion = card.quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === card.quiz.questions.length - 1;
  const progress = getProgress();

  // Start timer when component mounts
  useEffect(() => {
    startTimer();
    analytics.trackQuizStart(card.id, userId);
    
    return () => {
      pauseTimer();
    };
  }, []);

  // Auto-save progress periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showResults && !isPaused) {
        saveProgressToStorage();
      }
    }, 30000); // Save every 30 seconds

    return () => clearInterval(interval);
  }, [showResults, isPaused, saveProgressToStorage]);

  // Keyboard navigation
  useEffect(() => {
    if (!accessibilitySettings.keyboardNavigation) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'Enter':
            event.preventDefault();
            if (!isLastQuestion) {
              handleNextQuestion();
            } else {
              handleSubmitQuiz();
            }
            break;
          case 'ArrowLeft':
            event.preventDefault();
            if (currentQuestionIndex > 0) {
              setCurrentQuestionIndex(prev => prev - 1);
            }
            break;
          case 'ArrowRight':
            event.preventDefault();
            if (currentQuestionIndex < card.quiz.questions.length - 1) {
              setCurrentQuestionIndex(prev => prev + 1);
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestionIndex, isLastQuestion, accessibilitySettings.keyboardNavigation]);

  const handleAnswerSubmit = useCallback(async (answer: any) => {
    const renderStart = performance.now();
    
    try {
      updateAnswer(currentQuestion.id, answer);
      
      // Track analytics
      analytics.track({
        event: 'question_answered',
        category: 'learning',
        action: 'answer_question',
        label: currentQuestion.id,
        userId,
        metadata: { 
          cardId: card.id, 
          questionIndex: currentQuestionIndex,
          questionType: currentQuestion.type
        }
      });

      if (isLastQuestion) {
        await handleSubmitQuiz();
      } else {
        handleNextQuestion();
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to submit answer. Please try again.'
      });
    } finally {
      const renderEnd = performance.now();
      performanceMonitor.recordMetric('answer_submit_time', renderEnd - renderStart);
    }
  }, [currentQuestion, isLastQuestion, currentQuestionIndex, card.id, userId, updateAnswer, addToast]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < card.quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    
    try {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const attempt = submitAttempt();
      const score = calculateScore();
      
      // Track completion
      analytics.trackQuizComplete(card.id, score, timeSpent, userId);
      
      setShowResults(true);
      
      addToast({
        type: 'success',
        title: 'Quiz Complete!',
        message: `You scored ${score}%`
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
      addToast({
        type: 'error',
        title: 'Submission Error',
        message: 'Failed to submit quiz. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePauseResume = () => {
    if (isPaused) {
      startTimer();
      setIsPaused(false);
    } else {
      pauseTimer();
      setIsPaused(true);
    }
  };

  const handleUseHint = (hintId: string) => {
    useHint(currentQuestion.id, hintId);
    analytics.trackHintUsed(currentQuestion.id, hintId, userId);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const results = calculateDetailedResults();
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
            results.percentage >= card.quiz.passingScore 
              ? 'bg-green-100' 
              : 'bg-yellow-100'
          }`}>
            {results.percentage >= card.quiz.passingScore ? (
              <CheckCircle className="h-10 w-10 text-green-600" />
            ) : (
              <AlertCircle className="h-10 w-10 text-yellow-600" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Quiz Complete!
          </h2>
          
          <p className="text-lg text-gray-600">
            {results.percentage >= card.quiz.passingScore 
              ? 'Congratulations! You passed!' 
              : 'Keep practicing to improve your score!'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {results.percentage}%
            </div>
            <div className="text-sm text-gray-600">Final Score</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {results.correctAnswers}/{results.totalQuestions}
            </div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {formatTime(timeSpent)}
            </div>
            <div className="text-sm text-gray-600">Time Taken</div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Review</h3>
          <div className="space-y-4">
            {card.quiz.questions.map((question, index) => {
              const userAnswer = currentAttempt.answers?.[question.id];
              const isCorrect = userAnswer?.isCorrect || false;

              return (
                <div key={question.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      Question {index + 1}
                    </span>
                    <span className={`text-sm font-medium ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{question.question}</p>
                  
                  {!isCorrect && question.explanation && (
                    <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded border">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cards
          </Button>
          <Button 
            onClick={() => onComplete(results.percentage)} 
            className="flex-1"
          >
            Continue Learning
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center space-x-4">
          {timeRemaining !== null && (
            <div className={`flex items-center text-sm ${
              timeRemaining < 300 ? 'text-red-600' : 'text-gray-600'
            }`}>
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(timeRemaining)}
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePauseResume}
            disabled={isSubmitting}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </Button>
          
          <span className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {card.quiz.questions.length}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <Progress value={progress} showLabel className="mb-4" />
        <h1 className="text-2xl font-bold text-gray-900">{card.title}</h1>
      </div>

      {/* Question Navigation */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0 || isSubmitting}
        >
          Previous
        </Button>
        
        <div className="flex space-x-2">
          {card.quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              disabled={isSubmitting}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : currentAttempt.answers?.[card.quiz.questions[index].id]
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label={`Go to question ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        <Button
          onClick={isLastQuestion ? handleSubmitQuiz : handleNextQuestion}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" />
          ) : isLastQuestion ? (
            'Submit Quiz'
          ) : (
            'Next'
          )}
        </Button>
      </div>

      {/* Question */}
      {isPaused ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Pause className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quiz Paused</h3>
          <p className="text-gray-600 mb-4">Click resume when you're ready to continue</p>
          <Button onClick={handlePauseResume}>
            <Play className="h-4 w-4 mr-2" />
            Resume Quiz
          </Button>
        </div>
      ) : (
        <QuestionRenderer
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
          onUseHint={handleUseHint}
          showHints={true}
          disabled={isSubmitting}
          userAnswer={currentAttempt.answers?.[currentQuestion.id]?.answer}
        />
      )}
    </div>
  );
}