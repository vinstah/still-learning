import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface BalanceActivityProps {
  onComplete: () => void;
  lesson: string;
}

const BalanceActivity: React.FC<BalanceActivityProps> = ({ onComplete, lesson }) => {
  const [leftSide, setLeftSide] = useState([]);
  const [rightSide, setRightSide] = useState([]);
  const [availableItems, setAvailableItems] = useState([
    { id: 'elephant', weight: 5, emoji: '🐘', name: 'Elephant' },
    { id: 'mouse', weight: 1, emoji: '🐭', name: 'Mouse' },
    { id: 'cat', weight: 2, emoji: '🐱', name: 'Cat' },
    { id: 'dog', weight: 3, emoji: '🐕', name: 'Dog' }
  ]);
  const [isBalanced, setIsBalanced] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  const getBalance = () => {
    const leftWeight = leftSide.reduce((sum, item) => sum + item.weight, 0);
    const rightWeight = rightSide.reduce((sum, item) => sum + item.weight, 0);
    return leftWeight - rightWeight;
  };

  const checkBalance = (newLeftSide, newRightSide) => {
    const leftWeight = newLeftSide.reduce((sum, item) => sum + item.weight, 0);
    const rightWeight = newRightSide.reduce((sum, item) => sum + item.weight, 0);
    const balance = leftWeight - rightWeight;
    
    if (Math.abs(balance) <= 1 && leftWeight > 0 && rightWeight > 0) {
      setIsBalanced(true);
      setTimeout(() => {
        setShowLesson(true);
        setCanContinue(true);
      }, 2000);
    } else {
      setIsBalanced(false);
    }
  };

  const moveToSide = (item, side) => {
    if (canContinue) return;
    
    setAvailableItems(prev => prev.filter(i => i.id !== item.id));
    
    if (side === 'left') {
      const newLeftSide = [...leftSide, item];
      setLeftSide(newLeftSide);
      checkBalance(newLeftSide, rightSide);
    } else {
      const newRightSide = [...rightSide, item];
      setRightSide(newRightSide);
      checkBalance(leftSide, newRightSide);
    }
  };

  const resetItem = (item, fromSide) => {
    if (canContinue) return;
    
    if (fromSide === 'left') {
      const newLeftSide = leftSide.filter(i => i.id !== item.id);
      setLeftSide(newLeftSide);
      checkBalance(newLeftSide, rightSide);
    } else {
      const newRightSide = rightSide.filter(i => i.id !== item.id);
      setRightSide(newRightSide);
      checkBalance(leftSide, newRightSide);
    }
    setAvailableItems(prev => [...prev, item]);
  };

  const handleContinue = () => {
    onComplete();
  };

  const balance = getBalance();
  const tilt = Math.max(-30, Math.min(30, balance * 6));

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Help Princess Emma balance the bridge!</h3>
        <p className="text-sm text-gray-600">Put animals on both sides to make it balanced</p>
      </div>

      <div className="relative">
        <div className="text-center mb-4">
          <div className="text-4xl">👸</div>
          <div 
            className="w-64 h-4 bg-amber-600 mx-auto rounded transition-transform duration-500"
            style={{ transform: `rotate(${tilt}deg)` }}
          ></div>
          <div className="text-2xl">⚖️</div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-4">
          <div className="min-h-20 border-2 border-dashed border-green-300 rounded-lg p-4 bg-green-50">
            <div className="text-center text-sm font-medium mb-2">Left Side</div>
            <div className="flex flex-wrap justify-center gap-2">
              {leftSide.map((item, index) => (
                <button
                  key={`left-${item.id}-${index}`}
                  onClick={() => resetItem(item, 'left')}
                  className="text-2xl hover:scale-110 transition-transform cursor-pointer"
                  disabled={canContinue}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-20 border-2 border-dashed border-red-300 rounded-lg p-4 bg-red-50">
            <div className="text-center text-sm font-medium mb-2">Right Side</div>
            <div className="flex flex-wrap justify-center gap-2">
              {rightSide.map((item, index) => (
                <button
                  key={`right-${item.id}-${index}`}
                  onClick={() => resetItem(item, 'right')}
                  className="text-2xl hover:scale-110 transition-transform cursor-pointer"
                  disabled={canContinue}
                >
                  {item.emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {availableItems.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded-lg shadow-md text-center border-2 border-gray-200">
            <div className="text-2xl mb-1">{item.emoji}</div>
            <div className="text-xs font-medium mb-2">{item.name}</div>
            <div className="space-y-1">
              <button
                onClick={() => moveToSide(item, 'left')}
                className="w-full bg-green-100 px-2 py-1 rounded text-xs border hover:bg-green-200 transition-colors disabled:opacity-50"
                disabled={canContinue}
              >
                ← Left
              </button>
              <button
                onClick={() => moveToSide(item, 'right')}
                className="w-full bg-red-100 px-2 py-1 rounded text-xs border hover:bg-red-200 transition-colors disabled:opacity-50"
                disabled={canContinue}
              >
                Right →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        {isBalanced && !showLesson && (
          <div className="text-green-600 font-bold text-lg animate-bounce p-4 bg-green-100 rounded-lg">
            🎉 Perfect balance! The bridge is safe!
          </div>
        )}
        {!isBalanced && (leftSide.length > 0 || rightSide.length > 0) && !canContinue && (
          <div className="text-blue-600 font-medium">Keep trying! The bridge needs to be balanced.</div>
        )}
      </div>

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
    </div>
  );
};

export default BalanceActivity;