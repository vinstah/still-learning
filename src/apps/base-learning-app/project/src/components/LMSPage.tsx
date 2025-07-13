import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Users, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { subjects } from '../data/subjects';
import * as LucideIcons from 'lucide-react';

interface LMSPageProps {
  onBack: () => void;
}

export default function LMSPage({ onBack }: LMSPageProps) {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);
  const [selectedLevel, setSelectedLevel] = useState('Grade 7');
  const [activeTab, setActiveTab] = useState<'lessons' | 'tests' | 'exams' | 'students'>('lessons');
  const [expandedSections, setExpandedSections] = useState<string[]>(['lessons']);

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);
  const availableLevels = selectedSubjectData?.levels || [];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const mockLessons = [
    { id: 1, title: 'Introduction to Forces', status: 'published', students: 24 },
    { id: 2, title: 'Balanced and Unbalanced Forces', status: 'draft', students: 0 },
    { id: 3, title: 'Newton\'s Laws of Motion', status: 'published', students: 18 },
  ];

  const mockTests = [
    { id: 1, title: 'Forces Quiz', type: 'quiz', attempts: 45, avgScore: 78 },
    { id: 2, title: 'Motion Test', type: 'test', attempts: 32, avgScore: 82 },
  ];

  const mockStudents = [
    { id: 1, name: 'Alex Johnson', progress: 85, lastActive: '2 hours ago' },
    { id: 2, name: 'Sarah Chen', progress: 92, lastActive: '1 day ago' },
    { id: 3, name: 'Mike Rodriguez', progress: 67, lastActive: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Learning Management System</h1>
            <p className="text-gray-600">Manage courses, students, and assessments</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Create New
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Subjects & Levels</h3>
              
              {/* Subject Selection */}
              <div className="space-y-4">
                {subjects.map(subject => {
                  const IconComponent = LucideIcons[subject.icon as keyof typeof LucideIcons];
                  const isSelected = selectedSubject === subject.id;
                  
                  return (
                    <div key={subject.id}>
                      <button
                        onClick={() => {
                          setSelectedSubject(subject.id);
                          toggleSection(subject.id);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                          isSelected ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-lg ${subject.color} flex items-center justify-center`}>
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-medium">{subject.name}</span>
                        </div>
                        {expandedSections.includes(subject.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSections.includes(subject.id) && isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 mt-2 space-y-1"
                          >
                            {availableLevels.map(level => (
                              <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                  selectedLevel === level 
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                              >
                                {level}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              {/* Tabs */}
              <div className="border-b border-gray-200 px-6 pt-6">
                <div className="flex space-x-8">
                  {[
                    { id: 'lessons', label: 'Lessons', icon: BookOpen },
                    { id: 'tests', label: 'Tests & Quizzes', icon: FileText },
                    { id: 'exams', label: 'Exams', icon: Settings },
                    { id: 'students', label: 'Students', icon: Users },
                  ].map(tab => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center space-x-2 pb-4 border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'lessons' && (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-semibold">
                            {selectedSubjectData?.name} - {selectedLevel} Lessons
                          </h3>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Lesson
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {mockLessons.map(lesson => (
                            <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div>
                                <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                <p className="text-sm text-gray-500">
                                  {lesson.status === 'published' ? '✅ Published' : '📝 Draft'} • {lesson.students} students enrolled
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'tests' && (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-semibold">Tests & Quizzes</h3>
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Test
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {mockTests.map(test => (
                            <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div>
                                <h4 className="font-medium text-gray-900">{test.title}</h4>
                                <p className="text-sm text-gray-500">
                                  {test.attempts} attempts • {test.avgScore}% average score
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'students' && (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-semibold">Student Management</h3>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Student
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {mockStudents.map(student => (
                            <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{student.name}</h4>
                                  <p className="text-sm text-gray-500">Last active: {student.lastActive}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <p className="text-sm font-medium text-gray-900">{student.progress}% Complete</p>
                                  <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-500 h-2 rounded-full" 
                                      style={{ width: `${student.progress}%` }}
                                    />
                                  </div>
                                </div>
                                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                                  <Eye className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}