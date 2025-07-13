import { useState, useCallback } from 'react';

interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: Date;
  userAgent: string;
  url: string;
}

export function useErrorBoundary() {
  const [error, setError] = useState<ErrorInfo | null>(null);

  const captureError = useCallback((error: Error, errorInfo?: any) => {
    const errorData: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    setError(errorData);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error captured:', errorData);
    }

    // In production, you would send this to your error reporting service
    // reportError(errorData);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetErrorBoundary = useCallback(() => {
    setError(null);
    // Optionally reload the page or reset application state
  }, []);

  return {
    error,
    captureError,
    clearError,
    resetErrorBoundary
  };
}