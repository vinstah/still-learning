import { useState, useEffect, useRef } from 'react';
import { PomodoroSession } from '../types';

export function usePomodoro() {
  const [session, setSession] = useState<PomodoroSession>({
    duration: 25 * 60, // 25 minutes in seconds
    isActive: false,
    timeRemaining: 25 * 60,
    type: 'study'
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSession = (type: 'study' | 'break' = 'study') => {
    const duration = type === 'study' ? 25 * 60 : 5 * 60;
    setSession({
      duration,
      isActive: true,
      timeRemaining: duration,
      type
    });
  };

  const pauseSession = () => {
    setSession(prev => ({ ...prev, isActive: false }));
  };

  const resetSession = () => {
    setSession({
      duration: 25 * 60,
      isActive: false,
      timeRemaining: 25 * 60,
      type: 'study'
    });
  };

  useEffect(() => {
    if (session.isActive && session.timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setSession(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (session.timeRemaining === 0) {
      // Session complete
      setSession(prev => ({ ...prev, isActive: false }));
      // Could add notification here
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [session.isActive, session.timeRemaining]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    session,
    startSession,
    pauseSession,
    resetSession,
    formatTime
  };
}