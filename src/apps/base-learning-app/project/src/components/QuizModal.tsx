import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { X } from 'lucide-react';
import TouchFriendlyQuiz from './TouchFriendlyQuiz';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  onComplete: () => void;
}

export default function QuizModal({ isOpen, onClose, questions, onComplete }: QuizModalProps) {
  const [quizComplete, setQuizComplete] = useState(false);

  const handleQuizComplete = () => {
    setQuizComplete(true);
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Quiz Time! 🧠</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
            <TouchFriendlyQuiz
              questions={questions}
              onComplete={handleQuizComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}