import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { 
  CheckCircle, 
  XCircle, 
  Award, 
  Heart,
  Star,
  Smile,
  ThumbsUp,
  Zap,
  Target,
  Gift
} from 'lucide-react';

interface TouchFriendlyQuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export default function TouchFriendlyQuiz({ questions, onComplete }: TouchFriendlyQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const encouragementIcons = [Heart, Star, Smile, ThumbsUp, Zap, Target, Gift];
  const getRandomIcon = () => encouragementIcons[Math.floor(Math.random() * encouragementIcons.length)];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    const EncouragementIcon = getRandomIcon();
    
    return (
      <div className="space-y-8 p-6">
        <div className="text-center p-8 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl border-2 border-yellow-200">
          <div className="animate-bounce mb-4">
            <EncouragementIcon className="h-20 w-20 text-yellow-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Amazing Work!</h2>
          <div className="text-6xl font-bold text-yellow-600 mb-4">{score}%</div>
          <p className="text-xl text-gray-700 mb-6">
            {score >= 80 ? 'You\'re a superstar! 🌟' : 
             score >= 60 ? 'Great job! Keep it up! 👏' : 
             'You\'re learning! That\'s what matters! 💪'}
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {answers[question.id] === question.correctAnswer ? (
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="h-8 w-8 text-red-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Question {index + 1}
                  </h4>
                  <p className="text-gray-700 mb-3">{question.question}</p>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <p className="text-sm text-blue-800 font-medium">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-6 px-8 rounded-2xl text-xl transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Continue Learning! 🚀
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-8 p-6">
      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Counter */}
      <div className="text-center">
        <span className="inline-block bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-lg font-semibold">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl border-2 border-blue-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-4">
          {question.type === 'multiple-choice' && question.options && (
            <div className="grid gap-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const letters = ['A', 'B', 'C', 'D'];
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`p-6 rounded-2xl border-3 text-left transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-100 shadow-lg transform scale-105'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {letters[index]}
                      </div>
                      <span className="text-lg text-gray-800 font-medium">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {question.type === 'true-false' && (
            <div className="grid grid-cols-2 gap-4">
              {['true', 'false'].map((option) => {
                const isSelected = selectedAnswer === option;
                const icon = option === 'true' ? CheckCircle : XCircle;
                const IconComponent = icon;
                
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className={`p-8 rounded-2xl border-3 transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-100 shadow-lg transform scale-105'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-center">
                      <IconComponent className={`h-16 w-16 mx-auto mb-4 ${
                        option === 'true' ? 'text-green-500' : 'text-red-500'
                      }`} />
                      <span className="text-2xl font-bold text-gray-800 capitalize">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {question.type === 'fill-in-blank' && (
            <div className="text-center">
              <input
                type="text"
                value={selectedAnswer}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full max-w-md p-6 text-2xl text-center border-3 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none font-medium"
                placeholder="Type your answer..."
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            setCurrentQuestion(Math.max(0, currentQuestion - 1));
            setSelectedAnswer(answers[questions[Math.max(0, currentQuestion - 1)].id] || '');
          }}
          disabled={currentQuestion === 0}
          className="px-8 py-4 bg-gray-200 text-gray-700 rounded-2xl font-semibold text-lg disabled:opacity-50 transition-all duration-200 active:scale-95"
        >
          ← Back
        </button>
        
        <button
          onClick={nextQuestion}
          disabled={!selectedAnswer}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold text-lg disabled:opacity-50 transition-all duration-200 active:scale-95 shadow-lg"
        >
          {currentQuestion === questions.length - 1 ? 'Finish! 🎉' : 'Next →'}
        </button>
      </div>
    </div>
  );
}