import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Shuffle, Palette, Sparkles, Save, X } from 'lucide-react';
import { CharacterStyle } from '../types/game';

interface CharacterCreatorProps {
  isVisible: boolean;
  currentStyle: CharacterStyle;
  onSave: (style: CharacterStyle, customAvatar?: string) => void;
  onClose: () => void;
}

export const CharacterCreator: React.FC<CharacterCreatorProps> = ({
  isVisible,
  currentStyle,
  onSave,
  onClose
}) => {
  const [characterStyle, setCharacterStyle] = useState<CharacterStyle>(currentStyle);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [activeTab, setActiveTab] = useState<'photo' | 'customize'>('photo');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const customizationOptions = {
    hairColor: ['#8B4513', '#FFD700', '#000000', '#FF6B35', '#9B59B6', '#E74C3C'],
    skinTone: ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524', '#975A3E'],
    eyeColor: ['#3498DB', '#27AE60', '#8E44AD', '#E67E22', '#34495E', '#F39C12'],
    outfit: ['👕', '🎽', '👔', '🧥', '👗', '🦸‍♂️'],
    accessory: ['🎓', '👑', '🎯', '⚡', '🌟', '🔥'],
    pokemonCompanion: ['⚡', '🔥', '💧', '🌿', '🌙', '☀️']
  };

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedImage(imageData);
        stopCamera();
        processImageWithAI(imageData);
      }
    }
  }, [stopCamera]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
        processImageWithAI(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImageWithAI = async (imageData: string) => {
    setIsProcessing(true);
    
    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate Pokemon-style character based on image analysis
    // In a real implementation, this would call an AI service
    const aiGeneratedStyle: CharacterStyle = {
      hairColor: customizationOptions.hairColor[Math.floor(Math.random() * customizationOptions.hairColor.length)],
      skinTone: customizationOptions.skinTone[Math.floor(Math.random() * customizationOptions.skinTone.length)],
      eyeColor: customizationOptions.eyeColor[Math.floor(Math.random() * customizationOptions.eyeColor.length)],
      outfit: customizationOptions.outfit[Math.floor(Math.random() * customizationOptions.outfit.length)],
      accessory: customizationOptions.accessory[Math.floor(Math.random() * customizationOptions.accessory.length)],
      pokemonCompanion: customizationOptions.pokemonCompanion[Math.floor(Math.random() * customizationOptions.pokemonCompanion.length)]
    };
    
    setCharacterStyle(aiGeneratedStyle);
    setIsProcessing(false);
    setActiveTab('customize');
  };

  const randomizeCharacter = () => {
    const randomStyle: CharacterStyle = {
      hairColor: customizationOptions.hairColor[Math.floor(Math.random() * customizationOptions.hairColor.length)],
      skinTone: customizationOptions.skinTone[Math.floor(Math.random() * customizationOptions.skinTone.length)],
      eyeColor: customizationOptions.eyeColor[Math.floor(Math.random() * customizationOptions.eyeColor.length)],
      outfit: customizationOptions.outfit[Math.floor(Math.random() * customizationOptions.outfit.length)],
      accessory: customizationOptions.accessory[Math.floor(Math.random() * customizationOptions.accessory.length)],
      pokemonCompanion: customizationOptions.pokemonCompanion[Math.floor(Math.random() * customizationOptions.pokemonCompanion.length)]
    };
    setCharacterStyle(randomStyle);
  };

  const handleSave = () => {
    onSave(characterStyle, capturedImage || undefined);
    onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">Create Your Character</h2>
                <p className="text-purple-200">Take a photo or customize your Pokemon trainer avatar!</p>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 flex space-x-2">
                <button
                  onClick={() => setActiveTab('photo')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'photo'
                      ? 'bg-white text-purple-900 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  📸 Photo AI
                </button>
                <button
                  onClick={() => setActiveTab('customize')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'customize'
                      ? 'bg-white text-purple-900 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  🎨 Customize
                </button>
              </div>
            </div>

            {/* Photo AI Tab */}
            {activeTab === 'photo' && (
              <div className="space-y-6">
                {!showCamera && !capturedImage && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startCamera}
                      className="bg-gradient-to-br from-green-500 to-blue-600 p-8 rounded-3xl text-white shadow-2xl"
                    >
                      <Camera className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Take Photo</h3>
                      <p className="text-green-100">Use your camera to create an avatar</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-3xl text-white shadow-2xl"
                    >
                      <Upload className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Upload Photo</h3>
                      <p className="text-purple-100">Choose from your gallery</p>
                    </motion.button>
                  </div>
                )}

                {/* Camera View */}
                {showCamera && (
                  <div className="text-center">
                    <div className="relative inline-block rounded-3xl overflow-hidden shadow-2xl mb-6">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-80 h-80 object-cover"
                      />
                      <div className="absolute inset-0 border-4 border-white/30 rounded-3xl pointer-events-none"></div>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={capturePhoto}
                        className="bg-white text-purple-900 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl font-bold text-2xl"
                      >
                        📸
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={stopCamera}
                        className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Processing Animation */}
                {isProcessing && (
                  <div className="text-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Sparkles className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">AI Magic in Progress...</h3>
                    <p className="text-purple-200">Creating your Pokemon-style avatar!</p>
                  </div>
                )}

                {/* Captured Image Preview */}
                {capturedImage && !isProcessing && (
                  <div className="text-center">
                    <div className="inline-block rounded-3xl overflow-hidden shadow-2xl mb-6">
                      <img
                        src={capturedImage}
                        alt="Captured"
                        className="w-80 h-80 object-cover"
                      />
                    </div>
                    <p className="text-white mb-4">Great! Your AI character has been generated.</p>
                    <p className="text-purple-200">Switch to the Customize tab to fine-tune your avatar!</p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            )}

            {/* Customize Tab */}
            {activeTab === 'customize' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Character Preview */}
                <div className="text-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-6">
                    <div className="w-48 h-48 mx-auto mb-6 relative">
                      {capturedImage ? (
                        <img
                          src={capturedImage}
                          alt="Character"
                          className="w-full h-full object-cover rounded-full border-4 border-white/30"
                        />
                      ) : (
                        <div 
                          className="w-full h-full rounded-full flex items-center justify-center text-6xl border-4 border-white/30"
                          style={{ backgroundColor: characterStyle.skinTone }}
                        >
                          <span>{characterStyle.outfit}</span>
                        </div>
                      )}
                      <div className="absolute -top-2 -right-2 text-4xl">
                        {characterStyle.accessory}
                      </div>
                      <div className="absolute -bottom-2 -left-2 text-4xl">
                        {characterStyle.pokemonCompanion}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={randomizeCharacter}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 mx-auto"
                    >
                      <Shuffle className="w-5 h-5" />
                      <span>Randomize</span>
                    </motion.button>
                  </div>
                </div>

                {/* Customization Options */}
                <div className="space-y-6">
                  {Object.entries(customizationOptions).map(([category, options]) => (
                    <div key={category} className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                      <h3 className="text-white font-bold text-lg mb-4 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h3>
                      <div className="grid grid-cols-6 gap-3">
                        {options.map((option, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setCharacterStyle(prev => ({ ...prev, [category]: option }))}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${
                              characterStyle[category as keyof CharacterStyle] === option
                                ? 'bg-white shadow-lg scale-110'
                                : 'bg-white/20 hover:bg-white/30'
                            }`}
                            style={category.includes('Color') || category === 'skinTone' ? { backgroundColor: option } : {}}
                          >
                            {!category.includes('Color') && category !== 'skinTone' && option}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg"
              >
                <Save className="w-5 h-5" />
                <span>Save Character</span>
              </motion.button>
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};