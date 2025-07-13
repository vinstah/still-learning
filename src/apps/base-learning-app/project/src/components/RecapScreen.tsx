import React, { useState } from 'react';
import { Lesson, QuizQuestion } from '../types';
import { BookOpen, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface RecapScreenProps {
  previousLesson: Lesson | null;
  onContinue: () => void;
}

export default function RecapScreen({ previousLesson, onContinue }: RecapScreenProps) {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  if (!previousLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-4">
          <div className="text-center">
            <BookOpen className="h-16 w-16 text-purple-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Learning!</h2>
            <p className="text-gray-600 mb-6">
              This is your first lesson. Let's dive in and start exploring!
            </p>
            <button
              onClick={onContinue}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              Continue to New Lesson
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleQuizAnswer = (questionId: string, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    setQuizComplete(true);
  };

  const calculateScore = () => {
    let correct = 0;
    previousLesson.quiz.forEach(question => {
      const userAnswer = quizAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / previousLesson.quiz.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Let's Review What You Learned
            </h1>
            <p className="text-xl text-gray-600">
              Before moving on, let's refresh your memory about your last lesson
            </p>
          </div>

          {/* Recap Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-purple-500" />
              Last Lesson: {previousLesson.title}
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Concept</h3>
                <p className="text-gray-700 bg-purple-50 p-4 rounded-lg">
                  {previousLesson.content.concept}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Why It Matters</h3>
                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">
                  {previousLesson.content.realWorldContext}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Points</h3>
                <ul className="space-y-2">
                  {previousLesson.content.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mini Quiz */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Memory Check</h2>
            
            <div className="space-y-6">
              {previousLesson.quiz.map((question, index) => (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Question {index + 1}: {question.question}
                  </h3>
                  
                  {question.type === 'multiple-choice' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center">
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={quizAnswers[question.id] === option}
                            onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                            className="mr-3"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'true-false' && (
                    <div className="space-y-2">
                      {['true', 'false'].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={quizAnswers[question.id] === option}
                            onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                            className="mr-3"
                          />
                          <span className="text-gray-700 capitalize">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {question.type === 'fill-in-blank' && (
                    <input
                      type="text"
                      value={quizAnswers[question.id] || ''}
                      onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Type your answer here..."
                    />
                  )}
                  
                  {showResults && (
                    <div className="mt-4 p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center mb-2">
                        {quizAnswers[question.id] === question.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        <span className={`font-semibold ${
                          quizAnswers[question.id] === question.correctAnswer ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {quizAnswers[question.id] === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!showResults && (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(quizAnswers).length < previousLesson.quiz.length}
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Submit Quiz
              </button>
            )}

            {showResults && (
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">
                  Quiz Complete! Score: {calculateScore()}%
                </h3>
                <p className="text-purple-700 mb-4">
                  {calculateScore() >= 70 ? 'Great job! You remembered the key concepts.' : 'No worries! Review is helpful for learning.'}
                </p>
                <button
                  onClick={onContinue}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Continue to New Lesson
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}