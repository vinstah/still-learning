import React, { useState } from 'react';
import Header from './components/Header';
import TopicsList from './components/TopicsList';
import TopicDetail from './components/TopicDetail';
import ProgressDashboard from './components/ProgressDashboard';
import ChatBot from './components/ChatBot';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { ContentProvider, useContent } from './context/ContentContext';
import { Topic, Problem } from './types';

const AppContent: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const { progress, updateProgress } = useProgress();
  const { topics, problems, addTopic, addProblem } = useContent();

  const handleNavigation = (path: string) => {
    switch (path) {
      case '/':
      case '/topics':
        setSelectedTopicId(null);
        setShowDashboard(false);
        break;
      case '/progress':
        setSelectedTopicId(null);
        setShowDashboard(true);
        break;
      default:
        break;
    }
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
    setShowDashboard(false);
  };

  const handleBack = () => {
    setSelectedTopicId(null);
    setShowDashboard(false);
  };

  const handleProblemComplete = (problemId: string, isCorrect: boolean) => {
    const problem = problems.find(p => p.id === problemId);
    if (problem) {
      updateProgress(problem.topicId, isCorrect);
    }
  };

  const handleGenerateContent = (type: 'topic' | 'problem', content: Topic | Problem) => {
    if (type === 'topic') {
      addTopic(content as Topic);
      // Show a notification or toast here if desired
    } else if (type === 'problem') {
      addProblem(content as Problem);
      // Show a notification or toast here if desired
    }
  };

  const selectedTopic = topics.find(topic => topic.id === selectedTopicId);
  const topicProblems = problems.filter(problem => problem.topicId === selectedTopicId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={handleNavigation} />
      
      <main className="pt-4">
        {showDashboard ? (
          <ProgressDashboard 
            progress={progress} 
            topics={topics}
          />
        ) : selectedTopic ? (
          <TopicDetail
            topic={selectedTopic}
            problems={topicProblems}
            onBack={handleBack}
            onCompleteProblem={handleProblemComplete}
          />
        ) : (
          <TopicsList
            topics={topics}
            progress={progress}
            onSelectTopic={handleTopicSelect}
          />
        )}
      </main>

      {!showDashboard && !selectedTopic && (
        <div className="fixed bottom-8 left-8">
          <button
            onClick={() => setShowDashboard(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          >
            View Progress
          </button>
        </div>
      )}

      <ChatBot onGenerateContent={handleGenerateContent} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </ContentProvider>
  );
};

export default App;