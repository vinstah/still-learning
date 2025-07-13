export interface Player {
  id: string;
  name: string;
  avatar: string;
  customAvatar?: string;
  level: number;
  xp: number;
  badges: Badge[];
  currentSubject: Subject;
  gradeLevel: GradeLevel;
  characterStyle: CharacterStyle;
  position: { x: number; y: number; z: number };
  capturedPokemon: CapturedPokemon[];
}

export interface CharacterStyle {
  hairColor: string;
  skinTone: string;
  eyeColor: string;
  outfit: string;
  accessory: string;
  pokemonCompanion: string;
}

export interface CapturedPokemon {
  id: string;
  name: string;
  type: PokemonType;
  subject: Subject;
  model: string;
  color: string;
  facts: string[];
  capturedAt: Date;
  level: number;
}

export interface WildPokemon {
  id: string;
  name: string;
  type: PokemonType;
  subject: Subject;
  position: { x: number; y: number; z: number };
  model: string;
  color: string;
  scale: number;
  animationSpeed: number;
  facts: string[];
  questions: Question[];
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
}

export interface Environment {
  id: string;
  name: string;
  theme: string;
  backgroundColor: string;
  groundColor: string;
  ambientLight: string;
  directionalLight: string;
  subjects: Subject[];
  pokemonTypes: PokemonType[];
  terrain: TerrainFeature[];
}

export interface TerrainFeature {
  type: 'tree' | 'rock' | 'flower' | 'building' | 'water' | 'mountain';
  position: { x: number; y: number; z: number };
  scale: number;
  color: string;
}

export type PokemonType = 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'rock' | 'flying' | 'normal';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  subject: Subject;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
}

export type Subject = 'math' | 'english' | 'science' | 'physics' | 'history' | 'nature';

export type GradeLevel = 'year1' | 'year2' | 'year3' | 'year4' | 'year5' | 'year6' | 
                        'year7' | 'year8' | 'year9' | 'year10' | 'year11' | 'year12' | 'college';

export interface Question {
  id: string;
  subject: Subject;
  gradeLevel: GradeLevel;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  hint?: string;
  pokemonId?: string;
}

export interface Battle {
  id: string;
  players: Player[];
  questions: Question[];
  currentQuestionIndex: number;
  status: 'waiting' | 'active' | 'completed';
  winner?: string;
}

export interface AICompanion {
  name: string;
  personality: 'encouraging' | 'wise' | 'playful';
  hints: string[];
  motivationalMessages: string[];
}