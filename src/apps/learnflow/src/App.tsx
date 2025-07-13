import React, { useState } from 'react';
import { useAuthStore } from './store/authStore';
import { useBoardStore } from './store/boardStore';
import LoginForm from './components/auth/LoginForm';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Board from './components/board/Board';
import GoalsPage from './components/goals/GoalsPage';
import ProgressPage from './components/progress/ProgressPage';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { activeBoard } = useBoardStore();
  const [activeView, setActiveView] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderMainContent = () => {
    if (activeBoard && activeView === 'board') {
      return <Board board={activeBoard} />;
    }

    switch (activeView) {
      case 'goals':
        return <GoalsPage />;
      case 'progress':
        return <ProgressPage />;
      case 'dashboard':
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 flex flex-col">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default App;