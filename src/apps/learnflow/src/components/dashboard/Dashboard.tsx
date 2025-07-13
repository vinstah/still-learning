import React from 'react';
import { Plus, BookOpen, Target, TrendingUp, Brain } from 'lucide-react';
import { useBoardStore } from '../../store/boardStore';
import { useAuthStore } from '../../store/authStore';
import { useAIStore } from '../../store/aiStore';

const Dashboard: React.FC = () => {
  const { boards, addBoard, setActiveBoard } = useBoardStore();
  const { user } = useAuthStore();
  const { generateBoard } = useAIStore();

  const handleCreateBoard = () => {
    const boardData = {
      title: 'New Study Board',
      description: 'A new board for learning',
      subject: 'General',
      level: 'high-school' as const,
      columns: [],
      createdBy: user?.id || 'current-user',
      sharedWith: [],
    };
    
    addBoard(boardData);
  };

  const handleAIGenerateBoard = async () => {
    try {
      const board = await generateBoard('Create a physics board for forces and motion');
      addBoard({
        title: board.title,
        description: board.description,
        subject: board.subject,
        level: board.level,
        columns: board.columns,
        createdBy: user?.id || 'current-user',
        sharedWith: [],
      });
    } catch (error) {
      console.error('Error generating board:', error);
    }
  };

  const stats = [
    {
      name: 'Total Boards',
      value: boards.length,
      icon: BookOpen,
      color: 'bg-blue-500',
    },
    {
      name: 'Cards Created',
      value: boards.reduce((acc, board) => acc + board.columns.reduce((colAcc, col) => colAcc + col.cards.length, 0), 0),
      icon: Target,
      color: 'bg-green-500',
    },
    {
      name: 'Learning Streak',
      value: '7 days',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleCreateBoard}
              className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Plus className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Create New Board</h3>
                <p className="text-sm text-gray-600">Start a new learning board</p>
              </div>
            </button>
            
            <button
              onClick={handleAIGenerateBoard}
              className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="bg-purple-100 p-2 rounded-lg">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">AI Generate Board</h3>
                <p className="text-sm text-gray-600">Let AI create a study board for you</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Boards */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Boards</h2>
          {boards.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No boards yet</h3>
              <p className="text-gray-600 mb-4">Create your first learning board to get started</p>
              <button
                onClick={handleCreateBoard}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Create Board
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {boards.map((board) => (
                <div
                  key={board.id}
                  onClick={() => setActiveBoard(board)}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 truncate">{board.title}</h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {board.subject}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{board.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {board.columns.reduce((acc, col) => acc + col.cards.length, 0)} cards
                    </span>
                    <span>{board.level}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;