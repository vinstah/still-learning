import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, Play, MessageCircle, UserPlus } from 'lucide-react';
import { Player, Battle } from '../types/game';

interface MultiplayerLobbyProps {
  currentPlayer: Player;
  onlineUsers: Player[];
  activeBattles: Battle[];
  onJoinBattle: (battleId: string) => void;
  onCreateBattle: () => void;
  onInviteFriend: (playerId: string) => void;
}

export const MultiplayerLobby: React.FC<MultiplayerLobbyProps> = ({
  currentPlayer,
  onlineUsers,
  activeBattles,
  onJoinBattle,
  onCreateBattle,
  onInviteFriend
}) => {
  const [selectedTab, setSelectedTab] = useState<'battles' | 'friends'>('battles');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">Multiplayer Arena</h1>
          <p className="text-purple-200 text-xl">Challenge friends and compete in learning battles!</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{onlineUsers.length}</div>
            <div className="text-purple-200">Players Online</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{currentPlayer.level}</div>
            <div className="text-purple-200">Your Level</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <Play className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{activeBattles.length}</div>
            <div className="text-purple-200">Active Battles</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex space-x-2">
            <button
              onClick={() => setSelectedTab('battles')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedTab === 'battles'
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Battle Arena
            </button>
            <button
              onClick={() => setSelectedTab('friends')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedTab === 'friends'
                  ? 'bg-white text-purple-900 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Friends
            </button>
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'battles' && (
          <div className="space-y-6">
            {/* Create Battle Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCreateBattle}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
              >
                Create New Battle
              </motion.button>
            </div>

            {/* Active Battles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeBattles.map((battle) => (
                <motion.div
                  key={battle.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Play className="w-5 h-5 text-green-400" />
                      <span className="text-white font-semibold">Battle {battle.id.slice(0, 6)}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      battle.status === 'waiting' ? 'bg-yellow-500/20 text-yellow-300' :
                      battle.status === 'active' ? 'bg-green-500/20 text-green-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {battle.status}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-purple-200 text-sm mb-2">Players ({battle.players.length}/4)</div>
                    <div className="flex space-x-2">
                      {battle.players.map((player) => (
                        <div
                          key={player.id}
                          className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                          title={player.name}
                        >
                          {player.avatar}
                        </div>
                      ))}
                    </div>
                  </div>

                  {battle.status === 'waiting' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onJoinBattle(battle.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-shadow"
                    >
                      Join Battle
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'friends' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onlineUsers.filter(user => user.id !== currentPlayer.id).map((user) => (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {user.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                    <div className="text-purple-200 text-sm">Level {user.level}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onInviteFriend(user.id)}
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 px-4 rounded-xl font-semibold text-sm flex items-center justify-center space-x-1"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Invite</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/20 text-white py-2 px-4 rounded-xl font-semibold text-sm flex items-center justify-center space-x-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};