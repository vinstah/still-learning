import React, { useState } from 'react';
import { HelpCircle, GripVertical } from 'lucide-react';
import { Question } from '../../../types';
import { Button } from '../../ui/Button';

interface DragDropQuestionProps {
  question: Question;
  onAnswerSubmit: (answer: string[]) => void;
  showHints?: boolean;
}

export function DragDropQuestion({ 
  question, 
  onAnswerSubmit, 
  showHints = false 
}: DragDropQuestionProps) {
  // For demo purposes, we'll use the options as draggable items
  const [items, setItems] = useState(question.options || []);
  const [showHint, setShowHint] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;

    const draggedIndex = items.indexOf(draggedItem);
    if (draggedIndex === -1) return;

    const newItems = [...items];
    newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);
    
    setItems(newItems);
    setDraggedItem(null);
  };

  const handleSubmit = () => {
    onAnswerSubmit(items);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {question.question}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          Drag and drop the items to arrange them in the correct order:
        </p>

        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={`${item}-${index}`}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className={`
                flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg cursor-move
                hover:border-gray-300 hover:shadow-sm transition-all
                ${draggedItem === item ? 'opacity-50' : ''}
              `}
            >
              <GripVertical className="h-5 w-5 text-gray-400 mr-3" />
              <span className="flex-1">{item}</span>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {showHints && question.hints.length > 0 && (
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(!showHint)}
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Button>
          
          {showHint && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 {question.hints[0]}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="min-w-32"
        >
          Submit Order
        </Button>
      </div>
    </div>
  );
}