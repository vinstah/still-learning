import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Star, Filter, Search, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { MarketplaceItem } from '../../types/game';

const MarketplaceScreen: React.FC = () => {
  const { user, purchaseItem } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Items', icon: '🛍️' },
    { id: 'avatar', label: 'Avatars', icon: '👤' },
    { id: 'decoration', label: 'Decorations', icon: '🏠' },
    { id: 'powerup', label: 'Power-ups', icon: '⚡' },
    { id: 'collectible', label: 'Collectibles', icon: '💎' }
  ];

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: '1',
      name: 'Wizard Hat',
      description: 'Mystical hat that boosts learning XP by 10%',
      category: 'avatar',
      price: 500,
      rarity: 'rare',
      image: '🧙‍♂️',
      isLimited: false
    },
    {
      id: '2',
      name: 'Golden Bookshelf',
      description: 'Elegant bookshelf for your virtual room',
      category: 'decoration',
      price: 300,
      rarity: 'common',
      image: '📚',
      isLimited: false
    },
    {
      id: '3',
      name: 'Time Boost',
      description: 'Extends activity time by 30 seconds',
      category: 'powerup',
      price: 150,
      rarity: 'common',
      image: '⏰',
      isLimited: false
    },
    {
      id: '4',
      name: 'Dragon Companion',
      description: 'Legendary companion that follows you around',
      category: 'avatar',
      price: 2000,
      rarity: 'legendary',
      image: '🐉',
      isLimited: true,
      stock: 5
    },
    {
      id: '5',
      name: 'Crystal Orb',
      description: 'Rare collectible from the Winter Festival',
      category: 'collectible',
      price: 1200,
      rarity: 'epic',
      image: '🔮',
      isLimited: true,
      stock: 12
    },
    {
      id: '6',
      name: 'Study Desk',
      description: 'Perfect desk setup for focused learning',
      category: 'decoration',
      price: 400,
      rarity: 'common',
      image: '🪑',
      isLimited: false
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-200';
      case 'rare': return 'border-blue-200';
      case 'epic': return 'border-purple-200';
      case 'legendary': return 'border-yellow-200';
      default: return 'border-gray-200';
    }
  };

  const filteredItems = marketplaceItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const ItemCard = ({ item }: { item: MarketplaceItem }) => {
    const canAfford = user && user.tokens >= item.price;
    const isOutOfStock = item.isLimited && item.stock === 0;

    return (
      <motion.div
        className={`bg-white rounded-xl p-4 shadow-sm border-2 ${getRarityBorder(item.rarity)} relative overflow-hidden`}
        whileHover={{ scale: 1.02, y: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {item.rarity === 'legendary' && (
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-400 to-transparent opacity-20" />
        )}
        
        {item.isLimited && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Limited
            </span>
          </div>
        )}

        <div className="text-center mb-3">
          <div className="text-4xl mb-2">{item.image}</div>
          <h4 className="font-semibold text-gray-800">{item.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRarityColor(item.rarity)}`}>
              {item.rarity}
            </span>
            {item.isLimited && item.stock !== undefined && (
              <span className="text-xs text-gray-500">
                {item.stock} left
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <div className="w-5 h-5 bg-warning-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">T</span>
              </div>
              <span className="font-bold text-gray-800">{item.price}</span>
            </div>

            <motion.button
              onClick={() => purchaseItem(item.id)}
              disabled={!canAfford || isOutOfStock}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isOutOfStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : canAfford
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              whileHover={canAfford && !isOutOfStock ? { scale: 1.05 } : {}}
              whileTap={canAfford && !isOutOfStock ? { scale: 0.95 } : {}}
            >
              {isOutOfStock ? 'Sold Out' : canAfford ? 'Buy' : 'Not Enough Tokens'}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      <div className="p-4 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Marketplace</h2>
              <p className="text-purple-100">Customize your learning experience!</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-6 h-6 bg-warning-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">T</span>
                </div>
                <span className="text-2xl font-bold">{user?.tokens || 0}</span>
              </div>
              <p className="text-purple-100 text-sm">Your Tokens</p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:text-primary-600 border border-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="text-yellow-500" size={24} />
            <h3 className="text-xl font-bold text-gray-800">Featured Items</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems
              .filter(item => item.rarity === 'legendary' || item.isLimited)
              .slice(0, 2)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <ItemCard item={item} />
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* All Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {selectedCategory === 'all' ? 'All Items' : categories.find(c => c.id === selectedCategory)?.label}
            </h3>
            <span className="text-sm text-gray-600">{filteredItems.length} items</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <ItemCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketplaceScreen;