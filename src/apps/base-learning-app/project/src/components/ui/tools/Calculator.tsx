import React, { useState, useEffect } from 'react';
import { evaluate, derivative, simplify, parse } from 'mathjs';
import { BookOpen, HelpCircle, X, FunctionSquare as FunctionIcon, Grape as Graph, History, Settings } from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface HistoryEntry {
  expression: string;
  result: string;
  timestamp: Date;
}

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [mode, setMode] = useState<'basic' | 'scientific' | 'graphing'>('scientific');
  const [showHints, setShowHints] = useState(false);
  const [angleUnit, setAngleUnit] = useState<'deg' | 'rad'>('rad');
  const [showSteps, setShowSteps] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'π', 'e', '←'],
    ['asin', 'acos', 'atan', '(', ')', '^'],
    ['7', '8', '9', '/', 'sqrt', 'log'],
    ['4', '5', '6', '*', 'ln', 'abs'],
    ['1', '2', '3', '-', 'exp', '!'],
    ['0', '.', '=', '+', 'ans', 'C']
  ];

  const addToHistory = (expr: string, res: string) => {
    setHistory(prev => [{
      expression: expr,
      result: res,
      timestamp: new Date()
    }, ...prev.slice(0, 49)]); // Keep last 50 entries
  };

  const handleTrigFunction = (func: string) => {
    const value = parse(expression || '0').evaluate();
    const angle = angleUnit === 'deg' ? value * Math.PI / 180 : value;
    
    try {
      let result;
      switch(func) {
        case 'sin':
          result = Math.sin(angle);
          break;
        case 'cos':
          result = Math.cos(angle);
          break;
        case 'tan':
          result = Math.tan(angle);
          break;
        case 'asin':
          result = Math.asin(value);
          break;
        case 'acos':
          result = Math.acos(value);
          break;
        case 'atan':
          result = Math.atan(value);
          break;
        default:
          return;
      }
      
      if (angleUnit === 'deg' && func.startsWith('a')) {
        result = result * 180 / Math.PI;
      }
      
      setDisplay(result.toString());
      setExpression(result.toString());
      addToHistory(`${func}(${expression})`, result.toString());
    } catch (error) {
      setDisplay('Error');
    }
  };

  const calculateDerivative = () => {
    try {
      const result = derivative(expression, 'x').toString();
      setDisplay(result);
      setExpression(result);
      addToHistory(`d/dx(${expression})`, result);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleSpecialFunction = (func: string) => {
    switch(func) {
      case 'π':
        setExpression(prev => prev + 'pi');
        break;
      case 'e':
        setExpression(prev => prev + 'e');
        break;
      case 'sqrt':
        setExpression(prev => `sqrt(${prev})`);
        break;
      case 'log':
        setExpression(prev => `log10(${prev})`);
        break;
      case 'ln':
        setExpression(prev => `log(${prev})`);
        break;
      case 'abs':
        setExpression(prev => `abs(${prev})`);
        break;
      case 'exp':
        setExpression(prev => `exp(${prev})`);
        break;
      case '!':
        try {
          const value = evaluate(expression);
          if (value % 1 === 0 && value >= 0) {
            let result = 1;
            for (let i = 2; i <= value; i++) result *= i;
            setDisplay(result.toString());
            setExpression(result.toString());
            addToHistory(`${expression}!`, result.toString());
          } else {
            setDisplay('Error');
          }
        } catch (error) {
          setDisplay('Error');
        }
        break;
      case 'ans':
        if (history.length > 0) {
          setExpression(history[0].result);
          setDisplay(history[0].result);
        }
        break;
    }
  };

  const handleClick = (value: string) => {
    if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan'].includes(value)) {
      handleTrigFunction(value);
      return;
    }

    if (['π', 'e', 'sqrt', 'log', 'ln', 'abs', 'exp', '!', 'ans'].includes(value)) {
      handleSpecialFunction(value);
      return;
    }

    switch (value) {
      case '=':
        try {
          const result = evaluate(expression);
          setDisplay(result.toString());
          setExpression(result.toString());
          addToHistory(expression, result.toString());
          setSteps(generateSteps(expression));
          setShowSteps(true);
        } catch (error) {
          setDisplay('Error');
        }
        break;
      case 'C':
        setDisplay('0');
        setExpression('');
        setSteps([]);
        setShowSteps(false);
        break;
      case '←':
        setExpression(prev => prev.slice(0, -1));
        setDisplay(prev => prev.slice(0, -1) || '0');
        break;
      default:
        setExpression(prev => prev + value);
        setDisplay(prev => prev === '0' ? value : prev + value);
    }
  };

  const generateSteps = (expr: string): string[] => {
    try {
      const node = parse(expr);
      const steps: string[] = [];
      
      // Add initial expression
      steps.push(`Initial expression: ${expr}`);
      
      // Simplify
      const simplified = simplify(node).toString();
      if (simplified !== expr) {
        steps.push(`Simplified: ${simplified}`);
      }
      
      // Evaluate
      const result = evaluate(expr);
      steps.push(`Result: ${result}`);
      
      return steps;
    } catch {
      return ['Could not generate steps for this expression'];
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-2xl w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setMode('basic')}
            className={`text-sm px-3 py-1 rounded ${
              mode === 'basic' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Basic
          </button>
          <button
            onClick={() => setMode('scientific')}
            className={`text-sm px-3 py-1 rounded ${
              mode === 'scientific' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Scientific
          </button>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-400 hover:text-white"
            title="History"
          >
            <History className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-gray-400 hover:text-white"
            title="Help"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <div className="text-gray-400 text-sm h-6 font-mono">{expression}</div>
        <div className="text-white text-3xl font-bold text-right font-mono overflow-x-auto">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2 mb-6">
        {scientificButtons.map((row, i) => (
          row.map((btn, j) => (
            <button
              key={`${i}-${j}`}
              onClick={() => handleClick(btn)}
              className={`p-3 rounded text-white font-mono transition-colors ${
                ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'].includes(btn)
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : ['C', '←'].includes(btn)
                  ? 'bg-red-600 hover:bg-red-700'
                  : ['='].includes(btn)
                  ? 'bg-green-600 hover:bg-green-700'
                  : ['π', 'e', 'sqrt', 'log', 'ln', 'abs', 'exp', '!'].includes(btn)
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {btn}
            </button>
          ))
        ))}
      </div>

      {showHistory && history.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg mb-6 max-h-60 overflow-y-auto">
          <h3 className="text-white font-bold mb-3">History</h3>
          {history.map((entry, index) => (
            <div
              key={index}
              className="text-sm mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
              onClick={() => {
                setExpression(entry.expression);
                setDisplay(entry.result);
              }}
            >
              <div className="text-gray-400">{entry.expression}</div>
              <div className="text-white font-mono">{entry.result}</div>
            </div>
          ))}
        </div>
      )}

      {showSteps && steps.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-white font-bold mb-2">Solution Steps</h3>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="text-gray-300 font-mono text-sm">
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {showHints && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-bold mb-3">Quick Reference</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="text-blue-400 mb-2">Trigonometric Functions</h4>
              <ul className="text-gray-300 space-y-1">
                <li>sin(x) - Sine</li>
                <li>cos(x) - Cosine</li>
                <li>tan(x) - Tangent</li>
                <li>asin(x) - Inverse sine</li>
                <li>acos(x) - Inverse cosine</li>
                <li>atan(x) - Inverse tangent</li>
              </ul>
            </div>
            <div>
              <h4 className="text-blue-400 mb-2">Special Functions</h4>
              <ul className="text-gray-300 space-y-1">
                <li>sqrt(x) - Square root</li>
                <li>log(x) - Natural logarithm</li>
                <li>exp(x) - Exponential</li>
                <li>abs(x) - Absolute value</li>
                <li>π - Pi constant</li>
                <li>e - Euler's number</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;