import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subjects } from '../data/subjects';
import * as LucideIcons from 'lucide-react';
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Play
} from 'lucide-react';

interface SubjectModulesProps {
  onBack: () => void;
  onStartLesson: () => void;
}

export default function SubjectModules({ onBack, onStartLesson }: SubjectModulesProps) {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedLevel, setSelectedLevel] = useState(selectedSubject.levels[0]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const handleLevelChange = (direction: 'prev' | 'next') => {
    const currentIndex = selectedSubject.levels.indexOf(selectedLevel);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : selectedSubject.levels.length - 1;
    } else {
      newIndex = currentIndex < selectedSubject.levels.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedLevel(selectedSubject.levels[newIndex]);
    setCurrentLevelIndex(newIndex);
  };

  const mockContent = {
    lessons: [
      { id: 1, title: 'Introduction to Forces', duration: '15 min', difficulty: 'Beginner', completed: true },
      { id: 2, title: 'Balanced and Unbalanced Forces', duration: '20 min', difficulty: 'Intermediate', completed: false },
      { id: 3, title: 'Newton\'s Laws of Motion', duration: '25 min', difficulty: 'Advanced', completed: false },
    ],
    tests: [
      { id: 1, title: 'Forces Quiz', questions: 10, timeLimit: '15 min', attempts: 3 },
      { id: 2, title: 'Motion Assessment', questions: 15, timeLimit: '25 min', attempts: 2 },
    ],
    exams: [
      { id: 1, title: 'Physics Midterm', questions: 30, timeLimit: '60 min', weight: '30%' },
      { id: 2, title: 'Final Exam', questions: 50, timeLimit: '90 min', weight: '40%' },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700 mb-2 flex items-center transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Subject Modules</h1>
            <p className="text-gray-600">Explore courses, lessons, and assessments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Subject Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-4">Subjects</h3>
              <div className="space-y-2">
                {subjects.map(subject => {
                  const IconComponent = LucideIcons[subject.icon as keyof typeof LucideIcons];
                  const isSelected = selectedSubject.id === subject.id;
                  
                  return (
                    <button
                      key={subject.id}
                      onClick={() => {
                        setSelectedSubject(subject);
                        setSelectedLevel(subject.levels[0]);
                        setCurrentLevelIndex(0);
                      }}
                      className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                        isSelected 
                          ? 'bg-blue-100 text-blue-700 shadow-md' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${subject.color} flex items-center justify-center`}>
                        <IconComponent className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{subject.name}</p>
                        <p className="text-xs text-gray-500">{subject.levels.length} levels</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Level Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSubject.name}</h2>
                  <p className="text-gray-600">{selectedSubject.description}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLevelChange('prev')}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  
                  <div className="text-center min-w-[120px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedLevel}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-lg font-bold text-gray-900">{selectedLevel}</p>
                        <p className="text-sm text-gray-500">
                          {currentLevelIndex + 1} of {selectedSubject.levels.length}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  <button
                    onClick={() => handleLevelChange('next')}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLevel}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Lessons */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <BookOpen className="h-6 w-6 mr-2 text-blue-500" />
                      Lessons
                    </h3>
                    <span className="text-sm text-gray-500">{mockContent.lessons.length} lessons</span>
                  </div>
                  
                  <div className="space-y-4">
                    {mockContent.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            lesson.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {lesson.completed ? (
                              <span className="text-white text-sm">✓</span>
                            ) : (
                              <span className="text-gray-600 text-sm">{index + 1}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {lesson.duration}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {lesson.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={onStartLesson}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Play className="h-4 w-4" />
                          <span>Start</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tests */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <FileText className="h-6 w-6 mr-2 text-green-500" />
                      Tests & Quizzes
                    </h3>
                    <span className="text-sm text-gray-500">{mockContent.tests.length} assessments</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockContent.tests.map(test => (
                      <div key={test.id} className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-2">{test.title}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{test.questions} questions • {test.timeLimit}</p>
                          <p>{test.attempts} attempts remaining</p>
                        </div>
                        <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Take Test
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exams */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <GraduationCap className="h-6 w-6 mr-2 text-purple-500" />
                      Exams
                    </h3>
                    <span className="text-sm text-gray-500">{mockContent.exams.length} exams</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockContent.exams.map(exam => (
                      <div key={exam.id} className="p-4 bg-gray-50 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-2">{exam.title}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{exam.questions} questions • {exam.timeLimit}</p>
                          <p>Grade weight: {exam.weight}</p>
                        </div>
                        <button className="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                          Start Exam
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}