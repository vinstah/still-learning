import React, { useState } from 'react';
import { Topic, Problem } from '../types';
import { ArrowLeft, BookOpen, PenTool, CheckCircle } from 'lucide-react';
import ProblemCard from './ProblemCard';

interface TopicDetailProps {
  topic: Topic;
  problems: Problem[];
  onBack: () => void;
  onCompleteProblem: (problemId: string, isCorrect: boolean) => void;
}

const TopicDetail: React.FC<TopicDetailProps> = ({ 
  topic, 
  problems, 
  onBack,
  onCompleteProblem
}) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

  const getTopicFormulas = (topicId: string) => {
    switch(topicId) {
      case 'linear-equations':
        return [
          { formula: 'y = mx + b', description: 'Slope-intercept form' },
          { formula: 'ax + by = c', description: 'Standard form' },
          { formula: 'm = (y₂ - y₁)/(x₂ - x₁)', description: 'Slope formula' }
        ];
      case 'quadratic-functions':
        return [
          { formula: 'y = ax² + bx + c', description: 'Standard form' },
          { formula: 'x = (-b ± √(b² - 4ac))/(2a)', description: 'Quadratic formula' },
          { formula: 'y = a(x - h)² + k', description: 'Vertex form' }
        ];
      case 'polynomials':
        return [
          { formula: '(x + a)(x + b) = x² + (a+b)x + ab', description: 'FOIL method' },
          { formula: 'a³ + b³ = (a + b)(a² - ab + b²)', description: 'Sum of cubes' },
          { formula: 'a³ - b³ = (a - b)(a² + ab + b²)', description: 'Difference of cubes' }
        ];
      case 'rational-expressions':
        return [
          { formula: '(a/b)/(c/d) = (ad)/(bc)', description: 'Division of fractions' },
          { formula: 'a/b + c/d = (ad + bc)/(bd)', description: 'Addition of fractions' },
          { formula: 'a/b - c/d = (ad - bc)/(bd)', description: 'Subtraction of fractions' }
        ];
      case 'exponential-functions':
        return [
          { formula: 'y = a⋅bˣ', description: 'Exponential growth/decay' },
          { formula: 'A = P(1 + r)ᵗ', description: 'Compound interest' },
          { formula: 'y = a(1/b)ˣ', description: 'Exponential decay' }
        ];
      case 'logarithms':
        return [
          { formula: 'log_b(xy) = log_b(x) + log_b(y)', description: 'Product rule' },
          { formula: 'log_b(x/y) = log_b(x) - log_b(y)', description: 'Quotient rule' },
          { formula: 'log_b(xⁿ) = n⋅log_b(x)', description: 'Power rule' }
        ];
      default:
        return [];
    }
  };

  const handleNextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(prev => prev + 1);
    }
  };

  const handleProblemComplete = (problemId: string, isCorrect: boolean) => {
    onCompleteProblem(problemId, isCorrect);
  };

  const formulas = getTopicFormulas(topic.id);

  return (
    <div className="container mx-auto px-4 py-6">
      <button 
        onClick={onBack}
        className="mb-4 flex items-center text-gray-600 hover:text-purple-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Topics
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div 
          className="py-8 px-6"
          style={{ backgroundColor: topic.color + '15' }}
        >
          <h2 className="text-3xl font-bold mb-2" style={{ color: topic.color }}>
            {topic.title}
          </h2>
          <p className="text-gray-700">{topic.description}</p>
        </div>

        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('learn')}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'learn'
                  ? `border-purple-500 text-purple-600`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Learn
              </div>
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'practice'
                  ? `border-purple-500 text-purple-600`
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <PenTool className="w-4 h-4 mr-2" />
                Practice
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'learn' && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-800 mb-2">Key Concepts</h3>
                <p className="text-blue-700">
                  Master the fundamental principles and techniques for {topic.title.toLowerCase()}.
                </p>
              </div>
              
              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-100">
                  <h3 className="text-xl font-bold text-purple-800 mb-4">Essential Formulas</h3>
                  <div className="grid gap-4">
                    {formulas.map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="font-mono text-lg text-purple-700 mb-2">
                          {item.formula}
                        </div>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="my-6 p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <h4 className="font-bold text-purple-800">Example Problem</h4>
                  <p className="text-gray-800">
                    {problems[0]?.question || 'Example problem placeholder'}
                  </p>
                  <div className="mt-4">
                    <h5 className="font-bold text-purple-700">Solution:</h5>
                    <ol className="mt-2 space-y-2">
                      {problems[0]?.steps?.map((step, index) => (
                        <li key={index} className="flex">
                          <span className="font-bold mr-2">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setActiveTab('practice')}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Practice Now
                </button>
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">
                  Practice Problems
                </h3>
                <div className="text-sm text-gray-600">
                  Problem {currentProblemIndex + 1} of {problems.length}
                </div>
              </div>
              
              {problems.length > 0 ? (
                <ProblemCard 
                  problem={problems[currentProblemIndex]} 
                  onComplete={handleProblemComplete} 
                />
              ) : (
                <div className="p-4 bg-gray-100 rounded-lg text-gray-700 text-center">
                  No practice problems available for this topic yet.
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => currentProblemIndex > 0 && setCurrentProblemIndex(prev => prev - 1)}
                  disabled={currentProblemIndex === 0}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentProblemIndex > 0
                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextProblem}
                  disabled={currentProblemIndex === problems.length - 1}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentProblemIndex < problems.length - 1
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;