import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameHeader } from './components/GameHeader';
import { World3D } from './components/World3D';
import { PokemonEncounter } from './components/PokemonEncounter';
import { Pokedex } from './components/Pokedex';
import { QuestionBattle } from './components/QuestionBattle';
import { MultiplayerLobby } from './components/MultiplayerLobby';
import { RewardSystem } from './components/RewardSystem';
import { CharacterCreator } from './components/CharacterCreator';
import { useGameState } from './hooks/useGameState';
import { Play, Users, Trophy, BookOpen, Globe, Map } from 'lucide-react';

function App() {
  const {
    currentPlayer,
    currentEnvironment,
    currentWildPokemon,
    encounteredPokemon,
    showPokedex,
    onlineUsers,
    activeBattles,
    currentQuestion,
    currentAI,
    gameMode,
    environments,
    setGameMode,
    setShowPokedex,
    updatePlayerXP,
    updatePlayerCharacter,
    updatePlayerPosition,
    handlePokemonEncounter,
    capturePokemon,
    changeEnvironment,
    startBattle,
    joinBattle,
    createBattle,
    setCurrentQuestion,
    setEncounteredPokemon
  } = useGameState();

  const [showRewards, setShowRewards] = useState(false);
  const [showCharacterCreator, setShowCharacterCreator] = useState(false);
  const [showEnvironmentSelector, setShowEnvironmentSelector] = useState(false);
  const [battleTimer, setBattleTimer] = useState(30);
  const [playerHealth, setPlayerHealth] = useState(3);

  const handleAnswerQuestion = (selectedAnswer: number) => {
    if (!currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      updatePlayerXP(currentQuestion.xpReward);
      setShowRewards(true);
    } else {
      setPlayerHealth(prev => Math.max(0, prev - 1));
    }

    setTimeout(() => {
      setCurrentQuestion(null);
      setGameMode('world');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Game Header */}
      {gameMode !== 'battle' && (
        <GameHeader 
          player={currentPlayer}
          onOpenProfile={() => console.log('Open profile')}
          onOpenSettings={() => console.log('Open settings')}
          onOpenCharacterCreator={() => setShowCharacterCreator(true)}
        />
      )}

      <AnimatePresence mode="wait">
        {/* Main Menu */}
        {gameMode === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="pt-24 pb-12 px-6"
          >
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <h1 className="text-7xl font-bold text-white mb-6 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Pokemon Learn Adventure
                </h1>
                <p className="text-2xl text-purple-200 mb-8">
                  Explore 3D worlds, capture Pokemon, and learn through adventure!
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.button
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameMode('world')}
                  className="bg-gradient-to-br from-green-400 to-blue-600 p-8 rounded-3xl shadow-2xl text-white group"
                >
                  <Globe className="w-16 h-16 mx-auto mb-4 group-hover:animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">Explore World</h3>
                  <p className="text-green-100">Start your 3D adventure!</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPokedex(true)}
                  className="bg-gradient-to-br from-red-400 to-pink-600 p-8 rounded-3xl shadow-2xl text-white group"
                >
                  <BookOpen className="w-16 h-16 mx-auto mb-4 group-hover:animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">Pokedex</h3>
                  <p className="text-red-100">View captured Pokemon!</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setGameMode('multiplayer')}
                  className="bg-gradient-to-br from-purple-400 to-pink-600 p-8 rounded-3xl shadow-2xl text-white group"
                >
                  <Users className="w-16 h-16 mx-auto mb-4 group-hover:animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">Multiplayer</h3>
                  <p className="text-purple-100">Challenge friends!</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => console.log('Open achievements')}
                  className="bg-gradient-to-br from-yellow-400 to-orange-600 p-8 rounded-3xl shadow-2xl text-white group"
                >
                  <Trophy className="w-16 h-16 mx-auto mb-4 group-hover:animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">Achievements</h3>
                  <p className="text-yellow-100">View your badges!</p>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3D World Exploration */}
        {gameMode === 'world' && (
          <motion.div
            key="world"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <World3D
              environment={currentEnvironment}
              wildPokemon={currentWildPokemon}
              player={currentPlayer}
              onPokemonEncounter={handlePokemonEncounter}
              onPlayerMove={updatePlayerPosition}
            />

            {/* World UI Overlay */}
            <div className="absolute bottom-4 right-4 space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEnvironmentSelector(true)}
                className="bg-black/70 text-white p-4 rounded-xl backdrop-blur-sm hover:bg-black/80 transition-colors flex items-center space-x-2"
              >
                <Map className="w-5 h-5" />
                <span>Change World</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPokedex(true)}
                className="bg-black/70 text-white p-4 rounded-xl backdrop-blur-sm hover:bg-black/80 transition-colors flex items-center space-x-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>Pokedex ({currentPlayer.capturedPokemon.length})</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameMode('menu')}
                className="bg-black/70 text-white p-4 rounded-xl backdrop-blur-sm hover:bg-black/80 transition-colors"
              >
                Back to Menu
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Battle Mode */}
        {gameMode === 'battle' && currentQuestion && (
          <motion.div
            key="battle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
          >
            <QuestionBattle
              question={currentQuestion}
              onAnswer={handleAnswerQuestion}
              timeLeft={battleTimer}
              aiCompanion={currentAI}
              playerHealth={playerHealth}
              maxHealth={3}
            />
          </motion.div>
        )}

        {/* Multiplayer Lobby */}
        {gameMode === 'multiplayer' && (
          <motion.div
            key="multiplayer"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="pt-24"
          >
            <MultiplayerLobby
              currentPlayer={currentPlayer}
              onlineUsers={onlineUsers}
              activeBattles={activeBattles}
              onJoinBattle={joinBattle}
              onCreateBattle={createBattle}
              onInviteFriend={(playerId) => console.log('Invite friend:', playerId)}
            />
            <div className="text-center mt-8 pb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setGameMode('menu')}
                className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                Back to Menu
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Environment Selector Modal */}
      <AnimatePresence>
        {showEnvironmentSelector && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-8 max-w-4xl w-full"
            >
              <h2 className="text-4xl font-bold text-white mb-8 text-center">Choose Your World</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {environments.map((env) => (
                  <motion.button
                    key={env.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      changeEnvironment(env.id);
                      setShowEnvironmentSelector(false);
                    }}
                    className={`p-6 rounded-2xl text-left transition-all ${
                      currentEnvironment.id === env.id
                        ? 'bg-white/30 border-2 border-white'
                        : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
                    }`}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">{env.name}</h3>
                    <p className="text-purple-200 mb-4">{env.theme}</p>
                    <div className="flex flex-wrap gap-2">
                      {env.subjects.map(subject => (
                        <span key={subject} className="px-3 py-1 bg-blue-500 rounded-full text-white text-sm">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="text-center mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEnvironmentSelector(false)}
                  className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pokemon Encounter Modal */}
      <PokemonEncounter
        pokemon={encounteredPokemon!}
        onCapture={capturePokemon}
        onClose={() => setEncounteredPokemon(null)}
        isVisible={!!encounteredPokemon}
      />

      {/* Pokedex Modal */}
      <Pokedex
        capturedPokemon={currentPlayer.capturedPokemon}
        isVisible={showPokedex}
        onClose={() => setShowPokedex(false)}
        onSelectPokemon={(pokemon) => {
          console.log('Selected Pokemon for battle:', pokemon);
          setShowPokedex(false);
        }}
      />

      {/* Character Creator Modal */}
      <CharacterCreator
        isVisible={showCharacterCreator}
        currentStyle={currentPlayer.characterStyle}
        onSave={updatePlayerCharacter}
        onClose={() => setShowCharacterCreator(false)}
      />

      {/* Reward System Modal */}
      <RewardSystem
        isVisible={showRewards}
        xpGained={currentQuestion?.xpReward || 0}
        levelUp={false}
        onClose={() => setShowRewards(false)}
      />
    </div>
  );
}

export default App;