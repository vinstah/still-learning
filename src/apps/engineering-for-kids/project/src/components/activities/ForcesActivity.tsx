import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface ForcesActivityProps {
  onComplete: () => void;
  lesson: string;
}

const ForcesActivity: React.FC<ForcesActivityProps> = ({ onComplete, lesson }) => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [tools] = useState([
    { id: 'hands', name: 'Hands', effectiveness: 1, emoji: '👋', description: 'Just your hands' },
    { id: 'rope', name: 'Rope', effectiveness: 2, emoji: '🪢', description: 'Pull with rope' },
    { id: 'pulley', name: 'Pulley', effectiveness: 3, emoji: '⚙️', description: 'Magic wheel system!' }
  ]);
  const [feedback, setFeedback] = useState('');
  const [showLesson, setShowLesson] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    
    if (tool.effectiveness === 3) {
      setFeedback("🎉 Amazing! The pulley makes it super easy to lift heavy things!");
      setTimeout(() => {
        setShowLesson(true);
        setCanContinue(true);
      }, 3000);
    } else if (tool.effectiveness === 2) {
      setFeedback("🤔 The rope helps, but there's an even better tool!");
      setTimeout(() => setFeedback(''), 4000);
    } else {
      setFeedback("😓 Using just hands is too hard! Try a different tool!");
      setTimeout(() => setFeedback(''), 4000);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Help Captain Jack lift the treasure!</h3>
        <div className="text-6xl mb-4">🏴‍☠️</div>
        <div className="text-4xl mb-4">📦💎</div>
        <p className="text-sm text-gray-600">The treasure chest is very heavy! Which tool will help the most?</p>
      </div>

      <div className="min-h-20 border-2 border-dashed border-yellow-300 rounded-lg p-4 bg-yellow-50 text-center">
        {selectedTool ? (
          <div className="space-y-2">
            <div className="text-4xl">{selectedTool.emoji}</div>
            <div className="text-sm font-medium">{selectedTool.name}</div>
          </div>
        ) : (
          <p className="text-gray-500">Choose a tool to help lift the treasure!</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleToolSelect(tool)}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer text-center border-2 border-gray-200 hover:border-blue-400 transition-colors transform hover:scale-105 disabled:opacity-50"
            disabled={canContinue}
          >
            <div className="text-3xl mb-2">{tool.emoji}</div>
            <div className="font-medium mb-1">{tool.name}</div>
            <div className="text-xs text-gray-600 mb-2">{tool.description}</div>
            <div className="text-sm text-gray-600">
              {'💪'.repeat(tool.effectiveness)}
            </div>
          </button>
        ))}
      </div>

      {feedback && (
        <div className="text-center text-lg font-medium p-4 bg-yellow-100 rounded-lg border border-yellow-300">
          {feedback}
        </div>
      )}

      {showLesson && (
        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-green-500" />
            <span className="font-bold text-green-700">What did we learn?</span>
          </div>
          <p className="text-gray-700 mb-4">{lesson}</p>
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Continue to Next Story! 🎉
          </button>
        </div>
      )}

      <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
        <div className="text-sm text-purple-700">
          <strong>💡 Force Tip:</strong> Tools can help us use our force more effectively - like how a lever helps you lift heavy things!
        </div>
      </div>
    </div>
  );
};

export default ForcesActivity;