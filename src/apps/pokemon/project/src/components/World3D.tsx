import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Cylinder, Plane } from '@react-three/drei';
import { Vector3, Color } from 'three';
import { motion } from 'framer-motion';
import { WildPokemon, Environment, Player, CapturedPokemon } from '../types/game';

interface World3DProps {
  environment: Environment;
  wildPokemon: WildPokemon[];
  player: Player;
  onPokemonEncounter: (pokemon: WildPokemon) => void;
  onPlayerMove: (position: { x: number; y: number; z: number }) => void;
}

// Pokemon Sprite Component with proper sprites
const PokemonSprite: React.FC<{ 
  pokemon: WildPokemon; 
  onEncounter: (pokemon: WildPokemon) => void;
  playerPosition: { x: number; y: number; z: number };
}> = ({ pokemon, onEncounter, playerPosition }) => {
  const meshRef = useRef<any>();
  const [hovered, setHovered] = useState(false);
  const [bobOffset] = useState(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = pokemon.position.y + Math.sin(state.clock.elapsedTime * pokemon.animationSpeed + bobOffset) * 0.3;
      
      // Gentle rotation
      meshRef.current.rotation.y += 0.01;
      
      // Scale effect when hovered
      const targetScale = hovered ? pokemon.scale * 1.2 : pokemon.scale;
      meshRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  // Check distance for auto-encounter
  const distance = Math.sqrt(
    Math.pow(pokemon.position.x - playerPosition.x, 2) +
    Math.pow(pokemon.position.z - playerPosition.z, 2)
  );

  useEffect(() => {
    if (distance < 2.5) {
      onEncounter(pokemon);
    }
  }, [distance, pokemon, onEncounter]);

  // Get Pokemon sprite emoji based on type and name
  const getPokemonSprite = () => {
    switch (pokemon.id) {
      case 'numbchu': return '⚡';
      case 'algebragon': return '🔮';
      case 'grammareon': return '📚';
      case 'atomeon': return '⚛️';
      case 'velocityrex': return '🦖';
      case 'historuff': return '🏛️';
      case 'leafeon-nature': return '🌿';
      case 'legendary-einstein': return '🧠';
      default: {
        // Fallback based on type
        switch (pokemon.type) {
          case 'fire': return '🔥';
          case 'water': return '💧';
          case 'grass': return '🌱';
          case 'electric': return '⚡';
          case 'psychic': return '🔮';
          case 'rock': return '🗿';
          case 'flying': return '🦅';
          default: return '✨';
        }
      }
    }
  };

  return (
    <group
      ref={meshRef}
      position={[pokemon.position.x, pokemon.position.y, pokemon.position.z]}
      onClick={() => onEncounter(pokemon)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Pokemon Sprite as 3D Text */}
      <Text
        position={[0, 1, 0]}
        fontSize={2}
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
      >
        {getPokemonSprite()}
      </Text>
      
      {/* Pokemon name label */}
      <Text
        position={[0, 2.8, 0]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="black"
      >
        {pokemon.name}
      </Text>
      
      {/* Rarity glow effect */}
      <mesh position={[0, 1, 0]}>
        <Sphere args={[1.5, 16, 16]} />
        <meshStandardMaterial 
          color={
            pokemon.rarity === 'legendary' ? '#FFD700' :
            pokemon.rarity === 'rare' ? '#9B59B6' :
            pokemon.rarity === 'uncommon' ? '#3498DB' : '#95A5A6'
          }
          transparent
          opacity={0.1}
          emissive={
            pokemon.rarity === 'legendary' ? '#FFD700' :
            pokemon.rarity === 'rare' ? '#9B59B6' :
            pokemon.rarity === 'uncommon' ? '#3498DB' : '#95A5A6'
          }
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Proximity indicator */}
      {distance < 4 && (
        <mesh position={[0, 3.5, 0]}>
          <Sphere args={[0.2, 8, 8]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.8}
          />
        </mesh>
      )}

      {/* Floating particles for legendary Pokemon */}
      {pokemon.rarity === 'legendary' && (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[
              Math.cos(i * Math.PI / 3) * 2,
              1 + Math.sin(Date.now() * 0.001 + i) * 0.5,
              Math.sin(i * Math.PI / 3) * 2
            ]}>
              <Sphere args={[0.1, 8, 8]} />
              <meshStandardMaterial 
                color="#FFD700" 
                emissive="#FFD700" 
                emissiveIntensity={0.5}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
};

// Enhanced Player Character Component
const PlayerCharacter: React.FC<{ 
  position: { x: number; y: number; z: number };
  characterStyle: any;
  isMoving: boolean;
}> = ({ position, characterStyle, isMoving }) => {
  const meshRef = useRef<any>();
  const [walkCycle, setWalkCycle] = useState(0);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth position interpolation
      meshRef.current.position.lerp(new Vector3(position.x, position.y, position.z), 0.15);
      
      // Walking animation
      if (isMoving) {
        setWalkCycle(prev => prev + 0.2);
        meshRef.current.position.y = position.y + Math.sin(walkCycle) * 0.1;
        meshRef.current.rotation.z = Math.sin(walkCycle * 0.5) * 0.1;
      } else {
        meshRef.current.rotation.z = 0;
      }
    }
  });

  return (
    <group ref={meshRef}>
      {/* Player as emoji sprite */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={1.5}
        anchorX="center"
        anchorY="middle"
      >
        🧑‍🎓
      </Text>
      
      {/* Hat/Accessory */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.8}
        anchorX="center"
        anchorY="middle"
      >
        {characterStyle.accessory}
      </Text>

      {/* Movement indicator */}
      {isMoving && (
        <mesh position={[0, -0.2, 0]}>
          <Cylinder args={[1, 1, 0.05, 16]} />
          <meshStandardMaterial 
            color="#3498DB" 
            transparent 
            opacity={0.3}
          />
        </mesh>
      )}
    </group>
  );
};

// Mobile Touch Controls Component
const MobileTouchControls: React.FC<{
  onMove: (direction: { x: number; z: number }) => void;
  isVisible: boolean;
}> = ({ onMove, isVisible }) => {
  const [activeDirection, setActiveDirection] = useState<string | null>(null);

  const handleTouchStart = (direction: string, deltaX: number, deltaZ: number) => {
    setActiveDirection(direction);
    onMove({ x: deltaX, z: deltaZ });
  };

  const handleTouchEnd = () => {
    setActiveDirection(null);
    onMove({ x: 0, z: 0 });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div className="relative w-32 h-32">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white/30 rounded-full border-2 border-white/50"></div>
        
        {/* Up */}
        <button
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all ${
            activeDirection === 'up' ? 'bg-blue-600 scale-110' : 'bg-black/50'
          }`}
          onTouchStart={() => handleTouchStart('up', 0, -0.3)}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleTouchStart('up', 0, -0.3)}
          onMouseUp={handleTouchEnd}
        >
          ↑
        </button>
        
        {/* Down */}
        <button
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all ${
            activeDirection === 'down' ? 'bg-blue-600 scale-110' : 'bg-black/50'
          }`}
          onTouchStart={() => handleTouchStart('down', 0, 0.3)}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleTouchStart('down', 0, 0.3)}
          onMouseUp={handleTouchEnd}
        >
          ↓
        </button>
        
        {/* Left */}
        <button
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all ${
            activeDirection === 'left' ? 'bg-blue-600 scale-110' : 'bg-black/50'
          }`}
          onTouchStart={() => handleTouchStart('left', -0.3, 0)}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleTouchStart('left', -0.3, 0)}
          onMouseUp={handleTouchEnd}
        >
          ←
        </button>
        
        {/* Right */}
        <button
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all ${
            activeDirection === 'right' ? 'bg-blue-600 scale-110' : 'bg-black/50'
          }`}
          onTouchStart={() => handleTouchStart('right', 0.3, 0)}
          onTouchEnd={handleTouchEnd}
          onMouseDown={() => handleTouchStart('right', 0.3, 0)}
          onMouseUp={handleTouchEnd}
        >
          →
        </button>
      </div>
    </div>
  );
};

// Terrain Feature Component
const TerrainFeature: React.FC<{ feature: any }> = ({ feature }) => {
  const getFeatureGeometry = () => {
    switch (feature.type) {
      case 'tree':
        return (
          <group>
            <mesh position={[0, 1, 0]}>
              <Cylinder args={[0.2, 0.3, 2, 8]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            <Text position={[0, 3, 0]} fontSize={2} anchorX="center" anchorY="middle">
              🌳
            </Text>
          </group>
        );
      case 'rock':
        return (
          <Text position={[0, 1, 0]} fontSize={2} anchorX="center" anchorY="middle">
            🗿
          </Text>
        );
      case 'flower':
        return (
          <Text position={[0, 0.5, 0]} fontSize={1.5} anchorX="center" anchorY="middle">
            🌸
          </Text>
        );
      case 'building':
        return (
          <Text position={[0, 2, 0]} fontSize={3} anchorX="center" anchorY="middle">
            🏢
          </Text>
        );
      default:
        return (
          <mesh>
            <Box args={[1, 1, 1]} />
            <meshStandardMaterial color={feature.color} />
          </mesh>
        );
    }
  };

  return (
    <group 
      position={[feature.position.x, feature.position.y, feature.position.z]}
      scale={[feature.scale, feature.scale, feature.scale]}
    >
      {getFeatureGeometry()}
    </group>
  );
};

// Enhanced Camera Controller
const CameraController: React.FC<{ 
  playerPosition: { x: number; y: number; z: number };
  isMoving: boolean;
}> = ({ playerPosition, isMoving }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    // Smooth third-person camera following
    const cameraDistance = isMoving ? 10 : 8;
    const cameraHeight = isMoving ? 8 : 6;
    
    const idealPosition = new Vector3(
      playerPosition.x - cameraDistance,
      playerPosition.y + cameraHeight,
      playerPosition.z + cameraDistance
    );
    
    camera.position.lerp(idealPosition, 0.08);
    camera.lookAt(playerPosition.x, playerPosition.y + 1, playerPosition.z);
  });

  return null;
};

export const World3D: React.FC<World3DProps> = ({
  environment,
  wildPokemon,
  player,
  onPokemonEncounter,
  onPlayerMove
}) => {
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});
  const [isMoving, setIsMoving] = useState(false);
  const [moveSpeed] = useState(0.3);
  const [isMobile, setIsMobile] = useState(false);
  const [touchMovement, setTouchMovement] = useState({ x: 0, z: 0 });
  const lastMoveTime = useRef(Date.now());

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    setKeys(prev => ({ ...prev, [key]: true }));
    event.preventDefault();
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    setKeys(prev => ({ ...prev, [key]: false }));
    event.preventDefault();
  }, []);

  const handleTouchMove = useCallback((direction: { x: number; z: number }) => {
    setTouchMovement(direction);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [handleKeyDown, handleKeyUp, isMobile]);

  // Enhanced movement system
  useEffect(() => {
    const moveInterval = setInterval(() => {
      let newPosition = { ...player.position };
      let moved = false;

      if (isMobile) {
        // Mobile touch movement
        if (touchMovement.x !== 0 || touchMovement.z !== 0) {
          newPosition.x += touchMovement.x;
          newPosition.z += touchMovement.z;
          moved = true;
        }
      } else {
        // Desktop keyboard movement
        const isUpPressed = keys['w'] || keys['arrowup'];
        const isDownPressed = keys['s'] || keys['arrowdown'];
        const isLeftPressed = keys['a'] || keys['arrowleft'];
        const isRightPressed = keys['d'] || keys['arrowright'];

        let deltaX = 0;
        let deltaZ = 0;

        if (isUpPressed) deltaZ -= moveSpeed;
        if (isDownPressed) deltaZ += moveSpeed;
        if (isLeftPressed) deltaX -= moveSpeed;
        if (isRightPressed) deltaX += moveSpeed;

        // Normalize diagonal movement
        if (deltaX !== 0 && deltaZ !== 0) {
          const normalizer = Math.sqrt(2) / 2;
          deltaX *= normalizer;
          deltaZ *= normalizer;
        }

        if (deltaX !== 0 || deltaZ !== 0) {
          newPosition.x += deltaX;
          newPosition.z += deltaZ;
          moved = true;
        }
      }

      // Boundary checking
      const boundary = 40;
      newPosition.x = Math.max(-boundary, Math.min(boundary, newPosition.x));
      newPosition.z = Math.max(-boundary, Math.min(boundary, newPosition.z));

      setIsMoving(moved);

      if (moved && (newPosition.x !== player.position.x || newPosition.z !== player.position.z)) {
        onPlayerMove(newPosition);
        lastMoveTime.current = Date.now();
      }
    }, 16); // 60 FPS movement updates

    return () => clearInterval(moveInterval);
  }, [keys, touchMovement, player.position, onPlayerMove, moveSpeed, isMobile]);

  return (
    <div className="w-full h-screen relative">
      <Canvas
        shadows
        camera={{ position: [0, 10, 10], fov: 60 }}
        style={{ background: environment.backgroundColor }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.6} color={environment.ambientLight} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          color={environment.directionalLight}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 5, 0]} intensity={0.4} color="#ffffff" />

        {/* Ground with grid pattern */}
        <Plane
          args={[100, 100]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <meshStandardMaterial 
            color={environment.groundColor}
            roughness={0.8}
            metalness={0.1}
          />
        </Plane>

        {/* Grid lines for better spatial awareness */}
        {Array.from({ length: 21 }).map((_, i) => {
          const pos = (i - 10) * 5;
          return (
            <group key={i}>
              <mesh position={[pos, 0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
                <Cylinder args={[0.02, 0.02, 100, 8]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
              </mesh>
              <mesh position={[0, 0.01, pos]}>
                <Cylinder args={[0.02, 0.02, 100, 8]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
              </mesh>
            </group>
          );
        })}

        {/* Terrain Features */}
        {environment.terrain.map((feature, index) => (
          <TerrainFeature key={index} feature={feature} />
        ))}

        {/* Wild Pokemon with Sprites */}
        {wildPokemon.map((pokemon) => (
          <PokemonSprite
            key={pokemon.id}
            pokemon={pokemon}
            onEncounter={onPokemonEncounter}
            playerPosition={player.position}
          />
        ))}

        {/* Enhanced Player Character */}
        <PlayerCharacter
          position={player.position}
          characterStyle={player.characterStyle}
          isMoving={isMoving}
        />

        {/* Enhanced Camera Controller */}
        <CameraController 
          playerPosition={player.position} 
          isMoving={isMoving}
        />
      </Canvas>

      {/* Mobile Touch Controls */}
      <MobileTouchControls
        onMove={handleTouchMove}
        isVisible={isMobile}
      />

      {/* Desktop Movement Instructions */}
      {!isMobile && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white p-6 rounded-2xl backdrop-blur-sm border border-white/20">
          <h3 className="font-bold mb-3 text-lg">🎮 Controls</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-3">
              <div className="grid grid-cols-3 gap-1">
                <div></div>
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-xs font-bold">W</div>
                <div></div>
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-xs font-bold">A</div>
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-xs font-bold">S</div>
                <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-xs font-bold">D</div>
              </div>
              <span>Move around</span>
            </div>
            <div className="text-yellow-300">💡 Walk close to Pokemon to encounter them!</div>
            <div className="text-blue-300">✨ Golden dots appear when Pokemon are nearby</div>
          </div>
        </div>
      )}

      {/* Mobile Instructions */}
      {isMobile && (
        <div className="absolute bottom-4 right-4 bg-black/80 text-white p-4 rounded-2xl backdrop-blur-sm border border-white/20 max-w-xs">
          <h3 className="font-bold mb-2 text-sm">📱 Mobile Controls</h3>
          <div className="text-xs space-y-1">
            <div>Use the touch pad on the left to move</div>
            <div className="text-yellow-300">Walk close to Pokemon to catch them!</div>
          </div>
        </div>
      )}

      {/* Movement Status Indicator */}
      {isMoving && (
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-blue-500/80 text-white px-4 py-2 rounded-full backdrop-blur-sm flex items-center space-x-2"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="font-semibold">Moving</span>
          </motion.div>
        </div>
      )}

      {/* Environment Info */}
      <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-xl backdrop-blur-sm border border-white/20">
        <h3 className="font-bold text-lg">{environment.name}</h3>
        <p className="text-sm text-gray-300 mb-2">{environment.theme}</p>
        <div className="flex flex-wrap gap-2">
          {environment.subjects.map(subject => (
            <span key={subject} className="px-2 py-1 bg-blue-500 rounded text-xs font-semibold">
              {subject.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Pokemon Counter */}
      <div className="absolute top-4 right-4 bg-black/80 text-white p-4 rounded-xl backdrop-blur-sm border border-white/20">
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-400">{wildPokemon.length}</div>
          <div className="text-sm">Pokemon Nearby</div>
          <div className="text-xs text-gray-300 mt-1">
            Position: ({Math.round(player.position.x)}, {Math.round(player.position.z)})
          </div>
        </div>
      </div>
    </div>
  );
};