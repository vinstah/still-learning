import React from 'react';
import Draggable from 'react-draggable';
import { Grip, X } from 'lucide-react';
import useStore from '../store/useStore';

interface DraggableElementProps {
  id: string;
  children: React.ReactNode;
  position: { x: number; y: number };
  zIndex: number;
  onPositionChange: (position: { x: number; y: number }) => void;
  className?: string;
}

const DraggableElement: React.FC<DraggableElementProps> = ({
  id,
  children,
  position,
  zIndex,
  onPositionChange,
  className = '',
}) => {
  const { updateElementZIndex, selectElement, removeElement } = useStore();

  const handleDrag = (e: any, data: { x: number; y: number }) => {
    onPositionChange({ x: data.x, y: data.y });
  };

  const handleClick = () => {
    updateElementZIndex(id);
    selectElement(id);
  };

  return (
    <Draggable
      position={position}
      onDrag={handleDrag}
      handle=".handle"
      bounds="parent"
    >
      <div
        className={`absolute ${className}`}
        style={{ zIndex }}
        onClick={handleClick}
      >
        <div className="handle cursor-move flex items-center justify-between bg-amber-100 px-4 py-2 rounded-t-lg border-b border-amber-200">
          <div className="flex items-center gap-2">
            <Grip size={18} className="text-amber-700" />
          </div>
          <button
            onClick={() => removeElement(id)}
            className="p-1 hover:bg-amber-200 rounded-full transition-colors"
          >
            <X size={18} className="text-amber-700" />
          </button>
        </div>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableElement;