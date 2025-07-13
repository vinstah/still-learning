import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';

const DRAG_TYPE = 'quiz-option';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export default function QuizComponent({ questions, onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const completeQuiz = () => {
    setQuizComplete(true);
    onComplete();
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="space-y-6">
        <div className="text-center p-8 bg-blue-50 rounded-lg">
          <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <p className="text-xl text-gray-600 mb-4">Your Score: {score}%</p>
          <p className="text-gray-700">
            {score >= 80 ? 'Excellent work!' : score >= 60 ? 'Good job!' : 'Keep practicing!'}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Review Your Answers</h3>
          {questions.map((question, index) => (
            <div key={question.id} className="bg-white border rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Question {index + 1}: {question.question}
              </h4>
              <div className="flex items-center mb-2">
                {answers[question.id] === question.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                )}
                <span className="text-sm text-gray-600">
                  Your answer: {answers[question.id] || 'Not answered'}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-2">
                Correct answer: {question.correctAnswer}
              </div>
              <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                {question.explanation}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={completeQuiz}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Complete Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];

  // Drop handler for all drag-and-drop types
  const [, drop] = useDrop({
    accept: DRAG_TYPE,
    drop: (item: { option: string }) => handleAnswer(item.option),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quiz Time!</h2>
        <span className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {question.question}
        </h3>

        <div className="space-y-3">
          {/* Multiple Choice Drag-and-Drop */}
          {question.type === 'multiple-choice' && question.options && (
            <>
              <div ref={drop} className="answer-drop-zone bg-gray-100 p-4 rounded mb-4 min-h-[40px] flex items-center justify-center">
                {currentAnswer ? (
                  <span className="font-bold">{currentAnswer}</span>
                ) : (
                  <span className="text-gray-400">Drag your answer here</span>
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                {question.options.map((option, index) => {
                  const [{ isDragging }, drag] = useDrag({
                    type: DRAG_TYPE,
                    item: { option },
                    collect: (monitor: any) => ({
                      isDragging: monitor.isDragging(),
                    }),
                  });
                  return (
                    <div
                      ref={drag}
                      key={index}
                      className={`p-3 bg-white rounded-lg shadow cursor-move ${isDragging ? 'opacity-50' : ''}`}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* True/False Drag-and-Drop */}
          {question.type === 'true-false' && (
            <>
              <div ref={drop} className="answer-drop-zone bg-gray-100 p-4 rounded mb-4 min-h-[40px] flex items-center justify-center">
                {currentAnswer ? (
                  <span className="font-bold capitalize">{currentAnswer}</span>
                ) : (
                  <span className="text-gray-400">Drag your answer here</span>
                )}
              </div>
              <div className="flex flex-wrap gap-4">
                {['true', 'false'].map((option) => {
                  const [{ isDragging }, drag] = useDrag({
                    type: DRAG_TYPE,
                    item: { option },
                    collect: (monitor: any) => ({
                      isDragging: monitor.isDragging(),
                    }),
                  });
                  return (
                    <div
                      ref={drag}
                      key={option}
                      className={`p-3 bg-white rounded-lg shadow cursor-move capitalize ${isDragging ? 'opacity-50' : ''}`}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Fill-in-the-Blank Drag-and-Drop (if options), else fallback to text input */}
          {question.type === 'fill-in-blank' && (
            question.options && question.options.length > 0 ? (
              <>
                <div ref={drop} className="answer-drop-zone bg-gray-100 p-4 rounded mb-4 min-h-[40px] flex items-center justify-center">
                  {currentAnswer ? (
                    <span className="font-bold">{currentAnswer}</span>
                  ) : (
                    <span className="text-gray-400">Drag the correct word here</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4">
                  {question.options.map((option, index) => {
                    const [{ isDragging }, drag] = useDrag({
                      type: DRAG_TYPE,
                      item: { option },
                      collect: (monitor: any) => ({
                        isDragging: monitor.isDragging(),
                      }),
                    });
                    return (
                      <div
                        ref={drag}
                        key={index}
                        className={`p-3 bg-white rounded-lg shadow cursor-move ${isDragging ? 'opacity-50' : ''}`}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <input
                type="text"
                value={currentAnswer || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your answer here..."
              />
            )
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextQuestion}
          disabled={!currentAnswer}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
}