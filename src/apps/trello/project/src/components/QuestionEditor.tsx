import React, { useState, useRef } from 'react';
import { X, Save, Plus, Trash2, Upload, Type, Image, FileText, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { QuestionCard, Attachment } from '../data/questionBank';

interface QuestionEditorProps {
  question: QuestionCard | null;
  topicId: string;
  onSave: (question: QuestionCard, topicId: string) => void;
  onClose: () => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  topicId,
  onSave,
  onClose
}) => {
  const [editedQuestion, setEditedQuestion] = useState<QuestionCard>(
    question || {
      id: `q-${Date.now()}`,
      title: '',
      content: '',
      difficulty: 'foundation',
      type: 'multiple-choice',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      tags: [],
      estimatedTime: 5,
      accommodations: [],
      attachments: [],
      latex: '',
      visualSupports: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      position: 0
    }
  );

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [newAccommodation, setNewAccommodation] = useState('');
  const [newVisualSupport, setNewVisualSupport] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    const updatedQuestion = {
      ...editedQuestion,
      updatedAt: new Date().toISOString()
    };
    onSave(updatedQuestion, topicId);
    onClose();
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editedQuestion.tags.includes(newTag.trim())) {
      setEditedQuestion(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditedQuestion(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddAccommodation = () => {
    if (newAccommodation.trim() && !editedQuestion.accommodations.includes(newAccommodation.trim())) {
      setEditedQuestion(prev => ({
        ...prev,
        accommodations: [...prev.accommodations, newAccommodation.trim()]
      }));
      setNewAccommodation('');
    }
  };

  const handleRemoveAccommodation = (accommodationToRemove: string) => {
    setEditedQuestion(prev => ({
      ...prev,
      accommodations: prev.accommodations.filter(acc => acc !== accommodationToRemove)
    }));
  };

  const handleAddVisualSupport = () => {
    if (newVisualSupport.trim() && !editedQuestion.visualSupports.includes(newVisualSupport.trim())) {
      setEditedQuestion(prev => ({
        ...prev,
        visualSupports: [...prev.visualSupports, newVisualSupport.trim()]
      }));
      setNewVisualSupport('');
    }
  };

  const handleRemoveVisualSupport = (supportToRemove: string) => {
    setEditedQuestion(prev => ({
      ...prev,
      visualSupports: prev.visualSupports.filter(support => support !== supportToRemove)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const attachment: Attachment = {
          id: `att-${Date.now()}-${Math.random()}`,
          name: file.name,
          type: file.type.startsWith('image/') ? 'image' : 
                file.type.startsWith('audio/') ? 'audio' :
                file.type.startsWith('video/') ? 'video' : 'document',
          url: URL.createObjectURL(file),
          size: file.size
        };
        
        setEditedQuestion(prev => ({
          ...prev,
          attachments: [...prev.attachments, attachment]
        }));
      });
    }
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    setEditedQuestion(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...(editedQuestion.options || [])];
    newOptions[index] = value;
    setEditedQuestion(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const addOption = () => {
    setEditedQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), '']
    }));
  };

  const removeOption = (index: number) => {
    setEditedQuestion(prev => ({
      ...prev,
      options: (prev.options || []).filter((_, i) => i !== index)
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'foundation': return 'bg-green-100 text-green-800 border-green-200';
      case 'building': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'mastery': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      case 'video': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {question ? 'Edit Question' : 'Create Question'}
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(editedQuestion.difficulty)}`}>
              {editedQuestion.difficulty} {editedQuestion.difficulty === 'foundation' ? '🌱' : editedQuestion.difficulty === 'building' ? '🏗️' : '🎯'}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              {isPreviewMode ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {isPreviewMode ? (
            /* Preview Mode */
            <div className="h-full overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{editedQuestion.title}</h3>
                  <div className="prose max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {editedQuestion.content}
                    </ReactMarkdown>
                  </div>
                  
                  {editedQuestion.latex && (
                    <div className="mt-4 p-4 bg-white rounded border">
                      <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {`$$${editedQuestion.latex}$$`}
                      </ReactMarkdown>
                    </div>
                  )}

                  {editedQuestion.options && editedQuestion.options.length > 0 && (
                    <div className="mt-6 space-y-2">
                      <h4 className="font-medium text-gray-900">Options:</h4>
                      {editedQuestion.options.map((option, index) => (
                        <div key={index} className={`p-3 rounded border ${option === editedQuestion.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                          {option === editedQuestion.correctAnswer && <span className="text-green-600 mr-2">✓</span>}
                          {option}
                        </div>
                      ))}
                    </div>
                  )}

                  {editedQuestion.explanation && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                      <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                      <div className="prose prose-sm max-w-none text-blue-800">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          {editedQuestion.explanation}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="h-full flex">
              {/* Main Editor */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Title
                      </label>
                      <input
                        type="text"
                        value={editedQuestion.title}
                        onChange={(e) => setEditedQuestion(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter question title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Difficulty Level
                      </label>
                      <select
                        value={editedQuestion.difficulty}
                        onChange={(e) => setEditedQuestion(prev => ({ ...prev, difficulty: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="foundation">🌱 Foundation</option>
                        <option value="building">🏗️ Building</option>
                        <option value="mastery">🎯 Mastery</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Type
                      </label>
                      <select
                        value={editedQuestion.type}
                        onChange={(e) => setEditedQuestion(prev => ({ ...prev, type: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="multiple-choice">☑️ Multiple Choice</option>
                        <option value="true-false">✅ True/False</option>
                        <option value="step-by-step">📋 Step-by-Step</option>
                        <option value="matching">🔗 Matching</option>
                        <option value="visual">👁️ Visual</option>
                        <option value="essay">📝 Essay</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Time (minutes)
                      </label>
                      <input
                        type="number"
                        value={editedQuestion.estimatedTime}
                        onChange={(e) => setEditedQuestion(prev => ({ ...prev, estimatedTime: parseInt(e.target.value) || 5 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        max="60"
                      />
                    </div>
                  </div>

                  {/* Question Content */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Content (Markdown & LaTeX supported)
                    </label>
                    <textarea
                      value={editedQuestion.content}
                      onChange={(e) => setEditedQuestion(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                      placeholder="Enter your question content here. You can use **bold**, *italic*, and LaTeX: $x^2 + y^2 = z^2$"
                    />
                  </div>

                  {/* LaTeX Formula */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LaTeX Formula (optional)
                    </label>
                    <input
                      type="text"
                      value={editedQuestion.latex || ''}
                      onChange={(e) => setEditedQuestion(prev => ({ ...prev, latex: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter LaTeX formula (without $$ delimiters)"
                    />
                  </div>

                  {/* Options (for multiple choice) */}
                  {(editedQuestion.type === 'multiple-choice' || editedQuestion.type === 'true-false') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Answer Options
                      </label>
                      <div className="space-y-2">
                        {(editedQuestion.options || []).map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => updateOption(index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder={`Option ${index + 1}`}
                            />
                            <button
                              onClick={() => removeOption(index)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addOption}
                          className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Plus className="h-4 w-4" />
                          <span>Add Option</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Correct Answer */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correct Answer
                    </label>
                    {editedQuestion.type === 'multiple-choice' ? (
                      <select
                        value={editedQuestion.correctAnswer || ''}
                        onChange={(e) => setEditedQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select correct answer...</option>
                        {(editedQuestion.options || []).map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={editedQuestion.correctAnswer || ''}
                        onChange={(e) => setEditedQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the correct answer..."
                      />
                    )}
                  </div>

                  {/* Explanation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Explanation (Markdown & LaTeX supported)
                    </label>
                    <textarea
                      value={editedQuestion.explanation}
                      onChange={(e) => setEditedQuestion(prev => ({ ...prev, explanation: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                      placeholder="Explain why this is the correct answer..."
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 border-l border-gray-200 bg-gray-50 overflow-y-auto">
                <div className="p-4 space-y-6">
                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="Add tag..."
                      />
                      <button
                        onClick={handleAddTag}
                        className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {editedQuestion.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Accommodations */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Accommodations
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={newAccommodation}
                        onChange={(e) => setNewAccommodation(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddAccommodation()}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="Add accommodation..."
                      />
                      <button
                        onClick={handleAddAccommodation}
                        className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {editedQuestion.accommodations.map((accommodation, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-2 py-1 bg-green-50 text-green-800 text-xs rounded"
                        >
                          <span>{accommodation}</span>
                          <button
                            onClick={() => handleRemoveAccommodation(accommodation)}
                            className="text-green-600 hover:text-green-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Supports */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visual Supports
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={newVisualSupport}
                        onChange={(e) => setNewVisualSupport(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddVisualSupport()}
                        className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                        placeholder="Add visual support..."
                      />
                      <button
                        onClick={handleAddVisualSupport}
                        className="px-2 py-1 bg-purple-600 text-white rounded text-sm"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      {editedQuestion.visualSupports.map((support, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between px-2 py-1 bg-purple-50 text-purple-800 text-xs rounded"
                        >
                          <span>{support}</span>
                          <button
                            onClick={() => handleRemoveVisualSupport(support)}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attachments */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attachments
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.txt"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center space-x-2 px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600"
                    >
                      <Upload className="h-4 w-4" />
                      <span className="text-sm">Upload Files</span>
                    </button>
                    <div className="mt-2 space-y-2">
                      {editedQuestion.attachments.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded text-xs"
                        >
                          <div className="flex items-center space-x-2">
                            {getAttachmentIcon(attachment.type)}
                            <span className="truncate">{attachment.name}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveAttachment(attachment.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;