import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Plus, Clock, CheckCircle, Play } from 'lucide-react';
import { Topic, QuestionCard } from '../data/questionBank';
import QuestionCardComponent from './QuestionCardComponent';
import FilterBar from './FilterBar';
import LearnerQuestionCard from './LearnerQuestionCard';

interface WorkflowColumn {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  questions: QuestionCard[];
}

interface WorkflowBoardProps {
  subject: {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
  };
  selectedTopic: Topic;
  userRole: 'manager' | 'learner';
  onCardEdit: (card: QuestionCard, columnId: string) => void;
  onCardDelete: (cardId: string, columnId: string) => void;
  onCardAdd: (columnId: string) => void;
  onBack: () => void;
}

const WorkflowBoard: React.FC<WorkflowBoardProps> = ({
  subject,
  selectedTopic,
  userRole,
  onCardEdit,
  onCardDelete,
  onCardAdd,
  onBack
}) => {
  // Initialize workflow columns with questions distributed
  const [columns, setColumns] = useState<WorkflowColumn[]>(() => {
    const allQuestions = selectedTopic.questions;
    return [
      {
        id: 'daily',
        name: 'Daily',
        icon: <Clock className="h-4 w-4" />,
        color: 'bg-blue-500',
        questions: allQuestions.slice(0, Math.ceil(allQuestions.length / 3))
      },
      {
        id: 'inprogress',
        name: 'In Progress',
        icon: <Play className="h-4 w-4" />,
        color: 'bg-yellow-500',
        questions: allQuestions.slice(Math.ceil(allQuestions.length / 3), Math.ceil(allQuestions.length * 2 / 3))
      },
      {
        id: 'complete',
        name: 'Complete',
        icon: <CheckCircle className="h-4 w-4" />,
        color: 'bg-green-500',
        questions: allQuestions.slice(Math.ceil(allQuestions.length * 2 / 3))
      }
    ];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Get all available tags from all questions
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    columns.forEach(column => {
      column.questions.forEach(question => {
        question.tags.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  }, [columns]);

  // Filter questions based on search and filters
  const getFilteredQuestions = (questions: QuestionCard[]) => {
    return questions.filter(question => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          question.title.toLowerCase().includes(searchLower) ||
          question.content.toLowerCase().includes(searchLower) ||
          question.tags.some(tag => tag.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Difficulty filter
      if (selectedDifficulty && question.difficulty !== selectedDifficulty) {
        return false;
      }

      // Type filter
      if (selectedType && question.type !== selectedType) {
        return false;
      }

      // Tag filter
      if (selectedTags.length > 0) {
        const hasSelectedTag = selectedTags.some(tag => question.tags.includes(tag));
        if (!hasSelectedTag) return false;
      }

      return true;
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const columnIndex = columns.findIndex(col => col.id === source.droppableId);
      const newQuestions = Array.from(columns[columnIndex].questions);
      const [reorderedItem] = newQuestions.splice(source.index, 1);
      newQuestions.splice(destination.index, 0, reorderedItem);

      const newColumns = [...columns];
      newColumns[columnIndex] = {
        ...newColumns[columnIndex],
        questions: newQuestions
      };
      setColumns(newColumns);
    } else {
      // Moving between columns
      const sourceColumnIndex = columns.findIndex(col => col.id === source.droppableId);
      const destColumnIndex = columns.findIndex(col => col.id === destination.droppableId);
      
      const sourceQuestions = Array.from(columns[sourceColumnIndex].questions);
      const destQuestions = Array.from(columns[destColumnIndex].questions);
      
      const [movedItem] = sourceQuestions.splice(source.index, 1);
      destQuestions.splice(destination.index, 0, movedItem);

      const newColumns = [...columns];
      newColumns[sourceColumnIndex] = {
        ...newColumns[sourceColumnIndex],
        questions: sourceQuestions
      };
      newColumns[destColumnIndex] = {
        ...newColumns[destColumnIndex],
        questions: destQuestions
      };
      setColumns(newColumns);
    }
  };

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSelectedDifficulty('');
    setSelectedType('');
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className={`p-2 rounded-lg ${subject.color}`}>
            <span className="text-lg text-white">
              {subject.icon === 'Calculator' && '🧮'}
              {subject.icon === 'FlaskConical' && '🧪'}
              {subject.icon === 'BookOpen' && '📚'}
              {subject.icon === 'Globe' && '🌍'}
              {subject.icon === 'Users' && '👥'}
              {subject.icon === 'Brain' && '🧠'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-gray-900 truncate">{selectedTopic.name}</h1>
            <p className="text-sm text-gray-600 truncate">{userRole === 'learner' ? 'Learning Workflow' : 'Question Management'}</p>
          </div>
        </div>

        {/* Role indicator for mobile */}
        <div className="flex items-center justify-between">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            userRole === 'learner' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
          }`}>
            {userRole === 'learner' ? '👨‍🎓 Learner Mode' : '⚙️ Manager Mode'}
          </div>
          <div className="text-xs text-gray-500">
            {columns.reduce((total, col) => total + col.questions.length, 0)} questions
          </div>
        </div>
      </div>

      {/* Filter Bar - Collapsible on mobile */}
      <div className="bg-white border-b border-gray-200">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTags={selectedTags}
          onTagToggle={handleTagClick}
          availableTags={availableTags}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Workflow Board */}
      <div className="flex-1 overflow-hidden">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="h-full overflow-x-auto">
            <div className="flex h-full min-w-max">
              {columns.map((column) => {
                const filteredQuestions = getFilteredQuestions(column.questions);
                
                return (
                  <div key={column.id} className="flex-shrink-0 w-80 sm:w-96 h-full">
                    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
                      {/* Column Header */}
                      <div className={`p-4 ${column.color} bg-opacity-10 border-b border-gray-200`}>
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${column.color} text-white`}>
                            {column.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{column.name}</h3>
                            <p className="text-sm text-gray-600">
                              {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Questions List */}
                      <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`flex-1 p-4 overflow-y-auto ${
                              snapshot.isDraggingOver ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="space-y-3">
                              {filteredQuestions.map((question, index) => (
                                <Draggable key={question.id} draggableId={question.id} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`${snapshot.isDragging ? 'rotate-1 scale-105' : ''} transition-transform`}
                                    >
                                      {userRole === 'learner' ? (
                                        <LearnerQuestionCard
                                          question={question}
                                          onTagClick={handleTagClick}
                                          selectedTags={selectedTags}
                                        />
                                      ) : (
                                        <QuestionCardComponent
                                          question={question}
                                          onEdit={() => onCardEdit(question, column.id)}
                                          onDelete={() => onCardDelete(question.id, column.id)}
                                          onTagClick={handleTagClick}
                                          selectedTags={selectedTags}
                                        />
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                            {provided.placeholder}

                            {/* Add Question Button - Manager only */}
                            {userRole === 'manager' && (
                              <button
                                onClick={() => onCardAdd(column.id)}
                                className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 text-gray-600"
                              >
                                <Plus className="h-4 w-4" />
                                <span className="text-sm">Add Question</span>
                              </button>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default WorkflowBoard;