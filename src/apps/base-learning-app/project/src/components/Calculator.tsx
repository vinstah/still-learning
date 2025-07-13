import React, { useState } from 'react';
import { Calculator as CalculatorIcon, Delete } from 'lucide-react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEqual = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const buttons = [
    { label: 'C', className: 'bg-red-500 text-white', onClick: clear },
    { label: '±', className: 'bg-gray-300', onClick: () => {} },
    { label: '%', className: 'bg-gray-300', onClick: () => {} },
    { label: '/', className: 'bg-orange-500 text-white', onClick: () => performOperation('/') },
    
    { label: '7', className: 'bg-gray-100', onClick: () => inputNumber('7') },
    { label: '8', className: 'bg-gray-100', onClick: () => inputNumber('8') },
    { label: '9', className: 'bg-gray-100', onClick: () => inputNumber('9') },
    { label: '*', className: 'bg-orange-500 text-white', onClick: () => performOperation('*') },
    
    { label: '4', className: 'bg-gray-100', onClick: () => inputNumber('4') },
    { label: '5', className: 'bg-gray-100', onClick: () => inputNumber('5') },
    { label: '6', className: 'bg-gray-100', onClick: () => inputNumber('6') },
    { label: '-', className: 'bg-orange-500 text-white', onClick: () => performOperation('-') },
    
    { label: '1', className: 'bg-gray-100', onClick: () => inputNumber('1') },
    { label: '2', className: 'bg-gray-100', onClick: () => inputNumber('2') },
    { label: '3', className: 'bg-gray-100', onClick: () => inputNumber('3') },
    { label: '+', className: 'bg-orange-500 text-white', onClick: () => performOperation('+') },
    
    { label: '0', className: 'bg-gray-100 col-span-2', onClick: () => inputNumber('0') },
    { label: '.', className: 'bg-gray-100', onClick: inputDecimal },
    { label: '=', className: 'bg-orange-500 text-white', onClick: handleEqual },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4 w-full max-w-sm">
      <div className="flex items-center mb-4">
        <CalculatorIcon className="h-5 w-5 text-white mr-2" />
        <h3 className="text-white font-semibold">Calculator</h3>
      </div>
      
      <div className="bg-black text-white text-right p-4 rounded-lg mb-4">
        <div className="text-2xl font-mono">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            className={`p-3 rounded-lg font-semibold transition-colors ${button.className} ${
              button.label === '0' ? 'col-span-2' : ''
            }`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
}