import React from 'react';
import { BookOpen, User, Settings, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate?.('/')}
        >
          <BookOpen className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            MathExplorer
          </h1>
          <div className="ml-2 flex items-center bg-gradient-to-r from-purple-100 to-blue-100 px-2 py-1 rounded-full">
            <Sparkles className="h-4 w-4 text-purple-600 mr-1" />
            <span className="text-xs font-medium text-purple-700">AI Powered</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => onNavigate?.('/topics')}
            className="font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Topics
          </button>
          <button 
            onClick={() => onNavigate?.('/practice')}
            className="font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Practice
          </button>
          <button 
            onClick={() => onNavigate?.('/formulas')}
            className="font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Formulas
          </button>
          <button 
            onClick={() => onNavigate?.('/progress')}
            className="font-medium text-gray-700 hover:text-purple-600 transition-colors"
          >
            Progress
          </button>
        </nav>
        
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <User className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;