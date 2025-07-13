import React, { useRef, useState, useEffect } from 'react';
import { getStroke } from 'perfect-freehand';
import { Pencil, Eraser, Download, Trash2, Square, Circle, UndoDot } from 'lucide-react';
import rough from 'roughjs';

interface Point {
  x: number;
  y: number;
}

interface DrawingElement {
  type: 'pencil' | 'eraser' | 'rectangle' | 'circle';
  points: Point[];
  color: string;
  size: number;
}

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(null);
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'rectangle' | 'circle'>('pencil');
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(3);
  const [history, setHistory] = useState<DrawingElement[][]>([]);

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw all elements
    elements.forEach(element => drawElement(ctx, element));
  }, [elements]);

  const drawElement = (ctx: CanvasRenderingContext2D, element: DrawingElement) => {
    if (element.type === 'pencil' || element.type === 'eraser') {
      const stroke = getStroke(element.points, {
        size: element.size,
        thinning: 0.5,
        smoothing: 0.5,
        streamline: 0.5,
      });

      ctx.beginPath();
      ctx.fillStyle = element.type === 'eraser' ? '#ffffff' : element.color;

      if (stroke.length > 0) {
        ctx.moveTo(stroke[0][0], stroke[0][1]);
        for (let i = 1; i < stroke.length; i++) {
          ctx.lineTo(stroke[i][0], stroke[i][1]);
        }
      }
      ctx.fill();
    } else if (element.type === 'rectangle' && element.points.length === 2) {
      const roughCanvas = rough.canvas(ctx.canvas);
      const [start, end] = element.points;
      roughCanvas.rectangle(
        start.x,
        start.y,
        end.x - start.x,
        end.y - start.y,
        {
          stroke: element.color,
          strokeWidth: element.size,
          roughness: 0.5,
        }
      );
    } else if (element.type === 'circle' && element.points.length === 2) {
      const roughCanvas = rough.canvas(ctx.canvas);
      const [start, end] = element.points;
      const radius = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
      );
      roughCanvas.circle(start.x, start.y, radius * 2, {
        stroke: element.color,
        strokeWidth: element.size,
        roughness: 0.5,
      });
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);
    const newElement: DrawingElement = {
      type: tool,
      points: [{ x: offsetX, y: offsetY }],
      color,
      size,
    };
    setCurrentElement(newElement);
    setElements(prev => [...prev, newElement]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentElement) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const newPoint = { x: offsetX, y: offsetY };

    setCurrentElement(prev => {
      if (!prev) return null;
      return {
        ...prev,
        points: [...prev.points, newPoint],
      };
    });

    setElements(prev =>
      prev.map((el, index) =>
        index === prev.length - 1
          ? { ...el, points: [...el.points, newPoint] }
          : el
      )
    );
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setCurrentElement(null);
    setHistory(prev => [...prev, elements]);
  };

  const clearCanvas = () => {
    setElements([]);
    setHistory(prev => [...prev, []]);
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history[history.length - 2] || [];
      setElements(previousState);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setTool('pencil')}
            className={`p-2 rounded ${
              tool === 'pencil' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded ${
              tool === 'eraser' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <Eraser className="w-5 h-5" />
          </button>
          <button
            onClick={() => setTool('rectangle')}
            className={`p-2 rounded ${
              tool === 'rectangle' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <Square className="w-5 h-5" />
          </button>
          <button
            onClick={() => setTool('circle')}
            className={`p-2 rounded ${
              tool === 'circle' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
            }`}
          >
            <Circle className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 rounded-full ${
                  color === c ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <input
            type="range"
            min="1"
            max="20"
            value={size}
            onChange={(e) => setSize(parseInt(e.target.value))}
            className="w-24"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={undo}
            className="p-2 rounded hover:bg-gray-100"
            disabled={history.length <= 1}
          >
            <UndoDot className="w-5 h-5" />
          </button>
          <button
            onClick={clearCanvas}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={downloadCanvas}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-[400px] border rounded cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}