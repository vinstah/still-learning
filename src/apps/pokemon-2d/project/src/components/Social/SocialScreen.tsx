import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, MessageCircle, Trophy, Search, Crown, Medal, Award } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

const SocialScreen: React.FC = () => {
  const { user } = useGameStore();
  const [activeTab, setActiveTab] = useState<'friends' | 'leaderboard' | 'find'>('friends');

  const friends = [
    {
      id: '1',
      username: 'AlexLearner',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      level: 15,
      status: 'online',
      lastActivity: 'Completed Math Quiz - 2m ago',
      streak: 12
    },
    {
      id: '2',
      username: 'SarahStudy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      level: 22,
      status: 'offline',
      lastActivity: 'Helped 3 friends - 1h ago',
      streak: 25
    },
    {
      id: '3',
      username: 'MikeQuiz',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      level: 8,
      status: 'online',
      lastActivity: 'Started Science Challenge - 5m ago',
      streak: 7
    }
  ];

  const leaderboard = [
    {
      id: '1',
      username: 'QuizMaster2024',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=QuizMaster',
      level: 45,
      tokens: 15420,
      rank: 1,
      weeklyXP: 2850
    },
    {
      id: '2',
      username: 'BrainAcademy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Brain',
      level: 42,
      tokens: 14200,
      rank: 2,
      weeklyXP: 2650
    },
    {
      id: '3',
      username: 'StudyBuddy',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Study',
      level: 38,
      tokens: 12800,
      rank: 3,
      weeklyXP: 2400
    },
    {
      id: user?.id || '4',
      username: user?.username || 'You',
      avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      level: user?.level || 1,
      tokens: user?.tokens || 100,
      rank: 127,
      weeklyXP: 450
    }
  ];

  const suggestedFriends = [
    {
      id: '4',
      username: 'CodeNinja',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Code',
      level: 18,
      mutualFriends: 3,
      commonInterests: ['Programming', 'Mathematics']
    },
    {
      id: '5',
      username: 'ArtExplorer',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Art',
      level: 14,
      mutualFriends: 1,
      commonInterests: ['Art', 'History']
    }
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="text-yellow-500" size={20} />;
    if (rank === 2) return <Medal className="text-gray-400" size={20} />;
    if (rank === 3) return <Award className="text-amber-600" size={20} />;
    return <span className="text-gray-600 font-bold">#{rank}</span>;
  };

  const FriendCard = ({ friend }: { friend: any }) => (
    <motion.div
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={friend.avatar}
            alt={friend.username}
            className="w-12 h-12 rounded-full"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            friend.status === 'online' ? 'bg-success-500' : 'bg-gray-400'
          }`} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-gray-800">{friend.username}</h4>
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
              Lv.{friend.level}
            </span>
          </div>
          <p className="text-sm text-gray-600">{friend.lastActivity}</p>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-gray-500">🔥 {friend.streak} day streak</span>
          </div>
        </div>

        <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
          <MessageCircle size={20} />
        </button>
      </div>
    </motion.div>
  );

  const LeaderboardCard = ({ player, index }: { player: any; index: number }) => (
    <motion.div
      className={`bg-white rounded-xl p-4 shadow-sm border ${
        player.id === user?.id ? 'border-primary-200 bg-primary-50' : 'border-gray-100'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8">
          {getRankIcon(player.rank)}
        </div>
        
        <img
          src={player.avatar}
          alt={player.username}
          className="w-10 h-10 rounded-full"
        />
        
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-gray-800">{player.username}</h4>
            {player.id === user?.id && (
              <span className="text-xs bg-primary-600 text-white px-2 py-1 rounded-full">You</span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Level {player.level}</span>
            <span>{player.tokens} tokens</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-semibold text-primary-600">+{player.weeklyXP}</div>
          <div className="text-xs text-gray-500">this week</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Social Hub</h2>
              <p className="text-secondary-100">Connect, compete, and learn together!</p>
            </div>
            <Users size={40} className="text-secondary-200" />
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-100"
        >
          {[
            { id: 'friends', label: 'Friends', icon: Users },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'find', label: 'Find Friends', icon: UserPlus }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'friends' && (
            <motion.div
              key="friends"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Your Friends ({friends.length})</h3>
                <button className="text-primary-600 font-semibold text-sm">Invite Friends</button>
              </div>
              
              {friends.map((friend) => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">Weekly Leaderboard</h3>
                <span className="text-sm text-gray-600">Resets in 3d 12h</span>
              </div>
              
              {leaderboard.map((player, index) => (
                <LeaderboardCard key={player.id} player={player} index={index} />
              ))}
            </motion.div>
          )}

          {activeTab === 'find' && (
            <motion.div
              key="find"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for friends..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">Suggested Friends</h3>
                <div className="space-y-3">
                  {suggestedFriends.map((friend) => (
                    <motion.div
                      key={friend.id}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={friend.avatar}
                          alt={friend.username}
                          className="w-12 h-12 rounded-full"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-gray-800">{friend.username}</h4>
                            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                              Lv.{friend.level}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{friend.mutualFriends} mutual friends</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {friend.commonInterests.map((interest) => (
                              <span key={interest} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>

                        <motion.button
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <UserPlus size={16} />
                          <span>Add</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialScreen;