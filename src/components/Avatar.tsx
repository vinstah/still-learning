import React from 'react';

interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 48, className = '' }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&rounded=true&size=${size}`;
  
  return (
    <img
      src={avatarUrl}
      alt={`Avatar for ${name}`}
      className={`rounded-full border-2 border-primary-300 ${className}`}
      width={size}
      height={size}
    />
  );
};