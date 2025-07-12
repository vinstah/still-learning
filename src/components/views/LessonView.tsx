import React from 'react';
import { LessonSlide } from '../LessonSlide';
import { Lesson } from '../../types/lesson';

interface LessonViewProps {
  lesson: Lesson;
  currentSlideIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  isDark: boolean;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  currentSlideIndex,
  onNext,
  onPrevious,
  isDark
}) => {
  return (
    <LessonSlide
      slide={lesson.slides[currentSlideIndex]}
      currentSlide={currentSlideIndex}
      totalSlides={lesson.slides.length}
      onNext={onNext}
      onPrevious={onPrevious}
      isDark={isDark}
    />
  );
};