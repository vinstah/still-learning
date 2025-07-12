import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Check, X } from 'lucide-react';
import { SpeakerButton } from './SpeakerButton';

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onAnswer: (correct: boolean) => void;
  isDark: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
  isDark
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const answerIndex = options.findIndex(option => 
          option.toLowerCase().includes(transcript) || 
          transcript.includes(option.toLowerCase())
        );
        
        if (answerIndex !== -1) {
          setSelectedAnswer(answerIndex);
          handleAnswer(answerIndex);
        }
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [options]);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    const isCorrect = answerIndex === correctAnswer;
    
    setTimeout(() => {
      onAnswer(isCorrect);
      setShowResult(false);
      setSelectedAnswer(null);
    }, 2000);
  };

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className={`
      p-6 rounded-2xl shadow-lg transition-all duration-300
      ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
    `}>
      <div className="flex items-start justify-between mb-6">
        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {question}
        </h3>
        <SpeakerButton text={question} />
      </div>

      <div className="space-y-3 mb-6">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
            className={`
              w-full p-4 rounded-lg text-left transition-all duration-200
              ${showResult && selectedAnswer === index
                ? selectedAnswer === correctAnswer
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : showResult && index === correctAnswer
                  ? 'bg-green-500 text-white'
                  : isDark
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }
              focus:outline-none focus:ring-2 focus:ring-primary-500
            `}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {showResult && selectedAnswer === index && (
                selectedAnswer === correctAnswer ? (
                  <Check size={20} />
                ) : (
                  <X size={20} />
                )
              )}
              {showResult && index === correctAnswer && selectedAnswer !== index && (
                <Check size={20} />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={showResult}
          className={`
            p-3 rounded-full transition-all duration-200
            ${isListening
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-primary-500 hover:bg-primary-600 text-white'
            }
            focus:outline-none focus:ring-2 focus:ring-primary-500
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </div>
      
      {isListening && (
        <p className={`text-center mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Listening... Speak your answer clearly
        </p>
      )}
    </div>
  );
};