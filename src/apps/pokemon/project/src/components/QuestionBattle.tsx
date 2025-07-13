import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Lightbulb, Zap, Heart } from 'lucide-react';
import { Question, AICompanion } from '../types/game';

interface QuestionBattleProps {
  question: Question;
  onAnswer: (selectedAnswer: number) => void;
  timeLeft: number;
  aiCompanion: AICompanion;
  playerHealth: number;
  maxHealth: number;
}

export const QuestionBattle: React.FC<QuestionBattleProps> = ({
  question,
  onAnswer,
  timeLeft,
  aiCompanion,
  playerHealth,
  maxHealth
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    setTimeout(() => {
      onAnswer(answerIndex);
    }, 1000);
  };

  const timePercentage = (timeLeft / 30) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-48 h-48 bg-pink-400/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        {/* Battle UI Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-400" />
              <div className="flex space-x-1">
                {Array.from({ length: maxHealth }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full ${
                      i < playerHealth ? 'bg-red-500' : 'bg-gray-600'
                    } shadow-lg`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex items-center space-x-4">
            <Clock className="w-5 h-5 text-yellow-400" />
            <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ${
                  timePercentage > 50 ? 'bg-green-500' : 
                  timePercentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${timePercentage}%` }}
              ></div>
            </div>
            <span className="text-white font-bold text-lg">{timeLeft}s</span>
          </div>
        </div>

        {/* AI Companion */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <p className="text-white font-medium">{aiCompanion.name}</p>
              <p className="text-purple-200 text-sm">Ready to help when you need it!</p>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-600 font-medium">+{question.xpReward} XP</span>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {question.difficulty.toUpperCase()}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
            {question.question}
          </h2>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={`
                  p-6 rounded-2xl text-lg font-medium transition-all duration-300
                  ${selectedAnswer === index 
                    ? (index === question.correctAnswer 
                       ? 'bg-green-500 text-white shadow-lg' 
                       : 'bg-red-500 text-white shadow-lg')
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-2 border-transparent hover:border-blue-300'
                  }
                  ${isAnswered && index === question.correctAnswer && selectedAnswer !== index
                    ? 'bg-green-200 border-2 border-green-400'
                    : ''
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    selectedAnswer === index ? 'bg-white/20' : 'bg-blue-500 text-white'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Hint Button */}
          {question.hint && !showHint && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHint(true)}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Lightbulb className="w-5 h-5" />
              <span>Need a Hint?</span>
            </motion.button>
          )}

          {/* Hint Display */}
          <AnimatePresence>
            {showHint && question.hint && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-l-4 border-blue-400"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    🤖
                  </div>
                  <div>
                    <p className="text-gray-700 font-medium">{aiCompanion.name} says:</p>
                    <p className="text-gray-600 mt-1">{question.hint}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};