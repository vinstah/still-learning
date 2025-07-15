import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, BookOpen, Users, Award, Settings, Brain, Trophy, Target, Zap, Play, Clock, Star, CheckCircle, ArrowLeft, Search } from 'lucide-react';

interface HelpGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HelpSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: HelpItem[];
}

interface HelpItem {
  question: string;
  answer: string;
  steps?: string[];
  tips?: string[];
}

const HelpGuide: React.FC<HelpGuideProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('getting-started');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const helpSections: HelpSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      content: [
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple and free! Click the "Join the Quest!" button on the main page, then fill in your details.',
          steps: [
            'Click "Join the Quest!" or "Join Academy" button',
            'Enter your hero name (full name)',
            'Provide your magical email address',
            'Create a secret spell (password) - must be at least 6 characters',
            'Click "Begin Adventure" to create your account'
          ],
          tips: [
            'Use a valid email address for account recovery',
            'Choose a strong password to protect your progress',
            'Your hero name will be displayed throughout the academy'
          ]
        },
        {
          question: 'How do I choose my role?',
          answer: 'After creating your account, you\'ll be prompted to select your role in the academy.',
          steps: [
            'Select from Student, Teacher, Parent/Guardian, or Tutor',
            'Each role has different features and permissions',
            'Students can take lessons and exams',
            'Teachers can monitor progress and create custom questions',
            'Parents can track their child\'s progress',
            'Tutors can create lessons and track student progress'
          ],
          tips: [
            'You can change your role later in settings',
            'Choose the role that best describes how you\'ll use the platform'
          ]
        },
        {
          question: 'What subjects are available?',
          answer: 'Learning Quest Academy offers two main subject realms: Mathematics and English, each with 13 year levels.',
          steps: [
            'Mathematics Realm (🔢) - Numbers, calculations, and problem solving',
            'English Kingdom (📚) - Reading, writing, and language skills',
            'Each subject has Year 1-13 content',
            'Progress through levels by completing quests and boss battles'
          ]
        }
      ]
    },
    {
      id: 'navigation',
      title: 'Navigation & Interface',
      icon: Target,
      content: [
        {
          question: 'How do I navigate between subjects and levels?',
          answer: 'The academy uses a quest-based navigation system that\'s easy to follow.',
          steps: [
            'Start at the main dashboard showing both subject realms',
            'Click on a subject (Mathematics or English) to enter that realm',
            'Select a year level (1-13) to see available quests',
            'Click on individual quests to start learning',
            'Use the back buttons to return to previous screens'
          ],
          tips: [
            'Your progress is automatically saved',
            'Completed quests show a green checkmark',
            'Boss battles unlock after completing all quests in a level'
          ]
        },
        {
          question: 'What do the different icons and colors mean?',
          answer: 'The academy uses a color-coded system to help you understand your progress and quest difficulty.',
          steps: [
            '🟢 Green: Beginner/Easy quests (Shield icon)',
            '🟡 Yellow/Orange: Intermediate quests (Sword icon)',
            '🔴 Red: Advanced/Hard quests (Crown icon)',
            '✅ Green checkmark: Completed quests',
            '▶️ Play button: Available quests',
            '🏆 Trophy: Boss battles/Exams',
            '⭐ Stars: Quest ratings and achievements'
          ]
        },
        {
          question: 'How do I access my profile and settings?',
          answer: 'Your profile menu is located in the top-right corner of the screen.',
          steps: [
            'Click on your avatar/level badge in the top-right',
            'View your current level and title',
            'See your quest completion stats',
            'Access "My Achievements" to view earned trophies',
            'Open "Quest Settings" to customize your experience',
            'Use "Leave Academy" to sign out'
          ]
        }
      ]
    },
    {
      id: 'learning',
      title: 'Learning & Quests',
      icon: Play,
      content: [
        {
          question: 'How do I complete a learning quest?',
          answer: 'Each quest contains multiple steps including reading, interactive exercises, and questions.',
          steps: [
            'Click on a quest to start your adventure',
            'Read through learning scrolls (📖) carefully',
            'Complete interactive magic exercises (🎯)',
            'Answer challenge questions (🤔) by selecting the correct option',
            'Read explanations to understand why answers are correct',
            'Progress through all steps to complete the quest',
            'Click "Complete Quest" on the final step'
          ],
          tips: [
            'Take your time - understanding is more important than speed',
            'Read explanations even when you get questions right',
            'You can replay quests to reinforce learning'
          ]
        },
        {
          question: 'What are boss battles and how do I take them?',
          answer: 'Boss battles are comprehensive exams that test your mastery of an entire year level.',
          steps: [
            'Complete ALL quests in a year level first',
            'Click on the "Boss Battle" section in the sidebar',
            'Review the challenge details (number of questions, time limit)',
            'Click "Face the Boss!" to start the exam',
            'Answer all questions within the 60-minute time limit',
            'Submit your exam to see detailed results'
          ],
          tips: [
            'Boss battles are timed - manage your time wisely',
            'You can retake boss battles to improve your score',
            'Review quest content before attempting boss battles'
          ]
        },
        {
          question: 'How does the leveling system work?',
          answer: 'Your player level increases based on the number of quests you complete.',
          steps: [
            'Level 1 (Novice): 0-4 quests completed',
            'Level 2 (Apprentice): 5-9 quests completed',
            'Level 3 (Skilled Student): 10-14 quests completed',
            'Level 4 (Expert Learner): 15-19 quests completed',
            'Level 5 (Master Scholar): 20+ quests completed'
          ],
          tips: [
            'Higher levels unlock special titles and recognition',
            'Your level is displayed in your profile',
            'Leveling up shows your dedication to learning'
          ]
        }
      ]
    },
    {
      id: 'progress',
      title: 'Progress & Achievements',
      icon: Award,
      content: [
        {
          question: 'How do I track my learning progress?',
          answer: 'The academy provides multiple ways to monitor your learning journey.',
          steps: [
            'Dashboard shows overall progress across all subjects',
            'Subject pages display year-level completion percentages',
            'Year pages show individual quest completion status',
            'Progress bars indicate how much of each level you\'ve mastered',
            'Stats cards show total quests completed and boss battles won'
          ]
        },
        {
          question: 'What achievements can I earn?',
          answer: 'The academy rewards your dedication with various achievements and trophies.',
          steps: [
            '🎯 First Quest Complete: Complete your very first quest',
            '⚔️ Quest Master: Complete 5 learning quests',
            '⭐ Dedicated Scholar: Complete 10 learning quests',
            '👑 Academy Legend: Complete 20 learning quests',
            '🏆 Boss Challenger: Complete your first boss battle',
            '⚡ Boss Slayer: Complete 3 boss battles'
          ],
          tips: [
            'Achievements are permanent once earned',
            'Check your achievements in the profile menu',
            'Some achievements unlock special titles'
          ]
        },
        {
          question: 'Can I see detailed exam results?',
          answer: 'Yes! After completing a boss battle, you get comprehensive feedback.',
          steps: [
            'View your overall score and grade',
            'See how many questions you answered correctly',
            'Review each question with your answer highlighted',
            'Read explanations for all questions',
            'Identify areas for improvement',
            'Compare with previous attempts if you retake'
          ]
        }
      ]
    },
    {
      id: 'teacher-features',
      title: 'Teacher Features',
      icon: Users,
      content: [
        {
          question: 'How do I monitor student progress as a teacher?',
          answer: 'Teachers have access to a comprehensive dashboard showing all student activity.',
          steps: [
            'Access the Teacher Dashboard from your main screen',
            'View overview stats for all your students',
            'See individual student progress cards',
            'Monitor lessons completed and exam scores',
            'Track last activity dates for each student',
            'Filter students by subject or search by name'
          ]
        },
        {
          question: 'How do I create custom questions with AI?',
          answer: 'Teachers can use the AI Question Generator to create personalized content.',
          steps: [
            'Click "Add AI Questions" on any student\'s progress card',
            'Select the lesson you want to enhance',
            'Configure question settings (difficulty, count, focus area)',
            'Add custom instructions for specific topics',
            'Click "Generate Questions" to create AI content',
            'Review and select which questions to add',
            'Save the enhanced lesson for the student'
          ],
          tips: [
            'AI questions are tailored to the lesson content',
            'You can generate different difficulty levels',
            'Custom instructions help focus on specific learning goals'
          ]
        },
        {
          question: 'How do I edit existing lessons?',
          answer: 'Teachers can customize lesson content to better serve their students.',
          steps: [
            'Access a student\'s lesson through the Teacher Dashboard',
            'Click the edit icon on any lesson content item',
            'Modify text, questions, options, or explanations',
            'Add new content using the AI Question Generator',
            'Save changes to update the lesson',
            'Changes apply to the specific student\'s version'
          ]
        }
      ]
    },
    {
      id: 'settings',
      title: 'Settings & Customization',
      icon: Settings,
      content: [
        {
          question: 'How do I customize my learning experience?',
          answer: 'The Quest Settings allow you to personalize your academy experience.',
          steps: [
            'Click your profile avatar and select "Quest Settings"',
            'Toggle sound effects on/off',
            'Enable/disable auto-advance for lessons',
            'Control hint visibility during quests',
            'Set up notification preferences',
            'Adjust daily quest reminders',
            'Configure achievement notifications'
          ]
        },
        {
          question: 'How do I change my role or account information?',
          answer: 'You can update your account details through the settings menu.',
          steps: [
            'Access Quest Settings from your profile menu',
            'View your current account information',
            'Contact support to change your role if needed',
            'Update notification preferences',
            'Manage your learning preferences'
          ],
          tips: [
            'Role changes may require administrator approval',
            'Your progress is preserved when changing roles',
            'Some features are role-specific'
          ]
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: Zap,
      content: [
        {
          question: 'My progress isn\'t saving. What should I do?',
          answer: 'Progress saving issues are usually related to internet connectivity or browser settings.',
          steps: [
            'Check your internet connection',
            'Refresh the page and try again',
            'Clear your browser cache and cookies',
            'Disable browser extensions that might interfere',
            'Try using a different browser',
            'Contact support if the issue persists'
          ]
        },
        {
          question: 'I can\'t access boss battles. Why?',
          answer: 'Boss battles are only available after completing all quests in a year level.',
          steps: [
            'Check that you\'ve completed ALL quests in the year level',
            'Look for any quests without green checkmarks',
            'Complete any remaining quests',
            'The boss battle will automatically unlock',
            'Refresh the page if it doesn\'t appear immediately'
          ]
        },
        {
          question: 'The app is running slowly. How can I fix this?',
          answer: 'Performance issues can usually be resolved with these steps.',
          steps: [
            'Close other browser tabs and applications',
            'Clear your browser cache',
            'Restart your browser',
            'Check your internet speed',
            'Try using a different browser',
            'Restart your device if necessary'
          ]
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Password reset functionality will be available on the login screen.',
          steps: [
            'Click "Leave Academy" to sign out',
            'On the login screen, look for "Forgot Password"',
            'Enter your email address',
            'Check your email for reset instructions',
            'Follow the link to create a new password',
            'Sign in with your new password'
          ]
        }
      ]
    }
  ];

  const toggleItem = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const filteredSections = helpSections.map(section => ({
    ...section,
    content: section.content.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.content.length > 0);

  const activeContent = helpSections.find(section => section.id === activeSection);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] border-2 sm:border-4 border-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-8 border-b-2 sm:border-b-4 border-white border-opacity-50 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl sm:rounded-t-2xl flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <BookOpen className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-3xl font-bold text-white drop-shadow-lg">📚 Academy Help Guide</h2>
              <p className="text-white text-opacity-90 font-medium text-xs sm:text-base">Master your learning adventure</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
          >
            <X className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 border-r-2 sm:border-r-4 border-white border-opacity-50 bg-white bg-opacity-30 flex flex-col">
            {/* Search */}
            <div className="p-3 sm:p-6 border-b border-white border-opacity-50">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search help topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-2 sm:p-4">
              <nav className="space-y-1 sm:space-y-2">
                {(searchTerm ? filteredSections : helpSections).map((section) => {
                  const IconComponent = section.icon;
                  const isActive = section.id === activeSection;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`
                        w-full text-left p-2 sm:p-4 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center space-x-2 sm:space-x-3
                        ${isActive 
                          ? 'bg-white bg-opacity-80 text-blue-700 shadow-lg border-2 border-blue-300' 
                          : 'text-gray-700 hover:bg-white hover:bg-opacity-50 border-2 border-transparent'
                        }
                      `}
                    >
                      <IconComponent className="h-3 w-3 sm:h-5 sm:w-5 flex-shrink-0" />
                      <span className="font-medium text-xs sm:text-sm">{section.title}</span>
                      {searchTerm && (
                        <span className="ml-auto bg-blue-100 text-blue-700 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs font-bold">
                          {section.content.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            {activeContent && (
              <div>
                <div className="flex items-center space-x-2 sm:space-x-4 mb-4 sm:mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 sm:p-4 rounded-lg sm:rounded-2xl shadow-lg">
                    <activeContent.icon className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-3xl font-bold text-gray-800">{activeContent.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{activeContent.content.length} help topics</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-6">
                  {activeContent.content.map((item, index) => {
                    const itemId = `${activeSection}-${index}`;
                    const isExpanded = expandedItems.has(itemId);
                    
                    return (
                      <div key={itemId} className="bg-white bg-opacity-70 rounded-xl sm:rounded-2xl border-2 sm:border-4 border-white shadow-lg">
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full text-left p-3 sm:p-6 flex items-center justify-between hover:bg-white hover:bg-opacity-50 transition-colors duration-200 rounded-xl sm:rounded-2xl"
                        >
                          <h4 className="text-sm sm:text-lg font-bold text-gray-800 pr-2">{item.question}</h4>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 flex-shrink-0" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <div className="px-3 sm:px-6 pb-3 sm:pb-6 border-t border-white border-opacity-50">
                            <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-base font-medium leading-relaxed">
                              {item.answer}
                            </p>
                            
                            {item.steps && (
                              <div className="mb-3 sm:mb-4">
                                <h5 className="font-bold text-gray-800 mb-2 sm:mb-3 text-xs sm:text-sm">📋 Step-by-step:</h5>
                                <ol className="space-y-1 sm:space-y-2">
                                  {item.steps.map((step, stepIndex) => (
                                    <li key={stepIndex} className="flex items-start space-x-2 sm:space-x-3">
                                      <span className="bg-blue-500 text-white w-4 h-4 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                        {stepIndex + 1}
                                      </span>
                                      <span className="text-gray-700 text-xs sm:text-sm font-medium">{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            )}
                            
                            {item.tips && (
                              <div className="bg-yellow-50 border border-yellow-200 sm:border-2 rounded-lg sm:rounded-xl p-2 sm:p-4">
                                <h5 className="font-bold text-yellow-800 mb-1 sm:mb-2 text-xs sm:text-sm flex items-center">
                                  💡 Pro Tips:
                                </h5>
                                <ul className="space-y-1">
                                  {item.tips.map((tip, tipIndex) => (
                                    <li key={tipIndex} className="flex items-start space-x-1 sm:space-x-2">
                                      <span className="text-yellow-600 text-xs">•</span>
                                      <span className="text-yellow-800 text-xs sm:text-sm font-medium">{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {searchTerm && activeContent.content.length === 0 && (
                  <div className="text-center py-8 sm:py-12">
                    <div className="bg-gray-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Search className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">No results found</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Try searching with different keywords or browse the categories.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-t-2 sm:border-t-4 border-white border-opacity-50 bg-white bg-opacity-30">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-gray-700 font-medium text-xs sm:text-sm">
                🎓 Need more help? Contact our support team for personalized assistance!
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 border border-blue-400 sm:border-2 text-xs sm:text-sm"
            >
              ✨ Start Learning!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpGuide;