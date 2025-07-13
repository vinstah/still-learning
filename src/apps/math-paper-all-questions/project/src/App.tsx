import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Calculator as CalculatorIcon,
  PenTool,
  FileText,
  Plus,
  Filter,
} from 'lucide-react';
import Calculator from './components/Calculator';
import Canvas from './components/Canvas';
import PDFViewer from './components/PDFViewer';
import DraggableElement from './components/DraggableElement';
import useStore from './store/useStore';
import problems from './data/problems';
import topics from './data/topics';

function App() {
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set());
  const [showAnimation, setShowAnimation] = useState(true);
  const { elements, addElement, updateElementPosition } = useStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const addNewElement = (type: 'calculator' | 'canvas' | 'pdf') => {
    addElement(type);
  };

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(topicId)) {
        newSet.delete(topicId);
      } else {
        newSet.add(topicId);
      }
      return newSet;
    });
  };

  const filteredProblems = selectedTopics.size > 0
    ? problems.filter(problem => selectedTopics.has(problem.topicId))
    : problems;

  const renderElement = (element: typeof elements[0]) => {
    switch (element.type) {
      case 'calculator':
        return <Calculator />;
      case 'canvas':
        return <Canvas />;
      case 'pdf':
        return <PDFViewer url="/pdf/maths.pdf" title="Algebra Fundamentals" />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-amber-50 font-sans transition-opacity duration-1000 ${
      showAnimation ? 'opacity-0' : 'opacity-100'
    } bg-notebook-lines`}>
      <header className="bg-amber-100 border-b-4 border-amber-200 shadow-sm py-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen size={40} className="text-amber-700" />
              <h1 className="text-3xl md:text-4xl font-handwriting text-amber-800">
                Algebra Mastery Workbook
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => addNewElement('calculator')}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-md text-amber-700"
              >
                <Plus size={18} />
                <CalculatorIcon size={18} />
              </button>
              <button
                onClick={() => addNewElement('canvas')}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-md text-amber-700"
              >
                <Plus size={18} />
                <PenTool size={18} />
              </button>
              <button
                onClick={() => addNewElement('pdf')}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-md text-amber-700"
              >
                <Plus size={18} />
                <FileText size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex gap-8">
          {/* Topic Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-4">
              <h2 className="font-handwriting text-xl text-amber-800 mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filter by Topic
              </h2>
              <nav className="space-y-2">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => toggleTopic(topic.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedTopics.has(topic.id)
                        ? 'bg-amber-100 text-amber-800'
                        : 'hover:bg-amber-50 text-slate-600'
                    }`}
                  >
                    {topic.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Workspace */}
          <div className="flex-1">
            {/* Floating Tools */}
            {elements.map((element) => (
              <DraggableElement
                key={element.id}
                id={element.id}
                position={element.position}
                zIndex={element.zIndex}
                onPositionChange={(position) => updateElementPosition(element.id, position)}
                className="bg-white rounded-lg shadow-lg"
              >
                {renderElement(element)}
              </DraggableElement>
            ))}

            {/* Exam Paper */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-handwriting text-center mb-8">Practice Problems</h2>
              <div className="space-y-12">
                {filteredProblems.map((problem, index) => (
                  <div key={problem.id} className="pb-8 border-b border-amber-100 last:border-0">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-handwriting text-lg">Question {index + 1}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        problem.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </span>
                    </div>
                    <div className="font-handwriting text-lg mb-6">{problem.question}</div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => {/* Toggle hint */}}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors font-handwriting"
                      >
                        Show Hint
                      </button>
                      <button
                        onClick={() => {/* Toggle solution */}}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors font-handwriting"
                      >
                        Show Solution
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-amber-100 border-t-2 border-amber-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-handwriting text-amber-800">
            Algebra Mastery Workbook - Your interactive math learning companion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;