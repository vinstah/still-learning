import React, { useState } from 'react';
import { QuizQuestion } from '../QuizQuestion';
import { QuizSelector } from '../quiz/QuizSelector';
import { QuizStats } from '../quiz/QuizStats';
import { ProgressBar } from '../ProgressBar';
import { Question, QuizResult } from '../../types/question';
import { ArrowLeft, BarChart3 } from 'lucide-react';

interface QuizViewProps {
  currentQuestion: Question | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
  userAccuracy: number;
  completedTopics: string[];
  quizResults: QuizResult[];
  isDark: boolean;
}

export const QuizView: React.FC<QuizViewProps> = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  userAccuracy,
  completedTopics,
  quizResults,
  isDark
}) => {
  const [quizMode, setQuizMode] = useState<'selector' | 'quiz' | 'stats'>('selector');
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
  const [currentQuizMode, setCurrentQuizMode] = useState<string>('');

  const handleStartQuiz = (questions: Question[], mode: string) => {
    setCurrentQuizQuestions(questions);
    setCurrentQuizMode(mode);
    setQuizMode('quiz');
  };

  const handleBackToSelector = () => {
    setQuizMode('selector');
    setCurrentQuizQuestions([]);
    setCurrentQuizMode('');
  };

  const handleViewStats = () => {
    setQuizMode('stats');
  };

  const renderContent = () => {
    switch (quizMode) {
      case 'stats':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setQuizMode('selector')}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                  ${isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }
                `}
              >
                <ArrowLeft size={16} />
                <span>Back to Quiz Selection</span>
              </button>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quiz Statistics
              </h2>
            </div>
            <QuizStats results={quizResults} isDark={isDark} />
          </div>
        );

      case 'quiz':
        if (!currentQuestion) {
          return (
            <div className="text-center space-y-4">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Quiz Complete!
              </h3>
              <button
                onClick={handleBackToSelector}
                className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Take Another Quiz
              </button>
            </div>
          );
        }

        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToSelector}
                className={`
                  flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors
                  ${isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }
                `}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <div className={`text-sm px-3 py-1 rounded-full ${
                isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
              }`}>
                {currentQuizMode}
              </div>
            </div>

            <div className="mb-6">
              <ProgressBar 
                current={currentQuestionIndex + 1} 
                total={totalQuestions} 
                isDark={isDark} 
              />
            </div>
            
            <QuizQuestion
              question={currentQuestion.question}
              options={currentQuestion.options}
              correctAnswer={typeof currentQuestion.correctAnswer === 'number' ? currentQuestion.correctAnswer : 0}
              onAnswer={onAnswer}
              isDark={isDark}
            />
            
            <div className="text-center space-y-2">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Topic: {currentQuestion.topic}
              </p>
              {currentQuestion.difficulty && (
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Difficulty: {currentQuestion.difficulty}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Physics Quiz Center
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Current accuracy: {userAccuracy}% • {completedTopics.length} topics mastered
                </p>
              </div>
              <button
                onClick={handleViewStats}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                  ${isDark 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }
                `}
              >
                <BarChart3 size={16} />
                <span>View Stats</span>
              </button>
            </div>
            
            <QuizSelector
              userAccuracy={userAccuracy}
              completedTopics={completedTopics}
              onStartQuiz={handleStartQuiz}
              isDark={isDark}
            />
          </div>
        );
    }
  };

  return renderContent();
};