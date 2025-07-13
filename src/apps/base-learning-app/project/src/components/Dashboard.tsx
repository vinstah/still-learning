import React, { useState } from 'react';
import { User, Subject } from '../types';
import { subjects } from '../data/subjects';
import * as LucideIcons from 'lucide-react';
import { 
  User as UserIcon, 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  Flame,
  Play,
} from 'lucide-react';

interface DashboardProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onStartLesson: () => void;
}

export default function Dashboard({ user, onUpdateUser, onStartLesson }: DashboardProps) {
  const [selectedSubject, setSelectedSubject] = useState(user.currentSubject);
  const [selectedLevel, setSelectedLevel] = useState(user.currentLevel);
  const [selectedRole, setSelectedRole] = useState(user.role);

  const handleStartLesson = () => {
    onUpdateUser({
      currentSubject: selectedSubject,
      currentLevel: selectedLevel,
      role: selectedRole
    });
    onStartLesson();
  };

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);
  const availableLevels = selectedSubjectData?.levels || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Welcome to Your Learning Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A personalized learning experience designed for students of all levels and learning styles
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Learning Streak</p>
                <p className="text-2xl font-bold text-gray-900">{user.streak} days</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Flame className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Achievements</p>
                <p className="text-2xl font-bold text-gray-900">{user.achievements.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Trophy className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Current Role</p>
                <p className="text-2xl font-bold text-gray-900">{user.role}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Setup Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>
            Setup Your Learning Session
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Your Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as any)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-200"
              >
                <option value="Student">Student</option>
                <option value="Parent">Parent</option>
                <option value="Teacher">Teacher</option>
                <option value="Individual">Individual</option>
              </select>
            </div>

            {/* Subject Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-200"
              >
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Level
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-all duration-200"
              >
                {availableLevels.map(level => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleStartLesson}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center text-xl shadow-lg hover:shadow-xl active:scale-95"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <Play className="h-4 w-4" />
            </div>
            Start Lesson
          </button>
        </div>

        {/* Subject Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
          {subjects.map(subject => (
            <div
              key={subject.id}
              className={`bg-white rounded-2xl shadow-lg p-6 border-2 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 active:scale-95 ${
                selectedSubject === subject.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-100'
              }`}
              onClick={() => setSelectedSubject(subject.id)}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${subject.color} text-white mb-4 shadow-lg`}>
                {React.createElement(LucideIcons[subject.icon as keyof typeof LucideIcons], { className: 'h-6 w-6' })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">{subject.name}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{subject.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mr-2">
                  <BookOpen className="h-3 w-3" />
                </div>
                <span>{subject.levels.length} levels available</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}