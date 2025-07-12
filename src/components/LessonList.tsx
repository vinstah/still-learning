import React from 'react';
import { BookOpen, Clock, Star, Play, CheckCircle } from 'lucide-react';
import { Lesson } from '../data/lessons';

interface LessonListProps {
  lessons: Lesson[];
  completedLessons: string[];
  onSelectLesson: (lessonId: string) => void;
  isDark: boolean;
}

export const LessonList: React.FC<LessonListProps> = ({
  lessons,
  completedLessons,
  onSelectLesson,
  isDark
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Physics Lessons
      </h2>
      
      <div className="grid gap-4">
        {lessons.map((lesson) => {
          const isCompleted = completedLessons.includes(lesson.id);
          
          return (
            <div
              key={lesson.id}
              className={`
                p-6 rounded-2xl border transition-all duration-200 cursor-pointer hover:scale-[1.02]
                ${isDark 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                  : 'bg-white border-gray-200 hover:shadow-lg'
                }
                ${isCompleted ? 'ring-2 ring-green-500' : ''}
              `}
              onClick={() => onSelectLesson(lesson.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`
                    p-3 rounded-full
                    ${isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isDark 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {isCompleted ? <CheckCircle size={24} /> : <BookOpen size={24} />}
                  </div>
                  <div>
                    <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {lesson.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {lesson.topic}
                    </p>
                  </div>
                </div>
                
                <button className={`
                  p-2 rounded-full transition-colors
                  ${isDark 
                    ? 'bg-primary-600 hover:bg-primary-700 text-white' 
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                  }
                `}>
                  <Play size={16} />
                </button>
              </div>
              
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {lesson.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium capitalize
                    ${getDifficultyColor(lesson.difficulty)}
                  `}>
                    {lesson.difficulty}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    <Clock size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {lesson.estimatedTime} min
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Star size={14} className={isDark ? 'text-gray-400' : 'text-gray-600'} />
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {lesson.slides.length} slides
                    </span>
                  </div>
                </div>
                
                {isCompleted && (
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    Completed ✓
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};