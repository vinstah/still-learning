import React from 'react';
import { BookOpen, Settings, User } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  isTeacherMode: boolean;
  onToggleMode: () => void;
  onOpenSettings: () => void;
}

export function Header({ isTeacherMode, onToggleMode, onOpenSettings }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Learning System</h1>
            <p className="text-sm text-gray-600">
              {isTeacherMode ? 'Teacher Dashboard' : 'Student Learning Hub'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant={isTeacherMode ? 'primary' : 'outline'}
            size="sm"
            onClick={onToggleMode}
          >
            <User className="h-4 w-4 mr-2" />
            {isTeacherMode ? 'Teacher Mode' : 'Student Mode'}
          </Button>
          
          <Button variant="ghost" size="sm" onClick={onOpenSettings}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}