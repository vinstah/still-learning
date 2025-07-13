import React from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { usePomodoro } from '../hooks/usePomodoro';

export default function PomodoroTimer() {
  const { session, startSession, pauseSession, resetSession, formatTime } = usePomodoro();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Clock className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            {session.type === 'study' ? 'Study Time' : 'Break Time'}
          </h3>
        </div>
        
        <div className="text-4xl font-bold text-gray-900 mb-6">
          {formatTime(session.timeRemaining)}
        </div>
        
        <div className="flex justify-center space-x-4">
          {!session.isActive ? (
            <button
              onClick={() => startSession(session.type)}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Play className="h-5 w-5 mr-2" />
              Start
            </button>
          ) : (
            <button
              onClick={pauseSession}
              className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <Pause className="h-5 w-5 mr-2" />
              Pause
            </button>
          )}
          
          <button
            onClick={resetSession}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Reset
          </button>
        </div>
        
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => startSession('study')}
            className={`px-3 py-1 rounded ${
              session.type === 'study' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Study (25m)
          </button>
          <button
            onClick={() => startSession('break')}
            className={`px-3 py-1 rounded ${
              session.type === 'break' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Break (5m)
          </button>
        </div>
      </div>
    </div>
  );
}