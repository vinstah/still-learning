import React, { useState } from 'react';
import { Lesson } from '../types';
import { BookOpen, Lightbulb, CheckCircle, ArrowRight } from 'lucide-react';
import QuizModal from './QuizModal';

interface LessonContentProps {
  lesson: Lesson;
  onComplete: () => void;
}

export default function LessonContent({ lesson, onComplete }: LessonContentProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = () => {
    setQuizComplete(true);
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Let's explore a new concept together
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 animate-slide-up">
            <div className="space-y-8">
              {/* Real World Context */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-3">
                    <Lightbulb className="h-6 w-6 text-yellow-600" />
                  </div>
                  Why This Matters
                </h2>
                <p className="text-lg text-gray-700 bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-yellow-200 leading-relaxed">
                  {lesson.content.realWorldContext}
                </p>
              </div>

              {/* Main Concept */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  Key Concept
                </h2>
                <p className="text-lg text-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border-2 border-blue-200 leading-relaxed">
                  {lesson.content.concept}
                </p>
              </div>

              {/* Key Points */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Important Points to Remember
                </h2>
                <ul className="space-y-4">
                  {lesson.content.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start p-4 bg-green-50 rounded-xl border border-green-200">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-lg leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Examples */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Real-World Examples
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lesson.content.examples.map((example, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all duration-200">
                      <p className="text-gray-700 text-lg leading-relaxed">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8">
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-200 text-xl shadow-lg hover:shadow-xl active:scale-95"
              >
                Ready for Quiz? 🧠
              </button>
            </div>
          </div>

          {/* Quiz Section */}
          <QuizModal
            isOpen={showQuiz}
            onClose={() => setShowQuiz(false)}
            questions={lesson.quiz}
            onComplete={handleQuizComplete}
          />
          
          {quizComplete && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 animate-slide-up">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-900 mb-4 text-center">
                  Lesson Complete! 🎉
                </h3>
                <p className="text-green-700 mb-6 text-center text-lg leading-relaxed">
                  Great job working through this lesson. You've learned about {lesson.title.toLowerCase()} and practiced with the quiz.
                </p>
                <button
                  onClick={onComplete}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center text-xl shadow-lg hover:shadow-xl active:scale-95"
                >
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  Complete Lesson & Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}