import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { SpeakerButton } from './SpeakerButton';

interface LessonSlideProps {
  slide: {
    id: number;
    title: string;
    content: string;
    image?: string;
    story?: string;
    concept: string;
  };
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrevious: () => void;
  isDark: boolean;
}

export const LessonSlide: React.FC<LessonSlideProps> = ({
  slide,
  currentSlide,
  totalSlides,
  onNext,
  onPrevious,
  isDark
}) => {
  return (
    <div className={`
      max-w-4xl mx-auto p-6 rounded-2xl shadow-lg transition-all duration-300
      ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {slide.title}
          </h2>
          <SpeakerButton text={`${slide.title}. ${slide.content}. ${slide.story || ''}`} />
        </div>
        <div className={`text-sm px-3 py-1 rounded-full ${
          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
        }`}>
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>

      {/* Content Area */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Visual Content */}
        <div className="space-y-4">
          {slide.image && (
            <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="text-6xl">${slide.concept}</div>
                  `;
                }}
              />
            </div>
          )}
          
          {/* Real-world Story */}
          {slide.story && (
            <div className={`
              p-4 rounded-lg border-l-4 border-blue-500
              ${isDark ? 'bg-gray-700' : 'bg-blue-50'}
            `}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                Real-World Connection
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {slide.story}
              </p>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <div className={`
            p-4 rounded-lg
            ${isDark ? 'bg-gray-700' : 'bg-gray-50'}
          `}>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {slide.content}
            </p>
          </div>

          {/* Key Concept */}
          <div className={`
            p-4 rounded-lg border-l-4 border-green-500
            ${isDark ? 'bg-gray-700' : 'bg-green-50'}
          `}>
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-green-300' : 'text-green-800'}`}>
              Key Concept
            </h4>
            <p className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {slide.concept}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
            ${currentSlide === 0
              ? 'opacity-50 cursor-not-allowed'
              : isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }
          `}
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </button>

        <div className="flex space-x-2">
          {Array.from({ length: totalSlides }, (_, i) => (
            <div
              key={i}
              className={`
                w-3 h-3 rounded-full transition-all duration-200
                ${i === currentSlide
                  ? 'bg-primary-500 scale-125'
                  : isDark
                    ? 'bg-gray-600'
                    : 'bg-gray-300'
                }
              `}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
            ${currentSlide === totalSlides - 1
              ? 'opacity-50 cursor-not-allowed'
              : 'bg-primary-500 hover:bg-primary-600 text-white'
            }
          `}
        >
          <span>Next</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};