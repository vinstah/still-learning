import React, { useState } from 'react';
import { Search, Filter, X, Tag, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  onClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagToggle,
  availableTags,
  selectedDifficulty,
  onDifficultyChange,
  selectedType,
  onTypeChange,
  onClearFilters
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasActiveFilters = searchTerm || selectedTags.length > 0 || selectedDifficulty || selectedType;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="p-4">
        {/* Search Bar - Always Visible */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          
          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`flex items-center space-x-2 px-3 py-2 border rounded-lg transition-colors ${
              hasActiveFilters 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {(selectedTags.length + (selectedDifficulty ? 1 : 0) + (selectedType ? 1 : 0))}
              </span>
            )}
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {/* Expandable Filters */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => onDifficultyChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Difficulties</option>
                <option value="foundation">🌱 Foundation</option>
                <option value="building">🏗️ Building</option>
                <option value="mastery">🎯 Mastery</option>
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">All Types</option>
                <option value="multiple-choice">☑️ Multiple Choice</option>
                <option value="true-false">✅ True/False</option>
                <option value="step-by-step">📋 Step-by-Step</option>
                <option value="matching">🔗 Matching</option>
                <option value="visual">👁️ Visual</option>
                <option value="essay">📝 Essay</option>
              </select>
            </div>

            {/* Tag Filters */}
            {availableTags.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter by tags:</span>
                </div>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => onTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  {(selectedTags.length + (selectedDifficulty ? 1 : 0) + (selectedType ? 1 : 0) + (searchTerm ? 1 : 0))} filter{(selectedTags.length + (selectedDifficulty ? 1 : 0) + (selectedType ? 1 : 0) + (searchTerm ? 1 : 0)) !== 1 ? 's' : ''} active
                </div>
                <button
                  onClick={onClearFilters}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  <X className="h-3 w-3" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Filters Summary - Compact */}
        {hasActiveFilters && !isExpanded && (
          <div className="flex flex-wrap gap-1 mt-2">
            {searchTerm && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                "{searchTerm}"
              </span>
            )}
            {selectedDifficulty && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                {selectedDifficulty === 'foundation' && '🌱'}
                {selectedDifficulty === 'building' && '🏗️'}
                {selectedDifficulty === 'mastery' && '🎯'}
              </span>
            )}
            {selectedType && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                {selectedType}
              </span>
            )}
            {selectedTags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                {tag}
              </span>
            ))}
            {selectedTags.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                +{selectedTags.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;