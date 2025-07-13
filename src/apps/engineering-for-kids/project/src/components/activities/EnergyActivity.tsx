import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface EnergyActivityProps {
  onComplete: () => void;
  lesson: string;
}

const EnergyActivity: React.FC<EnergyActivityProps> = ({ onComplete, lesson }) => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [bunnyPosition, setBunnyPosition] = useState({ x: 0, y: 0 });
  const [currentStep, setCurrentStep] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameResult, setGameResult] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  // Define maze paths with coordinates
  const paths = [
    { 
      id: 'muddy', 
      name: 'Muddy Path', 
      emoji: '🟤', 
      description: 'Looks easy but...',
      color: 'bg-amber-700',
      route: [
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
        { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 },
        { x: 8, y: 2 }, { x: 8, y: 1 }, { x: 8, y: 0 }, { x: 9, y: 0 }, { x: 10, y: 0 },
        { x: 11, y: 0 }, { x: 12, y: 0 }, { x: 12, y: 1 }, { x: 12, y: 2 }, { x: 11, y: 2 },
        { x: 10, y: 2 }, { x: 9, y: 2 }, { x: 9, y: 3 }, { x: 10, y: 3 }, { x: 11, y: 3 },
        { x: 12, y: 3 }, { x: 11, y: 3 }, { x: 10, y: 3 }, { x: 9, y: 3 }, { x: 8, y: 3 }
      ],
      outcome: 'dead-end',
      feedback: "Oh no! The muddy path slows Benny down and leads to a dead end! 🤕"
    },
    { 
      id: 'rocky', 
      name: 'Rocky Path', 
      emoji: '🪨', 
      description: 'Looks challenging',
      color: 'bg-gray-600',
      route: [
        { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 2 },
        { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 },
        { x: 7, y: 2 }, { x: 7, y: 1 }, { x: 8, y: 1 }, { x: 9, y: 1 }, { x: 10, y: 1 },
        { x: 11, y: 1 }, { x: 12, y: 1 }, { x: 12, y: 2 }, { x: 11, y: 2 }, { x: 10, y: 2 },
        { x: 9, y: 2 }, { x: 8, y: 2 }, { x: 7, y: 2 }, { x: 6, y: 2 }, { x: 5, y: 2 }
      ],
      outcome: 'dead-end',
      feedback: "Ouch! The rocky path is too bumpy and doesn't lead to carrots! 🪨"
    },
    { 
      id: 'energy', 
      name: 'Energy Path', 
      emoji: '⚡', 
      description: 'Glowing with energy!',
      color: 'bg-yellow-400',
      route: [
        { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
        { x: 4, y: 3 }, { x: 5, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 },
        { x: 9, y: 3 }, { x: 10, y: 3 }, { x: 11, y: 3 }, { x: 12, y: 3 }, { x: 12, y: 2 },
        { x: 12, y: 1 }, { x: 12, y: 0 }, { x: 11, y: 0 }, { x: 10, y: 0 }, { x: 9, y: 0 }
      ],
      outcome: 'success',
      feedback: "🎉 Perfect! The energy path gives Benny the momentum to reach the carrots!"
    }
  ];

  const startJourney = (path) => {
    setSelectedPath(path);
    setGameStarted(true);
    setIsAnimating(true);
    setBunnyPosition(path.route[0]);
    setCurrentStep(0);
    setGameResult('');

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        if (nextStep >= path.route.length) {
          clearInterval(interval);
          setIsAnimating(false);
          setGameResult(path.outcome);
          
          if (path.outcome === 'success') {
            setTimeout(() => {
              setShowLesson(true);
              setCanContinue(true);
            }, 3000);
          }
          return prev;
        }
        setBunnyPosition(path.route[nextStep]);
        return nextStep;
      });
    }, 300);
  };

  const resetGame = () => {
    setSelectedPath(null);
    setGameStarted(false);
    setBunnyPosition({ x: 0, y: 0 });
    setCurrentStep(0);
    setGameResult('');
    setIsAnimating(false);
    setShowLesson(false);
    setCanContinue(false);
  };

  const handleContinue = () => {
    onComplete();
  };

  const renderMazeCell = (x, y) => {
    const isStart = x === 0 && (y === 0 || y === 1 || y === 2);
    const isCarrotEnd = x === 9 && y === 0;
    const isDeadEnd = (x === 8 && y === 3) || (x === 5 && y === 2);
    const isBunnyPosition = bunnyPosition.x === x && bunnyPosition.y === y;
    
    // Check if this cell is part of the selected path
    const isOnSelectedPath = selectedPath && selectedPath.route.some(pos => pos.x === x && pos.y === y);
    const isCompletedPath = selectedPath && selectedPath.route.slice(0, currentStep + 1).some(pos => pos.x === x && pos.y === y);

    let cellContent = '';
    let cellClass = 'w-6 h-6 md:w-8 md:h-8 border border-gray-300 flex items-center justify-center text-xs md:text-sm relative';

    if (isStart) {
      cellContent = '🏠';
      cellClass += ' bg-green-100';
    } else if (isCarrotEnd) {
      cellContent = '🥕';
      cellClass += ' bg-orange-100';
    } else if (isDeadEnd) {
      cellContent = '❌';
      cellClass += ' bg-red-100';
    } else if (isOnSelectedPath) {
      cellClass += ` ${selectedPath.color} opacity-60`;
    } else {
      cellClass += ' bg-gray-50';
    }

    return (
      <div key={`${x}-${y}`} className={cellClass}>
        {cellContent}
        {isBunnyPosition && gameStarted && (
          <div className={`absolute inset-0 flex items-center justify-center ${isAnimating ? 'animate-bounce' : ''}`}>
            <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-50 animate-ping"></div>
            <span className="text-lg relative z-10">🐰</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Help Benny choose the right path to the carrots!</h3>
        <div className="text-6xl mb-4">🐰</div>
        <p className="text-sm text-gray-600">The map shows 3 paths. Which one has enough energy to get there?</p>
      </div>

      {/* Maze Grid */}
      <div className="bg-gradient-to-b from-green-200 to-amber-100 p-4 rounded-lg">
        <div className="grid grid-cols-13 gap-0 max-w-full overflow-x-auto mx-auto">
          {Array.from({ length: 4 }, (_, y) =>
            Array.from({ length: 13 }, (_, x) => renderMazeCell(x, y))
          )}
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <span>🏠</span>
            <span>Start</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🥕</span>
            <span>Carrots</span>
          </div>
          <div className="flex items-center gap-1">
            <span>❌</span>
            <span>Dead End</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🐰</span>
            <span>Benny</span>
          </div>
        </div>

        {gameStarted && (
          <div className="text-center mt-2 text-sm font-bold">
            Steps taken: {currentStep + 1}/{selectedPath.route.length}
          </div>
        )}
      </div>

      {/* Path Selection */}
      {!gameStarted && !showLesson && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paths.map((path) => (
            <button
              key={path.id}
              onClick={() => startJourney(path)}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer text-center border-2 border-gray-200 hover:border-blue-400 transition-colors transform hover:scale-105"
            >
              <div className="text-3xl mb-2">{path.emoji}</div>
              <div className="font-medium text-sm mb-1">{path.name}</div>
              <div className="text-xs text-gray-600 mb-2">{path.description}</div>
              <div className="text-xs text-purple-600 font-bold">
                {path.route.length} steps needed
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Game Results */}
      {gameResult && !showLesson && (
        <div className="text-center p-4 rounded-lg">
          {gameResult === 'success' && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg border border-green-300">
              <div className="text-4xl mb-2">🎉</div>
              <div className="font-bold text-lg">Benny found the carrots!</div>
              <div className="text-sm">{selectedPath.feedback}</div>
            </div>
          )}
          {gameResult === 'dead-end' && (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg border border-yellow-300">
              <div className="text-4xl mb-2">😅</div>
              <div className="font-bold text-lg">Dead end!</div>
              <div className="text-sm mb-4">{selectedPath.feedback}</div>
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Another Path! 🐰
              </button>
            </div>
          )}
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

      {/* Learning Tip */}
      <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
        <div className="text-sm text-purple-700">
          <strong>💡 Energy Tip:</strong> Energy helps us move and do work! The right amount of energy gets us where we need to go!
        </div>
      </div>
    </div>
  );
};

export default EnergyActivity;