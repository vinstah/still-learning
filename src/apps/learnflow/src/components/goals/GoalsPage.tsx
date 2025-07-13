import React, { useState } from 'react';
import { Target, Plus, Calendar, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { useGoalsStore } from '../../store/goalsStore';
import { useAuthStore } from '../../store/authStore';

const GoalsPage: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useGoalsStore();
  const { user } = useAuthStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    category: 'learning' as const,
    priority: 'medium' as const,
  });

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      ...newGoal,
      targetDate: new Date(newGoal.targetDate),
      userId: user?.id || 'current-user',
    });
    setNewGoal({
      title: '',
      description: '',
      targetDate: '',
      category: 'learning',
      priority: 'medium',
    });
    setShowAddModal(false);
  };

  const toggleGoalComplete = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      updateGoal(goalId, { 
        completed: !goal.completed,
        completedAt: !goal.completed ? new Date() : undefined
      });
    }
  };

  const getStatusColor = (goal: any) => {
    if (goal.completed) return 'text-green-600 bg-green-100';
    const daysLeft = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysLeft < 0) return 'text-red-600 bg-red-100';
    if (daysLeft <= 7) return 'text-orange-600 bg-orange-100';
    return 'text-blue-600 bg-blue-100';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedGoals = goals.filter(g => g.completed);
  const activeGoals = goals.filter(g => !g.completed);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Target className="w-8 h-8 text-indigo-600 mr-3" />
                Learning Goals
              </h1>
              <p className="text-gray-600 mt-1">
                Set and track your learning objectives
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Goal</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Goals</p>
                <p className="text-2xl font-semibold text-gray-900">{goals.length}</p>
              </div>
              <Target className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-green-600">{completedGoals.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-semibold text-blue-600">{activeGoals.length}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-2xl font-semibold text-purple-600">
                  {goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Active Goals */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Goals</h2>
          {activeGoals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No active goals</h3>
              <p className="text-gray-600 mb-4">Set your first learning goal to get started</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeGoals.map((goal) => (
                <div key={goal.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">{goal.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(goal.priority)}`}>
                          {goal.priority} priority
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(goal)}`}>
                          {Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleGoalComplete(goal.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 text-gray-400 hover:text-green-600" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date(goal.targetDate).toLocaleDateString()}</span>
                    </div>
                    <span className="capitalize">{goal.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Completed Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedGoals.map((goal) => (
                <div key={goal.id} className="bg-gray-50 rounded-lg border border-gray-200 p-6 opacity-75">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2 line-through">{goal.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-sm text-gray-500">
                    Completed: {goal.completedAt ? new Date(goal.completedAt).toLocaleDateString() : 'Unknown'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Goal</h2>
            </div>
            <form onSubmit={handleAddGoal} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Master calculus derivatives"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe your goal in detail..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="learning">Learning</option>
                    <option value="exam">Exam</option>
                    <option value="project">Project</option>
                    <option value="skill">Skill</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  required
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;