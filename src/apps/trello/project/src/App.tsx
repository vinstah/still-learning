import React, { useState } from 'react';
import { BookOpen, ArrowLeft } from 'lucide-react';
import WorkflowBoard from './components/WorkflowBoard';
import TopicSelector from './components/TopicSelector';
import QuestionEditor from './components/QuestionEditor';
import RoleToggle from './components/RoleToggle';
import { questionBank, QuestionCard, Topic } from './data/questionBank';
import { mathematicsTopics } from './data/mathematics';
import { scienceTopics } from './data/science';
import { languageArtsTopics } from './data/languageArts';
import { socialStudiesTopics } from './data/socialStudies';
import { lifeSkillsTopics } from './data/lifeSkills';
import { executiveFunctionTopics } from './data/executiveFunction';

// Combine all topics with their respective subjects
const allSubjects = questionBank.map(subject => {
  let topics;
  switch (subject.id) {
    case 'mathematics':
      topics = mathematicsTopics;
      break;
    case 'science':
      topics = scienceTopics;
      break;
    case 'language-arts':
      topics = languageArtsTopics;
      break;
    case 'social-studies':
      topics = socialStudiesTopics;
      break;
    case 'life-skills':
      topics = lifeSkillsTopics;
      break;
    case 'executive-function':
      topics = executiveFunctionTopics;
      break;
    default:
      topics = [];
  }
  return { ...subject, topics };
});

type ViewState = 'subjects' | 'topics' | 'board';
type UserRole = 'manager' | 'learner';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('subjects');
  const [userRole, setUserRole] = useState<UserRole>('learner');
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<QuestionCard | null>(null);
  const [editingColumnId, setEditingColumnId] = useState<string>('');
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);

  const handleSubjectSelect = (subject: any) => {
    setSelectedSubject(subject);
    setCurrentView('topics');
  };

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('board');
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedTopic(null);
    setCurrentView('subjects');
    setEditingQuestion(null);
    setIsCreatingQuestion(false);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setCurrentView('topics');
    setEditingQuestion(null);
    setIsCreatingQuestion(false);
  };

  const handleCardEdit = (card: QuestionCard, columnId: string) => {
    if (userRole === 'manager') {
      setEditingQuestion(card);
      setEditingColumnId(columnId);
    }
  };

  const handleCardDelete = (cardId: string, columnId: string) => {
    if (userRole === 'manager') {
      // In a real app, this would update the database
      console.log('Delete card:', cardId, 'from column:', columnId);
    }
  };

  const handleCardAdd = (columnId: string) => {
    if (userRole === 'manager') {
      setEditingQuestion(null);
      setEditingColumnId(columnId);
      setIsCreatingQuestion(true);
    }
  };

  const handleQuestionSave = (question: QuestionCard, columnId: string) => {
    // In a real app, this would save to the database
    console.log('Save question:', question, 'to column:', columnId);
    setEditingQuestion(null);
    setIsCreatingQuestion(false);
  };

  const handleEditorClose = () => {
    setEditingQuestion(null);
    setIsCreatingQuestion(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile-First Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              {(currentView === 'topics' || currentView === 'board') && (
                <button
                  onClick={currentView === 'topics' ? handleBackToSubjects : handleBackToTopics}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>
              )}
              <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
                <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-sm sm:text-xl font-bold text-gray-900 truncate">
                  {currentView === 'subjects' && 'Learning Platform'}
                  {currentView === 'topics' && selectedSubject?.name}
                  {currentView === 'board' && selectedTopic?.name}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 truncate hidden sm:block">
                  {currentView === 'subjects' && 'ADHD/Autism friendly learning'}
                  {currentView === 'topics' && 'Select a topic to start learning'}
                  {currentView === 'board' && (userRole === 'learner' ? 'Learning workflow' : 'Question management')}
                </p>
              </div>
            </div>
            
            {/* Role Toggle */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <RoleToggle currentRole={userRole} onRoleChange={setUserRole} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)]">
        {currentView === 'subjects' && (
          /* Subject Selection - Mobile Optimized */
          <div className="h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
                  Choose a Subject
                </h2>
                <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
                  {userRole === 'learner' 
                    ? 'Select a subject to start your learning journey with our workflow-based system.'
                    : 'Select a subject to manage its question bank using our Trello-style interface.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {allSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    onClick={() => handleSubjectSelect(subject)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-gray-200 p-4 sm:p-6"
                  >
                    <div className={`p-3 sm:p-4 rounded-lg ${subject.color} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 w-fit`}>
                      <span className="text-xl sm:text-2xl text-white">
                        {subject.icon === 'Calculator' && '🧮'}
                        {subject.icon === 'FlaskConical' && '🧪'}
                        {subject.icon === 'BookOpen' && '📚'}
                        {subject.icon === 'Globe' && '🌍'}
                        {subject.icon === 'Users' && '👥'}
                        {subject.icon === 'Brain' && '🧠'}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">{subject.name}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{subject.description}</p>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <span>{subject.topics.length} topics</span>
                      <span>
                        {subject.topics.reduce((total, topic) => total + topic.questions.length, 0)} questions
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features - Responsive */}
              <div className="mt-12 sm:mt-16 bg-white rounded-xl shadow-sm p-4 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Platform Features</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <span className="text-lg sm:text-2xl">📋</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Workflow Boards</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Organize learning with Daily, In Progress, and Complete columns.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <span className="text-lg sm:text-2xl">📱</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Mobile First</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Optimized for mobile learning on any device.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <span className="text-lg sm:text-2xl">🧠</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">ADHD/Autism Friendly</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Designed with accommodations and visual supports.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <span className="text-lg sm:text-2xl">👥</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Dual Roles</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Switch between learner and manager modes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'topics' && selectedSubject && (
          <TopicSelector
            subject={selectedSubject}
            onTopicSelect={handleTopicSelect}
            onBack={handleBackToSubjects}
          />
        )}

        {currentView === 'board' && selectedSubject && selectedTopic && (
          <WorkflowBoard
            subject={selectedSubject}
            selectedTopic={selectedTopic}
            userRole={userRole}
            onCardEdit={handleCardEdit}
            onCardDelete={handleCardDelete}
            onCardAdd={handleCardAdd}
            onBack={handleBackToTopics}
          />
        )}
      </main>

      {/* Question Editor Modal - Manager only */}
      {userRole === 'manager' && (editingQuestion || isCreatingQuestion) && (
        <QuestionEditor
          question={editingQuestion}
          topicId={editingColumnId}
          onSave={handleQuestionSave}
          onClose={handleEditorClose}
        />
      )}
    </div>
  );
}

export default App;