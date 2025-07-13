import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { Question } from '../../types/game';
import ProgressBar from '../UI/ProgressBar';
import Confetti from 'react-confetti';

const ActivityScreen: React.FC = () => {
  const { currentActivity, setCurrentActivity, completeActivity } = useGameStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const questions = currentActivity?.content.questions || [];
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (currentActivity?.content.timeLimit) {
      setTimeLeft(currentActivity.content.timeLimit);
    }
  }, [currentActivity]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentActivity?.content.timeLimit) {
      handleTimeUp();
    }
  }, [timeLeft]);

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      nextQuestion();
    } else {
      finishActivity();
    }
  };

  const handleAnswerSelect = (answer: string | number) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + currentQuestion.points);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
      } else {
        finishActivity();
      }
    }, 1500);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(null);
    if (currentActivity?.content.timeLimit) {
      setTimeLeft(currentActivity.content.timeLimit);
    }
  };

  const finishActivity = () => {
    if (!currentActivity) return;
    
    const finalScore = Math.round((score / questions.reduce((sum, q) => sum + q.points, 0)) * 100);
    
    if (finalScore >= 70) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    
    completeActivity(currentActivity.id, finalScore);
  };

  const handleClose = () => {
    setCurrentActivity(null);
  };

  if (!currentActivity || !currentQuestion) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      {showConfetti && <Confetti />}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold">{currentActivity.title}</h2>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            {timeLeft > 0 && (
              <div className="flex items-center space-x-1">
                <Clock size={16} />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>
          
          <ProgressBar progress={progress} className="mt-2" />
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {currentQuestion.text}
              </h3>

              {currentQuestion.options ? (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      disabled={showResult}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                        selectedAnswer === option
                          ? showResult
                            ? isCorrect
                              ? 'border-success-500 bg-success-50 text-success-700'
                              : 'border-red-500 bg-red-50 text-red-700'
                            : 'border-primary-500 bg-primary-50 text-primary-700'
                          : showResult && option === currentQuestion.correctAnswer
                          ? 'border-success-500 bg-success-50 text-success-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                      whileHover={{ scale: showResult ? 1 : 1.02 }}
                      whileTap={{ scale: showResult ? 1 : 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showResult && (
                          <>
                            {option === currentQuestion.correctAnswer && (
                              <CheckCircle className="text-success-500" size={20} />
                            )}
                            {selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                              <XCircle className="text-red-500" size={20} />
                            )}
                          </>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={selectedAnswer || ''}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none"
                    disabled={showResult}
                  />
                </div>
              )}

              {showResult && currentQuestion.explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${
                    isCorrect ? 'bg-success-50 border border-success-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <p className={`text-sm ${isCorrect ? 'text-success-700' : 'text-red-700'}`}>
                    {currentQuestion.explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Trophy size={16} />
              <span>Score: {score}</span>
            </div>
            <div className="text-sm text-gray-600">
              Points: {currentQuestion.points}
            </div>
          </div>

          {!showResult ? (
            <motion.button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                selectedAnswer !== null
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              whileHover={selectedAnswer !== null ? { scale: 1.02 } : {}}
              whileTap={selectedAnswer !== null ? { scale: 0.98 } : {}}
            >
              Submit Answer
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`w-full py-3 rounded-xl font-semibold text-center ${
                isCorrect
                  ? 'bg-success-100 text-success-700 border border-success-200'
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}
            >
              {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ActivityScreen;