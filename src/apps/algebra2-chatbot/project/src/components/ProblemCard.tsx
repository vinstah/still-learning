import React, { useState } from 'react';
import { Problem } from '../types';
import { Check, X, HelpCircle, Lightbulb, ChevronRight } from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
  onComplete: (problemId: string, isCorrect: boolean) => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onComplete }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showSteps, setShowSteps] = useState(false);

  const handleSubmit = () => {
    const correct = userAnswer.trim().toLowerCase() === problem.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setIsSubmitted(true);
    onComplete(problem.id, correct);
  };

  const handleShowHint = () => {
    if (currentHint < problem.hints.length - 1 && showHint) {
      setCurrentHint(prev => prev + 1);
    } else {
      setShowHint(!showHint);
      if (!showHint) setCurrentHint(0);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto my-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{problem.question}</h3>
      
      {!isSubmitted ? (
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="answer" className="text-sm font-medium text-gray-700 mb-1">
              Your Answer
            </label>
            <input
              id="answer"
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              placeholder="Enter your answer..."
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              onClick={handleShowHint}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Lightbulb className="w-4 h-4 mr-1" />
              {showHint ? 'Next Hint' : 'Show Hint'}
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                userAnswer.trim() ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          </div>
          
          {showHint && problem.hints[currentHint] && (
            <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-800 text-sm animate-fade-in">
              <div className="flex items-start">
                <HelpCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{problem.hints[currentHint]}</p>
              </div>
              <div className="mt-1 text-xs text-blue-600">
                Hint {currentHint + 1} of {problem.hints.length}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
            <div className="flex items-center">
              {isCorrect ? (
                <Check className="w-5 h-5 text-green-600 mr-2" />
              ) : (
                <X className="w-5 h-5 text-red-600 mr-2" />
              )}
              <span className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </span>
            </div>
            <p className={`mt-1 text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Great job! You got it right.' : `The correct answer is ${problem.correctAnswer}.`}
            </p>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">Explanation</h4>
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="text-sm text-purple-600 hover:text-purple-800 flex items-center"
              >
                {showSteps ? 'Hide Steps' : 'Show Steps'}
                <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showSteps ? 'rotate-90' : ''}`} />
              </button>
            </div>
            <p className="mt-2 text-gray-700">{problem.explanation}</p>
            
            {showSteps && problem.steps && (
              <div className="mt-4 space-y-2">
                <h5 className="font-medium text-gray-800">Step-by-Step Solution:</h5>
                <ol className="space-y-3 mt-2">
                  {problem.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="bg-gray-50 p-2 rounded flex-1 font-mono text-gray-800">
                        {step}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          
          <button
            className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            onClick={() => {
              setIsSubmitted(false);
              setUserAnswer('');
              setShowHint(false);
              setShowSteps(false);
            }}
          >
            Try Another Problem
          </button>
        </div>
      )}
    </div>
  );
};

export default ProblemCard;