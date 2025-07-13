import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useGameStore } from './store/gameStore';
import LoginScreen from './components/Auth/LoginScreen';
import MobileLayout from './components/Layout/MobileLayout';
import HomeScreen from './components/Home/HomeScreen';
import ActivityScreen from './components/Activity/ActivityScreen';
import ChallengesScreen from './components/Challenges/ChallengesScreen';
import SocialScreen from './components/Social/SocialScreen';
import MarketplaceScreen from './components/Marketplace/MarketplaceScreen';
import ProfileScreen from './components/Profile/ProfileScreen';

function App() {
  const { user, setUser, currentActivity } = useGameStore();
  const [currentTab, setCurrentTab] = useState('home');

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const renderCurrentScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />;
      case 'challenges':
        return <ChallengesScreen />;
      case 'social':
        return <SocialScreen />;
      case 'marketplace':
        return <MarketplaceScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <MobileLayout currentTab={currentTab} onTabChange={setCurrentTab}>
        {renderCurrentScreen()}
      </MobileLayout>
      
      {currentActivity && <ActivityScreen />}
      
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

export default App;