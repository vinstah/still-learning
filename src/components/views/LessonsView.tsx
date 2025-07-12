import React from 'react';
import { LessonList } from '../LessonList';
import { Lesson } from '../../types/lesson';

interface LessonsViewProps {
  lessons: Lesson[];
  completedLessons: string[];
  onSelectLesson: (lessonId: string) => void;
  isDark: boolean;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  lessons,
  completedLessons,
  onSelectLesson,
  isDark
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <LessonList
        lessons={lessons}
        completedLessons={completedLessons}
        onSelectLesson={onSelectLesson}
        isDark={isDark}
      />
    </div>
  );
};