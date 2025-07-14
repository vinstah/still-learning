import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Clock, Book, ChevronRight, ChevronLeft, Star, Zap } from 'lucide-react';
import { Lesson, LessonContent } from '../types';
import { useProgress } from '../hooks/useProgress';
import { useTheme } from '../contexts/ThemeContext';
import ThemeSelector from './ThemeSelector';

interface LessonPageProps {
  lesson: Lesson;
  subjectId: string;
  yearLevel: number;
  onBack: () => void;
  onComplete: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const LessonPage: React.FC<LessonPageProps> = ({
  lesson,
  subjectId,
  yearLevel,
  onBack,
  onComplete,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}) => {
  const { currentTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  
  const { markLessonComplete } = useProgress();

  const currentContent = lesson.content[currentStep];
  const isLastStep = currentStep === lesson.content.length - 1;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswers({ ...answers, [currentStep]: answer });
    
    if (currentContent.type === 'question') {
      setShowExplanation(true);
    }
  };

  const handleNext = async () => {
    if (isLastStep) {
      await markLessonComplete(lesson.id, subjectId, yearLevel);
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(answers[currentStep + 1] || '');
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer(answers[currentStep - 1] || '');
      setShowExplanation(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-400 to-emerald-500';
      case 'intermediate': return 'from-yellow-400 to-orange-500';
      case 'advanced': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const subjectTheme = currentTheme.subjects[subjectId as keyof typeof currentTheme.subjects] || currentTheme.subjects.mathematics;
  
  const realmTheme = {
    gradient: subjectTheme.gradient,
    headerGradient: subjectTheme.headerGradient,
    border: subjectTheme.border,
    emoji: subjectTheme.emoji
  };

  const renderContent = (content: LessonContent) => {
    switch (content.type) {
      case 'text':
        return (
          <div className="bg-white bg-opacity-90 rounded-xl sm:rounded-2xl p-4 sm:p-8 border-2 sm:border-4 border-white border-opacity-70 shadow-xl backdrop-blur-sm">
            <div className="text-center mb-4 sm:mb-6">
              <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">📖</div>
              <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4">
                Learning Scroll
              </h3>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-800 leading-relaxed text-sm sm:text-xl font-medium text-center">
                {content.content}
              </p>
            </div>
          </div>
        );

      case 'interactive':
        return (
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 border-2 sm:border-4 border-blue-300 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-xl">
            <div className="text-center">
              <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🎯</div>
              <h3 className="text-lg sm:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">
                ⚡ Interactive Magic Exercise
              </h3>
              <p className="text-blue-800 text-sm sm:text-lg font-medium">
                {content.content}
              </p>
            </div>
          </div>
        );

      case 'question':
        return (
          <div className="space-y-4 sm:space-y-8">
            <div className="bg-white bg-opacity-90 border-2 sm:border-4 border-white border-opacity-70 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-xl backdrop-blur-sm">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-2xl sm:text-4xl mb-2 sm:mb-4">🤔</div>
                <h3 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4">
                  Challenge Question
                </h3>
              </div>
              
              <h4 className="text-sm sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                {content.content}
              </h4>
              
              <div className="space-y-2 sm:space-y-4">
                {content.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`
                      w-full text-left p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 transition-all duration-200 font-medium text-sm sm:text-lg shadow-lg
                      ${selectedAnswer === option 
                        ? 'border-blue-500 bg-gradient-to-r from-blue-100 to-purple-100 shadow-xl transform scale-105' 
                        : 'border-white bg-white bg-opacity-80 hover:border-blue-300 hover:bg-opacity-100 hover:shadow-xl'
                      }
                    `}
                  >
                    <span className="font-bold text-sm sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {String.fromCharCode(65 + index)}.&nbsp;
                    </span>
                    <span className="text-gray-800">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            {showExplanation && (
              <div className={`
                border-2 sm:border-4 rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-xl backdrop-blur-sm
                ${selectedAnswer === content.correctAnswer 
                  ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300' 
                  : 'bg-gradient-to-br from-red-100 to-pink-100 border-red-300'
                }
              `}>
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className={`
                    w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg border-2 sm:border-4 border-white
                    ${selectedAnswer === content.correctAnswer 
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
                      : 'bg-gradient-to-br from-red-400 to-pink-500'
                    }
                  `}>
                    {selectedAnswer === content.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 sm:h-8 sm:w-8 text-white" />
                    ) : (
                      <span className="text-white text-lg sm:text-2xl">❌</span>
                    )}
                  </div>
                </div>
                
                <div className="text-center mb-3 sm:mb-4">
                  <span className={`
                    text-lg sm:text-2xl font-bold
                    ${selectedAnswer === content.correctAnswer ? 'text-green-800' : 'text-red-800'}
                  `}>
                    {selectedAnswer === content.correctAnswer ? '🎉 Excellent! You got it right!' : '💪 Not quite, but great try!'}
                  </span>
                </div>
                
                <div className={`
                  bg-white bg-opacity-50 p-3 sm:p-6 rounded-lg sm:rounded-xl border border-white sm:border-2
                  ${selectedAnswer === content.correctAnswer ? 'text-green-800' : 'text-red-800'}
                `}>
                  <p className="font-medium text-sm sm:text-lg">
                    <span className="font-bold">💡 Explanation:</span> {content.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="bg-white bg-opacity-90 rounded-xl sm:rounded-2xl p-4 sm:p-8 border-2 sm:border-4 border-white border-opacity-70 shadow-xl backdrop-blur-sm">
            <div className="text-gray-600 text-center">
              <p>Content type not supported: {content.type}</p>
            </div>
          </div>
        );
    }
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
        <div className="relative max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-6">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 sm:space-x-3 bg-white bg-opacity-20 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-30 sm:border-2 text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">🏰 Back to Quests</span>
                <span className="sm:hidden">🏰 Back</span>
              </button>
              
              <div className="h-6 w-px sm:h-8 bg-white opacity-30" />
              
              <div>
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                  {realmTheme.emoji} {lesson.title}
                </h1>
                <div className="flex items-center space-x-3 sm:space-x-6 mt-1 sm:mt-2">
                  <div className="flex items-center space-x-1 sm:space-x-2 bg-white bg-opacity-20 px-2 sm:px-3 py-1 rounded-lg border border-white border-opacity-30 sm:border-2">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    <span className="text-white font-medium text-xs sm:text-base">{lesson.duration} min quest</span>
                  </div>
                  <div className={`flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r ${getDifficultyColor(lesson.difficulty)} px-2 sm:px-3 py-1 rounded-lg border border-white sm:border-2 shadow-lg`}>
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                    <span className="text-white font-bold capitalize text-xs sm:text-base">{lesson.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white bg-opacity-80 border-b-2 sm:border-b-4 border-white border-opacity-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <span className="text-xs sm:text-sm font-bold text-gray-700 uppercase tracking-wide">
              ⚡ Quest Progress: Step {currentStep + 1} of {lesson.content.length}
            </span>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              {Math.round(((currentStep + 1) / lesson.content.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-4 border-2 sm:border-4 border-gray-300 shadow-inner">
            <div
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-full rounded-full transition-all duration-300 shadow-lg"
              style={{ width: `${((currentStep + 1) / lesson.content.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-12">
        <div className="mb-6 sm:mb-10">
          {/* Lesson Description */}
          <div className="bg-white bg-opacity-80 rounded-xl sm:rounded-2xl shadow-xl border-2 sm:border-4 border-white border-opacity-70 p-4 sm:p-8 mb-6 sm:mb-10 backdrop-blur-sm">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <Book className="h-4 w-4 sm:h-6 sm:w-6 text-blue-600" />
              <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-wide">
                Quest Briefing
              </span>
            </div>
            <p className="text-gray-700 text-sm sm:text-lg font-medium">
              {lesson.description}
            </p>
          </div>

          {/* Content */}
          <div className="mb-6 sm:mb-10">
            {renderContent(currentContent)}
          </div>

          {/* Navigation */}
          <div className="bg-white bg-opacity-90 rounded-xl sm:rounded-2xl shadow-xl border-2 sm:border-4 border-white border-opacity-70 p-4 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-lg sm:rounded-xl font-bold hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-gray-400 sm:border-2 shadow-lg text-sm sm:text-base"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-1 sm:space-x-3">
                {lesson.content.map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-2 h-2 sm:w-4 sm:h-4 rounded-full border border-white sm:border-2 shadow-lg
                      ${index <= currentStep 
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500' 
                        : 'bg-gray-300'
                      }
                    `}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentContent.type === 'question' && !selectedAnswer}
                className="flex items-center space-x-2 sm:space-x-3 px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg sm:rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-blue-400 sm:border-2 shadow-xl text-sm sm:text-base"
              >
                <span>{isLastStep ? '🏆 Complete Quest' : 'Next Step'}</span>
                {!isLastStep && <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />}
                {isLastStep && <Zap className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Navigation */}
        {(hasNext || hasPrevious) && (
          <div className="mt-6 sm:mt-10 flex justify-between">
            {hasPrevious && (
              <button
                onClick={onPrevious}
                className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-6 py-2 sm:py-3 bg-white bg-opacity-80 text-gray-700 rounded-lg sm:rounded-xl font-bold hover:bg-opacity-100 transition-all duration-200 border border-white sm:border-2 shadow-lg text-sm sm:text-base"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">🔙 Previous Quest</span>
                <span className="sm:hidden">🔙 Previous</span>
              </button>
            )}
            
            {hasNext && (
              <button
                onClick={onNext}
                className="flex items-center space-x-2 sm:space-x-3 px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg sm:rounded-xl font-bold hover:from-green-600 hover:to-blue-700 transition-all duration-200 border border-green-400 sm:border-2 shadow-lg ml-auto text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Next Quest 🔜</span>
                <span className="sm:hidden">Next 🔜</span>
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
          </div>
        )}
      </main>
      
      {/* Theme Selector */}
      <ThemeSelector />
    </div>
  );
};

export default LessonPage;