import React, { useState } from 'react';
import { ArrowLeft, Plus, Brain, Edit, Trash2, Save, X } from 'lucide-react';
import { Lesson, LessonContent } from '../types';
import AIQuestionGenerator from './AIQuestionGenerator';

interface TeacherLessonViewProps {
  lesson: Lesson;
  subjectId: string;
  yearLevel: number;
  studentName: string;
  onBack: () => void;
  onSaveLesson: (updatedLesson: Lesson) => void;
}

const TeacherLessonView: React.FC<TeacherLessonViewProps> = ({
  lesson,
  subjectId,
  yearLevel,
  studentName,
  onBack,
  onSaveLesson
}) => {
  const [editedLesson, setEditedLesson] = useState<Lesson>({ ...lesson });
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleContentChange = (index: number, field: keyof LessonContent, value: any) => {
    const newContent = [...editedLesson.content];
    newContent[index] = { ...newContent[index], [field]: value };
    setEditedLesson({ ...editedLesson, content: newContent });
    setHasChanges(true);
  };

  const handleAddAIQuestions = (questions: LessonContent[]) => {
    const newContent = [...editedLesson.content, ...questions];
    setEditedLesson({ ...editedLesson, content: newContent });
    setHasChanges(true);
  };

  const handleDeleteQuestion = (index: number) => {
    const newContent = editedLesson.content.filter((_, i) => i !== index);
    setEditedLesson({ ...editedLesson, content: newContent });
    setHasChanges(true);
  };

  const handleSave = () => {
    onSaveLesson(editedLesson);
    setHasChanges(false);
  };

  const renderContentEditor = (content: LessonContent, index: number) => {
    const isEditing = editingIndex === index;

    return (
      <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
              {content.type}
            </span>
            <span className="text-sm text-gray-600">Item {index + 1}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditingIndex(isEditing ? null : index)}
              className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            </button>
            <button
              onClick={() => handleDeleteQuestion(index)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={content.content}
                onChange={(e) => handleContentChange(index, 'content', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            {content.type === 'question' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                  {content.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2 mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(content.options || [])];
                          newOptions[optionIndex] = e.target.value;
                          handleContentChange(index, 'options', newOptions);
                        }}
                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={content.correctAnswer === option}
                        onChange={() => handleContentChange(index, 'correctAnswer', option)}
                        className="text-blue-600"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
                  <textarea
                    value={content.explanation || ''}
                    onChange={(e) => handleContentChange(index, 'explanation', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <p className="text-gray-800 mb-3">{content.content}</p>

            {content.type === 'question' && content.options && (
              <div className="space-y-2 mb-3">
                {content.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className={`p-2 rounded border text-sm ${
                      option === content.correctAnswer
                        ? 'bg-green-50 border-green-200 text-green-800'
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + optionIndex)}.&nbsp;
                    </span>
                    {option}
                    {option === content.correctAnswer && (
                      <span className="ml-2 text-green-600 font-medium">(Correct)</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {content.explanation && (
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <p className="text-blue-800 text-sm">
                  <span className="font-medium">Explanation:</span> {content.explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              
              <div className="h-6 w-px bg-gray-300" />
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Editing: {lesson.title}
                </h1>
                <p className="text-gray-600">
                  For {studentName} • {subjectId === 'mathematics' ? 'Mathematics' : 'English'} Year {yearLevel}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAIGenerator(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
              >
                <Brain className="h-4 w-4" />
                <span>Add AI Questions</span>
              </button>
              
              {hasChanges && (
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {/* Lesson Info */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Title</label>
                <input
                  type="text"
                  value={editedLesson.title}
                  onChange={(e) => {
                    setEditedLesson({ ...editedLesson, title: e.target.value });
                    setHasChanges(true);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={editedLesson.duration}
                  onChange={(e) => {
                    setEditedLesson({ ...editedLesson, duration: Number(e.target.value) });
                    setHasChanges(true);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={editedLesson.difficulty}
                  onChange={(e) => {
                    setEditedLesson({ ...editedLesson, difficulty: e.target.value as any });
                    setHasChanges(true);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={editedLesson.description}
                onChange={(e) => {
                  setEditedLesson({ ...editedLesson, description: e.target.value });
                  setHasChanges(true);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
              />
            </div>
          </div>

          {/* Lesson Content */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Lesson Content ({editedLesson.content.length} items)
              </h3>
              <div className="text-sm text-gray-600">
                Click the edit icon to modify questions
              </div>
            </div>

            <div className="space-y-4">
              {editedLesson.content.map((content, index) => renderContentEditor(content, index))}
            </div>

            {editedLesson.content.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="mb-4">No content yet. Add some questions to get started!</p>
                <button
                  onClick={() => setShowAIGenerator(true)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 mx-auto"
                >
                  <Brain className="h-4 w-4" />
                  <span>Generate Questions with AI</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* AI Question Generator Modal */}
      {showAIGenerator && (
        <AIQuestionGenerator
          lesson={lesson}
          subjectId={subjectId}
          yearLevel={yearLevel}
          onQuestionsGenerated={handleAddAIQuestions}
          onClose={() => setShowAIGenerator(false)}
        />
      )}
    </div>
  );
};

export default TeacherLessonView;