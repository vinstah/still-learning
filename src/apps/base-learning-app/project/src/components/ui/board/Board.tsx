import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Board as BoardType, Card } from '../../types';
import BoardColumn from './BoardColumn';
import BoardCard from './BoardCard';
import { useBoardStore } from '../../store/boardStore';
import AddCardModal from './AddCardModal';
import { Sparkles } from 'lucide-react';

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetColumnId, setTargetColumnId] = useState<string>('');
  const { moveCard } = useBoardStore();
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card = findCard(active.id as string);
    setActiveCard(card);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const isActiveCard = activeId.startsWith('card');
    const isOverCard = overId.startsWith('card');

    if (!isActiveCard) return;

    // Handle card over card
    if (isActiveCard && isOverCard) {
      const activeColumn = findColumnByCardId(activeId);
      const overColumn = findColumnByCardId(overId);
      
      if (!activeColumn || !overColumn) return;
      
      if (activeColumn.id !== overColumn.id) {
        const activeIndex = activeColumn.cards.findIndex(card => card.id === activeId);
        const overIndex = overColumn.cards.findIndex(card => card.id === overId);
        
        moveCard(activeId, activeColumn.id, overColumn.id, overIndex);
      }
    }

    // Handle card over column
    const isOverColumn = board.columns.some(col => col.id === overId);
    if (isActiveCard && isOverColumn) {
      const activeColumn = findColumnByCardId(activeId);
      if (!activeColumn) return;
      
      if (activeColumn.id !== overId) {
        const overColumn = board.columns.find(col => col.id === overId);
        if (overColumn) {
          moveCard(activeId, activeColumn.id, overId, overColumn.cards.length);
        }
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
  };

  const findCard = (id: string): Card | null => {
    for (const column of board.columns) {
      const card = column.cards.find(card => card.id === id);
      if (card) return card;
    }
    return null;
  };

  const findColumnByCardId = (cardId: string) => {
    return board.columns.find(column => 
      column.cards.some(card => card.id === cardId)
    );
  };

  const handleAddCard = (columnId: string) => {
    setTargetColumnId(columnId);
    setShowAddModal(true);
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{board.title}</h1>
            <p className="text-gray-600 mt-1">{board.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {board.subject}
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {board.level}
              </span>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Sparkles className="w-4 h-4" />
              <span>Ask AI</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex space-x-6 p-6 min-w-fit">
            {board.columns.map((column) => (
              <BoardColumn
                key={column.id}
                column={column}
                onAddCard={handleAddCard}
              />
            ))}
          </div>
          
          <DragOverlay>
            {activeCard ? <BoardCard card={activeCard} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      {showAddModal && (
        <AddCardModal
          columnId={targetColumnId}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};

export default Board;