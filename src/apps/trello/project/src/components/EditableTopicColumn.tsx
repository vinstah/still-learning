import React, { useState } from 'react';
import { Edit3, Trash2, Check, X, MoreHorizontal } from 'lucide-react';
import { Topic } from '../data/questionBank';

interface EditableTopicColumnProps {
  topic: Topic;
  onNameChange: (topicId: string, newName: string) => void;
  onDescriptionChange: (topicId: string, newDescription: string) => void;
  onDelete: (topicId: string) => void;
  canDelete: boolean;
  children: React.ReactNode;
}

const EditableTopicColumn: React.FC<EditableTopicColumnProps> = ({
  topic,
  onNameChange,
  onDescriptionChange,
  onDelete,
  canDelete,
  children
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedName, setEditedName] = useState(topic.name);
  const [editedDescription, setEditedDescription] = useState(topic.description);
  const [showMenu, setShowMenu] = useState(false);

  const handleNameSave = () => {
    if (editedName.trim() && editedName !== topic.name) {
      onNameChange(topic.id, editedName.trim());
    }
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setEditedName(topic.name);
    setIsEditingName(false);
  };

  const handleDescriptionSave = () => {
    if (editedDescription.trim() !== topic.description) {
      onDescriptionChange(topic.id, editedDescription.trim());
    }
    setIsEditingDescription(false);
  };

  const handleDescriptionCancel = () => {
    setEditedDescription(topic.description);
    setIsEditingDescription(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action();
    } else if (e.key === 'Escape') {
      if (isEditingName) handleNameCancel();
      if (isEditingDescription) handleDescriptionCancel();
    }
  };

  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Topic Header */}
        <div className={`p-4 rounded-t-lg ${topic.color} bg-opacity-20 border-b border-gray-200`}>
          <div className="flex items-start justify-between">
            <div className="flex-1 mr-2">
              {/* Topic Name */}
              {isEditingName ? (
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, handleNameSave)}
                    className="flex-1 px-2 py-1 text-lg font-semibold bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={handleNameSave}
                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNameCancel}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <h3 
                  className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:bg-gray-100 rounded px-1 py-0.5"
                  onClick={() => setIsEditingName(true)}
                >
                  {topic.name}
                </h3>
              )}

              {/* Topic Description */}
              {isEditingDescription ? (
                <div className="flex items-start space-x-2">
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleDescriptionSave();
                      } else if (e.key === 'Escape') {
                        handleDescriptionCancel();
                      }
                    }}
                    className="flex-1 px-2 py-1 text-sm bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={2}
                    autoFocus
                  />
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={handleDescriptionSave}
                      className="p-1 text-green-600 hover:bg-green-100 rounded"
                    >
                      <Check className="h-3 w-3" />
                    </button>
                    <button
                      onClick={handleDescriptionCancel}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <p 
                  className="text-sm text-gray-600 cursor-pointer hover:bg-gray-100 rounded px-1 py-0.5"
                  onClick={() => setIsEditingDescription(true)}
                >
                  {topic.description}
                </p>
              )}

              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-gray-500">
                  {topic.questions.length} question{topic.questions.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Menu Button */}
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <MoreHorizontal className="h-4 w-4 text-gray-500" />
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                  <button
                    onClick={() => {
                      setIsEditingName(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Edit Name</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingDescription(true);
                      setShowMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Edit Description</span>
                  </button>
                  {canDelete && (
                    <>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          onDelete(topic.id);
                          setShowMenu(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Delete Topic</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Questions Content */}
        {children}
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default EditableTopicColumn;