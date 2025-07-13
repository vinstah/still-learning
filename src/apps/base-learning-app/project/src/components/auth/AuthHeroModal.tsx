import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
      }
      onClose();
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setShowPassword(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md border-2 sm:border-4 border-white relative overflow-hidden">
        {/* Fantasy Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-16 sm:h-16 bg-amber-400 rounded-full blur-2xl"></div>
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-10 h-10 sm:w-20 sm:h-20 bg-violet-400 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-24 sm:h-24 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between p-4 sm:p-8 border-b-2 sm:border-b-4 border-white border-opacity-50">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
              <Sparkles className="h-4 w-4 sm:h-8 sm:w-8 text-violet-700" />
              <h2 className="text-lg sm:text-3xl font-bold bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">
                {isSignUp ? '🌟 Join the Academy' : '🏰 Welcome Back'}
              </h2>
            </div>
            <p className="text-slate-700 font-medium text-xs sm:text-base">
              {isSignUp ? 'Begin your magical learning adventure!' : 'Continue your epic quest!'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 sm:p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors duration-200 border border-white border-opacity-30 sm:border-2"
          >
            <X className="h-4 w-4 sm:h-6 sm:w-6 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative p-4 sm:p-8 space-y-4 sm:space-y-6">
          {error && (
            <div className="bg-red-50 border-2 sm:border-4 border-red-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg">
              <p className="text-red-800 text-xs sm:text-sm font-medium text-center">⚠️ {error}</p>
            </div>
          )}

          {isSignUp && (
            <div>
              <label htmlFor="fullName" className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 sm:mb-3 uppercase tracking-wide">
                🧙‍♂️ Hero Name
              </label>
              <div className="relative">
                <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-violet-600" />
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 sm:border-4 border-violet-200 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-violet-100 focus:border-violet-400 transition-all duration-200 bg-white bg-opacity-90 font-medium shadow-lg text-slate-800 text-sm sm:text-base"
                  placeholder="Enter your hero name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 sm:mb-3 uppercase tracking-wide">
              📧 Magic Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 sm:border-4 border-blue-200 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200 bg-white bg-opacity-90 font-medium shadow-lg text-slate-800 text-sm sm:text-base"
                placeholder="Enter your magical email"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-bold text-slate-700 mb-2 sm:mb-3 uppercase tracking-wide">
              🔐 Secret Spell
            </label>
            <div className="relative">
              <Lock className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-12 sm:pr-14 py-3 sm:py-4 border-2 sm:border-4 border-emerald-200 rounded-xl sm:rounded-2xl focus:ring-2 sm:focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition-all duration-200 bg-white bg-opacity-90 font-medium shadow-lg text-slate-800 text-sm sm:text-base"
                placeholder="Enter your secret spell"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors duration-200"
              >
                {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
            </div>
            {isSignUp && (
              <p className="text-xs text-slate-600 mt-1 sm:mt-2 font-medium">
                🔮 Your spell must be at least 6 characters long
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:from-violet-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-xl border-2 sm:border-4 border-violet-500 transform hover:scale-105"
          >
            {loading ? (
              <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                <span>Casting spell...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{isSignUp ? '🚀 Begin Adventure' : '⚔️ Enter Academy'}</span>
              </span>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="relative px-4 sm:px-8 pb-4 sm:pb-8 text-center">
          <div className="bg-white bg-opacity-70 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white border-opacity-70 sm:border-2">
            <p className="text-slate-700 font-medium text-xs sm:text-base">
              {isSignUp ? 'Already have an academy account?' : "Don't have an academy account?"}{' '}
              <button
                onClick={toggleMode}
                className="text-violet-700 hover:text-violet-800 font-bold transition-colors duration-200 underline"
              >
                {isSignUp ? '🏰 Enter Here' : '🌟 Join Academy'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;