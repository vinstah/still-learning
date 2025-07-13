import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface SpeedActivityProps {
  onComplete: () => void;
  lesson: string;
}

const SpeedActivity: React.FC<SpeedActivityProps> = ({ onComplete, lesson }) => {
  const [selectedSpeed, setSelectedSpeed] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [buzzyPosition, setBuzzyPosition] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameResult, setGameResult] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  const speedOptions = [
    { id: 'slow', name: 'Slow Flying', speed: 1, emoji: '🐌', description: 'Like a sleepy snail' },
    { id: 'medium', name: 'Normal Flying', speed: 3, emoji: '🚶', description: 'Like walking' },
    { id: 'fast', name: 'Super Fast!', speed: 5, emoji: '🏃', description: 'Like running!' }
  ];

  const distance = 50;
  const rainTime = 10;

  const startRace = (speed) => {
    setSelectedSpeed(speed);
    setGameStarted(true);
    setIsAnimating(true);
    setBuzzyPosition(0);
    setTimeLeft(rainTime);
    setGameResult('');

    const timeToHome = distance / speed.speed;
    
    const interval = setInterval(() => {
      setBuzzyPosition(prev => {
        const newPosition = prev + speed.speed;
        if (newPosition >= distance) {
          clearInterval(interval);
          setIsAnimating(false);
          if (timeToHome <= rainTime) {
            setGameResult('success');
            setTimeout(() => {
              setShowLesson(true);
              setCanContinue(true);
            }, 3000);
          } else {
            setGameResult('failed');
          }
          return distance;
        }
        return newPosition;
      });
    }, 100);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (buzzyPosition < distance) {
            setGameResult('rained');
            setIsAnimating(false);
          }
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);
  };

  const resetGame = () => {
    setGameStarted(false);
    setSelectedSpeed(null);
    setBuzzyPosition(0);
    setTimeLeft(10);
    setGameResult('');
    setIsAnimating(false);
    setShowLesson(false);
    setCanContinue(false);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Help Buzzy get home before it rains!</h3>
        <div className="text-sm text-gray-600 mb-4">
          The hive is far away and rain is coming in {rainTime} seconds!
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-blue-200 to-green-200 p-4 rounded-lg min-h-32">
        <div className="absolute top-2 right-2 text-2xl">
          {timeLeft > 7 ? '☀️' : timeLeft > 4 ? '⛅' : '🌧️'}
        </div>
        <div className="absolute top-2 left-2 text-sm font-bold">
          Time: {Math.ceil(timeLeft)}s
        </div>
        
        <div className="relative mt-8 mb-4">
          <div className="w-full h-2 bg-gray-300 rounded-full relative">
            <div 
              className="absolute top-0 left-0 h-2 bg-blue-400 rounded-full transition-all duration-100"
              style={{ width: `${(buzzyPosition / distance) * 100}%` }}
            ></div>
          </div>
          
          <div 
            className={`absolute top-0 text-2xl transition-all duration-100 ${isAnimating ? 'animate-bounce' : ''}`}
            style={{ 
              left: `${(buzzyPosition / distance) * 100}%`,
              transform: 'translateX(-50%) translateY(-150%)'
            }}
          >
            🐝
          </div>
          
          <div className="absolute top-0 right-0 text-2xl" style={{ transform: 'translateY(-150%)' }}>
            🏠
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          Distance to home: {Math.max(0, Math.round(distance - buzzyPosition))} units
        </div>
      </div>

      {!gameStarted && !showLesson && (
        <div className="grid grid-cols-3 gap-4">
          {speedOptions.map((speed) => (
            <button
              key={speed.id}
              onClick={() => startRace(speed)}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer text-center border-2 border-gray-200 hover:border-blue-400 transition-colors transform hover:scale-105"
            >
              <div className="text-3xl mb-2">{speed.emoji}</div>
              <div className="font-medium text-sm mb-1">{speed.name}</div>
              <div className="text-xs text-gray-600 mb-2">{speed.description}</div>
              <div className="text-xs text-blue-600 font-bold">
                Speed: {speed.speed} units/sec
              </div>
            </button>
          ))}
        </div>
      )}

      {gameResult && !showLesson && (
        <div className="text-center p-4 rounded-lg">
          {gameResult === 'success' && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg border border-green-300">
              <div className="text-4xl mb-2">🎉</div>
              <div className="font-bold text-lg">Buzzy made it home safely!</div>
              <div className="text-sm">Great choice! {selectedSpeed.name} was fast enough!</div>
            </div>
          )}
          {gameResult === 'failed' && (
            <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg border border-yellow-300">
              <div className="text-4xl mb-2">😅</div>
              <div className="font-bold text-lg">Almost there!</div>
              <div className="text-sm">Buzzy was going too slow. Try a faster speed!</div>
              <button
                onClick={resetGame}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
          {gameResult === 'rained' && (
            <div className="bg-blue-100 text-blue-700 p-4 rounded-lg border border-blue-300">
              <div className="text-4xl mb-2">🌧️</div>
              <div className="font-bold text-lg">Oh no! It started raining!</div>
              <div className="text-sm">Buzzy needs to fly faster next time!</div>
              <button
                onClick={resetGame}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
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

      <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-400">
        <div className="text-sm text-purple-700">
          <strong>💡 Speed Tip:</strong> Speed = Distance ÷ Time. If you need to go far quickly, you need more speed!
        </div>
      </div>
    </div>
  );
};

export default SpeedActivity;