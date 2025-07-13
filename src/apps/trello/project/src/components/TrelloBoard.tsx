import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Plus, ArrowLeft } from 'lucide-react';
import { Topic, QuestionCard } from '../data/questionBank';
import QuestionCardComponent from './QuestionCardComponent';
import FilterBar from './FilterBar';
import EditableTopicColumn from './EditableTopicColumn';

interface TrelloBoardProps {
  subject: {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
  };
  selectedTopic: Topic;
  onCardEdit: (card: QuestionCard, topicId: string) => void;
  onCardDelete: (cardId: string, topicId: string) => void;
  onCardAdd: (topicId: string) => void;
  onTopicAdd: () => void;
  onTopicNameChange: (topicId: string, newName: string) => void;
  onTopicDescriptionChange: (topicId: string, newDescription: string) => void;
  onTopicDelete: (topicId: string) => void;
  onBack: () => void;
  allTopics: Topic[];
}

const TrelloBoard: React.FC<TrelloBoardProps> = ({
  subject,
  selectedTopic,
  onCardEdit,
  onCardDelete,
  onCardAdd,
  onTopicAdd,
  onTopicNameChange,
  onTopicDescriptionChange,
  onTopicDelete,
  onBack,
  allTopics
}) => {
  const [topics, setTopics] = useState([selectedTopic]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Get all available tags from all questions
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    topics.forEach(topic => {
      topic.questions.forEach(question => {
        question.tags.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags).sort();
  }, [topics]);

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
      // Reordering within the same topic
      const topicIndex = topics.findIndex(topic => topic.id === source.droppableId);
      const newQuestions = Array.from(topics[topicIndex].questions);
      const [reorderedItem] = newQuestions.splice(source.index, 1);
      newQuestions.splice(destination.index, 0, reorderedItem);

      const newTopics = [...topics];
      newTopics[topicIndex] = {
        ...newTopics[topicIndex],
        questions: newQuestions
      };
      setTopics(newTopics);
    } else {
      // Moving between topics
      const sourceTopicIndex = topics.findIndex(topic => topic.id === source.droppableId);
      const destTopicIndex = topics.findIndex(topic => topic.id === destination.droppableId);
      
      const sourceQuestions = Array.from(topics[sourceTopicIndex].questions);
      const destQuestions = Array.from(topics[destTopicIndex].questions);
      
      const [movedItem] = sourceQuestions.splice(source.index, 1);
      destQuestions.splice(destination.index, 0, movedItem);

      const newTopics = [...topics];
      newTopics[sourceTopicIndex] = {
        ...newTopics[sourceTopicIndex],
        questions: sourceQuestions
      };
      newTopics[destTopicIndex] = {
        ...newTopics[destTopicIndex],
        questions: destQuestions
      };
      setTopics(newTopics);
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

  const handleTopicNameChange = (topicId: string, newName: string) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { ...topic, name: newName } : topic
    ));
    onTopicNameChange(topicId, newName);
  };

  const handleTopicDescriptionChange = (topicId: string, newDescription: string) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { ...topic, description: newDescription } : topic
    ));
    onTopicDescriptionChange(topicId, newDescription);
  };

  const handleTopicDelete = (topicId: string) => {
    setTopics(topics.filter(topic => topic.id !== topicId));
    onTopicDelete(topicId);
  };

  const addTopicColumn = () => {
    // Show available topics that aren't already displayed
    const availableTopics = allTopics.filter(topic => 
      !topics.some(displayedTopic => displayedTopic.id === topic.id)
    );
    
    if (availableTopics.length > 0) {
      // For now, add the first available topic
      // In a real app, you'd show a selection dialog
      setTopics([...topics, availableTopics[0]]);
    } else {
      onTopicAdd();
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Topics</span>
        </button>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className={`p-3 rounded-lg ${subject.color}`}>
            <span className="text-xl text-white">
              {subject.icon === 'Calculator' && '🧮'}
              {subject.icon === 'FlaskConical' && '🧪'}
              {subject.icon === 'BookOpen' && '📚'}
              {subject.icon === 'Globe' && '🌍'}
              {subject.icon === 'Users' && '👥'}
              {subject.icon === 'Brain' && '🧠'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{subject.name} - Question Management</h1>
            <p className="text-gray-600">Drag and drop questions between topics to organize your content</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
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

      {/* Trello Board */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {topics.map((topic) => {
            const filteredQuestions = getFilteredQuestions(topic.questions);
            const canDelete = topic.questions.length === 0;
            
            return (
              <EditableTopicColumn
                key={topic.id}
                topic={topic}
                onNameChange={handleTopicNameChange}
                onDescriptionChange={handleTopicDescriptionChange}
                onDelete={handleTopicDelete}
                canDelete={canDelete}
              >
                <Droppable droppableId={topic.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`p-4 min-h-[200px] ${
                        snapshot.isDraggingOver ? 'bg-blue-50' : ''
                      }`}
                    >
                      {filteredQuestions.map((question, index) => (
                        <Draggable key={question.id} draggableId={question.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`mb-3 ${snapshot.isDragging ? 'rotate-2' : ''}`}
                            >
                              <QuestionCardComponent
                                question={question}
                                onEdit={() => onCardEdit(question, topic.id)}
                                onDelete={() => onCardDelete(question.id, topic.id)}
                                onTagClick={handleTagClick}
                                selectedTags={selectedTags}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {/* Add Question Button */}
                      <button
                        onClick={() => onCardAdd(topic.id)}
                        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 text-gray-600"
                      >
                        <Plus className="h-4 w-4" />
                        <span className="text-sm">Add Question</span>
                      </button>
                    </div>
                  )}
                </Droppable>
              </EditableTopicColumn>
            );
          })}

          {/* Add Topic Column */}
          <div className="flex-shrink-0 w-80">
            <button
              onClick={addTopicColumn}
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center space-y-2 text-gray-600"
            >
              <Plus className="h-6 w-6" />
              <span>Add Topic Column</span>
            </button>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default TrelloBoard;