import React from 'react';
import { User, Trophy, Zap, Settings, Camera } from 'lucide-react';
import { Player } from '../types/game';

interface GameHeaderProps {
  player: Player;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenCharacterCreator: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  player,
  onOpenProfile,
  onOpenSettings,
  onOpenCharacterCreator
}) => {
  const xpToNextLevel = 100;
  const xpProgress = (player.xp % 100) / 100 * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            {player.customAvatar ? (
              <img
                src={player.customAvatar}
                alt={player.name}
                className="w-12 h-12 rounded-full object-cover shadow-lg transform hover:scale-110 transition-transform cursor-pointer border-2 border-white/30"
                onClick={onOpenProfile}
              />
            ) : (
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg transform hover:scale-110 transition-transform cursor-pointer border-2 border-white/30"
                style={{ backgroundColor: player.characterStyle.skinTone }}
                onClick={onOpenProfile}
              >
                {player.characterStyle.outfit}
              </div>
            )}
            <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            
            {/* Character Creator Button */}
            <button
              onClick={onOpenCharacterCreator}
              className="absolute -bottom-1 -left-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors shadow-lg opacity-0 group-hover:opacity-100"
            >
              <Camera className="w-3 h-3 text-white" />
            </button>
          </div>
          
          <div className="text-white">
            <h2 className="font-bold text-lg">{player.name}</h2>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-sm">Level {player.level}</span>
            </div>
          </div>

          <div className="bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-medium">{player.badges.length} Badges</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-white/20 rounded-full px-6 py-2 backdrop-blur-sm">
            <div className="text-white text-sm font-medium mb-1">XP: {player.xp}</div>
            <div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={onOpenSettings}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};