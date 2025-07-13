import { create } from 'zustand';
import { Board, Card, Column } from '../types';

interface BoardState {
  boards: Board[];
  activeBoard: Board | null;
  addBoard: (board: Omit<Board, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBoard: (id: string, updates: Partial<Board>) => void;
  deleteBoard: (id: string) => void;
  setActiveBoard: (board: Board | null) => void;
  addCard: (columnId: string, card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateCard: (cardId: string, updates: Partial<Card>) => void;
  moveCard: (cardId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void;
  deleteCard: (cardId: string) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],
  activeBoard: null,
  
  addBoard: (boardData) => {
    const newBoard: Board = {
      ...boardData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      columns: [
        { id: 'to-learn', title: 'To Learn', cards: [], color: 'bg-red-100' },
        { id: 'learning', title: 'Learning', cards: [], color: 'bg-yellow-100' },
        { id: 'reviewed', title: 'Reviewed', cards: [], color: 'bg-green-100' },
      ],
    };
    
    set((state) => ({
      boards: [...state.boards, newBoard],
    }));
  },
  
  updateBoard: (id, updates) => {
    set((state) => ({
      boards: state.boards.map((board) =>
        board.id === id ? { ...board, ...updates, updatedAt: new Date() } : board
      ),
    }));
  },
  
  deleteBoard: (id) => {
    set((state) => ({
      boards: state.boards.filter((board) => board.id !== id),
      activeBoard: state.activeBoard?.id === id ? null : state.activeBoard,
    }));
  },
  
  setActiveBoard: (board) => {
    set({ activeBoard: board });
  },
  
  addCard: (columnId, cardData) => {
    const newCard: Card = {
      ...cardData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      versions: [],
    };
    
    set((state) => {
      if (!state.activeBoard) return state;
      
      const updatedBoard = {
        ...state.activeBoard,
        columns: state.activeBoard.columns.map((column) =>
          column.id === columnId
            ? { ...column, cards: [...column.cards, newCard] }
            : column
        ),
        updatedAt: new Date(),
      };
      
      return {
        activeBoard: updatedBoard,
        boards: state.boards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        ),
      };
    });
  },
  
  updateCard: (cardId, updates) => {
    set((state) => {
      if (!state.activeBoard) return state;
      
      const updatedBoard = {
        ...state.activeBoard,
        columns: state.activeBoard.columns.map((column) => ({
          ...column,
          cards: column.cards.map((card) =>
            card.id === cardId ? { ...card, ...updates, updatedAt: new Date() } : card
          ),
        })),
        updatedAt: new Date(),
      };
      
      return {
        activeBoard: updatedBoard,
        boards: state.boards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        ),
      };
    });
  },
  
  moveCard: (cardId, sourceColumnId, targetColumnId, targetIndex) => {
    set((state) => {
      if (!state.activeBoard) return state;
      
      let cardToMove: Card | null = null;
      
      const updatedBoard = {
        ...state.activeBoard,
        columns: state.activeBoard.columns.map((column) => {
          if (column.id === sourceColumnId) {
            const cardIndex = column.cards.findIndex((card) => card.id === cardId);
            if (cardIndex !== -1) {
              cardToMove = column.cards[cardIndex];
              return {
                ...column,
                cards: column.cards.filter((card) => card.id !== cardId),
              };
            }
          }
          return column;
        }),
        updatedAt: new Date(),
      };
      
      if (cardToMove) {
        updatedBoard.columns = updatedBoard.columns.map((column) => {
          if (column.id === targetColumnId) {
            const newCards = [...column.cards];
            newCards.splice(targetIndex, 0, cardToMove!);
            return { ...column, cards: newCards };
          }
          return column;
        });
      }
      
      return {
        activeBoard: updatedBoard,
        boards: state.boards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        ),
      };
    });
  },
  
  deleteCard: (cardId) => {
    set((state) => {
      if (!state.activeBoard) return state;
      
      const updatedBoard = {
        ...state.activeBoard,
        columns: state.activeBoard.columns.map((column) => ({
          ...column,
          cards: column.cards.filter((card) => card.id !== cardId),
        })),
        updatedAt: new Date(),
      };
      
      return {
        activeBoard: updatedBoard,
        boards: state.boards.map((board) =>
          board.id === updatedBoard.id ? updatedBoard : board
        ),
      };
    });
  },
}));