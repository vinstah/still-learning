import React, { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useAccessibility } from './hooks/useAccessibility';
import { generateLearningBoard } from './utils/cardGenerator';
import { LearningBoard, LearningCard } from './types';
import { analytics } from './utils/analytics';
import { performanceMonitor } from './utils/performance';

// Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CardGrid } from './components/cards/CardGrid';
import { QuizInterface } from './components/quiz/QuizInterface';
import { ExamDecoder } from './components/exam/ExamDecoder';
import { CreateBoardModal } from './components/modals/CreateBoardModal';
import { VersionHistoryModal } from './components/modals/VersionHistoryModal';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { ToastProvider } from './components/ui/Toast';
import { LoadingPage } from './components/ui/LoadingSpinner';

function App() {
  // State management
  const [boards, setBoards] = useLocalStorage<LearningBoard[]>('learning-boards', []);
  const [activeView, setActiveView] = useState('boards');
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<{ boardId: string; cardId: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [selectedCardForVersions, setSelectedCardForVersions] = useState<LearningCard | null>(null);

  // Accessibility
  const { settings: accessibilitySettings } = useAccessibility();

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Track app initialization
        analytics.track({
          event: 'app_initialized',
          category: 'system',
          action: 'app_start',
          metadata: {
            boardCount: boards.length,
            isTeacherMode,
            accessibilityEnabled: Object.values(accessibilitySettings).some(Boolean)
          }
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        analytics.trackError('app_initialization_failed', 'App.tsx');
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Performance monitoring
  useEffect(() => {
    const measureRenderTime = () => {
      performanceMonitor.recordMetric('app_render_time', performance.now());
    };

    measureRenderTime();
  }, [activeView, boards.length]);

  // Get all cards from all boards
  const allCards = boards.flatMap(board => board.cards);

  // Handlers
  const handleCreateBoard = async (subject: string, topics: string[], teacherMode: boolean) => {
    try {
      setIsLoading(true);
      
      const newBoard = await performanceMonitor.measureAsyncFunction(
        'create_board',
        async () => {
          const board = generateLearningBoard(subject, topics);
          board.isTeacherMode = teacherMode;
          return board;
        }
      );

      setBoards(prev => [...prev, newBoard]);
      
      analytics.track({
        event: 'board_created',
        category: 'content',
        action: 'create_board',
        metadata: {
          subject,
          topicCount: topics.length,
          teacherMode
        }
      });

      setShowCreateModal(false);
    } catch (error) {
      console.error('Failed to create board:', error);
      analytics.trackError('board_creation_failed', 'App.tsx');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = (cardId: string) => {
    const boardId = boards.find(board => 
      board.cards.some(card => card.id === cardId)
    )?.id;
    
    if (boardId) {
      setActiveQuiz({ boardId, cardId });
      analytics.track({
        event: 'quiz_started',
        category: 'learning',
        action: 'start_quiz',
        label: cardId,
        metadata: { boardId, cardId }
      });
    }
  };

  const handleQuizComplete = (score: number) => {
    if (!activeQuiz) return;
    
    try {
      // Update the card's quiz data
      setBoards(prev => prev.map(board => {
        if (board.id === activeQuiz.boardId) {
          return {
            ...board,
            cards: board.cards.map(card => {
              if (card.id === activeQuiz.cardId) {
                const newAttempt = {
                  id: crypto.randomUUID(),
                  timestamp: new Date(),
                  score,
                  maxScore: 100,
                  percentage: score,
                  answers: {},
                  timeSpent: 0,
                  hintsUsed: [],
                  isCompleted: true
                };
                
                return {
                  ...card,
                  quiz: {
                    ...card.quiz,
                    attempts: [...card.quiz.attempts, newAttempt],
                    bestScore: Math.max(card.quiz.bestScore, score),
                    averageScore: Math.round(
                      ([...card.quiz.attempts, newAttempt].reduce((sum, attempt) => sum + attempt.percentage, 0)) /
                      (card.quiz.attempts.length + 1)
                    )
                  }
                };
              }
              return card;
            })
          };
        }
        return board;
      }));

      analytics.track({
        event: 'quiz_completed',
        category: 'learning',
        action: 'complete_quiz',
        value: score,
        metadata: {
          boardId: activeQuiz.boardId,
          cardId: activeQuiz.cardId,
          score
        }
      });

      setActiveQuiz(null);
    } catch (error) {
      console.error('Failed to save quiz results:', error);
      analytics.trackError('quiz_save_failed', 'App.tsx');
    }
  };

  const handleEditCard = (cardId: string) => {
    // In production, this would open a rich text editor
    analytics.track({
      event: 'card_edit_requested',
      category: 'content',
      action: 'edit_card',
      label: cardId
    });
    
    alert('Edit functionality would open here. This would allow editing card content with version tracking.');
  };

  const handleViewVersions = (cardId: string) => {
    const card = allCards.find(c => c.id === cardId);
    if (card) {
      setSelectedCardForVersions(card);
      setShowVersionModal(true);
      
      analytics.track({
        event: 'version_history_viewed',
        category: 'content',
        action: 'view_versions',
        label: cardId
      });
    }
  };

  const handleRollback = (version: number) => {
    if (!selectedCardForVersions) return;
    
    analytics.track({
      event: 'version_rollback',
      category: 'content',
      action: 'rollback_version',
      value: version,
      metadata: {
        cardId: selectedCardForVersions.id,
        targetVersion: version
      }
    });
    
    alert(`Would rollback card "${selectedCardForVersions.title}" to version ${version}`);
    setShowVersionModal(false);
  };

  const handleError = (error: Error, errorInfo: any) => {
    analytics.trackError(error.message, 'ErrorBoundary');
    console.error('Application error:', error, errorInfo);
  };

  // Show loading screen
  if (isLoading) {
    return <LoadingPage text="Initializing AI Learning System..." />;
  }

  // Render quiz interface if active
  if (activeQuiz) {
    const board = boards.find(b => b.id === activeQuiz.boardId);
    const card = board?.cards.find(c => c.id === activeQuiz.cardId);
    
    if (card) {
      return (
        <ErrorBoundary onError={handleError}>
          <ToastProvider>
            <QuizInterface
              card={card}
              onComplete={handleQuizComplete}
              onBack={() => setActiveQuiz(null)}
            />
          </ToastProvider>
        </ErrorBoundary>
      );
    }
  }

  // Main app layout
  return (
    <ErrorBoundary onError={handleError}>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50">
          <Header
            isTeacherMode={isTeacherMode}
            onToggleMode={() => {
              setIsTeacherMode(!isTeacherMode);
              analytics.track({
                event: 'mode_toggle',
                category: 'user',
                action: 'toggle_mode',
                label: !isTeacherMode ? 'teacher' : 'student'
              });
            }}
            onOpenSettings={() => {
              analytics.track({
                event: 'settings_opened',
                category: 'user',
                action: 'open_settings'
              });
              alert('Settings would open here');
            }}
          />
          
          <div className="flex">
            <Sidebar
              activeView={activeView}
              onViewChange={(view) => {
                setActiveView(view);
                analytics.track({
                  event: 'view_changed',
                  category: 'navigation',
                  action: 'change_view',
                  label: view
                });
              }}
              onCreateBoard={() => setShowCreateModal(true)}
              boardCount={boards.length}
            />
            
            <main className="flex-1 p-6" role="main">
              {activeView === 'boards' && (
                <div>
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      Learning Boards
                    </h1>
                    <p className="text-gray-600">
                      Interactive study materials with quizzes and progress tracking
                    </p>
                  </div>
                  
                  <CardGrid
                    cards={allCards}
                    onStartQuiz={handleStartQuiz}
                    onEditCard={handleEditCard}
                    onViewVersions={handleViewVersions}
                  />
                </div>
              )}
              
              {activeView === 'exam-decoder' && <ExamDecoder />}
              
              {activeView === 'progress' && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Progress Dashboard
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Detailed analytics and progress tracking coming soon. This will include 
                    performance metrics, learning patterns, and personalized recommendations.
                  </p>
                </div>
              )}
              
              {activeView === 'history' && (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Version History
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Global version history and change tracking coming soon. This will show 
                    all edits made to learning materials with full rollback capabilities.
                  </p>
                </div>
              )}
            </main>
          </div>

          {/* Modals */}
          <CreateBoardModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreateBoard={handleCreateBoard}
          />
          
          <VersionHistoryModal
            isOpen={showVersionModal}
            onClose={() => setShowVersionModal(false)}
            versions={selectedCardForVersions?.versions || []}
            onRollback={handleRollback}
            cardTitle={selectedCardForVersions?.title || ''}
          />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;