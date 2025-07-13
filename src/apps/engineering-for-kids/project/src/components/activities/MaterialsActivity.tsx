import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface MaterialsActivityProps {
  onComplete: () => void;
  lesson: string;
}

const MaterialsActivity: React.FC<MaterialsActivityProps> = ({ onComplete, lesson }) => {
  const [materials] = useState([
    { id: 'straw', name: 'Straw', strength: 1, emoji: '🌾' },
    { id: 'wood', name: 'Wood', strength: 2, emoji: '🪵' },
    { id: 'brick', name: 'Brick', strength: 3, emoji: '🧱' }
  ]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [showLesson, setShowLesson] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
    
    if (material.strength === 3) {
      setFeedback("🎉 Great choice! Brick is the strongest material!");
      setTimeout(() => {
        setShowLesson(true);
        setCanContinue(true);
      }, 3000);
    } else if (material.strength === 2) {
      setFeedback("🤔 Wood is okay, but is there something stronger?");
      setTimeout(() => setFeedback(''), 4000);
    } else {
      setFeedback("💨 Oh no! Straw is too weak - the wind will blow it down!");
      setTimeout(() => setFeedback(''), 4000);
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Help the pig choose the strongest material!</h3>
        <div className="text-6xl mb-4">🏠</div>
      </div>
      
      <div className="min-h-20 border-2 border-dashed border-blue-300 rounded-lg p-4 bg-blue-50 text-center">
        {selectedMaterial ? (
          <div className="text-4xl">{selectedMaterial.emoji}</div>
        ) : (
          <p className="text-gray-500">Click a material to build the house!</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {materials.map((material) => (
          <button
            key={material.id}
            onClick={() => handleMaterialSelect(material)}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer text-center border-2 border-gray-200 hover:border-blue-400 transition-colors transform hover:scale-105"
            disabled={canContinue}
          >
            <div className="text-3xl mb-2">{material.emoji}</div>
            <div className="font-medium">{material.name}</div>
            <div className="text-sm text-gray-600">
              {'⭐'.repeat(material.strength)}
            </div>
          </button>
        ))}
      </div>

      {feedback && (
        <div className="text-center text-lg font-medium p-4 bg-yellow-100 rounded-lg border border-yellow-300">
          {feedback}
        </div>
      )}

      {showLesson && (
        <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-green-500" />
            <span className="font-bold text-green-700">What did we learn?</span>
          </div>
          <p className="text-gray-700 mb-4">{lesson}</p>
          <button
            onClick={handleContinue}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Continue to Next Story! 🎉
          </button>
        </div>
      )}
    </div>
  );
};

export default MaterialsActivity;