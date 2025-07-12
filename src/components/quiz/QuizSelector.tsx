import React, { useState } from 'react';
import { BookOpen, Target, Zap, Brain } from 'lucide-react';
import { questionsByDifficulty, questionsByTopic, getAdaptiveQuestions } from '../../data/questions';

interface QuizSelectorProps {
  userAccuracy: number;
  completedTopics: string[];
  onStartQuiz: (questions: any[], mode: string) => void;
  isDark: boolean;
}

export const QuizSelector: React.FC<QuizSelectorProps> = ({
  userAccuracy,
  completedTopics,
  onStartQuiz,
  isDark
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const handleTopicQuiz = () => {
    if (selectedTopic && questionsByTopic[selectedTopic]) {
      onStartQuiz(questionsByTopic[selectedTopic], `Topic: ${selectedTopic}`);
    }
  };

  const handleDifficultyQuiz = () => {
    const questions = questionsByDifficulty[selectedDifficulty];
    onStartQuiz(questions, `Difficulty: ${selectedDifficulty}`);
  };

  const handleAdaptiveQuiz = () => {
    const questions = getAdaptiveQuestions(userAccuracy, completedTopics);
    onStartQuiz(questions, 'Adaptive Learning');
  };

  const handleRandomQuiz = () => {
    const allQuestions = Object.values(questionsByTopic).flat();
    const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
    onStartQuiz(shuffled, 'Random Practice');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Choose Your Quiz Mode
        </h2>
        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Select how you'd like to practice physics concepts
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Adaptive Learning */}
        <div className={`
          p-6 rounded-2xl border transition-all duration-200 hover:scale-105
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="text-purple-500" size={32} />
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Adaptive Learning
            </h3>
          </div>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            AI-powered questions based on your performance and learning gaps
          </p>
          <div className="mb-4">
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Current accuracy: {userAccuracy}% • Recommended difficulty: {
                userAccuracy >= 80 ? 'Advanced' : userAccuracy >= 60 ? 'Intermediate' : 'Beginner'
              }
            </p>
          </div>
          <button
            onClick={handleAdaptiveQuiz}
            className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Start Adaptive Quiz
          </button>
        </div>

        {/* Topic-Based */}
        <div className={`
          p-6 rounded-2xl border transition-all duration-200 hover:scale-105
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-3 mb-4">
            <Target className="text-blue-500" size={32} />
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Topic Practice
            </h3>
          </div>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Focus on specific physics topics you want to master
          </p>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className={`
              w-full p-2 rounded border mb-4
              ${isDark 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
            `}
          >
            <option value="">Select a topic...</option>
            {Object.keys(questionsByTopic).map(topic => (
              <option key={topic} value={topic}>
                {topic} ({questionsByTopic[topic].length} questions)
              </option>
            ))}
          </select>
          <button
            onClick={handleTopicQuiz}
            disabled={!selectedTopic}
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Topic Quiz
          </button>
        </div>

        {/* Difficulty-Based */}
        <div className={`
          p-6 rounded-2xl border transition-all duration-200 hover:scale-105
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-3 mb-4">
            <Zap className="text-yellow-500" size={32} />
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Difficulty Challenge
            </h3>
          </div>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Challenge yourself with questions at your preferred difficulty level
          </p>
          <div className="space-y-2 mb-4">
            {(['beginner', 'intermediate', 'advanced'] as const).map(difficulty => (
              <label key={difficulty} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="difficulty"
                  value={difficulty}
                  checked={selectedDifficulty === difficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                  className="text-yellow-500"
                />
                <span className={`capitalize ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {difficulty} ({questionsByDifficulty[difficulty].length} questions)
                </span>
              </label>
            ))}
          </div>
          <button
            onClick={handleDifficultyQuiz}
            className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Start Challenge
          </button>
        </div>

        {/* Random Practice */}
        <div className={`
          p-6 rounded-2xl border transition-all duration-200 hover:scale-105
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="text-green-500" size={32} />
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Random Practice
            </h3>
          </div>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Mixed questions from all topics for comprehensive review
          </p>
          <div className="mb-4">
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              10 random questions from all available topics and difficulties
            </p>
          </div>
          <button
            onClick={handleRandomQuiz}
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Start Random Quiz
          </button>
        </div>
      </div>
    </div>
  );
};