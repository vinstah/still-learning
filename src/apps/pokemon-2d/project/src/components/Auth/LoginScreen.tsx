import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Gamepad2 } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import toast from 'react-hot-toast';

interface LoginScreenProps {
  onLogin: (user: any) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    learningGoals: [] as string[]
  });
  const { setLoading } = useGameStore();

  const learningOptions = [
    'Mathematics', 'Science', 'Languages', 'History', 
    'Programming', 'Art', 'Music', 'Literature'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockUser = {
        id: Date.now().toString(),
        username: formData.username || 'Player',
        email: formData.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`,
        level: 1,
        experience: 0,
        tokens: 100,
        streak: 0,
        lastLogin: new Date(),
        learningGoals: formData.learningGoals,
        achievements: [],
        friends: [],
        createdAt: new Date()
      };

      onLogin(mockUser);
      toast.success(`Welcome ${isLogin ? 'back' : 'to EduQuest'}, ${mockUser.username}!`);
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleLearningGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goal)
        ? prev.learningGoals.filter(g => g !== goal)
        : [...prev.learningGoals, goal]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-secondary-500 to-primary-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Gamepad2 size={40} className="text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">EduQuest</h1>
          <p className="text-primary-100">Learn, Play, Achieve Together</p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                isLogin
                  ? 'bg-primary-600 text-white'
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                !isLogin
                  ? 'bg-primary-600 text-white'
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to learn? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {learningOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleLearningGoal(option)}
                      className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                        formData.learningGoals.includes(option)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Login' : 'Start Your Quest'}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-primary-600 font-semibold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;