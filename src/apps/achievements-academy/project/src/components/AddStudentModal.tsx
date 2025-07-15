import React, { useState } from 'react';
import { X, UserPlus, Search, AlertCircle, CheckCircle, Plus, User } from 'lucide-react';
import { teacherService } from '../services/teacherService';
import { useAuth } from '../contexts/AuthContext';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentAdded: () => void;
}

interface StudentSearchResult {
  id: string;
  fullName: string | null;
  email: string;
}

interface NewStudentForm {
  fullName: string;
  email: string;
  grade: string;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onStudentAdded
}) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<StudentSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'create'>('search');
  const [newStudentForm, setNewStudentForm] = useState<NewStudentForm>({
    fullName: '',
    email: '',
    grade: '1'
  });
  const [creatingStudent, setCreatingStudent] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim() || !user) return;

    setSearching(true);
    setMessage(null);

    try {
      // Check if we should use mock data
      const useMockData = import.meta.env.VITE_USE_MOCK_STUDENTS === 'true';
      
      if (useMockData) {
        // In mock mode, simulate a search with the existing mock students
        const mockStudents = [
          { id: '1', fullName: 'Emma Johnson', email: 'emma.j@email.com' },
          { id: '2', fullName: 'Liam Smith', email: 'liam.s@email.com' },
          { id: '3', fullName: 'Sophia Davis', email: 'sophia.d@email.com' }
        ];
        
        const filteredResults = mockStudents.filter(student => 
          student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredResults);
        setSearching(false);
        return;
      }

      // In a real app, this would search the database for users
      // For now, we'll show a message that this feature requires real data
      setMessage({ 
        type: 'error', 
        text: 'Student search requires real database connection. Enable mock mode or set up your database.' 
      });
      setSearchResults([]);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to search for students' });
    } finally {
      setSearching(false);
    }
  };

  const handleAddStudent = async (studentId: string, studentName: string) => {
    if (!user) return;

    setLoading(true);
    setMessage(null);

    try {
      // Check if we should use mock data
      const useMockData = import.meta.env.VITE_USE_MOCK_STUDENTS === 'true';
      
      if (useMockData) {
        // Simulate successful connection request in mock mode
        setTimeout(() => {
          setMessage({ 
            type: 'success', 
            text: `Connection request sent to ${studentName} (Mock Mode)` 
          });
          onStudentAdded();
          
          // Clear search after successful request
          setTimeout(() => {
            setSearchTerm('');
            setSearchResults([]);
            setMessage(null);
          }, 2000);
        }, 1000);
        return;
      }

      await teacherService.sendConnectionRequest(user.id, studentId, 'teacher');
      setMessage({ 
        type: 'success', 
        text: `Connection request sent to ${studentName}` 
      });
      onStudentAdded();
      
      // Clear search after successful request
      setTimeout(() => {
        setSearchTerm('');
        setSearchResults([]);
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to send connection request' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async () => {
    if (!user || !newStudentForm.fullName || !newStudentForm.email) return;

    setCreatingStudent(true);
    setMessage(null);

    try {
      // Check if we should use mock data
      const useMockData = import.meta.env.VITE_USE_MOCK_STUDENTS === 'true';
      
      if (useMockData) {
        // Simulate successful student creation in mock mode
        setTimeout(() => {
          setMessage({ 
            type: 'success', 
            text: `Student ${newStudentForm.fullName} created successfully (Mock Mode)` 
          });
          onStudentAdded();
          
          // Reset form after successful creation
          setTimeout(() => {
            setNewStudentForm({ fullName: '', email: '', grade: '1' });
            setMessage(null);
          }, 2000);
        }, 1000);
        return;
      }

      // In a real app, this would create a new user account and profile
      // For now, we'll simulate the creation
      setMessage({ 
        type: 'success', 
        text: `Student ${newStudentForm.fullName} created successfully` 
      });
      onStudentAdded();
      
      // Reset form after successful creation
      setTimeout(() => {
        setNewStudentForm({ fullName: '', email: '', grade: '1' });
        setMessage(null);
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to create student' 
      });
    } finally {
      setCreatingStudent(false);
    }
  };

  const handleFormChange = (field: keyof NewStudentForm, value: string) => {
    setNewStudentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <UserPlus className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add Student</h2>
              <p className="text-sm text-gray-600">Search and connect with students</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'search'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Search className="h-4 w-4" />
              <span className="text-sm font-medium">Search Students</span>
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === 'create'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Create Student</span>
            </button>
          </div>

          {/* Search Tab */}
          {activeTab === 'search' && (
            <div>
              <div className="mb-6">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={searching || !searchTerm.trim()}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {searching ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </div>
              )}

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Search Results</h3>
                  {searchResults.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{student.fullName}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                      <button
                        onClick={() => handleAddStudent(student.id, student.fullName || 'Student')}
                        disabled={loading}
                        className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
                      >
                        {loading ? 'Adding...' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchTerm && !searching && searchResults.length === 0 && (
                <div className="text-center py-8">
                  <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-600">No students found</p>
                  <p className="text-sm text-gray-500 mt-1">Try a different search term</p>
                </div>
              )}

              {/* Instructions */}
              {!searchTerm && searchResults.length === 0 && (
                <div className="text-center py-8">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <UserPlus className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-gray-600 mb-2">Search for students to add</p>
                  <p className="text-sm text-gray-500">
                    {import.meta.env.VITE_USE_MOCK_STUDENTS === 'true' 
                      ? 'Enter a student name or email to search (Mock Mode)'
                      : 'Enter a student name or email to search (requires database setup)'
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Create Tab */}
          {activeTab === 'create' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Student</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newStudentForm.fullName}
                      onChange={(e) => handleFormChange('fullName', e.target.value)}
                      placeholder="Enter student's full name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newStudentForm.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      placeholder="Enter student's email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade Level
                    </label>
                    <select
                      value={newStudentForm.grade}
                      onChange={(e) => handleFormChange('grade', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="1">Grade 1</option>
                      <option value="2">Grade 2</option>
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </div>
              )}

              {/* Create Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleCreateStudent}
                  disabled={creatingStudent || !newStudentForm.fullName || !newStudentForm.email}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {creatingStudent ? 'Creating...' : 'Create Student'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}; 