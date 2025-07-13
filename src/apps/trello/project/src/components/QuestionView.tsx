import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, BookOpen, RefreshCw } from 'lucide-react';
import { Subject, Question } from '../App';

interface QuestionViewProps {
  subject: Subject;
  onBack: () => void;
  onQuestionComplete: () => void;
}

// Sample questions for demonstration
const generateSampleQuestions = (subject: Subject): Question[] => {
  const questions: Question[] = [];
  
  subject.topics.forEach((topic, topicIndex) => {
    // Generate 3 questions per topic for demo
    for (let i = 0; i < 3; i++) {
      questions.push({
        id: `${subject.id}-${topicIndex}-${i}`,
        subject: subject.name,
        topic,
        question: `What is a fundamental concept in ${topic} that every student should understand?`,
        type: 'multiple-choice',
        options: [
          `Basic principle A of ${topic}`,
          `Advanced theory B of ${topic}`,
          `Fundamental concept C of ${topic}`,
          `Complex application D of ${topic}`
        ],
        correctAnswer: `Fundamental concept C of ${topic}`,
        explanation: `This is the correct answer because it represents the core understanding needed in ${topic}.`,
        difficulty: ['easy', 'medium', 'hard'][i % 3] as 'easy' | 'medium' | 'hard'
      });
    }
  });
  
  return questions;
};

const QuestionView: React.FC<QuestionViewProps> = ({ subject, onBack, onQuestionComplete }) => {
  const [questions] = useState<Question[]>(generateSampleQuestions(subject));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const IconComponent = subject.icon;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    onQuestionComplete();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeSpent(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
          <p className="text-xl text-gray-600 mb-8">
            You scored {score} out of {questions.length} questions
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRestart}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Restart Quiz</span>
            </button>
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Subjects</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Subjects</span>
        </button>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span>{formatTime(timeSpent)}</span>
          </div>
          <div className="text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* Subject Info */}
      <div className="flex items-center space-x-4 mb-8">
        <div className={`p-3 rounded-lg ${subject.color}`}>
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{subject.name}</h1>
          <p className="text-gray-600">{currentQuestion.topic}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${subject.color}`}
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
          </span>
          <div className="flex items-center space-x-2 text-gray-600">
            <BookOpen className="h-4 w-4" />
            <span>{currentQuestion.topic}</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQuestion.question}
        </h2>

        {/* Multiple Choice Options */}
        <div className="space-y-3 mb-8">
          {currentQuestion.options?.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const isWrong = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(option)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : isWrong
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-500'
                        : isWrong
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                      : isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {showResult && isCorrect && <CheckCircle className="h-3 w-3 text-white" />}
                    {showResult && isWrong && <XCircle className="h-3 w-3 text-white" />}
                    {!showResult && isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-gray-900">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && currentQuestion.explanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
            <p className="text-blue-800">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <div className="text-sm text-gray-600">
            Score: {score} / {currentQuestionIndex + (showResult ? 1 : 0)}
          </div>
          <div className="space-x-3">
            {!showResult ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionView;