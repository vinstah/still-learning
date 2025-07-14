import React from 'react';
import { motion } from 'framer-motion';
import { Home, Trophy, Users, ShoppingBag, User } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

interface MobileLayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, currentTab, onTabChange }) => {
  const { user, notifications } = useGameStore();
  
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'challenges', icon: Trophy, label: 'Challenges' },
    { id: 'social', icon: Users, label: 'Social' },
    { id: 'marketplace', icon: ShoppingBag, label: 'Shop' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];
  console.log(notifications);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-primary-200 safe-area-top">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">EduQuest</h1>
              {user && (
                <p className="text-sm text-gray-600">Level {user.level}</p>
              )}
            </div>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-warning-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">T</span>
                </div>
                <span className="text-sm font-semibold text-gray-700">{user.tokens}</span>
              </div>
              
              {unreadCount > 0 && (
                <div className="relative">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{unreadCount}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t-2 border-primary-200 safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-500 hover:text-primary-500'
                }`}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon size={20} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary-600 rounded-full"
                    layoutId="activeTab"
                    style={{ transform: 'translateX(-50%)' }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;