import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { ElementPosition, WorkspaceState } from '../types';

interface StoreState extends WorkspaceState {
  addElement: (type: ElementPosition['type']) => string;
  updateElementPosition: (id: string, position: { x: number; y: number }) => void;
  updateElementZIndex: (id: string) => void;
  selectElement: (id: string | null) => void;
  removeElement: (id: string) => void;
}

const useStore = create<StoreState>()(
  persist(
    (set) => ({
      elements: [],
      selectedElement: null,
      addElement: (type) => {
        const id = nanoid();
        set((state) => ({
          elements: [
            ...state.elements,
            {
              id,
              type,
              position: { x: 0, y: 0 },
              zIndex: state.elements.length,
            },
          ],
        }));
        return id;
      },
      updateElementPosition: (id, position) =>
        set((state) => ({
          elements: state.elements.map((el) =>
            el.id === id ? { ...el, position } : el
          ),
        })),
      updateElementZIndex: (id) =>
        set((state) => ({
          elements: state.elements.map((el) =>
            el.id === id
              ? { ...el, zIndex: Math.max(...state.elements.map((e) => e.zIndex)) + 1 }
              : el
          ),
        })),
      selectElement: (id) => set({ selectedElement: id }),
      removeElement: (id) =>
        set((state) => ({
          elements: state.elements.filter((el) => el.id !== id),
          selectedElement: state.selectedElement === id ? null : state.selectedElement,
        })),
    }),
    {
      name: 'workspace-storage',
    }
  )
);

export default useStore;