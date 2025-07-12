import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SpeakerButtonProps {
  text: string;
  className?: string;
}

export const SpeakerButton: React.FC<SpeakerButtonProps> = ({ text, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={handleSpeak}
      className={`
        p-2 rounded-full transition-all duration-200 
        hover:bg-primary-100 dark:hover:bg-primary-900
        focus:outline-none focus:ring-2 focus:ring-primary-500
        ${isPlaying ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}
        ${className}
      `}
      aria-label={isPlaying ? 'Stop narration' : 'Play narration'}
    >
      {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
};