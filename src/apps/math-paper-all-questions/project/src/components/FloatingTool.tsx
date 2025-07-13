import React from 'react';
import Draggable from 'react-draggable';
import { Pin, Maximize2 } from 'lucide-react';

interface FloatingToolProps {
  children: React.ReactNode;
  position: { x: number; y: number };
  isDocked: boolean;
  onPositionChange: (position: { x: number; y: number }) => void;
  onToggleDocked: () => void;
  title: string;
}

const FloatingTool: React.FC<FloatingToolProps> = ({
  children,
  position,
  isDocked,
  onPositionChange,
  onToggleDocked,
  title,
}) => {
  if (isDocked) {
    return (
      <div className="bg-white rounded-lg shadow-lg border-2 border-amber-200">
        <div className="flex items-center justify-between bg-amber-100 px-4 py-2 rounded-t-lg border-b border-amber-200">
          <h3 className="font-handwriting text-lg text-amber-800">{title}</h3>
          <button
            onClick={onToggleDocked}
            className="p-1 hover:bg-amber-200 rounded-full transition-colors"
            title="Make Floating"
          >
            <Maximize2 size={18} className="text-amber-700" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    );
  }

  return (
    <Draggable
      position={position}
      onDrag={(e, data) => onPositionChange({ x: data.x, y: data.y })}
      handle=".handle"
    >
      <div className="absolute z-50 bg-white rounded-lg shadow-xl border-2 border-amber-200 w-80">
        <div className="handle cursor-move flex items-center justify-between bg-amber-100 px-4 py-2 rounded-t-lg border-b border-amber-200">
          <h3 className="font-handwriting text-lg text-amber-800">{title}</h3>
          <button
            onClick={onToggleDocked}
            className="p-1 hover:bg-amber-200 rounded-full transition-colors"
            title="Dock Tool"
          >
            <Pin size={18} className="text-amber-700" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </Draggable>
  );
};

export default FloatingTool;