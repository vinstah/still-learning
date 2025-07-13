import React from 'react';
import { Pin, Coffee } from 'lucide-react';

interface NoteProps {
  title?: string;
  children: React.ReactNode;
  color?: 'yellow' | 'blue' | 'green' | 'pink' | 'purple';
  icon?: 'pin' | 'coffee' | none;
  rotation?: number;
}

const Note: React.FC<NoteProps> = ({ 
  title, 
  children, 
  color = 'yellow',
  icon = 'pin',
  rotation = 0
}) => {
  const colorStyles = {
    yellow: {
      bg: 'bg-amber-100',
      border: 'border-amber-200',
      title: 'text-amber-800',
      text: 'text-amber-900'
    },
    blue: {
      bg: 'bg-blue-100',
      border: 'border-blue-200',
      title: 'text-blue-800',
      text: 'text-blue-900'
    },
    green: {
      bg: 'bg-green-100',
      border: 'border-green-200',
      title: 'text-green-800',
      text: 'text-green-900'
    },
    pink: {
      bg: 'bg-pink-100',
      border: 'border-pink-200',
      title: 'text-pink-800',
      text: 'text-pink-900'
    },
    purple: {
      bg: 'bg-purple-100',
      border: 'border-purple-200',
      title: 'text-purple-800',
      text: 'text-purple-900'
    }
  };
  
  const styles = colorStyles[color];
  
  return (
    <div 
      className={`${styles.bg} ${styles.border} border-2 rounded-md shadow-md p-5 max-w-sm relative overflow-hidden`} 
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {icon === 'pin' && (
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
          <Pin className="h-6 w-6 text-slate-500" />
        </div>
      )}
      
      {icon === 'coffee' && (
        <div className="absolute -top-1 right-3 transform -translate-y-1/3">
          <Coffee className="h-6 w-6 text-slate-500" />
        </div>
      )}
      
      {title && (
        <h3 className={`font-handwriting text-xl mb-3 ${styles.title}`}>{title}</h3>
      )}
      
      <div className={`font-handwritten-notes ${styles.text}`}>
        {children}
      </div>
    </div>
  );
};

export default Note;