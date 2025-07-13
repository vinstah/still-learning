import React, { useState, useEffect } from 'react';
import { Plus, Play, Pause, RotateCcw, Book, Calculator, FlaskConical, MessageCircle, Calendar, Target, Brain, CheckCircle, Clock } from 'lucide-react';

import chunked from './chunks';
const FocusLearningApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [studyTimer, setStudyTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentSubject, setCurrentSubject] = useState('');
  const [studySessions, setStudySessions] = useState([]);
  const [chunks, setChunks] = useState(chunked);
  const [currentTest, setCurrentTest] = useState(null);
  const [testAnswers, setTestAnswers] = useState([]);
  const [showTestResults, setShowTestResults] = useState(false);
  const [testScore, setTestScore] = useState(0);

  const startTest = (subject, chunkId) => {
    const chunk = chunks[subject]?.find(c => c.id === chunkId);
    if (chunk && chunk.test) {
      setCurrentTest({ subject, chunkId, chunk });
      setTestAnswers(new Array(chunk.test.questions.length).fill(null));
      setShowTestResults(false);
    }
  };

  const submitTest = () => {
    if (!currentTest) return;
    
    const { subject, chunkId, chunk } = currentTest;
    const questions = chunk.test.questions;
    let correctAnswers = 0;
    
    testAnswers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / questions.length) * 100);
    setTestScore(score);
    
    // Add score to chunk
    setChunks(prev => ({
      ...prev,
      [subject]: prev[subject]?.map(c => 
        c.id === chunkId 
          ? { ...c, scores: [...(c.scores || []), score] }
          : c
      ) || []
    }));
    
    setShowTestResults(true);
  };

  const closeTest = () => {
    setCurrentTest(null);
    setTestAnswers([]);
    setShowTestResults(false);
    setTestScore(0);
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && studyTimer > 0) {
      interval = setInterval(() => {
        setStudyTimer(timer => timer - 1);
      }, 1000);
    } else if (studyTimer === 0) {
      setIsTimerRunning(false);
      // Session completed
      if (currentSubject) {
        const newSession = {
          id: Date.now(),
          subject: currentSubject,
          date: new Date().toISOString().split('T')[0],
          duration: 25,
          completed: true
        };
        setStudySessions(prev => [...prev, newSession]);
      }
      setStudyTimer(25 * 60); // Reset timer
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, studyTimer, currentSubject]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const subjects = [
    { name: 'literacy', icon: Book, color: 'bg-blue-500', label: 'Literacy' },
    { name: 'mathematics', icon: Calculator, color: 'bg-green-500', label: 'Mathematics' },
    { name: 'science', icon: FlaskConical, color: 'bg-purple-500', label: 'Science' },
    { name: 'communications', icon: MessageCircle, color: 'bg-orange-500', label: 'Communications' },
    { name: 'mechanics', icon: Target, color: 'bg-red-500', label: 'Mechanics' },
    { name: 'mechanics_materials', icon: Brain, color: 'bg-indigo-500', label: 'Mechanics of Materials' }
  ];

  const addChunk = (subject, title, content) => {
    const newChunk = {
      id: Date.now(),
      title,
      content,
      created: new Date().toISOString().split('T')[0],
      reviewCount: 0,
      nextReview: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      mastered: false,
      scores: []
    };
    setChunks(prev => ({
      ...prev,
      [subject]: [...(prev[subject] || []), newChunk]
    }));
  };

  const markChunkReviewed = (subject, chunkId) => {
    setChunks(prev => ({
      ...prev,
      [subject]: (prev[subject] || []).map(chunk => {
        if (chunk.id === chunkId) {
          const reviewCount = chunk.reviewCount + 1;
          let nextReviewDays = 1;
          
          // Spaced repetition intervals
          if (reviewCount === 1) nextReviewDays = 3;
          else if (reviewCount === 2) nextReviewDays = 7;
          else if (reviewCount === 3) nextReviewDays = 14;
          else if (reviewCount >= 4) nextReviewDays = 30;
          
          return {
            ...chunk,
            reviewCount,
            nextReview: new Date(Date.now() + nextReviewDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            mastered: reviewCount >= 4
          };
        }
        return chunk;
      })
    }));
  };

  const getTodayReviews = () => {
    const today = new Date().toISOString().split('T')[0];
    const reviews = [];
    
    Object.entries(chunks).forEach(([subject, subjectChunks]) => {
      if (subjectChunks) {
        subjectChunks.forEach(chunk => {
          if (chunk.nextReview <= today && !chunk.mastered) {
            reviews.push({ ...chunk, subject });
          }
        });
      }
    });
    
    return reviews;
  };

  const getWeeklyProgress = () => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return studySessions.filter(session => session.date >= weekAgo);
  };

  const TestInterface = () => {
    if (!currentTest) return null;
    
    const { chunk } = currentTest;
    const questions = chunk.test.questions;
    
    if (showTestResults) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Test Results</h2>
            <div className="text-center mb-6">
              <div className={`text-4xl font-bold mb-2 ${testScore >= 80 ? 'text-green-600' : testScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {testScore}%
              </div>
              <p className="text-gray-600">
                {testScore >= 80 ? 'Excellent work!' : testScore >= 60 ? 'Good effort!' : 'Keep practicing!'}
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              {questions.map((q, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium mb-2">{q.question}</p>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      testAnswers[index] === q.correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {testAnswers[index] === q.correct ? 'Correct' : 'Incorrect'}
                    </span>
                    <span className="text-sm text-gray-600">
                      Correct: {q.options[q.correct]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{q.explanation}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeTest}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg max-w-2xl w-full mx-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Test: {chunk.title}</h2>
            <button
              onClick={closeTest}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-6">
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium mb-4">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        value={oIndex}
                        checked={testAnswers[qIndex] === oIndex}
                        onChange={() => {
                          const newAnswers = [...testAnswers];
                          newAnswers[qIndex] = oIndex;
                          setTestAnswers(newAnswers);
                        }}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={closeTest}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={submitTest}
              disabled={testAnswers.some(answer => answer === null)}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
            >
              Submit Test
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DashboardView = () => {
    const todayReviews = getTodayReviews();
    const weeklyProgress = getWeeklyProgress();
    const totalChunks = Object.values(chunks).flat().length;
    const masteredChunks = Object.values(chunks).flat().filter(chunk => chunk.mastered).length;
    const masteryRate = totalChunks > 0 ? Math.round((masteredChunks / totalChunks) * 100) : 0;

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mastery Rate</p>
                <p className="text-2xl font-bold text-green-600">{masteryRate}%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due Reviews</p>
                <p className="text-2xl font-bold text-blue-600">{todayReviews.length}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Sessions</p>
                <p className="text-2xl font-bold text-purple-600">{weeklyProgress.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Study Timer
          </h3>
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-gray-800 mb-4">
              {formatTime(studyTimer)}
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              <select 
                value={currentSubject} 
                onChange={(e) => setCurrentSubject(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.name} value={subject.name}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                disabled={!currentSubject}
                className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
              >
                {isTimerRunning ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                {isTimerRunning ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => {
                  setStudyTimer(25 * 60);
                  setIsTimerRunning(false);
                }}
                className="flex items-center px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {todayReviews.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Today's Reviews</h3>
            <div className="space-y-3">
              {todayReviews.map(review => (
                <div key={review.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{review.title}</p>
                    <p className="text-sm text-gray-600 capitalize">{review.subject} • Review #{review.reviewCount + 1}</p>
                  </div>
                  <button
                    onClick={() => markChunkReviewed(review.subject, review.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Mark Reviewed
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const SubjectView = ({ subject }) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newChunkTitle, setNewChunkTitle] = useState('');
    const [newChunkContent, setNewChunkContent] = useState('');
    
    const subjectChunks = chunks[subject.name] || [];
    const subjectIcon = subject.icon;

    const handleAddChunk = () => {
      if (newChunkTitle.trim() && newChunkContent.trim()) {
        addChunk(subject.name, newChunkTitle, newChunkContent);
        setNewChunkTitle('');
        setNewChunkContent('');
        setShowAddForm(false);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center">
            <subjectIcon className="h-8 w-8 mr-3" />
            {subject.label}
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Chunk
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Add New Learning Chunk</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Chunk title (e.g., 'Quadratic Formula')"
                value={newChunkTitle}
                onChange={(e) => setNewChunkTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder="Chunk content (keep it focused - 150-200 words max)"
                value={newChunkContent}
                onChange={(e) => setNewChunkContent(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleAddChunk}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Add Chunk
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjectChunks.map(chunk => (
            <div key={chunk.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{chunk.title}</h3>
                {chunk.mastered && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
              <p className="text-gray-600 mb-4 text-sm">{chunk.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>Reviews: {chunk.reviewCount}</span>
                <span>Next: {chunk.nextReview}</span>
              </div>
              
              {chunk.scores && chunk.scores.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-700 mb-1">Test Scores:</p>
                  <div className="flex flex-wrap gap-2">
                    {chunk.scores.map((score, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs ${
                          score >= 80 ? 'bg-green-100 text-green-800' : 
                          score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {score}%
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Average: {Math.round(chunk.scores.reduce((a, b) => a + b, 0) / chunk.scores.length)}%
                  </p>
                </div>
              )}
              
              <div className="flex space-x-2">
                {chunk.test && (
                  <button
                    onClick={() => startTest(subject.name, chunk.id)}
                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                  >
                    Take Test
                  </button>
                )}
                {chunk.nextReview <= new Date().toISOString().split('T')[0] && !chunk.mastered && (
                  <button
                    onClick={() => markChunkReviewed(subject.name, chunk.id)}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                  >
                    Review Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {subjectChunks.length === 0 && (
          <div className="text-center py-12">
            <subjectIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No chunks added yet. Create your first learning chunk!</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">FOCUS Learning System</h1>
            </div>
            <div className="text-sm text-gray-500">
              Neurodivergent-Optimized Study App
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'dashboard' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Dashboard
          </button>
          {subjects.map(subject => (
            <button
              key={subject.name}
              onClick={() => setActiveTab(subject.name)}
              className={`px-4 py-2 rounded-lg flex items-center ${
                activeTab === subject.name 
                  ? `${subject.color} text-white` 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <subject.icon className="h-4 w-4 mr-2" />
              {subject.label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && <DashboardView />}
        {subjects.map(subject => (
          activeTab === subject.name && (
            <SubjectView key={subject.name} subject={subject} />
          )
        ))}
        
        <TestInterface />
      </div>
    </div>
  );
};

export default FocusLearningApp;