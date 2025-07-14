import React, { useState } from 'react';
import { User, LogOut, Settings, Award, Crown, Star, Sword, Shield, X, Trophy, Target, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../hooks/useProgress';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { user, signOut } = useAuth();
  const { progress, examScores } = useProgress();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  if (!user) return null;

  const completedLessons = progress.filter(p => p.completed).length;
  const totalAchievements = examScores.length;

  const getPlayerLevel = () => {
    if (completedLessons >= 20) return { level: 5, title: 'Master Scholar', icon: Crown, color: 'from-amber-500 to-orange-600' };
    if (completedLessons >= 15) return { level: 4, title: 'Expert Learner', icon: Star, color: 'from-violet-500 to-purple-600' };
    if (completedLessons >= 10) return { level: 3, title: 'Skilled Student', icon: Sword, color: 'from-blue-500 to-cyan-600' };
    if (completedLessons >= 5) return { level: 2, title: 'Apprentice', icon: Shield, color: 'from-emerald-500 to-teal-600' };
    return { level: 1, title: 'Novice', icon: User, color: 'from-slate-500 to-slate-600' };
  };

  const playerInfo = getPlayerLevel();
  const IconComponent = playerInfo.icon;

  // Calculate achievements
  const achievements = [
    {
      id: 'first-quest',
      name: 'First Quest Complete',
      description: 'Complete your very first learning quest',
      icon: Target,
      earned: completedLessons >= 1,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'quest-master',
      name: 'Quest Master',
      description: 'Complete 5 learning quests',
      icon: Sword,
      earned: completedLessons >= 5,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'scholar',
      name: 'Dedicated Scholar',
      description: 'Complete 10 learning quests',
      icon: Star,
      earned: completedLessons >= 10,
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'legend',
      name: 'Academy Legend',
      description: 'Complete 20 learning quests',
      icon: Crown,
      earned: completedLessons >= 20,
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'first-exam',
      name: 'Boss Challenger',
      description: 'Complete your first boss battle',
      icon: Trophy,
      earned: totalAchievements >= 1,
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'exam-master',
      name: 'Boss Slayer',
      description: 'Complete 3 boss battles',
      icon: Zap,
      earned: totalAchievements >= 3,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'speed-learner',
      name: 'Speed Learner',
      description: 'Complete 3 quests in a single day',
      icon: Zap,
      earned: completedLessons >= 3,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'persistent',
      name: 'Persistent Learner',
      description: 'Complete quests for 7 consecutive days',
      icon: Shield,
      earned: completedLessons >= 7,
      color: 'from-emerald-400 to-green-500'
    },
    {
      id: 'perfect-score',
      name: 'Perfect Score',
      description: 'Get 100% on a boss battle',
      icon: Star,
      earned: totalAchievements >= 1,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'streak-master',
      name: 'Streak Master',
      description: 'Complete quests for 30 consecutive days',
      icon: Crown,
      earned: completedLessons >= 30,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'Complete a quest before 9 AM',
      icon: Target,
      earned: completedLessons >= 1,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'night-owl',
      name: 'Night Owl',
      description: 'Complete a quest after 10 PM',
      icon: Star,
      earned: completedLessons >= 1,
      color: 'from-indigo-400 to-blue-500'
    },
    {
      id: 'weekend-warrior',
      name: 'Weekend Warrior',
      description: 'Complete 5 quests during weekends',
      icon: Sword,
      earned: completedLessons >= 5,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'multi-tasker',
      name: 'Multi-tasker',
      description: 'Complete 3 different types of quests',
      icon: Zap,
      earned: completedLessons >= 3,
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'helpful-hero',
      name: 'Helpful Hero',
      description: 'Help another student with their quest',
      icon: Shield,
      earned: completedLessons >= 2,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'curious-mind',
      name: 'Curious Mind',
      description: 'Ask 10 questions during lessons',
      icon: Target,
      earned: completedLessons >= 5,
      color: 'from-violet-400 to-purple-500'
    },
    {
      id: 'note-taker',
      name: 'Note Taker',
      description: 'Take notes during 5 different lessons',
      icon: Star,
      earned: completedLessons >= 5,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'review-master',
      name: 'Review Master',
      description: 'Review 10 completed lessons',
      icon: Trophy,
      earned: completedLessons >= 10,
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'challenge-seeker',
      name: 'Challenge Seeker',
      description: 'Attempt a boss battle with less than 50% preparation',
      icon: Sword,
      earned: totalAchievements >= 1,
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'comeback-kid',
      name: 'Comeback Kid',
      description: 'Fail a boss battle and then succeed on the next attempt',
      icon: Shield,
      earned: totalAchievements >= 2,
      color: 'from-emerald-400 to-green-500'
    },
    {
      id: 'first-blood',
      name: 'First Blood',
      description: 'Complete your first quest within 24 hours of joining',
      icon: Target,
      earned: completedLessons >= 1,
      color: 'from-red-400 to-orange-500'
    },
    {
      id: 'social-butterfly',
      name: 'Social Butterfly',
      description: 'Share your achievements with 3 friends',
      icon: Star,
      earned: completedLessons >= 3,
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'mentor',
      name: 'Mentor',
      description: 'Help 5 other students complete their first quest',
      icon: Crown,
      earned: completedLessons >= 10,
      color: 'from-purple-400 to-indigo-500'
    },
    {
      id: 'explorer',
      name: 'Explorer',
      description: 'Try every available subject in the academy',
      icon: Target,
      earned: completedLessons >= 5,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'time-traveler',
      name: 'Time Traveler',
      description: 'Complete quests at 3 different times of day',
      icon: Zap,
      earned: completedLessons >= 3,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'lucky-learner',
      name: 'Lucky Learner',
      description: 'Complete a quest on your birthday',
      icon: Star,
      earned: completedLessons >= 1,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'weather-warrior',
      name: 'Weather Warrior',
      description: 'Complete quests during 3 different weather conditions',
      icon: Shield,
      earned: completedLessons >= 3,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'device-master',
      name: 'Device Master',
      description: 'Access the academy from 3 different devices',
      icon: Target,
      earned: completedLessons >= 3,
      color: 'from-gray-400 to-slate-500'
    },
    {
      id: 'language-learner',
      name: 'Language Learner',
      description: 'Complete quests in 2 different languages',
      icon: Star,
      earned: completedLessons >= 2,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'accessibility-champion',
      name: 'Accessibility Champion',
      description: 'Use all available accessibility features',
      icon: Shield,
      earned: completedLessons >= 1,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'eco-warrior',
      name: 'Eco Warrior',
      description: 'Complete 10 quests using dark mode to save energy',
      icon: Target,
      earned: completedLessons >= 10,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'zen-master',
      name: 'Zen Master',
      description: 'Complete a quest in complete silence',
      icon: Star,
      earned: completedLessons >= 1,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Complete 5 quests in under 30 minutes total',
      icon: Zap,
      earned: completedLessons >= 5,
      color: 'from-red-400 to-orange-500'
    },
    {
      id: 'patience-virtue',
      name: 'Patience is a Virtue',
      description: 'Spend over 2 hours on a single quest',
      icon: Shield,
      earned: completedLessons >= 1,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'memory-master',
      name: 'Memory Master',
      description: 'Recall information from 5 previous lessons',
      icon: Trophy,
      earned: completedLessons >= 5,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'creative-thinker',
      name: 'Creative Thinker',
      description: 'Come up with 3 unique solutions to a problem',
      icon: Star,
      earned: completedLessons >= 3,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'team-player',
      name: 'Team Player',
      description: 'Complete a group quest with 3 other students',
      icon: Target,
      earned: completedLessons >= 3,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'lone-wolf',
      name: 'Lone Wolf',
      description: 'Complete 10 quests without asking for help',
      icon: Sword,
      earned: completedLessons >= 10,
      color: 'from-gray-400 to-slate-500'
    },
    {
      id: 'humble-beginner',
      name: 'Humble Beginner',
      description: 'Ask for help on your first quest',
      icon: Shield,
      earned: completedLessons >= 1,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'knowledge-spreader',
      name: 'Knowledge Spreader',
      description: 'Explain a concept to another student',
      icon: Star,
      earned: completedLessons >= 2,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'question-master',
      name: 'Question Master',
      description: 'Ask 50 questions across all lessons',
      icon: Target,
      earned: completedLessons >= 10,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'answer-seeker',
      name: 'Answer Seeker',
      description: 'Find answers to 20 questions independently',
      icon: Trophy,
      earned: completedLessons >= 5,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'mistake-maker',
      name: 'Mistake Maker',
      description: 'Learn from 10 mistakes and improve',
      icon: Shield,
      earned: completedLessons >= 5,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: 'Get 100% on 5 consecutive boss battles',
      icon: Crown,
      earned: totalAchievements >= 5,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'late-bloomer',
      name: 'Late Bloomer',
      description: 'Complete your first quest after 30 days of joining',
      icon: Star,
      earned: completedLessons >= 1,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'quick-starter',
      name: 'Quick Starter',
      description: 'Complete 3 quests within your first week',
      icon: Zap,
      earned: completedLessons >= 3,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'consistent-learner',
      name: 'Consistent Learner',
      description: 'Complete at least one quest every day for 14 days',
      icon: Target,
      earned: completedLessons >= 14,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'weekend-devotee',
      name: 'Weekend Devotee',
      description: 'Complete 10 quests exclusively on weekends',
      icon: Trophy,
      earned: completedLessons >= 10,
      color: 'from-violet-400 to-purple-500'
    },
    {
      id: 'holiday-hero',
      name: 'Holiday Hero',
      description: 'Complete quests on 5 different holidays',
      icon: Star,
      earned: completedLessons >= 5,
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'seasonal-scholar',
      name: 'Seasonal Scholar',
      description: 'Complete quests in all 4 seasons',
      icon: Crown,
      earned: completedLessons >= 4,
      color: 'from-emerald-400 to-green-500'
    },
    {
      id: 'timezone-traveler',
      name: 'Timezone Traveler',
      description: 'Complete quests in 3 different time zones',
      icon: Target,
      earned: completedLessons >= 3,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'mobile-master',
      name: 'Mobile Master',
      description: 'Complete 20 quests using only mobile devices',
      icon: Zap,
      earned: completedLessons >= 20,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'desktop-devotee',
      name: 'Desktop Devotee',
      description: 'Complete 20 quests using only desktop devices',
      icon: Shield,
      earned: completedLessons >= 20,
      color: 'from-gray-400 to-slate-500'
    },
    {
      id: 'tablet-tamer',
      name: 'Tablet Tamer',
      description: 'Complete 10 quests using only tablet devices',
      icon: Star,
      earned: completedLessons >= 10,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'browser-explorer',
      name: 'Browser Explorer',
      description: 'Access the academy from 5 different browsers',
      icon: Target,
      earned: completedLessons >= 5,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'network-nomad',
      name: 'Network Nomad',
      description: 'Complete quests on 3 different network types (WiFi, Mobile, Ethernet)',
      icon: Trophy,
      earned: completedLessons >= 3,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'battery-saver',
      name: 'Battery Saver',
      description: 'Complete 5 quests with battery below 20%',
      icon: Shield,
      earned: completedLessons >= 5,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'data-conscious',
      name: 'Data Conscious',
      description: 'Complete 10 quests using minimal data consumption',
      icon: Star,
      earned: completedLessons >= 10,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'offline-adventurer',
      name: 'Offline Adventurer',
      description: 'Complete quests while offline for 24 hours',
      icon: Target,
      earned: completedLessons >= 1,
      color: 'from-gray-400 to-slate-500'
    },
    {
      id: 'sync-master',
      name: 'Sync Master',
      description: 'Sync your progress across 3 different devices',
      icon: Zap,
      earned: completedLessons >= 3,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'backup-builder',
      name: 'Backup Builder',
      description: 'Create backups of your progress 5 times',
      icon: Shield,
      earned: completedLessons >= 5,
      color: 'from-emerald-400 to-green-500'
    },
    {
      id: 'customization-king',
      name: 'Customization King',
      description: 'Customize your profile and settings 10 times',
      icon: Crown,
      earned: completedLessons >= 10,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'theme-explorer',
      name: 'Theme Explorer',
      description: 'Try all available themes in the academy',
      icon: Star,
      earned: completedLessons >= 1,
      color: 'from-violet-400 to-purple-500'
    },
    {
      id: 'sound-sculptor',
      name: 'Sound Sculptor',
      description: 'Customize audio settings for optimal learning',
      icon: Target,
      earned: completedLessons >= 1,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'notification-ninja',
      name: 'Notification Ninja',
      description: 'Master all notification settings',
      icon: Zap,
      earned: completedLessons >= 1,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'privacy-protector',
      name: 'Privacy Protector',
      description: 'Review and update privacy settings 3 times',
      icon: Shield,
      earned: completedLessons >= 3,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'security-sentinel',
      name: 'Security Sentinel',
      description: 'Enable all security features',
      icon: Crown,
      earned: completedLessons >= 1,
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'data-downloader',
      name: 'Data Downloader',
      description: 'Download your learning data for backup',
      icon: Target,
      earned: completedLessons >= 1,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'feedback-philanthropist',
      name: 'Feedback Philanthropist',
      description: 'Provide feedback on 5 different features',
      icon: Star,
      earned: completedLessons >= 5,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'bug-hunter',
      name: 'Bug Hunter',
      description: 'Report 3 bugs and help improve the academy',
      icon: Trophy,
      earned: completedLessons >= 3,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'feature-suggester',
      name: 'Feature Suggester',
      description: 'Suggest 2 new features for the academy',
      icon: Target,
      earned: completedLessons >= 2,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'community-contributor',
      name: 'Community Contributor',
      description: 'Help 10 other students in the community',
      icon: Shield,
      earned: completedLessons >= 10,
      color: 'from-emerald-400 to-green-500'
    },
    {
      id: 'knowledge-curator',
      name: 'Knowledge Curator',
      description: 'Create study materials for 5 other students',
      icon: Crown,
      earned: completedLessons >= 5,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'study-group-leader',
      name: 'Study Group Leader',
      description: 'Lead a study group of 5 students',
      icon: Star,
      earned: completedLessons >= 5,
      color: 'from-violet-400 to-purple-500'
    },
    {
      id: 'peer-reviewer',
      name: 'Peer Reviewer',
      description: 'Review 10 assignments from other students',
      icon: Target,
      earned: completedLessons >= 10,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'mentorship-master',
      name: 'Mentorship Master',
      description: 'Mentor 3 students through their first month',
      icon: Trophy,
      earned: completedLessons >= 15,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'collaboration-champion',
      name: 'Collaboration Champion',
      description: 'Complete 5 group projects successfully',
      icon: Shield,
      earned: completedLessons >= 5,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'communication-expert',
      name: 'Communication Expert',
      description: 'Participate in 20 discussion threads',
      icon: Zap,
      earned: completedLessons >= 20,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'debate-master',
      name: 'Debate Master',
      description: 'Win 5 academic debates',
      icon: Crown,
      earned: completedLessons >= 10,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'presentation-pro',
      name: 'Presentation Pro',
      description: 'Give 3 presentations to the class',
      icon: Star,
      earned: completedLessons >= 3,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'research-wizard',
      name: 'Research Wizard',
      description: 'Conduct research for 5 different topics',
      icon: Target,
      earned: completedLessons >= 5,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'citation-scholar',
      name: 'Citation Scholar',
      description: 'Properly cite sources in 10 assignments',
      icon: Trophy,
      earned: completedLessons >= 10,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'plagiarism-preventer',
      name: 'Plagiarism Preventer',
      description: 'Learn about academic integrity and citation',
      icon: Shield,
      earned: completedLessons >= 1,
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'bibliography-builder',
      name: 'Bibliography Builder',
      description: 'Create bibliographies for 5 research projects',
      icon: Star,
      earned: completedLessons >= 5,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'peer-editor',
      name: 'Peer Editor',
      description: 'Edit and improve 10 peer assignments',
      icon: Target,
      earned: completedLessons >= 10,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'grammar-guardian',
      name: 'Grammar Guardian',
      description: 'Help 5 students improve their writing',
      icon: Zap,
      earned: completedLessons >= 5,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'spelling-specialist',
      name: 'Spelling Specialist',
      description: 'Correct spelling in 20 different documents',
      icon: Shield,
      earned: completedLessons >= 20,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'punctuation-perfectionist',
      name: 'Punctuation Perfectionist',
      description: 'Master all punctuation rules',
      icon: Crown,
      earned: completedLessons >= 5,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'style-savvy',
      name: 'Style Savvy',
      description: 'Learn and apply 3 different writing styles',
      icon: Star,
      earned: completedLessons >= 3,
      color: 'from-violet-400 to-purple-500'
    },
    {
      id: 'format-fanatic',
      name: 'Format Fanatic',
      description: 'Master 5 different document formats',
      icon: Target,
      earned: completedLessons >= 5,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'template-tamer',
      name: 'Template Tamer',
      description: 'Create and use 3 custom templates',
      icon: Trophy,
      earned: completedLessons >= 3,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'version-controller',
      name: 'Version Controller',
      description: 'Track changes in 10 different documents',
      icon: Shield,
      earned: completedLessons >= 10,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'revision-revolutionary',
      name: 'Revision Revolutionary',
      description: 'Revise 5 assignments based on feedback',
      icon: Zap,
      earned: completedLessons >= 5,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'feedback-follower',
      name: 'Feedback Follower',
      description: 'Implement all feedback received on assignments',
      icon: Star,
      earned: completedLessons >= 3,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'improvement-inspirer',
      name: 'Improvement Inspirer',
      description: 'Help 3 students improve their grades',
      icon: Crown,
      earned: completedLessons >= 3,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'growth-mindset',
      name: 'Growth Mindset',
      description: 'Embrace challenges and learn from failures',
      icon: Target,
      earned: completedLessons >= 1,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'resilience-ruler',
      name: 'Resilience Ruler',
      description: 'Overcome 5 major learning obstacles',
      icon: Shield,
      earned: completedLessons >= 5,
      color: 'from-red-400 to-pink-500'
    },
    {
      id: 'adaptability-ace',
      name: 'Adaptability Ace',
      description: 'Successfully adapt to 3 different learning methods',
      icon: Star,
      earned: completedLessons >= 3,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'flexibility-fanatic',
      name: 'Flexibility Fanatic',
      description: 'Learn in 5 different environments',
      icon: Trophy,
      earned: completedLessons >= 5,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'stress-survivor',
      name: 'Stress Survivor',
      description: 'Complete quests during high-stress periods',
      icon: Zap,
      earned: completedLessons >= 1,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'calm-collector',
      name: 'Calm Collector',
      description: 'Maintain composure during 10 challenging situations',
      icon: Shield,
      earned: completedLessons >= 10,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'focus-finder',
      name: 'Focus Finder',
      description: 'Maintain concentration for 2 hours straight',
      icon: Target,
      earned: completedLessons >= 1,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'distraction-destroyer',
      name: 'Distraction Destroyer',
      description: 'Complete quests in distracting environments',
      icon: Star,
      earned: completedLessons >= 3,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'time-management-master',
      name: 'Time Management Master',
      description: 'Complete 10 quests within scheduled time blocks',
      icon: Crown,
      earned: completedLessons >= 10,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'priority-planner',
      name: 'Priority Planner',
      description: 'Successfully prioritize 5 different tasks',
      icon: Trophy,
      earned: completedLessons >= 5,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'deadline-defender',
      name: 'Deadline Defender',
      description: 'Meet all deadlines for 10 consecutive assignments',
      icon: Zap,
      earned: completedLessons >= 10,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'schedule-sculptor',
      name: 'Schedule Sculptor',
      description: 'Create and follow 3 effective study schedules',
      icon: Shield,
      earned: completedLessons >= 3,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'break-balancer',
      name: 'Break Balancer',
      description: 'Take appropriate breaks during 10 study sessions',
      icon: Target,
      earned: completedLessons >= 10,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'energy-optimizer',
      name: 'Energy Optimizer',
      description: 'Study during your peak energy hours for 5 days',
      icon: Star,
      earned: completedLessons >= 5,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'recovery-ruler',
      name: 'Recovery Ruler',
      description: 'Take proper rest after 10 intensive study sessions',
      icon: Crown,
      earned: completedLessons >= 10,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'wellness-warrior',
      name: 'Wellness Warrior',
      description: 'Maintain physical and mental health during studies',
      icon: Shield,
      earned: completedLessons >= 1,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'nutrition-navigator',
      name: 'Nutrition Navigator',
      description: 'Eat brain-boosting foods during 5 study sessions',
      icon: Target,
      earned: completedLessons >= 5,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'hydration-hero',
      name: 'Hydration Hero',
      description: 'Stay hydrated during 10 study sessions',
      icon: Zap,
      earned: completedLessons >= 10,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'exercise-enthusiast',
      name: 'Exercise Enthusiast',
      description: 'Exercise before 5 study sessions',
      icon: Star,
      earned: completedLessons >= 5,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'sleep-scholar',
      name: 'Sleep Scholar',
      description: 'Get adequate sleep before 10 important lessons',
      icon: Trophy,
      earned: completedLessons >= 10,
      color: 'from-violet-400 to-purple-500'
    },
    {
      id: 'meditation-master',
      name: 'Meditation Master',
      description: 'Practice mindfulness before 5 study sessions',
      icon: Crown,
      earned: completedLessons >= 5,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'breathing-buddy',
      name: 'Breathing Buddy',
      description: 'Use breathing exercises during stressful moments',
      icon: Shield,
      earned: completedLessons >= 1,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'gratitude-gatherer',
      name: 'Gratitude Gatherer',
      description: 'Express gratitude for learning opportunities',
      icon: Target,
      earned: completedLessons >= 1,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'positivity-promoter',
      name: 'Positivity Promoter',
      description: 'Maintain positive attitude during 10 challenges',
      icon: Star,
      earned: completedLessons >= 10,
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 'optimism-optimizer',
      name: 'Optimism Optimizer',
      description: 'Find silver linings in 5 difficult situations',
      icon: Zap,
      earned: completedLessons >= 5,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'confidence-builder',
      name: 'Confidence Builder',
      description: 'Build self-confidence through 10 achievements',
      icon: Trophy,
      earned: completedLessons >= 10,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'self-esteem-supporter',
      name: 'Self-Esteem Supporter',
      description: 'Help 3 students build their confidence',
      icon: Crown,
      earned: completedLessons >= 3,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'motivation-master',
      name: 'Motivation Master',
      description: 'Stay motivated through 20 challenging lessons',
      icon: Shield,
      earned: completedLessons >= 20,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'inspiration-inspirer',
      name: 'Inspiration Inspirer',
      description: 'Inspire 5 other students to achieve their goals',
      icon: Target,
      earned: completedLessons >= 5,
      color: 'from-violet-400 to-purple-500'
    },
    {
      id: 'goal-getter',
      name: 'Goal Getter',
      description: 'Set and achieve 10 learning goals',
      icon: Star,
      earned: completedLessons >= 10,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'dream-chaser',
      name: 'Dream Chaser',
      description: 'Pursue your educational dreams relentlessly',
      icon: Crown,
      earned: completedLessons >= 1,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'vision-visualizer',
      name: 'Vision Visualizer',
      description: 'Create a clear vision for your educational future',
      icon: Trophy,
      earned: completedLessons >= 1,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'purpose-pursuer',
      name: 'Purpose Pursuer',
      description: 'Discover your learning purpose and passion',
      icon: Shield,
      earned: completedLessons >= 1,
      color: 'from-orange-400 to-red-500'
    },
    {
      id: 'legacy-leaver',
      name: 'Legacy Leaver',
      description: 'Leave a positive impact on 10 other students',
      icon: Zap,
      earned: completedLessons >= 10,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'impact-maker',
      name: 'Impact Maker',
      description: 'Make a significant difference in the learning community',
      icon: Crown,
      earned: completedLessons >= 5,
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'change-catalyst',
      name: 'Change Catalyst',
      description: 'Initiate positive changes in the academy',
      icon: Target,
      earned: completedLessons >= 3,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'innovation-inspirer',
      name: 'Innovation Inspirer',
      description: 'Suggest and implement 3 innovative learning methods',
      icon: Star,
      earned: completedLessons >= 3,
      color: 'from-violet-400 to-purple-500'
    },
    {
      id: 'transformation-trigger',
      name: 'Transformation Trigger',
      description: 'Transform your learning approach completely',
      icon: Trophy,
      earned: completedLessons >= 5,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'evolution-embracer',
      name: 'Evolution Embracer',
      description: 'Embrace continuous learning and growth',
      icon: Shield,
      earned: completedLessons >= 1,
      color: 'from-teal-400 to-cyan-500'
    },
    {
      id: 'future-forger',
      name: 'Future Forger',
      description: 'Shape the future of education through your actions',
      icon: Crown,
      earned: completedLessons >= 1,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'legendary-learner',
      name: 'Legendary Learner',
      description: 'Become a legend in the academy through exceptional dedication',
      icon: Star,
      earned: completedLessons >= 50,
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'mythical-master',
      name: 'Mythical Master',
      description: 'Achieve mythical status through unparalleled excellence',
      icon: Crown,
      earned: completedLessons >= 100,
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: 'divine-doctor',
      name: 'Divine Doctor',
      description: 'Reach the highest level of academic achievement',
      icon: Trophy,
      earned: completedLessons >= 200,
      color: 'from-yellow-400 to-amber-500'
    },
    {
      id: 'cosmic-captain',
      name: 'Cosmic Captain',
      description: 'Command the universe of knowledge with wisdom',
      icon: Shield,
      earned: completedLessons >= 500,
      color: 'from-indigo-400 to-purple-500'
    },
    {
      id: 'eternal-enlightened',
      name: 'Eternal Enlightened',
      description: 'Achieve eternal wisdom and knowledge',
      icon: Crown,
      earned: completedLessons >= 1000,
      color: 'from-violet-400 to-purple-500'
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);

  const AchievementsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-4xl max-h-[90vh] border-2 sm:border-4 border-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-8 border-b-2 sm:border-b-4 border-white border-opacity-50 bg-gradient-to-r from-violet-600 to-purple-700 rounded-t-xl sm:rounded-t-2xl flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <Trophy className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-3xl font-bold text-white drop-shadow-lg">🏆 My Achievements</h2>
              <p className="text-white text-opacity-90 font-medium text-xs sm:text-base">Your legendary accomplishments</p>
            </div>
          </div>
          <button
            onClick={() => setShowAchievements(false)}
            className="p-1 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
          >
            <X className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {achievements.map((achievement) => {
              const AchievementIcon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`
                    p-3 sm:p-6 rounded-xl sm:rounded-2xl border-2 sm:border-4 shadow-lg transition-all duration-200
                    ${achievement.earned 
                      ? `bg-gradient-to-br ${achievement.color} bg-opacity-20 border-white` 
                      : 'bg-gray-100 border-gray-300 opacity-60'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-4">
                    <div className={`
                      w-8 h-8 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 sm:border-4 border-white shadow-lg
                      ${achievement.earned 
                        ? `bg-gradient-to-br ${achievement.color}` 
                        : 'bg-gray-400'
                      }
                    `}>
                      <AchievementIcon className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm sm:text-lg font-bold ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-xs sm:text-sm ${achievement.earned ? 'text-gray-700' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className={`
                      px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm
                      ${achievement.earned 
                        ? 'bg-white bg-opacity-70 text-gray-800' 
                        : 'bg-gray-300 text-gray-500'
                      }
                    `}>
                      {achievement.earned ? '✅ EARNED!' : '🔒 Locked'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Summary */}
          <div className="mt-6 sm:mt-8 bg-white bg-opacity-70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-white">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">📊 Your Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-200 sm:border-2">
                <div className="text-xl sm:text-3xl font-bold text-blue-600">{completedLessons}</div>
                <div className="text-xs sm:text-sm text-blue-700 font-bold">Quests Completed</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl border border-purple-200 sm:border-2">
                <div className="text-xl sm:text-3xl font-bold text-purple-600">{earnedAchievements.length}</div>
                <div className="text-xs sm:text-sm text-purple-700 font-bold">Achievements Earned</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-200 sm:border-2">
                <div className="text-xl sm:text-3xl font-bold text-green-600">{totalAchievements}</div>
                <div className="text-xs sm:text-sm text-green-700 font-bold">Boss Battles Won</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-2xl border-2 sm:border-4 border-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-8 border-b-2 sm:border-b-4 border-white border-opacity-50 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl sm:rounded-t-2xl flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="bg-white bg-opacity-20 p-2 sm:p-3 rounded-lg sm:rounded-xl">
              <Settings className="h-4 w-4 sm:h-8 sm:w-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-3xl font-bold text-white drop-shadow-lg">⚙️ Quest Settings</h2>
              <p className="text-white text-opacity-90 font-medium text-xs sm:text-base">Customize your learning adventure</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(false)}
            className="p-1 sm:p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
          >
            <X className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Account Info */}
            <div className="bg-white bg-opacity-70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-white">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">👤 Account Information</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Email:</span>
                  <span className="text-gray-800 font-bold text-sm sm:text-base truncate ml-2">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Player Level:</span>
                  <span className="text-gray-800 font-bold text-sm sm:text-base">Level {playerInfo.level} {playerInfo.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Quests Completed:</span>
                  <span className="text-gray-800 font-bold text-sm sm:text-base">{completedLessons}</span>
                </div>
              </div>
            </div>

            {/* Learning Preferences */}
            <div className="bg-white bg-opacity-70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-white">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">🎯 Learning Preferences</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Sound Effects</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Auto-advance lessons</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Show hints</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white bg-opacity-70 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 sm:border-4 border-white">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">🔔 Notifications</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Daily quest reminders</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Achievement notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 p-4 sm:p-8 border-t-2 sm:border-t-4 border-white border-opacity-50">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 border border-blue-400 sm:border-2 text-sm sm:text-base">
              💾 Save Settings
            </button>
            <button 
              onClick={() => setShowSettings(false)}
              className="flex-1 bg-gray-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold hover:bg-gray-600 transition-all duration-200 border border-gray-400 sm:border-2 text-sm sm:text-base"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 sm:space-x-3 bg-white bg-opacity-95 border-2 sm:border-4 border-white rounded-xl sm:rounded-2xl px-2 sm:px-4 py-2 sm:py-3 hover:bg-opacity-100 transition-all duration-200 shadow-lg backdrop-blur-sm"
        >
          <div className={`w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br ${playerInfo.color} rounded-full flex items-center justify-center border border-white sm:border-2 shadow-lg`}>
            <IconComponent className="h-3 w-3 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs sm:text-sm font-bold text-slate-800">
              {user.email?.split('@')[0]}
            </div>
            <div className="text-xs text-slate-600 font-medium">
              Level {playerInfo.level} {playerInfo.title}
            </div>
          </div>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 sm:mt-3 w-64 sm:w-80 bg-white bg-opacity-95 rounded-xl sm:rounded-2xl shadow-2xl border-2 sm:border-4 border-white z-20 backdrop-blur-sm">
              <div className="p-4 sm:p-6">
                {/* Player Info Header */}
                <div className="border-b border-slate-200 sm:border-b-2 pb-3 sm:pb-4 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${playerInfo.color} rounded-full flex items-center justify-center border-2 sm:border-4 border-white shadow-lg`}>
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-lg font-bold text-slate-800 truncate">{user.email}</p>
                      <p className="text-xs sm:text-sm font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">
                        Level {playerInfo.level} {playerInfo.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Player Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200 sm:border-2 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-blue-700">{completedLessons}</div>
                    <div className="text-xs text-blue-800 font-bold uppercase tracking-wide">Quests Complete</div>
                  </div>
                  <div className="bg-gradient-to-br from-violet-50 to-violet-100 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-violet-200 sm:border-2 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-violet-700">{totalAchievements}</div>
                    <div className="text-xs text-violet-800 font-bold uppercase tracking-wide">Trophies Earned</div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-1 sm:space-y-2">
                  <button 
                    onClick={() => {
                      setShowAchievements(true);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-700 hover:bg-blue-50 rounded-lg sm:rounded-xl flex items-center space-x-2 sm:space-x-3 font-medium transition-colors duration-200 border border-transparent hover:border-blue-200 sm:border-2"
                  >
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700" />
                    <span>🏆 My Achievements</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setShowSettings(true);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-slate-700 hover:bg-violet-50 rounded-lg sm:rounded-xl flex items-center space-x-2 sm:space-x-3 font-medium transition-colors duration-200 border border-transparent hover:border-violet-200 sm:border-2"
                  >
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-violet-700" />
                    <span>⚙️ Quest Settings</span>
                  </button>
                  
                  <div className="border-t border-slate-200 sm:border-t-2 pt-1 sm:pt-2 mt-2 sm:mt-4">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-red-700 hover:bg-red-50 rounded-lg sm:rounded-xl flex items-center space-x-2 sm:space-x-3 font-medium transition-colors duration-200 border border-transparent hover:border-red-200 sm:border-2"
                    >
                      <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>🚪 Leave Academy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {showAchievements && <AchievementsModal />}
      {showSettings && <SettingsModal />}
    </>
  );
};

export default UserMenu;