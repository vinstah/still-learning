import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CapturedPokemon } from '../types/game';
import { BookOpen, Star, Calendar, Zap, X, Search } from 'lucide-react';

interface PokedexProps {
  capturedPokemon: CapturedPokemon[];
  isVisible: boolean;
  onClose: () => void;
  onSelectPokemon: (pokemon: CapturedPokemon) => void;
}

export const Pokedex: React.FC<PokedexProps> = ({
  capturedPokemon,
  isVisible,
  onClose,
  onSelectPokemon
}) => {
  const [selectedPokemon, setSelectedPokemon] = useState<CapturedPokemon | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  const filteredPokemon = capturedPokemon.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = filterSubject === 'all' || pokemon.subject === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const subjects = ['all', ...Array.from(new Set(capturedPokemon.map(p => p.subject)))];

  const getPokemonEmoji = (type: string) => {
    switch (type) {
      case 'fire': return '🔥';
      case 'water': return '💧';
      case 'grass': return '🌿';
      case 'electric': return '⚡';
      case 'psychic': return '🔮';
      case 'rock': return '🗿';
      case 'flying': return '🦅';
      default: return '✨';
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'math': return 'bg-blue-500';
      case 'english': return 'bg-green-500';
      case 'science': return 'bg-purple-500';
      case 'physics': return 'bg-red-500';
      case 'history': return 'bg-yellow-500';
      case 'nature': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Pokedex</h2>
                <p className="text-purple-200">Your captured Pokemon collection</p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-white">{capturedPokemon.length}</div>
                <div className="text-purple-200">Pokemon Captured</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-white">{subjects.length - 1}</div>
                <div className="text-purple-200">Subjects Explored</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold text-white">
                  {capturedPokemon.reduce((total, pokemon) => total + pokemon.facts.length, 0)}
                </div>
                <div className="text-purple-200">Facts Learned</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search Pokemon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md rounded-xl text-white placeholder-gray-400 border border-white/20 focus:border-white/40 focus:outline-none"
                />
              </div>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-4 py-3 bg-white/10 backdrop-blur-md rounded-xl text-white border border-white/20 focus:border-white/40 focus:outline-none"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject} className="bg-gray-800">
                    {subject === 'all' ? 'All Subjects' : subject.charAt(0).toUpperCase() + subject.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-6 h-[60vh]">
              {/* Pokemon Grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPokemon.map((pokemon) => (
                    <motion.div
                      key={pokemon.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPokemon(pokemon)}
                      className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 cursor-pointer border-2 transition-all ${
                        selectedPokemon?.id === pokemon.id ? 'border-white/60' : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="text-center mb-3">
                        <div className="text-4xl mb-2">{getPokemonEmoji(pokemon.type)}</div>
                        <h3 className="text-white font-bold text-lg">{pokemon.name}</h3>
                        <div className="flex items-center justify-center space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs text-white ${getSubjectColor(pokemon.subject)}`}>
                            {pokemon.subject}
                          </span>
                          <span className="text-purple-200 text-sm">Lv.{pokemon.level}</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-purple-200 text-sm">
                          {pokemon.facts.length} facts learned
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pokemon Details */}
              {selectedPokemon && (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="w-80 bg-white/10 backdrop-blur-md rounded-2xl p-6 overflow-y-auto"
                >
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{getPokemonEmoji(selectedPokemon.type)}</div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedPokemon.name}</h3>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-white font-semibold ${getSubjectColor(selectedPokemon.subject)}`}>
                        {selectedPokemon.subject.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-white font-semibold">
                        Lv.{selectedPokemon.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-purple-200 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Captured {selectedPokemon.capturedAt.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-bold flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>Knowledge Learned</span>
                    </h4>
                    {selectedPokemon.facts.map((fact, index) => (
                      <div key={index} className="bg-white/10 rounded-xl p-3">
                        <p className="text-white/90 text-sm leading-relaxed">{fact}</p>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectPokemon(selectedPokemon)}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                  >
                    <Zap className="w-5 h-5" />
                    <span>Battle with {selectedPokemon.name}</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};