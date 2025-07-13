import { useState, useEffect } from 'react';
import { Player, Question, Battle, AICompanion, CharacterStyle, WildPokemon, CapturedPokemon, Environment } from '../types/game';
import { sampleQuestions, aiCompanions, wildPokemon, environments } from '../data/gameData';

export const useGameState = () => {
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    id: '1',
    name: 'Champion',
    avatar: '🎓',
    level: 5,
    xp: 450,
    badges: [],
    currentSubject: 'math',
    gradeLevel: 'year5',
    position: { x: 0, y: 0, z: 0 },
    capturedPokemon: [],
    characterStyle: {
      hairColor: '#8B4513',
      skinTone: '#FDBCB4',
      eyeColor: '#3498DB',
      outfit: '👕',
      accessory: '🎓',
      pokemonCompanion: '⚡'
    }
  });

  const [currentEnvironment, setCurrentEnvironment] = useState<Environment>(environments[0]);
  const [currentWildPokemon, setCurrentWildPokemon] = useState<WildPokemon[]>(wildPokemon);
  const [encounteredPokemon, setEncounteredPokemon] = useState<WildPokemon | null>(null);
  const [showPokedex, setShowPokedex] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState<Player[]>([
    {
      id: '2',
      name: 'Alex',
      avatar: '🚀',
      level: 7,
      xp: 680,
      badges: [],
      currentSubject: 'science',
      gradeLevel: 'year6',
      position: { x: 10, y: 0, z: 10 },
      capturedPokemon: [],
      characterStyle: {
        hairColor: '#FFD700',
        skinTone: '#F1C27D',
        eyeColor: '#27AE60',
        outfit: '🎽',
        accessory: '⚡',
        pokemonCompanion: '🔥'
      }
    }
  ]);

  const [activeBattles, setActiveBattles] = useState<Battle[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentAI, setCurrentAI] = useState<AICompanion>(aiCompanions.nova);
  const [gameMode, setGameMode] = useState<'menu' | 'world' | 'battle' | 'multiplayer' | 'rewards'>('menu');

  const updatePlayerXP = (xpGained: number) => {
    setCurrentPlayer(prev => ({
      ...prev,
      xp: prev.xp + xpGained,
      level: Math.floor((prev.xp + xpGained) / 100) + 1
    }));
  };

  const updatePlayerCharacter = (style: CharacterStyle, customAvatar?: string) => {
    setCurrentPlayer(prev => ({
      ...prev,
      characterStyle: style,
      customAvatar: customAvatar
    }));
  };

  const updatePlayerPosition = (position: { x: number; y: number; z: number }) => {
    setCurrentPlayer(prev => ({
      ...prev,
      position
    }));
  };

  const handlePokemonEncounter = (pokemon: WildPokemon) => {
    setEncounteredPokemon(pokemon);
  };

  const capturePokemon = (capturedPokemon: CapturedPokemon) => {
    setCurrentPlayer(prev => ({
      ...prev,
      capturedPokemon: [...prev.capturedPokemon, capturedPokemon]
    }));

    // Remove the captured Pokemon from the wild
    setCurrentWildPokemon(prev => prev.filter(p => p.id !== capturedPokemon.id));
    setEncounteredPokemon(null);
  };

  const changeEnvironment = (environmentId: string) => {
    const newEnvironment = environments.find(env => env.id === environmentId);
    if (newEnvironment) {
      setCurrentEnvironment(newEnvironment);
      // Filter Pokemon based on environment subjects
      const environmentPokemon = wildPokemon.filter(pokemon => 
        newEnvironment.subjects.includes(pokemon.subject)
      );
      setCurrentWildPokemon(environmentPokemon);
      // Reset player position
      setCurrentPlayer(prev => ({
        ...prev,
        position: { x: 0, y: 0, z: 0 }
      }));
    }
  };

  const startBattle = (subject: string) => {
    const filteredQuestions = sampleQuestions.filter(
      q => q.subject === subject && q.gradeLevel === currentPlayer.gradeLevel
    );
    
    if (filteredQuestions.length > 0) {
      setCurrentQuestion(filteredQuestions[0]);
      setGameMode('battle');
    }
  };

  const joinBattle = (battleId: string) => {
    setGameMode('battle');
    const battle = activeBattles.find(b => b.id === battleId);
    if (battle && battle.questions.length > 0) {
      setCurrentQuestion(battle.questions[0]);
    }
  };

  const createBattle = () => {
    const newBattle: Battle = {
      id: `battle${Date.now()}`,
      players: [currentPlayer],
      questions: sampleQuestions.slice(0, 5),
      currentQuestionIndex: 0,
      status: 'waiting'
    };
    setActiveBattles(prev => [...prev, newBattle]);
  };

  return {
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
  };
};