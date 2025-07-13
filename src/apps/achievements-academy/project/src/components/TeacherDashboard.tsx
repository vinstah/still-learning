import React, { useState, useEffect } from 'react';
import { Users, BookOpen, TrendingUp, Award, Plus, Search, Filter, Brain, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';
import { StudentProgressSummary } from '../types';
import TeacherLessonView from './TeacherLessonView';
import { subjects, createYearLevels } from '../data/lessons';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const { progress, examScores } = useProgress();
  const [students, setStudents] = useState<StudentProgressSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [showLessonEditor, setShowLessonEditor] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [yearLevels] = useState(() => createYearLevels());

  // Mock student data - in real app, this would come from the database
  useEffect(() => {
    const mockStudents: StudentProgressSummary[] = [
      {
        studentId: '1',
        studentName: 'Emma Johnson',
        studentEmail: 'emma.j@email.com',
        totalLessonsCompleted: 15,
        totalExamsTaken: 3,
        averageExamScore: 85,
        lastActivity: '2024-01-15T10:30:00Z',
        subjectProgress: {
          mathematics: {
            lessonsCompleted: 8,
            totalLessons: 13,
            averageScore: 82,
            lastActivity: '2024-01-15T10:30:00Z'
          },
          english: {
            lessonsCompleted: 7,
            totalLessons: 13,
            averageScore: 88,
            lastActivity: '2024-01-14T14:20:00Z'
          }
        }
      },
      {
        studentId: '2',
        studentName: 'Liam Smith',
        studentEmail: 'liam.s@email.com',
        totalLessonsCompleted: 12,
        totalExamsTaken: 2,
        averageExamScore: 78,
        lastActivity: '2024-01-14T16:45:00Z',
        subjectProgress: {
          mathematics: {
            lessonsCompleted: 6,
            totalLessons: 13,
            averageScore: 75,
            lastActivity: '2024-01-14T16:45:00Z'
          },
          english: {
            lessonsCompleted: 6,
            totalLessons: 13,
            averageScore: 81,
            lastActivity: '2024-01-13T11:15:00Z'
          }
        }
      },
      {
        studentId: '3',
        studentName: 'Sophia Davis',
        studentEmail: 'sophia.d@email.com',
        totalLessonsCompleted: 20,
        totalExamsTaken: 4,
        averageExamScore: 92,
        lastActivity: '2024-01-15T09:15:00Z',
        subjectProgress: {
          mathematics: {
            lessonsCompleted: 11,
            totalLessons: 13,
            averageScore: 90,
            lastActivity: '2024-01-15T09:15:00Z'
          },
          english: {
            lessonsCompleted: 9,
            totalLessons: 13,
            averageScore: 94,
            lastActivity: '2024-01-14T13:30:00Z'
          }
        }
      }
    ];
    setStudents(mockStudents);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedSubject === 'all') return matchesSearch;
    
    return matchesSearch && student.subjectProgress[selectedSubject];
  });

  const handleEditLesson = (student: StudentProgressSummary, subjectId: string, yearLevel: number, lessonId: string) => {
    const lesson = yearLevels[subjectId]?.find(y => y.year === yearLevel)?.lessons.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson({ ...lesson, subjectId, yearLevel });
      setSelectedStudent(student.studentName);
      setShowLessonEditor(true);
    }
  };

  const handleSaveLesson = (updatedLesson: any) => {
    // In a real app, this would save to the database
    console.log('Saving lesson:', updatedLesson);
    setShowLessonEditor(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (showLessonEditor && selectedLesson) {
    return (
      <TeacherLessonView
        lesson={selectedLesson}
        subjectId={selectedLesson.subjectId}
        yearLevel={selectedLesson.yearLevel}
        studentName={selectedStudent}
        onBack={() => setShowLessonEditor(false)}
        onSaveLesson={handleSaveLesson}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
                <p className="text-gray-600">Monitor student progress and customize lessons</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 px-3 py-2 rounded-lg">
                <span className="text-green-800 font-medium">
                  {students.length} Students
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Lessons Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(students.reduce((sum, s) => sum + s.totalLessonsCompleted, 0) / students.length)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Exam Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(students.reduce((sum, s) => sum + s.averageExamScore, 0) / students.length)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Exams Taken</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.reduce((sum, s) => sum + s.totalExamsTaken, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Subjects</option>
                <option value="mathematics">Mathematics</option>
                <option value="english">English</option>
              </select>
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="space-y-6">
          {filteredStudents.map((student) => (
            <div key={student.studentId} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {student.studentName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{student.studentName}</h3>
                    <p className="text-gray-600">{student.studentEmail}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600">Last Activity</div>
                  <div className="font-medium text-gray-900">
                    {new Date(student.lastActivity).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {student.totalLessonsCompleted}
                  </div>
                  <div className="text-sm text-gray-600">Lessons Completed</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {student.totalExamsTaken}
                  </div>
                  <div className="text-sm text-gray-600">Exams Taken</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className={`text-2xl font-bold mb-1 ${getScoreColor(student.averageExamScore)}`}>
                    {student.averageExamScore}%
                  </div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </div>

              {/* Subject Progress */}
              <div className="space-y-4">
                {Object.entries(student.subjectProgress).map(([subjectId, progress]) => (
                  <div key={subjectId} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900 capitalize">
                          {subjectId === 'mathematics' ? 'Mathematics' : 'English'}
                        </span>
                        <span className="text-sm text-gray-600">
                          {progress.lessonsCompleted}/{progress.totalLessons} lessons
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`text-sm font-medium ${getScoreColor(progress.averageScore)}`}>
                          {progress.averageScore}% avg
                        </span>
                        <button
                          onClick={() => handleEditLesson(student, subjectId, 1, `${subjectId}-y1-l1`)}
                          className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-lg hover:bg-purple-200 transition-colors duration-200"
                        >
                          <Brain className="h-3 w-3" />
                          <span className="text-xs">Add Questions</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress.lessonsCompleted, progress.totalLessons)}`}
                        style={{ width: `${(progress.lessonsCompleted / progress.totalLessons) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                  <TrendingUp className="h-4 w-4" />
                  <span>View Detailed Progress</span>
                </button>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Edit className="h-4 w-4" />
                  <span>Customize Lessons</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'Try adjusting your search terms.' : 'No students have been assigned to you yet.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;