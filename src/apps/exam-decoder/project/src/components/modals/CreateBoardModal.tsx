import React, { useState } from 'react';
import { X, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBoard: (subject: string, topics: string[], isTeacherMode: boolean) => void;
}

export function CreateBoardModal({ isOpen, onClose, onCreateBoard }: CreateBoardModalProps) {
  const [subject, setSubject] = useState('');
  const [topicsText, setTopicsText] = useState('');
  const [isTeacherMode, setIsTeacherMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !topicsText.trim()) return;

    const topics = topicsText
      .split('\n')
      .map(topic => topic.trim())
      .filter(topic => topic.length > 0);

    onCreateBoard(subject.trim(), topics, isTeacherMode);
    
    // Reset form
    setSubject('');
    setTopicsText('');
    setIsTeacherMode(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Create Learning Board
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Physics, Engineering Mathematics, Chemistry"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topics (one per line)
            </label>
            <textarea
              value={topicsText}
              onChange={(e) => setTopicsText(e.target.value)}
              placeholder={`Newton's Laws\nKinematics\nEnergy and Work\nMomentum\nWaves`}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter each topic on a new line. Each topic will become a learning card.
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="teacherMode"
              checked={isTeacherMode}
              onChange={(e) => setIsTeacherMode(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="teacherMode" className="ml-2 text-sm text-gray-700">
              Teacher mode (track student progress)
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!subject.trim() || !topicsText.trim()}
            >
              Create Board
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}