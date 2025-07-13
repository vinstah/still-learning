import React, { useState } from 'react';
import { X, CheckCircle, Clock, Users, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { QuestionCard } from '../data/questionBank';

interface QuestionViewerProps {
  question: QuestionCard;
  onClose: () => void;
  onComplete: () => void;
}

const QuestionViewer: React.FC<QuestionViewerProps> = ({
  question,
  onClose,
  onComplete
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSubmit = () => {
    setIsAnswered(true);
    setShowExplanation(true);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation': return 'bg-green-100 text-green-800 border-green-200';
      case 'building': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'mastery': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation': return '🌱';
      case 'building': return '🏗️';
      case 'mastery': return '🎯';
      default: return '📝';
    }
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-xl">{getDifficultyIcon(question.difficulty)}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Question Title */}
            <h2 className="text-xl font-bold text-gray-900">{question.title}</h2>

            {/* Question Content */}
            <div className="prose max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {question.content}
              </ReactMarkdown>
            </div>

            {/* LaTeX Formula */}
            {question.latex && (
              <div className="p-4 bg-gray-50 rounded-lg border">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {`$$${question.latex}$$`}
                </ReactMarkdown>
              </div>
            )}

            {/* Answer Options */}
            {question.options && question.options.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Choose your answer:</h3>
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectOption = option === question.correctAnswer;
                  const showResult = isAnswered;

                  return (
                    <button
                      key={index}
                      onClick={() => !isAnswered && setSelectedAnswer(option)}
                      disabled={isAnswered}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showResult
                          ? isCorrectOption
                            ? 'border-green-500 bg-green-50'
                            : isSelected && !isCorrectOption
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
                            ? isCorrectOption
                              ? 'border-green-500 bg-green-500'
                              : isSelected && !isCorrectOption
                              ? 'border-red-500 bg-red-500'
                              : 'border-gray-300'
                            : isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {showResult && isCorrectOption && <CheckCircle className="h-3 w-3 text-white" />}
                          {showResult && isSelected && !isCorrectOption && <X className="h-3 w-3 text-white" />}
                          {!showResult && isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-gray-900">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Explanation */}
            {showExplanation && question.explanation && (
              <div className={`p-4 rounded-lg border ${
                isCorrect ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs">i</span>
                    </div>
                  )}
                  <h4 className={`font-semibold ${
                    isCorrect ? 'text-green-900' : 'text-blue-900'
                  }`}>
                    {isCorrect ? 'Correct!' : 'Explanation'}
                  </h4>
                </div>
                <div className={`prose prose-sm max-w-none ${
                  isCorrect ? 'text-green-800' : 'text-blue-800'
                }`}>
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {question.explanation}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {/* Question Meta */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">{question.estimatedTime} minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{question.type}</span>
              </div>
              {question.accommodations.length > 0 && (
                <div className="col-span-2 flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-700">
                    {question.accommodations.length} accommodation{question.accommodations.length !== 1 ? 's' : ''} available
                  </span>
                </div>
              )}
            </div>

            {/* Visual Supports */}
            {question.visualSupports.length > 0 && (
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Visual Supports Available:</h4>
                <div className="flex flex-wrap gap-2">
                  {question.visualSupports.map((support, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                      {support}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {question.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {question.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              {!isAnswered ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Submit Answer</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Mark Complete</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionViewer;