import React, { useState } from 'react';
import { 
  Calculator, 
  PenTool, 
  Clock, 
  Volume2, 
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import cn from 'classnames';
import CalculatorTool from './Calculator';
import WhiteboardCanvas from './WhiteboardCanvas';
import PomodoroTimer from './PomodoroTimer';

interface FloatingToolDockProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function FloatingToolDock({ isVisible, onToggle }: FloatingToolDockProps) {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { id: 'timer', icon: Clock, label: 'Timer', color: 'bg-blue-500' },
    { id: 'whiteboard', icon: PenTool, label: 'Draw', color: 'bg-green-500' },
    { id: 'calculator', icon: Calculator, label: 'Calculate', color: 'bg-purple-500' },
    { id: 'voice', icon: Volume2, label: 'Voice', color: 'bg-orange-500' },
    { id: 'camera', icon: Camera, label: 'Photo', color: 'bg-pink-500' },
  ];

  const handleToolClick = (toolId: string) => {
    setActiveTool(activeTool === toolId ? null : toolId);
  };

  return (
    <>
      {/* Floating Dock */}
      <div className={
        cn('fixed right-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300',
          isVisible ? 'translate-x-0' : 'translate-x-10')
      }>
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 p-2">
          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center mb-2 transition-all duration-200 active:scale-95"
          >
            {isVisible ? (
              <ChevronRight className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {/* Tool Buttons */}
          <div className="space-y-2">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolClick(tool.id)}
                  className={
                    cn('w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95',
                      activeTool === tool.id
                        ? `${tool.color} text-white shadow-lg` 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    )
                  }
                  title={tool.label}
                >
                  <IconComponent className="h-5 w-5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tool Panels */}
      {activeTool && (
        <div className="fixed inset-0 z-40 pointer-events-none overflow-y-auto scrollbar-visible">
          <div className={
            cn('absolute right-20 top-1/2 transform -translate-y-1/2 pointer-events-auto',
              activeTool === 'whiteboard' ? '-translate-y-1/4' : ''
            )
           }>
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200/50 p-6 max-w-sm">
              {activeTool === 'timer' && <PomodoroTimer />}
              {activeTool === 'whiteboard' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Drawing Canvas</h3>
                  <WhiteboardCanvas />
                </div>
              )}
              {activeTool === 'calculator' && <CalculatorTool />}
              {activeTool === 'voice' && (
                <div className="text-center p-8">
                  <Volume2 className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Voice Recorder</h3>
                  <p className="text-gray-600 mb-4">Record your thoughts and explanations</p>
                  <button className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors">
                    Start Recording
                  </button>
                </div>
              )}
              {activeTool === 'camera' && (
                <div className="text-center p-8">
                  <Camera className="h-12 w-12 text-pink-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Take Photo</h3>
                  <p className="text-gray-600 mb-4">Capture your work or notes</p>
                  <button className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition-colors">
                    Open Camera
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}