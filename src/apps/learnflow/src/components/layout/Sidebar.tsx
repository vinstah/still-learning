import React, { useState } from 'react';
import { Home, BookOpen, Target, BarChart3, MessageCircle, Plus } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';
import { useAuthStore } from '../../store/authStore';
import AITeacherChat from '../ai/AITeacherChat';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const { boards, setActiveBoard } = useBoardStore();
  const { user } = useAuthStore();
  const [showAIChat, setShowAIChat] = useState(false);

  const navigation = [
    { name: 'Dashboard', icon: Home, id: 'dashboard' },
    { name: 'My Boards', icon: BookOpen, id: 'boards' },
    { name: 'Goals', icon: Target, id: 'goals' },
    { name: 'Progress', icon: BarChart3, id: 'progress' },
    { name: 'AI Teacher', icon: MessageCircle, id: 'ai-teacher' },
  ];

  const handleNavClick = (item: any) => {
    if (item.id === 'ai-teacher') {
      setShowAIChat(true);
    } else {
      onViewChange(item.id);
      if (item.id === 'dashboard') {
        setActiveBoard(null);
      }
    }
  };

  return (
    <>
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        <nav className="flex-1 px-4 py-6 space-y-8">
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Navigation
            </h2>
            <ul className="mt-3 space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeView === item.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Boards
              </h2>
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Plus className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <ul className="mt-3 space-y-2">
              {boards.map((board) => (
                <li key={board.id}>
                  <button
                    onClick={() => {
                      setActiveBoard(board);
                      onViewChange('board');
                    }}
                    className="w-full text-left group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <div className="mr-3 h-2 w-2 bg-indigo-500 rounded-full flex-shrink-0" />
                    <span className="truncate">{board.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-indigo-700">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      <AITeacherChat 
        isOpen={showAIChat} 
        onClose={() => setShowAIChat(false)} 
      />
    </>
  );
};

export default Sidebar;