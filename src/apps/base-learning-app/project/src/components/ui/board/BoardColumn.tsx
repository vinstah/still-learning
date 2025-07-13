import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Column } from '../../types';
import BoardCard from './BoardCard';
import { Plus } from 'lucide-react';

interface BoardColumnProps {
  column: Column;
  onAddCard: (columnId: string) => void;
}

const BoardColumn: React.FC<BoardColumnProps> = ({ column, onAddCard }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex flex-col w-80 bg-gray-50 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{column.title}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{column.cards.length}</span>
            <button
              onClick={() => onAddCard(column.id)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div
        ref={setNodeRef}
        className="flex-1 p-4 space-y-3 min-h-[500px] overflow-y-auto"
      >
        <SortableContext items={column.cards.map(card => card.id)} strategy={verticalListSortingStrategy}>
          {column.cards.map((card) => (
            <BoardCard key={card.id} card={card} />
          ))}
        </SortableContext>
        
        {column.cards.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No cards yet</p>
            <button
              onClick={() => onAddCard(column.id)}
              className="mt-2 text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Add your first card
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;