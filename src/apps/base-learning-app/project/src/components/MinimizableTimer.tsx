import React, { useState } from 'react';
import { Minimize2, Maximize2 } from 'lucide-react';
import { usePomodoro } from '../hooks/usePomodoro';

export default function MinimizableTimer() {
  const [isMinimized, setIsMinimized] = useState(true);
  const { session, startSession, pauseSession, resetSession, formatTime } = usePomodoro();

  const getTimerColor = () => {
    if (!session.isActive) return 'bg-white text-gray-700 border border-gray-200';
    if (session.timeRemaining <= 20) return 'bg-yellow-500 text-white animate-pulse';
    return 'bg-green-500 text-white';
  };

  const getTimerDisplay = () => {
    if (session.isActive) {
      return formatTime(session.timeRemaining);
    }
    return '⏰';
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full shadow-lg transition-all duration-200 active:scale-95 ${getTimerColor()}`}
        >
          <span className="text-sm font-medium">{getTimerDisplay()}</span>
          <Maximize2 className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className={`rounded-2xl shadow-2xl border border-gray-200/50 p-6 min-w-[280px] transition-all duration-200 ${
        session.isActive && session.timeRemaining <= 20 ? 'bg-yellow-50 border-yellow-300' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⏰</span>
            <h3 className="text-lg font-semibold text-gray-900">
              {session.type === 'study' ? 'Focus Time' : 'Break Time'}
            </h3>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Minimize2 className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        
        <div className="text-center">
          <div className={`text-4xl font-bold mb-6 transition-all duration-200 ${
            session.isActive && session.timeRemaining <= 20 ? 'text-yellow-600 animate-pulse' : 'text-gray-900'
          }`}>
            {formatTime(session.timeRemaining)}
          </div>
          
          <div className="flex justify-center space-x-3 mb-4">
            {!session.isActive ? (
              <button
                onClick={() => startSession(session.type)}
                className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 active:scale-95 font-medium"
              >
                Start
              </button>
            ) : (
              <button
                onClick={pauseSession}
                className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all duration-200 active:scale-95 font-medium"
              >
                Pause
              </button>
            )}
            
            <button
              onClick={resetSession}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-200 active:scale-95 font-medium"
            >
              Reset
            </button>
          </div>
          
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => startSession('study')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
                session.type === 'study' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Focus (25m)
            </button>
            <button
              onClick={() => startSession('break')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95 ${
                session.type === 'break' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Break (5m)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}