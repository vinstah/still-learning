import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, Award, RefreshCw } from 'lucide-react';
import { ExamQuestion } from '../types';
import { useProgress } from '../hooks/useProgress';

interface ExamPageProps {
  examQuestions: ExamQuestion[];
  yearLevel: number;
  subject: string;
  subjectId: string;
  onBack: () => void;
  onComplete: (score: number) => void;
}

const ExamPage: React.FC<ExamPageProps> = ({
  examQuestions,
  yearLevel,
  subject,
  subjectId,
  onBack,
  onComplete
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const { saveExamScore } = useProgress();

  useEffect(() => {
    if (!isSubmitted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    setShowResults(true);
    
    const correctAnswers = examQuestions.filter((question, index) => 
      answers[index] === question.correctAnswer
    ).length;
    
    const totalMarks = examQuestions.reduce((total, question) => total + question.marks, 0);
    const earnedMarks = examQuestions.reduce((total, question, index) => {
      return total + (answers[index] === question.correctAnswer ? question.marks : 0);
    }, 0);
    
    const percentage = Math.round((earnedMarks / totalMarks) * 100);
    
    // Save exam score to database
    await saveExamScore(subjectId, yearLevel, earnedMarks, totalMarks);
    
    onComplete(percentage);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  const correctAnswers = examQuestions.filter((question, index) => 
    answers[index] === question.correctAnswer
  ).length;
  
  const totalMarks = examQuestions.reduce((total, question) => total + question.marks, 0);
  const earnedMarks = examQuestions.reduce((total, question, index) => {
    return total + (answers[index] === question.correctAnswer ? question.marks : 0);
  }, 0);
  
  const percentage = Math.round((earnedMarks / totalMarks) * 100);

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Year {yearLevel}</span>
              </button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Exam Results</h1>
                <p className="text-gray-600">{subject} - Year {yearLevel}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            {/* Score Overview */}
            <div className="text-center mb-12">
              <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-12 w-12 text-blue-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Exam Complete!</h2>
              <p className="text-gray-600 mb-6">Here are your results</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className={`text-3xl font-bold mb-2 ${getScoreColor(percentage)}`}>
                    {percentage}%
                  </div>
                  <div className="text-sm text-gray-600">Overall Score</div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {getScoreGrade(percentage)}
                  </div>
                  <div className="text-sm text-gray-600">Grade</div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {correctAnswers}/{examQuestions.length}
                  </div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-xl">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {earnedMarks}/{totalMarks}
                  </div>
                  <div className="text-sm text-gray-600">Marks Earned</div>
                </div>
              </div>
            </div>

            {/* Question Review */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Question Review</h3>
              
              <div className="space-y-6">
                {examQuestions.map((question, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-medium text-gray-900 flex-1">
                          {index + 1}. {question.question}
                        </h4>
                        <div className="flex items-center space-x-2 ml-4">
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <span className={`text-sm font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {isCorrect ? `+${question.marks}` : '0'} marks
                          </span>
                        </div>
                      </div>
                      
                      {question.options && (
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optionIndex) => {
                            const isUserAnswer = option === userAnswer;
                            const isCorrectAnswer = option === question.correctAnswer;
                            
                            let className = 'p-3 rounded-lg border ';
                            if (isCorrectAnswer) {
                              className += 'bg-green-50 border-green-200 text-green-800';
                            } else if (isUserAnswer && !isCorrectAnswer) {
                              className += 'bg-red-50 border-red-200 text-red-800';
                            } else {
                              className += 'bg-gray-50 border-gray-200 text-gray-700';
                            }
                            
                            return (
                              <div key={optionIndex} className={className}>
                                <span className="font-medium">
                                  {String.fromCharCode(65 + optionIndex)}.&nbsp;
                                </span>
                                {option}
                                {isCorrectAnswer && (
                                  <span className="ml-2 text-green-600 font-medium">(Correct)</span>
                                )}
                                {isUserAnswer && !isCorrectAnswer && (
                                  <span className="ml-2 text-red-600 font-medium">(Your answer)</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-blue-800 text-sm">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Back to Lessons
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retake Exam</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentQ = examQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / examQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Exit Exam</span>
              </button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {subject} Year {yearLevel} Exam
                </h1>
                <p className="text-gray-600">
                  Question {currentQuestion + 1} of {examQuestions.length}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className={`font-mono text-sm ${timeRemaining < 300 ? 'text-red-600' : 'text-orange-600'}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {currentQ.topic}
              </span>
              <span className="text-sm text-gray-600">
                {currentQ.marks} mark{currentQ.marks !== 1 ? 's' : ''}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQ.question}
            </h2>
            
            {currentQ.options && (
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`
                      w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                      ${answers[currentQuestion] === option 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + index)}.&nbsp;
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {examQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`
                    w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200
                    ${index === currentQuestion 
                      ? 'bg-blue-600 text-white' 
                      : answers[index] 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }
                  `}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion === examQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(examQuestions.length - 1, currentQuestion + 1))}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Next Question
              </button>
            )}
          </div>
        </div>

        {/* Answer Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Answer Summary</h3>
          <div className="grid grid-cols-10 gap-2">
            {examQuestions.map((_, index) => (
              <div
                key={index}
                className={`
                  w-8 h-8 rounded flex items-center justify-center text-xs font-medium
                  ${answers[index] 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-500'
                  }
                `}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Answered: {Object.keys(answers).length} / {examQuestions.length} questions
          </p>
        </div>
      </main>
    </div>
  );
};

export default ExamPage;