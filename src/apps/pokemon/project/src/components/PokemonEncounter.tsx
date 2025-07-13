import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WildPokemon, CapturedPokemon } from '../types/game';
import { Sparkles, BookOpen, Zap, Star, X } from 'lucide-react';

interface PokemonEncounterProps {
  pokemon: WildPokemon;
  onCapture: (pokemon: CapturedPokemon) => void;
  onClose: () => void;
  isVisible: boolean;
}

export const PokemonEncounter: React.FC<PokemonEncounterProps> = ({
  pokemon,
  onCapture,
  onClose,
  isVisible
}) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [showFacts, setShowFacts] = useState(true);
  const [captureAnimation, setCaptureAnimation] = useState(false);

  const handleCapture = () => {
    setCaptureAnimation(true);
    
    setTimeout(() => {
      const capturedPokemon: CapturedPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.type,
        subject: pokemon.subject,
        model: pokemon.model,
        color: pokemon.color,
        facts: pokemon.facts,
        capturedAt: new Date(),
        level: 1
      };
      
      onCapture(capturedPokemon);
    }, 2000);
  };

  const nextFact = () => {
    if (currentFactIndex < pokemon.facts.length - 1) {
      setCurrentFactIndex(prev => prev + 1);
    } else {
      setShowFacts(false);
    }
  };

  const getRarityColor = () => {
    switch (pokemon.rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-500 to-pink-500';
      case 'uncommon': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getPokemonEmoji = () => {
    switch (pokemon.type) {
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

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
            transition={{ type: "spring", duration: 0.8 }}
            className={`bg-gradient-to-br ${getRarityColor()} rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Pokemon Display */}
            <div className="text-center mb-8">
              <motion.div
                animate={captureAnimation ? { scale: [1, 1.5, 0], rotate: [0, 360, 720] } : { scale: 1 }}
                transition={{ duration: 2 }}
                className="text-8xl mb-4"
              >
                {getPokemonEmoji()}
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-2">{pokemon.name}</h2>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className={`px-4 py-2 rounded-full text-white font-semibold ${
                  pokemon.type === 'fire' ? 'bg-red-500' :
                  pokemon.type === 'water' ? 'bg-blue-500' :
                  pokemon.type === 'grass' ? 'bg-green-500' :
                  pokemon.type === 'electric' ? 'bg-yellow-500' :
                  pokemon.type === 'psychic' ? 'bg-purple-500' :
                  pokemon.type === 'rock' ? 'bg-gray-500' :
                  pokemon.type === 'flying' ? 'bg-cyan-500' : 'bg-gray-500'
                }`}>
                  {pokemon.type.toUpperCase()}
                </span>
                <span className={`px-4 py-2 rounded-full text-white font-semibold ${
                  pokemon.subject === 'math' ? 'bg-blue-600' :
                  pokemon.subject === 'english' ? 'bg-green-600' :
                  pokemon.subject === 'science' ? 'bg-purple-600' :
                  pokemon.subject === 'physics' ? 'bg-red-600' :
                  pokemon.subject === 'history' ? 'bg-yellow-600' : 'bg-emerald-600'
                }`}>
                  {pokemon.subject.toUpperCase()}
                </span>
              </div>
              
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                pokemon.rarity === 'legendary' ? 'bg-yellow-500/30' :
                pokemon.rarity === 'rare' ? 'bg-purple-500/30' :
                pokemon.rarity === 'uncommon' ? 'bg-blue-500/30' : 'bg-gray-500/30'
              }`}>
                <Star className="w-4 h-4 text-white" />
                <span className="text-white font-semibold">{pokemon.rarity.toUpperCase()}</span>
              </div>
            </div>

            {/* Learning Content */}
            {showFacts && !captureAnimation && (
              <motion.div
                key={currentFactIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-2">
                      {pokemon.name} teaches you:
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {pokemon.facts[currentFactIndex]}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="text-white/70 text-sm">
                    Fact {currentFactIndex + 1} of {pokemon.facts.length}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextFact}
                    className="bg-white/30 text-white px-6 py-2 rounded-xl font-semibold hover:bg-white/40 transition-colors"
                  >
                    {currentFactIndex < pokemon.facts.length - 1 ? 'Next Fact' : 'Ready to Capture!'}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Capture Animation */}
            {captureAnimation && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-white mb-2">Capturing {pokemon.name}!</h3>
                <p className="text-white/80">Adding to your Pokedex...</p>
              </motion.div>
            )}

            {/* Action Buttons */}
            {!showFacts && !captureAnimation && (
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCapture}
                  className="flex-1 bg-white/30 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:bg-white/40 transition-colors"
                >
                  <Zap className="w-6 h-6" />
                  <span>Capture Pokemon!</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-8 py-4 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
                >
                  Run Away
                </motion.button>
              </div>
            )}

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 100 + '%',
                    y: '100%',
                    opacity: 0
                  }}
                  animate={{
                    y: '-10%',
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                  className="absolute w-2 h-2 bg-white rounded-full"
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};