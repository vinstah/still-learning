import React, { useState } from 'react';
import { Brain, Plus, Loader, CheckCircle, X, Wand2, Target, BookOpen, Calculator } from 'lucide-react';
import { Lesson, ExamQuestion, LessonContent } from '../types';

interface AIQuestionGeneratorProps {
  lesson: Lesson;
  subjectId: string;
  yearLevel: number;
  onQuestionsGenerated: (questions: LessonContent[]) => void;
  onClose: () => void;
}

const AIQuestionGenerator: React.FC<AIQuestionGeneratorProps> = ({
  lesson,
  subjectId,
  yearLevel,
  onQuestionsGenerated,
  onClose
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<LessonContent[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Set<number>>(new Set());
  const [customPrompt, setCustomPrompt] = useState('');
  const [difficulty, setDifficulty] = useState<'easier' | 'same' | 'harder'>('same');
  const [questionCount, setQuestionCount] = useState(5);
  const [focusArea, setFocusArea] = useState('');

  const generateQuestions = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI generation with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const questions: LessonContent[] = [];
      
      // Generate questions based on subject and lesson content
      for (let i = 0; i < questionCount; i++) {
        if (subjectId === 'mathematics') {
          questions.push(generateMathQuestion(i));
        } else {
          questions.push(generateEnglishQuestion(i));
        }
      }
      
      setGeneratedQuestions(questions);
      setSelectedQuestions(new Set(Array.from({ length: questions.length }, (_, i) => i)));
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMathQuestion = (index: number): LessonContent => {
    const mathQuestions = [
      {
        type: 'question' as const,
        content: `If you have ${3 + index} apples and eat ${1 + index} apple${1 + index > 1 ? 's' : ''}, how many apples do you have left?`,
        options: [`${2}`, `${2 + index}`, `${3 + index}`, `${4 + index}`],
        correctAnswer: `${2 + index}`,
        explanation: `Starting with ${3 + index} apples and eating ${1 + index}, you subtract: ${3 + index} - ${1 + index} = ${2 + index} apples remaining.`
      },
      {
        type: 'question' as const,
        content: `What is ${5 + index} + ${3 + index}?`,
        options: [`${7 + index}`, `${8 + index}`, `${9 + index}`, `${10 + index}`],
        correctAnswer: `${8 + index}`,
        explanation: `When adding ${5 + index} + ${3 + index}, count forward ${3 + index} numbers from ${5 + index} to get ${8 + index}.`
      },
      {
        type: 'question' as const,
        content: `Count the stars: ${'⭐'.repeat(4 + index)}`,
        options: [`${3 + index}`, `${4 + index}`, `${5 + index}`, `${6 + index}`],
        correctAnswer: `${4 + index}`,
        explanation: `Counting each star one by one: ${Array.from({length: 4 + index}, (_, i) => i + 1).join(', ')}. There are ${4 + index} stars.`
      },
      {
        type: 'question' as const,
        content: `Which number comes after ${10 + index}?`,
        options: [`${9 + index}`, `${10 + index}`, `${11 + index}`, `${12 + index}`],
        correctAnswer: `${11 + index}`,
        explanation: `In counting order: ${9 + index}, ${10 + index}, ${11 + index}, ${12 + index}. The number ${11 + index} comes after ${10 + index}.`
      },
      {
        type: 'question' as const,
        content: `If you have ${2 + index} groups of ${3} objects each, how many objects do you have in total?`,
        options: [`${5 + index}`, `${6 + index * 3}`, `${(2 + index) * 3}`, `${8 + index}`],
        correctAnswer: `${(2 + index) * 3}`,
        explanation: `With ${2 + index} groups of 3 objects each, multiply: ${2 + index} × 3 = ${(2 + index) * 3} objects total.`
      }
    ];
    
    return mathQuestions[index % mathQuestions.length];
  };

  const generateEnglishQuestion = (index: number): LessonContent => {
    const englishQuestions = [
      {
        type: 'question' as const,
        content: `Which word rhymes with "cat"?`,
        options: ['dog', 'hat', 'sun', 'car'],
        correctAnswer: 'hat',
        explanation: 'Hat rhymes with cat because they both end with the "at" sound.'
      },
      {
        type: 'question' as const,
        content: `What is the opposite of "big"?`,
        options: ['large', 'small', 'huge', 'tall'],
        correctAnswer: 'small',
        explanation: 'Small is the opposite of big. They are antonyms - words with opposite meanings.'
      },
      {
        type: 'question' as const,
        content: `Which letter comes before "M" in the alphabet?`,
        options: ['K', 'L', 'N', 'O'],
        correctAnswer: 'L',
        explanation: 'In the alphabet order: J, K, L, M, N. The letter L comes before M.'
      },
      {
        type: 'question' as const,
        content: `How many syllables are in the word "elephant"?`,
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
        explanation: 'Elephant has 3 syllables: el-e-phant. Clap your hands as you say each part.'
      },
      {
        type: 'question' as const,
        content: `Which word is a noun (naming word)?`,
        options: ['run', 'happy', 'book', 'quickly'],
        correctAnswer: 'book',
        explanation: 'Book is a noun because it names a thing. Nouns are words that name people, places, or things.'
      }
    ];
    
    return englishQuestions[index % englishQuestions.length];
  };

  const toggleQuestionSelection = (index: number) => {
    const newSelected = new Set(selectedQuestions);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedQuestions(newSelected);
  };

  const handleAddQuestions = () => {
    const questionsToAdd = generatedQuestions.filter((_, index) => selectedQuestions.has(index));
    onQuestionsGenerated(questionsToAdd);
    onClose();
  };

  const getDifficultyDescription = () => {
    switch (difficulty) {
      case 'easier': return 'Generate simpler questions to help build confidence';
      case 'same': return 'Generate questions at the same level as the current lesson';
      case 'harder': return 'Generate more challenging questions for advanced practice';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AI Question Generator</h2>
              <p className="text-gray-600">Create additional practice questions for "{lesson.title}"</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Configuration Panel */}
          <div className="w-1/3 p-6 border-r border-gray-200 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Settings</h3>
            
            <div className="space-y-6">
              {/* Subject & Year Info */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  {subjectId === 'mathematics' ? (
                    <Calculator className="h-4 w-4 text-blue-600" />
                  ) : (
                    <BookOpen className="h-4 w-4 text-green-600" />
                  )}
                  <span className="font-medium text-gray-900">
                    {subjectId === 'mathematics' ? 'Mathematics' : 'English'} - Year {yearLevel}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Current lesson: {lesson.title}</p>
              </div>

              {/* Question Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Questions
                </label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={3}>3 questions</option>
                  <option value={5}>5 questions</option>
                  <option value={8}>8 questions</option>
                  <option value={10}>10 questions</option>
                </select>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <div className="space-y-2">
                  {(['easier', 'same', 'harder'] as const).map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="radio"
                        name="difficulty"
                        value={level}
                        checked={difficulty === level}
                        onChange={(e) => setDifficulty(e.target.value as any)}
                        className="mr-3 text-purple-600"
                      />
                      <span className="text-sm text-gray-700 capitalize">{level}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">{getDifficultyDescription()}</p>
              </div>

              {/* Focus Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Focus Area (Optional)
                </label>
                <input
                  type="text"
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  placeholder="e.g., word problems, fractions, reading comprehension"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Custom Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Instructions
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Any specific requirements or topics to focus on..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generateQuestions}
                disabled={isGenerating}
                className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isGenerating ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    <span>Generate Questions</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generated Questions Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            {!generatedQuestions.length && !isGenerating && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate Questions</h3>
                <p className="text-gray-600 max-w-md">
                  Configure your settings on the left and click "Generate Questions" to create 
                  personalized practice questions using AI.
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-purple-600 animate-pulse" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Generating Questions...</h3>
                <p className="text-gray-600 text-center max-w-md">
                  Our AI is creating {questionCount} personalized questions based on your settings. 
                  This may take a few moments.
                </p>
                <div className="mt-4 w-48 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
            )}

            {generatedQuestions.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Generated Questions ({generatedQuestions.length})
                  </h3>
                  <div className="text-sm text-gray-600">
                    {selectedQuestions.size} selected
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {generatedQuestions.map((question, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                        selectedQuestions.has(index)
                          ? 'border-purple-300 bg-purple-50'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900 flex-1">
                          Question {index + 1}
                        </h4>
                        <button
                          onClick={() => toggleQuestionSelection(index)}
                          className={`p-1 rounded transition-colors duration-200 ${
                            selectedQuestions.has(index)
                              ? 'text-purple-600 hover:text-purple-700'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      </div>

                      <p className="text-gray-800 mb-3">{question.content}</p>

                      {question.options && (
                        <div className="space-y-2 mb-3">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded border text-sm ${
                                option === question.correctAnswer
                                  ? 'bg-green-50 border-green-200 text-green-800'
                                  : 'bg-gray-50 border-gray-200 text-gray-700'
                              }`}
                            >
                              <span className="font-medium">
                                {String.fromCharCode(65 + optionIndex)}.&nbsp;
                              </span>
                              {option}
                              {option === question.correctAnswer && (
                                <span className="ml-2 text-green-600 font-medium">(Correct)</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="bg-blue-50 p-3 rounded border border-blue-200">
                        <p className="text-blue-800 text-sm">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddQuestions}
                    disabled={selectedQuestions.size === 0}
                    className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add {selectedQuestions.size} Questions</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIQuestionGenerator;