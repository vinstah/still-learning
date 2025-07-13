import React, { useState } from 'react';
import { CheckCircle, HelpCircle, AlertCircle } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathProblemProps {
  id: string;
  question: string;
  difficulty: 'easy' | 'medium' | 'hard';
  hint: string;
  solution: string;
  answer: string | number;
}

const MathProblem: React.FC<MathProblemProps> = ({ 
  id, 
  question, 
  difficulty, 
  hint, 
  solution, 
  answer 
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const difficultyColors = {
    easy: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-amber-100 text-amber-800 border-amber-200',
    hard: 'bg-red-100 text-red-800 border-red-200'
  };

  const difficultyLabel = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  };

  const renderMathContent = (text: string) => {
    return text.split(/(\$.*?\$)/).map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1);
        return <InlineMath key={index} math={math} />;
      }
      return part;
    });
  };

  const checkAnswer = () => {
    const formattedUserAnswer = userAnswer.trim().toLowerCase();
    const formattedCorrectAnswer = String(answer).trim().toLowerCase();
    
    const correct = formattedUserAnswer === formattedCorrectAnswer;
    setIsCorrect(correct);
  };

  return (
    <div className="bg-yellow-50 rounded-lg border-2 border-amber-200 shadow-md p-4 mb-6 max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-handwriting text-xl text-slate-800">Problem #{id}</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[difficulty]} border`}>
          {difficultyLabel[difficulty]}
        </div>
      </div>
      
      <div className="mb-6 bg-white p-4 rounded-md border border-amber-100">
        <div className="font-handwriting text-lg">
          {renderMathContent(question)}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block font-handwriting text-slate-700 mb-2">Your Answer:</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full bg-white border-2 border-amber-200 rounded-md px-4 py-2 font-handwriting text-lg focus:outline-none focus:border-blue-400"
            placeholder="Enter your answer..."
          />
          <button
            onClick={checkAnswer}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-colors"
          >
            Check
          </button>
        </div>
        
        {isCorrect !== null && (
          <div className={`mt-3 p-3 rounded-md ${isCorrect ? 'bg-green-100' : 'bg-red-100'} flex items-center gap-2`}>
            {isCorrect ? (
              <>
                <CheckCircle className="text-green-600" />
                <span className="font-handwriting text-green-800">Correct! Good job!</span>
              </>
            ) : (
              <>
                <AlertCircle className="text-red-600" />
                <span className="font-handwriting text-red-800">Not quite right. Try again or check the hint.</span>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
        >
          <HelpCircle size={18} />
          <span className="font-handwriting">{showHint ? 'Hide Hint' : 'Show Hint'}</span>
        </button>
        
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
        >
          <CheckCircle size={18} />
          <span className="font-handwriting">{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
        </button>
      </div>
      
      {showHint && (
        <div className="mt-4 p-4 bg-purple-50 rounded-md border border-purple-200 relative overflow-hidden transform transition-all duration-300 ease-in-out">
          <div className="absolute top-0 left-0 w-full h-1 bg-purple-300"></div>
          <h4 className="font-handwriting text-purple-800 mb-2 text-lg">Hint:</h4>
          <div className="font-handwritten-notes text-purple-700">
            {renderMathContent(hint)}
          </div>
        </div>
      )}
      
      {showSolution && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200 relative overflow-hidden transform transition-all duration-300 ease-in-out">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-300"></div>
          <h4 className="font-handwriting text-blue-800 mb-2 text-lg">Solution:</h4>
          <div className="font-handwritten-notes text-blue-700">
            {renderMathContent(solution)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MathProblem;