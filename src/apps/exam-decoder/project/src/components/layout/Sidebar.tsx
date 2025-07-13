import React from 'react';
import { Plus, BookOpen, Target, BarChart3, History } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onCreateBoard: () => void;
  boardCount: number;
}

export function Sidebar({ activeView, onViewChange, onCreateBoard, boardCount }: SidebarProps) {
  const menuItems = [
    { id: 'boards', label: 'Learning Boards', icon: BookOpen, count: boardCount },
    { id: 'exam-decoder', label: 'Exam Decoder', icon: Target },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'history', label: 'Version History', icon: History }
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <Button 
        onClick={onCreateBoard}
        className="w-full mb-6"
        size="md"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create New Board
      </Button>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`
                w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors
                ${isActive 
                  ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <div className="flex items-center">
                <Icon className="h-4 w-4 mr-3" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <Badge variant={isActive ? 'info' : 'default'}>
                  {item.count}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}